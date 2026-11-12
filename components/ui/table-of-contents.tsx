"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ListTree } from "lucide-react";

export interface TocItem {
  id: string;
  title: string;
  level?: 1 | 2 | 3;
}

export interface TableOfContentsProps extends React.HTMLAttributes<HTMLElement> {
  items: TocItem[];
  activeId?: string;
  onItemClick?: (id: string) => void;
  title?: string;
  autoScrollSpy?: boolean;
}

export function TableOfContents({
  items,
  activeId: controlledActiveId,
  onItemClick,
  title = "On This Page",
  autoScrollSpy = true,
  className,
  ...props
}: TableOfContentsProps) {
  const [internalActiveId, setInternalActiveId] = React.useState<string>(
    controlledActiveId || (items[0]?.id ?? "")
  );

  const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;

  React.useEffect(() => {
    if (controlledActiveId !== undefined) {
      setInternalActiveId(controlledActiveId);
    }
  }, [controlledActiveId]);

  React.useEffect(() => {
    if (!autoScrollSpy || controlledActiveId !== undefined || typeof window === "undefined") {
      return;
    }

    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible && visible.target.id) {
          setInternalActiveId(visible.target.id);
        }
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0.1 }
    );

    headingElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items, autoScrollSpy, controlledActiveId]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setInternalActiveId(id);
    onItemClick?.(id);

    if (typeof window !== "undefined") {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, "", `#${id}`);
      }
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Table of contents"
      className={cn("space-y-3 text-sm", className)}
      {...props}
    >
      {title && (
        <div className="flex items-center gap-2 font-medium text-foreground tracking-tight">
          <ListTree className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <span>{title}</span>
        </div>
      )}
      <ul className="space-y-1 border-l border-border pl-0">
        {items.map((item) => {
          const isActive = activeId === item.id;
          const levelIndent =
            item.level === 3 ? "pl-6 text-xs" : item.level === 2 ? "pl-4" : "pl-3";

          return (
            <li key={item.id} className="relative">
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  "block py-1 transition-colors text-muted-foreground hover:text-foreground -ml-px border-l-2",
                  levelIndent,
                  isActive
                    ? "border-primary font-medium text-primary"
                    : "border-transparent"
                )}
                aria-current={isActive ? "location" : undefined}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
