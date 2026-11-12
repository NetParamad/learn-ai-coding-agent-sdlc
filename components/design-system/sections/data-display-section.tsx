"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { DatePicker } from "@/components/ui/date-picker";
import { DataTable } from "@/components/ui/data-table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, XAxis } from "recharts";
import { EmptyState } from "@/components/ui/empty-state";
import { Timeline, TimelineItem, TimelineDot, TimelineContent } from "@/components/ui/timeline";
import { MetricCard } from "@/components/ui/metric-card";
import { PricingTable } from "@/components/ui/pricing-table";
import { FAQSection } from "@/components/ui/faq-section";
import { ChatMessage } from "@/components/ui/chat-message";
import { ChatContainer } from "@/components/ui/chat-container";
import { ThinkingAccordion } from "@/components/ui/thinking-accordion";
import { CitationPill } from "@/components/ui/citation-pill";
import { ActivityFeed } from "@/components/ui/activity-feed";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { ProductCard } from "@/components/ui/product-card";
import { TreeView, type TreeItemData } from "@/components/ui/tree-view";
import { CodeDiff } from "@/components/ui/code-diff";
import { ComponentInstallButton } from "@/components/design-system/component-install-button";
import { SectionHeader } from "@/components/design-system/sections/section-header";
import { BarChart3, Calendar as CalendarIcon, Check } from "lucide-react";
import { toast } from "sonner";
import type { ColumnDef } from "@tanstack/react-table";

type DataTableItem = {
  id: string;
  component: string;
  cluster: string;
  status: "Verified" | "Installed";
  version: string;
};

const dataTableData: DataTableItem[] = [
  { id: "1", component: "Button", cluster: "Core Primitives", status: "Verified", version: "1.0.0" },
  { id: "2", component: "DataTable", cluster: "Data Display", status: "Verified", version: "1.0.0" },
  { id: "3", component: "NavigationMenu", cluster: "Navigation", status: "Verified", version: "1.0.0" },
  { id: "4", component: "Sonner Toaster", cluster: "Overlays & Feedback", status: "Verified", version: "1.0.0" },
  { id: "5", component: "InputOTP", cluster: "Forms & Inputs", status: "Verified", version: "1.0.0" },
  { id: "6", component: "Sidebar", cluster: "Navigation", status: "Verified", version: "1.0.0" },
];

const dataTableColumns: ColumnDef<DataTableItem, unknown>[] = [
  { accessorKey: "component", header: "Component" },
  { accessorKey: "cluster", header: "Cluster" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: { getValue: (key: string) => string } }) => {
      const status = row.getValue("status");
      return (
        <Badge
          variant="outline"
          className="text-xs font-medium gap-1 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
        >
          <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
          {status}
        </Badge>
      );
    },
  },
  { accessorKey: "version", header: "Version" },
];

const sampleTreeData: TreeItemData[] = [
  {
    id: "app",
    name: "app",
    defaultExpanded: true,
    children: [
      {
        id: "locale",
        name: "[locale]",
        defaultExpanded: true,
        children: [
          { id: "page", name: "page.tsx", badge: "TSX" },
          { id: "layout", name: "layout.tsx", badge: "TSX" },
        ],
      },
      { id: "globals", name: "globals.css", badge: "CSS" },
    ],
  },
  {
    id: "components",
    name: "components",
    defaultExpanded: true,
    children: [
      {
        id: "ui",
        name: "ui",
        defaultExpanded: true,
        children: [
          { id: "avatar-group", name: "avatar-group.tsx" },
          { id: "tree-view", name: "tree-view.tsx" },
          { id: "segmented-control", name: "segmented-control.tsx" },
          { id: "cookie-banner", name: "cookie-banner.tsx" },
          { id: "code-diff", name: "code-diff.tsx" },
        ],
      },
    ],
  },
  { id: "design-md", name: "DESIGN.md", badge: "MD" },
];

export interface DataDisplaySectionProps {
  date?: Date;
  setDate: (date?: Date) => void;
}

