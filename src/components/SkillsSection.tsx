"use client";

import AnimatedSection from "./AnimatedSection";

interface SkillGroup {
  order: number;
  category: string;
  items: string[];
}

export default function SkillsSection({
  items,
  title = "Skills",
  id = "skills",
}: {
  items: SkillGroup[];
  title?: string;
  id?: string;
}) {
  const sorted = [...items].sort((a, b) => a.order - b.order);

  return (
    <section className="section" id={id}>
      <div className="container">
        <AnimatedSection variant="fade">
          <h2 className="section-title">{title}</h2>
        </AnimatedSection>

        <div className="skills-grid">
          {sorted.map((group, index) => (
            <AnimatedSection
              key={group.category}
              delay={index * 0.08}
              variant="rise"
            >
              <div className="card skill-card">
                <h3 className="skill-category-title">{group.category}</h3>
                <div className="skill-tags">
                  {group.items.map((skill) => (
                    <span key={skill} className="blog-tag skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
