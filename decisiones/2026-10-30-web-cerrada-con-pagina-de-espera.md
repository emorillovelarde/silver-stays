---
fecha: 2026-10-30
ambito: web
estado: pendiente
decidido_por: Edu
---

# La web se cierra con una página de espera hasta adaptarla al nuevo modelo

## Decisión

- **Qué se ve con la web cerrada.** Todas las páginas públicas muestran una página de espera. Es breve, en inglés y en español, va firmada por Eduardo e incluye el email de contacto eduardo@blueveraresidences.com.
- **Qué sigue abierto:** el aviso legal, la política de privacidad, la de cookies y el panel de administración.
- **El PDF de la guía de invierno se retira:** su enlace redirige a la página de espera.
- **Cómo se activa.** Con la variable de entorno `MAINTENANCE_MODE=true` en Vercel (entorno Production) y una nueva publicación (Redeploy). Para reabrir, se borra la variable y se vuelve a publicar.
- **Respuesta al visitante.** La página de espera responde con el código 503 y no se indexa.
- **Hasta cuándo.** La web sigue cerrada hasta que esté adaptada al modelo de `2026-10-30-gestion-anual-de-viviendas.md`.

## Contexto

- **Por qué se cierra.** La web y sus guías describen el modelo antiguo: agencia para inquilinos, Fuengirola–Nerja, contratos de temporada "100 % seguros". También presentan a Bluevera como una empresa en marcha, cuando todavía no tiene forma jurídica (ver `contexto/marco-legal.md`).
- **El PDF también está desfasado.** Dice que el contrato de temporada sirve para el visado no lucrativo, que permite empadronarse y que la fianza se deposita en la Junta.
- **Meta Ads.** No hay anuncios activos.
- **Pendiente antes de activar el cierre:** pausar en MailerLite la secuencia "Winter Guide — Welcome Sequence 2026", que envía el PDF y enlaces a la web.

## Alternativas descartadas

- **Mantener la web publicada mientras se adapta:** seguiría mostrando afirmaciones legales desfasadas y el modelo antiguo.
- **Quitar el dominio del proyecto en Vercel:** el visitante vería una página de error, y el aviso legal y la política de privacidad dejarían de estar accesibles para los suscriptores.

## Ficheros afectados

`web/estado.md` (rutas en producción, cómo cerrar y reabrir la web), `marketing/estado.md` (guía retirada, secuencia de MailerLite).
