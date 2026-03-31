"use client";

import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import AnimatedSection from "./AnimatedSection";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  readingTime: number;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogSection({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="section" id="blog">
      <div className="container">
        <AnimatedSection variant="fade">
          <div className="section-header">
            <h2 className="section-title">Blog</h2>
            <Link href="/blog" className="btn btn-primary btn-sm">
              View all posts
            </Link>
          </div>
        </AnimatedSection>

        <div className="blog-grid">
          {posts.map((post, index) => (
            <AnimatedSection
              key={post.slug}
              delay={index * 0.1}
              variant="scale"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="blog-listing-card-link"
              >
                <article className="card blog-card">
                  {post.coverImage && (
                    <div className="blog-card-cover">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        width={600}
                        height={340}
                        className="blog-card-cover-img"
                      />
                    </div>
                  )}
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span className="blog-card-meta-sep">·</span>
                      <span>{post.readingTime} min read</span>
                    </div>
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                  </div>
                  <span className="blog-read-link">
                    Read <FaArrowRight />
                  </span>
                </article>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
