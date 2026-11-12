"use client";

import * as React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface HeroSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  badge?: {
    text: string;
    actionText?: string;
    onActionClick?: () => void;
  };
  title: React.ReactNode;
  description: string;
  primaryAction?: {
    label: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
  };
  socialProofText?: string;
  partnerLogos?: Array<{ name: string; label?: string }>;
}

export function HeroSection({
  badge = {
    text: "v2.0 Released with OKLCH Color Engine",
    actionText: "Read changelog",
  },
  title = "Next-Generation Design System Infrastructure",
  description = "A production-grade component ecosystem engineered for high-concurrency enterprise apps. Pure perceptual lightness tokens, full accessibility, and zero runtime overhead.",
  primaryAction = { label: "Explore Catalog" },
  secondaryAction = { label: "View Documentation" },
  socialProofText = "Trusted by engineering teams across autonomous tech stacks",
  partnerLogos = [
    { name: "Acme Cloud" },
    { name: "NextSphere" },
    { name: "HyperScale" },
    { name: "Apex Data" },
    { name: "Vortex Labs" },
  ],
  className,
  ...props
}: HeroSectionProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden py-12 sm:py-16 lg:py-20 text-center flex flex-col items-center",
        className
      )}
      {...props}
    >
      {/* Announcement Pill Badge */}
      {badge && (
        <div className="mb-4 inline-flex flex-wrap items-center justify-center gap-1.5 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted/70 max-w-full">
          <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
          <span>{badge.text}</span>
          {badge.actionText && (
            <button
              type="button"
              onClick={badge.onActionClick}
              className="ml-1 inline-flex items-center text-primary font-semibold hover:underline cursor-pointer"
            >
              <span>{badge.actionText}</span>
              <ArrowRight className="ml-0.5 h-3 w-3" />
            </button>
          )}
        </div>
      )}

      {/* Main Heading */}
      <h1 className="max-w-4xl text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
        {title}
      </h1>

      {/* Description (max-w-prose to obey craft-floor readability) */}
      <p className="mt-4 sm:mt-5 max-w-prose text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Dual CTA Buttons */}
      {(primaryAction || secondaryAction) && (
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3">
          {primaryAction && (
            <Button
              size="lg"
              className="text-xs sm:text-sm font-semibold h-10 px-5 gap-1.5 shadow-xs"
              onClick={primaryAction.onClick}
            >
              <span>{primaryAction.label}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="outline"
              size="lg"
              className="text-xs sm:text-sm font-semibold h-10 px-5"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}

      {/* Social Proof Logos */}
      {partnerLogos && partnerLogos.length > 0 && (
        <div className="mt-12 sm:mt-16 w-full max-w-4xl border-t pt-8">
          {socialProofText && (
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-4">
              {socialProofText}
            </p>
          )}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-60">
            {partnerLogos.map((p, idx) => (
              <span key={idx} className="font-mono text-xs font-bold tracking-wider text-muted-foreground">
                {p.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
