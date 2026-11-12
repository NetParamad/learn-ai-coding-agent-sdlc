"use client";

import * as React from "react";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface FeatureItem {
  id?: string;
  icon?: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  linkText?: string;
  linkHref?: string;
  onLinkClick?: () => void;
}

export interface FeatureGridProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  badge?: string;
  title?: React.ReactNode;
  description?: string;
  features?: FeatureItem[];
  columns?: 2 | 3 | 4;
  children?: React.ReactNode;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  badge,
  linkText,
  linkHref,
  onLinkClick,
  className,
  ...props
}: FeatureItem & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card
      className={cn(
        "group relative border transition-all duration-200 hover:border-primary/50 hover:shadow-md",
        className
      )}
      {...props}
    >
      <CardContent className="p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between gap-2">
          {Icon && (
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-105">
              <Icon className="h-5 w-5" />
            </div>
          )}
          {badge && (
            <Badge variant="outline" className="text-[11px] font-mono">
              {badge}
            </Badge>
          )}
        </div>

        <div className="space-y-1.5">
          <h3 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {(linkText || onLinkClick) && (
          <div className="pt-2">
            <a
              href={linkHref || "#"}
              onClick={(e) => {
                if (onLinkClick) {
                  e.preventDefault();
                  onLinkClick();
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline underline-offset-4"
            >
              {linkText || "Learn more"}
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function FeatureGrid({
  badge,
  title,
  description,
  features,
  columns = 3,
  children,
  className,
  ...props
}: FeatureGridProps) {
  const columnClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <section className={cn("space-y-8 sm:space-y-10", className)} {...props}>
      {(badge || title || description) && (
        <div className="text-center max-w-2xl mx-auto space-y-3">
          {badge && (
            <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
              {badge}
            </Badge>
          )}
          {title && (
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}

      {features ? (
        <div className={cn("grid gap-4 sm:gap-6", columnClasses)}>
          {features.map((feature, i) => (
            <FeatureCard key={feature.id || i} {...feature} />
          ))}
        </div>
      ) : (
        <div className={cn("grid gap-4 sm:gap-6", columnClasses)}>
          {children}
        </div>
      )}
    </section>
  );
}
