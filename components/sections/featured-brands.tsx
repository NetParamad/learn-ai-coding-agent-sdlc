"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Package, Coffee, Beer, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Brand } from "@/lib/db";

interface FeaturedBranchesProps {
  brands?: Brand[];
}

const brandIcons: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  b1: { icon: Package, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50/80 dark:bg-muted/60 border-purple-200/60 dark:border-border" },
  b2: { icon: Coffee, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50/80 dark:bg-muted/60 border-amber-200/60 dark:border-border" },
  b3: { icon: Beer, color: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-50/80 dark:bg-muted/60 border-cyan-200/60 dark:border-border" },
  b4: { icon: Store, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50/80 dark:bg-muted/60 border-emerald-200/60 dark:border-border" },
};

export function FeaturedBranches({ brands = [] }: FeaturedBranchesProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="container mx-auto px-4 py-6 sm:py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-baseline gap-3 sm:gap-4">
          <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
            Featured Brands
          </h2>
          <Link
            href="#"
            className="text-xs font-semibold text-muted-foreground hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1 transition-colors"
          >
            <span>All Offers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            aria-label="Previous brands"
            className="w-8 h-8 rounded-full border-border/80 hover:bg-amber-400 hover:text-stone-900 hover:border-amber-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            aria-label="Next brands"
            className="w-8 h-8 rounded-full border-border/80 hover:bg-amber-400 hover:text-stone-900 hover:border-amber-400 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Brand Grid */}
      <div
        ref={scrollRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {brands.map((b) => {
          const config = brandIcons[b.id] || {
            icon: Store,
            color: "text-amber-600 dark:text-amber-400",
            bg: "bg-amber-50/80 dark:bg-muted/60 border-amber-200/60 dark:border-border",
          };
          const IconComponent = config.icon;

          return (
            <Link
              key={b.id}
              href={`#brand-${b.id}`}
              className="group flex flex-col cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-2xl"
            >
              {/* Top Icon Emblem Container */}
              <div
                className={`relative aspect-[16/10] w-full rounded-2xl overflow-hidden ${config.bg} border shadow-xs flex flex-col items-center justify-center gap-2 p-4`}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-background/90 dark:bg-background/60 shadow-sm border border-border/50 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                  <IconComponent className={`w-7 h-7 sm:w-8 sm:h-8 ${config.color}`} />
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-foreground/80">
                  {b.name}
                </span>
              </div>

              {/* Bottom Meta Text */}
              <div className="mt-3 space-y-1">
                <span className="text-[11px] font-bold tracking-wider text-muted-foreground/80 uppercase block">
                  {b.name}
                </span>
                <h3 className="text-xs sm:text-sm font-extrabold text-foreground leading-snug line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {b.promoText}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
