import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["italic", "normal"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "RIO — resto bar en Ituzaingó",
  description:
    "Resto bar con terraza en San Martín 1534, Ituzaingó, Corrientes. Horarios de cada día a la vista y reserva de mesa online.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${dmSans.variable} ${playfair.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
