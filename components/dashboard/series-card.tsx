"use client";

import { VideoSeries } from "@/app/actions/dashboard-actions";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VideoStyles } from "@/components/dashboard/create/data/video-style-data";
import { MoreVertical, Play, Pause, Trash2, Edit, Video, Zap, Youtube, Instagram, Mail } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { deleteSeries, toggleSeriesStatus } from "@/app/actions/dashboard-actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface SeriesCardProps {
    series: VideoSeries;
}

export function SeriesCard({ series }: SeriesCardProps) {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Find style image
    const videoStyle = VideoStyles.find(
        (style) => style.id === series.selected_video_style_id
    );
    const thumbnail = videoStyle?.image || "/placeholder-image.jpg"; // You might want a real placeholder

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this series?")) return;
        setIsLoading(true);
        const result = await deleteSeries(series.id);
        setIsLoading(false);

        if (result.success) {
            toast({
                title: "Series deleted",
                description: "The series has been successfully removed.",
            });
        } else {
            toast({
                title: "Error",
                description: "Failed to delete series: " + result.error,
                variant: "destructive",
            });
        }
    };

    const handleToggleStatus = async () => {
        setIsLoading(true);
        const result = await toggleSeriesStatus(series.id, series.status);
        setIsLoading(false);

        if (result.success) {
            toast({
                title: "Status updated",
                description: `Series is now ${result.newStatus}.`,
            });
        } else {
            toast({
                title: "Error",
                description: "Failed to update status: " + result.error,
                variant: "destructive",
            });
        }
    };

    const handleEdit = () => {
        router.push(`/dashboard/edit/${series.id}`);
    };

    return (
        <Card className="overflow-hidden group hover:shadow-lg transition-shadow border-zinc-200">
            {/* Thumbnail Section */}
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-100">
                <Image
                    src={thumbnail}
                    alt={series.series_name || "Series Thumbnail"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay with Edit Button */}
                <div className="absolute top-2 right-2 transition-opacity">
                    <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 bg-white/90 hover:bg-white text-zinc-900 shadow-sm"
                        onClick={handleEdit}
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                </div>

                {/* Status Badge */}
                <div className="absolute top-2 left-2">
                    <Badge variant={series.status === "paused" ? "secondary" : "default"} className={series.status === "paused" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" : "bg-green-100 text-green-800 hover:bg-green-100"}>
                        {series.status.charAt(0).toUpperCase() + series.status.slice(1)}
                    </Badge>
                </div>

                {/* Platforms Section */}
                <div className="absolute bottom-2 left-2 flex gap-1">
                    {series.platform?.map(p => {
                        const styleClass = "w-6 h-6 bg-white rounded-full p-1 shadow-sm";
                        if (p === 'youtube') return <div key={p} className={styleClass}><Youtube className="w-full h-full text-red-600" /></div>;
                        if (p === 'instagram') return <div key={p} className={styleClass}><Instagram className="w-full h-full text-pink-600" /></div>;
                        if (p === 'tiktok') return (
                            <div key={p} className={styleClass}>
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-black">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            </div>
                        );
                        if (p === 'facebook') return (
                            <div key={p} className={styleClass}>
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-blue-600">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </div>
                        );
                        if (p === 'email') return <div key={p} className={styleClass}><Mail className="w-full h-full text-indigo-600" /></div>;
                        return null;
                    })}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1">
                        <h3 className="font-bold text-lg leading-tight line-clamp-1 text-zinc-900">
                            {series.series_name || "Untitled Series"}
                        </h3>
                        <p className="text-xs text-zinc-500">
                            Created {formatDistanceToNow(new Date(series.created_at), { addSuffix: true })}
                        </p>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-zinc-400 hover:text-zinc-900">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={handleEdit}>
                                <Edit className="mr-2 h-4 w-4" /> Edit Series
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleToggleStatus}>
                                {series.status === "paused" ? (
                                    <>
                                        <Play className="mr-2 h-4 w-4" /> Resume
                                    </>
                                ) : (
                                    <>
                                        <Pause className="mr-2 h-4 w-4" /> Pause
                                    </>
                                )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Footer Actions */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-zinc-100">
                    <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => toast({ description: "View videos coming soon" })}>
                        <Video className="mr-2 h-3.5 w-3.5" />
                        Permissions
                    </Button>
                    <Button size="sm" className="w-full text-xs bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => toast({ description: "Generate video coming soon" })}>
                        <Zap className="mr-2 h-3.5 w-3.5" />
                        Generate
                    </Button>
                </div>
            </div>
        </Card>
    );
}
