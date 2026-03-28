"use client";

import AnimatedSection from "./AnimatedSection";

interface EducationItem {
  order: number;
  degree: string;
  institution: string;
  dateRange: string;
}

export default function EducationSection({
  items,
}: {
  items: EducationItem[];
}) {
  const sorted = [...items].sort((a, b) => a.order - b.order);

  return (
    <section className="section" id="education">
      <div className="container">
        <AnimatedSection>
          <h2 className="section-title">Education</h2>
        </AnimatedSection>

        <div className="content-grid">
          {sorted.map((edu, index) => (
            <AnimatedSection key={edu.institution} delay={index * 0.1}>
              <div className="education-item">
                <h3>{edu.degree}</h3>
                <div className="education-details">
                  <span className="institution">{edu.institution}</span>
                  <span className="date">{edu.dateRange}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
