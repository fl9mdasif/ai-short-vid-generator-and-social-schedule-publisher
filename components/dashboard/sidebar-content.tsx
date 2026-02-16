"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    LayoutGrid,
    Video,
    BookOpen,
    CreditCard,
    Settings,
    Plus,
    ArrowUpCircle,
    User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CreateSeriesButton } from "@/components/dashboard/create-series-button";

const sidebarLinks = [
    { name: "Series", href: "/dashboard", icon: LayoutGrid },
    { name: "Videos", href: "/dashboard/videos", icon: Video },
    { name: "Guides", href: "/dashboard/guides", icon: BookOpen },
    // { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarContentProps {
    className?: string;
    onClick?: () => void; // Optional click handler for mobile close
    hasReachedLimit?: boolean;
    planName?: string;
    maxSeries?: number;
}

export function SidebarContent({ className, onClick, hasReachedLimit = false, planName = "Free", maxSeries = 1 }: SidebarContentProps) {
    const pathname = usePathname();

    return (
        <div className={cn("flex h-full flex-col bg-white", className)}>
            {/* Header / Logo */}
            <div className="flex h-16 items-center px-6 border-b">
                <Link href="/" className="flex items-center gap-2" onClick={onClick}>
                    <div className="relative h-8 w-8">
                        <Image
                            src="/logo.png"
                            alt="VidMaxx Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        VidMaxx
                    </span>
                </Link>
            </div>

            <div className="flex flex-1 flex-col justify-between px-4 py-6 overflow-y-auto">
                <div className="space-y-6">
                    {/* Create New Series Button */}
                    <div onClick={onClick}>
                        <CreateSeriesButton
                            hasReachedLimit={hasReachedLimit}
                            planName={planName}
                            maxSeries={maxSeries}
                            className="mb-6 mt-2 w-full justify-start gap-2 h-12 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all hover:scale-[1.02]"
                        />
                    </div>

                    {/* Navigation Links */}
                    <nav className="space-y-2">
                        {sidebarLinks.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={onClick}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-4 py-3.5 text-base font-medium transition-colors",
                                        isActive
                                            ? "bg-indigo-50 text-indigo-700"
                                            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                                    )}
                                >
                                    <item.icon className={cn("h-6 w-6", isActive ? "text-indigo-600" : "text-zinc-400")} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Footer Options */}
                <div className="space-y-2 border-t pt-6">
                    <Link
                        href="/dashboard/billing"
                        onClick={onClick}
                        className="flex items-center gap-3 rounded-lg px-4 py-3.5 text-base font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                    >
                        <ArrowUpCircle className="h-6 w-6 text-amber-500" />
                        Billing & Upgrade Plan
                    </Link>
                    <Link
                        href="/dashboard/user-profile"
                        onClick={onClick}
                        className="flex items-center gap-3 rounded-lg px-4 py-3.5 text-base font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                    >
                        <User className="h-6 w-6 text-zinc-400" />
                        Profile Setting
                    </Link>
                </div>
            </div>
        </div>
    );
}
