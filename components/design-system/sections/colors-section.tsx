"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Palette, Sparkles } from "lucide-react";
import { ComponentInstallButton } from "@/components/design-system/component-install-button";
import { SectionHeader } from "@/components/design-system/sections/section-header";

export const coreTokens = [
  { name: "Primary", token: "--primary", light: "oklch(0.205 0 0)", dark: "oklch(0.985 0 0)", bgClass: "bg-primary text-primary-foreground", role: "High-emphasis actions & active states" },
  { name: "Secondary", token: "--secondary", light: "oklch(0.97 0 0)", dark: "oklch(0.269 0 0)", bgClass: "bg-secondary text-secondary-foreground", role: "Tonal surface & secondary actions" },
  { name: "Muted", token: "--muted", light: "oklch(0.97 0 0)", dark: "oklch(0.269 0 0)", bgClass: "bg-muted text-muted-foreground", role: "Muted surfaces & de-emphasized text" },
  { name: "Accent", token: "--accent", light: "oklch(0.97 0 0)", dark: "oklch(0.269 0 0)", bgClass: "bg-accent text-accent-foreground", role: "Interactive hover highlights" },
  { name: "Destructive", token: "--destructive", light: "oklch(0.577 0.245 27.325)", dark: "oklch(0.577 0.245 27.325)", bgClass: "bg-destructive text-destructive-foreground", role: "Critical alerts & destructive buttons" },
  { name: "Border", token: "--border", light: "oklch(0.922 0 0)", dark: "oklch(0.269 0 0)", bgClass: "bg-border text-foreground", role: "1px structural dividers & cards" },
  { name: "Background", token: "--background", light: "oklch(1 0 0)", dark: "oklch(0.145 0 0)", bgClass: "bg-background text-foreground border", role: "Base application canvas" },
  { name: "Card", token: "--card", light: "oklch(1 0 0)", dark: "oklch(0.145 0 0)", bgClass: "bg-card text-card-foreground border", role: "Elevated card content containers" },
];

