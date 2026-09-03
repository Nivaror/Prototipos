import type { Metadata } from "next";
import "./globals.css";

const baseMetadata: Metadata = {
  title: "Posta Almafuerte | Rosario",
  description: "Carta, horarios y visita a Posta Almafuerte en Rosario.",
  robots: {
    index: false,
    follow: false,
  },
};

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  ...baseMetadata,
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Posta Almafuerte",
    title: "Posta Almafuerte | Rosario",
    description: "Carta, horarios y visita a Posta Almafuerte en Rosario.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Posta Almafuerte en Rosario" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Posta Almafuerte | Rosario",
    description: "Carta, horarios y visita a Posta Almafuerte en Rosario.",
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
