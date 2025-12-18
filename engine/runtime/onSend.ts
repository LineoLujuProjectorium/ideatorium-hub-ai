import { compileApp } from "@/engine/blueprints";
import { registerApp, writeFiles } from "@/engine/store/apps.table";
import { mountApp } from "./mountApp";

export async function onSend(input: string) {
  const { intent, fileGraph } = compileApp(input);

  const app = registerApp({
    name: input,
    intent,
  });

  writeFiles(app.id, fileGraph);
  mountApp(app.id);
}
