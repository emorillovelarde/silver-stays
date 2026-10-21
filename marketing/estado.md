# Marketing — estado

Última consolidación: 2026-10-21 (migración inicial desde docs/ESTADO-WINTER-GUIDE-MAILERLITE.md, de mayo de 2026, y el historial de git). Lo marcado *sin confirmar* hay que comprobarlo en las herramientas.

## Canales de captación

| Canal | Recorrido | Dónde quedan los leads |
|---|---|---|
| A · Facebook Ads | Anuncio → `/en/winter-guide` → formulario MailerLite → grupo "Winter Guide Downloads" → secuencia de emails | MailerLite |
| B · Orgánico | Web → cuestionario de 5 pasos → email de bienvenida (Resend) con la guía y Calendly | Supabase `leads` (admin de la web) |

Los dos canales no están unificados: los leads de A no aparecen en el admin de la web.

## Guía de invierno

"A Winter on the Costa del Sol — Your 2026 Guide", 18 páginas. URL canónica: `https://www.blueveraresidences.com/guides/winter-guide-2026.pdf` (desde junio de 2026).

## Secuencia de MailerLite (canal A)

"Winter Guide — Welcome Sequence 2026", solo inglés, remitente eduardo@blueveraresidences.com. Detalle en `campañas/winter-guide-2026/`.

## Medición

Meta Pixel instalado (PageView + evento Lead en la página de gracias), solo con consentimiento de cookies.

## Pendiente o sin confirmar

- *Sin confirmar:* si la automation de MailerLite está activa (en mayo estaba en borrador) y si se hizo el test E2E.
- *Sin confirmar:* que el enlace del Email 0 en MailerLite apunte ya a la URL canónica del PDF.
- *Sin confirmar:* redirección "After signup" del formulario a `/en/winter-guide/thank-you`.
- *Sin confirmar:* SPF/DKIM/DMARC del dominio en MailerLite.
- *Sin confirmar:* plan de MailerLite tras el fin de la prueba (mayo de 2026).
- Reunir 3 o 4 textos reales nuestros para la skill `voz-bluevera`.
- Resultados de campañas: aún no registrados aquí.
