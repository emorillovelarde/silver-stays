---
name: consolidar
description: Integra las decisiones pendientes de decisiones/ en los ficheros de estado y contexto de Bluevera y las archiva. Úsala cuando el usuario lance /consolidar, pida "consolidar decisiones" o en la consolidación semanal.
---

# Consolidar decisiones

Objetivo: que los ficheros de estado digan la verdad actual sin crecer sin límite. Claude lee los ficheros de estado en cada sesión; las decisiones archivadas solo se consultan para saber el porqué.

## Pasos

1. **Prepara una rama** si estás en `main`: `consolidacion/AAAA-MM-DD`.
2. **Lista las decisiones pendientes:** `decisiones/*.md` con `estado: pendiente` (no las de `archivo/`). Ordénalas por fecha.
3. **Detecta conflictos** entre ellas y con los ficheros de estado. Si dos decisiones se contradicen o una contradice algo vigente sin decir que lo sustituye, **para y pregunta** al usuario cuál prevalece. No elijas tú.
4. **Integra cada decisión** en el fichero que corresponda:
   - `web/estado.md`, `web/CLAUDE.md`
   - `marketing/estado.md`, `marketing/CLAUDE.md`, `marketing/campañas/...`
   - `contexto/*.md`
   - `CLAUDE.md` raíz solo si cambia una regla general de trabajo
   **Reescribe la sección afectada; no añadas al final.** Borra lo que la decisión deja obsoleto. Actualiza la línea "Última consolidación" del estado.
5. **Archiva:** en cada decisión, cambia `estado: incorporada`, añade `incorporada_en: <ficheros>` y muévela con `git mv` a `decisiones/archivo/`.
6. **Presenta el resultado para revisión humana:** un resumen por decisión de qué ficheros cambiaron, más el `git diff`. Señala explícitamente los matices que hayas tenido que simplificar o lo que no has sabido dónde integrar.
7. **No fusiones.** Haz commit (`docs: consolidar decisiones AAAA-MM-DD`) solo si el usuario lo pide; la fusión en `main` pasa por la revisión del otro.

## Reglas

- No añadas nada que no esté en una decisión: esto no es para mejorar redacción ni reorganizar.
- No toques `contexto/conocimiento-local.md` (solo lo escriben personas).
- Si un fichero de estado supera unas 150 líneas, propón al usuario qué recortar.
- Si no hay decisiones pendientes, dilo y termina.
