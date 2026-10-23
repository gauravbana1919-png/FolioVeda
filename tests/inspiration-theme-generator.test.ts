import { describe, it, expect } from "vitest";
import { ThemePackageSchema } from "../src/types/theme";
import { StyleProfile } from "../src/types/inspiration";
import {
  generateThemeFromStyleProfile,
  mapFontCategoryToOpenSource,
} from "../src/lib/inspiration/theme-generator";

describe("Stage 7: Inspiration Theme Generator & Closeness Modulation", () => {
  const sampleProfile: StyleProfile = {
    detectedMood: "bold",
    layoutPattern: "poster",
    fontCategory: "modern-grotesk",
    dominantColors: ["#09090B", "#18181B", "#FAFAFA", "#27272A"],
    accentColor: "#10B981",
    surfaceBrightness: "dark",
    density: "comfortable",
    motionCadence: "expressive",
    sectionOrder: ["hero", "projects", "skills", "experience", "contact"],
    borderStyle: "heavy",
  };

  it("should generate a valid ThemePackage for loose, medium, and close levels", () => {
    for (const closeness of ["loose", "medium", "close"] as const) {
      const theme = generateThemeFromStyleProfile(sampleProfile, closeness);
      const validation = ThemePackageSchema.safeParse(theme);
      expect(validation.success, `Failed validation for ${closeness}: ${validation.error}`).toBe(true);

      expect(theme.tokens.colors.accent).toBe("#10B981");
      expect(theme.layout.pattern).toBe("poster");
      expect(theme.isSystem).toBe(false);
    }
  });

  it("should modulate design distance according to closeness slider", () => {
    const loose = generateThemeFromStyleProfile(sampleProfile, "loose");
    const close = generateThemeFromStyleProfile(sampleProfile, "close");

    // Loose level pulls to balanced neutral background
    expect(loose.tokens.colors.bg).toBe("#0B0F19");
    // Close level respects extracted dominant darkness
    expect(close.tokens.colors.bg).toBe("#09090B");

    // Close level uses punchier heading scale
    expect(close.tokens.typography.headingWeight).toBe("900");
  });

  it("should map abstract font categories strictly to open-source / licensed Google Fonts", () => {
    const editorial = mapFontCategoryToOpenSource("editorial-serif");
    expect(editorial.headingFont).toContain("Georgia");

    const mono = mapFontCategoryToOpenSource("monospace-code");
    expect(mono.headingFont).toContain("monospace");

    const grotesk = mapFontCategoryToOpenSource("modern-grotesk");
    expect(grotesk.headingFont).toContain("Plus Jakarta Sans");
  });
});
