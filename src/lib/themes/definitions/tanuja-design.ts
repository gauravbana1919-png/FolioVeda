import { ThemePackage } from "@/types/theme";

export const tanujaDesignTheme: ThemePackage = {
  id: "tanuja-design",
  name: "Tanuja Microsoft Case Study",
  category: "design",
  mood: "formal",
  previewImage: "/images/styles/design-formal.jpg",
  inspirationTitle: "Tanuja Microsoft Enterprise AI & System Design Showcase",
  isSystem: true,
  tokens: {
    colors: {
      bg: "#F8FAFC", // Clean enterprise canvas
      surface: "#FFFFFF", // Pure white cards
      text: "#0F172A", // Deep slate
      textMuted: "#64748B",
      border: "#E2E8F0",
      accent: "#2563EB", // Microsoft Azure / Indigo
      accentHover: "#1D4ED8",
    },
    typography: {
      headingFont: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      bodyFont: "'Inter', system-ui, -apple-system, sans-serif",
      monoFont: "'JetBrains Mono', monospace",
      headingWeight: "800",
      bodyWeight: "400",
      scaleRatio: 1.3,
    },
    spacing: {
      density: "comfortable",
      sectionPadding: "4rem 2rem",
      cardGap: "2rem",
    },
    motion: {
      level: "subtle",
    },
    radii: {
      card: "1.5rem",
      button: "9999px",
      badge: "9999px",
    },
  },
  layout: {
    pattern: "tanuja-product",
    sectionOrder: ["hero", "projects", "experience", "contact"],
    variants: {
      hero: "tanuja-product",
      projectCard: "tanuja-product",
      nav: "tanuja-product",
      footer: "tanuja-product",
    },
  },
};
