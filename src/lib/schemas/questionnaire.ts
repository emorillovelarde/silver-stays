import { z } from "zod";

const locationEnum = z.enum(["locWest", "locCenter", "locEast", "locUnsure"]);
const lifestyleEnum = z.enum([
  "lifeBeach",
  "lifeGolf",
  "lifeCulture",
  "lifeQuiet",
]);
const essentialServicesEnum = z.enum([
  "srvHealth",
  "srvCommunity",
  "srvLegal",
  "srvTransport",
]);
const durationEnum = z.enum(["dur1", "dur3", "dur6", "dur9"]);

export const questionnaireSchema = z.object({
  location: z
    .union([locationEnum, z.literal("")])
    .default("")
    .refine((v) => v !== "", { message: "selectOption" }),
  lifestyle: z
    .union([lifestyleEnum, z.literal("")])
    .default("")
    .refine((v) => v !== "", { message: "selectOption" }),
  essentialServices: z
    .union([essentialServicesEnum, z.literal("")])
    .default("")
    .refine((v) => v !== "", { message: "selectOption" }),
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
  location: "" | "locWest" | "locCenter" | "locEast" | "locUnsure";
  lifestyle: "" | "lifeBeach" | "lifeGolf" | "lifeCulture" | "lifeQuiet";
  essentialServices:
    | ""
    | "srvHealth"
    | "srvCommunity"
    | "srvLegal"
    | "srvTransport";
  duration: "" | "dur1" | "dur3" | "dur6" | "dur9";
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};
