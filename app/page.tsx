import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import OverviewSection from "@/components/OverviewSection";
import ToolsGrid from "@/components/ToolsGrid";
import LiveFeed from "@/components/LiveFeed";
import HowItWorks from "@/components/HowItWorks";
import RanksSection from "@/components/RanksSection";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <OverviewSection />
        <LiveFeed />
        <ToolsGrid />
        <HowItWorks />
        <RanksSection />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  );
}
