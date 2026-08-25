import type { Metadata } from "next";
import { Rajdhani, Barlow } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const barlow = Barlow({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Lobo Team Kickboxing — muestra Nivaror",
  description:
    "Muestra de sitio para Lobo Team, escuela de kickboxing en Rosario. Demo de Nivaror, no es el sitio oficial del negocio.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${rajdhani.variable} ${barlow.variable}`}>
      <body>{children}</body>
    </html>
  );
}
