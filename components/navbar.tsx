"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Video, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function Navbar() {
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md"
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2">
                    <div className="rounded-lg bg-indigo-600 p-1">
                        <Video className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">
                        vid<span className="text-indigo-500">Maxx</span>
                    </span>
                </Link>

                <nav className="hidden items-center gap-8 md:flex">
                    <Link
                        href="#features"
                        className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                    >
                        Features
                    </Link>
                    <Link
                        href="#platforms"
                        className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                    >
                        Platforms
                    </Link>
                    <Link
                        href="#pricing"
                        className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                    >
                        Pricing
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <SignedOut>
                        <Link href="/sign-in">
                            <Button variant="ghost" className="hidden text-zinc-400 hover:text-white md:flex">
                                Log in
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button className="bg-indigo-600 font-semibold text-white hover:bg-indigo-700">
                                Get Started
                            </Button>
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <Link href="/dashboard">
                            <span className="text-zinc-400 hover:text-white">
                                Dashboard
                            </span>
                        </Link>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "h-10 w-10"
                                }
                            }}
                        />
                    </SignedIn>
                    <Button variant="ghost" size="icon" className="md:hidden text-white">
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </motion.header>
    );
}
