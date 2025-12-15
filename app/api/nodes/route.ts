import { NextResponse } from "next/server";
import { getAllNodes } from "@/lib/domain";

export async function GET() {
  return NextResponse.json(getAllNodes());
}
