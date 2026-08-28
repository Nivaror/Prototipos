import type { Metadata } from "next";
import { Unbounded, Sora } from "next/font/google";
import "./globals.css";

const display = Unbounded({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Sora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Fulano Cervecería, muestra Nivaror",
  description:
    "Página de muestra creada por Nivaror para Fulano Cervecería. No es el sitio oficial del bar.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
