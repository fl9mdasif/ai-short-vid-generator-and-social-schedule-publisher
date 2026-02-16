"use client";

import { VideoCard } from "@/components/videos/video-card";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getVideos } from "@/app/actions/videos-actions";
import { useSearchParams } from "next/navigation";

export default function VideosPage() {
    const { user } = useUser();
    const searchParams = useSearchParams();
    const generatingSeriesId = searchParams.get("generating");
    const generationTimestamp = searchParams.get("ts") ? parseInt(searchParams.get("ts")!) : 0;

    const [videos, setVideos] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showGenerating, setShowGenerating] = useState(!!generatingSeriesId);

    const loadVideos = async () => {
        if (!user) return;
        try {
            const data = await getVideos(user.id);
            setVideos(data);

            // If we find a new video for the generating series, hide the placeholder
            // A video is "new" if it was created AFTER the generation button was clicked
            if (generatingSeriesId && data.some(v =>
                v.series_id === generatingSeriesId &&
                new Date(v.created_at).getTime() > generationTimestamp
            )) {
                setShowGenerating(false);
            }
        } catch (error) {
            console.error("Failed to load videos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadVideos();

        // Poll for updates if generating
        if (generatingSeriesId) {
            const interval = setInterval(loadVideos, 5000); // Refresh every 5 seconds
            return () => clearInterval(interval);
        }
    }, [user, generatingSeriesId]);

    if (!user) {
        return null;
    }

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Generated Videos</h1>
                <p className="text-gray-600">
                    View all your AI-generated videos
                </p>
            </div>

            {videos.length === 0 && !showGenerating ? (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">🎬</div>
                    <h2 className="text-2xl font-semibold mb-2">No videos yet</h2>
                    <p className="text-gray-600">
                        Generate your first video from the Dashboard
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Show generating placeholder if triggered */}
                    {showGenerating && (
                        <VideoCard
                            key="generating"
                            video={{
                                id: "generating",
                                script_json: { title: "Untitled Video" },
                                image_urls: [],
                                video_number: videos.length + 1,
                                status: "generating",
                                created_at: new Date().toISOString(),
                                video_generations: {
                                    series_name: "Processing...",
                                    niche_type: ""
                                }
                            }}
                            isGenerating={true}
                        />
                    )}

                    {videos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            )}
        </div>
    );
}
