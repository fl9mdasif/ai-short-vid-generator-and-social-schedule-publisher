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
        <div className="min-h-screen bg-black pt-24 text-white">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <p className="text-zinc-400">Welcome back, {user.firstName}!</p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
                        <h2 className="text-xl font-semibold mb-2">Recent Videos</h2>
                        <p className="text-zinc-500 text-sm">No videos generated yet.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
