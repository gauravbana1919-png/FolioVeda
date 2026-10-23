import { ThemePackage } from "@/types/theme";

export const corporateCleanTheme: ThemePackage = {
  id: "corporate-clean",
  name: "Corporate Clean",
  category: "business",
  mood: "formal",
  previewImage: "/images/styles/business-formal.jpg",
  pinterestUrl: "https://in.pinterest.com/pin/1097963584193800356/",
  inspirationTitle: "Conicorn Executive Template & Architecture",
  isSystem: true,
  tokens: {
    colors: {
      bg: "#F8FAFC",
      surface: "#FFFFFF",
      text: "#0F172A",
      textMuted: "#64748B",
      border: "#E2E8F0",
      accent: "#0284C7",
      accentHover: "#0369A1",
    },
    typography: {
      headingFont: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      bodyFont: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      monoFont: "ui-monospace, Menlo, Monaco, Consolas, monospace",
      headingWeight: "700",
      bodyWeight: "400",
      scaleRatio: 1.25,
    },
    spacing: {
      density: "comfortable",
      sectionPadding: "4.5rem 2rem",
      cardGap: "1.75rem",
    },
    motion: {
      level: "subtle",
    },
    radii: {
      card: "0.5rem",
      button: "0.375rem",
      badge: "0.25rem",
    },
  },
  layout: {
    pattern: "split-hero",
    sectionOrder: ["hero", "experience", "projects", "skills", "contact"],
    variants: {
      hero: "corporate",
      projectCard: "corporate",
      nav: "corporate",
      footer: "corporate",
    },
  },
};
