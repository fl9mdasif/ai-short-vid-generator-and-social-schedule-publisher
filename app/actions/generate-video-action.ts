"use server";

import { inngest } from "@/inngest/client";
import { auth } from "@clerk/nextjs/server";

export async function triggerVideoGeneration(seriesId: string) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return { success: false, error: "Unauthorized" };
        }

        // Send event to Inngest
        await inngest.send({
            name: "video/generate.requested",
            data: {
                seriesId,
                userId
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Error triggering video generation:", error);
        return { success: false, error: "Failed to trigger generation" };
    }
}
