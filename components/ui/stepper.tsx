"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepItem {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  optional?: boolean;
}

export interface StepperProps {
  steps: StepItem[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Stepper({
  steps,
  currentStep,
  onStepClick,
  orientation = "horizontal",
  className,
}: StepperProps) {
  const isVertical = orientation === "vertical";

  return (
    <nav
      aria-label="Progress steps"
      className={cn(
        isVertical ? "flex flex-col space-y-4" : "flex items-center w-full justify-between",
        className
      )}
    >
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isActive = idx === currentStep;
        const isClickable = Boolean(onStepClick);

        return (
          <React.Fragment key={step.title}>
            <div
              onClick={() => isClickable && onStepClick?.(idx)}
              className={cn(
                "flex items-center gap-3 group text-left",
                isClickable && "cursor-pointer select-none",
                isVertical && "w-full"
              )}
            >
              {/* Step indicator circle */}
              <div
                className={cn(
                  "relative flex items-center justify-center shrink-0 rounded-full font-mono text-xs font-semibold transition-all",
                  "h-8 w-8",
                  isCompleted && "bg-primary text-primary-foreground",
                  isActive && "border-2 border-primary text-primary bg-primary/10 ring-4 ring-primary/20",
                  !isCompleted && !isActive && "border border-muted-foreground/30 text-muted-foreground bg-muted/40",
                  isClickable && "group-hover:border-primary group-hover:text-primary"
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : step.icon ? (
                  step.icon
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>

              {/* Step text */}
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "text-xs sm:text-sm font-medium transition-colors block truncate",
                      isActive && "font-semibold text-foreground",
                      isCompleted && "text-foreground",
                      !isActive && !isCompleted && "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                  {step.optional && (
                    <span className="text-[10px] text-muted-foreground italic">(Optional)</span>
                  )}
                </div>
                {step.description && (
                  <p
                    className={cn(
                      "text-xs text-muted-foreground truncate max-w-[180px] sm:max-w-xs",
                      !isVertical && "hidden sm:block"
                    )}
                  >
                    {step.description}
                  </p>
                )}
              </div>
            </div>

            {/* Connecting line */}
            {idx < steps.length - 1 && (
              <div
                className={cn(
                  isVertical
                    ? "ml-4 h-6 w-0.5 my-1"
                    : "flex-1 h-0.5 mx-2 sm:mx-4 hidden sm:block",
                  idx < currentStep ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
