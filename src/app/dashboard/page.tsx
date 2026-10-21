import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { Briefcase, FileText, Settings, Sparkles, ExternalLink, Activity } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    // If not logged in, just show a mock version for demonstration purposes
    return <MockDashboard />;
  }

  // Fetch real user data from DB
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      portfolio: true,
      projects: true,
    }
  });

  if (!user) return <MockDashboard />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex justify-between items-center bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-border shadow-sm">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user.name}</h1>
            <p className="text-muted-foreground mt-1">Here is the status of your PortfolioForge assets.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold">AI Credits</div>
              <div className="text-xs text-muted-foreground">{5 - user.dailyAiCalls} remaining today</div>
            </div>
            {user.image && (
              <img src={user.image} alt="Profile" className="w-12 h-12 rounded-full border-2 border-primary/20" />
            )}
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-border flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
              <Briefcase size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold">{user.projects.length}</div>
              <div className="text-sm text-muted-foreground">Synced Projects</div>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-border flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
              <Activity size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold">Live</div>
              <div className="text-sm text-muted-foreground">Portfolio Status</div>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-border flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center">
              <FileText size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold">2</div>
              <div className="text-sm text-muted-foreground">Tailored Resumes</div>
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="bg-white dark:bg-zinc-900 border border-border rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center flex-wrap gap-2">
            <h2 className="text-xl font-bold flex items-center gap-2"><Briefcase size={20}/> Synced GitHub Projects</h2>
            <div className="flex items-center gap-3">
              <Link href="/portfolio/preview" className="text-sm text-primary hover:underline flex items-center gap-1 font-medium">
                <Sparkles size={14}/> Edit Studio
              </Link>
              <Link href={`/p/${encodeURIComponent(user.name || "alex")}`} target="_blank" className="text-sm px-3 py-1 bg-secondary rounded-lg hover:bg-secondary/80 font-medium inline-flex items-center gap-1.5 transition-colors">
                <ExternalLink size={13}/> Public Link
              </Link>
            </div>
          </div>
          
          {user.projects.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              No projects synced yet. Push a repository starting with <code>pf-</code> to your GitHub!
            </div>
          ) : (
            <div className="divide-y divide-border">
              {user.projects.map(project => (
                <div key={project.id} className="p-6 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-zinc-950/50 transition-colors">
                  <div>
                    <h3 className="font-bold text-lg">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-xl">{project.description}</p>
                  </div>
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                    <ExternalLink size={18} />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// Mock Dashboard for when the user isn't physically logged in during development
function MockDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex justify-between items-center bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-border shadow-sm">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Developer!</h1>
            <p className="text-muted-foreground mt-1">Here is the status of your PortfolioForge assets.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold">AI Credits</div>
              <div className="text-xs text-muted-foreground">5 remaining today</div>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              DEV
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-border flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
              <Briefcase size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold">4</div>
              <div className="text-sm text-muted-foreground">Synced Projects</div>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-border flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
              <Activity size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold">Live</div>
              <div className="text-sm text-muted-foreground">Portfolio Status</div>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-border flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center">
              <FileText size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold">2</div>
              <div className="text-sm text-muted-foreground">Tailored Resumes</div>
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="bg-white dark:bg-zinc-900 border border-border rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center flex-wrap gap-2">
            <h2 className="text-xl font-bold flex items-center gap-2"><Briefcase size={20}/> Synced GitHub Projects (Mock Data)</h2>
            <div className="flex items-center gap-3">
              <Link href="/portfolio/preview" className="text-sm text-primary hover:underline flex items-center gap-1 font-medium">
                <Sparkles size={14}/> Edit Studio
              </Link>
              <Link href="/p/alex" target="_blank" className="text-sm px-3 py-1 bg-secondary rounded-lg hover:bg-secondary/80 font-medium inline-flex items-center gap-1.5 transition-colors">
                <ExternalLink size={13}/> Public Link
              </Link>
            </div>
          </div>
          
          <div className="divide-y divide-border">
            {[
              { id: 1, title: 'pf-ecommerce-engine', desc: 'A scalable Node.js microservices backend for eCommerce platforms.', tech: 'Node.js, Redis' },
              { id: 2, title: 'pf-react-dashboard', desc: 'A beautiful analytics dashboard built with Next.js and Tailwind.', tech: 'React, Tailwind' },
            ].map(project => (
              <div key={project.id} className="p-6 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-zinc-950/50 transition-colors">
                <div>
                  <h3 className="font-bold text-lg">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{project.desc}</p>
                  <div className="text-xs font-mono bg-secondary px-2 py-1 inline-block rounded mt-2 text-muted-foreground">{project.tech}</div>
                </div>
                <a href="#" className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                  <ExternalLink size={18} />
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
