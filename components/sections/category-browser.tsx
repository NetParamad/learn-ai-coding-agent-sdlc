"use client";

import * as React from "react";
import Link from "next/link";
import {
  Apple,
  Croissant,
  Fish,
  Beef,
  Wine,
  Coffee,
  Milk,
  PawPrint,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Category } from "@/lib/db";

interface CategoryBrowserProps {
  categories?: Category[];
}

const iconMap: Record<string, React.ReactNode> = {
  Apple: <Apple className="w-8 h-8 text-amber-600" />,
  Croissant: <Croissant className="w-8 h-8 text-amber-500" />,
  Fish: <Fish className="w-8 h-8 text-cyan-500" />,
  Beef: <Beef className="w-8 h-8 text-rose-500" />,
  Wine: <Wine className="w-8 h-8 text-purple-500" />,
  Coffee: <Coffee className="w-8 h-8 text-amber-700" />,
  Milk: <Milk className="w-8 h-8 text-blue-500" />,
  PawPrint: <PawPrint className="w-8 h-8 text-stone-600 dark:text-stone-300" />,
};

export function CategoryBrowser({ categories = [] }: CategoryBrowserProps) {
  return (
    <section className="container mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-border">
        <div className="flex items-baseline gap-4">
          <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
            Browse by Category
          </h2>
          <Link
            href="#"
            className="text-xs font-semibold text-muted-foreground hover:text-amber-500 flex items-center gap-1"
          >
            <span>All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Carousel arrows */}
        <div className="flex items-center gap-1.5">
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

      {/* Categories Grid / Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`#${cat.slug}`}
            className="group flex flex-col items-center text-center p-3 rounded-xl border border-border/60 hover:border-amber-400 hover:shadow-md bg-card transition-all duration-200"
          >
            <div className="w-16 h-16 rounded-xl bg-muted/60 flex items-center justify-center mb-3 transition-colors">
              {iconMap[cat.icon] || <Apple className="w-8 h-8 text-amber-500" />}
            </div>
            <span className="text-xs font-bold text-foreground leading-snug group-hover:text-amber-600 transition-colors line-clamp-2">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
