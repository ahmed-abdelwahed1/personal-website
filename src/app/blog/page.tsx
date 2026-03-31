import Link from "next/link";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Blog by Ahmed Shehata Said Abdelwahed — thoughts on data engineering, Python, ETL pipelines, and building software.",
  alternates: {
    canonical: "https://ahmedabdelwahed.me/blog/",
  },
  openGraph: {
    title: "Blog — Ahmed Shehata Said Abdelwahed",
    description:
      "Thoughts on data engineering, Python, ETL pipelines, and building software.",
    url: "https://ahmedabdelwahed.me/blog/",
    type: "website",
  },
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="blog-listing">
      <nav className="blog-listing-nav">
        <Link href="/" className="blog-post-back">
          <FaArrowLeft /> Back to home
        </Link>
      </nav>

      <header className="blog-listing-header">
        <h1 className="blog-listing-title">Blog</h1>
        <p className="blog-listing-subtitle">
          Thoughts on data engineering, Python, and building software.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="blog-empty">
          <p>No posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="blog-listing-grid">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-listing-card-link"
            >
              <article className="card blog-card">
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span className="blog-card-meta-sep">·</span>
                    <span>{post.readingTime} min read</span>
                  </div>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="blog-card-tags">
                      {post.tags.map((tag) => (
                        <span key={tag} className="blog-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="blog-read-link">
                  Read article <FaArrowRight />
                </span>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
