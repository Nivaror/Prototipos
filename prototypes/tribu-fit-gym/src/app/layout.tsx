import type { Metadata } from "next";
import "./globals.css";

const description = "Conocé TRIBU FIT, sus horarios y el próximo paso para empezar a entrenar en Rosario.";

const baseMetadata: Metadata = {
  title: "TRIBU FIT GYM | Rosario",
  description,
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
    siteName: "TRIBU FIT GYM",
    title: "TRIBU FIT GYM | Rosario",
    description,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "TRIBU FIT GYM en Rosario. Muestra de Nivaror.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TRIBU FIT GYM | Rosario",
    description,
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
