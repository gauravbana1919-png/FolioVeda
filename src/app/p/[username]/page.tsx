import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/db";
import type { Metadata } from "next";

// Template 1 (Developer)
import { HeroSection as DevHero } from "@/components/portfolio/template1/HeroSection";
import { Navbar as DevNavbar } from "@/components/portfolio/template1/Navbar";
import { ProjectsSection as DevProjects } from "@/components/portfolio/template1/ProjectsSection";

// Template 2 (Designer)
import { HeroSection as DesignerHero } from "@/components/portfolio/template2/HeroSection";
import { GallerySection as DesignerGallery } from "@/components/portfolio/template2/GallerySection";

// Template 3 (Business)
import { HeroSection as BusinessHero } from "@/components/portfolio/template3/HeroSection";
import { ExperienceSection as BusinessExp } from "@/components/portfolio/template3/ExperienceSection";

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const decoded = decodeURIComponent(username);

  return {
    title: `${decoded}'s Portfolio | Built with PortfolioForge`,
    description: `Check out ${decoded}'s verified professional portfolio, projects, and work experience.`,
    openGraph: {
      title: `${decoded} - Professional Portfolio`,
      description: `View ${decoded}'s live portfolio and synced GitHub projects.`,
      type: "profile",
    },
  };
}

export default async function PublicPortfolioPage({ params }: PageProps) {
  const { username } = await params;
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

  // Format portfolio data
  const userData = userRecord
    ? {
        name: userRecord.name || decodedUsername,
        profile: {
          bio: userRecord.profile?.bio || "Welcome to my portfolio!",
          skills: userRecord.profile?.skills || "Software Engineering, Web Development",
        },
        projects: userRecord.projects?.length > 0 ? userRecord.projects : [
          {
            title: "Featured Project",
            description: "A high-impact project built with modern technologies.",
            techStack: ["Next.js", "TypeScript", "Tailwind"],
            liveUrl: "#",
            githubUrl: "#",
          }
        ],
      }
    : {
        name: decodedUsername === "demo" || decodedUsername === "alex" ? "Alex Developer" : decodedUsername,
        profile: {
          bio: "I turn messy ideas into thoughtful, highly-performant software. Passionate about Next.js, Framer Motion, and building things that scale.",
          skills: "React, Next.js, TypeScript, Tailwind CSS, Node.js, Prisma, SQLite",
        },
        projects: [
          {
            title: "Fintech Dashboard",
            description: "A comprehensive dashboard for tracking personal finances with real-time charts and data visualization.",
            techStack: ["Next.js", "Tailwind", "Recharts"],
            liveUrl: "#",
            githubUrl: "#",
          },
          {
            title: "AI Writing Assistant",
            description: "An AI-powered tool that helps writers overcome block and generate creative ideas on the fly.",
            techStack: ["React", "Gemini API", "Node.js"],
            liveUrl: "#",
            githubUrl: "#",
          },
        ],
      };

  const templateId = userRecord?.portfolio?.templateId || "template1";

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative selection:bg-primary/20">
      
      {/* Top Demo Banner if previewing demo */}
      {isDemo && (
        <div className="bg-primary/10 border-b border-primary/20 px-4 py-2 text-center text-xs font-medium text-foreground">
          ✨ Viewing demo portfolio for <span className="font-semibold">{userData.name}</span>. 
          <Link href="/onboarding" className="ml-2 underline hover:text-primary font-bold">
            Create your own in 60s →
          </Link>
        </div>
      )}

      {/* Render Template */}
      <main>
        {templateId === "template1" && (
          <div>
            <DevNavbar user={userData} />
            <div className="pt-20">
              <DevHero user={userData} />
              <DevProjects projects={userData.projects} />
            </div>
          </div>
        )}

        {templateId === "template2" && (
          <div>
            <DesignerHero user={userData} />
            <DesignerGallery />
          </div>
        )}

        {templateId === "template3" && (
          <div>
            <BusinessHero user={userData} />
            <BusinessExp />
          </div>
        )}
      </main>

      {/* Subtle viral platform badge */}
      <footer className="fixed bottom-4 right-4 z-40">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-background/90 hover:bg-background border border-border shadow-lg text-xs font-medium backdrop-blur-md transition-all hover:scale-105"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Built with <strong>PortfolioForge</strong></span>
        </Link>
      </footer>
    </div>
  );
}
