import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getGuides } from "@/lib/guides";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "GuidesHub" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function GuidesHubPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("GuidesHub");
  const guides = getGuides(locale);

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <section
        className="bg-white border-b border-gray-100 py-16 px-4 sm:px-6 lg:px-8"
        aria-labelledby="guides-heading"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h1
            id="guides-heading"
            className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4"
          >
            {t("heroTitle")}
          </h1>
          <h2 className="text-lg sm:text-xl text-[#1A1A1A]/90 font-normal leading-relaxed max-w-2xl mx-auto">
            {t("heroSubtitle")}
          </h2>
        </div>
      </section>

      {/* Grid of Guides */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        aria-label={t("guidesGridLabel")}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guias/${guide.slug}`}
                className="flex flex-col h-full min-h-[200px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
                aria-label={`${guide.title}: ${t("readGuide")}`}
              >
                <Card className="group h-full flex flex-col overflow-hidden bg-white border-2 border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  {guide.imageUrl && (
                    <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-t-xl">
                      <Image
                        src={guide.imageUrl}
                        alt={guide.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        priority={false}
                      />
                    </div>
                  )}
                  <CardHeader className="flex-grow">
                    <CardTitle className="text-xl text-[#1A1A1A] group-hover:text-primary transition-colors line-clamp-2">
                      {guide.title}
                    </CardTitle>
                    <CardDescription className="text-[#1A1A1A]/80 text-base leading-relaxed line-clamp-2 mt-2">
                      {guide.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <span
                      className="inline-flex items-center gap-1.5 text-primary font-semibold group-hover:gap-2.5 transition-all min-h-[44px] items-center"
                      aria-hidden
                    >
                      {t("readGuide")}
                      <ChevronRight className="h-5 w-5" />
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Lead Magnet */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        aria-labelledby="cta-heading"
      >
        <div className="container mx-auto max-w-4xl">
          <div
            className="rounded-2xl bg-primary text-[#FAFAFA] p-10 sm:p-12 text-center"
            role="complementary"
          >
            <h2
              id="cta-heading"
              className="text-2xl sm:text-3xl font-bold mb-4"
            >
              {t("ctaTitle")}
            </h2>
            <p className="text-[#FAFAFA]/95 text-lg mb-8 max-w-xl mx-auto">
              {t("ctaSubtitle")}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 hover:shadow-md min-h-[48px] min-w-[44px] px-8 text-lg font-semibold transition-all"
            >
              <Link href="/questionnaire" aria-label={t("ctaButtonAria")}>
                {t("ctaButton")}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
