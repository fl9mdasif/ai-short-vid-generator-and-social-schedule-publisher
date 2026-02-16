"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UpgradeDialog } from "@/components/dashboard/upgrade-dialog";

interface CreateSeriesButtonProps {
    hasReachedLimit: boolean;
    planName: string;
    maxSeries: number;
    className?: string; // Allow passing styles
    variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"; // Match Button variants
}

export function CreateSeriesButton({
    hasReachedLimit,
    planName,
    maxSeries,
    className,
    variant = "default"
}: CreateSeriesButtonProps) {
    const router = useRouter();
    const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);

    const handleClick = () => {
        if (hasReachedLimit) {
            setShowUpgradeDialog(true);
        } else {
            router.push("/dashboard/create");
        }
    };

    return (
        <>
            <Button
                onClick={handleClick}
                variant={variant}
                className={className}
            >
                {variant === "default" && <Plus className="mr-2 h-4 w-4" />}
                {variant === "outline" ? "Create Series" : "Create New Series"}
            </Button>

            <UpgradeDialog
                open={showUpgradeDialog}
                onOpenChange={setShowUpgradeDialog}
                title="Limit Reached"
                description={`You've reached the maximum of ${maxSeries} series for your ${planName} plan. Upgrade to create more.`}
            />
        </>
    );
}
