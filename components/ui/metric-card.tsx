"use client";

import * as React from "react";
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface MetricTrend {
  value: string | number;
  direction?: "up" | "down" | "neutral";
  label?: string;
}

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  unit?: string;
  description?: string;
  icon?: LucideIcon;
  trend?: MetricTrend;
  badge?: string;
  chart?: React.ReactNode;
}

export const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  (
    {
      title,
      value,
      unit,
      description,
      icon: Icon,
      trend,
      badge,
      chart,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "relative overflow-hidden transition-all hover:border-primary/40 hover:shadow-xs",
          className
        )}
        {...props}
      >
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">
                  {title}
                </span>
                {badge && (
                  <Badge variant="outline" className="text-[10px] font-mono px-1.5 py-0">
                    {badge}
                  </Badge>
                )}
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-mono">
                  {value}
                </span>
                {unit && (
                  <span className="text-xs font-medium text-muted-foreground">
                    {unit}
                  </span>
                )}
              </div>
            </div>

            {Icon && (
              <div className="rounded-lg border bg-muted/40 p-2 text-muted-foreground shrink-0">
                <Icon className="h-4 w-4" />
              </div>
            )}
          </div>

          {(trend || description) && (
            <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t">
              {trend && (
                <div
                  className={cn(
                    "flex items-center gap-1 font-semibold text-xs",
                    trend.direction === "up" && "text-emerald-700 dark:text-emerald-400",
                    trend.direction === "down" && "text-rose-700 dark:text-rose-400",
                    trend.direction === "neutral" && "text-muted-foreground"
                  )}
                >
                  {trend.direction === "up" && <TrendingUp className="h-3.5 w-3.5" />}
                  {trend.direction === "down" && <TrendingDown className="h-3.5 w-3.5" />}
                  {trend.direction === "neutral" && <Minus className="h-3.5 w-3.5" />}
                  <span>{trend.value}</span>
                  {trend.label && (
                    <span className="text-muted-foreground font-normal ml-0.5">
                      {trend.label}
                    </span>
                  )}
                </div>
              )}

              {description && !trend && (
                <span className="text-muted-foreground text-xs">{description}</span>
              )}
            </div>
          )}

          {chart && <div className="mt-3">{chart}</div>}
        </CardContent>
      </Card>
    );
  }
);
MetricCard.displayName = "MetricCard";
