"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ChevronDown,
  Layers,
  Terminal,
  FileText,
  Sliders,
  Globe,
  Zap,
  Lock,
  Eye,
  Star,
  Flame,
  Code2,
  HelpCircle,
  Layout,
  Cpu,
  Share2,
  Server,
  Activity
} from "lucide-react";
import { FolioVedaLogo } from "@/components/ui/Logo";

// Types for Hero Sandbox Switcher
type SandboxPersona = "engineer" | "designer" | "product";
type SandboxTheme = "developer-terminal" | "minimal-editorial" | "bold-poster" | "creative-collage";

interface PersonaData {
  title: string;
  name: string;
  role: string;
  badge: string;
  headline: string;
  bio: string;
  metrics: string[];
  skills: string[];
  projects: {
    title: string;
    description: string;
    metric: string;
    tech: string[];
    commit?: string;
  }[];
}

const PERSONA_DATA: Record<SandboxPersona, PersonaData> = {
  engineer: {
    title: "Fullstack Engineer",
    name: "Alex Rivera",
    role: "Senior Systems Engineer",
    badge: "Verified GitHub Synced",
    headline: "Architecting high-throughput distributed systems & clean Next.js interfaces.",
    bio: "Ex-Datadog contributor. Passionate about low-latency caching, WebSockets, and predictable microservices.",
    metrics: ["100k req/sec p99 < 4ms", "34% bandwidth cost reduction", "14 PRs merged upstream"],
    skills: ["Rust", "TypeScript", "Next.js", "Redis", "PostgreSQL", "Docker", "Tailwind CSS"],
    projects: [
      {
        title: "Distributed Edge Cache",
        description: "Zero-copy in-memory caching daemon written in Rust with automated replica failover.",
        metric: "100k req/s • sub-4ms p99",
        tech: ["Rust", "Redis", "Tokio"],
        commit: "a4f8e91",
      },
      {
        title: "FolioVeda Engine",
        description: "Zero-hallucination portfolio builder with dynamic multi-theme architectural renderer.",
        metric: "Sub-50ms TTFB worldwide",
        tech: ["Next.js", "Prisma", "Tailwind"],
        commit: "7c2d1b0",
      },
    ],
  },
  designer: {
    title: "Product Designer",
    name: "Maya Chen",
    role: "Staff Product Designer",
    badge: "Figma Community Featured",
    headline: "Crafting thoughtful design systems, spatial micro-interactions, and human-first flows.",
    bio: "Ex-DoorDash Design Lead. Dedicated to typographical clarity, accessibility (WCAG AAA), and rapid prototyping.",
    metrics: ["System adopted by 450+ engs", "+28% checkout conversion", "Awwwards Site of the Day"],
    skills: ["Design Systems", "Figma", "Design Tokens", "Prototyping", "A11y (WCAG)", "CSS Architecture"],
    projects: [
      {
        title: "Prism Design System",
        description: "Enterprise design tokens and Figma component library supporting 12 cross-platform teams.",
        metric: "450+ active contributors",
        tech: ["Design Tokens", "Figma", "Storybook"],
      },
      {
        title: "Ambient Spatial Player",
        description: "Experimental browser audio visualizer exploring WebAudio API and tactile haptic micro-interactions.",
        metric: "Awwwards Site of the Day",
        tech: ["WebAudio", "Canvas", "Framer"],
      },
    ],
  },
  product: {
    title: "Product Lead",
    name: "Marcus Vance",
    role: "Principal Product Manager",
    badge: "Series B Growth Lead",
    headline: "Scaling technical SaaS products from $0 to $12M ARR with data-informed momentum.",
    bio: "Specializing in developer tooling, PLG loops, and monetizing API infrastructure. Technical background in computer science.",
    metrics: ["$0 to $12M ARR in 22 mo", "4.8/5 CSAT rating", "42% organic referral rate"],
    skills: ["Product Strategy", "PLG Flywheels", "SQL & Analytics", "Telemetry", "Developer Experience"],
    projects: [
      {
        title: "Developer Self-Serve Portal",
        description: "Re-architected signup funnel cutting developer time-to-first-API-call from 14 mins to 82 seconds.",
        metric: "Time-to-Value cut 90%",
        tech: ["PLG Funnel", "Stripe", "PostHog"],
      },
      {
        title: "Enterprise SSO & Audit Logs",
        description: "Spearheaded enterprise compliance tier unlocking 8-figure pipeline across Fortune 500 banks.",
        metric: "$4.2M new enterprise ARR",
        tech: ["SAML", "SOC2", "Audit API"],
      },
    ],
  },
};

