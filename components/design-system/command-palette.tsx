"use client";

import * as React from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Search,
  Sparkles,
  Layers,
  BarChart3,
  Compass,
  Bell,
  Box,
  Palette,
  Copy,
  ArrowRight,
} from "lucide-react";
import { OFFICIAL_THEMES } from "@/lib/themes";
import { cn } from "@/lib/utils";

export interface ComponentSearchItem {
  name: string;
  label: string;
  cluster: string;
  sectionId: string;
  cardId?: string;
  isEnterprise?: boolean;
}

export const CATALOG_ITEMS: ComponentSearchItem[] = [
  // Enterprise Primitives (Flagship)
  { name: "filter-builder", label: "Filter Builder", cluster: "Enterprise", sectionId: "forms", cardId: "card-filter-builder", isEnterprise: true },
  { name: "bulk-action-bar", label: "Bulk Action Bar", cluster: "Enterprise", sectionId: "data-display", isEnterprise: true },
  { name: "confirm-dialog", label: "Confirm Dialog", cluster: "Enterprise", sectionId: "overlays", cardId: "card-confirm-dialog", isEnterprise: true },
  { name: "status-badge", label: "Status Badge", cluster: "Enterprise", sectionId: "data-display", isEnterprise: true },
  { name: "stepper", label: "Stepper", cluster: "Enterprise", sectionId: "navigation", cardId: "card-stepper", isEnterprise: true },
  { name: "timeline", label: "Timeline", cluster: "Enterprise", sectionId: "data-display", cardId: "card-timeline", isEnterprise: true },
  { name: "file-upload", label: "File Upload", cluster: "Enterprise", sectionId: "forms", cardId: "card-file-upload", isEnterprise: true },

  // Core Primitives
  { name: "button", label: "Button", cluster: "Core Primitives", sectionId: "primitives" },
  { name: "badge", label: "Badge", cluster: "Core Primitives", sectionId: "primitives" },
  { name: "avatar", label: "Avatar", cluster: "Core Primitives", sectionId: "primitives" },
  { name: "avatar-group", label: "Avatar Group", cluster: "Core Primitives", sectionId: "primitives", cardId: "card-avatar-group" },
  { name: "aspect-ratio", label: "Aspect Ratio", cluster: "Core Primitives", sectionId: "primitives" },
  { name: "kbd", label: "Kbd", cluster: "Core Primitives", sectionId: "primitives" },
  { name: "separator", label: "Separator", cluster: "Core Primitives", sectionId: "primitives" },
  { name: "skeleton", label: "Skeleton", cluster: "Core Primitives", sectionId: "primitives" },
  { name: "toggle", label: "Toggle", cluster: "Core Primitives", sectionId: "primitives" },
  { name: "toggle-group", label: "Toggle Group", cluster: "Core Primitives", sectionId: "primitives" },
  { name: "hero-section", label: "Hero Section", cluster: "Core Primitives", sectionId: "primitives", cardId: "card-hero-section" },
  { name: "code-block", label: "Code Block", cluster: "Core Primitives", sectionId: "primitives", cardId: "card-code-block" },
  { name: "spinner", label: "Spinner", cluster: "Core Primitives", sectionId: "primitives", cardId: "card-spinner" },
  { name: "feature-grid", label: "Feature Grid", cluster: "Core Primitives", sectionId: "primitives", cardId: "card-feature-grid" },
  { name: "copy-button", label: "Copy Button", cluster: "Core Primitives", sectionId: "primitives", cardId: "card-copy-button" },
  { name: "callout", label: "Callout", cluster: "Core Primitives", sectionId: "primitives", cardId: "card-callout" },
  { name: "typography", label: "Typography", cluster: "Core Primitives", sectionId: "primitives" },

  // Forms & Inputs
  { name: "label", label: "Label", cluster: "Forms & Inputs", sectionId: "forms" },
  { name: "input", label: "Input", cluster: "Forms & Inputs", sectionId: "forms" },
  { name: "textarea", label: "Textarea", cluster: "Forms & Inputs", sectionId: "forms" },
  { name: "select", label: "Select", cluster: "Forms & Inputs", sectionId: "forms" },
  { name: "combobox", label: "Combobox", cluster: "Forms & Inputs", sectionId: "forms" },
  { name: "checkbox", label: "Checkbox", cluster: "Forms & Inputs", sectionId: "forms" },
  { name: "radio-group", label: "Radio Group", cluster: "Forms & Inputs", sectionId: "forms" },
  { name: "switch", label: "Switch", cluster: "Forms & Inputs", sectionId: "forms" },
  { name: "slider", label: "Slider", cluster: "Forms & Inputs", sectionId: "forms" },
  { name: "date-picker", label: "Date Picker", cluster: "Forms & Inputs", sectionId: "forms" },
  { name: "input-otp", label: "Input OTP", cluster: "Forms & Inputs", sectionId: "forms" },
  { name: "form", label: "Form", cluster: "Forms & Inputs", sectionId: "forms" },
  { name: "prompt-input", label: "Prompt Input", cluster: "Forms & Inputs", sectionId: "forms", cardId: "card-prompt-input" },
  { name: "prompt-suggestion-chips", label: "Prompt Suggestion Chips", cluster: "Forms & Inputs", sectionId: "forms", cardId: "card-prompt-input" },
  { name: "model-selector", label: "Model Selector", cluster: "Forms & Inputs", sectionId: "forms", cardId: "card-prompt-input" },
  { name: "password-strength-meter", label: "Password Strength Meter", cluster: "Forms & Inputs", sectionId: "forms", cardId: "card-password-strength-meter" },
  { name: "quantity-input", label: "Quantity Input", cluster: "Forms & Inputs", sectionId: "forms", cardId: "card-quantity-input" },
  { name: "tag-input", label: "Tag Input", cluster: "Forms & Inputs", sectionId: "forms", cardId: "card-tag-input" },
  { name: "rating", label: "Rating", cluster: "Forms & Inputs", sectionId: "forms", cardId: "card-rating" },

  // Data Display
  { name: "data-table", label: "Data Table", cluster: "Data Display", sectionId: "data-display" },
  { name: "table", label: "Table", cluster: "Data Display", sectionId: "data-display" },
  { name: "tree-view", label: "Tree View", cluster: "Data Display", sectionId: "data-display", cardId: "card-tree-view" },
  { name: "code-diff", label: "Code Diff", cluster: "Data Display", sectionId: "data-display", cardId: "card-code-diff" },
  { name: "card", label: "Card", cluster: "Data Display", sectionId: "data-display" },
  { name: "accordion", label: "Accordion", cluster: "Data Display", sectionId: "data-display" },
  { name: "collapsible", label: "Collapsible", cluster: "Data Display", sectionId: "data-display" },
  { name: "carousel", label: "Carousel", cluster: "Data Display", sectionId: "data-display" },
  { name: "chart", label: "Chart", cluster: "Data Display", sectionId: "data-display" },
  { name: "calendar", label: "Calendar", cluster: "Data Display", sectionId: "data-display" },
  { name: "empty-state", label: "Empty State", cluster: "Data Display", sectionId: "data-display" },
  { name: "metric-card", label: "Metric Card", cluster: "Data Display", sectionId: "data-display", cardId: "card-metric-card" },
  { name: "pricing-table", label: "Pricing Table", cluster: "Data Display", sectionId: "data-display", cardId: "card-pricing-table" },
  { name: "faq-section", label: "FAQ Section", cluster: "Data Display", sectionId: "data-display", cardId: "card-faq-section" },
  { name: "chat-container", label: "Chat Container", cluster: "Data Display", sectionId: "data-display", cardId: "card-chat-message" },
  { name: "chat-message", label: "Chat Message", cluster: "Data Display", sectionId: "data-display", cardId: "card-chat-message" },
  { name: "thinking-accordion", label: "Thinking Accordion", cluster: "Data Display", sectionId: "data-display", cardId: "card-chat-message" },
  { name: "activity-feed", label: "Activity Feed", cluster: "Data Display", sectionId: "data-display", cardId: "card-activity-feed" },
  { name: "testimonial-card", label: "Testimonial Card", cluster: "Data Display", sectionId: "data-display", cardId: "card-testimonial-card" },
  { name: "product-card", label: "Product Card", cluster: "Data Display", sectionId: "data-display", cardId: "card-product-card" },

  // Navigation
  { name: "navigation-menu", label: "Navigation Menu", cluster: "Navigation", sectionId: "navigation" },
  { name: "segmented-control", label: "Segmented Control", cluster: "Navigation", sectionId: "navigation", cardId: "card-segmented-control" },
  { name: "menubar", label: "Menubar", cluster: "Navigation", sectionId: "navigation" },
  { name: "breadcrumb", label: "Breadcrumb", cluster: "Navigation", sectionId: "navigation" },
  { name: "tabs", label: "Tabs", cluster: "Navigation", sectionId: "navigation" },
  { name: "pagination", label: "Pagination", cluster: "Navigation", sectionId: "navigation" },
  { name: "sidebar", label: "Sidebar", cluster: "Navigation", sectionId: "navigation" },
  { name: "scroll-area", label: "Scroll Area", cluster: "Navigation", sectionId: "navigation" },
  { name: "resizable", label: "Resizable", cluster: "Navigation", sectionId: "navigation" },
  { name: "reading-progress", label: "Reading Progress", cluster: "Navigation", sectionId: "navigation", cardId: "card-reading-progress" },
  { name: "page-header", label: "Page Header", cluster: "Navigation", sectionId: "navigation", cardId: "card-page-header" },
  { name: "user-nav", label: "User Nav", cluster: "Navigation", sectionId: "navigation", cardId: "card-user-nav" },
  { name: "footer-section", label: "Footer Section", cluster: "Navigation", sectionId: "navigation", cardId: "card-footer-section" },
  { name: "announcement-bar", label: "Announcement Bar", cluster: "Navigation", sectionId: "navigation", cardId: "card-announcement-bar" },
  { name: "table-of-contents", label: "Table of Contents", cluster: "Navigation", sectionId: "navigation", cardId: "card-table-of-contents" },

  // Overlays & Feedback
  { name: "command", label: "Command", cluster: "Overlays & Feedback", sectionId: "overlays" },
  { name: "dialog", label: "Dialog", cluster: "Overlays & Feedback", sectionId: "overlays" },
  { name: "alert-dialog", label: "Alert Dialog", cluster: "Overlays & Feedback", sectionId: "overlays" },
  { name: "sheet", label: "Sheet", cluster: "Overlays & Feedback", sectionId: "overlays" },
  { name: "drawer", label: "Drawer", cluster: "Overlays & Feedback", sectionId: "overlays" },
  { name: "cart-drawer", label: "Cart Drawer", cluster: "Overlays & Feedback", sectionId: "overlays", cardId: "card-cart-drawer" },
  { name: "popover", label: "Popover", cluster: "Overlays & Feedback", sectionId: "overlays" },
  { name: "tooltip", label: "Tooltip", cluster: "Overlays & Feedback", sectionId: "overlays" },
  { name: "hover-card", label: "Hover Card", cluster: "Overlays & Feedback", sectionId: "overlays" },
  { name: "citation-pill", label: "Citation Pill", cluster: "Overlays & Feedback", sectionId: "overlays", cardId: "card-confirm-dialog" },
  { name: "dropdown-menu", label: "Dropdown Menu", cluster: "Overlays & Feedback", sectionId: "overlays" },
  { name: "context-menu", label: "Context Menu", cluster: "Overlays & Feedback", sectionId: "overlays" },
  { name: "sonner", label: "Sonner Toast", cluster: "Overlays & Feedback", sectionId: "overlays" },
  { name: "toast", label: "Toast", cluster: "Overlays & Feedback", sectionId: "overlays", cardId: "card-confirm-dialog" },
  { name: "progress", label: "Progress", cluster: "Overlays & Feedback", sectionId: "overlays" },
  { name: "alert", label: "Alert", cluster: "Overlays & Feedback", sectionId: "overlays" },
  { name: "cookie-banner", label: "Cookie Banner", cluster: "Overlays & Feedback", sectionId: "overlays", cardId: "card-cookie-banner" },
  { name: "notification-bell", label: "Notification Bell", cluster: "Overlays & Feedback", sectionId: "overlays", cardId: "card-notification-bell" },
  { name: "notification-center", label: "Notification Center", cluster: "Overlays & Feedback", sectionId: "overlays", cardId: "card-notification-center" },
];

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyTheme?: (themeKey: string) => void;
}

