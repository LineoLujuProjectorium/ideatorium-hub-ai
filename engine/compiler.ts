import { BLUEPRINTS } from "./blueprints";
import { registerApp } from "./store/apps.table";

export function compileApp(input: string) {
  const lowered = input.toLowerCase();

  if (lowered.includes("dashboard")) return "dashboard";
  if (lowered.includes("workflow")) return "workflow";
  if (lowered.includes("api")) return "api-service";
  return "web-app";
}

export async function createAppFromPrompt(prompt: string) {
  const blueprintKey = compileApp(prompt);
  const name = prompt.split(" ")[0] || "Generated";

  const files = BLUEPRINTS[blueprintKey](name);
  return registerApp(name, files);
}
