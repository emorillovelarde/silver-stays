"use server";

import { render } from "@react-email/render";
import { createElement } from "react";
import { Resend } from "resend";
import WelcomeEmail from "@/emails/welcome-email";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ??
  "Silver Costa Residences <onboarding@resend.dev>";

const SUBJECT = {
  en: "Welcome to Silver Costa Residences - Your Costa del Sol Guide is here",
  es: "Bienvenido a Silver Costa Residences - Su Guía Costa del Sol está aquí",
} as const;

async function getEmailHtml(
  firstName: string,
  locale: string,
): Promise<string> {
  const localeNorm = locale === "es" ? "es" : "en";
  return render(
    createElement(WelcomeEmail, {
      firstName,
      locale: localeNorm,
    }),
  );
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
  const html = await getEmailHtml(firstName, locale);

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
