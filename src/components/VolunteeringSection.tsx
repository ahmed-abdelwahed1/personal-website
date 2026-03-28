"use client";

import Image from "next/image";
import AnimatedSection from "./AnimatedSection";

interface VolunteeringItem {
  order: number;
  role: string;
  organization: string;
  dateRange: string;
  description: string;
  logo: string;
}

export default function VolunteeringSection({
  items,
}: {
  items: VolunteeringItem[];
}) {
  const sorted = [...items].sort((a, b) => a.order - b.order);

  return (
    <section className="section" id="volunteering">
      <div className="container">
        <AnimatedSection>
          <h2 className="section-title">Volunteering</h2>
        </AnimatedSection>

        <div className="content-grid">
          {sorted.map((vol, index) => (
            <AnimatedSection key={vol.organization} delay={index * 0.15}>
              <div className="card volunteering-card experience-card">
                {vol.logo && (
                  <Image
                    src={vol.logo}
                    alt={`${vol.organization} logo`}
                    width={200}
                    height={40}
                    className="experience-logo"
                    style={{ width: "auto", height: "35px" }}
                  />
                )}
                <div className="experience-header">
                  <div className="experience-info">
                    <h3>{vol.role}</h3>
                    <p>{vol.organization}</p>
                  </div>
                  <span className="experience-date">{vol.dateRange}</span>
                </div>
                <p className="experience-description">{vol.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
