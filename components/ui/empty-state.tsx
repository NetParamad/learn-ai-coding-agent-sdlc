"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center text-center p-8 transition-colors",
  {
    variants: {
      variant: {
        default: "rounded-xl border border-border bg-card text-card-foreground shadow-xs",
        dashed: "rounded-xl border-2 border-dashed border-border bg-muted/20 text-foreground",
        minimal: "rounded-lg bg-transparent text-foreground",
      },
      size: {
        sm: "p-6 max-w-sm",
        md: "p-8 max-w-md",
        lg: "p-12 max-w-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  icon?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  variant,
  size,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      role="region"
      aria-label={title}
      className={cn(emptyStateVariants({ variant, size }), "mx-auto w-full", className)}
      {...props}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground ring-8 ring-muted/30">
        {icon || <Inbox className="h-6 w-6 stroke-[1.5]" />}
      </div>
      <h3 className="text-base font-semibold text-foreground tracking-tight">{title}</h3>
      {description && (
        <div className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-xs sm:max-w-sm">
          {typeof description === "string" ? <p>{description}</p> : description}
        </div>
      )}
      {(action || secondaryAction) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}
