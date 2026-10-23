import { ThemePackage } from "@/types/theme";

export const darkShowcaseTheme: ThemePackage = {
  id: "dark-showcase",
  name: "Dark Showcase",
  category: "tech",
  mood: "bold",
  previewImage: "/images/styles/tech-bold.jpg",
  pinterestUrl: "https://in.pinterest.com/pin/970525788470144809/",
  inspirationTitle: "Dark Carousel UI & Interface Interaction",
  isSystem: true,
  tokens: {
    colors: {
      bg: "#030712",
      surface: "#0B0F19",
      text: "#F3F4F6",
      textMuted: "#9CA3AF",
      border: "#1F2937",
      accent: "#06B6D4",
      accentHover: "#0891B2",
    },
    typography: {
      headingFont: "'Plus Jakarta Sans', system-ui, sans-serif",
      bodyFont: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      monoFont: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      headingWeight: "800",
      bodyWeight: "400",
      scaleRatio: 1.35,
    },
    spacing: {
      density: "comfortable",
      sectionPadding: "5.5rem 2rem",
      cardGap: "2.25rem",
    },
    motion: {
      level: "expressive",
    },
    radii: {
      card: "0.75rem",
      button: "0.5rem",
      badge: "9999px",
    },
  },
  layout: {
    pattern: "dark-showcase",
    sectionOrder: ["hero", "projects", "skills", "experience", "contact"],
    variants: {
      hero: "showcase",
      projectCard: "showcase",
      nav: "showcase",
      footer: "showcase",
    },
  },
};
