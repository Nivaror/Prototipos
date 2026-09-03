import type { Metadata } from "next";
import "./globals.css";

const baseMetadata: Metadata = {
  title: "Restaurant Refinería | Agenda de experiencias",
  description: "Una agenda propia para descubrir eventos y pedir lugar en Restaurant Refinería.",
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
    siteName: "Restaurant Refinería",
    title: baseMetadata.title as string,
    description: baseMetadata.description as string,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Plato servido en Restaurant Refinería",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
