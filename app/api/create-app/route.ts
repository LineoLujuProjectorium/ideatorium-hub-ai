import { createApp } from "@/engine/runtime";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { input } = await req.json();
  const appId = await createApp(input);
  return NextResponse.json({ appId });
}