export function CommandPalette({ open, onOpenChange, onApplyTheme }: CommandPaletteProps) {
  // Global shortcut listener: Cmd+K / Ctrl+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  const handleSelectComponent = (item: ComponentSearchItem) => {
    onOpenChange(false);

    // Scroll to specific card or parent section
    const targetElement = item.cardId
      ? document.getElementById(item.cardId) || document.getElementById(item.sectionId)
      : document.getElementById(item.sectionId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      
      // Pulse animation to draw eye
      targetElement.classList.add("ring-2", "ring-primary", "transition-all");
      setTimeout(() => {
        targetElement.classList.remove("ring-2", "ring-primary");
      }, 1800);
    }
  };

  const handleCopyCommand = (componentName: string, e?: React.SyntheticEvent) => {
    if (e) e.stopPropagation();
    const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    const cmd = `npx shadcn add ${origin}/r/${componentName}.json`;
    navigator.clipboard.writeText(cmd);
    toast.success(`Copied: ${cmd}`);
  };

  const [selectedSection, setSelectedSection] = React.useState<string>("all");

  const SECTIONS = [
    { id: "all", label: "All", count: CATALOG_ITEMS.length },
    { id: "primitives", label: "Primitives", count: CATALOG_ITEMS.filter((i) => i.sectionId === "primitives").length },
    { id: "forms", label: "Forms", count: CATALOG_ITEMS.filter((i) => i.sectionId === "forms").length },
    { id: "data-display", label: "Data Display", count: CATALOG_ITEMS.filter((i) => i.sectionId === "data-display").length },
    { id: "navigation", label: "Navigation", count: CATALOG_ITEMS.filter((i) => i.sectionId === "navigation").length },
    { id: "overlays", label: "Overlays", count: CATALOG_ITEMS.filter((i) => i.sectionId === "overlays").length },
    { id: "themes", label: "Themes", count: Object.keys(OFFICIAL_THEMES).length },
  ];

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder={`Search ${selectedSection === "all" ? "all 96 components" : selectedSection} & tokens...`} />
      
      {/* Section Filter Chips */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b bg-muted/20 overflow-x-auto no-scrollbar">
        {SECTIONS.map((sec) => (
          <button
            key={sec.id}
            type="button"
            onClick={() => setSelectedSection(sec.id)}
            className={cn(
              "px-2.5 py-1 rounded-full text-[11px] font-medium transition-all shrink-0 cursor-pointer",
              selectedSection === sec.id
                ? "bg-primary text-primary-foreground shadow-2xs font-semibold"
                : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground border border-input/60"
            )}
          >
            {sec.label} ({sec.count})
          </button>
        ))}
      </div>

      <CommandList className="max-h-[420px]">
        <CommandEmpty className="py-8 text-center text-sm text-muted-foreground">
          No matching components or actions found.
        </CommandEmpty>

        {/* Enterprise Flags */}
        {(selectedSection === "all" || CATALOG_ITEMS.some((i) => i.isEnterprise && i.sectionId === selectedSection)) && (
          <CommandGroup heading="Enterprise Primitives">
            {CATALOG_ITEMS.filter((i) => i.isEnterprise && (selectedSection === "all" || i.sectionId === selectedSection)).map((item) => (
              <CommandItem
                key={item.name}
                value={`${item.label} ${item.name} ${item.cluster} enterprise`}
                onSelect={() => handleSelectComponent(item)}
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="h-4 w-4 text-primary shrink-0" />
                  <span className="font-medium">{item.label}</span>
                  <span className="text-xs font-mono text-muted-foreground">({item.name})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => handleCopyCommand(item.name, e)}
                    title="Copy install command (Cmd+C)"
                    aria-label={`Copy install command for ${item.name}`}
                    className="opacity-0 group-data-[selected=true]:opacity-100 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-muted p-1 rounded transition-opacity"
                  >
                    <Copy className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                  </button>
                  <Badge variant="secondary" className="text-[10px] font-mono">
                    {item.sectionId}
                  </Badge>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-60" />
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {(selectedSection === "all" || selectedSection === "themes") && <CommandSeparator />}

        {/* Themes */}
        {(selectedSection === "all" || selectedSection === "themes") && (
          <CommandGroup heading="Themes & Colors (OKLCH)">
            {Object.entries(OFFICIAL_THEMES).map(([key, theme]) => (
              <CommandItem
                key={key}
                value={`theme ${theme.name} ${key} color palette oklch`}
                onSelect={() => {
                  onOpenChange(false);
                  if (onApplyTheme) onApplyTheme(key);
                }}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Palette className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="font-medium">{theme.name} Theme</span>
                  <span className="text-xs font-mono text-muted-foreground">{theme.role}</span>
                </div>
                <Badge variant="outline" className="text-[10px] font-mono">
                  Activate
                </Badge>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {(selectedSection === "all" || selectedSection === "forms") && <CommandSeparator />}

        {/* Forms & Inputs */}
        {(selectedSection === "all" || selectedSection === "forms") && (
          <CommandGroup heading="Forms & Inputs">
            {CATALOG_ITEMS.filter((i) => i.cluster === "Forms & Inputs" && !i.isEnterprise).map((item) => (
              <CommandItem
                key={item.name}
                value={`${item.label} ${item.name} form input`}
                onSelect={() => handleSelectComponent(item)}
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-muted-foreground">({item.name})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => handleCopyCommand(item.name, e)}
                    title="Copy install command (Cmd+C)"
                    aria-label={`Copy install command for ${item.name}`}
                    className="opacity-0 group-data-[selected=true]:opacity-100 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-muted p-1 rounded transition-opacity"
                  >
                    <Copy className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                  </button>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-60" />
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {(selectedSection === "all" || selectedSection === "data-display") && <CommandSeparator />}

        {/* Data Display */}
        {(selectedSection === "all" || selectedSection === "data-display") && (
          <CommandGroup heading="Data Display">
            {CATALOG_ITEMS.filter((i) => i.cluster === "Data Display" && !i.isEnterprise).map((item) => (
              <CommandItem
                key={item.name}
                value={`${item.label} ${item.name} data display table`}
                onSelect={() => handleSelectComponent(item)}
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <BarChart3 className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-muted-foreground">({item.name})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => handleCopyCommand(item.name, e)}
                    title="Copy install command (Cmd+C)"
                    aria-label={`Copy install command for ${item.name}`}
                    className="opacity-0 group-data-[selected=true]:opacity-100 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-muted p-1 rounded transition-opacity"
                  >
                    <Copy className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                  </button>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-60" />
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {(selectedSection === "all" || selectedSection === "navigation") && <CommandSeparator />}

        {/* Navigation */}
        {(selectedSection === "all" || selectedSection === "navigation") && (
          <CommandGroup heading="Navigation">
            {CATALOG_ITEMS.filter((i) => i.cluster === "Navigation" && !i.isEnterprise).map((item) => (
              <CommandItem
                key={item.name}
                value={`${item.label} ${item.name} navigation menu`}
                onSelect={() => handleSelectComponent(item)}
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-muted-foreground">({item.name})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => handleCopyCommand(item.name, e)}
                    title="Copy install command (Cmd+C)"
                    aria-label={`Copy install command for ${item.name}`}
                    className="opacity-0 group-data-[selected=true]:opacity-100 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-muted p-1 rounded transition-opacity"
                  >
                    <Copy className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                  </button>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-60" />
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {(selectedSection === "all" || selectedSection === "overlays") && <CommandSeparator />}

        {/* Overlays & Feedback */}
        {(selectedSection === "all" || selectedSection === "overlays") && (
          <CommandGroup heading="Overlays & Feedback">
            {CATALOG_ITEMS.filter((i) => i.cluster === "Overlays & Feedback" && !i.isEnterprise).map((item) => (
              <CommandItem
                key={item.name}
                value={`${item.label} ${item.name} overlay modal dialog`}
                onSelect={() => handleSelectComponent(item)}
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Bell className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-muted-foreground">({item.name})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => handleCopyCommand(item.name, e)}
                    title="Copy install command (Cmd+C)"
                    aria-label={`Copy install command for ${item.name}`}
                    className="opacity-0 group-data-[selected=true]:opacity-100 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-muted p-1 rounded transition-opacity"
                  >
                    <Copy className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                  </button>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-60" />
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {(selectedSection === "all" || selectedSection === "primitives") && <CommandSeparator />}

        {/* Core Primitives */}
        {(selectedSection === "all" || selectedSection === "primitives") && (
          <CommandGroup heading="Core Primitives">
            {CATALOG_ITEMS.filter((i) => i.cluster === "Core Primitives").map((item) => (
              <CommandItem
                key={item.name}
                value={`${item.label} ${item.name} primitive`}
                onSelect={() => handleSelectComponent(item)}
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Box className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-muted-foreground">({item.name})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => handleCopyCommand(item.name, e)}
                    title="Copy install command (Cmd+C)"
                    aria-label={`Copy install command for ${item.name}`}
                    className="opacity-0 group-data-[selected=true]:opacity-100 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-muted p-1 rounded transition-opacity"
                  >
                    <Copy className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                  </button>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-60" />
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
