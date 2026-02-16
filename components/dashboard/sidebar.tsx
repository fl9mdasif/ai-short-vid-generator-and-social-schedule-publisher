"use client";

import { SidebarContent } from "@/components/dashboard/sidebar-content";

interface SidebarProps {
    hasReachedLimit?: boolean;
    planName?: string;
    maxSeries?: number;
}

export function Sidebar({ hasReachedLimit = false, planName = "Free", maxSeries = 1 }: SidebarProps) {
    return (
        <div className="h-full w-full border-r bg-white">
            <SidebarContent
                hasReachedLimit={hasReachedLimit}
                planName={planName}
                maxSeries={maxSeries}
            />
        </div>
    );
}
