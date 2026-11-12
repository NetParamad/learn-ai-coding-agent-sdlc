import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductThumbnail } from "@/components/ui/product-thumbnail";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getCategories, searchProducts } from "@/lib/db";
import { Search, Package, Sparkles, Filter } from "lucide-react";

export const dynamic = "force-dynamic";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; categorySlug?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search: "${q}" | Farmart` : "Catalog Search | Farmart",
    description: `Find organic fresh groceries matching "${q || ""}" at Farmart.`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "", categorySlug = "" } = await searchParams;

  const categories = getCategories();
  const { products, total } = searchProducts({
    query: q,
    categorySlug: categorySlug || undefined,
    limit: 50,
  });

  const popularSearches = ["Beef", "Apples", "Ice Cool", "Tea", "Organic", "Juice"];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-amber-400 selection:text-stone-900">
      <Header categories={categories} />

      <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb className="text-xs">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-bold text-foreground">
                Search Results
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Search Header Banner */}
        <div className="p-6 rounded-2xl border border-border/80 bg-muted/20 dark:bg-muted/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-400 text-stone-900">
                <Search className="h-4 w-4" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                {q ? `Search Results for "${q}"` : "All Catalog Products"}
              </h1>
            </div>
            <p className="text-xs text-muted-foreground">
              Found <strong className="text-foreground">{total}</strong> products matching your query
              {categorySlug ? ` in selected category` : ""}.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
            <Link
              href={`/search?q=${encodeURIComponent(q)}`}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 ${
                !categorySlug
                  ? "bg-amber-400 text-stone-900"
                  : "bg-background border border-border/70 text-muted-foreground hover:text-foreground"
              }`}
            >
              All Categories
            </Link>
            {categories.map((cat) => {
              const isActive = categorySlug === cat.slug;
              return (
                <Link
                  key={cat.id}
                  href={`/search?q=${encodeURIComponent(q)}&categorySlug=${cat.slug}`}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 ${
                    isActive
                      ? "bg-amber-400 text-stone-900"
                      : "bg-background border border-border/70 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Results Grid or Empty State */}
        {total === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-dashed border-border/80 bg-card space-y-4 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto">
              <Package className="h-7 w-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-foreground">No matching products found</h3>
              <p className="text-xs text-muted-foreground">
                We couldn't find anything matching "{q}". Try checking spelling or using a broader term.
              </p>
            </div>

            <div className="pt-2 space-y-2">
              <span className="text-[11px] font-bold text-muted-foreground uppercase">Popular Searches:</span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {popularSearches.map((term) => (
                  <Link
                    key={term}
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="px-3 py-1 text-xs font-bold rounded-lg border border-border/70 bg-background hover:bg-amber-400 hover:text-stone-900 hover:border-amber-400 transition-colors"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="rounded-2xl border border-border/80 bg-card p-4 flex flex-col justify-between hover:border-amber-400 hover:shadow-lg transition-all duration-200 group relative"
              >
                <div className="space-y-3">
                  <div className="relative aspect-square w-full rounded-xl bg-muted/40 flex items-center justify-center p-3 border border-border/50 overflow-hidden">
                    {p.badge && (
                      <Badge className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5 border-0 z-10">
                        {p.badge}
                      </Badge>
                    )}
                    <ProductThumbnail
                      categorySlug={p.categorySlug}
                      brand={p.brand}
                      title={p.title}
                    />
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-stone-600 dark:text-stone-300 uppercase">
                      {p.brand}
                    </span>
                    <h3 className="font-bold text-xs text-foreground leading-snug line-clamp-2 mt-0.5 group-hover:text-amber-600 transition-colors">
                      {p.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Rating value={p.rating} readOnly size="sm" />
                    <span className="text-[11px] text-muted-foreground">({p.reviewCount})</span>
                  </div>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-base font-black text-foreground">
                      {p.currency}{p.price.toFixed(2)}
                    </span>
                    {p.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        {p.currency}{p.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs font-bold rounded-xl border-border/80 hover:bg-amber-400 hover:text-stone-900 hover:border-amber-400 transition-colors"
                  >
                    View Details
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
