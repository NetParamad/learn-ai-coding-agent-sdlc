"use client";

import * as React from "react";
import { ArrowUp, Paperclip, Square, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export interface PromptInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
  maxLength?: number;
  modelName?: string;
  onModelClick?: () => void;
  onAttachClick?: () => void;
  onSubmit?: (content: string) => void;
  onStop?: () => void;
  onValueChange?: (val: string) => void;
}

export function PromptInput({
  value: controlledValue,
  defaultValue = "",
  placeholder = "Ask anything or type a prompt... (Enter to send, Shift+Enter for newline)",
  isLoading = false,
  disabled = false,
  maxLength,
  modelName,
  onModelClick,
  onAttachClick,
  onSubmit,
  onStop,
  onValueChange,
  className,
  ...props
}: PromptInputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(val);
    }
    onValueChange?.(val);

    // Auto-adjust textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  const handleSend = () => {
    if (disabled || isLoading) return;
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit?.(trimmed);
    if (controlledValue === undefined) {
      setInternalValue("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isSendDisabled = disabled || isLoading || value.trim().length === 0;

  return (
    <div
      className={cn(
        "relative rounded-xl border bg-background p-2.5 sm:p-3 shadow-xs transition-colors",
        "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20",
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
      {...props}
    >
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        disabled={disabled}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={cn(
          "w-full resize-none bg-transparent px-2 py-1 text-sm text-foreground",
          "placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed",
          "max-h-[200px] min-h-[44px]"
        )}
      />

      <div className="flex items-center justify-between pt-2 border-t border-border/40 mt-1 px-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          {onAttachClick && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={disabled}
              onClick={onAttachClick}
              className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground"
              title="Attach files or context"
            >
              <Paperclip className="h-3.5 w-3.5" />
              <span className="sr-only">Attach file</span>
            </Button>
          )}

          {modelName && (
            <Badge
              variant="secondary"
              onClick={onModelClick}
              className={cn(
                "h-6 gap-1 px-2 text-[11px] font-mono cursor-pointer transition-colors hover:bg-secondary/80",
                onModelClick && "cursor-pointer"
              )}
            >
              <Sparkles className="h-2.5 w-2.5 text-primary" />
              {modelName}
            </Badge>
          )}

          {maxLength && (
            <span className="text-[10px] font-mono text-muted-foreground ml-1">
              {value.length}/{maxLength}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {isLoading ? (
            <Button
              type="button"
              size="icon"
              variant="destructive"
              onClick={onStop}
              className="h-8 w-8 rounded-full shadow-xs"
              title="Stop generation"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
              <span className="sr-only">Stop</span>
            </Button>
          ) : (
            <Button
              type="button"
              size="icon"
              disabled={isSendDisabled}
              onClick={handleSend}
              className="h-8 w-8 rounded-full shadow-xs transition-transform active:scale-95"
              title="Send prompt (Enter)"
            >
              <ArrowUp className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
