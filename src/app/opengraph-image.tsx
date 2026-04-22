import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Bluevera Residences - Premium Winter Rentals on the Costa del Sol";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #1A365D 0%, #2A4A7F 50%, #1A365D 100%)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: "#D9734E",
            letterSpacing: "4px",
            textTransform: "uppercase" as const,
            marginBottom: 20,
          }}
        >
          Bluevera Residences
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#FFFFFF",
            textAlign: "center" as const,
            lineHeight: 1.2,
            maxWidth: 900,
            marginBottom: 24,
          }}
        >
          Premium Winter Rentals on the Costa del Sol
        </div>
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.75)",
            textAlign: "center" as const,
            maxWidth: 700,
          }}
        >
          Bluevera Standard long stays for active retirees
        </div>
        <div
          style={{
            marginTop: 40,
            padding: "14px 40px",
            background: "#D9734E",
            borderRadius: 50,
            fontSize: 20,
            fontWeight: 600,
            color: "#FFFFFF",
          }}
        >
          Design Your Stay
        </div>
      </div>
    </div>,
    { ...size },
  );
}
