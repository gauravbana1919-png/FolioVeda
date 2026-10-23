import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/db";
import type { Metadata } from "next";
import { getThemeById, mapUserToPortfolioContent } from "@/lib/themes/registry";
import { ThemeRenderer } from "@/components/portfolio/engine/ThemeRenderer";

interface PageProps {
  params: Promise<{ username: string }>;
  searchParams?: Promise<{ theme?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const decoded = decodeURIComponent(username);

  return {
    title: `${decoded}'s Portfolio | Built with FolioVeda`,
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
  const decodedUsername = decodeURIComponent(username);

  // Look up user by name or id in Prisma
  let userRecord = null;
  try {
    userRecord = await prisma.user.findFirst({
      where: {
        OR: [
          { name: { equals: decodedUsername } },
          { id: { equals: decodedUsername } },
        ],
      },
      include: {
        profile: true,
        portfolio: true,
        projects: true,
      },
    });
  } catch (err) {
    console.warn("DB query warning in public portfolio:", err);
  }

  const isDemo = !userRecord;

  // Convert to standardized PortfolioContent
  const content = mapUserToPortfolioContent(
    userRecord,
    decodedUsername === "demo" || decodedUsername === "alex" ? "Alex Developer" : decodedUsername
  );

  // Determine active theme (search param override > user portfolio themePackageId > templateId > default developer-terminal)
  const activeThemeId = query.theme || userRecord?.portfolio?.themePackageId || userRecord?.portfolio?.templateId || "developer-terminal";
  const theme = getThemeById(activeThemeId);

  return (
    <ThemeRenderer
      theme={theme}
      content={content}
      isDemo={isDemo}
    />
  );
}
