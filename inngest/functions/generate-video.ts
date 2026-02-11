import { inngest } from "../client";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { generateVideoScriptPrompt } from "@/lib/video-prompts";
import { generateVoice } from "@/lib/voice-generator";
import { genAI, model } from "@/lib/gemini";

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
            const { generateSRT } = await import("@/lib/caption-generator");
            const srtContent = await generateSRT(audioUrl);

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
            return publicData.publicUrl;
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

        // Step 6: Save all generated assets to database
        const saveResult = await step.run("save-result", async () => {
            console.log("Saving generated video assets to database...");

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
                    captions_url: captionsUrl,
                    image_urls: imageUrls,
                    video_number: videoNumber,
                    status: 'completed'
                })
                .select()
                .single();

            if (error) {
                console.error("Failed to save video assets:", error);
                throw new Error(`Failed to save to database: ${error.message}`);
            }

            // step 7Update video_generations status to completed
            const { error: updateError } = await supabaseAdmin
                .from('video_generations')
                .update({ status: 'completed' })
                .eq('id', seriesId);

            if (updateError) {
                console.error("Failed to update series status:", updateError);
            }

            console.log(`Video generation completed! Video #${videoNumber} saved successfully.`);
            return { success: true, videoId: data.id, videoNumber, message: "Video assets saved successfully" };
        });

        return {
            seriesId,
            status: "completed",
            videoData: {
                script,
                audioUrl,
                captionsUrl,
                imageUrls
            }
        };
    }
);
