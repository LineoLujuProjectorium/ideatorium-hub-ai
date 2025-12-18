// engine/createApp.ts

import { compileApp } from "./blueprints";
import { registerApp } from "./store/apps.table";
import { writeFiles } from "./runtime/writeFiles";
import { mountApp } from "./runtime/mountApp";

function deriveName(input: string) {
  return input.split(" ").slice(0, 3).join(" ");
}

export async function createAppFromIntent(input: string) {
  const { intent, fileGraph } = compileApp(input);

  const app = registerApp({
    id: crypto.randomUUID(),
    name: deriveName(input),
    intent,
    files: {},
  });

  await writeFiles(app.id, fileGraph);
  mountApp(app.id);

  return app;
}
