import { NextResponse } from "next/server";
import { dialogue } from "@/lib/agent";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  return NextResponse.json(dialogue(prompt));
}
