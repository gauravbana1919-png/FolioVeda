import { describe, it, expect } from "vitest";
import { IntakeAnswersInputSchema, IntakeAnswersSchema } from "../src/types/intake";
import {
  generateIntakeCopy,
  computeSectionOrder,
  verifyZeroHallucination,
} from "../src/lib/ai/intake-copy";

describe("Stage 4: Smart Profile Intake & Zero-Hallucination Copy Engine", () => {
  const sampleTechInput = {
    profileType: "tech" as const,
    targetGoal: "job" as const,
    targetRoles: ["Systems Architect", "Backend Engineer"],
    topStrengths: ["Rust", "Distributed Systems", "Kubernetes"],
    tone: "bold" as const,
    preferredMood: "formal" as const,
    links: {
      github: "https://github.com/alex",
      linkedin: "https://linkedin.com/in/alex",
    },
  };

  it("should validate valid intake answers input schema", () => {
    const parse = IntakeAnswersInputSchema.safeParse(sampleTechInput);
    expect(parse.success).toBe(true);
  });

  it("should reject intake input with empty target roles", () => {
    const invalid = {
      ...sampleTechInput,
      targetRoles: [],
    };
    const parse = IntakeAnswersInputSchema.safeParse(invalid);
    expect(parse.success).toBe(false);
  });

  it("should compute correct section ordering by profile type", () => {
    const techOrder = computeSectionOrder("tech");
    expect(techOrder[0]).toBe("hero");
    expect(techOrder[1]).toBe("projects"); // Projects first for engineers

    const bbaOrder = computeSectionOrder("bba");
    expect(bbaOrder[0]).toBe("hero");
    expect(bbaOrder[1]).toBe("experience"); // Experience first for business/consulting
  });

  it("should generate factual headline and bio anchored strictly to user strengths and roles", () => {
    const copy = generateIntakeCopy(sampleTechInput, "Alex Engineer");

    // Headline must contain stated role or strength
    expect(copy.suggestedHeadline).toContain("Systems Architect");

    // Bio must contain stated strengths
    expect(copy.suggestedBio).toContain("Rust");
    expect(copy.suggestedBio).toContain("Distributed Systems");

    // Must recommend developer-terminal as top match for tech
    expect(copy.recommendedThemeIds[0]).toBe("developer-terminal");
  });

  it("should generate tone-appropriate copy for formal, bold, and friendly tones", () => {
    const formalCopy = generateIntakeCopy({
      ...sampleTechInput,
      tone: "formal",
    });
    expect(formalCopy.suggestedBio).toContain("Experienced");

    const boldCopy = generateIntakeCopy({
      ...sampleTechInput,
      tone: "bold",
    });
    expect(boldCopy.suggestedBio).toContain("Let’s build something extraordinary");

    const friendlyCopy = generateIntakeCopy({
      ...sampleTechInput,
      tone: "friendly",
    }, "Alex");
    expect(friendlyCopy.suggestedBio).toContain("Hi, I’m Alex");
  });

  it("should enforce zero hallucination and flag unverified hype buzzwords", () => {
    const safeBio = "I specialize in Rust, Next.js, and Distributed Systems with verified project delivery.";
    const cleanCheck = verifyZeroHallucination(safeBio, ["Rust", "Next.js", "Distributed Systems"]);
    expect(cleanCheck.isCompliant).toBe(true);
    expect(cleanCheck.flaggedHallucinations.length).toBe(0);

    const hallucinatedBio = "I am a 10x engineer with fortune 500 leadership experience.";
    const flagCheck = verifyZeroHallucination(hallucinatedBio, ["Rust"]);
    expect(flagCheck.isCompliant).toBe(false);
    expect(flagCheck.flaggedHallucinations).toContain("10x engineer");
    expect(flagCheck.flaggedHallucinations).toContain("fortune 500");
  });
});
