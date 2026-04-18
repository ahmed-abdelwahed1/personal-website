# Portfolio Information Skill

Retrieve professional information from Ahmed Abdelwahed's personal portfolio site.

## Overview

This skill allows agents to extract structured information about Ahmed Abdelwahed, a Data Engineer, from his portfolio website at https://ahmedabdelwahed.me.

## Available Information

- **Professional Summary** — Name, title, bio, and current availability
- **Work Experience** — Past and present positions with companies, roles, and descriptions
- **Education** — Degrees and institutions
- **Projects** — Open-source and personal projects with GitHub links
- **Blog Posts** — Articles on data engineering, Python, ETL, and software development
- **Contact Information** — Email, LinkedIn, GitHub, X (Twitter), and Medium profiles
- **CV/Resume** — Downloadable PDF at `/Ahmed%20Abdelwahed%20-%20CV.pdf`

## Endpoints

| Resource | URL | Format |
|----------|-----|--------|
| Homepage | `https://ahmedabdelwahed.me/` | HTML |
| Blog | `https://ahmedabdelwahed.me/blog/` | HTML |
| Sitemap | `https://ahmedabdelwahed.me/sitemap.xml` | XML |
| CV | `https://ahmedabdelwahed.me/Ahmed%20Abdelwahed%20-%20CV.pdf` | PDF |

## Content Negotiation

Send `Accept: text/markdown` to receive markdown versions of HTML pages.

## Usage Notes

- All content is publicly accessible without authentication
- The site is statically generated — content updates on each deployment
- Blog posts are written in Markdown and rendered as HTML
