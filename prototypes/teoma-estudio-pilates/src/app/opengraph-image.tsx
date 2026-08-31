import { ImageResponse } from "next/og";

// Tarjeta de preview del link (WhatsApp / Instagram / Facebook). Este prototipo
// no tiene fotos propias, así que la generamos con los colores de la página en
// vez de mandar un preview sin imagen.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Teoma Estudio Pilates";

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
          background: "#f6f4ee",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", width: 96, height: 8, background: "#6b7a5e" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#23261f",
              fontWeight: 700,
            }}
          >
            Teoma Estudio Pilates
          </div>
          <div style={{ marginTop: 24, fontSize: 34, color: "#6b7a5e" }}>Reformer y movimiento</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#23261f", opacity: 0.55 }}>
          Muestra hecha por Nivaror — no es el sitio oficial
        </div>
      </div>
    ),
    size,
  );
}
