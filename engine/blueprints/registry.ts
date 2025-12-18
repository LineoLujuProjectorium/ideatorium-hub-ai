// engine/blueprints/registry.ts

import { AppBlueprint } from "./types";
import { createWebAppBlueprint } from "./web-app";
import { createDashboardBlueprint } from "./dashboard";
import { createWorkflowBlueprint } from "./workflow";
import { createApiServiceBlueprint } from "./api-service";

const registry = {
  "web-app": createWebAppBlueprint,
  "dashboard": createDashboardBlueprint,
  "workflow": createWorkflowBlueprint,
  "api-service": createApiServiceBlueprint,
};

export function resolveBlueprint(input: string): AppBlueprint {
  // deterministic default for now
  return registry["web-app"](input);
}
