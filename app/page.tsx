import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero/hero";
import { Footer } from "@/components/footer";
import { VideoType } from "@/components/hero/video-type";
import { Features } from "@/components/hero/features";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />
      <main>
        <Hero />
        <Features />
        {/* Additional sections can be added here (Pricing, Testimonials, FAQ) */}
        <VideoType />
      </main>
      <Footer />
    </div>
  );
}
