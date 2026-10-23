"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Globe,
  Activity,
  Layers,
  Layout,
  Code2,
  Lock,
  Compass,
  FileText
} from "lucide-react";
import { FolioVedaLogo } from "@/components/ui/Logo";

type TemplateCategory = "all" | "creative" | "engineering" | "architecture" | "product";

interface TemplateShowcase {
  id: string;
  name: string;
  category: TemplateCategory;
  categoryLabel: string;
  title: string;
  description: string;
  fonts: string;
  accentColor: string;
  previewType: "editorial" | "terminal" | "spatial" | "strategy" | "poster" | "clean";
  tags: string[];
}

const TEMPLATES: TemplateShowcase[] = [
  {
    id: "minimal-editorial",
    name: "Cami",
    category: "creative",
    categoryLabel: "Editorial & Design",
    title: "Elena Vance — Spatial & Brand Monograph",
    description: "Refined serif headlines, generous white space, and asymmetric visual rhythm.",
    fonts: "Newsreader Serif + Plus Jakarta Sans",
    accentColor: "#991B1B",
    previewType: "editorial",
    tags: ["Editorial", "High Whitespace", "Typography-First"],
  },
  {
    id: "developer-terminal",
    name: "Kester",
    category: "engineering",
    categoryLabel: "Systems & Engineering",
    title: "Alex Rivera — Distributed Systems Engineer",
    description: "Monospace prompt, real git commit hashes, and verified throughput metrics.",
    fonts: "JetBrains Mono + Inter",
    accentColor: "#10B981",
    previewType: "terminal",
    tags: ["Technical", "Verified Git", "Low Latency"],
  },
  {
    id: "creative-collage",
    name: "Reseda",
    category: "architecture",
    categoryLabel: "Spatial & Architecture",
    title: "Studio Ortiz — Architectural Practices",
    description: "Monumental typography, full-bleed imagery grids, and tactile project cards.",
    fonts: "Syne Display + Plus Jakarta Sans",
    accentColor: "#D97706",
    previewType: "spatial",
    tags: ["Spatial", "Gallery Grid", "Expansive"],
  },
  {
    id: "case-study-heavy",
    name: "Nolan",
    category: "product",
    categoryLabel: "Product & Strategy",
    title: "Marcus Vance — Principal Product Lead",
    description: "Problem-Approach-Outcome cards with verified business metrics and telemetry.",
    fonts: "Plus Jakarta Sans + Inter",
    accentColor: "#2563EB",
    previewType: "strategy",
    tags: ["Case Studies", "PLG Metrics", "Executive"],
  },
];

