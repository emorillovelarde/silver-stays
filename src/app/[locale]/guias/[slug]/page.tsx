import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
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
  const contentDir = path.join(process.cwd(), "src/content/guias");
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir);

  const params = [];
  for (const locale of routing.locales) {
    for (const file of files) {
      if (file.endsWith(".mdx")) {
        params.push({
          locale,
          slug: file.replace(/\.mdx$/, ""),
        });
      }
    }
  }
  return params;
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "src/content/guias", `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const source = fs.readFileSync(filePath, "utf8");
  const components = getMDXComponents({});

  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source,
    components,
    options: { parseFrontmatter: true },
  });

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl w-full">
        {/* Render metadata if needed, but the main content has the H1 */}
        {/* content renders the MDX using the mapped components */}
        {content}

        {/* Footer/Author metadata if desired, styled safely */}
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
