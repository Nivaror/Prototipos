import type { Metadata } from "next";
import "./globals.css";

const baseMetadata: Metadata = {
  title: "Mix Frutal Autoservicio | Descubrí y consultá",
  description: "Una muestra simple para descubrir frutas, fiambres, almacén y pastas de Mix Frutal Autoservicio.",
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
    siteName: "Mix Frutal Autoservicio",
    title: baseMetadata.title as string,
    description: baseMetadata.description as string,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Mix Frutal Autoservicio. Muestra hecha por Nivaror.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: baseMetadata.title as string,
    description: baseMetadata.description as string,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
