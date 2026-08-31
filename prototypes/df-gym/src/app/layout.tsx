import type { Metadata } from "next";
import { Bricolage_Grotesque, Onest } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Onest({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const baseMetadata: Metadata = {
  title: "DF-Centro de entrenamiento | Demo Nivaror",
  description:
    "Muestra de sitio para DF-Centro de entrenamiento (Distrito Fuerza), gimnasio en Rosario. Demo creada por Nivaror, no es el sitio oficial del negocio.",
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
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: baseMetadata.title as string },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: baseMetadata.title as string,
    description: baseMetadata.description as string,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
