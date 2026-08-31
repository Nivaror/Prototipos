import { ImageResponse } from "next/og";

// Tarjeta de preview del link (WhatsApp / Instagram / Facebook). Este prototipo
// no tiene fotos propias, así que la generamos con los colores de la página en
// vez de mandar un preview sin imagen.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "KAAPI — Café Bar";

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
          background: "#eef0f0",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", width: 96, height: 8, background: "#c85a35" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#1c2024",
              fontWeight: 700,
            }}
          >
            KAAPI — Café Bar
          </div>
          <div style={{ marginTop: 24, fontSize: 34, color: "#c85a35" }}>Rosario</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#1c2024", opacity: 0.55 }}>
          Muestra hecha por Nivaror — no es el sitio oficial
        </div>
      </div>
    ),
    size,
  );
}
