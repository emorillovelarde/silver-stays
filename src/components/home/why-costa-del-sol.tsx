import { getTranslations } from "next-intl/server";
import {
  Sun,
  PiggyBank,
  Stethoscope,
  Users,
  Plane,
  MapPin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const REASONS: { key: string; Icon: LucideIcon }[] = [
  { key: "sunshine", Icon: Sun },
  { key: "savings", Icon: PiggyBank },
  { key: "healthcare", Icon: Stethoscope },
  { key: "community", Icon: Users },
  { key: "flights", Icon: Plane },
  { key: "corridor", Icon: MapPin },
];

export async function WhyCostaDelSol() {
  const t = await getTranslations("WhyCostaDelSol");

  return (
    <section className="bg-white py-20 md:py-24" aria-labelledby="why-heading">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="mb-4 block text-center text-sm font-bold uppercase tracking-widest text-primary">
          {t("eyebrow")}
        </p>
        <h2
          id="why-heading"
          className="mx-auto mb-6 max-w-3xl text-balance text-center text-3xl font-bold tracking-tight text-brand-navy md:text-4xl lg:text-5xl"
        >
          {t("title")}
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-lg leading-relaxed text-slate-600">
          {t("intro")}
        </p>

        <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ key, Icon }) => (
            <div key={key} className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/5">
                <Icon
                  className="h-6 w-6 text-primary"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </div>
              <div>
                <h3 className="mb-1.5 text-lg font-bold text-brand-navy">
                  {t(`${key}.title`)}
                </h3>
                <p className="text-base leading-relaxed text-slate-600">
                  {t(`${key}.text`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
