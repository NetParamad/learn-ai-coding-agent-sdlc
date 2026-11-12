import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { ProductDetailView } from "@/components/sections/product-detail-view";
import {
  getProductById,
  getCategories,
  getRelatedProducts,
  getCategoryBySlug,
  getAllProducts,
} from "@/lib/db";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found | Farmart",
      description: "The requested organic product could not be found.",
    };
  }

  return {
    title: `${product.title} - ${product.brand} | Farmart`,
    description: `Order fresh ${product.title} online. Organic, temperature-controlled delivery direct from regional farms.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const categories = getCategories();
  const category = getCategoryBySlug(product.categorySlug);
  const relatedProducts = getRelatedProducts(product.categorySlug, product.id, 5);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-amber-400 selection:text-stone-900">
      <Header categories={categories} />

      <main className="flex-1">
        <ProductDetailView
          product={product}
          category={category}
          relatedProducts={relatedProducts}
        />
      </main>

      <Footer />
    </div>
  );
}
