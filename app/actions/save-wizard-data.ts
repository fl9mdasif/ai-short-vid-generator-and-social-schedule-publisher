"use server";

import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { CreateWizardData } from "@/components/dashboard/create/create-wizard-context";

export async function saveWizardData(data: CreateWizardData) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { success: false, error: "Unauthorized" };
        }

        // Prepare data for insertion matching the SQL schema
        const dbData = {
            user_clerk_id: userId,
            niche_type: data.nicheType,
            selected_niche: data.selectedNiche || null,
            custom_niche: data.customNiche || null,
            custom_niche_description: data.customNicheDescription || null,

            language_name: data.language?.language || null,
            language_country_code: data.language?.countryCode || null,
            language_flag: data.language?.countryFlag || null,
            language_model_name: data.language?.modelName || null,
            language_model_code: data.language?.modelLangCode || null,

            voice_model: data.voice?.model || null,
            voice_model_name: data.voice?.modelName || null,
            voice_preview_url: data.voice?.preview || null,
            voice_gender: data.voice?.gender || null,

            selected_bg_music: data.selectedBgMusic || [],
            selected_video_style_id: data.selectedVideoStyle || null,
            selected_caption_style_id: data.selectedCaptionStyle || null,

            series_name: data.seriesName || null,
            duration: data.duration || null,
            platform: data.platform || [],
            publish_time: data.publishTime || null,

            status: "pending"
        };

        if (data.id) {
            // Update existing record
            const { data: updatedData, error } = await supabase
                .from("video_generations")
                .update(dbData)
                .eq("id", data.id)
                .eq("user_clerk_id", userId)
                .select()
                .single();

            if (error) {
                console.error("Error updating wizard data:", error);
                return { success: false, error: error.message };
            }
            return { success: true, data: updatedData };
        } else {
            // Insert new record
            const { data: insertedData, error } = await supabase
                .from("video_generations")
                .insert(dbData)
                .select()
                .single();

            if (error) {
                console.error("Error saving wizard data:", error);
                return { success: false, error: error.message };
            }
            return { success: true, data: insertedData };
        }

    } catch (error) {
        console.error("Unexpected error saving wizard data:", error);
        return { success: false, error: "An unexpected error occurred" };
    }
}
