"use client";

// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Assuming shadcn Sheet is available since user asked for standard practices, otherwise I will use Framer Motion custom drawer if Sheet is not present.
// Wait, I checked for sheet earlier and found 0 results in ui folder. 
// Step 333: Found 0 results for *sheet*. 
// So I must build a custom one using Framer Motion as planned or create the sheet component first.
// The plan said "Uses Framer Motion for slide-in drawer effect".
// I'll stick to Framer Motion to avoid dependency assumption issues.

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SidebarContent } from "./sidebar-content";
import { useEffect } from "react";

interface MobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    hasReachedLimit?: boolean;
    planName?: string;
    maxSeries?: number;
}

export function MobileSidebar({ isOpen, onClose, hasReachedLimit = false, planName = "Free", maxSeries = 1 }: MobileSidebarProps) {
    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm md:hidden"
                    />

                    {/* Sidebar Drawer */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 left-0 z-[101] w-72 bg-white shadow-xl md:hidden"
                    >
                        <div className="absolute right-4 top-4 z-50">
                            <button
                                onClick={onClose}
                                className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <SidebarContent
                            onClick={onClose}
                            hasReachedLimit={hasReachedLimit}
                            planName={planName}
                            maxSeries={maxSeries}
                        />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
