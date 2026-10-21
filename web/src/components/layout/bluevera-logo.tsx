import { cn } from "@/lib/utils";

/** Azul marino confiable (marca, alineado con --brand-navy) */
const NAVY = "#1A365D";
/** Champagne / oro apagado (escudo, sol y tagline) */
const CHAMPAGNE = "#B5A691";

const ffSerif =
  "var(--font-playfair), 'Playfair Display', Georgia, 'Times New Roman', serif";
const ffSans = "var(--font-montserrat), ui-sans-serif, system-ui, sans-serif";

type BlueveraLogoProps = {
  className?: string;
};

/**
 * Logo Bluevera Residences (referencia impresa): escudo + sol, monograma BR,
 * wordmark serif/sans y tagline. SVG plano, sin fondo.
 */
export function BlueveraLogo({ className }: BlueveraLogoProps) {
  return (
    <svg
      viewBox="0 0 300 52"
      preserveAspectRatio="xMinYMid meet"
      className={cn(
        "block h-12 max-h-[3.25rem] w-auto shrink-0 align-middle [aspect-ratio:300/52]",
        className,
      )}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable="false"
    >
      {/* Emblema: sol (atrás) → escudo → monograma BR */}
      <g transform="translate(1, 0)">
        <g fill={CHAMPAGNE}>
          <path d="M 7.5 19.5 A 17.5 17.5 0 0 1 42.5 19.5 Z" />
          <path d="M 25 0.5 L 27.8 9.2 L 22.2 9.2 Z" />
          <path d="M 14.2 3.8 L 17.5 11.5 L 12.8 10.2 Z" />
          <path d="M 35.8 3.8 L 37.2 10.2 L 32.5 11.5 Z" />
          <path d="M 6.5 11 L 11.2 16.8 L 8.5 17.8 Z" />
          <path d="M 43.5 11 L 41.5 17.8 L 38.8 16.8 Z" />
        </g>

        <path
          d="M 25 15.5 L 39.5 17.2 L 39.5 38.5 Q 25 48.2 10.5 38.5 L 10.5 17.2 Z"
          fill={CHAMPAGNE}
        />

        <text
          x="14.5"
          y="32.5"
          fill={NAVY}
          style={{
            fontFamily: ffSerif,
            fontSize: "18px",
            fontWeight: 700,
          }}
        >
          B
        </text>
        <text
          x="21"
          y="32.5"
          fill={NAVY}
          style={{
            fontFamily: ffSerif,
            fontSize: "18px",
            fontWeight: 700,
          }}
        >
          R
        </text>
      </g>

      {/* ——— Wordmark (alineado al bloque del escudo) ——— */}
      <text
        x="56"
        y="19"
        fill={NAVY}
        style={{
          fontFamily: ffSerif,
          fontSize: "15px",
          fontWeight: 700,
          letterSpacing: "0.22em",
        }}
      >
        BLUEVERA
      </text>
      <text
        x="56"
        y="33"
        fill={NAVY}
        style={{
          fontFamily: ffSans,
          fontSize: "8px",
          fontWeight: 500,
          letterSpacing: "0.28em",
        }}
      >
        RESIDENCES
      </text>
      <text
        x="56"
        y="45.5"
        fill={CHAMPAGNE}
        style={{
          fontFamily: ffSans,
          fontSize: "5.75px",
          fontWeight: 300,
          letterSpacing: "0.38em",
        }}
      >
        PREMIUM WINTER STANDARD
      </text>
    </svg>
  );
}
