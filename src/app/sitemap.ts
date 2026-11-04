import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

const SITE_URL = "https://ahmedabdelwahed.me";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestPostDate =
    posts.length > 0 && posts[0].date
      ? new Date(posts[0].date)
      : new Date("2026-04-05");

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}/`,
    lastModified: post.date ? new Date(post.date) : latestPostDate,
    changeFrequency: "monthly",
    priority: 0.7,
    ...(post.coverImage && {
      images: [
        post.coverImage.startsWith("http")
          ? post.coverImage
          : `${SITE_URL}${post.coverImage}`,
      ],
    }),
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE_URL}/og-image.png`],
      alternates: {
        languages: {
          en: `${SITE_URL}/`,
          ar: `${SITE_URL}/ar/`,
        },
      },
    },
    {
      url: `${SITE_URL}/ar/`,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [`${SITE_URL}/og-image.png`],
      alternates: {
        languages: {
          en: `${SITE_URL}/`,
          ar: `${SITE_URL}/ar/`,
        },
      },
    },
    {
      url: `${SITE_URL}/blog/`,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogEntries,
  ];
}
