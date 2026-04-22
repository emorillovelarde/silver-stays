# Contexto Técnico y Arquitectura: Bluevera Residences

Este documento detalla la implementación técnica del proyecto Bluevera Residences para facilitar su mantenimiento y escalabilidad por parte de agentes de IA y desarrolladores.

## 1. Stack Tecnológico

| Componente | Tecnología | Versión / Detalle |
| :--- | :--- | :--- |
| **Framework** | Next.js | v16.1.4 (App Router, Turbopack) |
| **Lenguaje** | TypeScript | v5.x (Strict mode enabled) |
| **Estilos** | Tailwind CSS | v4 (PostCSS) |
| **UI Library** | Shadcn/ui | Radix UI primitives + Tailwind |
| **Backend / DB** | Supabase | PostgreSQL + Auth + Storage |
| **Cliente Supabase** | @supabase/supabase-js | Singleton pattern en `src/lib/supabase.ts` |
| **Formularios** | React Hook Form | v7.x |
| **Validación** | Zod | Esquemas runtime para formularios y API |
| **Iconos** | Lucide React | v0.563 |
| **Fechas** | date-fns | Manejo de localización (es) |

## 2. Estructura del Proyecto

La estructura sigue las convenciones de Next.js App Router:

```
silver-stays/
├── src/
│   ├── app/                    # Rutas de la aplicación (File-system routing)
│   │   ├── admin/              # Panel de administración (Protegido)
│   │   ├── properties/         # Catálogo de viviendas
│   │   ├── questionnaire/      # Wizard de captación de leads
│   │   ├── searching/          # Página de transición/loading
│   │   ├── layout.tsx          # Layout raíz (Fuentes, metadata global)
│   │   └── page.tsx            # Landing Page
│   ├── components/
│   │   ├── home/               # Componentes específicos de la Home (Hero, TrustBar)
│   │   ├── lifestyle/          # Componentes del Cuestionario (Wizard, Steps)
│   │   └── ui/                 # Componentes reutilizables (Button, Card, Input)
│   ├── lib/                    # Lógica de negocio y utilidades
│   │   ├── schemas/            # Definiciones Zod (questionnaire.ts)
│   │   ├── properties.ts       # Mock/Fetcher de propiedades
│   │   ├── supabase.ts         # Cliente Supabase instanciado
│   │   └── utils.ts            # Helpers (cn para Tailwind)
├── supabase_schema.sql         # Definición SQL de la base de datos
├── next.config.ts              # Configuración de Next.js
└── package.json                # Dependencias y scripts
```

## 3. Modelo de Datos (Supabase PostgreSQL)

La aplicación utiliza principalmente una tabla `leads` flexible para almacenar datos de usuarios no registrados, y el sistema de Auth de Supabase para usuarios registrados.

### Tabla `leads`
Diseñada para capturar información sin requerir un esquema rígido inicial, ideal para iterar el cuestionario.

| Columna | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | uuid | Primary Key (gen_random_uuid) |
| `created_at` | timestamptz | Fecha de creación (default now()) |
| `email` | text | Email de contacto |
| `full_name` | text | Nombre completo concatenado |
| `phone` | text | Teléfono de contacto |
| `data` | jsonb | Payload completo del cuestionario. |

**Estructura del JSONB `data`:**
```json
{
  "questionnaire": {
    "morningActivity": "Caminar por la playa",
    "environment": "Urbano/Vibrante",
    "interests": ["Yoga", "Bridge"],
    "duration": "3-6 meses"
  },
  "contact": {
    "firstName": "Juan",
    "lastName": "Pérez",
    ...
  },
  "submittedAt": "ISO-Date-String"
}
```

## 4. Componentes Clave y Lógica

### `src/components/lifestyle/questionnaire-wizard.tsx`
Orquestador del formulario multi-paso.
-   **Estado**: Gestiona `currentStep`, `isSubmitting`, `isCompleted`.
-   **Validación**: Valida cada paso individualmente usando `form.trigger(fields)` antes de avanzar.
-   **Persistencia**: Al finalizar, inserta en `leads` y opcionalmente actualiza `profiles` si hay sesión de usuario.

### `src/components/lifestyle/steps.tsx`
Contiene los sub-componentes de cada paso (`StepMorningActivity`, `StepInterests`, etc.).
-   **`StepInterests`**: Implementación especial usando `useWatch` para reactividad inmediata en la selección múltiple de tags. Estilado personalizado para feedback visual (cambio de borde/fondo).

### `src/lib/schemas/questionnaire.ts`
Define la "verdad" sobre los datos requeridos. Cualquier cambio en los pasos del cuestionario debe reflejarse aquí primero.

```typescript
export const questionnaireSchema = z.object({
    morningActivity: z.enum([...]),
    environment: z.enum([...]),
    interests: z.array(z.string()).default([]),
    // ...
});
```

## 5. Integraciones Externas

-   **Supabase**:
    -   URL y Anon Key definidas en variables de entorno (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
    -   Utilizado para Base de Datos y Autenticación.

-   **Imagenes**:
    -   Uso de `next/image` optimizado.
    -   Actualmente sirviendo imágenes desde Unsplash (configurado en `next.config.ts` para permitir el dominio `images.unsplash.com`).

## 6. Comandos de Desarrollo

-   `npm run dev`: Inicia servidor de desarrollo (Turbopack).
-   `npm run build`: Construye para producción.
-   `npm run lint`: Ejecuta ESLint.

## 7. Notas para el Agente (Future Work)
-   **Type Safety**: La tabla `leads` usa `jsonb`. Se recomienda mantener sincronizado el tipo TypeScript `QuestionnaireData` con la estructura esperada en ese JSON.
-   **Admin**: El panel de admin (`/admin/leads`) hace client-side fetching. Para escalar, considerar Server Components con paginación en servidor.
-   **Testing**: No hay configuración de tests (Jest/Playwright) activa actualmente.

*Versión del documento: 1.0 - Generado automáticamente por Antigravity*
