"use client";

import { CreateWizardProvider, useCreateWizard } from "@/components/dashboard/create/create-wizard-context";
import { WizardStepper } from "@/components/dashboard/create/wizard-stepper";
import { WizardFooter } from "@/components/dashboard/create/wizard-footer";
import { NicheSelection } from "@/components/dashboard/create/steps/niche-selection";
import { VoiceSelection } from "@/components/dashboard/create/steps/voice-selection";
import { motion, AnimatePresence } from "framer-motion";

function WizardContent() {
    const { currentStep } = useCreateWizard();

    return (
        <div className="flex flex-col min-h-[calc(100vh-120px)] max-w-5xl mx-auto px-4 py-8">
            <div className="mb-8">
                <WizardStepper />
            </div>

            <div className="flex-1 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                    >
                        {currentStep === 1 && <NicheSelection />}
                        {currentStep === 2 && <VoiceSelection />}
                        {currentStep > 2 && (
                            <div className="flex flex-col items-center justify-center h-[400px] text-zinc-500">
                                <p className="text-xl">Step {currentStep} Content Placeholder</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <WizardFooter />
        </div>
    );
}

export default function CreatePage() {
    return (
        <CreateWizardProvider>
            <WizardContent />
        </CreateWizardProvider>
    );
}
