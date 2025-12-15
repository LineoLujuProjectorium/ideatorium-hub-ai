import { NextResponse } from "next/server";
import { embed } from "@/lib/memory";

export async function POST(req: Request) {
  const { text } = await req.json();
  const vector = await embed(text);
  return NextResponse.json(vector);
}
