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
  Share2,
  ArrowRight
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
    targetGoal: "job",
    mood: "formal",
  });

  const topPick = recommendations[0];

  // Filter themes
  const filteredThemes = allThemes.filter((theme) => {
    if (selectedCategory !== "all" && theme.category !== selectedCategory) return false;
    if (selectedMood !== "all" && theme.mood !== selectedMood) return false;
    return true;
  });

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
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] selection:bg-[#991B1B] selection:text-white font-sans antialiased">
      
      {/* Top Navigation: Clean, matching the main landing page */}
      <header className="sticky top-0 z-50 w-full border-b border-[#1E293B]/10 bg-[#F8F9FA]/90 backdrop-blur-xl px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-[#1E293B]/10 text-slate-700 hover:text-[#991B1B] hover:border-[#991B1B]/40 transition-colors shadow-2xs"
            >
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />
            <FolioVedaLogo size="sm" showBadge={false} />
            <span className="font-extrabold text-sm text-[#1E293B] hidden md:inline">Style Gallery</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/hub"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-[#1E293B]/10 text-slate-700 hover:text-[#991B1B] transition-colors"
            >
              Master Hub ↗
            </Link>
            <Link
              href={`/p/${usernameSlug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full bg-[#991B1B] hover:bg-[#7F1D1D] text-white transition-all shadow-md shadow-[#991B1B]/20"
            >
              <ExternalLink size={13} /> View Live Profile
            </Link>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {appliedToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#1E293B] text-white border-2 border-[#991B1B] shadow-2xl rounded-2xl p-4 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={20} className="text-[#991B1B]" />
          <div className="text-xs">
            <p className="font-bold text-white">Theme Applied Successfully!</p>
            <p className="text-slate-300">
              <span className="text-red-300 font-bold">{appliedToast.name}</span> is now active on your portfolio.
            </p>
          </div>
          <Link
            href={appliedToast.url}
            target="_blank"
            className="ml-2 px-3 py-1 rounded-full bg-[#991B1B] text-white font-bold text-xs hover:bg-[#7F1D1D] transition-colors"
          >
            Visit ↗
          </Link>
        </div>
      )}

      {/* Main Gallery Container */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Title & Explainer (Bold, attractive, zero italic) */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-[#991B1B] text-xs font-bold tracking-wide uppercase mb-4">
            <Sparkles size={13} /> LIVE ARCHITECTURAL STYLES
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1E293B] mb-4">
            Choose Your Presentation DNA.
          </h1>
          <p className="text-base text-slate-600 font-normal leading-relaxed">
            All 8 system themes render your verified data—projects, skills, bio, and experience—with zero data loss. Switch anytime; your content stays permanently intact while the layout, typography, and motion completely transform.
          </p>
        </div>

        {/* Recommendation Callout */}
        {topPick && (
          <div className="mb-10 rounded-3xl bg-white border border-[#1E293B]/10 shadow-lg p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-[#991B1B] mt-0.5">
                <Sparkles size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#991B1B]">
                    Recommended Match
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#991B1B] text-white">
                    TOP MATCH ({topPick.score}%)
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#1E293B] mt-1 font-sans">
                  {topPick.theme.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed font-normal">
                  {topPick.reason}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => handleApplyTheme(topPick.theme)}
                disabled={activeThemeId === topPick.theme.id || applyingThemeId === topPick.theme.id}
                className="w-full md:w-auto px-6 py-3 rounded-full bg-[#991B1B] hover:bg-[#7F1D1D] disabled:bg-slate-200 disabled:text-slate-500 text-white font-bold text-xs transition-all shadow-md shadow-[#991B1B]/20"
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
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <span className="text-xs font-bold text-slate-500 uppercase mr-1">Category:</span>
            {[
              { id: "all", label: "All Styles" },
              { id: "tech", label: "Tech / Engineering" },
              { id: "design", label: "Product & Design" },
              { id: "creative", label: "Creative & Poster" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#991B1B] text-white shadow-xs"
                    : "bg-white border border-slate-200 text-slate-600 hover:text-[#1E293B] hover:bg-slate-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Mood Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase mr-1">Mood:</span>
            {[
              { id: "all", label: "All" },
              { id: "formal", label: "Formal" },
              { id: "calm", label: "Calm" },
              { id: "bold", label: "Bold" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMood(m.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  selectedMood === m.id
                    ? "bg-slate-800 text-white font-bold"
                    : "text-slate-500 hover:text-slate-900"
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
                className={`rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden bg-white shadow-sm hover:shadow-xl ${
                  isActive
                    ? "border-[#991B1B] ring-2 ring-[#991B1B]/30"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                {/* Theme Header Info */}
                <div className="p-5 border-b border-slate-100 bg-slate-50/70">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#991B1B]">
                      {theme.category} • {theme.mood}
                    </span>
                    {isActive && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-50 border border-red-200 text-[#991B1B] text-[10px] font-bold">
                        <Check size={10} /> Active On Live Site
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-extrabold text-[#1E293B] tracking-tight">
                    {theme.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 font-normal">
                    Pattern: <span className="text-slate-800 font-mono font-bold">{theme.layout.pattern}</span> • Motion:{" "}
                    <span className="text-slate-800 font-medium">{theme.tokens.motion.level}</span>
                  </p>
                </div>

                {/* Sandboxed Live Viewport Preview with User's Real Data */}
                <div className="p-4 bg-slate-100">
                  <div className="relative rounded-2xl border border-slate-200 overflow-hidden h-[340px] shadow-sm select-none pointer-events-none transform origin-top scale-[0.98] bg-white">
                    {/* Viewport Top Bar */}
                    <div className="bg-slate-900 px-3 py-1.5 border-b border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500/90"></span>
                        <span className="w-2 h-2 rounded-full bg-amber-500/90"></span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500/90"></span>
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
                <div className="p-5 border-t border-slate-100 space-y-4 bg-white">
                  {/* Palette Swatches */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-semibold text-[11px]">Palette Tokens:</span>
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-4 h-4 rounded-full border border-slate-300"
                        style={{ backgroundColor: theme.tokens.colors.bg }}
                        title={`Background: ${theme.tokens.colors.bg}`}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-slate-300"
                        style={{ backgroundColor: theme.tokens.colors.surface }}
                        title={`Surface: ${theme.tokens.colors.surface}`}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-slate-300"
                        style={{ backgroundColor: theme.tokens.colors.accent }}
                        title={`Accent: ${theme.tokens.colors.accent}`}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-slate-300"
                        style={{ backgroundColor: theme.tokens.colors.text }}
                        title={`Text: ${theme.tokens.colors.text}`}
                      />
                    </div>
                  </div>

                  {/* Typography Pairing */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-semibold text-[11px]">Typography:</span>
                    <span className="text-slate-700 text-[11px] truncate max-w-[160px] font-mono font-bold">
                      {theme.tokens.typography.headingWeight}w • {theme.layout.pattern}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleApplyTheme(theme)}
                      disabled={isActive || isApplying}
                      className={`flex-1 py-2.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isActive
                          ? "bg-slate-100 text-slate-500 cursor-default"
                          : isApplying
                          ? "bg-[#991B1B]/80 text-white animate-pulse"
                          : "bg-[#991B1B] hover:bg-[#7F1D1D] text-white shadow-md shadow-[#991B1B]/20"
                      }`}
                    >
                      {isActive ? (
                        <>
                          <Check size={13} className="text-[#991B1B]" /> Active Theme
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
                      className="p-2.5 rounded-full bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 transition-colors"
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
