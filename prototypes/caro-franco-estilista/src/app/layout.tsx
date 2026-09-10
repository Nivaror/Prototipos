import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const display = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const baseMetadata: Metadata = {
  title: "Caro Franco Estilista | Turnos online",
  description:
    "Reservá tu turno en Caro Franco Estilista: color, corte, peinados y maquillaje en Rosario. Elegí el servicio, la profesional y el horario.",
  robots: { index: false, follow: false },
};

const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

// Sin og:url a proposito: ver core/prototype-workflow.md. La clave de cache de
// Meta pasa a ser la URL tal cual se comparte, asi `?v=2` fuerza scrape nuevo.
export const metadata: Metadata = {
  ...baseMetadata,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Caro Franco Estilista",
    title: baseMetadata.title as string,
    description: baseMetadata.description as string,
  },
  twitter: {
    card: "summary_large_image",
    title: baseMetadata.title as string,
    description: baseMetadata.description as string,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={display.variable}>
      <body>{children}</body>
    </html>
  );
}
