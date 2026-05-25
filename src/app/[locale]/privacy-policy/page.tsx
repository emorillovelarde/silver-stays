import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LegalPageShell } from "@/components/legal/legal-page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy | Bluevera Residences",
  description:
    "How Bluevera Residences collects, processes and protects your personal data — GDPR / LOPDGDD compliant.",
  robots: { index: false, follow: false },
};

const OWNER_NAME = "{Eduardo Morillo Velarde Magaña}";
const OWNER_NIF = "{75248131C}";

type Props = { params: Promise<{ locale: string }> };

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "en") redirect("/es/politica-privacidad");

  return (
    <LegalPageShell
      title="Privacy Policy"
      lastUpdated="Last updated: 2026-05-25"
    >
      <p>
        In accordance with Regulation (EU) 2016/679 of the European Parliament
        and of the Council (GDPR), the UK Data Protection Act 2018 where
        applicable, and Spanish Organic Law 3/2018 on Data Protection and
        Guarantee of Digital Rights (LOPDGDD), this Privacy Policy describes how
        Bluevera Residences processes personal data collected through
        www.blueveraresidences.com.
      </p>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          1. Data controller
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Controller:</strong> {OWNER_NAME}
          </li>
          <li>
            <strong>Tax ID (NIF):</strong> {OWNER_NIF}
          </li>
          <li>
            <strong>Address:</strong> Paseo de Reding 43, 1º Izda, 29016 Málaga,
            Spain
          </li>
          <li>
            <strong>Phone:</strong>{" "}
            <a
              href="tel:+34696676348"
              className="text-[#C96B4A] underline underline-offset-2"
            >
              +34 696 676 348
            </a>
          </li>
          <li>
            <strong>Email for privacy matters:</strong>{" "}
            <a
              href="mailto:eduardo@blueveraresidences.com"
              className="text-[#C96B4A] underline underline-offset-2"
            >
              eduardo@blueveraresidences.com
            </a>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          2. What data we collect and how
        </h2>
        <p>We collect personal data in the following circumstances:</p>
        <p>
          <strong>
            a) When you complete our &ldquo;Design Your Stay&rdquo;
            questionnaire:
          </strong>{" "}
          name, email address, nationality, intended length of stay, planned
          travel dates, preferences and any other information you voluntarily
          provide.
        </p>
        <p>
          <strong>b) When you contact us by email, phone or web form:</strong>{" "}
          the contact details and the content of your communication.
        </p>
        <p>
          <strong>c) When you book a Discovery Call via Calendly:</strong> name,
          email, time zone and information you provide in the booking questions.
        </p>
        <p>
          <strong>
            d) When you download a guide or sign up to receive content:
          </strong>{" "}
          name, email and country.
        </p>
        <p>
          <strong>e) Automatically when you browse the website:</strong>{" "}
          technical data such as IP address, browser type, operating system,
          pages visited, time on page and approximate location, collected
          through cookies and similar technologies (see our Cookie Policy).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          3. Purposes and legal basis of processing
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead>
              <tr className="border-b-2 border-[#1B2A49]/20 text-left">
                <th className="py-3 pr-4 font-semibold">Purpose</th>
                <th className="py-3 pl-4 font-semibold">Legal basis</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#1B2A49]/10 align-top">
                <td className="py-3 pr-4">
                  Respond to your enquiries and provide information about our
                  services
                </td>
                <td className="py-3 pl-4">
                  Pre-contractual measures at the data subject&rsquo;s request
                  (Art. 6.1.b GDPR)
                </td>
              </tr>
              <tr className="border-b border-[#1B2A49]/10 align-top">
                <td className="py-3 pr-4">
                  Send you the guide or content you have requested
                </td>
                <td className="py-3 pl-4">Consent (Art. 6.1.a GDPR)</td>
              </tr>
              <tr className="border-b border-[#1B2A49]/10 align-top">
                <td className="py-3 pr-4">
                  Send you commercial communications about our services
                </td>
                <td className="py-3 pl-4">
                  Consent (Art. 6.1.a GDPR), revocable at any time
                </td>
              </tr>
              <tr className="border-b border-[#1B2A49]/10 align-top">
                <td className="py-3 pr-4">
                  Manage the contractual relationship if you become a client
                </td>
                <td className="py-3 pl-4">
                  Performance of a contract (Art. 6.1.b GDPR)
                </td>
              </tr>
              <tr className="border-b border-[#1B2A49]/10 align-top">
                <td className="py-3 pr-4">
                  Comply with legal, accounting and tax obligations
                </td>
                <td className="py-3 pl-4">
                  Legal obligation (Art. 6.1.c GDPR)
                </td>
              </tr>
              <tr className="align-top">
                <td className="py-3 pr-4">
                  Analyse website usage to improve our services
                </td>
                <td className="py-3 pl-4">
                  Consent through cookie banner (Art. 6.1.a GDPR)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          4. How long we keep your data
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Data from enquiries that do not become clients: up to 24 months from
            the last contact, then deleted.
          </li>
          <li>
            Data from clients: for the duration of the relationship and up to 6
            years thereafter to comply with Spanish commercial and tax law.
          </li>
          <li>
            Data collected through cookies: as detailed in the Cookie Policy.
          </li>
          <li>Marketing consent: until you withdraw it.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          5. Who we share your data with
        </h2>
        <p>We do not sell your personal data. We share it only with:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>IT and infrastructure providers</strong> acting as data
            processors under Art. 28 GDPR: Vercel Inc. (hosting), Google LLC
            (email and analytics services where applicable), Meta Platforms
            Ireland Ltd. (Facebook Pixel for advertising measurement),
            MailerLite (email marketing platform), Calendly LLC (appointment
            booking).
          </li>
          <li>
            <strong>Professional advisors</strong> (lawyers, gestors,
            accountants) where necessary to provide the services you have
            engaged us for, only with your prior knowledge.
          </li>
          <li>
            <strong>Public authorities</strong> where legally required.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          6. International data transfers
        </h2>
        <p>
          Some of our service providers are located outside the European
          Economic Area (EEA), in particular in the United States (Vercel,
          Google, Meta, MailerLite, Calendly). These transfers are protected by
          the EU-US Data Privacy Framework and/or Standard Contractual Clauses
          adopted by the European Commission, ensuring an adequate level of
          protection equivalent to that required by GDPR.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          7. Your rights
        </h2>
        <p>You have the right to:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Access</strong> the personal data we hold about you.
          </li>
          <li>
            <strong>Rectify</strong> inaccurate or incomplete data.
          </li>
          <li>
            <strong>Erase</strong> your data (&ldquo;right to be
            forgotten&rdquo;) where applicable.
          </li>
          <li>
            <strong>Restrict</strong> the processing of your data.
          </li>
          <li>
            <strong>Data portability</strong> in a structured, commonly used
            format.
          </li>
          <li>
            <strong>Object</strong> to processing, including direct marketing.
          </li>
          <li>
            <strong>Withdraw consent</strong> at any time, without affecting the
            lawfulness of processing prior to withdrawal.
          </li>
          <li>
            <strong>Not be subject to</strong> automated decisions with
            significant effects.
          </li>
        </ul>
        <p>
          To exercise these rights, write to{" "}
          <a
            href="mailto:eduardo@blueveraresidences.com"
            className="text-[#C96B4A] underline underline-offset-2"
          >
            eduardo@blueveraresidences.com
          </a>{" "}
          or to our postal address, attaching a copy of your ID or equivalent
          identification document.
        </p>
        <p>
          You also have the right to lodge a complaint with the Spanish Data
          Protection Agency (Agencia Española de Protección de Datos, AEPD —{" "}
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noreferrer noopener"
            className="text-[#C96B4A] underline underline-offset-2"
          >
            www.aepd.es
          </a>
          ), or with your local supervisory authority in your country of
          residence.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          8. Security measures
        </h2>
        <p>
          We have implemented technical and organisational measures appropriate
          to the nature of the data and the risks involved, including encrypted
          connections (HTTPS), access controls, regular backups and contractual
          safeguards with our processors.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          9. Changes to this Policy
        </h2>
        <p>
          We may update this Privacy Policy. The most recent version is always
          available on this page, with the &ldquo;Last updated&rdquo; date at
          the top.
        </p>
      </section>
    </LegalPageShell>
  );
}
