---
fecha: 2026-10-30
ambito: general
estado: pendiente
decidido_por: Edu
---

# El pull request con revisión del otro solo se exige para código de la web y consolidaciones

## Decisión

- **Pull request con revisión del otro antes de fusionar en `main`:**
  - cambios en el código de la web (`web/`);
  - consolidaciones de decisiones (`/consolidar`).
- **Commit directo en `main`, sin pull request:** todo lo demás, es decir, `contexto/`, el registro de decisiones en `decisiones/`, `marketing/`, `.claude/` y la documentación.
- Los commits siguen con Conventional Commits, validados por commitlint.

## Contexto

- **El problema.** La regla vigente en `CLAUDE.md` ("cada persona trabaja en su rama y el otro revisa el pull request antes de fusionar en `main`") obligaba a abrir un pull request incluso para documentación que no necesita revisión. Ejemplo: el #22, que añadía `contexto/marco-legal.md`.
- **Por qué no hace falta en esos casos.**
  - Los cambios fuera de `web/` no despliegan: el `ignoreCommand` de `web/vercel.json` los ignora.
  - La auditoría de seguridad del pull request solo revisa dependencias de `web/`.
  - `main` no tiene protección de rama en GitHub.
- **La revisión humana de las decisiones no se pierde.** Se hace al consolidar, que sigue pasando por pull request.
- **Resuelve un punto abierto** de `decisiones/archivo/2026-10-07-arquitectura-trabajo-ia.md`: "Acordar el flujo de ramas y revisión entre los dos".

## Alternativas descartadas

- **Mantener el pull request con revisión para todo** (regla actual): añade trámite a cambios que no despliegan ni necesitan revisión.
- **Pull request también para las decisiones que cambian el trabajo del otro:** descartada. La revisión de esas decisiones se hace al consolidarlas.

## Ficheros afectados

`CLAUDE.md` (regla "Ramas").
