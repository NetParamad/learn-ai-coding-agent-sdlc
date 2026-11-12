"use client";

import * as React from "react";
import { UploadCloud, FileText, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface FileItem {
  id: string;
  file: File;
  progress?: number;
  error?: string;
}

export interface FileUploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrop" | "onChange"> {
  accept?: string;
  maxSizeMb?: number;
  maxFiles?: number;
  disabled?: boolean;
  onFilesChange?: (files: File[]) => void;
  files?: FileItem[];
  className?: string;
}

export function FileUpload({
  accept,
  maxSizeMb = 10,
  maxFiles = 5,
  disabled = false,
  onFilesChange,
  files: controlledFiles,
  className,
  ...props
}: FileUploadProps) {
  const [internalFiles, setInternalFiles] = React.useState<FileItem[]>([]);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [validationError, setValidationError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const currentFiles = controlledFiles !== undefined ? controlledFiles : internalFiles;

  const updateFiles = (newFiles: FileItem[]) => {
    if (controlledFiles === undefined) {
      setInternalFiles(newFiles);
    }
    if (onFilesChange) {
      onFilesChange(newFiles.map((f) => f.file));
    }
  };

  const validateAndAddFiles = (incomingFiles: FileList | File[]) => {
    setValidationError(null);
    const validList: FileItem[] = [...currentFiles];
    const incomingArray = Array.from(incomingFiles);

    if (validList.length + incomingArray.length > maxFiles) {
      setValidationError(`Maximum ${maxFiles} files allowed.`);
      return;
    }

    for (const file of incomingArray) {
      if (file.size > maxSizeMb * 1024 * 1024) {
        setValidationError(`File "${file.name}" exceeds ${maxSizeMb}MB limit.`);
        continue;
      }
      validList.push({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        file,
        progress: 100,
      });
    }

    updateFiles(validList);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (disabled) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndAddFiles(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndAddFiles(e.target.files);
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const removeFile = (id: string) => {
    const next = currentFiles.filter((f) => f.id !== id);
    updateFiles(next);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={cn("space-y-4 w-full", className)} {...props}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-colors cursor-pointer",
          isDragOver
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 bg-muted/20 hover:bg-muted/30",
          disabled && "opacity-50 cursor-not-allowed hover:border-border hover:bg-muted/20"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={maxFiles > 1}
          disabled={disabled}
          onChange={handleInputChange}
          className="hidden"
          tabIndex={-1}
        />
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground ring-8 ring-muted/30 mb-3">
          <UploadCloud className="h-6 w-6 stroke-[1.5]" />
        </div>
        <div className="text-sm font-semibold text-foreground">
          Click to upload <span className="font-normal text-muted-foreground">or drag and drop</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {accept ? accept.replace(/,/g, ", ") : "All files"} up to {maxSizeMb}MB (max {maxFiles} files)
        </p>
      </div>

      {validationError && (
        <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 p-2.5 rounded-lg">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {currentFiles.length > 0 && (
        <ul className="space-y-2">
          {currentFiles.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-3 shadow-xs"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-xs font-medium text-foreground">{item.file.name}</p>
                    <span className="shrink-0 text-[11px] text-muted-foreground">
                      {formatFileSize(item.file.size)}
                    </span>
                  </div>
                  {item.progress !== undefined && item.progress < 100 && (
                    <Progress value={item.progress} className="h-1.5" />
                  )}
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(item.id);
                }}
                aria-label={`Remove file ${item.file.name}`}
              >
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
