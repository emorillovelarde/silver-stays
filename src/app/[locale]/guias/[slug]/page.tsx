import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getMDXComponents } from "@/mdx-components";
import { notFound } from "next/navigation";

interface Frontmatter {
  title: string;
  description?: string;
  date?: string;
  author?: string;
}

import { routing } from "@/i18n/routing";

export async function generateStaticParams() {
  const params = [];

  for (const locale of routing.locales) {
    const contentDir = path.join(process.cwd(), "src/content/guias", locale);
    if (fs.existsSync(contentDir)) {
      const files = fs.readdirSync(contentDir);
      for (const file of files) {
        if (file.endsWith(".mdx")) {
          params.push({
            locale,
            slug: file.replace(/\.mdx$/, ""),
          });
        }
      }
    }
  }
  return params;
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const filePath = path.join(
    process.cwd(),
    "src/content/guias",
    locale,
    `${slug}.mdx`,
  );

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const source = fs.readFileSync(filePath, "utf8");
  const components = getMDXComponents({});

  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    author: {
      "@type": "Organization",
      name: frontmatter.author || "Silver Stays",
    },
    datePublished: frontmatter.date,
    image: "https://silver-stays.com/og-image.jpg", // Placeholder
  };

  const faqContent =
    slug === "nlv-2026-uk"
      ? locale === "en"
        ? [
            {
              name: "What are the NLV 2026 financial requirements?",
              text: "The main applicant must prove €28,800 per year (400% of IPREM). Each dependent adds €7,200 (100% of IPREM). IPREM 2026 remains at €600 per month.",
            },
            {
              name: "What is Form S1 and how does it save money?",
              text: "Form S1 allows British pensioners to access Spanish public healthcare at no extra cost, eliminating the need for private insurance (saving €150-250/month). It must be requested from NHS Overseas Healthcare Services 90 days before relocation.",
            },
            {
              name: "Why is the NLV essential with the EES/ETIAS system?",
              text: "From April 2026, EES and ETIAS record every entry biometrically. Exceeding 90 days in 180 can result in fines of up to €10,000 and a 5-year entry ban. The NLV permanently deactivates the 90-day clock.",
            },
          ]
        : [
            {
              name: "¿Cuáles son los requisitos financieros del NLV 2026?",
              text: "El titular principal debe demostrar 28.800 € anuales (400% del IPREM). Cada dependiente añade 7.200 € (100% del IPREM). El IPREM 2026 se mantiene en 600 € mensuales.",
            },
            {
              name: "¿Qué es el Formulario S1 y cómo ahorra dinero?",
              text: "El Formulario S1 permite a pensionistas británicos acceder a la sanidad pública española sin coste adicional, eliminando la necesidad de seguros privados (ahorro de 150-250 €/mes). Debe solicitarse a NHS Overseas Healthcare Services 90 días antes del traslado.",
            },
            {
              name: "¿Por qué el NLV es imprescindible con el sistema EES/ETIAS?",
              text: "Desde abril de 2026, el EES y ETIAS registran biométricamente cada entrada. Exceder 90 días en 180 puede acarrear multas de hasta 10.000 € y prohibición de entrada de 5 años. El NLV desactiva el reloj de los 90 días de forma permanente.",
            },
          ]
      : null;

  const faqJsonLd =
    faqContent &&
    ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqContent.map((q) => ({
        "@type": "Question",
        name: q.name,
        acceptedAnswer: { "@type": "Answer", text: q.text },
      })),
    } as const);

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <article className="max-w-3xl w-full">
        {content}

        {(frontmatter.author || frontmatter.date) && (
          <div className="mt-12 pt-6 border-t border-gray-200 text-gray-600 text-lg">
            {frontmatter.author && (
              <p className="mb-2">Escrito por: {frontmatter.author}</p>
            )}
            {frontmatter.date && <p>Publicado: {frontmatter.date}</p>}
          </div>
        )}
      </article>
    </main>
  );
}
