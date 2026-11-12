"use client";

import * as React from "react";
import { Check, Copy, Columns2, AlignJustify } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CodeDiffProps extends React.HTMLAttributes<HTMLDivElement> {
  oldCode: string;
  newCode: string;
  oldTitle?: string;
  newTitle?: string;
  defaultMode?: "split" | "unified";
  language?: string;
}

interface DiffLine {
  type: "added" | "removed" | "unchanged";
  oldLineNumber?: number;
  newLineNumber?: number;
  content: string;
}

// Compute simple line-by-line diff without heavy external dependency
function computeDiff(oldText: string, newText: string): DiffLine[] {
  const oldLines = oldText.split("\n");
  const newLines = newText.split("\n");
  const lines: DiffLine[] = [];

  let i = 0;
  let j = 0;

  while (i < oldLines.length || j < newLines.length) {
    if (i < oldLines.length && j < newLines.length) {
      if (oldLines[i] === newLines[j]) {
        lines.push({
          type: "unchanged",
          oldLineNumber: i + 1,
          newLineNumber: j + 1,
          content: oldLines[i],
        });
        i++;
        j++;
      } else {
        // Look ahead for matches
        const nextMatchInNew = newLines.indexOf(oldLines[i], j);
        const nextMatchInOld = oldLines.indexOf(newLines[j], i);

        if (nextMatchInNew !== -1 && (nextMatchInOld === -1 || nextMatchInNew <= nextMatchInOld)) {
          lines.push({
            type: "added",
            newLineNumber: j + 1,
            content: newLines[j],
          });
          j++;
        } else {
          lines.push({
            type: "removed",
            oldLineNumber: i + 1,
            content: oldLines[i],
          });
          i++;
        }
      }
    } else if (i < oldLines.length) {
      lines.push({
        type: "removed",
        oldLineNumber: i + 1,
        content: oldLines[i],
      });
      i++;
    } else {
      lines.push({
        type: "added",
        newLineNumber: j + 1,
        content: newLines[j],
      });
      j++;
    }
  }

  return lines;
}

export function CodeDiff({
  oldCode,
  newCode,
  oldTitle = "original",
  newTitle = "modified",
  defaultMode = "split",
  language = "typescript",
  className,
  ...props
}: CodeDiffProps) {
  const [mode, setMode] = React.useState<"split" | "unified">(defaultMode);
  const [copied, setCopied] = React.useState(false);

  const diffLines = React.useMemo(() => computeDiff(oldCode, newCode), [oldCode, newCode]);

  const handleCopyNew = () => {
    navigator.clipboard.writeText(newCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const oldLines = oldCode.split("\n");
  const newLines = newCode.split("\n");

  return (
    <div
      role="region"
      aria-label="Code difference comparison"
      className={cn("w-full rounded-xl border bg-card text-card-foreground shadow-2xs overflow-hidden font-mono text-xs", className)}
      {...props}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/40 gap-2">
        <div className="flex items-center gap-2 text-xs font-sans text-muted-foreground truncate">
          <span className="font-medium text-foreground">{oldTitle}</span>
          <span className="text-muted-foreground/60">→</span>
          <span className="font-medium text-foreground">{newTitle}</span>
          {language && (
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground border">
              {language}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0 font-sans">
          {/* Mode switch */}
          <div className="flex items-center bg-muted/60 p-0.5 rounded-lg border text-xs">
            <button
              type="button"
              onClick={() => setMode("unified")}
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-md transition-colors",
                mode === "unified" ? "bg-background text-foreground shadow-2xs font-medium" : "text-muted-foreground hover:text-foreground"
              )}
              title="Unified view"
            >
              <AlignJustify className="h-3 w-3" />
              <span className="hidden sm:inline">Unified</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("split")}
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-md transition-colors",
                mode === "split" ? "bg-background text-foreground shadow-2xs font-medium" : "text-muted-foreground hover:text-foreground"
              )}
              title="Split view"
            >
              <Columns2 className="h-3 w-3" />
              <span className="hidden sm:inline">Split</span>
            </button>
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopyNew}
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            <span className="sr-only">Copy new code</span>
          </Button>
        </div>
      </div>

      {/* Code body */}
      <div className="overflow-x-auto text-[11px] sm:text-xs">
        {mode === "unified" ? (
          <div className="divide-y divide-border/20 min-w-full">
            {diffLines.map((line, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-start px-2 py-0.5 font-mono",
                  line.type === "added" && "bg-emerald-500/10 text-emerald-900 dark:text-emerald-300",
                  line.type === "removed" && "bg-rose-500/10 text-rose-900 dark:text-rose-300",
                  line.type === "unchanged" && "hover:bg-muted/30"
                )}
              >
                <span className="w-8 shrink-0 text-right pr-2 text-muted-foreground/60 select-none">
                  {line.oldLineNumber || ""}
                </span>
                <span className="w-8 shrink-0 text-right pr-2 text-muted-foreground/60 select-none">
                  {line.newLineNumber || ""}
                </span>
                <span className="w-5 shrink-0 text-center font-bold select-none">
                  {line.type === "added" ? "+" : line.type === "removed" ? "-" : " "}
                </span>
                <pre className="flex-1 whitespace-pre overflow-x-auto m-0 font-mono">{line.content}</pre>
              </div>
            ))}
          </div>
        ) : (
          /* Split View */
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border min-w-full">
            {/* Old side */}
            <div className="divide-y divide-border/20">
              <div className="px-3 py-1 bg-muted/20 text-[10px] uppercase font-sans font-medium text-muted-foreground border-b select-none">
                {oldTitle}
              </div>
              {oldLines.map((line, idx) => (
                <div key={idx} className="flex items-start px-2 py-0.5 hover:bg-muted/30">
                  <span className="w-7 shrink-0 text-right pr-2 text-muted-foreground/60 select-none">
                    {idx + 1}
                  </span>
                  <pre className="flex-1 whitespace-pre overflow-x-auto m-0 font-mono">{line}</pre>
                </div>
              ))}
            </div>

            {/* New side */}
            <div className="divide-y divide-border/20">
              <div className="px-3 py-1 bg-muted/20 text-[10px] uppercase font-sans font-medium text-muted-foreground border-b select-none">
                {newTitle}
              </div>
              {newLines.map((line, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex items-start px-2 py-0.5",
                    !oldLines.includes(line) && "bg-emerald-500/10 text-emerald-900 dark:text-emerald-300"
                  )}
                >
                  <span className="w-7 shrink-0 text-right pr-2 text-muted-foreground/60 select-none">
                    {idx + 1}
                  </span>
                  <pre className="flex-1 whitespace-pre overflow-x-auto m-0 font-mono">{line}</pre>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
