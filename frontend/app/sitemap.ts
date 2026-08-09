import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// App Router sitemap route. next-sitemap (postbuild) also generates one from config;
// this route keeps it equally available in dev and via the /sitemap.xml path.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}