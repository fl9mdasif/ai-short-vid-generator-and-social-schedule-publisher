import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { currentUser } from "@clerk/nextjs/server";
import { getUserSeries } from "@/app/actions/dashboard-actions";
import { getUserPlan, PLAN_LIMITS, PlanType } from "@/lib/plan-limits";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await currentUser();
    let hasReachedLimit = false;
    let userPlan: PlanType = "Free";
    let limit = 1;

    if (user) {
        // Fetch user series
        const { data: seriesList } = await getUserSeries();

        // Check Limits
        userPlan = await getUserPlan(user.id);
        limit = PLAN_LIMITS[userPlan].maxSeries;
        const currentCount = seriesList?.length || 0;
        hasReachedLimit = currentCount >= limit;
    }

    return (
        <div className="flex h-screen bg-gray-50 text-zinc-900">
            {/* Sidebar */}
            <div className="hidden md:flex flex-col fixed inset-y-0 z-50 w-72 border-r bg-white shadow-sm">
                <Sidebar
                    hasReachedLimit={hasReachedLimit}
                    planName={userPlan}
                    maxSeries={limit}
                />
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col md:pl-72 w-full">
                {/* Header (Top) */}
                <Header
                    hasReachedLimit={hasReachedLimit}
                    planName={userPlan}
                    maxSeries={limit}
                />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
