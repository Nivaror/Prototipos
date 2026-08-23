import type { Metadata } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gimnasio Dein-Ziel — Rosario",
  description:
    "Gimnasio en Las Malvinas, Rosario. Horarios, accesibilidad completa y clase de prueba sin costo.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${bebas.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
