// engine/runtime/writeFiles.ts

import { getApp } from "../store/apps.table";

export async function writeFiles(
  appId: string,
  files: Record<string, string>
) {
  const app = getApp(appId);
  if (!app) throw new Error("App not found");

  app.files = files;
}
