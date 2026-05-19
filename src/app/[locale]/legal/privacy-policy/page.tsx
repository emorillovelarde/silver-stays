import type { Metadata } from "next";
import {
  LegalDocument,
  type LegalContent,
} from "@/components/legal/legal-document";

/*
 * TODO (legal): boilerplate GDPR/RGPD text. Add the NIF and update the data
 * controller to the SL once incorporated. Have it reviewed before launch.
 * See docs/ESTADO-WINTER-GUIDE-MAILERLITE.md.
 */
const CONTENT: Record<"en" | "es", LegalContent> = {
  en: {
    title: "Privacy Policy",
    updated: "Last updated: 18 May 2026",
    intro:
      "This Privacy Policy explains how Bluevera Residences collects and processes your personal data when you use blueveraresidences.com, in accordance with the EU General Data Protection Regulation (GDPR) and Spanish data protection law.",
    sections: [
      {
        heading: "1. Data controller",
        body: [
          "Controller: Eduardo Morillo (Bluevera Residences).",
          "Address: Paseo de Reding 43, 29016 Málaga, Spain.",
          "Email: eduardo@blueveraresidences.com.",
        ],
      },
      {
        heading: "2. Data we collect",
        body: [
          "When you complete a form on this site we collect your name, email address, nationality and any answers you provide voluntarily. We also collect basic technical data about your visit (such as IP address and browser).",
        ],
      },
      {
        heading: "3. Purpose and legal basis",
        body: [
          "We process your data to send you the guide you requested and informational emails about wintering on the Costa del Sol. The legal basis is your consent, given by ticking the consent box on the form. You may withdraw your consent at any time.",
        ],
      },
      {
        heading: "4. Email service and processors",
        body: [
          "Email delivery for the Winter Guide is managed through MailerLite (MailerLite, UAB). We also rely on Supabase, Resend, Vercel and Cloudflare to operate the website. These providers act as data processors and may involve international data transfers carried out with appropriate safeguards.",
        ],
      },
      {
        heading: "5. Data retention",
        body: [
          "We keep your data while you remain subscribed and have not requested its deletion. You can unsubscribe at any time using the link included in every email.",
        ],
      },
      {
        heading: "6. Your rights",
        body: [
          "You may exercise your rights of access, rectification, erasure, objection, restriction and portability by writing to eduardo@blueveraresidences.com. You also have the right to lodge a complaint with the Spanish Data Protection Agency (AEPD, www.aepd.es).",
        ],
      },
      {
        heading: "7. Cookies",
        body: [
          "This site may use technical cookies necessary for its operation. A detailed cookie policy will be published separately.",
        ],
      },
    ],
  },
  es: {
    title: "Política de Privacidad",
    updated: "Última actualización: 18 de mayo de 2026",
    intro:
      "Esta Política de Privacidad explica cómo Bluevera Residences recopila y trata sus datos personales cuando utiliza blueveraresidences.com, de acuerdo con el Reglamento General de Protección de Datos (RGPD) de la UE y la normativa española de protección de datos.",
    sections: [
      {
        heading: "1. Responsable del tratamiento",
        body: [
          "Responsable: Eduardo Morillo (Bluevera Residences).",
          "Domicilio: Paseo de Reding 43, 29016 Málaga, España.",
          "Correo electrónico: eduardo@blueveraresidences.com.",
        ],
      },
      {
        heading: "2. Datos que recopilamos",
        body: [
          "Cuando rellena un formulario en este sitio recopilamos su nombre, dirección de correo electrónico, nacionalidad y las respuestas que facilite voluntariamente. También recogemos datos técnicos básicos de su visita (como la dirección IP y el navegador).",
        ],
      },
      {
        heading: "3. Finalidad y base jurídica",
        body: [
          "Tratamos sus datos para enviarle la guía solicitada y comunicaciones informativas sobre estancias de invierno en la Costa del Sol. La base jurídica es su consentimiento, prestado al marcar la casilla correspondiente del formulario. Puede retirar su consentimiento en cualquier momento.",
        ],
      },
      {
        heading: "4. Servicio de correo y encargados del tratamiento",
        body: [
          "El envío de correos de la Guía de Invierno se gestiona a través de MailerLite (MailerLite, UAB). Para la prestación del servicio web utilizamos además Supabase, Resend, Vercel y Cloudflare. Estos proveedores actúan como encargados del tratamiento y pueden implicar transferencias internacionales de datos realizadas con las garantías adecuadas.",
        ],
      },
      {
        heading: "5. Conservación de los datos",
        body: [
          "Conservamos sus datos mientras mantenga su suscripción y no solicite su supresión. Puede darse de baja en cualquier momento mediante el enlace incluido en cada correo.",
        ],
      },
      {
        heading: "6. Sus derechos",
        body: [
          "Puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a eduardo@blueveraresidences.com. Asimismo, tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD, www.aepd.es).",
        ],
      },
      {
        heading: "7. Cookies",
        body: [
          "Este sitio puede utilizar cookies técnicas necesarias para su funcionamiento. Se publicará por separado una política de cookies detallada.",
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

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  const content = CONTENT[locale === "es" ? "es" : "en"];
  return <LegalDocument content={content} />;
}
