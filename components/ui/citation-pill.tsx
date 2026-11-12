"use client";

import * as React from "react";
import { ExternalLink, Globe } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

/**
 * @component CitationPill
 * @description Inline reference badge for AI search results and citations with popover preview card.
 * @example
 * ```tsx
 * <CitationPill
 *   index={1}
 *   title="React 19 Documentation"
 *   source="react.dev"
 *   snippet="React 19 adds support for Actions, async transitions, and Server Components."
 *   url="https://react.dev"
 * />
 * ```
 */
export interface CitationPillProps {
  index: number | string;
  title: string;
  source: string;
  snippet?: string;
  url?: string;
  className?: string;
}

export function CitationPill({
  index,
  title,
  source,
  snippet,
  url,
  className,
}: CitationPillProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Citation ${index}: ${title}`}
          className={cn(
            "inline-flex items-center justify-center font-mono text-[10px] font-semibold h-4 min-w-[16px] px-1 rounded-full bg-muted/80 hover:bg-primary/20 text-muted-foreground hover:text-primary border border-border/80 transition-colors cursor-pointer align-baseline mx-0.5",
            className
          )}
        >
          {index}
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80 p-3 space-y-2 text-xs">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-muted-foreground truncate">
            <Globe className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate font-mono text-[11px]">{source}</span>
          </div>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline shrink-0"
            >
              Visit
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>

        <p className="font-semibold text-foreground leading-snug line-clamp-2">
          {title}
        </p>

        {snippet && (
          <p className="text-muted-foreground text-[11px] line-clamp-3 leading-relaxed bg-muted/40 p-2 rounded border border-border/50 italic">
            &ldquo;{snippet}&rdquo;
          </p>
        )}
      </PopoverContent>
    </Popover>
  );
}
