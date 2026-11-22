import { z } from "zod";

export const ProfileTypeSchema = z.enum(["tech", "designer", "bba", "other"]);
export const TargetGoalSchema = z.enum(["internship", "job", "freelance", "studies"]);
export const ToneOfVoiceSchema = z.enum(["formal", "friendly", "bold"]);
export const PreferredMoodSchema = z.enum(["calm", "bold", "playful", "formal"]);

export const IntakeLinksSchema = z.object({
  github: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  behance: z.string().url().optional().or(z.literal("")),
  portfolio: z.string().url().optional().or(z.literal("")),
}).optional();

export const IntakeExperienceSchema = z.object({
  role: z.string(),
  company: z.string(),
  period: z.string(),
  location: z.string().optional(),
  highlights: z.array(z.string()).default([]),
});

export const IntakeEducationSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  year: z.string(),
  gpa: z.string().optional(),
  honors: z.string().optional(),
});

export const IntakeCertificationSchema = z.object({
  name: z.string(),
  issuer: z.string(),
  year: z.string(),
});

export const IntakeProjectSchema = z.object({
  title: z.string(),
  description: z.string().default(""),
  techStack: z.array(z.string()).or(z.string()).optional().default([]),
  liveUrl: z.string().optional().nullable(),
  githubUrl: z.string().optional().nullable(),
  featured: z.boolean().optional().default(false),
  metrics: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  impact: z.string().optional().nullable(),
  problem: z.string().optional().nullable(),
  solution: z.string().optional().nullable(),
});

export const IntakeAnswersInputSchema = z.object({
  profileType: ProfileTypeSchema,
  targetGoal: TargetGoalSchema,
  targetRoles: z.array(z.string()).min(1, "Please specify at least one target role"),
  topStrengths: z.array(z.string()).min(1, "Select at least 1 core strength"),
  tone: ToneOfVoiceSchema,
  preferredMood: PreferredMoodSchema.optional(),
  preferredColors: z.array(z.string()).optional(),
  links: IntakeLinksSchema,
  rawResumeText: z.string().optional(),
  projects: z.array(IntakeProjectSchema).optional(),
  experience: z.array(IntakeExperienceSchema).optional(),
  education: z.array(IntakeEducationSchema).optional(),
  certifications: z.array(IntakeCertificationSchema).optional(),
});

export const IntakeAnswersSchema = IntakeAnswersInputSchema.extend({
  id: z.string().optional(),
  userId: z.string().optional(),
  suggestedBio: z.string().optional(),
  suggestedHeadline: z.string().optional(),
  isApproved: z.boolean().default(false),
  createdAt: z.string().or(z.date()).optional(),
  updatedAt: z.string().or(z.date()).optional(),
});

export type ProfileType = z.infer<typeof ProfileTypeSchema>;
export type TargetGoal = z.infer<typeof TargetGoalSchema>;
export type ToneOfVoice = z.infer<typeof ToneOfVoiceSchema>;
export type PreferredMood = z.infer<typeof PreferredMoodSchema>;
export type IntakeLinks = z.infer<typeof IntakeLinksSchema>;
export type IntakeExperience = z.infer<typeof IntakeExperienceSchema>;
export type IntakeEducation = z.infer<typeof IntakeEducationSchema>;
export type IntakeCertification = z.infer<typeof IntakeCertificationSchema>;
export type IntakeAnswersInput = z.infer<typeof IntakeAnswersInputSchema>;
export type IntakeAnswers = z.infer<typeof IntakeAnswersSchema>;
