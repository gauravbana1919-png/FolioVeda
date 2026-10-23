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

export const IntakeAnswersInputSchema = z.object({
  profileType: ProfileTypeSchema,
  targetGoal: TargetGoalSchema,
  targetRoles: z.array(z.string()).min(1, "Please specify at least one target role"),
  topStrengths: z.array(z.string()).min(1).max(3, "Select up to 3 core strengths"),
  tone: ToneOfVoiceSchema,
  preferredMood: PreferredMoodSchema.optional(),
  preferredColors: z.array(z.string()).optional(),
  links: IntakeLinksSchema,
  rawResumeText: z.string().optional(),
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
export type IntakeAnswersInput = z.infer<typeof IntakeAnswersInputSchema>;
export type IntakeAnswers = z.infer<typeof IntakeAnswersSchema>;
