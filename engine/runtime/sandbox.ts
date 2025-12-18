// engine/runtime/sandbox.ts
import fs from "fs/promises";
import path from "path";

export async function createUserSandbox(userId: string, projectId: string) {
  const userDir = path.join(process.cwd(), "sandbox", userId);
  const projectDir = path.join(userDir, projectId);
  await fs.mkdir(projectDir, { recursive: true });
  return projectDir; // safe workspace path
}

export async function cleanupSandbox(userId: string, projectId: string) {
  const projectDir = path.join(process.cwd(), "sandbox", userId, projectId);
  await fs.rm(projectDir, { recursive: true, force: true });
}