import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Reservá tu turno | Rebecca Beauty & Nail Bar Fisherton",
  description:
    "Demo de reserva online para Rebecca Beauty & Nail Bar, sucursal Fisherton, Rosario. Prototipo de Nivaror, no es el sitio oficial del salón.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${bricolage.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
