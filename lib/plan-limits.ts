import { auth, clerkClient } from "@clerk/nextjs/server";

export type PlanType = "Free" | "Basic" | "Unlimited";

export const PLAN_LIMITS = {
    Free: {
        maxSeries: 1,
        // "email" is implied as always allowed or handled separately. 
        // User said "connect to email and youtube account only".
        allowedPlatforms: ["youtube"]
    },
    Basic: {
        maxSeries: 3,
        allowedPlatforms: ["youtube"]
    },
    Unlimited: {
        maxSeries: Infinity,
        allowedPlatforms: ["youtube", "instagram", "tiktok", "facebook"] // All
    }
};

export async function getUserPlan(userId: string): Promise<PlanType> {
    try {
        const client = await clerkClient();
        const user = await client.users.getUser(userId);

        const plan = user.publicMetadata.plan as PlanType | undefined;

        // Default to Free if no plan is set or valid
        if (plan && (plan === "Basic" || plan === "Unlimited")) {
            return plan;
        }

        return "Free";
    } catch (error) {
        console.error("Error fetching user plan:", error);
        return "Free";
    }
}
