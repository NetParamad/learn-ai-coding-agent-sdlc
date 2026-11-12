"use client";

import * as React from "react";
import { Moon, Sun, Laptop, Check } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface ThemeToggleProps {
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export function ThemeToggle({ side = "bottom", align = "end" }: ThemeToggleProps = {}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 rounded-md border border-border" />;
  }

  const currentTheme = theme || "system";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-border bg-background p-2 text-sm font-medium transition-colors hover:bg-muted cursor-pointer h-9 w-9"
          aria-label="Toggle theme"
          title={`Theme: ${currentTheme}`}
        >
          {currentTheme === "system" ? (
            <Laptop className="h-4 w-4 text-foreground transition-all" />
          ) : resolvedTheme === "dark" ? (
            <Moon className="h-4 w-4 text-foreground transition-all" />
          ) : (
            <Sun className="h-4 w-4 text-foreground transition-all" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side={side} align={align} className="w-36 mb-2">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center justify-between text-xs cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Sun className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Light</span>
          </div>
          {currentTheme === "light" && <Check className="h-3.5 w-3.5 text-primary font-bold" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center justify-between text-xs cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Moon className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Dark</span>
          </div>
          {currentTheme === "dark" && <Check className="h-3.5 w-3.5 text-primary font-bold" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center justify-between text-xs cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Laptop className="h-3.5 w-3.5 text-muted-foreground" />
            <span>System</span>
          </div>
          {currentTheme === "system" && <Check className="h-3.5 w-3.5 text-primary font-bold" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
