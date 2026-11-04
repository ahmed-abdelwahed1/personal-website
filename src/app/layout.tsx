import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk, IBM_Plex_Sans_Arabic } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import JsonLd from "@/components/JsonLd";
import Analytics from "@/components/Analytics";
import Footer from "@/components/Footer";
import "blobatar/motion.css";
import "blobatar/gaze.css";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-plex-arabic",
});

const SITE_URL = "https://ahmedabdelwahed.me";
const FULL_NAME = "Ahmed Shehata Said Abdelwahed";
const DISPLAY_NAME = "Ahmed Abdelwahed";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${DISPLAY_NAME} | Data Engineer — ${FULL_NAME}`,
    template: `%s — ${DISPLAY_NAME}`,
  },
  description:
    "Official portfolio of Ahmed Shehata Said Abdelwahed (Ahmed Abdelwahed / أحمد شحاتة سعيد عبدالواحد), Data Engineer at Cyan Group and former Data Engineering Intern at Volvo Cars. Specializing in Python, SQL, ETL pipelines, and data architecture.",
  keywords: [
    "Ahmed Abdelwahed",
    "Ahmed Shehata Said Abdelwahed",
    "Ahmed Shehata",
    "Ahmed Said Abdelwahed",
    "Ahmed Shehata Abdelwahed",
    "Ahmed Abdel Wahed",
    "Ahmed Abdelwahid",
    "Data Engineer",
    "Ahmed Abdelwahed Data Engineer",
    "Ahmed Abdelwahed Portfolio",
    "Ahmed Abdelwahed Volvo",
    "أحمد شحاته",
    "أحمد شحاتة",
    "أحمد شحاتة سعيد",
    "أحمد شحاته سعيد عبدالواحد",
    "أحمد شحاتة سعيد عبدالواحد",
    "أحمد عبدالواحد",
    "أحمد عبد الواحد",
    "أحمد شحاتة عبدالواحد",
    "أحمد سعيد عبدالواحد",
    "مهندس بيانات",
    "أحمد عبدالواحد مهندس بيانات",
    "Python Data Engineer",
    "ETL Pipelines",
    "Data Architecture",
  ],
  authors: [{ name: FULL_NAME, url: `${SITE_URL}/` }],
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
    alternateLocale: ["ar_EG"],
    url: `${SITE_URL}/`,
    siteName: DISPLAY_NAME,
    title: `${DISPLAY_NAME} | Data Engineer — ${FULL_NAME}`,
    description:
      "Official portfolio of Ahmed Shehata Said Abdelwahed (Ahmed Abdelwahed), Data Engineer specializing in Python, SQL, ETL pipelines, and data architecture.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1600,
        height: 800,
        alt: `${FULL_NAME} (${DISPLAY_NAME}) — Data Engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${DISPLAY_NAME} | Data Engineer — ${FULL_NAME}`,
    description:
      "Official portfolio of Ahmed Shehata Said Abdelwahed (Ahmed Abdelwahed), Data Engineer specializing in Python, SQL, ETL pipelines, and data architecture.",
    creator: "@BinShehata",
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: `${SITE_URL}/`,
    languages: {
      en: `${SITE_URL}/`,
      ar: `${SITE_URL}/ar/`,
      "x-default": `${SITE_URL}/`,
    },
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
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexArabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="api-catalog" href="/.well-known/api-catalog" />
        <link rel="ai-catalog" href="/.well-known/ai-catalog.json" />
        <link rel="service-desc" href="/.well-known/oauth-protected-resource" />
        <link rel="service-desc" href="/.well-known/poppy.json" />
        <link rel="service-doc" href="/auth.md" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          <ThemeToggle />
          {children}
          <Footer />
        </ThemeProvider>
        <JsonLd />
        <Analytics />
        <Script id="webmcp-tools" strategy="afterInteractive">
          {`
            (function() {
              if (!navigator.modelContext || !navigator.modelContext.registerTool) return;

              navigator.modelContext.registerTool({
                name: "navigate-to-section",
                description: "Scroll to a named section on the portfolio page. Available sections: hero, experience, skills, volunteering, education, projects, github, badges, blog.",
                inputSchema: {
                  type: "object",
                  properties: {
                    section: {
                      type: "string",
                      description: "The section ID to navigate to",
                      enum: ["hero", "experience", "skills", "volunteering", "education", "projects", "github", "badges", "blog"]
                    }
                  },
                  required: ["section"]
                },
                execute: function(input) {
                  var sectionMap = {
                    hero: "hero",
                    experience: "experience",
                    skills: "skills",
                    volunteering: "volunteering",
                    education: "education",
                    projects: "projects",
                    github: "github-contributions",
                    badges: "badges",
                    blog: "blog"
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
                    if (href.toLowerCase().includes("cv.pdf")) links.cv = href;
                  });
                  links.name = "Ahmed Shehata Said Abdelwahed (Ahmed Abdelwahed)";
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
