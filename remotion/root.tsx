import React from 'react';
import { Composition } from 'remotion';
import { MainComposition } from './composition';
import { COMPOSITION_ID, videoSchema } from './constants';
import "../app/globals.css";

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id={COMPOSITION_ID}
                component={MainComposition}
                durationInFrames={30 * 60} // Default duration, overridden by props
                fps={30}
                width={1080}
                height={1920}
                schema={videoSchema}
                defaultProps={{
                    images: [],
                    captions: [],
                    audioUrl: '',
                    voiceVolume: 1,
                    musicVolume: 0.1,
                    fps: 30,
                    durationInFrames: 30 * 10,
                    styleId: 'minimal',
                }}
            />
        </>
    );
};
