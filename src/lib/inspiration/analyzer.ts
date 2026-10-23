import { StyleProfile, StyleProfileSchema, AbstractFontCategory, AbstractLayoutPattern } from "@/types/inspiration";

/**
 * Parses abstract design traits from an HTML/CSS snippet.
 * HARD RULE: Never copies or stores text content, images, logos, or personal data.
 * Produces ONLY abstract design tokens.
 */
export function extractAbstractStyleProfile(
  htmlSnippet: string,
  targetUrl: string
): StyleProfile {
  const lowerSnippet = htmlSnippet.toLowerCase();

  // 1. Detect Surface Brightness
  let surfaceBrightness: "dark" | "light" | "neutral" = "neutral";
  const darkIndicators = ["bg-[#0", "bg-black", "bg-slate-9", "bg-gray-9", "background:#0", "background: #0", "background-color: #0", "dark:"];
  const lightIndicators = ["bg-white", "bg-[#fff", "background:#fff", "background: #fff", "background: #faf", "bg-[#faf"];

  const darkScore = darkIndicators.filter((term) => lowerSnippet.includes(term)).length;
  const lightScore = lightIndicators.filter((term) => lowerSnippet.includes(term)).length;

  if (darkScore > lightScore) {
    surfaceBrightness = "dark";
  } else if (lightScore > 0) {
    surfaceBrightness = "light";
  } else {
    surfaceBrightness = "neutral";
  }

  // 2. Detect Typography Category
  let fontCategory: AbstractFontCategory = "geometric-sans";
  if (
    lowerSnippet.includes("serif") ||
    lowerSnippet.includes("playfair") ||
    lowerSnippet.includes("georgia") ||
    lowerSnippet.includes("merriweather") ||
    lowerSnippet.includes("times")
  ) {
    fontCategory = "editorial-serif";
  } else if (
    lowerSnippet.includes("mono") ||
    lowerSnippet.includes("consolas") ||
    lowerSnippet.includes("menlo") ||
    lowerSnippet.includes("courier") ||
    lowerSnippet.includes("jetbrains")
  ) {
    fontCategory = "monospace-code";
  } else if (
    lowerSnippet.includes("grotesk") ||
    lowerSnippet.includes("syne") ||
    lowerSnippet.includes("impact") ||
    lowerSnippet.includes("clash")
  ) {
    fontCategory = "modern-grotesk";
  } else if (lowerSnippet.includes("inter") || lowerSnippet.includes("roboto") || lowerSnippet.includes("outfit")) {
    fontCategory = "geometric-sans";
  }

  // 3. Detect Layout Pattern & Mood
  let layoutPattern: AbstractLayoutPattern = "poster";
  let detectedMood: "calm" | "bold" | "playful" | "formal" = "bold";

  if (fontCategory === "monospace-code" || lowerSnippet.includes("terminal") || lowerSnippet.includes("bash")) {
    layoutPattern = "terminal-grid";
    detectedMood = "formal";
  } else if (fontCategory === "editorial-serif" || lowerSnippet.includes("editorial") || lowerSnippet.includes("journal")) {
    layoutPattern = "centered-editorial";
    detectedMood = "calm";
  } else if (lowerSnippet.includes("case study") || lowerSnippet.includes("deliverable") || lowerSnippet.includes("overview")) {
    layoutPattern = "case-study";
    detectedMood = "formal";
  } else if (surfaceBrightness === "dark" && (lowerSnippet.includes("cyan") || lowerSnippet.includes("neon") || lowerSnippet.includes("glow"))) {
    layoutPattern = "dark-showcase";
    detectedMood = "bold";
  } else if (lowerSnippet.includes("sticker") || lowerSnippet.includes("playful") || lowerSnippet.includes("fun")) {
    layoutPattern = "playful-sticker";
    detectedMood = "playful";
  } else if (surfaceBrightness === "light" && lowerSnippet.includes("corporate")) {
    layoutPattern = "split-hero";
    detectedMood = "formal";
  }

  // 4. Synthesize Inspired Harmonic Color Tokens (Mood-inspired, NEVER proprietary cloned palettes)
  let dominantColors: string[] = [];
  let accentColor = "#10B981"; // FolioVeda Cyber Mint anchor

  if (surfaceBrightness === "dark") {
    if (layoutPattern === "dark-showcase") {
      dominantColors = ["#030712", "#0B0F19", "#F3F4F6", "#1F2937"];
      accentColor = "#06B6D4"; // Cyan
    } else if (layoutPattern === "terminal-grid") {
      dominantColors = ["#0D1117", "#161B22", "#E6EDF3", "#30363D"];
      accentColor = "#2EA043"; // Terminal green
    } else {
      dominantColors = ["#09090B", "#18181B", "#FAFAFA", "#27272A"];
      accentColor = "#10B981"; // Cyber Mint
    }
  } else if (surfaceBrightness === "light") {
    if (layoutPattern === "centered-editorial") {
      dominantColors = ["#FAF8F5", "#F4F1EA", "#18181B", "#E4E1D9"];
      accentColor = "#C2410C"; // Terracotta
    } else if (layoutPattern === "playful-sticker") {
      dominantColors = ["#FFFBEB", "#FEF3C7", "#451A03", "#FCD34D"];
      accentColor = "#D97706"; // Amber
    } else {
      dominantColors = ["#F8FAFC", "#FFFFFF", "#0F172A", "#E2E8F0"];
      accentColor = "#0284C7"; // Sky Blue
    }
  } else {
    dominantColors = ["#18181B", "#27272A", "#FAFAFA", "#3F3F46"];
    accentColor = "#F43F5E"; // Rose
  }

  const profile: StyleProfile = {
    detectedMood,
    layoutPattern,
    fontCategory,
    dominantColors,
    accentColor,
    surfaceBrightness,
    density: layoutPattern === "terminal-grid" ? "compact" : layoutPattern === "centered-editorial" ? "spacious" : "comfortable",
    motionCadence: layoutPattern === "poster" || layoutPattern === "dark-showcase" ? "expressive" : "subtle",
    sectionOrder:
      layoutPattern === "case-study"
        ? ["hero", "projects", "experience", "skills", "contact"]
        : ["hero", "projects", "skills", "experience", "contact"],
    borderStyle: layoutPattern === "playful-sticker" ? "rounded" : layoutPattern === "poster" ? "heavy" : "subtle",
  };

  // Validate output against Zod schema
  return StyleProfileSchema.parse(profile);
}
