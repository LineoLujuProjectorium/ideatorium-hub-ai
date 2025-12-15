import { registry } from "./registry";
import { IdeatoriumNode } from "./types";

/**
 * Core engine accessor.
 * This is the heart of Ideatorium.
 */
export function getAllNodes(): IdeatoriumNode[] {
  return Object.values(registry);
}

export function getNodeById(id: string): IdeatoriumNode | null {
  return registry[id] ?? null;
}
