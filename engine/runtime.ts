import fs from "fs";
import path from "path";
import { compileApp } from "./compiler";
import { registerApp } from "./store";

export async function createApp(input: string) {
  const { appId, files } = compileApp(input);

  for (const [filePath, content] of Object.entries(files)) {
    const full = path.join(process.cwd(), filePath);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content);
  }

  registerApp(appId);
  return appId;
}
