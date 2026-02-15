"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-marbella.png"
          alt={t("imageAlt")}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg leading-tight">
          {t("headline")}
        </h1>
        <p className="text-xl md:text-2xl text-white font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-md">
          {t("subtitle")}
        </p>

        <div className="pt-4 flex flex-col items-center">
          <Link href="/questionnaire">
            <Button
              size="lg"
              className="h-16 px-12 text-2xl font-bold bg-primary hover:bg-primary/90 transition-all transform hover:scale-105 shadow-xl rounded-full border-2 border-white/20"
            >
              {t("cta")}
              <ArrowRight className="ml-3 h-8 w-8" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
