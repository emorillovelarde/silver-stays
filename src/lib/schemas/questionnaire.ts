import { z } from "zod";

const morningActivityEnum = z.enum([
  "beach_walk",
  "breakfast_views",
  "golf_tennis",
  "silence_read",
]);
const environmentEnum = z.enum(["urban_vibrant", "natural_reserved"]);
const durationEnum = z.enum([
  "1_3_months",
  "3_6_months",
  "6_9_months",
  "9_plus_months",
]);

export const questionnaireSchema = z.object({
  morningActivity: z
    .union([morningActivityEnum, z.literal("")])
    .default("")
    .refine((v) => v !== "", { message: "selectOption" }),
  environment: z
    .union([environmentEnum, z.literal("")])
    .default("")
    .refine((v) => v !== "", { message: "selectOption" }),
  interests: z.array(z.string()).optional().default([]),
  duration: z
    .union([durationEnum, z.literal("")])
    .default("")
    .refine((v) => v !== "", { message: "selectOption" }),
  firstName: z.string().min(2, "firstNameRequired"),
  lastName: z.string().min(2, "lastNameRequired"),
  phone: z.string().min(9, "phoneRequired"),
  email: z.string().email("emailRequired"),
});

export type QuestionnaireData = z.infer<typeof questionnaireSchema>;

export type QuestionnaireFormValues = {
  morningActivity:
    | ""
    | "beach_walk"
    | "breakfast_views"
    | "golf_tennis"
    | "silence_read";
  environment: "" | "urban_vibrant" | "natural_reserved";
  interests: string[];
  duration: "" | "1_3_months" | "3_6_months" | "6_9_months" | "9_plus_months";
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};
