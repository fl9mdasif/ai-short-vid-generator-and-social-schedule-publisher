import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { CaptionStyles } from '@/components/dashboard/create/data/caption-style-data';
import { cn } from '@/lib/utils';

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
    const activeSegment = useMemo(() => {
        return captions.find(
            (c) => currentTime >= c.start && currentTime <= c.end
        );
    }, [captions, currentTime]);

    // Find selected style or default to first one
    const selectedStyle = useMemo(() => {
        return CaptionStyles.find((s) => s.id === styleId) || CaptionStyles[0];
    }, [styleId]);

    if (!activeSegment) return null;

    return (
        <AbsoluteFill className="flex justify-end items-center pb-24 flex-col pointer-events-none">
            <div
                className={cn(
                    "text-center transition-all duration-200",
                    selectedStyle.containerClassName
                )}
                style={{
                    maxWidth: '80%',
                }}
            >
                <span className={cn(
                    "whitespace-pre-wrap",
                    selectedStyle.textClassName
                )}>
                    {activeSegment.text}
                </span>
            </div>
        </AbsoluteFill>
    );
};
