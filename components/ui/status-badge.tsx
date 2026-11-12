"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full border text-xs font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        subtle: "shadow-2xs",
        outline: "bg-background border-border text-foreground shadow-2xs hover:bg-muted/30",
        solid: "text-white border-transparent font-semibold shadow-2xs",
      },
      status: {
        online: "",
        offline: "",
        degraded: "",
        error: "",
        syncing: "",
      },
      size: {
        sm: "px-2 py-0.5 text-[11px] gap-1.5",
        md: "px-2.5 py-0.5 text-xs gap-1.5",
        lg: "px-3 py-1 text-sm gap-2",
      },
    },
    compoundVariants: [
      // Subtle variant: high-contrast light mode with visible borders + glowing dark mode
      {
        variant: "subtle",
        status: "online",
        className: "border-emerald-300/80 bg-emerald-50 text-emerald-950 dark:border-emerald-800/80 dark:bg-emerald-950/50 dark:text-emerald-300",
      },
      {
        variant: "subtle",
        status: "offline",
        className: "border-zinc-300 bg-zinc-100 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300",
      },
      {
        variant: "subtle",
        status: "degraded",
        className: "border-amber-300/90 bg-amber-50 text-amber-950 dark:border-amber-800/80 dark:bg-amber-950/50 dark:text-amber-300",
      },
      {
        variant: "subtle",
        status: "error",
        className: "border-rose-300/90 bg-rose-50 text-rose-950 dark:border-rose-800/80 dark:bg-rose-950/50 dark:text-rose-300",
      },
      {
        variant: "subtle",
        status: "syncing",
        className: "border-sky-300/90 bg-sky-50 text-sky-950 dark:border-sky-800/80 dark:bg-sky-950/50 dark:text-sky-300",
      },

      // Outline variant: crisp border with status-themed text
      {
        variant: "outline",
        status: "online",
        className: "border-emerald-500/50 text-emerald-900 dark:border-emerald-700/70 dark:text-emerald-300 bg-background",
      },
      {
        variant: "outline",
        status: "offline",
        className: "border-zinc-400/60 text-zinc-800 dark:border-zinc-700 dark:text-zinc-300 bg-background",
      },
      {
        variant: "outline",
        status: "degraded",
        className: "border-amber-500/60 text-amber-900 dark:border-amber-700/70 dark:text-amber-300 bg-background",
      },
      {
        variant: "outline",
        status: "error",
        className: "border-rose-500/60 text-rose-900 dark:border-rose-700/70 dark:text-rose-300 bg-background",
      },
      {
        variant: "outline",
        status: "syncing",
        className: "border-sky-500/60 text-sky-900 dark:border-sky-700/70 dark:text-sky-300 bg-background",
      },

      // Solid variant: punchy filled badges (WCAG AA > 4.5:1 compliant)
      {
        variant: "solid",
        status: "online",
        className: "bg-emerald-700 hover:bg-emerald-800",
      },
      {
        variant: "solid",
        status: "offline",
        className: "bg-zinc-700 hover:bg-zinc-800",
      },
      {
        variant: "solid",
        status: "degraded",
        className: "bg-amber-800 hover:bg-amber-900 text-amber-50",
      },
      {
        variant: "solid",
        status: "error",
        className: "bg-rose-700 hover:bg-rose-800",
      },
      {
        variant: "solid",
        status: "syncing",
        className: "bg-sky-700 hover:bg-sky-800",
      },
    ],
    defaultVariants: {
      variant: "subtle",
      status: "online",
      size: "md",
    },
  }
);

const dotVariants = cva("rounded-full shrink-0 ring-2 ring-current/20", {
  variants: {
    status: {
      online: "bg-emerald-600 dark:bg-emerald-400",
      offline: "bg-zinc-500 dark:bg-zinc-400",
      degraded: "bg-amber-600 dark:bg-amber-400",
      error: "bg-rose-600 dark:bg-rose-400",
      syncing: "bg-sky-600 dark:bg-sky-400",
    },
    variant: {
      subtle: "",
      outline: "",
      solid: "bg-white dark:bg-white ring-white/30",
    },
    size: {
      sm: "h-1.5 w-1.5",
      md: "h-2 w-2",
      lg: "h-2.5 w-2.5",
    },
  },
  defaultVariants: {
    status: "online",
    variant: "subtle",
    size: "md",
  },
});

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  pulse?: boolean;
  label?: string;
}

export function StatusBadge({
  status = "online",
  variant = "subtle",
  size = "md",
  pulse = false,
  label,
  children,
  className,
  ...props
}: StatusBadgeProps) {
  const effectiveStatus = status || "online";
  const effectiveVariant = variant || "subtle";
  const displayLabel =
    label ??
    (children ||
      effectiveStatus.charAt(0).toUpperCase() + effectiveStatus.slice(1));

  return (
    <span
      role="status"
      aria-label={`Status: ${displayLabel}`}
      className={cn(statusBadgeVariants({ status: effectiveStatus, variant: effectiveVariant, size }), className)}
      {...props}
    >
      {effectiveStatus === "syncing" ? (
        <Loader2 className={cn("animate-spin shrink-0", size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} />
      ) : (
        <span className="relative flex shrink-0 items-center justify-center">
          {pulse && effectiveStatus !== "offline" && (
            <span
              className={cn(
                "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                dotVariants({ status: effectiveStatus, variant: effectiveVariant, size })
              )}
            />
          )}
          <span className={cn(dotVariants({ status: effectiveStatus, variant: effectiveVariant, size }))} />
        </span>
      )}
      <span>{displayLabel}</span>
    </span>
  );
}
