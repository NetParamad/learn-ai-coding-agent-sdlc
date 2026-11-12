"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShoppingCart, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { ProductThumbnail } from "@/components/ui/product-thumbnail";
import { Product, Category } from "@/lib/db";

interface ProductTabsSectionProps {
  title: string;
  categories?: Category[];
  products?: Product[];
}

export function ProductTabsSection({
  title,
  categories = [],
  products = [],
}: ProductTabsSectionProps) {
  const [activeCategory, setActiveCategory] = React.useState("all");

  const tabOptions = [
    { slug: "all", name: "All" },
    ...categories.map((c) => ({ slug: c.slug, name: c.name })),
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.categorySlug === activeCategory);

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Section Header with Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-2 border-b border-border">
        <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight shrink-0">
          {title}
        </h2>

        {/* Scrollable Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {tabOptions.slice(0, 7).map((tab) => {
            const isActive = activeCategory === tab.slug;
            return (
              <button
                key={tab.slug}
                onClick={() => setActiveCategory(tab.slug)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all shrink-0 ${
                  isActive
                    ? "bg-amber-400 text-stone-900 shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Carousel arrows */}
        <div className="hidden lg:flex items-center gap-1.5 shrink-0">
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full border-border hover:bg-amber-400 hover:text-stone-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full border-border hover:bg-amber-400 hover:text-stone-900 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-border/80 bg-card p-4 flex flex-col justify-between hover:border-amber-400 hover:shadow-lg transition-all duration-200 group relative"
          >
            <div className="space-y-3">
              {/* Product Thumbnail & Badges */}
              <Link
                href={`/products/${p.id}`}
                className="relative aspect-square w-full rounded-xl bg-muted/40 flex items-center justify-center p-3 border border-border/50 overflow-hidden block"
              >
                {p.badge && (
                  <Badge className="absolute top-2 left-2 bg-rose-600 text-white text-[11px] font-bold px-1.5 py-0.5 border-0 z-10">
                    {p.badge}
                  </Badge>
                )}

                <ProductThumbnail
                  categorySlug={p.categorySlug}
                  brand={p.brand}
                  title={p.title}
                />
              </Link>

              {/* Title & Brand */}
              <div>
                <span className="text-[11px] font-bold text-stone-600 dark:text-stone-300 uppercase">
                  {p.brand}
                </span>
                <Link href={`/products/${p.id}`}>
                  <h3 className="font-bold text-xs text-foreground leading-snug line-clamp-2 mt-0.5 group-hover:text-amber-600 transition-colors">
                    {p.title}
                  </h3>
                </Link>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1.5">
                <Rating value={p.rating} readOnly size="sm" />
                <span className="text-[11px] text-muted-foreground">({p.reviewCount})</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-base font-black text-foreground">
                  {p.currency}
                  {p.price.toFixed(2)}
                </span>
                {p.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    {p.currency}
                    {p.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Add to cart button */}
            <div className="pt-3 mt-2">
              <Button
                variant="outline"
                size="sm"
                aria-label={`Add ${p.title} to cart`}
                className="w-full text-xs font-bold border-amber-300 dark:border-amber-800 hover:bg-amber-400 hover:text-stone-900 gap-1.5 transition-colors"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add To Cart</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
