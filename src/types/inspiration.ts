import { z } from "zod";
import { ThemePackageSchema } from "./theme";

export const AbstractFontCategorySchema = z.enum([
  "modern-grotesk",
  "classic-serif",
  "editorial-serif",
  "monospace-code",
  "geometric-sans",
  "expressive-display",
]);

export const AbstractLayoutPatternSchema = z.enum([
  "craft-desk",
  "wall-showcase",
  "himanshu-studio",
  "tanuja-product",
  "split-hero",
  "centered-editorial",
  "terminal-grid",
  "masonry",
  "poster",
  "case-study",
  "dark-showcase",
  "playful-sticker",
  "luxe-creative",
  "not-your-college",
]);

export const StyleProfileSchema = z.object({
  detectedMood: z.enum(["calm", "bold", "playful", "formal"]),
  layoutPattern: AbstractLayoutPatternSchema,
  fontCategory: AbstractFontCategorySchema,
  dominantColors: z.array(z.string()).min(2).max(6),
  accentColor: z.string(),
  surfaceBrightness: z.enum(["dark", "light", "neutral"]),
  density: z.enum(["compact", "comfortable", "spacious"]),
  motionCadence: z.enum(["none", "subtle", "expressive"]),
  sectionOrder: z.array(z.enum(["hero", "projects", "experience", "skills", "contact"])),
  borderStyle: z.enum(["none", "subtle", "heavy", "rounded"]),
});

export const ClosenessLevelSchema = z.enum(["loose", "medium", "close"]);

export const InspirationAnalyzeInputSchema = z.object({
  url: z.string().url("Please provide a valid URL"),
  userConsent: z.literal(true, {
    message: "You must confirm you are using this solely as inspiration",
  }),
});

export const InspirationGenerateInputSchema = z.object({
  requestId: z.string(),
  closeness: ClosenessLevelSchema.default("medium"),
});

export const SimilarityResultSchema = z.object({
  overallScore: z.number().min(0).max(1), // 0.0 (totally different) to 1.0 (identical)
  colorDistance: z.number(),
  layoutDistance: z.number(),
  typographyDistance: z.number(),
  isSafe: z.boolean(),
  adjustmentApplied: z.boolean(),
  reason: z.string().optional(),
});

export const TakedownReportInputSchema = z.object({
  reportedUrl: z.string().url("Valid URL required"),
  reporterEmail: z.string().email("Valid contact email required"),
  reason: z.string().min(10, "Please explain the reason for your report in detail"),
});

export type AbstractFontCategory = z.infer<typeof AbstractFontCategorySchema>;
export type AbstractLayoutPattern = z.infer<typeof AbstractLayoutPatternSchema>;
export type StyleProfile = z.infer<typeof StyleProfileSchema>;
export type ClosenessLevel = z.infer<typeof ClosenessLevelSchema>;
export type InspirationAnalyzeInput = z.infer<typeof InspirationAnalyzeInputSchema>;
export type InspirationGenerateInput = z.infer<typeof InspirationGenerateInputSchema>;
export type SimilarityResult = z.infer<typeof SimilarityResultSchema>;
export type TakedownReportInput = z.infer<typeof TakedownReportInputSchema>;
