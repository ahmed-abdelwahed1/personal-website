"use client";

import { useEffect, useRef } from "react";
import { trackBlogPostRead, trackTimeOnPage } from "@/lib/analytics";

interface BlogPostTrackerProps {
  title: string;
  slug: string;
}

export default function BlogPostTracker({ title, slug }: BlogPostTrackerProps) {
  const startTime = useRef(Date.now());
  const milestones = useRef(new Set<number>());

  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector(".blog-content");
      if (!article) return;

      const rect = article.getBoundingClientRect();
      const articleTop = window.scrollY + rect.top;
      const articleHeight = rect.height;
      const scrollPosition = window.scrollY + window.innerHeight;
      const progress = Math.min(
        100,
        Math.max(0, Math.round(((scrollPosition - articleTop) / articleHeight) * 100))
      );

      for (const milestone of [25, 50, 75, 100]) {
        if (progress >= milestone && !milestones.current.has(milestone)) {
          milestones.current.add(milestone);
          trackBlogPostRead(title, slug, milestone);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const handleBeforeUnload = () => {
      const seconds = Math.round((Date.now() - startTime.current) / 1000);
      trackTimeOnPage(seconds, `Blog: ${title}`, `/blog/${slug}/`);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [title, slug]);

  return null;
}
