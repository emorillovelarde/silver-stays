# Silver Costa Residences – Contexto para IA

Resumen del estado actual del proyecto para que una IA entienda estilo, funcionalidades y convenciones.

---

## 1. Stack técnico

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4
- **i18n:** next-intl (EN, ES, `localePrefix: "always"`)
- **Fuente:** Atkinson Hyperlegible (`font-sans`)
- **UI:** Radix UI, Shadcn/ui, Lucide React
- **Formularios:** react-hook-form + Zod
- **Backend:** Supabase (auth, DB)
- **Email:** Resend
- **Commits:** Conventional Commits (commitlint)

---

## 2. Identidad visual y diseño

### Colores corporativos
- **Primario:** `#004F56` (verde oscuro)
- **Fondo general:** `#FAFAFA`
- **Texto principal:** `#1A1A1A`, `#333333`
- **Texto secundario:** `text-gray-600`, `text-slate-600`

### Tipografía
- **Fuente:** Atkinson Hyperlegible (`font-sans`)
- **Títulos:** `font-semibold`, `font-bold`, `tracking-tight`
- **Botones:** `text-lg font-semibold`

### Botones primarios
```css
bg-[#004F56] rounded-xl hover:bg-[#004F56]/90
min-h-[52px] px-10 py-4
hover:scale-[1.02] transition-all duration-300 shadow-lg
```

### Estilo general
- Enfoque premium / Silver Economy
- Trato formal en español ("usted")
- Sin puntos finales en títulos principales
- Espaciado amplio, diseño limpio

---

## 3. Rutas principales

| Ruta | Descripción |
|------|-------------|
| `/[locale]` | Landing principal |
| `/[locale]/questionnaire` | Cuestionario (sin header) |
| `/[locale]/success` | Página de éxito post-cuestionario (sin header) |
| `/[locale]/guias` | Hub de guías |
| `/[locale]/guias/[slug]` | Guía individual (MDX) |
| `/[locale]/properties` | Propiedades |
| `/[locale]/admin/leads` | Admin de leads |

---

## 4. Estructura de la landing (`/[locale]`)

1. **Hero**
   - Imagen de fondo (atardecer Marbella)
   - Overlay `bg-black/50`
   - H1: "Finest Winter Stays on the Costa del Sol"
   - H2 + CTA "Design Your Stay" → `/questionnaire`
   - Bloque de texto con `mt-[15vh]` para dejar espacio al cielo

2. **StepsSection**
   - Título: "Three steps to your winter retreat"
   - Timeline vertical (3 pasos) + imagen lateral
   - CTA "Design Your Stay" → `/questionnaire`

3. **TrustBar**
   - Barra de confianza / credibilidad

4. **BentoGrid**
   - Grid 2x2 con 4 pilares (Silver-Standard, Legal, Health, Community)

5. **ResourceCenter**
   - Tarjetas de recursos/guías

6. **Footer**
   - CTA + enlace al cuestionario

---

## 5. Header

- **Comportamiento:** Se oculta al hacer scroll hacia abajo, reaparece al subir
- **Estilo:** Glassmorphism (`bg-white/90 backdrop-blur-md`) cuando no está en top
- **Oculto en:** `/questionnaire`, `/success`
- **Navegación:** Home, Properties, Guides & Resources
- **CTA:** "Design Your Stay" → `/questionnaire`
- **Idioma:** LanguageSwitcher (EN/ES)

---

## 6. Cuestionario (`/[locale]/questionnaire`)

### Arquitectura

| Archivo | Rol |
|---------|-----|
| `src/app/[locale]/questionnaire/page.tsx` | Página sin header, renderiza `QuestionnaireWizard` |
| `src/components/lifestyle/questionnaire-wizard.tsx` | Orquestador: estado, validación, submit |
| `src/components/lifestyle/steps.tsx` | 5 componentes de paso: `StepLocation`, `StepLifestyle`, `StepEssentialServices`, `StepDuration`, `StepContact` |
| `src/lib/schemas/questionnaire.ts` | Schema Zod y tipos TypeScript |

### Layout
- Sin header (oculto en esta ruta)
- Fondo `#FAFAFA`
- Título y subtítulo fijos arriba
- Card centrada `max-w-2xl`, diseño tipo Typeform
- Barra de progreso (Step X of 5) con indicador visual

### Flujo (5 pasos)

