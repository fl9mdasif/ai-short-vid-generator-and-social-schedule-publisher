"use client";

import { useCreateWizard } from "../create-wizard-context";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { BgMusicList } from "../data/bg-music-data";
import { Play, Pause, Music, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export function BgMusicSelection() {
    const { formData, setFormData, setCanGoToNextStep } = useCreateWizard();
    const [playingUrl, setPlayingUrl] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize selectedBgMusic if undefined (though we set default in context)
    useEffect(() => {
        if (!formData.selectedBgMusic) {
            setFormData(prev => ({ ...prev, selectedBgMusic: [] }));
        }
    }, []);

    // Validate: Optional? User said "select one or multiple". Let's require at least one for now to be safe, 
    // or maybe it's optional. Usually wizard steps require something. Let's assume at least one.
    useEffect(() => {
        setCanGoToNextStep(formData.selectedBgMusic.length > 0);
    }, [formData.selectedBgMusic, setCanGoToNextStep]);


    const toggleSelection = (url: string) => {
        setFormData(prev => {
            const current = prev.selectedBgMusic || [];
            if (current.includes(url)) {
                return { ...prev, selectedBgMusic: current.filter(u => u !== url) };
            } else {
                return { ...prev, selectedBgMusic: [...current, url] };
            }
        });
    };

    const togglePlay = (url: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click

        if (playingUrl === url) {
            audioRef.current?.pause();
            setPlayingUrl(null);
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            const audio = new Audio(url);
            audioRef.current = audio;
            audio.volume = 0.5; // Default volume
            audio.play();
            setPlayingUrl(url);

            audio.onended = () => setPlayingUrl(null);
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
                    Choose  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Background Music</span>
                </h2>
                <p className="text-zinc-400">Add atmosphere to your videos. Choose one or more tracks from our curated library.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                {BgMusicList.map((track) => {
                    const isSelected = formData.selectedBgMusic?.includes(track.url);
                    const isPlaying = playingUrl === track.url;

                    return (
                        <div
                            key={track.url}
                            onClick={() => toggleSelection(track.url)}
                            className={cn(
                                "relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-between group",
                                isSelected
                                    ? "bg-indigo-50/90 border-indigo-500 shadow-md ring-1 ring-indigo-500"
                                    : "bg-white border-zinc-200 hover:border-indigo-300 hover:shadow-lg"
                            )}
                        >
                            <div className="flex items-center gap-4 flex-1">
                                {/* Play Button */}
                                <button
                                    onClick={(e) => togglePlay(track.url, e)}
                                    className={cn(
                                        "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                                        isPlaying
                                            ? "bg-indigo-600 text-white shadow-lg scale-110"
                                            : "bg-zinc-100 text-zinc-600 hover:bg-indigo-100 hover:text-indigo-600"
                                    )}
                                >
                                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                                </button>

                                <div>
                                    <h3 className={cn("font-bold text-lg mb-1", isSelected ? "text-indigo-900" : "text-zinc-900")}>
                                        {track.title}
                                    </h3>
                                    <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                                        <span className="flex items-center gap-1">
                                            <Music className="w-3 h-3" />
                                            {track.genre}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                                        <span>{track.duration}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Checkbox / Status */}
                            <div className="ml-4">
                                {isSelected ? (
                                    <div className="bg-indigo-600 rounded-full p-1 shadow-sm">
                                        <CheckCircle2 className="w-6 h-6 text-white" />
                                    </div>
                                ) : (
                                    <div className="text-zinc-300 group-hover:text-indigo-400 transition-colors">
                                        <Circle className="w-7 h-7" />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}
