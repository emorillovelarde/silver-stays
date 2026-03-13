"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden font-sans">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-marbella.png"
          alt={t("imageAlt")}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div
          className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/60 via-white/0 to-transparent z-[15]"
          aria-hidden
        />
      </div>

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto space-y-6 mt-[15vh] animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg leading-tight tracking-tight">
          {t("headline")}
        </h1>
        <h2 className="text-xl md:text-2xl text-white font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          {t("subtitle")}
        </h2>

        <div className="pt-6 flex flex-col items-center">
          <Link
            href="/questionnaire"
            className="inline-flex items-center justify-center min-h-[52px] px-10 py-4 text-lg font-semibold text-white bg-[#004F56] rounded-xl hover:bg-[#004F56]/90 hover:scale-[1.02] transition-all duration-300 shadow-lg focus:outline-none"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
