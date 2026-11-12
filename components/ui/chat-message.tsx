"use client";

import * as React from "react";
import { Check, Copy, ThumbsUp, ThumbsDown, RotateCcw, Bot, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ChatMessageRole = "user" | "assistant" | "system";

export interface ChatMessageProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  role: ChatMessageRole;
  content: React.ReactNode;
  senderName?: string;
  avatarUrl?: string;
  avatarFallback?: string;
  timestamp?: string;
  isStreaming?: boolean;
  onCopy?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
  onRetry?: () => void;
}

export function ChatMessage({
  role,
  content,
  senderName,
  avatarUrl,
  avatarFallback,
  timestamp,
  isStreaming = false,
  onCopy,
  onLike,
  onDislike,
  onRetry,
  className,
  ...props
}: ChatMessageProps) {
  const [copied, setCopied] = React.useState(false);

  const isUser = role === "user";
  const isAssistant = role === "assistant";
  const isSystem = role === "system";

  const defaultSenderName = isUser
    ? "You"
    : isAssistant
      ? "AI Assistant"
      : "System";

  const defaultFallback = isUser ? "U" : isAssistant ? "AI" : "SYS";

  const handleCopy = () => {
    if (typeof content === "string") {
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onCopy?.();
    }
  };

  if (isSystem) {
    return (
      <div
        className={cn(
          "flex items-center justify-center py-2 text-xs text-muted-foreground",
          className
        )}
        {...props}
      >
        <div className="rounded-full bg-muted/60 px-3 py-1 font-mono text-[11px] border">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative flex gap-3 py-3 px-2 sm:px-4 rounded-xl transition-colors",
        isUser ? "bg-muted/30" : "bg-card border",
        className
      )}
      {...props}
    >
      {/* Avatar */}
      <Avatar className="h-8 w-8 shrink-0 mt-0.5">
        {avatarUrl && <AvatarImage src={avatarUrl} alt={senderName || defaultSenderName} />}
        <AvatarFallback
          className={cn(
            "text-xs font-semibold",
            isAssistant
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          )}
        >
          {isAssistant ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>

      {/* Message content */}
      <div className="flex-1 space-y-1.5 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-foreground">
              {senderName || defaultSenderName}
            </span>
            {timestamp && (
              <span className="text-[10px] text-muted-foreground font-mono">
                {timestamp}
              </span>
            )}
          </div>

          {/* Action buttons toolbar (hover or focus) */}
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
            {typeof content === "string" && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="h-6 w-6 rounded text-muted-foreground hover:text-foreground"
                title="Copy message"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span className="sr-only">Copy message</span>
              </Button>
            )}

            {isAssistant && onRetry && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onRetry}
                className="h-6 w-6 rounded text-muted-foreground hover:text-foreground"
                title="Regenerate response"
              >
                <RotateCcw className="h-3 w-3" />
                <span className="sr-only">Regenerate</span>
              </Button>
            )}

            {isAssistant && onLike && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onLike}
                className="h-6 w-6 rounded text-muted-foreground hover:text-foreground"
                title="Good response"
              >
                <ThumbsUp className="h-3 w-3" />
                <span className="sr-only">Thumbs up</span>
              </Button>
            )}

            {isAssistant && onDislike && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onDislike}
                className="h-6 w-6 rounded text-muted-foreground hover:text-foreground"
                title="Bad response"
              >
                <ThumbsDown className="h-3 w-3" />
                <span className="sr-only">Thumbs down</span>
              </Button>
            )}
          </div>
        </div>

        {/* Content body */}
        <div className="text-xs sm:text-sm text-foreground leading-relaxed break-words">
          {content}
          {isStreaming && (
            <span className="inline-block h-4 w-1.5 ml-1 bg-primary animate-pulse align-middle" />
          )}
        </div>
      </div>
    </div>
  );
}
