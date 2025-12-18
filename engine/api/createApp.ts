import { compileApp } from "@/engine/compile";

export async function createAppFromPrompt(prompt: string) {
  if (!prompt || !prompt.trim()) {
    throw new Error("Empty prompt");
  }

  const appId = await compileApp(prompt);
  return appId;
}
