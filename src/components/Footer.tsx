"use client";

import AnimatedSection from "./AnimatedSection";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <AnimatedSection variant="fade">
        <div className="footer-divider divider" />
        <p className="footer-text">© {currentYear} Ahmed Abdelwahed</p>
      </AnimatedSection>
    </footer>
  );
}
