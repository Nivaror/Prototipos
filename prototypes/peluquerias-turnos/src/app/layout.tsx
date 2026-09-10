import type { Metadata } from "next";
import "./globals.css";

const baseMetadata: Metadata = {
  title: "Agenda+ | Turnos para peluquerías y barberías",
  description: "Demo de agenda por peluquero para negocios de belleza. Prototipo de Nivaror, no es un sitio oficial.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000";

export const metadata: Metadata = {
  ...baseMetadata,
  metadataBase: new URL(SITE_URL),
  openGraph: { type: "website", locale: "es_AR", siteName: "Agenda+", title: baseMetadata.title as string, description: baseMetadata.description as string },
  twitter: { card: "summary_large_image", title: baseMetadata.title as string, description: baseMetadata.description as string },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
