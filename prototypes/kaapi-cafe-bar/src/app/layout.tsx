import type { Metadata } from "next";
import { Schibsted_Grotesk, Figtree } from "next/font/google";
import "./globals.css";

const display = Schibsted_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
});

const baseMetadata: Metadata = {
  title: "KAAPI - Café Bar | Demo",
  description:
    "Muestra de página para KAAPI - Café Bar, Rosario. Demo de Nivaror, no es el sitio oficial del negocio.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
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
// Deliberadamente SIN `og:url`. Meta cachea la tarjeta por URL canónica, y si
// hay `og:url` esa es la clave: todas las variantes de la misma página colapsan
// en el mismo objeto cacheado. Sin `og:url` la clave pasa a ser la URL tal cual
// se compartió, así que agregarle `?v=2` fuerza un scrape nuevo sin necesidad
// del Sharing Debugger de Facebook. Ver insights/canales-de-outreach.md.
export const metadata: Metadata = {
  ...baseMetadata,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: baseMetadata.title as string,
    title: baseMetadata.title as string,
    description: baseMetadata.description as string,
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
