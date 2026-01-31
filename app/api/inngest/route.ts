import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { helloWorld } from "@/inngest/functions/hello-world";

// Create an API that serves the functions
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        helloWorld,
    ],
});
