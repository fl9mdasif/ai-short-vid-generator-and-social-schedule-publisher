export type PlanType = "Free" | "Basic" | "Unlimited";

export const PLAN_LIMITS = {
    Free: {
        maxSeries: 2,
        // "email" is implied as always allowed or handled separately. 
        // User said "connect to email and youtube account only".
        allowedPlatforms: ["youtube"]
    },
    Basic: {
        maxSeries: 4,
        allowedPlatforms: ["youtube"]
    },
    Unlimited: {
        maxSeries: Infinity,
        allowedPlatforms: ["youtube", "instagram", "tiktok", "facebook"] // All
    }
};

export async function getUserPlan(userId: string): Promise<PlanType> {
    // TODO: Fetch from DB or Clerk metadata
    // For now, default to Free to test constraints
    return "Free";
}
