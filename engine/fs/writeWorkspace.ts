// engine/fs/writeWorkspace.ts
import fs from "fs/promises";
import path from "path";

export async function writeWorkspace(dir: string, file: string, content: string) {
  const filePath = path.join(dir, file);
  await fs.writeFile(filePath, content, "utf8");
}