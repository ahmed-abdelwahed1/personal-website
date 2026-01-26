<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Ahmed Abdelwahed — Portfolio

Personal portfolio website built with React + Vite.

## Features

- Home page with profile, Credly badges, and latest blog posts
- Blog list + individual post pages (markdown content)
- Light/dark theme toggle (saved in `localStorage`)
- Content managed via Decap CMS (stored in `src/content/`)

## Project structure

```
src/
  App.tsx
  main.tsx
  components/
  content/        # JSON content (edited by CMS)
  services/       # content loader
  types.ts
public/
  admin/          # Decap CMS
```

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Build

`npm run build`

## Edit content

- **Via CMS**: open `public/admin/` in your deployed site (or local server) and edit collections.
- **Via files**: update JSON files in `src/content/`.
