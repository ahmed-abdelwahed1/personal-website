import type { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/lib/blog";

export const dynamic = "force-static";

const SITE_URL = "https://ahmedabdelwahed.me";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getAllPostSlugs();

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogEntries,
  ];
}
