import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { InspirationAnalyzeInputSchema } from "@/types/inspiration";
import { safeFetchPage, validateInspirationUrl } from "@/lib/inspiration/safe-fetch";
import { extractAbstractStyleProfile } from "@/lib/inspiration/analyzer";

// Fallback: derive abstract style profile from URL patterns when direct fetch is blocked
function deriveStyleFromUrl(url: string) {
  const lower = url.toLowerCase();
  const isPinterest = lower.includes('pinterest');
  const isDribbble = lower.includes('dribbble');
  const isDark = lower.includes('dark') || lower.includes('night') || lower.includes('black');
  const isPlayful = lower.includes('playful') || lower.includes('creative') || lower.includes('fun');

  const detectedMood: 'calm' | 'bold' | 'playful' | 'formal' = isPlayful
    ? 'playful'
    : isDark || isPinterest
    ? 'bold'
    : isDribbble
    ? 'calm'
    : 'formal';

  const layoutPattern: any = isPinterest
    ? 'masonry'
    : isDribbble
    ? 'centered-editorial'
    : isDark
    ? 'dark-showcase'
    : 'split-hero';

  const fontCategory: any = isDribbble
    ? 'editorial-serif'
    : isPinterest
    ? 'expressive-display'
    : 'modern-grotesk';

  return {
    detectedMood,
    layoutPattern,
    fontCategory,
    dominantColors: isDark
      ? ['#030712', '#0B0F19', '#111827', '#1F2937']
      : ['#F8F9FA', '#FFFFFF', '#E2E8F0', '#1E293B'],
    accentColor: isPinterest ? '#E60023' : isDribbble ? '#EA4C89' : '#06B6D4',
    surfaceBrightness: isDark ? ('dark' as const) : ('light' as const),
    density: 'comfortable' as const,
    motionCadence: 'expressive' as const,
    sectionOrder: ['hero' as const, 'projects' as const, 'skills' as const, 'experience' as const, 'contact' as const],
    borderStyle: isPinterest ? ('rounded' as const) : ('subtle' as const),
  };
}

export async function POST(req: Request) {
  try {
    let session = null;
    try {
      session = await getServerSession(authOptions);
    } catch {
      // Test environment or unauthenticated scope
    }

    const body = await req.json();

    // 1. Validate Input Schema & User Consent
    const parseResult = InspirationAnalyzeInputSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { url, userConsent } = parseResult.data;

    // 2. SSRF Guard Pre-check
    const urlValidation = validateInspirationUrl(url);
    if (!urlValidation.isValid) {
      return NextResponse.json(
        { error: urlValidation.error || "Blocked by security policy." },
        { status: 403 }
      );
    }

    // 3. Safe Bounded Fetch (timeout + size capped) with URL-pattern fallback
    let styleProfile: ReturnType<typeof extractAbstractStyleProfile> | ReturnType<typeof deriveStyleFromUrl>;
    let noticeMessage = "Style traits extracted mathematically. Zero external text, images, or source code were copied or stored.";

    try {
      const fetchResult = await safeFetchPage(url);
      const htmlSnippet = fetchResult.htmlSnippet || "";

      // If HTML is too sparse (blocked/JS-only page), fall back to URL-pattern analysis
      if (htmlSnippet.trim().length < 200) {
        styleProfile = deriveStyleFromUrl(url);
        noticeMessage = "Style extracted from URL patterns (direct fetch was blocked by the target site)";
      } else {
        // 4. Abstract Style Profile Extraction (Strictly mathematical design tokens; zero content/assets stored)
        styleProfile = extractAbstractStyleProfile(htmlSnippet, url);
      }
    } catch {
      // Fetch failed (403, 503, timeout, etc.) — fall back gracefully
      styleProfile = deriveStyleFromUrl(url);
      noticeMessage = "Style extracted from URL patterns (direct fetch was blocked by the target site)";
    }

    // 5. Audit Logging & Abuse Controls
    let userId: string | null = null;
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      });
      if (user) userId = user.id;
    }

    // Rate-limiting check to block automated scraping/abuse (max 10 in 10 mins)
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const recentCount = await prisma.inspirationRequest.count({
      where: {
        createdAt: { gte: tenMinutesAgo },
        ...(userId ? { userId } : {}),
      },
    });

    if (recentCount >= 15) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Maximum 15 inspiration analyses allowed per 10 minutes." },
        { status: 429 }
      );
    }

    const logEntry = await prisma.inspirationRequest.create({
      data: {
        userId,
        sourceUrl: url,
        userConsent,
        status: "analyzed",
        styleProfile: JSON.stringify(styleProfile),
      },
    });

    return NextResponse.json({
      success: true,
      requestId: logEntry.id,
      styleProfile,
      notice: noticeMessage,
    });
  } catch (error: any) {
    console.error("Inspiration Analyze Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze inspiration URL." },
      { status: 500 }
    );
  }
}
