"use client";

import * as React from "react";
import { ChevronDown, Sparkles, BrainCircuit, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * @component ThinkingAccordion
 * @description Collapsible Chain-of-Thought (CoT) reasoning block for LLM / AI outputs with status indicator and token/duration metrics.
 * @example
 * ```tsx
 * <ThinkingAccordion
 *   thoughts="1. Parsed user request\n2. Retrieved relevant schema\n3. Constructed query"
 *   isThinking={false}
 *   durationSeconds={2.4}
 *   tokenCount={142}
 * />
 * ```
 */
export interface ThinkingAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  thoughts: React.ReactNode;
  isThinking?: boolean;
  durationSeconds?: number;
  tokenCount?: number;
  defaultOpen?: boolean;
  label?: string;
}

export function ThinkingAccordion({
  thoughts,
  isThinking = false,
  durationSeconds,
  tokenCount,
  defaultOpen = false,
  label,
  className,
  ...props
}: ThinkingAccordionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen || isThinking);

  // If starts thinking, automatically expand unless user collapsed
  React.useEffect(() => {
    if (isThinking) {
      setIsOpen(true);
    }
  }, [isThinking]);

  const defaultLabel = isThinking
    ? "Thinking..."
    : durationSeconds !== undefined
      ? `Thought for ${durationSeconds.toFixed(1)}s`
      : "Thinking process";

  return (
    <div
      className={cn(
        "rounded-lg border bg-muted/30 text-xs overflow-hidden transition-all duration-200",
        isThinking ? "border-primary/40 bg-primary/5" : "border-border",
        className
      )}
      {...props}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <div className="flex items-center gap-2 font-medium">
          {isThinking ? (
            <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
          ) : (
            <BrainCircuit className="h-3.5 w-3.5 text-muted-foreground" />
          )}
          <span>{label || defaultLabel}</span>
          {tokenCount !== undefined && !isThinking && (
            <span className="text-[10px] text-muted-foreground/70 font-mono">
              ({tokenCount} tokens)
            </span>
          )}
        </div>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200 text-muted-foreground",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="px-3 pb-3 pt-1 border-t border-border/50 font-mono text-[11px] leading-relaxed text-muted-foreground whitespace-pre-wrap animate-in fade-in-50 duration-150">
          {thoughts}
        </div>
      )}
    </div>
  );
}
