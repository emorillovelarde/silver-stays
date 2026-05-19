# Estado del proyecto — Integración Winter Guide / MailerLite

> **Documento de contexto para Claude.** Última actualización: 18 de mayo de 2026.
>
> Léelo entero antes de trabajar en la landing de la guía de invierno o en la
> integración de MailerLite. Consolida el estado del código, el estado de la
> cuenta MailerLite y las decisiones que aún están abiertas.

---

## 1. Propósito de este documento

Bluevera Residences quiere construir un **nuevo flujo de captación de leads vía
Facebook Ads + MailerLite**: el visitante hace clic en un anuncio → llega a una
landing → rellena un formulario embebido de MailerLite → MailerLite le envía la
guía PDF y una secuencia de 5 emails.

El problema: **ya existe en el repo una landing de la guía de invierno** que
hace casi lo mismo pero con tecnología distinta (formulario propio + Supabase +
Resend). Antes de implementar nada hay que decidir cómo conviven o se fusionan
los dos flujos. Este documento describe ambos y deja las decisiones planteadas.

La especificación funcional detallada del flujo MailerLite está en dos fuentes
externas que el usuario aportó:
- `prompt_claude_code_mailerlite.md` (briefing de la tarea de integración).
- `Bluevera_Contexto_Tecnico_17May2026.pdf` (estado de la cuenta MailerLite).

Sus datos clave están resumidos abajo para que este archivo sea autosuficiente.

---

## 2. Resumen ejecutivo — el conflicto

| | Flujo actual (en el repo) | Flujo nuevo (deseado) |
|---|---|---|
| Origen de tráfico | Orgánico / web | Facebook Ads |
| Ruta | `/[locale]/winter-guide` | sin definir (colisiona) |
| Formulario | Propio (React Hook Form + Zod) | Embebido de MailerLite |
| Anti-spam | Turnstile + honeypot + rate limit | El de MailerLite |
| Almacenamiento del lead | Supabase tabla `leads` | Suscriptores de MailerLite |
| Email de entrega | `WinterGuideEmail` vía Resend | Email 0 de la automation MailerLite |
| Secuencia de seguimiento | No | Sí, 5 emails en 35 días |

**Ambos quieren la ruta `/winter-guide` y ambos entregan la misma guía.** No
pueden coexistir tal cual. Las decisiones pendientes están en la sección 5.

---

## 3. Lo que YA existe en el código (flujo actual)

Todo este código está **sin commitear** (untracked en git), creado el 7–8 de
mayo de 2026. Es una landing de descarga de la guía completamente funcional,
pero **no usa MailerLite**.

### Ficheros
- [src/app/[locale]/winter-guide/page.tsx](../src/app/%5Blocale%5D/winter-guide/page.tsx)
  — ruta de la landing. `metadata` con `robots: noindex, nofollow` (correcto
  para una landing de ads). Renderiza `WinterGuideLanding`.
- [src/components/winter-guide/WinterGuideLanding.tsx](../src/components/winter-guide/WinterGuideLanding.tsx)
  — landing a 2 columnas: wordmark "Bluevera Residences", hero, imagen de
  portada (`/guides/winter-guide-cover.jpg`), 4 viñetas, tarjeta con el
  formulario, trust signals y footer mínimo. **Textos hardcodeados en inglés**
  (no usa next-intl). El titular actual NO es el titular que conecta con el
  anuncio que pide el briefing.
- [src/components/winter-guide/GuideLeadForm.tsx](../src/components/winter-guide/GuideLeadForm.tsx)
  — formulario: `firstName`, `email`, `nationality` (select de 13 países),
  honeypot `_hp_name`, Turnstile (bypass en `development`). Al enviar con éxito
  hace `router.push('/${locale}/success')`. Enlaza a `/en/privacy-policy`
  (**ruta inexistente** — enlace muerto).
- [src/actions/submit-winter-guide.ts](../src/actions/submit-winter-guide.ts)
  — Server Action: valida con Zod, rate limit (10/IP/hora, 3/email/día),
  verifica Turnstile, **inserta el lead en Supabase `leads`** con
  `data.source = "winter-guide-landing"`, y envía `WinterGuideEmail` con Resend.
- [src/lib/schemas/winter-guide-schema.ts](../src/lib/schemas/winter-guide-schema.ts)
  — esquema Zod del formulario.
- [src/emails/WinterGuideEmail.tsx](../src/emails/WinterGuideEmail.tsx)
  — email React Email. Subject: *"Your 2026 Costa del Sol Winter Guide —
  Bluevera Residences"*. Botón de descarga → `https://www.blueveraresidences.com/downloads/winter-guide-2026.pdf`
  y botón Calendly → `https://calendly.com/blueveraresidences`.
