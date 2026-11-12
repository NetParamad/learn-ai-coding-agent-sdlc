"use client";

import * as React from "react";
import { Plus, Trash2, Filter, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface FilterField {
  id: string;
  label: string;
  type?: "string" | "number" | "select";
  options?: { label: string; value: string }[];
}

export type FilterOperator =
  | "equals"
  | "not_equals"
  | "contains"
  | "starts_with"
  | "greater_than"
  | "less_than"
  | "is_empty";

export interface FilterRule {
  id: string;
  field: string;
  operator: FilterOperator;
  value: string;
}

export interface FilterGroup {
  conjunction: "AND" | "OR";
  rules: FilterRule[];
}

export interface FilterBuilderProps {
  fields: FilterField[];
  value?: FilterGroup;
  onChange?: (val: FilterGroup) => void;
  onApply?: (val: FilterGroup) => void;
  onReset?: () => void;
  className?: string;
}

const DEFAULT_OPERATORS: { label: string; value: FilterOperator }[] = [
  { label: "Equals", value: "equals" },
  { label: "Not equals", value: "not_equals" },
  { label: "Contains", value: "contains" },
  { label: "Starts with", value: "starts_with" },
  { label: "Greater than", value: "greater_than" },
  { label: "Less than", value: "less_than" },
];

export function FilterBuilder({
  fields,
  value,
  onChange,
  onApply,
  onReset,
  className,
}: FilterBuilderProps) {
  const [internalState, setInternalState] = React.useState<FilterGroup>(
    value || {
      conjunction: "AND",
      rules: [
        {
          id: "r-1",
          field: fields[0]?.id || "",
          operator: "equals",
          value: "",
        },
      ],
    }
  );

  const activeGroup = value || internalState;

  const updateGroup = (newGroup: FilterGroup) => {
    setInternalState(newGroup);
    onChange?.(newGroup);
  };

  const toggleConjunction = () => {
    updateGroup({
      ...activeGroup,
      conjunction: activeGroup.conjunction === "AND" ? "OR" : "AND",
    });
  };

  const addRule = () => {
    const newRule: FilterRule = {
      id: `r-${Date.now()}`,
      field: fields[0]?.id || "",
      operator: "equals",
      value: "",
    };
    updateGroup({
      ...activeGroup,
      rules: [...activeGroup.rules, newRule],
    });
  };

  const removeRule = (id: string) => {
    const updated = activeGroup.rules.filter((r) => r.id !== id);
    updateGroup({
      ...activeGroup,
      rules: updated.length > 0 ? updated : [],
    });
  };

  const updateRule = (id: string, partial: Partial<FilterRule>) => {
    const updated = activeGroup.rules.map((r) =>
      r.id === id ? { ...r, ...partial } : r
    );
    updateGroup({
      ...activeGroup,
      rules: updated,
    });
  };

  const handleReset = () => {
    const empty: FilterGroup = {
      conjunction: "AND",
      rules: [],
    };
    updateGroup(empty);
    onReset?.();
  };

  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-4 space-y-4 shadow-xs",
        className
      )}
    >
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-primary" />
          <span className="text-xs sm:text-sm font-semibold">Filter Builder</span>
          <Badge variant="secondary" className="text-[10px] font-mono">
            {activeGroup.rules.length} {activeGroup.rules.length === 1 ? "rule" : "rules"}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          {activeGroup.rules.length > 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={toggleConjunction}
              className="h-7 text-xs font-mono font-semibold"
            >
              Match: <span className="text-primary ml-1">{activeGroup.conjunction}</span>
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-7 text-xs text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      {/* Rules list */}
      {activeGroup.rules.length === 0 ? (
        <div className="text-center py-6 border border-dashed rounded-lg bg-muted/20">
          <p className="text-xs text-muted-foreground mb-3">No active filters applied</p>
          <Button variant="outline" size="sm" onClick={addRule} className="text-xs">
            <Plus className="h-3.5 w-3.5 mr-1" />
            Add First Rule
          </Button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {activeGroup.rules.map((rule, idx) => {
            const currentField = fields.find((f) => f.id === rule.field);

            return (
              <div
                key={rule.id}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2.5 rounded-lg border bg-muted/30"
              >
                {/* Conjunction connector label */}
                <span className="text-[10px] font-mono font-bold text-muted-foreground w-8 text-center shrink-0">
                  {idx === 0 ? "WHERE" : activeGroup.conjunction}
                </span>

                {/* Field selector */}
                <div className="w-full sm:w-44">
                  <Select
                    value={rule.field}
                    onValueChange={(val) => updateRule(rule.id, { field: val })}
                  >
                    <SelectTrigger className="h-8 text-xs bg-background">
                      <SelectValue placeholder="Field" />
                    </SelectTrigger>
                    <SelectContent>
                      {fields.map((f) => (
                        <SelectItem key={f.id} value={f.id} className="text-xs">
                          {f.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Operator selector */}
                <div className="w-full sm:w-36">
                  <Select
                    value={rule.operator}
                    onValueChange={(val) =>
                      updateRule(rule.id, { operator: val as FilterOperator })
                    }
                  >
                    <SelectTrigger className="h-8 text-xs bg-background">
                      <SelectValue placeholder="Operator" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEFAULT_OPERATORS.map((op) => (
                        <SelectItem key={op.value} value={op.value} className="text-xs">
                          {op.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Value input */}
                <div className="flex-1">
                  {currentField?.type === "select" && currentField.options ? (
                    <Select
                      value={rule.value}
                      onValueChange={(val) => updateRule(rule.id, { value: val })}
                    >
                      <SelectTrigger className="h-8 text-xs bg-background">
                        <SelectValue placeholder="Select value..." />
                      </SelectTrigger>
                      <SelectContent>
                        {currentField.options.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value} className="text-xs">
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      value={rule.value}
                      onChange={(e) => updateRule(rule.id, { value: e.target.value })}
                      placeholder="Enter filter value..."
                      className="h-8 text-xs bg-background"
                    />
                  )}
                </div>

                {/* Remove button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeRule(rule.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
                  title="Remove rule"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={addRule}
          className="h-8 text-xs gap-1.5"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Condition</span>
        </Button>

        {onApply && (
          <Button
            variant="default"
            size="sm"
            onClick={() => onApply(activeGroup)}
            className="h-8 text-xs"
          >
            Apply Filters
          </Button>
        )}
      </div>
    </div>
  );
}
