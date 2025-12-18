import fs from "fs";
import path from "path";

export async function writeFiles(appId: string, fileGraph: Record<string, string>) {
  const base = path.join(process.cwd(), "apps", appId);

  for (const filePath of Object.keys(fileGraph)) {
    const fullPath = path.join(base, filePath);
    const dir = path.dirname(fullPath);

    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, fileGraph[filePath]);
  }
}
