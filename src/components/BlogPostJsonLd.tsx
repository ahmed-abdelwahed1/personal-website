import { PERSON_ID, WEBSITE_ID } from "./JsonLd";

interface BlogPostJsonLdProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  tags?: string[];
  coverImage?: string;
  readingTime: number;
}

const SITE_URL = "https://ahmedabdelwahed.me";

export default function BlogPostJsonLd({
  title,
  excerpt,
  date,
  slug,
  tags,
  coverImage,
  readingTime,
}: BlogPostJsonLdProps) {
  const postUrl = `${SITE_URL}/blog/${slug}/`;
  const absoluteImageUrl = coverImage
    ? coverImage.startsWith("http")
      ? coverImage
      : `${SITE_URL}${coverImage}`
    : `${SITE_URL}/og-image.png`;

  const graphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        headline: title,
        description: excerpt,
        datePublished: date,
        dateModified: date,
        url: postUrl,
        inLanguage: "en",
        isPartOf: {
          "@id": WEBSITE_ID,
        },
        author: {
          "@id": PERSON_ID,
          name: "Ahmed Shehata Said Abdelwahed",
          url: `${SITE_URL}/`,
        },
        publisher: {
          "@id": PERSON_ID,
          name: "Ahmed Shehata Said Abdelwahed",
          url: `${SITE_URL}/`,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": postUrl,
        },
        wordCount: readingTime * 230,
        timeRequired: `PT${readingTime}M`,
        image: {
          "@type": "ImageObject",
          url: absoluteImageUrl,
        },
        ...(tags &&
          tags.length > 0 && {
            keywords: tags.join(", "),
          }),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${postUrl}#breadcrumb`,
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
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: postUrl,
          },
        ],
      },
    ],
  };

  const safeJson = JSON.stringify(graphSchema).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson }}
    />
  );
}
