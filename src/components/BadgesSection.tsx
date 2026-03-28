"use client";

import AnimatedSection from "./AnimatedSection";

interface BadgeItem {
  order: number;
  name: string;
  url: string;
}

export default function BadgesSection({ items }: { items: BadgeItem[] }) {
  const sorted = [...items].sort((a, b) => a.order - b.order);

  return (
    <section className="section" id="badges">
      <div className="container">
        <AnimatedSection>
          <h2 className="section-title">Badges</h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div>
            {sorted.map((badge) => (
              <div key={badge.name} className="badge-item">
                <span className="badge-name">{badge.name}</span>
                <a
                  href={badge.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge-link"
                >
                  View
                </a>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
