"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Kbd } from "@/components/ui/kbd";
import { HeroSection } from "@/components/ui/hero-section";
import { CodeBlock } from "@/components/ui/code-block";
import { Spinner } from "@/components/ui/spinner";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { CopyButton } from "@/components/ui/copy-button";
import { Callout } from "@/components/ui/callout";
import { ComponentInstallButton } from "@/components/design-system/component-install-button";
import { SectionHeader } from "@/components/design-system/sections/section-header";
import { Box, Bold, Italic, Underline, Zap, Shield, Workflow } from "lucide-react";

export interface PrimitivesSectionProps {
  onOpenCommand?: () => void;
}

export function PrimitivesSection({ onOpenCommand }: PrimitivesSectionProps) {
  const [search, setSearch] = React.useState("");
  const q = search.toLowerCase().trim();

  const cards = [
    { id: "card-buttons", name: "Button, Toggle & Keyboard Badges", tags: ["button", "toggle", "kbd", "keyboard", "shortcut"] },
    { id: "card-badges", name: "Badge, Avatar, Aspect Ratio & Skeleton", tags: ["badge", "avatar", "skeleton", "aspect-ratio"] },
    { id: "card-hero-section", name: "Hero Section", tags: ["hero", "landing", "banner"] },
    { id: "card-code-block", name: "Code Block", tags: ["code", "syntax", "snippet", "pre"] },
    { id: "card-spinner", name: "Spinner", tags: ["spinner", "loader", "loading"] },
    { id: "card-feature-grid", name: "Feature Grid", tags: ["grid", "marketing", "feature"] },
    { id: "card-copy-button", name: "Copy Button", tags: ["copy", "clipboard", "action"] },
    { id: "card-callout", name: "Callout", tags: ["callout", "alert", "note", "tip"] },
    { id: "card-avatar-group", name: "Avatar Group", tags: ["avatar", "stacked", "users"] },
  ];

  const isVisible = (id: string) => {
    if (!q) return true;
    const card = cards.find((c) => c.id === id);
    if (!card) return true;
    return card.name.toLowerCase().includes(q) || card.tags.some((t) => t.includes(q));
  };

  const visibleCount = cards.filter((c) => isVisible(c.id)).length;

  return (
    <section id="primitives" className="space-y-6 scroll-mt-28">
      <SectionHeader
        icon={Box}
        title="Core Primitives"
        description="Button, Badge, Toggle, Toggle Group, Kbd, Separator, Aspect Ratio, Avatar, Skeleton, Hero Section, Code Block, Spinner, and Feature Grid."
        searchQuery={search}
        onSearchChange={setSearch}
        totalCount={cards.length}
        filteredCount={visibleCount}
        placeholder="Filter primitives (button, avatar, spinner...)"
      />

      {visibleCount === 0 ? (
        <div className="p-8 text-center border rounded-lg bg-muted/10 text-xs text-muted-foreground">
          No primitive components match "{search}".
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Button, Toggle & Kbd */}
          {isVisible("card-buttons") && (
            <Card id="card-buttons">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Button, Toggle & Keyboard Badges</CardTitle>
                  <CardDescription className="text-xs">
                    Button states, multi-select toggle groups, and keyboard shortcut chips
                  </CardDescription>
                </div>
                <ComponentInstallButton name="button" title="Button" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button variant="default" size="sm">Default</Button>
                  <Button variant="secondary" size="sm">Secondary</Button>
                  <Button variant="outline" size="sm">Outline</Button>
                  <Button variant="destructive" size="sm">Destructive</Button>
                  <Button variant="ghost" size="sm">Ghost</Button>
                  <Button variant="link" size="sm">Link</Button>
                </div>
                <Separator />
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs text-muted-foreground font-medium">Toggle:</span>
                  <Toggle aria-label="Toggle italic" size="sm">
                    <Italic className="h-4 w-4" />
                  </Toggle>
                  <span className="text-xs text-muted-foreground font-medium">Toggle Group:</span>
                  <ToggleGroup type="multiple" size="sm">
                    <ToggleGroupItem value="bold" aria-label="Toggle bold">
                      <Bold className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="italic" aria-label="Toggle italic">
                      <Italic className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="underline" aria-label="Toggle underline">
                      <Underline className="h-4 w-4" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <Separator />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted-foreground font-medium">Kbd Component:</span>
                  <button
                    type="button"
                    onClick={onOpenCommand}
                    className="inline-flex items-center gap-1 hover:opacity-80 cursor-pointer rounded bg-muted/50 px-1.5 py-0.5 border"
                    title="Click to open Command Palette (⌘K)"
                  >
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                    <span className="text-xs text-primary font-medium ml-1">Open Palette</span>
                  </button>
                  <span className="text-xs text-muted-foreground ml-2">Shortcut:</span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground border rounded-md px-2 py-1">
                    Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Badge, Avatar, Skeleton & Aspect Ratio */}
          {isVisible("card-badges") && (
            <Card id="card-badges">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Badge, Avatar, Aspect Ratio & Skeleton</CardTitle>
                  <CardDescription className="text-xs">
                    Compact status tags, user avatars, responsive media frames, and shimmers
                  </CardDescription>
                </div>
                <ComponentInstallButton name="badge" title="Badge" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <Skeleton className="h-3.5 w-3/4" />
                    <Skeleton className="h-2.5 w-1/2" />
                  </div>
                </div>
                <Separator />
                <div className="w-full max-w-[260px]">
                  <AspectRatio ratio={16 / 9} className="bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground border">
                    16:9 Aspect Ratio Frame
                  </AspectRatio>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Hero Section */}
          {isVisible("card-hero-section") && (
            <Card id="card-hero-section" className="col-span-full">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Hero Section</CardTitle>
                  <CardDescription className="text-xs">
                    Conversion-focused landing page hero with announcement badge, action buttons, and trust indicators
                  </CardDescription>
                </div>
                <ComponentInstallButton name="hero-section" title="Hero Section" />
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border bg-muted/10 p-4 sm:p-6">
                  <HeroSection
                    badge={{
                      text: "Design System 2.0 Released",
                      actionText: "Read announcement",
                    }}
                    title={
                      <>
                        Build faster with modern{" "}
                        <span className="text-primary underline decoration-primary/40 underline-offset-4">
                          OKLCH primitives
                        </span>
                      </>
                    }
                    description="An accessible, production-grade foundation crafted for Next.js 16 and Tailwind CSS v4. Ship beautiful web applications in minutes."
                    primaryAction={{ label: "Get Started Free" }}
                    secondaryAction={{ label: "Explore Catalog" }}
                    socialProofText="TRUSTED BY DESIGN & PLATFORM TEAMS ACROSS ASIA"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Code Block */}
          {isVisible("card-code-block") && (
            <Card id="card-code-block" className="col-span-full">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Code Block</CardTitle>
                  <CardDescription className="text-xs">
                    Pre-formatted code snippet container with syntax styling, line numbers, and one-click copy
                  </CardDescription>
                </div>
                <ComponentInstallButton name="code-block" title="Code Block" />
              </CardHeader>
              <CardContent>
                <CodeBlock
                  filename="quickstart.sh"
                  language="bash"
                  showLineNumbers
                  code={`# Initialize design system in downstream project\nnpx shadcn add "http://localhost:3000/r/theme.json"\n\n# Add KPI metrics and navigation patterns\nnpx shadcn add "http://localhost:3000/r/metric-card.json"\nnpx shadcn add "http://localhost:3000/r/user-nav.json"`}
                />
              </CardContent>
            </Card>
          )}

          {/* Spinner */}
          {isVisible("card-spinner") && (
            <Card id="card-spinner" className="col-span-full">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Spinner</CardTitle>
                  <CardDescription className="text-xs">
                    Accessible animated SVG loading indicators with size & semantic color variants
                  </CardDescription>
                </div>
                <ComponentInstallButton name="spinner" title="Spinner" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-6 p-4 rounded-lg border bg-muted/20">
                  <div className="flex items-center gap-2">
                    <Spinner size="xs" />
                    <span className="text-xs font-mono text-muted-foreground">xs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Spinner size="sm" variant="primary" />
                    <span className="text-xs font-mono text-muted-foreground">sm (primary)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Spinner size="default" variant="secondary" />
                    <span className="text-xs font-mono text-muted-foreground">default</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Spinner size="lg" variant="destructive" />
                    <span className="text-xs font-mono text-muted-foreground">lg (destructive)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Spinner size="xl" variant="muted" />
                    <span className="text-xs font-mono text-muted-foreground">xl (muted)</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button disabled size="sm" className="text-xs">
                    <Spinner size="sm" className="mr-2" />
                    Saving changes...
                  </Button>
                  <Button variant="outline" size="sm" disabled className="text-xs">
                    <Spinner size="sm" variant="primary" className="mr-2" />
                    Fetching records...
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Feature Grid */}
          {isVisible("card-feature-grid") && (
            <Card id="card-feature-grid" className="col-span-full">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Feature Grid</CardTitle>
                  <CardDescription className="text-xs">
                    Marketing showcase grid with icons, headings, badges, and progressive links
                  </CardDescription>
                </div>
                <ComponentInstallButton name="feature-grid" title="Feature Grid" />
              </CardHeader>
              <CardContent>
                <FeatureGrid
                  badge="Capabilities"
                  title="Engineered for Modern Web Speed"
                  description="Everything you need to ship world-class user experiences without rebuilding from scratch."
                  columns={3}
                  features={[
                    {
                      icon: Zap,
                      title: "Ultra-Fast Execution",
                      description: "Optimized for Next.js 16 App Router and Turbopack with zero unnecessary re-renders.",
                      badge: "Performance",
                      linkText: "Read architecture docs",
                    },
                    {
                      icon: Shield,
                      title: "Enterprise Grade",
                      description: "Rigorous WCAG 2.1 AA accessibility and strict contrast ratios baked into every primitive.",
                      badge: "Security",
                      linkText: "View compliance",
                    },
                    {
                      icon: Workflow,
                      title: "Copy-and-Own Source",
                      description: "True ownership of your UI code. Zero runtime dependency overhead or vendor lock-in.",
                      badge: "Developer Experience",
                      linkText: "Explore CLI",
                    },
                  ]}
                />
              </CardContent>
            </Card>
          )}

          {/* Copy Button */}
          {isVisible("card-copy-button") && (
            <Card id="card-copy-button" className="col-span-full">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Copy Button</CardTitle>
                  <CardDescription className="text-xs">
                    One-click clipboard copy button with animated icon transitions, tooltips, and custom timeout feedback
                  </CardDescription>
                </div>
                <ComponentInstallButton name="copy-button" title="Copy Button" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-1.5 text-xs font-mono text-muted-foreground">
                    <span>npx @starter/cli add copy-button</span>
                    <CopyButton value="npx @starter/cli add copy-button" size="sm" variant="ghost" />
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-1.5 text-xs font-mono text-muted-foreground">
                    <span>git clone https://github.com/starter/system.git</span>
                    <CopyButton value="git clone https://github.com/starter/system.git" size="sm" variant="outline" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground font-medium">Default:</span>
                    <CopyButton value="starter-system-design" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Callout */}
          {isVisible("card-callout") && (
            <Card id="card-callout" className="col-span-full">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Callout</CardTitle>
                  <CardDescription className="text-xs">
                    Editorial advisory blocks with semantic styling, status icons, and dismissible options for documentation & notifications
                  </CardDescription>
                </div>
                <ComponentInstallButton name="callout" title="Callout" />
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Callout variant="note" title="Note">
                  All components are built with pure OKLCH color science for uniform perceptual lightness across light and dark themes.
                </Callout>
                <Callout variant="tip" title="Pro Tip">
                  Press <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono border">⌘K</kbd> anywhere to open the global command palette and search all 96 components.
                </Callout>
                <Callout variant="warning" title="Breaking Change Notice">
                  Tailwind CSS v4 uses CSS @theme rules instead of tailwind.config.js. Please verify token imports before upgrading.
                </Callout>
                <Callout variant="danger" title="Destructive Action">
                  Deleting a workspace is irreversible and immediately purges all associated telemetry streams.
                </Callout>
              </CardContent>
            </Card>
          )}

          {/* Avatar Group */}
          {isVisible("card-avatar-group") && (
            <Card id="card-avatar-group" className="scroll-mt-28">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Avatar Group</CardTitle>
                  <CardDescription className="text-xs">
                    Overlapping stacked avatar group with ring styling, hover elevation, and overflow counter badge
                  </CardDescription>
                </div>
                <ComponentInstallButton name="avatar-group" title="Avatar Group" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="space-y-1.5">
                    <p className="text-xs font-medium text-muted-foreground">Default (max 4)</p>
                    <AvatarGroup max={4} size="default">
                      <Avatar><AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop" /><AvatarFallback>JD</AvatarFallback></Avatar>
                      <Avatar><AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop" /><AvatarFallback>MR</AvatarFallback></Avatar>
                      <Avatar><AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop" /><AvatarFallback>SA</AvatarFallback></Avatar>
                      <Avatar><AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop" /><AvatarFallback>TW</AvatarFallback></Avatar>
                      <Avatar><AvatarFallback>+5</AvatarFallback></Avatar>
                      <Avatar><AvatarFallback>+6</AvatarFallback></Avatar>
                    </AvatarGroup>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-xs font-medium text-muted-foreground">Small size</p>
                    <AvatarGroup max={3} size="sm">
                      <Avatar className="h-8 w-8"><AvatarFallback className="bg-primary/10 text-primary text-xs">A</AvatarFallback></Avatar>
                      <Avatar className="h-8 w-8"><AvatarFallback className="bg-secondary/80 text-secondary-foreground text-xs">B</AvatarFallback></Avatar>
                      <Avatar className="h-8 w-8"><AvatarFallback className="bg-accent/80 text-accent-foreground text-xs">C</AvatarFallback></Avatar>
                      <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">D</AvatarFallback></Avatar>
                      <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">E</AvatarFallback></Avatar>
                    </AvatarGroup>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </section>
  );
}
