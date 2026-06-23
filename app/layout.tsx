import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Food Wheel - Random Restaurant Picker",
  description:
    "Food Wheel helps users randomly pick restaurants or food options near them using manual entries and real Google Places results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
