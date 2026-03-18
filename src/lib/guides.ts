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
  "non-lucrative-visa-spain": {
    imageUrl: "/images/visado-no-lucrativo-espana.jpg",
    imageAlt: {
      es: "Guía completa del visado no lucrativo para UK y US en la Costa del Sol",
      en: "Complete Non-Lucrative Visa guide for UK & US citizens on the Costa del Sol",
    },
  },
  "visado-no-lucrativo-espana": {
    imageUrl: "/images/visado-no-lucrativo-espana.jpg",
    imageAlt: {
      es: "Guía completa del visado no lucrativo para UK y USA en la Costa del Sol",
      en: "Complete Non-Lucrative Visa guide for UK & US citizens on the Costa del Sol",
    },
  },
  "healthcare-andalusia-expats": {
    imageUrl: "/images/silver_stays_premium_terrace.jpg",
    imageAlt: {
      es: "Guía de sanidad pública y privada en Andalucía para expatriados",
      en: "Public vs private healthcare in Andalusia for expats guide",
    },
  },
  "sanidad-andalucia-expatriados": {
    imageUrl: "/images/silver_stays_premium_terrace.jpg",
    imageAlt: {
      es: "Guía de diferencias entre sanidad pública y privada en Andalucía para expatriados",
      en: "Public vs private healthcare in Andalusia for expats guide",
    },
  },
  "safe-mid-term-rentals-costa-del-sol": {
    imageUrl: "/images/contrato-legal-alquiler.jpg",
    imageAlt: {
      es: "Guía para alquilar de forma segura a medio plazo en la Costa del Sol",
      en: "How to safely rent mid-term on the Costa del Sol, avoiding scams",
    },
  },
  "alquiler-seguro-costa-del-sol-2025": {
    imageUrl: "/images/contrato-legal-alquiler.jpg",
    imageAlt: {
      es: "Guía para alquilar de forma segura a medio plazo en la Costa del Sol evitando estafas",
      en: "How to safely rent mid-term on the Costa del Sol, avoiding scams",
    },
  },
  "fuengirola-vs-nerja-winter-stay": {
    imageUrl: "/images/silver_stays_premium_terrace.jpg",
    imageAlt: {
      es: "Guía Fuengirola vs Nerja para invierno en la Costa del Sol",
      en: "Fuengirola vs Nerja winter stay comparison guide for expats",
    },
  },
  "fuengirola-vs-nerja-invierno": {
    imageUrl: "/images/silver_stays_premium_terrace.jpg",
    imageAlt: {
      es: "Guía comparativa Fuengirola vs Nerja para pasar el invierno en la Costa del Sol",
      en: "Fuengirola vs Nerja winter stay comparison guide for expats",
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
