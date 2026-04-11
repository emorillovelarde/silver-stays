import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getGuides } from "@/lib/guides";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.blueveraresidences.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    });

    entries.push({
      url: `${BASE_URL}/${locale}/guias`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    entries.push({
      url: `${BASE_URL}/${locale}/questionnaire`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });

    const guides = getGuides(locale);
    for (const guide of guides) {
      entries.push({
        url: `${BASE_URL}/${locale}/guias/${guide.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
      });
    }
  }

  return entries;
}
