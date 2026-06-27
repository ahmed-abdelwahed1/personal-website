// Static imports — bundled at build time, compatible with Cloudflare Workers
import heroJson from "@content/site/hero.json";
import cyanGroup from "@content/experience/cyan-group.json";
import freelanceGraphicDesigner from "@content/experience/freelance-graphic-designer.json";
import volvo from "@content/experience/volvo.json";
import ieee from "@content/volunteering/ieee.json";
import bachelors from "@content/education/bachelors.json";
import budge from "@content/projects/budge.json";
import hevyFlow from "@content/projects/hevy-flow.json";
import stocksEtl from "@content/projects/stocks-etl.json";
import dataAnalystIbm from "@content/badges/data-analyst-ibm.json";
import databasesSqlIbm from "@content/badges/databases-sql-ibm.json";
import pythonDsAiIbm from "@content/badges/python-ds-ai-ibm.json";

const contentMap: Record<string, unknown[]> = {
  experience: [cyanGroup, freelanceGraphicDesigner, volvo],
  volunteering: [ieee],
  education: [bachelors],
  projects: [budge, hevyFlow, stocksEtl],
  badges: [dataAnalystIbm, databasesSqlIbm, pythonDsAiIbm],
};

const singleMap: Record<string, unknown> = {
  "hero.json": heroJson,
};

export async function loadJsonDir<T>(dirPath: string): Promise<T[]> {
  const key = Object.keys(contentMap).find((k) => dirPath.includes(k));
  return key ? (contentMap[key] as T[]) : [];
}

export async function loadJson<T>(filePath: string): Promise<T> {
  const key = Object.keys(singleMap).find((k) => filePath.includes(k));
  if (!key) throw new Error(`File not found: ${filePath}`);
  return singleMap[key] as T;
}
