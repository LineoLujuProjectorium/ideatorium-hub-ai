// /app/api/create-app/route.ts (DACE version)
export async function POST(request: Request) {
  const { description } = await request.json();
  
  // STEP 1: Parse intent (deterministic, not chatty)
  const intent = await parseToIntent(description); // "therapy app" → {template: "therapy", features: ["chat", "appointments"]}
  
  // STEP 2: Generate from template (not from AI hallucinations)
  const app = await generateFromTemplate(intent);
  
  // STEP 3: Deploy immediately
  const deployment = await deployApp(app);
  
  // STEP 4: Update Ideatorium project with REAL app data
  await updateProjectWithDeployment(deployment);
  
  return Response.json({
    success: true,
    appUrl: deployment.url,
    appId: deployment.id,
    projectId: intent.projectId
  });
}