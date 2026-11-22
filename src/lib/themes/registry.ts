import { ThemePackage, ThemePackageSchema } from "@/types/theme";
import { PortfolioContent } from "@/types/content";
import { developerTerminalTheme } from "./definitions/developer-terminal";
import { minimalEditorialTheme } from "./definitions/minimal-editorial";
import { boldPosterTheme } from "./definitions/bold-poster";
import { corporateCleanTheme } from "./definitions/corporate-clean";
import { creativeCollageTheme } from "./definitions/creative-collage";
import { caseStudyHeavyTheme } from "./definitions/case-study-heavy";
import { darkShowcaseTheme } from "./definitions/dark-showcase";
import { playfulStickerTheme } from "./definitions/playful-sticker";
import { luxeCreativeTheme } from "./definitions/luxe-creative";
import { notYourCollegeTheme } from "./definitions/not-your-college";
import { wallShowcaseTheme } from "./definitions/wall-showcase";

export const SYSTEM_THEMES: Record<string, ThemePackage> = {
  "wall-showcase": wallShowcaseTheme,
  "not-your-college": notYourCollegeTheme,
  "luxe-creative": luxeCreativeTheme,
  "developer-terminal": developerTerminalTheme,
  "minimal-editorial": minimalEditorialTheme,
  "bold-poster": boldPosterTheme,
  "corporate-clean": corporateCleanTheme,
  "creative-collage": creativeCollageTheme,
  "case-study-heavy": caseStudyHeavyTheme,
  "dark-showcase": darkShowcaseTheme,
  "playful-sticker": playfulStickerTheme,
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
  return SYSTEM_THEMES["luxe-creative"] || SYSTEM_THEMES["developer-terminal"];
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
      bio: "I build high-throughput distributed systems, then direct AI to turn complex workflows into working products. Focused on sub-100ms APIs, resilient event pipelines, and outcome-driven design.",
      avatarUrl: null,
      location: "Bengaluru, India",
      availability: "Open to Staff / Senior Roles in Bengaluru / Remote",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Docker", "Prisma", "Redis", "Rust"],
      projects: [
        {
          title: "Distributed Telemetry & Edge Pipeline",
          description: "A low-latency distributed caching and telemetry engine built with Next.js, Redis, and Prisma, serving 100k+ req/sec with sub-5ms P99 latency.",
          techStack: ["Next.js", "TypeScript", "Redis", "Docker", "PostgreSQL"],
          liveUrl: "https://github.com",
          githubUrl: "https://github.com",
          featured: true,
          metrics: "100k req/sec • 420ms ➔ 65ms P99 latency",
          category: "Distributed Architecture",
          impact: "+38% Query Throughput • 420ms ➔ 65ms P99",
          problem: "Legacy monolithic APIs struggled under concurrent analytics loads with frequent latency spikes and high cloud egress fees.",
          solution: "Engineered an edge caching layer using Redis and Next.js Turbopack that decouples heavy queries and serves 100k+ req/sec at sub-5ms latency.",
        },
        {
          title: "AI Synthesis Canvas & Workflow Engine",
          description: "Interactive real-time collaboration canvas with LLM-powered diagram generation, AST streaming, and instant markdown previewing.",
          techStack: ["Next.js", "TypeScript", "Tailwind", "WebSockets", "Gemini AI"],
          liveUrl: "https://github.com",
          githubUrl: "https://github.com",
          featured: true,
          metrics: "200,000+ monthly active users • 99.98% uptime",
          category: "AI Product Architecture",
          impact: "200k+ MAU • Sub-100ms Live AST Stream",
          problem: "Engineers and product designers spent excessive hours manually drafting cloud system architecture diagrams and flowcharts.",
          solution: "Built a collaborative canvas that streams LLM structured JSON into real-time interactive diagrams with sub-100ms render speeds.",
        },
        {
          title: "FolioVeda — Autonomous Portfolio & ATS Engineering Suite",
          description: "Autonomous career architecture compiler with zero-hallucination intake, dynamic Wall of Portfolios archetypes, and live ATS keyword auditing.",
          techStack: ["Next.js", "Prisma", "SQLite", "Framer Motion", "Tailwind CSS"],
          liveUrl: "https://folioveda.dev",
          githubUrl: "https://github.com",
          featured: false,
          metrics: "Sub-50ms TTFB worldwide",
          category: "Full-Stack SaaS Platform",
          impact: "Wall of Portfolios Standard • Sub-50ms TTFB",
          problem: "Developers and designers had fragmented, unattractive portfolios that failed ATS parsers and lacked outcome-driven case studies.",
          solution: "Created an autonomous portfolio compiler with zero-hallucination intake, dynamic architectural theme engines, and high-impact case study drawers.",
        },
      ],
      experience: [
        {
          role: "Senior Full-Stack Engineer",
          company: "Nexus Cloud Systems",
          period: "Jun 2023 - Present",
          location: "Bengaluru, India / Remote",
          highlights: [
            "Architected edge caching layer reducing egress bandwidth costs by 34% across 12 multinational regions.",
            "Mentored 6 engineers and spearheaded company-wide migration to TypeScript, Next.js, and Turbopack.",
            "Designed and implemented mission-critical distributed event pipeline processing 50M+ daily events.",
          ],
        },
        {
          role: "Frontend Systems Engineer",
          company: "Vanguard Labs",
          period: "Aug 2021 - May 2023",
          location: "Hyderabad, India",
          highlights: [
            "Built responsive design system components with 100% WCAG 2.2 AA accessibility compliance.",
            "Decreased Lighthouse LCP from 3.2s to 0.8s across all core customer onboarding workflows.",
          ],
        },
      ],
      education: [
        {
          degree: "B.Tech in Computer Science & Engineering",
          institution: "Visvesvaraya Technological University",
          year: "2021",
          gpa: "8.8 / 10.0",
          honors: "First Class with Distinction",
        },
      ],
      certifications: [
        {
          name: "AWS Certified Solutions Architect",
          issuer: "Amazon Web Services",
          year: "2024",
          status: "Verified",
        },
        {
          name: "Enterprise Design Thinking Practitioner",
          issuer: "IBM",
          year: "2024",
          status: "Completed",
        },
        {
          name: "AI for Product Designers & Engineers",
          issuer: "Interaction Design Foundation",
          year: "2025",
          status: "Completed",
        },
      ],
      contact: {
        email: "gaurav.dev@gmail.com",
        github: "https://github.com/gauravbana1919-png",
        linkedin: "https://linkedin.com/in/gaurav-dev",
        twitter: "https://twitter.com",
        website: "https://folioveda.dev",
        phone: "+91 98765 43210",
        resumeUrl: "/resume",
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
    category: p.category || null,
    impact: p.impact || p.metrics || null,
    problem: p.problem || null,
    solution: p.solution || null,
  }));

  // Parse experience from profile or user
  let parsedExperience: any[] = [];
  if (Array.isArray(userRecord.profile?.experience)) {
    parsedExperience = userRecord.profile.experience;
  } else if (typeof userRecord.profile?.experience === "string") {
    try {
      parsedExperience = JSON.parse(userRecord.profile.experience);
    } catch {}
  } else if (Array.isArray(userRecord.experience)) {
    parsedExperience = userRecord.experience;
  }

  // Parse education from profile or user
  let parsedEducation: any[] = [];
  if (Array.isArray(userRecord.profile?.education)) {
    parsedEducation = userRecord.profile.education;
  } else if (typeof userRecord.profile?.education === "string") {
    try {
      parsedEducation = JSON.parse(userRecord.profile.education);
    } catch {}
  } else if (Array.isArray(userRecord.education)) {
    parsedEducation = userRecord.education;
  }

  // Parse certifications from profile or user
  let parsedCerts: any[] = [];
  if (Array.isArray(userRecord.profile?.certifications)) {
    parsedCerts = userRecord.profile.certifications;
  } else if (typeof userRecord.profile?.certifications === "string") {
    try {
      parsedCerts = JSON.parse(userRecord.profile.certifications);
    } catch {}
  } else if (Array.isArray(userRecord.certifications)) {
    parsedCerts = userRecord.certifications;
  }

  return {
    name: userRecord.name || fallbackName,
    headline: userRecord.profile?.headline || (skillsArray.length > 0 ? `${skillsArray.slice(0, 3).join(" • ")} Specialist` : "Software Engineer & Creator"),
    bio: userRecord.profile?.bio || "",
    avatarUrl: userRecord.image || userRecord.profile?.avatarUrl || null,
    location: userRecord.profile?.location || userRecord.location || "Bengaluru, India",
    availability: userRecord.profile?.availability || "Open to Staff / Senior Roles",
    skills: skillsArray,
    projects: projects,
    experience: parsedExperience,
    education: parsedEducation,
    certifications: parsedCerts,
    contact: (() => {
      let socialsObj: any = {};
      if (typeof userRecord.profile?.socials === "string") {
        try {
          socialsObj = JSON.parse(userRecord.profile.socials);
        } catch {}
      }
      return {
        email: userRecord.email || null,
        github: socialsObj.github || userRecord.profile?.github || null,
        linkedin: socialsObj.linkedin || userRecord.profile?.linkedin || null,
        twitter: socialsObj.twitter || userRecord.profile?.twitter || null,
        website: socialsObj.portfolio || socialsObj.website || userRecord.profile?.website || null,
        phone: userRecord.profile?.phone || socialsObj.phone || null,
        resumeUrl: userRecord.profile?.resumeUrl || "/resume",
      };
    })(),
  };
}
