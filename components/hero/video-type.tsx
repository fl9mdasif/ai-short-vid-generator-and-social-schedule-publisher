"use client";

import { motion } from "framer-motion";
import { Youtube, Facebook, Music2, Mail, CheckCircle2, Globe, Clock, ShieldCheck } from "lucide-react";

const features = [
    {
        title: "YouTube Shorts",
        description: "AI-optimized titles, descriptions, and tags to hit the algorithm perfectly.",
        icon: Youtube,
        color: "bg-red-500/10 text-red-500",
    },
    {
        title: "TikTok & Reels",
        description: "Vertical video generation with trending music and smart transitions.",
        icon: Music2,
        color: "bg-cyan-500/10 text-cyan-500",
    },
    {
        title: "Facebook Watch",
        description: "Recycle your content and reach a massive audience on Facebook effortlessly.",
        icon: Facebook,
        color: "bg-blue-600/10 text-blue-600",
    },
    {
        title: "Email Marketing",
        description: "Embed high-quality video snippets in your email campaigns to boost CTR.",
        icon: Mail,
        color: "bg-amber-500/10 text-amber-500",
    },
];

const capabilities = [
    "Automatic AI Scriptwriting",
    "Cloud-based Video Rendering",
    "Smart Content Distribution",
    "Engagement Analytics",
    "Custom Branding & Watermarks",
    "Multi-Language Support",
];

export function VideoType() {
    return (
        <section id="platforms" className="py-24 bg-black scroll-mt-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">
                        Everything you need for <span className="text-indigo-500">Video Mastery</span>
                    </h2>
                    <p className="mt-4 text-zinc-400 max-w-[700px] mx-auto text-lg">
                        Our platform handles the entire process from ideation to publication, so you can focus on your brand.
                    </p>
                </div>



                <div className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-indigo-600/5 p-8 md:p-12 rounded-3xl border border-indigo-500/10">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-6 md:text-3xl">
                            Advanced Scheduling & <br /> AI Generation
                        </h3>
                        <div className="space-y-4">
                            {capabilities.map((cap, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-indigo-500" />
                                    <span className="text-zinc-300 font-medium">{cap}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-10 flex gap-4">
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-white">99%</span>
                                <span className="text-xs text-zinc-500 uppercase tracking-widest">Time Saved</span>
                            </div>
                            <div className="w-[1px] bg-zinc-800 self-stretch" />
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-white">10x</span>
                                <span className="text-xs text-zinc-500 uppercase tracking-widest">Reach increase</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative aspect-square md:aspect-video lg:aspect-square bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center p-6">
                        <div className="w-full h-full bg-zinc-950/80 rounded-xl border border-white/5 p-6 flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-indigo-400" />
                                    <span className="text-xs font-mono text-zinc-500">AUTO-MODE: ACTIVE</span>
                                </div>
                                <ShieldCheck className="h-4 w-4 text-green-500" />
                            </div>
                            <div className="space-y-4">
                                <div className="h-2 w-full bg-indigo-500/20 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        whileInView={{ width: "75%" }}
                                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                        className="h-full bg-indigo-500"
                                    />
                                </div>
                                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                                    <span>GENERATING VIDEO...</span>
                                    <span>75%</span>
                                </div>
                            </div>
                            <div className="mt-8 grid grid-cols-2 gap-2">
                                <div className="h-12 rounded-lg bg-zinc-900 border border-white/5" />
                                <div className="h-12 rounded-lg bg-zinc-900 border border-white/5" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative p-8 rounded-2xl border border-white/5 bg-zinc-900/50 hover:bg-zinc-900 transition-all hover:border-indigo-500/30"
                        >
                            <div className={`mb-4 inline-flex p-3 rounded-lg ${feature.color}`}>
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-zinc-400 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
