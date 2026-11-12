"use client";

import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Check,
  CheckCheck,
  Info,
  AlertTriangle,
  AlertCircle,
  Inbox,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read?: boolean;
  type?: "info" | "success" | "warning" | "error";
}

export interface NotificationBellProps {
  notifications?: NotificationItem[];
  onMarkAllAsRead?: () => void;
  onNotificationClick?: (item: NotificationItem) => void;
  className?: string;
}

export function NotificationBell({
  notifications: initialNotifications = [
    {
      id: "n1",
      title: "Cluster Auto-Scaled",
      description: "Replica nodes scaled from 3 to 6 to handle peak traffic.",
      time: "2m ago",
      type: "success",
      read: false,
    },
    {
      id: "n2",
      title: "API Rate Limit Warning",
      description: "Gateway throughput reached 85% of tier quota.",
      time: "15m ago",
      type: "warning",
      read: false,
    },
    {
      id: "n3",
      title: "New Deployment Ready",
      description: "Build v2.4.0 verified and staged for production.",
      time: "1h ago",
      type: "info",
      read: true,
    },
  ],
  onMarkAllAsRead,
  onNotificationClick,
  className,
}: NotificationBellProps) {
  const [items, setItems] = React.useState<NotificationItem[]>(initialNotifications);
  const unreadCount = items.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, read: true })));
    if (onMarkAllAsRead) onMarkAllAsRead();
  };

  const handleItemClick = (item: NotificationItem) => {
    setItems((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );
    if (onNotificationClick) onNotificationClick(item);
  };

  const renderIcon = (type?: NotificationItem["type"]) => {
    switch (type) {
      case "success":
        return <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />;
      case "warning":
        return <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />;
      case "error":
        return <AlertCircle className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" />;
      case "info":
      default:
        return <Info className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("relative h-9 w-9 p-0 rounded-lg", className)}
          aria-label={`Notifications (${unreadCount} unread)`}
        >
          <Bell className="h-4 w-4 text-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground font-mono shadow-xs">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 sm:w-96 p-0 shadow-lg">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="text-[10px] font-mono px-1.5 py-0">
                {unreadCount} new
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllRead}
              className="h-7 text-xs text-muted-foreground hover:text-foreground gap-1 px-2"
            >
              <CheckCheck className="h-3 w-3" />
              Mark all read
            </Button>
          )}
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="border-b px-4 py-1.5 bg-muted/20">
            <TabsList className="grid grid-cols-2 h-7 w-full max-w-[200px]">
              <TabsTrigger value="all" className="text-xs">
                All ({items.length})
              </TabsTrigger>
              <TabsTrigger value="unread" className="text-xs">
                Unread ({unreadCount})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="m-0 max-h-[320px] overflow-y-auto divide-y">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <Inbox className="h-8 w-8 mb-2 opacity-40" />
                <p className="text-xs">No notifications to display</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={cn(
                    "flex items-start gap-3 p-3.5 transition-colors cursor-pointer hover:bg-muted/50",
                    !item.read && "bg-muted/20"
                  )}
                >
                  <div className="mt-0.5 rounded-full border p-1 bg-background shrink-0">
                    {renderIcon(item.type)}
                  </div>
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={cn("text-xs font-medium truncate", !item.read && "font-semibold text-foreground")}>
                        {item.title}
                      </p>
                      <span className="text-[10px] text-muted-foreground shrink-0 font-mono">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  {!item.read && (
                    <span className="h-2 w-2 rounded-full bg-primary shrink-0 self-center" />
                  )}
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="unread" className="m-0 max-h-[320px] overflow-y-auto divide-y">
            {unreadCount === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <CheckCheck className="h-8 w-8 mb-2 text-emerald-600 opacity-60" />
                <p className="text-xs font-medium text-foreground">All caught up!</p>
                <p className="text-[11px] text-muted-foreground">No unread notifications.</p>
              </div>
            ) : (
              items
                .filter((n) => !n.read)
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className="flex items-start gap-3 p-3.5 transition-colors cursor-pointer hover:bg-muted/50 bg-muted/20"
                  >
                    <div className="mt-0.5 rounded-full border p-1 bg-background shrink-0">
                      {renderIcon(item.type)}
                    </div>
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-foreground truncate">
                          {item.title}
                        </p>
                        <span className="text-[10px] text-muted-foreground shrink-0 font-mono">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <span className="h-2 w-2 rounded-full bg-primary shrink-0 self-center" />
                  </div>
                ))
            )}
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
