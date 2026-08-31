import type { Metadata } from "next";
import { Archivo, Work_Sans } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const workSans = Work_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const baseMetadata: Metadata = {
  title: "Qualis Gym — Rosario",
  description:
    "Qualis Gym en Sarmiento, Rosario. 4,9 estrellas en Google, abierto de lunes a viernes de 7 a 21.",
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
export const metadata: Metadata = {
  ...baseMetadata,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
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
    <html lang="es" className={`${archivo.variable} ${workSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
