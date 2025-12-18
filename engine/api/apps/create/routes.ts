import { NextResponse } from "next/server";
import { createAppFromPrompt } from "@/engine/api/createApp";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const id = await createAppFromPrompt(prompt);
    return NextResponse.json({ id });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}
