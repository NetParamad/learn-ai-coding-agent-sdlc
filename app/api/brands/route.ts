import { NextResponse } from "next/server";
import { getBrands } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const brands = getBrands();
    return NextResponse.json(brands, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("GET /api/brands error:", error);
    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR", message: "Failed to retrieve brands" },
      { status: 500 }
    );
  }
}
