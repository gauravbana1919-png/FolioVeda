import { ThemePackage } from "@/types/theme";

export const luxeCreativeTheme: ThemePackage = {
  id: "luxe-creative",
  name: "Luxe Creative",
  category: "creative",
  mood: "bold",
  previewImage: "/images/styles/creative-bold.jpg",
  pinterestUrl: "https://in.pinterest.com/pin/970525788470144809/",
  inspirationTitle: "Luxe Dark Gradient & Interactive Motion UI",
  isSystem: true,
  tokens: {
    colors: {
      bg: "#0B0F19",
      surface: "#0E1322",
      text: "#FFFFFF",
      textMuted: "#94A3B8",
      border: "rgba(255, 255, 255, 0.1)",
      accent: "#991B1B",
      accentHover: "#BE123C",
    },
    typography: {
      headingFont: "'Plus Jakarta Sans', system-ui, sans-serif",
      bodyFont: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      monoFont: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      headingWeight: "900",
      bodyWeight: "400",
      scaleRatio: 1.35,
    },
    spacing: {
      density: "comfortable",
      sectionPadding: "6rem 2rem",
      cardGap: "2rem",
    },
    motion: {
      level: "expressive",
    },
    radii: {
      card: "1.5rem",
      button: "9999px",
      badge: "9999px",
    },
  },
  layout: {
    pattern: "luxe-creative",
    sectionOrder: ["hero", "projects", "skills", "experience", "education", "contact"],
    variants: {
      hero: "luxe",
      projectCard: "luxe",
      nav: "luxe",
      footer: "luxe",
    },
  },
};
