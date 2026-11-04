import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import VolunteeringSection from "@/components/VolunteeringSection";
import EducationSection from "@/components/EducationSection";
import ProjectsSection from "@/components/ProjectsSection";
import BadgesSection from "@/components/BadgesSection";
import GithubHeatmapSection from "@/components/GithubHeatmapSection";
import BlogSection from "@/components/BlogSection";
import { PERSON_ID, WEBSITE_ID } from "@/components/JsonLd";
import { loadJson, loadJsonDir } from "@/lib/content";
import { getAllPosts } from "@/lib/blog";

const SITE_URL = "https://ahmedabdelwahed.me";

export const metadata: Metadata = {
  title: "Ahmed Abdelwahed | Data Engineer — Ahmed Shehata Said Abdelwahed",
  description:
    "Official portfolio of Ahmed Shehata Said Abdelwahed (Ahmed Abdelwahed / أحمد شحاتة سعيد عبدالواحد), Data Engineer at Cyan Group and former Data Engineering Intern at Volvo Cars. Specializing in Python, SQL, ETL pipelines, and data architecture.",
  alternates: {
    canonical: `${SITE_URL}/`,
    languages: {
      en: `${SITE_URL}/`,
      ar: `${SITE_URL}/ar/`,
      "x-default": `${SITE_URL}/`,
    },
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    alternateLocale: ["ar_EG"],
    url: `${SITE_URL}/`,
    siteName: "Ahmed Abdelwahed",
    title: "Ahmed Abdelwahed | Data Engineer — Ahmed Shehata Said Abdelwahed",
    description:
      "Official portfolio of Ahmed Shehata Said Abdelwahed (Ahmed Abdelwahed), Data Engineer specializing in Python, SQL, ETL pipelines, and data architecture.",
    firstName: "Ahmed",
    lastName: "Abdelwahed",
    username: "ahmed-abdelwahed",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1600,
        height: 800,
        alt: "Ahmed Shehata Said Abdelwahed (Ahmed Abdelwahed) — Data Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Abdelwahed | Data Engineer — Ahmed Shehata Said Abdelwahed",
    description:
      "Official portfolio of Ahmed Shehata Said Abdelwahed (Ahmed Abdelwahed), Data Engineer specializing in Python, SQL, ETL pipelines, and data architecture.",
    creator: "@BinShehata",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default async function Home() {
  const hero = await loadJson<{
    name: string;
    fullName?: string;
    arabicName?: string;
    title: string;
    bio: string;
    openTo: string;
    email: string;
    linkedin: string;
    github: string;
    x: string;
    medium: string;
    cvFile: string;
  }>("hero.json");

  const experience = await loadJsonDir<{
    order: number;
    jobTitle: string;
    company: string;
    location: string;
    dateRange: string;
    description: string;
    logo: string;
    isCrossedOut?: boolean;
  }>("experience");

  const skills = await loadJsonDir<{
    order: number;
    category: string;
    items: string[];
  }>("skills");

  const volunteering = await loadJsonDir<{
    order: number;
    role: string;
    organization: string;
    dateRange: string;
    description: string;
    logo: string;
  }>("volunteering");

  const education = await loadJsonDir<{
    order: number;
    degree: string;
    institution: string;
    dateRange: string;
  }>("education");

  const projects = await loadJsonDir<{
    order: number;
    name: string;
    description: string;
    githubUrl: string;
  }>("projects");

  const badges = await loadJsonDir<{
    order: number;
    name: string;
    url: string;
  }>("badges");

  const allPosts = getAllPosts();
  const configuredHomeBlogPosts = Number.parseInt(
    process.env.HOMEPAGE_BLOG_POSTS_COUNT ?? process.env.BLOG_POSTS_PER_PAGE ?? "3",
    10
  );
  const homeBlogPostsCount =
    Number.isFinite(configuredHomeBlogPosts) && configuredHomeBlogPosts > 0
      ? configuredHomeBlogPosts
      : 3;
  const latestPosts = allPosts.slice(0, homeBlogPostsCount);

  const githubUsername = hero.github
    ? hero.github.split("/").filter(Boolean).pop()
    : undefined;

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: `${SITE_URL}/`,
    name: "Ahmed Abdelwahed | Data Engineer — Ahmed Shehata Said Abdelwahed",
    description:
      "Official portfolio of Ahmed Shehata Said Abdelwahed (Ahmed Abdelwahed), Data Engineer specializing in Python, SQL, ETL pipelines, and data architecture.",
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
    about: { "@id": PERSON_ID },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePageSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Hero data={hero} />
      <ExperienceSection items={experience} />
      <SkillsSection items={skills} />
      <VolunteeringSection items={volunteering} />
      <EducationSection items={education} />
      <ProjectsSection items={projects} />
      {githubUsername && <GithubHeatmapSection username={githubUsername} />}
      <BadgesSection items={badges} />
      <BlogSection posts={latestPosts} />
    </main>
  );
}
