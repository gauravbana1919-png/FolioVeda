import { ThemePackage } from "@/types/theme";

export const developerTerminalTheme: ThemePackage = {
  id: "developer-terminal",
  name: "Developer Terminal",
  category: "tech",
  mood: "formal",
  previewImage: "/images/styles/tech-formal.jpg",
  pinterestUrl: "https://in.pinterest.com/pin/937452478704956169/",
  inspirationTitle: "Programmers Aesthetic & Terminal System",
  isSystem: true,
  tokens: {
    colors: {
      bg: "#0D1117",
      surface: "#161B22",
      text: "#E6EDF3",
      textMuted: "#8B949E",
      border: "#30363D",
      accent: "#2EA043",
      accentHover: "#3FB950",
    },
    typography: {
      headingFont: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
      bodyFont: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
      monoFont: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
      headingWeight: "600",
      bodyWeight: "400",
      scaleRatio: 1.15,
    },
    spacing: {
      density: "compact",
      sectionPadding: "3.5rem 1.5rem",
      cardGap: "1.25rem",
    },
    motion: {
      level: "subtle",
    },
    radii: {
      card: "0.375rem",
      button: "0.25rem",
      badge: "0.25rem",
    },
  },
  layout: {
    pattern: "terminal-grid",
    sectionOrder: ["hero", "projects", "skills", "experience", "contact"],
    variants: {
      hero: "terminal",
      projectCard: "terminal",
      nav: "terminal",
      footer: "terminal",
    },
  },
};
