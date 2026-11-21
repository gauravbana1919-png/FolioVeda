import { ThemePackage } from "@/types/theme";

export const notYourCollegeTheme: ThemePackage = {
  id: "not-your-college",
  name: "Not Your College",
  category: "creative",
  mood: "bold",
  previewImage: "/images/styles/creative-bold.jpg",
  pinterestUrl: "https://notyourcollege.com/",
  inspirationTitle: "Not Your College Editorial & Paper Craft UI",
  isSystem: true,
  tokens: {
    colors: {
      bg: "#f7f4eb",
      surface: "#fffdf8",
      text: "#222e26",
      textMuted: "#5a6b60",
      border: "rgba(23, 63, 50, 0.15)",
      accent: "#173f32",
      accentHover: "#16382c",
    },
    typography: {
      headingFont: "'Instrument Serif', Georgia, serif",
      bodyFont: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      monoFont: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      headingWeight: "400",
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
    pattern: "not-your-college",
    sectionOrder: ["hero", "projects", "skills", "experience", "education", "contact"],
    variants: {
      hero: "nyc",
      projectCard: "nyc",
      nav: "nyc",
      footer: "nyc",
    },
  },
};
