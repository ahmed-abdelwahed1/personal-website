"use client";

import Image from "next/image";
import AnimatedSection from "./AnimatedSection";

interface ExperienceItem {
  order: number;
  jobTitle: string;
  company: string;
  location: string;
  dateRange: string;
  description: string;
  logo: string;
}

export default function ExperienceSection({
  items,
}: {
  items: ExperienceItem[];
}) {
  const sorted = [...items].sort((a, b) => a.order - b.order);

  return (
    <section className="section" id="experience">
      <div className="container">
        <AnimatedSection>
          <h2 className="section-title">Experience</h2>
        </AnimatedSection>

        <div className="content-grid">
          {sorted.map((exp, index) => (
            <AnimatedSection
              key={exp.company}
              delay={index * 0.15}
              direction="left"
            >
              <div className="card experience-card">
                {exp.logo && (
                  <Image
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    width={200}
                    height={40}
                    className="experience-logo"
                  />
                )}
                <div className="experience-header">
                  <div className="experience-info">
                    <h3>{exp.jobTitle}</h3>
                    <p>
                      {exp.company} - {exp.location}
                    </p>
                  </div>
                  <span className="experience-date">{exp.dateRange}</span>
                </div>
                <p className="experience-description">{exp.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