export function DataDisplaySection({ date, setDate }: DataDisplaySectionProps) {
  const [search, setSearch] = React.useState("");
  const [demoProductAdded, setDemoProductAdded] = React.useState(false);
  const [demoTreeSelected, setDemoTreeSelected] = React.useState("page");

  const q = search.toLowerCase().trim();

  const cards = [
    { id: "card-data-table", name: "TanStack Data Table", tags: ["table", "datatable", "tanstack", "grid", "columns"] },
    { id: "card-calendar", name: "Calendar & Date Picker", tags: ["calendar", "date", "picker", "time"] },
    { id: "card-accordion-collapsible", name: "Accordion & Collapsible", tags: ["accordion", "collapsible", "panel", "collapse"] },
    { id: "card-carousel-chart", name: "Carousel & Recharts Analytics", tags: ["carousel", "chart", "recharts", "bar", "analytics"] },
    { id: "card-empty-state", name: "Empty State Patterns", tags: ["empty", "zero", "placeholder"] },
    { id: "card-timeline", name: "Activity Timeline & Audit Trail", tags: ["timeline", "audit", "events", "history"] },
    { id: "card-metric-card", name: "Metric Card", tags: ["metric", "kpi", "stats", "trend"] },
    { id: "card-pricing-table", name: "Pricing Table", tags: ["pricing", "tiers", "subscription", "plans"] },
    { id: "card-faq-section", name: "FAQ Section", tags: ["faq", "questions", "answers", "help"] },
    { id: "card-chat-message", name: "AI Chat Workspace & Messages", tags: ["chat", "ai", "message", "conversation", "bubble", "container", "thinking", "citation"] },
    { id: "card-activity-feed", name: "Activity Feed & Audit Log", tags: ["activity", "feed", "audit", "log", "timeline", "user"] },
    { id: "card-testimonial-card", name: "Testimonial Card", tags: ["testimonial", "review", "quote", "social-proof"] },
    { id: "card-product-card", name: "Product Card", tags: ["product", "ecommerce", "cart", "shop"] },
    { id: "card-tree-view", name: "Tree View", tags: ["tree", "file", "directory", "nodes"] },
    { id: "card-code-diff", name: "Code Diff Viewer", tags: ["diff", "code", "compare", "split", "unified"] },
  ];

  const isVisible = (id: string) => {
    if (!q) return true;
    const card = cards.find((c) => c.id === id);
    if (!card) return true;
    return card.name.toLowerCase().includes(q) || card.tags.some((t) => t.includes(q));
  };

  const visibleCount = cards.filter((c) => isVisible(c.id)).length;

  return (
    <section id="data-display" className="space-y-6 scroll-mt-28">
      <SectionHeader
        icon={BarChart3}
        title="Data Display"
        description="Card, Table, Data Table (TanStack Table), Carousel, Accordion, Collapsible, Calendar, and Recharts."
        searchQuery={search}
        onSearchChange={setSearch}
        totalCount={cards.length}
        filteredCount={visibleCount}
        placeholder="Filter data display (table, chart, diff, tree...)"
      />

      {visibleCount === 0 ? (
        <div className="p-8 text-center border rounded-lg bg-muted/10 text-xs text-muted-foreground">
          No data display components match "{search}".
        </div>
      ) : (
        <div className="space-y-6">
          {/* TanStack Data Table */}
          {isVisible("card-data-table") && (
            <Card id="card-data-table">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 p-4 sm:p-6 pb-2">
                <div>
                  <CardTitle className="text-base">TanStack Data Table with Live Column Toggling</CardTitle>
                  <CardDescription className="text-xs">
                    Production data table with filtering, responsive scroll wrapper, and column visibility
                  </CardDescription>
                </div>
                <ComponentInstallButton name="data-table" title="Data Table" />
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-2">
                <DataTable
                  columns={dataTableColumns}
                  data={dataTableData}
                  searchKey="component"
                />
              </CardContent>
            </Card>
          )}

          {/* Interactive Calendar Showcase */}
          {isVisible("card-calendar") && (
            <Card id="card-calendar">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                    <CardTitle className="text-base">Calendar & Date Picker (react-day-picker v9)</CardTitle>
                  </div>
                  <CardDescription className="text-xs mt-1">
                    Clean 7-column grid with pixel-perfect weekday alignment, outside days, and keyboard navigation
                  </CardDescription>
                </div>
                <ComponentInstallButton name="calendar" title="Calendar" />
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="flex justify-center">
                  <div className="rounded-lg border bg-card p-2 shadow-xs inline-block">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-muted/30 space-y-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
                      Active Selection
                    </span>
                    <span className="text-base font-semibold text-primary block">
                      {date ? date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "No date selected"}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      ISO string: <code className="font-mono text-primary">{date ? date.toISOString().split("T")[0] : "—"}</code>
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium">Quick Date Presets</Label>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => setDate(new Date())}
                      >
                        Today
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          const d = new Date();
                          d.setDate(d.getDate() + 1);
                          setDate(d);
                        }}
                      >
                        Tomorrow
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          const d = new Date();
                          d.setDate(d.getDate() + 7);
                          setDate(d);
                        }}
                      >
                        Next Week
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                        onClick={() => setDate(undefined)}
                      >
                        Clear
                      </Button>
                    </div>
                  </div>

                  <div className="pt-2 border-t space-y-1.5">
                    <Label className="text-xs font-medium">Popover Date Picker Integration</Label>
                    <DatePicker date={date} setDate={setDate} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Accordion & Collapsible */}
            {isVisible("card-accordion-collapsible") && (
              <Card id="card-accordion-collapsible">
                <CardHeader>
                  <CardTitle className="text-base">Accordion & Collapsible Primitives</CardTitle>
                  <CardDescription className="text-xs">
                    Accessible expanding sections with smooth height animations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Accordion type="single" collapsible defaultValue="a1">
                    <AccordionItem value="a1">
                      <AccordionTrigger className="text-xs sm:text-sm">Why OKLCH in Modern Web Design?</AccordionTrigger>
                      <AccordionContent className="text-xs text-muted-foreground">
                        OKLCH provides perceptual uniformity across all hues, solving the contrast anomalies common in legacy HSL and sRGB spaces.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="a2">
                      <AccordionTrigger className="text-xs sm:text-sm">How are Radix Primitives integrated?</AccordionTrigger>
                      <AccordionContent className="text-xs text-muted-foreground">
                        Radix primitives supply unstyled, accessible keyboard navigation and ARIA attributes, while Tailwind CSS v4 provides design token styles.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Separator />
                  <Collapsible>
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-medium">Collapsible Panel</span>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">Toggle</Button>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="mt-2 text-xs text-muted-foreground p-3 border rounded-md">
                      This content is revealed progressively through the Collapsible primitive.
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            )}

            {/* Carousel & Chart */}
            {isVisible("card-carousel-chart") && (
              <Card id="card-carousel-chart">
                <CardHeader>
                  <CardTitle className="text-base">Carousel & Recharts Analytics</CardTitle>
                  <CardDescription className="text-xs">
                    Embla touch carousel slider and Recharts analytics bar container
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="px-6 sm:px-12">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {["Slide 1: Foundations", "Slide 2: Form Controls", "Slide 3: Overlays"].map((text, idx) => (
                          <CarouselItem key={idx}>
                            <div className="p-4 sm:p-6 border rounded-lg bg-muted/30 text-center font-medium text-xs sm:text-sm">
                              {text}
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="-left-3 sm:-left-12" />
                      <CarouselNext className="-right-3 sm:-right-12" />
                    </Carousel>
                  </div>
                  <div className="h-32 sm:h-36 w-full pt-2">
                    <ChartContainer
                      config={{
                        tokens: { label: "Components Installed", color: "var(--primary)" },
                      }}
                      className="h-full w-full"
                    >
                      <BarChart data={[
                        { cat: "Primitives", val: 8 },
                        { cat: "Forms", val: 12 },
                        { cat: "Display", val: 8 },
                        { cat: "Nav", val: 6 },
                        { cat: "Overlays", val: 14 },
                      ]}>
                        <XAxis dataKey="cat" tickLine={false} axisLine={false} />
                        <Bar dataKey="val" fill="var(--color-primary)" radius={4} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </BarChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Empty State */}
            {isVisible("card-empty-state") && (
              <Card id="card-empty-state">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base">Empty State Patterns</CardTitle>
                      <Badge variant="secondary" className="text-[10px] font-mono">Zero-Data UI</Badge>
                    </div>
                    <CardDescription className="text-xs mt-1">
                      Clear call-to-action containers for empty tables, search queries, and permission gates
                    </CardDescription>
                  </div>
                  <ComponentInstallButton name="empty-state" title="Empty State" />
                </CardHeader>
                <CardContent>
                  <EmptyState
                    variant="dashed"
                    size="sm"
                    title="No Webhook Subscriptions Found"
                    description="Configure real-time event webhooks to stream tenant mutation payloads to your external services."
                    action={
                      <Button size="sm" className="text-xs" onClick={() => toast.success("Create Webhook opened")}>
                        Add Webhook
                      </Button>
                    }
                    secondaryAction={
                      <Button variant="outline" size="sm" className="text-xs" onClick={() => toast.info("Opening API docs")}>
                        View Docs
                      </Button>
                    }
                  />
                </CardContent>
              </Card>
            )}

            {/* Timeline / Audit Log */}
            {isVisible("card-timeline") && (
              <Card id="card-timeline" className="lg:col-span-2 scroll-mt-28">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base">Activity Timeline & Audit Trail</CardTitle>
                      <Badge variant="secondary" className="text-[10px] font-mono">Activity Log</Badge>
                    </div>
                    <CardDescription className="text-xs mt-1">
                      Chronological event stream with state dots, timestamps, and metadata tags
                    </CardDescription>
                  </div>
                  <ComponentInstallButton name="timeline" title="Timeline" />
                </CardHeader>
                <CardContent className="pt-2">
                  <Timeline>
                    <TimelineItem>
                      <TimelineDot status="completed" />
                      <TimelineContent
                        title="Production Deployment (v2.4.0) Promoted"
                        time="2 mins ago"
                        description="Canary deployment passed 10,000 synthetic checks without error spikes. All traffic shifted to green cluster."
                      />
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineDot status="current" />
                      <TimelineContent
                        title="Database Migration in Progress"
                        time="14 mins ago"
                        description="Applying schema migrations for multi-tenant tenant_id foreign key indexes."
                      />
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineDot status="pending" />
                      <TimelineContent
                        title="Security Audit Scheduled"
                        time="Tomorrow, 09:00 UTC"
                        description="Automated SOC2 compliance scan and secrets rotation scheduled."
                      />
                    </TimelineItem>
                  </Timeline>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Metric Card */}
          {isVisible("card-metric-card") && (
            <Card id="card-metric-card" className="col-span-full">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Metric Card</CardTitle>
                  <CardDescription className="text-xs">
                    Dashboard KPI metric summary cards with trend indicators, units, and sparkline charts
                  </CardDescription>
                </div>
                <ComponentInstallButton name="metric-card" title="Metric Card" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <MetricCard
                    title="Monthly Recurring Revenue"
                    value="$124,500"
                    unit="USD"
                    description="Compared to $108,900 last month"
                    trend={{ value: "+14.3%", direction: "up", label: "vs last month" }}
                    badge="Revenue"
                  />
                  <MetricCard
                    title="Active Subscribers"
                    value="8,420"
                    unit="users"
                    description="Net gain of 480 accounts this week"
                    trend={{ value: "+6.1%", direction: "up", label: "growth" }}
                    badge="Engagement"
                  />
                  <MetricCard
                    title="Average Churn Rate"
                    value="1.24"
                    unit="%"
                    description="Down 0.3% from previous quarter"
                    trend={{ value: "-0.3%", direction: "down", label: "reduction" }}
                    badge="Retention"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pricing Table */}
          {isVisible("card-pricing-table") && (
            <Card id="card-pricing-table" className="col-span-full">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Pricing Table</CardTitle>
                  <CardDescription className="text-xs">
                    Conversion-optimized tiered pricing grid with billing frequency toggle and feature comparison
                  </CardDescription>
                </div>
                <ComponentInstallButton name="pricing-table" title="Pricing Table" />
              </CardHeader>
              <CardContent>
                <PricingTable />
              </CardContent>
            </Card>
          )}

          {/* FAQ Section */}
          {isVisible("card-faq-section") && (
            <Card id="card-faq-section" className="col-span-full">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">FAQ Section</CardTitle>
                  <CardDescription className="text-xs">
                    Searchable frequently asked questions accordion with category filters and contact prompt
                  </CardDescription>
                </div>
                <ComponentInstallButton name="faq-section" title="FAQ Section" />
              </CardHeader>
              <CardContent>
                <FAQSection
                  title="Frequently Asked Questions"
                  description="Everything you need to know about consuming components, licensing, and OKLCH themes."
                />
              </CardContent>
            </Card>
          )}

          {/* AI Chat Workspace & Messages */}
          {isVisible("card-chat-message") && (
            <Card id="card-chat-message" className="col-span-full">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">AI Chat Workspace & Messages</CardTitle>
                  <CardDescription className="text-xs">
                    Conversational container with auto-scroll management, collapsible Chain-of-Thought reasoning, citations, and action slots
                  </CardDescription>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <ComponentInstallButton name="chat-container" title="Chat Container" />
                  <ComponentInstallButton name="thinking-accordion" title="Thinking Accordion" />
                  <ComponentInstallButton name="citation-pill" title="Citation Pill" />
                  <ComponentInstallButton name="chat-message" title="Chat Message" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <ChatContainer className="h-[340px] border rounded-lg bg-muted/10">
                  <ChatMessage
                    role="user"
                    senderName="Lead Engineer"
                    timestamp="10:42 AM"
                    content="Can you verify how our OKLCH semantic tokens behave across light and dark modes?"
                  />

                  <div className="space-y-2">
                    <ThinkingAccordion
                      thoughts={`1. Querying theme registry for OKLCH coordinates across 8 official palettes
2. Computing contrast ratio delta between background oklch(1 0 0) and primary oklch(0.205 0 0)
3. Confirming WCAG AAA contrast >= 7.0:1 on interactive text`}
                      isThinking={false}
                      durationSeconds={1.6}
                      tokenCount={118}
                    />

                    <ChatMessage
                      role="assistant"
                      senderName="AI Design Copilot"
                      timestamp="10:42 AM"
                      content={
                        <div className="space-y-2">
                          <p>
                            Every semantic token is calibrated in OKLCH coordinates. Backgrounds transition smoothly from oklch(1 0 0) to oklch(0.145 0 0) while primary actions maintain WCAG AAA contrast ratios across all viewports.
                            <CitationPill
                              index={1}
                              title="OKLCH Color Science & Perceptual Uniformity"
                              source="oklch.com"
                              snippet="OKLCH provides predictable chroma scaling and uniform perceived lightness across hue angles."
                              url="https://oklch.com"
                            />
                            <CitationPill
                              index={2}
                              title="WCAG 2.2 Color Contrast Specification"
                              source="w3.org"
                              snippet="Level AAA requires a contrast ratio of at least 7:1 for normal text and 4.5:1 for large text."
                              url="https://www.w3.org/WAI/WCAG22/quickref/"
                            />
                          </p>
                        </div>
                      }
                      onLike={() => toast.success("Marked as helpful")}
                      onDislike={() => toast.info("Feedback recorded")}
                      onRetry={() => toast.info("Regenerating response...")}
                    />
                  </div>
                </ChatContainer>
              </CardContent>
            </Card>
          )}

          {/* Activity Feed & Audit Log */}
          {isVisible("card-activity-feed") && (
            <Card id="card-activity-feed" className="col-span-full">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Activity Feed & Audit Log</CardTitle>
                  <CardDescription className="text-xs">
                    Chronological audit log and team event stream with user avatars, status badges, and relative timestamps
                  </CardDescription>
                </div>
                <ComponentInstallButton name="activity-feed" title="Activity Feed" />
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border bg-muted/10 p-4">
                  <ActivityFeed
                    activities={[
                      {
                        id: "1",
                        user: { name: "Sarah Chen", fallback: "SC" },
                        action: "promoted build to",
                        target: "production-v2.4",
                        timestamp: "12m ago",
                        badge: { label: "Deployment", variant: "default" },
                      },
                      {
                        id: "2",
                        user: { name: "Alex Rover", fallback: "AR" },
                        action: "updated semantic tokens in",
                        target: "globals.css",
                        timestamp: "1h ago",
                        badge: { label: "Tokens", variant: "secondary" },
                      },
                      {
                        id: "3",
                        user: { name: "Antigravity Agent", fallback: "AG" },
                        action: "verified 96 components via",
                        target: "npm test",
                        timestamp: "2h ago",
                        badge: { label: "CI Passed", variant: "outline" },
                      },
                    ]}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Testimonial Card */}
          {isVisible("card-testimonial-card") && (
            <Card id="card-testimonial-card" className="col-span-full">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Testimonial Card</CardTitle>
                  <CardDescription className="text-xs">
                    Social proof customer quotes with star rating, verified author badges, and role attribution
                  </CardDescription>
                </div>
                <ComponentInstallButton name="testimonial-card" title="Testimonial Card" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TestimonialCard
                    rating={5}
                    quote="This design system cut our multi-brand UI development time in half. The OKLCH color engine and copy-and-own architecture are unmatched."
                    author={{
                      name: "Sarah Lin",
                      role: "VP of Product Engineering",
                      company: "Fintech Core",
                      verified: true,
                      avatarFallback: "SL",
                    }}
                  />
                  <TestimonialCard
                    rating={5}
                    quote="The cleanest Next.js 16 and Tailwind CSS v4 kit on the market. Having zero runtime lock-in made migration seamless for our entire engineering org."
                    author={{
                      name: "Marcus Aurelius",
                      role: "Principal Architect",
                      company: "CloudScale Systems",
                      verified: true,
                      avatarFallback: "MA",
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Product Card */}
          {isVisible("card-product-card") && (
            <Card id="card-product-card" className="col-span-full">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Product Card</CardTitle>
                  <CardDescription className="text-xs">
                    E-Commerce showcase card with aspect ratio media, price calculation, discount badges, color swatches, and cart action
                  </CardDescription>
                </div>
                <ComponentInstallButton name="product-card" title="Product Card" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
                  <ProductCard
                    title="Mechanical Gaming Keyboard Pro"
                    category="Peripherals"
                    price={129.99}
                    originalPrice={159.99}
                    rating={4.9}
                    reviewCount={328}
                    badge="Save 19%"
                    colors={[
                      { name: "Obsidian", value: "#18181b" },
                      { name: "Silver", value: "#e4e4e7" },
                      { name: "Cobalt", value: "#2563eb" },
                    ]}
                    isAdded={demoProductAdded}
                    onAddToCart={() => {
                      setDemoProductAdded(!demoProductAdded);
                      toast.success(demoProductAdded ? "Removed from cart" : "Added Mechanical Keyboard to cart!");
                    }}
                  />
                  <ProductCard
                    title="Ergonomic Wireless Mouse"
                    category="Peripherals"
                    price={79.5}
                    rating={4.7}
                    reviewCount={142}
                    badge="Popular"
                    colors={[
                      { name: "Matte Black", value: "#27272a" },
                      { name: "Arctic White", value: "#f4f4f5" },
                    ]}
                    onAddToCart={() => toast.success("Added Wireless Mouse to cart!")}
                  />
                  <ProductCard
                    title="Noise-Cancelling Studio Headphones"
                    category="Audio"
                    price={249.0}
                    originalPrice={299.0}
                    rating={4.8}
                    reviewCount={512}
                    badge="Best Seller"
                    colors={[
                      { name: "Midnight", value: "#09090b" },
                      { name: "Sandstone", value: "#d4d4d8" },
                    ]}
                    onAddToCart={() => toast.success("Added Studio Headphones to cart!")}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tree View */}
          {isVisible("card-tree-view") && (
            <Card id="card-tree-view" className="scroll-mt-28">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Tree View</CardTitle>
                  <CardDescription className="text-xs">
                    Hierarchical directory explorer with file/folder icons, badges, expandable nodes, and keyboard accessibility
                  </CardDescription>
                </div>
                <ComponentInstallButton name="tree-view" title="Tree View" />
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="max-w-md">
                  <TreeView
                    data={sampleTreeData}
                    selectedId={demoTreeSelected}
                    onSelect={(item) => {
                      setDemoTreeSelected(item.id);
                      toast.info(`Selected ${item.name}`);
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground font-mono">
                  Active node: <span className="font-semibold text-foreground">{demoTreeSelected}</span>
                </p>
              </CardContent>
            </Card>
          )}

          {/* Code Diff */}
          {isVisible("card-code-diff") && (
            <Card id="card-code-diff" className="col-span-full scroll-mt-28">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Code Diff Viewer</CardTitle>
                  <CardDescription className="text-xs">
                    Side-by-side and unified code difference viewer with line numbers and change highlights
                  </CardDescription>
                </div>
                <ComponentInstallButton name="code-diff" title="Code Diff" />
              </CardHeader>
              <CardContent>
                <CodeDiff
                  oldTitle="v1.0.0 (Button.tsx)"
                  newTitle="v2.0.0 (Button.tsx)"
                  language="tsx"
                  defaultMode="split"
                  oldCode={`export function Button({ variant, children }) {
  return (
    <button className={variant === "primary" ? "btn-blue" : "btn-gray"}>
      {children}
    </button>
  );
}`}
                  newCode={`import { cva, type VariantProps } from "class-variance-authority";

export function Button({ variant, size, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }))} {...props}>
      {children}
    </button>
  );
}`}
                />
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </section>
  );
}
