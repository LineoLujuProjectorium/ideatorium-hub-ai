import { NextResponse } from "next/server";
import { logDecision } from "@/lib/domain";

export async function POST(req: Request) {
  const decision = await req.json();
  logDecision(decision);
  return NextResponse.json({ ok: true });
}