- [src/lib/turnstile.ts](../src/lib/turnstile.ts) — verificación server-side de
  Cloudflare Turnstile.

### Activos
- `public/guides/Costa Sol Guide 2026.pdf` — el PDF de la guía, **43 MB**, sin
  commitear, nombre con espacios.
- `public/guides/winter-guide-cover.jpg` — imagen de portada usada en la landing.
- `public/guides/guia-costa-del-sol-2026.pdf` — **borrado** (aparece como `D`
  en git status).

### ⚠️ Bug conocido del flujo actual
El email `WinterGuideEmail` apunta a `/downloads/winter-guide-2026.pdf`, pero
**ese archivo no existe** (no hay carpeta `public/downloads/`). El enlace de
descarga del flujo actual está **roto ahora mismo**.

---

## 4. Lo que está montado en MailerLite (del PDF, 17 may 2026)

Todo configurado y validado internamente; **la automation está en borrador, sin
activar**. Solo falta embeber el formulario en la web y hacer el test E2E.

### Cuenta y plan
- Plan Trial de 14 días, 5 días restantes a 17 may → expira ~**22 may 2026**.
- Al expirar pasa al plan gratuito (hasta 1.000 contactos). Confirmar que las
  funciones de automation siguen disponibles tras la transición.

### Grupo, formulario y automation
- **Grupo:** `Winter Guide Downloads` — al unirse a él se dispara la automation.
- **Formulario:** `Winter Guide download form`, tipo integrado/embebible.
  Genera snippet JavaScript (recomendado) o HTML estático.
  - Campos: **Nombre** (req, usado como `{$name}`), **Email** (req),
    **Nacionalidad** (desplegable), **"¿Has pasado tiempo significativo en la
    Costa del Sol antes?"** (sí/no), **checkbox de consentimiento RGPD** (req).
- **Automation:** `Winter Guide — Welcome Sequence 2026`
  - Workflow ID: `187611113132656435`
  - Trigger: suscriptor se une al grupo `Winter Guide Downloads`
  - Secuencia:

    | Día | Email | Subject |
    |-----|-------|---------|
    | 0 | Email 0 — entrega del PDF | `Your 2026 Costa del Sol Winter Guide` |
    | 4 | Email 1 — errores comunes | `The three things most people get wrong before they arrive` |
    | 10 | Email 2 — Fuengirola vs Nerja | `Fuengirola or Nerja — the question we get asked most` |
    | 18 | Email 3 — Discovery Call (CTA Calendly) | `A quiet offer, if it's useful` |
    | 35 | Email 4 — eventos curados | `What's worth your time on the Costa del Sol right now` |

### Config de los emails
- From: `The Bluevera team <eduardo@blueveraresidences.com>`, reply-to igual.
- **Idioma: solo inglés.** Personalización con `{$name}`.
- Dirección postal en el footer: **Paseo de Reding 43 · 29016 Málaga · España**.
- Tipografía de los emails: Inter (config interna de MailerLite — no afecta a la
  web). Botón terracota `#C96B4A`, texto `#FFFFFF`, radio 5px.
- Calendly: `calendly.com/blueveraresidences`, evento "Bluevera Discovery Call —
  Is Spain right for you?" (15 min).

### La guía PDF
18 páginas, *"A Winter on the Costa del Sol — Your 2026 Guide"*. Alojada en el
file manager de MailerLite con URL pública. La misma guía está en el repo como
`public/guides/Costa Sol Guide 2026.pdf` (43 MB).

---

## 5. Decisiones abiertas (el usuario aún no las ha resuelto)

### Decisión 1 — ¿Qué pasa con la landing `/winter-guide` actual?
El flujo MailerLite quiere `/winter-guide`, ya ocupado por el flujo custom.
Opciones:
- **(a)** Reemplazar el formulario propio de `/winter-guide` por el embed de
  MailerLite (una sola landing). *Recomendado* — evita dos landings gemelas.
- **(b)** Dejar `/winter-guide` como está y crear la landing nueva en otra URL
  (p. ej. `/winter-guide-2026`).
- **(c)** Retirar del todo el flujo custom (action, email, schema) y quedarse
  solo con MailerLite.

### Decisión 2 — ¿Dónde se aloja el PDF?
Hoy el PDF está en MailerLite y, en el flujo custom, el enlace está roto.
- **(a)** URL de MailerLite para todo (cero esfuerzo; atado a MailerLite).
- **(b)** Comprimir el PDF (43 MB → ~3-8 MB) y subirlo a **Supabase Storage**
  (ya hay Supabase); una sola URL canónica para los dos flujos. *Recomendado.*
