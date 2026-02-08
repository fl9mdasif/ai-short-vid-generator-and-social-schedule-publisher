import React from 'react';
import { AbsoluteFill, Audio } from 'remotion';
import { z } from 'zod';
// import { videoSchema } from './root';
import { ImageSequence } from './image-sequence';
import { Captions } from './captions';
import { videoSchema } from './constants';

type Props = z.infer<typeof videoSchema>;

export const MainComposition: React.FC<Props> = ({
    images,
    captions,
    audioUrl,
    voiceVolume = 1,
    musicVolume = 0.1,
    styleId,
}) => {
    return (
        <AbsoluteFill className="bg-black">
            {/* Background Images with Transitions */}
            <ImageSequence images={images} />

            {/* Captions Layer */}
            <Captions captions={captions} styleId={styleId} />

            {/* Audio Layer */}
            {audioUrl && (
                <Audio
                    src={audioUrl}
                    volume={voiceVolume}
                />
            )}

            {/* Placeholder for optional background music if added later */}
        </AbsoluteFill>
    );
};
