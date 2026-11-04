import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { getAllPosts } from "@/lib/blog";
import { PERSON_ID, WEBSITE_ID } from "@/components/JsonLd";
import type { Metadata } from "next";

const SITE_URL = "https://ahmedabdelwahed.me";

export const metadata: Metadata = {
  title: "Blog — Data Engineering, Python & ETL Tutorials",
  description:
    "Technical blog by Ahmed Shehata Said Abdelwahed (Ahmed Abdelwahed) — articles on data engineering, Python, SQL optimization, ETL pipelines, and building practical software.",
  alternates: {
    canonical: `${SITE_URL}/blog/`,
  },
  openGraph: {
    title: "Blog | Ahmed Abdelwahed — Data Engineer",
    description:
      "Articles by Ahmed Shehata Said Abdelwahed (Ahmed Abdelwahed) on data engineering, Python, ETL pipelines, and building software.",
    url: `${SITE_URL}/blog/`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1600,
        height: 800,
        alt: "Ahmed Abdelwahed — Data Engineering Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Ahmed Abdelwahed — Data Engineer",
    description:
      "Articles by Ahmed Shehata Said Abdelwahed (Ahmed Abdelwahed) on data engineering, Python, ETL pipelines, and building software.",
    creator: "@BinShehata",
    images: [`${SITE_URL}/og-image.png`],
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

  const blogCollectionSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/blog/#webpage`,
        url: `${SITE_URL}/blog/`,
        name: "Blog — Ahmed Abdelwahed",
        description:
          "Technical blog by Ahmed Shehata Said Abdelwahed (Ahmed Abdelwahed) covering data engineering, Python, ETL pipelines, and software development.",
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": PERSON_ID },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/blog/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Ahmed Abdelwahed",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${SITE_URL}/blog/`,
          },
        ],
      },
    ],
  };

  return (
    <div className="blog-listing">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogCollectionSchema).replace(/</g, "\\u003c"),
        }}
      />
      <nav className="blog-listing-nav" aria-label="Breadcrumb">
        <Link href="/" className="blog-post-back">
          <FaArrowLeft /> Back to home
        </Link>
      </nav>

      <header className="blog-listing-header">
        <h1 className="blog-listing-title">Blog</h1>
        <p className="blog-listing-subtitle">
          Articles by Ahmed Abdelwahed on data engineering, Python, ETL pipelines, and building software.
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
              href={`/blog/${post.slug}/`}
              className="blog-listing-card-link"
            >
              <article className="card blog-card">
                {post.coverImage && (
                  <div className="blog-card-cover">
                    <Image
                      src={post.coverImage}
                      alt={`${post.title} — Technical article by Ahmed Abdelwahed`}
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
