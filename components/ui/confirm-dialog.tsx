"use client";

import * as React from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface ConfirmDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description: string;
  confirmWord: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm: () => Promise<void> | void;
  variant?: "destructive" | "default";
  className?: string;
}

export function ConfirmDialog({
  trigger,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  title,
  description,
  confirmWord,
  confirmButtonText = "Confirm Action",
  cancelButtonText = "Cancel",
  onConfirm,
  variant = "destructive",
  className,
}: ConfirmDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [typedWord, setTypedWord] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = setControlledOpen || setInternalOpen;

  const isMatching = typedWord.trim() === confirmWord.trim();

  const handleConfirm = async () => {
    if (!isMatching || isLoading) return;
    try {
      setIsLoading(true);
      await onConfirm();
      setOpen(false);
      setTypedWord("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setTypedWord("");
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={cn("sm:max-w-md", className)}>
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2">
            {variant === "destructive" && (
              <div className="p-2 rounded-full bg-destructive/10 text-destructive shrink-0">
                <AlertTriangle className="h-5 w-5" />
              </div>
            )}
            <DialogTitle className="text-base sm:text-lg">{title}</DialogTitle>
          </div>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <Label htmlFor="confirm-input" className="text-xs font-medium">
            To proceed, type <code className="font-mono font-bold text-foreground bg-muted px-1.5 py-0.5 rounded border">{confirmWord}</code> below:
          </Label>
          <Input
            id="confirm-input"
            type="text"
            value={typedWord}
            onChange={(e) => setTypedWord(e.target.value)}
            placeholder={confirmWord}
            autoComplete="off"
            spellCheck="false"
            className="font-mono text-sm"
          />
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
            onClick={() => handleOpenChange(false)}
            disabled={isLoading}
          >
            {cancelButtonText}
          </Button>
          <Button
            variant={variant}
            size="sm"
            onClick={handleConfirm}
            disabled={!isMatching || isLoading}
            className="w-full sm:w-auto gap-1.5"
          >
            {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            <span>{confirmButtonText}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
