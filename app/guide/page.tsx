
"use client";

import {
    LayoutGrid,
    Plus,
    Music,
    Type,
    Palette,
    CheckCircle2,
    Calendar,
    Share2,
    Settings,
    CreditCard,
    Rocket,
    Sparkles,
    Mic,
    Shield
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const timelineSteps = [
    {
        title: "Connect Social Accounts",
        description: "Before creating content, link your social platforms to enable auto-publishing.",
        icon: Share2,
        color: "bg-blue-500",
        glow: "shadow-blue-500/20",
        details: [
            "First create a new account or login if already have one",
            "Go to Settings > Social Accounts",
            "Connect YouTube (Free Tier available)",
            "Connect TikTok, Instagram, and Facebook (UPCOMING)",
            "Ensure valid permissions for publishing (UPCOMING)"
        ]
    },
    {
        title: "Start a New Series",
        description: "Begin by creating a new video series to organize your content themes.",
        icon: Plus,
        color: "bg-indigo-600",
        glow: "shadow-indigo-600/20",
        details: [
            "Click the 'New Series' button on the dashboard",
            "This opens the creation wizard",
            "Series allow you to group related videos"
        ]
    },
    {
        title: "1. Choose Your Niche",
        description: "Define the topic and direction for your video content.",
        icon: LayoutGrid,
        color: "bg-purple-500",
        glow: "shadow-purple-500/20",
        details: [
            "Select a pre-defined niche (e.g., Motivation, Facts)",
            "Or define your custom niche",
            "Tailors the AI content generation"
        ]
    },
    {
        title: "2. Select Language & Voice",
        description: "Pick the voiceover language and persona.",
        icon: Mic,
        color: "bg-pink-500",
        glow: "shadow-pink-500/20",
        details: [
            "Choose your target audience language",
            "Listen to previews of AI voices",
            "Select the perfect tone for your brand"
        ]
    },
    {
        title: "3. Background Music",
        description: "Set the mood with the right background track.",
        icon: Music,
        color: "bg-rose-500",
        glow: "shadow-rose-500/20",
        details: [
            "Browse the music library",
            "Select a track that fits your niche",
            "Adjust volume levels automatically"
        ]
    },
    {
        title: "4. Video Style",
        description: "Choose the visual aesthetic for your video.",
        icon: Palette,
        color: "bg-orange-500",
        glow: "shadow-orange-500/20",
        details: [
            "Select visual themes (e.g., Minimalist, Cinematic)",
            "Determines image generation style",
            "Consistent branding across the series"
        ]
    },
    {
        title: "5. Caption Style",
        description: "Customize how subtitles appear on your video.",
        icon: Type,
        color: "bg-amber-500",
        glow: "shadow-amber-500/20",
        details: [
            "Choose font, color, and animation",
            "Ensure readability",
            "Engage viewers with dynamic text"
        ]
    },
    {
        title: "6. Series Details & Schedule",
        description: "Finalize settings and set up your publishing schedule.",
        icon: Calendar,
        color: "bg-green-500",
        glow: "shadow-green-500/20",
        details: [
            "Series Name & Description",
            "Video Duration of each clip",
            "Precise Publish Time settings",
            "Platform destination toggles"
        ]
    },
    {
        title: "Generate & Publish",
        description: "Let the AI create your video.",
        icon: Sparkles,
        color: "bg-teal-500",
        glow: "shadow-teal-500/20",
        details: [
            "Click 'Generate' on your Series",
            "Status changes to 'Generating...'",
            "Manual review or auto-publish sync",
            "Cloud rendering via Remotion"
        ]
    },
    {
        title: "Billing & Plans",
        description: "Manage your subscription and credits.",
        icon: CreditCard,
        color: "bg-cyan-600",
        glow: "shadow-cyan-600/20",
        details: [
            "Monitor your credit usage",
            "Upgrade for unlimited series",
            "Secure Stripe-powered billing"
        ]
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5 }
    }
};

