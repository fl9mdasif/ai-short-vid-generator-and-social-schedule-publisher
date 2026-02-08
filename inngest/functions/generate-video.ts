import { inngest } from "../client";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { generateVideoScriptPrompt } from "@/lib/video-prompts";
import { generateVoice } from "@/lib/voice-generator";
import { genAI, model } from "@/lib/gemini";
import { renderMediaOnLambda } from "@remotion/lambda/client";
import Plunk from "@plunk/node";
import { generateVideoEmailTemplate } from "@/lib/email-templates";

export const generateVideo = inngest.createFunction(
    { id: "generate-video" },
    { event: "video/generate.requested" },
    async ({ event, step }) => {
        const { seriesId } = event.data;

        // Step 1: Fetch Series Data from Supabase
        const seriesData = await step.run("fetch-series-data", async () => {
            const { data, error } = await supabaseAdmin
                .from("video_generations")
                .select("*")
                .eq("id", seriesId)
                .single();

            if (error) throw new Error(`Failed to fetch series: ${error.message}`);
            return data;
        });

        // Step 2: Generate Video Script using AI
        const script = await step.run("generate-script", async () => {
            const prompt = generateVideoScriptPrompt(seriesData);

            // Use new @google/genai API
            const response = await genAI.models.generateContent({
                model: model,
                contents: prompt
            });

            const text = response.text;

            if (!text) {
                throw new Error("No response text from Gemini AI");
            }

            try {
                // Clean up markdown code blocks if present
                const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
                return JSON.parse(jsonStr);
            } catch (e) {
                throw new Error(`Failed to parse AI response: ${e instanceof Error ? e.message : 'Unknown error'}`);
            }
        });


        // Step 3: Generate Voice using TTS model
        const audioUrl = await step.run("generate-voice", async () => {
            const provider = (seriesData.language_model_name?.toLowerCase() === 'fonadalab') ? 'fonadalab' : 'deepgram';
            const voiceModel = seriesData.voice_model_name;
            const language = seriesData.language_name;

            if (!voiceModel) throw new Error("Voice model not found in series data");

            const audioBuffer = await generateVoice(
                script.script,
                voiceModel,
                provider,
                language || undefined
            );

            // Upload to Supabase Storage
            const fileName = `${seriesData.id}/audio.mp3`;
            const { data, error } = await supabaseAdmin
                .storage
                .from('video-assets')
                .upload(fileName, audioBuffer, {
                    contentType: 'audio/mpeg',
                    upsert: true
                });

            if (error) {
                throw new Error(`Failed to upload audio: ${error.message}`);
            }

            // Get Public URL
            const { data: publicData } = supabaseAdmin
                .storage
                .from('video-assets')
                .getPublicUrl(fileName);

            return publicData.publicUrl;
        });

        // Step 4: Generate Captions from audio using Deepgram
        const captionsUrl = await step.run("generate-captions", async () => {
            console.log("Generating captions from audio:", audioUrl);

            // Use Deepgram to transcribe audio and generate SRT captions
            const { generateSRT, generateCaptions } = await import("@/lib/caption-generator");
            const srtContent = await generateSRT(audioUrl);
            const structuredCaptions = await generateCaptions(audioUrl);

            // Upload SRT file to Supabase Storage
            const captionFileName = `${seriesData.id}/captions.srt`;
            const { data, error } = await supabaseAdmin
                .storage
                .from('video-assets')
                .upload(captionFileName, srtContent, {
                    contentType: 'text/plain',
                    upsert: true
                });

            if (error) {
                throw new Error(`Failed to upload captions: ${error.message}`);
            }

            // Get Public URL
            const { data: publicData } = supabaseAdmin
                .storage
                .from('video-assets')
                .getPublicUrl(captionFileName);

            console.log("Captions generated and uploaded successfully");
            return { captionsUrl: publicData.publicUrl, structuredCaptions };
        });

        // Step 5: Generate Images from visual prompts using Replicate
        const imageUrls = await step.run("generate-images", async () => {
            console.log("Generating images from visual prompts...");
            const { generateImage } = await import("@/lib/image-generator");

            const generatedImageUrls: string[] = [];

            // Generate one image for each scene's visual_prompt
            for (let i = 0; i < script.scenes.length; i++) {
                const scene = script.scenes[i];
                console.log(`Generating image ${i + 1}/${script.scenes.length} for scene: ${scene.scene_number}`);

                try {
                    const imageUrl = await generateImage(scene.visual_prompt);
                    generatedImageUrls.push(imageUrl);
                    console.log(`Image ${i + 1} generated successfully`);
                } catch (error) {
                    console.error(`Failed to generate image for scene ${scene.scene_number}:`, error);
                    throw error;
                }
            }

            console.log(`All ${generatedImageUrls.length} images generated successfully`);
            return generatedImageUrls;
        });

        // Step 6: Save intermediate assets to database
        const videoAsset = await step.run("save-intermediate-assets", async () => {
            console.log("Saving intermediate video assets to database...");

            // Get the count of existing videos for this series to determine video number
            const { count } = await supabaseAdmin
                .from('generated_video_assets')
                .select('*', { count: 'exact', head: true })
                .eq('series_id', seriesId);

            const videoNumber = (count || 0) + 1;

            // Insert into generated_video_assets table
            const { data, error } = await supabaseAdmin
                .from('generated_video_assets')
                .insert({
                    series_id: seriesId,
                    script_json: script,
                    audio_url: audioUrl,
                    captions_url: captionsUrl.captionsUrl,
                    image_urls: imageUrls,
                    video_number: videoNumber,
                    status: 'rendering' // Status is rendering now
                })
                .select()
                .single();

            if (error) {
                console.error("Failed to save video assets:", error);
                throw new Error(`Failed to save to database: ${error.message}`);
            }

            return { videoId: data.id, videoNumber };
        });

        // Step 7: Render Video using Remotion Lambda
        const renderResult = await step.run("generating-video", async () => {
            console.log("Triggering Remotion Lambda render...");
            const { renderMediaOnLambda } = await import("@remotion/lambda/client");
            const { COMPOSITION_ID } = await import("@/remotion/constants");

            const REGION = process.env.REMOTION_LAMBDA_REGION;
            const FUNCTION_NAME = process.env.REMOTION_LAMBDA_FUNCTION_NAME;
            const SERVE_URL = process.env.REMOTION_LAMBDA_SERVER_URL;

            if (!REGION || !FUNCTION_NAME || !SERVE_URL) {
                throw new Error("Missing Remotion Lambda environment variables");
            }

            // Prepare props for Composition
            const fps = 30;
            const durationInFrames = Math.floor(imageUrls.length * 3 * fps);

            // Group captions into chunks of 3 words (or less for the last chunk)
            const wordCaptions = captionsUrl.structuredCaptions.map(c => ({
                text: c.word,
                start: c.start,
                end: c.end
            }));

            const chunkedCaptions = [];
            for (let i = 0; i < wordCaptions.length; i += 3) {
                const chunk = wordCaptions.slice(i, i + 3);
                if (chunk.length > 0) {
                    chunkedCaptions.push({
                        text: chunk.map(c => c.text).join(" "),
                        start: chunk[0].start,
                        end: chunk[chunk.length - 1].end
                    });
                }
            }

            const inputProps = {
                images: imageUrls,
                captions: chunkedCaptions,
                audioUrl,
                fps,
                durationInFrames,
                styleId: seriesData.caption_style
            };

            const { renderId, bucketName } = await renderMediaOnLambda({
                region: REGION as any,
                functionName: FUNCTION_NAME,
                serveUrl: SERVE_URL,
                composition: COMPOSITION_ID,
                inputProps,
                codec: 'h264',
                framesPerLambda: 3000, // Set to a high value to force single-lambda rendering and avoid concurrency limits
            });

            console.log(`Render started: ${renderId}`);

            // Update database with render ID immediately
            // Update database with render ID immediately
            const { error: updateError } = await supabaseAdmin
                .from('generated_video_assets')
                .update({ render_id: renderId })
                .eq('id', videoAsset.videoId);

            if (updateError) {
                console.error("Failed to update render_id:", updateError);
                // We don't throw here to avoid stopping the render, but we log explicitly
            }

            return { renderId, bucketName };
        });

        // Step 8: Wait for Lambda Completion (Polling)
        const finalVideoUrl = await step.run("aws-lambda-polling", async () => {
            const { getRenderProgress } = await import("@remotion/lambda/client");
            const REGION = process.env.REMOTION_LAMBDA_REGION;
            const FUNCTION_NAME = process.env.REMOTION_LAMBDA_FUNCTION_NAME;

            if (!REGION || !FUNCTION_NAME) {
                throw new Error("Missing Remotion Lambda environment variables for polling");
            }

            let retries = 0;
            const MAX_RETRIES = 120; // Increased timeout to 10 mins

            while (retries < MAX_RETRIES) {
                const progress = await getRenderProgress({
                    renderId: renderResult.renderId,
                    bucketName: renderResult.bucketName,
                    functionName: FUNCTION_NAME,
                    region: REGION as any,
                });

                if (progress.done) return progress.outputFile;
                if (progress.fatalErrorEncountered) {
                    console.error("Render failed:", progress.errors);
                    throw new Error(progress.errors[0].message);
                }

                console.log(`Rendering progress: ${Math.round(progress.overallProgress * 100)}%`);

                // Wait 5 seconds
                await new Promise(resolve => setTimeout(resolve, 5000));
                retries++;
            }
            throw new Error("Render timed out");
        });

        // Step 9: Finalize - Update DB with video URL
        const finalizeResult = await step.run("finalize-video-url", async () => {
            const { error: updateError } = await supabaseAdmin
                .from('generated_video_assets')
                .update({
                    final_video_url: finalVideoUrl,
                    status: 'completed'
                })
                .eq('id', videoAsset.videoId);

            if (updateError) {
                throw new Error(`Failed to update final video url: ${updateError.message}`);
            }

            // Update series status to completed
            await supabaseAdmin
                .from('video_generations')
                .update({ status: 'completed' })
                .eq('id', seriesId);

            return { success: true };
        });

        // Step 10: Send Email Notification
        await step.run("send-email-notification", async () => {
            if (!process.env.PLUNK_API_KEY) {
                console.warn("Skipping email notification: PLUNK_API_KEY not set");
                return;
            }

            const plunk = new Plunk(process.env.PLUNK_API_KEY);

            // Fetch user email
            const { data: userData, error: userError } = await supabaseAdmin
                .from("users")
                .select("email")
                .eq("clerk_id", seriesData.user_clerk_id)
                .single();

            if (userError || !userData?.email) {
                console.error("Failed to fetch user email for notification:", userError);
                return;
            }

            if (!finalVideoUrl) {
                console.error("No final video URL available for email notification");
                return;
            }

            const emailHtml = generateVideoEmailTemplate(
                finalVideoUrl,
                imageUrls[0] || "", // Use the first generated image as thumbnail, fallback to empty string
                seriesData.series_name || "Your Generated Video"
            );

            await plunk.emails.send({
                to: userData.email,
                subject: "Your video is ready! 🎬",
                body: emailHtml,
            });
        });

        return {
            seriesId,
            status: "completed",
            videoData: {
                script,
                audioUrl,
                captionsUrl: captionsUrl.captionsUrl,
                imageUrls,
                finalVideoUrl,
                finalizeResult
            }
        };
    }
);


