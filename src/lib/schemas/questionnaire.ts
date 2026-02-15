import { z } from "zod";

const morningActivityEnum = z.enum([
    "Caminar por la playa",
    "Desayunar con vistas",
    "Golf/Tenis",
    "Silencio/Leer"
]);
const environmentEnum = z.enum(["Urbano/Vibrante", "Natural/Reservado"]);
const durationEnum = z.enum(["1-3 meses", "3-6 meses", "6-9 meses", "+9 meses"]);

export const questionnaireSchema = z.object({
    // Paso 1: Visión — acepta "" como valor inicial, exige selección para avanzar
    morningActivity: z.union([morningActivityEnum, z.literal("")]).default("").refine((v) => v !== "", { message: "Seleccione una opción" }),
    environment: z.union([environmentEnum, z.literal("")]).default("").refine((v) => v !== "", { message: "Seleccione una opción" }),

    // Paso 2: Intereses (Social) — Silver-Standard: siempre array, nunca undefined
    interests: z.array(z.string()).optional().default([]),

    // Paso 3: Logística
    duration: z.union([durationEnum, z.literal("")]).default("").refine((v) => v !== "", { message: "Seleccione una opción" }),

    // Paso 4: Contacto
    firstName: z.string().min(2, "El nombre es obligatorio"),
    lastName: z.string().min(2, "El apellido es obligatorio"),
    phone: z.string().min(9, "Introduce un teléfono válido"),
    email: z.string().email("Por favor introduce un email válido"),
});

export type QuestionnaireData = z.infer<typeof questionnaireSchema>;

/** Valores del formulario (acepta "" en enums para estado inicial). Compatible con defaultValues. */
export type QuestionnaireFormValues = {
    morningActivity: "" | "Caminar por la playa" | "Desayunar con vistas" | "Golf/Tenis" | "Silencio/Leer";
    environment: "" | "Urbano/Vibrante" | "Natural/Reservado";
    interests: string[];
    duration: "" | "1-3 meses" | "3-6 meses" | "6-9 meses" | "+9 meses";
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
};
