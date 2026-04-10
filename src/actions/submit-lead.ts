"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { sendLeadEmail } from "./send-lead-email";
import { checkRateLimit } from "@/lib/rate-limit";

const submitLeadSchema = z.object({
  location: z.string().min(1),
  lifestyle: z.string().min(1),
  essentialServices: z.string().min(1),
  duration: z.string().min(1),
  firstName: z.string().trim().min(2).max(50),
  lastName: z.string().trim().min(2).max(50),
  phone: z
    .string()
    .trim()
    .min(9)
    .max(20)
    .regex(/^[+\d\s()-]+$/),
  email: z.string().trim().toLowerCase().email().max(254),
  locale: z.enum(["en", "es"]).optional().default("en"),
  turnstileToken: z.string().min(1),
  _hp_name: z.string().max(0),
});

const HOUR_MS = 60 * 60 * 1000;
const MAX_LEADS_PER_IP_PER_HOUR = 5;

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("[submitLead] TURNSTILE_SECRET_KEY is not set");
    return false;
  }

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      },
    );
    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error("[submitLead] Turnstile verification error:", err);
    return false;
  }
}

async function getClientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "unknown"
  );
}

export type SubmitLeadResult =
  | { success: true }
  | { success: false; error: string };

export async function submitLead(
  formData: Record<string, string>,
): Promise<SubmitLeadResult> {
  const parsed = submitLeadSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: "Invalid input" };
  }

  const data = parsed.data;

  // Honeypot: if the hidden field has a value, silently accept (bot trap)
  if (data._hp_name !== "") {
    return { success: true };
  }

  const ip = await getClientIp();

  const ipCheck = checkRateLimit(
    `lead-ip:${ip}`,
    MAX_LEADS_PER_IP_PER_HOUR,
    HOUR_MS,
  );
  if (!ipCheck.allowed) {
    return { success: false, error: "Too many requests. Try again later." };
  }

  const turnstileOk = await verifyTurnstile(data.turnstileToken, ip);
  if (!turnstileOk) {
    return { success: false, error: "CAPTCHA verification failed" };
  }

  const leadPayload = {
    questionnaire: {
      location: data.location,
      lifestyle: data.lifestyle,
      essentialServices: data.essentialServices,
      duration: data.duration,
    },
    contact: {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
    },
    submittedAt: new Date().toISOString(),
  };

  const supabaseAdmin = getSupabaseAdmin();
  const { error: dbError } = await supabaseAdmin.from("leads").insert({
    email: data.email,
    full_name: `${data.firstName} ${data.lastName}`,
    phone: data.phone,
    data: leadPayload,
  });

  if (dbError) {
    console.error("[submitLead] DB insert error:", dbError);
    return { success: false, error: "Could not process your request" };
  }

  const emailResult = await sendLeadEmail({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    locale: data.locale,
  });

  if (!emailResult.success) {
    console.warn("[submitLead] Lead saved but email not sent");
  }

  return { success: true };
}
