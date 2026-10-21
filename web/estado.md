# Web — estado

Última consolidación: 2026-10-21 (migración inicial desde CLAUDE.md, CONTEXT.md, docs/ESTADO-FUNCIONAL-WEB.md y el historial de git).

## En producción

| Ruta | Estado |
|---|---|
| `/[locale]` | Landing: hero, 3 pasos, trust bar, bento de 4 pilares, FAQ, centro de recursos, about |
| `/[locale]/questionnaire` | Wizard de 5 pasos (zona, estilo de vida, servicios, duración, contacto) → Supabase `leads` + email de bienvenida con Resend → `/success` |
| `/[locale]/success` | Confirmación y descarga de la guía (`/guides/winter-guide-2026.pdf`) |
| `/en/winter-guide` | Landing de Facebook Ads, solo inglés, formulario embebido de MailerLite. `/es/winter-guide` redirige a EN |
| `/en/winter-guide/thank-you` | Gracias + evento Lead de Meta Pixel |
| `/[locale]/guias` y `/guias/[slug]` | 6 guías MDX en EN, 5 en ES. Calculadoras de ahorro energético y solvencia NLV |
| Legales | EN: `/legal-notice`, `/privacy-policy`, `/cookie-policy` · ES: `/aviso-legal`, `/politica-privacidad`, `/politica-cookies`. 301 desde los antiguos `/legal/*` |
| `/[locale]/admin` | Login Supabase + tabla de leads |

Transversal: banner de cookies RGPD con consentimiento granular que condiciona el Meta Pixel · CSP con Turnstile, MailerLite (`*.mailerlite.com`, `*.mlcdn.com`) y Meta · rate limiting en memoria · auditoría `npm audit` semanal en GitHub Actions.

## Pendiente

- `/[locale]/properties`: lista desde Supabase, sin página de detalle ("Ver detalles" no hace nada).
- `/[locale]/searching`: placeholder sin lógica ni enlaces que lleguen a ella.
- Emails `FollowUpEmail` y `FinalFollowUpEmail`: plantillas creadas, sin usar.
- Admin: los leads de MailerLite (Facebook Ads) no aparecen en el CRM; solo los del cuestionario.

## Problemas conocidos

- **Colores de marca incoherentes** entre `globals.css` (`--primary #0077b6`, `--brand-navy #1a365d`, `--brand-cta #d9734e`), la landing winter-guide (`#1B2A49`, `#C96B4A`) y textos antiguos (`#004F56`). Ver `contexto/marca-y-tono.md`.
- El rate limiting es en memoria: en Vercel no se comparte entre instancias.
- Copia del PDF de la guía en Supabase Storage pendiente de borrar (se mantuvo como respaldo en junio de 2026).

## Despliegue

Vercel, rama `main` → producción. Root Directory del proyecto en Vercel: `web`. `vercel.json` ignora los builds de commits que no tocan `web/`.
