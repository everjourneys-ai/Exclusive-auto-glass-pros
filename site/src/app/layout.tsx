import "@fontsource-variable/inter";
import "@fontsource/archivo/700.css";
import "@fontsource/archivo/800.css";
import "./globals.css";

import type { Metadata, Viewport } from "next";
import Script from "next/script";

import { ConversionTracker } from "@/components/ConversionTracker";
import { business } from "@/lib/business";

const description = `Windshield chip repair, windshield replacement and side & rear window replacement in Westlake Village and Thousand Oaks. Same-day appointments, insurance claims handled. Call ${business.phone.display}.`;

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: {
    default: `${business.name} — Windshield Repair & Replacement, Westlake Village & Thousand Oaks`,
    template: `%s | ${business.name}`,
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: business.url,
    siteName: business.name,
    title: `${business.name} — Same-day windshield repair`,
    description,
    locale: "en_US",
  },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1F33",
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {GTM_ID && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
        <ConversionTracker />
        {children}
      </body>
    </html>
  );
}
