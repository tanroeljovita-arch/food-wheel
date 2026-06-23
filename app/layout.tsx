import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Food Wheel - Random Restaurant Picker",
  description:
    "Food Wheel helps users randomly pick restaurants or food options near them using manual entries and real Google Places results.",
  verification: {
    google: "nE9HTJd9NCXYrOOGxxn0Es3N6kHIPIF4K6czDEyJ48w",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          async
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3662977483641600"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
