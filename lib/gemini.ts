import { GoogleGenAI } from "@google/genai";

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    console.warn("Missing NEXT_PUBLIC_GEMINI_API_KEY environment variable");
}

// The client gets the API key from the environment variable
const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
});

export const genAI = ai;
export const model = "gemini-2.5-flash";
