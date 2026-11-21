"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Code2, 
  Layers, 
  FileText, 
  Globe, 
  Terminal, 
  Sliders, 
  Check, 
  Download, 
  ExternalLink,
  MapPin,
  Building2,
  Zap,
  TrendingUp,
  RotateCcw
} from "lucide-react";

interface GuideStep {
  id: number;
  stepNumber: string;
  title: string;
  kicker: string;
  route: string;
  routeLabel: string;
  indianContextHighlight: string;
  description: string;
  keyPoints: string[];
  mockupType: "intake" | "styles" | "inspiration" | "resume" | "edge";
}

const GUIDE_STEPS: GuideStep[] = [
  {
    id: 0,
    stepNumber: "01",
    title: "120-Second Smart GitHub & Profile Intake",
    kicker: "STEP 1: ZERO-HALLUCINATION INTAKE",
    route: "/onboarding",
    routeLabel: "Start Intake Flow ↗",
    indianContextHighlight: "Built for engineers in Bengaluru, Hyderabad & Pune: replaces generic college/mass-recruitment templates with verified GitHub proof.",
    description: "Connect your GitHub or paste your technical profile. FolioVeda automatically analyzes your verified repositories, commit cadence, and language breakdown without hallucinating unproven claims.",
    keyPoints: [
      "Connects directly to GitHub via public API or OAuth",
      "Calculates verified commit frequency and real throughput metrics",
      "No manual form fatigue: 120 seconds from start to finish",
      "Zero international credit card required (100% free trial)"
    ],
    mockupType: "intake"
  },
  {
    id: 1,
    stepNumber: "02",
    title: "8 Production-Grade Architectural Styles",
    kicker: "STEP 2: STYLE GALLERY & PERSONALISATION",
    route: "/styles",
    routeLabel: "Browse Style Gallery ↗",
    indianContextHighlight: "Stand out to engineering managers at CRED, Swiggy, Razorpay & global US remote startups who review 400+ identical applications a day.",
    description: "Switch between 8 world-class themes with a single click. Whether you prefer a dark terminal theme for distributed systems, or a high-whitespace editorial monograph for design, your verified data stays intact.",
    keyPoints: [
      "Choose from Kester (Terminal), Cami (Editorial), Nolan (Product) & more",
      "1-Click live preview populated with your real GitHub data",
      "Zero data loss when switching themes: layout changes, content endures",
      "Fully responsive and optimized for mobile recruiters on LinkedIn"
    ],
    mockupType: "styles"
  },
  {
    id: 2,
    stepNumber: "03",
    title: "Inspiration Engine: Feel-Like-This Cloner",
    kicker: "STEP 3: COPYRIGHT-SAFE INSPIRATION AI",
    route: "/inspiration",
    routeLabel: "Try Inspiration Cloner ↗",
    indianContextHighlight: "Admire a high-end Silicon Valley site or Awwwards winner? Replicate its calm aesthetic without copyright infringement.",
    description: "Paste any portfolio URL you love. FolioVeda's neural analyzer extracts the abstract color harmony, typographic scales, and negative spacing into a completely original, copyright-safe theme tailored to you.",
    keyPoints: [
      "Paste any portfolio link from Awwwards, Dribbble, or top engineers",
      "Adjust the Closeness Slider (Loose, Balanced, Close) to your taste",
      "Strict similarity guard prevents 1:1 asset or code copying",
      "Instant 1-click apply to your personal live portfolio domain"
    ],
    mockupType: "inspiration"
  },
  {
    id: 3,
    stepNumber: "04",
    title: "AI Resume Tailor & Instant ATS Export",
    kicker: "STEP 4: CRACK INDIAN & GLOBAL ATS SCANNERS",
    route: "/resume",
    routeLabel: "Tailor Your Resume ↗",
    indianContextHighlight: "99% ATS match rate for Workday, Greenhouse & Taleo used by Amazon India, Flipkart, Zomato, and global remote recruiters.",
    description: "Paste any Job Description (JD). FolioVeda highlights skill gaps, aligns keywords from your verified experience, and exports single-column high-scoring ATS Markdown and visual PDF files.",
    keyPoints: [
      "Paste job descriptions from LinkedIn India, Naukri, or Instahyre",
      "Single-column ATS Markdown parses with 99%+ accuracy",
      "Interactive diff viewer shows tailored improvements side-by-side",
      "Export print-ready ATS PDF and visual recruitment PDF in 1 click"
    ],
    mockupType: "resume"
  },
  {
    id: 4,
    stepNumber: "05",
    title: "Sub-50ms Global Edge CDN & Developer Hub",
    kicker: "STEP 5: INSTANT DEPLOYMENT & TESTING",
    route: "/hub",
    routeLabel: "Open Developer Studio Hub ↗",
    indianContextHighlight: "Blazing fast edge nodes in Mumbai (BOM), Delhi (DEL), and Chennai (MAA) ensuring sub-20ms loading speeds across India and worldwide.",
    description: "Your portfolio is deployed instantly on a worldwide Edge CDN with automatic SSL and free hosting at folioveda.me/yourname. Test desktop and mobile responsive views inside our master Developer Hub.",
    keyPoints: [
      "Instant custom domain (folioveda.me/yourname or your own .dev / .in)",
      "Edge caching in Mumbai, Delhi, and Chennai for zero latency in India",
      "Real-time webhook simulator: pushing to GitHub automatically updates your live site",
      "Clean recruiter view (/p/alex) with zero distracting editor bars"
    ],
    mockupType: "edge"
  }
];

