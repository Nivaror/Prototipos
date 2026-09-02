import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const baseMetadata: Metadata = {
  title: "Euro Gym RED — Muestra Nivaror",
  description:
    "Horarios claros y clase de prueba sin pasar por Instagram. Muestra hecha por Nivaror para Euro Gym RED, La Florida, Rosario.",
  robots: { index: false, follow: false },
};

// URL absoluta de producción, inyectada por Vercel en build y runtime.
const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

// Sin `og:url` a propósito (ver core/prototype-workflow.md): así la key de
// cacheo de Meta es la URL tal cual se comparte, y un `?v=2` fuerza un
// re-scrape sin depender del Sharing Debugger de Facebook.
export const metadata: Metadata = {
  ...baseMetadata,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Euro Gym RED",
    title: baseMetadata.title as string,
    description: baseMetadata.description as string,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Euro Gym RED — muestra Nivaror" }],
  },
  twitter: {
    card: "summary_large_image",
    title: baseMetadata.title as string,
    description: baseMetadata.description as string,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${hanken.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
