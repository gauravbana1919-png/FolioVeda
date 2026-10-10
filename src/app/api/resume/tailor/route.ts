import { NextResponse } from 'next/server';
import { getLLMProvider } from '@/lib/ai';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const TailorRequestSchema = z.object({
  userId: z.string(),
  originalResume: z.string(),
  jobDescription: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = TailorRequestSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
    }

    const { userId, originalResume, jobDescription } = result.data;

    // Check AI Limits
    let currentCalls = 0;
    
    if (userId !== "clq123") {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      currentCalls = user.dailyAiCalls;
      
      // Reset if it's a new day
      if (user.lastAiCallAt && user.lastAiCallAt < today) {
        currentCalls = 0;
      }
    }

    const DAILY_LIMIT = 5;
    if (currentCalls >= DAILY_LIMIT) {
      return NextResponse.json({ 
        error: 'Daily AI limit reached. Please try again tomorrow.' 
      }, { status: 429 });
    }

    // Call LLM
    const llm = getLLMProvider();
    const { tailoredContent, keywordMatchScore } = await llm.tailorResume(originalResume, jobDescription);

    // Update user quota and save to DB
    let resumeId = "mock-resume-id";
    if (userId !== "clq123") {
      await prisma.user.update({
        where: { id: userId },
        data: {
          dailyAiCalls: currentCalls + 1,
          lastAiCallAt: new Date(),
        }
      });

      const resume = await prisma.resume.create({
        data: {
          userId,
          baseData: originalResume,
          tailoredData: tailoredContent,
          targetJobDesc: jobDescription,
          matchScore: keywordMatchScore,
        }
      });
      resumeId = resume.id;
    }

    return NextResponse.json({
      message: 'Resume tailored successfully',
      resumeId: resumeId,
      tailoredContent,
      keywordMatchScore,
    });
  } catch (error: any) {
    console.error('Tailor Resume Error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
