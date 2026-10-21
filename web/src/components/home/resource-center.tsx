import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
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

const FEATURED_COUNT = 3;

export async function ResourceCenter() {
  const locale = await getLocale();
  const t = await getTranslations("ResourceCenter");
  const tHub = await getTranslations("GuidesHub");
  const guides = getGuides(locale).slice(0, FEATURED_COUNT);

  if (guides.length === 0) {
    return null;
  }

  return (
    <section
      className="border-t border-gray-100 bg-white py-16"
      aria-labelledby="resource-center-heading"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="resource-center-heading"
          className="mb-10 text-center font-serif text-3xl font-bold text-[#1A365D] md:text-left"
        >
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guias/${guide.slug}`}
              className="flex min-h-[200px] flex-col rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A365D]/40 focus:ring-offset-2"
              aria-label={`${guide.title}: ${tHub("readGuide")}`}
            >
              <Card className="group flex h-full cursor-pointer flex-col overflow-hidden border-2 border-gray-100 bg-white transition-all duration-300 hover:border-[#1A365D]/25 hover:shadow-lg">
                {guide.imageUrl ? (
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
                ) : null}
                <CardHeader className="flex-grow">
                  <CardTitle className="line-clamp-2 text-xl text-[#1A1A1A] transition-colors group-hover:text-[#1A365D]">
                    {guide.title}
                  </CardTitle>
                  <CardDescription className="mt-2 line-clamp-3 text-base leading-relaxed text-[#1A1A1A]/80">
                    {guide.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-0">
                  <span
                    className="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-[#1A365D] transition-all group-hover:gap-2.5"
                    aria-hidden
                  >
                    {tHub("readGuide")}
                    <ChevronRight className="h-5 w-5" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center md:justify-start">
          <Button
            asChild
            variant="outline"
            className="min-h-[44px] border-[#1A365D]/35 bg-transparent font-medium text-[#1A365D] shadow-none hover:bg-[#1A365D]/6 hover:text-[#1A365D]"
          >
            <Link href="/guias">{t("viewAllGuides")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
