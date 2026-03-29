import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const BRAND = "#0077B6";
const BODY_BG = "#f6f9fc";
const CARD_BG = "#ffffff";
const MUTED = "#4b5563";

const emStyle = {
  fontStyle: "italic" as const,
  color: MUTED,
};

export type FinalFollowUpEmailProps = {
  firstName: string;
  locale: "en" | "es";
};

function calendlyUrl(): string {
  return (
    process.env.NEXT_PUBLIC_CALENDLY_BOOKING_URL ??
    "https://calendly.com/tu-link"
  );
}

function siteBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;
  const vercel = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercel) return vercel.startsWith("http") ? vercel : `https://${vercel}`;
  return "https://silver-stays.com";
}

const LOGO_ALT =
  "Bluevera Residences - Alquileres de Larga Estancia en la Costa del Sol";

const copy = {
  en: {
    preview: "The reality of wintering in the Costa del Sol...",
    greeting: (name: string) => `Dear ${name},`,
    p2: "Moving to a new country, even for the winter, can sometimes feel isolating. That is a completely normal fear.",
    p3: "However, the Silver-Standard Framework goes beyond just handing over the keys. Our true value is integrating you into a vibrant, established community. From day one, we connect you with trusted English-speaking medical facilities, local clubs, and fellow winter residents. You have complete independence, but you are never alone.",
    p4: "Because we provide this high level of personal care, we strictly limit the number of new residents we onboard each month.",
    p5: "If you are seriously considering the 2026 season, I highly recommend securing your logistical roadmap now, even if your travel dates are months away. Let's have a quick, no-obligation chat to see if we are the right fit for your winter retreat.",
    cta: "Claim Your Welcome Call",
    closing1: "Warmly,",
    closingName: "[Tu Nombre]",
    closingRole: "Managing Partner, Silver Costa Residences",
  },
  es: {
    preview: "La realidad de pasar el invierno en la Costa del Sol...",
    greeting: (name: string) => `Estimado/a ${name},`,
    p2: "Mudarse a un nuevo país, aunque sea solo por el invierno, puede generar miedo al aislamiento. Es una preocupación completamente normal.",
    p3: "Sin embargo, el Silver-Standard Framework va mucho más allá de entregarle unas llaves. Nuestro verdadero valor es integrarle en una comunidad vibrante y segura. Desde el primer día, le conectamos con instalaciones médicas de confianza, clubes locales y otros residentes de invierno. Tendrá total independencia, pero nunca estará solo.",
    p4: "Debido a este alto nivel de atención personalizada, limitamos estrictamente el número de nuevos residentes que aceptamos cada mes.",
    p5: "Si está considerando seriamente la temporada 2026, le recomiendo encarecidamente trazar su hoja de ruta logística ahora, aunque falten meses para su viaje. Tengamos una breve charla sin compromiso para diseñar su estancia.",
    cta: "Reservar Mi Llamada de Bienvenida",
    closing1: "Reciba un cordial saludo,",
    closingName: "[Tu Nombre]",
    closingRole: "Socio Director, Silver Costa Residences",
  },
} as const;

const textBlock = {
  margin: "0 0 20px",
  fontSize: "16px",
  lineHeight: "26px",
  color: MUTED,
} as const;

function Paragraph1En() {
  return (
    <Text style={textBlock}>
      Over the past week, we&apos;ve talked about finding the right property and
      skipping the legal headaches. But today, I want to talk about what happens{" "}
      <em style={emStyle}>after</em> you unpack your bags.
    </Text>
  );
}

function Paragraph1Es() {
  return (
    <Text style={textBlock}>
      Durante esta semana hemos hablado sobre cómo encontrar la propiedad ideal
      y evitar los problemas legales. Pero hoy quiero hablarle de lo que ocurre{" "}
      <em style={emStyle}>después</em> de deshacer las maletas.
    </Text>
  );
}

export function FinalFollowUpEmail({
  firstName,
  locale,
}: FinalFollowUpEmailProps) {
  const c = locale === "es" ? copy.es : copy.en;
  const calendly = calendlyUrl();
  const base = siteBaseUrl();
  const homeHref = `${base}/${locale}`;
  /** PNG: los clientes de correo (Gmail, Outlook, etc.) no suelen mostrar SVG en <img>. */
  const logoSrc = `${base}/images/logo-bluevera.png`;

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
          <Section
            className="mx-auto mb-7 text-center"
            style={{ margin: "0 0 28px", textAlign: "center" }}
          >
            <Link
              href={homeHref}
              className="inline-block no-underline"
              style={{ display: "inline-block", textDecoration: "none" }}
            >
              <Img
                src={logoSrc}
                alt={LOGO_ALT}
                width={200}
                height={52}
                className="mx-auto block h-auto max-w-[200px] w-[200px]"
                style={{
                  display: "block",
                  maxWidth: "200px",
                  width: "200px",
                  height: "auto",
                  margin: "0 auto",
                  border: 0,
                  outline: "none",
                }}
              />
            </Link>
          </Section>

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

          {locale === "es" ? <Paragraph1Es /> : <Paragraph1En />}

          <Text style={textBlock}>{c.p2}</Text>
          <Text style={textBlock}>{c.p3}</Text>
          <Text style={textBlock}>{c.p4}</Text>
          <Text
            style={{
              ...textBlock,
              margin: "0 0 32px",
            }}
          >
            {c.p5}
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

export default FinalFollowUpEmail;
