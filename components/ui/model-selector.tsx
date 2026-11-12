"use client";

import * as React from "react";
import { Check, ChevronDown, Cpu, Zap, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * @component ModelSelector
 * @description Accessible model switcher dropdown for AI applications with provider tags and capability badges.
 * @example
 * ```tsx
 * <ModelSelector
 *   models={[
 *     { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", badge: "Smartest", contextWindow: "128k" },
 *     { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic", badge: "Coding", contextWindow: "200k" },
 *   ]}
 *   selectedModelId="claude-3-5-sonnet"
 *   onSelectModel={(model) => console.log(model)}
 * />
 * ```
 */
export interface AIModelOption {
  id: string;
  name: string;
  provider: string;
  description?: string;
  badge?: string;
  contextWindow?: string;
  speed?: "fast" | "standard" | "deep";
}

export interface ModelSelectorProps {
  models: AIModelOption[];
  selectedModelId: string;
  onSelectModel: (model: AIModelOption) => void;
  className?: string;
  disabled?: boolean;
}

export function ModelSelector({
  models,
  selectedModelId,
  onSelectModel,
  className,
  disabled = false,
}: ModelSelectorProps) {
  const selected = models.find((m) => m.id === selectedModelId) || models[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <Button
          variant="outline"
          size="sm"
          className={cn("h-8 gap-2 px-2.5 text-xs font-medium border-border/80 shadow-2xs", className)}
        >
          <Cpu className="h-3.5 w-3.5 text-primary shrink-0" />
          <span className="truncate max-w-[130px]">{selected ? selected.name : "Select model"}</span>
          {selected?.badge && (
            <Badge variant="secondary" className="px-1.5 py-0 text-[10px] h-4 font-normal">
              {selected.badge}
            </Badge>
          )}
          <ChevronDown className="h-3 w-3 opacity-50 shrink-0 ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64 p-1">
        <DropdownMenuLabel className="text-[11px] font-normal text-muted-foreground px-2 py-1.5">
          Select AI Engine
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {models.map((model) => {
          const isSelected = model.id === selectedModelId;
          return (
            <DropdownMenuItem
              key={model.id}
              onClick={() => onSelectModel(model)}
              className="flex items-center justify-between p-2 cursor-pointer gap-2"
            >
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className={cn("text-xs font-medium truncate", isSelected && "text-primary")}>
                    {model.name}
                  </span>
                  {model.badge && (
                    <Badge variant="outline" className="text-[9px] px-1 py-0 h-3.5">
                      {model.badge}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-0.5">
                  <span>{model.provider}</span>
                  {model.contextWindow && <span>• {model.contextWindow}</span>}
                </div>
              </div>
              {isSelected && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