export function PlatformGuideSection() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const step = GUIDE_STEPS[currentStep];

  // Auto-play interval (7.5 seconds per step)
  useEffect(() => {
    if (!isPlaying) return;

    const intervalMs = 60;
    const duration = 7500;
    const stepPct = (100 / (duration / intervalMs));

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentStep((curr) => (curr + 1) % GUIDE_STEPS.length);
          return 0;
        }
        return prev + stepPct;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, currentStep]);

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep]);

  const goToNext = () => {
    setCurrentStep((curr) => (curr + 1) % GUIDE_STEPS.length);
    setProgress(0);
  };

  const goToPrev = () => {
    setCurrentStep((curr) => (curr - 1 + GUIDE_STEPS.length) % GUIDE_STEPS.length);
    setProgress(0);
  };

  const jumpToStep = (index: number) => {
    setCurrentStep(index);
    setProgress(0);
  };

  return (
    <section 
      id="guide"
      className="py-24 px-6 sm:px-10 max-w-7xl mx-auto scroll-mt-24 select-none border-t border-slate-200"
    >
      {/* Section Header with Indian Context */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#1E293B]/10 text-xs text-[#1E293B] shadow-2xs mb-4">
          <span className="w-2 h-2 rounded-full bg-[#173f32] animate-pulse" />
          <span className="font-extrabold uppercase tracking-wider text-[11px] text-[#173f32]">
            STEP-BY-STEP PLATFORM GUIDE
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600 font-semibold">Master Every Function in 5 Minutes</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1E293B] leading-tight mb-4">
          How to Build a Tier-1 Career Engine <br />
          <span className="font-extrabold tracking-tight bg-gradient-to-r from-[#173f32] via-[#10B981] to-[#173f32] bg-clip-text text-transparent">
            Step-by-Step with FolioVeda.
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">
          Engineered for developers, designers, and students across <strong className="text-[#1E293B] font-bold">Bengaluru, Hyderabad, Pune, Gurugram</strong>, and global remote teams. Learn how each function works below.
        </p>

        {/* Indian Tech Ecosystem Badge Strip */}
        <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-3 py-1.5 px-4 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
          <span className="flex items-center gap-1 text-[#173f32] font-bold">
            <Building2 size={13} /> Target Companies:
          </span>
          <span>CRED</span>
          <span className="text-slate-300">•</span>
          <span>Flipkart</span>
          <span className="text-slate-300">•</span>
          <span>Swiggy</span>
          <span className="text-slate-300">•</span>
          <span>Razorpay</span>
          <span className="text-slate-300">•</span>
          <span>Microsoft India</span>
          <span className="text-slate-300">•</span>
          <span className="text-emerald-700 font-bold">Remote USD Roles ($80k+)</span>
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE GUIDE CONTROLLER & STEP CAROUSEL
          ========================================================================= */}
      <div className="bg-white rounded-3xl border-2 border-[#1E293B]/10 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Top Control Bar with Manual Arrow Navigation */}
        <div className="h-16 bg-[#1E293B] text-white px-6 sm:px-10 flex items-center justify-between border-b border-slate-800">
          
          {/* Step Count & Play/Pause */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-300">
              <span className="text-amber-400 font-extrabold text-sm">{step.stepNumber}</span>
              <span>/ 05</span>
            </div>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
              title={isPlaying ? "Pause automated walkthrough" : "Resume automated walkthrough"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>

            <span className="text-xs font-bold text-slate-300 hidden md:inline truncate max-w-[280px]">
              {step.title}
            </span>
          </div>

          {/* Center: Step Indicator Dots */}
          <div className="hidden sm:flex items-center gap-1.5">
            {GUIDE_STEPS.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => jumpToStep(idx)}
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                  currentStep === idx
                    ? "bg-[#173f32] text-white shadow-sm scale-105"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>

          {/* Right: Manual Arrows (Prev & Next) */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrev}
              className="p-2 rounded-xl bg-slate-800 hover:bg-[#173f32] text-white transition font-bold flex items-center justify-center shadow-xs"
              title="Previous Step (or press ← arrow key)"
              aria-label="Previous step"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={goToNext}
              className="px-3.5 py-1.5 rounded-xl bg-[#173f32] hover:bg-[#13352a] text-white transition font-bold flex items-center gap-1 text-xs shadow-md"
              title="Next Step (or press → arrow key)"
              aria-label="Next step"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>

        </div>

        {/* Dynamic Progress Scrubber Bar */}
        <div className="w-full h-1 bg-slate-800 relative">
          <div 
            className="h-full bg-gradient-to-r from-[#173f32] via-[#10B981] to-[#ebd800] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* =========================================================================
            STAGE VIEW: 2-Column Split (Left: Explanation, Right: Feature Mockup)
            ========================================================================= */}
        <div className="p-6 sm:p-12 bg-gradient-to-b from-[#F8F9FA] to-white grid grid-cols-1 lg:grid-cols-12 gap-10 items-center min-h-[500px]">
          
          {/* Left Column: Function Explanation & Indian Context (7 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-2">
              <span className="font-mono text-xs font-extrabold text-[#173f32] uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block">
                {step.kicker}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] leading-snug">
                {step.title}
              </h3>
            </div>

            {/* Indian Context Highlight Box */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-xs text-amber-950 font-medium space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <MapPin size={13} className="text-[#173f32]" />
                <span>Why This Matters in India:</span>
              </div>
              <p className="leading-relaxed">
                {step.indianContextHighlight}
              </p>
            </div>

            <p className="text-sm text-slate-600 font-normal leading-relaxed">
              {step.description}
            </p>

            {/* Key Capabilities Checklist */}
            <div className="space-y-2.5">
              {step.keyPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 size={15} className="text-[#10B981] shrink-0 mt-0.5" />
                  <span className="font-semibold">{point}</span>
                </div>
              ))}
            </div>

            {/* Direct Route CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href={step.route}
                className="shimmer-button bg-gradient-to-r from-[#173f32] via-[#10B981] to-[#173f32] hover:opacity-95 text-white font-extrabold text-xs px-6 py-3 rounded-full shadow-md shadow-[#173f32]/25 hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>{step.routeLabel}</span>
                <ArrowRight size={13} />
              </Link>

              <button
                onClick={goToNext}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-xs px-4 py-3 rounded-full shadow-2xs transition"
              >
                Next Function →
              </button>
            </div>

          </div>

          {/* Right Column: Live High-Fidelity Animated Mockup (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl border-2 border-slate-200 shadow-xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
            
            {/* Top Browser Chassis Pill */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-[11px] text-slate-500 ml-2">folioveda.me{step.route}</span>
              </div>
              <span className="text-[10px] font-bold text-[#173f32] bg-emerald-50 px-2 py-0.5 rounded-md uppercase font-mono">
                FUNCTION {step.stepNumber}
              </span>
            </div>

            {/* MOCKUP 1: Smart GitHub Intake */}
            {step.mockupType === "intake" && (
              <div className="my-auto py-4 space-y-4 animate-fade-in">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Code2 size={16} className="text-[#173f32]" />
                      <span className="font-mono text-xs font-bold text-slate-800">github.com/alexrivera</span>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                      Synced (120s)
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold block">REPOSITORIES</span>
                      <span className="font-extrabold text-[#1E293B]">24 Verified</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold block">COMMIT VELOCITY</span>
                      <span className="font-extrabold text-emerald-700">842 Commits/Yr</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  ✓ Automatically extracts Go, Rust, React, and system throughput without manual data entry.
                </div>
              </div>
            )}

            {/* MOCKUP 2: 8 Production Styles */}
            {step.mockupType === "styles" && (
              <div className="my-auto py-4 space-y-4 animate-fade-in">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-900 text-white rounded-2xl border-2 border-[#173f32] space-y-1">
                    <span className="text-[9px] font-mono text-emerald-400 font-bold">THEME: KESTER</span>
                    <h5 className="font-bold text-xs text-white">Developer Terminal</h5>
                    <p className="text-[10px] text-slate-300">Monospace, CLI prompt, commit hash cards.</p>
                  </div>
                  <div className="p-3 bg-white text-[#1E293B] rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-[9px] font-mono text-[#173f32] font-bold">THEME: CAMI</span>
                    <h5 className="font-bold text-xs text-[#1E293B]">Minimal Editorial</h5>
                    <p className="text-[10px] text-slate-500">Serif headlines, generous whitespace.</p>
                  </div>
                </div>
                <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
                  <span>Switching themes takes 1 click: zero loss of projects or experience.</span>
                </div>
              </div>
            )}

            {/* MOCKUP 3: Inspiration Engine */}
            {step.mockupType === "inspiration" && (
              <div className="my-auto py-4 space-y-4 animate-fade-in">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-700">Inspiration Link Extractor</div>
                  <div className="bg-white p-2 rounded-xl border border-slate-200 font-mono text-xs text-slate-600 flex items-center justify-between">
                    <span>https://pattin.design</span>
                    <span className="text-[10px] text-[#173f32] font-bold">Extracting...</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-bold text-slate-600">
                      <span>Closeness Slider</span>
                      <span className="text-[#173f32]">Balanced (50%)</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#173f32] h-full w-1/2" />
                    </div>
                  </div>
                </div>
                <div className="text-xs text-emerald-700 font-bold bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                  ✓ Strict Copyright Guard Active: 0% asset duplication, 100% original synthesis.
                </div>
              </div>
            )}

            {/* MOCKUP 4: AI Resume Tailor */}
            {step.mockupType === "resume" && (
              <div className="my-auto py-4 space-y-4 animate-fade-in">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Job: SDE-2 @ Swiggy / CRED</span>
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      99% ATS Match
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-600 bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                    <p className="text-emerald-700 font-bold">✓ Added: Distributed Ledger, Kafka, p99 Latency</p>
                    <p className="text-slate-500">✓ Formatted: Clean Single-Column Markdown ATS</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-600">Export formats:</span>
                  <div className="flex gap-2">
                    <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 border">ATS .PDF</span>
                    <span className="px-2.5 py-1 bg-[#1E293B] rounded-lg text-white">Visual .PDF</span>
                  </div>
                </div>
              </div>
            )}

            {/* MOCKUP 5: Sub-50ms Global Edge CDN */}
            {step.mockupType === "edge" && (
              <div className="my-auto py-4 space-y-4 animate-fade-in">
                <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-emerald-400 font-bold">
                    <span>● GLOBAL EDGE NODES ACTIVE</span>
                    <span>100% UPTIME</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">MUMBAI</span>
                      <span className="text-emerald-400 font-bold">11 ms</span>
                    </div>
                    <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">DELHI</span>
                      <span className="text-emerald-400 font-bold">14 ms</span>
                    </div>
                    <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">CHENNAI</span>
                      <span className="text-emerald-400 font-bold">12 ms</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  Instant free hosting at <code>folioveda.me/yourname</code> with global SSL.
                </div>
              </div>
            )}

            {/* Mockup Bottom Navigation Hint */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Use <strong>←</strong> / <strong>→</strong> arrow keys to switch steps</span>
              <span className="font-bold text-[#173f32]">Step {currentStep + 1} of 5</span>
            </div>

          </div>

        </div>

        {/* Bottom Interactive Step Indicator Bar */}
        <div className="bg-slate-100 px-6 sm:px-10 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Current Step:</span>
            <span className="text-[#173f32] font-extrabold">
              {step.stepNumber}. {step.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={goToPrev}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-200 text-slate-700 transition border border-slate-200 flex items-center gap-1 shadow-2xs"
            >
              <ChevronLeft size={14} />
              <span>Previous</span>
            </button>
            <button
              onClick={goToNext}
              className="px-4 py-1.5 rounded-full bg-[#1E293B] hover:bg-slate-800 text-white transition flex items-center gap-1 shadow-xs"
            >
              <span>Next Step</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

      </div>

    </section>
  );
}
