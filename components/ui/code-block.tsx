"use client";

import * as React from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = "bash",
  filename,
  showLineNumbers = false,
  className,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const lines = code.trim().split("\n");

  return (
    <div
      className={cn(
        "relative rounded-xl border bg-zinc-950 text-zinc-50 dark:bg-zinc-950 overflow-hidden font-mono shadow-xs",
        className
      )}
      {...props}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 py-2">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Terminal className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-zinc-300 font-medium">
            {filename || language}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {language && (
            <Badge
              variant="outline"
              className="border-zinc-700 bg-zinc-800 text-[10px] text-zinc-300 font-mono uppercase"
            >
              {language}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 px-2 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors gap-1.5"
            aria-label="Copy code snippet"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-sans text-xs">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span className="font-sans text-xs">Copy</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Code body */}
      <div className="overflow-x-auto p-4 text-xs leading-relaxed">
        <pre className="flex">
          {showLineNumbers && (
            <div className="select-none pr-4 text-right text-zinc-600 font-mono">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          )}
          <code className="flex-1 text-zinc-200 font-mono">
            {lines.map((line, i) => (
              <div key={i}>{line || "\n"}</div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