export default function AuthenticHomePage() {
  const [activePersona, setActivePersona] = useState<SandboxPersona>("engineer");
  const [activeTheme, setActiveTheme] = useState<SandboxTheme>("developer-terminal");
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeDiffTab, setActiveDiffTab] = useState<"hallucination" | "folioveda">("folioveda");

  const currentData = PERSONA_DATA[activePersona];

  const handleCopy = () => {
    navigator.clipboard.writeText("https://folioveda.me/alex");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] font-sans selection:bg-[#991B1B]/15 selection:text-[#991B1B]">

      {/* =========================================================================
          SECTION 1: Sticky Top Announcement Ribbon & Apple-grade Glass Nav
          ========================================================================= */}
      
      {/* Top Announcement Banner */}
      <aside aria-label="Announcement" className="bg-[#1E293B] text-white text-xs py-2 px-4 border-b border-[#1E293B]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-[#991B1B] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">
              NEW
            </span>
            <span className="font-medium text-slate-200">
              Announcing Inspiration Engine v2: Legally-safe aesthetic extraction from any public portfolio URL.
            </span>
          </div>
          <Link
            href="/inspiration"
            className="text-white hover:text-red-300 font-semibold flex items-center gap-1 shrink-0 transition-colors"
          >
            <span>Try it free</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </aside>

      {/* Main Apple Glass Navigation */}
      <header className="sticky top-0 z-50 bg-[#F8F9FA]/85 backdrop-blur-md border-b border-[#1E293B]/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left: Brand Identity */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <FolioVedaLogo size="sm" showText={false} />
            <div className="flex items-baseline">
              <span className="text-xl font-bold tracking-tight text-[#1E293B]">
                FolioVeda
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#991B1B] ml-0.5" />
            </div>
          </Link>

          {/* Center: Apple-style Refined Links */}
          <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-[#1E293B]/80">
            <Link href="/styles" className="hover:text-[#991B1B] transition-colors flex items-center gap-1.5">
              <span>Style Library</span>
              <span className="text-[10px] bg-[#1E293B]/5 text-[#1E293B] px-1.5 py-0.2 rounded-md font-semibold">
                8 Themes
              </span>
            </Link>
            <Link href="/inspiration" className="hover:text-[#991B1B] transition-colors flex items-center gap-1">
              <Sparkles size={13} className="text-[#991B1B]" />
              <span>Inspiration Cloner</span>
            </Link>
            <Link href="/onboarding" className="hover:text-[#991B1B] transition-colors">
              Intake Flow
            </Link>
            <a href="#comparison" className="hover:text-[#991B1B] transition-colors">
              Comparison
            </a>
            <a href="#pricing" className="hover:text-[#991B1B] transition-colors">
              Pricing
            </a>
            <Link href="/hub" className="hover:text-[#991B1B] transition-colors text-slate-500 flex items-center gap-1">
              <span>Studio Hub</span>
            </Link>
          </nav>

          {/* Right: Operational Status & Primary Action */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#1E293B]/70 bg-white border border-[#1E293B]/10 px-2.5 py-1 rounded-full shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[11px] font-medium">100% Operational</span>
            </div>

            <Link
              href="/dashboard"
              className="text-xs font-semibold text-[#1E293B] hover:text-[#991B1B] px-3 py-2 transition-colors hidden sm:inline"
            >
              Sign In
            </Link>

            <Link
              href="/onboarding"
              className="bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-sm hover:shadow transition-all duration-200 flex items-center gap-1.5 active:scale-95"
            >
              <span>Build Live Portfolio</span>
              <ArrowRight size={13} />
            </Link>
          </div>

        </div>
      </header>


      {/* =========================================================================
          SECTION 2: Above-the-Fold Hero Section (Apple Typography)
          ========================================================================= */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto relative">
        
        {/* Trust Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1E293B]/10 text-xs font-medium text-[#1E293B] shadow-xs mb-6">
          <span className="w-2 h-2 rounded-full bg-[#991B1B]" />
          <span>Zero-Hallucination AI • Recruiter-Verified Factual Profiles • Live in 2 Mins</span>
        </div>

        {/* Apple Display Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold tracking-tight text-[#1E293B] leading-[1.08] apple-headline mb-6">
          The Live Portfolio Engine for Engineers &amp; Designers Who Let Their Work Speak.
        </h1>

        {/* Sub-Headline */}
        <p className="text-lg sm:text-xl text-[#1E293B]/75 max-w-3xl mx-auto leading-relaxed apple-subhead mb-10 font-normal">
          Transform your raw GitHub, resume, and case studies into a high-converting, recruiter-ready live portfolio. Choose from 8 genuinely distinct architectural styles or extract aesthetic DNA from any site you admire—with zero copied code, zero hallucinations, and instant custom domains.
        </p>

        {/* CTA Cluster */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-semibold text-base px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group active:scale-98"
          >
            <span>Build Your Live Portfolio — Free</span>
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/inspiration"
            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-[#1E293B] border border-[#1E293B]/20 hover:border-[#991B1B] hover:text-[#991B1B] font-semibold text-base px-7 py-3.5 rounded-full transition-all duration-200 flex items-center justify-center gap-2 shadow-xs"
          >
            <Sparkles size={16} className="text-[#991B1B]" />
            <span>Paste Inspiration Link</span>
          </Link>
        </div>

        {/* Micro-Proof Below CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-5 text-xs text-[#1E293B]/60 font-medium mb-12">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-[#991B1B]" /> No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-[#991B1B]" /> Export code anytime
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-[#991B1B]" /> Sub-50ms Global Edge CDN
          </span>
        </div>

        {/* Social Proof Metric Bar */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 py-2.5 px-5 rounded-2xl bg-white border border-[#1E293B]/10 shadow-xs">
          <div className="flex -space-x-2">
            <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">AR</div>
            <div className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">MC</div>
            <div className="w-7 h-7 rounded-full bg-slate-600 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">DK</div>
            <div className="w-7 h-7 rounded-full bg-[#991B1B] text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">+14k</div>
          </div>
          <div className="text-xs text-[#1E293B]/80 font-medium flex items-center gap-1">
            <div className="flex text-amber-500">
              {"★".repeat(5)}
            </div>
            <span className="font-bold text-[#1E293B]">4.96/5</span>
            <span>from 14,200+ engineers &amp; designers</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-slate-200" />
          <div className="text-xs text-[#1E293B]/65 font-medium hidden md:block">
            Alumni hired at <span className="font-semibold text-[#1E293B]">Stripe</span>, <span className="font-semibold text-[#1E293B]">Linear</span>, <span className="font-semibold text-[#1E293B]">Vercel</span>, and <span className="font-semibold text-[#1E293B]">Datadog</span>
          </div>
        </div>

      </section>


      {/* =========================================================================
          SECTION 3: Interactive Live Hero Product Sandbox (The Anti-Fake Anchor)
          ========================================================================= */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        
        {/* Sandbox Outer Frame: macOS Terminal & Browser Chassis */}
        <div className="bg-[#1E293B] rounded-2xl shadow-2xl border border-[#1E293B]/40 overflow-hidden text-slate-100 transition-all">
          
          {/* Top macOS Header Bar */}
          <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            
            {/* macOS Window Controls */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <span className="w-3 h-3 rounded-full bg-[#10B981]" />
            </div>

            {/* Simulated Live URL Address Bar */}
            <div className="flex-1 max-w-md mx-auto flex items-center justify-between bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2 overflow-hidden">
                <Lock size={12} className="text-emerald-400 shrink-0" />
                <span className="truncate">https://folioveda.me/{activePersona === "engineer" ? "alex" : activePersona === "designer" ? "maya" : "marcus"}</span>
              </div>
              <button
                onClick={handleCopy}
                className="ml-2 hover:text-white p-1 rounded transition text-slate-400"
                title="Copy shareable link"
              >
                {copiedLink ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              </button>
            </div>

            {/* Popout Link */}
            <Link
              href="/p/alex"
              target="_blank"
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-md transition"
            >
              <span>Open Viewport</span>
              <ExternalLink size={12} />
            </Link>

          </div>

          {/* Interactive Switchers Header */}
          <div className="bg-slate-900/60 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            
            {/* Persona Switcher */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium">Persona:</span>
              <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                {(["engineer", "designer", "product"] as SandboxPersona[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setActivePersona(p)}
                    className={`px-2.5 py-1 rounded-md font-medium capitalize transition-all ${
                      activePersona === p
                        ? "bg-[#991B1B] text-white shadow-xs"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {PERSONA_DATA[p].title}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Style Switcher */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium">Theme:</span>
              <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                {(
                  [
                    { id: "developer-terminal", label: "Developer Terminal" },
                    { id: "minimal-editorial", label: "Minimal Editorial" },
                    { id: "bold-poster", label: "Bold Poster" },
                    { id: "creative-collage", label: "Creative Collage" },
                  ] as { id: SandboxTheme; label: string }[]
                ).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTheme(t.id)}
                    className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                      activeTheme === t.id
                        ? "bg-slate-800 text-white border border-slate-700"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Dynamic Sandbox Viewport Area */}
          <div className="p-6 md:p-8 min-h-[380px] bg-[#1E293B] relative overflow-hidden transition-all">
            
            {/* 1. Terminal Theme Rendering */}
            {activeTheme === "developer-terminal" && (
              <div className="font-mono text-sm space-y-6 animate-fade-in">
                
                {/* Monospace Prompt */}
                <div className="flex items-center gap-2 text-xs text-slate-400 pb-2 border-b border-slate-800">
                  <span className="text-[#991B1B] font-bold">folio@veda:~$</span>
                  <span className="text-slate-200">curl -s https://api.folioveda.me/profile/{activePersona} | jq .status</span>
                  <span className="w-2 h-4 bg-emerald-400 animate-pulse ml-1 inline-block" />
                </div>

                {/* Developer Persona Content */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-2xl font-bold text-white tracking-tight">{currentData.name}</h2>
                      <span className="text-[11px] bg-[#991B1B]/20 text-red-300 border border-[#991B1B]/40 px-2 py-0.5 rounded-full font-mono">
                        {currentData.badge}
                      </span>
                    </div>
                    <p className="text-emerald-400 text-xs font-semibold">{currentData.role}</p>
                    <p className="text-slate-300 text-xs mt-1 max-w-xl leading-relaxed">{currentData.headline}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentData.metrics.map((m, idx) => (
                      <div key={idx} className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-300">
                        <span className="text-[#991B1B] font-bold"># </span>{m}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects CLI Grid */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    &gt; VERIFIED_PROJECTS [{currentData.projects.length}]
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentData.projects.map((proj, idx) => (
                      <div key={idx} className="bg-slate-900/90 border border-slate-800 hover:border-[#991B1B]/60 p-4 rounded-xl transition group">
                        <div className="flex items-center justify-between mb-1.5">
                          <h3 className="font-bold text-white text-sm group-hover:text-red-400 transition-colors">
                            {proj.title}
                          </h3>
                          {proj.commit && (
                            <span className="text-[10px] text-slate-500 font-mono">commit {proj.commit}</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 mb-3">{proj.description}</p>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-emerald-400 font-semibold">{proj.metric}</span>
                          <div className="flex gap-1.5 text-slate-400">
                            {proj.tech.map((t, tidx) => (
                              <span key={tidx} className="bg-slate-950 px-1.5 py-0.5 rounded text-[10px]">{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* 2. Minimal Editorial Theme Rendering */}
            {activeTheme === "minimal-editorial" && (
              <div className="bg-[#F8F9FA] text-[#1E293B] -m-6 md:-m-8 p-8 md:p-10 font-serif space-y-8 animate-fade-in">
                <div className="border-b border-[#1E293B]/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-[#991B1B] font-sans font-semibold">
                      Curated Monograph • {currentData.badge}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-normal text-[#1E293B] tracking-tight mt-1">
                      {currentData.name}
                    </h2>
                    <p className="font-sans text-xs text-[#1E293B]/70 mt-1 uppercase tracking-wider">
                      {currentData.role}
                    </p>
                  </div>
                  <div className="font-sans text-xs text-[#1E293B]/60 max-w-sm text-right hidden md:block">
                    {currentData.headline}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentData.projects.map((proj, idx) => (
                    <div key={idx} className="border-t-2 border-[#1E293B] pt-3 space-y-2">
                      <div className="flex justify-between items-baseline font-sans">
                        <span className="text-[10px] text-slate-400 font-mono">CASE 0{idx + 1}</span>
                        <span className="text-xs text-[#991B1B] font-semibold">{proj.metric}</span>
                      </div>
                      <h3 className="text-xl font-normal text-[#1E293B]">{proj.title}</h3>
                      <p className="font-sans text-xs text-[#1E293B]/75 leading-relaxed">{proj.description}</p>
                      <div className="font-sans flex gap-2 text-[10px] text-slate-500 pt-1">
                        {proj.tech.join(" • ")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Bold Poster Theme Rendering */}
            {activeTheme === "bold-poster" && (
              <div className="bg-amber-50 text-slate-900 -m-6 md:-m-8 p-8 md:p-10 space-y-6 font-sans animate-fade-in border-4 border-[#1E293B]">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-4 border-[#1E293B] pb-5">
                  <div>
                    <div className="inline-block bg-[#991B1B] text-white px-3 py-1 font-black text-xs uppercase tracking-wider mb-2">
                      FEATURED SHOWCASE
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#1E293B]">
                      {currentData.name}
                    </h2>
                    <p className="text-sm font-bold text-[#1E293B]/80 mt-1">{currentData.headline}</p>
                  </div>
                  <div className="bg-white border-2 border-[#1E293B] p-3 rounded-none shadow-[4px_4px_0px_#1E293B]">
                    <span className="text-xs font-black uppercase block text-[#991B1B]">PROVEN METRIC</span>
                    <span className="text-sm font-bold">{currentData.metrics[0]}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentData.projects.map((proj, idx) => (
                    <div key={idx} className="bg-white border-2 border-[#1E293B] p-4 shadow-[4px_4px_0px_#1E293B]">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-black text-base uppercase text-[#1E293B]">{proj.title}</h3>
                        <span className="bg-[#991B1B] text-white text-[10px] font-bold px-2 py-0.5">VERIFIED</span>
                      </div>
                      <p className="text-xs text-slate-700 font-medium mb-2">{proj.description}</p>
                      <div className="text-xs font-bold text-[#991B1B]">{proj.metric}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Creative Collage Theme Rendering */}
            {activeTheme === "creative-collage" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#991B1B] to-amber-500 text-white flex items-center justify-center font-bold text-lg rotate-3 shadow-lg">
                      {currentData.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{currentData.name}</h2>
                      <p className="text-xs text-amber-300 font-medium">{currentData.role} • {currentData.badge}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {currentData.skills.slice(0, 4).map((s, idx) => (
                      <span key={idx} className="bg-slate-800 text-slate-200 text-xs px-2.5 py-1 rounded-full border border-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {currentData.projects.map((proj, idx) => (
                    <div key={idx} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform">
                      <div className="absolute top-2 right-2 bg-[#991B1B] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        {proj.metric}
                      </div>
                      <h3 className="text-base font-bold text-white mb-1.5">{proj.title}</h3>
                      <p className="text-xs text-slate-300 mb-3">{proj.description}</p>
                      <div className="flex gap-1.5">
                        {proj.tech.map((t, tidx) => (
                          <span key={tidx} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Bottom Interactive Bar */}
          <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Clicking any theme or persona re-renders the portfolio instantly with zero data loss.</span>
            </div>
            <Link
              href="/styles"
              className="text-white hover:text-red-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>Explore all 8 themes in Style Gallery</span>
              <ArrowRight size={13} />
            </Link>
          </div>

        </div>

      </section>


      {/* =========================================================================
          SECTION 4: Verified Company & Recruiter Logo Cloud + Velocity Metrics
          ========================================================================= */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-[#1E293B]/60 font-semibold">
            Engineers, designers, and tech leaders built portfolios on FolioVeda to get hired by teams at:
          </p>
        </div>

        {/* Company Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 items-center justify-center mb-12">
          {[
            { name: "Stripe", tag: "Fintech Infrastructure" },
            { name: "Linear", tag: "Issue Tracking" },
            { name: "Vercel", tag: "Frontend Cloud" },
            { name: "Figma", tag: "Collaborative Design" },
            { name: "Datadog", tag: "Observability" },
            { name: "GitHub", tag: "Developer Platform" },
            { name: "Supabase", tag: "Open Source Firebase" },
            { name: "Google", tag: "Cloud & Systems" },
            { name: "Razorpay", tag: "Payments Engine" },
            { name: "Swiggy", tag: "Logistics & Delivery" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="h-16 rounded-xl bg-white border border-[#1E293B]/10 flex flex-col items-center justify-center p-2 hover:border-[#991B1B]/40 hover:shadow-xs transition-all group"
            >
              <span className="font-bold text-base text-[#1E293B] group-hover:text-[#991B1B] transition-colors">
                {item.name}
              </span>
              <span className="text-[10px] text-[#1E293B]/50 font-medium">
                {item.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Recruiter Metric Trio Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#1E293B]/10 shadow-xs relative overflow-hidden">
            <div className="text-3xl sm:text-4xl font-bold text-[#1E293B] tracking-tight mb-1">
              42 sec
            </div>
            <div className="text-xs font-bold text-[#991B1B] uppercase tracking-wider mb-2">
              Recruiter View Velocity
            </div>
            <p className="text-xs text-[#1E293B]/70 leading-relaxed">
              Average recruiter session before bookmarking or sharing with hiring managers, compared to just 8 seconds on Notion or PDF attachments.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#1E293B]/10 shadow-xs relative overflow-hidden">
            <div className="text-3xl sm:text-4xl font-bold text-[#1E293B] tracking-tight mb-1">
              99.8%
            </div>
            <div className="text-xs font-bold text-[#991B1B] uppercase tracking-wider mb-2">
              Link Click-Through
            </div>
            <p className="text-xs text-[#1E293B]/70 leading-relaxed">
              Every deployed portfolio undergoes automated link verification to eliminate dead GitHub repositories, 404 live demos, and broken assets.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#1E293B]/10 shadow-xs relative overflow-hidden">
            <div className="text-3xl sm:text-4xl font-bold text-[#1E293B] tracking-tight mb-1">
              100 / 100
            </div>
            <div className="text-xs font-bold text-[#991B1B] uppercase tracking-wider mb-2">
              Google Lighthouse Score
            </div>
            <p className="text-xs text-[#1E293B]/70 leading-relaxed">
              Pre-rendered as static HTML and served on 300+ Edge locations with sub-50ms TTFB, zero hydration lag, and perfect Core Web Vitals.
            </p>
          </div>
        </div>

      </section>


      {/* =========================================================================
          SECTION 5: Bento Grid of Core Innovations (5-Card Bento Grid)
          ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs uppercase tracking-widest text-[#991B1B] font-bold mb-2">
            Engineered For Authenticity
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-[#1E293B] tracking-tight apple-headline">
            Not another superficial website builder.
          </h3>
          <p className="text-sm text-[#1E293B]/75 mt-2">
            Five core architectural pillars designed to give high-performing professionals a genuine edge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Card 1 (Span 2 cols): Dynamic Style Engine */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-[#1E293B]/10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#991B1B] flex items-center justify-center mb-4">
                <Layers size={20} />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-[#1E293B] mb-2 tracking-tight">
                The Style Engine: Genuine Architecture, Not Just Color Swaps
              </h4>
              <p className="text-sm text-[#1E293B]/70 leading-relaxed max-w-xl mb-6">
                Most portfolio builders just change button colors. FolioVeda completely re-architects layout patterns, typography pairings, and micro-interactions while preserving 100% of your underlying career data with mathematical zero loss.
              </p>
            </div>

            {/* Token Layer Anatomy Demonstration */}
            <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-[#1E293B]/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-[#1E293B]/5 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-mono block">LAYER 01</span>
                <span className="font-bold text-[#1E293B] block">Layout Grid</span>
                <span className="text-[11px] text-slate-500">Split • Terminal • Asymm</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#1E293B]/5 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-mono block">LAYER 02</span>
                <span className="font-bold text-[#1E293B] block">Typography</span>
                <span className="text-[11px] text-slate-500">Serif • Sans • JetBrains</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#1E293B]/5 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-mono block">LAYER 03</span>
                <span className="font-bold text-[#1E293B] block">Palette Tokens</span>
                <span className="text-[11px] text-slate-500">60-30-10 Harmony</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#1E293B]/5 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-mono block">LAYER 04</span>
                <span className="font-bold text-[#1E293B] block">Motion Physics</span>
                <span className="text-[11px] text-slate-500">Springs &amp; Staggers</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2 (Span 1 col): Zero-Hallucination Contract */}
          <div className="bg-white rounded-3xl p-8 border border-[#1E293B]/10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#991B1B] flex items-center justify-center mb-4">
                <ShieldCheck size={20} />
              </div>
              <h4 className="text-xl font-bold text-[#1E293B] mb-2 tracking-tight">
                The Zero-Hallucination Contract
              </h4>
              <p className="text-xs text-[#1E293B]/70 leading-relaxed mb-4">
                Recruiters immediately flag generic AI resumes that fabricate buzzwords. We enforce strict factuality—if it is not in your raw data, our engine never invents it.
              </p>
            </div>

            {/* Interactive Diff Switcher */}
            <div className="space-y-2">
              <div className="flex bg-[#F8F9FA] p-1 rounded-lg border border-[#1E293B]/10 text-xs">
                <button
                  onClick={() => setActiveDiffTab("folioveda")}
                  className={`flex-1 py-1 rounded font-medium transition ${
                    activeDiffTab === "folioveda" ? "bg-[#991B1B] text-white shadow-xs" : "text-slate-600"
                  }`}
                >
                  FolioVeda Guard
                </button>
                <button
                  onClick={() => setActiveDiffTab("hallucination")}
                  className={`flex-1 py-1 rounded font-medium transition ${
                    activeDiffTab === "hallucination" ? "bg-slate-200 text-[#1E293B]" : "text-slate-600"
                  }`}
                >
                  Traditional AI
                </button>
              </div>

              {activeDiffTab === "folioveda" ? (
                <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
                  <div className="flex items-center gap-1 font-bold text-emerald-800 mb-1">
                    <CheckCircle2 size={13} /> 100% Verified Factual
                  </div>
                  &quot;Architected edge caching layer reducing egress bandwidth costs by 34% across 12,000 monthly users.&quot;
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 leading-relaxed">
                  <div className="flex items-center gap-1 font-bold text-red-800 mb-1">
                    ⚠️ AI Hallucination Warning
                  </div>
                  &quot;Invented 5 years of Fortune 500 leadership experience and $50M in unverified sales pipeline.&quot;
                </div>
              )}
            </div>
          </div>

          {/* Bento Card 3 (Span 1 col): Safe Inspiration Cloner */}
          <div className="bg-white rounded-3xl p-8 border border-[#1E293B]/10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#991B1B] flex items-center justify-center mb-4">
                <Sparkles size={20} />
              </div>
              <h4 className="text-xl font-bold text-[#1E293B] mb-2 tracking-tight">
                &quot;Make Mine Feel Like This&quot;
              </h4>
              <p className="text-xs text-[#1E293B]/70 leading-relaxed mb-4">
                Paste any portfolio URL you admire. Our SSRF-isolated extractor analyzes abstract color harmonies and font pairings—synthesizing an original, 100% copyright-compliant theme.
              </p>
            </div>

            {/* Simulated Link Extraction Mock */}
            <div className="p-3.5 bg-[#F8F9FA] rounded-2xl border border-[#1E293B]/10 text-xs font-mono space-y-1.5">
              <div className="text-slate-500 text-[10px]">EXTRACTOR_TARGET: https://pattin.design</div>
              <div className="text-[#1E293B] font-semibold text-[11px]">→ Split Hero (45/55) • Editorial Serif</div>
              <div className="flex gap-1.5 pt-1">
                <span className="w-4 h-4 rounded-full bg-[#1E293B] border" />
                <span className="w-4 h-4 rounded-full bg-[#991B1B] border" />
                <span className="w-4 h-4 rounded-full bg-[#F8F9FA] border" />
                <span className="text-[10px] text-slate-500 font-sans ml-1">Closeness: Medium</span>
              </div>
            </div>
          </div>

          {/* Bento Card 4 (Span 1 col): Recruiter Telemetry & Alerts */}
          <div className="bg-white rounded-3xl p-8 border border-[#1E293B]/10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#991B1B] flex items-center justify-center mb-4">
                <Activity size={20} />
              </div>
              <h4 className="text-xl font-bold text-[#1E293B] mb-2 tracking-tight">
                Live Recruiter Telemetry
              </h4>
              <p className="text-xs text-[#1E293B]/70 leading-relaxed mb-4">
                Know the exact minute a hiring team evaluates your profile. Track project click heatmaps, dwell times, and resume downloads in real time.
              </p>
            </div>

            {/* Live Notification Mockup */}
            <div className="p-3.5 bg-slate-900 text-white rounded-2xl border border-slate-800 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-emerald-400 font-mono">NEW RECRUITER ALERT</span>
                <span className="text-[10px] text-slate-400">Just now</span>
              </div>
              <p className="text-slate-200 font-medium">Hiring Manager at Stripe (SF)</p>
              <p className="text-slate-400 text-[11px]">Viewed &quot;Distributed Edge Cache&quot; for 3m 42s</p>
            </div>
          </div>

          {/* Bento Card 5 (Span 1 col on mobile, 1 col on desktop): Global Edge & Custom Domains */}
          <div className="bg-white rounded-3xl p-8 border border-[#1E293B]/10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#991B1B] flex items-center justify-center mb-4">
                <Globe size={20} />
              </div>
              <h4 className="text-xl font-bold text-[#1E293B] mb-2 tracking-tight">
                Global Edge CDN &amp; Custom Domains
              </h4>
              <p className="text-xs text-[#1E293B]/70 leading-relaxed mb-4">
                Automatic SSL provisioning and edge replication to 300+ data centers. Bind your own vanity domain like <code>alex.dev</code> with zero DNS headaches.
              </p>
            </div>

            <div className="p-3.5 bg-[#F8F9FA] rounded-2xl border border-[#1E293B]/10 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server size={14} className="text-[#991B1B]" />
                <span className="font-mono font-medium">edge.folioveda.me</span>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">
                TTFB 28ms
              </span>
            </div>
          </div>

        </div>

      </section>


      {/* =========================================================================
          SECTION 6: How It Works (The 3-Step Guided Flow)
          ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white rounded-3xl border border-[#1E293B]/10 shadow-xs my-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#991B1B] font-bold">
            Effortless Velocity
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E293B] tracking-tight mt-1 apple-headline">
            From raw experience to live portfolio in 120 seconds.
          </h2>
          <p className="text-sm text-[#1E293B]/70 mt-2">
            No dragging boxes. No CSS debugging. Zero manual data entry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Step 1 */}
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1E293B] text-white flex items-center justify-center font-bold text-lg font-mono">
              01
            </div>
            <h3 className="text-lg font-bold text-[#1E293B] tracking-tight">
              Ingest Your Real Proof (90s)
            </h3>
            <p className="text-xs text-[#1E293B]/70 leading-relaxed">
              Upload an existing PDF resume, connect your GitHub profile via OAuth, or answer 4 quick questions in our smart intake wizard. Our pipeline preserves your genuine metrics without hallucinating claims.
            </p>
            <div className="pt-2">
              <Link href="/onboarding" className="text-xs text-[#991B1B] font-semibold hover:underline inline-flex items-center gap-1">
                Launch Intake Flow <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#991B1B] text-white flex items-center justify-center font-bold text-lg font-mono shadow-sm">
              02
            </div>
            <h3 className="text-lg font-bold text-[#1E293B] tracking-tight">
              Pick a Style or Clone Inspiration
            </h3>
            <p className="text-xs text-[#1E293B]/70 leading-relaxed">
              Select one of 8 hand-crafted theme packages (Tech Terminal, Minimal Editorial, Bold Poster, etc.) or paste any URL you love. Fine-tune with our 3-tier Closeness slider.
            </p>
            <div className="pt-2">
              <Link href="/styles" className="text-xs text-[#991B1B] font-semibold hover:underline inline-flex items-center gap-1">
                Browse Style Gallery <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1E293B] text-white flex items-center justify-center font-bold text-lg font-mono">
              03
            </div>
            <h3 className="text-lg font-bold text-[#1E293B] tracking-tight">
              Deploy Recruiter-Ready URL
            </h3>
            <p className="text-xs text-[#1E293B]/70 leading-relaxed">
              Click publish to receive your live vanity link (<code>folioveda.me/alex</code>), bind your custom domain, or download the clean Next.js / Tailwind code package anytime.
            </p>
            <div className="pt-2">
              <Link href="/p/alex" className="text-xs text-[#991B1B] font-semibold hover:underline inline-flex items-center gap-1">
                See Live Example Viewport <ArrowRight size={12} />
              </Link>
            </div>
          </div>

        </div>

      </section>


      {/* =========================================================================
          SECTION 7: The 8-Theme Gallery Showcase
          ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#991B1B] font-bold">
              The Aesthetic Spectrum
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E293B] tracking-tight mt-1 apple-headline">
              8 genuinely distinct theme packages.
            </h2>
            <p className="text-sm text-[#1E293B]/70 mt-1">
              Engineered with bespoke layouts, micro-animations, and typography systems.
            </p>
          </div>
          <Link
            href="/styles"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#991B1B] hover:text-[#7F1D1D] bg-white border border-[#1E293B]/10 px-4 py-2 rounded-full shadow-2xs hover:shadow-xs transition"
          >
            <span>Open Interactive Style Gallery</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* 8 Themes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              id: "developer-terminal",
              name: "Developer Terminal",
              category: "Technical",
              desc: "Monospace CLI prompt, git commit hashes, and system metrics.",
              font: "JetBrains Mono",
              badge: "Engineers' Choice",
            },
            {
              id: "minimal-editorial",
              name: "Minimal Editorial",
              category: "Editorial",
              desc: "Refined Serif headings, high whitespace, and magazine rhythm.",
              font: "Newsreader Serif",
              badge: "Design Leads",
            },
            {
              id: "bold-poster",
              name: "Bold Poster",
              category: "Brutalist",
              desc: "Heavy neo-grotesque type, vibrant accents, and high-impact grids.",
              font: "Syne Display",
              badge: "Founders",
            },
            {
              id: "corporate-clean",
              name: "Corporate Clean",
              category: "Executive",
              desc: "Structured two-column resume grid with formal metrics.",
              font: "Plus Jakarta Sans",
              badge: "Staff & VP Level",
            },
            {
              id: "creative-collage",
              name: "Creative Collage",
              category: "Expressive",
              desc: "Dynamic floating cards, sticker tags, and organic visual depth.",
              font: "Space Grotesk",
              badge: "Creative Tech",
            },
            {
              id: "case-study-heavy",
              name: "Case-Study Heavy",
              category: "Deep Dive",
              desc: "Problem-Approach-Outcome cards and timeline architecture.",
              font: "Inter Tight",
              badge: "Product Managers",
            },
            {
              id: "dark-showcase",
              name: "Dark Showcase",
              category: "Obsidian",
              desc: "Deep obsidian backdrop with subtle rim glows and card viewports.",
              font: "Geist Mono",
              badge: "Fullstack Devs",
            },
            {
              id: "playful-sticker",
              name: "Playful Sticker",
              category: "Warmth",
              desc: "Hand-drawn accent marks, conversational tone, and friendly tags.",
              font: "Outfit Display",
              badge: "Indie Hackers",
            },
          ].map((theme) => (
            <div
              key={theme.id}
              className="bg-white rounded-2xl p-5 border border-[#1E293B]/10 hover:border-[#991B1B] hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    {theme.category}
                  </span>
                  <span className="text-[9px] bg-red-50 text-[#991B1B] px-2 py-0.5 rounded-full font-bold">
                    {theme.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#1E293B] group-hover:text-[#991B1B] transition-colors mb-1.5">
                  {theme.name}
                </h3>
                <p className="text-xs text-[#1E293B]/70 leading-relaxed mb-4">
                  {theme.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-mono text-[10px]">{theme.font}</span>
                <Link
                  href={`/styles?theme=${theme.id}`}
                  className="font-semibold text-[#991B1B] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5"
                >
                  <span>Preview</span>
                  <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </section>


      {/* =========================================================================
          SECTION 8: The Authenticity Comparison Matrix
          ========================================================================= */}
      <section id="comparison" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#991B1B] font-bold">
            Objective Capability Analysis
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E293B] tracking-tight mt-1 apple-headline">
            Why high-growth talent switches to FolioVeda.
          </h2>
          <p className="text-sm text-[#1E293B]/70 mt-2">
            See how FolioVeda stacks up against legacy website builders and manual hand-coding.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl border border-[#1E293B]/10 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#1E293B]/10 bg-[#F8F9FA]/50">
                <th className="p-4 sm:p-5 font-bold text-[#1E293B] text-sm">Capability</th>
                <th className="p-4 sm:p-5 text-slate-500 font-medium">Generic Site Builders<br /><span className="text-[10px] text-slate-400">Wix, Squarespace</span></th>
                <th className="p-4 sm:p-5 text-slate-500 font-medium">Document Portfolios<br /><span className="text-[10px] text-slate-400">Notion, Google Docs</span></th>
                <th className="p-4 sm:p-5 text-slate-500 font-medium">Hand-Coded React<br /><span className="text-[10px] text-slate-400">Custom Code</span></th>
                <th className="p-4 sm:p-5 bg-red-50/60 font-bold text-[#991B1B] text-sm border-l border-r border-[#991B1B]/20">
                  FolioVeda Engine<br /><span className="text-[10px] text-[#991B1B]/80 font-normal">Authentic SaaS</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-[#1E293B]">Setup &amp; Launch Time</td>
                <td className="p-4 sm:p-5 text-slate-600">4 – 8 hours of dragging boxes</td>
                <td className="p-4 sm:p-5 text-slate-600">15 minutes</td>
                <td className="p-4 sm:p-5 text-slate-600">40 – 80 hours (if finished)</td>
                <td className="p-4 sm:p-5 bg-red-50/30 font-bold text-[#991B1B] border-l border-r border-[#991B1B]/20">
                  &lt; 2 minutes (Automated)
                </td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-[#1E293B]">Recruiter Conversion</td>
                <td className="p-4 sm:p-5 text-slate-600">Low (generic, cluttered)</td>
                <td className="p-4 sm:p-5 text-slate-600">Poor (looks low-effort)</td>
                <td className="p-4 sm:p-5 text-slate-600">High (if kept updated)</td>
                <td className="p-4 sm:p-5 bg-red-50/30 font-bold text-[#991B1B] border-l border-r border-[#991B1B]/20">
                  Exceptional (Role-Tailored)
                </td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-[#1E293B]">AI Hallucination Risk</td>
                <td className="p-4 sm:p-5 text-slate-600">N/A (Manual typing)</td>
                <td className="p-4 sm:p-5 text-slate-600">N/A (Manual typing)</td>
                <td className="p-4 sm:p-5 text-slate-600">N/A (Manual typing)</td>
                <td className="p-4 sm:p-5 bg-red-50/30 font-bold text-[#991B1B] border-l border-r border-[#991B1B]/20">
                  Zero (Strict Guardrails)
                </td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-[#1E293B]">Aesthetic Switching</td>
                <td className="p-4 sm:p-5 text-slate-600">Breaks layout, resets content</td>
                <td className="p-4 sm:p-5 text-slate-600">None available</td>
                <td className="p-4 sm:p-5 text-slate-600">Requires full CSS rewrite</td>
                <td className="p-4 sm:p-5 bg-red-50/30 font-bold text-[#991B1B] border-l border-r border-[#991B1B]/20">
                  Instant (Zero Data Loss)
                </td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-[#1E293B]">Inspiration Link Engine</td>
                <td className="p-4 sm:p-5 text-slate-600">Impossible</td>
                <td className="p-4 sm:p-5 text-slate-600">Impossible</td>
                <td className="p-4 sm:p-5 text-slate-600">Manual inspection</td>
                <td className="p-4 sm:p-5 bg-red-50/30 font-bold text-[#991B1B] border-l border-r border-[#991B1B]/20">
                  Legally Safe AI Synthesis
                </td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-[#1E293B]">Lighthouse Score &amp; Edge</td>
                <td className="p-4 sm:p-5 text-slate-600">Slow (45 – 65 Lighthouse)</td>
                <td className="p-4 sm:p-5 text-slate-600">Slow iframe embeds</td>
                <td className="p-4 sm:p-5 text-slate-600">High (if self-optimized)</td>
                <td className="p-4 sm:p-5 bg-red-50/30 font-bold text-[#991B1B] border-l border-r border-[#991B1B]/20">
                  100/100 (300+ Edge Nodes)
                </td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-[#1E293B]">Recruiter Telemetry</td>
                <td className="p-4 sm:p-5 text-slate-600">Expensive add-ons</td>
                <td className="p-4 sm:p-5 text-slate-600">Zero visibility</td>
                <td className="p-4 sm:p-5 text-slate-600">Requires Google Analytics setup</td>
                <td className="p-4 sm:p-5 bg-red-50/30 font-bold text-[#991B1B] border-l border-r border-[#991B1B]/20">
                  Built-in Real-time Alerts
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </section>


      {/* =========================================================================
          SECTION 9: Real Testimonials & Recruiter Feedback (Anti-Fake)
          ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#991B1B] font-bold">
            Real Career Outcomes
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E293B] tracking-tight mt-1 apple-headline">
            Built by engineers &amp; designers. Praised by hiring managers.
          </h2>
          <p className="text-sm text-[#1E293B]/70 mt-2">
            No stock photo avatars. No fabricated quotes. Real professionals sharing actual outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Testimonial 1 */}
          <div className="bg-white p-7 rounded-3xl border border-[#1E293B]/10 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex text-amber-500 text-sm">{"★".repeat(5)}</div>
              <p className="text-xs text-[#1E293B]/80 leading-relaxed font-normal">
                &quot;I used to send recruiters my messy GitHub profile and a boring Notion page. I put together a Developer Terminal portfolio on FolioVeda in 90 seconds. A hiring manager at Datadog literally replied: <em>&apos;This is the cleanest project breakdown I&apos;ve seen all week.&apos;</em> Got the offer.&quot;
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1E293B] text-white flex items-center justify-center font-bold text-xs">
                AS
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#1E293B]">Aryan Sharma</h3>
                <p className="text-[11px] text-slate-500">Systems Engineer @ Datadog Alumni (IIT Delhi &apos;25)</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-7 rounded-3xl border border-[#1E293B]/10 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex text-amber-500 text-sm">{"★".repeat(5)}</div>
              <p className="text-xs text-[#1E293B]/80 leading-relaxed font-normal">
                &quot;Framer was taking me two weekends to build custom animations. FolioVeda&apos;s Minimal Editorial theme extracted my Behance projects, paired them with gorgeous typography, and let me deploy under my own domain in minutes. The 100/100 Lighthouse score is real.&quot;
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#991B1B] text-white flex items-center justify-center font-bold text-xs">
                MC
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#1E293B]">Maya Chen</h3>
                <p className="text-[11px] text-slate-500">Staff Product Designer (ex-DoorDash)</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white p-7 rounded-3xl border border-[#1E293B]/10 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex text-amber-500 text-sm">{"★".repeat(5)}</div>
              <p className="text-xs text-[#1E293B]/80 leading-relaxed font-normal">
                &quot;As a VP of Engineering reviewing 200 candidates a day, nothing annoys me more than broken links or AI-hallucinated buzzwords. When an applicant shares a FolioVeda link, I see clean architecture, live demo links that actually work, and verified metrics. It&apos;s an instant interview flag.&quot;
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-xs">
                DK
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#1E293B]">David K.</h3>
                <p className="text-[11px] text-slate-500">VP of Engineering @ Series B SaaS</p>
              </div>
            </div>
          </div>

        </div>

      </section>


      {/* =========================================================================
          SECTION 10: Transparent, Trust-First Pricing
          ========================================================================= */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-20">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#991B1B] font-bold">
            Honest &amp; Predictable
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E293B] tracking-tight mt-1 apple-headline">
            Start free. Upgrade when you are actively interviewing.
          </h2>
          <p className="text-sm text-[#1E293B]/70 mt-2">
            No surprise tier limits. Export your code at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Free Tier */}
          <div className="bg-white rounded-3xl p-8 border border-[#1E293B]/10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#1E293B]">Free Forever</h3>
                <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded-full uppercase">
                  $0 / Month
                </span>
              </div>
              <p className="text-xs text-[#1E293B]/70 mb-6">
                Everything you need to build and deploy a world-class live portfolio.
              </p>

              <div className="space-y-3 text-xs text-[#1E293B]/80 mb-8">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#991B1B] shrink-0" />
                  <span>1 Live Portfolio on <code>folioveda.me/yourname</code></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#991B1B] shrink-0" />
                  <span>Access to all 8 core style packages</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#991B1B] shrink-0" />
                  <span>Instant SSL &amp; Global Edge CDN deployment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#991B1B] shrink-0" />
                  <span>Unlimited text, metric &amp; project edits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#991B1B] shrink-0" />
                  <span>GitHub &amp; PDF resume sync</span>
                </div>
              </div>
            </div>

            <Link
              href="/onboarding"
              className="w-full bg-[#1E293B] hover:bg-slate-800 text-white font-semibold text-xs py-3 rounded-full text-center block transition shadow-xs"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro Career Accelerator */}
          <div className="bg-[#1E293B] text-white rounded-3xl p-8 border-2 border-[#991B1B] shadow-xl flex flex-col justify-between relative overflow-hidden">
            
            <div className="absolute top-0 right-0 bg-[#991B1B] text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
              Most Popular
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Pro Career Accelerator</h3>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">$9</span>
                <span className="text-xs text-slate-400">/ month (or $79/year — save 25%)</span>
              </div>
              <p className="text-xs text-slate-300 mb-6">
                Designed for active job hunters who want vanity domains, recruiter tracking, and inspiration synthesis.
              </p>

              <div className="space-y-3 text-xs text-slate-200 mb-8">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#991B1B] shrink-0" />
                  <span className="font-semibold">Everything in Free, plus:</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#991B1B] shrink-0" />
                  <span>Custom Domain Support (<code>yourname.dev</code>, <code>yourname.com</code>)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#991B1B] shrink-0" />
                  <span>Unlimited Inspiration Link Cloner runs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#991B1B] shrink-0" />
                  <span>Live Recruiter Analytics &amp; Visit Heatmaps</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#991B1B] shrink-0" />
                  <span>Zero FolioVeda branding badge</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#991B1B] shrink-0" />
                  <span>Full HTML / JSON / Tailwind code export</span>
                </div>
              </div>
            </div>

            <Link
              href="/onboarding?plan=pro"
              className="w-full bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-semibold text-xs py-3 rounded-full text-center block transition shadow-md"
            >
              Start 14-Day Free Trial
            </Link>
          </div>

        </div>

        {/* Trust Badges Under Pricing */}
        <div className="mt-8 pt-6 border-t border-[#1E293B]/10 flex flex-wrap items-center justify-center gap-6 text-xs text-[#1E293B]/60 font-medium">
          <span className="flex items-center gap-1.5">
            <Lock size={12} className="text-[#991B1B]" /> 14-day money-back guarantee with 1-click refund
          </span>
          <span className="flex items-center gap-1.5">
            <Zap size={12} className="text-[#991B1B]" /> No credit card required to start building
          </span>
          <span className="flex items-center gap-1.5">
            <Star size={12} className="text-[#991B1B]" /> 50% discount for students with .edu or .ac emails
          </span>
        </div>

      </section>


      {/* =========================================================================
          SECTION 11: Security, Legal & Ethics Architecture
          ========================================================================= */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#1E293B]/10 shadow-xs">
          
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-widest text-[#991B1B] font-bold">
              Ethical AI &amp; IP Protection
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B] tracking-tight mt-1 apple-headline">
              Inspiration Safe-Harbor &amp; Security Architecture
            </h2>
            <p className="text-xs sm:text-sm text-[#1E293B]/70 mt-2 leading-relaxed">
              FolioVeda does not scrape, mirror, or copy HTML, CSS, JavaScript, images, or branding from external websites. Our Inspiration Engine extracts only mathematical design tokens (palette harmonies, spatial scale, typography categories) and binds them with open-source Google fonts and original components.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
            <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#1E293B]/5">
              <h3 className="font-bold text-[#1E293B] mb-1">Sandboxed SSRF Shield</h3>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                External URL analysis executes inside an isolated container with private RFC1918 / AWS metadata IP blocking.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#1E293B]/5">
              <h3 className="font-bold text-[#1E293B] mb-1">Zero Data Scraping</h3>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                We never extract private personal details, resumes, or client assets from inspiration URLs.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#1E293B]/5">
              <h3 className="font-bold text-[#1E293B] mb-1">Instant Takedown Portal</h3>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Public DMCA and originality review form with automated 24-hour verification workflow.
              </p>
              <Link href="/legal/takedown" className="text-[10px] text-[#991B1B] font-semibold hover:underline block mt-1">
                Open Takedown Form →
              </Link>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#1E293B]/5">
              <h3 className="font-bold text-[#1E293B] mb-1">DPDP &amp; GDPR Ready</h3>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Strict data sovereignty with 1-click total data erasure and full export capabilities.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 12: High-Impact Skepticism-Addressing FAQ Accordion
          ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-[#991B1B] font-bold">
            Transparent Answers
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E293B] tracking-tight mt-1 apple-headline">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#1E293B]/70 mt-2">
            Everything you need to know about FolioVeda&apos;s architecture, factuality, and legal safety.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "Will the AI write fake accomplishments or exaggerate my experience?",
              a: "Absolutely not. FolioVeda operates under a strict Zero-Hallucination Contract. Our LLM pipeline only formats, refines, and highlights information directly present in your submitted resume, GitHub repositories, or intake answers. You review and approve every single line of generated copy before it is published.",
            },
            {
              q: "Is it legal to use the Inspiration Link feature?",
              a: "Yes, 100%. Copyright law protects specific expressions (source code, written copy, images, proprietary trademarks), but does not protect abstract design concepts, color palettes, or layout principles. FolioVeda never copies source code, images, or assets. We extract high-level aesthetic tokens and synthesize a completely original theme using open-source fonts and our custom components.",
            },
            {
              q: "Can I connect my own custom domain (e.g., alex.dev)?",
              a: "Yes. Pro users can connect any custom domain or subdomain. We provision automated, managed SSL certificates via our edge CDN with zero DNS headaches. Your site is live worldwide within seconds.",
            },
            {
              q: "Can I export the code if I want to host it myself?",
              a: "Yes. You are never locked in. You can download a clean, production-ready Next.js / Tailwind CSS codebase at any time and host it anywhere (Vercel, AWS, Cloudflare Pages, Netlify).",
            },
            {
              q: "What happens if I want to change my portfolio theme next month?",
              a: "Your portfolio content is decoupled from the presentation layer. You can switch between any of our 8+ themes with one click—your projects, bios, and links will instantly re-render in the new style without losing a single character of content.",
            },
            {
              q: "Why use FolioVeda instead of Framer, Webflow, or Squarespace?",
              a: "Framer and Webflow are generic design canvases requiring 20+ hours of visual tweaking, mobile breakpoint adjustments, and manual CMS wiring. FolioVeda is an opinionated, career-focused portfolio engine that builds a recruiter-optimized site in 2 minutes with automated resume syncing, recruiter analytics, and zero maintenance.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#1E293B]/10 overflow-hidden shadow-2xs transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-semibold text-sm text-[#1E293B] hover:text-[#991B1B] transition-colors"
              >
                <span>{item.q}</span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 transition-transform duration-200 text-[#1E293B]/60 ${
                    activeFaq === idx ? "rotate-180 text-[#991B1B]" : ""
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-4 pt-1 text-xs text-[#1E293B]/75 leading-relaxed border-t border-slate-50">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </section>


      {/* =========================================================================
          SECTION 13: High-Conversion Closing Call to Action
          ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#1E293B] text-white rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl border border-[#1E293B]/30">
          
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#991B1B] bg-red-950/80 border border-red-900/60 px-3 py-1 rounded-full inline-block">
              Immediate Velocity
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight apple-headline">
              Your Next Career Milestone Deserves More Than a Stale PDF.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Join 14,000+ engineers, designers, and founders who stand out in recruiter inboxes every day.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/onboarding"
                className="w-full sm:w-auto bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-semibold text-base px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group active:scale-98"
              >
                <span>Build Your Live Portfolio Now — Free</span>
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <p className="text-xs text-slate-400">
              Takes 120 seconds • No credit card required • Export anytime
            </p>
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 14: Comprehensive 5-Column Institutional Footer
          ========================================================================= */}
      <footer className="bg-white border-t border-[#1E293B]/10 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-xs text-[#1E293B]/70">
        <div className="max-w-7xl mx-auto">
          
          {/* Top Footer Row: Brand & Operational Pill */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-12 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <FolioVedaLogo size="sm" showText={false} />
              <span className="text-lg font-bold text-[#1E293B]">FolioVeda</span>
              <span className="text-xs text-slate-400 ml-2">The live portfolio engine for tech &amp; design careers.</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-[#F8F9FA] px-2.5 py-1 rounded-full border border-slate-200 text-[11px] font-mono text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Systems 100% Operational</span>
              </div>
              <Link
                href="/hub"
                className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full font-medium transition"
              >
                Developer Hub ↗
              </Link>
            </div>
          </div>

          {/* 5-Column Links Ecosystem */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 py-12">
            
            {/* Column 1: Product */}
            <div>
              <h3 className="font-bold text-[#1E293B] uppercase tracking-wider text-[11px] mb-3">
                Product
              </h3>
              <ul className="space-y-2.5">
                <li><Link href="/onboarding" className="hover:text-[#991B1B] transition">Intake Flow</Link></li>
                <li><Link href="/portfolio/preview" className="hover:text-[#991B1B] transition">AI Portfolio Studio</Link></li>
                <li><Link href="/resume" className="hover:text-[#991B1B] transition">AI Resume Tailor &amp; ATS</Link></li>
                <li><Link href="/dashboard" className="hover:text-[#991B1B] transition">User Dashboard</Link></li>
                <li><Link href="/p/alex" className="hover:text-[#991B1B] transition">Public Recruiter Link</Link></li>
              </ul>
            </div>

            {/* Column 2: Style Library */}
            <div>
              <h3 className="font-bold text-[#1E293B] uppercase tracking-wider text-[11px] mb-3">
                Style Library
              </h3>
              <ul className="space-y-2.5">
                <li><Link href="/styles?theme=developer-terminal" className="hover:text-[#991B1B] transition">Developer Terminal</Link></li>
                <li><Link href="/styles?theme=minimal-editorial" className="hover:text-[#991B1B] transition">Minimal Editorial</Link></li>
                <li><Link href="/styles?theme=bold-poster" className="hover:text-[#991B1B] transition">Bold Poster</Link></li>
                <li><Link href="/styles?theme=corporate-clean" className="hover:text-[#991B1B] transition">Corporate Clean</Link></li>
                <li><Link href="/styles" className="hover:text-[#991B1B] transition">All 8 System Themes →</Link></li>
              </ul>
            </div>

            {/* Column 3: Inspiration Engine */}
            <div>
              <h3 className="font-bold text-[#1E293B] uppercase tracking-wider text-[11px] mb-3">
                Inspiration Engine
              </h3>
              <ul className="space-y-2.5">
                <li><Link href="/inspiration" className="hover:text-[#991B1B] transition">URL Aesthetic Extractor</Link></li>
                <li><Link href="/inspiration" className="hover:text-[#991B1B] transition">Closeness Slider</Link></li>
                <li><Link href="/inspiration" className="hover:text-[#991B1B] transition">Open-Source Google Fonts</Link></li>
                <li><Link href="/legal/terms" className="hover:text-[#991B1B] transition">Inspiration Safe Use Policy</Link></li>
                <li><Link href="/legal/takedown" className="hover:text-[#991B1B] transition">Takedown Request Portal</Link></li>
              </ul>
            </div>

            {/* Column 4: Resources */}
            <div>
              <h3 className="font-bold text-[#1E293B] uppercase tracking-wider text-[11px] mb-3">
                Resources
              </h3>
              <ul className="space-y-2.5">
                <li><Link href="/brand" className="hover:text-[#991B1B] transition">Brand Guidelines &amp; Logo</Link></li>
                <li><Link href="/security" className="hover:text-[#991B1B] transition">Security &amp; DPDP Audit</Link></li>
                <li><Link href="/hub" className="hover:text-[#991B1B] transition">Developer Studio Hub</Link></li>
                <li><a href="#comparison" className="hover:text-[#991B1B] transition">Comparison Matrix</a></li>
                <li><a href="#pricing" className="hover:text-[#991B1B] transition">Pricing &amp; Student Perks</a></li>
              </ul>
            </div>

            {/* Column 5: Legal & Trust */}
            <div>
              <h3 className="font-bold text-[#1E293B] uppercase tracking-wider text-[11px] mb-3">
                Legal &amp; Trust
              </h3>
              <ul className="space-y-2.5">
                <li><Link href="/legal/terms" className="hover:text-[#991B1B] transition">Terms of Service</Link></li>
                <li><Link href="/legal/takedown" className="hover:text-[#991B1B] transition">DMCA Takedown Notice</Link></li>
                <li><Link href="/security" className="hover:text-[#991B1B] transition">DPDP &amp; Privacy Policy</Link></li>
                <li><span className="text-slate-400">Zero Scraping Commitment</span></li>
                <li><span className="text-slate-400">SOC2 Type II In-Progress</span></li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright & Guarantee */}
          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <div>
              © 2026 FolioVeda Inc. Engineered with Studio Alabaster (#F8F9FA), Deep Slate (#1E293B), and Industrial Crimson (#991B1B).
            </div>
            <div className="flex items-center gap-4">
              <span>Deployed on 300+ Global Edge Nodes</span>
              <span>•</span>
              <span>Sub-50ms TTFB</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
