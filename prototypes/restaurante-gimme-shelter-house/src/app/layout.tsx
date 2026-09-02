import type { Metadata } from "next";
import { Chivo, Onest } from "next/font/google";
import "./globals.css";

const display = Chivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "900"],
});

const body = Onest({
  variable: "--font-body",
  subsets: ["latin"],
});

const baseMetadata: Metadata = {
  title: "Gimme Shelter House | Reservá tu mesa",
  description:
    "Muestra de Nivaror para Gimme Shelter House: reservá mesa, evento privado o cata sin salir del sitio.",
  robots: {
    index: false,
    follow: false,
  },
};

// URL absoluta de producción. Vercel la inyecta en build y en runtime, así no
// hay que hardcodear el dominio de cada prototipo (ver el gotcha de slugs
// truncados en core/prototype-workflow.md).
const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  ...baseMetadata,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Gimme Shelter House",
    title: baseMetadata.title as string,
    description: baseMetadata.description as string,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Gimme Shelter House, reserva de mesa y eventos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: baseMetadata.title as string,
    description: baseMetadata.description as string,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
