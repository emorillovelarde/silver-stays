import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const BRAND = "#0077B6";
const BODY_BG = "#f6f9fc";
const CARD_BG = "#ffffff";
const MUTED = "#4b5563";

export type WelcomeEmailProps = {
  firstName: string;
  locale: "en" | "es";
};

function urls() {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://silver-stays.com";
  const base = site.replace(/\/$/, "");
  const guidePdf = `${base}/guides/guia-costa-del-sol-2026.pdf`;
  const calendly =
    process.env.NEXT_PUBLIC_CALENDLY_BOOKING_URL ??
    "https://calendly.com/tu-link";
  return { guidePdf, calendly };
}

const copy = {
  en: {
    preview: "Download your guide and discover your next step...",
    greeting: (name: string) => `Dear ${name},`,
    p1: "Thank you for taking the first step towards your Mediterranean winter retreat. We have securely received your details, and our team is thrilled to help you design a seamless and warm stay.",
    p2: "As promised, you can download your exclusive 2026 Costa del Sol Guide below. Inside, we bypass the tourist clichés and focus on what truly matters for long-stay residents: legally verified properties, exact healthcare access, and finding the perfect community.",
    btn1: "Download Your Free Guide",
    titulillo: "Your Premium Next Step:",
    p3: "Reading the guide is the perfect start, but navigating visas, 90/180-day Schengen rules, and winter logistics requires expert local support. That is why our Managing Partner has reserved a complimentary 15-minute Welcome Call for you. In this brief session, we will outline your logistical roadmap and answer your immediate questions, with zero obligation.",
    btn2: "Schedule Your Welcome Call",
    regards: "Warm regards,",
    team: "The Silver Costa Residences Team",
  },
  es: {
    preview: "Descargue su guía y descubra su siguiente paso...",
    greeting: (name: string) => `Estimado/a ${name},`,
    p1: "Gracias por dar el primer paso hacia su retiro invernal en el Mediterráneo. Hemos recibido su perfil de forma segura y estamos encantados de ayudarle a diseñar una estancia impecable y cálida.",
    p2: "Como lo prometido es deuda, puede descargar su Guía Costa del Sol 2026 a continuación. En ella, dejamos de lado los clichés turísticos y nos centramos en lo que realmente importa para residentes de larga duración: propiedades legalmente verificadas, acceso sanitario y la elección de la comunidad perfecta.",
    btn1: "Descargar Guía Gratuita",
    titulillo: "Su Siguiente Paso Premium:",
    p3: "Leer la guía es el comienzo ideal, pero navegar por visados, normativas de alquiler y logística invernal requiere apoyo local experto. Por eso, nuestro Socio Director ha reservado una Llamada de Bienvenida de 15 minutos (sin compromiso) para usted. En esta breve sesión, trazaremos su hoja de ruta y resolveremos sus dudas inmediatas.",
    btn2: "Reservar Llamada de Bienvenida",
    regards: "Reciba un cordial saludo,",
    team: "El Equipo de Silver Costa Residences",
  },
} as const;

export function WelcomeEmail({ firstName, locale }: WelcomeEmailProps) {
  const c = locale === "es" ? copy.es : copy.en;
  const { guidePdf, calendly } = urls();

  const font =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

  return (
    <Html lang={locale}>
      <Head />
      <Preview>{c.preview}</Preview>
      <Body
        style={{
          margin: 0,
          padding: "32px 16px",
          backgroundColor: BODY_BG,
          fontFamily: font,
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: CARD_BG,
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            padding: "32px",
            boxSizing: "border-box",
          }}
        >
          <Text
            style={{
              margin: "0 0 24px",
              fontSize: "17px",
              lineHeight: "26px",
              color: "#111827",
            }}
          >
            {c.greeting(firstName)}
          </Text>

          <Text
            style={{
              margin: "0 0 20px",
              fontSize: "16px",
              lineHeight: "26px",
              color: MUTED,
            }}
          >
            {c.p1}
          </Text>

          <Text
            style={{
              margin: "0 0 28px",
              fontSize: "16px",
              lineHeight: "26px",
              color: MUTED,
            }}
          >
            {c.p2}
          </Text>

          <Section style={{ textAlign: "center", margin: "0 0 36px" }}>
            <Button
              href={guidePdf}
              style={{
                display: "inline-block",
                backgroundColor: "transparent",
                color: BRAND,
                border: `2px solid ${BRAND}`,
                fontSize: "15px",
                fontWeight: 600,
                lineHeight: "100%",
                textDecoration: "none",
                textAlign: "center",
                padding: "14px 28px",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
            >
              {c.btn1}
            </Button>
          </Section>

          <Hr
            style={{
              borderColor: "#e5e7eb",
              margin: "0 0 28px",
            }}
          />

          <Heading
            as="h2"
            style={{
              margin: "0 0 16px",
              fontSize: "18px",
              fontWeight: 700,
              lineHeight: "26px",
              color: BRAND,
            }}
          >
            {c.titulillo}
          </Heading>

          <Text
            style={{
              margin: "0 0 32px",
              fontSize: "16px",
              lineHeight: "26px",
              color: MUTED,
            }}
          >
            {c.p3}
          </Text>

          <Section style={{ textAlign: "center", margin: "0 0 40px" }}>
            <Button
              href={calendly}
              style={{
                display: "inline-block",
                backgroundColor: BRAND,
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "100%",
                textDecoration: "none",
                textAlign: "center",
                padding: "16px 36px",
                borderRadius: "10px",
                boxSizing: "border-box",
              }}
            >
              {c.btn2}
            </Button>
          </Section>

          <Hr
            style={{
              borderColor: "#e5e7eb",
              margin: "0 0 24px",
            }}
          />

          <Text
            style={{
              margin: "0 0 8px",
              fontSize: "16px",
              lineHeight: "24px",
              color: MUTED,
            }}
          >
            {c.regards}
          </Text>
          <Text
            style={{
              margin: 0,
              fontSize: "16px",
              lineHeight: "24px",
              fontWeight: 600,
              color: BRAND,
            }}
          >
            {c.team}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default WelcomeEmail;
