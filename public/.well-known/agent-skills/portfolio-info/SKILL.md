# Portfolio Information Skill

Retrieve professional information from Ahmed Abdelwahed's personal portfolio site.

## Overview

This skill allows agents to extract structured information about Ahmed Shehata Said Abdelwahed (Ahmed Abdelwahed / أحمد شحاتة سعيد عبدالواحد), a Data Engineer, from his portfolio website at https://ahmedabdelwahed.me.

## Available Information

- **Professional Summary** — Full name, Arabic name, title, bio, and current availability
- **Work Experience** — Past and present positions with companies (Cyan Group, Volvo Cars), roles, and descriptions
- **Technical Skills** — Languages (Python, SQL, TypeScript), Data Engineering & Architecture, and Databases/Tools
- **Education** — Degrees and institutions (Mansoura University)
- **Projects** — Open-source and personal projects with GitHub links
- **Blog Posts** — Articles on data engineering, Python, ETL, and software development
- **Contact Information** — Email (`contact@ahmedabdelwahed.me`), LinkedIn, GitHub, X (Twitter), and Medium profiles
- **CV/Resume** — Downloadable PDF at `/ahmed-abdelwahed-cv.pdf`

## Endpoints

| Resource | URL | Format |
|----------|-----|--------|
| Homepage (EN) | `https://ahmedabdelwahed.me/` | HTML / Markdown |
| Homepage (AR) | `https://ahmedabdelwahed.me/ar/` | HTML / Markdown |
| Blog | `https://ahmedabdelwahed.me/blog/` | HTML / Markdown |
| Sitemap | `https://ahmedabdelwahed.me/sitemap.xml` | XML |
| CV | `https://ahmedabdelwahed.me/ahmed-abdelwahed-cv.pdf` | PDF |

## Content Negotiation

Send `Accept: text/markdown` to receive markdown versions of HTML pages.

## Usage Notes

- All content is publicly accessible without authentication
- The site is statically generated — content updates on each deployment
- Blog posts are written in Markdown and rendered as HTML
