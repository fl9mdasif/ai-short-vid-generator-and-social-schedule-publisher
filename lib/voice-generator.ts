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

    // FonadaLabs FREE version limits: 30 seconds audio OR 450 characters max per request
    const MAX_CHARS = 400; // Safety margin below 450 char limit
    const chunks = chunkText(text, MAX_CHARS);

    console.log(`Fonada: Input text length: ${text.length} chars`);
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

    // Split by sentences - support both English (.,!,?) and Hindi/Devanagari (।) punctuation
    // Hindi uses purna viram (।) as sentence delimiter
    const sentences = text.match(/[^.!?।]+[.!?।]+/g) || [text];

    console.log(`Total sentences found: ${sentences.length}`);

    for (const sentence of sentences) {
        const trimmedSentence = sentence.trim();

        if ((currentChunk + " " + trimmedSentence).length <= maxLength) {
            currentChunk += (currentChunk ? " " : "") + trimmedSentence;
        } else {
            // If the current chunk is not empty, push it
            if (currentChunk) {
                chunks.push(currentChunk.trim());
                console.log(`Chunk ${chunks.length}: ${currentChunk.length} chars`);
                currentChunk = "";
            }

            // If a single sentence is too long, split it
            if (trimmedSentence.length > maxLength) {
                console.log(`Long sentence detected: ${trimmedSentence.length} chars, splitting...`);
                let remaining = trimmedSentence;
                while (remaining.length > 0) {
                    // Try to split at word boundary (space) near maxLength
                    let splitIndex = maxLength;
                    if (remaining.length > maxLength) {
                        // Look for last space before maxLength
                        const lastSpace = remaining.lastIndexOf(' ', maxLength);
                        if (lastSpace > maxLength * 0.7) { // Only split at space if it's reasonably close
                            splitIndex = lastSpace;
                        }
                    } else {
                        splitIndex = remaining.length;
                    }

                    const chunk = remaining.substring(0, splitIndex).trim();
                    if (chunk) {
                        chunks.push(chunk);
                        console.log(`Chunk ${chunks.length}: ${chunk.length} chars`);
                    }
                    remaining = remaining.substring(splitIndex).trim();
                }
            } else {
                currentChunk = trimmedSentence;
            }
        }
    }

    if (currentChunk) {
        chunks.push(currentChunk.trim());
        console.log(`Final chunk ${chunks.length}: ${currentChunk.length} chars`);
    }

    console.log(`Total chunks created: ${chunks.length}`);
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
