---
version: alpha
name: Farmart-Storefront-Design-System
description: A fresh, vibrant, community-focused online grocery catalog built on a clean white canvas energized by Farmart Amber (#fbbf24) and grounding Stone-900 typography. Soft rounded containers ({rounded.xl}), high-contrast discount cues, tactile product cards with smooth hover elevation, and responsive category rails deliver an approachable, dependable grocery shopping experience.

colors:
  primary: "#fbbf24"
  primary-hover: "#f59e0b"
  primary-foreground: "#1c1917"
  primary-light: "#fef3c7"
  canvas: "#ffffff"
  canvas-dark: "#1c1917"
  surface-card: "#ffffff"
  surface-muted: "#f5f5f4"
  surface-accent: "#fffbeb"
  ink: "#1c1917"
  ink-secondary: "#44403c"
  ink-muted: "#78716c"
  hairline: "#e5e5e5"
  hairline-strong: "#d6d3d1"
  border-accent: "#fbbf24"
  destructive: "#ef4444"
  destructive-foreground: "#ffffff"
  success: "#22c55e"
  success-foreground: "#ffffff"
  star-rating: "#f59e0b"
  badge-deal: "#fbbf24"
  badge-deal-foreground: "#1c1917"
  scrim: "rgba(0, 0, 0, 0.45)"

typography:
  display-hero:
    fontFamily: "var(--font-geist-sans), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "48px"
    fontWeight: 900
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  display-lg:
    fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
    fontSize: "32px"
    fontWeight: 900
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  display-md:
    fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
    fontSize: "24px"
    fontWeight: 900
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title-lg:
    fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  title-sm:
    fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  body-md:
    fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0em"
  body-sm:
    fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "0em"
  caption:
    fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.01em"
  badge:
    fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
    fontSize: "11px"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.04em"
    textTransform: "uppercase"
  price-hero:
    fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
    fontSize: "22px"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.02em"
  price-regular:
    fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
    fontSize: "16px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.01em"
  button-md:
    fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "0em"
  button-sm:
    fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0em"

rounded:
  none: "0px"
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "12px"
  2xl: "16px"
  full: "9999px"

spacing:
  xxs: "2px"
  xs: "4px"
  sm: "8px"
  md: "12px"
  base: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
  section: "64px"

components:
  global-header:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    height: "64px"
  search-bar-frame:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.md}"
    border: "2px solid {colors.primary}"
    height: "40px"
  search-submit-btn:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.button-md}"
    rounded: "{rounded.none}"
    height: "40px"
    padding: "0 20px"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    height: "36px"
    padding: "8px 16px"
  button-secondary-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    height: "44px"
    padding: "10px 24px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.button-sm}"
    rounded: "{rounded.md}"
  product-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.xl}"
    padding: "16px"
    border: "1px solid {colors.hairline}"
  category-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    rounded: "{rounded.xl}"
    padding: "12px"
  deal-badge:
    backgroundColor: "{colors.badge-deal}"
    textColor: "{colors.badge-deal-foreground}"
    typography: "{typography.badge}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  countdown-pill:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.ink}"
    typography: "{typography.badge}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
---

# Design System: Farmart Storefront

## Overview

**Creative North Star: "The Fresh Neighborhood Market"**

Farmart Storefront combines the approachable warmth of a vibrant local farmer's market with the speed and scannability of a modern grocery eCommerce platform. Every screen is anchored by clean surface whitespace (`{colors.canvas}`) paired with high-voltage energetic accents in **Farmart Amber** (`{colors.primary}` — `#fbbf24`), giving users instant clarity on daily promotional deals, catalog navigation, and cart additions.

Typography stays clean, legible, and functional using **Geist Sans** (`--font-geist-sans`). High headline weights (800–900 font-weight) establish authoritative section anchors, while compact text (13–14px) and prominent price tags ensure grocery shoppers can rapidly scan prices, stock indicators, and package weights without cognitive overload.

Elevation and geometry emphasize friendliness and tactility: cards and interactive blocks rely on comfortable rounded corners (`{rounded.xl}` — 12px) and subtle lift on hover (`hover:shadow-md`). Aggressive shadows, decorative 3D effects, and harsh square corners are deliberately avoided in favor of friendly curves, crisp hairline dividers, and warm organic gradients.

