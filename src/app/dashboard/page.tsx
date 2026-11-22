import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { 
  Briefcase, 
  FileText, 
  Sparkles, 
  ExternalLink, 
  Activity, 
  Palette, 
  Layers, 
  CheckCircle2, 
  Database,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { SimulateWebhookButton } from "@/components/dashboard/SimulateWebhookButton";
import { GitHubSyncControl } from "@/components/dashboard/GitHubSyncControl";
import { FolioVedaLogo } from "@/components/ui/Logo";

interface DashboardPageProps {
  searchParams?: Promise<{ user?: string }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = searchParams ? await searchParams : {};
  const requestedUserId = params.user;

  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch {
    // Unauthenticated scope
  }

  // 1. Fetch real user from database
  let user = null;
  if (requestedUserId) {
    user = await prisma.user.findUnique({
      where: { id: requestedUserId },
      include: {
        portfolio: true,
        projects: { orderBy: { createdAt: 'desc' } },
        profile: true,
      },
    });
  }

  if (!user && session?.user?.email) {
    user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        portfolio: true,
        projects: { orderBy: { createdAt: 'desc' } },
        profile: true,
      },
    });
  }

  // Fallback: Fetch most recent real user created in the database
  if (!user) {
    user = await prisma.user.findFirst({
      orderBy: { id: 'desc' },
      include: {
        portfolio: true,
        projects: { orderBy: { createdAt: 'desc' } },
        profile: true,
      },
    });
  }

  // Seed user if database is empty
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: "Alex Developer",
        email: "alex@folioveda.dev",
        profile: {
          create: {
            bio: "Full-Stack Engineer building high-throughput distributed systems and interactive portfolios.",
            skills: "React, Next.js, TypeScript, Node.js, Prisma, SQLite",
          },
        },
        portfolio: {
          create: {
            templateId: "sudarvel",
            themePackageId: "sudarvel",
            theme: "dark",
          },
        },
        projects: {
          create: [
            {
              repoName: "pf-distributed-cache",
              title: "Distributed Edge Cache",
              description: "Zero-copy caching daemon in Rust with automated replica failover and sub-5ms latency.",
              techStack: "Rust, Redis, Docker",
              githubUrl: "https://github.com/alex/pf-distributed-cache",
            },
          ],
        },
      },
      include: {
        portfolio: true,
        projects: { orderBy: { createdAt: 'desc' } },
        profile: true,
      },
    });
  }

  // Get other users in database for quick identity switching
  const allUsers = await prisma.user.findMany({
    select: { id: true, name: true, email: true },
    orderBy: { id: 'desc' },
    take: 6,
  });

  const activeTheme = user.portfolio?.themePackageId || user.portfolio?.templateId || "sudarvel";
  const userSlug = encodeURIComponent(user.name || "alex");

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] p-6 md:p-12 font-sans selection:bg-[#173f32] selection:text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Operational Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <FolioVedaLogo size="md" />
            </Link>
            <div className="border-l border-slate-200 pl-4 hidden sm:block">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-[#1E293B]">
                  Welcome back, {user.name}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  DB Live
                </span>
              </div>
              <p className="text-slate-500 text-xs mt-0.5">
                Connected to SQLite database: <span className="font-mono text-slate-700">{user.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/styles" 
              className="text-xs px-3.5 py-2 rounded-full bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-[#173f32] border border-slate-200 font-bold inline-flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <Layers size={13} className="text-[#173f32]" />
              <span>Style Gallery</span>
            </Link>

            <Link 
              href="/brand" 
              className="text-xs px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-bold inline-flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <Palette size={13} />
              <span>Brand</span>
            </Link>

            <div className="text-right hidden sm:block pl-2 border-l border-slate-200">
              <div className="text-xs font-bold text-slate-800">AI Quota</div>
              <div className="text-[11px] text-slate-500 font-medium">{5 - user.dailyAiCalls} remaining</div>
            </div>

            <div className="w-9 h-9 rounded-full bg-[#1E293B] text-white flex items-center justify-center font-extrabold text-xs shadow-xs">
              {user.name?.[0] || "U"}
            </div>
          </div>
        </header>

        {/* Database Identity Switcher (if multiple users in SQLite) */}
        {allUsers.length > 1 && (
          <div className="px-5 py-3 rounded-2xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs shadow-2xs">
            <div className="flex items-center gap-2 text-slate-600">
              <Database size={13} className="text-[#173f32]" />
              <span className="font-bold">Database Profiles:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {allUsers.map((u) => {
                const isCurrent = u.id === user.id;
                return (
                  <Link
                    key={u.id}
                    href={`/dashboard?user=${u.id}`}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      isCurrent
                        ? "bg-[#173f32] text-white shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {u.name || "Unnamed"}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Real-time Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100">
              <Briefcase size={22} />
            </div>
            <div>
              <div className="text-2xl font-black text-[#1E293B]">{user.projects.length}</div>
              <div className="text-xs text-slate-500 font-medium">Synced Repositories</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100">
              <Activity size={22} />
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-700">Online</div>
              <div className="text-xs text-slate-500 font-medium">Public Status: 200 OK</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center border border-amber-100">
              <Layers size={22} />
            </div>
            <div>
              <div className="text-sm font-extrabold text-[#1E293B] truncate max-w-[140px]">
                {activeTheme}
              </div>
              <Link href="/styles" className="text-xs text-[#173f32] hover:underline font-bold">
                Change Theme →
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center border border-purple-100">
              <FileText size={22} />
            </div>
            <div>
              <div className="text-2xl font-black text-[#1E293B]">ATS Ready</div>
              <Link href="/resume" className="text-xs text-purple-700 hover:underline font-bold">
                Tailor Resume →
              </Link>
            </div>
          </div>
        </div>

        {/* Live Public URL Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#1E293B] via-[#0F172A] to-[#1E293B] text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                LIVE PRODUCTION PORTFOLIO ENDPOINT
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              folioveda.me/{userSlug}
            </h2>
            <p className="text-xs text-slate-300 max-w-xl">
              Backed by SQLite Prisma records. Visitors see verified GitHub commits, custom design tokens, and zero hallucinations.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              href={`/p/${userSlug}`}
              target="_blank"
              className="px-5 py-3 rounded-full bg-[#173f32] hover:bg-[#13352a] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-[#173f32]/30 shrink-0 w-full md:w-auto"
            >
              <span>View Live Portfolio</span>
              <ExternalLink size={13} />
            </Link>
            <Link
              href="/portfolio/preview"
              className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition shrink-0 hidden sm:inline-block"
            >
              Studio Editor
            </Link>
          </div>
        </div>

        {/* Live GitHub Sync Tool (Direct Backend Synchronization) */}
        <GitHubSyncControl userId={user.id} defaultUsername={user.name?.toLowerCase().replace(/\s+/g, "")} />

        {/* Synced Projects List */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center flex-wrap gap-3 bg-slate-50/70">
            <div>
              <h2 className="text-lg font-extrabold text-[#1E293B] flex items-center gap-2">
                <Briefcase size={18} className="text-[#173f32]" />
                <span>Verified SQLite Database Projects ({user.projects.length})</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Automatically updated via GitHub webhooks or direct sync.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <SimulateWebhookButton />
            </div>
          </div>
          
          {user.projects.length === 0 ? (
            <div className="p-12 text-center text-slate-500 space-y-3">
              <p className="text-sm font-medium">No projects synced to this profile yet.</p>
              <p className="text-xs text-slate-400">
                Use the &quot;Connect Real GitHub Account&quot; tool above or click &quot;Simulate GitHub Push&quot; to test.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {user.projects.map((project) => (
                <div 
                  key={project.id} 
                  className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-base text-[#1E293B]">
                        {project.title}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {project.repoName}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 max-w-2xl leading-relaxed font-normal">
                      {project.description || "Production repository synced to FolioVeda."}
                    </p>
                    {project.techStack && (
                      <div className="text-[11px] font-mono text-[#173f32] font-semibold pt-0.5">
                        {project.techStack}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-[#1E293B] hover:text-white text-slate-700 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                      title="View GitHub repository"
                    >
                      <span>Repository</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
