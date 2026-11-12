import fs from "fs";
import path from "path";
import { OFFICIAL_THEMES, type ThemePalette, generateThemeCss, resolveTheme } from "./themes.ts";

export type CanonicalCluster =
  | "Foundations"
  | "Core Primitives"
  | "Forms & Inputs"
  | "Data Display"
  | "Navigation"
  | "Overlays & Feedback";

export interface RegistryItemFile {
  path: string;
  content: string;
  type: "registry:ui" | "registry:theme";
  target?: string;
}

export interface RegistryItem {
  $schema: string;
  name: string;
  type: "registry:ui" | "registry:theme";
  title?: string;
  description?: string;
  version?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  meta?: {
    cluster?: string;
    importPath?: string;
    usageSnippet?: string;
  };
  files: RegistryItemFile[];
}

export interface ThemeRegistryItem extends RegistryItem {
  type: "registry:theme";
  cssVars: {
    light: Record<string, string>;
    dark: Record<string, string>;
    theme?: Record<string, string>;
  };
}

export const OKLCH_THEME_TOKENS = {
  light: {
    background: "oklch(1 0 0)",
    foreground: "oklch(0.145 0 0)",
    card: "oklch(1 0 0)",
    "card-foreground": "oklch(0.145 0 0)",
    popover: "oklch(1 0 0)",
    "popover-foreground": "oklch(0.145 0 0)",
    primary: "oklch(0.205 0 0)",
    "primary-foreground": "oklch(0.985 0 0)",
    secondary: "oklch(0.97 0 0)",
    "secondary-foreground": "oklch(0.205 0 0)",
    muted: "oklch(0.97 0 0)",
    "muted-foreground": "oklch(0.556 0 0)",
    accent: "oklch(0.97 0 0)",
    "accent-foreground": "oklch(0.205 0 0)",
    destructive: "oklch(0.577 0.245 27.325)",
    "destructive-foreground": "oklch(0.985 0 0)",
    border: "oklch(0.922 0 0)",
    input: "oklch(0.922 0 0)",
    ring: "oklch(0.708 0 0)",
    radius: "0.625rem",
  },
  dark: {
    background: "oklch(0.145 0 0)",
    foreground: "oklch(0.985 0 0)",
    card: "oklch(0.145 0 0)",
    "card-foreground": "oklch(0.985 0 0)",
    popover: "oklch(0.145 0 0)",
    "popover-foreground": "oklch(0.985 0 0)",
    primary: "oklch(0.985 0 0)",
    "primary-foreground": "oklch(0.205 0 0)",
    secondary: "oklch(0.269 0 0)",
    "secondary-foreground": "oklch(0.985 0 0)",
    muted: "oklch(0.269 0 0)",
    "muted-foreground": "oklch(0.708 0 0)",
    accent: "oklch(0.269 0 0)",
    "accent-foreground": "oklch(0.985 0 0)",
    destructive: "oklch(0.577 0.245 27.325)",
    "destructive-foreground": "oklch(0.985 0 0)",
    border: "oklch(0.269 0 0)",
    input: "oklch(0.269 0 0)",
    ring: "oklch(0.439 0 0)",
  },
  theme: {
    "--color-background": "var(--background)",
    "--color-foreground": "var(--foreground)",
    "--color-card": "var(--card)",
    "--color-card-foreground": "var(--card-foreground)",
    "--color-popover": "var(--popover)",
    "--color-popover-foreground": "var(--popover-foreground)",
    "--color-primary": "var(--primary)",
    "--color-primary-foreground": "var(--primary-foreground)",
    "--color-secondary": "var(--secondary)",
    "--color-secondary-foreground": "var(--secondary-foreground)",
    "--color-muted": "var(--muted)",
    "--color-muted-foreground": "var(--muted-foreground)",
    "--color-accent": "var(--accent)",
    "--color-accent-foreground": "var(--accent-foreground)",
    "--color-destructive": "var(--destructive)",
    "--color-destructive-foreground": "var(--destructive-foreground)",
    "--color-border": "var(--border)",
    "--color-input": "var(--input)",
    "--color-ring": "var(--ring)",
    "--radius-sm": "calc(var(--radius) - 4px)",
    "--radius-md": "calc(var(--radius) - 2px)",
    "--radius-lg": "var(--radius)",
  },
};

export function getRawRegistry(): {
  meta: Record<string, unknown>;
  components: Record<
    string,
    {
      name: string;
      file: string;
      cluster: CanonicalCluster;
      internalDependencies: string[];
      npmDependencies: Record<string, string>;
    }
  >;
} {
  const registryJsonPath = path.join(process.cwd(), "COMPONENT-REGISTRY.json");
  const raw = fs.readFileSync(registryJsonPath, "utf8");
  return JSON.parse(raw);
}

