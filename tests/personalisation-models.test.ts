import { describe, it, expect } from 'vitest';
import { ThemePackageSchema } from '@/types/theme';
import { IntakeAnswersInputSchema, IntakeAnswersSchema } from '@/types/intake';
import { StyleProfileSchema, InspirationAnalyzeInputSchema, SimilarityResultSchema } from '@/types/inspiration';

describe('Stage 1: Portfolio Personalisation Data Models & Schemas', () => {
  describe('ThemePackage Schema', () => {
    it('validates a complete ThemePackage object', () => {
      const validTheme = {
        id: 'theme-minimal-editorial',
        name: 'Minimal Editorial',
        category: 'design',
        mood: 'calm',
        tokens: {
          colors: {
            bg: '#FDFCF7',
            surface: '#FFFFFF',
            text: '#111111',
            textMuted: '#666666',
            border: '#E5E5E0',
            accent: '#10B981',
            accentHover: '#059669',
          },
          typography: {
            headingFont: 'Playfair Display, serif',
            bodyFont: 'Inter, sans-serif',
            monoFont: 'JetBrains Mono, monospace',
            headingWeight: '700',
            bodyWeight: '400',
            scaleRatio: 1.33,
          },
          spacing: {
            density: 'spacious',
            sectionPadding: 'py-24',
            cardGap: 'gap-8',
          },
          motion: {
            level: 'subtle',
          },
          radii: {
            card: 'rounded-none',
            button: 'rounded-full',
            badge: 'rounded-sm',
          },
        },
        layout: {
          pattern: 'centered-editorial',
          sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
          variants: {
            hero: 'editorial',
            projectCard: 'minimal',
            nav: 'clean',
            footer: 'simple',
          },
        },
        isSystem: true,
      };

      const result = ThemePackageSchema.safeParse(validTheme);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('Minimal Editorial');
        expect(result.data.tokens.spacing.density).toBe('spacious');
      }
    });

    it('rejects invalid layout patterns or missing color tokens', () => {
      const invalidTheme = {
        id: 'bad-theme',
        name: 'Broken',
        category: 'invalid-cat',
        mood: 'calm',
        tokens: {},
        layout: { pattern: 'non-existent' },
      };

      const result = ThemePackageSchema.safeParse(invalidTheme);
      expect(result.success).toBe(false);
    });
  });

  describe('IntakeAnswers Schema', () => {
    it('validates smart profile intake user answers', () => {
      const answers = {
        profileType: 'tech',
        targetGoal: 'job',
        targetRoles: ['Full-Stack Developer', 'DevOps Engineer'],
        topStrengths: ['Next.js Architecture', 'Database Optimization', 'Fast Delivery'],
        tone: 'bold',
        preferredMood: 'bold',
        preferredColors: ['#10B981', '#0F172A'],
        links: {
          github: 'https://github.com/alex-dev',
          linkedin: 'https://linkedin.com/in/alex-dev',
        },
        rawResumeText: 'Experienced with React, Node.js, and Prisma.',
      };

      const result = IntakeAnswersInputSchema.safeParse(answers);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.targetRoles.length).toBe(2);
        expect(result.data.topStrengths.length).toBe(3);
      }
    });

    it('enforces maximum 3 top strengths to ensure focused portfolio copy', () => {
      const tooManyStrengths = {
        profileType: 'tech',
        targetGoal: 'job',
        targetRoles: ['Developer'],
        topStrengths: ['Strength 1', 'Strength 2', 'Strength 3', 'Strength 4'],
        tone: 'formal',
      };

      const result = IntakeAnswersInputSchema.safeParse(tooManyStrengths);
      expect(result.success).toBe(false);
    });
  });

  describe('Inspiration & Similarity Schemas', () => {
    it('requires explicit user confirmation of inspiration-only use', () => {
      const missingConsent = {
        url: 'https://example-portfolio.com',
        userConsent: false,
      };

      const result = InspirationAnalyzeInputSchema.safeParse(missingConsent);
      expect(result.success).toBe(false);

      const withConsent = {
        url: 'https://example-portfolio.com',
        userConsent: true,
      };
      const validResult = InspirationAnalyzeInputSchema.safeParse(withConsent);
      expect(validResult.success).toBe(true);
    });

    it('validates abstract StyleProfile extraction schema', () => {
      const profile = {
        detectedMood: 'formal',
        layoutPattern: 'split-hero',
        fontCategory: 'modern-grotesk',
        dominantColors: ['#0A0A0A', '#FFFFFF', '#3B82F6'],
        accentColor: '#3B82F6',
        surfaceBrightness: 'dark',
        density: 'comfortable',
        motionCadence: 'subtle',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        borderStyle: 'subtle',
      };

      const result = StyleProfileSchema.safeParse(profile);
      expect(result.success).toBe(true);
    });

    it('validates SimilarityResult payload', () => {
      const sim = {
        overallScore: 0.42,
        colorDistance: 0.55,
        layoutDistance: 0.38,
        typographyDistance: 0.33,
        isSafe: true,
        adjustmentApplied: false,
        reason: 'Within originality margin',
      };

      const result = SimilarityResultSchema.safeParse(sim);
      expect(result.success).toBe(true);
    });
  });
});
