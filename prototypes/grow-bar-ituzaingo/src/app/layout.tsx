import type { Metadata } from "next";
import { Anton, Hanken_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const anton = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Grow Bar, la cartelera de la semana en Ituzaingó",
  description:
    "Qué hay esta noche en Grow Bar, Ituzaingó: karaoke, música en vivo, deportes y bar con juegos, con horarios de cada noche y reserva de mesa.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${hanken.variable} ${anton.variable} ${spaceMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
