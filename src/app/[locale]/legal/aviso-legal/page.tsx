import type { Metadata } from "next";
import {
  LegalDocument,
  type LegalContent,
} from "@/components/legal/legal-document";

/*
 * TODO (legal): the site owner is currently a natural person (Eduardo Morillo).
 * Add the NIF below, and update the owner to the SL once it is incorporated.
 * See docs/ESTADO-WINTER-GUIDE-MAILERLITE.md. Boilerplate text — have it
 * reviewed before relying on it for full LSSI-CE compliance.
 */
const CONTENT: Record<"en" | "es", LegalContent> = {
  en: {
    title: "Legal Notice",
    updated: "Last updated: 18 May 2026",
    intro:
      "In compliance with Spanish Law 34/2002 of 11 July on Information Society Services and Electronic Commerce (LSSI-CE), the following details of the owner of the website blueveraresidences.com are provided.",
    sections: [
      {
        heading: "1. Site owner",
        body: [
          "Owner: Eduardo Morillo-Velarde Magaña (Bluevera Residences).",
          "Registered address: Paseo de Reding 43, 29016 Málaga, Spain.",
          "Email: eduardo@blueveraresidences.com.",
          "Tax ID (NIF): 75248131C.",
        ],
      },
      {
        heading: "2. Purpose",
        body: [
          "This website provides information about the services of Bluevera Residences, a mid- and long-term winter rental agency on the Costa del Sol, and allows visitors to request informational guides.",
        ],
      },
      {
        heading: "3. Terms of use",
        body: [
          "Accessing and using this site grants the condition of user and implies acceptance of this Legal Notice. The user agrees to make appropriate use of the content and not to use it for unlawful purposes.",
        ],
      },
      {
        heading: "4. Intellectual and industrial property",
        body: [
          "All content on this site — text, images, trademarks, logos, downloadable guides and design — belongs to the owner or to third parties who have authorised its use, and is protected by intellectual and industrial property law. Reproduction without prior authorisation is prohibited.",
        ],
      },
      {
        heading: "5. Liability",
        body: [
          "The owner is not liable for damage arising from use of the site or from its temporary unavailability. Links to third-party sites are provided for information only; the owner does not control and is not responsible for their content.",
        ],
      },
      {
        heading: "6. Applicable law",
        body: [
          "This Legal Notice is governed by Spanish law. For the resolution of any dispute, the parties submit to the courts of the owner's registered address.",
        ],
      },
    ],
  },
  es: {
    title: "Aviso Legal",
    updated: "Última actualización: 18 de mayo de 2026",
    intro:
      "En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se facilitan los siguientes datos del titular del sitio web blueveraresidences.com.",
    sections: [
      {
        heading: "1. Titular del sitio",
        body: [
          "Titular: Eduardo Morillo (Bluevera Residences).",
          "Domicilio: Paseo de Reding 43, 29016 Málaga, España.",
          "Correo electrónico: eduardo@blueveraresidences.com.",
          "NIF: pendiente de incorporar.",
        ],
      },
      {
        heading: "2. Objeto",
        body: [
          "Este sitio web ofrece información sobre los servicios de Bluevera Residences, agencia de alquileres de media y larga estancia de invierno en la Costa del Sol, y permite solicitar guías informativas.",
        ],
      },
      {
        heading: "3. Condiciones de uso",
        body: [
          "El acceso y uso de este sitio atribuye la condición de usuario e implica la aceptación del presente Aviso Legal. El usuario se compromete a hacer un uso adecuado de los contenidos y a no emplearlos para fines ilícitos.",
        ],
      },
      {
        heading: "4. Propiedad intelectual e industrial",
        body: [
          "Todos los contenidos del sitio —textos, imágenes, marcas, logotipos, guías descargables y diseño— son titularidad del titular o de terceros que han autorizado su uso, y están protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su reproducción sin autorización previa.",
        ],
      },
      {
        heading: "5. Responsabilidad",
        body: [
          "El titular no se responsabiliza de los daños derivados del uso del sitio ni de su indisponibilidad temporal. Los enlaces a sitios de terceros se ofrecen a título informativo; el titular no controla ni se responsabiliza de sus contenidos.",
        ],
      },
      {
        heading: "6. Legislación aplicable",
        body: [
          "El presente Aviso Legal se rige por la legislación española. Para la resolución de cualquier controversia, las partes se someten a los juzgados y tribunales del domicilio del titular.",
        ],
      },
    ],
  },
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = CONTENT[locale === "es" ? "es" : "en"];
  return { title: `${content.title} | Bluevera Residences` };
}

export default async function AvisoLegalPage({ params }: Props) {
  const { locale } = await params;
  const content = CONTENT[locale === "es" ? "es" : "en"];
  return <LegalDocument content={content} />;
}
