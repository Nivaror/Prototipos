import type { Metadata } from "next";
import { Archivo, Work_Sans } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const workSans = Work_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Qualis Gym — Rosario",
  description:
    "Qualis Gym en Sarmiento, Rosario. 4,9 estrellas en Google, abierto de lunes a viernes de 7 a 21.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${archivo.variable} ${workSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
