# Web — reglas técnicas

Estado actual, pendientes y problemas conocidos: `web/estado.md`. Este fichero solo recoge cómo se trabaja en el código.

## Stack

Next.js 16 (App Router) · TypeScript 5 strict · Tailwind CSS 4 + Shadcn/ui (Radix) · Lucide · Supabase (PostgreSQL + RLS + SSR) · React Hook Form 7 + Zod 4 · Resend + React Email · next-intl 4 · MDX (next-mdx-remote, gray-matter, remark-gfm, rehype-sanitize) · Zustand · Cloudflare Turnstile · Vercel.

## Comandos (desde `web/`)

```bash
npm run dev     # desarrollo
npm run build   # build de producción: ejecútalo antes de dar por terminado un cambio
npm run lint
```

Los hooks de git (husky) viven en `web/.husky/` y se ejecutan desde la raíz del repo: commitlint en `commit-msg`, lint-staged (prettier + eslint) en `pre-commit`.

## Estructura

```
src/
├── app/[locale]/      # rutas localizadas (en, es)
├── components/        # home, layout, lifestyle (cuestionario), guides, success,
│                      # winter-guide, legal, cookie-consent, ui (Shadcn)
├── actions/           # Server Actions: submit-lead, send-lead-email
├── lib/               # supabase (cliente, server, admin), schemas, stores,
│                      # rate-limit, turnstile, cookie-consent
├── i18n/              # routing y request config de next-intl
├── emails/            # plantillas React Email
├── content/guias/{en,es}/  # guías MDX
├── messages/{en,es}.json   # traducciones
└── middleware.ts      # guard de /admin + detección de idioma
```

## Convenciones

- **i18n:** `localePrefix: "always"`, default `en`. Server Components: `getTranslations(ns)`; Client: `useTranslations(ns)`. Navegación con `Link`/`useRouter` de `@/i18n/routing`. Ningún texto visible hardcodeado, salvo las landings solo-inglés (`winter-guide`).
- **Español:** trato formal (usted, su, le).
- **Títulos principales:** sin punto final.
- **Formularios:** esquema Zod en `lib/schemas/` como fuente de verdad; validación en cliente y servidor.
- **Todo formulario público lleva** Turnstile (bypass solo en development), honeypot `_hp_name` y rate limit.
- **Supabase:** RLS activado en todas las tablas. `SUPABASE_SERVICE_ROLE_KEY` solo en servidor (`supabase-admin.ts`).
- **CSP:** en `next.config.ts`. Cualquier script o iframe externo nuevo necesita su dominio ahí.
- **Tracking:** Meta Pixel solo tras consentimiento de cookies (`lib/cookie-consent.ts`).
- **Imágenes externas:** solo dominios permitidos en `next.config.ts`.
- **Componentes:** PascalCase. Accesibilidad para público senior: texto base grande, botones de al menos 48px de alto, contraste alto, `aria-label` en iconos.
- **Copy:** nada de afirmaciones absolutas ("100% verificado legalmente"). Precios y textos legales, siempre a revisión humana.

## Base de datos

| Tabla | Contenido |
|---|---|
| `leads` | email, full_name, phone, `data` (jsonb con cuestionario y contacto), created_at |
| `profiles` | usuarios: email, full_name, role, questionnaire_data, mobility_level |
| `properties` | title, description, price_per_month, location, accessibility_rating |
| `bookings` | guest_id, property_id, start/end_date, days_total, status |

Esquema de referencia: `supabase_schema.sql` (puede no estar al día con producción; compruébalo con el conector de Supabase).

## Variables de entorno

`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_MAILERLITE_ACCOUNT_ID`, `NEXT_PUBLIC_MAILERLITE_FORM_ID`, `MAINTENANCE_MODE` (opcional: `true` cierra la web con la página de espera; en Vercel exige volver a desplegar). Plantilla en `.env.example`.

## Antes de dar por terminado un cambio

- [ ] `npm run build` pasa
- [ ] Textos nuevos en `en.json` y `es.json`
- [ ] Formularios: Turnstile, honeypot, rate limit, Zod en servidor
- [ ] Dominios externos añadidos a la CSP
- [ ] Cambio visible para el cliente revisado por el agente `revisor`
