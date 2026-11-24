import { describe, expect, it } from "vitest";
import { markdownFromRecord, namesMatch, parsePastedResume } from "../src/lib/resume/from-text";

describe("resume generation from pasted details", () => {
  it("builds a resume from the pasted person instead of a sample profile", () => {
    const pasted = `Priya Nair
priya.nair@example.com
Bengaluru, India
Product designer at Northwind
Shipped the billing redesign used by 12,000 customers
B.Des, National Institute of Design, 2022`;

    const result = parsePastedResume(pasted);

    expect(result.name).toBe("Priya Nair");
    expect(result.markdown).toContain("# Priya Nair");
    expect(result.markdown).toContain("priya.nair@example.com");
    expect(result.markdown).toContain("Shipped the billing redesign");
    expect(result.markdown).not.toMatch(/Aarav|Arjun|Abhinav|Sharma/);
  });

  it("keeps a resume that is already written in the person's own words", () => {
    const pasted = `# Meera Iyer
meera@example.com

## EXPERIENCE
### Analyst — Orbit Labs | 2024 - Present
* Built the weekly revenue report`;

    const result = parsePastedResume(pasted);
    expect(result.name).toBe("Meera Iyer");
    expect(result.markdown).toContain("Orbit Labs");
    expect(result.markdown).toContain("Built the weekly revenue report");
  });

  it("renders a saved profile record under that person's name", () => {
    const markdown = markdownFromRecord({
      name: "Kabir Sen",
      email: "kabir.sen@example.com",
      profile: {
        headline: "Backend engineer",
        skills: "Go, PostgreSQL",
        experience: JSON.stringify([
          { role: "Engineer", company: "Harbor", period: "2023 - Present", highlights: ["Cut API latency"] },
        ]),
      },
    });

    expect(markdown.startsWith("# Kabir Sen")).toBe(true);
    expect(markdown).toContain("Harbor");
    expect(markdown).toContain("Go, PostgreSQL");
    expect(namesMatch("Kabir Sen", "kabir-sen")).toBe(true);
    expect(namesMatch("Kabir Sen", "Aarav Sharma")).toBe(false);
  });
});