**Key Characteristics:**
- **Amber Voltage:** Primary yellow-amber (`{colors.primary}` — `#fbbf24`) is the dominant interactive signal for search submit, cart conversion, active category filters, and promotional banners.
- **High-Density Catalog Architecture:** Clean grid layouts optimized for fast visual item identification, price comparison, and quick-add actions.
- **Tactile Product Surfaces:** Soft 12px border radii (`{rounded.xl}`) with 1px hairline borders (`{colors.hairline}`) and smooth micro-lifts (`translate-y-[-2px] hover:shadow-md`).
- **Clear Value-Signaling:** High-contrast discount tags, star ratings (`{colors.star-rating}` — `#f59e0b`), and live countdown timers to drive urgent engagement on "Top Saver" items.
- **Accessible Tone & Contrast:** Dark Stone-900 (`{colors.ink}`) ensures AAA text readability against light canvas and yellow-amber button fills.

---

## Colors

Farmart's color palette balances energetic food-retail warmth with neutral stone surfaces that let grocery product photography stand out.

### Brand & Accent
- **Farmart Amber** (`{colors.primary}` — `#fbbf24` / `oklch(0.78 0.165 75)`): The primary brand identifier. Applied to search submission buttons, primary CTA triggers, active tab indicators, and "Top Saver" badges.
- **Amber Hover / Deep** (`{colors.primary-hover}` — `#f59e0b`): Richer amber used on active states, hover transitions, and star review glyphs.
- **Amber Tint** (`{colors.primary-light}` — `#fef3c7` / `oklch(0.95 0.04 80)`): Soft background wash used for category icons, active selection badges, and hero promo accents.
- **Brand Dark Accent** (`{colors.ink}` — `#1c1917` / `oklch(0.145 0 0)`): Heavy grounding dark used on hero primary buttons, brand logo glyphs, and primary high-contrast buttons.

### Surface & Canvas
- **Pure White Canvas** (`{colors.canvas}` — `#ffffff` / `oklch(1 0 0)`): The foundational background for all pages, product cards, dropdown sheets, and header containers.
- **Card Surface** (`{colors.surface-card}` — `#ffffff`): Distinct product tiles and category containers resting on the main body.
- **Muted Surface** (`{colors.surface-muted}` — `#f5f5f4` / `oklch(0.97 0 0)`): Neutral background for icon enclosures, footer value props, countdown boxes, and table rows.
- **Warm Glow Gradient**: `from-amber-50 via-orange-50/60 to-yellow-100/40` used specifically for promotional hero banners to evoke fresh daylight and morning fruit markets.

### Text & Hairlines
- **Primary Ink** (`{colors.ink}` — `#1c1917`): Headings, product titles, currency symbols, and primary navigation text.
- **Secondary Ink** (`{colors.ink-secondary}` — `#44403c`): Subheadings, banner description paragraphs, and value proposition details.
- **Muted Label** (`{colors.ink-muted}` — `#78716c` / `oklch(0.556 0 0)`): Stock counts, unit weights, inactive tabs, breadcrumbs, and strikethrough original prices.
- **Hairline Divider** (`{colors.hairline}` — `#e5e5e5` / `oklch(0.922 0 0)`): 1px structural borders separating table cells, card edges, and header segments.

### Semantic
- **Destructive / Urgency** (`{colors.destructive}` — `#ef4444` / `oklch(0.577 0.245 27.325)`): Discount badges ("20% SALE OFF"), countdown urgency notices, and out-of-stock indicators.
- **Success / In-Stock** (`{colors.success}` — `#22c55e` / `oklch(0.596 0.145 153.15)`): Order confirmations, verified brand badges, and positive inventory states.
- **Star Rating** (`{colors.star-rating}` — `#f59e0b`): 5-star customer review rating marks.

### Named Rules
**The Amber Intent Rule.** Amber (`#fbbf24`) is reserved exclusively for interactive triggers, primary focus boundaries, active categories, and promotional deal badges. It is never used as raw body text.

