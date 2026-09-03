import type { Metadata } from "next";
import "./globals.css";

const title = "RefineriaYoga | Horario semanal abierto";
const description = "Una muestra de agenda semanal para consultar clases sin iniciar sesión en Instagram.";
const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(SITE_URL),
  openGraph: { type: "website", locale: "es_AR", siteName: title, title, description },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
