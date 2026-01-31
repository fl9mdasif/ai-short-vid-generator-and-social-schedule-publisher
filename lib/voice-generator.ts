import { deepgram } from "./deepgram";

export async function generateVoice(
    script: string,
    voiceModel: string,    // e.g. "aura-2-odysseus-en" or "vaanee"
    provider: "deepgram" | "fonadalab",
    language?: string // Required for Fonada
): Promise<Buffer> {
    if (provider === "deepgram") {
        return await generateDeepgramAudio(script, voiceModel);
    } else if (provider === "fonadalab") {
        if (!language) throw new Error("Language is required for FonadaLabs TTS");
        return await generateFonadaAudio(script, voiceModel, language);
    }
    throw new Error(`Unsupported voice provider: ${provider}`);
}

async function generateDeepgramAudio(text: string, model: string): Promise<Buffer> {
    const response = await deepgram.speak.request(
        { text },
        {
            model: model,
            encoding: "mp3",
        }
    );

    const stream = await response.getStream();

    if (!stream) {
        throw new Error("Deepgram: No stream returned");
    }

    const buffer = await streamToBuffer(stream);
    return buffer;
}

// FonadaLabs Implementation
// FonadaLabs Implementation
async function generateFonadaAudio(text: string, voice: string, language: string): Promise<Buffer> {
    const apiKey = process.env.FONADALAB_API_KEY;
    if (!apiKey) {
        throw new Error("Missing FONADALAB_API_KEY environment variable");
    }

    // Fonada has a limit of ~450 chars or 30s. We chunk the text.
    const MAX_CHARS = 400; // Safety margin below 450
    const chunks = chunkText(text, MAX_CHARS);

    console.log(`Fonada: Splitting text into ${chunks.length} chunks`);

    const audioBuffers: Buffer[] = [];

    for (const chunk of chunks) {
        const response = await fetch("https://api.fonada.ai/tts/generate-audio-large", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                input: chunk,
                voice: voice,
                language: language
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`FonadaLabs API Error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        audioBuffers.push(Buffer.from(arrayBuffer));
    }

    return Buffer.concat(audioBuffers);
}

function chunkText(text: string, maxLength: number): string[] {
    if (text.length <= maxLength) return [text];

    const chunks: string[] = [];
    let currentChunk = "";

    // Split by sentences first
    const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];

    for (const sentence of sentences) {
        if ((currentChunk + sentence).length <= maxLength) {
            currentChunk += sentence;
        } else {
            // If the current chunk is not empty, push it
            if (currentChunk) {
                chunks.push(currentChunk.trim());
                currentChunk = "";
            }

            // If a single sentence is too long, strictly force split it
            if (sentence.length > maxLength) {
                // Split by comma or worst case hard character limit
                // simplistic hard split for now to guarantee safety
                let remaining = sentence;
                while (remaining.length > 0) {
                    let splitIndex = remaining.lastIndexOf(' ', maxLength);
                    if (splitIndex === -1) splitIndex = maxLength; // No space, hard cut

                    // If we are at the start and the first word is huge, just take maxLength
                    if (splitIndex === 0) splitIndex = maxLength;

                    // If splitting by space leaves us with a chunk > maxLength (shouldnt happen w logic above but safe guard)
                    if (splitIndex > maxLength) splitIndex = maxLength;

                    chunks.push(remaining.substring(0, splitIndex).trim());
                    remaining = remaining.substring(splitIndex).trim();
                }
            } else {
                currentChunk = sentence;
            }
        }
    }

    if (currentChunk) {
        chunks.push(currentChunk.trim());
    }

    return chunks;
}

async function streamToBuffer(stream: ReadableStream): Promise<Buffer> {
    const reader = stream.getReader();
    const chunks = [];

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
    }

    return Buffer.concat(chunks);
}
