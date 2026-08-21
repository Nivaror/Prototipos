import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Ruta 20, parrilla en Itatí",
  description:
    "Parrilla en Itatí, Corrientes. Abierta viernes, sábado y domingo de 9 a 17. Servicio a la mesa, para llevar y reservas online.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
