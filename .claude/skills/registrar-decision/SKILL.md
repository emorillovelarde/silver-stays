---
name: registrar-decision
description: Registra una decisión de Bluevera en decisiones/ con la plantilla del equipo. Úsala cuando en la sesión se decida algo que cambia cómo trabajamos, qué decimos a los clientes, qué construimos en la web o cómo hacemos marketing, o cuando el usuario diga "registra esto", "apunta la decisión" o similar.
---

# Registrar una decisión

Las decisiones son el registro histórico. No se editan los ficheros de estado para reflejarlas: eso lo hace la skill `consolidar`.

## Pasos

1. **Comprueba que es una decisión.** Algo que cambia el comportamiento futuro (de la web, del marketing, de cómo trabajamos). Una tarea hecha o un dato suelto no lo es.
2. **Busca conflictos.** Lee las decisiones pendientes en `decisiones/*.md` y el `estado.md` del ámbito. Si la nueva decisión contradice algo vigente, dilo al usuario y anótalo en la sección "Contexto".
3. **Pregunta lo que falte**, sin inventarlo: quién la toma y qué alternativas se descartaron y por qué. Si el usuario no recuerda las alternativas, escribe "No registradas".
4. **Crea el fichero** `decisiones/AAAA-MM-DD-titulo-corto.md` (fecha de hoy, título en kebab-case, sin tildes) con la plantilla de abajo.
5. **Enséñale el fichero al usuario.** No hagas commit salvo que lo pida.

## Plantilla

```markdown
---
fecha: AAAA-MM-DD
ambito: general | web | marketing
estado: pendiente
decidido_por: <nombre>
---

# <Título: la decisión en una frase>

## Decisión

<Qué se decide, con el detalle necesario para aplicarla sin preguntar.>

## Contexto

<Por qué ahora. Qué problema resuelve. Conflictos con decisiones anteriores.>

## Alternativas descartadas

- <Alternativa>: <por qué no>

## Ficheros afectados

<Ficheros de estado o contexto que habrá que actualizar al consolidar.>
```

## Reglas

- Una decisión por fichero.
- Escribe para alguien que no estuvo en la conversación.
- Precios, cláusulas legales y promesas al cliente: anota que requieren revisión humana.
