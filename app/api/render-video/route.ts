import { NextRequest, NextResponse } from 'next/server';
import { renderMediaOnLambda } from '@remotion/lambda/client';
import { COMPOSITION_ID } from '@/remotion/constants';

// You should store these in env vars or config
const REGION = 'us-east-1';
const FUNCTION_NAME = process.env.REMOTION_LAMBDA_FUNCTION_NAME || 'remotion-render-function';
const SERVE_URL = process.env.REMOTION_SERVE_URL || 'remotion-serve-url';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { images, captions, audioUrl, fps = 30 } = body;

        if (!images || !images.length) {
            return NextResponse.json({ error: 'Images are required' }, { status: 400 });
        }

        // Calculate duration based on images or audio
        // For now, let's assume 3 seconds per image or passed from body
        const durationInFrames = Math.floor((images.length * 3) * fps);

        const { renderId, bucketName } = await renderMediaOnLambda({
            region: REGION,
            functionName: FUNCTION_NAME,
            serveUrl: SERVE_URL,
            composition: COMPOSITION_ID,
            inputProps: {
                images,
                captions: captions || [],
                audioUrl,
                fps,
                durationInFrames,
            },
            codec: 'h264',
        });

        return NextResponse.json({
            success: true,
            renderId,
            bucketName,
            status: 'rendering'
        });

    } catch (error: any) {
        console.error('Error triggering Lambda render:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
