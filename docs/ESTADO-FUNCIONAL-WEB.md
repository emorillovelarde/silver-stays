# Silver Stays — Descripción Funcional del Estado Actual de la Web

**Fecha de referencia:** Febrero 2026  
**Stack:** Next.js 16, TypeScript, Tailwind CSS v4, Supabase, next-intl, Shadcn/ui

---

## 1. Resumen Ejecutivo

Silver Stays es una plataforma web para jubilados europeos que buscan estancias largas (1–9 meses) en el corredor Fuengirola–Nerja (Costa del Sol). La web actual incluye: landing, cuestionario de perfilado, galería de propiedades, centro de guías MDX con contenido interactivo, y un panel de administración de leads.

---

## 2. Rutas y Páginas

| Ruta | Descripción | Estado |
|------|-------------|--------|
| `/[locale]` | Home (landing) | ✅ Funcional |
| `/[locale]/questionnaire` | Cuestionario de estilo de vida (5 pasos) | ✅ Funcional |
| `/[locale]/searching` | Página de transición "Buscando estancias..." | ⚠️ Placeholder (sin lógica) |
| `/[locale]/properties` | Galería de viviendas Silver-Standard | ✅ Funcional (depende de Supabase) |
| `/[locale]/guias/[slug]` | Guías MDX dinámicas | ✅ Funcional |
| `/[locale]/admin/leads` | CRM interno: listado de leads | ✅ Funcional |

**Internacionalización:** Todas las rutas bajo `[locale]` (es/en). Prefijo siempre visible.

---

## 3. Funcionalidades por Sección

### 3.1. Home (`/[locale]`)

- **Hero:** Imagen de fondo (Marbella), headline, subtítulo y CTA → `/questionnaire`
- **StepsSection:** 3 pasos del proceso (cuestionario → diseño → disfrute)
- **TrustBar:** Barra de confianza (contenido estático)
- **BentoGrid:** 3 tarjetas (Alojamiento Verificado, Soporte Médico/Legal, Comunidad Silver)
- **ResourceCenter:** 3 botones (Guía Brexit, Sanidad, Invierno al Sol) — **sin enlaces** a guías reales
- **Footer:** CTA al cuestionario, copyright

**Limitación:** El ResourceCenter no enlaza a las guías MDX existentes.

### 3.2. Cuestionario (`/[locale]/questionnaire`)

- **5 pasos:** Actividad matutina, entorno, intereses, duración, contacto
- **Validación:** Zod + react-hook-form
- **Persistencia:** Inserta en tabla `leads` de Supabase
- **Post-envío:** Pantalla de éxito con mensaje y botón "Volver al inicio"
- **Redirección:** Tras completar → Home (no a `/searching`)

**Datos capturados:** morningActivity, environment, interests, duration, firstName, lastName, phone, email.

### 3.3. Searching (`/[locale]/searching`)

- Página de espera con animación de carga
- **Sin lógica:** No recibe datos del cuestionario ni muestra resultados
- Accesible por URL directa; no hay flujo que redirija aquí automáticamente

### 3.4. Properties (`/[locale]/properties`)

- Grid de tarjetas de propiedades
- **Origen:** Tabla `properties` en Supabase
- **Campos:** título, descripción, precio/mes, ubicación, accesibilidad, temperatura enero
- **Imágenes:** Placeholder por ubicación (Nerja, Marbella, genérica) desde Unsplash
- **CTA:** Botón "Ver Detalles" (sin acción implementada)

**Limitación:** Requiere datos en Supabase; si la tabla está vacía, muestra mensaje "No se encontraron propiedades".

### 3.5. Guías MDX (`/[locale]/guias/[slug]`)

**Guías publicadas:**

| Slug | ES | EN | Contenido |
|------|----|----|-----------|
| `arbitraje-energetico` | ✅ | `energy-arbitrage` | Arbitraje energético, calculadora, tablas |
| `guia-legal-alquiler-2025` | ✅ | — | Normativa alquileres 2025 |
| `nlv-2026-uk` | ✅ | ✅ | Visado No Lucrativo 2026 |

**Componentes interactivos en guías:**

- **EnergyArbitrageCalculator:** Ciudad, m², gas/elec → ahorro mensual (Zustand)
- **NLVSolvencyCalculator:** Ingresos GBP, dependientes → elegibilidad NLV
- **SchengenClockAlert:** Banner EES/ETIAS
- **NLVGuideCTA:** CTA al cuestionario
- **GuideImage:** Imágenes con caption (ej. infografía)

**SEO:** JSON-LD Article en todas; FAQPage en `nlv-2026-uk`. Metadatos con hreflang.

### 3.6. Admin Leads (`/[locale]/admin/leads`)

- Listado de leads desde Supabase
- Columnas: fecha, nombre, email, teléfono, intereses, duración
- Botón "Actualizar" para refrescar
- **Sin autenticación:** Accesible por URL directa

---

## 4. Datos y Persistencia

| Recurso | Origen | Uso |
|---------|--------|-----|
| Leads | Supabase `leads` | Cuestionario → CRM |
| Properties | Supabase `properties` | Galería |
| Energy arbitrage | Zustand (cliente) | Calculadora → (no integrado con cuestionario) |
| Traducciones | `src/messages/{es,en}.json` | next-intl |

---

## 5. Diseño y Accesibilidad

- **Fuente:** Atkinson Hyperlegible
- **Colores:** Primario `#004F56`, texto `#1A1A1A`, fondo `#FAFAFA`
- **Componentes:** Shadcn/ui (Radix), enfoque WCAG
- **Guías:** Tablas con remark-gfm, estilos Silver-Safe

---

## 6. Gaps y Pendientes

1. **ResourceCenter:** Botones sin enlace a guías (`/guias/arbitraje-energetico`, `/guias/nlv-2026-uk`, etc.)
2. **Searching:** Sin integración con cuestionario ni resultados
3. **Properties:** "Ver Detalles" sin página de detalle
4. **Admin:** Sin login; acceso abierto
5. **Infografía:** `comparativa-ahorro-energetico.webp` debe estar en `public/images/guias/`
6. **Guía legal:** Solo en español; falta versión EN
7. **Navegación global:** No hay header con enlaces a Home, Properties, Guías, etc.

---

## 7. Comandos de Desarrollo

```bash
npm run dev    # Servidor desarrollo (localhost:3000)
npm run build  # Build producción
npm run start  # Servidor producción
```

**URLs de ejemplo:**

- Home: `http://localhost:3000/es` | `/en`
- Cuestionario: `/[locale]/questionnaire`
- Guía arbitraje: `/es/guias/arbitraje-energetico` | `/en/guias/energy-arbitrage`
- Guía NLV: `/es/guias/nlv-2026-uk` | `/en/guias/nlv-2026-uk`
- Properties: `/[locale]/properties`
- Admin: `/[locale]/admin/leads`
