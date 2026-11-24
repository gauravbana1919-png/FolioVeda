import { ThemePackage, ThemePackageSchema, ThemeTokens, ThemeLayout } from "@/types/theme";
import { StyleProfile, ClosenessLevel, AbstractFontCategory } from "@/types/inspiration";

/**
 * Maps abstract typography category to licensed/open-source Google Fonts families.
 * HARD RULE: Never references or loads proprietary font files.
 */
export function mapFontCategoryToOpenSource(category: AbstractFontCategory): {
  headingFont: string;
  bodyFont: string;
  monoFont: string;
} {
  const monoFont = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";

  switch (category) {
    case "editorial-serif":
      return {
        headingFont: "Georgia, 'Playfair Display', Cambria, 'Times New Roman', serif",
        bodyFont: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        monoFont,
      };
    case "classic-serif":
      return {
        headingFont: "Georgia, 'Times New Roman', Times, serif",
        bodyFont: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        monoFont,
      };
    case "monospace-code":
      return {
        headingFont: monoFont,
        bodyFont: monoFont,
        monoFont,
      };
    case "modern-grotesk":
      return {
        headingFont: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
        bodyFont: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        monoFont,
      };
    case "expressive-display":
      return {
        headingFont: "'Plus Jakarta Sans', Impact, system-ui, sans-serif",
        bodyFont: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        monoFont,
      };
    case "geometric-sans":
    default:
      return {
        headingFont: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        bodyFont: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        monoFont,
      };
  }
}

/**
 * Converts an abstract StyleProfile into an original, fully-functional ThemePackage.
 * Modulates design distance based on closeness slider ("loose" | "medium" | "close").
 */
export function generateThemeFromStyleProfile(
  profile: StyleProfile,
  closeness: ClosenessLevel = "medium",
  userId?: string | null
): ThemePackage {
  const fontPairing = mapFontCategoryToOpenSource(profile.fontCategory);

  // 1. Color Palette Harmonization
  let bg = profile.dominantColors[0] || (profile.surfaceBrightness === "dark" ? "#0A0F1D" : "#FAF8F5");
  let surface = profile.dominantColors[1] || (profile.surfaceBrightness === "dark" ? "#161B22" : "#F4F1EA");
  let text = profile.surfaceBrightness === "dark" ? "#F8FAFC" : "#0F172A";
  let textMuted = profile.surfaceBrightness === "dark" ? "#94A3B8" : "#64748B";
  let border = profile.surfaceBrightness === "dark" ? "#334155" : "#E2E8F0";
  let accent = profile.accentColor || "#10B981";

  // Closeness Level Modulation:
  // - "loose": Pulls colors back toward FolioIn balanced slate/neutral baselines.
  // - "medium": Adopts extracted harmony with comfortable spacing.
  // - "close": Keeps extracted mood, but guarantees original component execution.
  if (closeness === "loose") {
    if (profile.surfaceBrightness === "dark") {
      bg = "#0B0F19";
      surface = "#111827";
      border = "#1F2937";
    } else {
      bg = "#F8FAFC";
      surface = "#FFFFFF";
      border = "#E2E8F0";
    }
  }

  // 2. Spacing and Radii Tokens
  const density = closeness === "loose" ? "comfortable" : profile.density;
  let sectionPadding = "5rem 2rem";
  let cardGap = "2rem";

  if (density === "compact") {
    sectionPadding = "3.5rem 1.5rem";
    cardGap = "1.25rem";
  } else if (density === "spacious") {
    sectionPadding = "6rem 2.5rem";
    cardGap = "2.5rem";
  }

  let cardRadius = "0.5rem";
  let buttonRadius = "0.375rem";
  let badgeRadius = "0.25rem";

  if (profile.borderStyle === "rounded") {
    cardRadius = "1rem";
    buttonRadius = "9999px";
    badgeRadius = "9999px";
  } else if (profile.borderStyle === "heavy") {
    cardRadius = "0.25rem";
    buttonRadius = "0.25rem";
  }

  const tokens: ThemeTokens = {
    colors: {
      bg,
      surface,
      text,
      textMuted,
      border,
      accent,
      accentHover: accent,
    },
    typography: {
      headingFont: fontPairing.headingFont,
      bodyFont: fontPairing.bodyFont,
      monoFont: fontPairing.monoFont,
      headingWeight: closeness === "close" && profile.detectedMood === "bold" ? "900" : "700",
      bodyWeight: "400",
      scaleRatio: closeness === "close" ? 1.35 : 1.25,
    },
    spacing: {
      density,
      sectionPadding,
      cardGap,
    },
    motion: {
      level: profile.motionCadence,
    },
    radii: {
      card: cardRadius,
      button: buttonRadius,
      badge: badgeRadius,
    },
  };

  const layout: ThemeLayout = {
    pattern: profile.layoutPattern,
    sectionOrder: profile.sectionOrder,
    variants: {
      hero: profile.layoutPattern,
      projectCard: profile.layoutPattern,
      nav: profile.layoutPattern,
      footer: profile.layoutPattern,
    },
  };

  const themeId = `custom-inspired-${Date.now().toString(36)}`;
  const themeName = `Inspired (${profile.detectedMood.toUpperCase()} • ${closeness})`;

  const generatedTheme: ThemePackage = {
    id: themeId,
    userId: userId || null,
    name: themeName,
    category: profile.fontCategory === "monospace-code" ? "tech" : profile.fontCategory === "editorial-serif" ? "design" : "creative",
    mood: profile.detectedMood,
    tokens,
    layout,
    isSystem: false,
  };

  return ThemePackageSchema.parse(generatedTheme);
}
