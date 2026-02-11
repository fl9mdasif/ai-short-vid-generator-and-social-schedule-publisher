"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Film, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import { deleteVideo } from "@/app/actions/videos-actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface VideoCardProps {
    video: {
        id: string;
        script_json: any;
        image_urls: string[];
        video_number: number;
        status: string;
        created_at: string;
        video_generations?: {
            series_name: string;
            niche_type: string;
        };
    };
    isGenerating?: boolean;
}

export function VideoCard({ video, isGenerating = false }: VideoCardProps) {
    const { toast } = useToast();
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const thumbnail = video.image_urls?.[0] || "/placeholder-image.png";
    const title = video.script_json?.title || "Untitled Video";
    const seriesName = video.video_generations?.series_name || "Unknown Series";

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this video? This will remove all associated assets.")) {
            return;
        }

        setIsDeleting(true);
        const result = await deleteVideo(video.id);
        setIsDeleting(false);

        if (result.success) {
            toast({
                title: "Video deleted",
                description: "The video and all assets have been removed.",
            });
            router.refresh();
        } else {
            toast({
                title: "Error",
                description: "Failed to delete video: " + result.error,
                variant: "destructive",
            });
        }
    };

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative aspect-video bg-gray-100">
                {isGenerating ? (
                    <>
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto mb-2"></div>
                                <p className="text-gray-600 font-medium">Generating...</p>
                            </div>
                        </div>
                        <Badge className="absolute top-2 left-2 bg-indigo-600 hover:bg-indigo-600">
                            PROCESSING
                        </Badge>
                    </>
                ) : (
                    <Image
                        src={thumbnail}
                        alt={title}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                )}

                {!isGenerating && (
                    <>
                        <Badge className="absolute top-2 right-2 bg-black/70">
                            Video #{video.video_number}
                        </Badge>

                        <Button
                            size="icon"
                            variant="destructive"
                            className="absolute top-2 left-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </>
                )}
            </div>

            <CardContent className="p-4">
                <div className="space-y-2">
                    <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Film className="h-4 w-4" />
                        <span className="line-clamp-1">{seriesName}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>
                            {formatDistanceToNow(new Date(video.created_at), {
                                addSuffix: true
                            })}
                        </span>
                    </div>

                    {isGenerating && (
                        <Badge variant="secondary" className="w-full justify-center">
                            Generating Assets...
                        </Badge>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
