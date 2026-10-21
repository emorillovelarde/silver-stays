---
fecha: 2026-10-07
ambito: general
estado: incorporada
decidido_por: Edu
incorporada_en: CLAUDE.md, web/CLAUDE.md, marketing/CLAUDE.md, contexto/, .claude/, .mcp.json
---

# Arquitectura de trabajo con IA

## Decisión

Trabajar con Claude Code en un único repositorio git compartido para web y marketing. El repositorio es la memoria común: contexto, decisiones y estado de cada área en ficheros markdown.

- **Memoria:** repositorio git con markdown, no una base de datos de grafo.
- **Herramienta:** Claude Code para los dos ámbitos; el chat solo para explorar ideas.
- **Curación:** las decisiones se registran en `decisiones/` y se consolidan periódicamente en ficheros de estado, con revisión humana.
- **Extensiones:** pocas skills a medida (`registrar-decision`, `consolidar`, `voz-bluevera`), un agente revisor de solo lectura y conectores a las herramientas que ya usamos.
- **Cliente:** la IA trabaja por dentro; lo que llega al cliente lo firmamos y aprobamos nosotros.

## Contexto

El problema no es dónde guardar la información, sino curarla: quién decide qué entra, cómo se resuelven las contradicciones y cómo llega el contexto correcto a cada sesión. Antes de esta decisión el contexto estaba repartido en CONTEXT.md, silver-stays-*.md, docs/ y .antigravity/, con datos contradictorios (colores, pasos del cuestionario, número de guías).

## Alternativas descartadas

- **Base de datos de grafo como memoria:** los modelos leen texto y al convertir nodos en texto se pierde el porqué; exige esquema, ingesta y mantenimiento; es difícil de revisar. Un grafo, CRM o base relacional sí tendrá sentido para datos operativos (propietarios, viviendas, clientes, estancias).
- **Varios agentes por rol ("agente CMO", "agente CTO"):** multiplican coste y complejidad sin resolver la coordinación, que la resuelve el repositorio.
- **CRM ahora:** con unos 50 suscriptores bastan MailerLite y una tabla en Supabase.

## Puntos del documento original aún por hacer

- Fijar el día semanal de consolidación (propuesta: viernes).
- Acordar el flujo de ramas y revisión entre los dos.
- Reunir 3 o 4 textos reales para `voz-bluevera`.
- Delimitar la zona de Torre del Mar y las ventanas de fechas para la monitorización de mercado (idealista + Booking.com, datos en Supabase, conclusiones en `marketing/estado.md`).
- Conectores para más adelante: Gmail, Metricool, Supermetrics, idealista, Booking.com.
- Automatizar la consolidación: primero `/consolidar` a mano; después regla al cerrar sesión; después GitHub Action semanal que abra un PR.
