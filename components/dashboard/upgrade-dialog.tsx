"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

interface UpgradeDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description: string;
}

export function UpgradeDialog({ open, onOpenChange, title = "Upgrade your plan", description }: UpgradeDialogProps) {
    const { openUserProfile } = useClerk();
    const router = useRouter();

    const handleUpgrade = () => {
        // Option 1: Direct to billing page
        // router.push("/dashboard/billing");

        // Option 2: Open Clerk Profile (Direct Checkout)
        // We can use the billing page or open the profile directly. 
        // Let's go to the billing page for now as it has the plan comparison.
        router.push("/dashboard/billing");
        onOpenChange(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="sm:max-w-md bg-white border-zinc-200 shadow-2xl z-[100] gap-6">
                <AlertDialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl">
                            <Sparkles className="w-5 h-5 text-indigo-600" />
                        </div>
                        <AlertDialogTitle className="text-xl font-bold text-zinc-900">{title}</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="text-base text-zinc-600 leading-relaxed">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-2">
                    <AlertDialogCancel className="border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900">
                        Maybe Later
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleUpgrade}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white border-0 shadow-lg shadow-indigo-500/20"
                    >
                        View Plans & Upgrade
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
