import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { StepsTimeline } from "./steps-timeline";

export async function StepsSection() {
  const t = await getTranslations("StepsSection");

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 sm:mb-20 text-brand-navy">
          {t("stepsTitle")}
        </h1>

        {/* Two-column layout: Timeline (45%) | Image (55%) */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">
          {/* Left column - Timeline (~45%) */}
          <div className="lg:w-[45%] lg:min-w-0">
            <StepsTimeline />
          </div>

          {/* Right column - Aspirational image (~55%) */}
          <div className="lg:w-[55%] lg:min-w-0">
            <div className="relative w-full h-[400px] sm:h-[500px] lg:h-full min-h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/images/silver_stays_premium_terrace.jpg"
                alt={t("imageAlt")}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
