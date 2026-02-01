// Using Pollinations AI - Free tier (no auth required)
// Simplified approach for better stability

export async function generateImage(prompt: string): Promise<string> {
    try {
        console.log("Generating image with Pollinations AI for prompt:", prompt);

        // Use simple URL-based API without authentication (free tier)
        const encodedPrompt = encodeURIComponent(prompt);

        // Use default model (no model parameter for stability)
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;

        console.log("Image URL generated:", imageUrl);

        // The URL itself is the image - can be used directly
        // Pollinations generates on-demand when the URL is accessed
        return imageUrl;
    } catch (error) {
        console.error("Pollinations Image Generation Error:", error);
        throw error;
    }
}
