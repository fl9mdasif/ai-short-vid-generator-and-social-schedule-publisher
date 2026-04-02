"use client";

import { Check, ShieldCheck, Clock, Loader2, Zap, Star, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { SyncSubscriptionButton } from "@/components/dashboard/billing/sync-subscription-button";
import { cn } from "@/lib/utils";

export function BillingContent() {
    const { user, isLoaded } = useUser();
    const { openUserProfile } = useClerk();
    const router = useRouter();

    // Get current plan from Clerk metadata, defaulting to "Free"
    const currentPlan = (user?.publicMetadata?.plan as string) || "Free";
    const nextBillingDate = "Feb 26, 2026";

    const handleAction = () => {
        if (!user) {
            router.push("/sign-in");
            return;
        }
        openUserProfile();
    };

    const plans = [
        {
            name: "Free",
            price: "$0",
            description: "For hobbyists starting out",
            features: [
                "1 Series Maximum",
                "Email & YouTube Only",
                "Standard Generation Speed",
                "720p Video Quality"
            ],
            current: currentPlan === "Free",
            popular: false,
        },
        {
            name: "Basic",
            price: "$15",
            description: "For growing content creators",
            features: [
                "3 Series Maximum",
                "Email & YouTube Only",
                "Faster Generation",
                "1080p Video Quality",
                "Cloud Storage (5GB)"
            ],
            current: currentPlan === "Basic",
            popular: false,
        },
        {
            name: "Unlimited",
            price: "$29",
            description: "For professional agencies",
            features: [
                "Unlimited Series",
                "All Platforms (IG, TikTok, FB, YT)",
                "Priority Rendering",
                "4K Video Quality",
                "1-on-1 Support"
            ],
            current: currentPlan === "Unlimited",
            popular: true,
        },
    ];

    if (!isLoaded) {
        return (
            <div className="min-h-[60vh] bg-black flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin h-10 w-10 text-indigo-500" />
                <p className="text-zinc-500 font-medium animate-pulse text-sm tracking-widest uppercase">Loading secure billing...</p>
            </div>
        );
    }

    return (
        <div className="space-y-12 pb-20 max-w-7xl mx-auto">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
                        <Shield className="h-3 w-3" />
                        Billing Management
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-white uppercase italic">
                        Subscription <span className="text-zinc-500 font-medium">&</span> Plans
                    </h1>
                    <p className="text-zinc-400 max-w-2xl text-lg">
                        Manage your digital presence and scale your content. You are currently logged in as <span className="text-white font-semibold underline decoration-indigo-500/50">{user?.primaryEmailAddress?.emailAddress}</span>.
                    </p>
                </div>
                {user && (
                    <div className="shrink-0 scale-90 md:scale-100">
                        <SyncSubscriptionButton />
                    </div>
                )}
            </motion.div>

            {/* Status Summary */}
            <div className="grid gap-6 md:grid-cols-3">
                {/* Current Plan Card */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
                    <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl group overflow-hidden relative rounded-3xl">
                        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.5)]" />
                        <CardHeader className="pb-2 px-6 pt-6">
                            <CardTitle className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em]">Current Tier</CardTitle>
                        </CardHeader>
                        <CardContent className="px-6 pb-6 pt-2">
                            <div className="text-3xl font-black text-white mb-2 flex items-center gap-2 tracking-tighter">
                                {currentPlan}
                                {currentPlan === "Unlimited" && <Sparkles className="h-5 w-5 text-indigo-400" />}
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-2xl font-bold text-indigo-400 tracking-tighter">
                                    {plans.find(p => p.name === currentPlan)?.price || "$0"}
                                </span>
                                <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">/ Month</span>
                            </div>
                            <div className="space-y-2 pt-2">
                                <div className="flex justify-between text-[10px] uppercase font-black tracking-widest text-zinc-600">
                                    <span>Quota Usage</span>
                                    <span>33%</span>
                                </div>
                                <div className="w-full bg-zinc-800/50 h-1.5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "33%" }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="bg-indigo-500 h-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Security Status */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                    <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl h-full rounded-3xl">
                        <CardHeader className="pb-2 px-6 pt-6">
                            <CardTitle className="text-[10px] font-black uppercase text-emerald-500 tracking-[0.2em] flex items-center gap-2 text-xs">
                                <ShieldCheck className="h-4 w-4" /> Secure Infrastructure
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-6 pb-6 pt-2 space-y-4">
                            <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                                Your payment information is encrypted. All processing is handled securely by <strong className="text-white">Stripe</strong> via Clerk.
                            </p>
                            <div className="flex gap-2">
                                <div className="px-2 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded-lg text-[9px] font-black text-emerald-500/70 uppercase tracking-widest">SSL Secure</div>
                                <div className="px-2 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded-lg text-[9px] font-black text-emerald-500/70 uppercase tracking-widest">PCI Compliant</div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Billing Cycle */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
                    <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl h-full rounded-3xl">
                        <CardHeader className="pb-2 px-6 pt-6">
                            <CardTitle className="text-[10px] font-black uppercase text-purple-500 tracking-[0.2em] flex items-center gap-2 text-xs">
                                <Clock className="h-4 w-4" /> Reset Schedule
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-6 pb-6 pt-2">
                            <div className="text-2xl font-black text-white mb-2 tracking-tighter">{nextBillingDate}</div>
                            <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                                Generation credits and service limits will automatically reset on this date.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Pricing Section */}
            <div className="space-y-12">
                <div className="text-center space-y-4 pt-12">
                    <span className="bg-indigo-500/10 text-indigo-400 text-[10px] font-black px-5 py-1.5 rounded-full uppercase tracking-[0.3em] border border-indigo-500/20">
                        Choose Your Plan
                    </span>
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter sm:text-5xl">Future Proof Your Content</h2>
                    <p className="text-zinc-500 max-w-lg mx-auto font-medium text-lg leading-relaxed">
                        Scale your reach with precision-engineered AI video tools designed for growth.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto items-stretch pt-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex"
                        >
                            <Card
                                className={cn(
                                    "relative flex flex-col w-full h-full transition-all duration-500 rounded-[2.5rem] overflow-hidden",
                                    plan.popular
                                        ? "bg-zinc-900 border-indigo-500 shadow-[0_0_50px_rgba(79,70,229,0.2)] scale-105 z-10"
                                        : "bg-zinc-900/30 border-white/5 hover:border-zinc-800 hover:bg-zinc-900/60"
                                )}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                                )}

                                <CardHeader className="p-10">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className={cn(
                                            "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border shadow-inner",
                                            plan.popular ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" : "bg-white/5 border-white/5 text-zinc-600"
                                        )}>
                                            {plan.name} Level
                                        </div>
                                        {plan.current && (
                                            <Badge className="bg-emerald-500/10 text-emerald-500 border-none hover:bg-emerald-500/20 px-4 py-1 rounded-full text-[10px] font-black tracking-widest">
                                                ACTIVE
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <CardTitle className="text-4xl font-black text-white uppercase tracking-tighter">{plan.name}</CardTitle>
                                        <CardDescription className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">{plan.description}</CardDescription>
                                    </div>
                                    <div className="mt-10 flex items-baseline gap-1">
                                        <span className="text-5xl font-black text-white tracking-tighter">{plan.price}</span>
                                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-2">/ Month</span>
                                    </div>
                                </CardHeader>

                                <CardContent className="flex-1 p-10 pt-0">
                                    <div className="w-full h-px bg-white/5 mb-8" />
                                    <ul className="space-y-5">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-4 group/item">
                                                <div className={cn(
                                                    "rounded-lg p-1.5 mt-0.5 shrink-0 transition-all duration-300",
                                                    plan.popular ? "bg-indigo-500/10 text-indigo-400" : "bg-white/5 text-zinc-700 group-hover/item:text-indigo-400"
                                                )}>
                                                    <Check className="h-4 w-4" />
                                                </div>
                                                <span className="text-sm text-zinc-500 font-medium group-hover/item:text-zinc-300 transition-colors">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>

                                <CardFooter className="p-10 pt-0">
                                    <Button
                                        onClick={handleAction}
                                        className={cn(
                                            "w-full h-16 text-xs font-black uppercase tracking-[0.2em] rounded-2xl transition-all duration-500 shadow-lg",
                                            plan.current
                                                ? "bg-transparent border-2 border-white/10 text-white hover:bg-white/5"
                                                : plan.popular
                                                    ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 hover:scale-[1.03] active:scale-95"
                                                    : "bg-white text-black hover:bg-zinc-200 active:scale-95 shadow-white/10"
                                        )}
                                    >
                                        {plan.current ? "Manage Subscription" : `Upgrade to ${plan.name}`}
                                    </Button>
                                </CardFooter>

                                {plan.popular && (
                                    <div className="absolute top-6 right-6 animate-pulse">
                                        <Star className="h-5 w-5 text-indigo-500 fill-indigo-500/20" />
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Guarantee Section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="pt-20 text-center border-t border-white/5 mt-20"
            >
                <div className="flex flex-wrap justify-center gap-10 md:gap-24 opacity-40">
                    <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all cursor-default">
                        <Zap className="h-5 w-5" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Instant Provision</span>
                    </div>
                    <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all cursor-default">
                        <ShieldCheck className="h-5 w-5" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Secure Stripe Auth</span>
                    </div>
                    <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all cursor-default">
                        <Clock className="h-5 w-5" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Pro-rata Refund</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
