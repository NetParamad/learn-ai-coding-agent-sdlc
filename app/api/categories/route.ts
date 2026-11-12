import { NextResponse } from "next/server";
import { getCategories } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const categories = getCategories();
    return NextResponse.json(categories, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("GET /api/categories error:", error);
    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR", message: "Failed to retrieve categories" },
      { status: 500 }
    );
  }
}