export default function SquarespaceInspiredHome() {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>("all");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("minimal-editorial");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const filteredTemplates = activeCategory === "all" 
    ? TEMPLATES 
    : TEMPLATES.filter((t) => t.category === activeCategory);

  const currentTemplate = TEMPLATES.find((t) => t.id === selectedTemplate) || TEMPLATES[0];

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#111827] font-sans selection:bg-[#111827] selection:text-white antialiased">
      
      {/* =========================================================================
          NAVIGATION: Minimalist, Airy & Elegant
          ========================================================================= */}
      <header className="sticky top-0 z-50 bg-[#FAFAF9]/90 backdrop-blur-md border-b border-[#E5E7EB] transition-all">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          
          {/* Left: Refined Wordmark */}
          <Link href="/" className="flex items-center gap-3 group">
            <FolioVedaLogo size="sm" showText={false} />
            <div className="flex flex-col">
              <span className="text-xl font-medium tracking-tight text-[#111827] font-sans">
                FolioVeda
              </span>
              <span className="text-[10px] tracking-widest uppercase text-slate-400 font-medium -mt-0.5">
                Portfolio Engine
              </span>
            </div>
          </Link>

          {/* Center: Quiet, Editorial Navigation Links */}
          <nav className="hidden md:flex items-center gap-9 text-sm font-normal text-slate-600">
            <a href="#templates" className="hover:text-[#111827] transition-colors">
              Templates
            </a>
            <Link href="/inspiration" className="hover:text-[#111827] transition-colors flex items-center gap-1.5">
              <span>Inspiration Engine</span>
              <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded-full bg-slate-200/70 text-slate-700">
                AI
              </span>
            </Link>
            <Link href="/onboarding" className="hover:text-[#111827] transition-colors">
              Intake Flow
            </Link>
            <a href="#features" className="hover:text-[#111827] transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-[#111827] transition-colors">
              Pricing
            </a>
            <Link href="/hub" className="hover:text-[#111827] transition-colors text-slate-400">
              Dev Hub ↗
            </Link>
          </nav>

          {/* Right: Clean Action Button */}
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-slate-600 hover:text-[#111827] transition-colors hidden sm:inline"
            >
              Log In
            </Link>

            <Link
              href="/onboarding"
              className="bg-[#111827] hover:bg-black text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200 shadow-xs hover:shadow active:scale-98"
            >
              Create Your Portfolio
            </Link>
          </div>

        </div>
      </header>


      {/* =========================================================================
          HERO SECTION: Squarespace Signature High-Fashion Editorial Typography
          ========================================================================= */}
      <section className="pt-24 pb-16 md:pt-36 md:pb-24 px-6 sm:px-10 max-w-6xl mx-auto text-center">
        
        {/* Subtle Category Kicker */}
        <div className="inline-block mb-6">
          <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">
            PORTFOLIO ARCHITECTURE FOR CREATORS &amp; ENGINEERS
          </span>
        </div>

        {/* Breathtaking Squarespace-style Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-normal tracking-tight text-[#111827] leading-[1.05] mb-8 font-sans">
          Create a portfolio <br />
          <span className="font-serif italic font-light text-slate-800">
            that gets you noticed.
          </span>
        </h1>

        {/* Calm, Proportioned Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed mb-10">
          Showcase your work with award-winning design, zero-hallucination intake, and instant custom domains. Built for designers, engineers, and creators who let their work speak.
        </p>

        {/* Single, Confident Primary Action */}
        <div className="flex flex-col items-center justify-center gap-3 mb-16">
          <Link
            href="/onboarding"
            className="bg-[#111827] hover:bg-black text-white text-base font-medium px-9 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-200 active:scale-98"
          >
            Create Your Portfolio — Free
          </Link>
          <span className="text-xs text-slate-400 font-light">
            Free 14-day trial • No credit card required • Export code anytime
          </span>
        </div>

      </section>


      {/* =========================================================================
          HERO VISUAL SHOWCASE: Expansive, Serene Template Showcase
          ========================================================================= */}
      <section id="templates" className="px-6 sm:px-10 max-w-7xl mx-auto pb-28 scroll-mt-24">
        
        {/* Filter Navigation with Generous Breathing Room */}
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-10 overflow-x-auto no-scrollbar pb-2">
          {(
            [
              { id: "all", label: "All Disciplines" },
              { id: "creative", label: "Design & Creative" },
              { id: "engineering", label: "Systems & Engineering" },
              { id: "architecture", label: "Spatial & Architecture" },
              { id: "product", label: "Product & Strategy" },
            ] as { id: TemplateCategory; label: string }[]
          ).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-[#111827] text-white shadow-xs"
                  : "bg-white text-slate-600 hover:text-[#111827] border border-slate-200/80 hover:border-slate-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Elevated Showcase Viewport */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden transition-all duration-300">
          
          {/* Subtle Browser Window Bar */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span className="ml-4 text-xs text-slate-400 font-mono hidden sm:inline">
                folioveda.me/{currentTemplate.name.toLowerCase()}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-slate-400 hidden md:inline">
                Typography: <strong className="text-slate-700 font-medium">{currentTemplate.fonts}</strong>
              </span>
              <Link
                href={`/onboarding?template=${currentTemplate.id}`}
                className="bg-[#111827] text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-black transition flex items-center gap-1.5"
              >
                <span>Start with {currentTemplate.name}</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Dynamic Template Canvas */}
          <div className="p-8 sm:p-14 lg:p-20 min-h-[460px] flex flex-col justify-between">
            
            {/* 1. Editorial / Monograph Showcase */}
            {currentTemplate.previewType === "editorial" && (
              <div className="space-y-12 animate-fade-in">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-8">
                  <div>
                    <span className="text-xs font-semibold tracking-widest uppercase text-[#991B1B]">
                      MONOGRAPH 01
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-serif font-normal text-[#111827] mt-2 tracking-tight">
                      Elena Vance
                    </h2>
                    <p className="text-sm font-light text-slate-500 mt-1 uppercase tracking-wider">
                      Brand Systems &amp; Spatial Architecture • Kyoto &amp; San Francisco
                    </p>
                  </div>
                  <p className="text-sm text-slate-500 max-w-sm font-serif italic text-right hidden md:block">
                    &quot;Form follows serenity. Designing spaces, identities, and printed matter that breathe.&quot;
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <div className="aspect-[4/3] bg-stone-100 rounded-xl overflow-hidden border border-stone-200 flex items-center justify-center p-6 text-center">
                      <span className="font-serif italic text-stone-400 text-lg">The Glass Pavilion (2025)</span>
                    </div>
                    <h3 className="font-serif text-lg text-slate-800">The Glass Pavilion</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      Monolithic cedar and low-iron glass residential retreat in Kamakura.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="aspect-[4/3] bg-stone-100 rounded-xl overflow-hidden border border-stone-200 flex items-center justify-center p-6 text-center">
                      <span className="font-serif italic text-stone-400 text-lg">Prism Identity System</span>
                    </div>
                    <h3 className="font-serif text-lg text-slate-800">Prism Type Specimen</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      Bespoke geometric serif typeface and publication guidelines.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="aspect-[4/3] bg-stone-100 rounded-xl overflow-hidden border border-stone-200 flex items-center justify-center p-6 text-center">
                      <span className="font-serif italic text-stone-400 text-lg">Aura Ceramic Objects</span>
                    </div>
                    <h3 className="font-serif text-lg text-slate-800">Aura Ceramic Objects</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      Limited hand-thrown vessel edition exploring tactile glaze gradients.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Technical / Systems Engineering Showcase */}
            {currentTemplate.previewType === "terminal" && (
              <div className="bg-[#0F172A] text-slate-100 -m-8 sm:-m-14 lg:-m-20 p-8 sm:p-14 lg:p-20 font-mono space-y-10 animate-fade-in">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-800 pb-8">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-400 text-xs mb-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>SYSTEM_STATUS: 100% OPERATIONAL • GITHUB SYNCED</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                      Alex Rivera
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Senior Systems Architect • Distributed Caches &amp; Edge Compute
                    </p>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded">
                      <span className="text-emerald-400">#</span> p99 &lt; 3.2ms
                    </div>
                    <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded">
                      <span className="text-emerald-400">#</span> 100k req/sec
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white font-bold text-sm">Distributed Edge Cache</span>
                      <span className="text-slate-500 font-mono">commit a4f8e91</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      Zero-copy in-memory caching daemon written in Rust with automated replica failover and sub-5ms global p99.
                    </p>
                    <div className="text-xs text-emerald-400 font-semibold pt-1">
                      100k req/s • 34% cloud bandwidth cost reduction
                    </div>
                  </div>

                  <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white font-bold text-sm">FolioVeda Compiler Engine</span>
                      <span className="text-slate-500 font-mono">commit 7c2d1b0</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      Zero-hallucination portfolio builder with dynamic multi-theme architectural renderer and SSRF safety guard.
                    </p>
                    <div className="text-xs text-emerald-400 font-semibold pt-1">
                      Sub-50ms TTFB worldwide on 300+ Edge locations
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Spatial / Architecture Showcase */}
            {currentTemplate.previewType === "spatial" && (
              <div className="space-y-10 animate-fade-in">
                <div className="border-b border-slate-200 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                      SPATIAL PRACTICE
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-sans font-bold text-[#111827] mt-1 tracking-tight">
                      Studio Ortiz
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">
                      Civic Infrastructure, Cultural Centers &amp; Urban Landscapes
                    </p>
                  </div>
                  <span className="text-xs text-slate-400 font-light">
                    Selection 2022 — 2026
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-3">
                    <span className="text-xs font-mono text-amber-800">PROJECT 01</span>
                    <h3 className="text-2xl font-bold text-slate-900">The Nordic Pavilion</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      Sustainable cross-laminated timber pavilion exploring carbon-neutral civic assembly in Oslo.
                    </p>
                  </div>
                  <div className="p-8 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-3">
                    <span className="text-xs font-mono text-amber-800">PROJECT 02</span>
                    <h3 className="text-2xl font-bold text-slate-900">Maritime Heritage Museum</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      Submerged tidal gallery space constructed from recycled marine aggregate concrete.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Strategy / Product Lead Showcase */}
            {currentTemplate.previewType === "strategy" && (
              <div className="space-y-10 animate-fade-in">
                <div className="border-b border-slate-200 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-blue-700">
                      PRODUCT LEADERSHIP
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-sans font-bold text-[#111827] mt-1 tracking-tight">
                      Marcus Vance
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">
                      Principal PM • Scaling Developer Tooling from $0 to $12M ARR
                    </p>
                  </div>
                  <div className="text-xs font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                    Verified Recruiter Telemetry
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                    <span className="text-xs text-blue-600 font-semibold">CASE STUDY 01</span>
                    <h3 className="text-xl font-bold text-slate-900">Developer Self-Serve Funnel</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Re-architected developer onboarding cutting time-to-first-API-call from 14 minutes to 82 seconds.
                    </p>
                    <div className="text-xs font-semibold text-slate-900 pt-2 border-t border-slate-200">
                      Outcome: +38% self-serve activation • $4.2M new ARR
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                    <span className="text-xs text-blue-600 font-semibold">CASE STUDY 02</span>
                    <h3 className="text-xl font-bold text-slate-900">Enterprise Audit Log API</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Designed and launched enterprise SAML &amp; compliance suite unlocking 8-figure pipeline across banks.
                    </p>
                    <div className="text-xs font-semibold text-slate-900 pt-2 border-t border-slate-200">
                      Outcome: 100% SOC2 Type II compliance audit passed
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Template Switcher Chips */}
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Switch Showcase:</span>
              <div className="flex gap-1.5">
                {filteredTemplates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`px-3 py-1 rounded-full font-medium transition ${
                      selectedTemplate === t.id
                        ? "bg-[#111827] text-white"
                        : "bg-white text-slate-600 hover:text-[#111827] border border-slate-200"
                    }`}
                  >
                    {t.name} ({t.categoryLabel})
                  </button>
                ))}
              </div>
            </div>

            <Link
              href="/styles"
              className="text-slate-600 hover:text-[#111827] font-medium flex items-center gap-1 transition"
            >
              <span>Explore all 8 styles in gallery</span>
              <ArrowRight size={12} />
            </Link>
          </div>

        </div>

      </section>


      {/* =========================================================================
          EDITORIAL CHAPTER 1: "Make it undeniably yours" (Alternating Spread)
          ========================================================================= */}
      <section id="features" className="py-24 px-6 sm:px-10 max-w-7xl mx-auto border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Editorial Storytelling */}
          <div className="space-y-6 max-w-xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">
              FLEXIBLE DESIGN SYSTEMS
            </span>
            <h2 className="text-4xl sm:text-5xl font-normal text-[#111827] tracking-tight leading-[1.1] font-sans">
              Make it undeniably yours. <br />
              <span className="font-serif italic font-light text-slate-700">
                With complete creative freedom.
              </span>
            </h2>
            <p className="text-base text-slate-600 font-light leading-relaxed">
              Every portfolio begins with a designer-crafted foundation. Customize typography pairings, spatial scales, color harmonies, and layout patterns with zero code. Switch architectural themes anytime with mathematical zero content loss.
            </p>

            <div className="space-y-3 pt-2 text-sm text-slate-700">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111827]" />
                <span>8 distinct architectural theme packages for every profession</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111827]" />
                <span>Open-source Google Fonts pairings with refined optical tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111827]" />
                <span>Fluid responsive layout grids tuned for mobile, tablet, and ultra-wide screens</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/styles"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#111827] hover:underline"
              >
                <span>Browse the Style Library</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right: Clean Visual Spread */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-lg space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-xs font-mono text-slate-400">DESIGN_TOKENS</span>
              <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-medium">
                60-30-10 Rule
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs text-slate-500 font-medium">Typography Pairing</span>
                <div className="mt-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span className="font-serif text-lg text-slate-900">Newsreader Serif</span>
                  <span className="text-xs text-slate-400 font-mono">+ Plus Jakarta Sans</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-500 font-medium">Palette Balance</span>
                <div className="mt-1.5 grid grid-cols-3 gap-2 text-xs">
                  <div className="p-3 rounded-xl bg-[#FAFAF9] border border-slate-200 text-slate-800">
                    <strong className="block">60% Canvas</strong>
                    <span className="text-[11px] text-slate-400">Studio Alabaster</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#111827] text-white">
                    <strong className="block">30% Structure</strong>
                    <span className="text-[11px] text-slate-400">Deep Slate</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#991B1B] text-white">
                    <strong className="block">10% Accent</strong>
                    <span className="text-[11px] text-red-200">Crimson</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed font-light">
                &quot;Switching between Terminal, Editorial, and Poster themes instantly re-renders components without resetting your bios, links, or uploaded projects.&quot;
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          EDITORIAL CHAPTER 2: "Turn your proof into polished case studies"
          ========================================================================= */}
      <section className="py-24 px-6 sm:px-10 max-w-7xl mx-auto border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Clean Factual Comparison Card */}
          <div className="order-2 lg:order-1 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-lg space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-xs font-mono text-slate-400">FACTUAL_INTEGRITY_CHECK</span>
              <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-medium">
                100% Verified
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <Check size={14} />
                  <span>FolioVeda Strict Guard</span>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  &quot;Architected edge caching layer in Rust reducing cloud bandwidth costs by 34% across 12,000 monthly active users.&quot;
                </p>
                <span className="text-[10px] text-emerald-700 block font-mono">
                  Verified against PDF resume and merged GitHub commit a4f8e91
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-400 space-y-1">
                <div className="text-xs font-semibold text-slate-500">
                  Traditional Generic AI Builders
                </div>
                <p className="text-xs text-slate-500 line-through leading-relaxed">
                  &quot;Pioneered cross-functional synergy generating $50M in enterprise revenue and managed 200 global teams.&quot;
                </p>
                <span className="text-[10px] text-rose-500 block font-medium">
                  Hallucinated claim — flagged and rejected by recruiters
                </span>
              </div>
            </div>
          </div>

          {/* Right: Editorial Storytelling */}
          <div className="order-1 lg:order-2 space-y-6 max-w-xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">
              THE ZERO-HALLUCINATION CONTRACT
            </span>
            <h2 className="text-4xl sm:text-5xl font-normal text-[#111827] tracking-tight leading-[1.1] font-sans">
              From raw proof to published site. <br />
              <span className="font-serif italic font-light text-slate-700">
                Without a single fabricated claim.
              </span>
            </h2>
            <p className="text-base text-slate-600 font-light leading-relaxed">
              Recruiters and high-value clients discard portfolios with generic AI buzzwords. FolioVeda enforces strict factual truth: our intake pipeline parses your real PDF resumes and GitHub repositories, drafting crisp case studies where you review and approve every metric.
            </p>

            <div className="space-y-3 pt-2 text-sm text-slate-700">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111827]" />
                <span>Smart 4-step intake wizard completed in under 2 minutes</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111827]" />
                <span>Automated GitHub webhook sync for ongoing project updates</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111827]" />
                <span>Zero buzzwords, zero fake titles, and zero exaggerated metrics</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#111827] hover:underline"
              >
                <span>Try the 2-Minute Intake Flow</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          EDITORIAL CHAPTER 3: Inspiration Engine ("Make Mine Feel Like This")
          ========================================================================= */}
      <section className="py-24 px-6 sm:px-10 max-w-7xl mx-auto border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Editorial Storytelling */}
          <div className="space-y-6 max-w-xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">
              INSPIRATION SYNTHESIS
            </span>
            <h2 className="text-4xl sm:text-5xl font-normal text-[#111827] tracking-tight leading-[1.1] font-sans">
              Love a website you saw? <br />
              <span className="font-serif italic font-light text-slate-700">
                Extract its aesthetic DNA legally.
              </span>
            </h2>
            <p className="text-base text-slate-600 font-light leading-relaxed">
              Paste any public portfolio or design site URL you admire. Our SSRF-isolated Inspiration Engine analyzes high-level design tokens (color harmonies, spatial scale, typography categories) and synthesizes an original, 100% copyright-compliant theme using open-source fonts.
            </p>

            <div className="space-y-3 pt-2 text-sm text-slate-700">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111827]" />
                <span>Zero copied code, zero asset scraping, and zero trademark infringement</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111827]" />
                <span>3-tier Closeness slider: Loose, Medium, or Close inspiration match</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111827]" />
                <span>Mathematical similarity guard ensuring all creations stay original</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/inspiration"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#111827] hover:underline"
              >
                <span>Launch Inspiration Cloner</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right: Clean Extraction Interactive Mock */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-lg space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-xs font-mono text-slate-400">INSPIRATION_ANALYZER</span>
              <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-medium">
                SSRF Sandboxed
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs flex items-center justify-between">
                <span className="text-slate-600 truncate">https://pattin.design</span>
                <span className="text-emerald-600 font-semibold text-[11px] shrink-0">Analyzed ✓</span>
              </div>

              <div className="p-4 rounded-xl bg-[#FAFAF9] border border-slate-200 space-y-3 text-xs">
                <div className="flex justify-between items-center text-slate-700">
                  <span className="font-medium">Detected Layout</span>
                  <span className="text-slate-500 font-mono">Split Hero (45/55)</span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span className="font-medium">Typography Pair</span>
                  <span className="text-slate-500 font-mono">Editorial Serif + Sans</span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span className="font-medium">Synthesized Font</span>
                  <span className="text-[#111827] font-semibold font-serif">Newsreader (Google Fonts)</span>
                </div>
                <div className="flex justify-between items-center text-slate-700 pt-2 border-t border-slate-200">
                  <span className="font-medium">Closeness Setting</span>
                  <span className="text-[#111827] font-semibold">Medium (Original Harmony)</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed font-light">
                *FolioVeda does not download external code or copy protected designs. We map abstract mathematical aesthetic properties to open-source assets.
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          EDITORIAL CHAPTER 4: Speed, Custom Domains & Recruiter Telemetry
          ========================================================================= */}
      <section className="py-24 px-6 sm:px-10 max-w-7xl mx-auto border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Minimalist Telemetry Visual Card */}
          <div className="order-2 lg:order-1 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-lg space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-xs font-mono text-slate-400">EDGE_TELEMETRY</span>
              <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-medium">
                Live Alert
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-900">Hiring Manager @ Stripe</span>
                  <span className="text-slate-400 font-mono text-[11px]">Just now</span>
                </div>
                <p className="text-xs text-slate-600 font-light">
                  Viewed your project <strong className="text-slate-800 font-medium">&quot;Distributed Edge Cache&quot;</strong> for 3 minutes 42 seconds.
                </p>
                <div className="text-[11px] text-emerald-600 font-medium">
                  Downloaded Resume PDF (ATS-Optimized)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#FAFAF9] border border-slate-200">
                  <span className="text-slate-400 text-[10px] block">GLOBAL TTFB</span>
                  <span className="text-lg font-bold text-slate-900">28ms</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAFAF9] border border-slate-200">
                  <span className="text-slate-400 text-[10px] block">LIGHTHOUSE SCORE</span>
                  <span className="text-lg font-bold text-slate-900">100 / 100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Editorial Storytelling */}
          <div className="order-1 lg:order-2 space-y-6 max-w-xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">
              PERFORMANCE &amp; TELEMETRY
            </span>
            <h2 className="text-4xl sm:text-5xl font-normal text-[#111827] tracking-tight leading-[1.1] font-sans">
              Stand out in every <br />
              <span className="font-serif italic font-light text-slate-700">
                client &amp; recruiter inbox.
              </span>
            </h2>
            <p className="text-base text-slate-600 font-light leading-relaxed">
              Never wonder whether a hiring manager or prospect opened your link. Enjoy real-time visit telemetry, automated SSL, custom domain binding (<code>yourname.design</code>), and global edge replication for instantaneous loading.
            </p>

            <div className="space-y-3 pt-2 text-sm text-slate-700">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111827]" />
                <span>Instant custom domain setup with automated DNS provisioning</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111827]" />
                <span>100/100 Google Lighthouse Core Web Vitals across all themes</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111827]" />
                <span>Full Next.js / Tailwind code export with zero vendor lock-in</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/p/alex"
                target="_blank"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#111827] hover:underline"
              >
                <span>View Live Recruiter Page Sample</span>
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          CREATOR STORIES: Real Voices & Dignified Social Proof
          ========================================================================= */}
      <section className="py-24 px-6 sm:px-10 max-w-7xl mx-auto border-t border-slate-200">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">
            CREATOR TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal text-[#111827] tracking-tight mt-2 font-sans">
            Built by creators. <span className="font-serif italic font-light">Praised by hiring teams.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <p className="font-serif italic text-base sm:text-lg text-slate-800 leading-relaxed font-light">
              &quot;I used to send recruiters my messy GitHub profile and a boring Notion page. I put together a Developer Terminal portfolio on FolioVeda in 90 seconds. A hiring manager at Datadog replied: &apos;This is the cleanest breakdown I&apos;ve seen all week.&apos; Got the offer.&quot;
            </p>
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-semibold text-slate-900">Aryan Sharma</h3>
              <p className="text-[11px] text-slate-500 font-light">Systems Engineer @ Datadog Alumni (IIT Delhi &apos;25)</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <p className="font-serif italic text-base sm:text-lg text-slate-800 leading-relaxed font-light">
              &quot;Framer was taking me two weekends to build custom animations. FolioVeda&apos;s Minimal Editorial theme extracted my Behance projects, paired them with gorgeous typography, and let me deploy under my own domain in minutes. The 100/100 Lighthouse score is real.&quot;
            </p>
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-semibold text-slate-900">Maya Chen</h3>
              <p className="text-[11px] text-slate-500 font-light">Staff Product Designer (ex-DoorDash)</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <p className="font-serif italic text-base sm:text-lg text-slate-800 leading-relaxed font-light">
              &quot;As a VP of Engineering reviewing 200 candidates a day, nothing annoys me more than broken links or AI-hallucinated buzzwords. When an applicant shares a FolioVeda link, I see clean architecture, live demo links that work, and verified metrics.&quot;
            </p>
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-semibold text-slate-900">David K.</h3>
              <p className="text-[11px] text-slate-500 font-light">VP of Engineering @ Series B SaaS</p>
            </div>
          </div>

        </div>

      </section>


      {/* =========================================================================
          PRICING: Dignified, Transparent & Minimalist
          ========================================================================= */}
      <section id="pricing" className="py-24 px-6 sm:px-10 max-w-5xl mx-auto border-t border-slate-200 scroll-mt-24">
        
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">
            TRANSPARENT PRICING
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal text-[#111827] tracking-tight mt-2 font-sans">
            Start free. <span className="font-serif italic font-light">Upgrade when interviewing.</span>
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-light">
            No surprise tier limits. Export your code at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Free Tier */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-baseline">
                <h3 className="text-xl font-medium text-slate-900 font-sans">Free Forever</h3>
                <span className="text-xs uppercase font-mono font-semibold text-slate-400">$0 / Month</span>
              </div>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Everything you need to launch a beautiful, high-converting live portfolio.
              </p>

              <div className="space-y-3 text-xs text-slate-700 pt-2">
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-slate-900 shrink-0" />
                  <span>1 Live Portfolio on <code>folioveda.me/yourname</code></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-slate-900 shrink-0" />
                  <span>Access to all 8 core style packages</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-slate-900 shrink-0" />
                  <span>Instant SSL &amp; Global Edge CDN deployment</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-slate-900 shrink-0" />
                  <span>Unlimited text, metric &amp; project edits</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-slate-900 shrink-0" />
                  <span>GitHub &amp; PDF resume sync</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/onboarding"
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium text-xs py-3.5 rounded-full text-center block transition"
              >
                Get Started Free
              </Link>
            </div>
          </div>

          {/* Pro Tier */}
          <div className="bg-[#111827] text-white rounded-3xl p-8 sm:p-10 border border-[#111827] shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex justify-between items-baseline">
                <h3 className="text-xl font-medium text-white font-sans">Pro Accelerator</h3>
                <span className="text-xs uppercase font-mono font-semibold text-slate-400">$9 / Month</span>
              </div>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                For active job seekers and freelancers requiring custom domains and telemetry.
              </p>

              <div className="space-y-3 text-xs text-slate-200 pt-2">
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-white shrink-0" />
                  <span>Custom Domain Support (<code>yourname.com</code>, <code>.dev</code>)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-white shrink-0" />
                  <span>Unlimited Inspiration Link Cloner runs</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-white shrink-0" />
                  <span>Live Recruiter Analytics &amp; Visit Telemetry</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-white shrink-0" />
                  <span>Zero FolioVeda branding badge</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-white shrink-0" />
                  <span>Full HTML / JSON / Tailwind code export</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/onboarding?plan=pro"
                className="w-full bg-white hover:bg-slate-100 text-[#111827] font-medium text-xs py-3.5 rounded-full text-center block transition shadow-sm"
              >
                Start 14-Day Free Trial
              </Link>
            </div>
          </div>

        </div>

        <div className="mt-8 text-center text-xs text-slate-400 font-light">
          14-day money-back guarantee • 50% discount for students with .edu or .ac emails
        </div>

      </section>


      {/* =========================================================================
          FAQ ACCORDION: Quiet, High-Confidence Answers
          ========================================================================= */}
      <section className="py-24 px-6 sm:px-10 max-w-3xl mx-auto border-t border-slate-200">
        
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">
            COMMON QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal text-[#111827] tracking-tight mt-2 font-sans">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Will the AI invent fake accomplishments or exaggerate my experience?",
              a: "Never. FolioVeda operates under a strict Zero-Hallucination Contract. Our pipeline only highlights and formats information directly present in your submitted resume, GitHub repositories, or intake answers. You review and approve every single line before publication.",
            },
            {
              q: "Is it legal to use the Inspiration Link feature?",
              a: "Yes, 100%. Copyright law protects specific expressions (code, text, photography, trademarks), but does not protect abstract design concepts, color palettes, or layout structures. FolioVeda never copies source code or assets. We extract high-level aesthetic tokens and synthesize an original theme using open-source fonts.",
            },
            {
              q: "Can I connect my own custom domain (e.g. alex.dev)?",
              a: "Yes. Pro users can connect any custom domain or subdomain. We provision automated, managed SSL certificates via our edge CDN with zero DNS headaches.",
            },
            {
              q: "Can I export the code if I want to host it myself?",
              a: "Yes. You are never locked in. You can download a clean, production-ready Next.js and Tailwind CSS codebase at any time and host it anywhere (Vercel, AWS, Cloudflare Pages, Netlify).",
            },
            {
              q: "What happens if I want to change my portfolio theme next month?",
              a: "Your career content is decoupled from the presentation layer. You can switch between any of our 8+ themes with one click—your projects, bios, and links will instantly re-render without losing a single character of data.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-medium text-sm text-[#111827] hover:text-slate-600 transition-colors"
              >
                <span>{item.q}</span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 transition-transform duration-200 text-slate-400 ${
                    activeFaq === idx ? "rotate-180 text-slate-800" : ""
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-5 pt-1 text-xs text-slate-600 leading-relaxed font-light border-t border-slate-100">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </section>


      {/* =========================================================================
          CLOSING HERO CALL TO ACTION
          ========================================================================= */}
      <section className="py-24 px-6 sm:px-10 max-w-7xl mx-auto border-t border-slate-200">
        <div className="bg-[#111827] text-white rounded-3xl p-12 sm:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">
              CREATE YOUR LEGACY
            </span>
            <h2 className="text-4xl sm:text-6xl font-normal tracking-tight text-white leading-tight font-sans">
              Your work is exceptional. <br />
              <span className="font-serif italic font-light text-slate-300">
                Your portfolio should be too.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-light max-w-xl mx-auto leading-relaxed">
              Join thousands of creators, engineers, and designers who present their work with calm, award-winning authority.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/onboarding"
                className="w-full sm:w-auto bg-white hover:bg-slate-100 text-[#111827] font-medium text-sm px-9 py-4 rounded-full shadow-lg transition-all duration-200 active:scale-98"
              >
                Create Your Portfolio — Free
              </Link>
            </div>

            <p className="text-xs text-slate-500 font-light">
              Takes 120 seconds • No credit card required • Export anytime
            </p>
          </div>
        </div>
      </section>


      {/* =========================================================================
          FOOTER: Architectural, Quiet & Clean
          ========================================================================= */}
      <footer className="border-t border-slate-200 bg-[#FAFAF9] pt-16 pb-12 px-6 sm:px-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-12 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <FolioVedaLogo size="sm" showText={false} />
              <span className="text-base font-medium text-[#111827]">FolioVeda</span>
              <span className="text-xs text-slate-400 ml-2">Award-winning portfolio architecture for creators.</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Edge Systems 100% Operational</span>
              </div>
              <Link href="/hub" className="text-slate-600 hover:text-black font-medium underline">
                Master Hub
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-12">
            <div>
              <h3 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
                Templates
              </h3>
              <ul className="space-y-2">
                <li><Link href="/styles?theme=minimal-editorial" className="hover:text-black transition">Cami (Editorial)</Link></li>
                <li><Link href="/styles?theme=developer-terminal" className="hover:text-black transition">Kester (Terminal)</Link></li>
                <li><Link href="/styles?theme=creative-collage" className="hover:text-black transition">Reseda (Spatial)</Link></li>
                <li><Link href="/styles?theme=case-study-heavy" className="hover:text-black transition">Nolan (Product)</Link></li>
                <li><Link href="/styles" className="hover:text-black transition">Browse All 8 →</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
                Platform
              </h3>
              <ul className="space-y-2">
                <li><Link href="/inspiration" className="hover:text-black transition">Inspiration Cloner</Link></li>
                <li><Link href="/onboarding" className="hover:text-black transition">Intake Flow</Link></li>
                <li><Link href="/resume" className="hover:text-black transition">AI Resume Tailor</Link></li>
                <li><Link href="/dashboard" className="hover:text-black transition">User Dashboard</Link></li>
                <li><Link href="/p/alex" className="hover:text-black transition">Public Recruiter Link</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
                Security &amp; Legal
              </h3>
              <ul className="space-y-2">
                <li><Link href="/legal/terms" className="hover:text-black transition">Terms of Service</Link></li>
                <li><Link href="/legal/takedown" className="hover:text-black transition">DMCA / Takedown</Link></li>
                <li><Link href="/security" className="hover:text-black transition">Security Architecture</Link></li>
                <li><span className="text-slate-400">Zero Data Scraping</span></li>
                <li><span className="text-slate-400">DPDP &amp; GDPR Ready</span></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
                Company
              </h3>
              <ul className="space-y-2">
                <li><Link href="/brand" className="hover:text-black transition">Brand Guidelines</Link></li>
                <li><Link href="/hub" className="hover:text-black transition">Developer Studio</Link></li>
                <li><a href="#pricing" className="hover:text-black transition">Pricing</a></li>
                <li><a href="#templates" className="hover:text-black transition">Gallery</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400">
            <div>
              © 2026 FolioVeda Inc. Built with award-winning design restraint. Deployed on global Edge infrastructure.
            </div>
            <div>
              Sub-50ms TTFB worldwide
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
