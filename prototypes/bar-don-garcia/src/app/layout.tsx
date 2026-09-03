import type { Metadata } from "next";
import "./globals.css";

const baseMetadata: Metadata = {
  title: "Don García | Rosario",
  description: "Una guía clara para ubicar la sede de Don García en Rosario y consultar antes de ir.",
  robots: {
    index: false,
    follow: false,
  },
};

const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

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
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Don García, muestra de Nivaror",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: baseMetadata.title as string,
    description: baseMetadata.description as string,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
