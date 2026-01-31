import { inngest } from "../client";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { model } from "@/lib/gemini";
import { generateVideoScriptPrompt } from "@/lib/video-prompts";
import { generateVoice } from "@/lib/voice-generator";

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

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

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

        // Step 4: Generate Caption using Model (Placeholder)
        const captions = await step.run("generate-captions", async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return [
                { start: 0, end: 2, text: "Scene 1: Intro" },
                { start: 2, end: 5, text: "Scene 2: Main Point" }
            ];
        });

        // Step 5: Generate Images from image prompt (Placeholder)
        const imageUrls = await step.run("generate-images", async () => {
            await new Promise((resolve) => setTimeout(resolve, 3000));
            return [
                "https://example.com/image1.jpg",
                "https://example.com/image2.jpg"
            ];
        });

        // Step 6: Save everything to database (Placeholder)
        const saveResult = await step.run("save-result", async () => {
            // In a real scenario, we would update the series record or insert into a 'videos' table
            // For now, we'll just log that we would have saved it.
            // potentially update status to 'completed'
            return { success: true, message: "Video generation data saved successfully" };
        });

        return {
            seriesId,
            status: "completed",
            videoData: {
                script,
                audioUrl,
                captions,
                imageUrls
            }
        };
    }
);
