import { ThemePackage } from "@/types/theme";

export const caseStudyHeavyTheme: ThemePackage = {
  id: "case-study-heavy",
  name: "Case-Study Heavy",
  category: "design",
  mood: "formal",
  previewImage: "/images/styles/design-formal.jpg",
  pinterestUrl: "https://in.pinterest.com/pin/628955904245390485/",
  inspirationTitle: "Micro Space Website Case Study & Editorial Systems",
  isSystem: true,
  tokens: {
    colors: {
      bg: "#0F172A",
      surface: "#1E293B",
      text: "#F8FAFC",
      textMuted: "#94A3B8",
      border: "#334155",
      accent: "#8B5CF6",
      accentHover: "#7C3AED",
    },
    typography: {
      headingFont: "Georgia, 'Times New Roman', serif",
      bodyFont: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      monoFont: "ui-monospace, Menlo, Monaco, Consolas, monospace",
      headingWeight: "700",
      bodyWeight: "400",
      scaleRatio: 1.3,
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
      card: "0.75rem",
      button: "0.375rem",
      badge: "0.375rem",
    },
  },
  layout: {
    pattern: "case-study",
    sectionOrder: ["hero", "projects", "experience", "skills", "contact"],
    variants: {
      hero: "case-study",
      projectCard: "case-study",
      nav: "case-study",
      footer: "case-study",
    },
  },
};
