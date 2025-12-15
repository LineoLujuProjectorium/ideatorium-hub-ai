import { NextResponse } from "next/server";
import { traverse } from "@/lib/agent";

export async function POST(req: Request) {
  const { startId } = await req.json();
  return NextResponse.json(traverse(startId));
}
