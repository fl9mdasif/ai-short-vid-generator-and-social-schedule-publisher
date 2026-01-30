"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Play, Sparkles, Calendar, Zap, Video } from "lucide-react";

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
            <div className="absolute top-[20%] right-0 -z-10 h-[600px] w-[600px] rounded-full bg-purple-500/5 blur-[100px]" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-6 flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-400"
                    >
                        <Sparkles className="h-4 w-4" />
                        <span>AI-Powered Video Generation</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="max-w-4xl text-5xl font-extrabold tracking-tight text-white md:text-4xl lg:text-6xl"
                    >
                        Create Viral Shorts <br />
                        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            On Autopilot
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mt-8 max-w-2xl text-lg text-zinc-400 md:text-xl"
                    >
                        Generate high-engagement short videos for YouTube, TikTok, and Facebook using AI.
                        Schedule them across all platforms and grow your audience while you sleep.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-10 flex flex-col gap-4 sm:flex-row"
                    >
                        <Button size="lg" className="h-12 bg-indigo-600 px-8 text-lg font-semibold hover:bg-indigo-700">
                            Start Generating Free
                        </Button>
                        <Button size="lg" variant="outline" className="h-12 border-zinc-800 bg-zinc-900/50 px-8 text-lg font-semibold text-white hover:bg-zinc-800">
                            <Play className="mr-2 h-5 w-5 fill-white" /> Watch Demo
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="relative mt-20 w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-2 shadow-2xl backdrop-blur-sm"
                    >
                        <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-indigo-900/20 to-black p-8 flex items-center justify-center border border-white/5">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
                                {[
                                    { icon: Zap, label: "AI Generation", color: "text-yellow-400" },
                                    { icon: Calendar, label: "Auto Scheduler", color: "text-green-400" },
                                    { icon: Sparkles, label: "Smart Captions", color: "text-blue-400" },
                                    { icon: Video, label: "HD Export", color: "text-indigo-400" }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                                        <item.icon className={`h-8 w-8 ${item.color}`} />
                                        <span className="text-zinc-300 font-medium text-sm">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
