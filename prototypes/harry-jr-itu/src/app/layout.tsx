import type { Metadata } from "next";
import { Bebas_Neue, Instrument_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harry Jr. — Pizzería en Ituzaingó",
  description:
    "Harry Jr., pizzería en Ituzaingó, Corrientes. Delivery, para llevar y mesas al aire libre, todos los días de 18:30 a 00:30.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${bebasNeue.variable} ${instrumentSans.variable} ${spaceMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
