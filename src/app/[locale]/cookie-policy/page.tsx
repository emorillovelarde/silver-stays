import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LegalPageShell } from "@/components/legal/legal-page-shell";

export const metadata: Metadata = {
  title: "Cookie Policy | Bluevera Residences",
  description:
    "How blueveraresidences.com uses cookies and similar technologies, with provider, purpose and duration for each category.",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ locale: string }> };

export default async function CookiePolicyPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "en") redirect("/es/politica-cookies");

  return (
    <LegalPageShell
      title="Cookie Policy"
      lastUpdated="Last updated: 2026-05-25"
    >
      <p>
        This Cookie Policy explains how Bluevera Residences uses cookies and
        similar technologies on www.blueveraresidences.com, in compliance with
        Article 22.2 of Spanish Law 34/2002 (LSSI-CE) and Regulation (EU)
        2016/679 (GDPR).
      </p>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          1. What are cookies?
        </h2>
        <p>
          Cookies are small text files that a website stores on your device when
          you visit it. They allow the website to recognise your device on
          subsequent visits, remember your preferences and analyse how the site
          is used.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          2. Types of cookies we use
        </h2>
        <p>
          <strong>Strictly necessary cookies</strong> — required for the website
          to function. They cannot be disabled. They store your cookie consent
          preferences and session state. Duration: session or up to 12 months.
          Provider: Bluevera Residences.
        </p>
        <p>
          <strong>Analytics cookies</strong> — help us understand how visitors
          interact with the website (pages visited, time on page, traffic
          sources). Duration: up to 24 months. Provider: Google LLC (Google
          Analytics, if active).
        </p>
        <p>
          <strong>Marketing cookies</strong> — used to measure the effectiveness
          of our advertising on Meta platforms (Facebook, Instagram) and to show
          relevant ads. Duration: up to 13 months. Provider: Meta Platforms
          Ireland Ltd. (Meta Pixel, id 1940332579949759).
        </p>
        <p>
          <strong>Functional cookies</strong> — store preferences such as
          language. Duration: up to 12 months. Provider: Bluevera Residences.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          3. How to manage cookies
        </h2>
        <p>
          When you first visit the website, a banner allows you to accept all
          cookies, reject non-essential cookies or configure them by category.
          You can change your preferences at any time by clicking the
          &ldquo;Cookie settings&rdquo; link in the footer.
        </p>
        <p>
          You can also disable or delete cookies directly from your browser
          settings:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Chrome: Settings → Privacy and security → Cookies</li>
          <li>Firefox: Options → Privacy &amp; Security → Cookies</li>
          <li>Safari: Preferences → Privacy → Cookies</li>
          <li>Edge: Settings → Privacy → Cookies</li>
        </ul>
        <p>
          Please note that disabling certain cookies may affect website
          functionality.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          4. International transfers
        </h2>
        <p>
          Some cookie providers (Google, Meta) are located in the United States.
          Transfers are protected by the EU-US Data Privacy Framework and/or
          Standard Contractual Clauses.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          5. Changes
        </h2>
        <p>
          We may update this policy to reflect changes in the cookies we use or
          in applicable regulations. The most recent version is always available
          on this page.
        </p>
        <p>
          For any question, contact us at{" "}
          <a
            href="mailto:eduardo@blueveraresidences.com"
            className="text-[#C96B4A] underline underline-offset-2"
          >
            eduardo@blueveraresidences.com
          </a>
          .
        </p>
      </section>
    </LegalPageShell>
  );
}
