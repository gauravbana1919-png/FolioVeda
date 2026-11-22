"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { 
  ArrowLeft, 
  Check, 
  Cloud, 
  Sparkles, 
  Sun, 
  Moon, 
  Terminal, 
  BookOpen, 
  Flame,
  ExternalLink,
  Layers,
  FileText,
} from "lucide-react";
import { ChatEditor } from "@/components/ui/ChatEditor";
import { FolioVedaLogo } from "@/components/ui/Logo";
import { getThemeById, getAllSystemThemes, mapUserToPortfolioContent } from "@/lib/themes/registry";
import { ThemeRenderer } from "@/components/portfolio/engine/ThemeRenderer";

const ACCENT_COLORS = [
  { id: "emerald", label: "Cyber Mint", bg: "bg-emerald-500", ring: "ring-emerald-500" },
  { id: "blue", label: "Blue", bg: "bg-blue-500", ring: "ring-blue-500" },
  { id: "purple", label: "Purple", bg: "bg-purple-500", ring: "ring-purple-500" },
  { id: "amber", label: "Amber", bg: "bg-amber-500", ring: "ring-amber-500" },
  { id: "rose", label: "Rose", bg: "bg-rose-500", ring: "ring-rose-500" },
];

export default function PortfolioStudio() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const [aiNotice, setAiNotice] = useState<string | null>(null);

  const [activeThemeId, setActiveThemeId] = useState<string>("wall-showcase");
  const [accentColor, setAccentColor] = useState<string>("emerald");

  const [userData, setUserData] = useState({
    name: "Gaurav Shekhawat",
    profile: {
      headline: "Full-Stack Engineer & Systems Builder • AI & Next.js Specialist",
      bio: "I build high-throughput distributed systems, then direct AI to turn complex workflows into working products. Focused on sub-100ms APIs, resilient event pipelines, and outcome-driven design.",
      skills: "Next.js 15, TypeScript, React, Node.js, PostgreSQL, Docker, Prisma, Redis, Tailwind CSS, Gemini AI",
      location: "Bengaluru, India",
      availability: "Open to Staff / Senior Roles in Bengaluru / Remote",
      experience: JSON.stringify([
        {
          role: "Senior Full-Stack Engineer",
          company: "NexaStream Solutions",
          period: "Jun 2023 – Present",
          location: "Bengaluru, India / Remote",
          highlights: [
            "Architected edge telemetry portal using Next.js 15, TypeScript, and Prisma, improving query throughput by 38%.",
            "Implemented distributed Redis caching layers for high-frequency dashboard routes, reducing P99 latency from 420ms to 65ms.",
            "Mentored 6 engineers on state management, asynchronous data fetching, and automated testing standards."
          ]
        },
        {
          role: "Software Engineer",
          company: "CloudForge Tech",
          period: "Aug 2021 – May 2023",
          location: "Hyderabad, India",
          highlights: [
            "Engineered core responsive customer onboarding workflows with React and Tailwind CSS, increasing lead conversion rate by 24%.",
            "Developed resilient background queue processors for payment reconciliation using Node.js and PostgreSQL.",
            "Integrated automated GitHub Actions CI/CD workflows, reducing release deployment cycle times from 45m to 8m."
          ]
        }
      ]),
      certifications: JSON.stringify([
        {
          name: "AWS Certified Solutions Architect",
          issuer: "Amazon Web Services",
          year: "2024",
          status: "Verified"
        },
        {
          name: "Enterprise Design Thinking Practitioner",
          issuer: "IBM",
          year: "2024",
          status: "Completed"
        },
        {
          name: "AI for Product Designers & Engineers",
          issuer: "Interaction Design Foundation",
          year: "2025",
          status: "Completed"
        }
      ]),
      socials: JSON.stringify({
        github: "https://github.com/gauravbana1919-png",
        linkedin: "https://www.linkedin.com/in/gaurav-shekhawat-a24644398/",
        website: "https://folioveda.dev"
      })
    },
    projects: [
      {
        title: "Distributed Telemetry & Edge Pipeline",
        description: "A low-latency distributed caching and telemetry engine built with Next.js, Redis, and Prisma, serving 100k+ req/sec with sub-5ms P99 latency.",
        techStack: ["Next.js 15", "TypeScript", "Redis", "Docker", "PostgreSQL"],
        liveUrl: "https://github.com/gauravbana1919-png",
        githubUrl: "https://github.com/gauravbana1919-png",
        featured: true,
        category: "Distributed Architecture",
        impact: "+38% Query Throughput • 420ms ➔ 65ms P99",
        problem: "Legacy monolithic APIs struggled under concurrent analytics loads with frequent latency spikes and high cloud egress fees.",
        solution: "Engineered an edge caching layer using Redis and Next.js Turbopack that decouples heavy queries and serves 100k+ req/sec at sub-5ms latency."
      },
      {
        title: "AI Synthesis Canvas & Workflow Engine",
        description: "Interactive real-time collaboration canvas with LLM-powered diagram generation, AST streaming, and instant markdown previewing.",
        techStack: ["Next.js", "TypeScript", "Tailwind", "WebSockets", "Gemini AI"],
        liveUrl: "https://github.com/gauravbana1919-png",
        githubUrl: "https://github.com/gauravbana1919-png",
        featured: true,
        category: "AI Product Architecture",
        impact: "200k+ MAU • Sub-100ms Live AST Stream",
        problem: "Engineers and product designers spent excessive hours manually drafting cloud system architecture diagrams and flowcharts.",
        solution: "Built a collaborative canvas that streams LLM structured JSON into real-time interactive diagrams with sub-100ms render speeds."
      },
      {
        title: "FolioVeda — Autonomous Portfolio & ATS Engineering Suite",
        description: "Autonomous career architecture compiler with zero-hallucination intake, dynamic Wall of Portfolios archetypes, and live ATS keyword auditing.",
        techStack: ["Next.js", "Prisma", "SQLite", "Framer Motion", "Tailwind CSS"],
        liveUrl: "https://folioveda.dev",
        githubUrl: "https://github.com/gauravbana1919-png",
        featured: true,
        category: "Full-Stack SaaS Platform",
        impact: "Wall of Portfolios Standard • Sub-50ms TTFB",
        problem: "Developers and designers had fragmented, unattractive portfolios that failed ATS parsers and lacked outcome-driven case studies.",
        solution: "Created an autonomous portfolio compiler with zero-hallucination intake, dynamic architectural theme engines, and high-impact case study drawers."
      },
    ],
  });

  useEffect(() => {
    setMounted(true);
    // Fetch initial profile from server / localStorage
    async function loadPortfolio() {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setUserData(prev => ({
              ...prev,
              name: data.user.name || prev.name,
              profile: {
                bio: data.user.profile?.bio || prev.profile.bio,
                skills: data.user.profile?.skills || prev.profile.skills,
              },
              projects: data.user.projects?.length > 0 ? data.user.projects : prev.projects,
            }));
            const loadedTheme = data.user.portfolio?.themePackageId || data.user.portfolio?.themeId || data.user.portfolio?.templateId;
            if (loadedTheme && loadedTheme !== "template1" && loadedTheme !== "template2" && loadedTheme !== "developer-terminal" && loadedTheme !== "minimal-editorial") {
              setActiveThemeId(loadedTheme);
            }
            if (data.user.portfolio?.designPrefs) {
              try {
                const prefs = JSON.parse(data.user.portfolio.designPrefs);
                if (prefs.accentColor) setAccentColor(prefs.accentColor);
              } catch (e) {}
            }
          }
        }
      } catch (err) {
        console.warn("Could not load cloud portfolio, using local default:", err);
      }
    }
    loadPortfolio();
  }, []);

  // Save changes to backend
  const handleSave = async (overrides?: any) => {
    setSaveStatus("saving");
    const payload = {
      name: overrides?.name || userData.name,
      bio: overrides?.bio || userData.profile.bio,
      skills: overrides?.skills || userData.profile.skills,
      templateId: overrides?.themeId || activeThemeId,
      theme: overrides?.theme || theme,
      accentColor: overrides?.accentColor || accentColor,
    };

    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSaveStatus("saved");
      } else {
        setSaveStatus("unsaved");
      }
    } catch (e) {
      console.error(e);
      setSaveStatus("unsaved");
    }
  };

  // Handle AI updates from the floating ChatEditor
  const handleAiUpdate = (updates: any) => {
    setUserData(prev => ({
      ...prev,
      name: updates.name || prev.name,
      profile: {
        bio: updates.bio || prev.profile.bio,
        skills: updates.skills || prev.profile.skills,
      },
    }));

    if (updates.templateId || updates.themeId) {
      setActiveThemeId(updates.themeId || updates.templateId);
    }

    if (updates.accentColor) {
      setAccentColor(updates.accentColor);
    }

    if (updates.theme && (updates.theme === 'light' || updates.theme === 'dark')) {
      setTheme(updates.theme);
    }

    setAiNotice("AI applied your instructions!");
    setTimeout(() => setAiNotice(null), 3500);

    // Auto-save changes
    handleSave(updates);
  };

  const selectedThemePackage = getThemeById(activeThemeId);
  const normalizedContent = mapUserToPortfolioContent(userData);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Studio Top Control Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur-md px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Navigation & Branding */}
          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
              title="Return to Master Studio Hub"
            >
              <ArrowLeft size={14} /> Hub
            </Link>
            <div className="h-4 w-[1px] bg-border hidden sm:block" />
            <FolioVedaLogo size="xs" showBadge={false} />
          </div>

          {/* Center: Stage 2 Distinct Style Switcher */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-muted/80 p-1 rounded-xl border border-border text-xs font-medium">
              <button
                onClick={() => { setActiveThemeId("craft-desk"); handleSave({ themeId: "craft-desk" }); }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                  activeThemeId === "craft-desk"
                    ? "bg-[#095848] text-[#FAF7F0] shadow-sm font-bold" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileText size={13} /> Rolan Desk Mat
              </button>
              <button
                onClick={() => { setActiveThemeId("wall-showcase"); handleSave({ themeId: "wall-showcase" }); }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                  activeThemeId === "wall-showcase"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-sm font-bold" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sparkles size={13} className="text-slate-950" /> Wall-Grade
              </button>
              <button
                onClick={() => { setActiveThemeId("not-your-college"); handleSave({ themeId: "not-your-college" }); }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                  activeThemeId === "not-your-college"
                    ? "bg-[#173f32] text-[#f7f4eb] shadow-sm font-semibold" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                NYC Editorial
              </button>
              <button
                onClick={() => { setActiveThemeId("luxe-creative"); handleSave({ themeId: "luxe-creative" }); }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                  activeThemeId === "luxe-creative"
                    ? "bg-stone-900 text-stone-100 shadow-sm font-semibold" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Layers size={13} /> Luxe Creative
              </button>
              <button
                onClick={() => { setActiveThemeId("developer-terminal"); handleSave({ themeId: "developer-terminal" }); }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                  activeThemeId === "developer-terminal" || activeThemeId === "template1"
                    ? "bg-emerald-600 text-white shadow-sm font-semibold" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Terminal size={13} /> Terminal
              </button>
            </div>

            {/* Dropdown for all 10 themes */}
            <div className="hidden lg:flex items-center">
              <select
                value={activeThemeId}
                onChange={(e) => {
                  const newTheme = e.target.value;
                  setActiveThemeId(newTheme);
                  handleSave({ themeId: newTheme });
                }}
                className="text-xs bg-muted/80 text-foreground border border-border rounded-xl px-2.5 py-1.5 font-medium focus:outline-hidden focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                aria-label="Select Archetype"
              >
                {getAllSystemThemes().map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right: Accents, Theme, & Cloud Save */}
          <div className="flex items-center gap-2.5">
            {/* Color Swatches */}
            <div className="hidden md:flex items-center gap-1 px-2 py-1 bg-muted/60 rounded-lg border border-border/50">
              {ACCENT_COLORS.map(c => (
                <button
                  key={c.id}
                  onClick={() => { setAccentColor(c.id); handleSave({ accentColor: c.id }); }}
                  className={`w-4 h-4 rounded-full ${c.bg} transition-transform ${
                    accentColor === c.id ? `scale-125 ring-2 ring-offset-1 ring-foreground` : "hover:scale-110 opacity-70 hover:opacity-100"
                  }`}
                  title={`${c.label} accent`}
                  aria-label={`${c.label} accent`}
                />
              ))}
            </div>

            {/* Dark / Light Toggle */}
            {mounted && (
              <button
                onClick={() => {
                  const next = theme === "dark" ? "light" : "dark";
                  setTheme(next);
                  handleSave({ theme: next });
                }}
                className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            )}

            {/* Save Status & Action */}
            <button
              onClick={() => handleSave()}
              disabled={saveStatus === "saving"}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
              {saveStatus === "saving" ? (
                <>
                  <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : saveStatus === "saved" ? (
                <>
                  <Check size={13} className="text-emerald-300" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Cloud size={13} />
                  <span>Save</span>
                </>
              )}
            </button>

            {/* Public Share Link */}
            <Link
              href={`/p/${encodeURIComponent(userData.name || "alex")}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground text-xs font-medium transition-colors border border-border"
              title="Open public portfolio"
            >
              <ExternalLink size={13} />
              <span className="hidden sm:inline">Public Page</span>
            </Link>
          </div>

        </div>
      </header>

      {/* Floating AI Toast */}
      {aiNotice && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background px-4 py-2 rounded-full text-xs font-medium shadow-xl flex items-center gap-2 animate-bounce">
          <Sparkles size={14} className="text-yellow-400" />
          <span>{aiNotice}</span>
        </div>
      )}

      {/* Main Dynamic Style Engine Canvas */}
      <main className="flex-1">
        <ThemeRenderer
          theme={selectedThemePackage}
          content={normalizedContent}
          isDemo={false}
          hideBadge={true}
        />
      </main>

      {/* Platform Branding Badge */}
      <div className="fixed bottom-4 left-4 z-30">
        <span className="px-3 py-1.5 bg-background/90 backdrop-blur-md border border-border text-foreground text-[11px] font-medium rounded-md shadow-md">
          ⚡ FolioVeda Style Engine • {selectedThemePackage.name}
        </span>
      </div>

      {/* Floating AI Chat Editor with Full Reactive State Binding */}
      <ChatEditor 
        onUpdate={handleAiUpdate}
        currentProfile={userData}
        templateId={activeThemeId}
      />
    </div>
  );
}
