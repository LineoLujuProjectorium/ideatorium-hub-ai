import { publishApp } from "@/engine/runtime/publish";

export async function POST(req: Request) {
  const { appId } = await req.json();
  const version = await publishApp(appId);
  return Response.json(version);
}
