"use client";

import * as React from "react";
import Image from "next/image";
import {
  Palette,
  Layers,
  Box,
  Compass,
  Bell,
  Sparkles,
  Terminal,
  BarChart3,
  Search,
  Smartphone,
  Tablet,
  Monitor,
  Type,
  ArrowUp,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { Toaster as RadixToaster } from "@/components/ui/toaster";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandPalette } from "./command-palette";
import { ComponentInstallButton } from "./component-install-button";
import { OFFICIAL_THEMES, resolveTheme } from "@/lib/themes";

import { ColorsSection } from "./sections/colors-section";
import { TypographySection } from "./sections/typography-section";
import { PrimitivesSection } from "./sections/primitives-section";
import { FormsSection } from "./sections/forms-section";
import { DataDisplaySection } from "./sections/data-display-section";
import { NavigationSection } from "./sections/navigation-section";
import { OverlaysSection } from "./sections/overlays-section";
import { CategoryOverviewGrid } from "./category-overview-grid";

const THEME_STORAGE_KEY = "system-design-theme-palette";

const navSections = [
  { id: "colors", label: "Colors & Palettes", count: "242", icon: Palette },
  { id: "typography", label: "Typography", count: "Scale", icon: Type },
  { id: "primitives", label: "Primitives", count: "16", icon: Box },
  { id: "forms", label: "Forms & Inputs", count: "22", icon: Layers },
  { id: "data-display", label: "Data Display", count: "23", icon: BarChart3 },
  { id: "navigation", label: "Navigation", count: "14", icon: Compass },
  { id: "overlays", label: "Overlays & Feedback", count: "17", icon: Bell },
];

interface DesignSystemViewProps {
  locale?: string;
  translations: {
    common: Record<string, string>;
    designSystem: {
      pageTitle: string;
      pageDescription: string;
      creativeNorthStar: string;
      northStarDesc: string;
      sections: Record<string, string>;
      [key: string]: unknown;
    };
  };
}

