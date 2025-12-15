import { IdeatoriumApp } from "./apps";

export function getBlockers(app: IdeatoriumApp): string[] {
  const blockers: string[] = [];

  if (app.status === "draft") {
    blockers.push("App has not been activated");
  }

  if (!app.version) {
    blockers.push("Version is missing");
  }

  return blockers;
}
