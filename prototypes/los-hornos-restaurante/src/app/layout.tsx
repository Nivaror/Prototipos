import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope, Zilla_Slab } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const zilla = Zilla_Slab({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Los Hornos Restaurante — Ituzaingó",
  description:
    "Restaurante con chimenea en Francisco López 1525, Ituzaingó, Corrientes. Abierto los siete días, mediodía y noche. Reserva de mesa online y delivery.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} ${zilla.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
