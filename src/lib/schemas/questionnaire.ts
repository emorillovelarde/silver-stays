import { z } from "zod";

export const questionnaireSchema = z.object({
    // Paso 1: Visión
    morningActivity: z.enum([
        "Caminar por la playa",
        "Desayunar con vistas",
        "Golf/Tenis",
        "Silencio/Leer"
    ]),
    environment: z.enum(["Urbano/Vibrante", "Natural/Reservado"]),

    // Paso 2: Intereses (Social) — Silver-Standard: siempre array, nunca undefined
    interests: z.array(z.string()).optional().default([]),

    // Paso 3: Logística
    duration: z.enum(["1-3 meses", "3-6 meses", "6-9 meses", "+9 meses"]),

    // Paso 4: Contacto
    firstName: z.string().min(2, "El nombre es obligatorio"),
    lastName: z.string().min(2, "El apellido es obligatorio"),
    phone: z.string().min(9, "Introduce un teléfono válido"),
    email: z.string().email("Por favor introduce un email válido"),
});

export type QuestionnaireData = z.infer<typeof questionnaireSchema>;
