import { getTranslations } from "next-intl/server";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Home, ShieldCheck, Stethoscope, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const PILLARS: {
  key: "pillar1" | "pillar2" | "pillar3" | "pillar4";
  Icon: LucideIcon;
}[] = [
  { key: "pillar1", Icon: Home },
  { key: "pillar2", Icon: ShieldCheck },
  { key: "pillar3", Icon: Stethoscope },
  { key: "pillar4", Icon: Users },
];

export async function BentoGrid() {
  const t = await getTranslations("BentoGrid");

  return (
    <section className="py-24 bg-primary/[0.03]">
      <div className="container mx-auto px-4 max-w-6xl">
        <p className="text-sm font-bold tracking-widest text-primary uppercase mb-4 block text-center">
          {t("eyebrow")}
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-brand-navy tracking-tight max-w-3xl mx-auto text-balance">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {PILLARS.map(({ key, Icon }) => (
            <Card
              key={key}
              className="group h-full flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,79,86,0.08)] shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              <CardHeader className="p-8 flex flex-col gap-4 flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center flex-shrink-0">
                  <Icon
                    className="w-8 h-8 text-primary"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </div>
                <CardTitle className="text-xl font-bold text-brand-navy leading-tight">
                  {t(`${key}Title`)}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8 pt-0 flex-1 flex flex-col">
                <p className="text-slate-700 text-base md:text-lg leading-relaxed grow">
                  {t(`${key}Text`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
