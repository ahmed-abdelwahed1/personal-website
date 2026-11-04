"use client";

import AnimatedSection from "./AnimatedSection";

interface BadgeItem {
  order: number;
  name: string;
  url: string;
}

export default function BadgesSection({
  items,
  title = "Badges",
  viewLabel = "View credential",
}: {
  items: BadgeItem[];
  title?: string;
  viewLabel?: string;
}) {
  const sorted = [...items].sort((a, b) => a.order - b.order);

  return (
    <section className="section" id="badges">
      <div className="container">
        <AnimatedSection variant="fade">
          <h2 className="section-title">{title}</h2>
        </AnimatedSection>

        <AnimatedSection delay={0.08} variant="slide">
          <div>
            {sorted.map((badge) => (
              <div key={badge.name} className="badge-item">
                <span className="badge-name">{badge.name}</span>
                <a
                  href={badge.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge-link"
                  aria-label={`Verify ${badge.name} credential`}
                >
                  {viewLabel}
                </a>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
