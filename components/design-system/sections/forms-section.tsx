"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/date-picker";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { FilterBuilder, type FilterField, type FilterGroup } from "@/components/ui/filter-builder";
import { FileUpload } from "@/components/ui/file-upload";
import { PromptInput } from "@/components/ui/prompt-input";
import { QuantityInput } from "@/components/ui/quantity-input";
import { TagInput } from "@/components/ui/tag-input";
import { Rating } from "@/components/ui/rating";
import { ModelSelector } from "@/components/ui/model-selector";
import { PromptSuggestionChips } from "@/components/ui/prompt-suggestion-chips";
import { PasswordStrengthMeter } from "@/components/ui/password-strength-meter";
import { ComponentInstallButton } from "@/components/design-system/component-install-button";
import { SectionHeader } from "@/components/design-system/sections/section-header";
import { Layers, AlertCircle, Check } from "lucide-react";
import { toast } from "sonner";

const comboboxFrameworks = [
  { value: "next", label: "Next.js 16 (App Router)" },
  { value: "react", label: "React 19" },
  { value: "tailwind", label: "Tailwind CSS v4" },
  { value: "shadcn", label: "shadcn/ui (50+ Components)" },
  { value: "oklch", label: "OKLCH Native Colors" },
];

const sampleFilterFields: FilterField[] = [
  {
    id: "role",
    label: "Security Role",
    type: "select",
    options: [
      { label: "Administrator", value: "admin" },
      { label: "Site Reliability Engineer", value: "sre" },
      { label: "Read-Only Auditor", value: "auditor" },
    ],
  },
  {
    id: "environment",
    label: "Deployment Tier",
    type: "select",
    options: [
      { label: "Production", value: "production" },
      { label: "Staging", value: "staging" },
      { label: "Ephemeral Sandbox", value: "sandbox" },
    ],
  },
  { id: "organization", label: "Organization", type: "string" },
  { id: "seats", label: "Seat Count", type: "number" },
];

export interface FormsSectionProps {
  date?: Date;
  setDate: (date?: Date) => void;
}

