---
fecha: 2026-10-21
ambito: web
estado: pendiente
decidido_por: Edu
---

# El código Next.js pasa a `web/`

## Decisión

Mover la aplicación Next.js de la raíz del repositorio a `web/`, como indica la arquitectura de trabajo con IA. La raíz queda para la memoria compartida (`contexto/`, `decisiones/`, `marketing/`, `.claude/`).

Cambios que implica:

- Vercel: Root Directory = `web` (cambio manual en el panel, antes de fusionar en `main`).
- Husky: `prepare` pasa a `cd .. && husky web/.husky`; los hooks hacen `cd web`.
- GitHub Actions y Dependabot apuntan a `web/`.
- `vercel.json` se queda en `web/`; su `ignoreCommand` hace que los commits que solo tocan marketing o contexto no disparen un despliegue.

## Contexto

Con el código en la raíz, la memoria de marketing se mezclaba con la configuración del proyecto web y cada cambio de texto disparaba un build en Vercel.

## Alternativas descartadas

- Dejar el código en la raíz y añadir las carpetas alrededor: no exigía tocar Vercel, pero mezclaba ámbitos y no seguía la estructura acordada.

## Ficheros afectados

`web/estado.md` (sección Despliegue), `web/CLAUDE.md`.
