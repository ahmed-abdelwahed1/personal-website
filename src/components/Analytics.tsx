"use client";

import Script from "next/script";
import { useEffect, useRef, useCallback } from "react";
import { GA_MEASUREMENT_ID, trackClick, trackOutboundLink, trackDownload, trackScrollDepth, trackTimeOnPage, trackSectionView } from "@/lib/analytics";

export default function Analytics() {
  const startTime = useRef<number | null>(null);
  const scrollMilestones = useRef(new Set<number>());

  const handleScrollDepth = useCallback(() => {
    if (!startTime.current) startTime.current = Date.now();
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    const percent = Math.round((scrollTop / docHeight) * 100);
    const title = document.title;
    const path = window.location.pathname;

    for (const milestone of [25, 50, 75, 90, 100]) {
      if (percent >= milestone && !scrollMilestones.current.has(milestone)) {
        scrollMilestones.current.add(milestone);
        trackScrollDepth(milestone, title, path);
      }
    }
  }, []);

  useEffect(() => {
    if (!startTime.current) startTime.current = Date.now();

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button");
      if (!target) return;

      if (target instanceof HTMLAnchorElement) {
        const href = target.href;
        const label = target.textContent?.trim() || target.getAttribute("aria-label") || href;

        if (target.hasAttribute("download")) {
          trackDownload(label);
          return;
        }

        if (href && (target.target === "_blank" || !href.startsWith(window.location.origin))) {
          trackOutboundLink(href, label);
          return;
        }

        trackClick("internal_link", label, href);
        return;
      }

      if (target instanceof HTMLButtonElement) {
        const label = target.textContent?.trim() || target.getAttribute("aria-label") || "button";
        trackClick("button", label);
      }
    };

    document.addEventListener("click", handleClick);

    window.addEventListener("scroll", handleScrollDepth, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            trackSectionView(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    const timeInterval = setInterval(() => {
      const seconds = Math.round((Date.now() - (startTime.current ?? Date.now())) / 1000);
      if (seconds > 0 && seconds % 30 === 0) {
        trackTimeOnPage(seconds, document.title, window.location.pathname);
      }
    }, 30000);

    const handleBeforeUnload = () => {
      const seconds = Math.round((Date.now() - (startTime.current ?? Date.now())) / 1000);
      trackTimeOnPage(seconds, document.title, window.location.pathname);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScrollDepth);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      observer.disconnect();
      clearInterval(timeInterval);
    };
  }, [handleScrollDepth]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
    </>
  );
}
