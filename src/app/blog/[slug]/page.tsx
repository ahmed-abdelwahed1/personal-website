import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReadingProgress from "@/components/ReadingProgress";
import BlogPostJsonLd from "@/components/BlogPostJsonLd";
import BlogPostTracker from "@/components/BlogPostTracker";

type Params = Promise<{ slug: string }>;

const SITE_URL = "https://ahmedabdelwahed.me";

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const postUrl = `${SITE_URL}/blog/${slug}/`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: `${post.title} — Ahmed Abdelwahed`,
      description: post.excerpt,
      url: postUrl,
      type: "article",
      publishedTime: post.date,
      authors: ["Ahmed Shehata Said Abdelwahed"],
      tags: post.tags,
      ...(post.coverImage && {
        images: [{ url: post.coverImage, alt: post.title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <ReadingProgress />
      <BlogPostJsonLd
        title={post.title}
        excerpt={post.excerpt}
        date={post.date}
        slug={slug}
        tags={post.tags}
        coverImage={post.coverImage}
        readingTime={post.readingTime}
      />
      <BlogPostTracker title={post.title} slug={slug} />
      <article className="blog-post">
        <nav className="blog-post-nav">
          <Link href="/blog" className="blog-post-back">
            <FaArrowLeft /> Back to blog
          </Link>
        </nav>

        <header className="blog-post-header">
          <div className="blog-post-meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="blog-post-meta-sep">·</span>
            <span>{post.readingTime} min read</span>
          </div>
          <h1 className="blog-post-title">{post.title}</h1>
          {post.tags && post.tags.length > 0 && (
            <div className="blog-post-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="blog-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {post.coverImage && (
          <div className="blog-post-cover">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={680}
              height={383}
              priority
              className="blog-post-cover-img"
            />
          </div>
        )}

        <div className="blog-post-divider" />

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <footer className="blog-post-footer">
          <div className="blog-post-divider" />
          <Link href="/blog" className="blog-post-back">
            <FaArrowLeft /> All posts
          </Link>
        </footer>
      </article>
    </>
  );
}
