"use client";

import * as React from "react";
import {
  Palette,
  Box,
  Layers,
  Sparkles,
  BarChart3,
  Compass,
  Bell,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface CategoryCard {
  id: string;
  sectionId: string;
  icon: React.ElementType;
  title: string;
  badge: string;
  count: string;
  description: string;
  highlights: string[];
}

const CATEGORIES: CategoryCard[] = [
  {
    id: "cat-foundations",
    sectionId: "colors",
    icon: Palette,
    title: "Foundations & Colors",
    badge: "OKLCH Engine",
    count: "8 Themes • 242 Shades",
    description: "Perceptually uniform color science, responsive typography ramp, and base CSS variables.",
    highlights: ["OKLCH Palettes", "Typography Ramp", "Geist Fonts", "Border Tokens"],
  },
  {
    id: "cat-primitives",
    sectionId: "primitives",
    icon: Box,
    title: "Core Primitives",
    badge: "16 Primitives",
    count: "16 Components",
    description: "Atomic building blocks with polymorphic Radix slots and strict keyboard navigation.",
    highlights: ["Button", "Badge", "Avatar", "Skeleton", "Spinner", "Kbd"],
  },
  {
    id: "cat-forms",
    sectionId: "forms",
    icon: Layers,
    title: "Forms & Inputs",
    badge: "22 Controls",
    count: "22 Components",
    description: "Accessible inputs, multi-select pickers, OTP, file upload, and query filter builders.",
    highlights: ["Date Picker", "Combobox", "Filter Builder", "File Upload", "Input OTP"],
  },
  {
    id: "cat-ai",
    sectionId: "data-display",
    icon: Sparkles,
    title: "AI-Native & Chat",
    badge: "AI Extended",
    count: "7 Components",
    description: "Conversational containers with auto-scroll lock, reasoning accordions, and model pickers.",
    highlights: ["Chat Container", "Thinking Accordion", "Citation Pill", "Model Selector"],
  },
  {
    id: "cat-data",
    sectionId: "data-display",
    icon: BarChart3,
    title: "Data Display",
    badge: "23 Components",
    count: "23 Components",
    description: "Interactive TanStack tables, Recharts analytics, KPI metrics, tree views, and diff viewers.",
    highlights: ["TanStack Table", "Metric Card", "Recharts", "Tree View", "Code Diff"],
  },
  {
    id: "cat-navigation",
    sectionId: "navigation",
    icon: Compass,
    title: "Navigation & Layout",
    badge: "14 Components",
    count: "14 Components",
    description: "Multi-level menus, steppers, table of contents, breadcrumbs, and reading progress bars.",
    highlights: ["Navigation Menu", "Stepper", "Reading Progress", "Table of Contents"],
  },
  {
    id: "cat-overlays",
    sectionId: "overlays",
    icon: Bell,
    title: "Overlays & Feedback",
    badge: "18 Components",
    count: "18 Components",
    description: "Accessible dialogs, notification centers, e-commerce cart drawers, and toast alerts.",
    highlights: ["Confirm Dialog", "Notification Center", "Cart Drawer", "Toast / Sonner"],
  },
];

export interface CategoryOverviewGridProps {
  onSelectCategory?: (sectionId: string) => void;
  className?: string;
}

export function CategoryOverviewGrid({
  onSelectCategory,
  className,
}: CategoryOverviewGridProps) {
  const handleJump = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onSelectCategory) {
      onSelectCategory(sectionId);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", `#${sectionId}`);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            Component Architecture by Category
          </h3>
          <p className="text-xs text-muted-foreground">
            Explore 97 verified primitives and patterns structured for production web apps
          </p>
        </div>
        <Badge variant="outline" className="font-mono text-xs w-fit">
          7 Core Clusters • 97 Components
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <a
              key={cat.id}
              href={`#${cat.sectionId}`}
              onClick={(e) => handleJump(cat.sectionId, e)}
              className="group flex flex-col justify-between p-4 rounded-xl border bg-card/60 hover:bg-card hover:border-primary/50 transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 font-mono">
                    {cat.badge}
                  </Badge>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                    <span>{cat.title}</span>
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h4>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-border/40 flex flex-wrap gap-1">
                {cat.highlights.map((item) => (
                  <span
                    key={item}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-muted/60 text-muted-foreground group-hover:text-foreground font-mono transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
