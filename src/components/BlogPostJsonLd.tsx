interface BlogPostJsonLdProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  tags?: string[];
  coverImage?: string;
  readingTime: number;
}

export default function BlogPostJsonLd({
  title,
  excerpt,
  date,
  slug,
  tags,
  coverImage,
  readingTime,
}: BlogPostJsonLdProps) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    datePublished: date,
    dateModified: date,
    url: `https://ahmedabdelwahed.me/blog/${slug}/`,
    author: {
      "@type": "Person",
      name: "Ahmed Shehata Said Abdelwahed",
      url: "https://ahmedabdelwahed.me",
    },
    publisher: {
      "@type": "Person",
      name: "Ahmed Shehata Said Abdelwahed",
      url: "https://ahmedabdelwahed.me",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ahmedabdelwahed.me/blog/${slug}/`,
    },
    wordCount: readingTime * 230,
    timeRequired: `PT${readingTime}M`,
    ...(coverImage && { image: coverImage }),
    ...(tags &&
      tags.length > 0 && {
      keywords: tags.join(", "),
    }),
  };

  const safeJson = JSON.stringify(articleSchema).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson }}
    />
  );
}
