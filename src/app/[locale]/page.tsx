import { Hero } from "@/components/home/hero";
import { StepsSection } from "@/components/home/steps-section";
import { TrustBar } from "@/components/home/trust-bar";
import { WhyCostaDelSol } from "@/components/home/why-costa-del-sol";
import { BentoGrid } from "@/components/home/bento-grid";
import { FaqSection } from "@/components/home/faq-section";
import { ResourceCenter } from "@/components/home/resource-center";
import { AboutBluevera } from "@/components/home/about-bluevera";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("Footer");

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

      <footer className="bg-[#1A365D] py-12 text-center text-white">
        <div className="container mx-auto px-4">
          <p className="mb-6 text-xl text-white/95">{t("cta")}</p>
          <Link
            href="/questionnaire"
            className="inline-block rounded-full border-0 bg-[#D9734E] px-8 py-3 text-lg font-bold text-white shadow-none transition-colors hover:bg-[#c45d3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9734E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A365D]"
          >
            {t("questionnaire")}
          </Link>
          <p className="mt-8 text-sm text-white/60">{t("copyright")}</p>
        </div>
      </footer>
    </main>
  );
}
