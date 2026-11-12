"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface QuantityInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: "sm" | "default";
  onChange?: (val: number) => void;
}

export function QuantityInput({
  value: controlledValue,
  defaultValue = 1,
  min = 1,
  max = 99,
  step = 1,
  disabled = false,
  size = "default",
  onChange,
  className,
  ...props
}: QuantityInputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const clamp = (val: number) => Math.min(Math.max(val, min), max);

  const updateValue = (nextVal: number) => {
    const clamped = clamp(nextVal);
    if (controlledValue === undefined) {
      setInternalValue(clamped);
    }
    onChange?.(clamped);
  };

  const handleDecrement = () => updateValue(value - step);
  const handleIncrement = () => updateValue(value + step);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value, 10);
    if (!Number.isNaN(parsed)) {
      updateValue(parsed);
    } else if (e.target.value === "") {
      if (controlledValue === undefined) setInternalValue(min);
      onChange?.(min);
    }
  };

  const isSmall = size === "sm";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border bg-background shadow-2xs transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={disabled || value <= min}
        onClick={handleDecrement}
        aria-label="Decrease quantity"
        className={cn(
          "rounded-r-none border-r text-muted-foreground hover:text-foreground",
          isSmall ? "h-7 w-7" : "h-9 w-9"
        )}
      >
        <Minus className={isSmall ? "h-3 w-3" : "h-3.5 w-3.5"} />
      </Button>

      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={handleInputChange}
        aria-label="Quantity"
        className={cn(
          "text-center font-mono font-medium text-foreground bg-transparent focus:outline-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none",
          isSmall ? "h-7 w-10 text-xs" : "h-9 w-12 text-sm"
        )}
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={disabled || value >= max}
        onClick={handleIncrement}
        aria-label="Increase quantity"
        className={cn(
          "rounded-l-none border-l text-muted-foreground hover:text-foreground",
          isSmall ? "h-7 w-7" : "h-9 w-9"
        )}
      >
        <Plus className={isSmall ? "h-3 w-3" : "h-3.5 w-3.5"} />
      </Button>
    </div>
  );
}
