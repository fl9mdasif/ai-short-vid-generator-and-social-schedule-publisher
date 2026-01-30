"use client";

import { useCreateWizard } from "../create-wizard-context";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Languages, DeepgramVoices, FonadalabVoices } from "../data/voice-data";
import { Check, ChevronDown, Play, Pause, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function VoiceSelection() {
    const { formData, setFormData, setCanGoToNextStep } = useCreateWizard();
    const [isOpen, setIsOpen] = useState(false);
    const [playingVoice, setPlayingVoice] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize language if not set
    useEffect(() => {
        if (!formData.language) {
            setFormData(prev => ({ ...prev, language: Languages[0] }));
        }
    }, []);

    // Helper to get available voices based on selected language
    const getAvailableVoices = () => {
        const lang = formData.language || Languages[0];
        if (lang.modelName === "deepgram") {
            return DeepgramVoices;
        } else {
            return FonadalabVoices;
        }
    };

    const availableVoices = getAvailableVoices();

    // Validate
    useEffect(() => {
        setCanGoToNextStep(!!formData.language && !!formData.voice);
    }, [formData.language, formData.voice, setCanGoToNextStep]);

    const handleLanguageSelect = (lang: typeof Languages[0]) => {
        setFormData(prev => ({ ...prev, language: lang, voice: undefined })); // Reset voice on lang change
        setIsOpen(false);
    };

    const handleVoiceSelect = (voice: typeof DeepgramVoices[0]) => {
        setFormData(prev => ({ ...prev, voice }));
    };

    const togglePlay = (previewUrl: string, e: React.MouseEvent) => {
        e.stopPropagation();

        if (playingVoice === previewUrl) {
            audioRef.current?.pause();
            setPlayingVoice(null);
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            const audio = new Audio(`/voice/${previewUrl}`);
            audioRef.current = audio;
            audio.play();
            setPlayingVoice(previewUrl);

            audio.onended = () => setPlayingVoice(null);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-5xl mx-auto"
        >
            <div className="text-left mb-10">
                <h2 className="font-extrabold text-2xl md:text-3xl lg:text-4xl mb-4">
                    Select <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Language & Voice</span>
                </h2>
                <p className="text-zinc-400">Choose the perfect voice for your generated video.</p>
            </div>

            {/* Language Selection Area */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-start">
                <div className="relative z-50">
                    <label className="block text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">Select Language</label>
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        className="bg-white border border-zinc-200 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-indigo-500 transition-colors shadow-lg"
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src={formData.language?.countryFlag}
                                alt={formData.language?.countryCode}
                                className="w-8 h-6 object-cover rounded shadow-sm"
                            />
                            <span className="font-semibold text-zinc-900">{formData.language?.language}</span>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </div>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full left-0 right-0 mt-2 bg-white border border-zinc-200 rounded-xl shadow-xl max-h-[250px] overflow-y-auto custom-scrollbar z-50"
                            >
                                {Languages.map((lang) => (
                                    <div
                                        key={lang.modelLangCode}
                                        onClick={() => handleLanguageSelect(lang)}
                                        className="p-4 flex items-center gap-3 hover:bg-zinc-50 cursor-pointer transition-colors border-b border-zinc-50 last:border-0"
                                    >
                                        <img
                                            src={lang.countryFlag}
                                            alt={lang.countryCode}
                                            className="w-6 h-4 object-cover rounded shadow-sm"
                                        />
                                        <span className={`flex-1 ${formData.language?.language === lang.language ? "text-indigo-600 font-bold" : "text-zinc-700"}`}>
                                            {lang.language}
                                        </span>
                                        {formData.language?.language === lang.language && (
                                            <Check className="w-5 h-5 text-indigo-600" />
                                        )}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Selected Language Info Card */}
                <div className="md:col-span-2">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={formData.language?.modelLangCode}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-xl p-6 border border-zinc-200 shadow-sm h-full flex items-center justify-between"
                        >
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <img
                                        src={formData.language?.countryFlag}
                                        alt={formData.language?.countryCode}
                                        className="w-10 h-7 object-cover rounded shadow-sm"
                                    />
                                    <h3 className="text-xl font-bold text-zinc-900">{formData.language?.language} selected</h3>
                                </div>
                                <p className="text-zinc-500 text-sm">
                                    Using <span className="font-semibold text-indigo-600 uppercase">{formData.language?.modelName}</span> model for high-quality {formData.language?.language} generation.
                                </p>
                            </div>
                            {/* Decorative element */}
                            <div className="hidden md:block w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                                <Check className="w-6 h-6" />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Available Voices</h3>
                <span className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    {availableVoices.length} Voices Available
                </span>
            </div>

            {/* Voices Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {availableVoices.map((voice) => {
                    const isSelected = formData.voice?.modelName === voice.modelName;

                    return (
                        <div
                            key={voice.modelName}
                            onClick={() => handleVoiceSelect(voice)}
                            className={`
                                relative p-3 rounded-xl border transition-all duration-300 cursor-pointer group
                                ${isSelected
                                    ? "bg-white border-indigo-500 shadow-md ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#09090b]"
                                    : "bg-white border-zinc-200 hover:border-indigo-300 hover:shadow-xl hover:-translate-y-1"
                                }
                            `}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h3 className="font-bold text-lg text-zinc-900 mb-1">
                                        {voice.modelName.split('-')[2] || voice.modelName}
                                    </h3>
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                                        <span className={`px-2 py-0.5 rounded-sm ${voice.gender === 'male' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                                            }`}>
                                            {voice.gender}
                                        </span>
                                        <span className="text-zinc-400">{voice.model}</span>
                                    </div>
                                </div>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isSelected ? "bg-indigo-600 text-white" : "bg-zinc-100 text-zinc-400 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                                    }`}>
                                    <User className="w-5 h-5" />
                                </div>
                            </div>

                            <button
                                onClick={(e) => togglePlay(voice.preview, e)}
                                className={`w-full py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-bold transition-all ${playingVoice === voice.preview
                                    ? "bg-zinc-900 text-white shadow-lg"
                                    : "bg-zinc-50 text-zinc-600 hover:bg-white hover:text-indigo-600 hover:shadow-md border border-zinc-100"
                                    }`}
                            >
                                {playingVoice === voice.preview ? (
                                    <>
                                        <Pause className="w-4 h-4" />
                                        Stop
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-4 h-4 fill-current" />
                                        Preview
                                    </>
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}
