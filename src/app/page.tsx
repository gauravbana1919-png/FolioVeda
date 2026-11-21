"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  ArrowRight,
  Check,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Globe,
  Code2,
  FileText,
  Star,
  Zap,
  Laptop,
  CheckCircle2,
  ArrowUpRight,
  ChevronDown,
  Layers,
  Terminal,
  Cpu,
} from "lucide-react";
import { FolioVedaLogo } from "@/components/ui/Logo";
import { HangingResumesGallery } from "@/components/portfolio/HangingResumesGallery";
import { FolioTreeHeroAnimation } from "@/components/portfolio/FolioTreeHeroAnimation";
import { SignInModal } from "@/components/auth/SignInModal";

export default function NotYourCollegeHomePage() {
  const { data: session } = useSession();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [handleInput, setHandleInput] = useState("");
  const [activeTab, setActiveTab] = useState<"nyc" | "luxe" | "terminal" | "minimal">("nyc");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const showcaseThemes = {
    nyc: {
      name: "Not Your College (Editorial)",
      subtitle: "Warm cream paper aesthetic, Instrument Serif typography, and high-impact editorial cards.",
      accent: "#173f32",
      badge: "STUDENT & BUILDER FAVORITE",
      previewUrl: "/p/gaurav?theme=not-your-college",
      bgClass: "bg-[#f7f4eb] text-[#222e26]",
      cardBorder: "border-[#173f32]/20",
    },
    luxe: {
      name: "Luxe Creative (Dark Glow)",
      subtitle: "Deep ambient gradient mesh, floating glass cards, and animated interactive telemetry.",
      accent: "#991B1B",
      badge: "FLAGSHIP DARK THEME",
      previewUrl: "/p/gaurav?theme=luxe-creative",
      bgClass: "bg-[#0B0F19] text-white",
      cardBorder: "border-white/10",
    },
    terminal: {
      name: "Developer Terminal",
      subtitle: "Monospace CLI prompt, real git commits, and verified systems latency benchmarks.",
      accent: "#10B981",
      badge: "HARDCORE ENGINEERING",
      previewUrl: "/p/gaurav?theme=developer-terminal",
      bgClass: "bg-[#0D1117] text-[#E6EDF3]",
      cardBorder: "border-[#30363D]",
    },
    minimal: {
      name: "Minimal Editorial",
      subtitle: "High whitespace, classic typography, and museum monograph layout.",
      accent: "#1E293B",
      badge: "CLEAN & TIMELESS",
      previewUrl: "/p/gaurav?theme=minimal-editorial",
      bgClass: "bg-white text-slate-900",
      cardBorder: "border-slate-200",
    },
  };

  const faqs = [
    {
      q: "How does FolioVeda prevent fake credentials and hallucinations?",
      a: "Unlike generic AI writers that invent fake job titles and metrics, FolioVeda uses a strict factual anchor model. We only synthesize headlines, bullet points, and portfolios from your real GitHub repositories, uploaded resume notes, and verified work history.",
    },
    {
      q: "Can I share my portfolio on LinkedIn, Twitter, and job applications?",
      a: "Yes! Every portfolio gets an instant shareable link like folioveda.me/p/[your-name], fully responsive on mobile, tablet, and desktop with open-graph cards for social sharing.",
    },
    {
      q: "How does the ATS Resume Tailor work?",
      a: "You paste your base resume and any job description. FolioVeda analyzes keyword overlap, reorganizes your real experience to match the employer's requirements, and exports a high-resolution, machine-parseable PDF.",
    },
    {
      q: "Can I switch themes without losing my data?",
      a: "Yes. All portfolio content is stored in a standardized schema. You can switch between Not Your College, Luxe Creative, Developer Terminal, and Minimal Editorial with zero data loss in one click.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f4eb] text-[#222e26] font-sans selection:bg-[#ebd800] selection:text-[#173f32] antialiased overflow-x-hidden">
      
      {/* ── STICKY NOT YOUR COLLEGE HEADER ── */}
      <header className="sticky top-0 z-50 bg-[#f7f4eb]/90 backdrop-blur-md border-b border-[#173f32]/15 transition-all">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          
          {/* Official FolioVeda Logo */}
          <Link href="/" className="flex items-center group">
            <FolioVedaLogo size="md" subtitle="Where Builders Launch" />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-bold text-[#222e26]">
            <a href="#why-proof" className="hover:text-[#173f32] transition-colors">
              Why Proof Matters
            </a>
            <a href="#top-resumes" className="hover:text-[#173f32] transition-colors flex items-center gap-1.5">
              <span>Floating Portfolios</span>
              <span className="w-2 h-2 rounded-full bg-[#ebd800] border border-[#173f32] animate-ping" />
            </a>
            <a href="#showcase" className="hover:text-[#173f32] transition-colors">
              Live Showcase
            </a>
            <a href="#curriculum" className="hover:text-[#173f32] transition-colors">
              How It Works
            </a>
            <Link href="/resume" className="hover:text-[#173f32] transition-colors">
              Resume Tailor
            </Link>
            <Link href="/inspiration" className="hover:text-[#173f32] transition-colors flex items-center gap-1">
              <span>Inspiration Studio</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#ebd800] text-[#173f32] font-extrabold">NEW</span>
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-3">
            {session?.user ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#173f32]/10 border border-[#173f32]/20 text-xs font-bold text-[#173f32]">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>{session.user.name || session.user.email?.split("@")[0]}</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden sm:inline-flex px-4 py-2 rounded-full border border-[#173f32]/20 hover:bg-white text-xs font-bold text-[#222e26] transition-all cursor-pointer"
              >
                Sign In
              </button>
            )}
            <Link
              href="/p/gaurav"
              className="hidden sm:inline-flex px-4 py-2 rounded-full border border-[#173f32]/20 hover:bg-white text-xs font-bold text-[#222e26] transition-all"
            >
              Live Demo ↗
            </Link>
            <Link
              href="/onboarding"
              className="px-5 py-2.5 rounded-full bg-[#173f32] hover:bg-[#16382c] text-[#f7f4eb] text-xs font-bold uppercase tracking-wider transition-all shadow-xs hover:scale-105 active:scale-95"
            >
              Start Building Free →
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION: NYC EDITORIAL STYLE ── */}
      <section className="relative px-6 sm:px-10 pt-16 pb-24 max-w-6xl mx-auto overflow-hidden">
        {/* Subtle background grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#173f32 1px, transparent 1px), linear-gradient(90deg, #173f32 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
        />

        <div className="space-y-8 relative z-10 text-left sm:text-center max-w-4xl mx-auto">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ebd800] text-[#173f32] text-xs font-bold uppercase tracking-wider border border-[#173f32]/20 shadow-xs">
            <span>✦ THE PORTFOLIO ENGINE FOR THE AI GENERATION</span>
          </div>

          {/* Massive Instrument Serif Heading */}
          <h1 className="text-4xl sm:text-7xl md:text-8xl font-normal text-[#222e26] font-editorial tracking-tight leading-[1.04]">
            Careers are made on proof. <br />
            <span className="font-editorial-italic font-normal text-[#173f32]">
              Not just certificates.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-[#3d4d42] max-w-2xl sm:mx-auto leading-relaxed font-normal">
            College syllabi hand you generic degrees. FolioVeda turns your shipped code, live projects, and real achievements into an award-winning portfolio and ATS-tailored resume.
          </p>

          {/* Claim Handle Bar */}
          <div className="pt-4 max-w-xl sm:mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const name = handleInput.trim() || "alex";
                window.location.href = `/onboarding?name=${encodeURIComponent(name)}`;
              }}
              className="p-2 bg-white rounded-full border-2 border-[#173f32]/25 shadow-md flex items-center gap-2"
            >
              <div className="pl-4 pr-1 text-xs font-mono font-bold text-[#5a6b60] shrink-0 select-none hidden sm:block">
                folioveda.me/p/
              </div>
              <input
                type="text"
                value={handleInput}
                onChange={(e) => setHandleInput(e.target.value)}
                placeholder="your-handle-or-name"
                className="w-full bg-transparent px-3 py-2 text-sm font-bold text-[#222e26] focus:outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#173f32] hover:bg-[#16382c] text-[#f7f4eb] text-xs font-bold uppercase tracking-wider shrink-0 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>Claim &amp; Build</span>
                <ArrowRight size={13} />
              </button>
            </form>

            {/* Micro badges below form */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#5a6b60] pt-4">
              <span className="flex items-center gap-1">
                <CheckCircle2 size={13} className="text-[#173f32]" /> 100% Free to Start
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 size={13} className="text-[#173f32]" /> Zero Hallucinations
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 size={13} className="text-[#173f32]" /> Instant ATS PDF Export
              </span>
            </div>
          </div>

          {/* Interactive FolioTree Animation */}
          <div className="pt-8">
            <FolioTreeHeroAnimation />
          </div>
        </div>
      </section>

      {/* ── TWO REALITIES: THE COLLEGE GAP VS THE FOLIOVEDA STANDARD ── */}
      <section id="why-proof" className="py-20 px-6 sm:px-10 bg-[#faf8f1] border-y border-[#173f32]/15">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#173f32] uppercase tracking-wider block">
              [ 01 // THE REALITY GAP ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#222e26] tracking-tight">
              By final year, most students are just surviving. Start building proof now.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* The Old College Way */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#fffdf8] border border-[#173f32]/20 flex flex-col justify-between space-y-6 opacity-85">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider">
                  The Traditional College Way
                </div>
                <h3 className="text-2xl font-editorial font-bold text-[#222e26]">
                  A 2-page PDF filled with generic buzzwords and 404 links.
                </h3>
                <ul className="space-y-3 text-sm text-[#5a6b60] leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-600 font-bold">✕</span>
                    <span>No live deployed URLs or verifiable code commits for recruiters to test.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-600 font-bold">✕</span>
                    <span>Generic Canva or Word templates that get rejected by automated ATS screening.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-600 font-bold">✕</span>
                    <span>Zero visual impact or interactivity when hiring managers open your profile.</span>
                  </li>
                </ul>
              </div>
              <div className="text-xs font-bold text-slate-500 font-mono pt-4 border-t border-slate-200">
                RESULT: 100+ Applications sent with 0 recruiter callbacks.
              </div>
            </div>

            {/* The FolioVeda Standard (NYC Deep Forest Green Card) */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#173f32] text-[#f7f4eb] flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ebd800]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="inline-block px-3.5 py-1 rounded-full bg-[#ebd800] text-[#173f32] text-xs font-bold uppercase tracking-wider border border-[#ebd800]">
                  The FolioVeda Standard
                </div>
                <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-[#f7f4eb] tracking-tight">
                  A verified live portfolio and tailored resume built on real artifacts.
                </h3>
                <ul className="space-y-3 text-sm text-[#f7f4eb]/90 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#ebd800] font-bold">✓</span>
                    <span><strong>Verified GitHub sync:</strong> real repositories, commit hashes, and live deployment links.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#ebd800] font-bold">✓</span>
                    <span><strong>Zero-hallucination AI:</strong> every word anchored in your real experience, never fabricated.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#ebd800] font-bold">✓</span>
                    <span><strong>Editorial &amp; motion themes:</strong> Not Your College, Luxe Dark, and Terminal layouts.</span>
                  </li>
                </ul>
              </div>
              <div className="text-xs font-bold text-[#ebd800] font-mono pt-4 border-t border-white/15 relative z-10">
                RESULT: Verified portfolio link recruiters actually click and remember.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FLOATING PORTFOLIOS & HANGING RESUMES GALLERY ── */}
      <HangingResumesGallery />

      {/* ── LIVE INTERACTIVE SHOWCASE SECTION ── */}
      <section id="showcase" className="py-24 px-6 sm:px-10 max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#173f32]/15 pb-6">
          <div>
            <span className="text-xs font-bold text-[#173f32] uppercase tracking-wider block">
              [ 02 // ARCHITECTURAL SHOWCASE ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#222e26] tracking-tight">
              Portfolios in the showcase.
            </h2>
            <p className="text-[#5a6b60] text-sm sm:text-base mt-2 max-w-xl font-normal">
              Switch between themes built for builders, systems engineers, and creative technologists.
            </p>
          </div>

          {/* Theme Switcher Tabs */}
          <div className="flex flex-wrap gap-2">
            {(["nyc", "luxe", "terminal", "minimal"] as const).map((key) => {
              const active = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    active
                      ? "bg-[#173f32] text-[#f7f4eb] shadow-xs"
                      : "bg-[#fffdf8] text-[#222e26] border border-[#173f32]/20 hover:bg-white"
                  }`}
                >
                  {showcaseThemes[key].name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Theme Preview Card */}
        <div
          className={`p-8 sm:p-12 rounded-3xl border ${showcaseThemes[activeTab].cardBorder} ${showcaseThemes[activeTab].bgClass} transition-all duration-300 shadow-xl`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-current/15 pb-6">
            <div>
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#ebd800] text-[#173f32] inline-block mb-3">
                {showcaseThemes[activeTab].badge}
              </span>
              <h3 className="text-3xl sm:text-4xl font-editorial font-bold tracking-tight">
                {showcaseThemes[activeTab].name}
              </h3>
              <p className="text-sm opacity-80 mt-1 max-w-xl">
                {showcaseThemes[activeTab].subtitle}
              </p>
            </div>
            <Link
              href={showcaseThemes[activeTab].previewUrl}
              target="_blank"
              className="px-6 py-3 rounded-full bg-[#173f32] text-[#f7f4eb] font-bold text-xs uppercase tracking-wider hover:bg-[#16382c] transition-all flex items-center gap-2 self-start md:self-auto shadow-md"
            >
              <span>Explore Live Theme</span>
              <ExternalLink size={13} />
            </Link>
          </div>

          {/* Mock Preview Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-current/10 space-y-3">
              <span className="text-[11px] font-mono font-bold opacity-60">FEATURED UNIT_01</span>
              <h4 className="text-lg font-bold">Distributed Edge Cache</h4>
              <p className="text-xs opacity-75 leading-relaxed">
                A low-latency distributed caching layer built with Rust and Redis, serving 100k+ req/sec with sub-5ms p99.
              </p>
              <div className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 inline-block">
                100k req/sec • Verified
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-current/10 space-y-3">
              <span className="text-[11px] font-mono font-bold opacity-60">FEATURED UNIT_02</span>
              <h4 className="text-lg font-bold">AI Synthesis Engine</h4>
              <p className="text-xs opacity-75 leading-relaxed">
                Interactive real-time collaboration canvas with LLM-powered diagram generation and markdown previewing.
              </p>
              <div className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 inline-block">
                12k Active Monthly Users
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-current/10 space-y-3">
              <span className="text-[11px] font-mono font-bold opacity-60">FEATURED UNIT_03</span>
              <h4 className="text-lg font-bold">Zero-Hallucination Core</h4>
              <p className="text-xs opacity-75 leading-relaxed">
                Live portfolio and resume tailor system ensuring zero hallucinated metrics or fabricated job titles.
              </p>
              <div className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 inline-block">
                Production Deployed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4-STEP ENGINE WORKFLOW (TIMETABLE / NYC ACTIVITIES STYLE) ── */}
      <section id="curriculum" className="py-24 px-6 sm:px-10 bg-[#faf8f1] border-y border-[#173f32]/15">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#173f32] uppercase tracking-wider block">
              [ 03 // HOW FOLIOVEDA WORKS ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#222e26] tracking-tight">
              Everything about FolioVeda, in 4 simple steps.
            </h2>
            <p className="text-[#5a6b60] text-sm sm:text-base font-normal">
              From raw code and resume notes to an award-winning live portfolio in 60 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Smart Intake & Extraction",
                desc: "Paste your LinkedIn summary or full resume. Gemini AI extracts your real roles, dates, achievements, and degrees automatically.",
                badge: "AI EXTRACTOR",
              },
              {
                step: "02",
                title: "Zero-Hallucination Guard",
                desc: "Our factual anchor model strictly forbids inventing fake metrics or unverified titles. Complete truth, verified by you.",
                badge: "VERIFIED ACCURACY",
              },
              {
                step: "03",
                title: "Architectural Themes",
                desc: "Pick your aesthetic: Not Your College editorial paper, Luxe dark gradient, or developer terminal. Switch anytime with zero data loss.",
                badge: "DESIGN CRAFT",
              },
              {
                step: "04",
                title: "Instant Live URL & ATS PDF",
                desc: "Share your live link at folioveda.me/p/[you] and download a publication-grade, machine-readable ATS resume PDF.",
                badge: "ONE-CLICK LAUNCH",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-[#fffdf8] border border-[#173f32]/20 flex flex-col justify-between space-y-6 shadow-2xs hover:border-[#173f32] transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-editorial font-bold text-[#173f32]">
                      {item.step}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#eeeaf4] text-[#173f32]">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#222e26] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5a6b60] leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
                <div className="text-[11px] font-bold text-[#173f32] flex items-center gap-1">
                  <span>Learn more</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH GIANTS TICKER ── */}
      <section className="py-14 px-6 border-b border-[#173f32]/15 bg-[#f7f4eb]">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[#5a6b60]">
            Engineers &amp; builders creating with FolioVeda join teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-sm sm:text-base font-extrabold text-[#222e26]/60">
            <span>Microsoft</span>
            <span>Google</span>
            <span>Atlassian</span>
            <span>Stripe</span>
            <span>Razorpay</span>
            <span>Uber</span>
            <span>Meta</span>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="py-24 px-6 sm:px-10 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-[#173f32] uppercase tracking-wider block">
            [ 04 // COMMON QUESTIONS ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#222e26] tracking-tight">
            Frequently asked questions.
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#fffdf8] border border-[#173f32]/20 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#222e26]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 text-[#173f32] ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-[#5a6b60] leading-relaxed border-t border-[#173f32]/10 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FINAL NYC FOREST GREEN CTA BANNER ── */}
      <section className="px-6 sm:px-10 pb-24">
        <div className="max-w-6xl mx-auto rounded-3xl bg-[#173f32] text-[#f7f4eb] p-10 sm:p-20 text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#ebd800] text-[#173f32] text-xs font-bold uppercase tracking-wider">
            ✦ STOP APPLYING WITH BORING RESUMES
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-normal text-[#f7f4eb] tracking-tight max-w-3xl mx-auto leading-[1.08]">
            Your career starts with what you build. <br />
            <span className="font-editorial-italic text-[#ebd800]">
              Launch your verified portfolio today.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#f7f4eb]/80 max-w-xl mx-auto font-normal leading-relaxed">
            Free forever for early-career developers, creators, and engineering builders. No credit card required.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/onboarding"
              className="px-8 py-4 rounded-full bg-[#ebd800] hover:bg-[#ffe600] text-[#173f32] font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Build My Portfolio Free</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/resume"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-[#f7f4eb] border border-white/20 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all"
            >
              Tailor Resume for a Job →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#173f32]/15 py-12 px-6 sm:px-10 bg-[#f7f4eb]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#5a6b60]">
          <div className="flex items-center gap-3">
            <FolioVedaLogo size="xs" />
            <span className="text-[#5a6b60]">|</span>
            <span className="font-medium text-[#5a6b60]">Where Builders Launch</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/p/gaurav" className="hover:text-[#173f32] transition-colors">
              Sample Portfolio
            </Link>
            <Link href="/resume" className="hover:text-[#173f32] transition-colors">
              ATS Resume
            </Link>
            <Link href="/inspiration" className="hover:text-[#173f32] transition-colors">
              Inspiration Studio
            </Link>
          </div>
          <p>© {new Date().getFullYear()} FolioVeda. Built for builders.</p>
        </div>
      </footer>

      {/* ── AUTH SIGN-IN MODAL ── */}
      <SignInModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultCallbackUrl="/onboarding"
      />
    </div>
  );
}
