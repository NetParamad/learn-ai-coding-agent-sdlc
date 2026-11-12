"use client";

import * as React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * @component PasswordStrengthMeter
 * @description Interactive visual strength meter and requirement validator for password input fields.
 * @example
 * ```tsx
 * <PasswordStrengthMeter password={passwordValue} showRequirements />
 * ```
 */
export interface PasswordRequirement {
  id: string;
  label: string;
  test: (pass: string) => boolean;
}

export const DEFAULT_REQUIREMENTS: PasswordRequirement[] = [
  { id: "length", label: "At least 8 characters", test: (p) => p.length >= 8 },
  { id: "lowercase", label: "At least one lowercase letter", test: (p) => /[a-z]/.test(p) },
  { id: "uppercase", label: "At least one uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { id: "number", label: "At least one number", test: (p) => /\d/.test(p) },
  { id: "special", label: "At least one special character", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

export interface PasswordStrengthMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  password?: string;
  requirements?: PasswordRequirement[];
  showRequirements?: boolean;
}

export function PasswordStrengthMeter({
  password = "",
  requirements = DEFAULT_REQUIREMENTS,
  showRequirements = true,
  className,
  ...props
}: PasswordStrengthMeterProps) {
  const passedCount = React.useMemo(() => {
    if (!password) return 0;
    return requirements.filter((r) => r.test(password)).length;
  }, [password, requirements]);

  const strengthLevel = React.useMemo(() => {
    if (!password) return { label: "", color: "bg-muted", percent: 0 };
    const ratio = passedCount / requirements.length;
    if (ratio < 0.4) return { label: "Weak", color: "bg-destructive", percent: 25 };
    if (ratio < 0.7) return { label: "Fair", color: "bg-amber-500", percent: 50 };
    if (ratio < 1) return { label: "Good", color: "bg-blue-500", percent: 75 };
    return { label: "Strong", color: "bg-emerald-500", percent: 100 };
  }, [passedCount, requirements.length, password]);

  return (
    <div className={cn("space-y-2.5 w-full", className)} {...props}>
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground text-[11px]">Password strength</span>
          {password && (
            <span className="font-medium text-[11px] capitalize text-foreground">
              {strengthLevel.label}
            </span>
          )}
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden flex gap-1">
          {[1, 2, 3, 4].map((step) => {
            const stepThreshold = step * 25;
            const isActive = strengthLevel.percent >= stepThreshold;
            return (
              <div
                key={step}
                className={cn(
                  "h-full flex-1 rounded-full transition-all duration-300",
                  isActive ? strengthLevel.color : "bg-muted"
                )}
              />
            );
          })}
        </div>
      </div>

      {showRequirements && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-[11px]">
          {requirements.map((req) => {
            const isMet = password ? req.test(password) : false;
            return (
              <li
                key={req.id}
                className={cn(
                  "flex items-center gap-1.5 transition-colors",
                  isMet ? "text-foreground font-medium" : "text-muted-foreground"
                )}
              >
                {isMet ? (
                  <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                ) : (
                  <X className="h-3 w-3 text-muted-foreground/50 shrink-0" />
                )}
                <span>{req.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
