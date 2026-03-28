import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Ahmed Abdelwahed",
  description:
    "Thoughts on data engineering, Python, ETL pipelines, and building software.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="blog-listing">
      <Link href="/" className="blog-post-back">
        ← Back to home
      </Link>
      <h1 className="blog-listing-title">Blog</h1>

      {posts.length === 0 && (
        <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-body)" }}>
          No posts yet. Check back soon!
        </p>
      )}

      <div className="blog-listing-grid">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{ display: "block" }}
          >
            <div className="card blog-card">
              <div>
                <p className="blog-card-date">{post.date}</p>
                <h2 className="blog-card-title">{post.title}</h2>
                <p className="blog-card-excerpt">{post.excerpt}</p>
              </div>
              <span className="blog-read-link">
                Read <FaArrowRight />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