| Paso | Campo | Opciones (claves i18n) | Validación |
|------|-------|------------------------|------------|
| 1 | `location` | `locWest`, `locCenter`, `locEast`, `locUnsure` | Obligatorio |
| 2 | `lifestyle` | `lifeBeach`, `lifeGolf`, `lifeCulture`, `lifeQuiet` | Obligatorio |
| 3 | `essentialServices` | `srvHealth`, `srvCommunity`, `srvLegal`, `srvTransport` | Obligatorio |
| 4 | `duration` | `dur1`, `dur3`, `dur6`, `dur9` | Obligatorio |
| 5 | `firstName`, `lastName`, `phone`, `email` | Inputs de texto | min 2 chars, email válido, teléfono min 9 dígitos |

### Diseño de opciones (pasos 1–4)
- `RadioGroup` de Radix UI con `RadioGroupItem` oculto (`sr-only`)
- `Label` como botón visual: `h-14`, `border-2`, `rounded-xl`
- Icono Lucide a la izquierda (`text-[#004F56]`), texto a la derecha
- Estado seleccionado: `peer-data-[state=checked]:border-[#004F56] peer-data-[state=checked]:bg-[#004F56]/5`
- Animación: `animate-in fade-in slide-in-from-right-8 duration-500`

### Navegación
- **Siguiente:** Valida campos del paso actual con `form.trigger(fields)` antes de avanzar. En paso 5, ejecuta `onSubmit`.
- **Atrás:** `setCurrentStep(prev - 1)` sin validar.
- **Submit:** Botón muestra "Get My Proposal" en paso 5; durante envío muestra "Processing..." con spinner.

### Proceso de envío (`onSubmit`)

1. **Construir payload:**
   ```ts
   leadData = {
     questionnaire: { location, lifestyle, essentialServices, duration },
     contact: { firstName, lastName, phone, email },
     submittedAt: ISO string
   }
   ```

2. **Supabase `leads`:** `insert({ email, full_name, phone, data: leadData })`

3. **Supabase `profiles` (si usuario autenticado):** `update({ health_notes: JSON.stringify(leadData) })` para el usuario actual.

4. **Resend:** `sendLeadEmail({ email, firstName, lastName, locale })` — email de bienvenida con enlace al PDF "Guía Costa del Sol 2026".

5. **Redirección:** `router.push("/success")` (locale-aware).

### Página de éxito (`/[locale]/success`)
- Sin header
- Icono CheckCircle, mensaje de confirmación
- Botón "Download Free Guide" → `/guides/guia-costa-del-sol-2026.pdf`
- Enlace "Return to Home" → `/`

### Admin CRM (`/[locale]/admin/leads`)
- Lista leads de Supabase ordenados por `created_at` desc
- Columnas: Fecha, Nombre, Email, Teléfono, Intereses, Duración
- **Nota:** La columna "Intereses" usa `data.questionnaire.interests` (legacy); el cuestionario actual guarda `location`, `lifestyle`, `essentialServices`, `duration`. La columna "Duración" muestra `data.questionnaire.duration` (clave interna, ej. `dur1`).

### Traducciones (namespace `Questionnaire`)
- `pageTitle`, `pageSubtitle`
- `step1Question`–`step5Question`, claves de opciones (`locWest`, `lifeBeach`, etc.)
- `contact.*` (firstName, lastName, email, phone, placeholders, privacyNote)
- `validation.*` (selectOption, firstNameRequired, etc.)
- `progress.step1`–`step5`, `nav.back`/`next`/`submit`/`processing`, `error`

---

## 7. Página de éxito (`/[locale]/success`)

- Sin header
- Card con icono CheckCircle
- Mensaje de confirmación
- Descarga de PDF: "Guía Costa del Sol 2026"
- Enlace "Volver al Inicio" → `/`

---

## 8. Internacionalización (next-intl)

### Namespaces principales
- `Hero`, `StepsSection`, `BentoGrid`, `Questionnaire`, `Success`
- `Navigation`, `Footer`, `Metadata`, `GuidesHub`, `ResourceCenter`

### Convenciones
- Español: trato formal ("usted", "su", "le")
- Claves descriptivas: `step1Question`, `btnCTA`, `pageTitle`, etc.

---

## 9. Convenciones de código

- **Componentes:** PascalCase
- **Archivos:** kebab-case o PascalCase para componentes
- **Traducciones:** `useTranslations("Namespace")` o `getTranslations` en server
- **Navegación:** `Link` y `useRouter` de `@/i18n/routing`
- **Commits:** `feat(scope): description`, `fix:`, `chore:`

---

## 10. Variables de entorno

- `RESEND_API_KEY` – Resend
- `RESEND_FROM_EMAIL` – Remitente (opcional)
- `NEXT_PUBLIC_SITE_URL` – URL base del sitio
- Supabase: `NEXT_PUBLIC_SUPABASE_*`
