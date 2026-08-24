import type { Metadata } from "next";
import { Manrope, Work_Sans } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Casablanca — Pub Restaurante en La Florida, Rosario",
  description:
    "Muestra digital de Casablanca: horarios, terraza, delivery y reservas por WhatsApp. Creada por Nivaror, no es el sitio oficial del negocio.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${manrope.variable} ${workSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
