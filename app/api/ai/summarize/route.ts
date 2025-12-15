import { NextResponse } from "next/server";
import { summarize } from "@/lib/ai";

export async function POST(req: Request) {
  const { text } = await req.json();
  const summary = await summarize(text);
  return NextResponse.json({ summary });
}
