import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-50 text-zinc-900">
            {/* Sidebar */}
            <div className="hidden md:flex flex-col fixed inset-y-0 z-50 w-72 border-r bg-white shadow-sm">
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col md:pl-72 w-full">
                {/* Header (Top) */}
                <Header />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
