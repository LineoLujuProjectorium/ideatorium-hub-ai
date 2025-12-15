import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({
    model: "auto",
    output: "AI routed successfully",
    input: body,
  });
}
