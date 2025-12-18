import { webApp } from "./web-app";
import { dashboard } from "./dashboard";
import { workflow } from "./workflow";
import { apiService } from "./api-service";

export const BLUEPRINTS = {
  "web-app": webApp,
  "dashboard": dashboard,
  "workflow": workflow,
  "api-service": apiService,
};

export type BlueprintKey = keyof typeof BLUEPRINTS;
