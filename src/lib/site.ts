import type { Metadata } from "next";

/** Change only when the custom primary domain is connected. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://automatedbrands.vercel.app").replace(/\/$/, "");
export const siteDescription = "Automated Brands turns better ways of working into businesses. The parent company behind AutomatedRE and AutomatedLO, with a wider ambition for what comes next.";
/** Existing verified contact; do not invent an unconfigured company mailbox. */
export const contactEmail = "jonathan@jonathanferrell.com";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = path === "/" ? title : `${title} | Automated Brands`;
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: `${siteUrl}${path === "/" ? "" : path}`, siteName: "Automated Brands", type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Automated Brands. Big ideas. Built." }] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/opengraph-image"] },
  };
}
