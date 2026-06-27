// Type declarations for import.meta.glob (used by Turbopack/Next.js)
interface ImportMeta {
  glob<T = unknown>(
    pattern: string,
    options?: { eager?: boolean }
  ): Record<string, T>;
}

// Allow importing .md files as raw strings (via webpack asset/source rule)
declare module "*.md" {
  const content: string;
  export default content;
}

