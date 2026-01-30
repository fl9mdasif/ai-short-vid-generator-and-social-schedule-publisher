"use client";

import { useCreateWizard } from "./create-wizard-context";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function WizardStepper() {
    const { currentStep, totalSteps = 6 } = useCreateWizard();

    return (
        <div className="w-full mb-8">
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-indigo-500 tracking-wider uppercase">
                    Step {currentStep} of {totalSteps}
                </span>
            </div>

            <div className="flex gap-2 w-full">
                {Array.from({ length: totalSteps }).map((_, index) => {
                    const stepNumber = index + 1;
                    // If current step is 1, only 1st bar should be filled.
                    // If current step is 2, 1st and 2nd bars should be filled.
                    const isActive = stepNumber <= currentStep;

                    return (
                        <div
                            key={index}
                            className="h-1.5 flex-1 rounded-full bg-zinc-800 overflow-hidden relative"
                        >
                            <motion.div
                                className="absolute inset-0 bg-indigo-600 rounded-full"
                                initial={{ x: "-100%" }}
                                animate={{
                                    x: isActive ? "0%" : "-100%"
                                }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
