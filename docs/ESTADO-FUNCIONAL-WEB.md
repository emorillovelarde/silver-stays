# Silver Costa Residences — Descripción Funcional del Estado Actual de la Web

**Fecha de referencia:** Febrero 2026  
**Stack:** Next.js 16, TypeScript, Tailwind CSS v4, Supabase, next-intl, Shadcn/ui

---

## 1. Resumen Ejecutivo

Silver Costa Residences es una plataforma web para jubilados europeos que buscan estancias largas (1–9 meses) en el corredor Fuengirola–Nerja (Costa del Sol). La web actual incluye: landing, cuestionario de perfilado, galería de propiedades, centro de guías MDX con contenido interactivo, y un panel de administración de leads.

---

## 2. Rutas y Páginas

| Ruta | Descripción | Estado |
|------|-------------|--------|
| `/[locale]` | Home (landing) | ✅ Funcional |
| `/[locale]/questionnaire` | Cuestionario de estilo de vida (5 pasos) | ✅ Funcional |
| `/[locale]/searching` | Página de transición "Buscando estancias..." | ⚠️ Placeholder (sin lógica) |
| `/[locale]/properties` | Galería de viviendas Silver-Standard | ✅ Funcional (depende de Supabase) |
| `/[locale]/guias` | Hub índice de guías (Hero, Grid, CTA) | ✅ Funcional |
| `/[locale]/guias/[slug]` | Guías MDX dinámicas | ✅ Funcional |
| `/[locale]/admin/leads` | CRM interno: listado de leads | ✅ Funcional |

**Internacionalización:** Todas las rutas bajo `[locale]` (es/en). Prefijo siempre visible.

---

## 3. Funcionalidades por Sección

### 3.0. Header (global)

- **Sticky:** Fijo en la parte superior con glassmorphism (`bg-[#FAFAFA]/85 backdrop-blur-md`)
- **Logo:** "Silver Costa Residences" → Home
- **Enlaces:** Inicio, Propiedades, Guías y Recursos (→ `/guias`)
- **Selector de idioma:** Dropdown Shadcn (es/en) con next-intl
- **CTA:** "Encontrar mi Estancia" → `/questionnaire`
- **Mobile:** Menú hamburguesa con Sheet (derecha), touch targets 44×44px
- **Accesibilidad:** aria-labels, contraste WCAG, focus visible

### 3.1. Home (`/[locale]`)

- **Hero:** Imagen de fondo (Marbella), headline, subtítulo y CTA → `/questionnaire`
- **StepsSection:** 3 pasos del proceso (cuestionario → diseño → disfrute)
- **TrustBar:** Barra de confianza (contenido estático)
- **BentoGrid:** 3 tarjetas (Alojamiento Verificado, Soporte Médico/Legal, Comunidad Silver)
- **ResourceCenter:** 3 tarjetas enlazadas a guías MDX (Legal Alquiler 2025, Arbitraje Energético, NLV 2026) con badges (Legal, Popular, Nuevo)
- **Footer:** CTA al cuestionario, copyright

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

### 3.5. Hub Guías (`/[locale]/guias`)

- **Hero:** H1 "Guías y Recursos para su Retiro en España", H2 con subtítulo
- **Grid:** Tarjetas Card (Shadcn) con título, descripción (2 líneas) y enlace "Leer Guía"
- **Origen:** `getGuides(locale)` lee `src/content/guias/{locale}/*.mdx` y extrae frontmatter
- **CTA:** Banner #004F56 con "Comenzar mi Evaluación Gratuita" → `/questionnaire`
- **SEO:** generateMetadata con title y description
- **Accesibilidad:** Contraste alto, tarjetas clicables, touch targets 44px

### 3.6. Guías MDX (`/[locale]/guias/[slug]`)

**Guías publicadas:**

| Slug | ES | EN | Contenido |
|------|----|----|-----------|
| `arbitraje-energetico` | ✅ | `energy-arbitrage` | Arbitraje energético, calculadora, tablas |
| `guia-legal-alquiler-2025` | ✅ | ✅ | Normativa alquileres 2025 |
| `nlv-2026-uk` | ✅ | ✅ | Visado No Lucrativo 2026 |

**Componentes interactivos en guías:**

- **EnergyArbitrageCalculator:** Ciudad (Londres, Berlín, Estocolmo, Oslo), m² (40–150), gas/elec → ahorro mensual estimado vs España (12 ct/kWh). Barras comparativas, animación de conteo. Persistencia con Zustand.
- **NLVSolvencyCalculator:** Ingresos GBP, dependientes → elegibilidad NLV (IPREM 2026)
- **SchengenClockAlert:** Banner informativo EES/ETIAS
- **NLVGuideCTA:** CTA al cuestionario
- **GuideImage:** Imágenes con caption e infografías (ej. `comparativa-ahorro-energetico.webp`)

**SEO:** JSON-LD Article en todas; FAQPage en `nlv-2026-uk`. Metadatos con hreflang. Tablas MDX con remark-gfm.

### 3.7. Admin Leads (`/[locale]/admin/leads`)

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

1. **Searching:** Sin integración con cuestionario ni resultados
2. **Properties:** "Ver Detalles" sin página de detalle
3. **Admin:** Sin login; acceso abierto
4. **Navegación global:** ✅ Header con Inicio, Propiedades, Guías y Recursos, selector de idioma (es/en) y CTA "Encontrar mi Estancia".

---

## 7. Estructura de Contenido MDX

```
src/content/guias/
├── es/
│   ├── arbitraje-energetico.mdx
│   ├── guia-legal-alquiler-2025.mdx
│   └── nlv-2026-uk.mdx
└── en/
    ├── energy-arbitrage.mdx
    ├── guia-legal-alquiler-2025.mdx
    └── nlv-2026-uk.mdx
```

Los componentes interactivos se cargan con `dynamic(..., { ssr: false })` para evitar errores de hidratación.

---

## 8. Comandos de Desarrollo

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
