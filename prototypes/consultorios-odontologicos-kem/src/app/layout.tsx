import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const baseMetadata: Metadata = {
  title: "Consultorios Odontológicos KEM, Rosario",
  description:
    "Consultorio odontológico en San Juan 3943, Rosario. Turnos online, precios y obra social claros desde el principio.",
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
    <html
      lang="es"
      className={`${inter.variable} ${fraunces.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
