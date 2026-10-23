"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Sliders, 
  CheckCircle2, 
  ExternalLink, 
  Lock, 
  Globe, 
  Layers, 
  Check, 
  Eye, 
  RefreshCw,
  Info
} from "lucide-react";
import { FolioVedaLogo } from "@/components/ui/Logo";
import { StyleProfile, ClosenessLevel } from "@/types/inspiration";
import { ThemePackage } from "@/types/theme";
import { ThemeRenderer } from "@/components/portfolio/engine/ThemeRenderer";
import { mapUserToPortfolioContent } from "@/lib/themes/registry";

export default function InspirationPage() {
  const [userData, setUserData] = useState<any>(null);
  const [inputUrl, setInputUrl] = useState("https://pattin.design");
  const [userConsent, setUserConsent] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Inspiration Analysis & Theme State
  const [requestId, setRequestId] = useState<string | null>(null);
  const [extractedProfile, setExtractedProfile] = useState<StyleProfile | null>(null);
  const [closeness, setCloseness] = useState<ClosenessLevel>("medium");
  const [generatedTheme, setGeneratedTheme] = useState<ThemePackage | null>(null);

  // Application feedback toast
  const [appliedToast, setAppliedToast] = useState<{ name: string; url: string } | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  // Load user data on mount
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/portfolio");
        if (res.ok) {
          const data = await res.json();
          if (data.user) setUserData(data.user);
        }
      } catch (err) {
        console.warn("Could not load user in inspiration studio:", err);
      }
    }
    loadUser();
  }, []);

  const normalizedContent = mapUserToPortfolioContent(userData);

  // 1. Analyze Inspiration URL
  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userConsent) {
      setErrorMsg("You must confirm you are using this site solely for design inspiration.");
      return;
    }

    setErrorMsg(null);
    setIsAnalyzing(true);

    try {
      const res = await fetch("/api/inspiration/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: inputUrl,
          userConsent: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to analyze inspiration URL.");
      }

      setRequestId(data.requestId);
      setExtractedProfile(data.styleProfile);

      // Immediately trigger theme generation with current closeness
      await handleGenerateTheme(data.requestId, closeness);
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred while analyzing the target site.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 2. Generate Theme with Closeness
  const handleGenerateTheme = async (reqId: string, level: ClosenessLevel) => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/inspiration/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId: reqId,
          closeness: level,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate theme.");
      }

      setGeneratedTheme(data.theme);
      setCloseness(level);
    } catch (err: any) {
      setErrorMsg(err.message || "Theme generation failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  // 3. Apply Generated Theme to Live Portfolio
  const handleApplyTheme = async () => {
    if (!generatedTheme) return;
    setIsApplying(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: generatedTheme.layout.pattern === "terminal-grid" ? "developer-terminal" : generatedTheme.layout.pattern === "centered-editorial" ? "minimal-editorial" : "bold-poster",
          themeId: generatedTheme.id,
          name: normalizedContent.name,
        }),
      });

      if (res.ok) {
        const slug = encodeURIComponent(normalizedContent.name);
        setAppliedToast({
          name: generatedTheme.name,
          url: `/p/${slug}`,
        });
        setTimeout(() => setAppliedToast(null), 5000);
      }
    } catch (err) {
      console.error("Failed to apply theme:", err);
    } finally {
      setIsApplying(false);
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
            <span className="text-xs font-mono text-slate-400 hidden md:inline">/ Inspiration Engine</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/styles"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 border border-white/[0.08] text-slate-300 hover:text-white transition-colors"
            >
              Style Gallery
            </Link>
            <Link
              href={`/p/${usernameSlug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md shadow-emerald-500/20"
            >
              <ExternalLink size={13} /> My Live Site
            </Link>
          </div>
        </div>
      </header>

      {/* Applied Toast */}
      {appliedToast && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 border border-emerald-500/50 shadow-2xl rounded-xl p-4 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={20} className="text-emerald-400" />
          <div className="text-xs">
            <p className="font-bold text-white">Inspired Theme Applied!</p>
            <p className="text-slate-400">
              Live on your portfolio under an original, copyright-compliant theme package.
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

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Explainer & Non-Negotiable Copyright Disclaimer */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium mb-3">
            <Sparkles size={13} /> "Make Mine Feel Like This" Engine
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
            Extract Aesthetic DNA. Keep 100% Originality.
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-4">
            Paste any public portfolio or website you love. Our system extracts the abstract layout rhythm, typography category, and color mood into a custom theme package filled with <strong>your own verified data</strong>.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-start gap-3 text-xs text-slate-300">
            <ShieldCheck size={18} className="text-emerald-400 mt-0.5 shrink-0" />
            <p className="leading-relaxed">
              <strong className="text-white">Copyright & Legal Safety Promise:</strong> We never copy HTML, CSS, JavaScript, text, images, or proprietary font files. Fonts are matched to licensed Google Fonts, and components are rendered strictly from our own modular engine.
            </p>
          </div>
        </div>

        {/* Input & URL Form */}
        <div className="rounded-2xl border border-white/[0.08] bg-slate-900/80 p-6 mb-10 shadow-lg">
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-2">
                Public Portfolio or Inspiration URL
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="url"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://pattin.design or https://leerob.io"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-white/[0.08] text-white text-sm font-mono focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isAnalyzing || !userConsent}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Analyzing Traits...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} />
                      <span>Extract & Synthesize Theme</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Mandatory User Consent Checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="consentCheck"
                checked={userConsent}
                onChange={(e) => setUserConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 bg-slate-950 border-white/20"
              />
              <label htmlFor="consentCheck" className="text-xs text-slate-400 cursor-pointer leading-relaxed">
                I confirm: <strong className="text-slate-200">"I'm using this site only as design inspiration and I will not publish anyone else's content as mine."</strong>
              </label>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-xs text-red-300">
                {errorMsg}
              </div>
            )}
          </form>
        </div>

        {/* RESULTS & SIDE-BY-SIDE VIEW */}
        {extractedProfile && (
          <div className="space-y-8 animate-in fade-in-50 duration-500">
            {/* Closeness Slider Controls */}
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-slate-900/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">
                  Originality & Closeness Slider
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  How close should the inspired feeling be?
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Even at "Close", our Similarity Guard guarantees the layout remains 100% original code.
                </p>
              </div>

              {/* 3-Step Slider Toggle */}
              <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-white/[0.08] text-xs font-semibold">
                {(["loose", "medium", "close"] as ClosenessLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => requestId && handleGenerateTheme(requestId, level)}
                    disabled={isGenerating}
                    className={`px-4 py-2 rounded-lg capitalize transition-all ${
                      closeness === level
                        ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* SIDE-BY-SIDE CONTAINER */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT PANE: EXTRACTED ABSTRACT TRAITS BREAKDOWN */}
              <div className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-slate-900 p-6 space-y-6">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                    Abstract Trait Extraction
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">
                    Inspiration Profile Breakdown
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Extracted from <span className="font-mono text-slate-300">{inputUrl}</span>
                  </p>
                </div>

                <div className="space-y-3 text-xs divide-y divide-white/[0.08]">
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-slate-400">Detected Mood:</span>
                    <span className="font-mono font-bold uppercase text-emerald-400">
                      {extractedProfile.detectedMood}
                    </span>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <span className="text-slate-400">Layout Pattern:</span>
                    <span className="font-mono text-slate-200">
                      {extractedProfile.layoutPattern}
                    </span>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <span className="text-slate-400">Typography Category:</span>
                    <span className="font-mono text-slate-200">
                      {extractedProfile.fontCategory}
                    </span>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <span className="text-slate-400">Surface Luminance:</span>
                    <span className="font-mono capitalize text-slate-200">
                      {extractedProfile.surfaceBrightness}
                    </span>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <span className="text-slate-400">Density & Spacing:</span>
                    <span className="font-mono capitalize text-slate-200">
                      {extractedProfile.density}
                    </span>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <span className="text-slate-400">Inspired Accent:</span>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: extractedProfile.accentColor }}
                      />
                      <span className="font-mono text-slate-300">{extractedProfile.accentColor}</span>
                    </div>
                  </div>
                </div>

                {/* Safety Checklist */}
                <div className="p-4 rounded-xl bg-slate-950 border border-white/[0.08] space-y-2 text-xs">
                  <span className="font-bold text-slate-300 block mb-1">Copyright Compliance Guard:</span>
                  <div className="flex items-center gap-2 text-emerald-400 text-[11px]">
                    <Check size={12} /> Zero proprietary HTML/CSS copied
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 text-[11px]">
                    <Check size={12} /> Open-source Google Fonts substituted
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 text-[11px]">
                    <Check size={12} /> Filled with your verified career data
                  </div>
                </div>

                {/* Apply Button */}
                <button
                  onClick={handleApplyTheme}
                  disabled={!generatedTheme || isApplying}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isApplying ? "Applying to Portfolio..." : "Apply Theme to My Live Portfolio"}
                </button>
              </div>

              {/* RIGHT PANE: LIVE GENERATED RESULT WITH USER'S REAL CONTENT */}
              <div className="lg:col-span-8 rounded-2xl border border-white/[0.08] bg-slate-900 overflow-hidden shadow-2xl">
                {/* Browser Viewport Chrome */}
                <div className="bg-slate-950 px-4 py-3 border-b border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                    </div>
                    <span className="ml-2 text-slate-300">
                      folioveda.me/{normalizedContent.name.toLowerCase().replace(/\s+/g, "")}
                    </span>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                    Original Theme • {closeness.toUpperCase()}
                  </span>
                </div>

                {/* Live Sandboxed Theme Canvas */}
                <div className="max-h-[640px] overflow-y-auto">
                  {generatedTheme ? (
                    <ThemeRenderer
                      theme={generatedTheme}
                      content={normalizedContent}
                      isDemo={false}
                      hideBadge={true}
                    />
                  ) : (
                    <div className="py-24 text-center text-slate-500 text-xs">
                      Synthesizing inspired theme...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
