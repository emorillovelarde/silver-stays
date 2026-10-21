import type { ReactNode } from "react";

/**
 * Shared layout for all legal pages (Legal Notice / Privacy Policy /
 * Cookie Policy, EN + ES). Provides the brand-consistent title block
 * and reading container; each page owns its body JSX.
 *
 * Brand palette enforced here:
 *   navy #1B2A49 — titles and body text
 *   silver #8A8D91 — "Last updated" meta line
 *   white — background
 *
 * Body is set at 16px with a generous 1.75 line-height so the content
 * remains comfortable on mobile (target audience is 65+).
 */
export function LegalPageShell({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <main className="bg-white">
      <article className="mx-auto max-w-3xl px-5 py-16 text-[#1B2A49] sm:py-20">
        <h1 className="font-serif text-3xl font-normal leading-tight md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm italic text-[#8A8D91]">{lastUpdated}</p>

        <div className="legal-content mt-10 space-y-10 text-base leading-[1.75]">
          {children}
        </div>
      </article>
    </main>
  );
}
