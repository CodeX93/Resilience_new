import type { Metadata } from "next";
import {
  Lancelot,
  Inria_Serif,
  Josefin_Slab,
  Instrument_Sans,
} from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Headings
const lancelot = Lancelot({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lancelot",
  display: "swap",
});

// Body copy
const inriaSerif = Inria_Serif({
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-inria-serif",
  display: "swap",
});

// Quotes
const josefinSlab = Josefin_Slab({
  subsets: ["latin"],
  variable: "--font-josefin-slab",
  display: "swap",
});

// UI / sans (buttons, navigation, controls)
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Therapy that respects your journey`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: siteConfig.url,
  },
  twitter: { card: "summary_large_image", site: siteConfig.twitter },
};

import { CmsProvider } from "@/components/cms/CmsProvider";
import { CmsActionBar } from "@/components/cms/CmsActionBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lancelot.variable} ${inriaSerif.variable} ${josefinSlab.variable} ${instrumentSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <CmsProvider>
          <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CmsActionBar />
        </CmsProvider>
      </body>
    </html>
  );
}
