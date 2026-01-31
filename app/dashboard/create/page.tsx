"use client";

import { CreateWizardProvider } from "@/components/dashboard/create/create-wizard-context";
import { WizardContent } from "@/components/dashboard/create/wizard-content";

export default function CreatePage() {
    return (
        <CreateWizardProvider>
            <WizardContent />
        </CreateWizardProvider>
    );
}
