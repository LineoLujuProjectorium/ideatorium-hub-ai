import fs from "fs";
import path from "path";

export function readWorkspace(appId: string) {
  const root = path.join(process.cwd(), "workspaces", appId);
  const files: Record<string, string> = {};

  function walk(dir: string) {
    for (const entry of fs.readdirSync(dir)) {
      const full = path.join(dir, entry);
      if (fs.statSync(full).isDirectory()) walk(full);
      else {
        files[full.replace(root + "/", "")] = fs.readFileSync(full, "utf8");
      }
    }
  }

  walk(root);
  return files;
}
