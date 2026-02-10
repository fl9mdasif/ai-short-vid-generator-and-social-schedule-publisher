import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
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

    // --- Animation Logic ---

    // Progress within the current segment (0 to 1)
    const segmentDuration = activeSegment.end - activeSegment.start;
    const progressInSegment = (currentTime - activeSegment.start) / segmentDuration;
    const framesInSegment = (currentTime - activeSegment.start) * fps;

    // Generic spring for pop-in effects
    const spr = spring({
        frame: framesInSegment,
        fps,
        config: {
            stiffness: 200,
            damping: 12,
        },
    });

    let animatedStyle: React.CSSProperties = {};

    if (selectedStyle.id === 'youtuber') {
        const scale = interpolate(spr, [0, 1], [0.5, 1]);
        const rotate = interpolate(spr, [0, 1], [-10, 0]);
        animatedStyle = {
            transform: `scale(${scale}) rotate(${rotate}deg)`,
            opacity: spr,
        };
    } else if (selectedStyle.id === 'minimal') {
        const opacity = interpolate(framesInSegment, [0, 10], [0, 1]);
        const translateY = interpolate(framesInSegment, [0, 10], [20, 0]);
        animatedStyle = {
            opacity,
            transform: `translateY(${translateY}px)`,
        };
    } else if (selectedStyle.id === 'netflix') {
        const opacity = interpolate(framesInSegment, [0, 5], [0, 1]);
        animatedStyle = { opacity };
    } else if (selectedStyle.id === 'neon') {
        const opacity = interpolate(framesInSegment, [0, 10], [0, 1]);
        const blur = interpolate(framesInSegment, [0, 10], [10, 0]);
        // Flicker effect
        const flicker = Math.sin(frame * 0.5) * 0.1 + 0.9;
        animatedStyle = {
            opacity: opacity * flicker,
            filter: `blur(${blur}px)`,
            textShadow: '0 0 10px #22d3ee, 0 0 20px #22d3ee',
        };
    } else if (selectedStyle.id === 'comic') {
        const scale = spring({
            frame: framesInSegment,
            fps,
            config: {
                stiffness: 300,
                damping: 10,
                mass: 0.5,
            },
        });
        animatedStyle = {
            transform: `scale(${scale})`,
            opacity: interpolate(framesInSegment, [0, 5], [0, 1]),
        };
    } else if (selectedStyle.id === 'typewriter') {
        // Reveal text character by character
        const charsToShow = Math.floor(interpolate(framesInSegment, [0, 20], [0, activeSegment.text.length], {
            extrapolateRight: 'clamp',
        }));
        const displayText = activeSegment.text.substring(0, charsToShow);

        return (
            <AbsoluteFill className="flex justify-end items-center pb-24 flex-col pointer-events-none">
                <div
                    className={cn(
                        "text-center transition-all duration-200",
                        selectedStyle.containerClassName
                    )}
                    style={{
                        maxWidth: '85%',
                    }}
                >
                    <span className={cn(
                        "whitespace-pre-wrap",
                        selectedStyle.textClassName
                    )}>
                        {displayText}
                        <span className="animate-pulse ml-0.5">|</span>
                    </span>
                </div>
            </AbsoluteFill>
        );
    }

    return (
        <AbsoluteFill className="flex justify-end items-center pb-24 flex-col pointer-events-none">
            <div
                className={cn(
                    "text-center",
                    selectedStyle.containerClassName
                )}
                style={{
                    maxWidth: '85%',
                    ...animatedStyle,
                }}
            >
                <span className={cn(
                    "whitespace-pre-wrap block",
                    selectedStyle.textClassName
                )}>
                    {activeSegment.text}
                </span>
            </div>
        </AbsoluteFill>
    );
};
