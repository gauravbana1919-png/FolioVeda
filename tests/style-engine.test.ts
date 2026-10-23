import { describe, it, expect } from "vitest";
import { ThemePackageSchema } from "../src/types/theme";
import { PortfolioContentSchema } from "../src/types/content";
import {
  SYSTEM_THEMES,
  getAllSystemThemes,
  getThemeById,
  filterThemes,
  mapUserToPortfolioContent,
} from "../src/lib/themes/registry";

describe("Stage 2: Core Style Engine & System Themes", () => {
  it("should have exactly 3 initial distinct system themes registered", () => {
    const themes = getAllSystemThemes();
    expect(themes.length).toBe(3);
    const ids = themes.map((t) => t.id);
    expect(ids).toContain("developer-terminal");
    expect(ids).toContain("minimal-editorial");
    expect(ids).toContain("bold-poster");
  });

  it("should strictly validate all 3 system themes against ThemePackageSchema", () => {
    for (const [id, theme] of Object.entries(SYSTEM_THEMES)) {
      const parsed = ThemePackageSchema.safeParse(theme);
      expect(parsed.success, `Theme ${id} failed validation: ${parsed.error}`).toBe(true);
      if (parsed.success) {
        expect(parsed.data.id).toBe(id);
        expect(parsed.data.isSystem).toBe(true);
        expect(parsed.data.tokens.colors.bg).toBeDefined();
        expect(parsed.data.tokens.colors.text).toBeDefined();
        expect(parsed.data.tokens.typography.headingFont).toBeDefined();
        expect(parsed.data.layout.sectionOrder.length).toBeGreaterThanOrEqual(4);
      }
    }
  });

  it("should map legacy template IDs to corresponding distinct system themes", () => {
    expect(getThemeById("template1").id).toBe("developer-terminal");
    expect(getThemeById("template2").id).toBe("minimal-editorial");
    expect(getThemeById("template3").id).toBe("bold-poster");
  });

  it("should gracefully fallback to developer-terminal for unknown theme IDs", () => {
    const fallback = getThemeById("non-existent-theme-xyz");
    expect(fallback.id).toBe("developer-terminal");
  });

  it("should filter themes accurately by category and mood", () => {
    const techThemes = filterThemes({ category: "tech" });
    expect(techThemes.length).toBe(1);
    expect(techThemes[0].id).toBe("developer-terminal");

    const designThemes = filterThemes({ category: "design" });
    expect(designThemes.length).toBe(1);
    expect(designThemes[0].id).toBe("minimal-editorial");

    const boldThemes = filterThemes({ mood: "bold" });
    expect(boldThemes.length).toBe(1);
    expect(boldThemes[0].id).toBe("bold-poster");
  });

  it("should map arbitrary user data into standardized PortfolioContent without data loss", () => {
    const rawUser = {
      name: "Priyanshu Sharma",
      email: "priyanshu@example.com",
      profile: {
        bio: "Distributed systems and Rust enthusiast.",
        skills: "Rust, Go, Kubernetes, Kafka, Next.js",
        github: "https://github.com/priyanshu",
        linkedin: "https://linkedin.com/in/priyanshu",
      },
      projects: [
        {
          title: "Raft Consensus Engine",
          description: "Distributed consensus implementation in pure Rust.",
          techStack: ["Rust", "Tokio", "gRPC"],
          liveUrl: "https://raft.example.com",
          githubUrl: "https://github.com/priyanshu/raft",
          metrics: "Passed 100 Jepsen partition tests",
        },
      ],
      experience: [
        {
          role: "Cloud Architect",
          company: "HyperScale",
          period: "2024 - Present",
          highlights: ["Maintained 99.999% SLA"],
        },
      ],
    };

    const content = mapUserToPortfolioContent(rawUser);
    const validation = PortfolioContentSchema.safeParse(content);
    expect(validation.success).toBe(true);

    expect(content.name).toBe("Priyanshu Sharma");
    expect(content.skills).toEqual(["Rust", "Go", "Kubernetes", "Kafka", "Next.js"]);
    expect(content.projects.length).toBe(1);
    expect(content.projects[0].title).toBe("Raft Consensus Engine");
    expect(content.projects[0].metrics).toBe("Passed 100 Jepsen partition tests");
    expect(content.experience?.length).toBe(1);
    expect(content.contact.github).toBe("https://github.com/priyanshu");
  });

  it("should provide rich default demo content when user record is null", () => {
    const demoContent = mapUserToPortfolioContent(null, "Alex Demo");
    expect(demoContent.name).toBe("Alex Demo");
    expect(demoContent.projects.length).toBeGreaterThanOrEqual(2);
    expect(demoContent.skills.length).toBeGreaterThanOrEqual(5);
    const valid = PortfolioContentSchema.safeParse(demoContent);
    expect(valid.success).toBe(true);
  });
});
