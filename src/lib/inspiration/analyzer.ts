import { StyleProfile, StyleProfileSchema, AbstractFontCategory, AbstractLayoutPattern } from "@/types/inspiration";

/**
 * Parses abstract design traits from an HTML/CSS snippet or target URL.
 * HARD RULE: Never copies or stores text content, images, logos, or personal data.
 * Produces ONLY abstract design tokens & architectural layout patterns.
 */
export function extractAbstractStyleProfile(
  htmlSnippet: string,
  targetUrl: string
): StyleProfile {
  const lowerSnippet = (htmlSnippet || "").toLowerCase();
  const lowerUrl = (targetUrl || "").toLowerCase();

  // 1. Direct Reference Recognition for Wall of Portfolios & Signature Archetypes
  if (lowerUrl.includes("rolan") || lowerSnippet.includes("rolan") || lowerSnippet.includes("cutting mat")) {
    return StyleProfileSchema.parse({
      detectedMood: "calm",
      layoutPattern: "craft-desk",
      fontCategory: "editorial-serif",
      dominantColors: ["#095848", "#FAF7F0", "#1c1917", "#e7e5e4"],
      accentColor: "#facc15",
      surfaceBrightness: "dark",
      density: "spacious",
      motionCadence: "subtle",
      sectionOrder: ["hero", "projects", "experience", "skills", "contact"],
      borderStyle: "rounded",
    });
  }

  if (lowerUrl.includes("himanshu") || lowerSnippet.includes("himanshu") || lowerSnippet.includes("deep forest") || lowerSnippet.includes("visual storytelling")) {
    return StyleProfileSchema.parse({
      detectedMood: "bold",
      layoutPattern: "himanshu-studio",
      fontCategory: "editorial-serif",
      dominantColors: ["#021a13", "#06392b", "#FAF8F5", "#0c4d3b"],
      accentColor: "#c6d457",
      surfaceBrightness: "dark",
      density: "comfortable",
      motionCadence: "expressive",
      sectionOrder: ["hero", "projects", "experience", "skills", "contact"],
      borderStyle: "rounded",
    });
  }

  if (lowerUrl.includes("tanuja") || lowerSnippet.includes("tanuja") || lowerSnippet.includes("enterprise product")) {
    return StyleProfileSchema.parse({
      detectedMood: "formal",
      layoutPattern: "tanuja-product",
      fontCategory: "modern-grotesk",
      dominantColors: ["#F8FAFC", "#FFFFFF", "#0F172A", "#E2E8F0"],
      accentColor: "#2563EB",
      surfaceBrightness: "light",
      density: "comfortable",
      motionCadence: "subtle",
      sectionOrder: ["hero", "projects", "experience", "skills", "contact"],
      borderStyle: "rounded",
    });
  }

  if (lowerUrl.includes("sudar") || lowerSnippet.includes("sudar") || lowerSnippet.includes("telemetry") || lowerSnippet.includes("obsidian")) {
    return StyleProfileSchema.parse({
      detectedMood: "bold",
      layoutPattern: "wall-showcase",
      fontCategory: "modern-grotesk",
      dominantColors: ["#0c0d0e", "#16181a", "#F8FAFC", "#232629"],
      accentColor: "#10B981",
      surfaceBrightness: "dark",
      density: "comfortable",
      motionCadence: "subtle",
      sectionOrder: ["hero", "projects", "experience", "skills", "contact"],
      borderStyle: "rounded",
    });
  }

  // 2. Detect Surface Brightness from HTML / CSS
  let surfaceBrightness: "dark" | "light" | "neutral" = "neutral";
  const darkIndicators = ["bg-[#0", "bg-black", "bg-slate-9", "bg-gray-9", "background:#0", "background: #0", "background-color: #0", "dark:", "color-scheme: dark"];
  const lightIndicators = ["bg-white", "bg-[#fff", "background:#fff", "background: #fff", "background: #faf", "bg-[#faf", "color-scheme: light"];

  const darkScore = darkIndicators.filter((term) => lowerSnippet.includes(term)).length;
  const lightScore = lightIndicators.filter((term) => lowerSnippet.includes(term)).length;

  if (darkScore > lightScore || lowerUrl.includes("dark") || lowerUrl.includes("night")) {
    surfaceBrightness = "dark";
  } else if (lightScore > 0 || lowerUrl.includes("light") || lowerUrl.includes("clean")) {
    surfaceBrightness = "light";
  } else {
    surfaceBrightness = "dark"; // Default to modern dark aesthetic
  }

  // 3. Detect Typography Category
  let fontCategory: AbstractFontCategory = "geometric-sans";
  if (
    lowerSnippet.includes("serif") ||
    lowerSnippet.includes("playfair") ||
    lowerSnippet.includes("georgia") ||
    lowerSnippet.includes("merriweather") ||
    lowerSnippet.includes("times") ||
    lowerUrl.includes("editorial")
  ) {
    fontCategory = "editorial-serif";
  } else if (
    lowerSnippet.includes("mono") ||
    lowerSnippet.includes("consolas") ||
    lowerSnippet.includes("menlo") ||
    lowerSnippet.includes("courier") ||
    lowerSnippet.includes("jetbrains") ||
    lowerUrl.includes("terminal") ||
    lowerUrl.includes("dev")
  ) {
    fontCategory = "monospace-code";
  } else if (
    lowerSnippet.includes("grotesk") ||
    lowerSnippet.includes("syne") ||
    lowerSnippet.includes("impact") ||
    lowerSnippet.includes("clash")
  ) {
    fontCategory = "modern-grotesk";
  } else {
    fontCategory = "geometric-sans";
  }

  // 4. Extract Real Hex Colors from Snippet
  const hexMatches = htmlSnippet.match(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g) || [];
  const uniqueHex = Array.from(new Set(hexMatches.map((h) => h.toUpperCase())));

  // 5. Detect Layout Pattern & Mood
  let layoutPattern: AbstractLayoutPattern = "wall-showcase";
  let detectedMood: "calm" | "bold" | "playful" | "formal" = "bold";

  if (fontCategory === "monospace-code" || lowerSnippet.includes("terminal") || lowerSnippet.includes("bash")) {
    layoutPattern = "terminal-grid";
    detectedMood = "formal";
  } else if (lowerSnippet.includes("craft") || lowerSnippet.includes("desk") || lowerSnippet.includes("architect")) {
    layoutPattern = "craft-desk";
    detectedMood = "calm";
  } else if (lowerSnippet.includes("story") || lowerSnippet.includes("visual") || lowerSnippet.includes("art director")) {
    layoutPattern = "himanshu-studio";
    detectedMood = "bold";
  } else if (surfaceBrightness === "light" && (lowerSnippet.includes("product") || lowerSnippet.includes("enterprise") || lowerSnippet.includes("case study"))) {
    layoutPattern = "tanuja-product";
    detectedMood = "formal";
  } else if (fontCategory === "editorial-serif" || lowerSnippet.includes("editorial") || lowerSnippet.includes("luxury")) {
    layoutPattern = "luxe-creative";
    detectedMood = "calm";
  } else if (lowerSnippet.includes("college") || lowerSnippet.includes("poster") || lowerSnippet.includes("brutalist")) {
    layoutPattern = "not-your-college";
    detectedMood = "bold";
  } else if (surfaceBrightness === "dark") {
    layoutPattern = "wall-showcase";
    detectedMood = "bold";
  } else {
    layoutPattern = "tanuja-product";
    detectedMood = "formal";
  }

  // 6. Synthesize Dominant & Accent Colors
  let dominantColors: string[] = [];
  let accentColor = "#10B981";

  if (layoutPattern === "craft-desk") {
    dominantColors = ["#095848", "#FAF7F0", "#1c1917", "#e7e5e4"];
    accentColor = "#facc15";
  } else if (layoutPattern === "himanshu-studio") {
    dominantColors = ["#021a13", "#06392b", "#FAF8F5", "#0c4d3b"];
    accentColor = "#c6d457";
  } else if (layoutPattern === "tanuja-product") {
    dominantColors = ["#F8FAFC", "#FFFFFF", "#0F172A", "#E2E8F0"];
    accentColor = "#2563EB";
  } else if (layoutPattern === "luxe-creative") {
    dominantColors = ["#FAF8F5", "#F4F1EA", "#18181B", "#E4E1D9"];
    accentColor = "#D97706";
  } else if (layoutPattern === "not-your-college") {
    dominantColors = ["#000000", "#111111", "#FFFFFF", "#262626"];
    accentColor = "#E11D48";
  } else if (layoutPattern === "terminal-grid") {
    dominantColors = ["#0D1117", "#161B22", "#E6EDF3", "#30363D"];
    accentColor = "#2EA043";
  } else {
    // Obsidian Wall Showcase standard
    dominantColors = ["#0c0d0e", "#16181a", "#F8FAFC", "#232629"];
    accentColor = uniqueHex.find((h) => !["#000000", "#FFFFFF", "#0C0D0E", "#16181A"].includes(h)) || "#10B981";
  }

  const profile: StyleProfile = {
    detectedMood,
    layoutPattern,
    fontCategory,
    dominantColors,
    accentColor,
    surfaceBrightness,
    density: layoutPattern === "terminal-grid" ? "compact" : layoutPattern === "luxe-creative" ? "spacious" : "comfortable",
    motionCadence: layoutPattern === "himanshu-studio" || layoutPattern === "not-your-college" ? "expressive" : "subtle",
    sectionOrder: ["hero", "projects", "experience", "skills", "contact"],
    borderStyle: layoutPattern === "not-your-college" ? "heavy" : "rounded",
  };

  return StyleProfileSchema.parse(profile);
}
