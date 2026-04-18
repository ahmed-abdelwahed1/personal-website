import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import JsonLd from "@/components/JsonLd";
import Analytics from "@/components/Analytics";
import Footer from "@/components/Footer";
import "./globals.css";

const SITE_URL = "https://ahmedabdelwahed.me";
const FULL_NAME = "Ahmed Shehata Said Abdelwahed";
const DISPLAY_NAME = "Ahmed Abdelwahed";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DISPLAY_NAME,
    template: `%s — ${DISPLAY_NAME}`,
  },
  description:
    "Data Engineer who designs systems, builds data pipelines, and turns ideas into working products. Specializing in data engineering, Python, ETL, AI-driven tools, and practical software.",
  keywords: [
    "Ahmed Shehata Said Abdelwahed",
    "Ahmed Abdelwahed",
    "Ahmed Shehata Abdelwahed",
    "Ahmed Said Abdelwahed",
    "Ahmed Shehata",
    "Data Engineer",
    "Data Engineering Portfolio",
    "Python Developer",
    "ETL Developer",
    "Data Pipelines",
    "AI Tools",
    "Software Engineer",
    "Data Engineer Portfolio",
    "ETL Pipelines",
    "Data Architecture",
  ],
  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  publisher: FULL_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: FULL_NAME,
    title: `${FULL_NAME} — Data Engineer`,
    description:
      "Data Engineer who designs systems, builds data pipelines, and turns ideas into working products. Specializing in Python, ETL, and AI-driven tools.",
    images: [
      {
        url: `${SITE_URL}/icon.svg`,
        width: 512,
        height: 512,
        alt: FULL_NAME,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${FULL_NAME} — Data Engineer`,
    description:
      "Data Engineer who designs systems, builds data pipelines, and turns ideas into working products.",
    creator: "@BinShehata",
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          <ThemeToggle />
          {children}
          <Footer />
        </ThemeProvider>
        <JsonLd />
        <Analytics />
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="afterInteractive"
        />
        <Script id="netlify-identity-redirect" strategy="afterInteractive">
          {`
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", function(user) {
                if (!user) {
                  window.netlifyIdentity.on("login", function() {
                    document.location.href = "/admin/";
                  });
                }
              });
            }
          `}
        </Script>
        <Script id="webmcp-tools" strategy="afterInteractive">
          {`
            (function() {
              if (!navigator.modelContext || !navigator.modelContext.registerTool) return;

              navigator.modelContext.registerTool({
                name: "navigate-to-section",
                description: "Scroll to a named section on the portfolio page. Available sections: hero, experience, volunteering, education, projects, github, badges, blog.",
                inputSchema: {
                  type: "object",
                  properties: {
                    section: {
                      type: "string",
                      description: "The section ID to navigate to",
                      enum: ["hero", "experience", "volunteering", "education", "projects", "github", "badges", "blog"]
                    }
                  },
                  required: ["section"]
                },
                execute: function(input) {
                  var sectionMap = {
                    hero: "section-hero",
                    experience: "section-experience",
                    volunteering: "section-volunteering",
                    education: "section-education",
                    projects: "section-projects",
                    github: "section-github",
                    badges: "section-badges",
                    blog: "section-blog"
                  };
                  var id = sectionMap[input.section] || input.section;
                  var el = document.getElementById(id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                    return { success: true, section: input.section };
                  }
                  return { success: false, error: "Section not found: " + input.section };
                }
              });

              navigator.modelContext.registerTool({
                name: "get-contact-info",
                description: "Get the site owner's public contact information including email, social media links, and CV download URL.",
                inputSchema: {
                  type: "object",
                  properties: {},
                  required: []
                },
                execute: function() {
                  var links = {};
                  document.querySelectorAll("a[href]").forEach(function(a) {
                    var href = a.getAttribute("href") || "";
                    if (href.includes("mailto:")) links.email = href.replace("mailto:", "");
                    if (href.includes("linkedin.com")) links.linkedin = href;
                    if (href.includes("github.com")) links.github = href;
                    if (href.includes("x.com") || href.includes("twitter.com")) links.x = href;
                    if (href.includes("medium.com")) links.medium = href;
                    if (href.includes("CV.pdf")) links.cv = href;
                  });
                  links.name = "Ahmed Abdelwahed";
                  links.title = "Data Engineer";
                  return links;
                }
              });

              navigator.modelContext.registerTool({
                name: "list-blog-posts",
                description: "List all visible blog post titles, dates, and links from the current page.",
                inputSchema: {
                  type: "object",
                  properties: {},
                  required: []
                },
                execute: function() {
                  var posts = [];
                  document.querySelectorAll(".blog-card, .blog-listing-card-link").forEach(function(card) {
                    var title = card.querySelector(".blog-card-title");
                    var time = card.querySelector("time");
                    var link = card.closest("a");
                    posts.push({
                      title: title ? title.textContent : "",
                      date: time ? time.getAttribute("datetime") : "",
                      url: link ? link.getAttribute("href") : ""
                    });
                  });
                  return { posts: posts, count: posts.length };
                }
              });
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
