import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30 selection:text-indigo-200">
            <Navbar />
            <main className="container mx-auto px-4 py-24 md:px-6 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                <div className="prose prose-invert prose-indigo max-w-none space-y-6 text-zinc-300">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using vidMaxx ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
                            In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
                        <p>
                            vidMaxx provides users with AI-powered video generation and scheduling tools. You understand and agree that the Service
                            may include advertisements and that these advertisements are necessary for vidMaxx to provide the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. User Conduct</h2>
                        <p>You agree to not use the Service to:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li>Upload, post, email, transmit or otherwise make available any content that is unlawful, harmful, threatening, abusive, harassing, tortuous, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically or otherwise objectionable.</li>
                            <li>Harm minors in any way.</li>
                            <li>Impersonate any person or entity, including, but not limited to, a vidMaxx official, forum leader, guide or host, or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Intellectual Property</h2>
                        <p>
                            The Service and its original content, features, and functionality are and will remain the exclusive property of vidMaxx and its licensors.
                            The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Termination</h2>
                        <p>
                            We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever,
                            including without limitation if you breach the Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">6. Changes to Terms</h2>
                        <p>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.
                            What constitutes a material change will be determined at our sole discretion.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
