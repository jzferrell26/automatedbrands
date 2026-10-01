import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/partners", "/partners/distribution", "/partners/opportunities", "/build-with-us"].map(path => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path === "/build-with-us" ? 0.5 : 0.8,
  }));
}
