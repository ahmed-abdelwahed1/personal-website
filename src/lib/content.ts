import fs from "fs";
import path from "path";

export function loadJsonDir<T>(dirPath: string): T[] {
  const fullPath = path.join(process.cwd(), dirPath);
  if (!fs.existsSync(fullPath)) {
    return [];
  }

  return fs
    .readdirSync(fullPath)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const content = fs.readFileSync(path.join(fullPath, f), "utf8");
      return JSON.parse(content) as T;
    });
}

export function loadJson<T>(filePath: string): T {
  const fullPath = path.join(process.cwd(), filePath);
  const content = fs.readFileSync(fullPath, "utf8");
  return JSON.parse(content) as T;
}