export const shadcnOfficialThemes = [
  {
    name: "Zinc",
    role: "System Base (Active Portfolio Theme)",
    oklchLight: "oklch(0.205 0 0)",
    oklchDark: "oklch(0.985 0 0)",
    badgeClass: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20",
    shades: [
      { step: "50", hex: "#fafafa" }, { step: "100", hex: "#f4f4f5" }, { step: "200", hex: "#e4e4e7" },
      { step: "300", hex: "#d4d4d8" }, { step: "400", hex: "#a1a1aa" }, { step: "500", hex: "#71717a" },
      { step: "600", hex: "#52525b" }, { step: "700", hex: "#3f3f46" }, { step: "800", hex: "#27272a" },
      { step: "900", hex: "#18181b" }, { step: "950", hex: "#09090b" },
    ],
  },
  {
    name: "Red",
    role: "Destructive / Errors / Critical Actions",
    oklchLight: "oklch(0.577 0.245 27.325)",
    oklchDark: "oklch(0.577 0.245 27.325)",
    badgeClass: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    shades: [
      { step: "50", hex: "#fef2f2" }, { step: "100", hex: "#fee2e2" }, { step: "200", hex: "#fecaca" },
      { step: "300", hex: "#fca5a5" }, { step: "400", hex: "#f87171" }, { step: "500", hex: "#ef4444" },
      { step: "600", hex: "#dc2626" }, { step: "700", hex: "#b91c1c" }, { step: "800", hex: "#991b1b" },
      { step: "900", hex: "#7f1d1d" }, { step: "950", hex: "#450a0a" },
    ],
  },
  {
    name: "Blue",
    role: "Info / Digital Brand / Primary SaaS",
    oklchLight: "oklch(0.623 0.214 259.815)",
    oklchDark: "oklch(0.588 0.222 258.281)",
    badgeClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    shades: [
      { step: "50", hex: "#eff6ff" }, { step: "100", hex: "#dbeafe" }, { step: "200", hex: "#bfdbfe" },
      { step: "300", hex: "#93c5fd" }, { step: "400", hex: "#60a5fa" }, { step: "500", hex: "#3b82f6" },
      { step: "600", hex: "#2563eb" }, { step: "700", hex: "#1d4ed8" }, { step: "800", hex: "#1e40af" },
      { step: "900", hex: "#1e3a8a" }, { step: "950", hex: "#172554" },
    ],
  },
  {
    name: "Green",
    role: "Success / Verified / Positive Confirmation",
    oklchLight: "oklch(0.596 0.145 153.15)",
    oklchDark: "oklch(0.696 0.17 162.48)",
    badgeClass: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    shades: [
      { step: "50", hex: "#f0fdf4" }, { step: "100", hex: "#dcfce7" }, { step: "200", hex: "#bbf7d0" },
      { step: "300", hex: "#86efac" }, { step: "400", hex: "#4ade80" }, { step: "500", hex: "#22c55e" },
      { step: "600", hex: "#16a34a" }, { step: "700", hex: "#15803d" }, { step: "800", hex: "#166534" },
      { step: "900", hex: "#14532d" }, { step: "950", hex: "#052e16" },
    ],
  },
  {
    name: "Yellow",
    role: "Warning / Attention / In Review",
    oklchLight: "oklch(0.865 0.195 92.5)",
    oklchDark: "oklch(0.88 0.19 93.0)",
    badgeClass: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
    shades: [
      { step: "50", hex: "#fefce8" }, { step: "100", hex: "#fef9c3" }, { step: "200", hex: "#fef08a" },
      { step: "300", hex: "#fde047" }, { step: "400", hex: "#facc15" }, { step: "500", hex: "#eab308" },
      { step: "600", hex: "#ca8a04" }, { step: "700", hex: "#a16207" }, { step: "800", hex: "#854d0e" },
      { step: "900", hex: "#713f12" }, { step: "950", hex: "#422006" },
    ],
  },
  {
    name: "Orange",
    role: "Warm Accent / Action",
    oklchLight: "oklch(0.646 0.222 41.116)",
    oklchDark: "oklch(0.681 0.207 43.14)",
    badgeClass: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
    shades: [
      { step: "50", hex: "#fff7ed" }, { step: "100", hex: "#ffedd5" }, { step: "200", hex: "#fed7aa" },
      { step: "300", hex: "#fdba74" }, { step: "400", hex: "#fb923c" }, { step: "500", hex: "#f97316" },
      { step: "600", hex: "#ea580c" }, { step: "700", hex: "#c2410c" }, { step: "800", hex: "#9a3412" },
      { step: "900", hex: "#7c2d12" }, { step: "950", hex: "#431407" },
    ],
  },
  {
    name: "Violet",
    role: "Creative Feature / Special Highlight",
    oklchLight: "oklch(0.606 0.25 292.717)",
    oklchDark: "oklch(0.541 0.281 293.009)",
    badgeClass: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
    shades: [
      { step: "50", hex: "#f5f3ff" }, { step: "100", hex: "#ede9fe" }, { step: "200", hex: "#ddd6fe" },
      { step: "300", hex: "#c4b5fd" }, { step: "400", hex: "#a78bfa" }, { step: "500", hex: "#8b5cf6" },
      { step: "600", hex: "#7c3aed" }, { step: "700", hex: "#6d28d9" }, { step: "800", hex: "#5b21b6" },
      { step: "900", hex: "#4c1d95" }, { step: "950", hex: "#2e1065" },
    ],
  },
  {
    name: "Rose",
    role: "Vibrant Alert / High Priority",
    oklchLight: "oklch(0.596 0.22 17.5)",
    oklchDark: "oklch(0.62 0.21 17.5)",
    badgeClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    shades: [
      { step: "50", hex: "#fff1f2" }, { step: "100", hex: "#ffe4e6" }, { step: "200", hex: "#fecdd3" },
      { step: "300", hex: "#fda4af" }, { step: "400", hex: "#fb7185" }, { step: "500", hex: "#f43f5e" },
      { step: "600", hex: "#e11d48" }, { step: "700", hex: "#be123c" }, { step: "800", hex: "#9f1239" },
      { step: "900", hex: "#881337" }, { step: "950", hex: "#4c0519" },
    ],
  },
];

