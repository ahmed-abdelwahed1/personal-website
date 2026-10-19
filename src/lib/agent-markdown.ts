import howToEmailRaw from "@content/blog/how-to-create-a-free-professional-email-with-improvmx-and-gmail.md";
import improveRuffRaw from "@content/blog/improve-python-code-quality-with-ruff.md";

const rawPosts: Record<string, { raw: string; title: string; date: string; excerpt: string }> = {
  "how-to-create-a-free-professional-email-with-improvmx-and-gmail": {
    raw: howToEmailRaw,
    title: "How to Create a Free Professional Email with ImprovMX and Gmail",
    date: "2025-06-15",
    excerpt: "Learn how to set up a free custom domain email address using ImprovMX and route messages seamlessly through your personal Gmail account.",
  },
  "improve-python-code-quality-with-ruff": {
    raw: improveRuffRaw,
    title: "Improve Python Code Quality with Ruff",
    date: "2025-05-10",
    excerpt: "Discover how Ruff replaces Flake8, Black, isort, and more with an extremely fast Rust-based linter and formatter.",
  },
};

export function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}

function stripFrontmatter(content: string): string {
  return content.replace(/^---[\s\S]*?---\s*/, "");
}

export function getHomepageMarkdown(): string {
  return `# Ahmed Abdelwahed — Data Engineer

> I design systems, build data pipelines, and turn ideas into working products. Interested in data engineering, AI-driven tools, and practical software that people actually use. Currently studying and building along the way.

- **Title:** Data Engineer
- **Website:** https://ahmedabdelwahed.me/
- **Email:** ahmedshehatasaid1@gmail.com
- **LinkedIn:** https://linkedin.com/in/ahmed-abdelwahed
- **GitHub:** https://github.com/ahmed-abdelwahed1
- **X (Twitter):** https://x.com/BinShehata
- **Medium:** https://medium.com/@ahmed-abdelwahed
- **CV / Resume:** https://ahmedabdelwahed.me/ahmed-abdelwahed-cv.pdf
- **Status:** Open to collaborations and opportunities.

---

## Experience

### Junior Data Engineer — Cyan Group
- **Location:** Remote, Kuwait
- **Duration:** January 2026 – Present
- **Details:** Designing efficient PostgreSQL schemas (via Supabase) to capture complex order workflows, automating data flow between inventory and production stages, and establishing validation rules to ensure accurate real-time tracking for decision-making.

### Intern Data Engineer — Volvo Cars
- **Location:** Gothenburg, Sweden
- **Duration:** February 2024 – July 2024
- **Details:** Participated in developing automated data pipelines using Python, authored technical documentation for data collection and processing, engineered reliable methods for data recording throughout testing, and improved data integrity using cleaning techniques.

### Freelance Graphic Designer — Freelance
- **Location:** Remote
- **Duration:** January 2019 – December 2023
- **Details:** Provided graphic design services including branding, marketing materials, and digital assets for various clients.

---

## Projects

### BUDGE
- **Description:** A smart Personal Expense Tracker built with VB.NET and MS Access. Features a modern dashboard for tracking income, expenses, and categories.
- **Repository:** https://github.com/ahmed-abdelwahed1/BUDGE

### Hevy Flow
- **Description:** An end-to-end data pipeline for analyzing and visualizing Hevy App workout logs.
- **Repository:** https://github.com/ahmed-abdelwahed1/hevy-flow

### X-Unbookmarker
- **Description:** Chrome Extension designed to help you manage your digital footprint on X (formerly Twitter) by automating the process of removing bookmarks.
- **Repository:** https://github.com/ahmed-abdelwahed1/X-Unbookmarker.git

---

## Education

### Bachelor of Specific Education in Computer Science and Education
- **Institution:** Mansoura University, Faculty of Specific Education
- **Duration:** 2022 – Present (Expected Graduation: July 2027)

---

## Volunteering

### Data Engineering Committee Volunteer — IEEE Mansoura Computer Society Chapter
- **Duration:** November 2024 – October 2025
- **Details:** Volunteered with the Data Engineering Committee through workshops and collaborative problem-solving activities.

---

## Certifications & Badges

- **Data Analyst Professional Certificate - IBM:** https://www.credly.com/badges/771aa249-d545-4e8c-9ff4-98a0a24a97bd/public_url
- **Databases and SQL for Data Science with Python - IBM:** https://www.credly.com/badges/databases-and-sql-for-data-science-with-python
- **Python for Data Science, AI & Development - IBM:** https://www.credly.com/badges/python-for-data-science-ai-development

---

## Blog Posts

- [How to Create a Free Professional Email with ImprovMX and Gmail](https://ahmedabdelwahed.me/blog/how-to-create-a-free-professional-email-with-improvmx-and-gmail/) (2025-06-15)
- [Improve Python Code Quality with Ruff](https://ahmedabdelwahed.me/blog/improve-python-code-quality-with-ruff/) (2025-05-10)

---

## Machine-Readable Agent Resources

- **Capability Catalog (ARD):** https://ahmedabdelwahed.me/.well-known/ai-catalog.json
- **API Catalog (RFC 9727):** https://ahmedabdelwahed.me/.well-known/api-catalog
- **Agent Skill (SKILL.md):** https://ahmedabdelwahed.me/.well-known/agent-skills/portfolio-info/SKILL.md
- **MCP Server Card:** https://ahmedabdelwahed.me/.well-known/mcp/server-card.json
- **Auth.md Metadata:** https://ahmedabdelwahed.me/auth.md
- **OAuth Protected Resource:** https://ahmedabdelwahed.me/.well-known/oauth-protected-resource
- **OAuth Authorization Server:** https://ahmedabdelwahed.me/.well-known/oauth-authorization-server
- **Sitemap:** https://ahmedabdelwahed.me/sitemap.xml
`;
}

export function getBlogIndexMarkdown(): string {
  return `# Ahmed Abdelwahed — Blog

Articles on data engineering, Python, ETL pipelines, and software development.

## Posts

### How to Create a Free Professional Email with ImprovMX and Gmail
- **Date:** 2025-06-15
- **URL:** https://ahmedabdelwahed.me/blog/how-to-create-a-free-professional-email-with-improvmx-and-gmail/
- **Excerpt:** Learn how to set up a free custom domain email address using ImprovMX and route messages seamlessly through your personal Gmail account.

### Improve Python Code Quality with Ruff
- **Date:** 2025-05-10
- **URL:** https://ahmedabdelwahed.me/blog/improve-python-code-quality-with-ruff/
- **Excerpt:** Discover how Ruff replaces Flake8, Black, isort, and more with an extremely fast Rust-based linter and formatter.
`;
}

export function getBlogPostMarkdown(slug: string): string | null {
  const post = rawPosts[slug];
  if (!post) return null;
  const body = stripFrontmatter(post.raw);
  return `# ${post.title}

- **Date:** ${post.date}
- **Author:** Ahmed Abdelwahed
- **Canonical URL:** https://ahmedabdelwahed.me/blog/${slug}/

${body}`;
}

export function getMarkdownResponseForPath(pathname: string): string | null {
  // Normalize trailing slash and remove query string
  const cleanPath = pathname.split("?")[0].replace(/\/+$/, "") || "/";

  if (cleanPath === "/") {
    return getHomepageMarkdown();
  }

  if (cleanPath === "/blog") {
    return getBlogIndexMarkdown();
  }

  if (cleanPath.startsWith("/blog/")) {
    const slug = cleanPath.replace("/blog/", "");
    return getBlogPostMarkdown(slug);
  }

  return null;
}
