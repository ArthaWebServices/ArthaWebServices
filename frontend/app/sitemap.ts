import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { posts } from "@/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...blogRoutes,
  ];
}