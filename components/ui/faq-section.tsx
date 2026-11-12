"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, HelpCircle, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
  category?: string;
}

export interface FAQSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  items?: FAQItem[];
  categories?: string[];
  showSearch?: boolean;
  onContactClick?: () => void;
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "How do OKLCH color variables differ from traditional Hex/HSL?",
    answer: "OKLCH is a modern perceptual color space where lightness (L) reflects human eye sensitivity consistently across hues. This guarantees that contrast ratios, dark-mode variations, and state hovers maintain identical legibility whether using blue, emerald, amber, or rose.",
    category: "Tokens & Color",
  },
  {
    id: "faq-2",
    question: "Can I install isolated components without cloning the entire repository?",
    answer: "Yes! Every component is published to the self-hosted shadcn registry endpoint. You can run 'npx shadcn add http://localhost:3000/r/[component-name].json' or use our local AI export script to pull individual components into any external project.",
    category: "Installation",
  },
  {
    id: "faq-3",
    question: "Is this design system compatible with Next.js 16 and Tailwind CSS v4?",
    answer: "Yes. The entire system is built from the ground up for Next.js 16 (Turbopack) and Tailwind CSS v4 @theme inline variable integration, eliminating the legacy tailwind.config.js file entirely.",
    category: "Architecture",
  },
  {
    id: "faq-4",
    question: "How do I switch the active color palette in downstream projects?",
    answer: "Run 'npx shadcn add /r/theme-blue.json' (replacing blue with zinc, slate, rose, green, violet, etc.) or export the CSS variables directly from lib/themes.ts into your globals.css file.",
    category: "Tokens & Color",
  },
  {
    id: "faq-5",
    question: "Are all components compliant with WCAG AA accessibility standards?",
    answer: "All interactive components feature visible focus rings, keyboard traps for dialogs, ESC dismissals, semantic ARIA roles, and verified contrast ratios exceeding 4.5:1 across both light and dark themes.",
    category: "Accessibility",
  },
];

export function FAQSection({
  title = "Frequently Asked Questions",
  description = "Everything you need to know about the system design tokens, installation workflow, and production architecture.",
  items = DEFAULT_FAQS,
  categories = ["All", "Tokens & Color", "Installation", "Architecture", "Accessibility"],
  showSearch = true,
  onContactClick,
  className,
  ...props
}: FAQSectionProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof item.answer === "string" &&
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={cn("w-full max-w-4xl mx-auto space-y-6 sm:space-y-8", className)} {...props}>
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full border bg-muted/40 px-3 py-0.5 text-xs font-medium text-primary">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Help & Support</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="space-y-3">
        {showSearch && (
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search questions or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-xs h-9"
            />
          </div>
        )}

        {categories && categories.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer",
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "border bg-muted/20 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Accordion List */}
      <div className="rounded-xl border bg-card p-4 sm:p-6 shadow-2xs">
        {filteredItems.length === 0 ? (
          <div className="text-center py-8 space-y-1 text-muted-foreground text-xs">
            <p className="font-semibold text-foreground">No questions found</p>
            <p>Try searching with different keywords or clearing category filters.</p>
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full divide-y">
            {filteredItems.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="py-2 border-b-0">
                <AccordionTrigger className="text-xs sm:text-sm font-semibold text-foreground hover:text-primary text-left py-2">
                  <div className="flex items-center gap-2 pr-2">
                    <span>{item.question}</span>
                    {item.category && (
                      <Badge variant="outline" className="hidden sm:inline-flex text-[10px] font-mono font-normal">
                        {item.category}
                      </Badge>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed pt-1 pb-3">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>

      {/* Contact prompt footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl border bg-muted/20 gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <MessageSquare className="h-4 w-4 text-primary shrink-0" />
          <span>Still have questions about deploying to your projects?</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-xs h-8 shrink-0"
          onClick={onContactClick}
        >
          Contact Engineering Support
        </Button>
      </div>
    </div>
  );
}
