"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Download, Home, Shield, Heart, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { CalendarModalButton } from "@/components/success/calendar-modal-button";

const PDF_PATH = "/guides/guia-costa-del-sol-2026.pdf";
const GUIDE_COVER_IMAGE = "/images/guia-cover-2026.jpg";

type PillarKey =
  | "pillar1Title"
  | "pillar2Title"
  | "pillar3Title"
  | "pillar4Title";
type PillarTextKey =
  | "pillar1Text"
  | "pillar2Text"
  | "pillar3Text"
  | "pillar4Text";

const PILLARS: {
  Icon: LucideIcon;
  titleKey: PillarKey;
  textKey: PillarTextKey;
}[] = [
  { Icon: Home, titleKey: "pillar1Title", textKey: "pillar1Text" },
  { Icon: Shield, titleKey: "pillar2Title", textKey: "pillar2Text" },
  { Icon: Heart, titleKey: "pillar3Title", textKey: "pillar3Text" },
  { Icon: Users, titleKey: "pillar4Title", textKey: "pillar4Text" },
];

export function SuccessPageView() {
  const t = useTranslations("Success");

  return (
    <main className="min-h-screen bg-[#FAFAF8] font-sans text-[#1A1A1A]">
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-card    { animation: fadeSlideUp 400ms ease both; animation-delay: 100ms; }
        .anim-section { animation: fadeSlideUp 400ms ease both; animation-delay: 250ms; }
      `}</style>

      {/* ── Hero navy ─────────────────────────────────────── */}
      <div className="bg-[#1B2A49] px-6 py-12 text-center">
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#C96B4A] bg-[rgba(201,107,74,0.15)]"
          aria-hidden
        >
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C96B4A"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base font-light leading-relaxed text-white/65">
          {t("description")}
        </p>
      </div>

      {/* ── Content ───────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-[600px] px-5 py-10 sm:px-6">
        {/* Guide download card */}
        <div className="anim-card overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-stretch">
            <div className="relative w-20 shrink-0 bg-[#1B2A49]">
              <Image
                src={GUIDE_COVER_IMAGE}
                alt={t("guideImageAlt")}
                fill
                className="object-cover opacity-80"
                sizes="80px"
                priority
              />
            </div>

            <div className="flex flex-1 flex-col justify-between gap-4 p-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8A8D91]">
                  2026 Guide
                </p>
                <p className="mt-1 text-base font-semibold text-[#1B2A49]">
                  Costa del Sol Winter Guide
                </p>
              </div>

              <a
                href={PDF_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 self-start rounded-lg bg-[#C96B4A] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#b55c3d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C96B4A] focus-visible:ring-offset-2"
              >
                <Download className="h-4 w-4 shrink-0" aria-hidden />
                {t("downloadButton")}
              </a>
            </div>
          </div>
        </div>

        <p className="mt-3 text-center text-xs font-light text-[#8A8D91]">
          {t("spamFallback")}
        </p>

        {/* Optional next step card */}
        <div className="anim-section mt-6 overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <span className="inline-block rounded-full border border-[rgba(201,107,74,0.25)] bg-[rgba(201,107,74,0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#C96B4A]">
            {t("nextStepLabel")}
          </span>

          <h2 className="mt-5 font-serif text-2xl font-bold leading-snug text-[#1B2A49] sm:text-3xl">
            {t("nextStepTitle")}
          </h2>
          <p className="mt-4 text-base font-light leading-relaxed text-[#8A8D91]">
            {t("nextStepDescription")}
          </p>

          {/* 4-pillar grid */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {PILLARS.map(({ Icon, titleKey, textKey }) => (
              <div
                key={titleKey}
                className="flex items-start gap-3 rounded-lg border border-gray-100 bg-[#FAFAF8] p-3"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[rgba(27,42,73,0.06)]">
                  <Icon
                    className="h-4 w-4 text-[#1B2A49]"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-[#1B2A49]">
                    {t(titleKey)}
                  </p>
                  <p className="text-[11px] text-[#8A8D91]">{t(textKey)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8">
            <CalendarModalButton
              buttonText={t("bookCallButton")}
              closeAriaLabel={t("modalClose")}
            />
            <p className="mt-3 text-xs font-light text-[#8A8D91]">
              {t("callSubtext")}
            </p>
          </div>

          {/* Trust row */}
          <div className="mt-8 border-t border-gray-100 pt-5">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="#C96B4A"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-[#8A8D91]">{t("trustBadge")}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-sm font-light text-[#8A8D91]">
            {t("teamSignature")}
          </p>
          <Link
            href="/"
            className="text-sm text-[#8A8D91] underline-offset-4 transition-colors hover:text-[#1B2A49] hover:underline"
          >
            {t("backToHome")}
          </Link>
        </div>
      </div>
    </main>
  );
}
