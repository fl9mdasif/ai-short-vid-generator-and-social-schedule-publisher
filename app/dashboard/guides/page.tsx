"use client";

import {
    LayoutGrid,
    Video,
    BookOpen,
    CreditCard,
    Settings,
    Plus,
    Music,
    Type,
    Palette,
    Youtube,
    Facebook,
    Instagram,
    Mail,
    Clock,
    CheckCircle2,
    Play,
    Calendar,
    Share2,
    Info,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const timelineSteps = [
    {
        title: "Connect Social Accounts",
        description: "Before creating content, link your social platforms to enable auto-publishing.",
        icon: Share2,
        color: "bg-blue-500",
        details: [
            "Go to Settings > Social Accounts",
            "Connect YouTube (Free Tier available)",
            "Connect TikTok, Instagram, and Facebook",
            "Ensure valid permissions for publishing"
        ]
    },
    {
        title: "Start a New Series",
        description: "Begin by creating a new video series to organize your content themes.",
        icon: Plus,
        color: "bg-indigo-600",
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
        details: [
            "Select a pre-defined niche (e.g., Motivation, Facts)",
            "Or define your custom niche",
            "Tailors the AI content generation"
        ]
    },
    {
        title: "2. Select Language & Voice",
        description: "Pick the voiceover language and persona.",
        icon: Info, // Using Info as a placeholder for voice/language
        color: "bg-pink-500",
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
        details: [
            "**Series Name**: e.g., 'Daily Stoic Wisdom'",
            "**Description**: Context for the AI",
            "**Video Duration**: Length of each clip",
            "**Publish Time**: When to post",
            "**Platforms**: Select TikTok, YouTube, Instagram, Facebook, Email"
        ]
    },
    {
        title: "Generate & Publish",
        description: "Let the AI create your video.",
        icon: Play,
        color: "bg-teal-500",
        details: [
            "Click 'Generate' on your Series card",
            "Status changes to 'Generating...'",
            "Once processed, it appears in the 'Videos' tab",
            "Auto-publishes at your scheduled time"
        ]
    },
    {
        title: "Billing & Plans",
        description: "Manage your subscription and credits.",
        icon: CreditCard,
        color: "bg-cyan-600",
        details: [
            "Monitor your credit usage",
            "Upgrade for more videos/series",
            "View billing history"
        ]
    }
];

export default function GuidePage() {
    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-12">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Getting Started Guide
                </h1>
                <p className="text-zinc-500 mt-2 text-lg">
                    Master the art of automated video creation in a few simple steps.
                </p>
            </div>

            <div className="relative">
                {/* Vertical Line for Timeline */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-indigo-100 hidden md:block" />

                <div className="space-y-12">
                    {timelineSteps.map((step, index) => (
                        <div key={index} className="relative flex flex-col md:flex-row gap-8 group">
                            {/* Step Number/Icon */}
                            <div className="flex items-start md:w-16 flex-shrink-0 z-10">
                                <div className={cn(
                                    "flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg transition-transform group-hover:scale-110",
                                    step.color,
                                    "text-white"
                                )}>
                                    <step.icon className="h-8 w-8" />
                                </div>
                            </div>

                            {/* Content Card */}
                            <Card className="flex-1 border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ring-1 ring-zinc-200/50">
                                <CardHeader className="pb-3 bg-gradient-to-r from-zinc-50/50 to-white">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-xl font-bold text-zinc-800">
                                            {step.title}
                                        </CardTitle>
                                        <span className="text-xs font-semibold px-3 py-1 bg-zinc-100 text-zinc-500 rounded-full uppercase tracking-wider">
                                            Step {index}
                                        </span>
                                    </div>
                                    <CardDescription className="text-base text-zinc-600 font-medium">
                                        {step.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-4 bg-white">
                                    <ul className="grid gap-3 sm:grid-cols-2">
                                        {step.details.map((detail, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                                                <CheckCircle2 className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                                                <span>{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 md:p-12 text-center text-white shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/noise.png')]"></div>
                <div className="relative z-10 space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold">Ready to Create Your First Masterpiece?</h2>
                    <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
                        Join thousands of creators automating their content strategy. Start your journey now.
                    </p>
                    <div className="flex justify-center gap-4 pt-4">
                        <Link href="/dashboard">
                            <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 border-none font-bold h-12 px-8 shadow-lg text-lg">
                                <Plus className="mr-2 h-5 w-5" />
                                Create New Series
                            </Button>
                        </Link>
                        <Link href="/dashboard/settings">
                            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 hover:text-white bg-transparent h-12 px-8 text-lg">
                                <Settings className="mr-2 h-5 w-5" />
                                Configure Settings
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
