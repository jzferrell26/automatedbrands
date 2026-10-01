import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteDescription, siteUrl } from "@/lib/site";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Automated Brands | Big Ideas. Built.", template: "%s | Automated Brands" },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Automated Brands | Big Ideas. Built.",
    description: siteDescription,
    url: siteUrl,
    siteName: "Automated Brands",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Automated Brands | Big Ideas. Built.", description: siteDescription },
  applicationName: "Automated Brands",
  robots: { index: true, follow: true },
  other: { "build-revision": process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || "local" },
};

export const viewport: Viewport = { themeColor: "#090c10", colorScheme: "dark light" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Navigation />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
