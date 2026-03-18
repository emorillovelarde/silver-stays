# Silver Stays – Contexto para IA

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

### Layout
- Sin header
- Fondo `#FAFAFA`
- Título y subtítulo fijos arriba
- Card centrada, diseño tipo Typeform

### Flujo (5 pasos)
1. **Location:** Fuengirola/Mijas, Málaga Capital, Nerja/Torrox, No estoy seguro
2. **Lifestyle:** Playa, Golf, Cultura, Lectura
3. **Essential Services:** Salud, Comunidad, Legal, Transporte
4. **Duration:** 1–3, 3–6, 6–9, +9 meses (NLV)
5. **Contact:** Nombre, apellido, email, teléfono

### Diseño de opciones
- Botones compactos `flex-row`, `h-14`
- Icono a la izquierda, texto a la derecha
- Iconos distintos por opción (Building2, Landmark, TreePine, Compass, etc.)

### Backend
- Supabase: tabla `leads` (email, full_name, phone, data JSON)
- Resend: email de bienvenida con enlace al PDF tras insert exitoso

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
