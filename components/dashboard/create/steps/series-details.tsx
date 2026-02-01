"use client";

import { useCreateWizard } from "../create-wizard-context";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Youtube, Instagram, Mail } from "lucide-react";

// Platform icons mapping
const platforms = [
    {
        id: "tiktok",
        name: "TikTok",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
        ),
        activeColor: "border-black",
        activeBg: "bg-zinc-100",
        iconColor: "text-black",
        checkboxColor: "bg-black"
    },
    {
        id: "youtube",
        name: "YouTube",
        icon: <Youtube className="w-6 h-6" />,
        activeColor: "border-red-600",
        activeBg: "bg-red-50",
        iconColor: "text-red-600",
        checkboxColor: "bg-red-600"
    },
    {
        id: "instagram",
        name: "Instagram",
        icon: <Instagram className="w-6 h-6" />,
        activeColor: "border-pink-600",
        activeBg: "bg-pink-50",
        iconColor: "text-pink-600",
        checkboxColor: "bg-pink-600"
    },
    {
        id: "facebook",
        name: "Facebook",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
        ),
        activeColor: "border-blue-600",
        activeBg: "bg-blue-50",
        iconColor: "text-blue-600",
        checkboxColor: "bg-blue-600"
    },
    {
        id: "email",
        name: "Email",
        icon: <Mail className="w-6 h-6" />,
        activeColor: "border-indigo-600",
        activeBg: "bg-indigo-50",
        iconColor: "text-indigo-600",
        checkboxColor: "bg-indigo-600"
    },
];

export function SeriesDetails() {
    const { formData, setFormData, setCanGoToNextStep } = useCreateWizard();

    useEffect(() => {
        const isValid =
            formData.seriesName.length > 0 &&
            formData.duration.length > 0 &&
            formData.platform.length > 0 &&
            formData.publishTime.length > 0;
        setCanGoToNextStep(isValid);
    }, [formData, setCanGoToNextStep]);

    const togglePlatform = (platformId: string) => {
        const currentPlatforms = formData.platform;
        if (currentPlatforms.includes(platformId)) {
            setFormData({ ...formData, platform: currentPlatforms.filter(id => id !== platformId) });
        } else {
            setFormData({ ...formData, platform: [...currentPlatforms, platformId] });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl mx-auto"
        >
            <div className="text-left mb-10">
                <h2 className="font-extrabold text-2xl md:text-3xl lg:text-4xl mb-4">
                    Series <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Details</span>
                </h2>
                <p className="text-zinc-400">Finalize your series settings and schedule.</p>
            </div>

            <div className="space-y-8">
                {/* Series Name */}
                <div className="space-y-3">
                    <Label htmlFor="seriesName" className="text-base font-semibold text-zinc-900">Series Name</Label>
                    <Input
                        id="seriesName"
                        placeholder="e.g., Daily Stoic Wisdom"
                        value={formData.seriesName}
                        onChange={(e) => setFormData({ ...formData, seriesName: e.target.value })}
                        className="h-14 rounded-xl border-zinc-200 bg-zinc-50/50 text-base focus:ring-0 focus:border-zinc-400"
                    />
                </div>

                {/* Description (Optional) */}
                <div className="space-y-3">
                    <Label htmlFor="description" className="text-base font-semibold text-zinc-900">
                        Description <span className="text-zinc-400 font-normal">(Optional)</span>
                    </Label>
                    <Textarea
                        id="description"
                        placeholder="e.g., Focus on ancient Greek philosophy and practical life lessons"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="min-h-[100px] rounded-xl border-zinc-200 bg-zinc-50/50 text-base focus:ring-0 focus:border-zinc-400 resize-none"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Duration */}
                    <div className="space-y-3">
                        <Label className="text-base font-semibold text-zinc-900">Video Duration</Label>
                        <Select
                            value={formData.duration}
                            onValueChange={(val) => setFormData({ ...formData, duration: val })}
                        >
                            <SelectTrigger className="h-14 rounded-xl border-zinc-200 bg-zinc-50/50 text-base focus:ring-0 focus:border-zinc-400">
                                <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="30-50">30-50 Seconds</SelectItem>
                                <SelectItem value="60-70">60-70 Seconds</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Publish Time */}
                    <div className="space-y-3">
                        <Label htmlFor="publishTime" className="text-base font-semibold text-zinc-900">Publish Time</Label>
                        <div className="relative">
                            <Input
                                id="publishTime"
                                type="time"
                                value={formData.publishTime}
                                onChange={(e) => setFormData({ ...formData, publishTime: e.target.value })}
                                className="h-14 rounded-xl border-zinc-200 bg-zinc-50/50 text-base focus:ring-0 focus:border-zinc-400 pr-12" // Add padding for icon if needed
                            />
                            {/* Native time input usually has its own icon, but we can style if needed. 
                                The design shows a clock icon on the right. 
                                Native picker has one. */}
                        </div>
                    </div>
                </div>

                {/* Platform Selection */}
                <div className="space-y-4">
                    <Label className="text-base font-semibold text-zinc-900">Publish Platforms</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {platforms.map((platform) => {
                            const isSelected = formData.platform.includes(platform.id);

                            return (
                                <div
                                    key={platform.id}
                                    onClick={() => togglePlatform(platform.id)}
                                    className={cn(
                                        "flex flex-col items-center justify-center p-2 rounded-2xl border-2 cursor-pointer transition-all duration-200 h-28 relative",
                                        isSelected
                                            ? cn("bg-white shadow-sm", platform.activeColor, platform.activeBg)
                                            : "bg-white border-zinc-100 hover:border-zinc-200"
                                    )}
                                >
                                    <div className="absolute top-3 left-3">
                                        <div className={cn(
                                            "h-5 w-5 rounded border flex items-center justify-center transition-colors",
                                            isSelected ? cn("border-transparent text-white", platform.checkboxColor) : "border-zinc-300"
                                        )}>
                                            {isSelected && <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                        </div>
                                    </div>

                                    <div className="absolute top-3 right-3">
                                        {/* Original Color Icon */}
                                        <div className={cn("w-6 h-6", platform.iconColor)}>
                                            {platform.icon}
                                        </div>
                                    </div>

                                    <span className={cn("font-bold text-xs uppercase tracking-wider mt-6", platform.iconColor)}>
                                        {platform.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-indigo-50/50 rounded-xl p-4 flex items-center gap-3 text-sm text-indigo-900">
                    <div className="bg-indigo-100 p-2 rounded-full">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    Note: Video will generate 3-6 hours before video publish
                </div>
            </div>
        </motion.div>
    );
}
