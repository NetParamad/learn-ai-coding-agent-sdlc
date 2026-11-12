"use client";

import * as React from "react";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  badge?: string;
  ctaText?: string;
  features: string[];
}

export interface PricingTableProps extends React.HTMLAttributes<HTMLDivElement> {
  plans?: PricingPlan[];
  defaultInterval?: "monthly" | "annual";
  annualDiscountBadge?: string;
  onSelectPlan?: (plan: PricingPlan, interval: "monthly" | "annual") => void;
}

const DEFAULT_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "For individual engineers and indie developers building initial MVPs.",
    monthlyPrice: 0,
    annualPrice: 0,
    ctaText: "Start Free",
    features: [
      "1,000 API requests / day",
      "Community OKLCH themes",
      "Up to 3 active projects",
      "Standard Discord support",
    ],
  },
  {
    id: "pro",
    name: "Team & Pro",
    description: "For fast-shipping product teams requiring dedicated design tokens and SLAs.",
    monthlyPrice: 29,
    annualPrice: 24,
    popular: true,
    badge: "Most Popular",
    ctaText: "Upgrade to Pro",
    features: [
      "Unlimited API requests",
      "All 12 OKLCH official palettes",
      "Unlimited projects & branches",
      "Custom brand token exports",
      "Role-based access & SSO",
      "Priority 24/7 Slack support",
    ],
  },
  {
    id: "enterprise",
    name: "Organization",
    description: "For organizations needing multi-tenant isolation, on-prem export, and audits.",
    monthlyPrice: 99,
    annualPrice: 79,
    ctaText: "Contact Sales",
    features: [
      "Everything in Team & Pro",
      "Dedicated sovereign tenancy",
      "Custom domain whitelabeling",
      "SOC2 & ISO 27001 compliance logs",
      "Dedicated design director review",
      "Guaranteed 99.99% uptime SLA",
    ],
  },
];

export function PricingTable({
  plans = DEFAULT_PLANS,
  defaultInterval = "annual",
  annualDiscountBadge = "Save 20%",
  onSelectPlan,
  className,
  ...props
}: PricingTableProps) {
  const [interval, setInterval] = React.useState<"monthly" | "annual">(defaultInterval);

  return (
    <div className={cn("w-full space-y-6 sm:space-y-8", className)} {...props}>
      {/* Interval Toggle */}
      <div className="flex items-center justify-center">
        <div className="inline-flex max-w-full flex-wrap items-center justify-center rounded-full border bg-muted/30 p-1">
          <button
            type="button"
            onClick={() => setInterval("monthly")}
            className={cn(
              "rounded-full px-3.5 py-1 text-xs font-medium transition-all cursor-pointer",
              interval === "monthly"
                ? "bg-background text-foreground shadow-2xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Monthly Billing
          </button>
          <button
            type="button"
            onClick={() => setInterval("annual")}
            className={cn(
              "rounded-full px-3.5 py-1 text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5",
              interval === "annual"
                ? "bg-background text-foreground shadow-2xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span>Annual Billing</span>
            <Badge variant="secondary" className="text-[10px] font-mono px-1.5 py-0 bg-primary/10 text-primary border-primary/20">
              {annualDiscountBadge}
            </Badge>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const price = interval === "annual" ? plan.annualPrice : plan.monthlyPrice;
          const isPopular = plan.popular;

          return (
            <Card
              key={plan.id}
              className={cn(
                "relative flex flex-col justify-between transition-all hover:shadow-md",
                isPopular
                  ? "border-primary ring-2 ring-primary/20 shadow-xs"
                  : "border-border"
              )}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="default" className="text-[10px] font-semibold px-2 py-0.5 gap-1">
                    <Sparkles className="h-3 w-3" />
                    {plan.badge || "Most Popular"}
                  </Badge>
                </div>
              )}

              <CardHeader className="p-5 pb-3">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-foreground">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="pt-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold tracking-tight font-mono text-foreground">
                      ${price}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      / month {interval === "annual" && "(billed yearly)"}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-5 pt-2 flex-1">
                <div className="border-t pt-4 space-y-2.5">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                    What's included:
                  </span>
                  <ul className="space-y-2 text-xs">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="p-5 pt-0">
                <Button
                  variant={isPopular ? "default" : "outline"}
                  className="w-full text-xs font-semibold"
                  onClick={() => onSelectPlan && onSelectPlan(plan, interval)}
                >
                  {plan.ctaText || "Select Plan"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
