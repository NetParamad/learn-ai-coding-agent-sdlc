"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "@/components/ui/menubar";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Stepper, type StepItem } from "@/components/ui/stepper";
import { PageHeader } from "@/components/ui/page-header";
import { UserNav } from "@/components/ui/user-nav";
import { FooterSection } from "@/components/ui/footer-section";
import { AnnouncementBar } from "@/components/ui/announcement-bar";
import { TableOfContents } from "@/components/ui/table-of-contents";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { ComponentInstallButton } from "@/components/design-system/component-install-button";
import { SectionHeader } from "@/components/design-system/sections/section-header";
import { Compass } from "lucide-react";
import { toast } from "sonner";

const wizardSteps: StepItem[] = [
  { title: "Account Identity", description: "Domain & Region" },
  { title: "Authentication", description: "SSO / Credentials" },
  { title: "Provision Cluster", description: "Deploy Instance", optional: true },
];

export function NavigationSection() {
  const [search, setSearch] = React.useState("");
  const [stepperStep, setStepperStep] = React.useState(1);
  const [demoSegment, setDemoSegment] = React.useState("preview");

  const q = search.toLowerCase().trim();

  const cards = [
    { id: "card-navigation-menu", name: "Navigation Ecosystem", tags: ["menubar", "navigation-menu", "breadcrumb", "tabs", "pagination"] },
    { id: "card-stepper", name: "Multi-Step Form Stepper", tags: ["stepper", "wizard", "steps", "progress"] },
    { id: "card-page-header", name: "Page Header & User Nav", tags: ["page-header", "user-nav", "header", "profile", "avatar"] },
    { id: "card-footer-section", name: "Footer Section", tags: ["footer", "links", "newsletter", "social"] },
    { id: "card-announcement-bar", name: "Announcement Bar", tags: ["announcement", "banner", "marketing", "alert"] },
    { id: "card-table-of-contents", name: "Table of Contents", tags: ["toc", "table-of-contents", "outline", "headings"] },
    { id: "card-segmented-control", name: "Segmented Control", tags: ["segmented-control", "tabs", "pill", "toggle"] },
    { id: "card-reading-progress", name: "Reading Progress Bar", tags: ["reading", "progress", "scroll", "viewport", "article"] },
  ];

  const isVisible = (id: string) => {
    if (!q) return true;
    const card = cards.find((c) => c.id === id);
    if (!card) return true;
    return card.name.toLowerCase().includes(q) || card.tags.some((t) => t.includes(q));
  };

  const visibleCount = cards.filter((c) => isVisible(c.id)).length;

  return (
    <section id="navigation" className="space-y-6 scroll-mt-28">
      <SectionHeader
        icon={Compass}
        title="Navigation"
        description="Navigation Menu, Menubar, Breadcrumb, Pagination, Tabs, and Sidebar."
        searchQuery={search}
        onSearchChange={setSearch}
        totalCount={cards.length}
        filteredCount={visibleCount}
        placeholder="Filter navigation (menubar, stepper, toc, footer...)"
      />

      {visibleCount === 0 ? (
        <div className="p-8 text-center border rounded-lg bg-muted/10 text-xs text-muted-foreground">
          No navigation components match "{search}".
        </div>
      ) : (
        <div className="space-y-6">
          {/* Navigation Ecosystem */}
          {isVisible("card-navigation-menu") && (
            <Card id="card-navigation-menu" className="scroll-mt-28">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Navigation Ecosystem</CardTitle>
                  <CardDescription className="text-xs">
                    Menubar, multi-tier navigation menus, tabs, and breadcrumbs with responsive wraps
                  </CardDescription>
                </div>
                <ComponentInstallButton name="navigation-menu" title="Navigation Menu" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger className="text-xs sm:text-sm">Design System</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>Tokens (OKLCH)</MenubarItem>
                        <MenubarItem>Components (96)</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Export Specs</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                      <MenubarTrigger className="text-xs sm:text-sm">View</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>Toggle Theme</MenubarItem>
                        <MenubarItem>Documentation</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>

                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-xs sm:text-sm">Component Catalog</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid gap-2 p-3 w-[280px] sm:w-[380px] grid-cols-1 sm:grid-cols-2">
                            <NavigationMenuLink asChild>
                              <a href="#primitives" className="block select-none rounded-md p-2.5 leading-none no-underline outline-none transition-colors hover:bg-accent">
                                <div className="text-xs font-semibold leading-none">Core Primitives</div>
                                <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">Button, Badge, Avatar, Kbd</p>
                              </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <a href="#forms" className="block select-none rounded-md p-2.5 leading-none no-underline outline-none transition-colors hover:bg-accent">
                                <div className="text-xs font-semibold leading-none">Forms & Inputs</div>
                                <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">Input, Select, Slider, OTP</p>
                              </a>
                            </NavigationMenuLink>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>

                <div className="overflow-x-auto pb-1">
                  <Breadcrumb>
                    <BreadcrumbList className="text-xs sm:text-sm whitespace-nowrap">
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#">Starter</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#">Design System</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Complete shadcn Catalog</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 max-w-xs h-auto p-1">
                    <TabsTrigger value="overview" className="text-xs px-1.5 sm:px-3 py-1">Overview</TabsTrigger>
                    <TabsTrigger value="tokens" className="text-xs px-1.5 sm:px-3 py-1">Tokens</TabsTrigger>
                    <TabsTrigger value="usage" className="text-xs px-1.5 sm:px-3 py-1">Code Usage</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="p-3 sm:p-4 border rounded-md text-xs sm:text-sm text-muted-foreground mt-2">
                    Every component from https://ui.shadcn.com/docs/components is verified and exported under @/components/ui.
                  </TabsContent>
                  <TabsContent value="tokens" className="p-3 sm:p-4 border rounded-md text-xs sm:text-sm text-muted-foreground mt-2">
                    Pure OKLCH coordinates guarantee mathematical contrast consistency across both light and dark modes.
                  </TabsContent>
                  <TabsContent value="usage" className="p-3 sm:p-4 border rounded-md text-xs sm:text-sm text-muted-foreground mt-2 font-mono">
                    import &#123; Button &#125; from &quot;@/components/ui/button&quot;;
                  </TabsContent>
                </Tabs>

                <Pagination>
                  <PaginationContent className="flex-wrap">
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardContent>
            </Card>
          )}

          {/* Stepper */}
          {isVisible("card-stepper") && (
            <Card id="card-stepper" className="scroll-mt-28">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">Multi-Step Form Stepper</CardTitle>
                    <Badge variant="secondary" className="text-[10px] font-mono">Wizard Pattern</Badge>
                  </div>
                  <CardDescription className="text-xs mt-1">
                    Linear and non-linear onboarding progress indicator with completed, active, and pending states
                  </CardDescription>
                </div>
                <ComponentInstallButton name="stepper" title="Stepper" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="overflow-x-auto pb-1">
                  <Stepper
                    steps={wizardSteps}
                    currentStep={stepperStep}
                    onStepClick={setStepperStep}
                  />
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    disabled={stepperStep <= 0}
                    onClick={() => setStepperStep((s) => Math.max(0, s - 1))}
                  >
                    Previous Step
                  </Button>
                  <span className="text-xs font-mono text-muted-foreground">
                    Step {stepperStep + 1} of {wizardSteps.length}
                  </span>
                  <Button
                    variant="default"
                    size="sm"
                    className="text-xs"
                    disabled={stepperStep >= wizardSteps.length}
                    onClick={() => setStepperStep((s) => Math.min(wizardSteps.length, s + 1))}
                  >
                    {stepperStep >= wizardSteps.length - 1 ? "Complete" : "Next Step"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Page Header & User Nav */}
          {isVisible("card-page-header") && (
            <Card id="card-page-header" className="col-span-full">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Page Header & User Nav</CardTitle>
                  <CardDescription className="text-xs">
                    Standardized top-of-page navigation banner with breadcrumbs, action slots, and authenticated user profile menu
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1.5">
                  <ComponentInstallButton name="page-header" title="Page Header" />
                  <ComponentInstallButton name="user-nav" title="User Nav" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border bg-background p-4 sm:p-6 space-y-4">
                  <PageHeader
                    breadcrumbs={
                      <Breadcrumb>
                        <BreadcrumbList>
                          <BreadcrumbItem>
                            <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                            <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                            <BreadcrumbPage>Team Members</BreadcrumbPage>
                          </BreadcrumbItem>
                        </BreadcrumbList>
                      </Breadcrumb>
                    }
                    badge={<Badge variant="secondary">Production Cluster</Badge>}
                    heading="Organization & Team Members"
                    description="Manage workspace roles, invite collaborators, and oversee SSO access policies."
                    actions={
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Export CSV</Button>
                        <Button size="sm">Invite Member</Button>
                        <div id="card-user-nav">
                          <UserNav
                            user={{
                              name: "Alex Rivera",
                              email: "alex@company.dev",
                              role: "Owner",
                              initials: "AR",
                            }}
                          />
                        </div>
                      </div>
                    }
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Footer Section */}
          {isVisible("card-footer-section") && (
            <Card id="card-footer-section" className="col-span-full">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Footer Section</CardTitle>
                  <CardDescription className="text-xs">
                    Multi-column footer layout with brand branding, link directories, newsletter subscription, and social channels
                  </CardDescription>
                </div>
                <ComponentInstallButton name="footer-section" title="Footer Section" />
              </CardHeader>
              <CardContent className="p-0">
                <FooterSection
                  newsletter={{
                    title: "Stay updated on new components",
                    description: "Join 15,000+ developers shipping with OKLCH design systems.",
                    onSubscribe: (email) => toast.success(`Subscribed: ${email}`),
                  }}
                  socialLinks={{
                    github: "https://github.com",
                    twitter: "https://twitter.com",
                    discord: "https://discord.com",
                    linkedin: "https://linkedin.com",
                  }}
                  className="rounded-b-xl border-t-0"
                />
              </CardContent>
            </Card>
          )}

          {/* Announcement Bar */}
          {isVisible("card-announcement-bar") && (
            <Card id="card-announcement-bar" className="col-span-full">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Announcement Bar</CardTitle>
                  <CardDescription className="text-xs">
                    Dismissible marketing banner with highlight badges, action links, and tone variants
                  </CardDescription>
                </div>
                <ComponentInstallButton name="announcement-bar" title="Announcement Bar" />
              </CardHeader>
              <CardContent className="space-y-3">
                <AnnouncementBar
                  badge="v2.0 Release"
                  linkText="View changelog"
                  linkHref="#changelog"
                  onLinkClick={() => toast.info("Navigating to changelog...")}
                >
                  Tailwind CSS v4 & 96 production components are now officially stable!
                </AnnouncementBar>

                <AnnouncementBar
                  variant="primary"
                  badge="New"
                  linkText="Explore"
                  linkHref="#tokens"
                >
                  Pure OKLCH color palettes with 8 unified chromatic themes.
                </AnnouncementBar>
              </CardContent>
            </Card>
          )}

          {/* Table of Contents */}
          {isVisible("card-table-of-contents") && (
            <Card id="card-table-of-contents" className="col-span-full">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Table of Contents</CardTitle>
                  <CardDescription className="text-xs">
                    Sticky hierarchical navigation with scrollspy active heading highlighting for documentation & articles
                  </CardDescription>
                </div>
                <ComponentInstallButton name="table-of-contents" title="Table of Contents" />
              </CardHeader>
              <CardContent>
                <div className="max-w-xs rounded-lg border bg-card/60 p-4">
                  <TableOfContents
                    title="Documentation Outline"
                    items={[
                      { id: "tokens", title: "OKLCH Tokens", level: 1 },
                      { id: "primitives", title: "Core Primitives", level: 1 },
                      { id: "forms", title: "Forms & Inputs", level: 2 },
                      { id: "data-display", title: "Data Display", level: 2 },
                      { id: "navigation", title: "Navigation & Menus", level: 2 },
                      { id: "overlays", title: "Overlays & Feedback", level: 1 },
                    ]}
                    onItemClick={(id) => toast.info(`Scrolled to #${id}`)}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Segmented Control */}
          {isVisible("card-segmented-control") && (
            <Card id="card-segmented-control" className="col-span-full scroll-mt-28">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Segmented Control</CardTitle>
                  <CardDescription className="text-xs">
                    Sliding pill segmented controller for view switching, interval toggles, and mode selection
                  </CardDescription>
                </div>
                <ComponentInstallButton name="segmented-control" title="Segmented Control" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="space-y-1.5">
                    <p className="text-xs font-medium text-muted-foreground">Default size</p>
                    <SegmentedControl
                      value={demoSegment}
                      onChange={(val) => {
                        setDemoSegment(val);
                        toast.info(`Switched view to ${val}`);
                      }}
                      options={[
                        { value: "preview", label: "Preview" },
                        { value: "code", label: "Code" },
                        { value: "diff", label: "Diff" },
                      ]}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-xs font-medium text-muted-foreground">Small size</p>
                    <SegmentedControl
                      size="sm"
                      defaultValue="month"
                      options={[
                        { value: "day", label: "Day" },
                        { value: "week", label: "Week" },
                        { value: "month", label: "Month" },
                        { value: "year", label: "Year" },
                      ]}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reading Progress */}
          {isVisible("card-reading-progress") && (
            <Card id="card-reading-progress" className="scroll-mt-28">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Reading Progress Bar</CardTitle>
                  <CardDescription className="text-xs">
                    Viewport scroll depth indicator fixed at top of screen for long-form documentation and articles
                  </CardDescription>
                </div>
                <ComponentInstallButton name="reading-progress" title="Reading Progress" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border bg-muted/20 p-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Top Scroll Progress Bar Active</p>
                    <p className="text-xs text-muted-foreground">The top accent bar smoothly animates from 0% to 100% as you scroll the viewport.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs font-mono">Height: 3px (Fixed)</Badge>
                    <ReadingProgress height={3} />
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
