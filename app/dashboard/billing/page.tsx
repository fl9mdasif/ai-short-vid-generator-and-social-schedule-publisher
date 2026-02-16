"use client";

import { Check, ShieldCheck, Clock, Loader2 } from "lucide-react";
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

import { useUser, useClerk } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SyncSubscriptionButton } from "@/components/dashboard/billing/sync-subscription-button";

export default function BillingPage() {
    const { user, isLoaded } = useUser();
    const { openUserProfile } = useClerk();
    const { toast } = useToast();
    const router = useRouter();

    // Get current plan from Clerk metadata, defaulting to "Free"
    const currentPlan = (user?.publicMetadata?.plan as string) || "Free";
    const nextBillingDate = "Feb 26, 2026";

    // Replaced simulated upgrade with Clerk User Profile opening
    const handleUpgrade = () => {
        // In a real production app with Stripe, you might redirect to a specific payment link:
        // window.location.href = "https://buy.stripe.com/..."
        // For Clerk Hosted Billing, we open the profile:
        openUserProfile();
    };

    const plans = [
        {
            name: "Free",
            price: "$0",
            description: "For hobbyists",
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
            price: "$15", // Placeholder price
            description: "For creators starting out",
            features: [
                "3 Series Maximum",
                "Email & YouTube Only",
                "Faster Generation",
                "1080p Video Quality"
            ],
            current: currentPlan === "Basic",
            popular: false,
        },
        {
            name: "Unlimited",
            price: "$29", // Placeholder price
            description: "For professional agencies",
            features: [
                "Unlimited Series",
                "All Platforms (IG, TikTok, FB, YT)",
                "Priority Generation",
                "4K Video Quality",
                "Priority Support"
            ],
            current: currentPlan === "Unlimited",
            popular: true,
        },
    ];

    if (!isLoaded) {
        return <div className="p-8 flex justify-center"><Loader2 className="animate-spin h-8 w-8 text-zinc-400" /></div>;
    }

    return (
        <div className="space-y-8 pb-10">
            <div>
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 flex items-center gap-2">
                            Billing & Subscription
                        </h1>
                        <p className="text-muted-foreground mt-2 max-w-2xl">
                            Manage your plan, subscription, and billing history. Upgrade your plan to unlock more generations and premium features for <span className="font-medium text-zinc-900">{user?.primaryEmailAddress?.emailAddress}</span>.
                        </p>
                    </div>
                    <SyncSubscriptionButton />
                </div>
            </div>

            {/* Top Status Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                {/* Current Plan Card */}
                <Card>
                    <CardHeader className="pb-2">
                        <div className="text-xs font-semibold uppercase text-indigo-600 tracking-wider mb-1">Current Plan</div>
                        <CardTitle className="text-2xl font-bold">{currentPlan} Tier</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-2">
                            {plans.find(p => p.name === currentPlan)?.price || "$0"}
                            <span className="text-sm font-normal text-muted-foreground">/month</span>
                        </div>
                        <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-indigo-600 h-full w-1/3"></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">1 of 3 monthly generations used</p>
                    </CardContent>
                </Card>

                {/* Security Card */}
                <Card>
                    <CardHeader className="pb-2">
                        <div className="text-xs font-semibold uppercase text-emerald-600 tracking-wider mb-1 flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3" /> Security
                        </div>
                        <CardTitle className="text-lg font-bold">Verified Payments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            All transactions are securely processed via Stripe through Clerk Billing infrastructure.
                        </p>
                    </CardContent>
                </Card>

                {/* Next Billing Cycle Card */}
                <Card>
                    <CardHeader className="pb-2">
                        <div className="text-xs font-semibold uppercase text-purple-600 tracking-wider mb-1 flex items-center gap-1">
                            <Clock className="h-3 w-3" /> Next Billing Cycle
                        </div>
                        <CardTitle className="text-lg font-bold">{nextBillingDate}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Your monthly generation quota resets on the 26th of every month.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-center mt-8 mb-4">
                <div className="text-center">
                    <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Power Up Your Content</span>
                    <h2 className="text-3xl font-bold mt-4 text-zinc-900">Choose the perfect plan</h2>
                    <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
                        Select a plan that fits your content creation needs. All plans include automated scheduling and high-quality AI generations.
                    </p>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid gap-8 md:grid-cols-3 lg:gap-8 max-w-6xl mx-auto">
                {plans.map((plan) => (
                    <Card
                        key={plan.name}
                        className={`relative flex flex-col transition-all duration-200 ${plan.popular
                            ? "border-indigo-600 shadow-xl scale-105 z-10"
                            : "border-zinc-200 hover:border-zinc-300 hover:shadow-md"
                            }`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-indigo-600 px-4 py-1 text-xs font-bold text-white shadow-sm">
                                MOST POPULAR
                            </div>
                        )}
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                                {plan.current && (
                                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-100">
                                        Active
                                    </Badge>
                                )}
                            </div>
                            <CardDescription className="text-sm">{plan.description}</CardDescription>
                            <div className="mt-4 flex items-baseline text-4xl font-extrabold tracking-tight">
                                {plan.price}
                                <span className="text-sm font-medium text-muted-foreground ml-1">/month</span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <ul className="space-y-4">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 text-sm text-zinc-700">
                                        <div className="rounded-full bg-green-100 p-1 mt-0.5 shrink-0">
                                            <Check className="h-3 w-3 text-green-600" />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            {plan.current ? (
                                <Button
                                    className="w-full h-11 text-base font-semibold bg-white text-zinc-900 border border-zinc-200"
                                    variant="outline"
                                    onClick={() => openUserProfile()}
                                >
                                    Manage Subscription
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => openUserProfile()}
                                    variant={plan.popular ? "default" : "outline"}
                                    className={`w-full h-11 text-base font-semibold ${plan.popular
                                        ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg"
                                        : "bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 hover:text-indigo-600"
                                        }`}
                                >
                                    Upgrade to {plan.name}
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
