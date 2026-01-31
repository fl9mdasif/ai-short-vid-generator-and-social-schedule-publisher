"use client";

import { useCreateWizard } from "./create-wizard-context";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { saveWizardData } from "@/app/actions/save-wizard-data";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function WizardFooter() {
    const {
        currentStep,
        totalSteps,
        goToNextStep,
        goToPreviousStep,
        canGoToNextStep,
        formData,
        isSaving,
        setIsSaving
    } = useCreateWizard();

    const router = useRouter();
    const { toast } = useToast();

    const handleContinue = async () => {
        if (currentStep === totalSteps) {
            setIsSaving(true);
            try {
                const result = await saveWizardData(formData);
                if (result.success) {
                    if (toast) {
                        toast({
                            title: "Success",
                            description: "Your video generation has been scheduled!",
                        });
                    }
                    // Redirect or show success state
                    router.push("/dashboard");
                } else {
                    console.error("Save error:", result.error);
                    if (toast) {
                        toast({
                            title: "Error",
                            description: "Failed to save: " + result.error,
                            variant: "destructive"
                        });
                    }
                }
            } catch (error) {
                console.error("Critical save error:", error);
            } finally {
                setIsSaving(false);
            }
        } else {
            goToNextStep();
        }
    };

    return (
        <div className="mt-12 flex flex-col-reverse md:flex-row items-center justify-between border-t border-white/5 pt-8 gap-4">
            <div className="w-full md:w-auto flex justify-center md:justify-start">
                {currentStep > 1 && (
                    <Button
                        variant="default"
                        onClick={goToPreviousStep}
                        disabled={isSaving}
                        className="text-zinc-400 hover:text-black hover:bg-white/5 disabled:opacity-50"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                )}
            </div>

            <div className="flex gap-4">
                {/* Save Draft button could go here */}

                <Button
                    onClick={handleContinue}
                    disabled={!canGoToNextStep || isSaving}
                    className={`bg-indigo-600 text-white hover:bg-indigo-500 transition-all ${canGoToNextStep && !isSaving ? "opacity-100 shadow-[0_0_20px_rgba(79,70,229,0.4)]" : "opacity-50 cursor-not-allowed"
                        }`}
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            {currentStep === totalSteps ? "Schedule" : "Continue"}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
