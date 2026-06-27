import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://food-wheel-seven.vercel.app";
const siteTitle = "Food Wheel - Random Restaurant Picker";
const siteDescription =
  "Food Wheel helps you randomly pick restaurants or food options near you using manual entries and real Google Places results.";
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Food Wheel",
    alternateName: ["Food Wheel App", "Random Restaurant Picker", "Makan Wheel"],
    url: siteUrl,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Food Wheel",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    url: siteUrl,
    description: siteDescription,
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Food Wheel",
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/icons/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    siteName: "Food Wheel",
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
  verification: {
    google: "nE9HTJd9NCXYrOOGxxn0Es3N6kHIPIF4K6czDEyJ48w",
  },
  other: {
    "google-adsense-account": "ca-pub-3662977483641600",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          async
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3662977483641600"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
