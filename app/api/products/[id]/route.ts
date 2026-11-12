import { NextRequest, NextResponse } from "next/server";
import { getProductById, getRelatedProducts } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = getProductById(id);

    if (!product) {
      return NextResponse.json(
        { error: "NOT_FOUND", message: `Product with ID '${id}' not found` },
        { status: 404 }
      );
    }

    const related = getRelatedProducts(product.categorySlug, product.id, 5);

    return NextResponse.json(
      {
        ...product,
        related,
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR", message: "Failed to retrieve product details" },
      { status: 500 }
    );
  }
}
