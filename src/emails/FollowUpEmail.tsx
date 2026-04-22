import {
  Body,
  Button,
  Container,
  Head,
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

export type FollowUpEmailProps = {
  firstName: string;
  locale: "en" | "es";
};

function calendlyUrl(): string {
  return (
    process.env.NEXT_PUBLIC_CALENDLY_BOOKING_URL ??
    "https://calendly.com/tu-link"
  );
}

const copy = {
  en: {
    preview: "How to secure your winter retreat without the legal headaches...",
    greeting: (name: string) => `Dear ${name},`,
    p1: "A few days ago, I sent you the 2026 Costa del Sol Guide. I hope you found the section about local communities and healthcare useful.",
    p2: 'Today, I want to address the "elephant in the room". Many of our clients tell us that while the idea of a Mediterranean winter is a dream, the reality of Spanish bureaucracy—navigating the 90/180-day Schengen rule, securing Non-Lucrative Visas, and avoiding unregulated holiday rentals—can feel like a nightmare.',
    p3: "You shouldn't have to spend your retirement fighting with paperwork or worrying about rental scams. That is exactly why we created the Bluevera Standard Framework. We only work with 100% legally verified properties under strict long-term contracts (LAU), and we manage the complex local logistics for you.",
    p4: "Let's take the guesswork out of your transition. I have a few slots left this week for a brief, zero-obligation Welcome Call. We can discuss your ideal dates and map out your secure legal route to Spain.",
    cta: "Schedule Your 15-Min Call",
    closing1: "Speak soon,",
    closingName: "[Tu Nombre]",
    closingRole: "Managing Partner, Bluevera Residences",
  },
  es: {
    preview:
      "Cómo asegurar su retiro invernal sin dolores de cabeza legales...",
    greeting: (name: string) => `Estimado/a ${name},`,
    p1: "Hace unos días le envié la Guía Costa del Sol 2026. Espero que le haya resultado útil la sección sobre nuestras comunidades y acceso sanitario.",
    p2: "Hoy quiero hablarle del mayor obstáculo que frena a la mayoría: la burocracia y la inseguridad del mercado inmobiliario. Muchos de nuestros clientes nos confiesan que, aunque la idea de pasar el invierno frente al mar es un sueño, enfrentarse a normativas complejas y al miedo a las estafas en alquileres no regulados es un verdadero dolor de cabeza.",
    p3: "Su retiro no debería consistir en lidiar con papeleo. Por eso creamos el Bluevera Standard Framework. Auditamos legalmente el 100% de nuestras propiedades, garantizamos contratos de larga temporada seguros (LAU) y gestionamos la logística local por usted.",
    p4: "Eliminemos la incertidumbre de su viaje. Me quedan algunos huecos esta semana para una breve Llamada de Bienvenida sin compromiso. Hablaremos de sus fechas ideales y trazaremos su hoja de ruta segura hacia la Costa del Sol.",
    cta: "Reservar Llamada de 15 min",
    closing1: "Reciba un cordial saludo,",
    closingName: "[Tu Nombre]",
    closingRole: "Socio Director, Bluevera Residences",
  },
} as const;

const textBlock = {
  margin: "0 0 20px",
  fontSize: "16px",
  lineHeight: "26px",
  color: MUTED,
} as const;

export function FollowUpEmail({ firstName, locale }: FollowUpEmailProps) {
  const c = locale === "es" ? copy.es : copy.en;
  const calendly = calendlyUrl();

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

          <Text style={textBlock}>{c.p1}</Text>
          <Text style={textBlock}>{c.p2}</Text>
          <Text style={textBlock}>{c.p3}</Text>
          <Text
            style={{
              ...textBlock,
              margin: "0 0 32px",
            }}
          >
            {c.p4}
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
              {c.cta}
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
            {c.closing1}
          </Text>
          <Text
            style={{
              margin: "0 0 4px",
              fontSize: "16px",
              lineHeight: "24px",
              fontWeight: 600,
              color: BRAND,
            }}
          >
            {c.closingName}
          </Text>
          <Text
            style={{
              margin: 0,
              fontSize: "16px",
              lineHeight: "24px",
              color: MUTED,
            }}
          >
            {c.closingRole}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default FollowUpEmail;
