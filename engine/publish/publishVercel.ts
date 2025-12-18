// engine/publish/publishVercel.ts
import fetch from "node-fetch";
import { prisma } from "../store/prisma";

export async function publishToVercel(projectId: string) {
  const project = await prisma.app.findUnique({ where: { id: projectId } });
  if (!project) throw new Error("Project not found");

  const vercelDeploy = await fetch("https://api.vercel.com/v13/deployments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: project.name,
      files: [], // will integrate build zip
      projectSettings: {
        framework: "nextjs",
      },
    }),
  });

  const result = await vercelDeploy.json();

  await prisma.app.update({
    where: { id: projectId },
    data: { status: "DEPLOYED", vercelUrl: result?.url },
  });

  return result;
}