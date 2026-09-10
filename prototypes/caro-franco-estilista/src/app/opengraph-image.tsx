import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Caro Franco Estilista, turnos online";

// Tarjeta tipografica en vez de foto: las fotos reales del salon son de 495px
// de ancho y al llevarlas a 1200x630 quedan blandas. Esto es lo que se ve
// cuando el link se comparte por WhatsApp o Instagram.
export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", background: "#faf8f5",
          border: "3px solid #cbb083", fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 18, color: "#9d7f47" }}>CF</div>
        <div style={{ display: "flex", fontSize: 88, color: "#1c1a17", marginTop: 22, letterSpacing: -2 }}>
          Caro Franco
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#726a61", marginTop: 14 }}>
          Estilista &amp; Mkp, Rosario
        </div>
        <div
          style={{
            display: "flex", marginTop: 44, padding: "16px 38px", borderRadius: 999,
            background: "#7c6335", color: "#ffffff", fontSize: 30,
          }}
        >
          Reservá tu turno online
        </div>
      </div>
    ),
    size,
  );
}
