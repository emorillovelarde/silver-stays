import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface GuideMeta {
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

const GUIDE_IMAGES: Record<
  string,
  { imageUrl: string; imageAlt: { es: string; en: string } }
> = {
  "arbitraje-energetico": {
    imageUrl: "/images/arbitraje-energetico.jpg",
    imageAlt: {
      es: "Sistema inteligente de arbitraje energético y paneles solares en hogar de la Costa del Sol",
      en: "Smart energy arbitrage system and solar panels in a Costa del Sol home",
    },
  },
  "energy-arbitrage": {
    imageUrl: "/images/arbitraje-energetico.jpg",
    imageAlt: {
      es: "Sistema inteligente de arbitraje energético y paneles solares en hogar de la Costa del Sol",
      en: "Smart energy arbitrage system and solar panels in a Costa del Sol home",
    },
  },
  "guia-legal-alquiler-2025": {
    imageUrl: "/images/contrato-legal-alquiler.jpg",
    imageAlt: {
      es: "Asesoramiento legal profesional y firma de contrato de alquiler en España",
      en: "Professional legal advice and rental contract signing in Spain",
    },
  },
  "nlv-2026-uk": {
    imageUrl: "/images/visado-no-lucrativo-espana.jpg",
    imageAlt: {
      es: "Pasaporte con visado español y jubilados relajados en la Costa del Sol",
      en: "Passport with Spanish visa and retirees relaxing on the Costa del Sol",
    },
  },
};

function getGuideImage(
  slug: string,
  locale: string,
): { imageUrl: string; imageAlt: string } {
  const config = GUIDE_IMAGES[slug];
  if (!config) {
    return { imageUrl: "", imageAlt: "" };
  }
  const lang = locale === "es" ? "es" : "en";
  return {
    imageUrl: config.imageUrl,
    imageAlt: config.imageAlt[lang],
  };
}

export function getGuides(locale: string): GuideMeta[] {
  const contentDir = path.join(process.cwd(), "src/content/guias", locale);
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir);
  const guides: GuideMeta[] = [];

  for (const file of files) {
    if (!file.endsWith(".mdx")) continue;
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(contentDir, file);
    const source = fs.readFileSync(filePath, "utf8");
    const { data } = matter(source);
    const { imageUrl, imageAlt } = getGuideImage(slug, locale);
    guides.push({
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      imageUrl,
      imageAlt,
    });
  }

  return guides;
}
