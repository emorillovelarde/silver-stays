import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LegalPageShell } from "@/components/legal/legal-page-shell";

export const metadata: Metadata = {
  title: "Aviso Legal | Bluevera Residences",
  description:
    "Aviso Legal de blueveraresidences.com — datos del titular, condiciones de uso, propiedad intelectual y legislación aplicable (LSSI-CE).",
  robots: { index: false, follow: false },
};

const OWNER_NAME = "Eduardo Morillo Velarde Magaña";
const OWNER_NIF = "75248131C";

type Props = { params: Promise<{ locale: string }> };

export default async function AvisoLegalPage({ params }: Props) {
  const { locale } = await params;
  // Slug solo en español; la versión EN vive en /en/legal-notice.
  if (locale !== "es") redirect("/en/legal-notice");

  return (
    <LegalPageShell
      title="Aviso Legal"
      lastUpdated="Última actualización: 2026-05-25"
    >
      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          1. Titular del sitio web
        </h2>
        <p>
          En cumplimiento del deber de información recogido en el artículo 10 de
          la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
          Información y de Comercio Electrónico (LSSI-CE), se facilita a
          continuación la información relativa al titular de este sitio web:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Nombre comercial:</strong> Bluevera Residences
          </li>
          <li>
            <strong>Titular:</strong> {OWNER_NAME}
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
            <strong>Correo electrónico:</strong>{" "}
            <a
              href="mailto:hello@blueveraresidences.com"
              className="text-[#C96B4A] underline underline-offset-2"
            >
              hello@blueveraresidences.com
            </a>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          2. Objeto del sitio web
        </h2>
        <p>
          Bluevera Residences opera este sitio web para ofrecer información
          sobre sus servicios boutique de alquiler de temporada y gestión
          integral del estilo de vida para residentes extranjeros que pasan el
          invierno en la Costa del Sol, incluyendo gestión inmobiliaria,
          asistencia legal y administrativa, navegación del sistema sanitario y
          servicios de integración comunitaria.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          3. Condiciones de uso
        </h2>
        <p>
          El acceso y uso de este sitio web implica la aceptación plena de las
          condiciones recogidas en el presente Aviso Legal, la Política de
          Privacidad y la Política de Cookies. El usuario se compromete a hacer
          un uso del sitio web y de sus contenidos conforme a la ley, la buena
          fe, el orden público y a las presentes condiciones, y a no utilizarlo
          con fines ilícitos o que puedan perjudicar derechos o intereses de
          terceros.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          4. Propiedad intelectual e industrial
        </h2>
        <p>
          Todos los contenidos de este sitio web —incluidos a título enunciativo
          textos, imágenes, fotografías, gráficos, logotipos, marcas, código
          fuente y diseño— son propiedad de Bluevera Residences o de terceros
          que han autorizado su uso, y están protegidos por la normativa
          española e internacional de propiedad intelectual e industrial.
        </p>
        <p>
          La reproducción, distribución, comunicación pública o transformación
          total o parcial de cualquier contenido, por cualquier medio, requiere
          la autorización previa y por escrito de Bluevera Residences. El acceso
          autorizado no implica cesión alguna sobre los contenidos.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          5. Responsabilidad
        </h2>
        <p>
          Bluevera Residences realiza esfuerzos razonables para que la
          información publicada sea exacta y actualizada, pero no garantiza la
          absoluta exactitud, exhaustividad o vigencia de todos los contenidos.
          La información proporcionada en este sitio web no constituye
          asesoramiento legal, financiero, fiscal ni médico, y no debe
          utilizarse como sustituto de asesoramiento profesional adaptado a las
          circunstancias individuales.
        </p>
        <p>
          Bluevera Residences no será responsable de los daños derivados del uso
          o de la imposibilidad de uso de este sitio web, ni de los daños
          causados por contenidos de terceros accesibles a través de enlaces
          externos.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          6. Enlaces externos
        </h2>
        <p>
          Este sitio web puede contener enlaces a sitios web de terceros.
          Bluevera Residences no controla dichos sitios y no es responsable de
          sus contenidos, exactitud, prácticas de privacidad o disponibilidad.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          7. Modificaciones
        </h2>
        <p>
          Bluevera Residences se reserva el derecho a modificar, sin previo
          aviso, los contenidos, estructura y condiciones de este sitio web,
          incluido el presente Aviso Legal.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-normal md:text-2xl">
          8. Legislación aplicable y jurisdicción
        </h2>
        <p>
          El presente Aviso Legal se rige por la legislación española. Cualquier
          controversia derivada del uso de este sitio web se someterá a los
          Juzgados y Tribunales de la ciudad de Málaga, España, salvo que la
          normativa imperativa de protección de los consumidores disponga lo
          contrario.
        </p>
      </section>
    </LegalPageShell>
  );
}
