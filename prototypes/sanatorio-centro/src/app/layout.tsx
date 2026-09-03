import type { Metadata } from "next";
import "./globals.css";

const baseMetadata: Metadata = {
  title: "Grupo Centro | Orientación de sedes",
  description: "Concepto de Nivaror para orientar por sede y solicitar atención en Grupo Centro.",
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
    title: "Grupo Centro | Orientación de sedes",
    description: "Concepto de Nivaror para orientar por sede y solicitar atención.",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Sala de espera de una clínica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grupo Centro | Orientación de sedes",
    description: "Concepto de Nivaror para orientar por sede y solicitar atención.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR">
      <body>{children}</body>
    </html>
  );
}
