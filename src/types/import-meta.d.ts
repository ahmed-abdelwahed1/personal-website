// Type declarations for import.meta.glob (used by Turbopack/Next.js)
interface ImportMeta {
  glob<T = unknown>(
    pattern: string,
    options?: { eager?: boolean }
  ): Record<string, T>;
}
