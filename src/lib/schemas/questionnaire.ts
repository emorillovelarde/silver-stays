import { z } from "zod";

const costaDelSolExperienceEnum = z.enum([
  "never",
  "tourist",
  "extended",
  "regular",
]);
const preferredLocationEnum = z.enum([
  "fuengirola_mijas",
  "malaga_capital",
  "rincon_torre",
  "torrox_nerja",
  "unsure",
]);
const lifestylePreferenceEnum = z.enum([
  "walking_beach",
  "hiking_nature",
  "culture_food",
  "sports_active",
  "social_community",
  "quiet_wellness",
]);
const priorityEnum = z.enum([
  "healthcare",
  "legal",
  "community",
  "transport",
  "accommodation",
]);
const stayDurationEnum = z.enum([
  "1_3_months",
  "3_6_months",
  "6_9_months",
  "more_9_months",
]);
const arrivalMonthEnum = z.enum([
  "oct",
  "nov",
  "dec",
  "jan",
  "feb",
  "mar",
  "apr",
  "other",
]);

export const questionnaireSchema = z.object({
  costaDelSolExperience: z
    .union([costaDelSolExperienceEnum, z.literal("")])
    .default("")
    .refine((v) => v !== "", { message: "selectOption" }),
  preferredLocation: z
    .union([preferredLocationEnum, z.literal("")])
    .default("")
    .refine((v) => v !== "", { message: "selectOption" }),
  lifestylePreferences: z
    .array(lifestylePreferenceEnum)
    .min(1, "selectAtLeastOne"),
  priorities: z.array(priorityEnum).min(1, "selectAtLeastOne").max(3),
  stayDuration: z
    .union([stayDurationEnum, z.literal("")])
    .default("")
    .refine((v) => v !== "", { message: "selectOption" }),
  arrivalMonth: z
    .union([arrivalMonthEnum, z.literal("")])
    .default("")
    .refine((v) => v !== "", { message: "selectOption" }),
  firstName: z.string().trim().min(2, "firstNameRequired").max(50),
  lastName: z.string().trim().min(2, "lastNameRequired").max(50),
  email: z.string().trim().toLowerCase().email("emailRequired").max(254),
  phone: z.string().trim().optional(),
  nationality: z.string().trim().min(1, "nationalityRequired"),
});

export type QuestionnaireData = z.infer<typeof questionnaireSchema>;

export type QuestionnaireFormValues = {
  costaDelSolExperience: "" | "never" | "tourist" | "extended" | "regular";
  preferredLocation:
    | ""
    | "fuengirola_mijas"
    | "malaga_capital"
    | "rincon_torre"
    | "torrox_nerja"
    | "unsure";
  lifestylePreferences: (
    | "walking_beach"
    | "hiking_nature"
    | "culture_food"
    | "sports_active"
    | "social_community"
    | "quiet_wellness"
  )[];
  priorities: (
    | "healthcare"
    | "legal"
    | "community"
    | "transport"
    | "accommodation"
  )[];
  stayDuration:
    | ""
    | "1_3_months"
    | "3_6_months"
    | "6_9_months"
    | "more_9_months";
  arrivalMonth:
    | ""
    | "oct"
    | "nov"
    | "dec"
    | "jan"
    | "feb"
    | "mar"
    | "apr"
    | "other";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
};
