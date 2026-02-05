import { NextRequest, NextResponse } from 'next/server';
import { getRenderProgress } from '@remotion/lambda/client';

const REGION = 'us-east-1';
const FUNCTION_NAME = process.env.REMOTION_LAMBDA_FUNCTION_NAME || 'remotion-render-function';

export async function POST(req: NextRequest) {
    try {
        const { renderId, bucketName } = await req.json();

        if (!renderId || !bucketName) {
            return NextResponse.json({ error: 'Render ID and Bucket Name required' }, { status: 400 });
        }

        const progress = await getRenderProgress({
            renderId,
            bucketName,
            functionName: FUNCTION_NAME,
            region: REGION,
        });

        if (progress.done) {
            // Here you would typically update the database with progress.outputFile
            // For now we just return the URL
            return NextResponse.json({
                status: 'completed',
                url: progress.outputFile,
                progress: 1
            });
        }

        if (progress.fatalErrorEncountered) {
            return NextResponse.json({
                status: 'failed',
                error: progress.errors[0].message
            });
        }

        return NextResponse.json({
            status: 'rendering',
            progress: progress.overallProgress
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
