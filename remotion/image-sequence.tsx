import React from 'react';
import {
    AbsoluteFill,
    Img,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';

type AnimationType = 'fade' | 'zoom' | 'slide';

interface ImageSequenceProps {
    images: string[];
    durationPerImage?: number; // frames
    animation?: AnimationType;
}

export const ImageSequence: React.FC<ImageSequenceProps> = ({
    images,
    durationPerImage,
    animation = 'zoom',
}) => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    // If durationPerImage not set, divide total duration by number of images
    const imageDuration = durationPerImage ?? Math.floor(durationInFrames / images.length);

    const currentImageIndex = Math.floor(frame / imageDuration);
    const activeImage = images[Math.min(currentImageIndex, images.length - 1)];

    // Time relative to the current image
    const timeInImage = frame % imageDuration;

    const spr = spring({
        frame: timeInImage,
        fps,
        config: {
            damping: 200,
        },
        durationInFrames: imageDuration,
    });

    let style: React.CSSProperties = {};

    if (animation === 'zoom') {
        const scale = interpolate(timeInImage, [0, imageDuration], [1, 1.15]);
        style = { transform: `scale(${scale})` };
    } else if (animation === 'fade') {
        const opacity = interpolate(timeInImage, [0, 10, imageDuration - 10, imageDuration], [0, 1, 1, 0]);
        style = { opacity };
    } else if (animation === 'slide') {
        const translateY = interpolate(timeInImage, [0, imageDuration], [0, -50]);
        style = { transform: `translateY(${translateY}px) scale(1.1)` };
    }

    // Crossfade logic could be more complex, but for now simple swap + effect

    if (!activeImage) return null;

    return (
        <AbsoluteFill style={{ overflow: 'hidden', backgroundColor: 'black' }}>
            <AbsoluteFill>
                <Img
                    src={activeImage}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        ...style,
                    }}
                />
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
