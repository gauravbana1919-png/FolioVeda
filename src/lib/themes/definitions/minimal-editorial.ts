import { ThemePackage } from "@/types/theme";

export const minimalEditorialTheme: ThemePackage = {
  id: "minimal-editorial",
  name: "Minimal Editorial",
  category: "design",
  mood: "calm",
  previewImage: "/images/styles/design-calm.jpg",
  inspirationTitle: "Minimal Poster Design & Editorial Typography",
  isSystem: true,
  tokens: {
    colors: {
      bg: "#FAF8F5",
      surface: "#F4F1EA",
      text: "#18181B",
      textMuted: "#71717A",
      border: "#E4E1D9",
      accent: "#C2410C",
      accentHover: "#9A3412",
    },
    typography: {
      headingFont: "Georgia, 'Playfair Display', Cambria, 'Times New Roman', Times, serif",
      bodyFont: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      monoFont: "ui-monospace, Menlo, Monaco, Consolas, monospace",
      headingWeight: "600",
      bodyWeight: "400",
      scaleRatio: 1.33,
    },
    spacing: {
      density: "spacious",
      sectionPadding: "6rem 2rem",
      cardGap: "2.5rem",
    },
    motion: {
      level: "subtle",
    },
    radii: {
      card: "0.125rem",
      button: "0.125rem",
      badge: "9999px",
    },
  },
  layout: {
    pattern: "centered-editorial",
    sectionOrder: ["hero", "projects", "experience", "skills", "contact"],
    variants: {
      hero: "editorial",
      projectCard: "editorial",
      nav: "editorial",
      footer: "editorial",
    },
  },
};
