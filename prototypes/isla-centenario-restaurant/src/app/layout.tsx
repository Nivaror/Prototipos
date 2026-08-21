import type { Metadata } from "next";
import { IBM_Plex_Mono, Lora, Public_Sans } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Isla Centenario Restaurant — Tigre",
  description:
    "Restaurante familiar en Isla Centenario, Tigre. Abierto de miércoles a domingo de 11 a 18. Cómo llegar, horarios y reserva de mesa en un solo lugar.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${publicSans.variable} ${lora.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
