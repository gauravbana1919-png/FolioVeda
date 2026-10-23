"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Check, 
  Sparkles, 
  ExternalLink, 
  Eye, 
  Sliders, 
  Code2, 
  Palette, 
  Flame, 
  Layers,
  CheckCircle2,
  Share2
} from "lucide-react";
import { FolioVedaLogo } from "@/components/ui/Logo";
import { getAllSystemThemes, mapUserToPortfolioContent } from "@/lib/themes/registry";
import { getThemeRecommendations } from "@/lib/themes/recommendations";
import { ThemeRenderer } from "@/components/portfolio/engine/ThemeRenderer";
import { ThemePackage } from "@/types/theme";

export default function StyleGalleryPage() {
  const [userData, setUserData] = useState<any>(null);
  const [activeThemeId, setActiveThemeId] = useState<string>("developer-terminal");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedMood, setSelectedMood] = useState<string>("all");
  const [applyingThemeId, setApplyingThemeId] = useState<string | null>(null);
  const [appliedToast, setAppliedToast] = useState<{ name: string; url: string } | null>(null);

  // Load user data on mount
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/portfolio");
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setUserData(data.user);
            const currentTheme = data.user.portfolio?.themePackageId || data.user.portfolio?.templateId;
            if (currentTheme) {
              setActiveThemeId(currentTheme);
            }
          }
        }
      } catch (err) {
        console.warn("Could not load user portfolio in gallery:", err);
      }
    }
    loadUser();
  }, []);

  const normalizedContent = mapUserToPortfolioContent(userData);
  const allThemes = getAllSystemThemes();

  // Recommendations
  const recommendations = getThemeRecommendations({
    profileType: userData?.profile?.skills?.toLowerCase().includes("design") ? "designer" : "tech",
    skills: normalizedContent.skills,
  });

  const topPick = recommendations.find((r) => r.isTopPick);

  // Filtered themes
  const filteredThemes = allThemes.filter((theme) => {
    const matchesCategory = selectedCategory === "all" || theme.category === selectedCategory;
    const matchesMood = selectedMood === "all" || theme.mood === selectedMood;
    return matchesCategory && matchesMood;
  });

  // Apply theme to live portfolio
  const handleApplyTheme = async (theme: ThemePackage) => {
    setApplyingThemeId(theme.id);
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: theme.id,
          themeId: theme.id,
          name: normalizedContent.name,
        }),
      });

      if (res.ok) {
        setActiveThemeId(theme.id);
        const slug = encodeURIComponent(normalizedContent.name);
        setAppliedToast({
          name: theme.name,
          url: `/p/${slug}`,
        });
        setTimeout(() => setAppliedToast(null), 5000);
      }
    } catch (err) {
      console.error("Failed to apply theme:", err);
    } finally {
      setApplyingThemeId(null);
    }
  };

  const usernameSlug = encodeURIComponent(normalizedContent.name || "alex");

  return (
    <div className="min-h-screen bg-[#0A0F1D] text-slate-100 selection:bg-emerald-500/30 font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#0A0F1D]/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-900 border border-white/[0.08] text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft size={14} /> Hub
            </Link>
            <div className="h-4 w-[1px] bg-white/[0.1] hidden sm:block" />
            <FolioVedaLogo size="sm" showBadge={false} />
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/portfolio/preview"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/[0.08] text-slate-300 hover:text-white transition-colors"
            >
              <Sliders size={13} /> Open Studio
            </Link>
            <Link
              href={`/p/${usernameSlug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/20"
            >
              <ExternalLink size={13} /> View My Live Site
            </Link>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {appliedToast && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 border border-emerald-500/50 shadow-2xl rounded-xl p-4 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={20} className="text-emerald-400" />
          <div className="text-xs">
            <p className="font-bold text-white">Theme Applied Successfully!</p>
            <p className="text-slate-400">
              <span className="text-emerald-400 font-semibold">{appliedToast.name}</span> is now live on your portfolio.
            </p>
          </div>
          <Link
            href={appliedToast.url}
            target="_blank"
            className="ml-2 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 font-bold text-xs transition-colors"
          >
            Visit ↗
          </Link>
        </div>
      )}

      {/* Main Gallery Container */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Title & Explainer */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium mb-4">
            <Sparkles size={13} /> Live Style Architecture
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Choose Your Presentation DNA.
          </h1>
          <p className="text-base text-slate-400 leading-relaxed">
            All themes render your verified data—projects, skills, bio, and experience—with zero data loss. Switch anytime; your content stays permanently intact while the layout, typography, and motion completely transform.
          </p>
        </div>

        {/* Recommendation Callout */}
        {topPick && (
          <div className="mb-10 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mt-0.5">
                <Sparkles size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                    Recommended For You
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-slate-950">
                    TOP MATCH ({topPick.score}%)
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  {topPick.theme.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                  {topPick.reason}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => handleApplyTheme(topPick.theme)}
                disabled={activeThemeId === topPick.theme.id || applyingThemeId === topPick.theme.id}
                className="w-full md:w-auto px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold text-xs transition-all shadow-md"
              >
                {activeThemeId === topPick.theme.id
                  ? "✓ Currently Active"
                  : applyingThemeId === topPick.theme.id
                  ? "Applying..."
                  : "Apply Top Match"}
              </button>
            </div>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-white/[0.08]">
          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <span className="text-xs font-mono text-slate-500 uppercase mr-1">Category:</span>
            {[
              { id: "all", label: "All Styles" },
              { id: "tech", label: "Tech / Engineering" },
              { id: "design", label: "Product & Design" },
              { id: "creative", label: "Creative & Poster" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                    : "bg-slate-900 border border-white/[0.08] text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Mood Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500 uppercase mr-1">Mood:</span>
            {[
              { id: "all", label: "All" },
              { id: "formal", label: "Formal" },
              { id: "calm", label: "Calm" },
              { id: "bold", label: "Bold" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMood(m.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  selectedMood === m.id
                    ? "bg-slate-800 text-emerald-400 border border-emerald-500/40 font-bold"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Live Theme Previews */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredThemes.map((theme) => {
            const isActive = activeThemeId === theme.id;
            const isApplying = applyingThemeId === theme.id;

            return (
              <div
                key={theme.id}
                className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden bg-slate-900/80 backdrop-blur-sm ${
                  isActive
                    ? "border-emerald-500 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500/40"
                    : "border-white/[0.08] hover:border-white/[0.2]"
                }`}
              >
                {/* Theme Header Info */}
                <div className="p-5 border-b border-white/[0.08] bg-slate-950/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                      {theme.category} • {theme.mood}
                    </span>
                    {isActive && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                        <Check size={10} /> Active On Live Site
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {theme.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    Pattern: <span className="text-slate-200 font-mono">{theme.layout.pattern}</span> • Motion:{" "}
                    <span className="text-slate-200">{theme.tokens.motion.level}</span>
                  </p>
                </div>

                {/* Sandboxed Live Viewport Preview with User's Real Data */}
                <div className="p-4 bg-slate-950">
                  <div className="relative rounded-xl border border-white/[0.08] overflow-hidden h-[340px] shadow-inner select-none pointer-events-none transform origin-top scale-[0.98]">
                    {/* Viewport Top Bar */}
                    <div className="bg-slate-900 px-3 py-1.5 border-b border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500/70"></span>
                        <span className="w-2 h-2 rounded-full bg-amber-500/70"></span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500/70"></span>
                      </div>
                      <span>folioveda.me/{normalizedContent.name.toLowerCase().replace(/\s+/g, "")}</span>
                    </div>

                    {/* Miniature Theme Viewport */}
                    <div className="overflow-y-auto h-[305px] text-xs">
                      <ThemeRenderer
                        theme={theme}
                        content={normalizedContent}
                        isDemo={false}
                        hideBadge={true}
                      />
                    </div>
                  </div>
                </div>

                {/* Token Swatches & Features */}
                <div className="p-5 border-t border-white/[0.08] space-y-4 bg-slate-950/20">
                  {/* Palette Swatches */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono text-[11px]">Palette Tokens:</span>
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: theme.tokens.colors.bg }}
                        title={`Background: ${theme.tokens.colors.bg}`}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: theme.tokens.colors.surface }}
                        title={`Surface: ${theme.tokens.colors.surface}`}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: theme.tokens.colors.accent }}
                        title={`Accent: ${theme.tokens.colors.accent}`}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: theme.tokens.colors.text }}
                        title={`Text: ${theme.tokens.colors.text}`}
                      />
                    </div>
                  </div>

                  {/* Typography Pairing */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono text-[11px]">Typography:</span>
                    <span className="text-slate-200 text-[11px] truncate max-w-[160px] font-mono">
                      {theme.tokens.typography.headingWeight}w • {theme.layout.pattern}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleApplyTheme(theme)}
                      disabled={isActive || isApplying}
                      className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isActive
                          ? "bg-slate-800 text-slate-500 cursor-default"
                          : isApplying
                          ? "bg-emerald-600/70 text-white animate-pulse"
                          : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20"
                      }`}
                    >
                      {isActive ? (
                        <>
                          <Check size={13} className="text-emerald-400" /> Active Theme
                        </>
                      ) : isApplying ? (
                        "Applying..."
                      ) : (
                        "Apply to Live Site"
                      )}
                    </button>

                    <Link
                      href={`/p/${usernameSlug}?theme=${theme.id}`}
                      target="_blank"
                      className="p-2.5 rounded-lg bg-slate-900 border border-white/[0.08] hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                      title="Open full-screen preview"
                    >
                      <Eye size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
