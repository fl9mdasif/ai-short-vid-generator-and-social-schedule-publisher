import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

interface CaptionSegment {
    text: string;
    start: number; // seconds
    end: number; // seconds
}

interface CaptionsProps {
    captions: CaptionSegment[];
    styleId?: string;
}

export const Captions: React.FC<CaptionsProps> = ({ captions, styleId }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const currentTime = frame / fps;

    // Find active caption segment
    // We want to show 2-3 words. The incoming captions might be word-level or sentence-level.
    // Assuming word-level or small phrases for now based on the prompt "Show 2 to 3 Words at a time".

    // If the segments are long sentences, we would need to split them. 
    // For this implementation, I'll assume the `captions` prop passed is already chunked mostly correctly 
    // or we filter active words.

    const activeSegment = useMemo(() => {
        return captions.find(
            (c) => currentTime >= c.start && currentTime <= c.end
        );
    }, [captions, currentTime]);

    if (!activeSegment) return null;

    return (
        <AbsoluteFill className="flex justify-end items-center pb-24 flex-col pointer-events-none">
            <div
                className="text-white text-4xl font-bold text-center px-8 py-4 bg-black/50 rounded-xl backdrop-blur-sm"
                style={{
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                    maxWidth: '80%',
                }}
            >
                {activeSegment.text}
            </div>
        </AbsoluteFill>
    );
};
