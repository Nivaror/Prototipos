import type { Metadata } from "next";
import "./globals.css";

const baseMetadata: Metadata = {
  title: "Melisa Vitelli | Estudio Pilates",
  description: "Consultá horarios y encontrá tu primer paso en el estudio de Pilates de Melisa Vitelli, en Alberdi, Rosario.",
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
    siteName: "Melisa Vitelli | Estudio Pilates",
    title: "Melisa Vitelli | Estudio Pilates",
    description: baseMetadata.description as string,
  },
  twitter: {
    card: "summary_large_image",
    title: "Melisa Vitelli | Estudio Pilates",
    description: baseMetadata.description as string,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