export const tailwindSpectrumFamilies = [
  {
    family: "Neutrals & Slate",
    colors: [
      { name: "Zinc", shades: ["#fafafa","#f4f4f5","#e4e4e7","#d4d4d8","#a1a1aa","#71717a","#52525b","#3f3f46","#27272a","#18181b","#09090b"] },
      { name: "Slate", shades: ["#f8fafc","#f1f5f9","#e2e8f0","#cbd5e1","#94a3b8","#64748b","#475569","#334155","#1e293b","#0f172a","#020617"] },
      { name: "Stone", shades: ["#fafaf9","#f5f5f4","#e7e5e4","#d6d3d1","#a8a29e","#78716c","#57534e","#44403c","#292524","#1c1917","#0c0a09"] },
      { name: "Gray", shades: ["#f9fafb","#f3f4f6","#e5e7eb","#d1d5db","#9ca3af","#6b7280","#4b5563","#374151","#1f2937","#111827","#030712"] },
      { name: "Neutral", shades: ["#fafafa","#f5f5f5","#e5e5e5","#d4d4d4","#a3a3a3","#737373","#525252","#404040","#262626","#171717","#0a0a0a"] },
    ],
  },
  {
    family: "Red, Orange & Amber",
    colors: [
      { name: "Red", shades: ["#fef2f2","#fee2e2","#fecaca","#fca5a5","#f87171","#ef4444","#dc2626","#b91c1c","#991b1b","#7f1d1d","#450a0a"] },
      { name: "Rose", shades: ["#fff1f2","#ffe4e6","#fecdd3","#fda4af","#fb7185","#f43f5e","#e11d48","#be123c","#9f1239","#881337","#4c0519"] },
      { name: "Orange", shades: ["#fff7ed","#ffedd5","#fed7aa","#fdba74","#fb923c","#f97316","#ea580c","#c2410c","#9a3412","#7c2d12","#431407"] },
      { name: "Amber", shades: ["#fffbeb","#fef3c7","#fde68a","#fcd34d","#fbbf24","#f59e0b","#d97706","#b45309","#92400e","#78350f","#451a03"] },
      { name: "Yellow", shades: ["#fefce8","#fef9c3","#fef08a","#fde047","#facc15","#eab308","#ca8a04","#a16207","#854d0e","#713f12","#422006"] },
    ],
  },
  {
    family: "Green, Emerald & Teal",
    colors: [
      { name: "Lime", shades: ["#f7fee7","#ecfccb","#d9f99d","#bef264","#a3e635","#84cc16","#65a30d","#4d7c0f","#3f6212","#365314","#1a2e05"] },
      { name: "Green", shades: ["#f0fdf4","#dcfce7","#bbf7d0","#86efac","#4ade80","#22c55e","#16a34a","#15803d","#166534","#14532d","#052e16"] },
      { name: "Emerald", shades: ["#ecfdf5","#d1fae5","#a7f3d0","#6ee7b7","#34d399","#10b981","#059669","#047857","#065f46","#064e3b","#022c22"] },
      { name: "Teal", shades: ["#f0fdfa","#ccfbf1","#99f6e4","#5eead4","#2dd4bf","#14b8a6","#0d9488","#0f766e","#115e59","#134e4a","#042f2e"] },
    ],
  },
  {
    family: "Cyan, Blue & Indigo",
    colors: [
      { name: "Cyan", shades: ["#ecfeff","#cffafe","#a5f3fc","#67e8f9","#22d3ee","#06b6d4","#0891b2","#0e7490","#155e75","#164e63","#083344"] },
      { name: "Sky", shades: ["#f0f9ff","#e0f2fe","#bae6fd","#7dd3fc","#38bdf8","#0ea5e9","#0284c7","#0369a1","#075985","#0c4a6e","#082f49"] },
      { name: "Blue", shades: ["#eff6ff","#dbeafe","#bfdbfe","#93c5fd","#60a5fa","#3b82f6","#2563eb","#1d4ed8","#1e40af","#1e3a8a","#172554"] },
      { name: "Indigo", shades: ["#eef2ff","#e0e7ff","#c7d2fe","#a5b4fc","#818cf8","#6366f1","#4f46e5","#4338ca","#3730a3","#312e81","#1e1b4b"] },
    ],
  },
  {
    family: "Violet, Purple & Pink",
    colors: [
      { name: "Violet", shades: ["#f5f3ff","#ede9fe","#ddd6fe","#c4b5fd","#a78bfa","#8b5cf6","#7c3aed","#6d28d9","#5b21b6","#4c1d95","#2e1065"] },
      { name: "Purple", shades: ["#faf5ff","#f3e8ff","#e9d5ff","#d8b4fe","#c084fc","#a855f7","#9333ea","#7e22ce","#6b21a8","#581c87","#3b0764"] },
      { name: "Fuchsia", shades: ["#fdf4ff","#fae8ff","#f5d0fe","#f0abfc","#e879f9","#d946ef","#c026d3","#a21caf","#86198f","#701a75","#4a044e"] },
      { name: "Pink", shades: ["#fdf2f8","#fce7f3","#fbcfe8","#f9a8d4","#f472b6","#ec4899","#db2777","#be185d","#9d174d","#831843","#500724"] },
    ],
  },
];

