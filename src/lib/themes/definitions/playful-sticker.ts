import { ThemePackage } from "@/types/theme";

export const playfulStickerTheme: ThemePackage = {
  id: "playful-sticker",
  name: "Playful Sticker",
  category: "creative",
  mood: "playful",
  isSystem: true,
  tokens: {
    colors: {
      bg: "#FFFBEB",
      surface: "#FEF3C7",
      text: "#451A03",
      textMuted: "#92400E",
      border: "#FCD34D",
      accent: "#D97706",
      accentHover: "#B45309",
    },
    typography: {
      headingFont: "'Plus Jakarta Sans', system-ui, sans-serif",
      bodyFont: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      monoFont: "ui-monospace, Menlo, Monaco, Consolas, monospace",
      headingWeight: "800",
      bodyWeight: "500",
      scaleRatio: 1.25,
    },
    spacing: {
      density: "comfortable",
      sectionPadding: "4.5rem 2rem",
      cardGap: "1.75rem",
    },
    motion: {
      level: "expressive",
    },
    radii: {
      card: "1.25rem",
      button: "9999px",
      badge: "9999px",
    },
  },
  layout: {
    pattern: "playful-sticker",
    sectionOrder: ["hero", "projects", "skills", "experience", "contact"],
    variants: {
      hero: "sticker",
      projectCard: "sticker",
      nav: "sticker",
      footer: "sticker",
    },
  },
};
