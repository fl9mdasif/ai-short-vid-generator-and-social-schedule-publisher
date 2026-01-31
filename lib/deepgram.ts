import { createClient } from "@deepgram/sdk";

if (!process.env.DEEPGRAM_API_KEY) {
    console.warn("Missing DEEPGRAM_API_KEY environment variable");
}

export const deepgram = createClient(process.env.DEEPGRAM_API_KEY || "");
