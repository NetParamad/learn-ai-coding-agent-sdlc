"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

export interface SectionHeaderProps {
  id?: string;
  icon: React.ElementType;
  title: string;
  description: string;
  badgeText?: string;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  totalCount?: number;
  filteredCount?: number;
  placeholder?: string;
}

export function SectionHeader({
  icon: Icon,
  title,
  description,
  badgeText,
  searchQuery,
  onSearchChange,
  totalCount,
  filteredCount,
  placeholder,
}: SectionHeaderProps) {
  const isFiltering = Boolean(searchQuery && searchQuery.trim().length > 0);

  return (
    <div className="border-b pb-4 space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 text-primary font-semibold text-lg sm:text-xl">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
            <h3>{title}</h3>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            {description}
          </p>
        </div>
        {badgeText && (
          <Badge variant="outline" className="font-mono text-xs w-fit shrink-0">
            {badgeText}
          </Badge>
        )}
      </div>

      {/* In-page section search bar */}
      {onSearchChange && (
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground opacity-60" />
            <Input
              value={searchQuery ?? ""}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={placeholder ?? `Search in ${title}...`}
              className="h-8 pl-8 pr-8 text-xs bg-muted/20 border-input rounded-lg shadow-2xs focus-visible:ring-1"
            />
            {isFiltering && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-foreground rounded transition-colors"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {totalCount !== undefined && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              {isFiltering ? (
                <span>
                  Showing <strong className="text-foreground">{filteredCount ?? 0}</strong> of {totalCount} components
                </span>
              ) : (
                <span>{totalCount} components</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
