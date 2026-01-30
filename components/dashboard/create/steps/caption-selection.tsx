"use client";

import { useCreateWizard } from "../create-wizard-context";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaptionStyles, CaptionStyle } from "../data/caption-style-data";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle } from "lucide-react";

export function CaptionSelection() {
    const { formData, setFormData, setCanGoToNextStep } = useCreateWizard();

    useEffect(() => {
        setCanGoToNextStep(!!formData.selectedCaptionStyle);
    }, [formData.selectedCaptionStyle, setCanGoToNextStep]);

    const handleSelect = (styleId: string) => {
        setFormData(prev => ({ ...prev, selectedCaptionStyle: styleId }));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-6xl mx-auto"
        >
            <div className="text-left mb-10">
                <h2 className="font-extrabold text-2xl md:text-3xl lg:text-4xl mb-4">
                    Choose  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Caption Style</span>
                </h2>
                <p className="text-zinc-400">Choose how your captions will appear in the video.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                {CaptionStyles.map((style) => (
                    <CaptionCard
                        key={style.id}
                        style={style}
                        isSelected={formData.selectedCaptionStyle === style.id}
                        onSelect={() => handleSelect(style.id)}
                    />
                ))}
            </div>
        </motion.div>
    );
}

function CaptionCard({
    style,
    isSelected,
    onSelect
}: {
    style: CaptionStyle;
    isSelected: boolean;
    onSelect: () => void;
}) {
    const sampleText = ["Captions", "Make", "Videos", "Better"];

    return (
        <div
            onClick={onSelect}
            className={cn(
                "relative group cursor-pointer rounded-2xl border-2 transition-all duration-300 overflow-hidden h-[240px] flex flex-col",
                isSelected
                    ? "bg-zinc-900 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] scale-[1.02]"
                    : "bg-zinc-900/50 border-zinc-800 hover:border-indigo-500/50 hover:bg-zinc-800/80"
            )}
        >
            {/* Preview Area */}
            <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-grid-white/[0.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/20 to-black/80 pointer-events-none" />

                <div className="absolute inset-x-0 bottom-12 flex justify-center items-center px-4 z-10">
                    <AnimateCaptions style={style} words={sampleText} />
                </div>
            </div>

            {/* Info Footer */}
            <div className="p-4 bg-zinc-950/50 border-t border-white/5 flex items-center justify-between relative z-20">
                <div>
                    <h3 className={cn(
                        "font-bold text-lg transition-colors",
                        isSelected ? "text-indigo-400" : "text-zinc-200"
                    )}>
                        {style.name}
                    </h3>
                    <p className="text-xs text-zinc-500">{style.description}</p>
                </div>
                <div>
                    {isSelected ? (
                        <CheckCircle2 className="w-6 h-6 text-indigo-500" />
                    ) : (
                        <Circle className="w-6 h-6 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
                    )}
                </div>
            </div>
        </div>
    );
}

function AnimateCaptions({ style, words }: { style: CaptionStyle, words: string[] }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 1200);
        return () => clearInterval(interval);
    }, [words.length]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={index}
                variants={style.animation}
                initial="initial"
                animate="animate"
                className={style.containerClassName}
            >
                <span className={style.textClassName}>
                    {words[index]}
                </span>
            </motion.div>
        </AnimatePresence>
    );
}
