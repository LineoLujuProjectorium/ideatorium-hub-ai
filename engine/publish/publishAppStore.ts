// engine/publish/publishAppStore.ts
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { prisma } from "../store/prisma";

const run = promisify(exec);

/**
 * Builds and publishes the app to iOS App Store and Play Store.
 * Uses Fastlane or EAS (Expo) depending on your configuration.
 */
export async function publishAppStore(projectId: string, platform: "ios" | "android" | "both" = "both") {
  const project = await prisma.app.findUnique({ where: { id: projectId } });
  if (!project) throw new Error("Project not found");

  const workspaceDir = path.join(process.cwd(), "workspace", project.id);

  try {
    if (platform === "ios" || platform === "both") {
      await run("fastlane ios release", { cwd: workspaceDir });
    }
    if (platform === "android" || platform === "both") {
      await run("eas build --platform android --auto-submit", { cwd: workspaceDir });
    }

    await prisma.app.update({
      where: { id: projectId },
      data: { status: "PUBLISHED_APP_STORE" },
    });

    return { success: true, message: "App successfully submitted to store." };
  } catch (err: any) {
    await prisma.app.update({
      where: { id: projectId },
      data: { status: "STORE_PUBLISH_FAILED" },
    });
    return { success: false, error: err.message };
  }
}