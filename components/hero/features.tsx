"use client";

import { motion } from "framer-motion";
import {
    FileText,
    Image as ImageIcon,
    Mic,
    Captions,
    Video,
    Calendar,
    Settings,
    BarChart3
} from "lucide-react";

const features = [
    {
        title: "AI Script Generation",
        description: "Generate engaging scripts tailored to your niche instantly using advanced LLMs.",
        icon: FileText,
        color: "bg-indigo-500/10 text-indigo-500",
        delay: 0.1
    },
    {
        title: "AI Image Generation",
        description: "Create stunning, consistent visuals that perfectly match your story scenes.",
        icon: ImageIcon,
        color: "bg-purple-500/10 text-purple-500",
        delay: 0.2
    },
    {
        title: "AI Voiceover",
        description: "Human-like voiceovers in multiple languages, accents, and emotional tones.",
        icon: Mic,
        color: "bg-pink-500/10 text-pink-500",
        delay: 0.3
    },
    {
        title: "Smart Captions",
        description: "Auto-generated, animated captions that keep viewers glued to the screen.",
        icon: Captions,
        color: "bg-amber-500/10 text-amber-500",
        delay: 0.4
    },
    {
        title: "AI Render Video",
        description: "High-quality video rendering in the cloud. No powerful PC required.",
        icon: Video,
        color: "bg-cyan-500/10 text-cyan-500",
        delay: 0.5
    },
    {
        title: "Auto Schedule",
        description: "Set your schedule once and let our system auto-publish to all platforms.",
        icon: Calendar,
        color: "bg-green-500/10 text-green-500",
        delay: 0.6
    },
    {
        title: "Role & Settings",
        description: "Customize brand colors, fonts, and output formats to fit your identity.",
        icon: Settings,
        color: "bg-zinc-500/10 text-zinc-400",
        delay: 0.7
    },
    {
        title: "Growth Analytics",
        description: "Track performance across platforms to optimize your content strategy.",
        icon: BarChart3,
        color: "bg-rose-500/10 text-rose-500",
        delay: 0.8
    }
];

export function Features() {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl mb-6">
                            Powered by <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Advanced AI</span>
                        </h2>
                        <p className="text-zinc-400 max-w-[700px] mx-auto text-lg leading-relaxed">
                            Our comprehensive suite of AI tools handles every aspect of video production,
                            delivering professional results in seconds.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: feature.delay, duration: 0.5 }}
                            className="group relative p-6 rounded-2xl border border-white/5 bg-zinc-900/50 hover:bg-zinc-800/80 transition-all duration-300 hover:border-white/10 hover:translate-y-[-5px]"
                        >
                            <div className={`mb-6 inline-flex p-3 rounded-xl ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className="h-6 w-6" />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                                {feature.title}
                            </h3>

                            <p className="text-zinc-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
