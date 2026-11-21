import { ThemePackage } from "@/types/theme";

export const boldPosterTheme: ThemePackage = {
  id: "bold-poster",
  name: "Bold Poster",
  category: "creative",
  mood: "bold",
  previewImage: "/images/styles/creative-bold.jpg",
  inspirationTitle: "Great Design Speaks Louder Than Words",
  isSystem: true,
  tokens: {
    colors: {
      bg: "#09090B",
      surface: "#18181B",
      text: "#FAFAFA",
      textMuted: "#A1A1AA",
      border: "#27272A",
      accent: "#10B981",
      accentHover: "#34D399",
    },
    typography: {
      headingFont: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Impact, sans-serif",
      bodyFont: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      monoFont: "ui-monospace, Menlo, Monaco, Consolas, monospace",
      headingWeight: "900",
      bodyWeight: "500",
      scaleRatio: 1.4,
    },
    spacing: {
      density: "comfortable",
      sectionPadding: "5rem 2rem",
      cardGap: "2rem",
    },
    motion: {
      level: "expressive",
    },
    radii: {
      card: "0.5rem",
      button: "0.25rem",
      badge: "0.25rem",
    },
  },
  layout: {
    pattern: "poster",
    sectionOrder: ["hero", "projects", "skills", "experience", "contact"],
    variants: {
      hero: "poster",
      projectCard: "poster",
      nav: "poster",
      footer: "poster",
    },
  },
};
