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

  const [activeThemeId, setActiveThemeId] = useState<string>("developer-terminal");
  const [accentColor, setAccentColor] = useState<string>("emerald");

  const [userData, setUserData] = useState({
    name: "Alex Developer",
    profile: {
      bio: "I turn messy ideas into thoughtful, highly-performant software. Passionate about Next.js, TypeScript, and modern developer tooling.",
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
            const loadedTheme = data.user.portfolio?.themeId || data.user.portfolio?.templateId;
            if (loadedTheme) {
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
          <div className="flex items-center bg-muted/80 p-1 rounded-xl border border-border text-xs font-medium">
            <button
              onClick={() => { setActiveThemeId("developer-terminal"); handleSave({ themeId: "developer-terminal" }); }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                activeThemeId === "developer-terminal" || activeThemeId === "template1"
                  ? "bg-emerald-600 text-white shadow-sm font-semibold" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Terminal size={13} /> Dev Terminal
            </button>
            <button
              onClick={() => { setActiveThemeId("minimal-editorial"); handleSave({ themeId: "minimal-editorial" }); }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                activeThemeId === "minimal-editorial" || activeThemeId === "template2"
                  ? "bg-amber-600 text-white shadow-sm font-semibold" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BookOpen size={13} /> Minimal Editorial
            </button>
            <button
              onClick={() => { setActiveThemeId("bold-poster"); handleSave({ themeId: "bold-poster" }); }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                activeThemeId === "bold-poster" || activeThemeId === "template3"
                  ? "bg-emerald-500 text-slate-950 shadow-sm font-bold" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Flame size={13} /> Bold Poster
            </button>
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
