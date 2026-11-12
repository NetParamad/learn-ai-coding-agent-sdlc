"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface BulkActionBarProps {
  selectedCount: number;
  totalCount?: number;
  onClearSelection: () => void;
  children?: React.ReactNode;
  className?: string;
  label?: string;
}

export function BulkActionBar({
  selectedCount,
  totalCount,
  onClearSelection,
  children,
  className,
  label = "selected",
}: BulkActionBarProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedCount > 0) {
        onClearSelection();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCount, onClearSelection]);

  if (selectedCount <= 0) return null;

  return (
    <div
      role="toolbar"
      aria-label="Bulk actions"
      className={cn(
        "fixed bottom-[calc(env(safe-area-inset-bottom,0px)+4.5rem)] md:bottom-6 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-50",
        "flex flex-wrap items-center justify-between sm:justify-start gap-2 sm:gap-3",
        "bg-card text-card-foreground border shadow-lg rounded-xl p-2 sm:px-4 sm:py-2.5",
        "backdrop-blur-md bg-card/95 transition-all animate-in fade-in slide-in-from-bottom-4 duration-200",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Badge variant="default" className="text-xs px-2 py-0.5 font-mono">
          {selectedCount} {totalCount ? `/ ${totalCount}` : ""}
        </Badge>
        <span className="text-xs font-medium text-muted-foreground hidden xs:inline">
          {label}
        </span>
      </div>

      <div className="h-4 w-px bg-border hidden sm:block" />

      {/* Action buttons slot */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
        {children}
      </div>

      <div className="h-4 w-px bg-border hidden sm:block" />

      <Button
        variant="ghost"
        size="icon"
        onClick={onClearSelection}
        className="h-7 w-7 text-muted-foreground hover:text-foreground rounded-full"
        title="Clear selection (Esc)"
        aria-label="Clear selection"
      >
        <X className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
