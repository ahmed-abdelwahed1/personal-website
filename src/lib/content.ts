export async function loadJsonDir<T>(dirPath: string): Promise<T[]> {
  try {
    const modules = import.meta.glob("/src/content/**/*.json", {
      eager: true,
    }) as Record<string, { default: T }>;

    return Object.entries(modules)
      .filter(([key]) => key.includes(dirPath))
      .map(([, mod]) => mod.default);
  } catch {
    return [];
  }
}

export async function loadJson<T>(filePath: string): Promise<T> {
  const modules = import.meta.glob("/src/content/**/*.json", {
    eager: true,
  }) as Record<string, { default: T }>;

  const key = Object.keys(modules).find((k) => k.includes(filePath));
  if (!key) throw new Error(`File not found: ${filePath}`);

  return modules[key].default;
}
