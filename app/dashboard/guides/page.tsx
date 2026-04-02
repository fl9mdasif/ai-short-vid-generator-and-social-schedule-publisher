"use client";

import { BookOpen, ArrowRight, Lightbulb, Zap, Rocket } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function DashboardGuidePage() {
    return (
        <div className="p-6 md:p-10 space-y-10 max-w-4xl">
            {/* Header */}
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
                    <Rocket className="h-3 w-3" />
                    Dashboard Guide
                </div>
                <h1 className="text-3xl font-black text-zinc-900 tracking-tight uppercase italic">
                    Quick Start <span className="text-zinc-400 font-medium">&</span> Tips
                </h1>
                <p className="text-zinc-500 text-lg leading-relaxed">
                    Get up and running with vidMaxx in minutes. Follow these essential tips to create your first viral series.
                </p>
            </div>

            {/* Short Guide Article */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-zinc-200">
                    <CardHeader className="pb-3">
                        <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 mb-2">
                            <Lightbulb className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-lg font-bold">Find Your Niche</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-zinc-600 leading-relaxed">
                        Success starts with a clear topic. Whether it's "Stoic Quotes" or "Random Facts," sticking to one niche helps the AI generate more consistent and engaging content for your audience.
                    </CardContent>
                </Card>

                <Card className="border-zinc-200">
                    <CardHeader className="pb-3">
                        <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-2">
                            <Zap className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-lg font-bold">Automate Everything</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-zinc-600 leading-relaxed">
                        Don't just make one video. Use the **Series** feature to batch-produce content. Set your schedule once, and vidMaxx will handle the creation and publishing on autopilot.
                    </CardContent>
                </Card>
            </div>

            {/* Read Full Guide CTA */}
            <div className="bg-zinc-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                    <BookOpen className="h-40 w-40 rotate-12" />
                </div>
                
                <div className="relative z-10 space-y-6">
                    <h2 className="text-3xl font-black uppercase tracking-tighter italic">
                        Need a deep dive?
                    </h2>
                    <p className="text-zinc-400 max-w-xl font-medium text-lg leading-relaxed">
                        Check out our full interactive guide for step-by-step instructions on connecting social accounts, picking the right AI voices, and mastering video styles.
                    </p>
                    
                    <Link href="/guide">
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-black h-14 px-10 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all group">
                            READ FULL GUIDE
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