const shadeSteps = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];

export interface ColorsSectionProps {
  activeTheme: string;
  applyTheme: (theme: string) => void;
  handleCopy: (text: string) => void;
}

export function ColorsSection({ activeTheme, applyTheme, handleCopy }: ColorsSectionProps) {
  const [colorSearch, setColorSearch] = React.useState("");
  const [brandHex, setBrandHex] = React.useState("#3b82f6");

  const q = colorSearch.toLowerCase().trim();

  const filteredCoreTokens = React.useMemo(() => {
    if (!q) return coreTokens;
    return coreTokens.filter(
      (item) => item.name.toLowerCase().includes(q) || item.token.toLowerCase().includes(q) || item.role.toLowerCase().includes(q)
    );
  }, [q]);

  const filteredThemes = React.useMemo(() => {
    if (!q) return shadcnOfficialThemes;
    return shadcnOfficialThemes.filter(
      (theme) => theme.name.toLowerCase().includes(q) || theme.role.toLowerCase().includes(q)
    );
  }, [q]);

  const filteredSpectrum = React.useMemo(() => {
    if (!q) return tailwindSpectrumFamilies;
    return tailwindSpectrumFamilies
      .map((fam) => ({
        ...fam,
        colors: fam.colors.filter((c) => c.name.toLowerCase().includes(q) || fam.family.toLowerCase().includes(q)),
      }))
      .filter((fam) => fam.colors.length > 0);
  }, [q]);

  const totalColorItems = coreTokens.length + shadcnOfficialThemes.length + 22;
  const filteredCount = filteredCoreTokens.length + filteredThemes.length + filteredSpectrum.reduce((acc, f) => acc + f.colors.length, 0);

  return (
    <section id="colors" className="space-y-6 scroll-mt-28">
      <SectionHeader
        icon={Palette}
        title="Color Tokens & Architecture"
        description="High-fidelity OKLCH color science: 8 core semantic tokens, 8 official themes, and 242 Tailwind swatches."
        badgeText="OKLCH Native"
        searchQuery={colorSearch}
        onSearchChange={setColorSearch}
        totalCount={totalColorItems}
        filteredCount={filteredCount}
        placeholder="Filter colors, tokens, themes..."
      />

      <Tabs defaultValue="semantic" className="w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <TabsList className="grid grid-cols-3 max-w-md w-full h-auto p-1">
            <TabsTrigger value="semantic" className="text-xs md:text-sm font-medium px-1 sm:px-3 py-1.5">
              <span className="hidden xs:inline">Semantic </span>Tokens ({filteredCoreTokens.length})
            </TabsTrigger>
            <TabsTrigger value="themes" className="text-xs md:text-sm font-medium px-1 sm:px-3 py-1.5">
              8 Themes ({filteredThemes.length})
            </TabsTrigger>
            <TabsTrigger value="spectrum" className="text-xs md:text-sm font-medium px-1 sm:px-3 py-1.5">
              242 Swatches
            </TabsTrigger>
          </TabsList>
          <div className="text-xs text-muted-foreground hidden sm:block font-mono">
            Click token or swatch to copy
          </div>
        </div>

        {/* TAB 1: Core Semantic Variables in OKLCH */}
        <TabsContent value="semantic" className="space-y-4 mt-0">
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Core Semantic Tokens (Light / Dark Coordinates)
            </h4>
            <span className="text-xs text-muted-foreground font-mono">{filteredCoreTokens.length} Tokens</span>
          </div>

          {filteredCoreTokens.length === 0 ? (
            <div className="p-8 text-center border rounded-lg bg-muted/10 text-xs text-muted-foreground">
              No semantic tokens match "{colorSearch}".
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredCoreTokens.map((item) => (
                <div
                  key={item.token}
                  onClick={() => handleCopy(item.token)}
                  className="group relative cursor-pointer rounded-xl border p-3 sm:p-4 transition-all hover:shadow-md bg-card"
                >
                  <div className={`h-10 sm:h-12 w-full rounded-lg ${item.bgClass} flex items-center justify-center font-mono text-xs font-semibold shadow-inner mb-2.5`}>
                    {item.name}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-medium">{item.token}</span>
                    <Copy className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono block mt-0.5">{item.light}</span>
                  <span className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">{item.role}</span>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* TAB 2: Official shadcn/ui Themes */}
        <TabsContent value="themes" className="space-y-4 mt-0">
          {/* Custom Brand Theme Generator Card */}
          <div className="p-3.5 sm:p-4 rounded-xl border bg-muted/20 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h5 className="text-xs sm:text-sm font-semibold">Brand Theme Generator (Perceptual OKLCH)</h5>
                </div>
                <p className="text-xs text-muted-foreground">
                  Input any brand hex color to calculate live OKLCH coordinates with WCAG-compliant contrast.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1.5 border rounded-lg bg-background px-2.5 py-1">
                  <input
                    type="color"
                    value={brandHex.startsWith("#") ? brandHex : `#${brandHex}`}
                    onChange={(e) => setBrandHex(e.target.value)}
                    className="h-6 w-6 rounded border cursor-pointer bg-transparent"
                    title="Choose brand color"
                  />
                  <input
                    type="text"
                    value={brandHex}
                    onChange={(e) => setBrandHex(e.target.value)}
                    placeholder="#3b82f6"
                    className="w-20 text-xs font-mono bg-transparent outline-none uppercase"
                  />
                </div>
                <Button
                  size="sm"
                  className="h-8 text-xs font-medium cursor-pointer"
                  onClick={() => applyTheme(brandHex)}
                >
                  Activate Live
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Official Color Themes (8 Palettes)
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Click "Activate" to preview theme live, or "Install" for remote shadcn CLI & local exporter commands.
              </p>
            </div>
            <Badge variant="outline" className="font-mono text-xs">{filteredThemes.length} Palettes</Badge>
          </div>

          {filteredThemes.length === 0 ? (
            <div className="p-8 text-center border rounded-lg bg-muted/10 text-xs text-muted-foreground">
              No themes match "{colorSearch}".
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredThemes.map((theme) => {
                const themeKey = theme.name.toLowerCase();
                const isActive = activeTheme === themeKey;
                const themeItemName = themeKey === "zinc" ? "theme" : `theme-${themeKey}`;

                return (
                  <Card
                    key={theme.name}
                    className={`border transition-all ${isActive ? "ring-2 ring-primary border-primary shadow-xs" : "hover:border-primary/40"}`}
                  >
                    <CardHeader className="p-3 sm:p-4 pb-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">{theme.name}</span>
                          {isActive ? (
                            <Badge variant="default" className="text-[10px]">
                              Active Live
                            </Badge>
                          ) : (
                            <Badge variant="outline" className={`text-[10px] ${theme.badgeClass}`}>
                              {theme.name}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Button
                            variant={isActive ? "secondary" : "outline"}
                            size="sm"
                            className="h-7 text-xs px-2"
                            onClick={() => applyTheme(themeKey)}
                          >
                            {isActive ? "Applied" : "Activate"}
                          </Button>
                          <ComponentInstallButton name={themeItemName} title={`${theme.name} Theme`} />
                        </div>
                      </div>
                      <CardDescription className="text-xs">{theme.role}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-1 space-y-2.5">
                      <div className="overflow-x-auto pb-1">
                        <div className="grid grid-cols-11 min-w-[280px] rounded-md overflow-hidden border">
                          {theme.shades.map((shade) => (
                            <button
                              key={shade.step}
                              type="button"
                              onClick={() => handleCopy(shade.hex)}
                              className="group relative h-8 sm:h-9 w-full flex flex-col items-center justify-end pb-1 text-[9px] transition-transform hover:scale-105 hover:z-10 cursor-pointer"
                              style={{ backgroundColor: shade.hex }}
                              title={`${theme.name} ${shade.step}: ${shade.hex} (Click to copy)`}
                            >
                              <span className="opacity-0 group-hover:opacity-100 font-mono text-[8px] font-bold text-white drop-shadow">
                                {shade.step}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                        <span>L: {theme.oklchLight}</span>
                        <span>D: {theme.oklchDark}</span>
                        <span className="text-[10px]">500: {theme.shades[5]?.hex}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* TAB 3: Complete Tailwind Spectrum (22 Families, 242 Shades) */}
        <TabsContent value="spectrum" className="space-y-4 mt-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Complete Tailwind CSS Palette Spectrum (22 Colors, 242 Shades)
              </h4>
              <p className="text-xs text-muted-foreground">
                Click any swatch to copy its HEX code instantly. Responsive scrollable strips on mobile.
              </p>
            </div>
            <div className="hidden lg:flex gap-1 text-[9px] font-mono text-muted-foreground pr-2">
              {shadeSteps.map((s) => (
                <span key={s} className="w-8 text-center">{s}</span>
              ))}
            </div>
          </div>

          {filteredSpectrum.length === 0 ? (
            <div className="p-8 text-center border rounded-lg bg-muted/10 text-xs text-muted-foreground">
              No swatches match "{colorSearch}".
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSpectrum.map((fam) => (
                <Card key={fam.family} className="border">
                  <CardHeader className="py-2.5 px-3 sm:px-4 border-b bg-muted/30">
                    <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">
                      {fam.family}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 space-y-3">
                    {fam.colors.map((c) => (
                      <div key={c.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3">
                        <span className="text-xs font-medium sm:w-20 shrink-0">{c.name}</span>
                        <div className="overflow-x-auto pb-1 flex-1">
                          <div className="grid grid-cols-11 min-w-[280px] rounded-md overflow-hidden border">
                            {c.shades.map((hex, i) => (
                              <button
                                key={shadeSteps[i]}
                                type="button"
                                onClick={() => handleCopy(hex)}
                                className="group relative h-7 sm:h-8 w-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 hover:z-20"
                                style={{ backgroundColor: hex }}
                                title={`${c.name} ${shadeSteps[i]}: ${hex}`}
                              >
                                <span className="opacity-0 group-hover:opacity-100 font-mono text-[8px] font-bold text-white drop-shadow">
                                  {shadeSteps[i]}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
}
