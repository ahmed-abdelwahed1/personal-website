import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReadingProgress from "@/components/ReadingProgress";

type Params = Promise<{ slug: string }>;

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

  return {
    title: `${post.title} — Ahmed Abdelwahed`,
    description: post.excerpt,
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
