import type { Metadata } from "next";
import { Baloo_2, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nuit Helado Artesanal - muestra Nivaror",
  description:
    "Muestra de pedido online para Nuit Helado Artesanal, creada por Nivaror. No es el sitio oficial del local.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${baloo.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
