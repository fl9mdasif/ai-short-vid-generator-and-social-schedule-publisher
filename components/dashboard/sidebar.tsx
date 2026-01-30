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
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
    { name: "Series", href: "/dashboard/series", icon: LayoutGrid },
    { name: "Videos", href: "/dashboard/videos", icon: Video },
    { name: "Guides", href: "/dashboard/guides", icon: BookOpen },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-72 flex-col border-r bg-white">
            {/* Header / Logo */}
            <div className="flex h-16 items-center px-6 border-b">
                <Link href="/dashboard" className="flex items-center gap-2">
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

            <div className="flex flex-1 flex-col justify-between px-4 py-6">
                <div className="space-y-6">
                    {/* Create New Series Button */}
                    <Button className="w-full justify-start gap-2 h-12 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all hover:scale-[1.02]">
                        <Plus className="h-5 w-5" />
                        Create New Series
                    </Button>

                    {/* Navigation Links */}
                    <nav className="space-y-2">
                        {sidebarLinks.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
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
                        href="/dashboard/upgrade"
                        className="flex items-center gap-3 rounded-lg px-4 py-3.5 text-base font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                    >
                        <ArrowUpCircle className="h-6 w-6 text-amber-500" />
                        Upgrade Plan
                    </Link>
                    <Link
                        href="/user-profile" // Helper link for Clerk user profile often handled by UserButton component but adding manual link as requested
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
