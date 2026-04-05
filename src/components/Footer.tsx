"use client";

import AnimatedSection from "./AnimatedSection";

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <AnimatedSection variant="fade">
        <div className="footer-divider divider" />
        <p className="footer-text">© 2026 Ahmed Abdelwahed</p>
      </AnimatedSection>
    </footer>
  );
}