- **(c)** Meterlo en `public/` del repo — **no recomendado**: 43 MB inflan git
  permanentemente.

### Decisión 3 — ¿La landing nueva es bilingüe?
El sitio es `/en` + `/es`, pero el formulario y los 5 emails de MailerLite son
**solo en inglés**. Un usuario en `/es/winter-guide` recibiría emails en inglés.
- **(a)** Landing nueva solo en inglés (90% del tráfico de ads es UK).
- **(b)** Landing EN + ES, asumiendo que los emails van en inglés igualmente.

### Decisión 4 — ¿Leads en dos sistemas?
El flujo custom guarda leads en Supabase (visibles en el admin CRM). El flujo
MailerLite los guarda solo en MailerLite → los leads de Facebook Ads **no
aparecerían en el CRM admin**. ¿Aceptable, o hay que espejarlos a Supabase
(posible vía webhook de MailerLite, trabajo aparte)?

### Decisión 5 — Thank-you page + Meta Pixel
Para disparar de forma fiable el evento de conversión de Meta Pixel
("GuideDownload"), lo ideal es que el formulario MailerLite redirija (*After
signup → Redirect to URL*) a una página de gracias propia. Plan sugerido:
construir `/winter-guide/thank-you` y dejar el Pixel marcado solo con un `TODO`
(no instalarlo en esta fase).

### Decisión ya tomada
- **Páginas legales:** se crearán páginas nuevas de aviso legal y política de
  privacidad (hoy no existen). Deben incluir **Paseo de Reding 43 · 29016
  Málaga · España** y ser accesibles desde el footer de la landing (bloqueante
  RGPD). Nota: serían textos boilerplate estándar, no revisados por abogado.

---

## 6. Hechos técnicos del repo (para quien implemente)

- **Framework:** Next.js 16.1.4, App Router, React 19.2, TypeScript 5 strict,
  Tailwind CSS 4, next-intl 4 (`localePrefix: "always"`; locales `es`/`en`;
  default `en`). Ver [src/i18n/routing.ts](../src/i18n/routing.ts).
- **Fuentes** (cargadas en [src/app/layout.tsx](../src/app/layout.tsx)):
  Atkinson Hyperlegible (`--font-atkinson`, sans), Playfair Display
  (`--font-playfair`, serif), Montserrat (`--font-montserrat`).
  **No hay Inter ni Merriweather** en la web (el briefing los asumía por error).
  Usar Playfair para titulares y Atkinson para cuerpo.
- **Colores** (los usados en winter-guide): navy `#1B2A49`, terracota
  `#C96B4A`, fondo `#FAFAF8`, texto atenuado `#5A5C62` / `#8A8D91`. Tokens CSS
  globales en [src/app/globals.css](../src/app/globals.css):
  `--brand-navy #1A365D`, `--brand-cta #d9734e`.
- **Chrome del layout:** [src/app/[locale]/layout.tsx](../src/app/%5Blocale%5D/layout.tsx)
  ya oculta Header y Footer para cualquier ruta que contenga `/winter-guide`
  (constante `NO_CHROME_SEGMENTS`). La landing nueva debe respetar esto.
- **Inyección de script global:** el `<head>` se gestiona desde
  [src/app/layout.tsx](../src/app/layout.tsx) (root). El script universal de
  MailerLite debe ir ahí **una sola vez**, con `<Script>` de `next/script` y
  estrategia `afterInteractive`.
- **CSP:** [next.config.ts](../next.config.ts) define la Content-Security-Policy.
  El `script-src` actual permite `'self'`, `'unsafe-inline'`, `'unsafe-eval'`,
  `esm.sh` y `challenges.cloudflare.com`. **Faltan los dominios de MailerLite**
  (`assets.mailerlite.com`, `groot.mailerlite.com`, etc.) — sin añadirlos el
  embed no carga. Revisar también `connect-src`, `frame-src`, `img-src` y
  `style-src`.
- **Páginas legales:** no existen. El `Footer`
  ([src/components/layout/Footer.tsx](../src/components/layout/Footer.tsx))
  renderiza los textos legales como `<span>` (no enlaces). El formulario actual
  enlaza a `/en/privacy-policy`, que **no existe**.
- **i18n:** traducciones en `src/messages/{en,es}.json`. **No hay namespace
  `WinterGuide`** — si la landing nueva debe ser bilingüe hay que crearlo;
  la landing actual tiene los textos hardcodeados.