**The Legibility-First Contrast Rule.** On amber surfaces (`#fbbf24`), text must always use Stone-900 (`#1c1917`) with bold or extrabold weight (≥700). White text on amber is strictly forbidden due to insufficient contrast.

---

## Typography

### Font Family
- **Primary UI / Headings**: `var(--font-geist-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **Monospace / Numerics**: `var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace` (used for countdown timers, stock counters, and SKU references)

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `display-hero` | 48px (3rem) | 900 (Black) | 1.15 | -0.025em | Main hero banner headline |
| `display-lg` | 32px (2rem) | 900 (Black) | 1.2 | -0.02em | Section titles ("Top Saver Today", "Best Seller") |
| `display-md` | 24px (1.5rem) | 900 (Black) | 1.25 | -0.02em | Hero side banners, major modal titles |
| `title-lg` | 18px (1.125rem) | 700 (Bold) | 1.3 | -0.01em | Cart drawer item headers, brand promo headings |
| `title-sm` | 15px (0.9375rem) | 600 (Semibold) | 1.35 | -0.01em | Product card titles (line-clamp-1 or line-clamp-2) |
| `price-hero` | 22px (1.375rem) | 900 (Black) | 1.0 | -0.02em | Hero deal price display with dollar sign |
| `price-regular` | 16px (1rem) | 800 (Extrabold) | 1.0 | -0.01em | Standard product card price |
| `body-md` | 14px (0.875rem) | 400 (Regular) | 1.5 | 0em | Promotional copy, descriptions, footer links |
| `body-sm` | 13px (0.8125rem) | 400 (Regular) | 1.45 | 0em | Secondary metadata, search suggestions |
| `button-md` | 14px (0.875rem) | 700 (Bold) | 1.25 | 0em | Primary CTA buttons, search submit, modal actions |
| `button-sm` | 12px (0.75rem) | 700 (Bold) | 1.2 | 0em | Category filter chips, pagination buttons |
| `badge` | 11px (0.6875rem) | 800 (Extrabold) | 1.2 | 0.04em | "Fresh Deals", "SALE", category badges (uppercase) |
| `caption` | 12px (0.75rem) | 500 (Medium) | 1.4 | 0.01em | Category labels, reviews count, timestamps |

### Named Rules
**The Price Prominence Rule.** Product prices must always be set in extrabold (≥800) and paired with a strikethrough original price in `{colors.ink-muted}` whenever a discount applies. The discounted price always precedes the original price.

---

## Layout

### Spacing System
- **Base Rhythm:** 8px base grid (`xs: 4px`, `sm: 8px`, `md: 12px`, `base: 16px`, `lg: 24px`, `xl: 32px`, `xxl: 48px`).
- **Container Standard:** Centered fluid container with `max-w-7xl` (1280px) and `px-4 sm:px-6` horizontal gutter.
- **Section Gap:** `space-y-4 sm:space-y-6` between homepage content sections; interior section padding `py-6 sm:py-8`.
- **Card Padding:** `p-3 sm:p-4` inside product cards, ensuring high information density while preserving 12px internal rhythm.

### Grid & Responsive Columns

| Surface | Mobile (<640px) | Tablet (640–1024px) | Desktop (≥1024px) |
|---|---|---|---|
| Product Grids | 2 columns (`gap-3`) | 3–4 columns (`gap-4`) | 5–6 columns (`gap-4`) |
| Category Browser | 2 columns (`gap-3`) | 4 columns (`gap-4`) | 8 columns (`gap-4`) |
| Top Saver Hero | 1 column stacked | 2 columns split | 1 hero column (8 cols) + 3 standard (4 cols) |
| Hero Banners | 1 column stacked | 1 column stacked | 12-column grid (Main 8 cols / Side 4 cols) |
| Footer Value Props | 1 column (`gap-6`) | 2 columns (`gap-6`) | 4 columns (`gap-6`) |

### Whitespace Philosophy
Farmart utilizes deliberate macro-whitespace between major catalog bands (Hero → Categories → Top Saver → Best Sellers → Footer) to chunk catalog discoveries. Micro-whitespace inside product cards is intentionally snug to maximize the number of visible grocery items above the fold.

---

## Elevation & Depth

Farmart opts for a modern, tactile, low-elevation hierarchy. Surfaces are flat at rest and lift selectively on interaction.

| Level | Treatment | Use |
|---|---|---|
| **Canvas** | `box-shadow: none; border: none;` | Page body background, banner backgrounds |
| **Flat Bordered** | `border: 1px solid {colors.hairline}; box-shadow: none;` | Rest state for product cards, category tiles |
| **Subtle Lift (Rest)** | `box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);` | Header sticky frame, button primary, hero cards |
| **Interactive Lift (Hover)** | `box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);` | Product card hover, category tile hover |
| **Floating Overlay** | `box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); backdrop-blur-md;` | Dropdown menus, cart drawer, modal dialogs |

### Named Rules
**The Flat-At-Rest Rule.** All catalog cards (products, categories, brands) rest flat with a 1px hairline border. Shadows appear strictly on user hover or active state to indicate clickability without visual clutter.

---

## Shapes

### Border Radius Scale
- **`rounded-none` (0px):** Search input and search button join seam (flush edge).
- **`rounded-xs` (4px):** Rating indicators, small stock badges.
- **`rounded-sm` (6px):** Deal badges, countdown timer cells.
- **`rounded-md` (8px):** Search bar overall container, standard buttons, input fields.
- **`rounded-lg` (10px):** Category filter tabs, medium modals (`--radius`).
- **`rounded-xl` (12px):** Product cards, category icon enclosures, brand logo tile.
- **`rounded-2xl` (16px):** Hero promotional banners, footer value proposition icon containers.
- **`rounded-full` (9999px):** Carousel pagination arrows, cart count pill, quantity stepper buttons.

### Form Language
- Friendly geometry with rounded corners throughout (`{rounded.xl}` on all card surfaces).
- Sharp 90-degree corners are eliminated except at joined multi-part elements (such as the combined category dropdown + text input + search button).

---

## Components

### 1. Global Header & Navigation
- **Height & Stickiness:** Sticky top-0, `z-40`, background `{colors.canvas}`, height `64px` with bottom border `{colors.hairline}`.
- **Brand Logo:** Amber badge (`w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center font-black text-stone-900`) with Store icon, paired with "Farmart" headline (`text-2xl font-black tracking-tight`) and "Grocery" uppercase tracking caption.
- **Integrated Search Bar:** Outer wrapper with `border-2 border-amber-400 rounded-lg overflow-hidden`.
  - **Category Select:** Compact button (`bg-muted/40 text-xs font-semibold px-3.5 py-2`) opening `DropdownMenu`.
  - **Input:** Transparent background, `border-0 shadow-none focus-visible:ring-0 text-sm px-3`.
  - **Submit Button:** Flush `bg-amber-400 text-stone-900 font-bold h-10 px-5 hover:bg-amber-500 rounded-none`.
- **Action Icons:** Wishlist, User Profile, and Cart Drawer trigger with live badge pill.

### 2. Product Card (`ProductCard`)
- **Container:** `rounded-xl border border-border bg-card overflow-hidden transition-all duration-200 hover:shadow-md group`.
- **Media:** 4:3 AspectRatio with `object-cover transition-transform duration-300 group-hover:scale-105`.
- **Badge:** Positioned at `top-2.5 left-2.5`, `Badge` in `{colors.primary}` or `{colors.destructive}` with `{typography.badge}`.
- **Category:** `text-xs font-medium uppercase tracking-wider text-muted-foreground`.
- **Title:** `line-clamp-1 font-semibold text-foreground tracking-tight group-hover:text-amber-500 transition-colors`.
- **Rating:** Amber star icon (`text-amber-500 fill-current`) with numeric score and review count in parentheses.
- **Price Block:** Prominent bold current price + strikethrough original price if on sale.
- **Add to Cart:** Quick-add button or quantity stepper on hover / focus.

### 3. Top Saver Today Section
- **Header:** Title "Top Saver Today" paired with live countdown clock cells: `[HH] : [MM] : [SS]`.
- **Hero Deal Card:** Large feature product including inventory progress bar:
  - Label: "Sold: XX / Total: YY"
  - Indicator: `Progress` bar with amber fill.
  - Quantity Input: Increment/decrement buttons with current count.
  - Action CTA: Full-width amber button "Add to Cart".

### 4. Category Browser
- **Tile:** `rounded-xl border border-border/60 p-3 flex flex-col items-center text-center bg-card hover:border-amber-400 hover:shadow-md transition-all`.
- **Icon Container:** `w-16 h-16 rounded-xl bg-muted/60 group-hover:bg-amber-50 flex items-center justify-center mb-3`.
- **Category Name:** `text-xs font-bold text-foreground leading-snug group-hover:text-amber-600 line-clamp-2`.

### 5. Hero Banners
- **Main Banner:** `rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50/60 to-yellow-100/40 p-8 sm:p-12 border border-amber-200/50`.
  - Fresh Deals badge in solid amber.
  - H1 Display heading with high-contrast text.
  - Dark Stone-900 button (`bg-stone-900 text-white hover:bg-stone-800 rounded-lg h-11 px-6 font-bold`).
- **Side Banner:** Accent promo tile with countdown or percentage discount banner.

### 6. Filter Tabs Rail
- **Style:** Horizontal pill button row with smooth horizontal scrolling (`no-scrollbar`).
- **Active State:** `bg-amber-400 text-stone-900 font-bold shadow-sm rounded-lg px-3 py-1.5 text-xs`.
- **Inactive State:** `text-muted-foreground hover:text-foreground hover:bg-muted font-bold rounded-lg px-3 py-1.5 text-xs`.

### 7. Footer
- **Value Propositions Strip:** 4-column feature banner with icons for Free Shipping, 1 & 1 Returns, 100% Secure Payment, and 24/7 Dedicated Support.
- **Links & Newsletter:** Clean multi-column grid with email input and amber send button.

---

## Responsive Behavior

### Breakpoints

| Name | Breakpoint | Target Surface | Key Layout Adaptations |
|---|---|---|---|
| **xs** | 380px | Compact mobile | 2-column product grid with compact 12px padding; hero banner h1 scales to 24px |
| **sm** | 640px | Large phone | Category browser expands to 4 columns; header customer service block hides |
| **md** | 768px | Tablet | Search bar unhides in header; product grid expands to 3–4 columns |
| **lg** | 1024px | Small desktop | 12-column hero banner layout active; Top Saver displays hero + 3 standard items |
| **xl** | 1280px | Standard desktop | Full 6-column product tabs grid; category browser expands to 8 columns |

### Touch Targets & Mobile Adaptations
- Minimum touch target for all buttons and interactive tabs is `40px × 40px` on mobile screens.
- Category filters switch to swipeable horizontal overflow (`overflow-x-auto no-scrollbar`).
- Cart items and mobile navigation slide out via `vaul` / `Sheet` drawer with clean touch gestures.

---

## Do's and Don'ts

### Do
- **Do** use `{colors.primary}` (`#fbbf24`) for primary purchase and search conversion actions.
- **Do** always pair amber buttons with `{colors.primary-foreground}` (`#1c1917`) for high-contrast accessibility.
- **Do** enforce `{rounded.xl}` (12px) on product cards and category containers to keep the friendly market feel.
- **Do** use `aspect-ratio: 4/3` or `1/1` on product photos to prevent layout shift during lazy loading.
- **Do** place discounted pricing prominently in bold before strikethrough original prices.
- **Do** provide smooth `transition-all duration-200 hover:shadow-md` on clickable catalog tiles.

### Don't
- **Don't** use white text on Farmart Amber buttons; it fails WCAG AA contrast requirements.
- **Don't** introduce harsh sharp rectangles (`rounded-none`) on standalone cards or modal dialogs.
- **Don't** use amber for standard body copy, labels, or secondary links where dark stone text is expected.
- **Don't** apply heavy dark drop-shadows or saturated neon color glows.
- **Don't** mix inconsistent icon libraries; stick strictly to `lucide-react` with 1.5–2px stroke weight.
- **Don't** invent random secondary accent colors that compete with Farmart Amber and Stone-900.
