"use client";

import { useCreateWizard } from "./create-wizard-context";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function WizardFooter() {
    const {
        currentStep,
        totalSteps,
        goToNextStep,
        goToPreviousStep,
        canGoToNextStep
    } = useCreateWizard();

    return (
        <div className="mt-12 flex flex-col-reverse md:flex-row items-center justify-between border-t border-white/5 pt-8 gap-4">
            <div className="w-full md:w-auto flex justify-center md:justify-start">
                {currentStep > 1 && (
                    <Button
                        variant="default"
                        onClick={goToPreviousStep}
                        className="text-zinc-400 hover:text-black hover:bg-white/5"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                )}
            </div>

            <div className="flex gap-4">
                {/* Save Draft button could go here */}

                <Button
                    onClick={goToNextStep}
                    disabled={!canGoToNextStep}
                    className={`bg-indigo-600 text-white hover:bg-indigo-500 transition-all ${canGoToNextStep ? "opacity-100 shadow-[0_0_20px_rgba(79,70,229,0.4)]" : "opacity-50 cursor-not-allowed"
                        }`}
                >
                    {currentStep === totalSteps ? "Finish" : "Continue"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}
