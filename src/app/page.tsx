import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-sans">
      <main className="max-w-4xl mx-auto flex flex-col gap-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">PortfolioForge Hub</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Welcome to Phase 1. You can preview all completed stages from this central hub.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          
          <Link href="/onboarding" className="block p-6 border-2 border-primary/50 bg-primary/5 rounded-xl hover:bg-primary/10 transition-all group col-span-1 md:col-span-1">
            <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
              ✨ 1. The Onboarding Wizard
            </h2>
            <p className="text-muted-foreground">
              A smooth multi-step flow that connects GitHub and lets you pick a template.
            </p>
          </Link>

          <Link href="/dashboard" className="block p-6 border-2 border-green-500/50 bg-green-500/5 rounded-xl hover:bg-green-500/10 transition-all group col-span-1 md:col-span-1">
            <h2 className="text-2xl font-bold mb-2 group-hover:text-green-500 transition-colors flex items-center gap-2">
              🔒 2. User Dashboard
            </h2>
            <p className="text-muted-foreground">
              The authenticated hub where users manage their synced projects, view AI limits, and edit their live portfolio.
            </p>
          </Link>

          <Link href="/portfolio/preview" className="block p-6 border border-border rounded-xl hover:border-primary hover:bg-secondary/50 transition-all group">
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">1. Template #1 (Engineer)</h2>
            <p className="text-muted-foreground">
              Preview the premium, fully responsive developer portfolio template with dark mode and smooth Framer Motion animations (Stage 2).
            </p>
          </Link>

          <Link href="/portfolio/designer" className="block p-6 border border-border rounded-xl hover:border-primary hover:bg-secondary/50 transition-all group">
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">2. Template #2 (Designer)</h2>
            <p className="text-muted-foreground">
              Preview the Creative template built for designers featuring a beautiful Masonry gallery layout and bold typography (Stage 7).
            </p>
          </Link>

          <Link href="/portfolio/business" className="block p-6 border border-border rounded-xl hover:border-primary hover:bg-secondary/50 transition-all group">
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">3. Template #3 (Business)</h2>
            <p className="text-muted-foreground">
              Preview the BBA/Business template focusing on a clean, corporate layout, metric-driven cards, and a timeline experience section (Stage 7).
            </p>
          </Link>

          <Link href="/resume" className="block p-6 border border-border rounded-xl hover:border-primary hover:bg-secondary/50 transition-all group">
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">4. AI Resume Tailor</h2>
            <p className="text-muted-foreground">
              Test the AI feature that tailors resumes to a job description with strict anti-fabrication rules and visual diffs (Stage 4).
            </p>
          </Link>

          <div className="block p-6 border border-border rounded-xl bg-secondary/20">
            <h2 className="text-2xl font-semibold mb-2 text-foreground/70">3. GitHub Webhook Sync</h2>
            <p className="text-muted-foreground text-sm">
              Backend API Route (<code>/api/webhooks/github</code>). Automatically syncs GitHub pushes and filters by the "pf-" prefix (Stage 3).
            </p>
          </div>

          <Link href="/security" className="block p-6 border border-border rounded-xl hover:border-primary hover:bg-secondary/50 transition-all group">
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">4. Security Report</h2>
            <p className="text-muted-foreground">
              View the security status of the generated sites, including XSS sanitization (DOMPurify), CSP headers, and Privacy compliance (Stage 5).
            </p>
          </Link>

        </div>
      </main>
    </div>
  );
}
