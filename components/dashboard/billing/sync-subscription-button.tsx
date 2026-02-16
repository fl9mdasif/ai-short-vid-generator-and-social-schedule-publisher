"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { syncUserPlan } from "@/app/actions/billing-actions";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SyncSubscriptionButton() {
    const { toast } = useToast();
    const router = useRouter();
    const [isSyncing, setIsSyncing] = useState(false);

    const handleSync = async () => {
        setIsSyncing(true);
        try {
            const result = await syncUserPlan();
            if (result.success) {
                toast({
                    title: "Subscription Synced",
                    description: `Your plan is now: ${result.plan}`,
                });
                router.refresh();
            } else {
                toast({
                    title: "Sync Failed",
                    description: result.error || "Could not sync subscription.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Sync error:", error);
            toast({
                title: "Error",
                description: "An unexpected error occurred.",
                variant: "destructive",
            });
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleSync}
            disabled={isSyncing}
            className="gap-2"
        >
            <RefreshCw className={`h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
            {isSyncing ? "Syncing..." : "Sync Subscription"}
        </Button>
    );
}
