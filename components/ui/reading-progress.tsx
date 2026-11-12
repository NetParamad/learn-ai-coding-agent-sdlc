"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * @component ReadingProgress
 * @description Fixed top reading progress bar tracking viewport scroll depth for long-form articles and documentation.
 * @example
 * ```tsx
 * <ReadingProgress height={3} className="bg-primary" />
 * ```
 */
export interface ReadingProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: number;
}

export function ReadingProgress({
  height = 3,
  className,
  ...props
}: ReadingProgressProps) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollTotal =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollTotal <= 0) {
        setProgress(0);
        return;
      }
      const currentScroll = window.scrollY;
      const pct = Math.min(Math.max((currentScroll / scrollTotal) * 100, 0), 100);
      setProgress(pct);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
      style={{ height: `${height}px` }}
      className={cn("fixed top-0 left-0 right-0 z-50 bg-transparent pointer-events-none", className)}
      {...props}
    >
      <div
        style={{ width: `${progress}%` }}
        className="h-full bg-primary transition-[width] duration-150 ease-out shadow-xs"
      />
    </div>
  );
}
