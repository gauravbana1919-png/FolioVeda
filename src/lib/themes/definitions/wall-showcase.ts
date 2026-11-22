import { ThemePackage } from "@/types/theme";

export const wallShowcaseTheme: ThemePackage = {
  id: "wall-showcase",
  name: "Wall-Grade Showcase",
  category: "tech",
  mood: "bold",
  previewImage: "/images/styles/tech-bold.jpg",
  inspirationTitle: "Wall of Portfolios High-Impact Case Study & Narrative Standard",
  isSystem: true,
  tokens: {
    colors: {
      bg: "#0A0E17",
      surface: "#0F1420",
      text: "#F8FAFC",
      textMuted: "#94A3B8",
      border: "rgba(255, 255, 255, 0.1)",
      accent: "#10B981",
      accentHover: "#34D399",
    },
    typography: {
      headingFont: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      bodyFont: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      monoFont: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
      headingWeight: "800",
      bodyWeight: "400",
      scaleRatio: 1.35,
    },
    spacing: {
      density: "comfortable",
      sectionPadding: "6rem 2rem",
      cardGap: "2rem",
    },
    motion: {
      level: "expressive",
    },
    radii: {
      card: "1.5rem",
      button: "0.75rem",
      badge: "9999px",
    },
  },
  layout: {
    pattern: "wall-showcase",
    sectionOrder: ["hero", "projects", "experience", "skills", "education", "contact"],
    variants: {
      hero: "wall-showcase",
      projectCard: "wall-showcase",
      nav: "wall-showcase",
      footer: "wall-showcase",
    },
  },
};
