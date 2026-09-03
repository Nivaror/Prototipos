import { ImageResponse } from "next/og";

// Tarjeta de preview del link (WhatsApp / Instagram / Facebook). Sin og:image el
// link llega a Android como texto plano y no se puede tocar.
// Reemplazala por un public/og.jpg de 1200x630 recortado del hero apenas el
// prototipo tenga fotos propias (ver el comentario en layout.tsx) y borrá este archivo.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Subsede Clubsito";

// TODO: ajustar a la paleta del prototipo.
const BG = "#07111f";
const INK = "#f4f3ed";
const ACCENT = "#f2c94c";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", width: 96, height: 8, background: ACCENT }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: INK,
              fontWeight: 700,
            }}
          >
            {alt}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: INK, opacity: 0.55 }}>
          Muestra de Nivaror - no es el sitio oficial
        </div>
      </div>
    ),
    size,
  );
}
