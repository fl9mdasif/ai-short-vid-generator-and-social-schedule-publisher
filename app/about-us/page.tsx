"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Users, Target, Rocket, Heart, Award, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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


            <main className="pt-32 pb-20">


                {/* Our Story Section - Row 1: Intro */}
                <section className="container mx-auto px-4 md:px-6 mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tighter leading-tight">
                            The Story of vidMaxx: <br />
                            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                From Manual Grind to Creative Autopilot
                            </span>
                        </h2>
                        <div className="space-y-6 text-zinc-400 text-lg md:text-xl leading-relaxed">
                            <p>
                                Every great idea starts with a "Why." For us: <span className="text-white font-medium">Why is creating a 60-second video so exhausting?</span>
                            </p>
                            <p>
                                In 2024, our team of AI enthusiasts realized that millions of potential creators were being silenced—not by a lack of ideas, but by the "Manual Grind." Writing scripts, recording voiceovers, finding visuals, and hours of tedious editing were killing creativity before it could even breathe.
                            </p>
                        </div>
                    </motion.div>
                </section>

                {/* Our Story Section - Row 2: Challenges & Solutions */}
                <section className="container mx-auto px-4 md:px-6 mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                        {/* Column 1: The Challenge */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="p-8 md:p-10 rounded-3xl border border-white/5 bg-zinc-900/10 backdrop-blur-sm relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Rocket className="h-32 w-32" />
                            </div>
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                <span className="p-2 bg-indigo-600/10 rounded-lg text-indigo-500">
                                    <Zap className="h-6 w-6" />
                                </span>
                                🛠️ The Challenge
                            </h3>
                            <p className="text-zinc-400 mb-8 italic text-sm">
                                Building vidMaxx wasn't just about calling an API. As engineers, we faced real-world hurdles that most people don't see:
                            </p>

                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        <strong className="text-white block mb-1">The Sync Struggle:</strong>
                                        Perfecting the word-level synchronization between AI-generated voices and energetic captions.
                                    </p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500 shrink-0" />
                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        <strong className="text-white block mb-1">The Infrastructure Wall:</strong>
                                        Building a scalable, serverless rendering engine using <span className="text-indigo-400 font-medium">AWS Lambda</span> and <span className="text-indigo-400 font-medium">Remotion</span>.
                                    </p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-pink-500 shrink-0" />
                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        <strong className="text-white block mb-1">The Human Touch:</strong>
                                        Tuning <span className="text-indigo-400 font-medium">LLMs</span> like Gemini Pro to write scripts that actually feel viral-ready.
                                    </p>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Column 2: A Solution for Millions */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col justify-center"
                        >
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                <span className="p-2 bg-purple-600/10 rounded-lg text-purple-500">
                                    <Heart className="h-6 w-6" />
                                </span>
                                🌏 A Solution for Millions
                            </h3>
                            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
                                <p>
                                    We built vidMaxx to give every person with a smartphone the power of a full-scale production house. We took the "heavy lifting" of the backend—the rendering, the syncing, and the scheduling—and moved it to the cloud.
                                </p>
                                <p>
                                    Today, vidMaxx isn't just a tool; it's a bridge. It’s for the small business owner in Dhaka, the educator in London, and the storyteller in New York.
                                </p>
                                <p className="text-white font-medium p-6 rounded-2xl bg-indigo-600/5 border border-indigo-500/10 shadow-inner">
                                    We solve the technical friction so that millions can focus on what truly matters: <span className="text-indigo-400">their vision and their audience.</span>
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Our Story Section - Row 3: Full Width Image */}
                <section className="container mx-auto px-4 md:px-6 mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl group"
                    >
                        <Image
                            src="https://i.ibb.co/QFyZLhxS/blob.jpg"
                            alt="The vidMaxx Team Journey"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 md:p-12">
                            <div className="max-w-xl">
                                <p className="text-sm font-semibold tracking-widest text-indigo-400 uppercase mb-2">Our Mission</p>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Empowering the next generation of storytellers.</h3>
                                <div className="h-1 w-20 bg-indigo-600 rounded-full" />
                            </div>
                        </div>
                    </motion.div>
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
                                <Link href="/dashboard/create">
                                    Get Started Free
                                </Link>
                            </button>

                        </div>
                    </motion.div>
                </section>
            </main>


        </div>
    );
}
