import { NextResponse } from "next/server";
import { searchMemory } from "@/lib/memory";

export async function POST(req: Request) {
  const { query } = await req.json();
  return NextResponse.json(searchMemory(query));
}
