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
  ArrowRight,
  Maximize2,
  X,
  Image as ImageIcon
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
  const [viewModes, setViewModes] = useState<Record<string, "pin" | "sandbox">>({});
  const [lightboxPin, setLightboxPin] = useState<{
    name: string;
    category: string;
    mood: string;
    image: string;
    pinterestUrl?: string;
    title?: string;
  } | null>(null);

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
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] selection:bg-[#173f32] selection:text-white font-sans antialiased">
      
      {/* Top Navigation: Clean, matching the main landing page */}
      <header className="sticky top-0 z-50 w-full border-b border-[#1E293B]/10 bg-[#F8F9FA]/90 backdrop-blur-xl px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-[#1E293B]/10 text-slate-700 hover:text-[#173f32] hover:border-[#173f32]/40 transition-colors shadow-2xs"
            >
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <FolioVedaLogo size="sm" />
            </Link>
            <span className="text-slate-400 text-xs font-medium hidden md:inline">/ Style Gallery</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/hub"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-[#1E293B]/10 text-slate-700 hover:text-[#173f32] transition-colors"
            >
              Master Hub ↗
            </Link>
            <Link
              href={`/p/${usernameSlug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full bg-[#173f32] hover:bg-[#13352a] text-white transition-all shadow-md shadow-[#173f32]/20"
            >
              <ExternalLink size={13} /> View Live Profile
            </Link>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {appliedToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#1E293B] text-white border-2 border-[#173f32] shadow-2xl rounded-2xl p-4 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={20} className="text-[#173f32]" />
          <div className="text-xs">
            <p className="font-bold text-white">Theme Applied Successfully!</p>
            <p className="text-slate-300">
              <span className="text-red-300 font-bold">{appliedToast.name}</span> is now active on your portfolio.
            </p>
          </div>
          <Link
            href={appliedToast.url}
            target="_blank"
            className="ml-2 px-3 py-1 rounded-full bg-[#173f32] text-white font-bold text-xs hover:bg-[#13352a] transition-colors"
          >
            Visit ↗
          </Link>
        </div>
      )}

      {/* Main Gallery Container */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Title & Explainer (Bold, attractive, zero italic) */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-[#173f32] text-xs font-bold tracking-wide uppercase mb-4">
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
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center shrink-0 shadow-2xs">
                <Sparkles size={24} className="text-emerald-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#173f32]">
                    Recommended Match ({topPick.theme.category} • {topPick.theme.mood})
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#173f32] text-white">
                    TOP MATCH ({topPick.score}%)
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#1E293B] mt-1 font-sans">
                  {topPick.theme.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed font-normal">
                  {topPick.reason}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#173f32]">
                    <CheckCircle2 size={12} className="text-[#10B981]" /> Verified Production Blueprint ({topPick.theme.layout.pattern})
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => handleApplyTheme(topPick.theme)}
                disabled={activeThemeId === topPick.theme.id || applyingThemeId === topPick.theme.id}
                className="w-full md:w-auto px-6 py-3 rounded-full bg-[#173f32] hover:bg-[#13352a] disabled:bg-slate-200 disabled:text-slate-500 text-white font-bold text-xs transition-all shadow-md shadow-[#173f32]/20"
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

        {/* Quick-Select Curated Signature Archetypes Bar */}
        <div className="mb-6 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#173f32] animate-pulse" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                FolioVeda Signature Archetypes:
              </span>
            </div>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              Click any archetype to filter instantly
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { label: "tech • formal", category: "tech", mood: "formal", themeId: "developer-terminal" },
              { label: "design • calm", category: "design", mood: "calm", themeId: "minimal-editorial" },
              { label: "creative • bold", category: "creative", mood: "bold", themeId: "bold-poster" },
              { label: "business • formal", category: "business", mood: "formal", themeId: "corporate-clean" },
              { label: "creative • playful", category: "creative", mood: "playful", themeId: "creative-collage" },
              { label: "design • formal", category: "design", mood: "formal", themeId: "case-study-heavy" },
              { label: "tech • bold", category: "tech", mood: "bold", themeId: "dark-showcase" },
            ].map((preset) => {
              const isMatch = selectedCategory === preset.category && selectedMood === preset.mood;
              return (
                <button
                  key={preset.label}
                  onClick={() => {
                    if (isMatch) {
                      setSelectedCategory("all");
                      setSelectedMood("all");
                    } else {
                      setSelectedCategory(preset.category);
                      setSelectedMood(preset.mood);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isMatch
                      ? "bg-[#173f32] text-white shadow-xs"
                      : "bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-[#173f32] border border-slate-200"
                  }`}
                >
                  <span className={isMatch ? "text-white" : "text-[#173f32]"}>•</span>
                  <span>{preset.label}</span>
                </button>
              );
            })}
            
            {(selectedCategory !== "all" || selectedMood !== "all") && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedMood("all");
                }}
                className="px-3 py-1.5 rounded-full text-xs font-bold text-slate-500 hover:text-slate-900 bg-slate-50 border border-slate-200 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <span className="text-xs font-bold text-slate-500 uppercase mr-1">Category:</span>
            {[
              { id: "all", label: "All Styles" },
              { id: "tech", label: "Tech / Engineering" },
              { id: "design", label: "Product & Design" },
              { id: "business", label: "Business & Executive" },
              { id: "creative", label: "Creative & Poster" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#173f32] text-white shadow-xs"
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
              { id: "playful", label: "Playful" },
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
            const currentMode = viewModes[theme.id] || "sandbox";

            return (
              <div
                key={theme.id}
                className={`rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden bg-white shadow-sm hover:shadow-xl ${
                  isActive
                    ? "border-[#173f32] ring-2 ring-[#173f32]/30"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                {/* Theme Header Info */}
                <div className="p-5 border-b border-slate-100 bg-slate-50/70">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#173f32] bg-red-50 border border-red-200/80 px-2.5 py-0.5 rounded-full">
                      {theme.category} • {theme.mood}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {theme.layout.pattern}
                      </span>
                      {isActive && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                          <Check size={10} /> Active
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#1E293B] tracking-tight">
                    {theme.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 font-normal">
                    {theme.inspirationTitle ? (
                      <span className="text-slate-700 font-medium">{theme.inspirationTitle}</span>
                    ) : (
                      <>
                        Pattern: <span className="text-slate-800 font-mono font-bold">{theme.layout.pattern}</span> • Motion:{" "}
                        <span className="text-slate-800 font-medium">{theme.tokens.motion.level}</span>
                      </>
                    )}
                  </p>

                  {/* Mode Switcher: Pinterest Design Pin vs Live Sandbox */}
                  <div className="mt-3 flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl text-[11px] font-bold">
                    <button
                      onClick={() => setViewModes((prev) => ({ ...prev, [theme.id]: "pin" }))}
                      disabled={!theme.previewImage}
                      className={`flex-1 py-1 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        currentMode === "pin"
                          ? "bg-white text-slate-900 shadow-2xs font-extrabold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <ImageIcon size={12} className={currentMode === "pin" ? "text-[#173f32]" : ""} />
                      <span>Design Blueprint</span>
                    </button>
                    <button
                      onClick={() => setViewModes((prev) => ({ ...prev, [theme.id]: "sandbox" }))}
                      className={`flex-1 py-1 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        currentMode === "sandbox"
                          ? "bg-white text-slate-900 shadow-2xs font-extrabold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Code2 size={12} className={currentMode === "sandbox" ? "text-[#173f32]" : ""} />
                      <span>Live Sandbox</span>
                    </button>
                  </div>
                </div>

                {/* Visual Viewport: Either Pinterest Pin Image or Sandbox */}
                <div className="p-4 bg-slate-100">
                  {currentMode === "pin" && theme.previewImage ? (
                    <div 
                      onClick={() => setLightboxPin({
                        name: theme.name,
                        category: theme.category,
                        mood: theme.mood,
                        image: theme.previewImage!,
                        pinterestUrl: theme.pinterestUrl,
                        title: theme.inspirationTitle,
                      })}
                      className="relative rounded-2xl border border-slate-200 overflow-hidden h-[340px] shadow-sm group cursor-pointer bg-slate-900"
                    >
                      <img
                        src={theme.previewImage}
                        alt={`${theme.name} design blueprint`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                      
                      {/* Top badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-wider border border-white/20">
                          {theme.category} • {theme.mood}
                        </span>
                      </div>

                      {/* Expand action pill */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-900 text-[10px] font-bold shadow-md">
                          <Maximize2 size={11} /> Zoom
                        </span>
                      </div>

                      {/* Bottom caption */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="text-xs font-bold truncate drop-shadow-sm">
                          {theme.inspirationTitle || theme.name}
                        </p>
                        <p className="text-[10px] text-slate-300 flex items-center justify-between mt-0.5">
                          <span>Click to expand design board</span>
                          <span className="text-red-300 underline font-semibold">Inspect ↗</span>
                        </p>
                      </div>
                    </div>
                  ) : (
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
                  )}
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
                          ? "bg-[#173f32]/80 text-white animate-pulse"
                          : "bg-[#173f32] hover:bg-[#13352a] text-white shadow-md shadow-[#173f32]/20 cursor-pointer"
                      }`}
                    >
                      {isActive ? (
                        <>
                          <Check size={13} className="text-[#173f32]" /> Active Theme
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
                      title="Open full-screen live profile preview"
                    >
                      <Eye size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* High-Resolution Design Blueprint Lightbox Modal */}
        {lightboxPin && (
          <div 
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
            onClick={() => setLightboxPin(null)}
          >
            <div 
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#173f32] text-white text-xs font-bold uppercase tracking-wider">
                    {lightboxPin.category} • {lightboxPin.mood}
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-white">
                    {lightboxPin.name} — Blueprint
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLightboxPin(null)}
                    className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Modal Body / Image Viewer */}
              <div className="p-4 sm:p-6 overflow-y-auto flex items-center justify-center bg-black/40">
                <img
                  src={lightboxPin.image}
                  alt={lightboxPin.name}
                  className="max-h-[75vh] w-auto object-contain rounded-2xl border border-slate-800 shadow-2xl"
                />
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
                <p className="truncate max-w-xl font-medium">
                  {lightboxPin.title || "Curated Portfolio Architectural Blueprint"}
                </p>
                <span className="font-mono text-[11px] text-slate-500">
                  FolioVeda Style Matrix
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
