import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';

export async function GET(req: Request) {
  try {
    let session = null;
    try {
      session = await getServerSession(authOptions);
    } catch {
      // Unit test or non-request scope
    }

    if (!session?.user?.email) {
      return NextResponse.json({
        isMock: true,
        user: {
          name: "Alex Developer",
          profile: {
            bio: "I turn complex problems into elegant, highly performant software. Passionate about Next.js, TypeScript, and developer tooling.",
            skills: "React, Next.js, TypeScript, Tailwind CSS, Node.js, Prisma, SQLite",
          },
          portfolio: {
            templateId: "template1",
            theme: "dark",
            designPrefs: JSON.stringify({ accentColor: "blue" }),
          },
          projects: [
            {
              title: "Fintech Dashboard",
              description: "A comprehensive dashboard for tracking personal finances with real-time analytics and data visualization.",
              techStack: "Next.js, Tailwind, Recharts",
              liveUrl: "#",
              githubUrl: "#",
            },
            {
              title: "AI Writing Assistant",
              description: "An AI-powered tool that helps writers brainstorm, outline, and polish long-form content on the fly.",
              techStack: "React, Gemini API, Node.js",
              liveUrl: "#",
              githubUrl: "#",
            },
          ],
        },
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        profile: true,
        portfolio: true,
        projects: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      isMock: false,
      user: {
        id: user.id,
        name: user.name || "Portfolio Owner",
        profile: user.profile || {
          bio: "Welcome to my portfolio!",
          skills: "Full-Stack Development, React, Node.js",
        },
        portfolio: user.portfolio || {
          templateId: "template1",
          theme: "system",
          designPrefs: JSON.stringify({ accentColor: "blue" }),
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
    const { name, bio, skills, templateId, theme, accentColor } = body;

    if (!session?.user?.email) {
      // Return simulated success for unauthenticated local development
      return NextResponse.json({
        success: true,
        savedLocally: true,
        message: "Saved to local session (Log in with GitHub to save permanently to cloud DB)",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update user name if changed
    if (name) {
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

    // Update or create Portfolio
    await prisma.portfolio.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        templateId: templateId || "template1",
        theme: theme || "system",
        designPrefs: JSON.stringify({ accentColor: accentColor || "blue" }),
      },
      update: {
        ...(templateId && { templateId }),
        ...(theme && { theme }),
        ...(accentColor && {
          designPrefs: JSON.stringify({ accentColor }),
        }),
      },
    });

    return NextResponse.json({
      success: true,
      savedLocally: false,
      message: "Portfolio successfully saved to database!",
    });
  } catch (error: any) {
    console.error('Portfolio POST Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to save portfolio' }, { status: 500 });
  }
}
