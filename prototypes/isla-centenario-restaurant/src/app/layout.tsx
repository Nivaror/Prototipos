import type { Metadata } from "next";
import { IBM_Plex_Mono, Lora, Public_Sans } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const baseMetadata: Metadata = {
  title: "Isla Centenario Restaurant — Tigre",
  description:
    "Restaurante familiar en Isla Centenario, Tigre. Abierto de miércoles a domingo de 11 a 18. Cómo llegar, horarios y reserva de mesa en un solo lugar.",
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
      className={`${publicSans.variable} ${lora.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
