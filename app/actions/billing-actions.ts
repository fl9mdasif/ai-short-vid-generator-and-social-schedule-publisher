"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function upgradeUserPlan(plan: string) {
    const { userId } = await auth();

    if (!userId) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const client = await clerkClient();

        await client.users.updateUserMetadata(userId, {
            publicMetadata: {
                plan: plan
            }
        });

        revalidatePath("/dashboard/billing");
        revalidatePath("/dashboard/settings");
        revalidatePath("/dashboard/create");
        revalidatePath("/dashboard"); // Revalidate layout too

        return { success: true };
    } catch (error) {
        console.error("Error upgrading plan:", error);
        return { success: false, error: "Failed to upgrade plan" };
    }
}

export async function syncUserPlan() {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    try {
        const client = await clerkClient();

        // fetch subscription from Clerk
        // @ts-ignore - experimental API
        if (client.billing) {
            try {
                // @ts-ignore
                const sub = await client.billing.getUserBillingSubscription(userId);

                if (sub && sub.subscriptionItems && sub.subscriptionItems.length > 0) {
                    // Find the main active item
                    // We prioritize "active" items. If none, we check for items that are relevant.
                    // Accessing using 'any' to avoid strict type issues with experimental API
                    const activeItem = sub.subscriptionItems.find((item: any) => item.status === 'active');

                    if (activeItem && activeItem.plan) {
                        const planName = activeItem.plan.name; // e.g. "Basic" or "Unlimited"

                        // Update metadata to match the subscription
                        await client.users.updateUserMetadata(userId, {
                            publicMetadata: {
                                plan: planName
                            }
                        });

                        revalidatePath("/dashboard", "layout");
                        return { success: true, plan: planName };
                    }
                }
            } catch (err) {
                console.error("No subscription found or error fetching:", err);
                // If error (e.g. 404 no subscription), we might assume Free.
            }
        }

        // If we reach here, no active paid subscription was found.
        // We should double check if we didn't accidentally overwrite a valid manual assignment?
        // But the purpose of 'Sync' is to trust Clerk.
        // Let's safe-guard: If we didn't find a sub, we don't necessarily overwrite unless we are sure.
        // Actually, if they clicked "Sync" and have no sub, they are Free.

        // Let's just return current if we failed to find a new one, to be safe? 
        // Or if we found a sub but no active item.

        const user = await client.users.getUser(userId);
        return { success: true, plan: user.publicMetadata.plan };
    } catch (error) {
        console.error("Sync error:", error);
        return { success: false, error: "Sync failed" };
    }
}
