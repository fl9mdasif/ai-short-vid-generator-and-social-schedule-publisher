import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { syncUser } from "@/actions/user";

export default async function DashboardPage() {
    const user = await currentUser();

    if (!user) {
        redirect("/sign-in");
    }

    // Sync user to Supabase
    await syncUser();

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Dashboard</h1>
                    <p className="text-zinc-500">Welcome back, {user.firstName}!</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-white border border-zinc-200 shadow-sm transition-all hover:shadow-md">
                    <h2 className="text-xl font-semibold mb-2 text-zinc-900">Recent Videos</h2>
                    <p className="text-zinc-500 text-sm">No videos generated yet.</p>
                </div>
                <div className="p-6 rounded-xl bg-white border border-zinc-200 shadow-sm transition-all hover:shadow-md">
                    <h2 className="text-xl font-semibold mb-2 text-zinc-900">Scheduled Posts</h2>
                    <p className="text-zinc-500 text-sm">No posts scheduled.</p>
                </div>
                <div className="p-6 rounded-xl bg-white border border-zinc-200 shadow-sm transition-all hover:shadow-md">
                    <h2 className="text-xl font-semibold mb-2 text-zinc-900">Quick Stats</h2>
                    <p className="text-zinc-500 text-sm">0 Views (Last 30 Days)</p>
                </div>
            </div>
        </div>
    );
}
