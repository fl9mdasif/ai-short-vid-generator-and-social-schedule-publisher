"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type NicheType = "available" | "custom";

export interface CreateWizardData {
    id?: string;
    nicheType: NicheType;
    selectedNiche: string;
    customNiche: string;
    customNicheDescription: string;
    language?: {
        language: string;
        countryCode: string;
        countryFlag: string;
        modelName: string;
        modelLangCode: string;
    };
    voice?: {
        model: string;
        modelName: string;
        preview: string;
        gender: string;
    };
    selectedBgMusic: string[]; // List of selected music URLs
    selectedVideoStyle: string; // ID of selected video style
    selectedCaptionStyle: string; // ID of selected caption style
    seriesName: string;
    description: string; // Optional description to guide AI script generation
    duration: string;

    platform: string[];
    publishTime: string;
}

interface CreateWizardContextType {
    currentStep: number;
    totalSteps: number;
    formData: CreateWizardData;
    setFormData: React.Dispatch<React.SetStateAction<CreateWizardData>>;
    goToNextStep: () => void;
    goToPreviousStep: () => void;
    goToStep: (step: number) => void;
    canGoToNextStep: boolean;
    setCanGoToNextStep: (canGo: boolean) => void;
    isSaving: boolean;
    setIsSaving: (isSaving: boolean) => void;
    videoGenerationStatus: 'idle' | 'generating' | 'completed' | 'failed';
    setVideoGenerationStatus: React.Dispatch<React.SetStateAction<'idle' | 'generating' | 'completed' | 'failed'>>;
}

const CreateWizardContext = createContext<CreateWizardContextType | undefined>(undefined);

export function CreateWizardProvider({ children, initialData }: { children: ReactNode, initialData?: Partial<CreateWizardData> }) {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 6;
    const [formData, setFormData] = useState<CreateWizardData>({
        nicheType: "available",
        selectedNiche: "",
        customNiche: "",
        customNicheDescription: "",
        language: undefined,
        voice: undefined,
        selectedBgMusic: [],
        selectedVideoStyle: "",
        selectedCaptionStyle: "",
        seriesName: "",
        description: "", // NEW: Optional description
        duration: "",
        platform: [],
        publishTime: "",
        ...initialData
    });
    const [canGoToNextStep, setCanGoToNextStep] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [videoGenerationStatus, setVideoGenerationStatus] = useState<'idle' | 'generating' | 'completed' | 'failed'>('idle');

    const goToNextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1);
            setCanGoToNextStep(false); // Reset for next step
        }
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
            // Logic to re-evaluate canGoToNextStep if going back could include
            // checking if the previous step's data is valid.
            // For simplicity, we might assume valid if going back, or re-validate.
            // For now, let's keep it simple.
            setCanGoToNextStep(true);
        }
    };

    const goToStep = (step: number) => {
        // Basic validation to prevent skipping steps ahead without completion (optional)
        if (step >= 1 && step <= totalSteps) {
            setCurrentStep(step);
        }
    }

    return (
        <CreateWizardContext.Provider
            value={{
                currentStep,
                totalSteps,
                formData,
                setFormData,
                goToNextStep,
                goToPreviousStep,
                goToStep,
                canGoToNextStep,
                setCanGoToNextStep,
                isSaving,
                setIsSaving,
                videoGenerationStatus,
                setVideoGenerationStatus
            }}
        >
            {children}
        </CreateWizardContext.Provider>
    );
}


export function useCreateWizard() {
    const context = useContext(CreateWizardContext);
    if (context === undefined) {
        throw new Error("useCreateWizard must be used within a CreateWizardProvider");
    }
    return context;
}
