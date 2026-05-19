type LegalSection = { heading: string; body: readonly string[] };

export type LegalContent = {
  title: string;
  updated: string;
  intro: string;
  sections: readonly LegalSection[];
};

/**
 * Shared presentational layout for the legal pages (Legal Notice / Privacy
 * Policy). Content is passed in per-locale by each page.
 */
export function LegalDocument({ content }: { content: LegalContent }) {
  return (
    <main className="bg-[#FAFAF8]">
      <article className="mx-auto max-w-2xl px-5 py-16 sm:py-20">
        <h1 className="font-serif text-3xl font-normal leading-tight text-[#1B2A49]">
          {content.title}
        </h1>
        <p className="mt-2 text-[13px] text-[#8A8D91]">{content.updated}</p>

        <p className="mt-6 text-[15px] leading-[1.7] text-[#5A5C62]">
          {content.intro}
        </p>

        <div className="mt-8 space-y-7">
          {content.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-[17px] font-semibold text-[#1B2A49]">
                {section.heading}
              </h2>
              <div className="mt-2 space-y-2">
                {section.body.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-[15px] leading-[1.7] text-[#5A5C62]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
