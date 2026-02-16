"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Play, Sparkles, Calendar, Zap, Video, Mic } from "lucide-react";
import Link from "next/link";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
} from "@/components/ui/dialog";

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
                            <Link href="/dashboard">Start Generating Free</Link>
                        </Button>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="lg" variant="outline" className="h-12 border-zinc-800 bg-zinc-900/50 px-8 text-lg font-semibold text-white hover:bg-zinc-800">
                                    <Play className="mr-2 h-5 w-5 fill-white" /> Watch Demo
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[800px] p-0 border-zinc-800 bg-black overflow-hidden">
                                <DialogTitle className="sr-only">Product Demo Video</DialogTitle>
                                <div className="aspect-video w-full">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src="https://www.youtube.com/embed/PXZi9plZ4iY?autoplay=1"

                                        title="Product Demo"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                </div>
                            </DialogContent>
                        </Dialog>
                    </motion.div>


                </div>
            </div>
        </section>
    );
}
