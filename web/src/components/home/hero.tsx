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
          src="/images/hero-marbella.jpg"
          alt={t("imageAlt")}
          fill
          className="object-cover"
          priority
        />
        {/* Azul marino corporativo ~40%: contraste elegante para texto blanco nítido */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[rgba(26,54,93,0.4)]"
          aria-hidden
        />
      </div>

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto space-y-6 mt-[15vh] animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#FFFFFF] leading-tight tracking-tight">
          {t("headline")}
        </h1>
        <p className="font-sans text-xl md:text-2xl text-[#FFFFFF] font-medium max-w-2xl mx-auto leading-relaxed text-pretty antialiased">
          {t("subtitle")}
        </p>

        <div className="pt-6 flex flex-col items-center">
          <Link
            href="/questionnaire"
            className="inline-flex items-center justify-center min-h-[52px] px-10 py-4 text-lg font-semibold text-[#FFFFFF] bg-brand-cta rounded-full shadow-sm transition-all duration-300 hover:bg-brand-cta-hover hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cta focus-visible:ring-offset-2"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
