import { notFound } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import type { Metadata } from "next";
import { getThemeById, mapUserToPortfolioContent } from "@/lib/themes/registry";
import { ThemeRenderer } from "@/components/portfolio/engine/ThemeRenderer";
import { PERSONA_PROFILES } from "@/lib/personas";

interface PageProps {
  params: Promise<{ username: string }>;
  searchParams?: Promise<{ theme?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const decoded = decodeURIComponent(username);

  return {
    title: `${decoded}'s Portfolio | Built with FolioIn`,
    description: `Check out ${decoded}'s verified professional portfolio, projects, and work experience.`,
    openGraph: {
      title: `${decoded} - Professional Portfolio`,
      description: `View ${decoded}'s live portfolio and synced GitHub projects.`,
      type: "profile",
    },
  };
}

export default async function PublicPortfolioPage({ params, searchParams }: PageProps) {
  const { username } = await params;
  const query = searchParams ? await searchParams : {};
  const decodedUsername = decodeURIComponent(username).trim();
  const lowerUsername = decodedUsername.toLowerCase();

  // Look up user by session, name or id in Prisma
  let userRecord = null;
  try {
    let session = null;
    try {
      session = await getServerSession(authOptions);
    } catch {}

    // 1. If user is logged in and viewing their own portfolio or /p/me
    if (session?.user?.email) {
      const sessionUser = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
          profile: true,
          portfolio: true,
          projects: true,
        },
      });

      if (sessionUser) {
        const sessNorm = (sessionUser.name || "").toLowerCase().replace(/[^a-z0-9]/g, "");
        const queryNorm = lowerUsername.replace(/[^a-z0-9]/g, "");
        if (
          lowerUsername === "me" ||
          lowerUsername === "latest" ||
          sessNorm === queryNorm ||
          (sessionUser.name && sessionUser.name.toLowerCase() === lowerUsername)
        ) {
          userRecord = sessionUser;
        }
      }
    }

    // 2. If requesting special keywords 'me' or 'latest', find the most recently active portfolio
    if (!userRecord && (lowerUsername === "me" || lowerUsername === "latest")) {
      userRecord = await prisma.user.findFirst({
        where: { portfolio: { isNot: null } },
        orderBy: { id: "desc" },
        include: {
          profile: true,
          portfolio: true,
          projects: true,
        },
      });
    }

    // 3. Find by exact name or ID (prefer users with an active portfolio)
    if (!userRecord) {
      userRecord = await prisma.user.findFirst({
        where: {
          AND: [
            {
              OR: [
                { name: { equals: decodedUsername } },
                { id: { equals: decodedUsername } },
              ],
            },
            { portfolio: { isNot: null } },
          ],
        },
        orderBy: { id: "desc" },
        include: {
          profile: true,
          portfolio: true,
          projects: true,
        },
      });
    }

    // Fallback if no portfolio relation required
    if (!userRecord) {
      userRecord = await prisma.user.findFirst({
        where: {
          OR: [
            { name: { equals: decodedUsername } },
            { id: { equals: decodedUsername } },
          ],
        },
        orderBy: { id: "desc" },
        include: {
          profile: true,
          portfolio: true,
          projects: true,
        },
      });
    }

    // Flexible match for slug variations (prioritize newest users first)
    if (!userRecord) {
      const allUsers = await prisma.user.findMany({
        orderBy: { id: "desc" },
        include: {
          profile: true,
          portfolio: true,
          projects: true,
        },
      });
      userRecord = allUsers.find((u) => {
        if (!u.name) return false;
        const normalizedDb = u.name.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
        const queryNorm = lowerUsername.replace(/[^a-z0-9]/g, "");
        return (
          normalizedDb === queryNorm ||
          u.name.trim().toLowerCase() === lowerUsername ||
          normalizedDb.includes(queryNorm) ||
          queryNorm.includes(normalizedDb)
        );
      }) || null;
    }
  } catch (err) {
    console.warn("DB query warning in public portfolio:", err);
  }

  const isDemo = !userRecord;

  // Check if requested slug matches any rich preset persona
  const matchedPersona = !userRecord
    ? Object.values(PERSONA_PROFILES).find((p) => {
        const pNorm = p.name.toLowerCase().replace(/[^a-z0-9]/g, "");
        const idNorm = p.id.toLowerCase().replace(/[^a-z0-9]/g, "");
        const qNorm = lowerUsername.replace(/[^a-z0-9]/g, "");
        return pNorm === qNorm || idNorm === qNorm || qNorm.includes(idNorm) || idNorm.includes(qNorm);
      })
    : null;

  // Convert to standardized PortfolioContent
  const content = matchedPersona
    ? matchedPersona.content
    : mapUserToPortfolioContent(
        userRecord,
        decodedUsername === "demo" || decodedUsername === "alex" ? "Alex Developer" : decodedUsername
      );

  // Determine active theme (search param override > user portfolio themePackageId > matched persona default > sudarvel)
  const activeThemeId =
    query.theme ||
    userRecord?.portfolio?.themePackageId ||
    userRecord?.portfolio?.templateId ||
    (matchedPersona ? matchedPersona.recommendedThemeId : "sudarvel");

  const theme = getThemeById(activeThemeId);

  let userFontFamily: string | undefined = undefined;
  let userAccentColor: string | undefined = undefined;
  if (userRecord?.portfolio?.designPrefs) {
    try {
      const prefs = JSON.parse(userRecord.portfolio.designPrefs);
      if (prefs.fontFamily) userFontFamily = prefs.fontFamily;
      if (prefs.accentColor) userAccentColor = prefs.accentColor;
    } catch {}
  }

  return (
    <ThemeRenderer
      theme={theme}
      content={content}
      isDemo={isDemo}
      fontFamilyOverride={userFontFamily}
      accentColorOverride={userAccentColor}
    />
  );
}
