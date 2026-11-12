import { NextRequest, NextResponse } from "next/server";
import { getBanners } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const type = request.nextUrl.searchParams.get("type");
    let banners = getBanners();

    if (type === "hero_main" || type === "hero_side") {
      banners = banners.filter((b) => b.type === type);
    }

    return NextResponse.json(banners, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("GET /api/banners error:", error);
    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR", message: "Failed to retrieve banners" },
      { status: 500 }
    );
  }
}
