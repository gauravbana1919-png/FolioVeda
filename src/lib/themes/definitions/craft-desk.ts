import { ThemePackage } from "@/types/theme";

export const craftDeskTheme: ThemePackage = {
  id: "craft-desk",
  name: "Craft Desk Mat (Rolan Gomes)",
  category: "design",
  mood: "formal",
  previewImage: "/images/styles/design-formal.jpg",
  inspirationTitle: "Rolan Gomes Physical Cutting Mat & Floating Paper Sheet Standard",
  isSystem: true,
  tokens: {
    colors: {
      bg: "#095848", // The green architect cutting mat
      surface: "#FAF7F0", // The warm physical paper sheet
      text: "#1E293B",
      textMuted: "#64748B",
      border: "rgba(0, 0, 0, 0.12)",
      accent: "#095848",
      accentHover: "#07463a",
    },
    typography: {
      headingFont: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      bodyFont: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      monoFont: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
      headingWeight: "800",
      bodyWeight: "400",
      scaleRatio: 1.35,
    },
    spacing: {
      density: "comfortable",
      sectionPadding: "3rem 1.5rem",
      cardGap: "2rem",
    },
    motion: {
      level: "expressive",
    },
    radii: {
      card: "1.5rem",
      button: "0.5rem",
      badge: "9999px",
    },
  },
  layout: {
    pattern: "craft-desk",
    sectionOrder: ["hero", "projects", "experience", "education", "contact"],
    variants: {
      hero: "craft-desk",
      projectCard: "craft-desk",
      nav: "craft-desk",
      footer: "craft-desk",
    },
  },
};
