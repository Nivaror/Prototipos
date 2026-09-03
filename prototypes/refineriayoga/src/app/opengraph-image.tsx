import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "RefineriaYoga | Horario semanal abierto";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0d1e23", color: "#f3f4ec", padding: "72px 80px" }}>
      <div style={{ display: "flex", width: 100, height: 10, background: "#d5f36e" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ fontSize: 30, color: "#d5f36e", fontWeight: 700 }}>REFINERIAYOGA</div>
        <div style={{ maxWidth: 950, fontSize: 72, lineHeight: 1.04, letterSpacing: "-0.04em", fontWeight: 700 }}>Horario semanal abierto</div>
      </div>
      <div style={{ display: "flex", fontSize: 23, color: "#aabbb6" }}>Muestra de propuesta hecha por Nivaror. No es el sitio oficial del negocio.</div>
    </div>,
    size,
  );
}
