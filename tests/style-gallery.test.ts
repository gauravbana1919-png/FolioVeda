import { describe, it, expect } from "vitest";
import { getThemeRecommendations } from "../src/lib/themes/recommendations";
import { filterThemes, getAllSystemThemes, getThemeById } from "../src/lib/themes/registry";

describe("Stage 3: Style Gallery & Recommendations Engine", () => {
  it("should return recommendations for tech profile with Developer Terminal as top pick", () => {
    const recs = getThemeRecommendations({
      profileType: "tech",
      targetGoal: "fulltime",
    });

    expect(recs.length).toBeGreaterThanOrEqual(3);
    const topPick = recs.find((r) => r.isTopPick);
    expect(topPick).toBeDefined();
    expect(topPick?.theme.id).toBe("developer-terminal");
    expect(topPick?.reason).toContain("CLI");
  });

  it("should return recommendations for designer profile with Minimal Editorial as top pick", () => {
    const recs = getThemeRecommendations({
      profileType: "designer",
      targetGoal: "internships",
    });

    expect(recs.length).toBeGreaterThanOrEqual(3);
    const topPick = recs.find((r) => r.isTopPick);
    expect(topPick).toBeDefined();
    expect(topPick?.theme.id).toBe("minimal-editorial");
    expect(topPick?.reason).toContain("case studies");
  });

  it("should filter themes by category without throwing", () => {
    const techOnly = filterThemes({ category: "tech" });
    expect(techOnly.every((t) => t.category === "tech")).toBe(true);

    const designOnly = filterThemes({ category: "design" });
    expect(designOnly.every((t) => t.category === "design")).toBe(true);
  });

  it("should filter themes by mood without throwing", () => {
    const boldOnly = filterThemes({ mood: "bold" });
    expect(boldOnly.every((t) => t.mood === "bold")).toBe(true);

    const calmOnly = filterThemes({ mood: "calm" });
    expect(calmOnly.every((t) => t.mood === "calm")).toBe(true);
  });

  it("should return recommendations for BBA profile with Corporate Clean as top pick", () => {
    const recs = getThemeRecommendations({
      profileType: "bba",
      targetGoal: "fulltime",
    });

    expect(recs.length).toBeGreaterThanOrEqual(3);
    const topPick = recs.find((r) => r.isTopPick);
    expect(topPick).toBeDefined();
    expect(topPick?.theme.id).toBe("corporate-clean");
  });

  it("should return complete system theme list for gallery view", () => {
    const themes = getAllSystemThemes();
    expect(themes.length).toBe(8);
    for (const theme of themes) {
      expect(theme.tokens.colors.bg).toBeDefined();
      expect(theme.tokens.colors.surface).toBeDefined();
      expect(theme.tokens.colors.accent).toBeDefined();
      expect(theme.tokens.typography.headingFont).toBeDefined();
      expect(theme.layout.sectionOrder.length).toBeGreaterThanOrEqual(4);
    }
  });
});
