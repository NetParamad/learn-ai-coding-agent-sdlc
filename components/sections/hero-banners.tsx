"use client";

import * as React from "react";
import { ArrowRight, Sparkles, Milk, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Banner } from "@/lib/db";

interface HeroBannersProps {
  banners?: Banner[];
}

export function HeroBanners({ banners = [] }: HeroBannersProps) {
  const mainBanner = banners.find((b) => b.type === "hero_main") || {
    title: "Active Summer With Juice Milk 300ml",
    subtitle: "New arrivals with delicious fruits, juice drinks, essential for summer.",
    buttonText: "Shop Now",
  };

  const sideBanner = banners.find((b) => b.type === "hero_side") || {
    title: "Synthetic seeds Net 2.0 OZ",
    discountBadge: "20% SALE OFF",
    buttonText: "Shop Now",
  };

  return (
    <section className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Banner (Left) */}
        <div className="lg:col-span-8 rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50/60 to-yellow-100/40 dark:from-stone-900 dark:via-stone-900/90 dark:to-stone-900 p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between min-h-[340px] border border-amber-200/50 dark:border-amber-900/20 shadow-sm">
          <div className="max-w-md z-10 space-y-4">
            <Badge className="bg-amber-400 text-stone-900 font-extrabold uppercase tracking-wide text-[11px] border-0 hover:bg-amber-400">
              Fresh Deals
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-amber-400 tracking-tight leading-tight text-balance">
              {mainBanner.title}
            </h1>
            {mainBanner.subtitle && (
              <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed text-pretty">
                {mainBanner.subtitle}
              </p>
            )}
            <div className="pt-2">
              <Button className="bg-stone-900 text-white hover:bg-stone-800 dark:bg-amber-400 dark:text-stone-900 dark:hover:bg-amber-500 font-bold px-6 h-11 rounded-lg shadow-sm gap-2">
                <span>{mainBanner.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Graphical Mockup Accent */}
          <div className="absolute -right-6 -bottom-6 w-72 sm:w-96 h-72 sm:h-96 opacity-90 pointer-events-none flex items-center justify-center">
            <div className="w-56 h-64 bg-gradient-to-tr from-amber-400 via-orange-400 to-yellow-300 rounded-3xl rotate-12 shadow-2xl flex flex-col items-center justify-center p-6 text-stone-900 border-4 border-white/40">
              <Milk className="w-20 h-20 mb-2 stroke-[1.5]" />
              <span className="font-black text-2xl tracking-tighter uppercase">Juice Milk</span>
              <span className="text-xs font-bold opacity-80">300ml Tropical Fresh</span>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="z-10 flex items-center gap-1.5 pt-6">
            <span className="w-6 h-2 rounded-full bg-amber-500 inline-block" />
            <span className="w-2 h-2 rounded-full bg-border inline-block" />
          </div>
        </div>

        {/* Side Promo Card (Right) */}
        <div className="lg:col-span-4 rounded-2xl bg-amber-400 text-stone-900 p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between min-h-[340px] shadow-sm">
          <div className="space-y-4 z-10">
            {sideBanner.discountBadge && (
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-stone-900 text-balance">
                {sideBanner.discountBadge}
              </h2>
            )}
            <p className="text-base sm:text-lg font-bold text-stone-900/90 leading-snug text-balance">
              {sideBanner.title}
            </p>
            <div className="pt-2">
              <Button
                variant="outline"
                className="bg-white hover:bg-stone-100 text-stone-900 font-bold border-0 h-10 px-6 rounded-lg shadow-sm gap-2"
              >
                <span>{sideBanner.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Packaging Illustration Accent */}
          <div className="absolute -right-4 -bottom-4 w-48 h-48 pointer-events-none flex items-center justify-center">
            <div className="w-36 h-44 bg-white/90 rounded-2xl -rotate-6 shadow-xl flex flex-col items-center justify-center p-4 border-2 border-stone-100 text-stone-900">
              <Package className="w-14 h-14 text-emerald-600 mb-2" />
              <span className="font-extrabold text-sm uppercase tracking-tight">Food Box</span>
              <span className="text-xs text-stone-700 dark:text-stone-300 font-semibold">Mockup Pack</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
