"use client";

import * as React from "react";
import { ChevronRight, Folder, FolderOpen, File, FileCode, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TreeItemData {
  id: string;
  name: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: TreeItemData[];
  defaultExpanded?: boolean;
}

export interface TreeViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  data: TreeItemData[];
  selectedId?: string;
  onSelect?: (item: TreeItemData) => void;
  expandAll?: boolean;
}

interface TreeNodeProps {
  item: TreeItemData;
  level: number;
  selectedId?: string;
  onSelect?: (item: TreeItemData) => void;
  expandedIds: Set<string>;
  toggleExpand: (id: string) => void;
}

function TreeNode({
  item,
  level,
  selectedId,
  onSelect,
  expandedIds,
  toggleExpand,
}: TreeNodeProps) {
  const hasChildren = Boolean(item.children && item.children.length > 0);
  const isExpanded = expandedIds.has(item.id);
  const isSelected = selectedId === item.id;

  const defaultIcon = hasChildren ? (
    isExpanded ? (
      <FolderOpen className="h-4 w-4 text-primary shrink-0" />
    ) : (
      <Folder className="h-4 w-4 text-muted-foreground shrink-0" />
    )
  ) : item.name.endsWith(".tsx") || item.name.endsWith(".ts") || item.name.endsWith(".json") ? (
    <FileCode className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
  ) : item.name.endsWith(".md") ? (
    <FileText className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
  ) : (
    <File className="h-4 w-4 text-muted-foreground shrink-0" />
  );

  return (
    <div role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined} aria-selected={isSelected}>
      <button
        type="button"
        onClick={() => {
          if (hasChildren) {
            toggleExpand(item.id);
          }
          onSelect?.(item);
        }}
        style={{ paddingLeft: `${Math.max(level * 16, 8)}px` }}
        className={cn(
          "w-full flex items-center gap-2 py-1.5 pr-2.5 rounded-md text-xs font-medium transition-colors text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-ring select-none",
          isSelected
            ? "bg-primary/10 text-primary font-semibold"
            : "text-foreground hover:bg-muted/60"
        )}
      >
        <span
          className={cn(
            "h-4 w-4 flex items-center justify-center shrink-0 transition-transform duration-150",
            !hasChildren && "opacity-0 pointer-events-none",
            isExpanded && "rotate-90"
          )}
        >
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
        </span>

        {item.icon || defaultIcon}

        <span className="truncate flex-1">{item.name}</span>

        {item.badge && (
          <span className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
            {item.badge}
          </span>
        )}
      </button>

      {hasChildren && isExpanded && (
        <div role="group" className="relative border-l border-border/40 ml-4 pl-1">
          {item.children!.map((child) => (
            <TreeNode
              key={child.id}
              item={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              expandedIds={expandedIds}
              toggleExpand={toggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function TreeView({
  data,
  selectedId,
  onSelect,
  expandAll = false,
  className,
  ...props
}: TreeViewProps) {
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(() => {
    const ids = new Set<string>();
    const collectIds = (items: TreeItemData[]) => {
      items.forEach((item) => {
        if (expandAll || item.defaultExpanded) {
          ids.add(item.id);
        }
        if (item.children) {
          collectIds(item.children);
        }
      });
    };
    collectIds(data);
    return ids;
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div
      role="tree"
      className={cn("w-full border rounded-lg p-2 bg-card/60 backdrop-blur-xs shadow-2xs space-y-0.5", className)}
      {...props}
    >
      {data.map((item) => (
        <TreeNode
          key={item.id}
          item={item}
          level={0}
          selectedId={selectedId}
          onSelect={onSelect}
          expandedIds={expandedIds}
          toggleExpand={toggleExpand}
        />
      ))}
    </div>
  );
}
