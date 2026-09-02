import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Barlow_Condensed({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700"] });
const body = DM_Sans({ variable: "--font-body", subsets: ["latin"] });
const mono = DM_Sans({ variable: "--font-mono", subsets: ["latin"], weight: ["500", "700"] });

const baseMetadata: Metadata = {
  title: "Bruno Correa GYM | Gimnasio en Rosario",
  description: "Una propuesta de presencia propia para Bruno Correa GYM, con horarios claros y consulta para empezar.",
  robots: { index: false, follow: false },
};

const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000";

export const metadata: Metadata = {
  ...baseMetadata,
  metadataBase: new URL(SITE_URL),
  openGraph: { type: "website", locale: "es_AR", siteName: baseMetadata.title as string, title: baseMetadata.title as string, description: baseMetadata.description as string },
  twitter: { card: "summary_large_image", title: baseMetadata.title as string, description: baseMetadata.description as string },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="es" className={`${display.variable} ${body.variable} ${mono.variable}`}><body>{children}</body></html>;
}
