import type { Metadata } from "next";
import { Oswald, Sora } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Burger House Grill — muestra Nivaror",
  description: "Muestra de pedidos online para Burger House Grill, hamburguesería en Alberdi, Rosario.",
  robots: { index: false, follow: false, nocache: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${oswald.variable} ${sora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
