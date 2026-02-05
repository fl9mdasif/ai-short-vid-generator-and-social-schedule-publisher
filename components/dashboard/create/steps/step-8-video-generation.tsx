"use client";

import React, { useState } from "react";
import { Player } from "@remotion/player";
import { useCreateWizard } from "../create-wizard-context";
import { MainComposition } from "@/remotion/composition";
import { Button } from "@/components/ui/button";
import { Loader2, Play, Video } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function Step8VideoGeneration() {
    const { formData, videoGenerationStatus, setVideoGenerationStatus } = useCreateWizard();
    const [progress, setProgress] = useState(0);

    // Mock data transformation from formData to Composition props
    // In a real scenario, you'd map formData fields to what MainComposition expects
    const images = [
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1557682250-33bd709cbe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ]; // Placeholder, should come from formData or generated assets

    const captions = [
        { text: "Welcome to this video", start: 0, end: 2 },
        { text: "This is a demo", start: 2, end: 4 },
        { text: "Of Remotion generation", start: 4, end: 6 }
    ]; // Placeholder

    const handleGenerate = async () => {
        setVideoGenerationStatus('generating');

        try {
            // Call API to trigger Lambda rendering
            const response = await fetch('/api/render-video', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    images,
                    captions
                })
            });

            if (!response.ok) throw new Error('Generation failed');

            // For demo, we might just wait or poll
            // Here we simulate success
            setTimeout(() => {
                setVideoGenerationStatus('completed');
                toast({
                    title: "Success",
                    description: "Video generated successfully!",
                });
            }, 3000);

        } catch (error) {
            console.error(error);
            setVideoGenerationStatus('failed');
            toast({
                title: "Error",
                description: "Failed to generate video.",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Generate Video</h2>
                <p className="text-muted-foreground">Preview your video and generate the final result.</p>
            </div>

            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-zinc-800 relative mx-auto w-full max-w-2xl">
                <Player
                    component={MainComposition}
                    inputProps={{
                        images,
                        captions,
                        audioUrl: "", // Add audio URL from formData if available
                        fps: 30,
                        durationInFrames: 30 * 10
                    }}
                    durationInFrames={300}
                    fps={30}
                    compositionWidth={1080}
                    compositionHeight={1920}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    controls
                />
            </div>

            <div className="flex justify-center pt-8">
                <Button
                    size="lg"
                    onClick={handleGenerate}
                    disabled={videoGenerationStatus === 'generating' || videoGenerationStatus === 'completed'}
                    className="w-full max-w-md text-lg h-14"
                >
                    {videoGenerationStatus === 'generating' ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Rendering Video...
                        </>
                    ) : videoGenerationStatus === 'completed' ? (
                        <>
                            <Play className="mr-2 h-5 w-5" />
                            Video Ready (View in Dashboard)
                        </>
                    ) : (
                        <>
                            <Video className="mr-2 h-5 w-5" />
                            Generate Final Video
                        </>
                    )}
                </Button>
            </div>

            {/* Steps debug info (optional) */}
            {/* <div className="text-xs text-zinc-500 mt-8">
                Debug: {JSON.stringify(formData, null, 2)}
            </div> */}
        </div>
    );
}
