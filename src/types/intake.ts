import { z } from "zod";

export const ProfileTypeSchema = z.enum(["tech", "designer", "bba", "other"]);
export const TargetGoalSchema = z.enum(["internship", "job", "freelance", "studies"]);
export const ToneOfVoiceSchema = z.enum(["formal", "friendly", "bold"]);
export const PreferredMoodSchema = z.enum(["calm", "bold", "playful", "formal"]);

export const IntakeLinksSchema = z.object({
  github: z.string().optional().nullable().or(z.literal("")),
  linkedin: z.string().optional().nullable().or(z.literal("")),
  behance: z.string().optional().nullable().or(z.literal("")),
  portfolio: z.string().optional().nullable().or(z.literal("")),
  website: z.string().optional().nullable().or(z.literal("")),
  email: z.string().optional().nullable().or(z.literal("")),
  phone: z.string().optional().nullable().or(z.literal("")),
}).optional().nullable();

export const IntakeExperienceSchema = z.object({
  role: z.string(),
  company: z.string(),
  period: z.string().optional().default("Present"),
  location: z.string().optional().nullable(),
  highlights: z.array(z.string()).optional().default([]),
});

export const IntakeEducationSchema = z.object({
  degree: z.string(),
  institution: z.string().optional().default("University"),
  year: z.string().optional().default(""),
  gpa: z.string().optional().nullable(),
  honors: z.string().optional().nullable(),
});

export const IntakeCertificationSchema = z.object({
  name: z.string(),
  issuer: z.string().optional().default("Accredited"),
  year: z.string().optional().default(""),
  status: z.string().optional().nullable(),
});

export const IntakeProjectSchema = z.object({
  title: z.string(),
  description: z.string().optional().default(""),
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
  profileType: ProfileTypeSchema.optional().default("tech"),
  targetGoal: TargetGoalSchema.optional().default("job"),
  targetRoles: z.array(z.string()).optional().default(["Software Professional"]),
  topStrengths: z.array(z.string()).optional().default(["Systems Architecture"]),
  tone: ToneOfVoiceSchema.optional().default("formal"),
  preferredMood: PreferredMoodSchema.optional(),
  preferredColors: z.array(z.string()).optional(),
  links: IntakeLinksSchema,
  rawResumeText: z.string().optional(),
  location: z.string().optional(),
  skills: z.array(z.string()).optional(),
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
