import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LegalPageShell } from "@/components/legal/legal-page-shell";

export const metadata: Metadata = {
  title: "Política de Privacidad | Bluevera Residences",
  description:
    "Cómo Bluevera Residences recopila, trata y protege sus datos personales — cumplimiento RGPD / LOPDGDD.",
  robots: { index: false, follow: false },
};

const OWNER_NAME = "Eduardo Morillo Velarde Magaña";
const OWNER_NIF = "75248131C";

type Props = { params: Promise<{ locale: string }> };

export default async function PoliticaPrivacidadPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "es") redirect("/en/privacy-policy");

  return (
    <LegalPageShell
      title="Política de Privacidad"
      lastUpdated="Última actualización: 2026-05-25"
    >
      <p>
        De conformidad con el Reglamento (UE) 2016/679 del Parlamento Europeo y
        del Consejo (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos
        Personales y Garantía de los Derechos Digitales (LOPDGDD), la presente
        Política de Privacidad describe cómo Bluevera Residences trata los datos
        personales recabados a través de www.blueveraresidences.com.
      </p>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          1. Responsable del tratamiento
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Responsable:</strong> {OWNER_NAME}
          </li>
          <li>
            <strong>NIF:</strong> {OWNER_NIF}
          </li>
          <li>
            <strong>Domicilio:</strong> Paseo de Reding 43, 1º Izda, 29016
            Málaga, España
          </li>
          <li>
            <strong>Teléfono:</strong>{" "}
            <a
              href="tel:+34696676348"
              className="text-[#C96B4A] underline underline-offset-2"
            >
              +34 696 676 348
            </a>
          </li>
          <li>
            <strong>Correo electrónico para asuntos de privacidad:</strong>{" "}
            <a
              href="mailto:eduardo@blueveraresidences.com"
              className="text-[#C96B4A] underline underline-offset-2"
            >
              eduardo@blueveraresidences.com
            </a>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          2. Qué datos recogemos y cómo
        </h2>
        <p>Recogemos datos personales en las siguientes situaciones:</p>
        <p>
          <strong>
            a) Al completar nuestro cuestionario &ldquo;Design Your Stay&rdquo;:
          </strong>{" "}
          nombre, correo electrónico, nacionalidad, duración prevista de la
          estancia, fechas estimadas, preferencias y cualquier otra información
          que facilite voluntariamente.
        </p>
        <p>
          <strong>
            b) Al contactar con nosotros por email, teléfono o formulario:
          </strong>{" "}
          los datos de contacto y el contenido de su comunicación.
        </p>
        <p>
          <strong>c) Al reservar una Discovery Call vía Calendly:</strong>{" "}
          nombre, correo, zona horaria e información facilitada en las preguntas
          de reserva.
        </p>
        <p>
          <strong>
            d) Al descargar una guía o suscribirse para recibir contenido:
          </strong>{" "}
          nombre, correo y país.
        </p>
        <p>
          <strong>e) Automáticamente al navegar:</strong> datos técnicos como
          dirección IP, tipo de navegador, sistema operativo, páginas visitadas,
          tiempo en página y ubicación aproximada, recogidos mediante cookies y
          tecnologías similares (ver Política de Cookies).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          3. Finalidades y base jurídica del tratamiento
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead>
              <tr className="border-b-2 border-[#1B2A49]/20 text-left">
                <th className="py-3 pr-4 font-semibold">Finalidad</th>
                <th className="py-3 pl-4 font-semibold">Base jurídica</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#1B2A49]/10 align-top">
                <td className="py-3 pr-4">
                  Responder a sus consultas e informarle sobre nuestros
                  servicios
                </td>
                <td className="py-3 pl-4">
                  Medidas precontractuales a petición del interesado (art. 6.1.b
                  RGPD)
                </td>
              </tr>
              <tr className="border-b border-[#1B2A49]/10 align-top">
                <td className="py-3 pr-4">
                  Enviarle la guía o contenido solicitado
                </td>
                <td className="py-3 pl-4">Consentimiento (art. 6.1.a RGPD)</td>
              </tr>
              <tr className="border-b border-[#1B2A49]/10 align-top">
                <td className="py-3 pr-4">
                  Enviarle comunicaciones comerciales sobre nuestros servicios
                </td>
                <td className="py-3 pl-4">
                  Consentimiento (art. 6.1.a RGPD), revocable en cualquier
                  momento
                </td>
              </tr>
              <tr className="border-b border-[#1B2A49]/10 align-top">
                <td className="py-3 pr-4">
                  Gestionar la relación contractual si se convierte en cliente
                </td>
                <td className="py-3 pl-4">
                  Ejecución de contrato (art. 6.1.b RGPD)
                </td>
              </tr>
              <tr className="border-b border-[#1B2A49]/10 align-top">
                <td className="py-3 pr-4">
                  Cumplir obligaciones legales, contables y fiscales
                </td>
                <td className="py-3 pl-4">
                  Obligación legal (art. 6.1.c RGPD)
                </td>
              </tr>
              <tr className="align-top">
                <td className="py-3 pr-4">
                  Analizar el uso del sitio web para mejorar nuestros servicios
                </td>
                <td className="py-3 pl-4">
                  Consentimiento a través del banner de cookies (art. 6.1.a
                  RGPD)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          4. Plazo de conservación
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Datos de consultas que no llegan a ser clientes: hasta 24 meses
            desde el último contacto, tras lo cual se suprimen.
          </li>
          <li>
            Datos de clientes: durante la duración de la relación y hasta 6 años
            después para cumplir con la normativa mercantil y fiscal española.
          </li>
          <li>
            Datos recabados mediante cookies: como se detalla en la Política de
            Cookies.
          </li>
          <li>Consentimiento para marketing: hasta su revocación.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          5. Destinatarios de los datos
        </h2>
        <p>No vendemos sus datos personales. Solo los compartimos con:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Proveedores de infraestructura y servicios IT</strong> que
            actúan como encargados del tratamiento conforme al art. 28 RGPD:
            Vercel Inc. (hosting), Google LLC (servicios de email y analítica
            cuando aplique), Meta Platforms Ireland Ltd. (píxel de Facebook para
            medición publicitaria), MailerLite (plataforma de email marketing),
            Calendly LLC (reserva de citas).
          </li>
          <li>
            <strong>Asesores profesionales</strong> (abogados, gestores,
            contables) cuando sea necesario para prestar los servicios
            contratados, con su conocimiento previo.
          </li>
          <li>
            <strong>Autoridades públicas</strong> cuando sea legalmente
            exigible.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          6. Transferencias internacionales
        </h2>
        <p>
          Algunos de nuestros proveedores están situados fuera del Espacio
          Económico Europeo (EEE), en particular en Estados Unidos (Vercel,
          Google, Meta, MailerLite, Calendly). Estas transferencias están
          protegidas por el Marco de Privacidad de Datos UE-EE.UU. y/o por
          Cláusulas Contractuales Tipo aprobadas por la Comisión Europea, que
          garantizan un nivel de protección adecuado equivalente al exigido por
          el RGPD.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          7. Sus derechos
        </h2>
        <p>Tiene derecho a:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Acceder</strong> a los datos personales que tratamos sobre
            usted.
          </li>
          <li>
            <strong>Rectificar</strong> datos inexactos o incompletos.
          </li>
          <li>
            <strong>Suprimir</strong> sus datos (&ldquo;derecho al
            olvido&rdquo;) cuando proceda.
          </li>
          <li>
            <strong>Limitar</strong> el tratamiento de sus datos.
          </li>
          <li>
            <strong>Portabilidad</strong> de los datos en un formato
            estructurado y de uso común.
          </li>
          <li>
            <strong>Oponerse</strong> al tratamiento, incluido el marketing
            directo.
          </li>
          <li>
            <strong>Revocar el consentimiento</strong> en cualquier momento, sin
            que ello afecte a la licitud del tratamiento previo.
          </li>
          <li>
            <strong>No ser objeto</strong> de decisiones automatizadas con
            efectos significativos.
          </li>
        </ul>
        <p>
          Para ejercer estos derechos, escriba a{" "}
          <a
            href="mailto:eduardo@blueveraresidences.com"
            className="text-[#C96B4A] underline underline-offset-2"
          >
            eduardo@blueveraresidences.com
          </a>{" "}
          o a nuestro domicilio postal, adjuntando copia de su DNI o documento
          identificativo equivalente.
        </p>
        <p>
          También tiene derecho a presentar una reclamación ante la Agencia
          Española de Protección de Datos (AEPD —{" "}
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noreferrer noopener"
            className="text-[#C96B4A] underline underline-offset-2"
          >
            www.aepd.es
          </a>
          ) o ante la autoridad de control de su país de residencia.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          8. Medidas de seguridad
        </h2>
        <p>
          Hemos implementado medidas técnicas y organizativas adecuadas a la
          naturaleza de los datos y a los riesgos del tratamiento, incluyendo
          conexiones cifradas (HTTPS), controles de acceso, copias de seguridad
          periódicas y garantías contractuales con nuestros encargados.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          9. Modificaciones
        </h2>
        <p>
          Podemos actualizar esta Política de Privacidad. La versión más
          reciente está siempre disponible en esta página, con la fecha de
          &ldquo;Última actualización&rdquo; en la parte superior.
        </p>
      </section>
    </LegalPageShell>
  );
}
