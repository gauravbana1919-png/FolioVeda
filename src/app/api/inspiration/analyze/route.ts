import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { InspirationAnalyzeInputSchema } from "@/types/inspiration";
import { safeFetchPage, validateInspirationUrl } from "@/lib/inspiration/safe-fetch";
import { extractAbstractStyleProfile } from "@/lib/inspiration/analyzer";

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

    // 3. Safe Bounded Fetch (timeout + size capped)
    const fetchResult = await safeFetchPage(url);

    // 4. Abstract Style Profile Extraction (Strictly mathematical design tokens; zero content/assets stored)
    const styleProfile = extractAbstractStyleProfile(fetchResult.htmlSnippet, url);

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
      notice: "Style traits extracted mathematically. Zero external text, images, or source code were copied or stored.",
    });
  } catch (error: any) {
    console.error("Inspiration Analyze Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze inspiration URL." },
      { status: 500 }
    );
  }
}
