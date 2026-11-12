"use client";

import * as React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * @component PromptSuggestionChips
 * @description Accessible prompt starter cards/chips for AI conversational entry states.
 * @example
 * ```tsx
 * <PromptSuggestionChips
 *   suggestions={[
 *     { title: "Explain code", prompt: "Explain how React Suspense works under the hood", category: "Coding" },
 *     { title: "Refactor UI", prompt: "Refactor this component to use Tailwind v4 tokens", category: "Design" }
 *   ]}
 *   onSelect={(prompt) => console.log(prompt)}
 * />
 * ```
 */
export interface PromptSuggestion {
  title: string;
  prompt: string;
  description?: string;
  category?: string;
  icon?: React.ReactNode;
}

export interface PromptSuggestionChipsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  suggestions: PromptSuggestion[];
  onSelect: (prompt: string) => void;
  layout?: "grid" | "scroll";
}

export function PromptSuggestionChips({
  suggestions,
  onSelect,
  layout = "grid",
  className,
  ...props
}: PromptSuggestionChipsProps) {
  return (
    <div
      className={cn(
        layout === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full"
          : "flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 w-full",
        className
      )}
      {...props}
    >
      {suggestions.map((item, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelect(item.prompt)}
          className={cn(
            "group text-left p-3 rounded-lg border bg-card/60 hover:bg-accent/50 hover:border-primary/40 transition-all duration-150 cursor-pointer shadow-2xs hover:shadow-xs",
            layout === "scroll" && "shrink-0 max-w-[240px]"
          )}
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-primary shrink-0">
                {item.icon || <Sparkles className="h-3.5 w-3.5" />}
              </span>
              <span className="font-medium text-xs text-foreground truncate group-hover:text-primary transition-colors">
                {item.title}
              </span>
            </div>
            {item.category && (
              <span className="text-[10px] text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded border border-border/40 shrink-0">
                {item.category}
              </span>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
            {item.description || item.prompt}
          </p>
        </button>
      ))}
    </div>
  );
}
