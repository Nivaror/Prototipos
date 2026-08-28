import type { Metadata } from "next";
import { League_Spartan, Karla } from "next/font/google";
import "./globals.css";

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AF Gimnasio | Demo Nivaror",
  description:
    "Demo de sitio para AF Gimnasio, gimnasio en Alberdi, Rosario. Creado por Nivaror, no es el sitio oficial.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${leagueSpartan.variable} ${karla.variable}`}>
      <body>{children}</body>
    </html>
  );
}
