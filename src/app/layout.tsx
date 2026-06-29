import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { PublicLayout } from "@/components/PublicLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RIA Consulting — Automatización Comercial & CRM",
    template: "%s | RIA Consulting",
  },
  description:
    "Diseño sistemas de captación, cualificación y cierre de leads para negocios que quieren vender más sin trabajar más. Especialista en Go High Level, automatización de WhatsApp y propuestas automáticas.",
  keywords: [
    "automatización comercial",
    "crm gohighlevel",
    "lead qualification system",
    "propuestas automáticas",
    "automatización whatsapp",
    "funnel captación leads",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: "en_US",
    siteName: "RIA Consulting — Automatización Comercial",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}
