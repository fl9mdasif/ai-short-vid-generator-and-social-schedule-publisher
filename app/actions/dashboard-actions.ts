"use server";

import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export type VideoSeries = {
    id: string;
    user_clerk_id: string;
    niche_type: string;
    selected_niche: string | null;
    custom_niche: string | null;
    custom_niche_description: string | null;
    series_name: string | null;
    duration: string | null;
    platform: string[] | null;
    publish_time: string | null;
    status: string;
    selected_video_style_id: string | null;

    // Additional fields for editing
    language_name: string | null;
    language_country_code: string | null;
    language_flag: string | null;
    language_model_name: string | null;
    language_model_code: string | null;
    voice_model: string | null;
    voice_model_name: string | null;
    voice_preview_url: string | null;
    voice_gender: string | null;
    selected_bg_music: string[] | null;
    selected_caption_style_id: string | null;

    created_at: string;
};

export async function getUserSeries() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return { success: false, error: "Unauthorized" };
        }

        console.log("[Dashboard] Fetching series for user:", userId);

        const { data, error } = await supabaseAdmin
            .from("video_generations")
            .select("*")
            .eq("user_clerk_id", userId)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching user series:", error);
            return { success: false, error: error.message };
        }

        console.log("[Dashboard] Found", data?.length || 0, "series for user:", userId);

        return { success: true, data: data as VideoSeries[] };
    } catch (error) {
        console.error("Unexpected error fetching user series:", error);
        return { success: false, error: "Unexpected error" };
    }
}

export async function getSeriesById(id: string) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return { success: false, error: "Unauthorized" };
        }

        const { data, error } = await supabaseAdmin
            .from("video_generations")
            .select("*")
            .eq("id", id)
            .eq("user_clerk_id", userId)
            .single();

        if (error) {
            console.error("Error fetching series:", error);
            return { success: false, error: error.message };
        }

        return { success: true, data: data as VideoSeries };
    } catch (error) {
        console.error("Unexpected error fetching series:", error);
        return { success: false, error: "Unexpected error" };
    }
}

export async function deleteSeries(id: string) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Unauthorized" };

        const { error } = await supabaseAdmin
            .from("video_generations")
            .delete()
            .eq("id", id)
            .eq("user_clerk_id", userId);

        if (error) {
            console.error("Error deleting series:", error);
            return { success: false, error: error.message };
        }

        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Unexpected error deleting series:", error);
        return { success: false, error: "Unexpected error" };
    }
}

export async function toggleSeriesStatus(id: string, currentStatus: string) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Unauthorized" };

        const newStatus = currentStatus === "paused" ? "active" : "paused"; // Simple toggle logic

        const { error } = await supabaseAdmin
            .from("video_generations")
            .update({ status: newStatus })
            .eq("id", id)
            .eq("user_clerk_id", userId);

        if (error) {
            console.error("Error updating series status:", error);
            return { success: false, error: error.message };
        }

        revalidatePath("/dashboard");
        return { success: true, newStatus };
    } catch (error) {
        console.error("Unexpected error updating series status:", error);
        return { success: false, error: "Unexpected error" };
    }
}
