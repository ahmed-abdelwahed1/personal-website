import Hero from "@/components/Hero";
import ExperienceSection from "@/components/ExperienceSection";
import VolunteeringSection from "@/components/VolunteeringSection";
import EducationSection from "@/components/EducationSection";
import ProjectsSection from "@/components/ProjectsSection";
import BadgesSection from "@/components/BadgesSection";
import GithubHeatmapSection from "@/components/GithubHeatmapSection";
import BlogSection from "@/components/BlogSection";
import { loadJson, loadJsonDir } from "@/lib/content";
import { getAllPosts } from "@/lib/blog";

export default async function Home() {
  const hero = await loadJson<{
    name: string;
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

  return (
    <main>
      <Hero data={hero} />
      <ExperienceSection items={experience} />
      <VolunteeringSection items={volunteering} />
      <EducationSection items={education} />
      <ProjectsSection items={projects} />
      {githubUsername && <GithubHeatmapSection username={githubUsername} />}
      <BadgesSection items={badges} />
      <BlogSection posts={latestPosts} />
    </main>
  );
}
