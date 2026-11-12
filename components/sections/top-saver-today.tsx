"use client";

import * as React from "react";
import Link from "next/link";
import {
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Star,
  Mail,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Rating } from "@/components/ui/rating";
import { QuantityInput } from "@/components/ui/quantity-input";
import { ProductThumbnail } from "@/components/ui/product-thumbnail";
import { Product } from "@/lib/db";

interface TopSaverTodayProps {
  products?: Product[];
}

export function TopSaverToday({ products = [] }: TopSaverTodayProps) {
  const [timeLeft, setTimeLeft] = React.useState({ hours: 8, minutes: 25, seconds: 37 });
  const [quantity, setQuantity] = React.useState(1);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatPad = (n: number) => String(n).padStart(2, "0");

  const heroProduct = products[0];
  const standardProducts = products.slice(1, 4);

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-2 border-b border-border">
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
            Top Saver Today
          </h2>
          <Link
            href="#"
            className="text-xs font-semibold text-muted-foreground hover:text-amber-500 flex items-center gap-1"
          >
            <span>All Offers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Countdown Timer Badge */}
          <div className="flex items-center gap-2 bg-rose-600 text-white px-3 py-1 rounded-md text-xs font-bold shadow-sm">
            <Clock className="w-3.5 h-3.5" />
            <span>
              Expires in: {formatPad(timeLeft.hours)}:{formatPad(timeLeft.minutes)}:
              {formatPad(timeLeft.seconds)}
            </span>
          </div>
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

      {/* Main Grid: Hero Product + 3 Standard Products + Register Promo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
        {/* Left Hero Deal Card */}
        {heroProduct && (
          <div className="lg:col-span-3 rounded-2xl border-2 border-amber-400/80 bg-card p-5 flex flex-col justify-between shadow-sm relative">
            <div className="space-y-4">
              <Link href={`/products/${heroProduct.id}`} className="block">
                <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-border/50">
                  <ProductThumbnail
                    categorySlug={heroProduct.categorySlug}
                    brand={heroProduct.brand}
                    title={heroProduct.title}
                  />
                </div>
              </Link>

              <div>
                <span className="text-[11px] font-bold text-stone-600 dark:text-stone-300 uppercase">
                  {heroProduct.brand}
                </span>
                <Link href={`/products/${heroProduct.id}`}>
                  <h3 className="font-extrabold text-sm text-foreground leading-snug line-clamp-2 mt-0.5 hover:text-amber-600 transition-colors">
                    {heroProduct.title}
                  </h3>
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <Rating value={heroProduct.rating} readOnly size="sm" />
                <span className="text-[11px] text-muted-foreground font-semibold">
                  ({heroProduct.reviewCount})
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-amber-600 dark:text-amber-400">
                  {heroProduct.currency}
                  {heroProduct.price.toFixed(2)}
                </span>
                {heroProduct.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through font-medium">
                    {heroProduct.currency}
                    {heroProduct.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Stock sold status */}
              {heroProduct.soldCount && heroProduct.totalStock && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-stone-700 dark:text-stone-300">
                      Sold: {heroProduct.soldCount}/{heroProduct.totalStock}
                    </span>
                  </div>
                  <Progress
                    value={(heroProduct.soldCount / heroProduct.totalStock) * 100}
                    className="h-2 bg-muted [&>div]:bg-amber-400"
                  />
                </div>
              )}
            </div>

            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <QuantityInput
                  value={quantity}
                  onChange={setQuantity}
                  size="sm"
                  className="w-full justify-between"
                />
              </div>
              <Button
                aria-label={`Add ${heroProduct.title} to cart`}
                className="w-full bg-amber-400 hover:bg-amber-500 text-stone-900 font-bold h-10 shadow-sm gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add To Cart</span>
              </Button>
            </div>
          </div>
        )}

        {/* Middle 3 Standard Deal Cards */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {standardProducts.map((p) => {
            const soldPercent =
              p.soldCount && p.totalStock ? (p.soldCount / p.totalStock) * 100 : 50;

            return (
              <div
                key={p.id}
                className="rounded-2xl border border-border/80 bg-card p-4 flex flex-col justify-between hover:border-amber-400 hover:shadow-md transition-all group"
              >
                <div className="space-y-3">
                  <Link href={`/products/${p.id}`} className="block">
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-border/50">
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
                    </div>
                  </Link>

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

                  <div className="flex items-center gap-1.5">
                    <Rating value={p.rating} readOnly size="sm" />
                    <span className="text-[11px] text-muted-foreground">({p.reviewCount})</span>
                  </div>

                  <div className="flex items-baseline gap-2">
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

                {/* Sold status & Quick Add */}
                <div className="space-y-2 pt-3 mt-2 border-t border-border/50">
                  {p.soldCount && p.totalStock && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold text-muted-foreground">
                        <span>Sold: {p.soldCount}/{p.totalStock}</span>
                      </div>
                      <Progress value={soldPercent} className="h-1.5 bg-muted [&>div]:bg-amber-400" />
                    </div>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    aria-label={`Add ${p.title} to cart`}
                    className="w-full text-xs font-bold border-amber-300 dark:border-amber-800 hover:bg-amber-400 hover:text-stone-900 gap-1.5 transition-colors h-8"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add To Cart</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Register Promo Card */}
        <div className="lg:col-span-3 rounded-2xl bg-amber-50/90 dark:bg-stone-900 border border-amber-300 dark:border-stone-800 p-6 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <span className="text-3xl font-black text-rose-600 tracking-tight block">
                15% OFF
              </span>
              <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 leading-snug">
                For new member sign up at the first time
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                Join Farmart Club today for instant coupon codes, free local delivery & fresh weekly farm picks.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-3 pt-2">
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                <Input
                  type="email"
                  aria-label="Email address"
                  placeholder="Enter your email"
                  className="pl-9 text-xs h-10 bg-background"
                />
              </div>

              <Button
                type="submit"
                aria-label="Claim 15% Voucher"
                className="w-full bg-amber-400 hover:bg-amber-500 text-stone-900 font-extrabold text-xs h-10 shadow-sm"
              >
                Claim 15% Voucher
              </Button>
            </form>
          </div>

          <div className="pt-4 text-center border-t border-border/40">
            <span className="text-xs text-stone-600 dark:text-stone-400 font-medium">
              Instant voucher code sent directly to your inbox
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
