import Hero from "@/components/Hero";
import ExperienceSection from "@/components/ExperienceSection";
import VolunteeringSection from "@/components/VolunteeringSection";
import EducationSection from "@/components/EducationSection";
import ProjectsSection from "@/components/ProjectsSection";
import BadgesSection from "@/components/BadgesSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import { loadJson, loadJsonDir } from "@/lib/content";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const hero = loadJson<{
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
  }>("content/site/hero.json");

  const experience = loadJsonDir<{
    order: number;
    jobTitle: string;
    company: string;
    location: string;
    dateRange: string;
    description: string;
    logo: string;
  }>("content/experience");

  const volunteering = loadJsonDir<{
    order: number;
    role: string;
    organization: string;
    dateRange: string;
    description: string;
    logo: string;
  }>("content/volunteering");

  const education = loadJsonDir<{
    order: number;
    degree: string;
    institution: string;
    dateRange: string;
  }>("content/education");

  const projects = loadJsonDir<{
    order: number;
    name: string;
    description: string;
    githubUrl: string;
  }>("content/projects");

  const badges = loadJsonDir<{
    order: number;
    name: string;
    url: string;
  }>("content/badges");

  const allPosts = getAllPosts();
  const latestPosts = allPosts.slice(0, 2);

  return (
    <main>
      <Hero data={hero} />
      <ExperienceSection items={experience} />
      <VolunteeringSection items={volunteering} />
      <EducationSection items={education} />
      <ProjectsSection items={projects} />
      <BadgesSection items={badges} />
      <BlogSection posts={latestPosts} />
      <Footer />
    </main>
  );
}
