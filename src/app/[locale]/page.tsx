import { Hero } from "@/components/home/hero";
import { StepsSection } from "@/components/home/steps-section";
import { TrustBar } from "@/components/home/trust-bar";
import { WhyCostaDelSol } from "@/components/home/why-costa-del-sol";
import { BentoGrid } from "@/components/home/bento-grid";
import { FaqSection } from "@/components/home/faq-section";
import { ResourceCenter } from "@/components/home/resource-center";
import { AboutBluevera } from "@/components/home/about-bluevera";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans text-slate-800">
      <Hero />
      <StepsSection />
      <TrustBar />
      <WhyCostaDelSol />
      <BentoGrid />
      <FaqSection />
      <ResourceCenter />
      <AboutBluevera />
    </main>
  );
}
