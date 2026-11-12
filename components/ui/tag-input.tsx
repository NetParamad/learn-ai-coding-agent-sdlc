"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface TagInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  tags?: string[];
  defaultTags?: string[];
  placeholder?: string;
  maxTags?: number;
  disabled?: boolean;
  onChange?: (tags: string[]) => void;
  onTagsChange?: (tags: string[]) => void;
}

export function TagInput({
  tags: controlledTags,
  defaultTags = [],
  placeholder = "Add tags... (Enter or comma)",
  maxTags,
  disabled = false,
  onChange,
  onTagsChange,
  className,
  ...props
}: TagInputProps) {
  const [internalTags, setInternalTags] = React.useState<string[]>(defaultTags);
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const tags = controlledTags !== undefined ? controlledTags : internalTags;

  const updateTags = (newTags: string[]) => {
    if (controlledTags === undefined) {
      setInternalTags(newTags);
    }
    onChange?.(newTags);
    onTagsChange?.(newTags);
  };

  const addTag = (tag: string) => {
    const trimmed = tag.trim().replace(/^,+|,+$/g, "");
    if (!trimmed) return;
    if (tags.includes(trimmed)) {
      setInputValue("");
      return;
    }
    if (maxTags && tags.length >= maxTags) return;

    updateTags([...tags, trimmed]);
    setInputValue("");
  };

  const removeTag = (indexToRemove: number) => {
    updateTags(tags.filter((_, i) => i !== indexToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      e.preventDefault();
      removeTag(tags.length - 1);
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      onClick={handleContainerClick}
      className={cn(
        "flex flex-wrap items-center gap-1.5 rounded-lg border bg-background p-2 text-xs transition-colors",
        "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20 min-h-[42px]",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {tags.map((tag, idx) => (
        <Badge
          key={`${tag}-${idx}`}
          variant="secondary"
          className="gap-1 pl-2 pr-1 py-0.5 text-xs font-normal"
        >
          <span>{tag}</span>
          {!disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(idx);
              }}
              className="rounded-full hover:bg-muted p-0.5 text-muted-foreground hover:text-foreground focus:outline-none"
              aria-label={`Remove tag ${tag}`}
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </Badge>
      ))}

      {(!maxTags || tags.length < maxTags) && (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          disabled={disabled}
          placeholder={tags.length === 0 ? placeholder : ""}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => inputValue && addTag(inputValue)}
          className="flex-1 bg-transparent px-1.5 py-0.5 text-foreground placeholder:text-muted-foreground focus:outline-none min-w-[120px]"
        />
      )}
    </div>
  );
}
