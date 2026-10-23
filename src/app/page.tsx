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
  FileText,
  Star,
  CheckCircle2,
  Zap,
  Flame,
  Palette
} from "lucide-react";
import { FolioVedaLogo } from "@/components/ui/Logo";
import { HangingResumesGallery } from "@/components/portfolio/HangingResumesGallery";

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
  badgeBg: string;
  badgeText: string;
  previewType: "editorial" | "terminal" | "spatial" | "strategy" | "poster";
  tags: string[];
}

const TEMPLATES: TemplateShowcase[] = [
  {
    id: "minimal-editorial",
    name: "Cami",
    category: "creative",
    categoryLabel: "Editorial & Design",
    title: "Elena Vance — Spatial & Brand Monograph",
    description: "Refined headlines, generous white space, and asymmetric visual rhythm.",
    fonts: "Plus Jakarta Sans + Newsreader Display",
    accentColor: "#991B1B",
    badgeBg: "bg-red-50 border-red-200",
    badgeText: "text-[#991B1B]",
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
    fonts: "JetBrains Mono + Plus Jakarta Sans",
    accentColor: "#10B981",
    badgeBg: "bg-emerald-50 border-emerald-200",
    badgeText: "text-emerald-700",
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
    fonts: "Plus Jakarta Sans Bold + Syne",
    accentColor: "#D97706",
    badgeBg: "bg-amber-50 border-amber-200",
    badgeText: "text-amber-800",
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
    fonts: "Plus Jakarta Sans Bold + Inter",
    accentColor: "#2563EB",
    badgeBg: "bg-blue-50 border-blue-200",
    badgeText: "text-blue-700",
    previewType: "strategy",
    tags: ["Case Studies", "PLG Metrics", "Executive"],
  },
  {
    id: "bold-poster",
    name: "Verve",
    category: "creative",
    categoryLabel: "High-Energy Poster",
    title: "Kai Tanaka — Creative Technologist",
    description: "Brutalist grid borders, vibrant crimson tags, and bold display headers.",
    fonts: "Plus Jakarta Sans Heavy + JetBrains Mono",
    accentColor: "#DC2626",
    badgeBg: "bg-rose-50 border-rose-200",
    badgeText: "text-rose-700",
    previewType: "poster",
    tags: ["Brutalist", "High-Energy", "Experimental"],
  },
];

