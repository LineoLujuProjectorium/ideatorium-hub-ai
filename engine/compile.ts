import { matchBlueprint } from "./blueprints";
import { registerApp } from "./store/apps.table";
import { writeFiles } from "./fs/writeFiles";
import { mountApp } from "./runtime/mountApp";
import crypto from "crypto";

export async function compileApp(input: string) {
  const blueprint = matchBlueprint(input);
  const id = crypto.randomUUID();
  const name = input.slice(0, 32);

  const fileGraph = blueprint.generate(name);

  registerApp({
    id,
    name,
    intent: blueprint.id,
    files: Object.keys(fileGraph),
  });

  await writeFiles(id, fileGraph);
  mountApp(id);

  return id;
}
