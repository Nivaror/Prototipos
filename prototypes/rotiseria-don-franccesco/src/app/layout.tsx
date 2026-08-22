import type { Metadata } from "next";
import { Anton, IBM_Plex_Mono, Barlow } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const anton = Anton({
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
  title: "Don Franccesco — hamburguesas, delivery y retiro",
  description:
    "Food truck de hamburguesas en Paso de la Patria, Corrientes. Delivery y retiro, mediodía y noche hasta las 00:30. Pedí con horario reservado.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${barlow.variable} ${anton.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
