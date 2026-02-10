"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { SocialPlatform } from "@/app/actions/settings-actions";
import Image from "next/image";

interface SocialConnectionCardProps {
    platform: SocialPlatform;
    platformName: string;
    description: string;
    icon: React.ReactNode;
    isConnected: boolean;
    profileData?: any;
    isLoading: boolean;
    onConnect: () => void;
    onDisconnect: () => void;
}

export function SocialConnectionCard({
    platform,
    platformName,
    description,
    icon,
    isConnected,
    profileData,
    isLoading,
    onConnect,
    onDisconnect
}: SocialConnectionCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 p-2">
                        {icon}
                    </div>
                    <div>
                        <CardTitle className="text-base font-medium">{platformName}</CardTitle>
                        <CardDescription className="text-xs">{description}</CardDescription>
                    </div>
                </div>
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: isConnected ? '#10b981' : '#e4e4e7' }} />
            </CardHeader>
            <CardContent>
                {isConnected && profileData ? (
                    <div className="flex items-center gap-3 mb-4 rounded-md bg-zinc-50 p-3">
                        {profileData.avatar_url && (
                            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-zinc-200">
                                <Image
                                    src={profileData.avatar_url}
                                    alt={profileData.name || platformName}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className="flex flex-col overflow-hidden">
                            <span className="truncate text-sm font-medium text-zinc-900">
                                {profileData.name}
                            </span>
                            {profileData.username && (
                                <span className="truncate text-xs text-zinc-500">
                                    {profileData.username}
                                </span>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="mb-4 h-[68px] flex items-center justify-center rounded-md border border-dashed border-zinc-200 bg-zinc-50/50">
                        <span className="text-xs text-zinc-400">Not connected</span>
                    </div>
                )}

                {isConnected ? (
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100"
                        onClick={onDisconnect}
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Disconnect"}
                    </Button>
                ) : (
                    <Button
                        size="sm"
                        className="w-full"
                        onClick={onConnect}
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Connect"}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
