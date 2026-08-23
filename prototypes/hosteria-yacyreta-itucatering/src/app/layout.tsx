import type { Metadata } from "next";
import { Outfit, Sora } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sora = Sora({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Hostería Yacyretá — restaurante y catering en Ituzaingó",
  description:
    "Restaurante y servicio de catering en Ituzaingó, Corrientes. Horarios, salón y consulta de eventos en un solo lugar.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${outfit.variable} ${sora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
