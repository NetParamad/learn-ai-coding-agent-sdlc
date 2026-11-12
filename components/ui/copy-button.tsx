"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CopyButtonProps extends Omit<ButtonProps, "onClick"> {
  value: string;
  timeout?: number;
  onCopy?: () => void;
}

export function CopyButton({
  value,
  timeout = 2000,
  onCopy,
  className,
  variant = "ghost",
  size = "icon",
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setHasCopied(true);
    onCopy?.();
    setTimeout(() => setHasCopied(false), timeout);
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleCopy}
      aria-label={hasCopied ? "Copied" : "Copy to clipboard"}
      title={hasCopied ? "Copied!" : "Copy to clipboard"}
      className={cn("h-7 w-7 transition-colors", className)}
      {...props}
    >
      {hasCopied ? (
        <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 animate-in zoom-in-50 duration-200" />
      ) : (
        <Copy className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
      )}
      <span className="sr-only">{hasCopied ? "Copied" : "Copy"}</span>
    </Button>
  );
}