export function FormsSection({ date, setDate }: FormsSectionProps) {
  const [search, setSearch] = React.useState("");
  const [selectedCombobox, setSelectedCombobox] = React.useState("next");
  const [sliderVal, setSliderVal] = React.useState([50]);
  const [demoQty, setDemoQty] = React.useState(2);
  const [demoTags, setDemoTags] = React.useState(["nextjs", "tailwind", "shadcn"]);
  const [demoRating, setDemoRating] = React.useState(4);
  const [selectedModel, setSelectedModel] = React.useState("gemini-1.5-pro");
  const [promptValue, setPromptValue] = React.useState("");
  const [demoPassword, setDemoPassword] = React.useState("P@ssw0rd2026!");

  const [filterGroup, setFilterGroup] = React.useState<FilterGroup>({
    conjunction: "AND",
    rules: [
      { id: "r-1", field: "role", operator: "equals", value: "admin" },
      { id: "r-2", field: "environment", operator: "equals", value: "production" },
    ],
  });

  const q = search.toLowerCase().trim();

  const cards = [
    { id: "card-text-inputs", name: "Text Inputs, Select & Combobox", tags: ["input", "textarea", "select", "combobox", "dropdown"] },
    { id: "card-selection", name: "Date Picker, OTP, Switch & Sliders", tags: ["date", "picker", "otp", "switch", "slider", "checkbox"] },
    { id: "card-validation", name: "Form Validation & Error Recovery", tags: ["form", "validation", "error", "alert"] },
    { id: "card-filter-builder", name: "Filter Builder", tags: ["filter", "query", "builder", "and", "or"] },
    { id: "card-file-upload", name: "File Upload & Dropzone", tags: ["file", "upload", "dropzone", "attachment"] },
    { id: "card-prompt-input", name: "Prompt Input & AI Controls", tags: ["prompt", "ai", "chat", "llm", "model-selector", "chips"] },
    { id: "card-password-strength-meter", name: "Password Strength Meter", tags: ["password", "strength", "security", "validator", "meter"] },
    { id: "card-quantity-input", name: "Quantity Input", tags: ["quantity", "number", "stepper", "counter"] },
    { id: "card-tag-input", name: "Tag Input", tags: ["tag", "pills", "multi-select", "keywords"] },
    { id: "card-rating", name: "Rating", tags: ["rating", "stars", "review", "score"] },
  ];

  const isVisible = (id: string) => {
    if (!q) return true;
    const card = cards.find((c) => c.id === id);
    if (!card) return true;
    return card.name.toLowerCase().includes(q) || card.tags.some((t) => t.includes(q));
  };

  const visibleCount = cards.filter((c) => isVisible(c.id)).length;

  return (
    <section id="forms" className="space-y-6 scroll-mt-28">
      <SectionHeader
        icon={Layers}
        title="Forms & Inputs"
        description="Input, Textarea, Checkbox, Radio Group, Switch, Slider, Select, Combobox, Date Picker, Input OTP, and Form."
        searchQuery={search}
        onSearchChange={setSearch}
        totalCount={cards.length}
        filteredCount={visibleCount}
        placeholder="Filter forms (date, rating, upload, otp...)"
      />

      {visibleCount === 0 ? (
        <div className="p-8 text-center border rounded-lg bg-muted/10 text-xs text-muted-foreground">
          No form components match "{search}".
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Text Inputs, Select & Combobox */}
          {isVisible("card-text-inputs") && (
            <Card id="card-text-inputs">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Text Inputs, Select & Combobox</CardTitle>
                  <CardDescription className="text-xs">
                    Single-line inputs, multi-line areas, and searchable dropdowns
                  </CardDescription>
                </div>
                <ComponentInstallButton name="input" title="Input" />
              </CardHeader>
              <CardContent className="space-y-3.5">
                <div className="space-y-1.5">
                  <Label htmlFor="inp-mail" className="text-xs">Input Field</Label>
                  <Input id="inp-mail" placeholder="designer@company.com" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="inp-text" className="text-xs">Textarea</Label>
                  <Textarea id="inp-text" placeholder="Write component usage notes..." rows={2} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Select Dropdown</Label>
                    <Select defaultValue="zinc">
                      <SelectTrigger>
                        <SelectValue placeholder="Base Color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zinc">Zinc</SelectItem>
                        <SelectItem value="slate">Slate</SelectItem>
                        <SelectItem value="stone">Stone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Combobox (Search)</Label>
                    <Combobox
                      options={comboboxFrameworks}
                      value={selectedCombobox}
                      onChange={setSelectedCombobox}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Date Picker, OTP, Switch & Sliders */}
          {isVisible("card-selection") && (
            <Card id="card-selection">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Date Picker, OTP, Switch & Sliders</CardTitle>
                  <CardDescription className="text-xs">
                    Date calendar anchors, verification codes, switches, and sliders
                  </CardDescription>
                </div>
                <ComponentInstallButton name="date-picker" title="Date Picker" />
              </CardHeader>
              <CardContent className="space-y-3.5">
                <div className="space-y-1.5">
                  <Label className="text-xs">Date Picker</Label>
                  <DatePicker date={date} setDate={setDate} />
                </div>
                <div className="flex items-center justify-between py-1">
                  <Label htmlFor="sw1" className="text-xs cursor-pointer">OKLCH Perceptual Colors</Label>
                  <Switch id="sw1" defaultChecked />
                </div>
                <div className="flex items-center gap-2 py-1">
                  <Checkbox id="cb1" defaultChecked />
                  <Label htmlFor="cb1" className="text-xs cursor-pointer">Support WCAG 2.1 AA accessibility</Label>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span>Border Radius Control</span>
                    <span className="font-mono">{sliderVal[0]}%</span>
                  </div>
                  <Slider value={sliderVal} onValueChange={setSliderVal} max={100} />
                </div>
                <div className="space-y-1.5 pt-1 border-t">
                  <Label className="text-xs">Input OTP (6 Digits)</Label>
                  <div className="overflow-x-auto pb-1">
                    <InputOTP maxLength={6}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Form Validation & Field Recovery */}
          {isVisible("card-validation") && (
            <Card id="card-validation" className="border-destructive/30 bg-card col-span-full">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">Form Validation & Error Recovery</CardTitle>
                    <Badge variant="outline" className="text-xs font-mono">Heuristic #9</Badge>
                  </div>
                  <CardDescription className="text-xs mt-1">
                    Inline validation feedback, destructive error states, helper text, and disabled inputs
                  </CardDescription>
                </div>
                <ComponentInstallButton name="form" title="Form" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5 p-3 rounded-lg border border-destructive/40 bg-destructive/5">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="val-err" className="text-xs font-medium text-destructive dark:text-red-400">Production API Key</Label>
                      <Badge variant="destructive" className="text-[10px]">Invalid</Badge>
                    </div>
                    <Input
                      id="val-err"
                      defaultValue="sk-test-invalid-key"
                      aria-invalid="true"
                      aria-describedby="val-err-msg"
                      className="border-destructive dark:border-red-500/80 focus-visible:ring-destructive text-destructive dark:text-red-300 font-mono text-xs"
                    />
                    <p id="val-err-msg" className="text-xs text-destructive dark:text-red-400 flex items-center gap-1 font-medium">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      Key checksum failed. Expected prefix "sk-live-".
                    </p>
                  </div>

                  <div className="space-y-1.5 p-3 rounded-lg border border-green-500/20 bg-green-500/5">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="val-ok" className="text-xs font-medium text-green-950 dark:text-green-300">Cluster Hostname</Label>
                      <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">Verified</Badge>
                    </div>
                    <Input
                      id="val-ok"
                      defaultValue="us-east-1.db.internal"
                      className="border-green-500/40 focus-visible:ring-green-500 font-mono text-xs"
                    />
                    <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 font-medium">
                      <Check className="h-3.5 w-3.5 shrink-0" />
                      DNS resolved to 10.0.4.12 (2ms)
                    </p>
                  </div>

                  <div className="space-y-1.5 p-3 rounded-lg border bg-muted/30">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="val-dis" className="text-xs font-medium text-muted-foreground">Provisioning Region</Label>
                      <Badge variant="secondary" className="text-[10px]">Locked</Badge>
                    </div>
                    <Input
                      id="val-dis"
                      disabled
                      value="ap-southeast-1 (Locked by policy)"
                      className="text-xs cursor-not-allowed bg-muted/50"
                    />
                    <p className="text-xs text-muted-foreground">
                      Region locked to organizational tenant boundary.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filter Builder */}
          {isVisible("card-filter-builder") && (
            <Card id="card-filter-builder" className="scroll-mt-28 col-span-full">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">Advanced Filter Builder</CardTitle>
                    <Badge variant="secondary" className="text-[10px] font-mono">Query Builder</Badge>
                  </div>
                  <CardDescription className="text-xs mt-1">
                    Multi-condition query builder with AND/OR conjunction toggling and field operators
                  </CardDescription>
                </div>
                <ComponentInstallButton name="filter-builder" title="Filter Builder" />
              </CardHeader>
              <CardContent>
                <FilterBuilder
                  fields={sampleFilterFields}
                  value={filterGroup}
                  onChange={setFilterGroup}
                  onApply={(g) => toast.success(`Applied ${g.rules.length} filter rules`)}
                />
              </CardContent>
            </Card>
          )}

          {/* File Upload & Dropzone */}
          {isVisible("card-file-upload") && (
            <Card id="card-file-upload" className="scroll-mt-28 col-span-full">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">File Upload & Dropzone</CardTitle>
                    <Badge variant="secondary" className="text-[10px] font-mono">Dropzone</Badge>
                  </div>
                  <CardDescription className="text-xs mt-1">
                    Drag-and-drop document upload with size validation, progress bars, and file queue
                  </CardDescription>
                </div>
                <ComponentInstallButton name="file-upload" title="File Upload" />
              </CardHeader>
              <CardContent>
                <FileUpload
                  maxSizeMb={5}
                  maxFiles={3}
                  accept="image/*,application/pdf"
                  onFilesChange={(files) => toast.info(`Selected ${files.length} file(s)`)}
                />
              </CardContent>
            </Card>
          )}

          {/* Prompt Input & AI Controls */}
          {isVisible("card-prompt-input") && (
            <Card id="card-prompt-input" className="col-span-full">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Prompt Input & AI Controls</CardTitle>
                  <CardDescription className="text-xs">
                    Conversational AI prompt bar with model selector, starter prompt chips, attachments, and keyboard dispatch
                  </CardDescription>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <ComponentInstallButton name="model-selector" title="Model Selector" />
                  <ComponentInstallButton name="prompt-suggestion-chips" title="Prompt Chips" />
                  <ComponentInstallButton name="prompt-input" title="Prompt Input" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg border bg-muted/20">
                  <div className="space-y-0.5">
                    <p className="text-xs font-medium">Model Selector</p>
                    <p className="text-[11px] text-muted-foreground">Select AI provider and reasoning tier</p>
                  </div>
                  <ModelSelector
                    models={[
                      { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", provider: "Google", badge: "2M Context", speed: "deep" },
                      { id: "claude-3-7-sonnet", name: "Claude 3.7 Sonnet", provider: "Anthropic", badge: "Hybrid Reasoning", speed: "fast" },
                      { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", badge: "Multimodal", speed: "standard" },
                    ]}
                    selectedModelId={selectedModel}
                    onSelectModel={(m) => {
                      setSelectedModel(m.id);
                      toast.info(`Switched to ${m.name}`);
                    }}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Starter Prompt Chips</Label>
                  <PromptSuggestionChips
                    suggestions={[
                      { title: "OKLCH Token Audit", prompt: "Audit all 242 OKLCH color shades for WCAG AAA compliance across dark mode", category: "Color" },
                      { title: "Export Component CLI", prompt: "How do I export components with transitive dependencies using ai-export.js?", category: "CLI" },
                      { title: "Next.js 16 App Router", prompt: "Review layout streaming and server actions in Next.js 16 App Router", category: "Framework" },
                    ]}
                    onSelect={(p) => {
                      setPromptValue(p);
                      toast.success("Loaded prompt starter");
                    }}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Prompt Input Bar</Label>
                  <PromptInput
                    value={promptValue}
                    onValueChange={setPromptValue}
                    modelName={selectedModel}
                    placeholder="Ask a technical question, refactor code, or generate tests..."
                    onAttachClick={() => toast.info("Attachment modal triggered")}
                    onSubmit={(text) => {
                      toast.success(`Prompt submitted: "${text.slice(0, 30)}..."`);
                      setPromptValue("");
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Password Strength Meter */}
          {isVisible("card-password-strength-meter") && (
            <Card id="card-password-strength-meter" className="col-span-full">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Password Strength Meter</CardTitle>
                  <CardDescription className="text-xs">
                    Interactive real-time password security scoring with 4-level progress bar and criteria checklist
                  </CardDescription>
                </div>
                <ComponentInstallButton name="password-strength-meter" title="Password Strength Meter" />
              </CardHeader>
              <CardContent className="space-y-4 max-w-md">
                <div className="space-y-1.5">
                  <Label htmlFor="demo-pass">Test Password Input</Label>
                  <Input
                    id="demo-pass"
                    type="text"
                    placeholder="Type to evaluate password..."
                    value={demoPassword}
                    onChange={(e) => setDemoPassword(e.target.value)}
                  />
                </div>
                <PasswordStrengthMeter password={demoPassword} showRequirements={true} />
              </CardContent>
            </Card>
          )}

          {/* Quantity Input */}
          {isVisible("card-quantity-input") && (
            <Card id="card-quantity-input" className="col-span-full">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Quantity Input</CardTitle>
                  <CardDescription className="text-xs">
                    Numeric stepper input with min/max bounds, increment/decrement controls, direct text editing, and size variants
                  </CardDescription>
                </div>
                <ComponentInstallButton name="quantity-input" title="Quantity Input" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Default Stepper (min: 1, max: 10)</Label>
                    <QuantityInput
                      value={demoQty}
                      min={1}
                      max={10}
                      onChange={setDemoQty}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Small Size (sm)</Label>
                    <QuantityInput
                      defaultValue={1}
                      min={1}
                      max={99}
                      size="sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Disabled State</Label>
                    <QuantityInput
                      defaultValue={0}
                      disabled
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tag Input */}
          {isVisible("card-tag-input") && (
            <Card id="card-tag-input" className="col-span-full">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Tag Input</CardTitle>
                  <CardDescription className="text-xs">
                    Multi-item pill tag input with keyboard Enter/comma separation, backspace deletion, and duplicate prevention
                  </CardDescription>
                </div>
                <ComponentInstallButton name="tag-input" title="Tag Input" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="max-w-md space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Tags (press Enter or comma to add)</Label>
                  <TagInput
                    tags={demoTags}
                    onTagsChange={setDemoTags}
                    placeholder="Add tags..."
                    maxTags={8}
                  />
                  <p className="text-xs text-muted-foreground">
                    Current tags ({demoTags.length}/8): {demoTags.join(", ")}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Rating */}
          {isVisible("card-rating") && (
            <Card id="card-rating" className="col-span-full">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Rating</CardTitle>
                  <CardDescription className="text-xs">
                    Interactive 5-star rating picker with hover feedback, keyboard navigation, custom icon sizing, and read-only mode
                  </CardDescription>
                </div>
                <ComponentInstallButton name="rating" title="Rating" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-8">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Interactive ({demoRating}/5)</Label>
                    <div className="flex items-center gap-2">
                      <Rating
                        value={demoRating}
                        onChange={setDemoRating}
                        size="default"
                      />
                      <span className="text-xs font-semibold">{demoRating}.0</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Large Size (lg)</Label>
                    <Rating defaultValue={5} size="lg" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Read Only (4 Stars)</Label>
                    <div className="flex items-center gap-1.5">
                      <Rating defaultValue={4} readOnly size="sm" />
                      <span className="text-xs text-muted-foreground font-mono">4.0</span>
                    </div>
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
