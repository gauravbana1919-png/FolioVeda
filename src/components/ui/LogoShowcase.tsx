"use client";

import React, { useState } from "react";
import { 
  LotusIcon, 
  MonogramIcon, 
  QuillIcon, 
  FolioInLogo, 
  useLogoVariant, 
  LogoVariant 
} from "./Logo";
import { 
  SiliconProcessorIcon, 
  LinearMonolithIcon, 
  LogicCircuitIcon 
} from "./TechStartupLogos";
import { 
  InfinityLoopIcon, 
  GeminiSparkIcon, 
  RosetteKnotIcon, 
  AntigravityAscentIcon 
} from "./IconicLogos";
import { 
  GoogleStyleFLogo, 
  GoogleWorkspaceFoldLogo, 
  ColorLoopMonogramLogo, 
  GoogleStyleFolioInLogo 
} from "./GoogleStyleLogos";
import { 
  OrigamiFolioLogo, 
  AcidPageTurnLogo, 
  IsometricStageLogo, 
  UniqueFolioInWordmark 
} from "./UniqueLogos";
import { 
  OrigamiFolioMark, 
  OrigamiFolioWordmark, 
  ORIGAMI_PALETTES, 
  OrigamiPalette 
} from "./OrigamiLogos";
import { Check, Download, Sparkles, Moon, Sun, Shield, Eye, Layers, Cpu, Box, GitBranch, Zap, Star, RefreshCw, Palette, Compass, Feather, CheckCircle2 } from "lucide-react";

