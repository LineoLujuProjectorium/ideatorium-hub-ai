// engine/compiler/compile.ts
import { classifyIntent } from "../intent/classify";
import { Blueprints } from "../blueprints";
import { buildFileGraph } from "./fileGraph";

export function compileApp(input: string) {
  const intent = classifyIntent(input);
  const blueprint = Blueprints[intent];

  const fileGraph = buildFileGraph(blueprint);
  return { intent, fileGraph };
}
