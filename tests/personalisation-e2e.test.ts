import { describe, it, expect } from "vitest";
import { getAllSystemThemes, getThemeById, mapUserToPortfolioContent } from "../src/lib/themes/registry";
import { generateIntakeCopy, verifyZeroHallucination } from "../src/lib/ai/intake-copy";
import { getThemeRecommendations } from "../src/lib/themes/recommendations";
import { extractAbstractStyleProfile } from "../src/lib/inspiration/analyzer";
import { generateThemeFromStyleProfile } from "../src/lib/inspiration/theme-generator";
import { enforceSimilarityGuard } from "../src/lib/inspiration/similarity-guard";
import { IntakeAnswersInput, IntakeAnswersInputSchema } from "../src/types/intake";
import { ThemePackageSchema } from "../src/types/theme";

/**
 * Calculates relative luminance for WCAG contrast ratio.
 */
function getLuminance(hex: string): number {
  const clean = hex.replace("#", "").padEnd(6, "0").slice(0, 6);
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;

  const a = [r, g, b].map((v) => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe("Stage 9: Comprehensive End-to-End Personalisation & Accessibility Test", () => {
  it("should complete the full Personalisation Lifecycle: Intake -> Recommend -> Switch -> Inspire", () => {
    // 1. INTAKE FLOW
    const intakeAnswers: IntakeAnswersInput = {
      profileType: "tech",
      targetGoal: "job",
      targetRoles: ["Cloud Systems Engineer", "Full-Stack Developer"],
      topStrengths: ["Distributed Systems", "TypeScript", "Kubernetes"],
      tone: "bold",
      preferredMood: "formal",
      links: {
        github: "https://github.com/engineer",
        linkedin: "https://linkedin.com/in/engineer",
      },
    };

    const validIntake = IntakeAnswersInputSchema.safeParse(intakeAnswers);
    expect(validIntake.success).toBe(true);

    const aiCopy = generateIntakeCopy(intakeAnswers, "Alex Engineer");
    expect(aiCopy.suggestedHeadline).toContain("Cloud Systems Engineer");
    expect(aiCopy.suggestedBio).toContain("Distributed Systems");

    // Zero-hallucination check
    const compliance = verifyZeroHallucination(aiCopy.suggestedBio, aiCopy.factualAnchors);
    expect(compliance.isCompliant).toBe(true);

    // 2. RECOMMENDATIONS
    const recs = getThemeRecommendations({
      profileType: intakeAnswers.profileType,
      targetGoal: intakeAnswers.targetGoal,
      skills: intakeAnswers.topStrengths,
    });
    expect(recs.length).toBe(8);
    expect(recs[0].isTopPick).toBe(true);
    expect(recs[0].theme.id).toBe("developer-terminal");

    // 3. ZERO-DATA LOSS CONTENT MAPPING
    const userDbRecord = {
      name: "Alex Engineer",
      profile: {
        bio: aiCopy.suggestedBio,
        skills: intakeAnswers.topStrengths.join(", "),
      },
      projects: [
        {
          title: "Mesh Router",
          description: "A fast distributed mesh router.",
          techStack: ["Go", "gRPC", "Docker"],
          liveUrl: "https://mesh.dev",
        },
      ],
    };

    const content = mapUserToPortfolioContent(userDbRecord);
    expect(content.name).toBe("Alex Engineer");
    expect(content.projects.length).toBe(1);
    expect(content.skills).toContain("Kubernetes");

    // 4. INSPIRATION LINK SYNTHESIS
    const sampleSiteHtml = `
      <body class="bg-black text-white font-serif">
        <h1>Selected Case Studies</h1>
      </body>
    `;
    const extractedProfile = extractAbstractStyleProfile(sampleSiteHtml, "https://sample.com");
    expect(extractedProfile.surfaceBrightness).toBe("dark");

    const inspiredTheme = generateThemeFromStyleProfile(extractedProfile, "medium");
    expect(ThemePackageSchema.safeParse(inspiredTheme).success).toBe(true);

    // 5. SIMILARITY GUARD
    const guardResult = enforceSimilarityGuard(extractedProfile, inspiredTheme);
    expect(guardResult.similarity.isSafe).toBe(true);
    expect(guardResult.similarity.overallScore).toBeLessThanOrEqual(0.78);
  });

  it("should verify WCAG contrast accessibility across all 8 theme packages", () => {
    const allThemes = getAllSystemThemes();
    expect(allThemes.length).toBe(8);

    for (const theme of allThemes) {
      const bg = theme.tokens.colors.bg;
      const text = theme.tokens.colors.text;
      const ratio = getContrastRatio(bg, text);

      // WCAG AA requires at least 4.5:1 for body text (or 3:1 for large text)
      // All FolioIn high-contrast themes must achieve >= 4.5:1
      expect(
        ratio,
        `Theme ${theme.id} failed WCAG contrast check. BG: ${bg}, Text: ${text}, Ratio: ${ratio.toFixed(2)}`
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("should verify all 8 themes define full semantic layout sections", () => {
    const allThemes = getAllSystemThemes();
    const requiredSections = ["hero", "projects", "contact"];

    for (const theme of allThemes) {
      for (const req of requiredSections) {
        expect(
          theme.layout.sectionOrder,
          `Theme ${theme.id} missing required section ${req}`
        ).toContain(req);
      }
    }
  });
});
