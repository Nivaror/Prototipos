import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "El Mini Bar Americano, muestra Nivaror";

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
          background: "#14282d",
          color: "#f1f2e9",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", width: 116, height: 12, background: "#d9ea79" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1, letterSpacing: "-0.05em", fontWeight: 700 }}>
            El Mini Bar Americano
          </div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 25, color: "#b5c5bb" }}>
            Carta, horarios y visita en un solo lugar.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 21, color: "#b5c5bb" }}>
          Muestra Nivaror. No es el sitio oficial.
        </div>
      </div>
    ),
    size,
  );
}
