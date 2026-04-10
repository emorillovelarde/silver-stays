"use server";

import { render } from "@react-email/render";
import { createElement } from "react";
import { Resend } from "resend";
import { z } from "zod";
import { headers } from "next/headers";
import WelcomeEmail from "@/emails/welcome-email";
import { checkRateLimit } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ??
  "Silver Costa Residences <onboarding@resend.dev>";

const SUBJECT = {
  en: "Welcome to Silver Costa Residences - Your Costa del Sol Guide is here",
  es: "Bienvenido a Silver Costa Residences - Su Guía Costa del Sol está aquí",
} as const;

const sendLeadEmailSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  firstName: z.string().trim().min(1).max(50),
  lastName: z.string().trim().min(1).max(50),
  locale: z.enum(["en", "es"]).optional().default("en"),
});

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;
const MAX_PER_IP_PER_HOUR = 3;
const MAX_PER_EMAIL_PER_DAY = 1;

async function getClientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "unknown"
  );
}

async function getEmailHtml(
  firstName: string,
  locale: string,
): Promise<string> {
  const localeNorm = locale === "es" ? "es" : "en";
  return render(createElement(WelcomeEmail, { firstName, locale: localeNorm }));
}

export type SendLeadEmailParams = {
  email: string;
  firstName: string;
  lastName: string;
  locale?: string;
};

export async function sendLeadEmail(
  params: SendLeadEmailParams,
): Promise<{ success: boolean; error?: string }> {
  const parsed = sendLeadEmailSchema.safeParse(params);
  if (!parsed.success) {
    return { success: false, error: "Invalid input" };
  }

  const { email, firstName, locale } = parsed.data;

  if (!process.env.RESEND_API_KEY) {
    console.error("[sendLeadEmail] RESEND_API_KEY is not set");
    return { success: false, error: "Could not process your request" };
  }

  const ip = await getClientIp();

  const ipCheck = checkRateLimit(`ip:${ip}`, MAX_PER_IP_PER_HOUR, HOUR_MS);
  if (!ipCheck.allowed) {
    console.warn(`[sendLeadEmail] IP rate limited: ${ip}`);
    return { success: false, error: "Too many requests. Try again later." };
  }

  const emailCheck = checkRateLimit(
    `email:${email}`,
    MAX_PER_EMAIL_PER_DAY,
    DAY_MS,
  );
  if (!emailCheck.allowed) {
    console.warn(`[sendLeadEmail] Email rate limited: ${email}`);
    return { success: false, error: "Too many requests. Try again later." };
  }

  const subject = locale === "es" ? SUBJECT.es : SUBJECT.en;
  const html = await getEmailHtml(firstName, locale);

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject,
      html,
    });

    if (error) {
      console.error("[sendLeadEmail] Resend error:", error);
      return { success: false, error: "Could not process your request" };
    }

    return { success: true };
  } catch (err) {
    console.error("[sendLeadEmail] Unexpected error:", err);
    return { success: false, error: "Could not process your request" };
  }
}
