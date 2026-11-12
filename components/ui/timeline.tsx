"use client";

import * as React from "react";
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  children?: React.ReactNode;
}

export function Timeline({ children, className, ...props }: TimelineProps) {
  return (
    <ol
      role="list"
      className={cn("relative space-y-6 border-l border-border pl-6 ml-3", className)}
      {...props}
    >
      {children}
    </ol>
  );
}

export interface TimelineItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
}

export function TimelineItem({ children, className, ...props }: TimelineItemProps) {
  return (
    <li className={cn("relative group", className)} {...props}>
      {children}
    </li>
  );
}

export interface TimelineDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: "completed" | "current" | "pending" | "error";
  icon?: React.ReactNode;
}

export function TimelineDot({
  status = "pending",
  icon,
  className,
  ...props
}: TimelineDotProps) {
  const statusStyles = {
    completed: "bg-primary text-primary-foreground border-primary",
    current: "bg-background text-primary border-primary ring-4 ring-primary/20",
    pending: "bg-muted text-muted-foreground border-border",
    error: "bg-destructive text-destructive-foreground border-destructive",
  };

  return (
    <span
      className={cn(
        "absolute -left-[33px] top-1 flex h-6 w-6 items-center justify-center rounded-full border text-xs font-medium transition-colors",
        statusStyles[status],
        className
      )}
      {...props}
    >
      {icon ? (
        icon
      ) : status === "completed" ? (
        <Check className="h-3 w-3 stroke-[2.5]" />
      ) : status === "current" ? (
        <span className="h-2 w-2 rounded-full bg-primary" />
      ) : (
        <Circle className="h-2 w-2 stroke-[2]" />
      )}
    </span>
  );
}

export interface TimelineContentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  time?: React.ReactNode;
  description?: React.ReactNode;
}

export function TimelineContent({
  title,
  time,
  description,
  children,
  className,
  ...props
}: TimelineContentProps) {
  return (
    <div className={cn("flex flex-col space-y-1", className)} {...props}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm font-semibold text-foreground">{title}</div>
        {time && <time className="text-xs text-muted-foreground">{time}</time>}
      </div>
      {description && (
        <div className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </div>
      )}
      {children}
    </div>
  );
}
