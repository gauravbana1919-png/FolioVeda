"use client";

import React, { useState, useEffect } from "react";
import { PortfolioContent } from "@/types/content";
import { Sparkles, Loader2, Download, ExternalLink, AlertCircle, Monitor, Smartphone, Globe, RefreshCw } from "lucide-react";

interface Props {
  userContent: PortfolioContent;
}

export function InspirationClonePreview({ userContent }: Props) {
  const [url, setUrl] = useState("https://www.wallofportfolios.in/portfolios/loveleen-pereira/");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [activeSiteName, setActiveSiteName] = useState("Loveleen Pereira (Luxe)");

  const handleGenerate = async (targetUrl?: string, siteName?: string) => {
    const finalUrl = (targetUrl || url).trim();
    if (!finalUrl) return;

    if (targetUrl) setUrl(targetUrl);
    if (siteName) setActiveSiteName(siteName);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/inspiration/clone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: finalUrl,
          content: userContent,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to generate portfolio.");
      }

      setGeneratedHtml(data.html);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Pre-generate live preview on mount if not yet generated, or read ?url=
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const incomingUrl = params.get("url");
      if (incomingUrl) {
        setUrl(incomingUrl);
        handleGenerate(incomingUrl, "Custom Inspiration Site");
        return;
      }
    }

    if (!generatedHtml && !loading) {
      handleGenerate("https://www.wallofportfolios.in/portfolios/loveleen-pereira/", "Loveleen Pereira (Luxe)");
    }
  }, []);

  const handleDownloadHtml = () => {
    if (!generatedHtml) return;
    const blob = new Blob([generatedHtml], { type: "text/html;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${(userContent.name || "portfolio").toLowerCase().replace(/\s+/g, "-")}-inspired.html`;
    link.click();
  };

  const handleOpenNewTab = () => {
    if (!generatedHtml) return;
    const blob = new Blob([generatedHtml], { type: "text/html;charset=utf-8" });
    window.open(URL.createObjectURL(blob), "_blank");
  };

  const quickReferenceSites = [
    { name: "🌸 Loveleen Pereira (Desk Mat)", url: "https://www.wallofportfolios.in/portfolios/loveleen-pereira/" },
    { name: "📖 Sharvari Marathe (Zine Shelf)", url: "https://www.wallofportfolios.in/portfolios/sharvari-marathe/" },
    { name: "🌲 Rolan Gomes (Cutting Mat)", url: "https://www.wallofportfolios.in/portfolios/rolan-gomes/" },
    { name: "🎬 Himanshu Singh (Studio)", url: "https://www.wallofportfolios.in/portfolios/himanshu-singh/" },
    { name: "⚡ Sudarvel K (Tactical)", url: "https://www.wallofportfolios.in/portfolios/sudar/" },
    { name: "💼 Tanuja (Product Design)", url: "https://www.wallofportfolios.in/portfolios/tanuja/" },
  ];

  return (
    <div className="space-y-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> AI Layout Synthesis Engine
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Paste ANY Reference Portfolio URL
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Gemini extracts the target site's exact visual system (typography hierarchy, spacing rhythms, color palettes, and responsive grids) and synthesizes a complete bespoke HTML5 + Tailwind CSS portfolio using <strong className="text-white font-semibold">{userContent.name}</strong>'s real data.
        </p>
      </div>

      {/* Quick 1-Click Reference Badges */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">Try Top References:</span>
        {quickReferenceSites.map((site, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleGenerate(site.url, site.name)}
            disabled={loading}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all disabled:opacity-50 cursor-pointer ${
              url === site.url
                ? "bg-emerald-500 text-slate-950 font-bold shadow-sm shadow-emerald-500/30"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700"
            }`}
          >
            {site.name}
          </button>
        ))}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            <Globe className="w-4 h-4" />
          </div>
          <input
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.wallofportfolios.in/portfolios/loveleen-pereira/"
            disabled={loading}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-mono focus:outline-none focus:border-emerald-500 disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 shadow-lg shadow-emerald-600/20"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin"/>
              <span>Synthesizing Design (~15-20s)...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4"/>
              <span>Synthesize Exact Style</span>
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0"/>
          <span>{error}</span>
        </div>
      )}

      {generatedHtml && (
        <div className="rounded-2xl border border-slate-700 bg-slate-950 overflow-hidden shadow-2xl animate-in fade-in duration-300">
          {/* Toolbar */}
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewport("desktop")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  viewport === "desktop" ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <Monitor className="w-3.5 h-3.5"/> Desktop
              </button>
              <button
                onClick={() => setViewport("mobile")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  viewport === "mobile" ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5"/> Mobile View
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenNewTab}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
              >
                <ExternalLink className="w-3.5 h-3.5"/> Open Fullscreen
              </button>
              <button
                onClick={handleDownloadHtml}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
              >
                <Download className="w-3.5 h-3.5"/> Download HTML
              </button>
            </div>
          </div>

          {/* Live Sandboxed Preview */}
          <div className="bg-slate-950 flex justify-center p-3 sm:p-6 overflow-hidden">
            <iframe
              srcDoc={generatedHtml}
              title="Generated Portfolio Preview"
              sandbox="allow-scripts allow-same-origin allow-popups"
              className={`h-[780px] bg-white rounded-xl shadow-2xl transition-all duration-300 border border-slate-800 ${
                viewport === "mobile" ? "w-[390px]" : "w-full"
              }`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
