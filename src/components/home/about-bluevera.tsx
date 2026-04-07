import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { MapPin, Shield, HeartHandshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const TRAITS: { key: string; Icon: LucideIcon }[] = [
  { key: "local", Icon: MapPin },
  { key: "verified", Icon: Shield },
  { key: "personal", Icon: HeartHandshake },
];

export async function AboutBluevera() {
  const t = await getTranslations("AboutBluevera");

  return (
    <section
      className="border-t border-gray-100 bg-white py-20 md:py-24"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2
          id="about-heading"
          className="mb-6 text-3xl font-bold tracking-tight text-brand-navy md:text-4xl"
        >
          {t("title")}
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-600">
          {t("description")}
        </p>

        <div className="mb-10 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-12">
          {TRAITS.map(({ key, Icon }) => (
            <div key={key} className="flex items-center gap-3">
              <Icon
                className="h-5 w-5 shrink-0 text-primary"
                strokeWidth={1.5}
                aria-hidden
              />
              <span className="text-base font-medium text-brand-navy">
                {t(`traits.${key}`)}
              </span>
            </div>
          ))}
        </div>

        <Link
          href="/questionnaire"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-brand-cta px-8 py-3 text-lg font-semibold text-white shadow-sm transition-all duration-300 hover:bg-brand-cta-hover hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cta focus-visible:ring-offset-2"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
