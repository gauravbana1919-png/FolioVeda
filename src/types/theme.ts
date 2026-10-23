import { z } from "zod";

export const ThemeColorsSchema = z.object({
  bg: z.string(),
  surface: z.string(),
  text: z.string(),
  textMuted: z.string(),
  border: z.string(),
  accent: z.string(),
  accentHover: z.string(),
});

export const ThemeTypographySchema = z.object({
  headingFont: z.string(),
  bodyFont: z.string(),
  monoFont: z.string().default("JetBrains Mono, monospace"),
  headingWeight: z.string().default("700"),
  bodyWeight: z.string().default("400"),
  scaleRatio: z.number().default(1.25),
});

export const ThemeSpacingSchema = z.object({
  density: z.enum(["compact", "comfortable", "spacious"]),
  sectionPadding: z.string(),
  cardGap: z.string(),
});

export const ThemeMotionSchema = z.object({
  level: z.enum(["none", "subtle", "expressive"]),
});

export const ThemeRadiiSchema = z.object({
  card: z.string(),
  button: z.string(),
  badge: z.string(),
});

export const ThemeTokensSchema = z.object({
  colors: ThemeColorsSchema,
  typography: ThemeTypographySchema,
  spacing: ThemeSpacingSchema,
  motion: ThemeMotionSchema,
  radii: ThemeRadiiSchema,
});

export const ThemeLayoutPatternSchema = z.enum([
  "split-hero",
  "centered-editorial",
  "terminal-grid",
  "masonry",
  "poster",
  "case-study",
  "dark-showcase",
  "playful-sticker",
]);

export const ThemeSectionNameSchema = z.enum([
  "hero",
  "projects",
  "experience",
  "skills",
  "contact",
]);

export const ThemeLayoutVariantsSchema = z.object({
  hero: z.string().default("default"),
  projectCard: z.string().default("default"),
  nav: z.string().default("default"),
  footer: z.string().default("default"),
});

export const ThemeLayoutSchema = z.object({
  pattern: ThemeLayoutPatternSchema,
  sectionOrder: z.array(ThemeSectionNameSchema),
  variants: ThemeLayoutVariantsSchema,
});

export const ThemePackageSchema = z.object({
  id: z.string(),
  userId: z.string().nullable().optional(),
  name: z.string().min(1),
  category: z.enum(["tech", "design", "business", "creative"]),
  mood: z.enum(["calm", "bold", "playful", "formal"]),
  previewImage: z.string().optional(),
  pinterestUrl: z.string().optional(),
  inspirationTitle: z.string().optional(),
  tokens: ThemeTokensSchema,
  layout: ThemeLayoutSchema,
  isSystem: z.boolean().default(false),
  createdAt: z.string().or(z.date()).optional(),
  updatedAt: z.string().or(z.date()).optional(),
});

export type ThemeColors = z.infer<typeof ThemeColorsSchema>;
export type ThemeTypography = z.infer<typeof ThemeTypographySchema>;
export type ThemeSpacing = z.infer<typeof ThemeSpacingSchema>;
export type ThemeMotion = z.infer<typeof ThemeMotionSchema>;
export type ThemeRadii = z.infer<typeof ThemeRadiiSchema>;
export type ThemeTokens = z.infer<typeof ThemeTokensSchema>;
export type ThemeLayoutPattern = z.infer<typeof ThemeLayoutPatternSchema>;
export type ThemeSectionName = z.infer<typeof ThemeSectionNameSchema>;
export type ThemeLayout = z.infer<typeof ThemeLayoutSchema>;
export type ThemePackage = z.infer<typeof ThemePackageSchema>;
