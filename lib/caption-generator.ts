import { deepgram } from "./deepgram";
import { srt } from "@deepgram/captions";

export interface Caption {
    word: string;
    start: number;
    end: number;
    confidence: number;
}

export async function generateCaptions(voiceUrl: string): Promise<Caption[]> {
    try {
        const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
            { url: voiceUrl },
            {
                smart_format: true,
                punctuate: true,
                utterances: true
            }
        );

        if (error) {
            throw new Error(`Deepgram transcription error: ${error.message}`);
        }

        // Extract words with timestamps
        // Deepgram returns: results -> channels -> alternatives -> words
        const words = result.results?.channels[0]?.alternatives[0]?.words;

        if (!words || words.length === 0) {
            throw new Error("No words found in transcription result");
        }

        return words.map((w: any) => ({
            word: w.word,
            start: w.start,
            end: w.end,
            confidence: w.confidence
        }));
    } catch (error) {
        console.error("Caption Generation Error:", error);
        throw error;
    }
}

export async function generateSRT(voiceUrl: string): Promise<string> {
    try {
        const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
            { url: voiceUrl },
            {
                smart_format: true,
                punctuate: true,
                utterances: true
            }
        );

        if (error) {
            throw new Error(`Deepgram transcription error: ${error.message}`);
        }

        // Convert Deepgram response to SRT format using @deepgram/captions
        const srtCaptions = srt(result);

        return srtCaptions;
    } catch (error) {
        console.error("SRT Generation Error:", error);
        throw error;
    }
}
