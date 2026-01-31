import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { generateVideo } from "@/inngest/functions/generate-video";

// Create an API that serves the functions
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        generateVideo,
    ],
});
