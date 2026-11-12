import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const query = searchParams.get("search") || undefined;
    const categorySlug = searchParams.get("categorySlug") || undefined;
    const brand = searchParams.get("brand") || undefined;
    const isTopSaver = searchParams.get("isTopSaver") === "true";
    const isBestSeller = searchParams.get("isBestSeller") === "true";
    const isJustLanding = searchParams.get("isJustLanding") === "true";
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : 20;
    const offset = searchParams.get("offset") ? parseInt(searchParams.get("offset")!, 10) : 0;

    const result = searchProducts({
      query,
      categorySlug,
      brand,
      isTopSaver,
      isBestSeller,
      isJustLanding,
      limit,
      offset,
    });

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR", message: "Failed to retrieve products" },
      { status: 500 }
    );
  }
}
