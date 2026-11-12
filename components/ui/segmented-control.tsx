"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SegmentedControlOption {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: SegmentedControlOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: "sm" | "default" | "lg";
  fullWidth?: boolean;
}

export function SegmentedControl({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  size = "default",
  fullWidth = false,
  className,
  ...props
}: SegmentedControlProps) {
  const [internalValue, setInternalValue] = React.useState<string>(
    defaultValue || options[0]?.value || ""
  );
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = React.useState<{
    left: number;
    width: number;
  }>({ left: 0, width: 0 });

  const activeValue = controlledValue !== undefined ? controlledValue : internalValue;

  const updateIndicator = React.useCallback(() => {
    if (!containerRef.current) return;
    const activeButton = containerRef.current.querySelector<HTMLButtonElement>(
      `[data-value="${activeValue}"]`
    );
    if (activeButton) {
      setIndicatorStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
    }
  }, [activeValue]);

  React.useEffect(() => {
    updateIndicator();
  }, [updateIndicator, options]);

  React.useEffect(() => {
    const handleResize = () => updateIndicator();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateIndicator]);

  const handleSelect = (val: string, disabled?: boolean) => {
    if (disabled) return;
    if (controlledValue === undefined) {
      setInternalValue(val);
    }
    onChange?.(val);
  };

  const sizeClasses = {
    sm: "h-8 p-0.5 text-xs",
    default: "h-9 p-1 text-xs",
    lg: "h-11 p-1.5 text-sm",
  }[size];

  const buttonSizeClasses = {
    sm: "px-2.5 py-1",
    default: "px-3 py-1.5",
    lg: "px-4 py-2",
  }[size];

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      className={cn(
        "relative inline-flex items-center rounded-lg bg-muted/60 p-1 border border-border/40 select-none",
        fullWidth && "w-full",
        sizeClasses,
        className
      )}
      {...props}
    >
      {/* Sliding Active Pill */}
      {indicatorStyle.width > 0 && (
        <div
          aria-hidden="true"
          className="absolute top-1 bottom-1 rounded-md bg-background shadow-xs transition-all duration-200 ease-out"
          style={{
            transform: `translateX(${indicatorStyle.left}px)`,
            width: `${indicatorStyle.width}px`,
          }}
        />
      )}

      {options.map((option) => {
        const isSelected = option.value === activeValue;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            data-value={option.value}
            aria-checked={isSelected}
            disabled={option.disabled}
            onClick={() => handleSelect(option.value, option.disabled)}
            className={cn(
              "relative z-10 inline-flex items-center justify-center gap-1.5 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md whitespace-nowrap",
              fullWidth ? "flex-1" : "",
              buttonSizeClasses,
              isSelected
                ? "text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground",
              option.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
            )}
          >
            {option.icon && <span className="shrink-0">{option.icon}</span>}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
