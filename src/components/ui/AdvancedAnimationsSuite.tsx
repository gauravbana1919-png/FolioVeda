"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";

/**
 * 🌟 ANIMATION 1: Real-Time Page Scroll Progress Bar with Neon Laser Tip
 */
export function ScrollProgressNeonBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-1.5 z-[100] pointer-events-none bg-slate-900/10">
      <motion.div
        className="h-full bg-gradient-to-r from-[#173f32] via-[#10B981] to-[#ebd800] origin-left relative shadow-sm"
        style={{ scaleX }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#ebd800] blur-[2px] shadow-lg shadow-[#10B981]" />
      </motion.div>
    </div>
  );
}

/**
 * 🌟 ANIMATION 2: Ambient Glowing Cursor Spotlight / Follower
 */
export function AmbientCursorFollower() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-72 h-72 rounded-full pointer-events-none z-30 opacity-20 blur-3xl mix-blend-multiply dark:mix-blend-screen"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        background: "radial-gradient(circle, #10B981 0%, #173f32 40%, transparent 70%)",
      }}
    />
  );
}

/**
 * 🌟 ANIMATION 3: 3D Perspective Tilt Card with Specular Spotlight Glow
 */
export function TiltSpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, opacity: 0 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    setRotate({ x: rotateX, y: rotateY });
    setMousePos({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setMousePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{ perspective: 1000 }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Specular cursor glow highlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity: mousePos.opacity,
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.15), transparent 80%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

/**
 * 🌟 ANIMATION 4: Magnetic Button Pull Effect
 */
export function MagneticButton({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (e.clientX - centerX) * 0.35;
    const distanceY = (e.clientY - centerY) * 0.35;
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={`relative transition-colors cursor-pointer select-none ${className}`}
    >
      {children}
    </motion.button>
  );
}

/**
 * 🌟 ANIMATION 5: Infinite Smooth Marquee Ribbon (60fps Hardware Ticker)
 */
export function InfiniteMarqueeRibbon({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  return (
    <div className="relative w-full overflow-hidden flex select-none py-2">
      {/* Fade edge masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#f7f4eb] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#f7f4eb] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex items-center gap-10 whitespace-nowrap shrink-0"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 text-xs sm:text-sm font-black font-mono tracking-wider uppercase text-[#173f32] bg-white/70 px-4 py-2 rounded-xl border border-[#173f32]/10 shadow-2xs hover:border-[#173f32] transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
            <span>{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * 🌟 ANIMATION 6: Live Dynamic Terminal Typing Simulator
 */
export function LiveTerminalTyper({
  commands = [
    "folioveda --analyze ./portfolio",
    "git commit -m 'verified credentials'",
    "deploy --target github-pages",
    "zero-hallucinations: 100% verified",
  ],
}: {
  commands?: string[];
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentCommand = commands[currentIdx];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayText.length < currentCommand.length) {
      timer = setTimeout(() => {
        setDisplayText(currentCommand.slice(0, displayText.length + 1));
      }, 70);
    } else if (!isDeleting && displayText.length === currentCommand.length) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText.length > 0) {
      timer = setTimeout(() => {
        setDisplayText(currentCommand.slice(0, displayText.length - 1));
      }, 35);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setCurrentIdx((prev) => (prev + 1) % commands.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIdx, commands]);

  return (
    <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-white/10 shadow-inner">
      <span className="text-slate-500 font-bold">$</span>
      <span>{displayText}</span>
      <span className="w-2 h-4 bg-emerald-400 inline-block animate-pulse -ml-1" />
    </div>
  );
}

/**
 * 🌟 ANIMATION 7: Concentric Radar Ping Rings
 */
export function ConcentricRadarPing({
  color = "#10B981",
  size = 18,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <motion.span
        className="absolute w-full h-full rounded-full opacity-75"
        style={{ backgroundColor: color }}
        animate={{ scale: [1, 2.2], opacity: [0.75, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.span
        className="absolute w-full h-full rounded-full opacity-75"
        style={{ backgroundColor: color }}
        animate={{ scale: [1, 2.2], opacity: [0.75, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.7, ease: "easeOut" }}
      />
      <span className="relative w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: color }} />
    </div>
  );
}

/**
 * 🌟 ANIMATION 8: Floating Constellation Dust Particles
 */
export function ConstellationDustField() {
  const particles = [
    { top: "12%", left: "15%", duration: 7, delay: 0 },
    { top: "25%", left: "80%", duration: 9, delay: 1 },
    { top: "45%", left: "8%", duration: 8, delay: 2 },
    { top: "60%", left: "92%", duration: 11, delay: 1.5 },
    { top: "75%", left: "20%", duration: 10, delay: 0.5 },
    { top: "88%", left: "75%", duration: 8.5, delay: 3 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p, idx) => (
        <motion.div
          key={idx}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#173f32]/25 blur-[0.5px]"
          style={{ top: p.top, left: p.left }}
          animate={{
            y: [-12, 12, -12],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/**
 * 🌟 ANIMATION 9: Laser Border Beam (Continuous flowing gradient around card borders)
 */
export function LaserBorderBeam({
  duration = 6,
  colorFrom = "#10B981",
  colorTo = "#ebd800",
}: {
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden p-[1.5px] z-10">
      <motion.div
        className="absolute -inset-[100%] rounded-full blur-[2px]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0 320deg, ${colorFrom} 345deg, ${colorTo} 360deg)`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/**
 * 🌟 ANIMATION 10: Smooth Numeric Counter Spring Ticker
 */
export function CounterTicker({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1600;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = value / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="font-mono font-black tabular-nums">
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}

/**
 * 🌟 ANIMATION 11: Mesh Glow Gradient Breathing Orb
 */
export function MeshGlowGradientOrb({
  className = "",
  color = "emerald",
}: {
  className?: string;
  color?: "emerald" | "amber" | "sky";
}) {
  const gradientMap = {
    emerald: "from-emerald-400/20 via-[#173f32]/15 to-transparent",
    amber: "from-amber-300/25 via-emerald-600/10 to-transparent",
    sky: "from-sky-400/20 via-indigo-500/10 to-transparent",
  };

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none -z-10 bg-gradient-to-tr ${gradientMap[color]} ${className}`}
      animate={{
        scale: [1, 1.25, 1],
        opacity: [0.35, 0.65, 0.35],
        rotate: [0, 90, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/**
 * 🌟 ANIMATION 12: Text Shimmer Gradient Wave
 */
export function TextShimmerWave({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-block bg-[linear-gradient(110deg,#173f32,45%,#ebd800,55%,#173f32)] bg-[length:200%_100%] bg-clip-text text-transparent ${className}`}
      style={{
        animation: "shimmer 3s infinite linear",
      }}
    >
      {text}
    </span>
  );
}

/**
 * 🌟 ANIMATION 13: Live AI Activity Soundwave Equalizer (5 frequency bars)
 */
export function SoundwaveEqualizer({
  color = "#10B981",
  barCount = 5,
}: {
  color?: string;
  barCount?: number;
}) {
  const delays = [0, 0.2, 0.4, 0.1, 0.3];
  return (
    <div className="inline-flex items-end gap-1 h-4 px-2 py-0.5">
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full origin-bottom"
          style={{ backgroundColor: color }}
          animate={{
            height: ["25%", "100%", "40%", "85%", "25%"],
          }}
          transition={{
            duration: 1.1 + (i % 3) * 0.2,
            repeat: Infinity,
            delay: delays[i % delays.length],
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/**
 * 🌟 ANIMATION 14: Organic Fluid SVG Blob Morphing
 */
export function MorphingBlobCanvas({
  size = 180,
  fill = "rgba(16, 185, 129, 0.08)",
}: {
  size?: number;
  fill?: string;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{ width: size, height: size }}
      animate={{
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "60% 40% 30% 70% / 60% 30% 70% 40%",
        ],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 16,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        className="w-full h-full rounded-[inherit] blur-xl"
        style={{ backgroundColor: fill }}
      />
    </motion.div>
  );
}

/**
 * 🌟 ANIMATION 15: Interactive 3D Card Flip (Visual Preview vs Machine AST Schema)
 */
export function Flip3DCard({
  frontContent,
  backContent,
  className = "",
}: {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`cursor-pointer perspective-[1200px] select-none ${className}`}
      onClick={() => setIsFlipped(!isFlipped)}
      title="Click to flip between Visual Mode and JSON AST Schema"
    >
      <motion.div
        className="relative w-full h-full transition-transform duration-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Face */}
        <div className="w-full h-full [backface-visibility:hidden]">
          {frontContent}
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {backContent}
        </div>
      </motion.div>
    </div>
  );
}

/**
 * 🌟 ANIMATION 16: Cyber Matrix Telemetry Stream
 */
export function MatrixRainStream({ height = 120 }: { height?: number }) {
  const chars = "01FOLIOVEDA_AST_VERIFIED_77".split("");
  const columns = [
    { left: "10%", delay: 0 },
    { left: "30%", delay: 0.6 },
    { left: "50%", delay: 1.2 },
    { left: "70%", delay: 0.3 },
    { left: "90%", delay: 0.9 },
  ];

  return (
    <div
      className="relative overflow-hidden pointer-events-none opacity-20 font-mono text-[9px] text-emerald-400 select-none"
      style={{ height }}
    >
      {columns.map((col, idx) => (
        <motion.div
          key={idx}
          className="absolute flex flex-col leading-none"
          style={{ left: col.left }}
          animate={{ y: [-150, height + 50] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            delay: col.delay,
            ease: "linear",
          }}
        >
          {chars.map((char, cIdx) => (
            <span key={cIdx} className={cIdx === chars.length - 1 ? "text-white font-bold" : ""}>
              {char}
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

/**
 * 🌟 ANIMATION 17: Elastic Spring Cursor Follower Tag
 */
export function ElasticCursorTag() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 220 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX + 16);
      mouseY.set(e.clientY + 16);
      if (!visible) setVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, visible]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#173f32] text-[#ebd800] text-[10px] font-mono font-bold shadow-lg border border-[#ebd800]/40"
      style={{ x: smoothX, y: smoothY }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#ebd800] animate-ping" />
      <span>✦ YOU (EXPLORING)</span>
    </motion.div>
  );
}

/**
 * 🌟 ANIMATION 18: 3D Holographic Parallax Badge with Iridescent Sheen
 */
export function HoloParallaxBadge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden group/holo rounded-full transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover/holo:opacity-100 transition-opacity duration-300 mix-blend-overlay"
        style={{
          background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(235, 216, 0, 0.4), rgba(16, 185, 129, 0.2) 40%, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}

/**
 * 🌟 ANIMATION 19: Live Code Syntax Streamer (Dynamic JSON AST)
 */
export function LiveCodeSyntaxStreamer() {
  const codeLines = [
    `{ "persona": "Systems Architect", "verified": true }`,
    `{ "github": "synced", "commits": 1420, "score": 99.4 }`,
    `{ "ats_parser": "passed", "layout": "3D_BentoGrid" }`,
    `{ "zero_hallucinations": 100, "status": "PUBLISHED" }`,
  ];

  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLine((prev) => (prev + 1) % codeLines.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [codeLines.length]);

  return (
    <div className="font-mono text-[11px] p-2.5 rounded-xl bg-slate-950 text-slate-300 border border-white/10 shadow-inner flex items-center gap-2 overflow-hidden">
      <span className="text-emerald-400 font-bold shrink-0">AST &gt;</span>
      <motion.span
        key={activeLine}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3 }}
        className="truncate text-amber-300"
      >
        {codeLines[activeLine]}
      </motion.span>
    </div>
  );
}

/**
 * 🌟 ANIMATION 20: Floating Sparkle Burst Emitter
 */
export function SparkleBurstEmitter() {
  const sparkles = [
    { x: "20%", y: "30%", delay: 0 },
    { x: "75%", y: "45%", delay: 0.7 },
    { x: "50%", y: "15%", delay: 1.4 },
    { x: "85%", y: "80%", delay: 2.1 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((s, idx) => (
        <motion.span
          key={idx}
          className="absolute text-amber-400 text-xs font-bold select-none"
          style={{ left: s.x, top: s.y }}
          animate={{
            scale: [0, 1.2, 0],
            opacity: [0, 1, 0],
            y: [-10, -28],
            rotate: [0, 45, 90],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeOut",
          }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  );
}

/**
 * 🌟 ANIMATION 21: Live ECG Heartbeat Wave & Global Edge Latency Ping
 */
export function WorldPingHeartbeat({ latency = 24 }: { latency?: number }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white font-mono text-[10px] border border-white/15 shadow-sm">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <svg className="w-10 h-3 text-emerald-400" viewBox="0 0 40 12" fill="none">
        <motion.path
          d="M 0 6 L 12 6 L 15 1 L 18 11 L 21 6 L 40 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
      <span className="text-emerald-400 font-bold">{latency}ms</span>
      <span className="text-slate-400 text-[9px]">GLOBAL EDGE</span>
    </div>
  );
}

/**
 * 🌟 ANIMATION 22: macOS Dynamic Floating Dock Action Island
 */
export function FloatingActionIsland() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const actions = [
    { label: "Top", href: "#", icon: "↑" },
    { label: "Showcase", href: "#showcase", icon: "✦" },
    { label: "Proof", href: "#why-proof", icon: "✓" },
    { label: "Artworks", href: "#artworks-gallery", icon: "◈" },
    { label: "FAQ", href: "#faq", icon: "?" },
    { label: "Studio", href: "/portfolio/preview", icon: "⚡" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
      <motion.div
        className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#173f32]/90 backdrop-blur-xl border border-white/20 shadow-2xl text-white"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        {actions.map((act, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <motion.a
              key={act.label}
              href={act.href}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              animate={{
                scale: isHovered ? 1.3 : 1,
                y: isHovered ? -4 : 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="px-3 py-1.5 rounded-full text-xs font-bold hover:bg-white/20 transition-colors flex items-center gap-1 cursor-pointer select-none"
              title={act.label}
            >
              <span className="text-[#ebd800]">{act.icon}</span>
              <span className="text-[11px] font-sans">{act.label}</span>
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}

/**
 * 🌟 ANIMATION 23: Moving Specular Glare Card Glass
 */
export function GlassGlareEffect() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[inherit]"
      initial={{ x: "-100%" }}
      animate={{ x: ["100%", "-100%"] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatDelay: 4,
        ease: "easeInOut",
      }}
    >
      <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-25deg]" />
    </motion.div>
  );
}

/**
 * 🌟 ANIMATION 24: Micro Magnetic Spring Pill Badges
 */
export function MagneticPillBadge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.25);
    y.set((e.clientY - centerY) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block cursor-pointer select-none transition-shadow ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * 🌟 ANIMATION 25: Circular SVG Stroke-Dashoffset Animated Meter
 */
export function CircularGaugeProgress({
  score = 99,
  label = "ATS Score",
  size = 56,
}: {
  score?: number;
  label?: string;
  size?: number;
}) {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (score / 100) * circumference;

  return (
    <div className="inline-flex items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#10B981"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: targetOffset }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-mono font-bold text-xs text-[#173f32]">
          {score}%
        </span>
      </div>
      <div className="text-left leading-tight">
        <div className="text-[10px] font-bold text-[#5a6b60] uppercase">{label}</div>
        <div className="text-[11px] font-extrabold text-[#173f32]">Verified Match</div>
      </div>
    </div>
  );
}

