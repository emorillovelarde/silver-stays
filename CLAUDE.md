# CLAUDE.md — Bluevera Residences (silver-stays)

## Proyecto

Plataforma de captación de leads y gestión de alquileres de media estancia premium en la Costa del Sol, dirigida al segmento silver economy (jubilados y nómadas digitales europeos). Antes llamado "Silver Stays", ahora rebranded como **Bluevera Residences**.

**Dominio principal:** Costa del Sol (Málaga) — Invierno, larga estancia, 1–9 meses.

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 con App Router |
| Lenguaje | TypeScript 5 (strict mode) |
| Estilos | Tailwind CSS 4 + Shadcn/ui + Radix UI |
| Iconos | Lucide React |
| Auth & DB | Supabase (PostgreSQL + RLS + SSR) |
| Formularios | React Hook Form 7 + Zod 4 |
| Email | Resend + React Email |
| i18n | next-intl 4 (EN/ES, `localePrefix: "always"`) |
| Contenido | MDX (next-mdx-remote, gray-matter, remark-gfm) |
| Estado global | Zustand |
| CAPTCHA | Cloudflare Turnstile |
| Deploy | Vercel |
| CI/CD | GitHub Actions (security audit npm weekly) |

---

## Estructura de carpetas clave

```
src/
├── app/[locale]/          # Rutas localizadas (en, es)
│   ├── page.tsx           # Landing page
│   ├── questionnaire/     # Wizard 5 pasos
│   ├── success/           # Página de confirmación
│   ├── guias/             # Hub + detalle de guías MDX
│   ├── properties/        # Listado (pendiente de desarrollo)
│   └── admin/             # CRM admin (login + leads)
├── components/
│   ├── home/              # Secciones de la landing
│   ├── layout/            # Header, Footer, logo, language switcher
│   ├── lifestyle/         # Wizard de cuestionario
│   ├── guides/            # Componentes MDX personalizados
│   ├── success/           # Vista de éxito
│   ├── ui/                # Shadcn/Radix primitives
│   └── turnstile-widget.tsx
├── actions/               # Server Actions (submit-lead, send-lead-email)
├── lib/                   # Utils, supabase clients, schemas, stores
├── i18n/                  # next-intl routing + request config
├── emails/                # Templates React Email
├── content/guias/{en,es}/ # Archivos MDX de guías
├── messages/{en,es}.json  # Traducciones next-intl
└── middleware.ts          # Auth guard /admin + locale detection
```

---

## Características implementadas

### Landing page (`/[locale]`)
- Hero + overlay sobre imagen de fondo
- Timeline de 3 pasos
- Bento grid de 4 pilares (Silver-Standard, Legal, Health, Community)
- Trust bar, FAQ, Resource center, About Bluevera
- Header con hide-on-scroll + glassmorphism (`bg-white/90 backdrop-blur-md`)
- Language switcher EN/ES

### Cuestionario (`/[locale]/questionnaire`)
- Wizard 5 pasos estilo Typeform
  1. Location (West / Center / East / Unsure)
  2. Lifestyle (Beach / Golf / Culture / Quiet)
  3. Essential Services (Health / Community / Legal / Transport)
  4. Stay Duration (1 / 3 / 6 / 9 meses)
  5. Contact (firstName, lastName, email, phone)
- Validación client+server con Zod
- Cloudflare Turnstile CAPTCHA (bypass en development)
- Rate limiting: 5 leads/IP/hora (in-memory Map)
- Honeypot field (`_hp_name`) anti-bot
- Envío vía Server Action → Supabase + Resend

### Admin CRM (`/[locale]/admin`)
- Login con Supabase email/password
- Tabla de leads (fecha, nombre, email, teléfono, duración)
- Protegido por middleware (redirect si no autenticado)
- `force-dynamic` para datos en tiempo real

### Guías MDX (`/[locale]/guias`)
- 11 guías en EN + 11 en ES
- Componentes MDX custom: Hero, CTA, Tabla comparativa, Feature grid, calculadoras interactivas
- Calculator de Energy Arbitrage (Zustand store)
- Componentes NLV (Non-Lucrative Visa)
- SEO: JSON-LD Article, sitemap.ts, robots.ts, OG image
- Rehype-sanitize para contenido externo seguro

### Email
- Welcome email bilingüe (Resend + React Email)
- CTA Calendly + descarga guía PDF
- Rate limit: 1/email/día, 3/IP/hora
- Templates follow-up (FollowUpEmail, FinalFollowUpEmail) — pendientes de usar

---

## Base de datos (Supabase PostgreSQL)

Todas las tablas tienen RLS activado.

| Tabla | Descripción |
|-------|-------------|
| `profiles` | Usuarios (id, email, full_name, role, questionnaire_data, mobility_level) |
| `properties` | Propiedades (id, title, description, price_per_month, location, accessibility_rating) |
| `bookings` | Reservas (guest_id, property_id, start/end_date, days_total, status) |
| `leads` | CRM leads (id, email, full_name, phone, data JSON, created_at) |

---

## Seguridad implementada

- CSP headers (Turnstile + Unsplash + dominio propio)
- `X-Frame-Options: DENY`, HSTS, `X-Content-Type-Options: nosniff`
- Turnstile CAPTCHA en formulario de lead
- Rate limiting in-memory (submit-lead + send-lead-email)
- Honeypot field en formulario
- Zod validation client + server
- Supabase RLS en todas las tablas
- GitHub Actions: `npm audit` en cada push/PR y semanal

---

## Internacionalización (i18n)

- `next-intl` con `localePrefix: "always"` → URLs `/en/...`, `/es/...`
- Default locale: `en`
- Traducciones en `src/messages/{en,es}.json`
- Server Components: `getTranslations(namespace)`
- Client Components: `useTranslations(namespace)`
- Tono formal en español (usted)

---

## Diseño y marca

- **Marca:** Bluevera Residences (antes Silver Stays)
- **Color primario:** `#1B2A49` (navy)
- **Background:** `#FAFAF8`
- **Fuente:** Atkinson Hyperlegible
- Sin puntos al final de títulos principales
- Tono premium, Silver Economy
- Mobile-first, responsive

---

## Variables de entorno requeridas

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
NEXT_PUBLIC_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY
```

---

## Comandos útiles

```bash
npm run dev        # Desarrollo local
npm run build      # Build producción
npm run lint       # ESLint
npm run format     # Prettier
```

---

## Estado actual del proyecto (mayo 2026)

- Rebranding a Bluevera completado
- Turnstile CAPTCHA integrado y funcionando en producción
- CSP headers configurados para Turnstile
- Hardening de seguridad (SEC-01 a SEC-13) completado
- Cuestionario completo y funcional
- Admin CRM operativo
- Guías MDX publicadas (EN + ES)
- `properties/` page pendiente de desarrollo completo

---

## Convenciones de commits

Conventional Commits (commitlint):
- `feat:` nueva funcionalidad
- `fix:` corrección de bug
- `chore:` mantenimiento
- `docs:` documentación
- `refactor:` refactorización sin cambio funcional
