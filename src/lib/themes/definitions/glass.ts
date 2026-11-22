import { ThemePackage } from "@/types/theme";

export const glassTheme: ThemePackage = {
  id: "glass",
  name: "Glassmorphism Cyber",
  category: "tech",
  mood: "calm",
  previewImage: "/images/styles/tech-calm.jpg",
  inspirationTitle: "Frosted Glass, Ambient Glow & Translucent Depth",
  isSystem: true,
  tokens: {
    colors: {
      bg: "#0B0F19",
      surface: "rgba(255, 255, 255, 0.04)",
      text: "#FFFFFF",
      textMuted: "#94A3B8",
      border: "rgba(255, 255, 255, 0.1)",
      accent: "#38BDF8",
      accentHover: "#0284C7",
    },
    typography: {
      headingFont: "Inter, system-ui, sans-serif",
      bodyFont: "Inter, system-ui, sans-serif",
      monoFont: "ui-monospace, monospace",
      headingWeight: "800",
      bodyWeight: "400",
      scaleRatio: 1.25,
    },
    spacing: {
      density: "comfortable",
      sectionPadding: "4rem 2rem",
      cardGap: "1.75rem",
    },
    motion: {
      level: "subtle",
    },
    radii: {
      card: "1.25rem",
      button: "0.75rem",
      badge: "9999px",
    },
  },
  layout: {
    pattern: "glass",
    sectionOrder: ["hero", "projects", "skills", "experience", "contact"],
    variants: {
      hero: "glass",
      projectCard: "glass",
      nav: "glass",
      footer: "glass",
    },
  },
};
