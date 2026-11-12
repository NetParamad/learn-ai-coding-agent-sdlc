import { swaggerSpec } from "@/lib/api-spec";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(swaggerSpec, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
