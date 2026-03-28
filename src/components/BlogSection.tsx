"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import AnimatedSection from "./AnimatedSection";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export default function BlogSection({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="section" id="blog">
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <h2 className="section-title">Blog</h2>
            <Link href="/blog" className="btn btn-primary btn-sm">
              View all posts
            </Link>
          </div>
        </AnimatedSection>

        <div className="blog-grid">
          {posts.map((post, index) => (
            <AnimatedSection key={post.slug} delay={index * 0.15}>
              <Link href={`/blog/${post.slug}`} style={{ display: "block" }}>
                <div className="card blog-card">
                  <div>
                    <p className="blog-card-date">{post.date}</p>
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                  </div>
                  <span className="blog-read-link">
                    Read <FaArrowRight />
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
