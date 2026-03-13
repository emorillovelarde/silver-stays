"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "Silver Stays <onboarding@resend.dev>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://silver-stays.com";
const PDF_URL = `${SITE_URL}/guides/guia-costa-del-sol-2026.pdf`;

const SUBJECT = {
  en: "Welcome to Silver Stays - Your Costa del Sol Guide is here",
  es: "Bienvenido a Silver Stays - Su Guía Costa del Sol está aquí",
} as const;

function getEmailHtml(firstName: string, locale: string): string {
  const isSpanish = locale === "es";
  const subjectLang = isSpanish ? "es" : "en";

  const copy = isSpanish
    ? {
        greeting: `Estimado/a ${firstName},`,
        p1: "Gracias por compartir su visión con Silver Stays. Uno de nuestros Socios Directores ya está revisando sus preferencias para diseñar su retiro invernal perfecto.",
        p2: "Como prometimos, puede descargar su exclusiva 'Guía Costa del Sol 2026' en el enlace de abajo. En su interior encontrará información vital sobre sanidad, las mejores zonas y requisitos de visado.",
        p3: "Nos pondremos en contacto con usted en breve.",
        regards: "Un cordial saludo,",
        team: "El equipo de Silver Stays",
        cta: "Descargar Guía Gratuita",
      }
    : {
        greeting: `Dear ${firstName},`,
        p1: "Thank you for sharing your vision with Silver Stays. One of our Managing Partners is already reviewing your preferences to design your perfect winter retreat.",
        p2: "As promised, you can download your exclusive '2026 Costa del Sol Guide' at the link below. Inside, you will find vital information about healthcare, top locations, and visa requirements.",
        p3: "We will be in touch shortly.",
        regards: "Warm regards,",
        team: "The Silver Stays Team",
        cta: "Download Free Guide",
      };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${SUBJECT[subjectLang]}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #fafafa; color: #1a1a1a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <tr>
      <td>
        <div style="background-color: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6;">${copy.greeting}</p>
          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6;">${copy.p1}</p>
          <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6;">${copy.p2}</p>
          <p style="margin: 0 0 32px; font-size: 16px; line-height: 1.6;">
            <a href="${PDF_URL}" style="display: inline-block; background-color: #004F56; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 16px;">${copy.cta}</a>
          </p>
          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6;">${copy.p3}</p>
          <p style="margin: 0; font-size: 16px; line-height: 1.6;">${copy.regards}</p>
          <p style="margin: 8px 0 0; font-size: 16px; font-weight: 600; color: #004F56;">${copy.team}</p>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();
}

export type SendLeadEmailParams = {
  email: string;
  firstName: string;
  lastName: string;
  locale?: string;
};

export async function sendLeadEmail({
  email,
  firstName,
  locale = "en",
}: SendLeadEmailParams): Promise<{ success: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
    console.error("[sendLeadEmail] RESEND_API_KEY is not set");
    return { success: false, error: "Email service not configured" };
  }

  const subject = locale === "es" ? SUBJECT.es : SUBJECT.en;
  const html = getEmailHtml(firstName, locale);

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject,
      html,
    });

    if (error) {
      console.error("[sendLeadEmail] Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("[sendLeadEmail] Unexpected error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to send email",
    };
  }
}
