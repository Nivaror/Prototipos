import type { Metadata } from "next";
import { Familjen_Grotesk, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const familjen = Familjen_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const instrument = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-board",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "El Banquete - muestra Nivaror",
  description:
    "Muestra de horarios y pedido para El Banquete, pizzería de barrio en Rosario.",
  robots: { index: false, follow: false, nocache: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${familjen.variable} ${instrument.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
