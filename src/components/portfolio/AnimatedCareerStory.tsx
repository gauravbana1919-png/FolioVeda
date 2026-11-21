"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Sparkles, 
  ExternalLink, 
  FileText, 
  Globe, 
  Zap, 
  TrendingUp, 
  Award,
  ChevronRight,
  ShieldCheck,
  Check
} from "lucide-react";

export function AnimatedCareerStory() {
  const [currentScene, setCurrentScene] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const scenes = [
    {
      id: 0,
      title: "Scene 1: The Job Hunt",
      subtitle: "Two developers with identical skills submit their applications.",
      badge: "The Starting Line",
    },
    {
      id: 1,
      title: "Scene 2: The ATS & Recruiter Filter",
      subtitle: "The automated ATS scanner and hiring manager review both submissions.",
      badge: "The Filter Moment",
    },
    {
      id: 2,
      title: "Scene 3: The Eureka Moment",
      subtitle: "Leo discovers Marcus's live portfolio URL and finds FolioVeda.",
      badge: "The Transformation",
    },
    {
      id: 3,
      title: "Scene 4: The Dual Celebration",
      subtitle: "Both land high-paying tier-1 roles with verified portfolios.",
      badge: "Total Victory",
    },
  ];

  // Auto-play timer (transitions every 6.5s)
  useEffect(() => {
    if (!isPlaying) return;

    const interval = 50; // update progress every 50ms
    const step = (100 / (6500 / interval));

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentScene((s) => (s + 1) % scenes.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, currentScene, scenes.length]);

  const selectScene = (index: number) => {
    setCurrentScene(index);
    setProgress(0);
  };

  return (
    <section 
      id="career-story"
      className="py-20 px-6 sm:px-10 max-w-7xl mx-auto scroll-mt-24 select-none"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#1E293B]/10 text-xs text-[#1E293B] shadow-2xs mb-4">
          <span className="w-2 h-2 rounded-full bg-[#173f32] animate-pulse" />
          <span className="font-extrabold uppercase tracking-wider text-[10px] text-[#173f32]">
            ANIMATED CASE STORY
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600 font-semibold">The Power of Live Portfolios &amp; ATS Formatting</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1E293B] leading-tight mb-4">
          A Tale of Two Applicants. <br />
          <span className="font-extrabold tracking-tight bg-gradient-to-r from-[#173f32] via-[#10B981] to-[#173f32] bg-clip-text text-transparent">
            Why a Live Portfolio Changes Everything.
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">
          Watch what happens when one candidate sends a flat, unparsed PDF while another presents an ATS-friendly resume backed by a sub-50ms live portfolio.
        </p>
      </div>

      {/* =========================================================================
          VIDEO-LIKE INTERACTIVE PLAYER CHASSIS
          ========================================================================= */}
      <div className="bg-white rounded-3xl border border-[#1E293B]/10 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Player Top Controller Bar */}
        <div className="h-16 bg-slate-900 text-white px-6 sm:px-8 flex items-center justify-between border-b border-slate-800">
          
          {/* Left: Play/Pause & Live Badge */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-9 h-9 rounded-xl bg-[#173f32] hover:bg-[#13352a] text-white flex items-center justify-center transition shadow-md"
              title={isPlaying ? "Pause story" : "Play story"}
            >
              {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
            </button>

            <button
              onClick={() => {
                setCurrentScene(0);
                setProgress(0);
                setIsPlaying(true);
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Restart story from beginning"
            >
              <RotateCcw size={14} />
            </button>

            <div className="h-4 w-px bg-slate-700 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-extrabold tracking-wider uppercase text-slate-200 hidden sm:inline">
                {scenes[currentScene].badge}
              </span>
            </div>
          </div>

          {/* Center: Scene Navigation Tabs */}
          <div className="hidden lg:flex items-center gap-2">
            {scenes.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => selectScene(idx)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  currentScene === idx
                    ? "bg-[#173f32] text-white shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                Act {idx + 1}
              </button>
            ))}
          </div>

          {/* Right: Next Step Trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCurrentScene((s) => (s + 1) % scenes.length);
                setProgress(0);
              }}
              className="flex items-center gap-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-full text-slate-200 transition"
            >
              <span>Next Scene</span>
              <ChevronRight size={13} />
            </button>
          </div>

        </div>

        {/* Video Progress Bar Line */}
        <div className="w-full h-1.5 bg-slate-800 relative">
          <div 
            className="h-full bg-gradient-to-r from-[#173f32] via-[#10B981] to-[#ebd800] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* =========================================================================
            STAGE VIEW: The Two Cartoon Characters & Scene Narrative
            ========================================================================= */}
        <div className="p-6 sm:p-12 bg-gradient-to-b from-[#F8F9FA] to-white relative overflow-hidden min-h-[460px] flex flex-col justify-between">
          
          {/* Scene Title Banner */}
          <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
            <h3 className="text-2xl font-extrabold text-[#1E293B]">
              {scenes[currentScene].title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {scenes[currentScene].subtitle}
            </p>
          </div>

          {/* SCENE 1: The Initial Disparity */}
          {currentScene === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto w-full animate-fade-in">
              
              {/* Leo: Without FolioVeda */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-md space-y-5 relative">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-mono">
                  TRADITIONAL APPLICANT
                </span>
                
                {/* Leo Cartoon SVG (Sad / Frustrated) */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center relative shadow-inner">
                    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
                      {/* Head */}
                      <circle cx="24" cy="22" r="16" fill="#FDE68A" />
                      {/* Hair (messy) */}
                      <path d="M12 18 C12 10, 20 8, 24 8 C28 8, 36 10, 36 18 Z" fill="#64748B" />
                      {/* Droopy Sad Eyes */}
                      <circle cx="19" cy="21" r="2" fill="#1E293B" />
                      <circle cx="29" cy="21" r="2" fill="#1E293B" />
                      {/* Frown Mouth */}
                      <path d="M19 28 C21 25, 27 25, 29 28" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
                      {/* Tear drop */}
                      <path d="M32 23 C32 25, 30.5 27, 32 28 C33.5 27, 32 25, 32 23 Z" fill="#38BDF8" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-extrabold text-[#1E293B]">Leo</h4>
                    <p className="text-xs text-slate-500 font-bold">Talented Full-Stack Engineer</p>
                  </div>
                </div>

                {/* Submissions Checklist */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <XCircle size={15} className="text-red-500 shrink-0" />
                    <span>Flat multi-column PDF (ATS unparseable tables)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <XCircle size={15} className="text-red-500 shrink-0" />
                    <span>No live portfolio domain (just broken text links)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <XCircle size={15} className="text-red-500 shrink-0" />
                    <span>84 applications sent • 0 callbacks</span>
                  </div>
                </div>

                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-center text-xs font-bold text-red-800">
                  Status: Ignored by Recruiters 😔
                </div>
              </div>

              {/* Marcus: With FolioVeda */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#173f32] shadow-xl space-y-5 relative ring-4 ring-[#173f32]/10">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono">
                  FOLIOVEDA CREATOR
                </span>

                {/* Marcus Cartoon SVG (Confident / Smiling) */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center relative shadow-inner">
                    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
                      {/* Head */}
                      <circle cx="24" cy="22" r="16" fill="#FED7AA" />
                      {/* Hair (slick modern) */}
                      <path d="M11 16 C14 8, 30 8, 37 14 C37 17, 34 20, 31 16 C25 14, 15 14, 11 16 Z" fill="#173f32" />
                      {/* Stylish Glasses */}
                      <rect x="15" y="18" width="8" height="6" rx="2" stroke="#1E293B" strokeWidth="1.5" fill="none" />
                      <rect x="25" y="18" width="8" height="6" rx="2" stroke="#1E293B" strokeWidth="1.5" fill="none" />
                      <line x1="23" y1="21" x2="25" y2="21" stroke="#1E293B" strokeWidth="1.5" />
                      {/* Confident Smile */}
                      <path d="M19 28 C21 31, 27 31, 29 28" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-extrabold text-[#1E293B]">Marcus</h4>
                    <p className="text-xs text-slate-500 font-bold">Talented Full-Stack Engineer</p>
                  </div>
                </div>

                {/* Submissions Checklist */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center gap-2 text-slate-800 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-200 font-medium">
                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                    <span>ATS-verified single-column Markdown PDF</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-800 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-200 font-medium">
                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                    <span>Sub-50ms live portfolio: <code>folioveda.me/marcus</code></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-800 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-200 font-medium">
                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                    <span>5 applications sent • 4 interview invites</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-bold text-emerald-800">
                  Status: 3 Offers on Table ($190k+) 🚀
                </div>
              </div>

            </div>
          )}

          {/* SCENE 2: The Recruiter's Scanner Test */}
          {currentScene === 1 && (
            <div className="max-w-4xl mx-auto w-full space-y-6 animate-fade-in">
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider font-mono text-emerald-300">
                      ATS AUTOMATED PARSER SIMULATOR (WORKDAY / GREENHOUSE)
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Job ID: REQ-94821 (Staff Engineer)</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left: Leo's Scanner Failure */}
                  <div className="p-5 rounded-2xl bg-slate-950/80 border border-red-500/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">Applicant: Leo (Static PDF)</span>
                      <span className="text-xs font-extrabold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-500/40">
                        SCORE: 28%
                      </span>
                    </div>
                    <div className="font-mono text-[11px] text-red-300 space-y-1 bg-red-950/30 p-3 rounded-xl border border-red-900/40">
                      <p>⚠️ Error: Complex CSS table columns unreadable.</p>
                      <p>⚠️ Error: Zero verifiable live demo endpoints.</p>
                      <p>❌ Action: Auto-flagged for rejection pile.</p>
                    </div>
                    <p className="text-xs text-slate-400">
                      Recruiter never even opened the document. The ATS algorithm silently discarded it.
                    </p>
                  </div>

                  {/* Right: Marcus's Scanner Triumph */}
                  <div className="p-5 rounded-2xl bg-slate-950/80 border border-emerald-500/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">Applicant: Marcus (FolioVeda)</span>
                      <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                        SCORE: 99%
                      </span>
                    </div>
                    <div className="font-mono text-[11px] text-emerald-300 space-y-1 bg-emerald-950/30 p-3 rounded-xl border border-emerald-900/40">
                      <p>✓ All 18 skills matched standard taxonomies.</p>
                      <p>✓ Verified live portfolio detected at folioveda.me/marcus.</p>
                      <p>✓ Fast-track candidate to hiring director.</p>
                    </div>
                    <p className="text-xs text-slate-400">
                      Recruiter clicked the live portfolio, watched a live architecture demo, and scheduled an interview within 3 hours.
                    </p>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* SCENE 3: The Discovery & Transformation */}
          {currentScene === 2 && (
            <div className="max-w-4xl mx-auto w-full space-y-6 animate-fade-in">
              <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#1E293B]/10 shadow-xl space-y-8">
                
                <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
                  {/* Leo Excited Cartoon SVG */}
                  <div className="w-20 h-20 rounded-3xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center relative shadow-lg shrink-0">
                    <svg className="w-16 h-16" viewBox="0 0 48 48" fill="none">
                      <circle cx="24" cy="22" r="16" fill="#FDE68A" />
                      <path d="M12 16 C12 8, 20 8, 24 8 C28 8, 36 8, 36 16 Z" fill="#475569" />
                      {/* Big Excited Eyes */}
                      <circle cx="19" cy="20" r="3" fill="#1E293B" />
                      <circle cx="29" cy="20" r="3" fill="#1E293B" />
                      <circle cx="20" cy="19" r="1" fill="#FFFFFF" />
                      <circle cx="30" cy="19" r="1" fill="#FFFFFF" />
                      {/* Excited Open Smile */}
                      <path d="M19 26 C21 32, 27 32, 29 26 Z" fill="#173f32" />
                      {/* Lightbulb Eureka floating on top */}
                      <circle cx="24" cy="5" r="3" fill="#F59E0B" />
                      <path d="M22 8 L26 8" stroke="#D97706" strokeWidth="1.5" />
                    </svg>
                  </div>

                  <div className="space-y-2 text-center sm:text-left">
                    <span className="text-xs font-bold text-[#173f32] uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block">
                      THE DISCOVERY
                    </span>
                    <h4 className="text-2xl font-extrabold text-[#1E293B]">
                      Leo asks Marcus: &ldquo;How did you get 3 interview calls this week?!&rdquo;
                    </h4>
                    <p className="text-sm text-slate-600 font-normal">
                      Marcus shares his secret: &ldquo;I ditched flat PDFs. FolioVeda connected my GitHub, generated an ATS-certified resume, and hosted my live portfolio in 120 seconds.&rdquo;
                    </p>
                  </div>
                </div>

                {/* 3-Step Transformation Flow */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="w-6 h-6 rounded-full bg-[#173f32] text-white font-extrabold text-xs flex items-center justify-center">1</span>
                    <h5 className="font-extrabold text-sm text-[#1E293B]">Connect GitHub</h5>
                    <p className="text-xs text-slate-600 font-normal">Zero hallucination intake pulls real commits and verified throughput metrics.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="w-6 h-6 rounded-full bg-[#1E293B] text-white font-extrabold text-xs flex items-center justify-center">2</span>
                    <h5 className="font-extrabold text-sm text-[#1E293B]">Generate ATS Resume</h5>
                    <p className="text-xs text-slate-600 font-normal">Single-column structured Markdown parses with 99%+ accuracy across all enterprise scanners.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center">3</span>
                    <h5 className="font-extrabold text-sm text-[#1E293B]">Instant Live Domain</h5>
                    <p className="text-xs text-slate-600 font-normal">Deployed to worldwide Edge CDN with sub-50ms latency at <code>folioveda.me/leo</code>.</p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* SCENE 4: Total Victory & Both Hired */}
          {currentScene === 3 && (
            <div className="max-w-4xl mx-auto w-full space-y-6 animate-fade-in">
              <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-white via-emerald-50/20 to-white border-2 border-[#173f32] shadow-2xl space-y-8 text-center relative overflow-hidden">
                
                {/* Floating Confetti Sparks */}
                <div className="absolute top-4 left-6 text-2xl animate-bounce">🎉</div>
                <div className="absolute top-6 right-8 text-2xl animate-bounce">✨</div>
                <div className="absolute bottom-6 left-12 text-2xl animate-bounce">🏆</div>
                <div className="absolute bottom-4 right-10 text-2xl animate-bounce">💼</div>

                {/* Both Cartoon Characters Celebrating */}
                <div className="flex items-center justify-center gap-8 pt-2">
                  
                  {/* Transformed Victorious Leo */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-20 h-20 rounded-3xl bg-emerald-50 border-2 border-emerald-400 flex items-center justify-center relative shadow-xl">
                      <svg className="w-16 h-16" viewBox="0 0 48 48" fill="none">
                        <circle cx="24" cy="22" r="16" fill="#FDE68A" />
                        <path d="M12 14 C15 8, 30 8, 36 14 Z" fill="#1E293B" />
                        <circle cx="19" cy="20" r="2.5" fill="#1E293B" />
                        <circle cx="29" cy="20" r="2.5" fill="#1E293B" />
                        {/* Huge Happy Smile */}
                        <path d="M18 26 C21 33, 27 33, 30 26 Z" fill="#173f32" />
                      </svg>
                      <span className="absolute -bottom-2 bg-emerald-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow">
                        HIRED!
                      </span>
                    </div>
                    <span className="font-extrabold text-sm text-[#1E293B]">Leo</span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      $185k @ Stripe
                    </span>
                  </div>

                  <div className="text-3xl font-extrabold text-[#173f32] animate-pulse">+</div>

                  {/* Victorious Marcus */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-20 h-20 rounded-3xl bg-emerald-50 border-2 border-[#173f32] flex items-center justify-center relative shadow-xl">
                      <svg className="w-16 h-16" viewBox="0 0 48 48" fill="none">
                        <circle cx="24" cy="22" r="16" fill="#FED7AA" />
                        <path d="M11 16 C14 8, 30 8, 37 14 Z" fill="#173f32" />
                        <rect x="15" y="18" width="8" height="6" rx="2" stroke="#1E293B" strokeWidth="1.5" fill="none" />
                        <rect x="25" y="18" width="8" height="6" rx="2" stroke="#1E293B" strokeWidth="1.5" fill="none" />
                        <line x1="23" y1="21" x2="25" y2="21" stroke="#1E293B" strokeWidth="1.5" />
                        <path d="M19 28 C21 32, 27 32, 29 28 Z" fill="#173f32" />
                      </svg>
                      <span className="absolute -bottom-2 bg-[#173f32] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow">
                        HIRED!
                      </span>
                    </div>
                    <span className="font-extrabold text-sm text-[#1E293B]">Marcus</span>
                    <span className="text-[11px] font-bold text-[#173f32] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      $195k @ Linear
                    </span>
                  </div>

                </div>

                {/* Final Moral & Call to Action */}
                <div className="max-w-xl mx-auto space-y-3">
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
                    Don&apos;t Let A Flat PDF Cost You Your Dream Job.
                  </h4>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed">
                    Recruiters spend 6 seconds on a resume, but stay 4 minutes on a live FolioVeda portfolio. Stand out with verifiable code, flawless ATS parsing, and timeless editorial presentation.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/onboarding"
                    className="shimmer-button bg-gradient-to-r from-[#173f32] via-[#10B981] to-[#173f32] hover:opacity-95 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-[#173f32]/30 hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <span>Build Your FolioVeda Now — Free</span>
                    <ArrowRight size={15} />
                  </Link>

                  <Link
                    href="/styles"
                    className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-sm px-6 py-3.5 rounded-full shadow-2xs transition"
                  >
                    Browse Portfolio Themes
                  </Link>
                </div>

              </div>
            </div>
          )}

          {/* Bottom Scene Indicators & Progress */}
          <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-slate-500">
            <div className="flex items-center gap-2">
              <span>Scene {currentScene + 1} of {scenes.length}</span>
              <span className="text-slate-300">•</span>
              <span className="text-[#173f32]">{scenes[currentScene].title}</span>
            </div>

            <div className="flex items-center gap-1.5">
              {scenes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => selectScene(i)}
                  className={`h-2 rounded-full transition-all ${
                    currentScene === i 
                      ? "w-8 bg-[#173f32]" 
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Jump to scene ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
