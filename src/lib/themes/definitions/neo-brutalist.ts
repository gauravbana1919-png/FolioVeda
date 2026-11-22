import { ThemePackage } from "@/types/theme";

export const neoBrutalistTheme: ThemePackage = {
  id: "neo-brutalist",
  name: "Neo-Brutalist Pop",
  category: "creative",
  mood: "bold",
  previewImage: "/images/styles/creative-bold.jpg",
  inspirationTitle: "Retro 90s Brutalist Architecture & High Contrast Shadows",
  isSystem: true,
  tokens: {
    colors: {
      bg: "#F4F4F0",
      surface: "#FFFFFF",
      text: "#000000",
      textMuted: "#333333",
      border: "#000000",
      accent: "#FFD000",
      accentHover: "#E6BC00",
    },
    typography: {
      headingFont: "Inter, system-ui, sans-serif",
      bodyFont: "Inter, system-ui, sans-serif",
      monoFont: "ui-monospace, monospace",
      headingWeight: "900",
      bodyWeight: "600",
      scaleRatio: 1.3,
    },
    spacing: {
      density: "comfortable",
      sectionPadding: "4rem 2rem",
      cardGap: "2rem",
    },
    motion: {
      level: "expressive",
    },
    radii: {
      card: "0px",
      button: "0px",
      badge: "0px",
    },
  },
  layout: {
    pattern: "neo-brutalist",
    sectionOrder: ["hero", "projects", "skills", "experience", "contact"],
    variants: {
      hero: "neo-brutalist",
      projectCard: "neo-brutalist",
      nav: "neo-brutalist",
      footer: "neo-brutalist",
    },
  },
};
