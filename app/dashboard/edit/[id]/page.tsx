import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSeriesById } from "@/app/actions/dashboard-actions";
import { CreateWizardProvider, CreateWizardData, NicheType } from "@/components/dashboard/create/create-wizard-context";
import { WizardContent } from "@/components/dashboard/create/wizard-content";

interface EditPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditPage({ params }: EditPageProps) {
    const { id } = await params;
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const { success, data, error } = await getSeriesById(id);

    if (!success || !data) {
        // Handle error or redirect
        console.error("Failed to fetch series for edit:", error);
        redirect("/dashboard");
    }

    // Map DB data to wizard format
    const initialData: Partial<CreateWizardData> = {
        id: data.id,
        nicheType: (data.niche_type as NicheType) || "available",
        selectedNiche: data.selected_niche || "",
        customNiche: data.custom_niche || "",
        customNicheDescription: data.custom_niche_description || "",
        // Note: Language and Voice properties are flattened in DB but nested in Wizard
        // We need to reconstruct them if possible, or ensure the wizard can handle partials.
        // Based on save-wizard-data mapping:
        language: data.language_name ? {
            language: data.language_name,
            countryCode: data.language_country_code || "",
            countryFlag: data.language_flag || "",
            modelName: data.language_model_name || "",
            modelLangCode: data.language_model_code || "",
        } : undefined,
        voice: data.voice_model ? {
            model: data.voice_model,
            modelName: data.voice_model_name || "",
            preview: data.voice_preview_url || "",
            gender: data.voice_gender || "",
        } : undefined,

        selectedBgMusic: data["selected_bg_music"] || [],
        selectedVideoStyle: data.selected_video_style_id || "",
        selectedCaptionStyle: data["selected_caption_style_id"] || "",
        seriesName: data.series_name || "",
        duration: data.duration || "",
        platform: data.platform || [],
        publishTime: data.publish_time || "",
    };

    return (
        <CreateWizardProvider initialData={initialData}>
            <WizardContent />
        </CreateWizardProvider>
    );
}