- **Variables de entorno:** `.env.local` contiene hoy `NEXT_PUBLIC_SUPABASE_URL`,
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `RESEND_API_KEY`,
  `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY`. **No existe `.env.example`.** El briefing pide
  añadir `NEXT_PUBLIC_MAILERLITE_FORM_ID` (el ID del formulario, no secreto).
- **Rutas existentes bajo `/[locale]`:** `page` (landing), `questionnaire`,
  `success`, `guias` (+ `[slug]`), `properties`, `searching`, `admin`,
  `winter-guide`. El flujo custom y el cuestionario redirigen ambos a
  `/[locale]/success`.

---

## 7. Riesgos y pendientes operativos

- **Enlace de descarga roto** en `WinterGuideEmail` (ver sección 3).
- **PDF de 43 MB** sin commitear — no debe entrar a git tal cual.
- **Páginas legales inexistentes** — bloqueante RGPD antes de activar la
  automation y de lanzar ads.
- **DNS del dominio** `blueveraresidences.com` — verificar SPF/DKIM/DMARC en
  MailerLite para que el Email 0 no caiga en spam.
- **Trial de MailerLite** expira ~22 may 2026 — confirmar que la automation
  sigue disponible en el plan gratuito.
- **Meta Pixel** — no instalar en esta fase; solo dejar un `TODO` en el punto
  de inserción (root layout y/o thank-you page).
- **UTM** — la landing debe aceptar `?utm_source=...` sin romperse (Next.js lo
  gestiona de forma nativa; no añadir lógica que interfiera con `useSearchParams`).

---

## 8. Estado actual — implementado el 18 may 2026

Las decisiones de la sección 5 se resolvieron así: **(1)** consolidar — el
formulario MailerLite reemplaza al propio en `/winter-guide`; **(2)** PDF en
Supabase Storage; **(3)** landing solo en inglés. La integración de código está
**hecha y el build de producción pasa**.

### Lo que se implementó
- **`MailerLiteForm`** (`src/components/winter-guide/MailerLiteForm.tsx`) —
  pinta el `<div class="ml-embedded">` e inyecta el script universal de
  MailerLite con `next/script` (`afterInteractive`), solo en la landing. Lee
  `NEXT_PUBLIC_MAILERLITE_ACCOUNT_ID` y `NEXT_PUBLIC_MAILERLITE_FORM_ID`.
- `WinterGuideLanding` — se mantuvo la maquetación; solo se cambió el formulario
  y el footer ahora enlaza a las páginas legales.
- `/[locale]/winter-guide/page.tsx` — `/es/winter-guide` redirige a
  `/en/winter-guide`.
- **`/winter-guide/thank-you`** — página de gracias propia (EN) con comentario
  `TODO` de Meta Pixel.
- **`/legal/aviso-legal`** y **`/legal/privacy-policy`** — páginas nuevas (EN +
  ES) con la dirección Paseo de Reding 43. Boilerplate sin revisar por abogado;
  `TODO` para el NIF y la futura SL.
- CSP de `next.config.ts` ampliada para `*.mailerlite.com` / `*.mlcdn.com`.
- `.env.example` creado; `TODO` de Meta Pixel en el root layout.
- **Eliminados** (flujo custom retirado): `submit-winter-guide.ts`,
  `WinterGuideEmail.tsx`, `winter-guide-schema.ts`, `GuideLeadForm.tsx`.
  `turnstile.ts` y `turnstile-widget.tsx` se conservan (los usa el cuestionario).

### Lo que queda pendiente (no es código)
- **Variables de entorno:** añadir `NEXT_PUBLIC_MAILERLITE_ACCOUNT_ID` y
  `NEXT_PUBLIC_MAILERLITE_FORM_ID` a `.env.local` (el embed muestra un div
  vacío hasta entonces).
- **PDF:** ya no está en el repo y no hay herramienta de compresión en el
  entorno. Comprimir (Acrobat / iLovePDF / Ghostscript `-dPDFSETTINGS=/ebook`)
  y subir a un bucket público de Supabase Storage; esa URL va al botón del
  Email 0 en MailerLite.
- **MailerLite (cuenta):** configurar *After signup → Redirect to URL* a
  `https://www.blueveraresidences.com/en/winter-guide/thank-you`; verificar que
  la pregunta de la Costa del Sol se guarda como *custom field*; verificar
  DNS (SPF/DKIM/DMARC).
- **Test E2E** de la sección 6 del PDF de contexto, y luego activar la
  automation.
