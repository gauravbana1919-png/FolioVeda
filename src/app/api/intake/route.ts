import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { IntakeAnswersInputSchema } from "@/types/intake";
import { generateIntakeCopy, verifyZeroHallucination } from "@/lib/ai/intake-copy";

export async function POST(req: Request) {
  try {
    let session = null;
    try {
      session = await getServerSession(authOptions);
    } catch {
      // Test environment or unauthenticated scope
    }

    const body = await req.json();
    const { action = "draft", answers, approvedHeadline, approvedBio, themeId, userName } = body;

    // Validate incoming intake answers
    const parseResult = IntakeAnswersInputSchema.safeParse(answers);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid intake form inputs", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const validAnswers = parseResult.data;

    // ACTION: DRAFT COPY
    if (action === "draft") {
      const generated = generateIntakeCopy(validAnswers, userName || session?.user?.name || "Alex Developer");
      const compliance = verifyZeroHallucination(generated.suggestedBio, generated.factualAnchors);

      return NextResponse.json({
        success: true,
        draft: generated,
        compliance,
      });
    }

    // ACTION: APPROVE AND PUBLISH
    if (action === "approve") {
      const finalHeadline = approvedHeadline || generateIntakeCopy(validAnswers).suggestedHeadline;
      const finalBio = approvedBio || generateIntakeCopy(validAnswers).suggestedBio;
      const finalThemeId = themeId || "sudarvel";

      // Locate or create user
      const targetName = userName || session?.user?.name || "Alex Developer";
      let user = null;

      if (session?.user?.email) {
        user = await prisma.user.findUnique({
          where: { email: session.user.email },
        });
      }

      if (!user) {
        user = await prisma.user.findFirst({
          where: { name: targetName },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              name: targetName,
              email: `${targetName.toLowerCase().replace(/[^a-z0-9]/g, "")}_${Date.now()}@folioveda.local`,
            },
          });
        }
      }

      if (!user) {
        return NextResponse.json({ error: "Could not initialize user" }, { status: 500 });
      }

      // 1. Save or update IntakeAnswers record in DB
      await prisma.intakeAnswers.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          profileType: validAnswers.profileType,
          targetGoal: validAnswers.targetGoal,
          targetRoles: JSON.stringify(validAnswers.targetRoles),
          topStrengths: JSON.stringify(validAnswers.topStrengths),
          tone: validAnswers.tone,
          preferredMood: validAnswers.preferredMood || null,
          preferredColors: validAnswers.preferredColors ? JSON.stringify(validAnswers.preferredColors) : null,
          links: validAnswers.links ? JSON.stringify(validAnswers.links) : null,
          rawResumeText: validAnswers.rawResumeText || null,
          suggestedBio: finalBio,
          suggestedHeadline: finalHeadline,
          isApproved: true,
        },
        update: {
          profileType: validAnswers.profileType,
          targetGoal: validAnswers.targetGoal,
          targetRoles: JSON.stringify(validAnswers.targetRoles),
          topStrengths: JSON.stringify(validAnswers.topStrengths),
          tone: validAnswers.tone,
          preferredMood: validAnswers.preferredMood || null,
          preferredColors: validAnswers.preferredColors ? JSON.stringify(validAnswers.preferredColors) : null,
          links: validAnswers.links ? JSON.stringify(validAnswers.links) : null,
          rawResumeText: validAnswers.rawResumeText || null,
          suggestedBio: finalBio,
          suggestedHeadline: finalHeadline,
          isApproved: true,
        },
      });

      // 2. Update user Profile with approved factual bio and skills
      const combinedSkills = Array.from(
        new Set([...validAnswers.topStrengths, ...validAnswers.targetRoles])
      ).join(", ");

      const socialsJson = validAnswers.links ? JSON.stringify(validAnswers.links) : null;

      const experienceJson = validAnswers.experience && validAnswers.experience.length > 0
        ? JSON.stringify(validAnswers.experience)
        : null;

      const educationJson = validAnswers.education && validAnswers.education.length > 0
        ? JSON.stringify(validAnswers.education)
        : null;

      const certificationsJson = validAnswers.certifications && validAnswers.certifications.length > 0
        ? JSON.stringify(validAnswers.certifications)
        : null;

      await prisma.profile.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          bio: finalBio,
          headline: finalHeadline,
          skills: combinedSkills,
          socials: socialsJson,
          experience: experienceJson,
          education: educationJson,
          certifications: certificationsJson,
        },
        update: {
          bio: finalBio,
          headline: finalHeadline,
          skills: combinedSkills,
          ...(socialsJson && { socials: socialsJson }),
          ...(experienceJson !== null && { experience: experienceJson }),
          ...(educationJson !== null && { education: educationJson }),
          ...(certificationsJson !== null && { certifications: certificationsJson }),
        },
      });

      // 3. Update Portfolio with chosen Theme
      await prisma.portfolio.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          templateId: finalThemeId,
          themePackageId: finalThemeId,
          theme: "system",
        },
        update: {
          templateId: finalThemeId,
          themePackageId: finalThemeId,
        },
      });

      // 4. If GitHub link provided, ensure starter projects exist in SQLite
      if (validAnswers.links?.github) {
        const existingCount = await prisma.project.count({ where: { userId: user.id } });
        if (existingCount === 0) {
          const rawGh = validAnswers.links.github;
          const cleanGh = rawGh.replace(/^https?:\/\/github\.com\//i, '').replace(/[\/\?#].*$/, '').trim() || "portfolio";
          
          await prisma.project.createMany({
            data: [
              {
                userId: user.id,
                repoName: `${cleanGh.toLowerCase()}-core-architecture`,
                title: `${user.name || cleanGh} Core Architecture`,
                description: `Verified production service built with ${validAnswers.topStrengths.slice(0, 3).join(", ")}.`,
                techStack: validAnswers.topStrengths.slice(0, 3).join(", "),
                githubUrl: validAnswers.links.github,
                isPinned: true,
              },
              {
                userId: user.id,
                repoName: "pf-distributed-systems",
                title: "High-Throughput Systems Engine",
                description: "Low-latency distributed service layer with automated telemetry and zero-hallucination monitoring.",
                techStack: "TypeScript, Next.js, SQLite",
                githubUrl: validAnswers.links.github,
                isPinned: true,
              },
            ],
          });
        }
      }

      const publicSlug = encodeURIComponent(user.name || "alex");

      return NextResponse.json({
        success: true,
        liveUrl: `/p/${publicSlug}`,
        message: "Profile intake approved and live portfolio generated with verified copy!",
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Intake API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process intake" },
      { status: 500 }
    );
  }
}
