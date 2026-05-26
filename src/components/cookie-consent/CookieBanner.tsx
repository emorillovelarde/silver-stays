"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

/**
 * Bottom-fixed cookie banner. Three buttons with identical visual
 * prominence (same size, same height, same font-size): Reject, Customize,
 * Accept. The button order is intentionally Reject → Customize → Accept
 * on both desktop and mobile — the user should pass through the options
 * before reaching "Accept all" (no dark patterns).
 *
 * The banner is render-controlled by CookieConsentManager. It calls back
 * to the manager for each action — it does not touch localStorage itself.
 */
export function CookieBanner({
  locale,
  onAcceptAll,
  onRejectAll,
  onCustomize,
}: {
  locale: "en" | "es";
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onCustomize: () => void;
}) {
  const t = useTranslations("CookieConsent.banner");

  const cookiePolicyHref =
    locale === "es" ? "/es/politica-cookies" : "/en/cookie-policy";

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={t("ariaLabel")}
      // z-index 9999 keeps the banner over header, footer and any
      // other fixed UI. Fixed positioning means no layout shift —
      // page content is not pushed when the banner mounts.
      className="fixed inset-x-0 bottom-0 z-[9999] border-t border-[#1B2A49]/10 bg-white shadow-[0_-4px_20px_-4px_rgba(27,42,73,0.15)]"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-5 px-5 py-5 sm:py-6 md:flex-row md:items-center md:gap-6">
        <p className="flex-1 text-base leading-relaxed text-[#1B2A49]">
          {t.rich("body", {
            link: (chunks) => (
              <Link
                href={cookiePolicyHref}
                className="text-[#C96B4A] underline underline-offset-2 hover:text-[#1B2A49]"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:items-stretch">
          {/*
            Mobile: three buttons stacked Reject → Customize → Accept.
            Desktop: three buttons side by side in the same order.
            All three share padding, border-radius, font-size and height
            so visual prominence is identical (compliance requirement).
          */}
          <button
            type="button"
            onClick={onRejectAll}
            className="inline-flex h-12 items-center justify-center rounded-md border border-[#1B2A49] bg-transparent px-6 text-base font-semibold text-[#1B2A49] transition-colors hover:bg-[#1B2A49]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A49] focus-visible:ring-offset-2"
          >
            {t("rejectAll")}
          </button>
          <button
            type="button"
            onClick={onCustomize}
            className="inline-flex h-12 items-center justify-center rounded-md border border-[#8A8D91] bg-transparent px-6 text-base font-semibold text-[#1B2A49] transition-colors hover:bg-[#8A8D91]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A8D91] focus-visible:ring-offset-2"
          >
            {t("customize")}
          </button>
          <button
            type="button"
            onClick={onAcceptAll}
            className="inline-flex h-12 items-center justify-center rounded-md border border-[#C96B4A] bg-[#C96B4A] px-6 text-base font-semibold text-white transition-colors hover:bg-[#b65a3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C96B4A] focus-visible:ring-offset-2"
          >
            {t("acceptAll")}
          </button>
        </div>
      </div>
    </div>
  );
}
