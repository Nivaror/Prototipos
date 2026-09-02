import type { Metadata } from "next";
import { Instrument_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const baseMetadata: Metadata = {
  title: "Summum Gym - Muestra Nivaror",
  description:
    "Un horario confirmado, sin dudar entre Instagram y Google Maps. Muestra hecha por Nivaror para Summum Gym, La Florida, Rosario.",
  robots: { index: false, follow: false },
};

// URL absoluta de producción. Vercel la inyecta en build y en runtime, así no
// hay que hardcodear el dominio de cada prototipo (ver el gotcha de slugs
// truncados en core/prototype-workflow.md).
const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

// Open Graph: sin esto WhatsApp/Instagram no arman la tarjeta de preview, y en
// Android el link llega como texto plano que no se puede tocar.
//
// Deliberadamente SIN `og:url` (ver core/prototype-workflow.md): así la key de
// cacheo de Meta es la URL tal cual se comparte, y un `?v=2` fuerza un scrape
// nuevo sin depender del Sharing Debugger de Facebook.
export const metadata: Metadata = {
  ...baseMetadata,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Summum Gym",
    title: baseMetadata.title as string,
    description: baseMetadata.description as string,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Summum Gym, muestra Nivaror" }],
  },
  twitter: {
    card: "summary_large_image",
    title: baseMetadata.title as string,
    description: baseMetadata.description as string,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${instrumentSans.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
