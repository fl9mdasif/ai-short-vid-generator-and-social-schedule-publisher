"use client";

import { UserButton } from "@clerk/nextjs";
import { MobileSidebar } from "./mobile-sidebar";
import { useState } from "react";
import { Menu } from "lucide-react";

interface HeaderProps {
    hasReachedLimit?: boolean;
    planName?: string;
    maxSeries?: number;
}

export function Header({ hasReachedLimit = false, planName = "Free", maxSeries = 1 }: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="flex h-16 w-full items-center justify-between px-6 border-b bg-white">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 -ml-2 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
                aria-label="Open Menu"
            >
                <Menu className="h-6 w-6" />
            </button>

            {/* Empty div for spacing on desktop since we justify-between now */}
            <div className="hidden md:block"></div>

            <UserButton
                afterSignOutUrl="/"
                appearance={{
                    elements: {
                        avatarBox: "h-10 w-10"
                    }
                }}
            />

            <MobileSidebar
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                hasReachedLimit={hasReachedLimit}
                planName={planName}
                maxSeries={maxSeries}
            />
        </header>
    );
}
