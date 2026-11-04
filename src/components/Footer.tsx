"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AnimatedSection from "./AnimatedSection";

export default function Footer() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");

  return (
    <footer className="footer" id="footer">
      <AnimatedSection variant="fade">
        <div className="footer-divider divider" />
        <div className="container footer-content">
          <nav className="footer-nav" aria-label={isArabic ? "روابط الموقع" : "Site navigation"}>
            {isArabic ? (
              <>
                <Link href="/ar/">الرئيسية</Link>
                <Link href="/ar/#experience">الخبرات</Link>
                <Link href="/ar/#skills">المهارات</Link>
                <Link href="/ar/#projects">المشاريع</Link>
                <Link href="/ar/#education">التعليم</Link>
                <Link href="/blog/">المدونة (EN)</Link>
                <Link href="/" lang="en">
                  English
                </Link>
              </>
            ) : (
              <>
                <Link href="/">Home</Link>
                <Link href="/#experience">Experience</Link>
                <Link href="/#skills">Skills</Link>
                <Link href="/#projects">Projects</Link>
                <Link href="/#education">Education</Link>
                <Link href="/blog/">Blog</Link>
                <Link href="/ar/" lang="ar" dir="rtl">
                  العربية
                </Link>
              </>
            )}
          </nav>
          <p className="footer-text">
            {isArabic
              ? "© 2026 أحمد شحاتة سعيد عبدالواحد (أحمد عبدالواحد) — مهندس بيانات"
              : "© 2026 Ahmed Shehata Said Abdelwahed (Ahmed Abdelwahed) — Data Engineer"}
          </p>
        </div>
      </AnimatedSection>
    </footer>
  );
}
