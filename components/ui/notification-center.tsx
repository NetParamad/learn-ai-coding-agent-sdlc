"use client";

import * as React from "react";
import { Bell, CheckCheck, Trash2, ExternalLink } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

/**
 * @component NotificationCenter
 * @description Accessible notification drawer/popover for dashboards with tabs, read/unread states, and bulk actions.
 * @example
 * ```tsx
 * <NotificationCenter
 *   notifications={[
 *     { id: "1", title: "Deployment succeeded", message: "Production v2.4 is live", timestamp: "5m ago", read: false },
 *     { id: "2", title: "New API Key", message: "Service account token created", timestamp: "1h ago", read: true }
 *   ]}
 *   onMarkAllAsRead={() => console.log("Mark all")}
 * />
 * ```
 */
export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read?: boolean;
  type?: "info" | "success" | "warning" | "error";
  href?: string;
}

export interface NotificationCenterProps {
  notifications: NotificationItem[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onClearAll?: () => void;
  className?: string;
}

export function NotificationCenter({
  notifications = [],
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  className,
}: NotificationCenterProps) {
  const [items, setItems] = React.useState<NotificationItem[]>(notifications);

  React.useEffect(() => {
    setItems(notifications);
  }, [notifications]);

  const unreadCount = items.filter((n) => !n.read).length;

  const handleMarkItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
    onMarkAsRead?.(id);
  };

  const handleMarkAll = () => {
    setItems((prev) => prev.map((item) => ({ ...item, read: true })));
    onMarkAllAsRead?.();
  };

  const renderList = (filterUnread: boolean) => {
    const filtered = filterUnread ? items.filter((n) => !n.read) : items;

    if (filtered.length === 0) {
      return (
        <div className="py-8 text-center text-xs text-muted-foreground">
          No notifications found
        </div>
      );
    }

    return (
      <div className="divide-y divide-border/50 max-h-72 overflow-y-auto">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => handleMarkItem(item.id)}
            className={cn(
              "p-3 text-xs transition-colors hover:bg-muted/40 cursor-pointer flex gap-2.5 items-start",
              !item.read && "bg-primary/5"
            )}
          >
            <div
              className={cn(
                "h-2 w-2 rounded-full mt-1.5 shrink-0",
                item.read ? "bg-transparent" : "bg-primary"
              )}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className={cn("font-medium text-foreground truncate", !item.read && "font-semibold")}>
                  {item.title}
                </span>
                <span className="text-[10px] text-muted-foreground shrink-0">{item.timestamp}</span>
              </div>
              <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                {item.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Open notifications"
          className={cn("relative h-9 w-9 rounded-lg border-border/80 shadow-2xs", className)}
        >
          <Bell className="h-4 w-4 text-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 shadow-lg">
        <div className="flex items-center justify-between p-3 border-b">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs">Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAll}
                className="h-7 px-2 text-[11px] text-muted-foreground hover:text-foreground"
              >
                <CheckCheck className="h-3 w-3 mr-1" />
                Read all
              </Button>
            )}
            {onClearAll && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClearAll}
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="px-3 pt-2">
            <TabsList className="grid w-full grid-cols-2 h-7 p-0.5">
              <TabsTrigger value="all" className="text-[11px] h-6">
                All ({items.length})
              </TabsTrigger>
              <TabsTrigger value="unread" className="text-[11px] h-6">
                Unread ({unreadCount})
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all" className="m-0 mt-2">
            {renderList(false)}
          </TabsContent>
          <TabsContent value="unread" className="m-0 mt-2">
            {renderList(true)}
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
