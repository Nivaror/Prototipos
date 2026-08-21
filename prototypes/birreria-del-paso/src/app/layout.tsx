import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Mono, Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bebas = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Birrería Del Paso — cervecería al aire libre",
  description:
    "Cervecería al aire libre en la costanera de Paso de la Patria, Corrientes. De jueves a domingo hasta las 2 de la mañana. Se admiten perros.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${interTight.variable} ${bebas.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
