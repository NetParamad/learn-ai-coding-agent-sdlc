"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  max?: number;
  size?: "xs" | "sm" | "default" | "lg";
  spacing?: "tight" | "normal" | "loose";
}

export function AvatarGroup({
  children,
  max,
  size = "default",
  spacing = "normal",
  className,
  ...props
}: AvatarGroupProps) {
  const childrenArray = React.Children.toArray(children);
  const total = childrenArray.length;
  const showOverflow = max !== undefined && total > max;
  const visibleAvatars = showOverflow ? childrenArray.slice(0, max) : childrenArray;
  const remainingCount = total - (max ?? total);

  const spacingClass = {
    tight: "-space-x-3 sm:-space-x-4",
    normal: "-space-x-2 sm:-space-x-2.5",
    loose: "-space-x-1 sm:-space-x-1.5",
  }[spacing];

  const badgeSizeClass = {
    xs: "h-6 w-6 text-[10px]",
    sm: "h-8 w-8 text-xs",
    default: "h-10 w-10 text-xs",
    lg: "h-12 w-12 text-sm",
  }[size];

  return (
    <div
      role="group"
      aria-label={`Group of ${total} avatars`}
      className={cn("flex items-center", spacingClass, className)}
      {...props}
    >
      {visibleAvatars.map((child, index) => (
        <div
          key={index}
          className="relative inline-block transition-transform hover:z-20 hover:scale-105 focus-within:z-20 rounded-full ring-2 ring-background shadow-xs"
        >
          {child}
        </div>
      ))}

      {showOverflow && remainingCount > 0 && (
        <div
          className={cn(
            "relative inline-flex items-center justify-center rounded-full font-medium ring-2 ring-background bg-muted text-muted-foreground shadow-xs select-none hover:z-20 hover:scale-105 transition-transform",
            badgeSizeClass
          )}
          title={`${remainingCount} more`}
          aria-label={`${remainingCount} more users`}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
