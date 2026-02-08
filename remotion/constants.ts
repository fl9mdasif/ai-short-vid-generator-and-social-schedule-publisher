import { z } from 'zod';

export const COMPOSITION_ID = 'AiVideoComposition';

export const videoSchema = z.object({
    images: z.array(z.string()),
    captions: z.array(
        z.object({
            text: z.string(),
            start: z.number(), // in seconds
            end: z.number(), // in seconds
        })
    ),
    audioUrl: z.string(),
    voiceVolume: z.number().optional(),
    musicVolume: z.number().optional(),
    styleId: z.string().optional(),
    fps: z.number(),
    durationInFrames: z.number(),
});

export type VideoSchema = z.infer<typeof videoSchema>;
