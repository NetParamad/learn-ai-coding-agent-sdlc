"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Type } from "lucide-react";
import { TypographyH4, TypographyLead, TypographyBlockquote } from "@/components/ui/typography";
import { ComponentInstallButton } from "@/components/design-system/component-install-button";
import { SectionHeader } from "@/components/design-system/sections/section-header";

const rampLevels = [
  { name: "Display", spec: "4.5rem (72px) • Bold • -0.025em", sample: "The Precision Workshop", sizeClass: "text-3xl sm:text-4xl lg:text-[4.5rem] font-bold tracking-tight text-foreground leading-tight" },
  { name: "Headline", spec: "2.25rem (36px) • Bold • -0.02em", sample: "Autonomous Infrastructure Systems", sizeClass: "text-2xl sm:text-3xl font-bold tracking-tight text-foreground" },
  { name: "Title", spec: "1.25rem (20px) • SemiBold • 1.3 leading", sample: "Fault-Tolerant Distributed Component Registry", sizeClass: "text-lg sm:text-xl font-semibold text-foreground" },
  { name: "Body", spec: "1.0rem (16px) • Regular • 1.5 leading", sample: "High-contrast OKLCH perceptual tokens engineered for zero cognitive fatigue, instant scanability, and predictable light and dark modes across enterprise surfaces.", sizeClass: "text-sm sm:text-base text-muted-foreground leading-relaxed" },
];

export function TypographySection() {
  const [typoSearch, setTypoSearch] = React.useState("");
  const searchQuery = typoSearch.toLowerCase().trim();

  const filteredRamp = React.useMemo(() => {
    if (!searchQuery) return rampLevels;
    return rampLevels.filter(
      (r) => r.name.toLowerCase().includes(searchQuery) || r.spec.toLowerCase().includes(searchQuery) || r.sample.toLowerCase().includes(searchQuery)
    );
  }, [searchQuery]);

  return (
    <section id="typography" className="space-y-6 scroll-mt-28">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4">
        <SectionHeader
          icon={Type}
          title="Typography & System Foundations"
          description="Strict 6-level typographic ramp from DESIGN.md, prose elements, and foundation metrics."
          badgeText="DESIGN.md"
          searchQuery={typoSearch}
          onSearchChange={setTypoSearch}
          totalCount={rampLevels.length + 4}
          filteredCount={filteredRamp.length + 4}
          placeholder="Filter typography ramp & metrics..."
        />
        <ComponentInstallButton name="typography" title="Typography" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Type Ramp Table */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Typographic Ramp (Scale & Metrics)</CardTitle>
              <Badge variant="outline" className="font-mono text-xs">DESIGN.md</Badge>
            </div>
            <CardDescription className="text-xs">
              Standardized line heights, optical weights, and letter-spacing tracking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredRamp.map((item) => (
              <div key={item.name} className="p-3.5 rounded-lg border bg-muted/10 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span className="font-semibold text-foreground">{item.name}</span>
                  <span>{item.spec}</span>
                </div>
                <div className={item.sizeClass}>{item.sample}</div>
              </div>
            ))}

            {/* Label & Caption */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border bg-muted/10 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span className="font-semibold text-foreground">Label (Mono)</span>
                  <span>0.875rem (14px)</span>
                </div>
                <code className="text-xs font-mono text-primary font-medium block">
                  GET /r/status-badge.json • 200 OK • 1.2ms
                </code>
              </div>

              <div className="p-3 rounded-lg border bg-muted/10 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span className="font-semibold text-foreground">Caption</span>
                  <span>0.625rem (10px)</span>
                </div>
                <span className="text-[0.625rem] text-muted-foreground uppercase tracking-widest font-semibold block">
                  TELEMETRY REPLICA REGION: US-EAST-1A
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Editorial & Prose Elements */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Prose & Code Elements</CardTitle>
            <CardDescription className="text-xs">
              Editorial typography components from typography.tsx
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <TypographyH4 className="text-sm font-semibold mb-1">
                Section Sub-heading
              </TypographyH4>
              <TypographyLead className="text-xs text-muted-foreground">
                Lead paragraph establishing context before technical execution.
              </TypographyLead>
            </div>

            <TypographyBlockquote className="text-xs italic text-muted-foreground border-l-2 pl-3 py-0.5">
              "Good design is as little design as possible. Less, but better."
            </TypographyBlockquote>

            <div className="space-y-1.5 pt-2 border-t">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Inline Code & Badges</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Use <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs font-semibold text-foreground">npx shadcn add</code> to pull isolated components with zero runtime overhead.
              </p>
            </div>

            <div className="space-y-1.5 pt-2 border-t">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Corner Radii Tokens</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
                <div className="p-2 border rounded-sm bg-muted/20">sm: 6px</div>
                <div className="p-2 border rounded-md bg-muted/20">md: 8px</div>
                <div className="p-2 border rounded-lg bg-muted/20">lg: 10px</div>
                <div className="p-2 border rounded-xl bg-muted/20">xl: 14px</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