export default function GuidePage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30 selection:text-indigo-200 shadow-inner">

            <div className="pt-24 space-y-12 max-w-5xl mx-auto pb-20 px-4 md:px-0">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center md:text-left pt-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
                        <Rocket className="h-3 w-3" />
                        Onboarding
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
                        Master <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent italic">vidMaxx</span> AI
                    </h1>
                    <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed">
                        Welcome to the future of content creation. Follow this comprehensive guide
                        to automate your video production and social media growth.
                    </p>
                </motion.div>

                {/* Timeline Section */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative"
                >
                    {/* Glow Path Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500/20 via-purple-500/40 to-pink-500/20 hidden md:block" />

                    <div className="space-y-12">
                        {timelineSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="relative flex flex-col md:flex-row gap-8 group"
                            >
                                {/* Step Indicator */}
                                <div className="flex items-start md:w-16 flex-shrink-0 z-10">
                                    <div className={cn(
                                        "flex h-16 w-16 items-center justify-center rounded-2xl shadow-xl transition-all duration-500 group-hover:rotate-12",
                                        step.color,
                                        step.glow,
                                        "text-white border border-white/10"
                                    )}>
                                        <step.icon className="h-8 w-8" />
                                    </div>
                                </div>

                                {/* Content Card */}
                                <Card className="flex-1 bg-zinc-900/50 backdrop-blur-xl border border-white/5 shadow-2xl hover:border-indigo-500/30 hover:bg-zinc-900/80 transition-all duration-300 overflow-hidden">
                                    <CardHeader className="pb-3 border-b border-white/5 bg-white/5">
                                        <div className="flex items-center justify-between gap-4">
                                            <CardTitle className="text-2xl font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
                                                {step.title}
                                            </CardTitle>
                                            <div className="text-[10px] font-black px-2 py-1 bg-white/10 text-white/50 rounded border border-white/5 uppercase">
                                                Stage {index + 1}
                                            </div>
                                        </div>
                                        <CardDescription className="text-zinc-400 font-medium">
                                            {step.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <ul className="grid gap-3 sm:grid-cols-2">
                                            {step.details.map((detail, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-zinc-500 group/item">
                                                    <div className="mt-1 h-5 w-5 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 group-hover/item:border-indigo-500 transition-colors">
                                                        <CheckCircle2 className="h-3 w-3 text-indigo-500" />
                                                    </div>
                                                    <span className="group-hover/item:text-zinc-300 transition-colors">
                                                        {detail}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Premium CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 relative p-1 rounded-[2.5rem] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-3xl overflow-hidden"
                >
                    <div className="bg-zinc-950/90 backdrop-blur-xl rounded-[2.4rem] p-12 md:p-16 text-center relative z-10 overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 mb-8"
                        >
                            <Sparkles className="h-8 w-8" />
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
                            Infinite Creativity <br /> starts here.
                        </h2>
                        <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-10 font-medium">
                            You're just minutes away from your first viral video series.
                            Let's put your brand on creative autopilot.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
                            <Link href="/dashboard" className="group">
                                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-black h-14 px-10 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all group-hover:scale-105">
                                    <Plus className="mr-2 h-5 w-5" />
                                    START NEW SERIES
                                </Button>
                            </Link>
                            <Link href="/dashboard/settings" className="group">
                                <Button size="lg" variant="outline" className="text-white border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 h-14 px-10 rounded-2xl font-bold group-hover:scale-105">
                                    <Settings className="mr-2 h-5 w-5" />
                                    CONFIGURATION
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Support Footer */}
                <div className="flex items-center justify-center gap-8 pt-10 text-zinc-600 border-t border-white/5">
                    <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">Enterprise Secure</span>
                    </div>
                    <div className="h-1 w-1 rounded-full bg-zinc-800" />
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">Verified Workflows</span>
                    </div>
                </div>
            </div>

        </div>
    );
}
