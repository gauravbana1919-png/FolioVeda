import { z } from "zod";

export const PortfolioProjectSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  techStack: z.array(z.string()).default([]),
  liveUrl: z.string().optional().nullable(),
  githubUrl: z.string().optional().nullable(),
  featured: z.boolean().default(false),
  metrics: z.string().optional().nullable(),
});

export const PortfolioExperienceSchema = z.object({
  role: z.string().min(1),
  company: z.string().min(1),
  period: z.string(),
  highlights: z.array(z.string()).default([]),
});

export const PortfolioContactSchema = z.object({
  email: z.string().email().optional().nullable().or(z.literal("")),
  github: z.string().optional().nullable().or(z.literal("")),
  linkedin: z.string().optional().nullable().or(z.literal("")),
  twitter: z.string().optional().nullable().or(z.literal("")),
  website: z.string().optional().nullable().or(z.literal("")),
});

export const PortfolioContentSchema = z.object({
  name: z.string().min(1),
  headline: z.string().default("Software Engineer & Creator"),
  bio: z.string().default(""),
  avatarUrl: z.string().optional().nullable(),
  skills: z.array(z.string()).default([]),
  projects: z.array(PortfolioProjectSchema).default([]),
  experience: z.array(PortfolioExperienceSchema).default([]),
  contact: PortfolioContactSchema.default({}),
});

export type PortfolioProject = z.infer<typeof PortfolioProjectSchema>;
export type PortfolioExperience = z.infer<typeof PortfolioExperienceSchema>;
export type PortfolioContact = z.infer<typeof PortfolioContactSchema>;
export type PortfolioContent = z.infer<typeof PortfolioContentSchema>;
