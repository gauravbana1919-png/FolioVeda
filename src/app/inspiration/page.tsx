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
  Info,
  ArrowRight
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
  const [analysisNotice, setAnalysisNotice] = useState<string | null>(null);
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

  // 1. Analyze External URL
  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userConsent) {
      setErrorMsg("Please accept the originality confirmation checkbox.");
      return;
    }

    setErrorMsg(null);
    setIsAnalyzing(true);
    setGeneratedTheme(null);
    setExtractedProfile(null);
    setAnalysisNotice(null);

    try {
      const res = await fetch("/api/inspiration/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: inputUrl, userConsent: true }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Analysis failed.");
      }

      setRequestId(data.requestId);
      setExtractedProfile(data.styleProfile);
      if (data.notice) setAnalysisNotice(data.notice);

      // Automatically synthesize medium closeness theme
      await handleGenerateTheme(data.requestId, "medium");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to analyze URL.");
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
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] selection:bg-[#173f32] selection:text-white font-sans antialiased">
      
      {/* Top Header: Clean & consistent with Main Landing */}
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
            <span className="text-slate-400 text-xs font-medium hidden md:inline">/ Inspiration Studio</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/styles"
              className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#173f32] transition-colors"
            >
              Style Gallery
            </Link>
            <Link
              href={`/p/${usernameSlug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full bg-[#173f32] hover:bg-[#13352a] text-white transition-all shadow-md shadow-[#173f32]/20"
            >
              <ExternalLink size={13} /> My Live Site
            </Link>
          </div>
        </div>
      </header>

      {/* Applied Toast */}
      {appliedToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#1E293B] text-white border-2 border-[#173f32] shadow-2xl rounded-2xl p-4 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={20} className="text-[#173f32]" />
          <div className="text-xs">
            <p className="font-bold text-white">Inspired Theme Applied!</p>
            <p className="text-slate-300">
              Live on your portfolio under an original, copyright-compliant theme package.
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

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Explainer & Non-Negotiable Copyright Disclaimer */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#173f32] text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkles size={13} /> &quot;MAKE MINE FEEL LIKE THIS&quot; ENGINE
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1E293B] mb-3">
            Extract Aesthetic DNA. Keep 100% Originality.
          </h1>
          <p className="text-base text-slate-600 font-normal leading-relaxed mb-4">
            Paste any public portfolio or website you love. Our system extracts the abstract layout rhythm, typography category, and color mood into a custom theme package filled with <strong className="text-slate-900 font-bold">your own verified data</strong>.
          </p>

          <div className="p-4 rounded-2xl bg-white border border-[#1E293B]/10 shadow-xs flex items-start gap-3 text-xs text-slate-700">
            <ShieldCheck size={20} className="text-[#173f32] mt-0.5 shrink-0" />
            <p className="leading-relaxed">
              <strong className="text-[#1E293B] font-bold">Copyright &amp; Legal Safety Promise:</strong> We never copy HTML, CSS, JavaScript, text, images, or proprietary font files. Fonts are matched to licensed Google Fonts, and components are rendered strictly from our own modular engine.
            </p>
          </div>
        </div>

        {/* Input & URL Form */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 mb-10 shadow-lg">
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Public Portfolio or Inspiration URL
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="url"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://dribbble.com/shots/... or https://pinterest.com/pin/... or any portfolio URL"
                    className="w-full pl-10 pr-4 py-3.5 rounded-full bg-slate-50 border border-slate-200 text-[#1E293B] text-sm font-medium focus:border-[#173f32] focus:outline-none focus:ring-1 focus:ring-[#173f32]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isAnalyzing || !userConsent}
                  className="px-7 py-3.5 rounded-full bg-[#173f32] hover:bg-[#13352a] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#173f32]/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Analyzing Traits...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} />
                      <span>Extract &amp; Synthesize Theme</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Helper text for supported sites */}
            <p className="text-xs text-slate-500 mt-2">
              💡 Works with Pinterest, Dribbble, Behance, personal portfolio sites, and more.
              If the site blocks direct access, we extract style signals from the URL itself.
            </p>

            {/* Mandatory User Consent Checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="consentCheck"
                checked={userConsent}
                onChange={(e) => setUserConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#173f32] focus:ring-[#173f32] border-slate-300"
              />
              <label htmlFor="consentCheck" className="text-xs text-slate-600 cursor-pointer leading-relaxed">
                I confirm: <strong className="text-slate-900 font-bold">&quot;I&apos;m using this site only as design inspiration and I will not publish anyone else&apos;s content as mine.&quot;</strong>
              </label>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                {errorMsg}
              </div>
            )}
          </form>
        </div>

        {/* RESULTS & SIDE-BY-SIDE VIEW */}
        {extractedProfile && (
          <div className="space-y-8 animate-in fade-in-50 duration-500">
            {/* URL-pattern fallback notice banner */}
            {analysisNotice && analysisNotice.includes('URL patterns') && (
              <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-700 font-medium flex items-center gap-2">
                <span>⚡</span>
                <span>Style extracted from URL signals (the site blocked direct access — results are approximate)</span>
              </div>
            )}
            {/* Closeness Slider Controls */}
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase text-[#173f32] tracking-wider">
                  Originality &amp; Closeness Slider
                </span>
                <h3 className="text-lg font-extrabold text-[#1E293B] mt-0.5 font-sans">
                  How close should the inspired feeling be?
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-normal">
                  Even at &quot;Close&quot;, our Similarity Guard guarantees the layout remains 100% original code.
                </p>
              </div>

              {/* 3-Step Slider Toggle */}
              <div className="flex items-center p-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold">
                {(["loose", "medium", "close"] as ClosenessLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => requestId && handleGenerateTheme(requestId, level)}
                    disabled={isGenerating}
                    className={`px-4 py-2 rounded-full capitalize transition-all ${
                      closeness === level
                        ? "bg-[#173f32] text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
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
              <div className="lg:col-span-4 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-md">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#173f32]">
                    Abstract Trait Extraction
                  </span>
                  <h3 className="text-lg font-extrabold text-[#1E293B] mt-1 font-sans">
                    Inspiration Profile Breakdown
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Extracted from <span className="font-mono text-slate-700 font-bold">{inputUrl}</span>
                  </p>
                </div>

                <div className="space-y-3 text-xs divide-y divide-slate-100 font-medium">
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-slate-500">Detected Mood:</span>
                    <span className="font-bold uppercase text-[#173f32]">
                      {extractedProfile.detectedMood}
                    </span>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <span className="text-slate-500">Layout Pattern:</span>
                    <span className="font-mono text-slate-800 font-bold">
                      {extractedProfile.layoutPattern}
                    </span>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <span className="text-slate-500">Typography Category:</span>
                    <span className="font-mono text-slate-800 font-bold">
                      {extractedProfile.fontCategory}
                    </span>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <span className="text-slate-500">Surface Luminance:</span>
                    <span className="capitalize text-slate-800 font-bold">
                      {extractedProfile.surfaceBrightness}
                    </span>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <span className="text-slate-500">Density &amp; Spacing:</span>
                    <span className="capitalize text-slate-800 font-bold">
                      {extractedProfile.density}
                    </span>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <span className="text-slate-500">Inspired Accent:</span>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border border-slate-300"
                        style={{ backgroundColor: extractedProfile.accentColor }}
                      />
                      <span className="font-mono text-slate-800 font-bold">{extractedProfile.accentColor}</span>
                    </div>
                  </div>
                </div>

                {/* Safety Checklist */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <span className="font-bold text-slate-800 block mb-1">Copyright Compliance Guard:</span>
                  <div className="flex items-center gap-2 text-emerald-700 text-[11px] font-semibold">
                    <Check size={12} /> Zero proprietary HTML/CSS copied
                  </div>
                  <div className="flex items-center gap-2 text-emerald-700 text-[11px] font-semibold">
                    <Check size={12} /> Open-source Google Fonts substituted
                  </div>
                  <div className="flex items-center gap-2 text-emerald-700 text-[11px] font-semibold">
                    <Check size={12} /> Filled with your verified career data
                  </div>
                </div>

                {/* Apply Button */}
                <button
                  onClick={handleApplyTheme}
                  disabled={!generatedTheme || isApplying}
                  className="w-full py-3.5 rounded-full bg-[#173f32] hover:bg-[#13352a] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#173f32]/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isApplying ? "Applying to Portfolio..." : "Apply Theme to My Live Portfolio"}
                </button>
              </div>

              {/* RIGHT PANE: LIVE GENERATED RESULT WITH USER'S REAL CONTENT */}
              <div className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-2xl">
                {/* Browser Viewport Chrome */}
                <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    </div>
                    <span className="ml-2 text-slate-200">
                      folioveda.me/{normalizedContent.name.toLowerCase().replace(/\s+/g, "")}
                    </span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                    Original Theme • {closeness.toUpperCase()}
                  </span>
                </div>

                {/* Live Sandboxed Theme Canvas */}
                <div className="max-h-[640px] overflow-y-auto bg-slate-50">
                  {generatedTheme ? (
                    <ThemeRenderer
                      theme={generatedTheme}
                      content={normalizedContent}
                      isDemo={false}
                      hideBadge={true}
                    />
                  ) : (
                    <div className="py-24 text-center text-slate-500 text-xs font-medium">
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
