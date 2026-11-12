"use client";

import * as React from "react";
import { ArrowRight, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AnnouncementBarProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  message?: React.ReactNode;
  children?: React.ReactNode;
  linkText?: string;
  linkHref?: string;
  onLinkClick?: () => void;
  onDismiss?: () => void;
  dismissible?: boolean;
  variant?: "default" | "primary" | "muted";
}

export function AnnouncementBar({
  badge,
  message,
  children,
  linkText,
  linkHref,
  onLinkClick,
  onDismiss,
  dismissible = true,
  variant = "default",
  className,
  ...props
}: AnnouncementBarProps) {
  const content = message ?? children;
  const [isDismissed, setIsDismissed] = React.useState(false);

  if (isDismissed) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  const variantClasses = {
    default: "bg-muted/60 text-foreground border-b",
    primary: "bg-primary text-primary-foreground border-b border-primary/20",
    muted: "bg-secondary text-secondary-foreground border-b",
  }[variant];

  return (
    <div
      role="banner"
      className={cn(
        "relative flex items-center justify-between gap-3 px-4 py-2.5 text-xs sm:text-sm font-medium transition-all",
        variantClasses,
        className
      )}
      {...props}
    >
      <div className="flex flex-1 items-center justify-center gap-2 flex-wrap text-center">
        {badge && (
          <Badge
            variant={variant === "primary" ? "secondary" : "default"}
            className="text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wider"
          >
            {badge}
          </Badge>
        )}
        <span className="leading-tight">{content}</span>
        {(linkText || onLinkClick) && (
          <a
            href={linkHref || "#"}
            onClick={(e) => {
              if (onLinkClick) {
                e.preventDefault();
                onLinkClick();
              }
            }}
            className={cn(
              "inline-flex items-center gap-1 font-semibold underline underline-offset-4 hover:opacity-80 transition-opacity",
              variant === "primary" ? "text-primary-foreground" : "text-primary"
            )}
          >
            {linkText || "Learn more"}
            <ArrowRight className="h-3 w-3" />
          </a>
        )}
      </div>

      {dismissible && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleDismiss}
          className={cn(
            "h-6 w-6 rounded-full shrink-0",
            variant === "primary"
              ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-label="Dismiss banner"
        >
          <X className="h-3.5 w-3.5" />
          <span className="sr-only">Dismiss</span>
        </Button>
      )}
    </div>
  );
}
