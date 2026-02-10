import { inngest } from "../client";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const scheduleDailyVideos = inngest.createFunction(
    { id: "schedule-daily-videos" },
    { cron: "0 */4 * * *" }, // Run every 4 hours to check for upcoming videos
    async ({ step }) => {
        const activeSeries = await step.run("fetch-active-series", async () => {
            const { data, error } = await supabaseAdmin
                .from("video_generations")
                .select("*")
                .eq("status", "active");

            if (error) {
                throw new Error(`Failed to fetch active series: ${error.message}`);
            }
            return data || [];
        });

        if (activeSeries.length === 0) {
            console.log("No active series found.");
            return { processed: 0 };
        }

        const events = await step.run("calculate-and-schedule", async () => {
            const now = new Date();
            const eventsToSend: any[] = [];

            for (const series of activeSeries) {
                if (!series.publish_time) continue;

                try {
                    const [hours, minutes] = series.publish_time.split(':').map(Number);

                    // Create date object for the *next* occurrence of this time
                    // or today if it's in the future
                    let publishDate = new Date();
                    publishDate.setHours(hours, minutes, 0, 0);

                    // If publish time for today has passed, schedule for tomorrow?
                    // OR if the cron runs every 4 hours, we only care if the *next* publish time 
                    // is within a certain window (e.g., next 6 hours).

                    // Logic:
                    // We want to generate ~2 hours before publish time.
                    // Generation Time = Publish Time - 2 hours.

                    const generationTime = new Date(publishDate.getTime() - 2 * 60 * 60 * 1000);

                    // If we are already past the generation time for today, 
                    // AND it's late in the day, maybe we should focus on tomorrow?
                    // For simplicity in this iteration:
                    // If generationTime is in the past (but recently, e.g. < 4 hours ago) or in the near future (next 4 hours),
                    // we trigger it.

                    // Better approach for "Every 4 hours" cron:
                    // Look for any generation that needs to happen in the next 4 hours.

                    // If generationTime < now, it might mean we missed it OR it's for tomorrow.
                    if (generationTime.getTime() < now.getTime()) {
                        // Check if we just missed it (e.g. within last hour), then trigger immediately?
                        // Or assume it's for tomorrow.
                        // Let's keep it simple: publishDate is today. 
                        // If publishDate is in the past, ignore (already handled or missed).
                        // If publishDate is in future:
                        // Check if generationTime is within [now, now + 5 hours]
                    }

                    const timeDiff = generationTime.getTime() - now.getTime();
                    const hoursUntilGeneration = timeDiff / (1000 * 60 * 60);

                    console.log(`Series ${series.series_name}: Publish at ${publishDate.toLocaleTimeString()}, Generate at ${generationTime.toLocaleTimeString()} (${hoursUntilGeneration.toFixed(2)}h from now)`);

                    // If generation time is within the next 4.5 hours (covering the 4h cron window + buffer)
                    // AND we haven't passed it by too much (e.g. -1 hour, meaning we are slightly late but should still run)
                    if (hoursUntilGeneration <= 4.5 && hoursUntilGeneration > -1) {
                        // Unique ID to prevent duplicate runs for the same day
                        // e.g., generate-series_123-2023-10-27
                        const dateStr = now.toISOString().split('T')[0];
                        const eventId = `generate-${series.id}-${dateStr}`;

                        eventsToSend.push({
                            name: "video/generate.requested",
                            data: { seriesId: series.id },
                            id: eventId, // Idempotency key
                            // We don't necessarily need 'ts' if we trigger it now and rely on "wait-for-publish" step in the function
                            // But if we want to delay the start effectively we can use ts? 
                            // Actually, since we have the sleep step inside generate-video, 
                            // we can trigger it "now" (or whenever the cron runs) 
                            // and it will generate, then wait. 
                            // The requirement was: "Generate video 2 hours before". 
                            // So we should ideally schedule getting *started* at generationTime.
                            ts: generationTime.getTime() > now.getTime() ? generationTime.getTime() : undefined
                        });
                    }

                } catch (e) {
                    console.error(`Error processing series ${series.id}:`, e);
                }
            }
            return eventsToSend;
        });

        if (events.length > 0) {
            await step.sendEvent("trigger-generations", events);
        }

        return { processed: events.length, events };
    }
);
