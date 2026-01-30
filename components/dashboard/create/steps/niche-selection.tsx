"use client";

import { useCreateWizard } from "../create-wizard-context";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Sparkles, Type, BookOpen, Search, Wallet, Globe, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming cn utility exists

const niches = [
    { id: "scary-stories", title: "Scary Stories", description: "Spin chilling tales that keep viewers on the edge of their seats.", icon: Sparkles },
    { id: "motivational", title: "Motivational", description: "Inspire your audience with powerful quotes and life lessons.", icon: BookOpen },
    { id: "facts", title: "Interesting Facts", description: "Share mind-blowing facts about the world and beyond.", icon: Search },
    { id: "history", title: "History", description: "Dive into the past and uncover forgotten events and figures.", icon: Globe },
    { id: "finance", title: "Finance & Wealth", description: "Tips and tricks for managing money and building wealth.", icon: Wallet },
    { id: "news", title: "News & Trends", description: "Stay up-to-date with the latest breaking news and viral trends.", icon: Type }, // Using generic icon
];

export function NicheSelection() {
    const { formData, setFormData, setCanGoToNextStep, goToNextStep, canGoToNextStep } = useCreateWizard();
    const [activeTab, setActiveTab] = useState<"available" | "custom">(formData.nicheType || "available");

    // Sync internal state with context and validate
    useEffect(() => {
        setFormData((prev) => ({ ...prev, nicheType: activeTab }));
    }, [activeTab, setFormData]);

    useEffect(() => {
        const isValid =
            (activeTab === "available" && !!formData.selectedNiche) ||
            (activeTab === "custom" && !!formData.customNiche && formData.customNiche.length > 3);
        setCanGoToNextStep(isValid);
    }, [formData.selectedNiche, formData.customNiche, activeTab, setCanGoToNextStep]);

    const handleNicheSelect = (nicheId: string) => {
        setFormData((prev) => ({ ...prev, selectedNiche: nicheId }));
    };

    const handleCustomNicheChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, customNiche: e.target.value }));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl mx-auto"
        >
            <div className=" mb-10">
                <h2 className="font-extrabold text-2xl md:text-3xl lg:text-4xl mb-4">
                    Choose Your <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Niche</span>
                </h2>
                <p className="text-zinc-400 text-lg">Select a pre-defined niche or define your own to tailor your content.</p>
            </div>

            {/* Tabs */}
            <div className="flex justify-start mb-10">
                <div className="bg-white p-1.5 rounded-full border border-zinc-200 flex relative shadow-sm">
                    <button
                        onClick={() => setActiveTab("available")}
                        className={cn(
                            "relative px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 z-10",
                            activeTab === "available" ? "text-white" : "text-zinc-500 hover:text-zinc-900"
                        )}
                    >
                        Available Niche
                        {activeTab === "available" && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-zinc-900 rounded-full shadow-md"
                                style={{ zIndex: -1 }}
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("custom")}
                        className={cn(
                            "relative px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 z-10",
                            activeTab === "custom" ? "text-white" : "text-zinc-500 hover:text-zinc-900"
                        )}
                    >
                        Custom Niche
                        {activeTab === "custom" && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-zinc-900 rounded-full shadow-md"
                                style={{ zIndex: -1 }}
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </button>
                </div>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                {activeTab === "available" ? (
                    <motion.div
                        key="available"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px] overflow-y-auto pr-2 custom-scrollbar"
                    >
                        {niches.map((niche) => {
                            const isSelected = formData.selectedNiche === niche.id;
                            const Icon = niche.icon;
                            return (
                                <div
                                    key={niche.id}
                                    onClick={() => handleNicheSelect(niche.id)}
                                    className={`
                                        cursor-pointer group relative p-3 rounded-xl border-2 transition-all duration-300
                                        ${isSelected
                                            ? "bg-indigo-50/50 border-indigo-500 shadow-md ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#09090b]"
                                            : "bg-white border-zinc-200 hover:border-indigo-300 hover:shadow-lg hover:-translate-y-1"
                                        }
                                    `}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`p-2.5 rounded-xl transition-all duration-300 ${isSelected
                                            ? "bg-indigo-600 text-white shadow-lg scale-110"
                                            : "bg-zinc-100 text-zinc-500 group-hover:text-indigo-600 group-hover:bg-indigo-50"
                                            }`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className={`font-bold text-base mb-0.5 transition-colors ${isSelected ? "text-indigo-900" : "text-zinc-900 group-hover:text-indigo-700"
                                                }`}>{niche.title}</h3>
                                            <p className={`text-xs leading-snug transition-colors ${isSelected ? "text-indigo-700/80" : "text-zinc-500 group-hover:text-zinc-600"
                                                }`}>{niche.description}</p>
                                        </div>
                                    </div>
                                    {isSelected && (
                                        <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-indigo-500 rounded-full shadow-[0_0_8px_#818cf8] animate-pulse"></div>
                                    )}
                                </div>
                            );
                        })}
                    </motion.div>
                ) : (
                    <motion.div
                        key="custom"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center justify-center h-[400px]"
                    >
                        <Card className="w-full max-w-md bg-white border-zinc-200 p-8 shadow-xl">
                            <div className="mb-6 text-center">
                                <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center mx-auto mb-4 text-cyan-600 shadow-sm">
                                    <Type className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 mb-2">Define Your Own Niche</h3>
                                <p className="text-sm text-zinc-500">Tell us exactly what kind of videos you want to create.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Niche Name</label>
                                    <Input
                                        placeholder="e.g., 'Underwater Basket Weaving'"
                                        className="bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-medium"
                                        value={formData.customNiche}
                                        onChange={handleCustomNicheChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Description (Optional)</label>
                                    <textarea
                                        placeholder="Describe your niche in more detail..."
                                        className="flex min-h-[100px] w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-none font-medium"
                                        value={formData.customNicheDescription}
                                        onChange={(e) => setFormData(prev => ({ ...prev, customNicheDescription: e.target.value }))}
                                    />
                                    <p className="text-xs text-zinc-400 ml-1">
                                        Providing a description helps the AI act more accurately.
                                    </p>
                                </div>

                                <Button
                                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white mt-4 shadow-lg shadow-cyan-500/20 transition-all font-semibold"
                                    onClick={goToNextStep}
                                    disabled={!canGoToNextStep}
                                >
                                    Create Niche
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence >
        </motion.div >
    );
}
