import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Automated Brands | Big Ideas. Built.",
  description:
    "Automated Brands builds ambitious software, AI systems, and products for businesses with ideas bigger than their current tools.",
  metadataBase: new URL("https://automatedbrands.com"),
  openGraph: {
    title: "Automated Brands | Big Ideas. Built.",
    description: "You know that thing you wish existed? We build it.",
    url: "https://automatedbrands.com",
    siteName: "Automated Brands",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
