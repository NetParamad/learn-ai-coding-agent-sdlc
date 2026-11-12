"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ShoppingCart, Check, Star, Package } from "lucide-react";

export interface ProductColorOption {
  name: string;
  value: string; // CSS color string or class
}

export interface ProductCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: string;
  price: number | string;
  originalPrice?: number | string;
  currency?: string;
  imageSrc?: string;
  imageAlt?: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  colors?: ProductColorOption[];
  selectedColor?: string;
  onSelectColor?: (colorName: string) => void;
  onAddToCart?: () => void;
  isAdded?: boolean;
  isLoading?: boolean;
  aspectRatio?: number;
}

export function ProductCard({
  title,
  price,
  originalPrice,
  currency = "$",
  imageSrc,
  imageAlt,
  category,
  rating,
  reviewCount,
  badge,
  colors,
  selectedColor,
  onSelectColor,
  onAddToCart,
  isAdded = false,
  isLoading = false,
  aspectRatio = 4 / 3,
  className,
  ...props
}: ProductCardProps) {
  const [internalColor, setInternalColor] = React.useState<string>(
    selectedColor || (colors?.[0]?.name ?? "")
  );

  const currentColor = selectedColor !== undefined ? selectedColor : internalColor;

  const handleColorChange = (name: string) => {
    setInternalColor(name);
    onSelectColor?.(name);
  };

  const formattedPrice =
    typeof price === "number" ? `${currency}${price.toFixed(2)}` : `${currency}${price}`;
  const formattedOriginalPrice =
    originalPrice !== undefined
      ? typeof originalPrice === "number"
        ? `${currency}${originalPrice.toFixed(2)}`
        : `${currency}${originalPrice}`
      : undefined;

  return (
    <Card
      className={cn(
        "group overflow-hidden rounded-xl border transition-all duration-200 hover:shadow-md",
        className
      )}
      {...props}
    >
      <div className="relative overflow-hidden bg-muted">
        <AspectRatio ratio={aspectRatio}>
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt || title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex flex-col h-full w-full items-center justify-center bg-muted/40 text-muted-foreground gap-2 p-4">
              <Package className="h-8 w-8 stroke-[1.25] text-muted-foreground/60" />
              <span className="text-xs font-medium tracking-tight text-muted-foreground/80">Product Preview</span>
            </div>
          )}
        </AspectRatio>
        {badge && (
          <div className="absolute top-2.5 left-2.5">
            <Badge variant="default" className="shadow-sm font-medium text-xs">
              {badge}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-2">
        {category && (
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {category}
          </p>
        )}

        <h3 className="line-clamp-1 font-semibold text-foreground tracking-tight transition-colors group-hover:text-primary">
          {title}
        </h3>

        {rating !== undefined && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="flex items-center text-amber-500">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span className="ml-1 font-medium text-foreground">{rating}</span>
            </div>
            {reviewCount !== undefined && (
              <span className="text-muted-foreground">({reviewCount})</span>
            )}
          </div>
        )}

        {colors && colors.length > 0 && (
          <div className="flex items-center gap-1.5 pt-1">
            {colors.map((c) => {
              const isSelected = currentColor === c.name;
              return (
                <button
                  key={c.name}
                  type="button"
                  title={c.name}
                  aria-label={c.name}
                  onClick={() => handleColorChange(c.name)}
                  className={cn(
                    "h-4 w-4 rounded-full border transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                    isSelected ? "ring-2 ring-primary ring-offset-1 scale-110" : "opacity-80 hover:opacity-100"
                  )}
                  style={{ backgroundColor: c.value }}
                />
              );
            })}
          </div>
        )}

        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-base font-bold text-foreground">{formattedPrice}</span>
          {formattedOriginalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formattedOriginalPrice}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          variant={isAdded ? "secondary" : "default"}
          size="sm"
          className="w-full gap-2 transition-all"
          disabled={isLoading}
          onClick={onAddToCart}
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              <span>{isLoading ? "Adding..." : "Add to Cart"}</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
