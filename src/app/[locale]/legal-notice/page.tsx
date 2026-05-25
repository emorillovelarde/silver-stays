import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LegalPageShell } from "@/components/legal/legal-page-shell";

export const metadata: Metadata = {
  title: "Legal Notice | Bluevera Residences",
  description:
    "Legal Notice for blueveraresidences.com — owner details, terms of use, intellectual property and applicable law (LSSI-CE, Spain).",
  robots: { index: false, follow: false },
};

// Placeholders left visible (curly braces) so the data is verified by the
// site owner before the production launch — do not silently substitute.
const OWNER_NAME = "{Eduardo Morillo Velarde Magaña}";
const OWNER_NIF = "{75248131C}";

type Props = { params: Promise<{ locale: string }> };

export default async function LegalNoticePage({ params }: Props) {
  const { locale } = await params;
  // Slug is English-only; ES locale lives at /es/aviso-legal.
  if (locale !== "en") redirect("/es/aviso-legal");

  return (
    <LegalPageShell title="Legal Notice" lastUpdated="Last updated: 2026-05-25">
      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          1. Website owner
        </h2>
        <p>
          In compliance with the duty of information set out in Article 10 of
          Spanish Law 34/2002 of 11 July on Information Society Services and
          Electronic Commerce (LSSI-CE), the following information is provided
          regarding the owner of this website:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Trading name:</strong> Bluevera Residences
          </li>
          <li>
            <strong>Owner:</strong> {OWNER_NAME}
          </li>
          <li>
            <strong>Tax ID (NIF):</strong> {OWNER_NIF}
          </li>
          <li>
            <strong>Registered address:</strong> Paseo de Reding 43, 1º Izda,
            29016 Málaga, Spain
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
            <strong>Email:</strong>{" "}
            <a
              href="mailto:hello@blueveraresidences.com"
              className="text-[#C96B4A] underline underline-offset-2"
            >
              hello@blueveraresidences.com
            </a>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          2. Purpose of the website
        </h2>
        <p>
          Bluevera Residences operates this website to provide information about
          its boutique seasonal-rental and lifestyle services for non-Spanish
          residents wintering on the Costa del Sol, including property
          management, legal and administrative assistance, healthcare navigation
          and community integration services.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          3. Conditions of use
        </h2>
        <p>
          Access to and use of this website implies full acceptance of the
          conditions set out in this Legal Notice, the Privacy Policy and the
          Cookie Policy. Users undertake to use the website and its content in
          accordance with the law, good faith, public order and these terms, and
          not to use the website for unlawful purposes or in ways that may
          damage the rights or interests of third parties.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          4. Intellectual and industrial property
        </h2>
        <p>
          All content on this website — including but not limited to text,
          images, photographs, graphics, logos, trademarks, source code and
          design — is the property of Bluevera Residences or of third parties
          that have authorised its use, and is protected by Spanish and
          international intellectual and industrial property laws.
        </p>
        <p>
          Reproduction, distribution, public communication or transformation of
          any content, in whole or in part, by any means, requires the prior
          written authorisation of Bluevera Residences. Authorised access does
          not imply any transfer of ownership over the content.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          5. Liability
        </h2>
        <p>
          Bluevera Residences makes reasonable efforts to ensure that the
          information published is accurate and up to date but does not
          guarantee the absolute accuracy, completeness or currency of all
          content. The information provided on this website does not constitute
          legal, financial, tax or medical advice, and should not be relied upon
          as a substitute for professional advice tailored to individual
          circumstances.
        </p>
        <p>
          Bluevera Residences shall not be liable for damages arising from the
          use of, or inability to use, this website, nor for damages caused by
          third-party content accessible through external links.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          6. External links
        </h2>
        <p>
          This website may contain links to third-party websites. Bluevera
          Residences does not control these sites and is not responsible for
          their content, accuracy, privacy practices or availability.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          7. Modifications
        </h2>
        <p>
          Bluevera Residences reserves the right to modify, without prior
          notice, the content, structure and conditions of this website,
          including this Legal Notice.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          8. Applicable law and jurisdiction
        </h2>
        <p>
          This Legal Notice is governed by Spanish law. Any dispute arising from
          the use of this website shall be submitted to the Courts of the city
          of Málaga, Spain, except where mandatory consumer protection rules
          provide otherwise.
        </p>
      </section>
    </LegalPageShell>
  );
}
