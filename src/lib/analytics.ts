export const GA_MEASUREMENT_ID = "G-XKDMM9RCKL";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export function gtagEvent(
  action: string,
  params: Record<string, unknown> = {}
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, params);
  }
}

export function trackClick(
  category: string,
  label: string,
  url?: string
) {
  gtagEvent("click", {
    event_category: category,
    event_label: label,
    ...(url && { link_url: url }),
  });
}

export function trackOutboundLink(url: string, label: string) {
  gtagEvent("click", {
    event_category: "outbound_link",
    event_label: label,
    link_url: url,
    transport_type: "beacon",
  });
}

export function trackDownload(fileName: string) {
  gtagEvent("file_download", {
    event_category: "download",
    event_label: fileName,
    file_name: fileName,
  });
}

export function trackBlogPostRead(
  title: string,
  slug: string,
  percentRead: number
) {
  gtagEvent("blog_post_read", {
    event_category: "blog",
    event_label: title,
    blog_slug: slug,
    percent_read: percentRead,
  });
}

export function trackScrollDepth(
  depth: number,
  pageTitle: string,
  pagePath: string
) {
  gtagEvent("scroll_depth", {
    event_category: "engagement",
    event_label: pageTitle,
    page_path: pagePath,
    scroll_depth: depth,
  });
}

export function trackTimeOnPage(
  seconds: number,
  pageTitle: string,
  pagePath: string
) {
  gtagEvent("time_on_page", {
    event_category: "engagement",
    event_label: pageTitle,
    page_path: pagePath,
    time_seconds: seconds,
  });
}

export function trackSectionView(sectionId: string) {
  gtagEvent("section_view", {
    event_category: "engagement",
    event_label: sectionId,
  });
}
