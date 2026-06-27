import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

// Static imports — bundled at build time, compatible with Cloudflare Workers
import howToEmailRaw from "@content/blog/how-to-create-a-free-professional-email-with-improvmx-and-gmail.md";
import improveRuffRaw from "@content/blog/improve-python-code-quality-with-ruff.md";

const blogFiles: Record<string, string> = {
  "how-to-create-a-free-professional-email-with-improvmx-and-gmail": howToEmailRaw,
  "improve-python-code-quality-with-ruff": improveRuffRaw,
};

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 230));
}

function normalizeDateToIsoString(date: unknown): string {
  if (!date) return "";
  if (typeof date === "string") return date;
  if (date instanceof Date) return date.toISOString().split("T")[0];
  if (typeof date === "number") return new Date(date).toISOString().split("T")[0];
  return String(date);
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  tags?: string[];
  readingTime: number;
}

export interface BlogPost extends BlogPostMeta {
  contentHtml: string;
}

export function getAllPosts(): BlogPostMeta[] {
  return Object.entries(blogFiles)
    .map(([slug, raw]) => {
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title || "Untitled",
        date: normalizeDateToIsoString(data.date),
        excerpt: data.excerpt || "",
        coverImage: data.coverImage || "",
        tags: data.tags || [],
        readingTime: estimateReadingTime(content),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const raw = blogFiles[slug];
  if (!raw) return null;

  try {
    const { data, content } = matter(raw);

    const processedContent = await remark()
      .use(remarkGfm)
      .use(html, { sanitize: true })
      .process(content);

    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title || "Untitled",
      date: normalizeDateToIsoString(data.date),
      excerpt: data.excerpt || "",
      coverImage: data.coverImage || "",
      tags: data.tags || [],
      readingTime: estimateReadingTime(content),
      contentHtml,
    };
  } catch {
    return null;
  }
}

export function getAllPostSlugs(): string[] {
  return Object.keys(blogFiles);
}
