"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";

export async function getVideos(userId: string) {
    try {
        // Fetch videos with series information
        const { data, error } = await supabaseAdmin
            .from('generated_video_assets')
            .select(`
                id,
                series_id,
                script_json,
                audio_url,
                captions_url,
                image_urls,
                final_video_url,
                render_id,
                video_number,
                status,
                created_at,
                video_generations (
                    series_name,
                    niche_type,
                    selected_niche,
                    custom_niche
                )
            `)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching videos:", error);
            throw error;
        }

        return data || [];
    } catch (error) {
        console.error("Failed to fetch videos:", error);
        throw new Error("Failed to fetch videos");
    }
}

export async function getVideosBySeriesId(seriesId: string) {
    try {
        const { data, error } = await supabaseAdmin
            .from('generated_video_assets')
            .select(`
                id,
                series_id,
                script_json,
                audio_url,
                captions_url,
                image_urls,
                final_video_url,
                render_id,
                video_number,
                status,
                created_at
            `)
            .eq('series_id', seriesId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching videos for series:", error);
            throw error;
        }

        return data || [];
    } catch (error) {
        console.error("Failed to fetch videos for series:", error);
        throw new Error("Failed to fetch videos for series");
    }
}

export async function deleteVideo(videoId: string) {
    try {
        // First, get the video to access file URLs
        const { data: video, error: fetchError } = await supabaseAdmin
            .from('generated_video_assets')
            .select('audio_url, captions_url')
            .eq('id', videoId)
            .single();

        if (fetchError) {
            console.error("Error fetching video:", fetchError);
            throw fetchError;
        }

        // Delete files from storage
        if (video?.audio_url) {
            const audioPath = video.audio_url.split('/video-assets/')[1];
            if (audioPath) {
                await supabaseAdmin.storage
                    .from('video-assets')
                    .remove([audioPath]);
            }
        }

        if (video?.captions_url) {
            const captionsPath = video.captions_url.split('/video-assets/')[1];
            if (captionsPath) {
                await supabaseAdmin.storage
                    .from('video-assets')
                    .remove([captionsPath]);
            }
        }

        // Delete video record from database
        const { error: deleteError } = await supabaseAdmin
            .from('generated_video_assets')
            .delete()
            .eq('id', videoId);

        if (deleteError) {
            console.error("Error deleting video:", deleteError);
            throw deleteError;
        }

        return { success: true };
    } catch (error) {
        console.error("Failed to delete video:", error);
        return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
}