export function capitalize(str: string): string {
  if (!str) return "";
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export { OFFICIAL_THEMES, type ThemePalette, generateThemeCss };

export function getThemeRegistryItem(themeName: string = "zinc"): ThemeRegistryItem {
  const cleanTheme = (themeName || "zinc")
    .toLowerCase()
    .replace(/^theme-/, "")
    .replace(/\.json$/, "")
    .trim();

  const palette = resolveTheme(cleanTheme);

  const lightVars = {
    ...OKLCH_THEME_TOKENS.light,
    primary: palette.light.primary,
    "primary-foreground": palette.light.primaryForeground,
    ring: palette.light.ring,
  };

  const darkVars = {
    ...OKLCH_THEME_TOKENS.dark,
    primary: palette.dark.primary,
    "primary-foreground": palette.dark.primaryForeground,
    ring: palette.dark.ring,
  };

  const isDefault = cleanTheme === "zinc";
  const fileName = isDefault
    ? "styles/system-design-theme.css"
    : `styles/system-design-theme-${cleanTheme}.css`;
  const cssContent = generateThemeCss(cleanTheme, palette);

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: isDefault ? "theme" : `theme-${cleanTheme}`,
    type: "registry:theme",
    title: `starter-system-design ${palette.label} Theme (OKLCH)`,
    description: `Tailwind CSS v4 OKLCH tokens and base styles for starter-system-design (${palette.label} palette)`,
    version: "1.0.0",
    cssVars: {
      light: lightVars,
      dark: darkVars,
      theme: OKLCH_THEME_TOKENS.theme,
    },
    files: [
      {
        path: fileName,
        content: cssContent,
        type: "registry:theme",
        target: fileName,
      },
    ],
  };
}

export function getThemesCatalog() {
  const themes = Object.values(OFFICIAL_THEMES).map((t) => ({
    name: t.name,
    label: t.label,
    role: t.role,
    hex: t.hex,
    url: t.name === "zinc" ? "/r/theme.json" : `/r/theme-${t.name}.json`,
    cssFile: t.name === "zinc" ? "styles/system-design-theme.css" : `styles/system-design-theme-${t.name}.css`,
    oklchLightPrimary: t.light.primary,
    oklchDarkPrimary: t.dark.primary,
  }));

  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "starter-system-design-themes",
    description: `${themes.length} Official shadcn/ui Themes rendered in pure OKLCH color science`,
    totalThemes: themes.length,
    defaultTheme: "zinc",
    themes,
  };
}

export function getCatalogIndex() {
  const registry = getRawRegistry();

  const items = Object.entries(registry.components).map(([name, data]) => ({
    name,
    type: "registry:ui" as const,
    title: capitalize(name),
    cluster: data.cluster,
    version: "1.0.0",
    dependencies: Object.entries(data.npmDependencies || {}).map(([pkg, ver]) => `${pkg}@${ver}`),
    registryDependencies: data.internalDependencies || [],
    files: [
      {
        path: `ui/${name}.tsx`,
        type: "registry:ui" as const,
        target: `components/ui/${name}.tsx`,
      },
    ],
  }));

  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "starter-system-design",
    description: `Complete ${items.length}-component shadcn/ui library with Tailwind CSS v4 and OKLCH color system`,
    totalComponents: items.length,
    items,
  };
}

export function getComponentRegistryItem(name: string): RegistryItem | null {
  const cleanName = name.replace(/\.json$/, "").trim().toLowerCase();
  const registry = getRawRegistry();
  const compData = registry.components[cleanName];

  if (!compData) {
    return null;
  }

  const filePath = path.join(process.cwd(), "components/ui", `${cleanName}.tsx`);
  const fileContent = fs.readFileSync(filePath, "utf8");

  const npmDeps = compData.npmDependencies || {};
  const deps = Object.entries(npmDeps).map(([pkg, ver]) => `${pkg}@${ver}`);

  const importName = capitalize(cleanName).replace(/\s+/g, "");

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: cleanName,
    type: "registry:ui",
    title: capitalize(cleanName),
    description: `${capitalize(cleanName)} component from starter-system-design`,
    version: "1.0.0",
    dependencies: deps,
    registryDependencies: compData.internalDependencies || [],
    meta: {
      cluster: compData.cluster || "Core Primitives",
      importPath: `@/components/ui/${cleanName}`,
      usageSnippet: `import { ${importName} } from "@/components/ui/${cleanName}";`,
    },
    files: [
      {
        path: `ui/${cleanName}.tsx`,
        content: fileContent,
        type: "registry:ui",
        target: `components/ui/${cleanName}.tsx`,
      },
    ],
  };
}
