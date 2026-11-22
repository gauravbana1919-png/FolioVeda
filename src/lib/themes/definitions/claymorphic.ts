import { ThemePackage } from "@/types/theme";

export const claymorphicTheme: ThemePackage = {
  id: "claymorphic",
  name: "Claymorphic 3D",
  category: "creative",
  mood: "playful",
  previewImage: "/images/styles/creative-playful.jpg",
  inspirationTitle: "Soft 3D Inset Shadows, Tactile Rounded Cards & Pastel Accents",
  isSystem: true,
  tokens: {
    colors: {
      bg: "#EEF2FF",
      surface: "rgba(255, 255, 255, 0.75)",
      text: "#1E293B",
      textMuted: "#64748B",
      border: "rgba(255, 255, 255, 0.8)",
      accent: "#6366F1",
      accentHover: "#4F46E5",
    },
    typography: {
      headingFont: "Inter, system-ui, sans-serif",
      bodyFont: "Inter, system-ui, sans-serif",
      monoFont: "ui-monospace, monospace",
      headingWeight: "900",
      bodyWeight: "500",
      scaleRatio: 1.25,
    },
    spacing: {
      density: "spacious",
      sectionPadding: "4.5rem 2rem",
      cardGap: "2rem",
    },
    motion: {
      level: "expressive",
    },
    radii: {
      card: "2rem",
      button: "1.25rem",
      badge: "9999px",
    },
  },
  layout: {
    pattern: "claymorphic",
    sectionOrder: ["hero", "projects", "skills", "experience", "contact"],
    variants: {
      hero: "claymorphic",
      projectCard: "claymorphic",
      nav: "claymorphic",
      footer: "claymorphic",
    },
  },
};
