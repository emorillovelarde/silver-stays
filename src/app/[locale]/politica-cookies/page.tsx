import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LegalPageShell } from "@/components/legal/legal-page-shell";

export const metadata: Metadata = {
  title: "Política de Cookies | Bluevera Residences",
  description:
    "Cómo blueveraresidences.com utiliza cookies y tecnologías similares, con proveedor, finalidad y duración por categoría.",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ locale: string }> };

export default async function PoliticaCookiesPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "es") redirect("/en/cookie-policy");

  return (
    <LegalPageShell
      title="Política de Cookies"
      lastUpdated="Última actualización: 2026-05-25"
    >
      <p>
        La presente Política de Cookies explica cómo Bluevera Residences utiliza
        cookies y tecnologías similares en www.blueveraresidences.com, en
        cumplimiento del artículo 22.2 de la Ley 34/2002 (LSSI-CE) y del
        Reglamento (UE) 2016/679 (RGPD).
      </p>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          1. ¿Qué son las cookies?
        </h2>
        <p>
          Las cookies son pequeños archivos de texto que un sitio web almacena
          en su dispositivo cuando lo visita. Permiten al sitio reconocer su
          dispositivo en visitas posteriores, recordar sus preferencias y
          analizar cómo se utiliza el sitio.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          2. Tipos de cookies que utilizamos
        </h2>
        <p>
          <strong>Cookies estrictamente necesarias</strong> — necesarias para el
          funcionamiento del sitio. No pueden desactivarse. Almacenan sus
          preferencias de consentimiento de cookies y el estado de la sesión.
          Duración: de sesión o hasta 12 meses. Proveedor: Bluevera Residences.
        </p>
        <p>
          <strong>Cookies analíticas</strong> — nos ayudan a entender cómo
          interactúan los visitantes con el sitio (páginas visitadas, tiempo en
          página, fuentes de tráfico). Duración: hasta 24 meses. Proveedor:
          Google LLC (Google Analytics, si está activo).
        </p>
        <p>
          <strong>Cookies de marketing</strong> — utilizadas para medir la
          eficacia de nuestra publicidad en las plataformas de Meta (Facebook,
          Instagram) y para mostrar anuncios relevantes. Duración: hasta 13
          meses. Proveedor: Meta Platforms Ireland Ltd. (Meta Pixel, id
          1940332579949759).
        </p>
        <p>
          <strong>Cookies funcionales</strong> — guardan preferencias como el
          idioma. Duración: hasta 12 meses. Proveedor: Bluevera Residences.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          3. Cómo gestionar las cookies
        </h2>
        <p>
          Cuando visita el sitio por primera vez, un banner le permite aceptar
          todas las cookies, rechazar las no esenciales o configurarlas por
          categoría. Puede cambiar sus preferencias en cualquier momento
          haciendo clic en el enlace &ldquo;Configuración de cookies&rdquo; del
          pie de página.
        </p>
        <p>
          También puede desactivar o eliminar cookies directamente desde la
          configuración de su navegador:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Chrome: Configuración → Privacidad y seguridad → Cookies</li>
          <li>Firefox: Opciones → Privacidad y seguridad → Cookies</li>
          <li>Safari: Preferencias → Privacidad → Cookies</li>
          <li>Edge: Configuración → Privacidad → Cookies</li>
        </ul>
        <p>
          La desactivación de determinadas cookies puede afectar al
          funcionamiento del sitio.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          4. Transferencias internacionales
        </h2>
        <p>
          Algunos proveedores de cookies (Google, Meta) están situados en
          Estados Unidos. Las transferencias están protegidas por el Marco de
          Privacidad de Datos UE-EE.UU. y/o Cláusulas Contractuales Tipo.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          5. Modificaciones
        </h2>
        <p>
          Podemos actualizar esta política para reflejar cambios en las cookies
          que utilizamos o en la normativa aplicable. La versión más reciente
          está siempre disponible en esta página.
        </p>
        <p>
          Para cualquier consulta, escríbanos a{" "}
          <a
            href="mailto:eduardo@blueveraresidences.com"
            className="text-[#C96B4A] underline underline-offset-2"
          >
            eduardo@blueveraresidences.com
          </a>
          .
        </p>
      </section>
    </LegalPageShell>
  );
}
