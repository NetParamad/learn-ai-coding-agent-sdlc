export interface ThemePalette {
  name: string;
  label: string;
  role: string;
  hex: string;
  light: {
    primary: string;
    primaryForeground: string;
    ring: string;
  };
  dark: {
    primary: string;
    primaryForeground: string;
    ring: string;
  };
}

export const OFFICIAL_THEMES: Record<string, ThemePalette> = {
  zinc: {
    name: "zinc",
    label: "Zinc",
    role: "System Base (Default Neutral)",
    hex: "#71717a",
    light: {
      primary: "oklch(0.205 0 0)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.708 0 0)",
    },
    dark: {
      primary: "oklch(0.985 0 0)",
      primaryForeground: "oklch(0.205 0 0)",
      ring: "oklch(0.439 0 0)",
    },
  },
  red: {
    name: "red",
    label: "Red",
    role: "Critical & High Alert",
    hex: "#ef4444",
    light: {
      primary: "oklch(0.577 0.245 27.325)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.704 0.191 22.216)",
    },
    dark: {
      primary: "oklch(0.637 0.237 25.331)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.577 0.245 27.325)",
    },
  },
  rose: {
    name: "rose",
    label: "Rose",
    role: "Modern Product & Vibrant Pink",
    hex: "#f43f5e",
    light: {
      primary: "oklch(0.588 0.231 14.885)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.712 0.194 13.428)",
    },
    dark: {
      primary: "oklch(0.645 0.246 16.439)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.588 0.231 14.885)",
    },
  },
  orange: {
    name: "orange",
    label: "Orange",
    role: "Energetic Accent & Conversion",
    hex: "#f97316",
    light: {
      primary: "oklch(0.646 0.222 41.116)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.75 0.183 55.934)",
    },
    dark: {
      primary: "oklch(0.705 0.213 47.604)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.646 0.222 41.116)",
    },
  },
  green: {
    name: "green",
    label: "Green",
    role: "Success / Verified & Positive State",
    hex: "#22c55e",
    light: {
      primary: "oklch(0.596 0.145 153.15)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.723 0.138 153.84)",
    },
    dark: {
      primary: "oklch(0.696 0.17 162.48)",
      primaryForeground: "oklch(0.145 0 0)",
      ring: "oklch(0.596 0.145 153.15)",
    },
  },
  blue: {
    name: "blue",
    label: "Blue",
    role: "Corporate Trust & Primary SaaS",
    hex: "#3b82f6",
    light: {
      primary: "oklch(0.546 0.245 262.881)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.623 0.214 259.815)",
    },
    dark: {
      primary: "oklch(0.623 0.214 259.815)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.546 0.245 262.881)",
    },
  },
  yellow: {
    name: "yellow",
    label: "Yellow",
    role: "Warning & High Visibility",
    hex: "#facc15",
    light: {
      primary: "oklch(0.865 0.195 92.5)",
      primaryForeground: "oklch(0.145 0 0)",
      ring: "oklch(0.865 0.195 92.5)",
    },
    dark: {
      primary: "oklch(0.88 0.19 93.0)",
      primaryForeground: "oklch(0.145 0 0)",
      ring: "oklch(0.88 0.19 93.0)",
    },
  },
  violet: {
    name: "violet",
    label: "Violet",
    role: "Creative Studio & Modern AI",
    hex: "#8b5cf6",
    light: {
      primary: "oklch(0.541 0.281 293.009)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.606 0.25 292.717)",
    },
    dark: {
      primary: "oklch(0.627 0.265 303.9)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.541 0.281 293.009)",
    },
  },
};

export { generateBrandTheme, hexToOklch, getWcagContrast } from "./color-science.ts";
import { generateBrandTheme } from "./color-science.ts";

export function resolveTheme(keyOrHex: string, label?: string): ThemePalette {
  const clean = keyOrHex.toLowerCase().trim();
  if (OFFICIAL_THEMES[clean]) {
    return OFFICIAL_THEMES[clean];
  }
  const hexMatch = clean.match(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
  if (hexMatch) {
    const fullHex = hexMatch[1].length === 3
      ? `#${hexMatch[1].split("").map((c) => c + c).join("")}`
      : `#${hexMatch[1]}`;
    return generateBrandTheme(fullHex, label || `Custom (${fullHex})`);
  }
  return OFFICIAL_THEMES.zinc;
}

export function generateThemeCss(themeName: string, palette: ThemePalette): string {
  return `@import "tailwindcss";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: ${palette.light.primary};
  --primary-foreground: ${palette.light.primaryForeground};
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: ${palette.light.ring};
  --radius: 0.625rem;
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: ${palette.dark.primary};
  --primary-foreground: ${palette.dark.primaryForeground};
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: ${palette.dark.ring};
}
`;
}
