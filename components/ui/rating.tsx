"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  defaultValue?: number;
  max?: number;
  readOnly?: boolean;
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
  onChange?: (val: number) => void;
}

export function Rating({
  value: controlledValue,
  defaultValue = 0,
  max = 5,
  readOnly = false,
  disabled = false,
  size = "default",
  onChange,
  className,
  ...props
}: RatingProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const displayValue = hoverValue !== null ? hoverValue : value;

  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    default: "h-5 w-5",
    lg: "h-6 w-6",
  }[size];

  const handleClick = (rating: number) => {
    if (readOnly || disabled) return;
    if (controlledValue === undefined) {
      setInternalValue(rating);
    }
    onChange?.(rating);
  };

  return (
    <div
      role="radiogroup"
      aria-label={`Rating: ${value} out of ${max} stars`}
      className={cn(
        "inline-flex items-center gap-1",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onMouseLeave={() => !readOnly && !disabled && setHoverValue(null)}
      {...props}
    >
      {Array.from({ length: max }).map((_, index) => {
        const starRating = index + 1;
        const isFilled = starRating <= displayValue;

        return (
          <button
            key={index}
            type="button"
            disabled={disabled || readOnly}
            onClick={() => handleClick(starRating)}
            onMouseEnter={() => !readOnly && !disabled && setHoverValue(starRating)}
            aria-label={`${starRating} star${starRating > 1 ? "s" : ""}`}
            className={cn(
              "inline-flex items-center justify-center rounded-sm transition-transform duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring touch-manipulation",
              !readOnly && !disabled ? "min-h-[32px] min-w-[32px] sm:min-h-0 sm:min-w-0 p-1 sm:p-0.5 hover:scale-110 cursor-pointer" : "p-0.5"
            )}
          >
            <Star
              className={cn(
                sizeClasses,
                "transition-colors",
                isFilled
                  ? "fill-amber-400 text-amber-400"
                  : "fill-muted/40 text-muted-foreground/30"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
