"use client";

import * as React from "react";
import { Terminal, Copy, Check, Sparkles, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ComponentInstallButtonProps {
  name: string;
  title?: string;
  locale?: string;
  className?: string;
  size?: "sm" | "default" | "icon";
}

function toPascalCase(str: string): string {
  return str
    .split("-")
    .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1))
    .join("");
}

export function ComponentInstallButton({
  name,
  title,
  locale = "en",
  className,
  size = "sm",
}: ComponentInstallButtonProps) {
  const [activeTab, setActiveTab] = React.useState<"cli" | "jsx">("cli");
  const [copiedType, setCopiedType] = React.useState<"shadcn" | "ai" | "jsx-import" | "jsx-usage" | null>(null);
  const [origin, setOrigin] = React.useState("https://starter-system-design.vercel.app");

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.location.origin) {
      setOrigin(window.location.origin);
    }
  }, []);

  const isTheme = name === "theme" || name.startsWith("theme-");
  const themeKey = name.replace(/^theme-/, "");
  const componentSymbol = toPascalCase(name);

  const shadcnCmd = isTheme
    ? `npx shadcn add ${origin}/r/${name === "theme" ? "theme.json" : `${name}.json`}`
    : `npx shadcn add ${origin}/r/${name}.json`;
  const aiCmd = isTheme
    ? (name === "theme" ? `node scripts/ai-export.js theme .` : `node scripts/ai-export.js theme:${themeKey} .`)
    : `node scripts/ai-export.js ${name} . --theme`;

  const jsxImport = isTheme
    ? `import "@/app/globals.css"; /* OKLCH theme variables */`
    : `import { ${componentSymbol} } from "@/components/ui/${name}";`;
  const jsxUsage = isTheme
    ? `<body className="theme-${themeKey}">`
    : `<${componentSymbol} />`;

  const labels = {
    install: "Install / Code",
    copied: "Copied to clipboard",
    shadcnTitle: "shadcn CLI (Remote URL)",
    aiTitle: "AI Agent / Local Exporter",
    installTitle: `Install ${title || name}`,
    jsxImportTitle: "TypeScript Import",
    jsxUsageTitle: "JSX Usage Snippet",
  };

  const handleCopy = (text: string, type: "shadcn" | "ai" | "jsx-import" | "jsx-usage") => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    toast.success(labels.copied, {
      description: text,
    });
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size={size}
          className={`h-7 px-2 text-xs font-mono gap-1.5 border-dashed hover:border-primary/50 shrink-0 ${className || ""}`}
          title={labels.installTitle}
        >
          <Terminal className="h-3 w-3 text-primary" />
          <span>{labels.install}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[calc(100vw-2rem)] sm:w-96 max-w-sm p-4 space-y-3" align="end">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-1.5">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="font-semibold text-xs sm:text-sm">{labels.installTitle}</span>
          </div>
          <Badge variant="secondary" className="text-[10px] font-mono">
            OKLCH · v4
          </Badge>
        </div>

        {/* Tab Switcher: CLI vs JSX */}
        <div className="flex rounded-lg border bg-muted/40 p-0.5 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab("cli")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1 rounded-md transition-all ${
              activeTab === "cli"
                ? "bg-background text-foreground shadow-2xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>CLI Commands</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("jsx")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1 rounded-md transition-all ${
              activeTab === "jsx"
                ? "bg-background text-foreground shadow-2xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>JSX / Code</span>
          </button>
        </div>

        {activeTab === "cli" ? (
          <>
            {/* 1. Official shadcn CLI */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  {labels.shadcnTitle}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleCopy(shadcnCmd, "shadcn")}
                  title="Copy shadcn CLI command"
                >
                  {copiedType === "shadcn" ? (
                    <Check className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
              <pre className="p-2 rounded-md bg-muted font-mono text-xs overflow-x-auto select-all text-foreground border">
                <code>{shadcnCmd}</code>
              </pre>
            </div>

            {/* 2. AI Agent Exporter CLI */}
            <div className="space-y-1.5 pt-1 border-t">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-primary" />
                  <span>{labels.aiTitle}</span>
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleCopy(aiCmd, "ai")}
                  title="Copy AI export CLI command"
                >
                  {copiedType === "ai" ? (
                    <Check className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
              <pre className="p-2 rounded-md bg-muted font-mono text-xs overflow-x-auto select-all text-foreground border">
                <code>{aiCmd}</code>
              </pre>
            </div>
          </>
        ) : (
          <>
            {/* JSX Import */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  {labels.jsxImportTitle}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleCopy(jsxImport, "jsx-import")}
                  title="Copy import statement"
                >
                  {copiedType === "jsx-import" ? (
                    <Check className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
              <pre className="p-2 rounded-md bg-muted font-mono text-xs overflow-x-auto select-all text-foreground border">
                <code>{jsxImport}</code>
              </pre>
            </div>

            {/* JSX Usage */}
            <div className="space-y-1.5 pt-1 border-t">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  {labels.jsxUsageTitle}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleCopy(jsxUsage, "jsx-usage")}
                  title="Copy usage snippet"
                >
                  {copiedType === "jsx-usage" ? (
                    <Check className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
              <pre className="p-2 rounded-md bg-muted font-mono text-xs overflow-x-auto select-all text-foreground border">
                <code>{jsxUsage}</code>
              </pre>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
