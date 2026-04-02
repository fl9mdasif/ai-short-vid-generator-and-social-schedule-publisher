"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Users, Target, Rocket, Heart, Award, Zap } from "lucide-react";
import Image from "next/image";

const stats = [
    { label: "Videos Generated", value: "500k+" },
    { label: "Active Users", value: "50k+" },
    { label: "Social Reach", value: "100M+" },
    { label: "AI Models", value: "12+" },
];

const values = [
    {
        title: "Innovation first",
        description: "We are constantly pushing the boundaries of what AI can do in video production.",
        icon: Rocket,
    },
    {
        title: "Creator empowerment",
        description: "Our tools are designed to amplify human creativity, not replace it.",
        icon: Heart,
    },
    {
        title: "Quality driven",
        description: "We never compromise on the quality of the videos we help you create.",
        icon: Award,
    },
    {
        title: "Speed obsessed",
        description: "We know that in content creation, timing is everything.",
        icon: Zap,
    },
];

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30 selection:text-indigo-200">
            <Navbar />

            <main className="pt-32 pb-20">
                {/* Hero Section */}
                <section className="container mx-auto px-4 md:px-6 mb-24">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                                We are on a mission to <br />
                                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    democratize video creation
                                </span>
                            </h1>
                            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                                vidMaxx was born from a simple idea: that everyone should be able to create 
                                high-quality, viral-worthy content without needing expensive equipment 
                                or years of technical training.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Our Story / Mission */}
                <section className="container mx-auto px-4 md:px-6 mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-indigo-600/20 rounded-full blur-2xl" />
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl" />
                            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
                                <Image
                                    src="/api/placeholder/800/450"
                                    alt="Our Mission"
                                    width={800}
                                    height={450}
                                    className="object-cover opacity-60 mix-blend-luminosity"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Target className="h-16 w-16 text-indigo-500 opacity-80" />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <span className="p-2 bg-indigo-600/10 rounded-lg text-indigo-500">
                                    <Users className="h-6 w-6" />
                                </span>
                                Our Story
                            </h2>
                            <div className="space-y-4 text-zinc-400 text-lg leading-relaxed">
                                <p>
                                    Founded in 2024, vidMaxx started as a small team of AI enthusiasts 
                                    and content creators who were tired of the manual grind of scriptwriting, 
                                    editing, and scheduling.
                                </p>
                                <p>
                                    We saw the potential of Large Language Models and generative AI 
                                    to handle the heavy lifting, allowing creators to focus on what matters 
                                    most: their vision and their audience.
                                </p>
                                <p>
                                    Today, vidMaxx is a comprehensive platform that handles everything 
                                    from initial idea brainstorming to auto-publishing across the web.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="bg-zinc-950 border-y border-white/5 py-16 mb-32">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="text-center"
                                >
                                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-zinc-500 uppercase tracking-widest text-xs font-semibold">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="container mx-auto px-4 md:px-6 mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Values that drive us</h2>
                        <p className="text-zinc-500 max-w-xl mx-auto">
                            The principles that guide our development and how we serve our community.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="p-8 rounded-2xl border border-white/5 bg-zinc-900/50 hover:bg-zinc-800/50 transition-all duration-300 group"
                            >
                                <div className="mb-6 inline-flex p-3 rounded-xl bg-indigo-600/10 text-indigo-500 group-hover:scale-110 transition-transform duration-300">
                                    <value.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                                    {value.title}
                                </h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative p-12 md:p-20 rounded-3xl overflow-hidden border border-indigo-500/20 bg-indigo-950/10 text-center"
                    >
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/5 to-purple-600/5 -z-10" />
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to join the revolution?</h2>
                        <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
                            Start creating viral-worthy videos in seconds with our state-of-the-art AI platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/25">
                                Get Started Free
                            </button>
                            <button className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-xl border border-white/5 transition-all">
                                View Pricing
                            </button>
                        </div>
                    </motion.div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
