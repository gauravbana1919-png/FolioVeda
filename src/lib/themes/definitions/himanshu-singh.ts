import { ThemePackage } from "@/types/theme";

export const himanshuSinghTheme: ThemePackage = {
  id: "himanshu-singh",
  name: "Himanshu Singh Studio",
  category: "creative",
  mood: "bold",
  previewImage: "/images/styles/creative-bold.jpg",
  inspirationTitle: "Himanshu Singh Chauhan Visual Storytelling Studio Canvas",
  isSystem: true,
  tokens: {
    colors: {
      bg: "#021a13", // Deep studio background
      surface: "#06392b", // Studio cutting board
      text: "#eef3c8", // Pale chartreuse ink
      textMuted: "#b7c47a", // Dim lime text
      border: "rgba(198, 212, 87, 0.25)",
      accent: "#c6d457", // Lime highlight
      accentHover: "#d8e860",
    },
    typography: {
      headingFont: "'Inter', system-ui, -apple-system, sans-serif",
      bodyFont: "'Inter', system-ui, -apple-system, sans-serif",
      monoFont: "'JetBrains Mono', monospace",
      headingWeight: "800",
      bodyWeight: "400",
      scaleRatio: 1.35,
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
      card: "1rem",
      button: "9999px",
      badge: "9999px",
    },
  },
  layout: {
    pattern: "himanshu-studio",
    sectionOrder: ["hero", "projects", "experience", "contact"],
    variants: {
      hero: "himanshu-studio",
      projectCard: "himanshu-studio",
      nav: "himanshu-studio",
      footer: "himanshu-studio",
    },
  },
};
