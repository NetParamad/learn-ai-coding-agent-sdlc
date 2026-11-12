import * as React from "react";
import {
  Apple,
  Beef,
  Fish,
  Croissant,
  Wine,
  Coffee,
  Milk,
  PawPrint,
  Package,
  Beer,
} from "lucide-react";

interface ProductThumbnailProps {
  categorySlug?: string;
  brand?: string;
  title?: string;
  className?: string;
}

export function ProductThumbnail({
  categorySlug,
  brand,
  title,
  className = "",
}: ProductThumbnailProps) {
  let IconComponent = Package;
  let bgClass = "bg-amber-50/80 dark:bg-muted/60 text-amber-600 dark:text-amber-400";

  const lowerTitle = (title || "").toLowerCase();

  if (
    categorySlug === "fruits-vegetables" ||
    lowerTitle.includes("orange") ||
    lowerTitle.includes("melon")
  ) {
    IconComponent = Apple;
    bgClass = "bg-emerald-50/80 dark:bg-muted/60 text-emerald-600 dark:text-emerald-400";
  } else if (
    categorySlug === "raw-meats" ||
    lowerTitle.includes("beef") ||
    lowerTitle.includes("meat") ||
    lowerTitle.includes("sausage")
  ) {
    IconComponent = Beef;
    bgClass = "bg-rose-50/80 dark:bg-muted/60 text-rose-600 dark:text-rose-400";
  } else if (
    categorySlug === "breads-sweets" ||
    lowerTitle.includes("bread") ||
    lowerTitle.includes("cookie") ||
    lowerTitle.includes("snack") ||
    lowerTitle.includes("honey")
  ) {
    IconComponent = Croissant;
    bgClass = "bg-amber-50/80 dark:bg-muted/60 text-amber-600 dark:text-amber-400";
  } else if (
    categorySlug === "frozen-seafoods" ||
    lowerTitle.includes("fish") ||
    lowerTitle.includes("seafood")
  ) {
    IconComponent = Fish;
    bgClass = "bg-cyan-50/80 dark:bg-muted/60 text-cyan-600 dark:text-cyan-400";
  } else if (
    categorySlug === "wines-alcohol" ||
    lowerTitle.includes("beer") ||
    lowerTitle.includes("ice cool")
  ) {
    IconComponent = Beer;
    bgClass = "bg-purple-50/80 dark:bg-muted/60 text-purple-600 dark:text-purple-400";
  } else if (
    categorySlug === "milks-dairies" ||
    lowerTitle.includes("milk") ||
    lowerTitle.includes("juice")
  ) {
    IconComponent = Milk;
    bgClass = "bg-blue-50/80 dark:bg-muted/60 text-blue-600 dark:text-blue-400";
  } else if (
    categorySlug === "coffees-teas" ||
    lowerTitle.includes("coffee") ||
    lowerTitle.includes("tea")
  ) {
    IconComponent = Coffee;
    bgClass = "bg-amber-50/80 dark:bg-muted/60 text-amber-700 dark:text-amber-500";
  } else if (categorySlug === "pet-foods") {
    IconComponent = PawPrint;
    bgClass = "bg-stone-100 dark:bg-muted/60 text-stone-600 dark:text-stone-300";
  }

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center p-3 ${bgClass} ${className}`}
    >
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-background/90 dark:bg-background/60 shadow-xs border border-border/40 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
        <IconComponent className="w-7 h-7 sm:w-8 sm:h-8" />
      </div>
      {brand && (
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mt-2 line-clamp-1">
          {brand}
        </span>
      )}
    </div>
  );
}
