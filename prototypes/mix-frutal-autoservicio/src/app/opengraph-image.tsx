import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Mix Frutal Autoservicio. Muestra hecha por Nivaror.";

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
          background: "#1e2a20",
          color: "#f4f5e9",
          padding: "66px 78px",
        }}
      >
        <div style={{ display: "flex", color: "#314020", background: "#d9f263", padding: "10px 15px", width: 118, fontSize: 21, fontWeight: 700 }}>
          MIX FRUTAL
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 70, lineHeight: 1, fontWeight: 700, letterSpacing: "-0.06em" }}>
            Frutas, fiambres,
          </div>
          <div style={{ display: "flex", fontSize: 70, lineHeight: 1, fontWeight: 700, letterSpacing: "-0.06em" }}>
            almacén y pastas.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "#a4b19f", fontSize: 22 }}>
          <span>Mendoza 3553, Echesortu</span>
          <span>Muestra de Nivaror</span>
        </div>
      </div>
    ),
    size,
  );
}
