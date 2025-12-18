import archiver from "archiver";
import fs from "fs";
import path from "path";

export function zipWorkspace(appId: string) {
  const root = path.join(process.cwd(), "workspaces", appId);
  const zipPath = path.join(process.cwd(), "public", `${appId}.zip`);

  const output = fs.createWriteStream(zipPath);
  const archive = archiver("zip");

  archive.pipe(output);
  archive.directory(root, false);
  archive.finalize();

  return `/` + `${appId}.zip`;
}
