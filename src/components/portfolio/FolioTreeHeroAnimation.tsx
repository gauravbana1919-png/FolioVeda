"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight,
  ShieldCheck,
  X,
  Droplets,
  Layers,
  ChevronRight,
  Maximize2
} from "lucide-react";

export function FolioTreeHeroAnimation() {
  // 5 Distinct Growth Phases:
  // 0: Planting Seed into Earth
  // 1: Adding Fertilizer (Nutrient particles penetrate soil)
  // 2: Watering with Data (Streams of Identity & Skills)
  // 3: Structured Tree Sprouts & Roots Deepen
  // 4: Crimson Apples Ripen & One Drops -> Live Portfolio Pops Up
  const [phase, setPhase] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showPortfolioModal, setShowPortfolioModal] = useState<boolean>(false);
  const [appleFalling, setAppleFalling] = useState<boolean>(false);
  const [appleLanded, setAppleLanded] = useState<boolean>(false);

  // Auto-play master loop
  useEffect(() => {
    if (!isPlaying) return;

    let timer: NodeJS.Timeout;

    if (phase === 0) {
      // 0: Planting Seed (lasts 2.5s)
      setShowPortfolioModal(false);
      setAppleFalling(false);
      setAppleLanded(false);
      timer = setTimeout(() => setPhase(1), 2600);
    } else if (phase === 1) {
      // 1: Adding Fertilizer (lasts 2.8s)
      timer = setTimeout(() => setPhase(2), 2900);
    } else if (phase === 2) {
      // 2: Watering Data (lasts 2.8s)
      timer = setTimeout(() => setPhase(3), 2900);
    } else if (phase === 3) {
      // 3: Structured Tree & Canopy Growth (lasts 3.2s)
      timer = setTimeout(() => {
        setPhase(4);
        // Start falling apple after canopy settles
        setTimeout(() => setAppleFalling(true), 600);
        setTimeout(() => setAppleLanded(true), 1300);
        setTimeout(() => setShowPortfolioModal(true), 1600);
      }, 3400);
    } else if (phase === 4) {
      // 4: Show Live Portfolio Showcase (lasts 9s before looping)
      timer = setTimeout(() => {
        setShowPortfolioModal(false);
        setAppleFalling(false);
        setAppleLanded(false);
        setPhase(0);
      }, 10000);
    }

    return () => clearTimeout(timer);
  }, [phase, isPlaying]);

  const jumpToPhase = (targetPhase: number) => {
    setPhase(targetPhase);
    if (targetPhase === 4) {
      setAppleFalling(true);
      setAppleLanded(true);
      setShowPortfolioModal(true);
    } else {
      setAppleFalling(false);
      setAppleLanded(false);
      setShowPortfolioModal(false);
    }
  };

  const handleReplay = () => {
    setShowPortfolioModal(false);
    setAppleFalling(false);
    setAppleLanded(false);
    setPhase(0);
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto my-10 select-none px-2 sm:px-0">
      
      {/* Visual Accent Glow Header */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-[#991B1B] animate-ping" />
          <h3 className="font-extrabold text-base sm:text-lg text-[#1E293B] tracking-tight">
            How FolioVeda Cultivates Your Career
          </h3>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
            Interactive Growth Engine
          </span>
        </div>

        {/* Phase Pill Selector Bar */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-slate-200 shadow-2xs text-xs font-bold">
          {[
            { id: 0, label: "Seed", icon: "🌱" },
            { id: 1, label: "Fertilizer", icon: "✨" },
            { id: 2, label: "Water", icon: "💧" },
            { id: 3, label: "Tree", icon: "🌳" },
            { id: 4, label: "Portfolio", icon: "🍎" },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => jumpToPhase(p.id)}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 ${
                phase === p.id 
                  ? "bg-[#991B1B] text-white shadow-xs font-bold scale-105" 
                  : "text-slate-600 hover:text-[#1E293B] hover:bg-slate-100"
              }`}
            >
              <span>{p.icon}</span>
              <span className="hidden md:inline">{p.label}</span>
            </button>
          ))}
          <div className="h-4 w-px bg-slate-200 mx-1" />
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
          </button>
          <button
            onClick={handleReplay}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition"
            title="Replay from start"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Main High-Impact Showcase Stage */}
      <div className="rounded-3xl bg-white border-2 border-[#1E293B]/15 shadow-2xl overflow-hidden relative">
        
        {/* Sky / Atmospheric Horizon Canvas */}
        <div className="relative h-[480px] sm:h-[540px] bg-gradient-to-b from-[#F8F9FA] via-white to-amber-50/30 overflow-hidden flex items-center justify-center">
          
          {/* Subtle Ambient Sunlight & Crimson Bloom */}
          <div className="absolute top-10 right-20 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* SVG Botanical World */}
          <svg 
            className="w-full h-full max-w-3xl overflow-visible"
            viewBox="0 0 700 440"
          >
            <defs>
              {/* Wood Grain Trunk Gradient */}
              <linearGradient id="treeBarkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3E1F07" />
                <stop offset="30%" stopColor="#5C2E0B" />
                <stop offset="70%" stopColor="#78350F" />
                <stop offset="100%" stopColor="#3E1F07" />
              </linearGradient>

              {/* Lush Leaf Gradient */}
              <linearGradient id="leafGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14532D" />
                <stop offset="100%" stopColor="#166534" />
              </linearGradient>
              <linearGradient id="leafGradMid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#15803D" />
                <stop offset="100%" stopColor="#22C55E" />
              </linearGradient>
              <linearGradient id="leafGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ADE80" />
                <stop offset="100%" stopColor="#86EFAC" />
              </linearGradient>

              {/* 3D Glossy Crimson Apple Gradient */}
              <radialGradient id="glossyAppleGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#F87171" />
                <stop offset="40%" stopColor="#DC2626" />
                <stop offset="75%" stopColor="#991B1B" />
                <stop offset="100%" stopColor="#450A0A" />
              </radialGradient>

              {/* Fertilizer Particle Glow Filter */}
              <filter id="fertilizerGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* ===================================================================
                SOIL CUTAWAY (Reveals Underground Root Architecture)
                =================================================================== */}
            {/* Ground Soil Horizon Line (y: 320) */}
            <rect x="0" y="320" width="700" height="120" fill="#29180C" opacity="0.9" />
            <rect x="0" y="320" width="700" height="18" fill="#45260A" />
            <line x1="0" y1="320" x2="700" y2="320" stroke="#1E293B" strokeWidth="3" />

            {/* Soil Texture Grains */}
            <g opacity="0.3" fill="#D97706">
              <circle cx="120" cy="350" r="3" />
              <circle cx="210" cy="380" r="2.5" />
              <circle cx="340" cy="390" r="4" />
              <circle cx="480" cy="360" r="3.5" />
              <circle cx="580" cy="400" r="2" />
            </g>

            {/* Planting Mound in Center (x: 350) */}
            <path d="M 300 320 Q 350 306 400 320" fill="#45260A" stroke="#1E293B" strokeWidth="2.5" />

            {/* ===================================================================
                THE STICKMAN (Animated position & actions per phase)
                =================================================================== */}
            <g 
              className="transition-all duration-700 ease-out"
              transform={
                phase === 0
                  ? "translate(220, 230)" // Kneeling planting seed
                  : phase === 1
                  ? "translate(180, 205)" // Sprinkling fertilizer
                  : phase === 2
                  ? "translate(160, 205)" // Pouring water
                  : "translate(90, 215)"  // Standing back admiring in awe
              }
            >
              {/* Head with friendly expression */}
              <circle cx="25" cy="22" r="15" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
              <circle cx="20" cy="20" r="1.5" fill="#1E293B" />
              <circle cx="28" cy="20" r="1.5" fill="#1E293B" />
              <path 
                d={phase >= 3 ? "M 20 27 Q 25 32 30 27" : "M 20 25 Q 25 28 30 25"} 
                stroke="#1E293B" 
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round" 
              />

              {/* Phase 0: Kneeling & Planting Seed */}
              {phase === 0 && (
                <g>
                  {/* Torso bent down */}
                  <line x1="25" y1="37" x2="35" y2="65" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Kneeling Legs */}
                  <path d="M 35 65 L 18 80 L 40 92" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path d="M 35 65 L 42 78 L 56 92" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  {/* Reaching Arms placing seed */}
                  <path d="M 28 45 L 60 62 L 95 86" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </g>
              )}

              {/* Phase 1: Adding Fertilizer Sack & Golden Sprinkles */}
              {phase === 1 && (
                <g>
                  <line x1="25" y1="37" x2="25" y2="72" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="25" y1="72" x2="15" y2="115" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="25" y1="72" x2="35" y2="115" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 25 45 L 55 42 L 75 52" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  
                  {/* Fertilizer Pouch Sack */}
                  <g transform="translate(70, 38) rotate(35)">
                    <path d="M 0 0 L 26 -4 L 32 30 L -2 28 Z" fill="#F59E0B" stroke="#1E293B" strokeWidth="2" />
                    <text x="3" y="16" fill="#78350F" fontSize="7" fontWeight="bold" fontFamily="monospace">FERTILIZER</text>
                  </g>
                </g>
              )}

              {/* Phase 2: Pouring Water Droplets */}
              {phase === 2 && (
                <g>
                  <line x1="25" y1="37" x2="25" y2="72" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="25" y1="72" x2="15" y2="115" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="25" y1="72" x2="35" y2="115" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 25 45 L 55 40 L 80 48" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  
                  {/* Watering Can */}
                  <g transform="translate(78, 36) rotate(22)">
                    <rect x="0" y="0" width="32" height="22" rx="3" fill="#991B1B" stroke="#1E293B" strokeWidth="2" />
                    <line x1="32" y1="14" x2="52" y2="24" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
                    <ellipse cx="54" cy="26" rx="4" ry="7" fill="#1E293B" />
                    <path d="M 0 4 Q -14 11 0 18" fill="none" stroke="#1E293B" strokeWidth="2" />
                  </g>
                </g>
              )}

              {/* Phase 3 & 4: In Awe / Hands on Hips */}
              {phase >= 3 && (
                <g>
                  <line x1="25" y1="37" x2="25" y2="72" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="25" y1="72" x2="12" y2="112" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="25" y1="72" x2="38" y2="112" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 25 46 L 8 58 L 18 68" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 25 46 L 42 58 L 32 68" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                </g>
              )}
            </g>

            {/* ===================================================================
                THE SEED (Phase 0)
                =================================================================== */}
            {phase === 0 && (
              <g transform="translate(342, 305)" className="animate-bounce">
                <circle cx="8" cy="8" r="14" fill="#991B1B" opacity="0.3" filter="url(#fertilizerGlow)" />
                <circle cx="8" cy="8" r="8" fill="#991B1B" stroke="#1E293B" strokeWidth="2" />
                <circle cx="8" cy="8" r="3" fill="#FDE047" />
              </g>
            )}

            {/* ===================================================================
                FERTILIZER NUTRIENT PARTICLES (Phase 1)
                =================================================================== */}
            {phase === 1 && (
              <g className="animate-fade-in">
                {/* Golden Fertilizer Pellets Cascading Down into Soil */}
                {[
                  { x: 280, y: 260, delay: "0s", label: "Skills Spark" },
                  { x: 310, y: 280, delay: "0.2s", label: "Verified Commits" },
                  { x: 340, y: 295, delay: "0.4s", label: "Architecture Proof" },
                  { x: 370, y: 310, delay: "0.6s", label: "Metric Fertilizer" },
                  { x: 395, y: 325, delay: "0.8s", label: "Career Catalyst" },
                ].map((item, idx) => (
                  <g key={idx} className="animate-pulse" style={{ animationDelay: item.delay }}>
                    {/* Glowing Nutrient Particle */}
                    <circle cx={item.x} cy={item.y} r="5" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" filter="url(#fertilizerGlow)" />
                    <circle cx={item.x} cy={item.y} r="2" fill="#FFFFFF" />
                    {/* Text Label Pill */}
                    <rect x={item.x + 8} y={item.y - 8} width="95" height="16" rx="4" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="1" />
                    <text x={item.x + 13} y={item.y + 4} fill="#B45309" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                      ✨ {item.label}
                    </text>
                  </g>
                ))}
              </g>
            )}

            {/* ===================================================================
                WATERING DROPLETS WITH USER INFORMATION (Phase 2)
                =================================================================== */}
            {phase === 2 && (
              <g className="animate-fade-in">
                {[
                  { x: 275, y: 250, delay: "0s", text: "Candidate Identity" },
                  { x: 310, y: 270, delay: "0.2s", text: "Verified Experience" },
                  { x: 345, y: 285, delay: "0.4s", text: "Tech Stack & Code" },
                  { x: 375, y: 305, delay: "0.6s", text: "Career Milestones" },
                ].map((item, idx) => (
                  <g key={idx} className="animate-bounce" style={{ animationDelay: item.delay }}>
                    <circle cx={item.x} cy={item.y} r="6" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
                    <rect x={item.x + 8} y={item.y - 8} width="105" height="16" rx="4" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1" />
                    <text x={item.x + 14} y={item.y + 4} fill="#0369A1" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                      💧 {item.text}
                    </text>
                  </g>
                ))}
              </g>
            )}

            {/* ===================================================================
                UNDERGROUND ROOT ARCHITECTURE (Phases 2, 3, 4)
                (Roots deepen into the earth absorbing fertilizer & water)
                =================================================================== */}
            {phase >= 2 && (
              <g className="transition-all duration-1000 ease-out">
                {/* Main Taproot */}
                <path d="M 350 320 Q 345 365 350 415" stroke="#E2E8F0" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.8" />
                
                {/* Lateral Roots spreading out */}
                <path d="M 345 335 Q 300 355 240 380" stroke="#E2E8F0" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.75" />
                <path d="M 280 355 Q 240 395 200 410" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
                
                <path d="M 355 335 Q 400 355 460 380" stroke="#E2E8F0" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.75" />
                <path d="M 420 355 Q 460 395 500 410" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />

                {/* Glowing Root Nutrient Pulses (Golden/Cyan) */}
                <circle cx="280" cy="355" r="4" fill="#F59E0B" className="animate-pulse" filter="url(#fertilizerGlow)" />
                <circle cx="350" cy="380" r="4" fill="#38BDF8" className="animate-pulse" />
                <circle cx="420" cy="355" r="4" fill="#F59E0B" className="animate-pulse" filter="url(#fertilizerGlow)" />
              </g>
            )}

            {/* ===================================================================
                THE STRUCTURED ARCHITECTURAL APPLE TREE (Phases 3 & 4)
                (Solid, elegant botanical architecture with geometric symmetry)
                =================================================================== */}
            {phase >= 3 && (
              <g className="transition-all duration-1000 ease-out">
                
                {/* Gnarled, Structured Trunk with Natural Taper */}
                <path 
                  d="M 335 320 C 338 270, 328 230, 332 180 C 335 150, 345 130, 350 110 C 355 130, 365 150, 368 180 C 372 230, 362 270, 365 320 Z" 
                  fill="url(#treeBarkGrad)" 
                  stroke="#1E293B" 
                  strokeWidth="3.5" 
                />

                {/* Primary Structural Branch: Left Arm (Major bough) */}
                <path 
                  d="M 338 215 C 290 195, 235 170, 190 135" 
                  stroke="url(#treeBarkGrad)" 
                  strokeWidth="11" 
                  strokeLinecap="round" 
                  fill="none" 
                />
                <path 
                  d="M 265 185 C 240 145, 205 125, 175 95" 
                  stroke="url(#treeBarkGrad)" 
                  strokeWidth="7" 
                  strokeLinecap="round" 
                  fill="none" 
                />
                <path 
                  d="M 220 150 C 190 145, 165 135, 140 120" 
                  stroke="url(#treeBarkGrad)" 
                  strokeWidth="4.5" 
                  strokeLinecap="round" 
                  fill="none" 
                />

                {/* Primary Structural Branch: Right Arm (Major bough) */}
                <path 
                  d="M 362 215 C 410 195, 465 170, 510 135" 
                  stroke="url(#treeBarkGrad)" 
                  strokeWidth="11" 
                  strokeLinecap="round" 
                  fill="none" 
                />
                <path 
                  d="M 435 185 C 460 145, 495 125, 525 95" 
                  stroke="url(#treeBarkGrad)" 
                  strokeWidth="7" 
                  strokeLinecap="round" 
                  fill="none" 
                />
                <path 
                  d="M 480 150 C 510 145, 535 135, 560 120" 
                  stroke="url(#treeBarkGrad)" 
                  strokeWidth="4.5" 
                  strokeLinecap="round" 
                  fill="none" 
                />

                {/* Central Crown Fork */}
                <path 
                  d="M 345 130 C 330 95, 315 75, 295 50" 
                  stroke="url(#treeBarkGrad)" 
                  strokeWidth="6" 
                  strokeLinecap="round" 
                  fill="none" 
                />
                <path 
                  d="M 355 130 C 370 95, 385 75, 405 50" 
                  stroke="url(#treeBarkGrad)" 
                  strokeWidth="6" 
                  strokeLinecap="round" 
                  fill="none" 
                />

                {/* Layered Structured Foliage Canopies (Geometric & Lush) */}
                
                {/* Back Layer / Dark Canopy */}
                <g fill="url(#leafGradDark)" stroke="#1E293B" strokeWidth="2.5">
                  <ellipse cx="350" cy="80" rx="75" ry="50" />
                  <ellipse cx="230" cy="115" rx="65" ry="45" />
                  <ellipse cx="470" cy="115" rx="65" ry="45" />
                  <ellipse cx="150" cy="110" rx="45" ry="32" />
                  <ellipse cx="550" cy="110" rx="45" ry="32" />
                  <ellipse cx="280" cy="55" rx="55" ry="38" />
                  <ellipse cx="420" cy="55" rx="55" ry="38" />
                </g>

                {/* Mid Layer / Rich Green Canopy */}
                <g fill="url(#leafGradMid)" stroke="#1E293B" strokeWidth="2">
                  <ellipse cx="350" cy="65" rx="62" ry="40" />
                  <ellipse cx="230" cy="100" rx="52" ry="36" />
                  <ellipse cx="470" cy="100" rx="52" ry="36" />
                  <ellipse cx="160" cy="95" rx="38" ry="26" />
                  <ellipse cx="540" cy="95" rx="38" ry="26" />
                  <ellipse cx="290" cy="45" rx="45" ry="30" />
                  <ellipse cx="410" cy="45" rx="45" ry="30" />
                  <ellipse cx="350" cy="35" rx="42" ry="28" />
                </g>

                {/* Foreground Highlight Leaves */}
                <g fill="url(#leafGradLight)" opacity="0.85">
                  <ellipse cx="340" cy="50" rx="35" ry="20" />
                  <ellipse cx="220" cy="85" rx="30" ry="18" />
                  <ellipse cx="460" cy="85" rx="30" ry="18" />
                  <ellipse cx="300" cy="35" rx="25" ry="14" />
                  <ellipse cx="400" cy="35" rx="25" ry="14" />
                </g>

                {/* ===============================================================
                    CRIMSON RED APPLES HANGING ON BRANCH NODES (Phase 3 & 4)
                    =============================================================== */}
                {[
                  { cx: 160, cy: 110, scale: 1 },
                  { cx: 220, cy: 125, scale: 1.1 },
                  { cx: 280, cy: 75, scale: 1 },
                  { cx: 320, cy: 95, scale: 1.2 },
                  { cx: 380, cy: 90, scale: 1.1 },
                  { cx: 430, cy: 65, scale: 1 },
                  { cx: 480, cy: 120, scale: 1.1 },
                  { cx: 540, cy: 110, scale: 1 },
                ].map((apple, i) => (
                  <g key={i} className="animate-fade-in" transform={`translate(${apple.cx}, ${apple.cy}) scale(${apple.scale})`}>
                    {/* Tiny stem */}
                    <path d="M 0 -7 Q 2 -12 4 -14" stroke="#3E1F07" strokeWidth="1.5" fill="none" />
                    {/* Tiny green apple leaf */}
                    <path d="M 2 -12 Q 7 -15 8 -11 Q 5 -9 2 -12" fill="#22C55E" />
                    {/* Glossy Red Apple */}
                    <circle cx="0" cy="0" r="8.5" fill="url(#glossyAppleGrad)" stroke="#1E293B" strokeWidth="1.5" />
                    {/* Specular White Shine */}
                    <ellipse cx="-2.5" cy="-2.5" rx="2.5" ry="1.5" fill="#FFFFFF" opacity="0.75" />
                  </g>
                ))}

              </g>
            )}

            {/* ===================================================================
                THE HERO FALLING APPLE (Phase 4)
                =================================================================== */}
            {phase === 4 && (
              <g>
                {/* Falling Apple with Gravity Animation */}
                <g 
                  className={appleFalling ? "transition-all duration-700 ease-in" : ""}
                  style={{
                    transform: appleFalling ? "translate(350px, 305px)" : "translate(350px, 95px)",
                  }}
                >
                  <path d="M 0 -8 Q 3 -14 5 -16" stroke="#3E1F07" strokeWidth="1.8" fill="none" />
                  <path d="M 3 -14 Q 8 -17 9 -13 Q 6 -11 3 -14" fill="#22C55E" />
                  <circle cx="0" cy="0" r="11" fill="url(#glossyAppleGrad)" stroke="#1E293B" strokeWidth="2" filter="url(#fertilizerGlow)" />
                  <ellipse cx="-3.5" cy="-3.5" rx="3" ry="2" fill="#FFFFFF" opacity="0.9" />
                </g>

                {/* Ground Impact Shockwave when it lands */}
                {appleLanded && (
                  <g transform="translate(350, 318)">
                    <ellipse cx="0" cy="0" rx="35" ry="10" fill="none" stroke="#DC2626" strokeWidth="2.5" className="animate-ping" />
                    <ellipse cx="0" cy="0" rx="20" ry="6" fill="none" stroke="#991B1B" strokeWidth="2" />
                  </g>
                )}
              </g>
            )}

          </svg>

          {/* =========================================================================
              THE LIVE PORTFOLIO SHOWCASE MODAL (Appears on apple impact!)
              ========================================================================= */}
          {showPortfolioModal && (
            <div 
              role="dialog"
              aria-modal="true"
              className="absolute inset-4 sm:inset-8 z-30 bg-white/95 backdrop-blur-2xl rounded-3xl border-2 border-[#991B1B] shadow-2xl p-6 sm:p-8 flex flex-col justify-between animate-in zoom-in-95 duration-500 ring-8 ring-[#991B1B]/10"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#991B1B] text-white flex items-center justify-center font-extrabold text-sm shadow-md">
                    FV
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm sm:text-base text-[#1E293B]">
                        Alex Rivera — Live Architectural Portfolio
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      https://folioveda.me/alex
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#991B1B] bg-red-50 border border-red-200 px-3 py-1 rounded-full hidden sm:inline">
                    Harvested From Verified Proof
                  </span>
                  <button
                    onClick={() => setShowPortfolioModal(false)}
                    className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition"
                    title="Close preview"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Showcase Chassis Body */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-auto py-4">
                
                {/* 1. Candidate Bio Card */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shadow">
                      AR
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Tier-1 Ready
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm text-[#1E293B]">Alex Rivera</h4>
                  <p className="text-xs text-slate-600 font-bold">Staff Distributed Systems Engineer</p>
                  <p className="text-[11px] text-slate-500 font-normal">
                    ex-Stripe • 400M Events/Day • Rust, Go, Kubernetes
                  </p>
                </div>

                {/* 2. Ripe Metric Fruit */}
                <div className="p-4 rounded-xl bg-red-50/60 border border-red-200 space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#991B1B]">
                    BEARING FRUIT
                  </span>
                  <div className="text-2xl font-extrabold text-[#1E293B]">
                    99.999% SLA
                  </div>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed">
                    Live production telemetry verified with zero hallucinations or unproven claims.
                  </p>
                </div>

                {/* 3. Flagship Open Source Project */}
                <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                  <span className="text-[10px] font-mono font-bold text-emerald-400">
                    FEATURED REPO
                  </span>
                  <div className="text-sm font-extrabold text-white">
                    ConsensusRaft-Core
                  </div>
                  <p className="text-xs text-slate-300 font-normal">
                    14.2k GitHub Stars • Distributed consensus ledger with sub-12ms p99 latency.
                  </p>
                </div>

              </div>

              {/* Bottom Footer Actions */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-slate-600 font-medium text-center sm:text-left">
                  Your seeds of skills and fertilizer of experience bear real, verified fruit with FolioVeda.
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReplay}
                    className="px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition flex items-center gap-1.5"
                  >
                    <RotateCcw size={13} /> Replay
                  </button>

                  <Link
                    href="/onboarding"
                    className="shimmer-button px-6 py-2 rounded-full bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-extrabold transition shadow-md shadow-[#991B1B]/25 flex items-center gap-1.5"
                  >
                    <span>Cultivate Your Portfolio Free</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Bottom Interactive Phase Status Banner */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-slate-700">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Current Phase:</span>
            <span className="text-[#991B1B] font-extrabold">
              {phase === 0 && "1. Stickman Plants the FolioVeda Seed into Soil"}
              {phase === 1 && "2. Adding Career Catalyst Fertilizer (Golden Nutrients Seep into Earth)"}
              {phase === 2 && "3. Watering with Identity, Skills, Code & Verified Milestones"}
              {phase === 3 && "4. Structured Architectural Apple Tree Grows with Deep Roots"}
              {phase === 4 && "5. Crimson Apple Drops → Live Portfolio Pops Up!"}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((s) => (
              <button
                key={s}
                onClick={() => jumpToPhase(s)}
                className={`h-2.5 rounded-full transition-all ${
                  phase === s 
                    ? "w-8 bg-[#991B1B]" 
                    : "w-3 bg-slate-300 hover:bg-slate-400"
                }`}
                title={`Jump to Phase ${s + 1}`}
              />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
