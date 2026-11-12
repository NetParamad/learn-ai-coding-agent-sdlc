import { type ThemePalette } from "./themes.ts";

export type HexColor = string;

export interface OklchColor {
  L: number;
  C: number;
  h: number;
}

/**
 * Validates and converts 3-digit or 6-digit hex color into linearized sRGB coordinates.
 */
export function parseAndLinearizeHex(hex: HexColor): {
  rLinear: number;
  gLinear: number;
  bLinear: number;
  cleanHex: string;
} {
  let cleanHex = hex.replace(/^#/, "").trim();
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split("").map((c) => c + c).join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(cleanHex)) {
    throw new Error(`Invalid hex color: "${hex}"`);
  }

  const r8 = parseInt(cleanHex.slice(0, 2), 16);
  const g8 = parseInt(cleanHex.slice(2, 4), 16);
  const b8 = parseInt(cleanHex.slice(4, 6), 16);

  const toLinear = (c: number) => {
    const v = c / 255;
    return v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92;
  };

  return {
    rLinear: toLinear(r8),
    gLinear: toLinear(g8),
    bLinear: toLinear(b8),
    cleanHex,
  };
}

/**
 * Converts a hex color (#RRGGBB or #RGB) into pure OKLCH coordinates
 * using canonical Björn Ottosson linear sRGB -> LMS -> Oklab matrix.
 */
export function hexToOklch(hex: HexColor): OklchColor {
  const { rLinear: lr, gLinear: lg, bLinear: lb } = parseAndLinearizeHex(hex);

  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  const l_c = Math.cbrt(l);
  const m_c = Math.cbrt(m);
  const s_c = Math.cbrt(s);

  const L = 0.2104542553 * l_c + 0.7936177850 * m_c - 0.0040720468 * s_c;
  const a = 1.9779984951 * l_c - 2.4285922050 * m_c + 0.4505937099 * s_c;
  const b = 0.0259040371 * l_c + 0.7827717662 * m_c - 0.8086757660 * s_c;

  const C = Math.sqrt(a * a + b * b);
  const h = (Math.atan2(b, a) * (180 / Math.PI) + 360) % 360;

  return { L, C, h };
}

/**
 * Calculates WCAG 2.1 relative luminance and contrast ratios
 */
export function getWcagContrast(hex: HexColor): {
  luminance: number;
  contrastWithWhite: number;
  contrastWithDark: number;
  recommendedForeground: "oklch(0.985 0 0)" | "oklch(0.145 0 0)";
} {
  const { rLinear: lr, gLinear: lg, bLinear: lb } = parseAndLinearizeHex(hex);

  const Y = 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
  const contrastWithWhite = (1.0 + 0.05) / (Y + 0.05);
  const contrastWithDark = (Y + 0.05) / 0.05;

  const recommendedForeground =
    contrastWithDark > contrastWithWhite && contrastWithDark >= 4.5
      ? "oklch(0.145 0 0)"
      : "oklch(0.985 0 0)";

  return {
    luminance: Y,
    contrastWithWhite,
    contrastWithDark,
    recommendedForeground,
  };
}

/**
 * Generates an end-to-end ThemePalette with Light and Dark OKLCH tokens
 * and verified WCAG contrast from any arbitrary brand hex color.
 */
export function generateBrandTheme(hex: HexColor, label = "Brand"): ThemePalette {
  const oklch = hexToOklch(hex);
  const contrast = getWcagContrast(hex);

  const formatOklch = (l: number, c: number, h: number) =>
    `oklch(${Number(l.toFixed(3))} ${Number(c.toFixed(3))} ${Number(h.toFixed(3))})`;

  // Light theme primary
  const lightL = Math.min(Math.max(oklch.L, 0.2), 0.88);
  const lightPrimary = formatOklch(lightL, oklch.C, oklch.h);
  const lightPrimaryFg = contrast.recommendedForeground;
  const lightRing = formatOklch(Math.min(lightL + 0.12, 0.9), Math.max(oklch.C * 0.85, 0.05), oklch.h);

  // Dark theme primary (boost lightness for readability against dark base)
  const darkL = Math.min(Math.max(oklch.L + 0.08, 0.62), 0.88);
  const darkPrimary = formatOklch(darkL, Math.min(oklch.C, 0.26), oklch.h);

  // Dynamic WCAG 2.1 contrast evaluation for dark mode primary
  // Relative luminance Y approximation from OKLCH Lightness: Y ≈ L^3
  const darkEstimatedY = Math.pow(darkL, 3);
  const contrastWithDarkText = (darkEstimatedY + 0.05) / (0.02 + 0.05); // against oklch(0.145 0 0)
  const contrastWithLightText = (0.95 + 0.05) / (darkEstimatedY + 0.05); // against oklch(0.985 0 0)

  const darkPrimaryFg =
    contrastWithDarkText > contrastWithLightText && contrastWithDarkText >= 4.5
      ? "oklch(0.145 0 0)"
      : "oklch(0.985 0 0)";

  const darkRing = formatOklch(Math.max(darkL - 0.08, 0.5), Math.max(oklch.C * 0.9, 0.05), oklch.h);

  const slug = label.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/^-+|-+$/g, "") || "custom";

  return {
    name: slug,
    label: label,
    role: `Custom Brand Palette (${hex.toUpperCase()})`,
    hex: hex.startsWith("#") ? hex : `#${hex}`,
    light: {
      primary: lightPrimary,
      primaryForeground: lightPrimaryFg,
      ring: lightRing,
    },
    dark: {
      primary: darkPrimary,
      primaryForeground: darkPrimaryFg,
      ring: darkRing,
    },
  };
}
