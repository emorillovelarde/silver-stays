"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Download, Star } from "lucide-react";
import Image from "next/image";
import { CalendarModalButton } from "@/components/success/calendar-modal-button";

const PDF_PATH = "/guides/guia-costa-del-sol-2026.pdf";
const GUIDE_COVER_IMAGE = "/images/guia-cover-2026.jpg";

type SuccessPageViewProps = {
  partnerAvatar: ReactNode;
};

export function SuccessPageView({ partnerAvatar }: SuccessPageViewProps) {
  const t = useTranslations("Success");

  return (
    <main className="min-h-screen bg-[#FAFAFA] font-sans text-[#1A1A1A]">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
        <div className="grid w-full grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-24">
          {/* Columna izquierda: La recompensa */}
          <section
            className="flex flex-col items-center lg:items-start"
            aria-labelledby="success-reward-heading"
          >
            <h2 id="success-reward-heading" className="sr-only">
              {t("rewardSectionLabel")}
            </h2>
            <div className="relative w-full max-w-[300px] sm:max-w-[320px]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-primary/12 bg-white shadow-xl">
                <Image
                  src={GUIDE_COVER_IMAGE}
                  alt={t("guideImageAlt")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 320px"
                  priority
                />
              </div>
            </div>

            <a
              href={PDF_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex min-h-[52px] w-full max-w-[320px] items-center justify-center gap-2 rounded-xl border-2 border-primary bg-transparent px-8 py-4 text-base font-semibold text-primary transition-colors duration-200 hover:bg-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAFA] sm:text-lg"
            >
              <Download className="h-5 w-5 shrink-0" aria-hidden />
              {t("downloadButton")}
            </a>
          </section>

          {/* Columna derecha: Agradecimiento + CTA premium */}
          <section
            className="flex flex-col justify-center lg:pt-4"
            aria-labelledby="success-thanks-heading"
          >
            <h1
              id="success-thanks-heading"
              className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl"
            >
              {t("title")}
            </h1>
            <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-gray-600">
              {t("description")}
            </p>

            <div className="mt-14 border-t border-gray-200/80 pt-12">
              <div className="flex items-center gap-4">
                {partnerAvatar}
                <p className="min-w-0 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 leading-snug">
                  {t("nextStepLabel")}
                </p>
              </div>

              <h2 className="mt-5 text-2xl font-semibold leading-snug text-primary sm:text-3xl">
                {t("nextStepTitle")}
              </h2>
              <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-gray-600">
                {t("nextStepDescription")}
              </p>

              <div className="mt-10">
                <CalendarModalButton
                  buttonText={t("bookCallButton")}
                  closeAriaLabel={t("modalClose")}
                />
              </div>

              <p className="mt-8 text-sm font-light text-gray-500">
                <span className="text-primary">•</span> {t("bullet1")}
                <span className="mx-3 inline-block text-gray-300">|</span>
                <span className="text-primary">•</span> {t("bullet2")}
              </p>

              <div className="mt-8 border-t border-gray-100 pt-6">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-0.5" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-amber-400/55 text-amber-500/70"
                        strokeWidth={1.25}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500">{t("trustBadge")}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/"
            className="text-sm text-gray-400 underline-offset-4 transition-colors hover:text-gray-600 hover:underline"
          >
            {t("backToHome")}
          </Link>
        </div>
      </div>
    </main>
  );
}
