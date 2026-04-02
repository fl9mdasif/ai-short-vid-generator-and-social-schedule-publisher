import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BillingContent } from "@/components/billing/billing-content";

export default function PublicBillingPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30 selection:text-indigo-200">

            <main className="pt-32 pb-20 px-4 md:px-6">
                <BillingContent />
            </main>

        </div>
    );
}
