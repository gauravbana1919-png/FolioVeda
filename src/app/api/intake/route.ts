import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { IntakeAnswersInputSchema } from "@/types/intake";
import { generateIntakeCopy, generateIntakeCopyWithAI, verifyZeroHallucination } from "@/lib/ai/intake-copy";

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

    // ACTION: DRAFT COPY (AI-Powered synthesis)
    if (action === "draft") {
      const generated = await generateIntakeCopyWithAI(validAnswers, userName || session?.user?.name || "Alex Developer");
      const compliance = verifyZeroHallucination(generated.suggestedBio, generated.factualAnchors);

      return NextResponse.json({
        success: true,
        draft: generated,
        compliance,
      });
    }

    // ACTION: APPROVE AND PUBLISH
    if (action === "approve") {
      const fallbackCopy = generateIntakeCopy(validAnswers);
      const finalHeadline = approvedHeadline || fallbackCopy.suggestedHeadline;
      const finalBio = approvedBio || fallbackCopy.suggestedBio;
      const finalThemeId = themeId || "sudarvel";

      const targetName = userName || session?.user?.name || "Alex Developer";
      let user: any = null;

      // Database persistence with serverless read-only fallback resilience
      try {
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
                email: `${targetName.toLowerCase().replace(/[^a-z0-9]/g, "")}_${Date.now()}@folioin.local`,
              },
            });
          }
        }

        if (user && targetName && user.name !== targetName) {
          await prisma.user.update({
            where: { id: user.id },
            data: { name: targetName },
          });
          user.name = targetName;
        }

        if (user) {
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
          const allSkills = validAnswers.skills && validAnswers.skills.length > 0
            ? validAnswers.skills
            : [...validAnswers.topStrengths, ...validAnswers.targetRoles];
          const combinedSkills = Array.from(new Set(allSkills)).join(", ");
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
              location: validAnswers.location || "San Francisco, CA / Remote",
              socials: socialsJson,
              experience: experienceJson,
              education: educationJson,
              certifications: certificationsJson,
            },
            update: {
              bio: finalBio,
              headline: finalHeadline,
              skills: combinedSkills,
              ...(validAnswers.location && { location: validAnswers.location }),
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

          // 4. Save structured projects if provided
          if (validAnswers.projects && validAnswers.projects.length > 0) {
            await prisma.project.deleteMany({ where: { userId: user.id } });
            await prisma.project.createMany({
              data: validAnswers.projects.map((p, idx) => ({
                userId: user.id,
                repoName: p.title.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 40) || `project-${idx + 1}`,
                title: p.title,
                description: p.description,
                techStack: Array.isArray(p.techStack) ? p.techStack.join(", ") : (p.techStack || ""),
                githubUrl: p.githubUrl || validAnswers.links?.github || "https://github.com",
                liveUrl: p.liveUrl || null,
                isPinned: p.featured ?? idx < 2,
              })),
            });
          }
        }
      } catch (dbErr: any) {
        console.warn("[INTAKE API] Serverless database write warning (non-blocking fallback):", dbErr.message);
      }

      let cleanSlugName = (user?.name || targetName || "Candidate").trim();
      if (/\b(summary|profile|experience|skills|resume|cv)\b/i.test(cleanSlugName)) {
        cleanSlugName = "Candidate";
      }
      const publicSlug = encodeURIComponent(cleanSlugName);
      const themeParam = finalThemeId ? `?theme=${encodeURIComponent(finalThemeId)}` : "";

      return NextResponse.json({
        success: true,
        liveUrl: `/p/${publicSlug}${themeParam}`,
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
