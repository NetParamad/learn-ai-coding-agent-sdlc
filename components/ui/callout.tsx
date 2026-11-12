"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Info, Lightbulb, AlertTriangle, AlertCircle, CheckCircle2, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const calloutVariants = cva(
  "relative w-full rounded-xl border p-4 text-xs sm:text-sm leading-relaxed",
  {
    variants: {
      variant: {
        note: "border-border bg-muted/30 text-foreground [&>svg]:text-muted-foreground",
        info: "border-blue-500/20 bg-blue-500/5 text-blue-950 dark:text-blue-100 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
        tip: "border-green-500/20 bg-green-500/5 text-green-950 dark:text-green-100 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
        warning: "border-yellow-500/20 bg-yellow-500/5 text-yellow-950 dark:text-yellow-100 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400",
        danger: "border-destructive/20 bg-destructive/5 text-destructive dark:text-red-200 [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "note",
    },
  }
);

const defaultIcons: Record<string, LucideIcon> = {
  note: Info,
  info: Info,
  tip: Lightbulb,
  warning: AlertTriangle,
  danger: AlertCircle,
};

export interface CalloutProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof calloutVariants> {
  title?: React.ReactNode;
  icon?: LucideIcon;
  children?: React.ReactNode;
}

export function Callout({
  variant = "note",
  title,
  icon: Icon,
  children,
  className,
  ...props
}: CalloutProps) {
  const SelectedIcon = Icon || defaultIcons[variant || "note"] || Info;

  return (
    <div className={cn(calloutVariants({ variant }), "flex gap-3", className)} {...props}>
      <SelectedIcon className="h-5 w-5 shrink-0 mt-0.5" />
      <div className="space-y-1 flex-1 min-w-0">
        {title && (
          <div className="font-semibold text-xs sm:text-sm tracking-tight text-foreground">
            {title}
          </div>
        )}
        <div className="text-muted-foreground [&_p]:leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
