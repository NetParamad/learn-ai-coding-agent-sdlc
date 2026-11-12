"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * @component ActivityFeed
 * @description Chronological audit log / activity timeline for team collaborations, dashboard updates, and audit trails.
 * @example
 * ```tsx
 * <ActivityFeed
 *   activities={[
 *     { id: "1", user: { name: "Sarah Chen", fallback: "SC" }, action: "deployed build", target: "v2.1.0 to production", timestamp: "12m ago" },
 *     { id: "2", user: { name: "Alex Rover", fallback: "AR" }, action: "updated schema", target: "users_table", timestamp: "1h ago" }
 *   ]}
 * />
 * ```
 */
export interface ActivityUser {
  name: string;
  avatarUrl?: string;
  fallback?: string;
}

export interface ActivityEvent {
  id: string;
  user: ActivityUser;
  action: string;
  target?: string;
  timestamp: string;
  badge?: {
    label: string;
    variant?: "default" | "secondary" | "outline" | "destructive";
  };
  icon?: React.ReactNode;
}

export interface ActivityFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  activities: ActivityEvent[];
}

export function ActivityFeed({ activities, className, ...props }: ActivityFeedProps) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      <ol className="relative border-l border-border/60 ml-3 space-y-4">
        {activities.map((event) => (
          <li key={event.id} className="ml-5 relative group">
            <span className="absolute -left-[27px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-background ring-4 ring-background border border-border">
              {event.icon ? (
                <span className="text-muted-foreground text-xs">{event.icon}</span>
              ) : (
                <Avatar className="h-5 w-5">
                  {event.user.avatarUrl && (
                    <AvatarImage src={event.user.avatarUrl} alt={event.user.name} />
                  )}
                  <AvatarFallback className="text-[9px] font-medium bg-primary/10 text-primary">
                    {event.user.fallback || event.user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <div className="text-xs text-foreground">
                <span className="font-semibold text-foreground mr-1.5">{event.user.name}</span>
                <span className="text-muted-foreground mr-1.5">{event.action}</span>
                {event.target && (
                  <span className="font-mono text-[11px] font-medium text-foreground bg-muted/50 px-1.5 py-0.5 rounded border border-border/40">
                    {event.target}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {event.badge && (
                  <Badge variant={event.badge.variant || "secondary"} className="text-[10px] px-1.5 py-0 h-4">
                    {event.badge.label}
                  </Badge>
                )}
                <time className="text-[11px] text-muted-foreground whitespace-nowrap">
                  {event.timestamp}
                </time>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
