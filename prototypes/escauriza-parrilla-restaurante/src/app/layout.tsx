import type { Metadata } from "next";
import { Libre_Caslon_Text, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const caslon = Libre_Caslon_Text({
  variable: "--font-caslon",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Escauriza Parrilla Restaurante, muestra Nivaror",
  description:
    "Muestra de reservas online para Escauriza Parrilla Restaurante, en La Florida, Rosario.",
  robots: { index: false, follow: false, nocache: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${caslon.variable} ${sourceSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
