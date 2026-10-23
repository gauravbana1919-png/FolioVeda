"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Award,
  Maximize2,
  Tv,
  CheckCircle2
} from "lucide-react";

export function RedBullStyleCommercial() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [wiggleSeed, setWiggleSeed] = useState<number>(0);

  // 4 Scenes mirroring classic Red Bull commercials:
  // 1. The Desperate Job Search (Buried in flat resumes, rejected by grumpy boss)
  // 2. The Flying Colleague (The guy with a live portfolio and ATS resume soars in with wings!)
  // 3. The FolioVeda Spark (He gives him FolioVeda; GitHub syncs, sprouts wings)
  // 4. Soaring to the Dream Job (Both fly past the rejection shredder, hired on the spot!)
  const scenes = [
    {
      id: 0,
      title: "ACT 1: THE RESUME GRAVEYARD",
      tagline: "500 applications sent. Zero callbacks. Rejected by the ATS shredder.",
      audioText: "Narrator: Meet Arthur. Arthur has great skills, but his flat PDF resume is currently trapped in the dreaded corporate shredder.",
      soundEffect: "CRUMPLE! STAMP! ❌",
    },
    {
      id: 1,
      title: "ACT 2: ENTER THE WINGED APPLICANT",
      tagline: "Along flies Walter with his live portfolio and ATS-tailored resume!",
      audioText: "Narrator: But wait! Here comes Walter. Walter doesn't crawl through HR portals. Walter has a live interactive FolioVeda portfolio!",
      soundEffect: "WHOOSH! FLAP FLAP! 🪽",
    },
    {
      id: 2,
      title: "ACT 3: FOLIOVEDA GIVES YOU WIIINGS!",
      tagline: "Arthur discovers FolioVeda. Connects GitHub in 120 seconds. SPROUTS WINGS!",
      audioText: "Walter: 'Cheer up, Arthur! FolioVeda syncs your real code and gives your career wiiings!' *ZAAAP!*",
      soundEffect: "ZAP! EUREKA! ⚡",
    },
    {
      id: 3,
      title: "ACT 4: SOARING STRAIGHT TO THE DREAM JOB!",
      tagline: "Both fly over the recruiter's desk. Jaw drops to the floor. Hired on the spot!",
      audioText: "Recruiter: 'A live interactive portfolio?! Hired immediately!' Narrator: FolioVeda gives your career wiiings!",
      soundEffect: "DING! HIRED! 🏆",
    },
  ];

  // Hand-drawn line boil animation loop (the signature Red Bull sketchy wobble)
  useEffect(() => {
    const boilTimer = setInterval(() => {
      setWiggleSeed((prev) => (prev + 1) % 4);
    }, 150); // 6.6 fps line boil for authentic sketchy cartoon feel
    return () => clearInterval(boilTimer);
  }, []);

  // Main playback timer
  useEffect(() => {
    if (!isPlaying) return;

    const interval = 50;
    const durationPerScene = 7000; // 7 seconds per scene
    const step = 100 / (durationPerScene / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentFrame((f) => (f + 1) % scenes.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, currentFrame, scenes.length]);

  const jumpToScene = (idx: number) => {
    setCurrentFrame(idx);
    setProgress(0);
  };

  // Subtle hand-drawn jitter offsets based on wiggleSeed
  const jitterX = [0, 1.2, -0.8, 0.5][wiggleSeed];
  const jitterY = [0, -0.9, 1.1, -0.6][wiggleSeed];

  return (
    <section 
      id="career-story"
      className="py-20 px-6 sm:px-10 max-w-6xl mx-auto scroll-mt-24 select-none"
    >
      {/* Top Tagline */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-extrabold shadow-2xs mb-4">
          <Tv size={14} className="text-[#991B1B]" />
          <span className="uppercase tracking-widest text-[11px]">CLASSIC ANIMATED COMMERCIAL</span>
          <span className="text-amber-400">•</span>
          <span className="text-[#991B1B]">Red Bull Inspired Hand-Drawn Cartoon</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1E293B] leading-tight mb-3">
          FolioVeda Gives Your Career Wiiings.
        </h2>
        <p className="text-base text-slate-600 font-normal max-w-xl mx-auto">
          Watch our hand-drawn commercial: Why applying with a flat PDF gets you stuck, while a live portfolio lets you fly straight to the offer letter.
        </p>
      </div>

      {/* =========================================================================
          THE RED BULL STYLE SKETCHBOOK TV PLAYER
          ========================================================================= */}
      <div className="rounded-3xl bg-[#FEFDF8] border-4 border-[#1E293B] shadow-[8px_8px_0px_0px_#1E293B] overflow-hidden flex flex-col relative">
        
        {/* Retro TV Header Bar */}
        <div className="bg-[#1E293B] text-white px-6 py-3 flex items-center justify-between border-b-2 border-[#1E293B]">
          
          {/* Channel & Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 rounded-lg bg-[#991B1B] hover:bg-[#7F1D1D] text-white flex items-center justify-center transition shadow-sm font-bold text-xs"
              title={isPlaying ? "Pause cartoon" : "Play cartoon"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
            </button>

            <button
              onClick={() => {
                setCurrentFrame(0);
                setProgress(0);
                setIsPlaying(true);
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-xs font-bold"
              title="Replay commercial from start"
            >
              <RotateCcw size={14} />
            </button>

            <div className="h-4 w-px bg-slate-700 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-mono font-bold tracking-wider text-amber-300">
                ON AIR • {scenes[currentFrame].title}
              </span>
            </div>
          </div>

          {/* Act Switchers */}
          <div className="flex items-center gap-1">
            {scenes.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => jumpToScene(idx)}
                className={`px-3 py-1 rounded-md text-xs font-mono font-bold transition-all ${
                  currentFrame === idx
                    ? "bg-amber-300 text-[#1E293B] shadow-sm scale-105"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>

        </div>

        {/* Video Scrubber Line */}
        <div className="w-full h-1.5 bg-amber-100 relative">
          <div 
            className="h-full bg-[#991B1B] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* =========================================================================
            SKETCH CANVAS STAGE (Hand-Drawn Charcoal & Watercolor Cartoon)
            ========================================================================= */}
        <div className="relative min-h-[480px] sm:min-h-[520px] bg-[#FEFDF8] p-6 sm:p-12 flex flex-col justify-between overflow-hidden">
          
          {/* Subtle Sketchbook Grid / Paper Grain Background Texture */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: "radial-gradient(#1E293B 0.75px, transparent 0.75px)",
              backgroundSize: "20px 20px"
            }}
          />

          {/* Scene Kicker Banner */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 border-b-2 border-dashed border-[#1E293B]/20 pb-4">
            <div>
              <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-[#991B1B] bg-red-100/80 px-2.5 py-0.5 rounded border border-[#991B1B]/30">
                SCENE 0{currentFrame + 1} OF 04
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#1E293B] mt-1 font-sans">
                {scenes[currentFrame].tagline}
              </h3>
            </div>
            <div className="font-mono text-xs font-extrabold text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full shadow-2xs rotate-[-2deg]">
              {scenes[currentFrame].soundEffect}
            </div>
          </div>

          {/* =======================================================================
              ANIMATED CARTOON ILLUSTRATIONS (RED BULL STYLE SVG CHARACTERS)
              ======================================================================= */}
          <div className="relative z-10 my-auto py-6 flex items-center justify-center">

            {/* -------------------------------------------------------------------
                ACT 1: ARTHUR BURIED IN RESUMES & GETTING STAMPED REJECTED
                ------------------------------------------------------------------- */}
            {currentFrame === 0 && (
              <div 
                className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-around gap-8"
                style={{ transform: `translate(${jitterX}px, ${jitterY}px)` }}
              >
                {/* Arthur: Big Nose, Slumped Shoulders, Sweating */}
                <div className="flex flex-col items-center text-center relative">
                  
                  {/* Thought Bubble */}
                  <div className="absolute -top-14 -left-10 sm:-left-20 bg-white border-2 border-[#1E293B] rounded-2xl p-3 shadow-md rotate-[-4deg] max-w-[200px]">
                    <p className="text-xs font-bold text-[#1E293B] leading-tight">
                      &ldquo;80 applications... not a single human saw my code!&rdquo; 😢
                    </p>
                    <div className="absolute -bottom-2 right-6 w-3 h-3 bg-white border-b-2 border-r-2 border-[#1E293B] rotate-45" />
                  </div>

                  <svg className="w-56 h-56 overflow-visible" viewBox="0 0 200 200">
                    {/* Giant pile of papers under him */}
                    <path d="M20 180 Q100 160 180 180 L190 200 L10 200 Z" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2.5" />
                    <path d="M40 170 Q100 150 160 170" stroke="#1E293B" strokeWidth="2" strokeDasharray="4,2" />
                    
                    {/* Arthur's body (slumped desk pose) */}
                    <path d="M75 140 C65 160, 60 190, 60 200 L130 200 C130 190, 125 160, 115 140 Z" fill="#93C5FD" stroke="#1E293B" strokeWidth="3" />
                    
                    {/* Desk */}
                    <rect x="40" y="165" width="120" height="8" rx="2" fill="#78350F" stroke="#1E293B" strokeWidth="2" />
                    
                    {/* Arthur's Head: Signature Red Bull giant potato nose */}
                    <ellipse cx="95" cy="95" rx="30" ry="34" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
                    {/* Messy hair */}
                    <path d="M70 75 Q95 50 120 70 Q130 60 135 80 Q110 70 85 85 Z" fill="#475569" stroke="#1E293B" strokeWidth="2.5" />
                    
                    {/* Giant cartoon nose */}
                    <path d="M98 90 C125 90, 125 115, 95 115" fill="#FDBA74" stroke="#1E293B" strokeWidth="3" />
                    
                    {/* Sad droopy cartoon eyes */}
                    <circle cx="82" cy="88" r="3.5" fill="#1E293B" />
                    <circle cx="98" cy="85" r="3.5" fill="#1E293B" />
                    {/* Slanted sad eyebrows */}
                    <path d="M74 80 L88 85" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M94 82 L106 77" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                    
                    {/* Quivering sad mouth */}
                    <path d="M80 125 Q95 115 110 125" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    
                    {/* Sweat drop flying */}
                    <path d="M125 80 C125 75, 132 82, 132 88 C132 92, 125 92, 125 88 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
                  </svg>
                  <span className="font-mono text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                    Arthur (Static PDF Only)
                  </span>
                </div>

                {/* The Recruiter's Robot Stamp: Giant Heavy Wooden Stamp */}
                <div className="flex flex-col items-center text-center">
                  <svg className="w-56 h-56 overflow-visible" viewBox="0 0 200 200">
                    {/* Giant Hand holding a wooden stamp */}
                    <path d="M110 20 L110 70 L90 70 L90 20 Z" fill="#78350F" stroke="#1E293B" strokeWidth="3" />
                    <ellipse cx="100" cy="20" rx="18" ry="10" fill="#92400E" stroke="#1E293B" strokeWidth="3" />
                    <rect x="65" y="70" width="70" height="24" rx="4" fill="#B91C1C" stroke="#1E293B" strokeWidth="3" />
                    
                    {/* Stamp Impression Paper */}
                    <rect x="40" y="105" width="120" height="80" rx="4" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
                    <line x1="55" y1="125" x2="145" y2="125" stroke="#CBD5E1" strokeWidth="3" />
                    <line x1="55" y1="140" x2="130" y2="140" stroke="#CBD5E1" strokeWidth="3" />
                    <line x1="55" y1="155" x2="140" y2="155" stroke="#CBD5E1" strokeWidth="3" />

                    {/* RED STAMP "REJECTED (NO LIVE LINK)" */}
                    <g transform="rotate(-12 100 145)">
                      <rect x="52" y="130" width="105" height="30" rx="3" fill="#FEE2E2" stroke="#DC2626" strokeWidth="3" strokeDasharray="3,1" />
                      <text x="58" y="150" fill="#DC2626" fontFamily="sans-serif" fontSize="13" fontWeight="900" letterSpacing="1">
                        ATS REJECT
                      </text>
                    </g>
                  </svg>
                  <span className="font-mono text-xs font-bold text-red-700 bg-red-100 px-3 py-0.5 rounded-full border border-red-300">
                    ATS Scanner: 0% Parsed
                  </span>
                </div>

              </div>
            )}

            {/* -------------------------------------------------------------------
                ACT 2: ENTER WALTER WITH LIVE PORTFOLIO & FLAPPING WINGS
                ------------------------------------------------------------------- */}
            {currentFrame === 1 && (
              <div 
                className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-around gap-8"
                style={{ transform: `translate(${jitterX}px, ${jitterY}px)` }}
              >
                {/* Walter Flying in with Red Bull style sketch wings */}
                <div className="flex flex-col items-center text-center relative">
                  
                  {/* Speech Balloon */}
                  <div className="absolute -top-12 -right-6 bg-white border-2 border-[#1E293B] rounded-2xl p-3 shadow-md rotate-[3deg] max-w-[220px]">
                    <p className="text-xs font-bold text-[#1E293B] leading-tight">
                      &ldquo;Why crawl when you can fly with a Live Portfolio?!&rdquo; 🪽
                    </p>
                    <div className="absolute -bottom-2 left-6 w-3 h-3 bg-white border-b-2 border-r-2 border-[#1E293B] rotate-45" />
                  </div>

                  <svg className="w-64 h-64 overflow-visible" viewBox="0 0 220 220">
                    {/* Left Sketch Wing (Flapping) */}
                    <g className="animate-bounce" style={{ transformOrigin: "80px 100px" }}>
                      <path 
                        d="M80 100 C50 60, 10 70, 0 100 C15 110, 30 115, 45 105 C30 120, 45 130, 60 115 C50 130, 70 135, 80 110 Z" 
                        fill="#FFFFFF" 
                        stroke="#1E293B" 
                        strokeWidth="3" 
                      />
                      <path d="M30 90 Q50 95 70 105" stroke="#991B1B" strokeWidth="2" strokeDasharray="3,2" />
                    </g>

                    {/* Right Sketch Wing (Flapping) */}
                    <g className="animate-bounce" style={{ transformOrigin: "140px 100px" }}>
                      <path 
                        d="M140 100 C170 60, 210 70, 220 100 C205 110, 190 115, 175 105 C190 120, 175 130, 160 115 C170 130, 150 135, 140 110 Z" 
                        fill="#FFFFFF" 
                        stroke="#1E293B" 
                        strokeWidth="3" 
                      />
                      <path d="M190 90 Q170 95 150 105" stroke="#991B1B" strokeWidth="2" strokeDasharray="3,2" />
                    </g>

                    {/* Walter's Flying Body */}
                    <path d="M95 110 L80 180 L140 180 L125 110 Z" fill="#991B1B" stroke="#1E293B" strokeWidth="3" />

                    {/* Walter's Head: Stylish glasses, confident smile */}
                    <ellipse cx="110" cy="75" rx="26" ry="30" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
                    <path d="M90 60 Q110 40 135 55 Q140 50 145 65 Q125 55 105 70 Z" fill="#1E293B" stroke="#1E293B" strokeWidth="2" />
                    
                    {/* Glasses */}
                    <circle cx="102" cy="72" r="7" stroke="#1E293B" strokeWidth="2.5" fill="none" />
                    <circle cx="120" cy="72" r="7" stroke="#1E293B" strokeWidth="2.5" fill="none" />
                    <line x1="109" y1="72" x2="113" y2="72" stroke="#1E293B" strokeWidth="2.5" />
                    
                    {/* Big confident grin */}
                    <path d="M102 92 Q112 104 124 92" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    
                    {/* Glowing Live Laptop in hands */}
                    <g transform="translate(75, 125)">
                      <rect x="0" y="0" width="70" height="42" rx="4" fill="#0F172A" stroke="#1E293B" strokeWidth="2.5" />
                      <rect x="4" y="4" width="62" height="34" rx="2" fill="#1E293B" />
                      <text x="8" y="16" fill="#34D399" fontSize="7" fontFamily="monospace" fontWeight="bold">folioveda.me</text>
                      <text x="8" y="26" fill="#F8FAFC" fontSize="6" fontFamily="monospace">✓ 99.9% ATS</text>
                      <path d="M-5 42 L75 42 L70 48 L-2 48 Z" fill="#CBD5E1" stroke="#1E293B" strokeWidth="2" />
                    </g>
                  </svg>

                  <span className="font-mono text-xs font-extrabold text-[#991B1B] uppercase tracking-wider">
                    Walter (FolioVeda Pioneer with Wings)
                  </span>
                </div>

                {/* Recruiter's Reaction: Jaw Dropped */}
                <div className="flex flex-col items-center text-center">
                  <div className="bg-emerald-50 border-2 border-emerald-500 rounded-3xl p-5 shadow-lg space-y-2 max-w-[220px]">
                    <span className="text-2xl">😲</span>
                    <h4 className="font-extrabold text-sm text-emerald-900">Recruiter&apos;s Jaw Drops!</h4>
                    <p className="text-xs text-emerald-800 font-medium">
                      &ldquo;Wait, I can click his real code and test the live UI at 60fps?! This guy is hired!&rdquo;
                    </p>
                    <div className="text-[11px] font-mono font-bold text-white bg-emerald-600 px-2 py-0.5 rounded-full inline-block">
                      Offer: $195k / yr
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* -------------------------------------------------------------------
                ACT 3: ARTHUR DRINKS / ACTIVATES FOLIOVEDA & SPROUTS WINGS
                ------------------------------------------------------------------- */}
            {currentFrame === 2 && (
              <div 
                className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-around gap-8"
                style={{ transform: `translate(${jitterX}px, ${jitterY}px)` }}
              >
                {/* Walter handing FolioVeda to Arthur */}
                <div className="flex flex-col items-center text-center relative">
                  
                  {/* Energy Sparkle Blast */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 font-extrabold text-amber-500 text-3xl animate-bounce">
                    ⚡ ZZZAAAP! ⚡
                  </div>

                  <svg className="w-64 h-64 overflow-visible" viewBox="0 0 220 220">
                    {/* Arthur transforming: Wings sprouting out with energy bursts! */}
                    <g className="animate-pulse">
                      {/* Left sprouting wing */}
                      <path d="M70 110 C40 70, 0 80, -10 110 C5 120, 20 125, 35 115 Z" fill="#FEE2E2" stroke="#991B1B" strokeWidth="3" />
                      {/* Right sprouting wing */}
                      <path d="M150 110 C180 70, 220 80, 230 110 C215 120, 200 125, 185 115 Z" fill="#FEE2E2" stroke="#991B1B" strokeWidth="3" />
                    </g>

                    {/* Arthur's body lifting off the ground */}
                    <path d="M90 120 L80 180 L140 180 L130 120 Z" fill="#93C5FD" stroke="#1E293B" strokeWidth="3" />

                    {/* Arthur's Face: HUGE eyes wide open, ecstatic smile! */}
                    <ellipse cx="110" cy="80" rx="28" ry="32" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
                    
                    {/* Big Potato Nose */}
                    <path d="M112 75 C135 75, 135 98, 110 98" fill="#FDBA74" stroke="#1E293B" strokeWidth="3" />

                    {/* Wide excited eyes */}
                    <circle cx="98" cy="74" r="5" fill="#1E293B" />
                    <circle cx="118" cy="74" r="5" fill="#1E293B" />
                    <circle cx="100" cy="72" r="1.5" fill="#FFFFFF" />
                    <circle cx="120" cy="72" r="1.5" fill="#FFFFFF" />

                    {/* Giant open mouth laughing */}
                    <path d="M98 102 C108 120, 122 120, 126 102 Z" fill="#991B1B" stroke="#1E293B" strokeWidth="2.5" />

                    {/* Golden FolioVeda Can/Pill in hand */}
                    <g transform="translate(135, 120) rotate(-15)">
                      <rect x="0" y="0" width="22" height="38" rx="6" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.5" />
                      <text x="3" y="16" fill="#FFFFFF" fontSize="6" fontWeight="bold">FOLIO</text>
                      <text x="4" y="24" fill="#991B1B" fontSize="6" fontWeight="bold">VEDA</text>
                      <circle cx="11" cy="30" r="3" fill="#DC2626" />
                    </g>
                  </svg>

                  <span className="font-mono text-xs font-extrabold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                    Arthur Connects GitHub → Sprouts Wings!
                  </span>
                </div>

                {/* 120-Second Magic Breakdown */}
                <div className="space-y-3 max-w-[240px]">
                  <div className="p-3 bg-white rounded-2xl border-2 border-[#1E293B] shadow-sm space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#991B1B]">STEP 1: SYNC CODE</span>
                    <p className="text-xs text-slate-700 font-bold">Imports verified commits with zero hallucination.</p>
                  </div>
                  <div className="p-3 bg-white rounded-2xl border-2 border-[#1E293B] shadow-sm space-y-1">
                    <span className="text-[10px] font-mono font-bold text-emerald-700">STEP 2: ATS RESUME</span>
                    <p className="text-xs text-slate-700 font-bold">Single-column structured Markdown guarantees 99% ATS pass.</p>
                  </div>
                  <div className="p-3 bg-white rounded-2xl border-2 border-[#1E293B] shadow-sm space-y-1">
                    <span className="text-[10px] font-mono font-bold text-sky-700">STEP 3: LIVE WINGS</span>
                    <p className="text-xs text-slate-700 font-bold">Sub-50ms domain deployed to global Edge CDN.</p>
                  </div>
                </div>

              </div>
            )}

            {/* -------------------------------------------------------------------
                ACT 4: BOTH SOARING HIGH & HIRED TOGETHER
                ------------------------------------------------------------------- */}
            {currentFrame === 3 && (
              <div 
                className="w-full max-w-2xl flex flex-col items-center text-center space-y-6"
                style={{ transform: `translate(${jitterX}px, ${jitterY}px)` }}
              >
                {/* Floating Clouds & Flying Duo */}
                <div className="relative w-full max-w-lg h-60 flex items-center justify-center">
                  
                  {/* Fluffy cartoon clouds */}
                  <path d="M40 80 Q60 50 90 70 Q120 50 140 80 Q150 100 130 110 Q80 120 40 100 Z" fill="#E2E8F0" opacity="0.6" />
                  <path d="M300 60 Q320 30 350 50 Q380 30 400 60 Q410 80 390 90 Q340 100 300 80 Z" fill="#E2E8F0" opacity="0.6" />

                  {/* Confetti & Golden Stars */}
                  <span className="absolute top-2 left-10 text-2xl animate-spin">⭐</span>
                  <span className="absolute top-8 right-16 text-2xl animate-bounce">🎉</span>
                  <span className="absolute bottom-4 left-24 text-2xl animate-bounce">🚀</span>
                  <span className="absolute bottom-2 right-20 text-2xl animate-spin">✨</span>

                  {/* Arthur Flying (Left) */}
                  <div className="flex flex-col items-center animate-bounce mr-8">
                    <svg className="w-40 h-40 overflow-visible" viewBox="0 0 160 160">
                      {/* Flapping Wings */}
                      <path d="M40 80 C10 40, -10 50, -20 80 C-5 90, 10 95, 25 85 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
                      <path d="M120 80 C150 40, 170 50, 180 80 C165 90, 150 95, 135 85 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
                      <ellipse cx="80" cy="70" rx="22" ry="24" fill="#FED7AA" stroke="#1E293B" strokeWidth="2.5" />
                      <path d="M82 66 C100 66, 100 84, 80 84" fill="#FDBA74" stroke="#1E293B" strokeWidth="2.5" />
                      <circle cx="72" cy="65" r="3" fill="#1E293B" />
                      <circle cx="86" cy="65" r="3" fill="#1E293B" />
                      <path d="M72 88 Q80 96 90 88" stroke="#1E293B" strokeWidth="2" fill="none" />
                      <rect x="62" y="94" width="36" height="40" rx="4" fill="#93C5FD" stroke="#1E293B" strokeWidth="2.5" />
                      <g transform="translate(68, 134)">
                        <rect x="0" y="0" width="24" height="14" rx="2" fill="#10B981" />
                        <text x="2" y="10" fill="#FFFFFF" fontSize="6" fontWeight="bold">HIRED!</text>
                      </g>
                    </svg>
                    <span className="text-xs font-extrabold text-[#1E293B]">Arthur ($185k @ Stripe)</span>
                  </div>

                  {/* Walter Flying (Right) */}
                  <div className="flex flex-col items-center animate-bounce ml-8">
                    <svg className="w-40 h-40 overflow-visible" viewBox="0 0 160 160">
                      <path d="M40 80 C10 40, -10 50, -20 80 C-5 90, 10 95, 25 85 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
                      <path d="M120 80 C150 40, 170 50, 180 80 C165 90, 150 95, 135 85 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
                      <ellipse cx="80" cy="70" rx="22" ry="24" fill="#FED7AA" stroke="#1E293B" strokeWidth="2.5" />
                      <circle cx="74" cy="67" r="5" stroke="#1E293B" strokeWidth="2" fill="none" />
                      <circle cx="88" cy="67" r="5" stroke="#1E293B" strokeWidth="2" fill="none" />
                      <path d="M74 88 Q82 96 92 88" stroke="#1E293B" strokeWidth="2" fill="none" />
                      <rect x="62" y="94" width="36" height="40" rx="4" fill="#991B1B" stroke="#1E293B" strokeWidth="2.5" />
                      <g transform="translate(68, 134)">
                        <rect x="0" y="0" width="24" height="14" rx="2" fill="#10B981" />
                        <text x="2" y="10" fill="#FFFFFF" fontSize="6" fontWeight="bold">HIRED!</text>
                      </g>
                    </svg>
                    <span className="text-xs font-extrabold text-[#1E293B]">Walter ($195k @ Linear)</span>
                  </div>

                </div>

                {/* Celebratory Stinger */}
                <div className="space-y-2 max-w-lg">
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
                    FolioVeda Gives Your Career Wiiings!
                  </h4>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    Don&apos;t let your career get trapped under a 3-page generic PDF. Pair an ATS-optimized resume with a sub-50ms live portfolio domain and soar past the competition.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/onboarding"
                    className="shimmer-button bg-gradient-to-r from-[#991B1B] via-[#B91C1C] to-[#991B1B] hover:from-[#7F1D1D] hover:to-[#991B1B] text-white font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-[#991B1B]/30 hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <span>Get Your FolioVeda Wings — Free</span>
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    href="/styles"
                    className="bg-white hover:bg-slate-50 text-slate-800 border-2 border-[#1E293B] font-extrabold text-sm px-6 py-3.5 rounded-full shadow-[3px_3px_0px_0px_#1E293B] transition"
                  >
                    Explore 8 Portfolio Wings
                  </Link>
                </div>

              </div>
            )}

          </div>

          {/* =======================================================================
              SUBTITLE & AUDIO NARRATOR CAPTION BAR
              ======================================================================= */}
          <div className="relative z-10 pt-4 border-t-2 border-dashed border-[#1E293B]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 font-mono font-bold text-[#1E293B] bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs max-w-xl">
              <span className="text-sm">🎙️</span>
              <span className="truncate">{scenes[currentFrame].audioText}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-bold transition text-[11px]"
              >
                {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                <span>{isMuted ? "Sound Off" : "Sound On"}</span>
              </button>

              <Link
                href="/onboarding"
                className="font-bold text-[#991B1B] hover:underline flex items-center gap-1"
              >
                <span>Claim Your Wings</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
