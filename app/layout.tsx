import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Food Wheel — Random Restaurant Picker",
  description:
    "Can't decide what to eat? Search real nearby restaurants from Google Places, edit your list, and spin the wheel to choose.",
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
