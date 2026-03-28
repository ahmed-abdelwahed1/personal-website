"use client";

import { FaGithub } from "react-icons/fa";
import AnimatedSection from "./AnimatedSection";

interface ProjectItem {
  order: number;
  name: string;
  description: string;
  githubUrl: string;
}

export default function ProjectsSection({
  items,
}: {
  items: ProjectItem[];
}) {
  const sorted = [...items].sort((a, b) => a.order - b.order);

  return (
    <section className="section" id="projects">
      <div className="container">
        <AnimatedSection variant="fade">
          <h2 className="section-title">Projects</h2>
        </AnimatedSection>

        <div className="content-grid">
          {sorted.map((project, index) => (
            <AnimatedSection
              key={project.name}
              delay={index * 0.12}
              variant="rise"
            >
              <div className="card project-card">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm github-btn"
                >
                  <FaGithub /> View on GitHub
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
