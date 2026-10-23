import { ThemePackage, ThemePackageSchema } from "@/types/theme";
import { PortfolioContent } from "@/types/content";
import { developerTerminalTheme } from "./definitions/developer-terminal";
import { minimalEditorialTheme } from "./definitions/minimal-editorial";
import { boldPosterTheme } from "./definitions/bold-poster";

export const SYSTEM_THEMES: Record<string, ThemePackage> = {
  "developer-terminal": developerTerminalTheme,
  "minimal-editorial": minimalEditorialTheme,
  "bold-poster": boldPosterTheme,
};

// Validate that all system themes satisfy ThemePackageSchema at module load
for (const [key, theme] of Object.entries(SYSTEM_THEMES)) {
  const result = ThemePackageSchema.safeParse(theme);
  if (!result.success) {
    console.error(`Invalid system theme [${key}]:`, result.error);
    throw new Error(`System theme [${key}] failed schema validation.`);
  }
}

export function getAllSystemThemes(): ThemePackage[] {
  return Object.values(SYSTEM_THEMES);
}

export function getThemeById(id: string): ThemePackage {
  // Check exact system theme ID
  if (SYSTEM_THEMES[id]) {
    return SYSTEM_THEMES[id];
  }

  // Legacy fallback mapping
  if (id === "template1") return SYSTEM_THEMES["developer-terminal"];
  if (id === "template2") return SYSTEM_THEMES["minimal-editorial"];
  if (id === "template3") return SYSTEM_THEMES["bold-poster"];

  // Default fallback
  return SYSTEM_THEMES["developer-terminal"];
}

export function filterThemes(filters?: {
  category?: string;
  mood?: string;
}): ThemePackage[] {
  let themes = getAllSystemThemes();

  if (filters?.category && filters.category !== "all") {
    themes = themes.filter((t) => t.category === filters.category);
  }

  if (filters?.mood && filters.mood !== "all") {
    themes = themes.filter((t) => t.mood === filters.mood);
  }

  return themes;
}

/**
 * Maps raw database user and profile records into the standardized PortfolioContent schema.
 * Guaranteed to never lose content across style switches.
 */
export function mapUserToPortfolioContent(userRecord: any, fallbackName = "Alex Developer"): PortfolioContent {
  if (!userRecord) {
    return {
      name: fallbackName,
      headline: "Full-Stack Engineer & Systems Builder",
      bio: "I turn complex engineering challenges into elegant, highly performant software. Specializing in Next.js, distributed backends, and responsive design systems.",
      avatarUrl: null,
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Docker", "Prisma"],
      projects: [
        {
          title: "Distributed Edge Cache",
          description: "A low-latency distributed caching layer built with Rust and Redis, serving 100k+ req/sec with sub-5ms p99.",
          techStack: ["Rust", "Redis", "Tokio", "Docker"],
          liveUrl: "https://github.com",
          githubUrl: "https://github.com",
          featured: true,
          metrics: "100k req/sec • Sub-5ms p99 latency",
        },
        {
          title: "AI Synthesis Canvas",
          description: "Interactive real-time collaboration canvas with LLM-powered diagram generation and markdown previewing.",
          techStack: ["Next.js", "TypeScript", "Tailwind", "WebSockets"],
          liveUrl: "https://github.com",
          githubUrl: "https://github.com",
          featured: true,
          metrics: "12,000 active monthly users",
        },
        {
          title: "PortfolioForge / FolioVeda",
          description: "Zero-hallucination live portfolio engine with dynamic architectural themes and inspiration cloning.",
          techStack: ["Next.js", "Prisma", "SQLite", "Framer Motion"],
          liveUrl: "https://folioveda.me",
          githubUrl: "https://github.com",
          featured: false,
          metrics: "Sub-50ms TTFB worldwide",
        },
      ],
      experience: [
        {
          role: "Senior Full-Stack Engineer",
          company: "Nexus Cloud Systems",
          period: "2023 - Present",
          highlights: [
            "Architected edge caching layer reducing egress bandwidth costs by 34%.",
            "Mentored 6 engineers and spearheaded migration to TypeScript and Next.js.",
          ],
        },
        {
          role: "Frontend Engineer",
          company: "Vanguard Labs",
          period: "2021 - 2023",
          highlights: [
            "Built responsive web app components with 100% WCAG AA accessibility compliance.",
            "Decreased Lighthouse LCP from 3.2s to 0.8s across marketing pages.",
          ],
        },
      ],
      contact: {
        email: "alex@example.com",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        website: "https://folioveda.me",
      },
    };
  }

  // Parse skills from string or array
  let skillsArray: string[] = [];
  if (Array.isArray(userRecord.profile?.skills)) {
    skillsArray = userRecord.profile.skills;
  } else if (typeof userRecord.profile?.skills === "string") {
    skillsArray = userRecord.profile.skills
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean);
  }

  // Map projects
  const rawProjects = Array.isArray(userRecord.projects) ? userRecord.projects : [];
  const projects = rawProjects.map((p: any) => ({
    title: p.title || "Untitled Project",
    description: p.description || "",
    techStack: Array.isArray(p.techStack)
      ? p.techStack
      : typeof p.techStack === "string"
      ? p.techStack.split(",").map((s: string) => s.trim()).filter(Boolean)
      : [],
    liveUrl: p.liveUrl || null,
    githubUrl: p.githubUrl || null,
    featured: Boolean(p.featured),
    metrics: p.metrics || null,
  }));

  return {
    name: userRecord.name || fallbackName,
    headline: userRecord.profile?.headline || (skillsArray.length > 0 ? `${skillsArray.slice(0, 3).join(" • ")} Specialist` : "Software Engineer & Creator"),
    bio: userRecord.profile?.bio || "Welcome to my verified portfolio.",
    avatarUrl: userRecord.image || userRecord.profile?.avatarUrl || null,
    skills: skillsArray,
    projects: projects.length > 0 ? projects : [
      {
        title: "Featured Project",
        description: "A showcase project demonstrating engineering craftsmanship.",
        techStack: ["Next.js", "TypeScript", "Tailwind"],
        liveUrl: null,
        githubUrl: null,
        featured: true,
        metrics: null,
      },
    ],
    experience: Array.isArray(userRecord.experience) ? userRecord.experience : [],
    contact: {
      email: userRecord.email || null,
      github: userRecord.profile?.github || null,
      linkedin: userRecord.profile?.linkedin || null,
      twitter: userRecord.profile?.twitter || null,
      website: userRecord.profile?.website || null,
    },
  };
}