export function DesignSystemView({ locale = "en", translations }: DesignSystemViewProps) {
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [showBackToTop, setShowBackToTop] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [activeTheme, setActiveTheme] = React.useState<string>("zinc");
  const [activeSection, setActiveSection] = React.useState<string>("colors");

  const navStripRef = React.useRef<HTMLDivElement>(null);
  const isClickScrollingRef = React.useRef(false);

  // High-precision RAF-throttled scrollspy for instantaneous, bulletproof section tracking
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const updateActiveSection = () => {
      setShowBackToTop(window.scrollY > 400);

      if (isClickScrollingRef.current) {
        ticking = false;
        return;
      }

      // Check if user has scrolled near bottom of page
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (documentHeight - scrollPosition < 100) {
        const lastSection = navSections[navSections.length - 1].id;
        setActiveSection(lastSection);
        ticking = false;
        return;
      }

      // Sticky header height is ~64px + subnav strip ~44px = ~108px.
      // Offset of 140px ensures natural section detection as section passes under header.
      const headerOffset = 140;

      let current = navSections[0].id;
      for (const sec of navSections) {
        const el = document.getElementById(sec.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= headerOffset) {
          current = sec.id;
        }
      }

      setActiveSection(current);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    // Run once on mount to establish initial active section
    updateActiveSection();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Auto-scroll the active pill horizontally into view in the subnav strip
  React.useEffect(() => {
    if (!navStripRef.current) return;
    const activePill = navStripRef.current.querySelector<HTMLElement>(`[data-section="${activeSection}"]`);
    if (activePill) {
      activePill.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [activeSection]);

  const handleNavClick = (sectionId: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      (e.currentTarget as HTMLElement)?.blur?.();
    }
    setActiveSection(sectionId);
    isClickScrollingRef.current = true;

    const targetEl = document.getElementById(sectionId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", `#${sectionId}`);
    }

    let timer: ReturnType<typeof setTimeout>;
    const onEnd = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        isClickScrollingRef.current = false;
        window.removeEventListener("scroll", onEnd);
      }, 150);
    };
    window.addEventListener("scroll", onEnd, { passive: true });
    setTimeout(() => {
      isClickScrollingRef.current = false;
      window.removeEventListener("scroll", onEnd);
    }, 2000);
  };

  // Restore persisted OKLCH theme palette on mount
  React.useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        setActiveTheme(savedTheme);
      }
    } catch {}
  }, []);

  const applyTheme = (themeKey: string) => {
    const key = themeKey.toLowerCase().replace(/^theme-/, "");
    setActiveTheme(key);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, key);
    } catch {}
    const theme = resolveTheme(key);
    const isDark = document.documentElement.classList.contains("dark");
    const currentTokens = isDark ? theme.dark : theme.light;
    document.documentElement.style.setProperty("--primary", currentTokens.primary);
    document.documentElement.style.setProperty("--primary-foreground", currentTokens.primaryForeground);
    document.documentElement.style.setProperty("--ring", currentTokens.ring);
    toast.success(`Theme switched to ${theme.label}`);
  };

  React.useEffect(() => {
    const theme = resolveTheme(activeTheme);
    const updateTokens = () => {
      const isDark = document.documentElement.classList.contains("dark");
      const currentTokens = isDark ? theme.dark : theme.light;
      document.documentElement.style.setProperty("--primary", currentTokens.primary);
      document.documentElement.style.setProperty("--primary-foreground", currentTokens.primaryForeground);
      document.documentElement.style.setProperty("--ring", currentTokens.ring);
    };

    updateTokens();

    const observer = new MutationObserver(updateTokens);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [activeTheme]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const t = translations.designSystem;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard", { description: text });
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-foreground">
        {/* Skip to Main Content Link (A11y / WCAG 2.4.1) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring text-xs font-semibold tracking-wide transition-transform"
        >
          Skip to main content
        </a>
        <Toaster />
        <RadixToaster />
        <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} onApplyTheme={applyTheme} />

        {/* Responsive Sticky Header & Category Jump Strip */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-xs">
          <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <span className="relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 overflow-hidden border border-border p-1">
                <Image
                  src="/icons/icon.svg"
                  alt="System Design"
                  width={28}
                  height={28}
                  className="h-full w-full object-contain"
                  priority
                />
              </span>
              <div className="min-w-0">
                <h1 className="text-sm sm:text-base font-semibold tracking-tight truncate">
                  {t.pageTitle}
                </h1>
                <p className="hidden xs:block text-xs text-muted-foreground truncate">
                  100% shadcn/ui • 242 Palette Shades • OKLCH
                </p>
              </div>
            </div>

            {/* Desktop Global Search / Command Palette Bar */}
            <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md mx-4 hidden md:block">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCommandOpen(true)}
                className="relative h-9 w-full justify-start rounded-lg text-xs text-muted-foreground bg-muted/40 hover:bg-muted/70 border-input shadow-2xs"
              >
                <Search className="mr-2 h-3.5 w-3.5 shrink-0 opacity-60" />
                <span>Search 97 components & tokens...</span>
                <kbd className="pointer-events-none absolute right-2 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
            </div>

            {/* Desktop Theme Controls */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              {/* Live Theme Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs font-medium cursor-pointer">
                    <Palette className="h-3.5 w-3.5 text-primary" />
                    <span className="capitalize">{activeTheme}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuLabel className="text-xs">OKLCH Theme Palette</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {Object.entries(OFFICIAL_THEMES).map(([key, item]) => (
                    <DropdownMenuItem key={key} onClick={() => applyTheme(key)} className="flex items-center justify-between text-xs cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full border shrink-0" style={{ backgroundColor: item.hex }} />
                        <span className="capitalize">{item.label}</span>
                      </div>
                      {activeTheme === key && <span className="text-[10px] text-primary font-bold">✓</span>}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <ThemeToggle />
            </div>
          </div>

          {/* Responsive Sub-navigation Pills with Live Scrollspy (Swipeable across all viewports) */}
          <div className="flex border-t bg-muted/20 px-3 sm:px-6 lg:px-8 overflow-x-auto py-2 gap-1.5 sm:gap-2 no-scrollbar" ref={navStripRef}>
            {navSections.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  data-section={sec.id}
                  onClick={(e) => handleNavClick(sec.id, e)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all whitespace-nowrap cursor-pointer touch-manipulation",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground shadow-2xs font-semibold scale-105"
                      : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground hover:border-input"
                  )}
                >
                  <sec.icon className={cn("h-3 w-3 shrink-0", isActive ? "text-primary-foreground" : "text-primary")} />
                  <span>{sec.label}</span>
                  <span className={cn("text-[10px] font-mono opacity-80", isActive ? "text-primary-foreground" : "text-muted-foreground")}>
                    {sec.count}
                  </span>
                </a>
              );
            })}
          </div>
        </header>

        {/* Hero Section */}
        <section className="border-b bg-muted/20 py-10 sm:py-14 lg:py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="outline" className="text-xs">
                <Sparkles className="mr-1 h-3 w-3" />
                {t.creativeNorthStar}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <Smartphone className="h-3 w-3 mr-1" />
                <Tablet className="h-3 w-3 mr-1" />
                <Monitor className="h-3 w-3 mr-1" />
                Responsive across 320px → 4K
              </Badge>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-4xl leading-tight text-balance">
              Production-Grade System Design Kit
            </h2>
            <p className="mt-3 sm:mt-4 max-w-prose text-muted-foreground text-xs sm:text-sm lg:text-base leading-relaxed text-pretty">
              Every component from official shadcn/ui plus extended components (96 total), 22 full Tailwind color families (242 shades), 8 official themes, and pure OKLCH color science.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono">
              <span className="rounded-md border bg-background px-2.5 py-1 text-foreground">96 Verified UI Primitives</span>
              <span className="rounded-md border bg-background px-2.5 py-1 text-foreground">Extended Kit (96 Components)</span>
              <span className="rounded-md border bg-background px-2.5 py-1 text-foreground">22 Color Families (242 Shades)</span>
              <span className="rounded-md border bg-background px-2.5 py-1 text-foreground">8 Official Themes</span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 p-1.5 px-3 rounded-lg border bg-background/80 text-xs font-mono max-w-full overflow-x-auto">
                <Terminal className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="text-muted-foreground hidden sm:inline">Registry Theme:</span>
                <code className="text-foreground text-xs whitespace-nowrap">npx shadcn add /r/theme.json</code>
              </div>
              <ComponentInstallButton name="theme" title="OKLCH Theme" />
            </div>
          </div>
        </section>

        {/* Main Body Sections */}
        <main id="main-content" className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-20 pb-24 md:pb-12">
          {/* 1. ARCHITECTURE CATEGORY HUB */}
          <CategoryOverviewGrid onSelectCategory={(secId) => handleNavClick(secId)} />

          {/* 2. COLOR TOKENS & ARCHITECTURE */}
          <ColorsSection activeTheme={activeTheme} applyTheme={applyTheme} handleCopy={handleCopy} />

          {/* 3. TYPOGRAPHY & DESIGN TOKENS */}
          <TypographySection />

          {/* 4. FOUNDATIONAL PRIMITIVES */}
          <PrimitivesSection onOpenCommand={() => setCommandOpen(true)} />

          {/* 5. FORM CONTROLS & INPUT SYSTEM */}
          <FormsSection date={date} setDate={setDate} />

          {/* 6. DATA DISPLAY & PATTERNS */}
          <DataDisplaySection date={date} setDate={setDate} />

          {/* 7. NAVIGATION PATTERNS */}
          <NavigationSection />

          {/* 8. OVERLAYS, FEEDBACK & UTILITIES */}
          <OverlaysSection />
        </main>

        {/* Floating Back to Top Button */}
        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+4.5rem)] right-4 md:bottom-6 md:right-6 z-40 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer touch-manipulation"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}

        {/* Mobile Bottom Action Bar: Search & Theme */}
        <nav
          aria-label="Mobile Bottom Actions"
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85 px-3 py-2 pb-[calc(env(safe-area-inset-bottom,0px)+0.5rem)] shadow-lg"
        >
          <div className="flex items-center gap-2 max-w-lg mx-auto">
            {/* Search Command Palette Trigger */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCommandOpen(true)}
              className="flex-1 justify-start h-9 rounded-lg text-xs text-muted-foreground bg-muted/40 hover:bg-muted/70 border-input shadow-2xs cursor-pointer min-w-0"
              title="Search components & tokens (⌘K)"
            >
              <Search className="mr-2 h-3.5 w-3.5 shrink-0 opacity-60" />
              <span className="truncate hidden xs:inline">Search 97 components...</span>
              <span className="truncate xs:hidden">Search...</span>
              <kbd className="pointer-events-none ml-auto hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100">
                ⌘K
              </kbd>
            </Button>

            {/* OKLCH Theme Palette Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 px-2 xs:px-3 gap-1.5 text-xs font-medium shrink-0 cursor-pointer">
                  <Palette className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="capitalize hidden xs:inline">{activeTheme}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="end" sideOffset={8} className="w-52 mb-2">
                <DropdownMenuLabel className="text-xs">OKLCH Theme Palette</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Object.entries(OFFICIAL_THEMES).map(([key, item]) => (
                  <DropdownMenuItem key={key} onClick={() => applyTheme(key)} className="flex items-center justify-between text-xs cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full border shrink-0" style={{ backgroundColor: item.hex }} />
                      <span className="capitalize">{item.label}</span>
                    </div>
                    {activeTheme === key && <span className="text-[10px] text-primary font-bold">✓</span>}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dark / Light Theme Toggle */}
            <div className="shrink-0">
              <ThemeToggle side="top" align="end" />
            </div>
          </div>
        </nav>
      </div>
    </TooltipProvider>
  );
}
