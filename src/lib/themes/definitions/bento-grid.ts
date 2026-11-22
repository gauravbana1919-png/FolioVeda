import { ThemePackage } from "@/types/theme";

export const bentoGridTheme: ThemePackage = {
  id: "bento-grid",
  name: "BentoGrid Studio",
  category: "creative",
  mood: "bold",
  previewImage: "/images/styles/creative-bold.jpg",
  inspirationTitle: "Modular Bento Grid with Aceternity 3D Cards & Terminal Console",
  isSystem: true,
  tokens: {
    colors: {
      bg: "#090A0F",
      surface: "#111420",
      text: "#F8FAFC",
      textMuted: "#94A3B8",
      border: "rgba(255, 255, 255, 0.08)",
      accent: "#38BDF8",
      accentHover: "#0EA5E9",
    },
    typography: {
      headingFont: "Plus Jakarta Sans, Inter, sans-serif",
      bodyFont: "Plus Jakarta Sans, Inter, sans-serif",
      monoFont: "JetBrains Mono, monospace",
      headingWeight: "800",
      bodyWeight: "500",
      scaleRatio: 1.25,
    },
    spacing: {
      density: "comfortable",
      sectionPadding: "3rem 1.5rem",
      cardGap: "1.25rem",
    },
    motion: {
      level: "expressive",
    },
    radii: {
      card: "1.25rem",
      button: "0.75rem",
      badge: "9999px",
    },
  },
  layout: {
    pattern: "bento-grid",
    sectionOrder: ["hero", "projects", "skills", "experience", "contact"],
    variants: {
      hero: "bento-grid",
      projectCard: "bento-grid",
      nav: "bento-grid",
      footer: "bento-grid",
    },
  },
};
