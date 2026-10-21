# Bluevera Residences

Alquileres de media estancia (1–9 meses) en la Costa del Sol para jubilados del norte de Europa. Antes "Silver Stays". Este repositorio es la memoria común del equipo: web y marketing comparten contexto, decisiones y estado.

## Dónde está cada cosa

| Carpeta | Contenido |
|---|---|
| `contexto/` | Empresa, cliente objetivo, marca y tono, conocimiento local. Cambia poco |
| `decisiones/` | Decisiones pendientes de consolidar. `archivo/` guarda las ya incorporadas |
| `web/` | Código Next.js (desplegado en Vercel con Root Directory = `web`). Reglas en `web/CLAUDE.md`, estado en `web/estado.md` |
| `marketing/` | Reglas en `marketing/CLAUDE.md`, estado en `marketing/estado.md`, campañas en `campañas/` |
| `.claude/skills/` | `registrar-decision`, `consolidar`, `voz-bluevera` |
| `.claude/agents/` | `revisor` (solo lectura) |

## Al empezar una sesión

1. Lee el `estado.md` de tu ámbito (`web/` o `marketing/`) y los ficheros de `contexto/` que afecten a la tarea.
2. Lee las decisiones de `decisiones/` (las que no están en `archivo/` están pendientes).
3. Consulta `decisiones/archivo/` solo si necesitas el porqué de algo.

## Reglas de trabajo

- **Decisiones:** si en la sesión se decide algo que cambia cómo trabajamos, qué decimos o qué construimos, regístralo con la skill `registrar-decision`. No edites los ficheros de estado directamente para reflejar una decisión nueva: eso lo hace `/consolidar`, con revisión humana.
- **Revisor:** antes de dar por terminado un entregable (email, anuncio, página, texto legal, cambio visible en la web), pásalo al agente `revisor`.
- **Cliente:** la IA trabaja por dentro. Nada llega al cliente sin aprobación nuestra: no envíes emails, no publiques, no actives automatizaciones ni modifiques reservas.
- **Conectores (`.mcp.json`):** leer es libre; cualquier escritura en una herramienta externa necesita aprobación explícita.
- **Ramas:** cada persona trabaja en su rama y el otro revisa el pull request antes de fusionar en `main`. `main` despliega a producción.
- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`), validados con commitlint.
- **Imágenes:** viviendas y zona, solo fotos reales. Nunca imágenes generadas de alojamientos.
- **Precios y temas legales:** la IA no los da por buenos. Márcalos para revisión humana.
- Mantén este fichero corto: el detalle va en las carpetas.
