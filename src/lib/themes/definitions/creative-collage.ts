import { ThemePackage } from "@/types/theme";

export const creativeCollageTheme: ThemePackage = {
  id: "creative-collage",
  name: "Creative Collage",
  category: "creative",
  mood: "playful",
  isSystem: true,
  tokens: {
    colors: {
      bg: "#18181B",
      surface: "#27272A",
      text: "#FAFAFA",
      textMuted: "#A1A1AA",
      border: "#3F3F46",
      accent: "#F43F5E",
      accentHover: "#E11D48",
    },
    typography: {
      headingFont: "'Plus Jakarta Sans', system-ui, sans-serif",
      bodyFont: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      monoFont: "ui-monospace, Menlo, Monaco, Consolas, monospace",
      headingWeight: "800",
      bodyWeight: "400",
      scaleRatio: 1.3,
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
      card: "1rem",
      button: "9999px",
      badge: "9999px",
    },
  },
  layout: {
    pattern: "masonry",
    sectionOrder: ["hero", "projects", "skills", "experience", "contact"],
    variants: {
      hero: "collage",
      projectCard: "collage",
      nav: "collage",
      footer: "collage",
    },
  },
};
