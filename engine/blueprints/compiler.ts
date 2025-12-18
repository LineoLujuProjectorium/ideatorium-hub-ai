// engine/blueprints/compiler.ts

import { AppBlueprint } from "./types";

export type FileGraph = Record<string, string>;

export function compileBlueprint(
  blueprint: AppBlueprint
): FileGraph {
  const files: FileGraph = {};

  blueprint.components.forEach((component) => {
    if (component.type === "page") {
      const routeName =
        component.name === "HomePage"
          ? "app/page.tsx"
          : `app/${component.name.toLowerCase()}/page.tsx`;

      files[routeName] = component.content;
    }

    if (component.type === "component") {
      files[`components/${component.name}.tsx`] =
        component.content;
    }
  });

  return files;
}