export default function ColorfulEditorialHomePage() {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>("all");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("minimal-editorial");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const filteredTemplates = activeCategory === "all" 
    ? TEMPLATES 
    : TEMPLATES.filter((t) => t.category === activeCategory);

  const currentTemplate = TEMPLATES.find((t) => t.id === selectedTemplate) || TEMPLATES[0];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] font-sans selection:bg-[#991B1B] selection:text-white antialiased overflow-x-hidden">
      
      {/* =========================================================================
          ANIMATED NAVBAR: Positioned cleanly at the very top (No line/ribbon above)
          ========================================================================= */}
      <header className="sticky top-0 z-50 bg-[#F8F9FA]/90 backdrop-blur-xl border-b border-[#1E293B]/10 transition-all duration-300">
        
        {/* Subtle bottom animated crimson gradient accent streak */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#991B1B]/40 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between relative">
          
          {/* Left: Animated Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group relative">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] flex items-center justify-center text-white shadow-sm group-hover:rotate-6 group-hover:scale-105 group-hover:shadow-[#991B1B]/30 transition-all duration-300">
                <FolioVedaLogo size="sm" showText={false} />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#991B1B] ring-2 ring-[#F8F9FA] animate-pulse" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold tracking-tight text-[#1E293B] font-sans group-hover:text-[#991B1B] transition-colors">
                  FolioVeda
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#991B1B]" />
              </div>
              <span className="text-[10px] tracking-widest uppercase text-slate-400 font-bold -mt-0.5">
                Portfolio Engine
              </span>
            </div>
          </Link>

          {/* Center: Animated Interactive Navigation with Smooth Floating Hover Pills */}
          <nav 
            className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-white/80 border border-[#1E293B]/10 shadow-2xs backdrop-blur-md"
            onMouseLeave={() => setHoveredNav(null)}
          >
            {[
              { id: "resumes", label: "Top Resumes", href: "#top-resumes", badge: "HOT" },
              { id: "templates", label: "Templates", href: "#templates" },
              { id: "inspiration", label: "Inspiration", href: "/inspiration", badge: "AI" },
              { id: "intake", label: "Intake Flow", href: "/onboarding" },
              { id: "features", label: "Features", href: "#features" },
              { id: "pricing", label: "Pricing", href: "#pricing" },
              { id: "styles", label: "Style Gallery", href: "/styles" },
              { id: "hub", label: "Dev Hub ↗", href: "/hub" },
            ].map((link) => {
              const isHovered = hoveredNav === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onMouseEnter={() => setHoveredNav(link.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    isHovered
                      ? "text-[#991B1B]"
                      : "text-slate-600 hover:text-[#1E293B]"
                  }`}
                >
                  {/* Animated Pill Background */}
                  {isHovered && (
                    <span className="absolute inset-0 rounded-full bg-red-50/90 border border-red-200 shadow-2xs -z-10 animate-fade-in" />
                  )}
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full bg-gradient-to-r from-[#991B1B] to-[#DC2626] text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Operational Status & Animated Shimmer CTA */}
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-xs font-bold text-slate-600 hover:text-[#991B1B] transition-colors hidden sm:inline"
            >
              Sign In
            </Link>

            <Link
              href="/onboarding"
              className="shimmer-button bg-gradient-to-r from-[#991B1B] via-[#B91C1C] to-[#991B1B] hover:from-[#7F1D1D] hover:to-[#991B1B] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md shadow-[#991B1B]/25 hover:shadow-lg hover:shadow-[#991B1B]/40 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-1.5 group"
            >
              <span>Create Your Portfolio</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </header>


      {/* =========================================================================
          HERO SECTION: Bold, Attractive Display Typography (Zero Italic)
          ========================================================================= */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 px-6 sm:px-10 max-w-6xl mx-auto text-center">
        
        {/* Soft Background Crimson Glow Aura */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[340px] bg-gradient-to-br from-[#991B1B]/15 via-red-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />

        {/* Kicker Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#1E293B]/10 text-xs font-bold text-[#1E293B] shadow-xs mb-8 relative z-10">
          <span className="w-2 h-2 rounded-full bg-[#991B1B] animate-pulse" />
          <span className="font-extrabold text-slate-800 tracking-wide uppercase text-[11px]">60-30-10 PALETTE</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600 font-semibold">Studio Alabaster, Deep Slate &amp; Industrial Crimson</span>
        </div>

        {/* Bold, Striking Display Headline (Non-Italic, High-Impact) */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-extrabold tracking-tight text-[#1E293B] leading-[1.05] mb-8 font-sans relative z-10">
          Create a portfolio <br />
          <span className="font-extrabold tracking-tight bg-gradient-to-r from-[#991B1B] via-[#DC2626] to-[#7F1D1D] bg-clip-text text-transparent">
            that gets you noticed.
          </span>
        </h1>

        {/* Clean, Confident Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed mb-10 relative z-10">
          Showcase your work with award-winning design, zero-hallucination intake, and instant custom domains. Built for designers, engineers, and creators who let their work speak.
        </p>

        {/* High-Conversion CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 relative z-10">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto shimmer-button bg-gradient-to-r from-[#991B1B] via-[#B91C1C] to-[#991B1B] hover:from-[#7F1D1D] hover:to-[#991B1B] text-white font-bold text-base px-9 py-4 rounded-full shadow-lg shadow-[#991B1B]/30 hover:shadow-xl hover:shadow-[#991B1B]/40 hover:scale-105 active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <span>Create Your Portfolio — Free</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/inspiration"
            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-[#1E293B] border border-[#1E293B]/20 hover:border-[#991B1B] hover:text-[#991B1B] font-bold text-base px-8 py-4 rounded-full shadow-xs hover:shadow transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <Sparkles size={16} className="text-[#991B1B] group-hover:rotate-12 transition-transform" />
            <span>Paste Inspiration Link</span>
          </Link>
        </div>

        {/* Micro-Reassurance */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-500 font-medium relative z-10 mb-14">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-[#991B1B]" /> Free 14-day trial
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-[#991B1B]" /> No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-[#991B1B]" /> Sub-50ms Global Edge CDN
          </span>
        </div>

        {/* Verified Social Proof Strip */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 py-2.5 px-6 rounded-2xl bg-white border border-[#1E293B]/10 shadow-xs relative z-10">
          <div className="flex -space-x-2">
            <div className="w-7 h-7 rounded-full bg-[#1E293B] text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">EV</div>
            <div className="w-7 h-7 rounded-full bg-[#991B1B] text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">AR</div>
            <div className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">MV</div>
            <div className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">+14k</div>
          </div>
          <div className="text-xs text-slate-700 font-semibold flex items-center gap-1">
            <div className="flex text-amber-500">
              {"★".repeat(5)}
            </div>
            <span className="font-bold text-[#1E293B]">4.96/5</span>
            <span>from 14,200+ engineers &amp; designers</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-slate-200" />
          <div className="text-xs text-slate-500 font-medium hidden md:block">
            Alumni hired at <strong className="text-[#1E293B] font-bold">Stripe</strong>, <strong className="text-[#1E293B] font-bold">Linear</strong>, <strong className="text-[#1E293B] font-bold">Vercel</strong>, and <strong className="text-[#1E293B] font-bold">Datadog</strong>
          </div>
        </div>

      </section>


      {/* =========================================================================
          HANGING RESUMES GALLERY: Scroll-Triggered Drop Tied With Flexible Threads
          & Full-Screen Front Page Cover on Hover
          ========================================================================= */}
      <HangingResumesGallery />


      {/* =========================================================================
          HERO VISUAL SHOWCASE: Colorful, Interactive Template Stage
          ========================================================================= */}
      <section id="templates" className="px-6 sm:px-10 max-w-7xl mx-auto pb-28 scroll-mt-24">
        
        {/* Colorful Discipline Tabs */}
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
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-[#991B1B] text-white shadow-md shadow-[#991B1B]/30 scale-105"
                  : "bg-white text-slate-600 hover:text-[#1E293B] border border-slate-200 hover:border-slate-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Elevated Showcase Window */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden transition-all duration-300">
          
          {/* Window Address Header */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="ml-4 text-xs text-slate-500 font-mono hidden sm:inline">
                https://folioveda.me/{currentTemplate.name.toLowerCase()}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-slate-400 font-medium hidden md:inline">
                Typography: <strong className="text-slate-800 font-bold">{currentTemplate.fonts}</strong>
              </span>
              <Link
                href={`/onboarding?template=${currentTemplate.id}`}
                className="bg-[#991B1B] hover:bg-[#7F1D1D] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xs transition flex items-center gap-1.5"
              >
                <span>Use {currentTemplate.name} Template</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Dynamic Template Canvas */}
          <div className="p-8 sm:p-12 lg:p-16 min-h-[460px] flex flex-col justify-between">
            
            {/* 1. Editorial Showcase (Bold headlines, zero italic) */}
            {currentTemplate.previewType === "editorial" && (
              <div className="space-y-12 animate-fade-in">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-8">
                  <div>
                    <span className="text-xs font-bold tracking-widest uppercase text-[#991B1B] bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full inline-block">
                      MONOGRAPH 01 • CURATED
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1E293B] mt-3 tracking-tight font-sans">
                      Elena Vance
                    </h2>
                    <p className="text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                      Brand Systems &amp; Spatial Architecture • Kyoto &amp; San Francisco
                    </p>
                  </div>
                  <p className="text-sm text-slate-700 max-w-sm font-medium text-right hidden md:block">
                    &quot;Form follows clarity. Designing spaces, identities, and digital publications that leave a lasting mark.&quot;
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-3 group cursor-pointer">
                    <div className="aspect-[4/3] bg-gradient-to-br from-rose-50 to-stone-100 rounded-2xl overflow-hidden border border-rose-200/80 p-6 flex flex-col justify-between group-hover:shadow-md transition-all">
                      <span className="text-[10px] font-mono font-bold text-[#991B1B]">CASE 01</span>
                      <span className="font-bold text-slate-800 text-lg">The Glass Pavilion (2025)</span>
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#991B1B] transition-colors">The Glass Pavilion</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      Monolithic cedar and low-iron glass residential retreat in Kamakura.
                    </p>
                  </div>

                  <div className="space-y-3 group cursor-pointer">
                    <div className="aspect-[4/3] bg-gradient-to-br from-red-50 to-amber-50 rounded-2xl overflow-hidden border border-red-200/80 p-6 flex flex-col justify-between group-hover:shadow-md transition-all">
                      <span className="text-[10px] font-mono font-bold text-[#991B1B]">CASE 02</span>
                      <span className="font-bold text-slate-800 text-lg">Prism Type Specimen</span>
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#991B1B] transition-colors">Prism Type Specimen</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      Bespoke geometric typeface and publication guidelines.
                    </p>
                  </div>

                  <div className="space-y-3 group cursor-pointer">
                    <div className="aspect-[4/3] bg-gradient-to-br from-stone-100 to-rose-50 rounded-2xl overflow-hidden border border-stone-200 p-6 flex flex-col justify-between group-hover:shadow-md transition-all">
                      <span className="text-[10px] font-mono font-bold text-[#991B1B]">CASE 03</span>
                      <span className="font-bold text-slate-800 text-lg">Aura Ceramic Objects</span>
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#991B1B] transition-colors">Aura Ceramic Objects</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      Limited hand-thrown vessel edition exploring tactile glaze gradients.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Technical / Systems Engineering (Deep Slate & Cyber Emerald) */}
            {currentTemplate.previewType === "terminal" && (
              <div className="bg-[#1E293B] text-slate-100 -m-8 sm:-m-12 lg:-m-16 p-8 sm:p-12 lg:p-16 font-mono space-y-10 animate-fade-in rounded-2xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-800 pb-8">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-400 text-xs mb-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>SYSTEM_STATUS: 100% OPERATIONAL • GITHUB SYNCED</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      Alex Rivera
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Senior Systems Architect • Distributed Caches &amp; Edge Compute
                    </p>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-200 font-bold">
                      <span className="text-[#991B1B]">#</span> p99 &lt; 3.2ms
                    </div>
                    <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-200 font-bold">
                      <span className="text-[#991B1B]">#</span> 100k req/sec
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-900/90 border border-slate-800 hover:border-[#991B1B]/70 p-6 rounded-2xl space-y-3 transition">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white font-bold text-sm">Distributed Edge Cache</span>
                      <span className="text-slate-500 font-mono">commit a4f8e91</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans font-normal">
                      Zero-copy in-memory caching daemon written in Rust with automated replica failover and sub-5ms global p99.
                    </p>
                    <div className="text-xs text-emerald-400 font-bold pt-1">
                      100k req/s • 34% cloud bandwidth cost reduction
                    </div>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 hover:border-[#991B1B]/70 p-6 rounded-2xl space-y-3 transition">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white font-bold text-sm">FolioVeda Compiler Engine</span>
                      <span className="text-slate-500 font-mono">commit 7c2d1b0</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans font-normal">
                      Zero-hallucination portfolio builder with dynamic multi-theme architectural renderer and SSRF safety guard.
                    </p>
                    <div className="text-xs text-emerald-400 font-bold pt-1">
                      Sub-50ms TTFB worldwide on 300+ Edge locations
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Spatial / Architecture (Warm Terracotta & Sand) */}
            {currentTemplate.previewType === "spatial" && (
              <div className="space-y-10 animate-fade-in">
                <div className="border-b border-slate-200 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full inline-block">
                      SPATIAL ARCHITECTURE
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1E293B] mt-2 tracking-tight">
                      Studio Ortiz
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                      Civic Infrastructure, Cultural Centers &amp; Urban Landscapes
                    </p>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    Selection 2022 — 2026
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 space-y-3 shadow-xs">
                    <span className="text-xs font-mono font-bold text-amber-800">PROJECT 01</span>
                    <h3 className="text-2xl font-bold text-slate-900">The Nordic Pavilion</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Sustainable cross-laminated timber pavilion exploring carbon-neutral civic assembly in Oslo.
                    </p>
                  </div>
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 space-y-3 shadow-xs">
                    <span className="text-xs font-mono font-bold text-amber-800">PROJECT 02</span>
                    <h3 className="text-2xl font-bold text-slate-900">Maritime Heritage Museum</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Submerged tidal gallery space constructed from recycled marine aggregate concrete.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Strategy / Product Lead (Royal Cobalt & Deep Slate) */}
            {currentTemplate.previewType === "strategy" && (
              <div className="space-y-10 animate-fade-in">
                <div className="border-b border-slate-200 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full inline-block">
                      PRODUCT LEADERSHIP
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1E293B] mt-2 tracking-tight">
                      Marcus Vance
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                      Principal PM • Scaling Developer Tooling from $0 to $12M ARR
                    </p>
                  </div>
                  <div className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    Recruiter Telemetry Active
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/50 to-slate-50 space-y-3 shadow-xs">
                    <span className="text-xs text-blue-700 font-bold">CASE STUDY 01</span>
                    <h3 className="text-xl font-bold text-slate-900">Developer Self-Serve Funnel</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Re-architected developer onboarding cutting time-to-first-API-call from 14 minutes to 82 seconds.
                    </p>
                    <div className="text-xs font-bold text-slate-900 pt-2 border-t border-slate-200">
                      Outcome: +38% self-serve activation • $4.2M new ARR
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/50 to-slate-50 space-y-3 shadow-xs">
                    <span className="text-xs text-blue-700 font-bold">CASE STUDY 02</span>
                    <h3 className="text-xl font-bold text-slate-900">Enterprise Audit Log API</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Designed and launched enterprise SAML &amp; compliance suite unlocking 8-figure pipeline across banks.
                    </p>
                    <div className="text-xs font-bold text-slate-900 pt-2 border-t border-slate-200">
                      Outcome: 100% SOC2 Type II compliance audit passed
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Bold Poster / High-Energy (Vibrant Crimson & Neo-Grotesque) */}
            {currentTemplate.previewType === "poster" && (
              <div className="bg-rose-50/60 text-[#1E293B] -m-8 sm:-m-12 lg:-m-16 p-8 sm:p-12 lg:p-16 border-4 border-[#1E293B] font-sans space-y-8 animate-fade-in rounded-2xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-4 border-[#1E293B] pb-6">
                  <div>
                    <span className="inline-block bg-[#991B1B] text-white px-3 py-1 font-black text-xs uppercase tracking-wider mb-2">
                      CREATIVE TECH SHOWCASE
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-[#1E293B]">
                      Kai Tanaka
                    </h2>
                    <p className="text-sm font-bold text-slate-700 mt-1">Creative Technologist • WebGPU &amp; Haptic Systems</p>
                  </div>
                  <div className="bg-white border-2 border-[#1E293B] p-3 shadow-[4px_4px_0px_#1E293B]">
                    <span className="text-xs font-black uppercase text-[#991B1B] block">PROVEN OUTCOME</span>
                    <span className="text-sm font-bold">FWA Site of the Month 2026</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-[#1E293B] p-4 shadow-[4px_4px_0px_#1E293B]">
                    <h3 className="font-black text-base uppercase text-[#1E293B]">Spatial Audio Visualizer</h3>
                    <p className="text-xs text-slate-700 font-medium mt-1">Browser-based generative sound sculptures with custom haptic web controllers.</p>
                  </div>
                  <div className="bg-white border-2 border-[#1E293B] p-4 shadow-[4px_4px_0px_#1E293B]">
                    <h3 className="font-black text-base uppercase text-[#1E293B]">Neural Shader Pipeline</h3>
                    <p className="text-xs text-slate-700 font-medium mt-1">Real-time WebGL rendering engine running at 120 FPS on mobile browsers.</p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Switcher Strip */}
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-semibold">Switch Showcase:</span>
              <div className="flex flex-wrap gap-1.5">
                {filteredTemplates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`px-3 py-1 rounded-full font-bold transition ${
                      selectedTemplate === t.id
                        ? "bg-[#991B1B] text-white shadow-xs"
                        : "bg-white text-slate-600 hover:text-[#1E293B] border border-slate-200"
                    }`}
                  >
                    {t.name} ({t.categoryLabel})
                  </button>
                ))}
              </div>
            </div>

            <Link
              href="/styles"
              className="text-[#991B1B] hover:text-[#7F1D1D] font-bold flex items-center gap-1 transition"
            >
              <span>Explore all 8 styles in gallery</span>
              <ArrowRight size={12} />
            </Link>
          </div>

        </div>

      </section>


      {/* =========================================================================
          EDITORIAL CHAPTER 1: "Make it undeniably yours" (Flexible Design Systems)
          ========================================================================= */}
      <section id="features" className="py-24 px-6 sm:px-10 max-w-7xl mx-auto border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Editorial Storytelling */}
          <div className="space-y-6 max-w-xl">
            <span className="text-xs font-bold tracking-widest uppercase text-[#991B1B] bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full inline-block">
              FLEXIBLE DESIGN SYSTEMS
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1E293B] tracking-tight leading-[1.1] font-sans">
              Make it undeniably yours. <br />
              <span className="font-extrabold text-[#991B1B]">
                With complete creative freedom.
              </span>
            </h2>
            <p className="text-base text-slate-600 font-normal leading-relaxed">
              Every portfolio begins with a designer-crafted foundation. Customize typography pairings, spatial scales, color harmonies, and layout patterns with zero code. Switch architectural themes anytime with mathematical zero content loss.
            </p>

            <div className="space-y-3 pt-2 text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#991B1B]" />
                <span>8 distinct architectural theme packages for every profession</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#991B1B]" />
                <span>Open-source Google Fonts pairings with refined optical tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#991B1B]" />
                <span>Fluid responsive layout grids tuned for mobile, tablet, and ultra-wide screens</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/styles"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#991B1B] hover:text-[#7F1D1D] group"
              >
                <span>Browse the Style Library</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right: Rich Colorful Token Card */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-xs font-mono font-bold text-slate-400">DESIGN_TOKENS</span>
              <span className="text-xs bg-red-50 text-[#991B1B] border border-red-200 px-2.5 py-0.5 rounded-full font-bold">
                60-30-10 Harmony
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs text-slate-500 font-semibold">Typography Pairing</span>
                <div className="mt-1.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center shadow-2xs">
                  <span className="font-bold text-lg text-slate-900">Plus Jakarta Sans Bold</span>
                  <span className="text-xs text-[#991B1B] font-mono font-bold">+ Inter Medium</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-500 font-semibold">Palette Distribution</span>
                <div className="mt-1.5 grid grid-cols-3 gap-2 text-xs">
                  <div className="p-3 rounded-xl bg-[#F8F9FA] border border-slate-200 text-slate-800 shadow-2xs">
                    <strong className="block text-slate-900 font-bold">60% Canvas</strong>
                    <span className="text-[11px] text-slate-500">Studio Alabaster</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#1E293B] text-white shadow-xs">
                    <strong className="block text-white font-bold">30% Structure</strong>
                    <span className="text-[11px] text-slate-300">Deep Slate</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#991B1B] text-white shadow-xs">
                    <strong className="block text-white font-bold">10% Accent</strong>
                    <span className="text-[11px] text-red-200">Industrial Crimson</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-red-50/50 border border-red-200 text-xs text-slate-700 leading-relaxed font-medium">
                &quot;Switching between Terminal, Editorial, and Poster themes instantly re-renders components without resetting your bios, links, or uploaded projects.&quot;
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          EDITORIAL CHAPTER 2: "Zero-Hallucination Contract"
          ========================================================================= */}
      <section className="py-24 px-6 sm:px-10 max-w-7xl mx-auto border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Factual Verification Card */}
          <div className="order-2 lg:order-1 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-xs font-mono font-bold text-slate-400">FACTUAL_INTEGRITY_CHECK</span>
              <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
                100% Verified
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <Check size={14} className="text-emerald-700" />
                  <span>FolioVeda Strict Guard</span>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                  &quot;Architected edge caching layer in Rust reducing cloud bandwidth costs by 34% across 12,000 monthly active users.&quot;
                </p>
                <span className="text-[10px] text-emerald-700 block font-mono font-semibold">
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
                <span className="text-[10px] text-rose-500 block font-semibold">
                  Hallucinated claim — flagged and rejected by recruiters
                </span>
              </div>
            </div>
          </div>

          {/* Right: Storytelling */}
          <div className="order-1 lg:order-2 space-y-6 max-w-xl">
            <span className="text-xs font-bold tracking-widest uppercase text-[#991B1B] bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full inline-block">
              THE ZERO-HALLUCINATION CONTRACT
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1E293B] tracking-tight leading-[1.1] font-sans">
              From raw proof to published site. <br />
              <span className="font-extrabold text-[#991B1B]">
                Without a single fabricated claim.
              </span>
            </h2>
            <p className="text-base text-slate-600 font-normal leading-relaxed">
              Recruiters and high-value clients discard portfolios with generic AI buzzwords. FolioVeda enforces strict factual truth: our intake pipeline parses your real PDF resumes and GitHub repositories, drafting crisp case studies where you review and approve every metric.
            </p>

            <div className="space-y-3 pt-2 text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#991B1B]" />
                <span>Smart 4-step intake wizard completed in under 2 minutes</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#991B1B]" />
                <span>Automated GitHub webhook sync for ongoing project updates</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#991B1B]" />
                <span>Zero buzzwords, zero fake titles, and zero exaggerated metrics</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#991B1B] hover:text-[#7F1D1D] group"
              >
                <span>Try the 2-Minute Intake Flow</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
            <span className="text-xs font-bold tracking-widest uppercase text-[#991B1B] bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full inline-block">
              INSPIRATION SYNTHESIS
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1E293B] tracking-tight leading-[1.1] font-sans">
              Love a website you saw? <br />
              <span className="font-extrabold text-[#991B1B]">
                Extract its aesthetic DNA legally.
              </span>
            </h2>
            <p className="text-base text-slate-600 font-normal leading-relaxed">
              Paste any public portfolio or design site URL you admire. Our SSRF-isolated Inspiration Engine analyzes high-level design tokens (color harmonies, spatial scale, typography categories) and synthesizes an original, 100% copyright-compliant theme using open-source fonts.
            </p>

            <div className="space-y-3 pt-2 text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#991B1B]" />
                <span>Zero copied code, zero asset scraping, and zero trademark infringement</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#991B1B]" />
                <span>3-tier Closeness slider: Loose, Medium, or Close inspiration match</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#991B1B]" />
                <span>Mathematical similarity guard ensuring all creations stay original</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/inspiration"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#991B1B] hover:text-[#7F1D1D] group"
              >
                <span>Launch Inspiration Cloner</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right: Colorful Extraction Visual Card */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-xs font-mono font-bold text-slate-400">INSPIRATION_ANALYZER</span>
              <span className="text-xs bg-red-50 text-[#991B1B] border border-red-200 px-2.5 py-0.5 rounded-full font-bold">
                SSRF Sandboxed
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs flex items-center justify-between shadow-2xs">
                <span className="text-slate-700 font-bold truncate">https://pattin.design</span>
                <span className="text-emerald-700 font-bold text-[11px] shrink-0">Analyzed ✓</span>
              </div>

              <div className="p-4 rounded-xl bg-[#F8F9FA] border border-slate-200 space-y-3 text-xs">
                <div className="flex justify-between items-center text-slate-700">
                  <span className="font-semibold">Detected Layout</span>
                  <span className="text-slate-600 font-mono">Split Hero (45/55)</span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span className="font-semibold">Typography Pair</span>
                  <span className="text-slate-600 font-mono">Bold Sans + Editorial Accent</span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span className="font-semibold">Synthesized Font</span>
                  <span className="text-[#991B1B] font-bold">Plus Jakarta Sans Bold</span>
                </div>
                <div className="flex justify-between items-center text-slate-700 pt-2 border-t border-slate-200">
                  <span className="font-semibold">Closeness Setting</span>
                  <span className="text-[#1E293B] font-bold">Medium (Original Harmony)</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed font-normal">
                *FolioVeda does not download external code or copy protected designs. We map abstract mathematical aesthetic properties to open-source assets.
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          PRICING: Dignified, Transparent & Colorful
          ========================================================================= */}
      <section id="pricing" className="py-24 px-6 sm:px-10 max-w-5xl mx-auto border-t border-slate-200 scroll-mt-24">
        
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-[#991B1B] bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full inline-block">
            TRANSPARENT PRICING
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] tracking-tight mt-3 font-sans">
            Start free. <span className="font-extrabold text-[#991B1B]">Upgrade when interviewing.</span>
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-normal">
            No surprise tier limits. Export your code at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Free Tier */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-baseline">
                <h3 className="text-xl font-bold text-slate-900 font-sans">Free Forever</h3>
                <span className="text-xs uppercase font-mono font-bold text-slate-500">$0 / Month</span>
              </div>
              <p className="text-xs text-slate-500 font-normal leading-relaxed">
                Everything you need to launch a beautiful, high-converting live portfolio.
              </p>

              <div className="space-y-3 text-xs text-slate-700 pt-2 font-medium">
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#991B1B] shrink-0" />
                  <span>1 Live Portfolio on <code>folioveda.me/yourname</code></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#991B1B] shrink-0" />
                  <span>Access to all 8 core style packages</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#991B1B] shrink-0" />
                  <span>Instant SSL &amp; Global Edge CDN deployment</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#991B1B] shrink-0" />
                  <span>Unlimited text, metric &amp; project edits</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#991B1B] shrink-0" />
                  <span>GitHub &amp; PDF resume sync</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/onboarding"
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs py-3.5 rounded-full text-center block transition"
              >
                Get Started Free
              </Link>
            </div>
          </div>

          {/* Pro Tier (Rich Deep Slate & Crimson Highlight) */}
          <div className="bg-[#1E293B] text-white rounded-3xl p-8 sm:p-10 border-2 border-[#991B1B] shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#991B1B] text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
              Most Popular
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-baseline">
                <h3 className="text-xl font-bold text-white font-sans">Pro Accelerator</h3>
                <span className="text-xs uppercase font-mono font-bold text-red-300">$9 / Month</span>
              </div>
              <p className="text-xs text-slate-300 font-normal leading-relaxed">
                For active job seekers and freelancers requiring custom domains and telemetry.
              </p>

              <div className="space-y-3 text-xs text-slate-200 pt-2 font-medium">
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#991B1B] shrink-0" />
                  <span className="font-bold text-white">Custom Domain Support (<code>yourname.com</code>, <code>.dev</code>)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#991B1B] shrink-0" />
                  <span>Unlimited Inspiration Link Cloner runs</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#991B1B] shrink-0" />
                  <span>Live Recruiter Analytics &amp; Visit Telemetry</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#991B1B] shrink-0" />
                  <span>Zero FolioVeda branding badge</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#991B1B] shrink-0" />
                  <span>Full HTML / JSON / Tailwind code export</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/onboarding?plan=pro"
                className="w-full shimmer-button bg-gradient-to-r from-[#991B1B] via-[#B91C1C] to-[#991B1B] hover:from-[#7F1D1D] hover:to-[#991B1B] text-white font-bold text-xs py-3.5 rounded-full text-center block transition shadow-lg shadow-[#991B1B]/30"
              >
                Start 14-Day Free Trial
              </Link>
            </div>
          </div>

        </div>

        <div className="mt-8 text-center text-xs text-slate-500 font-medium">
          14-day money-back guarantee • 50% discount for students with .edu or .ac emails
        </div>

      </section>


      {/* =========================================================================
          FAQ ACCORDION: Clean, Confident & Bold
          ========================================================================= */}
      <section className="py-24 px-6 sm:px-10 max-w-3xl mx-auto border-t border-slate-200">
        
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-[#991B1B] bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full inline-block">
            COMMON QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] tracking-tight mt-3 font-sans">
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
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-sm text-[#1E293B] hover:text-[#991B1B] transition-colors"
              >
                <span>{item.q}</span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 transition-transform duration-200 text-slate-400 ${
                    activeFaq === idx ? "rotate-180 text-[#991B1B]" : ""
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-5 pt-1 text-xs text-slate-600 leading-relaxed font-normal border-t border-slate-100">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </section>


      {/* =========================================================================
          CLOSING HERO CALL TO ACTION (Sophisticated Gray & Industrial Crimson)
          ========================================================================= */}
      <section className="py-24 px-6 sm:px-10 max-w-7xl mx-auto border-t border-slate-200">
        <div className="bg-gradient-to-br from-slate-100 via-slate-200/90 to-slate-100 text-[#1E293B] rounded-3xl p-12 sm:p-20 text-center relative overflow-hidden shadow-xl border border-slate-300">
          
          {/* Subtle Crimson Accent Flare */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#991B1B]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="text-xs font-bold tracking-widest uppercase text-[#991B1B] bg-red-50 border border-red-200 px-3.5 py-1 rounded-full inline-block">
              IMMEDIATE VELOCITY
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#1E293B] leading-tight font-sans">
              Your work is exceptional. <br />
              <span className="font-extrabold bg-gradient-to-r from-[#991B1B] via-[#DC2626] to-[#7F1D1D] bg-clip-text text-transparent">
                Your portfolio should be too.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl mx-auto leading-relaxed">
              Join thousands of creators, engineers, and designers who present their work with calm, award-winning authority.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/onboarding"
                className="w-full sm:w-auto shimmer-button bg-gradient-to-r from-[#991B1B] via-[#B91C1C] to-[#991B1B] hover:from-[#7F1D1D] hover:to-[#991B1B] text-white font-bold text-sm px-9 py-4 rounded-full shadow-lg shadow-[#991B1B]/30 hover:scale-105 active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>Create Your Portfolio — Free</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              Takes 120 seconds • No credit card required • Export anytime
            </p>
          </div>
        </div>
      </section>


      {/* =========================================================================
          FOOTER: Refined Gray Tone & Clean Typography
          ========================================================================= */}
      <footer className="border-t border-slate-200 bg-slate-100/80 pt-16 pb-12 px-6 sm:px-10 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-12 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <FolioVedaLogo size="sm" showText={false} />
              <span className="text-base font-bold text-[#1E293B]">FolioVeda</span>
              <span className="text-xs text-slate-500 font-medium ml-2">Award-winning portfolio architecture for creators.</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Edge Systems 100% Operational</span>
              </div>
              <Link href="/hub" className="text-[#991B1B] hover:text-[#7F1D1D] font-bold underline">
                Master Hub ↗
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-12 font-medium">
            <div>
              <h3 className="font-bold text-[#1E293B] uppercase tracking-wider text-[11px] mb-3">
                Templates
              </h3>
              <ul className="space-y-2">
                <li><Link href="/styles?theme=minimal-editorial" className="hover:text-[#991B1B] transition">Cami (Editorial)</Link></li>
                <li><Link href="/styles?theme=developer-terminal" className="hover:text-[#991B1B] transition">Kester (Terminal)</Link></li>
                <li><Link href="/styles?theme=creative-collage" className="hover:text-[#991B1B] transition">Reseda (Spatial)</Link></li>
                <li><Link href="/styles?theme=case-study-heavy" className="hover:text-[#991B1B] transition">Nolan (Product)</Link></li>
                <li><Link href="/styles" className="hover:text-[#991B1B] transition">Browse All 8 →</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-[#1E293B] uppercase tracking-wider text-[11px] mb-3">
                Platform
              </h3>
              <ul className="space-y-2">
                <li><Link href="/inspiration" className="hover:text-[#991B1B] transition">Inspiration Cloner</Link></li>
                <li><Link href="/onboarding" className="hover:text-[#991B1B] transition">Intake Flow</Link></li>
                <li><Link href="/resume" className="hover:text-[#991B1B] transition">AI Resume Tailor</Link></li>
                <li><Link href="/dashboard" className="hover:text-[#991B1B] transition">User Dashboard</Link></li>
                <li><Link href="/p/alex" className="hover:text-[#991B1B] transition">Public Recruiter Link</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-[#1E293B] uppercase tracking-wider text-[11px] mb-3">
                Security &amp; Legal
              </h3>
              <ul className="space-y-2">
                <li><Link href="/legal/terms" className="hover:text-[#991B1B] transition">Terms of Service</Link></li>
                <li><Link href="/legal/takedown" className="hover:text-[#991B1B] transition">DMCA / Takedown</Link></li>
                <li><Link href="/security" className="hover:text-[#991B1B] transition">Security Architecture</Link></li>
                <li><span className="text-slate-400">Zero Data Scraping</span></li>
                <li><span className="text-slate-400">DPDP &amp; GDPR Ready</span></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-[#1E293B] uppercase tracking-wider text-[11px] mb-3">
                Company
              </h3>
              <ul className="space-y-2">
                <li><Link href="/brand" className="hover:text-[#991B1B] transition">Brand Guidelines</Link></li>
                <li><Link href="/hub" className="hover:text-[#991B1B] transition">Developer Studio</Link></li>
                <li><a href="#pricing" className="hover:text-[#991B1B] transition">Pricing</a></li>
                <li><a href="#templates" className="hover:text-[#991B1B] transition">Gallery</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 font-medium">
            <div>
              © 2026 FolioVeda Inc. Engineered with Studio Alabaster (#F8F9FA), Deep Slate (#1E293B), and Industrial Crimson (#991B1B).
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
