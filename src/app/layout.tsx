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
      </body>
    </html>
  );
}
