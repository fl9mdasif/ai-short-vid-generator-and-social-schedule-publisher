import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserSeries } from "@/app/actions/dashboard-actions";
import { SeriesCard } from "@/components/dashboard/series-card";
import { CreateSeriesButton } from "@/components/dashboard/create-series-button";
import { syncUser } from "@/app/actions/user";
import { getUserPlan, PLAN_LIMITS } from "@/lib/plan-limits";

// Force dynamic rendering to prevent caching issues with user-specific data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage() {
    const user = await currentUser();

    if (!user) {
        redirect("/sign-in");
    }

    // Sync user to Supabase
    await syncUser();

    // Fetch user series
    const { data: seriesList } = await getUserSeries();

    // Check Limits
    const userPlan = await getUserPlan(user.id);
    const limit = PLAN_LIMITS[userPlan].maxSeries;
    const currentCount = seriesList?.length || 0;
    const hasReachedLimit = currentCount >= limit;

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Dashboard</h1>
                    <p className="text-zinc-500">Welcome back, {user.firstName}!</p>
                </div>
                <CreateSeriesButton
                    hasReachedLimit={hasReachedLimit}
                    planName={userPlan}
                    maxSeries={limit}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20"
                />
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-zinc-900">Your Series</h2>

                {seriesList && seriesList.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {seriesList.map((series) => (
                            <SeriesCard key={series.id} series={series} />
                        ))}
                    </div>
                ) : (
                    <div className="p-12 text-center border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50/50">
                        <div className="max-w-md mx-auto">
                            <h3 className="text-lg font-medium text-zinc-900 mb-2">No series created yet</h3>
                            <p className="text-zinc-500 mb-6">Get started by creating your first AI-generated video series.</p>
                            <CreateSeriesButton
                                hasReachedLimit={hasReachedLimit}
                                planName={userPlan}
                                maxSeries={limit}
                                variant="outline"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
