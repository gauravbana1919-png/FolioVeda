import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { InspirationGenerateInputSchema, StyleProfileSchema } from "@/types/inspiration";
import { generateThemeFromStyleProfile } from "@/lib/inspiration/theme-generator";

export async function POST(req: Request) {
  try {
    let session = null;
    try {
      session = await getServerSession(authOptions);
    } catch {
      // Test environment or unauthenticated scope
    }

    const body = await req.json();
    const parseResult = InspirationGenerateInputSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid generate parameters", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { requestId, closeness } = parseResult.data;

    // Look up inspiration request
    const inspirationReq = await prisma.inspirationRequest.findUnique({
      where: { id: requestId },
    });

    if (!inspirationReq || !inspirationReq.styleProfile) {
      return NextResponse.json(
        { error: "Inspiration request not found or not yet analyzed." },
        { status: 404 }
      );
    }

    const rawProfile = JSON.parse(inspirationReq.styleProfile);
    const validProfile = StyleProfileSchema.parse(rawProfile);

    // Determine user ID
    let userId: string | null = inspirationReq.userId;
    if (!userId && session?.user?.email) {
      const u = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      });
      if (u) userId = u.id;
    }

    // Generate custom ThemePackage with modulated closeness
    const generatedTheme = generateThemeFromStyleProfile(validProfile, closeness, userId);

    // Update InspirationRequest in DB
    await prisma.inspirationRequest.update({
      where: { id: requestId },
      data: {
        status: "generated",
        closeness,
        generatedTheme: JSON.stringify(generatedTheme),
      },
    });

    return NextResponse.json({
      success: true,
      closeness,
      theme: generatedTheme,
      notice: "Original theme package synthesized from abstract traits. Zero proprietary code or assets stored.",
    });
  } catch (error: any) {
    console.error("Inspiration Generate Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate theme from inspiration." },
      { status: 500 }
    );
  }
}
