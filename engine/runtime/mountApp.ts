import fs from "fs";
import path from "path";

export function mountApp(appId: string) {
  const indexPath = path.join(process.cwd(), "apps", appId, "app", "page.tsx");

  if (!fs.existsSync(indexPath)) {
    throw new Error("App entry not found for " + appId);
  }

  return true;
}
