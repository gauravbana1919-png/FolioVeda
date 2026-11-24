import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const checkHandle = url.searchParams.get('check');
    const requestedUsername = url.searchParams.get('username') || url.searchParams.get('name');

    // Handle check availability endpoint
    if (checkHandle) {
      const normalized = checkHandle.trim().toLowerCase();
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { name: { equals: normalized } },
            { name: { equals: checkHandle.trim() } },
          ],
        },
      });

      return NextResponse.json({
        available: !existingUser,
        handle: normalized,
        reserved: ["admin", "api", "dashboard", "styles", "hub", "onboarding"].includes(normalized),
      });
    }

    let session = null;
    try {
      session = await getServerSession(authOptions);
    } catch {
      // Unit test or non-request scope
    }

    let user = null;

    // 1. If explicit username/name query param is provided, prioritize it
    if (requestedUsername) {
      const allUsers = await prisma.user.findMany({
        orderBy: { id: "desc" },
        include: {
          profile: true,
          portfolio: true,
          projects: true,
        },
      });
      const reqNorm = requestedUsername.toLowerCase().replace(/[^a-z0-9]/g, "");
      user = allUsers.find((u) => {
        if (!u.name) return false;
        const uNorm = u.name.toLowerCase().replace(/[^a-z0-9]/g, "");
        return uNorm === reqNorm || uNorm.includes(reqNorm) || reqNorm.includes(uNorm);
      }) || null;
    }

    // 2. If not found by query param, check authenticated session
    if (!user && session?.user?.email) {
      user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
          profile: true,
          portfolio: true,
          projects: true,
        },
      });
    }

    // 3. Fallback: Find the latest active user in the database
    if (!user) {
      user = await prisma.user.findFirst({
        where: {
          profile: { isNot: null },
        },
        orderBy: { id: 'desc' },
        include: {
          profile: true,
          portfolio: true,
          projects: true,
        },
      });
    }

    // 4. If no users exist at all in DB, return initial seed
    if (!user) {
      return NextResponse.json({
        isMock: true,
        user: {
          name: "Alex Developer",
          profile: {
            bio: "I turn complex problems into elegant, highly performant software. Passionate about Next.js, TypeScript, and developer tooling.",
            skills: "React, Next.js, TypeScript, Tailwind CSS, Node.js, Prisma, SQLite",
          },
          portfolio: {
            templateId: "sudarvel",
            themePackageId: "sudarvel",
            theme: "dark",
            designPrefs: JSON.stringify({ accentColor: "emerald" }),
          },
          projects: [
            {
              title: "Distributed Edge Cache",
              description: "Zero-copy caching daemon in Rust with automated replica failover.",
              techStack: "Rust, Redis, Docker",
              liveUrl: "https://github.com",
              githubUrl: "https://github.com",
            },
          ],
        },
      });
    }

    return NextResponse.json({
      isMock: false,
      user: {
        id: user.id,
        name: user.name || "Portfolio Owner",
        email: user.email,
        profile: user.profile || {
          bio: "Welcome to my verified portfolio!",
          skills: "Full-Stack Development, React, Node.js",
        },
        portfolio: user.portfolio || {
          templateId: "sudarvel",
          themePackageId: "sudarvel",
          theme: "system",
          designPrefs: JSON.stringify({ accentColor: "emerald" }),
        },
        projects: user.projects || [],
      },
    });
  } catch (error: any) {
    console.error('Portfolio GET Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch portfolio' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    let session = null;
    try {
      session = await getServerSession(authOptions);
    } catch {
      // Unit test or non-request scope
    }
    const body = await req.json();
    const {
      name,
      bio,
      skills,
      headline,
      location,
      experience,
      education,
      certifications,
      projects,
      socials,
      templateId,
      themeId,
      theme,
      accentColor,
      fontFamily,
    } = body;

    let user = null;
    if (session?.user?.email) {
      user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
    }

    if (!user) {
      // Find or create user by name so live portfolio URL works immediately in development & onboarding
      const targetName = name || "Alex Developer";
      user = await prisma.user.findFirst({
        where: { name: targetName },
        orderBy: { id: "desc" },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            name: targetName,
            email: `${targetName.toLowerCase().replace(/[^a-z0-9]/g, '')}_${Date.now()}@folioveda.local`,
          },
        });
      }
    }

    if (!user) {
      return NextResponse.json({ error: 'User could not be initialized' }, { status: 500 });
    }

    // Update user name if changed
    if (name && user.name !== name) {
      await prisma.user.update({
        where: { id: user.id },
        data: { name },
      });
    }

    // Format fields for SQLite
    const formattedSkills = typeof skills === 'string' ? skills : Array.isArray(skills) ? skills.join(', ') : undefined;
    const formattedExperience = typeof experience === 'string' ? experience : experience ? JSON.stringify(experience) : undefined;
    const formattedEducation = typeof education === 'string' ? education : education ? JSON.stringify(education) : undefined;
    const formattedCertifications = typeof certifications === 'string' ? certifications : certifications ? JSON.stringify(certifications) : undefined;
    const formattedSocials = typeof socials === 'string' ? socials : socials ? JSON.stringify(socials) : undefined;

    // Update or create Profile
    await prisma.profile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        bio: bio || null,
        headline: headline || null,
        location: location || null,
        skills: formattedSkills || null,
        experience: formattedExperience || null,
        education: formattedEducation || null,
        certifications: formattedCertifications || null,
        socials: formattedSocials || null,
      },
      update: {
        ...(bio !== undefined && { bio }),
        ...(headline !== undefined && { headline }),
        ...(location !== undefined && { location }),
        ...(formattedSkills !== undefined && { skills: formattedSkills }),
        ...(formattedExperience !== undefined && { experience: formattedExperience }),
        ...(formattedEducation !== undefined && { education: formattedEducation }),
        ...(formattedCertifications !== undefined && { certifications: formattedCertifications }),
        ...(formattedSocials !== undefined && { socials: formattedSocials }),
      },
    });

    // Update projects if provided
    if (Array.isArray(projects) && projects.length > 0) {
      await prisma.project.deleteMany({ where: { userId: user.id } });
      await prisma.project.createMany({
        data: projects.map((p: any, idx: number) => ({
          userId: user.id,
          repoName: p.repoName || p.title?.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 40) || `project-${idx + 1}`,
          title: p.title || `Project ${idx + 1}`,
          description: p.description || "",
          techStack: Array.isArray(p.techStack) ? p.techStack.join(", ") : (p.techStack || ""),
          githubUrl: p.githubUrl || "https://github.com",
          liveUrl: p.liveUrl || null,
          isPinned: p.featured ?? idx < 2,
        })),
      });
    }

    // Update or create Portfolio with themePackageId & designPrefs
    const finalTemplateId = themeId || templateId || "sudarvel";
    const existingPortfolio = await prisma.portfolio.findUnique({ where: { userId: user.id } });
    let existingPrefs: any = {};
    if (existingPortfolio?.designPrefs) {
      try {
        existingPrefs = JSON.parse(existingPortfolio.designPrefs);
      } catch {}
    }
    const finalDesignPrefs = JSON.stringify({
      accentColor: accentColor || existingPrefs.accentColor || "emerald",
      fontFamily: fontFamily || existingPrefs.fontFamily || "sans",
    });

    await prisma.portfolio.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        templateId: finalTemplateId,
        themePackageId: finalTemplateId,
        theme: theme || "system",
        designPrefs: finalDesignPrefs,
      },
      update: {
        templateId: finalTemplateId,
        themePackageId: finalTemplateId,
        ...(theme && { theme }),
        designPrefs: finalDesignPrefs,
      },
    });

    const publicSlug = encodeURIComponent(user.name || "alex");

    return NextResponse.json({
      success: true,
      liveUrl: `/p/${publicSlug}`,
      templateId: finalTemplateId,
      message: "Portfolio successfully forged and live!",
    });
  } catch (error: any) {
    console.error('Portfolio POST Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to save portfolio' }, { status: 500 });
  }
}
