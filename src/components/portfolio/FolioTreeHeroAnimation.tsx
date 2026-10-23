"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  Droplets, 
  ArrowRight,
  ShieldCheck,
  X
} from "lucide-react";
import { FolioVedaLogo } from "@/components/ui/Logo";

export function FolioTreeHeroAnimation() {
  // Stages:
  // 0: Planting the Seed
  // 1: Watering with Data (Name, Experience, Skills, Work, Gains)
  // 2: Tree Growing Full (Trunk, branches, foliage)
  // 3: Red Apples Blooming
  // 4: Apple Falls & Live Portfolio Pops Up!
  const [stage, setStage] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showPortfolioModal, setShowPortfolioModal] = useState<boolean>(false);
  const [droppedApple, setDroppedApple] = useState<boolean>(false);

  // Auto-advancing timeline
  useEffect(() => {
    if (!isPlaying) return;

    let timer: NodeJS.Timeout;

    if (stage === 0) {
      // Planting seed (lasts 2.5s)
      setShowPortfolioModal(false);
      setDroppedApple(false);
      timer = setTimeout(() => setStage(1), 2600);
    } else if (stage === 1) {
      // Watering information droplets (lasts 3.2s)
      timer = setTimeout(() => setStage(2), 3400);
    } else if (stage === 2) {
      // Tree grows full (lasts 3s)
      timer = setTimeout(() => setStage(3), 3200);
    } else if (stage === 3) {
      // Red apples bloom (lasts 2s)
      timer = setTimeout(() => {
        setStage(4);
        setDroppedApple(true);
      }, 2200);
    } else if (stage === 4) {
      // Apple drops, then popup appears after 600ms
      const popTimer = setTimeout(() => {
        setShowPortfolioModal(true);
      }, 700);

      // Reset cycle after 9 seconds of showing the popup
      timer = setTimeout(() => {
        setShowPortfolioModal(false);
        setDroppedApple(false);
        setStage(0);
      }, 9500);

      return () => {
        clearTimeout(timer);
        clearTimeout(popTimer);
      };
    }

    return () => clearTimeout(timer);
  }, [stage, isPlaying]);

  const handleReplay = () => {
    setShowPortfolioModal(false);
    setDroppedApple(false);
    setStage(0);
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto my-8 select-none">
      
      {/* Container Frame with 60-30-10 palette */}
      <div className="rounded-3xl bg-white border-2 border-[#1E293B]/10 shadow-xl overflow-hidden relative">
        
        {/* Top Control Bar */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#991B1B] animate-pulse" />
            <span className="font-extrabold uppercase tracking-wider text-[#1E293B] text-[11px] font-sans">
              THE FOLIOVEDA GROWTH CYCLE
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-medium hidden sm:inline">
              {stage === 0 && "1. Stickman Plants the FolioVeda Seed"}
              {stage === 1 && "2. Watering with Identity, Skills & Experience"}
              {stage === 2 && "3. Sprouting into Full Portfolio Apple Tree"}
              {stage === 3 && "4. Bearing Red Crimson Career Fruits"}
              {stage === 4 && "5. Apple Falls → Live Portfolio Pop-up!"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition"
              title={isPlaying ? "Pause animation" : "Resume animation"}
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            </button>

            <button
              onClick={handleReplay}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold transition text-[11px]"
              title="Replay from seed planting"
            >
              <RotateCcw size={12} />
              <span>Replay</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            STAGE CANVAS (The Stickman, Soil, Seed, Watering & Tree)
            ========================================================================= */}
        <div className="relative h-[380px] sm:h-[420px] bg-gradient-to-b from-[#F8F9FA] via-white to-amber-50/20 p-6 flex items-center justify-center overflow-hidden">
          
          {/* Subtle Ambient Crimson Glow Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-500/5 blur-3xl rounded-full pointer-events-none" />

          {/* SVG World Canvas */}
          <svg 
            className="w-full h-full max-w-2xl overflow-visible" 
            viewBox="0 0 600 360"
          >
            <defs>
              <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#451A03" />
                <stop offset="50%" stopColor="#78350F" />
                <stop offset="100%" stopColor="#451A03" />
              </linearGradient>

              <linearGradient id="appleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="50%" stopColor="#991B1B" />
                <stop offset="100%" stopColor="#7F1D1D" />
              </linearGradient>

              <filter id="glowDrop" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Ground Soil Layer */}
            <path 
              d="M 20 310 Q 300 305 580 310 L 580 360 L 20 360 Z" 
              fill="#D97706" 
              opacity="0.15" 
            />
            <line x1="20" y1="310" x2="580" y2="310" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Soil Mound around planting point (x: 340, y: 310) */}
            <path 
              d="M 310 310 Q 340 298 370 310" 
              fill="#78350F" 
              stroke="#1E293B" 
              strokeWidth="2.5" 
            />

            {/* ===================================================================
                1. THE STICKMAN
                =================================================================== */}
            <g 
              className="transition-all duration-700 ease-out"
              transform={
                stage === 0
                  ? "translate(220, 215)" // Kneeling by planting mound
                  : stage === 1
                  ? "translate(180, 190)" // Standing watering
                  : "translate(110, 200)" // Stepping back watching in awe
              }
            >
              {/* Stickman Head */}
              <circle cx="20" cy="20" r="14" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
              
              {/* Stickman Friendly Face */}
              <circle cx="16" cy="18" r="1.5" fill="#1E293B" />
              <circle cx="24" cy="18" r="1.5" fill="#1E293B" />
              <path 
                d={stage >= 2 ? "M 16 24 Q 20 28 24 24" : "M 16 23 Q 20 26 24 23"} 
                stroke="#1E293B" 
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round" 
              />

              {/* Stickman Body & Limbs */}
              {stage === 0 ? (
                // Kneeling pose planting seed
                <g>
                  {/* Spine */}
                  <line x1="20" y1="34" x2="25" y2="65" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Arms reaching down holding seed */}
                  <path d="M 22 42 L 45 60 L 70 78" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  {/* Kneeling Legs */}
                  <path d="M 25 65 L 10 80 L 35 95" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M 25 65 L 35 80 L 50 95" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </g>
              ) : stage === 1 ? (
                // Standing pose holding watering can
                <g>
                  {/* Spine */}
                  <line x1="20" y1="34" x2="20" y2="72" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Legs standing */}
                  <line x1="20" y1="72" x2="10" y2="120" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="20" y1="72" x2="30" y2="120" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Arms holding watering can tilted */}
                  <path d="M 20 44 L 45 42 L 70 50" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  
                  {/* Watering Can */}
                  <g transform="translate(68, 38) rotate(25)">
                    <rect x="0" y="0" width="30" height="20" rx="3" fill="#991B1B" stroke="#1E293B" strokeWidth="2" />
                    {/* Spout */}
                    <line x1="30" y1="14" x2="48" y2="22" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
                    {/* Rose head */}
                    <ellipse cx="50" cy="24" rx="4" ry="6" fill="#1E293B" />
                    {/* Handle */}
                    <path d="M 0 4 Q -12 10 0 16" fill="none" stroke="#1E293B" strokeWidth="2" />
                  </g>
                </g>
              ) : (
                // Proud / Awe pose (hands on hips watching the tree bloom)
                <g>
                  {/* Spine */}
                  <line x1="20" y1="34" x2="20" y2="70" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Legs */}
                  <line x1="20" y1="70" x2="8" y2="110" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="20" y1="70" x2="32" y2="110" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Hands on hips */}
                  <path d="M 20 44 L 6 54 L 16 64" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 20 44 L 34 54 L 24 64" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                </g>
              )}
            </g>

            {/* ===================================================================
                2. THE SEED (FolioVeda Logo Mark)
                =================================================================== */}
            {stage === 0 && (
              <g transform="translate(332, 296)" className="animate-bounce">
                {/* Glowing Aura */}
                <circle cx="8" cy="8" r="14" fill="#991B1B" opacity="0.25" filter="url(#glowDrop)" />
                {/* Seed Chassis */}
                <circle cx="8" cy="8" r="8" fill="#991B1B" stroke="#1E293B" strokeWidth="2" />
                {/* Gold Core Spark */}
                <circle cx="8" cy="8" r="3" fill="#FDE047" />
              </g>
            )}

            {/* ===================================================================
                3. WATERING DROPLETS WITH USER INFORMATION
                =================================================================== */}
            {stage === 1 && (
              <g className="animate-fade-in">
                {/* Water Streams pouring from watering can */}
                {[
                  { text: "Identity & Name", x: 280, y: 220, delay: "0s" },
                  { text: "Work Experience", x: 300, y: 240, delay: "0.2s" },
                  { text: "Technical Skills", x: 320, y: 260, delay: "0.4s" },
                  { text: "Verified Projects", x: 335, y: 275, delay: "0.6s" },
                  { text: "Career Metrics", x: 345, y: 290, delay: "0.8s" },
                ].map((drop, i) => (
                  <g key={i} className="animate-bounce" style={{ animationDelay: drop.delay }}>
                    {/* Water Droplet */}
                    <circle cx={drop.x} cy={drop.y} r="5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
                    {/* Label Tag */}
                    <rect 
                      x={drop.x + 8} 
                      y={drop.y - 8} 
                      width="92" 
                      height="16" 
                      rx="4" 
                      fill="#FFFFFF" 
                      stroke="#0284C7" 
                      strokeWidth="1" 
                    />
                    <text 
                      x={drop.x + 13} 
                      y={drop.y + 4} 
                      fill="#0369A1" 
                      fontSize="8" 
                      fontFamily="sans-serif" 
                      fontWeight="bold"
                    >
                      💧 {drop.text}
                    </text>
                  </g>
                ))}
              </g>
            )}

            {/* ===================================================================
                4. THE MAJESTIC APPLE TREE (Grows in stage 2, 3, 4)
                =================================================================== */}
            {stage >= 2 && (
              <g className="transition-all duration-1000 ease-out">
                {/* Strong Oak/Apple Trunk */}
                <path 
                  d="M 330 310 C 330 260, 320 220, 310 180 C 310 150, 330 130, 340 100 C 350 130, 370 150, 370 180 C 360 220, 350 260, 350 310 Z" 
                  fill="url(#trunkGrad)" 
                  stroke="#1E293B" 
                  strokeWidth="3" 
                />

                {/* Main Branches */}
                {/* Left Branch */}
                <path 
                  d="M 320 210 C 270 190, 230 160, 200 130" 
                  stroke="url(#trunkGrad)" 
                  strokeWidth="8" 
                  strokeLinecap="round" 
                  fill="none" 
                />
                <path 
                  d="M 250 180 C 240 140, 220 120, 190 100" 
                  stroke="url(#trunkGrad)" 
                  strokeWidth="5" 
                  strokeLinecap="round" 
                  fill="none" 
                />

                {/* Right Branch */}
                <path 
                  d="M 360 210 C 410 190, 450 160, 480 130" 
                  stroke="url(#trunkGrad)" 
                  strokeWidth="8" 
                  strokeLinecap="round" 
                  fill="none" 
                />
                <path 
                  d="M 430 180 C 440 140, 460 120, 490 100" 
                  stroke="url(#trunkGrad)" 
                  strokeWidth="5" 
                  strokeLinecap="round" 
                  fill="none" 
                />

                {/* Lush Emerald Green Leaves Canopy Clusters */}
                {/* Center Cluster */}
                <ellipse cx="340" cy="90" rx="65" ry="45" fill="#15803D" stroke="#1E293B" strokeWidth="2.5" />
                <ellipse cx="340" cy="75" rx="50" ry="35" fill="#22C55E" opacity="0.8" />
                
                {/* Left Canopy */}
                <ellipse cx="230" cy="120" rx="55" ry="40" fill="#15803D" stroke="#1E293B" strokeWidth="2.5" />
                <ellipse cx="230" cy="110" rx="42" ry="30" fill="#22C55E" opacity="0.8" />
                
                {/* Far Left Canopy */}
                <ellipse cx="170" cy="110" rx="40" ry="30" fill="#166534" stroke="#1E293B" strokeWidth="2.5" />

                {/* Right Canopy */}
                <ellipse cx="450" cy="120" rx="55" ry="40" fill="#15803D" stroke="#1E293B" strokeWidth="2.5" />
                <ellipse cx="450" cy="110" rx="42" ry="30" fill="#22C55E" opacity="0.8" />

                {/* Far Right Canopy */}
                <ellipse cx="510" cy="110" rx="40" ry="30" fill="#166534" stroke="#1E293B" strokeWidth="2.5" />

                {/* Top Crown Canopy */}
                <ellipse cx="340" cy="50" rx="45" ry="30" fill="#16A34A" stroke="#1E293B" strokeWidth="2" />
              </g>
            )}

            {/* ===================================================================
                5. RED APPLES BLOOMING ON THE BRANCHES (Stage 3 & 4)
                =================================================================== */}
            {stage >= 3 && (
              <g className="animate-fade-in">
                {/* Static Apples Hanging on the Tree */}
                {[
                  { cx: 220, cy: 130 },
                  { cx: 270, cy: 110 },
                  { cx: 330, cy: 80 },
                  { cx: 380, cy: 75 },
                  { cx: 440, cy: 105 },
                  { cx: 480, cy: 135 },
                  { cx: 180, cy: 125 },
                ].map((apple, i) => (
                  <g key={i}>
                    {/* Apple Stem */}
                    <path d={`M ${apple.cx} ${apple.cy - 7} Q ${apple.cx + 2} ${apple.cy - 12} ${apple.cx + 4} ${apple.cy - 14}`} stroke="#451A03" strokeWidth="1.5" fill="none" />
                    {/* Apple Body */}
                    <circle cx={apple.cx} cy={apple.cy} r="8" fill="url(#appleGrad)" stroke="#1E293B" strokeWidth="1.5" />
                    {/* Highlight Shine */}
                    <circle cx={apple.cx - 2.5} cy={apple.cy - 2.5} r="2" fill="#FFFFFF" opacity="0.6" />
                  </g>
                ))}
              </g>
            )}

            {/* ===================================================================
                6. THE FALLING APPLE (Stage 4)
                =================================================================== */}
            {stage === 4 && (
              <g>
                {/* The Falling Apple animating smoothly down from branch to ground */}
                <g 
                  className={droppedApple ? "transition-all duration-700 ease-in" : ""}
                  style={{
                    transform: droppedApple ? "translate(0px, 175px)" : "translate(0px, 0px)",
                  }}
                >
                  {/* Stem */}
                  <path d="M 330 98 Q 332 93 334 91" stroke="#451A03" strokeWidth="1.5" fill="none" />
                  {/* Glowing Apple */}
                  <circle cx="330" cy="105" r="10" fill="url(#appleGrad)" stroke="#1E293B" strokeWidth="2" filter="url(#glowDrop)" />
                  <circle cx="327" cy="102" r="2.5" fill="#FFFFFF" opacity="0.8" />
                </g>

                {/* Ground Impact Ripple when apple hits ground */}
                {droppedApple && (
                  <g transform="translate(330, 290)">
                    <ellipse cx="0" cy="0" rx="25" ry="8" fill="none" stroke="#DC2626" strokeWidth="2" className="animate-ping" />
                    <ellipse cx="0" cy="0" rx="15" ry="5" fill="none" stroke="#991B1B" strokeWidth="1.5" />
                  </g>
                )}
              </g>
            )}

          </svg>

          {/* =========================================================================
              THE LIVE PORTFOLIO POP-UP MODAL (Appears after apple lands on ground!)
              ========================================================================= */}
          {showPortfolioModal && (
            <div 
              role="dialog"
              aria-modal="true"
              className="absolute inset-4 sm:inset-6 z-30 bg-white/95 backdrop-blur-xl rounded-2xl border-2 border-[#991B1B] shadow-2xl p-6 flex flex-col justify-between animate-in zoom-in-95 duration-500"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#991B1B] text-white flex items-center justify-center font-extrabold text-xs">
                    FV
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-[#1E293B]">
                      Alex Rivera — Live Portfolio
                    </span>
                    <span className="text-[10px] text-emerald-600 font-mono font-bold ml-2">
                      ● folioveda.me/alex
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#991B1B] bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                    Grown From Verified Skills
                  </span>
                  <button
                    onClick={() => setShowPortfolioModal(false)}
                    className="p-1 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Portfolio Body Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-auto py-2">
                
                {/* Profile Card */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center shadow">
                    AR
                  </div>
                  <h4 className="font-extrabold text-sm text-[#1E293B]">Alex Rivera</h4>
                  <p className="text-[11px] text-slate-600 font-bold">Staff Distributed Systems Engineer</p>
                  <div className="text-[10px] font-bold text-slate-500">
                    ex-Stripe • 400M Events/Day
                  </div>
                </div>

                {/* Verified Metrics Fruit */}
                <div className="p-4 rounded-xl bg-red-50/50 border border-red-200 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#991B1B]">
                    BEARING FRUIT
                  </span>
                  <div className="text-xl font-extrabold text-[#1E293B]">
                    99.999% SLA
                  </div>
                  <p className="text-[11px] text-slate-600 font-normal">
                    Real Git commits and throughput metrics verified with zero hallucinations.
                  </p>
                </div>

                {/* Flagship Project */}
                <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
                  <span className="text-[10px] font-bold text-emerald-400 font-mono">
                    FEATURED PROJECT
                  </span>
                  <div className="text-sm font-extrabold text-white">
                    ConsensusRaft-Core
                  </div>
                  <p className="text-[11px] text-slate-300 font-normal">
                    14.2k GitHub Stars • Pure Rust distributed ledger engine.
                  </p>
                </div>

              </div>

              {/* Footer CTA Bar */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-slate-500 font-medium text-center sm:text-left">
                  Your seeds of skills and experience bear real, verified fruit with FolioVeda.
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReplay}
                    className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition flex items-center gap-1"
                  >
                    <RotateCcw size={12} /> Replay
                  </button>

                  <Link
                    href="/onboarding"
                    className="shimmer-button px-5 py-1.5 rounded-full bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-extrabold transition shadow-md shadow-[#991B1B]/20 flex items-center gap-1"
                  >
                    <span>Grow Your Portfolio Free</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Bottom Interactive Growth Bar */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Growth Stage:</span>
            <span className="text-[#991B1B] font-extrabold">
              {stage === 0 && "🌱 Seed Planted"}
              {stage === 1 && "💧 Watering Data"}
              {stage === 2 && "🌳 Tree Flourishing"}
              {stage === 3 && "🍎 Apples Blooming"}
              {stage === 4 && "🚀 Live Portfolio Ready!"}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((s) => (
              <button
                key={s}
                onClick={() => {
                  setStage(s);
                  if (s === 4) {
                    setDroppedApple(true);
                    setShowPortfolioModal(true);
                  } else {
                    setShowPortfolioModal(false);
                    setDroppedApple(false);
                  }
                }}
                className={`h-2 rounded-full transition-all ${
                  stage === s 
                    ? "w-8 bg-[#991B1B]" 
                    : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
                title={`Jump to stage ${s + 1}`}
              />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
