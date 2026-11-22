"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

// =========================================================================
// 🌐 GROUP 1: CYBERNETIC & TELEMETRY MATRIX (ANIMATIONS 1 - 10)
// =========================================================================

/**
 * 🌟 ANIMATION 1: Cyber Grid Laser Scanner
 */
export function CyberGridScanner() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-10 opacity-30">
      <motion.div
        className="w-full h-1 bg-gradient-to-r from-transparent via-[#10B981] to-transparent shadow-[0_0_15px_#10B981]"
        animate={{ y: ["-10%", "110%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/**
 * 🌟 ANIMATION 2: Live Engine FPS & Render Telemetry Counter
 */
export function LiveFpsCounter() {
  const [fps, setFps] = useState("60.0");
  useEffect(() => {
    const interval = setInterval(() => {
      const val = (59.6 + Math.random() * 0.8).toFixed(1);
      setFps(val);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-950/80 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 shadow-inner">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      <span>{fps} FPS</span>
      <span className="text-slate-500">•</span>
      <span className="text-slate-400">16.6ms</span>
    </div>
  );
}

/**
 * 🌟 ANIMATION 3: Quantum Circuit Tracer SVG Lines
 */
export function QuantumCircuitTracer({ className = "" }: { className?: string }) {
  return (
    <svg className={`pointer-events-none absolute ${className}`} width="220" height="90" viewBox="0 0 220 90" fill="none">
      <motion.path
        d="M 10 80 L 70 80 L 100 20 L 180 20 L 210 50"
        stroke="#10B981"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        opacity={0.5}
      />
      <motion.circle
        cx="210"
        cy="50"
        r="3"
        fill="#ebd800"
        animate={{ scale: [1, 1.8, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  );
}

/**
 * 🌟 ANIMATION 4: Hexagonal Shield Matrix Grid
 */
export function HexagonShieldMatrix() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.04] overflow-hidden">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="hex-grid" width="40" height="69.282" patternUnits="userSpaceOnUse" patternTransform="scale(1)">
            <path
              d="M 40 0 L 20 11.547 L 0 0 L 0 23.094 L 20 34.641 L 40 23.094 Z M 0 34.641 L 20 46.188 L 40 34.641 L 40 57.735 L 20 69.282 L 0 57.735 Z"
              stroke="#173f32"
              strokeWidth="1"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-grid)" />
      </svg>
    </div>
  );
}

/**
 * 🌟 ANIMATION 5: Binary Data Stream Oscillating Ticker
 */
export function BinaryDataStreamer() {
  const [binary, setBinary] = useState("01100101 01101110 01100111");
  useEffect(() => {
    const timer = setInterval(() => {
      const bits = Array.from({ length: 24 })
        .map(() => (Math.random() > 0.5 ? "1" : "0"))
        .join("")
        .match(/.{1,8}/g)
        ?.join(" ");
      if (bits) setBinary(bits);
    }, 450);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="font-mono text-[9px] text-emerald-500/70 select-none tracking-widest">
      {binary}
    </span>
  );
}

/**
 * 🌟 ANIMATION 6: Satellite Orbit Radar Scanner
 */
export function SatelliteOrbitRadar({ size = 70 }: { size?: number }) {
  return (
    <div className="relative inline-flex items-center justify-center select-none" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full border border-emerald-500/20" />
      <div className="absolute inset-2 rounded-full border border-dashed border-emerald-500/30 animate-spin" style={{ animationDuration: "14s" }} />
      <motion.div
        className="absolute w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#ebd800] shadow-[0_0_8px_#ebd800]" />
      </motion.div>
      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping opacity-75" />
      <span className="w-2 h-2 rounded-full bg-[#173f32]" />
    </div>
  );
}

/**
 * 🌟 ANIMATION 7: Tri-Color Blinking Prompt Caret
 */
export function BlinkingPromptCaret() {
  return (
    <motion.span
      className="inline-block w-2 h-4 rounded-xs ml-1 align-middle"
      animate={{
        backgroundColor: ["#10B981", "#ebd800", "#38BDF8", "#10B981"],
        opacity: [1, 0, 1],
      }}
      transition={{ duration: 1.2, repeat: Infinity }}
    />
  );
}

/**
 * 🌟 ANIMATION 8: Data Packet Pulse Connector
 */
export function DataPacketPulse({ length = 120 }: { length?: number }) {
  return (
    <div className="relative overflow-hidden h-1 rounded-full bg-slate-200" style={{ width: length }}>
      <motion.div
        className="absolute top-0 bottom-0 w-8 rounded-full bg-gradient-to-r from-transparent via-[#10B981] to-[#ebd800]"
        animate={{ x: [-32, length + 32] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/**
 * 🌟 ANIMATION 9: Geographic Coordinate HUD Telemetry
 */
export function GeoCoordinateHUD() {
  return (
    <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#173f32] bg-white/70 px-2.5 py-1 rounded-full border border-[#173f32]/15 shadow-2xs">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
      <span>12°58&apos;N 77°35&apos;E</span>
      <span className="text-[#5a6b60]">•</span>
      <span className="text-emerald-700 font-bold">EDGE // BLR-SYNTH</span>
    </div>
  );
}

/**
 * 🌟 ANIMATION 10: Server Rack Staggered Activity LEDs (6-Channel Bank)
 */
export function ServerRackActivityLeds() {
  const leds = [0, 0.2, 0.5, 0.1, 0.7, 0.3];
  return (
    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-950 border border-white/10">
      {leds.map((d, i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          animate={{
            backgroundColor: i % 2 === 0 ? ["#10B981", "#064e3b", "#10B981"] : ["#ebd800", "#713f12", "#ebd800"],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{ duration: 0.8 + d, repeat: Infinity, delay: d }}
        />
      ))}
    </div>
  );
}

// =========================================================================
// 🎯 GROUP 2: MICRO-INTERACTIONS & CURSOR PHYSICS (ANIMATIONS 11 - 20)
// =========================================================================

/**
 * 🌟 ANIMATION 11: Magnetic Chromatic Glitch Text
 */
export function MagneticGlitchText({ text, className = "" }: { text: string; className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false);

  return (
    <span
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
      className={`relative inline-block cursor-pointer select-none font-bold ${className}`}
    >
      <span className="relative z-10">{text}</span>
      {isGlitching && (
        <>
          <span className="absolute top-0 left-0 text-rose-500 -translate-x-[1.5px] translate-y-[0.5px] opacity-80 pointer-events-none select-none">
            {text}
          </span>
          <span className="absolute top-0 left-0 text-sky-400 translate-x-[1.5px] -translate-y-[0.5px] opacity-80 pointer-events-none select-none">
            {text}
          </span>
        </>
      )}
    </span>
  );
}

/**
 * 🌟 ANIMATION 12: Ripple Expanding Concentric Ring Button
 */
export function RippleHoverButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 800);
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden cursor-pointer ${className}`}
    >
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="absolute rounded-full bg-white/30 pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{ left: r.x, top: r.y }}
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{ width: 300, height: 300, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

/**
 * 🌟 ANIMATION 13: Liquid Sloshing Button Glow
 */
export function LiquidButtonGlow({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`pointer-events-none absolute -inset-2 rounded-full blur-md opacity-40 ${className}`}
      style={{
        background: "radial-gradient(circle, #10B981 0%, #ebd800 60%, transparent 100%)",
      }}
      animate={{
        scale: [0.95, 1.1, 0.95],
        rotate: [0, 180, 360],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/**
 * 🌟 ANIMATION 14: 3D Layered Depth Stack
 */
export function Hover3DDepthStack({
  children,
  badgeText = "VERIFIED",
}: {
  children: React.ReactNode;
  badgeText?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative perspective-[1000px] cursor-pointer"
    >
      <motion.div
        animate={{
          rotateX: hovered ? 8 : 0,
          rotateY: hovered ? -8 : 0,
          scale: hovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
        <motion.div
          className="absolute top-3 right-3 px-2 py-0.5 rounded bg-[#ebd800] text-[#173f32] text-[9px] font-mono font-black shadow-lg"
          animate={{ translateZ: hovered ? 35 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {badgeText}
        </motion.div>
      </motion.div>
    </div>
  );
}

/**
 * 🌟 ANIMATION 15: Interactive Gyroscope Compass Rose
 */
export function InteractiveCompassRose() {
  const [deg, setDeg] = useState(45);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const rad = Math.atan2(e.clientY - cy, e.clientX - cx);
      setDeg((rad * 180) / Math.PI + 90);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="relative w-8 h-8 rounded-full border border-[#173f32]/20 flex items-center justify-center bg-white/80 shadow-2xs">
      <motion.div
        className="w-1 h-5 bg-gradient-to-t from-rose-500 to-transparent rounded-full origin-center"
        animate={{ rotate: deg }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
      />
      <span className="absolute w-1.5 h-1.5 rounded-full bg-[#173f32]" />
    </div>
  );
}

/**
 * 🌟 ANIMATION 16: Text Scramble Decryption Effect
 */
export function TextScrambleDecryption({ finalWord = "AUTHENTICATED" }: { finalWord?: string }) {
  const [display, setDisplay] = useState(finalWord);
  const glyphs = "!@#$%^&*()_+<>{}[]";

  const triggerScramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        finalWord
          .split("")
          .map((letter, idx) => {
            if (idx < iteration) return finalWord[idx];
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join("")
      );

      if (iteration >= finalWord.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 40);
  };

  return (
    <span
      onMouseEnter={triggerScramble}
      className="font-mono text-emerald-600 font-bold cursor-crosshair select-none hover:text-emerald-800 transition-colors"
      title="Hover to decrypt"
    >
      {display}
    </span>
  );
}

/**
 * 🌟 ANIMATION 17: Parallax Floating Stickies
 */
export function ParallaxFloatingStickers({ text = "Ship daily" }: { text?: string }) {
  return (
    <motion.div
      className="inline-block px-3 py-1.5 rounded-lg bg-[#ebd800] text-[#173f32] text-xs font-handwriting font-bold shadow-md -rotate-3 select-none"
      animate={{ y: [-3, 3, -3], rotate: [-4, -1, -4] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.15, rotate: 0 }}
    >
      📌 {text}
    </motion.div>
  );
}

/**
 * 🌟 ANIMATION 18: Border Corner Reticle Clamping HUD
 */
export function BorderCornerReticle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative group/reticle ${className}`}>
      {/* Corner Brackets */}
      <span className="pointer-events-none absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#10B981] group-hover/reticle:scale-125 transition-transform" />
      <span className="pointer-events-none absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#10B981] group-hover/reticle:scale-125 transition-transform" />
      <span className="pointer-events-none absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#10B981] group-hover/reticle:scale-125 transition-transform" />
      <span className="pointer-events-none absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#10B981] group-hover/reticle:scale-125 transition-transform" />
      {children}
    </div>
  );
}

/**
 * 🌟 ANIMATION 19: Elastic 360-Degree Icon Bounce
 */
export function ElasticIconSpring({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.25, rotate: 360 }}
      transition={{ type: "spring", stiffness: 350, damping: 12 }}
      className="inline-flex cursor-pointer"
    >
      {children}
    </motion.div>
  );
}

/**
 * 🌟 ANIMATION 20: Radial Cursor Proximity Highlight Glow
 */
export function CursorProximityGlow() {
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
      }}
      onMouseLeave={() => setMouse((prev) => ({ ...prev, active: false }))}
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit]"
    >
      <div
        className="absolute w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-opacity duration-300"
        style={{
          left: mouse.x,
          top: mouse.y,
          opacity: mouse.active ? 0.15 : 0,
          background: "radial-gradient(circle, #10B981 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

// =========================================================================
// 🌌 GROUP 3: VISUAL PARTICLES & ATMOSPHERICS (ANIMATIONS 21 - 30)
// =========================================================================

/**
 * 🌟 ANIMATION 21: Atmospheric Nebula Cloud Drift
 */
export function NebulaCloudDrift() {
  return (
    <motion.div
      className="pointer-events-none absolute w-[550px] h-[350px] rounded-full blur-[110px] opacity-25 mix-blend-multiply dark:mix-blend-screen"
      style={{
        background: "radial-gradient(circle, #38BDF8 0%, #10B981 50%, transparent 80%)",
      }}
      animate={{
        x: [-40, 40, -40],
        y: [-20, 20, -20],
        scale: [1, 1.15, 1],
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/**
 * 🌟 ANIMATION 22: Starlight Twinkle Cluster (12-Point Constellation)
 */
export function StarlightTwinkleCluster() {
  const stars = [
    { top: "20%", left: "10%", delay: 0 },
    { top: "40%", left: "30%", delay: 1 },
    { top: "15%", left: "70%", delay: 0.5 },
    { top: "60%", left: "85%", delay: 1.5 },
    { top: "80%", left: "45%", delay: 2 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((s, idx) => (
        <motion.div
          key={idx}
          className="absolute w-1 h-1 bg-[#ebd800] rounded-full shadow-[0_0_6px_#ebd800]"
          style={{ top: s.top, left: s.left }}
          animate={{ scale: [0.5, 1.6, 0.5], opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: s.delay }}
        />
      ))}
    </div>
  );
}

/**
 * 🌟 ANIMATION 23: Translucent Floating Glass Bubbles
 */
export function FloatingBubbleOrbs() {
  return (
    <motion.div
      className="pointer-events-none absolute w-14 h-14 rounded-full border border-white/40 bg-white/10 backdrop-blur-xs shadow-inner"
      animate={{
        y: [-15, 15, -15],
        x: [-8, 8, -8],
        rotate: [0, 90, 0],
      }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/**
 * 🌟 ANIMATION 24: Aurora Borealis Section Curtain Wave
 */
export function AuroraBorealisCurtain() {
  return (
    <div className="pointer-events-none absolute left-0 right-0 h-12 overflow-hidden opacity-30">
      <motion.div
        className="w-[200%] h-full bg-gradient-to-r from-emerald-400 via-[#ebd800] to-sky-400 blur-xl"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/**
 * 🌟 ANIMATION 25: Subtle Paper Water Drop Ripple
 */
export function DigitalRaindropRipples() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.span
        className="absolute top-1/2 left-1/3 rounded-full border border-[#173f32]/20"
        initial={{ width: 0, height: 0, opacity: 0.8 }}
        animate={{ width: 140, height: 140, opacity: 0 }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut" }}
      />
    </div>
  );
}

/**
 * 🌟 ANIMATION 26: Energy Beam Light Separator
 */
export function EnergyBeamSeparator() {
  return (
    <div className="relative w-full h-[1px] bg-[#173f32]/10 overflow-hidden my-4">
      <motion.div
        className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[#10B981] to-transparent shadow-[0_0_8px_#10B981]"
        animate={{ x: ["-100%", "1000%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/**
 * 🌟 ANIMATION 27: Golden Pollen Spore Fireflies
 */
export function LuminousPollenDrift() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#ebd800]"
          style={{ left: `${20 + i * 22}%`, bottom: "10%" }}
          animate={{
            y: [-20, -120],
            x: [0, (i % 2 === 0 ? 15 : -15)],
            opacity: [0, 0.9, 0],
          }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: i * 1.2, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/**
 * 🌟 ANIMATION 28: Prismatic Rainbow Light Refractor
 */
export function HolographicPrismRefractor() {
  return (
    <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-amber-400 via-emerald-400 via-sky-400 to-indigo-500 opacity-60 blur-[0.5px]" />
  );
}

/**
 * 🌟 ANIMATION 29: Vortex Particle Spiral
 */
export function VortexParticleSpiral({ size = 110 }: { size?: number }) {
  return (
    <motion.div
      className="relative pointer-events-none select-none flex items-center justify-center"
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    >
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <span
          key={deg}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#10B981]/50"
          style={{
            transform: `rotate(${deg}deg) translate(${size / 2.6}px)`,
          }}
        />
      ))}
    </motion.div>
  );
}

/**
 * 🌟 ANIMATION 30: Glassmorphism Dynamic Blur Wipe
 */
export function GlassmorphismBlurWipe({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ backdropFilter: "blur(20px)" }}
      className="backdrop-blur-md transition-all duration-300"
    >
      {children}
    </motion.div>
  );
}

// =========================================================================
// 📊 GROUP 4: DATA VISUALIZATION & DYNAMIC METRICS (ANIMATIONS 31 - 40)
// =========================================================================

/**
 * 🌟 ANIMATION 31: Real-time Dynamic Polyline Latency Sparkline
 */
export function RealtimeLatencyGraph() {
  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-950 border border-white/10 font-mono text-[10px] text-emerald-400">
      <span>PING</span>
      <svg width="45" height="14" viewBox="0 0 45 14" fill="none">
        <motion.path
          d="M 0 10 L 8 10 L 14 3 L 20 12 L 26 5 L 34 8 L 45 8"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
      <span className="font-bold text-white">4.2ms</span>
    </div>
  );
}

/**
 * 🌟 ANIMATION 32: High-Tech Memory Allocation Segmented Bar
 */
export function MemoryAllocationBar({ percent = 88 }: { percent?: number }) {
  const segments = 10;
  const activeSegments = Math.round((percent / 100) * segments);

  return (
    <div className="inline-flex items-center gap-1.5">
      <span className="text-[10px] font-mono text-slate-500 font-bold">HEAP</span>
      <div className="inline-flex gap-0.5 p-1 rounded bg-slate-900 border border-white/10">
        {Array.from({ length: segments }).map((_, i) => (
          <span
            key={i}
            className={`w-1.5 h-3 rounded-2xs transition-colors duration-300 ${
              i < activeSegments ? "bg-emerald-400 shadow-[0_0_4px_#10B981]" : "bg-slate-800"
            }`}
          />
        ))}
      </div>
      <span className="text-[10px] font-mono text-emerald-400 font-bold">{percent}%</span>
    </div>
  );
}

/**
 * 🌟 ANIMATION 33: Circular Conic Radar Sweep
 */
export function CircularRadarSweep({ size = 50 }: { size?: number }) {
  return (
    <div
      className="relative rounded-full border border-emerald-500/30 overflow-hidden"
      style={{ width: size, height: size }}
    >
      <motion.div
        className="w-full h-full rounded-full"
        style={{
          background: "conic-gradient(from 0deg, rgba(16, 185, 129, 0.4) 0deg, transparent 90deg, transparent 360deg)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#10B981]" />
    </div>
  );
}

/**
 * 🌟 ANIMATION 34: Circular Liquid Wave Progress Ring
 */
export function SkillProgressLiquidRings({ value = 98 }: { value?: number }) {
  return (
    <div className="relative w-12 h-12 rounded-full border-2 border-[#173f32]/20 flex items-center justify-center overflow-hidden bg-white/70">
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-[#10B981]/25"
        initial={{ height: "0%" }}
        animate={{ height: `${value}%` }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      />
      <span className="relative z-10 font-mono font-bold text-[10px] text-[#173f32]">
        {value}%
      </span>
    </div>
  );
}

/**
 * 🌟 ANIMATION 35: GitHub Commit Activity 7x4 Mini Grid
 */
export function CommitActivityHeatmap() {
  const days = Array.from({ length: 28 });
  return (
    <div className="inline-grid grid-cols-7 gap-1 p-2 rounded-xl bg-slate-950 border border-white/10 shadow-sm">
      {days.map((_, i) => (
        <motion.span
          key={i}
          className="w-2.5 h-2.5 rounded-2xs"
          animate={{
            backgroundColor: [
              i % 3 === 0 ? "#10B981" : i % 5 === 0 ? "#059669" : "#1e293b",
              i % 4 === 0 ? "#34d399" : "#0f172a",
              i % 3 === 0 ? "#10B981" : "#1e293b",
            ],
          }}
          transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: (i % 7) * 0.2 }}
        />
      ))}
    </div>
  );
}

/**
 * 🌟 ANIMATION 36: Number Slot Machine Digit Tumbler
 */
export function NumberRollCounter({ target = "99.9" }: { target?: string }) {
  return (
    <div className="inline-flex font-mono font-black text-xl text-[#173f32] tracking-wider">
      <motion.span
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {target}
      </motion.span>
      <span className="text-emerald-600">%</span>
    </div>
  );
}

/**
 * 🌟 ANIMATION 37: SVG Animated Donut Pie Arc
 */
export function DynamicPieDonutChart({ percent = 85 }: { percent?: number }) {
  const stroke = 3.5;
  const r = 16;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;

  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className="-rotate-90">
      <circle cx="20" cy="20" r={r} stroke="#e2e8f0" strokeWidth={stroke} fill="none" />
      <motion.circle
        cx="20"
        cy="20"
        r={r}
        stroke="#10B981"
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />
    </svg>
  );
}

/**
 * 🌟 ANIMATION 38: High-Tech Battery Energy Flow Indicator
 */
export function BatteryHealthGauge() {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-white/10 font-mono text-[10px] text-white">
      <div className="relative w-6 h-3 rounded-2xs border border-emerald-400 p-0.5 flex items-center">
        <motion.div
          className="h-full bg-emerald-400 rounded-3xs"
          animate={{ width: ["30%", "100%", "30%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="absolute -right-1 top-1 bottom-1 w-0.5 bg-emerald-400 rounded-r" />
      </div>
      <span className="text-emerald-400 font-bold">100% HEALTH</span>
    </div>
  );
}

/**
 * 🌟 ANIMATION 39: Pulsing Cellular/Wi-Fi 5-Bar Signal
 */
export function SignalStrengthBars() {
  return (
    <div className="inline-flex items-end gap-0.5 h-3.5">
      {[4, 6, 9, 12, 14].map((h, i) => (
        <motion.span
          key={i}
          className="w-1 rounded-3xs bg-[#10B981]"
          style={{ height: h }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

/**
 * 🌟 ANIMATION 40: LLM Inference Token Velocity Ticker
 */
export function TokenVelocityTicker() {
  const [tokens, setTokens] = useState(148);
  useEffect(() => {
    const timer = setInterval(() => {
      setTokens(140 + Math.floor(Math.random() * 25));
    }, 800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 font-mono text-[10px] font-bold shadow-2xs">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
      <span>{tokens} TOKENS/SEC</span>
    </div>
  );
}

// =========================================================================
// 🚀 GROUP 5: ADVANCED KINETICS & SPECIALIZED LAYOUT (ANIMATIONS 41 - 50)
// =========================================================================

/**
 * 🌟 ANIMATION 41: Accordion Spring Morphing Drawer
 */
export function AccordionSpringMorph({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-[#173f32]/15 bg-white/80 overflow-hidden shadow-2xs">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-[#173f32] text-left cursor-pointer"
      >
        <span>{title}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }}>▾</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="overflow-hidden px-4 pb-3 text-xs text-[#5a6b60]"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * 🌟 ANIMATION 42: Infinite 3D Perspective Depth Cylinder
 */
export function InfinitePerspectiveCarousel({ items }: { items: string[] }) {
  return (
    <div className="relative w-full overflow-hidden py-3">
      <motion.div
        className="flex gap-4 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="px-4 py-1.5 rounded-xl bg-white border border-[#173f32]/15 text-xs font-bold font-mono text-[#173f32] shadow-2xs flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            <span>{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * 🌟 ANIMATION 43: Split Word Kinetic Cascade Reveal
 */
export function SplitTextCascadeReveal({ words }: { words: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
          className="inline-block font-editorial text-2xl sm:text-3xl font-bold text-[#173f32]"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

/**
 * 🌟 ANIMATION 44: Morphing SVG Icon Geometry (Check -> Star -> Hexagon)
 */
export function MorphingSvgIcon() {
  const [state, setState] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setState((prev) => (prev + 1) % 3);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-6 h-6 flex items-center justify-center">
      <motion.svg
        key={state}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#10B981"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ scale: 0.5, rotate: -45, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {state === 0 && <polyline points="20 6 9 17 4 12" />}
        {state === 1 && <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />}
        {state === 2 && <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />}
      </motion.svg>
    </div>
  );
}

/**
 * 🌟 ANIMATION 45: Running Edge Glowing Laser Ribbon
 */
export function GlowingLaserRibbon({ label = "TOP ARCHETYPE" }: { label?: string }) {
  return (
    <div className="relative overflow-hidden px-3 py-1 rounded-md bg-[#173f32] text-[#ebd800] text-[10px] font-mono font-black uppercase tracking-wider inline-block">
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="relative z-10">{label}</span>
    </div>
  );
}

/**
 * 🌟 ANIMATION 46: Voice Synthesizer Audio Spectrum Visualizer
 */
export function InteractiveAudioSpectrum() {
  const bars = [8, 16, 24, 12, 20, 14, 22, 10];
  return (
    <div className="inline-flex items-center gap-0.5 h-6 px-2 py-1 rounded-md bg-slate-950 border border-white/10">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full bg-emerald-400 origin-bottom"
          animate={{ height: [4, h, 6, h * 0.8, 4] }}
          transition={{ duration: 1.2 + (i % 3) * 0.2, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
    </div>
  );
}

/**
 * 🌟 ANIMATION 47: Kinetic Typography Counter-Slide Ticker
 */
export function KineticTypographyTicker({ line1 = "ZERO HALLUCINATIONS", line2 = "VERIFIED ARTIFACTS" }: { line1?: string; line2?: string }) {
  return (
    <div className="overflow-hidden py-1 select-none font-mono text-[10px] uppercase font-bold text-[#173f32]/60 space-y-1">
      <motion.div
        className="whitespace-nowrap flex gap-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i}>✦ {line1}</span>
        ))}
      </motion.div>
      <motion.div
        className="whitespace-nowrap flex gap-4"
        animate={{ x: ["-50%", "0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i}>● {line2}</span>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * 🌟 ANIMATION 48: Interactive Spotlight Iris Window
 */
export function SpotlightRevealWindow({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false);

  return (
    <div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="relative overflow-hidden rounded-2xl cursor-pointer"
    >
      {children}
      <motion.div
        className="absolute inset-0 bg-[#173f32]/20 pointer-events-none"
        animate={{ opacity: active ? 0 : 0.4 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

/**
 * 🌟 ANIMATION 49: Dynamic Perspective Floating Card Shadow
 */
export function FloatingCardShadowDynamics({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        boxShadow: "0 25px 40px -15px rgba(23, 63, 50, 0.25)",
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="transition-shadow rounded-2xl"
    >
      {children}
    </motion.div>
  );
}

/**
 * 🌟 ANIMATION 50: Analog CRT Glitch Cyber Noise Texture
 */
export function GlitchNoiseCanvas() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}
