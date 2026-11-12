"use client";

import * as React from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * @component ChatContainer
 * @description Viewport-aware container for AI conversational interfaces with auto-scroll management and floating jump-to-bottom control.
 * @example
 * ```tsx
 * <ChatContainer autoScroll={true}>
 *   <ChatMessage role="user" content="Hello" />
 *   <ChatMessage role="assistant" content="How can I help you?" />
 * </ChatContainer>
 * ```
 */
export interface ChatContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  autoScroll?: boolean;
  scrollToBottomThreshold?: number;
  scrollToBottomText?: string;
  onScrollToBottom?: () => void;
  children?: React.ReactNode;
}

export function ChatContainer({
  autoScroll = true,
  scrollToBottomThreshold = 100,
  scrollToBottomText = "Jump to bottom",
  onScrollToBottom,
  children,
  className,
  ...props
}: ChatContainerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = React.useState(true);

  // Check if scrolled near bottom
  const handleScroll = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const atBottom = distanceToBottom <= scrollToBottomThreshold;
    setIsAtBottom(atBottom);
  }, [scrollToBottomThreshold]);

  // Scroll to bottom smoothly or instantly within this container ONLY (never hijacks window scroll)
  const scrollToBottom = React.useCallback(
    (behavior: ScrollBehavior = "smooth") => {
      const el = containerRef.current;
      if (!el) return;
      el.scrollTo({ top: el.scrollHeight, behavior });
      onScrollToBottom?.();
    },
    [onScrollToBottom]
  );

  // Auto-scroll only when new children are actually appended
  const prevCountRef = React.useRef(React.Children.count(children));
  React.useEffect(() => {
    const currentCount = React.Children.count(children);
    if (autoScroll && isAtBottom && currentCount > prevCountRef.current) {
      scrollToBottom("smooth");
    }
    prevCountRef.current = currentCount;
  }, [children, autoScroll, isAtBottom, scrollToBottom]);

  return (
    <div className={cn("relative flex flex-col flex-1 min-h-0 w-full", className)} {...props}>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth"
        role="log"
        aria-live="polite"
        aria-atomic="false"
      >
        {children}
      </div>

      {!isAtBottom && (
        <div className="absolute bottom-4 right-4 z-10 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => scrollToBottom("smooth")}
            className="rounded-full shadow-md border text-xs gap-1.5 h-8 px-3 bg-background/90 backdrop-blur"
          >
            <ArrowDown className="h-3.5 w-3.5" />
            <span>{scrollToBottomText}</span>
          </Button>
        </div>
      )}
    </div>
  );
}
