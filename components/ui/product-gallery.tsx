"use client";

import * as React from "react";
import { Heart, Share2, ZoomIn, ShieldCheck, Sparkles, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductThumbnail } from "@/components/ui/product-thumbnail";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface ProductGalleryProps {
  title: string;
  brand: string;
  categorySlug: string;
  badge?: string;
  price: number;
  originalPrice?: number;
  className?: string;
}

export function ProductGallery({
  title,
  brand,
  categorySlug,
  badge,
  price,
  originalPrice,
  className,
}: ProductGalleryProps) {
  const [activeAngle, setActiveAngle] = React.useState(0);
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [isZoomed, setIsZoomed] = React.useState(false);

  const discountPercent = originalPrice && originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  const galleryAngles = [
    { id: 0, label: "Main Pack", hint: "Front View" },
    { id: 1, label: "Organic Seal", hint: "Farm Harvest" },
    { id: 2, label: "Nutrition", hint: "Specs & Weight" },
    { id: 3, label: "Storage", hint: "Cold Chain" },
  ];

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      toast.success("Link copied to clipboard", {
        description: "Share this farm-fresh deal with family and friends.",
      });
    }
  };

  const handleToggleWishlist = () => {
    setIsWishlisted((prev) => {
      const next = !prev;
      if (next) {
        toast.success("Added to Wishlist", {
          description: `${title} saved to your favorites.`,
        });
      } else {
        toast.info("Removed from Wishlist");
      }
      return next;
    });
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Image Showcase Frame */}
      <div className="relative aspect-square w-full rounded-2xl border border-border/80 bg-muted/20 dark:bg-muted/40 p-6 sm:p-8 flex items-center justify-center overflow-hidden shadow-xs group">
        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
          {discountPercent && (
            <Badge className="bg-amber-400 text-stone-900 hover:bg-amber-500 font-black text-xs px-2.5 py-0.5 shadow-xs border-0 uppercase tracking-wider">
              SAVE {discountPercent}%
            </Badge>
          )}
          {badge && (
            <Badge className="bg-rose-600 text-white font-black text-xs px-2.5 py-0.5 border-0 uppercase tracking-wider">
              {badge}
            </Badge>
          )}
          <Badge variant="outline" className="bg-background/90 text-foreground font-semibold text-[11px] gap-1 border-border/70 backdrop-blur-xs">
            <Sparkles className="h-3 w-3 text-amber-500" />
            100% Organic
          </Badge>
        </div>

        {/* Top Right Floating Action Buttons */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleToggleWishlist}
            aria-label="Save to wishlist"
            className={cn(
              "h-9 w-9 rounded-full bg-background/90 backdrop-blur-xs border-border/70 shadow-xs transition-colors",
              isWishlisted
                ? "bg-rose-50 text-rose-600 border-rose-300 dark:bg-muted dark:text-rose-400"
                : "text-muted-foreground hover:text-foreground hover:bg-background"
            )}
          >
            <Heart className={cn("h-4 w-4", isWishlisted && "fill-current text-rose-600 dark:text-rose-400")} />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleShare}
            aria-label="Share product"
            className="h-9 w-9 rounded-full bg-background/90 backdrop-blur-xs border-border/70 text-muted-foreground hover:text-foreground hover:bg-background shadow-xs transition-colors"
          >
            <Share2 className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setIsZoomed((z) => !z)}
            aria-label="Zoom view"
            className="h-9 w-9 rounded-full bg-background/90 backdrop-blur-xs border-border/70 text-muted-foreground hover:text-foreground hover:bg-background shadow-xs transition-colors"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        {/* Main Product Thumbnail Illustration */}
        <div className={cn(
          "w-full h-full flex items-center justify-center transition-transform duration-300",
          isZoomed ? "scale-125" : "group-hover:scale-105"
        )}>
          <ProductThumbnail
            categorySlug={categorySlug}
            brand={brand}
            title={title}
            className="w-48 h-48 sm:w-64 sm:h-64"
          />
        </div>

        {/* Bottom Status Ribbon */}
        <div className="absolute bottom-3 inset-x-3 px-3 py-1.5 rounded-xl bg-background/90 backdrop-blur-md border border-border/60 flex items-center justify-between text-[11px] text-muted-foreground font-medium">
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
            <ShieldCheck className="h-3.5 w-3.5" /> Farm Fresh Guaranteed
          </span>
          <span className="hidden sm:inline font-mono">{galleryAngles[activeAngle].hint}</span>
        </div>
      </div>

      {/* Thumbnails Gallery Selector */}
      <div className="grid grid-cols-4 gap-2.5">
        {galleryAngles.map((angle) => {
          const isActive = activeAngle === angle.id;
          return (
            <button
              key={angle.id}
              type="button"
              onClick={() => {
                setActiveAngle(angle.id);
                setIsZoomed(false);
              }}
              className={cn(
                "group relative aspect-square rounded-xl border p-2 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer bg-background",
                isActive
                  ? "border-amber-400 bg-amber-50/50 dark:bg-muted/60 ring-2 ring-amber-400/40 shadow-xs"
                  : "border-border/70 hover:border-border hover:bg-muted/40"
              )}
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <ProductThumbnail
                  categorySlug={categorySlug}
                  brand={brand}
                  title={title}
                  className="w-10 h-10"
                />
              </div>
              <span className={cn(
                "text-[10px] font-bold tracking-tight truncate max-w-full px-1",
                isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
              )}>
                {angle.label}
              </span>
              {isActive && (
                <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-amber-400 text-stone-900 flex items-center justify-center shadow-xs">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
