import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getMDXComponents } from "@/mdx-components";
import { notFound } from "next/navigation";

interface Frontmatter {
  title: string;
  seoTitle?: string;
  description?: string;
  keywords?: string;
  date?: string;
  author?: string;
}

import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const filePath = path.join(
    process.cwd(),
    "src/content/guias",
    locale,
    `${slug}.mdx`,
  );
  if (!fs.existsSync(filePath)) return {};
  const source = fs.readFileSync(filePath, "utf8");
  const { data } = matter(source);
  const frontmatter = data as Frontmatter;
  const title = frontmatter.seoTitle ?? frontmatter.title;
  const description = frontmatter.description ?? "";
  const keywords = frontmatter.keywords;
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://silver-stays.com";
  return {
    title,
    description,
    ...(keywords && { keywords: keywords.split(",").map((k) => k.trim()) }),
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/guias/${slug}`,
    },
  };
}

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

  const faqContent = null;

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
