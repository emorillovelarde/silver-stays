# Contexto Técnico y Funcional: Bluevera Residences

Este documento describe el estado actual, la funcionalidad y la arquitectura del proyecto **Bluevera Residences**, una plataforma web diseñada para facilitar estancias de larga duración a personas mayores (Silver Economy) en la Costa del Sol, enfocándose en bienestar, accesibilidad y comunidad.

## 1. Visión del Proyecto
**Bluevera Residences** ayuda a seniors activos a diseñar su estancia ideal en el sur de España. A diferencia de un portal inmobiliario tradicional, Bluevera Residences prioriza tres pilares:
1.  **Logística y Salud**: Viviendas certificadas con duchas a ras de suelo, ascensores y temperaturas controladas.
2.  **Comunidad**: Conexión con actividades locales (bridge, golf, senderismo suave).
3.  **Soporte**: Asistentes personales para trámites legales y médicos.

## 2. Stack Tecnológico
El proyecto está construido con un stack moderno y robusto:
-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Turbopack).
-   **Lenguaje**: TypeScript.
-   **Estilos**: Tailwind CSS v4 + `shadcn/ui` (Radix UI) para componentes accesibles.
-   **Base de Datos y Auth**: [Supabase](https://supabase.com/) (PostgreSQL).
-   **Gestión de Estado y Formularios**: `react-hook-form` + `zod` para validación de esquemas.
-   **Iconos**: `lucide-react`.

## 3. Arquitectura y Navegación
La aplicación utiliza el `App Router` de Next.js. Las rutas principales son:

### A. Página Principal (`/`)
Landing page diseñada para generar confianza y explicar la propuesta de valor.
-   **Hero Section**: Imagen evocadora de "calidad de vida" con CTA claro a "Diseñar estancia".
-   **Trust Bar**: Barra de confianza (Silver Standard, Seguridad Certificada).
-   **Steps Section (Refactorizado)**: Explicación del proceso en 3 pasos (Cuestionario -> Diseño -> Disfrute), con diseño visual cuidado.
-   **Bento Grid**: Visualización de los pilares del servicio (Hogar, Salud, Comunidad).

### B. Cuestionario de Estilo de Vida (`/questionnaire`)
El "corazón" de la captación de leads. Un wizard interactivo paso a paso:
1.  **La Visión**: Preferencias de mañana (caminar playa, golf, etc.) y entorno (urbano vs natural).
2.  **Intereses**: Selección múltiple de actividades (Bridge, Yoga, Voluntariado). *Nota: Implementa lógica reactiva con `useWatch`.*
3.  **Logística**: Duración de la estancia (1-3 meses, +9 meses, etc.).
4.  **Contacto**: Recogida de datos personales (Nombre, Email, Teléfono).

**Flujo de Datos**: Al completar, los datos se guardan en la tabla `leads` de Supabase en formato JSONB, permitiendo flexibilidad en las respuestas.

### C. Resultados / Propiedades (`/properties`)
Catálogo de viviendas filtradas (actualmente muestra todas las disponibles).
-   **Tarjetas**: Muestran precio, ubicación (Nerja, Marbella), y dos métricas clave:
    -   **Nivel de Accesibilidad** (1-5).
    -   **Clima en Enero** (Dato crítico para el target nórdico/invernal).
-   *(Pendiente)*: Conexión real con el algoritmo de recomendación basado en el cuestionario.

### D. CRM / Admin (`/admin/leads`)
Panel interno para gestionar las solicitudes recibidas.
-   Tabla con los últimos leads.
-   Muestra detalles de contacto y un resumen de las preferencias (tags de intereses, duración).
-   Permite a los gestores contactar proactivamente a los usuarios.

### E. Página de Búsqueda (`/searching`)
Página transicional que simula la búsqueda de opciones personalizadas mientras el sistema "piensa".

## 4. Estructura de Datos (Supabase)

### Tabla `leads`
Almacena las respuestas del cuestionario y la información de contacto de usuarios no registrados (o registrados).
```sql
create table leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  email text,
  full_name text,
  phone text,
  data jsonb -- Contiene: { questionnaire: { ... }, contact: { ... } }
);
```

### Tabla `profiles` (Legacy/Auth)
Vinculada a `auth.users`, usada para usuarios que crean cuenta completa.

## 5. Componentes Clave
-   `QuestionnaireWizard`: Orquestador del formulario multi-paso.
-   `StepInterests`: Componente de selección múltiple con feedback visual inmediato.
-   `BentoGrid`: Layout de grid flexible para mostrar características.

## 6. Estado Actual
El proyecto es funcional en su flujo principal ("Happy Path"):
1.  Un usuario llega a la Home.
2.  Entra al Cuestionario.
3.  Completa sus preferencias.
4.  El Lead se guarda en Supabase.
5.  El administrador lo ve en el CRM.
6.  El usuario puede ver propiedades disponibles.

*Versión del documento: 1.0 - Generado automáticamente por Antigravity*
