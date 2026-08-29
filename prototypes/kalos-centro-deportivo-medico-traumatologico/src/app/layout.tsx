import type { Metadata } from "next";
import { Barlow_Condensed, Work_Sans } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const workSans = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "KALOS Centro Deportivo Médico Traumatológico | Demo",
  description:
    "Muestra de página para KALOS Centro Deportivo Médico Traumatológico, hecha por Nivaror. No es el sitio oficial del centro.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${barlowCondensed.variable} ${workSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
