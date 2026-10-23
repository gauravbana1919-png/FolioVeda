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

    // 1. If authenticated via session, find by email
    if (session?.user?.email) {
      user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
          profile: true,
          portfolio: true,
          projects: true,
        },
      });
    }

    // 2. If requested by username/name query param
    if (!user && requestedUsername) {
      user = await prisma.user.findFirst({
        where: {
          OR: [
            { name: { equals: requestedUsername } },
            { id: { equals: requestedUsername } },
          ],
        },
        include: {
          profile: true,
          portfolio: true,
          projects: true,
        },
      });
    }

    // 3. Fallback: Find the most recently active user in the database
    if (!user) {
      user = await prisma.user.findFirst({
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
            templateId: "developer-terminal",
            themePackageId: "developer-terminal",
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
          templateId: "developer-terminal",
          themePackageId: "developer-terminal",
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
    const { name, bio, skills, templateId, themeId, theme, accentColor } = body;

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

    // Update or create Profile
    if (bio !== undefined || skills !== undefined) {
      await prisma.profile.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          bio: bio || null,
          skills: typeof skills === 'string' ? skills : Array.isArray(skills) ? skills.join(', ') : null,
        },
        update: {
          ...(bio !== undefined && { bio }),
          ...(skills !== undefined && {
            skills: typeof skills === 'string' ? skills : Array.isArray(skills) ? skills.join(', ') : null,
          }),
        },
      });
    }

    // Update or create Portfolio with themePackageId
    const finalTemplateId = themeId || templateId || "developer-terminal";
    await prisma.portfolio.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        templateId: finalTemplateId,
        themePackageId: finalTemplateId,
        theme: theme || "system",
        designPrefs: JSON.stringify({ accentColor: accentColor || "emerald" }),
      },
      update: {
        templateId: finalTemplateId,
        themePackageId: finalTemplateId,
        ...(theme && { theme }),
        ...(accentColor && {
          designPrefs: JSON.stringify({ accentColor }),
        }),
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
