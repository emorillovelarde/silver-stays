"use client";

import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const GUIDE_IDS = ["arbitrage"] as const;

const GUIDE_CONFIG: Record<
  (typeof GUIDE_IDS)[number],
  {
    icon: typeof FileText;
    slug: { es: string; en: string };
    category: "Legal" | "Savings";
  }
> = {
  arbitrage: {
    icon: Sun,
    slug: { es: "arbitraje-energetico", en: "energy-arbitrage" },
    category: "Savings",
  },
};

export function ResourceCenter() {
  const t = useTranslations("ResourceCenter");
  const locale = useLocale() as "es" | "en";

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold text-[#004F56] mb-8 text-center md:text-left">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GUIDE_IDS.map((id) => {
            const config = GUIDE_CONFIG[id];
            const Icon = config.icon;
            const slug = config.slug[locale] ?? config.slug.en;
            const title = t(`guides.${id}.title`);
            const description = t(`guides.${id}.description`);
            const badge = t(`guides.${id}.badge`);

            return (
              <Link
                key={id}
                href={`/guias/${slug}`}
                className={cn(
                  "flex flex-col items-center gap-4 py-8 px-6 rounded-xl border-2 border-secondary/30",
                  "transition-all duration-300 group",
                  "hover:border-[#004F56] hover:bg-primary/5 hover:shadow-md",
                  "focus:outline-none focus:ring-2 focus:ring-[#004F56] focus:ring-offset-2 focus:border-[#004F56]",
                )}
                aria-label={`${title}: ${description}`}
              >
                <span
                  className={cn(
                    "self-start text-xs font-semibold px-2.5 py-1 rounded-full",
                    config.category === "Legal"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-emerald-100 text-emerald-800",
                  )}
                >
                  {badge}
                </span>
                <div className="bg-[#004F56]/10 p-4 rounded-full text-[#004F56] group-hover:scale-110 transition-transform">
                  <Icon className="h-8 w-8" aria-hidden />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#004F56] group-hover:text-[#004F56]/90">
                    {title}
                  </h3>
                  <p className="text-base text-[#1A1A1A] mt-2 leading-relaxed min-h-[3rem]">
                    {description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
