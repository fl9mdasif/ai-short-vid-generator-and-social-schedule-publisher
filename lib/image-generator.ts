// Using Pollinations AI - Flux model (turbo servers are down)
// Correct endpoint: gen.pollinations.ai with Authorization header

export async function generateImage(prompt: string): Promise<string> {
    try {
        console.log("Generating image with Pollinations AI (Flux model) for prompt:", prompt);

        const apiKey = process.env.POLLINATIONS_API_KEY;
        if (!apiKey) {
            throw new Error("Missing POLLINATIONS_API_KEY environment variable");
        }

        // Pollinations AI correct endpoint: gen.pollinations.ai
        const encodedPrompt = encodeURIComponent(prompt);
        const imageUrl = `https://gen.pollinations.ai/image/${encodedPrompt}?model=flux&width=1024&height=1024&nologo=true&enhance=true`;

        // Fetch the image with Authorization header
        const response = await fetch(imageUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Pollinations API Error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        console.log("Image generated successfully:", imageUrl);

        // The URL itself is the image - can be used directly
        return imageUrl;
    } catch (error) {
        console.error("Pollinations Image Generation Error:", error);
        throw error;
    }
}
