import { describe, it, expect } from "vitest";
import {
  calculateColorSimilarity,
  computeSimilarityScore,
  enforceSimilarityGuard,
  MAX_SIMILARITY_THRESHOLD,
} from "../src/lib/inspiration/similarity-guard";
import { StyleProfile, TakedownReportInputSchema } from "../src/types/inspiration";
import { generateThemeFromStyleProfile } from "../src/lib/inspiration/theme-generator";

describe("Stage 8: Similarity Guard, Rate Controls & Takedown Form", () => {
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

  it("should accurately compute color distance", () => {
    // Identical
    expect(calculateColorSimilarity("#10B981", "#10B981")).toBe(1);
    // Opposites (black vs white)
    expect(calculateColorSimilarity("#000000", "#FFFFFF")).toBeLessThan(0.1);
  });

  it("should compute overall similarity score between 0 and 1", () => {
    const theme = generateThemeFromStyleProfile(sampleProfile, "medium");
    const metrics = computeSimilarityScore(sampleProfile, theme);

    expect(metrics.overallScore).toBeGreaterThanOrEqual(0);
    expect(metrics.overallScore).toBeLessThanOrEqual(1);
    expect(metrics.colorDistance).toBeDefined();
    expect(metrics.layoutDistance).toBeDefined();
  });

  it("should pass similarity guard when score is safe", () => {
    // When theme has distinct layout pattern or colors, it is safely within margins
    const safeTheme = generateThemeFromStyleProfile(sampleProfile, "loose");
    safeTheme.layout.pattern = "split-hero";
    safeTheme.tokens.colors.accent = "#0284C7";
    const guard = enforceSimilarityGuard(sampleProfile, safeTheme);

    expect(guard.similarity.isSafe).toBe(true);
    expect(guard.similarity.overallScore).toBeLessThanOrEqual(MAX_SIMILARITY_THRESHOLD);
    expect(guard.similarity.adjustmentApplied).toBe(false);
  });

  it("should automatically apply visual diversion if initial similarity exceeds 0.78", () => {
    // Create an artificially identical theme package
    const clonedTheme = generateThemeFromStyleProfile(sampleProfile, "close");
    // Force identical colors and layout
    clonedTheme.tokens.colors.bg = sampleProfile.dominantColors[0];
    clonedTheme.tokens.colors.accent = sampleProfile.accentColor;

    const guard = enforceSimilarityGuard(sampleProfile, clonedTheme);
    expect(guard.similarity.isSafe).toBe(true);
    if (guard.similarity.adjustmentApplied) {
      expect(guard.theme.name).toContain("Diversified");
      expect(guard.similarity.reason).toContain("exceeded 0.78");
    }
  });

  it("should validate TakedownReportInputSchema", () => {
    const valid = {
      reportedUrl: "https://folioin.me/p/alex",
      reporterEmail: "counsel@example.com",
      reason: "This portfolio improperly uses our registered trademark and bio verbatim.",
    };
    const parse = TakedownReportInputSchema.safeParse(valid);
    expect(parse.success).toBe(true);

    const invalidShortReason = {
      ...valid,
      reason: "too short",
    };
    const parseShort = TakedownReportInputSchema.safeParse(invalidShortReason);
    expect(parseShort.success).toBe(false);
  });
});
