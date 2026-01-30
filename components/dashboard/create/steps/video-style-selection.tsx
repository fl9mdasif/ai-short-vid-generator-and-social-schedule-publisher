"use client";

import { useCreateWizard } from "../create-wizard-context";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { VideoStyles } from "../data/video-style-data";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function VideoStyleSelection() {
    const { formData, setFormData, setCanGoToNextStep } = useCreateWizard();

    // Validate: Require one video style selected
    useEffect(() => {
        setCanGoToNextStep(!!formData.selectedVideoStyle);
    }, [formData.selectedVideoStyle, setCanGoToNextStep]);

    const handleStyleSelect = (styleId: string) => {
        setFormData(prev => ({ ...prev, selectedVideoStyle: styleId }));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-6xl mx-auto"
        >
            <div className="text-left mb-10">
                <h2 className="font-extrabold text-2xl md:text-3xl lg:text-4xl mb-4">
                    Choose <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Video Style</span>
                </h2>
                <p className="text-zinc-400">Select the visual aesthetic for your AI-generated video.</p>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="w-full overflow-x-auto pb-8 custom-scrollbar">
                <div className="flex gap-6 px-4 md:px-0 min-w-max mx-auto">
                    {VideoStyles.map((style) => {
                        const isSelected = formData.selectedVideoStyle === style.id;

                        return (
                            <div
                                key={style.id}
                                onClick={() => handleStyleSelect(style.id)}
                                className={cn(
                                    "relative w-[200px] md:w-[240px] aspect-[9/16] rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 group border-2",
                                    isSelected
                                        ? "border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)] scale-105"
                                        : "border-transparent hover:border-indigo-300/50 hover:scale-[1.02]"
                                )}
                            >
                                {/* Image */}
                                <Image
                                    src={style.image}
                                    alt={style.title}
                                    fill
                                    className="object-cover"
                                />

                                {/* Overlay Gradient */}
                                <div className={cn(
                                    "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity",
                                    isSelected ? "opacity-80" : "opacity-60 group-hover:opacity-70"
                                )} />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <h3 className={cn(
                                        "text-xl font-bold mb-1 transition-colors",
                                        isSelected ? "text-white" : "text-zinc-200 group-hover:text-white"
                                    )}>
                                        {style.title}
                                    </h3>

                                    {/* Selected Indicator */}
                                    <div className={cn(
                                        "flex items-center gap-2 text-sm font-medium transition-all duration-300",
                                        isSelected
                                            ? "text-indigo-400 opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-4 text-zinc-400"
                                    )}>
                                        <CheckCircle2 className="w-4 h-4" />
                                        Selected
                                    </div>
                                </div>

                                {/* Active Selection Ring (visual flair) */}
                                {isSelected && (
                                    <motion.div
                                        layoutId="active-ring"
                                        className="absolute inset-0 border-4 border-indigo-500 rounded-2xl"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}
