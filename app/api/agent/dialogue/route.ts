// app/api/agent/dialogue/route.ts
import { NextResponse } from "next/server";
import { classifyIntent } from "@/engine/intent/classify";
import { instantiateProject } from "@/engine/runtime/createApp";

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    const intent = await classifyIntent(message);
    const project = await instantiateProject(intent);
    return NextResponse.json({ status: "success", project });
  } catch (err: any) {
    return NextResponse.json({ status: "error", error: err.message }, { status: 500 });
  }
}