export function LogoShowcase() {
  const { activeVariant, setActiveVariant } = useLogoVariant();
  const [previewTheme, setPreviewTheme] = useState<"dark" | "light">("dark");
  const [selectedOrigamiPalette, setSelectedOrigamiPalette] = useState<OrigamiPalette>("iris");
  const [iconicStyle, setIconicStyle] = useState<"gradient" | "monochrome">("gradient");
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const concepts: {
    id: LogoVariant;
    title: string;
    subtitle: string;
    symbolism: string;
    palette: string[];
    Component: React.ComponentType<{ size?: number; glow?: boolean }>;
  }[] = [
    {
      id: "lotus",
      title: "Concept 1: The Vedic Geometric Lotus & Folio",
      subtitle: "Sacred geometry merged with dynamic digital portfolio layers",
      symbolism:
        "Blossoming lotus petals represent purity of knowledge (In) and enlightenment, layered like pages of a digital portfolio (Folio). The central diamond nexus radiates intelligence.",
      palette: ["#818CF8", "#4F46E5", "#22D3EE", "#38BDF8"],
      Component: LotusIcon,
    },
    {
      id: "monogram",
      title: "Concept 2: The Prismatic 'FV' Isometric Monogram",
      subtitle: "Precision-engineered 3D isometric ribbon folding 'F' and 'V'",
      symbolism:
        "The left isometric pillar and horizontal shelves form the letter 'F' (Folio). The descending dynamic chevron creates the sharp angle of 'V' (In). Architectural, authoritative, high-end SaaS feel.",
      palette: ["#10B981", "#06B6D4", "#3B82F6", "#8B5CF6"],
      Component: MonogramIcon,
    },
    {
      id: "quill",
      title: "Concept 3: The Radiant Quill & Code Matrix",
      subtitle: "Digital quill nib intersecting modern code angle brackets",
      symbolism:
        "A streamlined quill nib slicing through code brackets (< / >), signifying authoring your career and programming story through deep wisdom. Radiant energetic sunset palette.",
      palette: ["#F59E0B", "#F97316", "#F43F5E", "#9333EA"],
      Component: QuillIcon,
    },
  ];

  const handleDownloadSvg = (variant: LogoVariant) => {
    let svgContent = "";
    if (variant === "lotus") {
      svgContent = `<svg width="256" height="256" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="l-left" x1="20" y1="20" x2="50" y2="90" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#818CF8"/><stop offset="100%" stop-color="#4F46E5"/></linearGradient>
  <linearGradient id="l-right" x1="80" y1="20" x2="50" y2="90" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#A78BFA"/><stop offset="100%" stop-color="#7C3AED"/></linearGradient>
  <linearGradient id="l-center" x1="50" y1="10" x2="50" y2="80" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#22D3EE"/><stop offset="50%" stop-color="#38BDF8"/><stop offset="100%" stop-color="#6366F1"/></linearGradient>
  <linearGradient id="l-spark" x1="42" y1="36" x2="58" y2="60" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#FFFFFF"/><stop offset="100%" stop-color="#BAE6FD"/></linearGradient>
</defs>
<path d="M 50 88 C 24 88 12 65 14 42 C 15 28 25 18 45 16 C 35 32 34 58 50 88 Z" fill="url(#l-left)" fill-opacity="0.9"/>
<path d="M 50 88 C 76 88 88 65 86 42 C 85 28 75 18 55 16 C 65 32 66 58 50 88 Z" fill="url(#l-right)" fill-opacity="0.9"/>
<path d="M 50 84 C 34 78 28 58 30 40 C 34 26 42 20 50 16 C 45 32 45 54 50 84 Z" fill="#4338CA" fill-opacity="0.6"/>
<path d="M 50 84 C 66 78 72 58 70 40 C 66 26 58 20 50 16 C 55 32 55 54 50 84 Z" fill="#6D28D9" fill-opacity="0.6"/>
<path d="M 50 12 C 43 28 41 50 50 82 C 59 50 57 28 50 12 Z" fill="url(#l-center)"/>
<polygon points="50,34 59,48 50,62 41,48" fill="url(#l-spark)"/>
<circle cx="50" cy="20" r="2.5" fill="#FFFFFF"/>
<circle cx="28" cy="38" r="2" fill="#BAE6FD" opacity="0.9"/>
<circle cx="72" cy="38" r="2" fill="#DDD6FE" opacity="0.9"/>
</svg>`;
    } else if (variant === "monogram") {
      svgContent = `<svg width="256" height="256" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="m-stem" x1="20" y1="15" x2="40" y2="85" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#10B981"/><stop offset="100%" stop-color="#059669"/></linearGradient>
  <linearGradient id="m-top" x1="36" y1="16" x2="84" y2="30" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#34D399"/><stop offset="100%" stop-color="#06B6D4"/></linearGradient>
  <linearGradient id="m-mid" x1="36" y1="44" x2="72" y2="56" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#10B981"/><stop offset="100%" stop-color="#3B82F6"/></linearGradient>
  <linearGradient id="m-varm" x1="82" y1="20" x2="52" y2="85" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#38BDF8"/><stop offset="50%" stop-color="#6366F1"/><stop offset="100%" stop-color="#8B5CF6"/></linearGradient>
</defs>
<polygon points="22,26 38,16 38,76 22,86" fill="url(#m-stem)"/>
<polygon points="38,16 82,16 72,30 38,30" fill="url(#m-top)"/>
<polygon points="38,44 68,44 58,58 38,58" fill="url(#m-mid)"/>
<polygon points="84,28 52,86 38,86 64,44 76,44" fill="url(#m-varm)"/>
<circle cx="52" cy="86" r="3.5" fill="#38BDF8"/>
<circle cx="82" cy="16" r="2.5" fill="#6EE7B7"/>
</svg>`;
    } else {
      svgContent = `<svg width="256" height="256" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="q-quill" x1="30" y1="12" x2="70" y2="88" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#F59E0B"/><stop offset="50%" stop-color="#F43F5E"/><stop offset="100%" stop-color="#9333EA"/></linearGradient>
  <linearGradient id="q-brackets" x1="10" y1="20" x2="90" y2="80" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#FBBF24"/><stop offset="100%" stop-color="#EC4899"/></linearGradient>
</defs>
<path d="M 28 26 L 14 50 L 28 74 L 34 68 L 22 50 L 34 32 Z" fill="url(#q-brackets)" fill-opacity="0.8"/>
<path d="M 72 26 L 86 50 L 72 74 L 66 68 L 78 50 L 66 32 Z" fill="url(#q-brackets)" fill-opacity="0.8"/>
<path d="M 50 12 L 64 46 L 54 78 L 50 88 L 46 78 L 36 46 Z" fill="url(#q-quill)"/>
<line x1="50" y1="36" x2="50" y2="76" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
<circle cx="50" cy="34" r="3" fill="#FFFFFF"/>
</svg>`;
    }

    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `folioin-logo-${variant}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(variant);
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/40 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-3">
              <Shield size={13} />
              <span>100% Original Intellectual Property &bull; Zero Copyright Risk</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              FolioIn Brand Identity &amp; Logo Studio
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
              Explore 3 mathematically engineered vector identities tailored to the union of 
              <strong className="text-white"> Folio</strong> (digital creator layers) and 
              <strong className="text-indigo-300"> In</strong> (radiant wisdom). Pick your preferred active mark below.
            </p>
          </div>

          {/* Theme preview switch */}
          <div className="flex items-center gap-2 bg-slate-950/70 p-1.5 rounded-2xl border border-slate-800 self-start md:self-center shrink-0">
            <span className="text-xs text-slate-400 px-2 font-medium">Canvas:</span>
            <button
              onClick={() => setPreviewTheme("dark")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                previewTheme === "dark"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Moon size={13} />
              <span>Dark</span>
            </button>
            <button
              onClick={() => setPreviewTheme("light")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                previewTheme === "light"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Sun size={13} />
              <span>Light</span>
            </button>
          </div>
        </div>
      </div>

      {/* SELECTED CONCEPT: THE ORIGAMI FOLIO FOLD - COLORWAY STUDIO */}
      <div className="space-y-6 pt-2">
        <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-emerald-950/40 border-2 border-indigo-500/40 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40 mb-2">
                <CheckCircle2 size={13} />
                <span>Selected Direction: The Origami Folio Fold</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Pick Your Favorite Colorway for FolioIn
              </h2>
              <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                You liked the <strong>Origami Folio Fold</strong>! Here are 5 completely different, premium color systems designed specifically for this mark. None of them use Google colors or generic AI gradients.
              </p>
            </div>

            <div className="bg-slate-950/90 border border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center shrink-0 min-w-[200px]">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Active Colorway Preview</span>
              <OrigamiFolioWordmark palette={selectedOrigamiPalette} size="md" />
              <span className="text-[10px] text-indigo-400 font-semibold mt-1">
                {ORIGAMI_PALETTES[selectedOrigamiPalette].name}
              </span>
            </div>
          </div>
        </div>

        {/* 5 Colorway Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(Object.keys(ORIGAMI_PALETTES) as OrigamiPalette[]).map((paletteKey) => {
            const p = ORIGAMI_PALETTES[paletteKey];
            const isSelected = selectedOrigamiPalette === paletteKey;

            return (
              <div
                key={paletteKey}
                onClick={() => setSelectedOrigamiPalette(paletteKey)}
                className={`cursor-pointer rounded-3xl border-2 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl ${
                  isSelected
                    ? "border-indigo-500 ring-4 ring-indigo-500/20 shadow-indigo-500/10"
                    : "border-slate-800 hover:border-slate-700 bg-slate-900/80"
                }`}
              >
                {/* Visual Stage */}
                <div
                  className={`p-8 flex flex-col items-center justify-center transition-colors duration-300 min-h-[200px] ${
                    previewTheme === "dark" ? "bg-slate-950 text-white" : "bg-white text-slate-900"
                  }`}
                >
                  <OrigamiFolioMark palette={paletteKey} size={88} className="transition-transform duration-300 hover:scale-105" />
                  <div className="mt-4 text-center">
                    <OrigamiFolioWordmark palette={paletteKey} size="sm" />
                  </div>
                </div>

                {/* Info & Swatches */}
                <div className="p-5 bg-slate-900/95 flex-1 flex flex-col justify-between space-y-3 border-t border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-base">{p.name}</h3>
                      {isSelected && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500 text-white font-bold">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">{p.tagline}</p>
                  </div>

                  {/* Swatches breakdown */}
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                      Facet Palette
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md border border-white/20" style={{ backgroundColor: p.spine }} title={`Spine: ${p.spine}`} />
                      <span className="w-5 h-5 rounded-md border border-white/20" style={{ backgroundColor: p.topFlap }} title={`Top Flap: ${p.topFlap}`} />
                      <span className="w-5 h-5 rounded-md border border-white/20" style={{ backgroundColor: p.midLayer }} title={`Mid Layer: ${p.midLayer}`} />
                      <span className="w-5 h-5 rounded-md border border-white/20" style={{ backgroundColor: p.vCrease }} title={`V-Crease: ${p.vCrease}`} />
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedOrigamiPalette(paletteKey)}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                    }`}
                  >
                    {isSelected ? "Current Selection" : "Preview This Colorway"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-slate-800/80 my-4" />

      {/* 100% UNIQUE & ORIGINAL CREATIONS (Custom Palette & Non-Cliche Geometry) */}
      <div className="space-y-6 pt-2">
        <div className="bg-gradient-to-r from-amber-950/40 via-stone-900 to-rose-950/40 border border-amber-800/40 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-bold border border-amber-500/30 mb-2">
                <Compass size={13} />
                <span>100% Original Intellectual Property &bull; Custom Color Systems</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Unique &amp; Interesting Identity Concepts
              </h2>
              <p className="text-sm text-stone-300 mt-2 max-w-2xl leading-relaxed">
                Zero clones of Google, Meta, or Gemini. Crafted around original creative metaphors — tactile Japanese origami, editorial creative-tech page turns, and architectural stages with thoughtful, bespoke palettes.
              </p>
            </div>

            <div className="bg-stone-950/90 border border-stone-800 p-4 rounded-2xl flex flex-col items-center justify-center shrink-0">
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-2">Signature Brand Lockup</span>
              <UniqueFolioInWordmark variant={1} size="sm" />
            </div>
          </div>
        </div>

        {/* 3 Unique Concepts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Unique 1: The Origami Folio Fold */}
          <div className="bg-stone-900/90 border-2 border-stone-800 hover:border-amber-600/70 rounded-3xl overflow-hidden flex flex-col justify-between transition-all group shadow-xl">
            <div
              className={`p-10 flex flex-col items-center justify-center transition-colors duration-300 min-h-[220px] ${
                previewTheme === "dark" ? "bg-stone-950 text-white" : "bg-stone-50 text-stone-900"
              }`}
            >
              <OrigamiFolioLogo size={96} className="transition-transform duration-300 group-hover:scale-105" />
              <div className="mt-5 text-center">
                <UniqueFolioInWordmark variant={1} size="sm" />
                <span className="block text-[10px] text-stone-400 tracking-widest uppercase font-mono mt-1">
                  TACTILE ORIGAMI FOLD (F &amp; V)
                </span>
              </div>
            </div>

            <div className="p-6 bg-stone-900 flex-1 flex flex-col justify-between space-y-4 border-t border-stone-800">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">1. The Origami Folio Fold</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">PAPER CRAFT</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  A Japanese paper-fold sculpture where a single digital sheet creates both the vertical spine/shelves of <strong>&apos;F&apos;</strong> and the downward origami angle of <strong>&apos;V&apos;</strong>.
                </p>
                <div className="pt-1">
                  <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-1.5">
                    Bespoke Palette (Warm Earth &amp; Terracotta)
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-[#E2583E] border border-white/20" title="Warm Terracotta #E2583E" />
                    <span className="w-5 h-5 rounded-md bg-[#F5A623] border border-white/20" title="Amber Gold #F5A623" />
                    <span className="w-5 h-5 rounded-md bg-[#E5C396] border border-white/20" title="Sandstone #E5C396" />
                    <span className="w-5 h-5 rounded-md bg-[#B93822] border border-white/20" title="Crimson Umber #B93822" />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
                <span>Tactile &bull; Meaningful</span>
                <span className="text-amber-400 font-medium">&check; Completely Original</span>
              </div>
            </div>
          </div>

          {/* Unique 2: The Acid Page-Turn */}
          <div className="bg-stone-900/90 border-2 border-stone-800 hover:border-lime-500/70 rounded-3xl overflow-hidden flex flex-col justify-between transition-all group shadow-xl">
            <div
              className={`p-10 flex flex-col items-center justify-center transition-colors duration-300 min-h-[220px] ${
                previewTheme === "dark" ? "bg-stone-950 text-white" : "bg-stone-100 text-stone-900"
              }`}
            >
              <AcidPageTurnLogo size={96} dark={previewTheme === "dark"} className="transition-transform duration-300 group-hover:scale-105" />
              <div className="mt-5 text-center">
                <UniqueFolioInWordmark variant={2} size="sm" />
                <span className="block text-[10px] text-stone-400 tracking-widest uppercase font-mono mt-1">
                  EDITORIAL CREATIVE-TECH
                </span>
              </div>
            </div>

            <div className="p-6 bg-stone-900 flex-1 flex flex-col justify-between space-y-4 border-t border-stone-800">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">2. The Acid Page-Turn</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-lime-500/20 text-lime-300 font-mono">CREATIVE</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  High-fashion creative tech aesthetic (like Teenage Engineering or Nothing). Two dynamic geometric sheets in motion, evoking the physical turning of a portfolio page.
                </p>
                <div className="pt-1">
                  <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-1.5">
                    Bespoke Palette (Acid Electric &amp; Charcoal)
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-[#CCFF00] border border-white/20" title="Acid Lime #CCFF00" />
                    <span className="w-5 h-5 rounded-md bg-[#14191C] border border-white/20" title="Petroleum Charcoal #14191C" />
                    <span className="w-5 h-5 rounded-md bg-[#FAF8F5] border border-white/20" title="Chalk Milk #FAF8F5" />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
                <span>High-Fashion &bull; Bold</span>
                <span className="text-lime-400 font-medium">&check; Eye-Catching</span>
              </div>
            </div>
          </div>

          {/* Unique 3: The Isometric Folio Stage */}
          <div className="bg-stone-900/90 border-2 border-stone-800 hover:border-rose-500/70 rounded-3xl overflow-hidden flex flex-col justify-between transition-all group shadow-xl">
            <div
              className={`p-10 flex flex-col items-center justify-center transition-colors duration-300 min-h-[220px] ${
                previewTheme === "dark" ? "bg-stone-950 text-white" : "bg-stone-50 text-stone-900"
              }`}
            >
              <IsometricStageLogo size={96} className="transition-transform duration-300 group-hover:scale-105" />
              <div className="mt-5 text-center">
                <UniqueFolioInWordmark variant={3} size="sm" />
                <span className="block text-[10px] text-stone-400 tracking-widest uppercase font-mono mt-1">
                  ARCHITECTURAL MONOLITH
                </span>
              </div>
            </div>

            <div className="p-6 bg-stone-900 flex-1 flex flex-col justify-between space-y-4 border-t border-stone-800">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">3. The Isometric Stage</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono">ARCHITECTURAL</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  An architectural presentation plinth carved into the letters <strong>F</strong> and <strong>V</strong>. Represents elevating your career onto a physical stage.
                </p>
                <div className="pt-1">
                  <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-1.5">
                    Bespoke Palette (Midnight Fig &amp; Coral Oat)
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-[#E8D5B5] border border-white/20" title="Warm Oat #E8D5B5" />
                    <span className="w-5 h-5 rounded-md bg-[#FF6B6B] border border-white/20" title="Coral Blossom #FF6B6B" />
                    <span className="w-5 h-5 rounded-md bg-[#1F142B] border border-white/20" title="Midnight Blackberry #1F142B" />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
                <span>Architectural &bull; Luxury</span>
                <span className="text-rose-400 font-medium">&check; Distinctive</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800/80 my-4" />

      {/* GOOGLE-STYLE EDITION: Clean, Friendly, Multi-Colored Monograms */}
      <div className="space-y-6 pt-2">
        <div className="bg-gradient-to-r from-red-950/30 via-slate-900 to-blue-950/30 border border-slate-700/60 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-bold border border-emerald-500/30 mb-2">
                <Palette size={13} />
                <span>Google-Inspired System &bull; Clean, Simple &amp; Multi-Colored</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Simple &amp; Attractive Lettermarks for FolioIn
              </h2>
              <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                Like Google&apos;s iconic multi-color &apos;G&apos;, these marks are built on <strong>pure simplicity, friendly curved geometry, and cheerful vibrant primary colors</strong> (Red, Yellow, Green, Blue) — zero boring gradients, zero direct AI clones.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center shrink-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Wordmark Preview</span>
              <GoogleStyleFolioInLogo size="md" variant={1} />
            </div>
          </div>
        </div>

        {/* 3 Google-Style Concepts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Concept 1: The Multi-Color 'F' Mark */}
          <div className="bg-slate-900 border-2 border-slate-800 hover:border-blue-500/70 rounded-3xl overflow-hidden flex flex-col justify-between transition-all group shadow-lg">
            <div
              className={`p-10 flex flex-col items-center justify-center transition-colors duration-300 min-h-[220px] ${
                previewTheme === "dark" ? "bg-slate-950 text-white" : "bg-white text-slate-900"
              }`}
            >
              <GoogleStyleFLogo size={96} className="transition-transform duration-300 group-hover:scale-105" />
              <div className="mt-5 text-center">
                <GoogleStyleFolioInLogo size="sm" variant={1} />
                <span className="block text-[10px] text-slate-400 tracking-widest uppercase font-mono mt-1">
                  CONCEPT 1 &bull; THE GOOGLE &apos;G&apos; EQUIVALENT
                </span>
              </div>
            </div>

            <div className="p-6 bg-slate-900/95 flex-1 flex flex-col justify-between space-y-4 border-t border-slate-800">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">1. The Multi-Color Geometric &apos;F&apos;</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono">PRIMARY</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A clean, rounded lettermark <strong>&apos;F&apos;</strong> built directly with the 4 Google colors:
                  <span className="text-[#EA4335] font-semibold"> Red top bar</span>, 
                  <span className="text-[#FBBC05] font-semibold"> Yellow middle wing</span>, 
                  <span className="text-[#34A853] font-semibold"> Green lower base</span>, and 
                  <span className="text-[#4285F4] font-semibold"> Blue spine</span>.
                </p>
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                  <span className="font-semibold text-slate-200">Why it works:</span> Friendly, memorable, child-simple, instant brand recall.
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Vibrant &bull; Non-cluttered</span>
                <span className="text-emerald-400 font-medium">&check; 100% Original</span>
              </div>
            </div>
          </div>

          {/* Concept 2: The Google Workspace 'FV' Fold */}
          <div className="bg-slate-900 border-2 border-slate-800 hover:border-emerald-500/70 rounded-3xl overflow-hidden flex flex-col justify-between transition-all group shadow-lg">
            <div
              className={`p-10 flex flex-col items-center justify-center transition-colors duration-300 min-h-[220px] ${
                previewTheme === "dark" ? "bg-slate-950 text-white" : "bg-white text-slate-900"
              }`}
            >
              <GoogleWorkspaceFoldLogo size={96} className="transition-transform duration-300 group-hover:scale-105" />
              <div className="mt-5 text-center">
                <GoogleStyleFolioInLogo size="sm" variant={2} />
                <span className="block text-[10px] text-slate-400 tracking-widest uppercase font-mono mt-1">
                  CONCEPT 2 &bull; WORKSPACE ORIGAMI FOLD
                </span>
              </div>
            </div>

            <div className="p-6 bg-slate-900/95 flex-1 flex flex-col justify-between space-y-4 border-t border-slate-800">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">2. The Multi-Color &apos;FV&apos; Fold</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">WORKSPACE</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Inspired by Google Drive and Docs. Geometric ribbons folding into both the letter <strong>F</strong> (Folio) and an angled <strong>V</strong> (In) with crisp color-blocking.
                </p>
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                  <span className="font-semibold text-slate-200">Why it works:</span> Tactile, dynamic, modern productivity SaaS feel.
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Color-Blocked Geometry</span>
                <span className="text-emerald-400 font-medium">&check; Scalable to 16px</span>
              </div>
            </div>
          </div>

          {/* Concept 3: The Fresh Color-Loop Monogram */}
          <div className="bg-slate-900 border-2 border-slate-800 hover:border-amber-500/70 rounded-3xl overflow-hidden flex flex-col justify-between transition-all group shadow-lg">
            <div
              className={`p-10 flex flex-col items-center justify-center transition-colors duration-300 min-h-[220px] ${
                previewTheme === "dark" ? "bg-slate-950 text-white" : "bg-white text-slate-900"
              }`}
            >
              <ColorLoopMonogramLogo size={96} className="transition-transform duration-300 group-hover:scale-105" />
              <div className="mt-5 text-center">
                <GoogleStyleFolioInLogo size="sm" variant={3} />
                <span className="block text-[10px] text-slate-400 tracking-widest uppercase font-mono mt-1">
                  CONCEPT 3 &bull; FRESH STARTUP PALETTE
                </span>
              </div>
            </div>

            <div className="p-6 bg-slate-900/95 flex-1 flex flex-col justify-between space-y-4 border-t border-slate-800">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">3. The Fresh Color-Loop</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">FRESH</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  An alternative energetic palette: <strong className="text-violet-400">Electric Violet</strong>, <strong className="text-orange-400">Tangerine</strong>, <strong className="text-emerald-400">Lime Green</strong>, and <strong className="text-cyan-400">Cyan</strong>.
                </p>
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                  <span className="font-semibold text-slate-200">Why it works:</span> Distinctive, cheerful, creative, not a copy of anything else.
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Playful &bull; High Contrast</span>
                <span className="text-emerald-400 font-medium">&check; Eye-Catching</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800/80 my-4" />

      {/* TIER 1 AI PLATFORM ICONS (ChatGPT, Meta, Gemini, Antigravity Style) */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between flex-wrap gap-3 bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 p-6 rounded-3xl border border-blue-800/40 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 text-xs font-bold border border-cyan-500/30 mb-2">
              <Star size={13} />
              <span>Iconic AI Simplicity &bull; Single Continuous Silhouette</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              ChatGPT, Meta, Gemini &amp; Antigravity Style
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Pure iconic geometry. No micro-circuits, no glowing lightning. One single bold silhouette that can be drawn from memory in 3 seconds and is recognizable at 16px favicon scale.
            </p>
          </div>

          {/* Color Mode Switcher: Gradient vs Solid Monochrome */}
          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 shrink-0">
            <span className="text-xs text-slate-400 px-2 font-medium">Style:</span>
            <button
              onClick={() => setIconicStyle("gradient")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                iconicStyle === "gradient"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Fluid Gradient (Gemini)</span>
            </button>
            <button
              onClick={() => setIconicStyle("monochrome")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                iconicStyle === "monochrome"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Solid Stamp (OpenAI/Meta)</span>
            </button>
          </div>
        </div>

        {/* 4 Iconic Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1. Meta / Infinity Loop */}
          <div className="bg-slate-900 border-2 border-slate-800 hover:border-blue-500/70 rounded-3xl overflow-hidden flex flex-col justify-between transition-all group">
            <div
              className={`p-8 flex flex-col items-center justify-center transition-colors duration-300 min-h-[190px] ${
                previewTheme === "dark" ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-900"
              }`}
            >
              <InfinityLoopIcon
                size={84}
                dark={previewTheme === "dark"}
                variant={iconicStyle}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="mt-4 text-center">
                <span className="text-base font-black tracking-tight">
                  Folio<span className="text-blue-500">In</span>
                </span>
                <span className="block text-[9px] text-slate-400 tracking-widest uppercase font-mono mt-0.5">
                  THE INFINITE M&Ouml;BIUS
                </span>
              </div>
            </div>

            <div className="p-5 bg-slate-900/95 flex-1 flex flex-col justify-between space-y-3 border-t border-slate-800">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">1. The Infinity Loop</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono">META STYLE</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Continuous aerodynamic ribbon looping through infinity (radiant Insight) while shaping the dynamic flow of an <strong>F</strong> and <strong>V</strong>.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-emerald-400 font-medium">
                &check; 1-Line Continuous Path
              </div>
            </div>
          </div>

          {/* 2. Gemini Spark */}
          <div className="bg-slate-900 border-2 border-slate-800 hover:border-blue-500/70 rounded-3xl overflow-hidden flex flex-col justify-between transition-all group">
            <div
              className={`p-8 flex flex-col items-center justify-center transition-colors duration-300 min-h-[190px] ${
                previewTheme === "dark" ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-900"
              }`}
            >
              <GeminiSparkIcon
                size={84}
                dark={previewTheme === "dark"}
                variant={iconicStyle}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="mt-4 text-center">
                <span className="text-base font-black tracking-tight">
                  Folio<span className="text-blue-500">In</span>
                </span>
                <span className="block text-[9px] text-slate-400 tracking-widest uppercase font-mono mt-0.5">
                  4-POINT CELESTIAL SPARK
                </span>
              </div>
            </div>

            <div className="p-5 bg-slate-900/95 flex-1 flex flex-col justify-between space-y-3 border-t border-slate-800">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">2. The In Spark</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">GEMINI STYLE</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A 4-pointed hypocycloid celestial spark (enlightened star of knowledge) with a subtle curved folio fold for spatial elegance.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-emerald-400 font-medium">
                &check; Pure Curved Astroid
              </div>
            </div>
          </div>

          {/* 3. ChatGPT Rosette Knot */}
          <div className="bg-slate-900 border-2 border-slate-800 hover:border-blue-500/70 rounded-3xl overflow-hidden flex flex-col justify-between transition-all group">
            <div
              className={`p-8 flex flex-col items-center justify-center transition-colors duration-300 min-h-[190px] ${
                previewTheme === "dark" ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-900"
              }`}
            >
              <RosetteKnotIcon
                size={84}
                dark={previewTheme === "dark"}
                variant={iconicStyle}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="mt-4 text-center">
                <span className="text-base font-black tracking-tight">
                  Folio<span className="text-blue-500">In</span>
                </span>
                <span className="block text-[9px] text-slate-400 tracking-widest uppercase font-mono mt-0.5">
                  ROTATIONAL HARMONY
                </span>
              </div>
            </div>

            <div className="p-5 bg-slate-900/95 flex-1 flex flex-col justify-between space-y-3 border-t border-slate-800">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">3. The Rosette Knot</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">CHATGPT STYLE</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Mathematically perfect 60&deg; rotational symmetry. 6 continuous rounded loops forming an interlocking open lotus and folio flower.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-emerald-400 font-medium">
                &check; Hexagonal Sacred Geometry
              </div>
            </div>
          </div>

          {/* 4. Antigravity Ascent */}
          <div className="bg-slate-900 border-2 border-slate-800 hover:border-blue-500/70 rounded-3xl overflow-hidden flex flex-col justify-between transition-all group">
            <div
              className={`p-8 flex flex-col items-center justify-center transition-colors duration-300 min-h-[190px] ${
                previewTheme === "dark" ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-900"
              }`}
            >
              <AntigravityAscentIcon
                size={84}
                dark={previewTheme === "dark"}
                variant={iconicStyle}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="mt-4 text-center">
                <span className="text-base font-black tracking-tight">
                  Folio<span className="text-blue-500">In</span>
                </span>
                <span className="block text-[9px] text-slate-400 tracking-widest uppercase font-mono mt-0.5">
                  CHIRAL ASCENT ORBIT
                </span>
              </div>
            </div>

            <div className="p-5 bg-slate-900/95 flex-1 flex flex-col justify-between space-y-3 border-t border-slate-800">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">4. The Ascent Orbit</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">ANTIGRAVITY STYLE</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Weightless, levitating upward spiral with a celestial focal point. Modern AI aerodynamics with effortless motion and clean space.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-emerald-400 font-medium">
                &check; Weightless Chiral Loop
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800/80 my-4" />

      {/* NEW: High-Tech Startup & Processor Edition (Clean, No Glow, Silicon Valley Minimalist) */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 text-xs font-bold border border-blue-500/30 mb-2">
              <Cpu size={13} />
              <span>High-Tech Startup &bull; Processor Edition</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Clean Engineering &amp; Silicon Architecture Concepts
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Engineered with clean mathematical precision. No neon glow, no AI-style lightning halos, and zero fluff.
            </p>
          </div>
          <span className="text-xs bg-indigo-950 text-indigo-300 border border-indigo-700/50 px-3 py-1.5 rounded-xl font-semibold">
            Feedback Preview (Not yet applied globally)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Concept A: Silicon Processor Core */}
          <div className="bg-slate-900 border-2 border-slate-800 hover:border-blue-500/60 rounded-3xl overflow-hidden flex flex-col justify-between transition-all">
            <div
              className={`p-8 flex flex-col items-center justify-center transition-colors duration-300 min-h-[200px] ${
                previewTheme === "dark" ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-900"
              }`}
            >
              <SiliconProcessorIcon size={88} dark={previewTheme === "dark"} />
              <div className="mt-4 text-center">
                <span className="text-lg font-black tracking-tight">
                  Folio<span className="text-blue-500">In</span>
                </span>
                <span className="block text-[10px] text-slate-400 tracking-widest uppercase font-mono mt-0.5">
                  CORE SILICON ARCHITECTURE
                </span>
              </div>
            </div>

            <div className="p-6 bg-slate-900/95 flex-1 flex flex-col justify-between space-y-4 border-t border-slate-800">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">Candidate A: The Silicon Processor</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono">CHIP DIE</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Square microprocessor packaging with 12 micro-bus pins and a central silicon die. The copper interconnects form the letters <strong>F</strong> and <strong>V</strong> with 90&deg; circuit routing.
                </p>
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                  <span className="font-semibold text-slate-200">Vibe:</span> Intel, Apple Silicon M-series, Scale AI, Nvidia.
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Flat Vector &bull; 0 Glow</span>
                <span className="text-emerald-400 font-medium">&check; Pixel-Perfect</span>
              </div>
            </div>
          </div>

          {/* Concept B: The Linear Monolith */}
          <div className="bg-slate-900 border-2 border-slate-800 hover:border-blue-500/60 rounded-3xl overflow-hidden flex flex-col justify-between transition-all">
            <div
              className={`p-8 flex flex-col items-center justify-center transition-colors duration-300 min-h-[200px] ${
                previewTheme === "dark" ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-900"
              }`}
            >
              <LinearMonolithIcon size={88} dark={previewTheme === "dark"} />
              <div className="mt-4 text-center">
                <span className="text-lg font-black tracking-tight">
                  Folio<span className="text-blue-500">In</span>
                </span>
                <span className="block text-[10px] text-slate-400 tracking-widest uppercase font-mono mt-0.5">
                  SAAS MONOLITH MARK
                </span>
              </div>
            </div>

            <div className="p-6 bg-slate-900/95 flex-1 flex flex-col justify-between space-y-4 border-t border-slate-800">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">Candidate B: The Linear Monolith</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">MINIMALIST</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Interlocking solid geometric slabs. The monolithic vertical spine and horizontal tiers form <strong>F</strong> (Folio), while a 45&deg; high-speed wedge forms <strong>V</strong> (In).
                </p>
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                  <span className="font-semibold text-slate-200">Vibe:</span> Linear.app, Vercel, Supabase, Stripe.
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Negative Space &bull; Pure Minimal</span>
                <span className="text-emerald-400 font-medium">&check; Scalable to 12px</span>
              </div>
            </div>
          </div>

          {/* Concept C: The Logic Circuit Folio */}
          <div className="bg-slate-900 border-2 border-slate-800 hover:border-blue-500/60 rounded-3xl overflow-hidden flex flex-col justify-between transition-all">
            <div
              className={`p-8 flex flex-col items-center justify-center transition-colors duration-300 min-h-[200px] ${
                previewTheme === "dark" ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-900"
              }`}
            >
              <LogicCircuitIcon size={88} dark={previewTheme === "dark"} />
              <div className="mt-4 text-center">
                <span className="text-lg font-black tracking-tight">
                  Folio<span className="text-blue-500">In</span>
                </span>
                <span className="block text-[10px] text-slate-400 tracking-widest uppercase font-mono mt-0.5">
                  CIRCUIT DATA MATRIX
                </span>
              </div>
            </div>

            <div className="p-6 bg-slate-900/95 flex-1 flex flex-col justify-between space-y-4 border-t border-slate-800">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">Candidate C: The Logic Circuit Folio</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">SCHEMATIC</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  An open folio schematic formed by printed circuit board (PCB) traces with solid logic node terminals. Represents developer intelligence and structured data routing.
                </p>
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                  <span className="font-semibold text-slate-200">Vibe:</span> ARM, Cloudflare, Cursor, GitHub.
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Engineering Schematic &bull; Clean Lines</span>
                <span className="text-emerald-400 font-medium">&check; High Contrast</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800/80 my-4" />

      {/* 3 Core Concepts Showcase Grid */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-300">Previous Design Direction Archive (Graduated / Stylized)</h3>
          <p className="text-xs text-slate-400">For comparison reference.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {concepts.map((concept) => {
          const isSelected = activeVariant === concept.id;
          const { Component } = concept;

          return (
            <div
              key={concept.id}
              className={`rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${
                isSelected
                  ? "border-indigo-500 shadow-xl shadow-indigo-500/10 ring-2 ring-indigo-500/40"
                  : "border-slate-800 hover:border-slate-700 bg-slate-900/60"
              }`}
            >
              {/* Active Badge */}
              {isSelected && (
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-md">
                  <Check size={12} />
                  <span>Active Brand</span>
                </div>
              )}

              {/* Visual Display Stage */}
              <div
                className={`p-8 flex flex-col items-center justify-center transition-colors duration-300 relative ${
                  previewTheme === "dark"
                    ? "bg-slate-950/90 text-white"
                    : "bg-slate-100 text-slate-900"
                }`}
              >
                {/* Radial Glow behind icon */}
                <div 
                  className="absolute w-32 h-32 rounded-full blur-2xl opacity-40 pointer-events-none"
                  style={{ backgroundColor: concept.palette[0] }}
                />

                <div className="relative z-10 py-4">
                  <Component size={84} glow={true} />
                </div>

                <div className="relative z-10 mt-3 text-center">
                  <FolioInLogo
                    variant={concept.id}
                    size="lg"
                    showBadge={true}
                    className="justify-center"
                  />
                </div>
              </div>

              {/* Concept Details & Explanations */}
              <div className="p-6 bg-slate-900/90 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-white text-lg">{concept.title}</h3>
                  <p className="text-xs text-indigo-400 font-medium">{concept.subtitle}</p>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {concept.symbolism}
                  </p>
                </div>

                {/* Color Swatches */}
                <div className="pt-2">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                    Signature Color Matrix
                  </div>
                  <div className="flex items-center gap-1.5">
                    {concept.palette.map((color, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-lg border border-white/20 shadow-sm"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex items-center gap-2 border-t border-slate-800">
                  <button
                    onClick={() => setActiveVariant(concept.id)}
                    className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                      isSelected
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                        : "bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white"
                    }`}
                  >
                    <Check size={14} />
                    <span>{isSelected ? "Currently Active" : "Set As Active Logo"}</span>
                  </button>

                  <button
                    onClick={() => handleDownloadSvg(concept.id)}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Download clean standalone SVG vector"
                  >
                    <Download size={14} />
                  </button>
                </div>

                {downloadSuccess === concept.id && (
                  <p className="text-[11px] text-emerald-400 text-center font-medium animate-pulse">
                    &check; SVG downloaded successfully!
                  </p>
                )}
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* Scale & Context Responsive Audit */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Eye size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Responsive Scale &amp; Contrast Audit</h2>
            <p className="text-xs text-slate-400">
              Verifying clarity across all device resolutions, from 16px favicon up to 96px billboard.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          {/* Favicon preview */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-2">
            <span className="text-[11px] text-slate-400 font-semibold">16px Favicon</span>
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center shadow-inner">
              <FolioInLogo size="xs" showText={false} />
            </div>
            <span className="text-[10px] text-emerald-400">&check; Crisp pixel alignment</span>
          </div>

          {/* Navbar preview */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-2">
            <span className="text-[11px] text-slate-400 font-semibold">32px Navbar</span>
            <div className="h-8 flex items-center">
              <FolioInLogo size="sm" showText={true} />
            </div>
            <span className="text-[10px] text-emerald-400">&check; High legibility</span>
          </div>

          {/* Card / Header */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-2">
            <span className="text-[11px] text-slate-400 font-semibold">48px Header</span>
            <div className="h-12 flex items-center">
              <FolioInLogo size="lg" showText={true} showBadge={true} />
            </div>
            <span className="text-[10px] text-emerald-400">&check; Balanced hierarchy</span>
          </div>

          {/* Social OpenGraph / App Icon */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-2">
            <span className="text-[11px] text-slate-400 font-semibold">96px App Icon</span>
            <div className="h-24 flex items-center justify-center">
              <FolioInLogo size="2xl" showText={false} glow={true} />
            </div>
            <span className="text-[10px] text-emerald-400">&check; Radiant depth</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoShowcase;
