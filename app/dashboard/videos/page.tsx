import { getVideos } from "@/app/actions/videos-actions";
import { VideoCard } from "@/components/videos/video-card";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function VideosPage() {
    const user = await currentUser();

    if (!user) {
        redirect("/sign-in");
    }

    const videos = await getVideos(user.id);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Generated Videos</h1>
                <p className="text-gray-600">
                    View all your AI-generated videos
                </p>
            </div>

            {videos.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">🎬</div>
                    <h2 className="text-2xl font-semibold mb-2">No videos yet</h2>
                    <p className="text-gray-600">
                        Generate your first video from the Dashboard
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {videos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            )}
        </div>
    );
}
