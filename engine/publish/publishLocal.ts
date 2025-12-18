// engine/publish/publishLocal.ts
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { prisma } from "../store/prisma";

const run = promisify(exec);

/**
 * Locally build the app inside its workspace folder for previewing.
 * This simulates the Vercel build step in your own environment.
 */
export async function publishLocal(projectId: string) {
  const project = await prisma.app.findUnique({ where: { id: projectId } });
  if (!project) throw new Error("Project not found");

  const workspaceDir = path.join(process.cwd(), "workspace", project.id);

  try {
    // run build
    await run("npm run build", { cwd: workspaceDir });

    await prisma.app.update({
      where: { id: projectId },
      data: { status: "BUILT_LOCAL" },
    });

    return { success: true, message: `Project ${project.name} built locally.` };
  } catch (err: any) {
    await prisma.app.update({
      where: { id: projectId },
      data: { status: "BUILD_FAILED" },
    });
    return { success: false, error: err.message };
  }
}