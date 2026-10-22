"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type LogoVariant = "lotus" | "monogram" | "quill";

interface LogoProps {
  variant?: LogoVariant;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  showText?: boolean;
  showBadge?: boolean;
  className?: string;
  glow?: boolean;
}

const SIZE_MAP = {
  xs: { icon: 20, text: "text-sm", badge: "text-[8px] px-1" },
  sm: { icon: 28, text: "text-base", badge: "text-[9px] px-1.5" },
  md: { icon: 36, text: "text-xl", badge: "text-[10px] px-2 py-0.5" },
  lg: { icon: 48, text: "text-2xl", badge: "text-xs px-2.5 py-0.5" },
  xl: { icon: 64, text: "text-3xl", badge: "text-xs px-3 py-1" },
  "2xl": { icon: 96, text: "text-5xl", badge: "text-sm px-3.5 py-1" },
};

// Global logo preference context so changing logo updates everywhere instantly
interface LogoContextType {
  activeVariant: LogoVariant;
  setActiveVariant: (v: LogoVariant) => void;
}

const LogoContext = createContext<LogoContextType>({
  activeVariant: "lotus",
  setActiveVariant: () => {},
});

export function LogoProvider({ children }: { children: React.ReactNode }) {
  const [activeVariant, setActiveVariant] = useState<LogoVariant>("lotus");

  useEffect(() => {
    const saved = localStorage.getItem("folioveda_logo_variant") as LogoVariant | null;
    if (saved && (saved === "lotus" || saved === "monogram" || saved === "quill")) {
      setActiveVariant(saved);
    }
  }, []);

  const updateVariant = (v: LogoVariant) => {
    setActiveVariant(v);
    localStorage.setItem("folioveda_logo_variant", v);
  };

  return (
    <LogoContext.Provider value={{ activeVariant, setActiveVariant: updateVariant }}>
      {children}
    </LogoContext.Provider>
  );
}

export function useLogoVariant() {
  return useContext(LogoContext);
}

/**
 * 1. Concept: Vedic Geometric Lotus & Folio
 * Combines enlightened sacred geometry with modern layered digital pages.
 */
export function LotusIcon({ size = 36, glow = true, className = "" }: { size?: number; glow?: boolean; className?: string }) {
  const id = "fv-lotus-grad";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <defs>
        {/* Gradients */}
        <linearGradient id={`${id}-left`} x1="20" y1="20" x2="50" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
        <linearGradient id={`${id}-right`} x1="80" y1="20" x2="50" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id={`${id}-center`} x1="50" y1="10" x2="50" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        <linearGradient id={`${id}-spark`} x1="42" y1="36" x2="58" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#BAE6FD" />
        </linearGradient>

        {/* Ambient Glow */}
        {glow && (
          <filter id={`${id}-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        )}
      </defs>

      <g filter={glow ? `url(#${id}-glow)` : undefined}>
        {/* Outer Folio Leaves / Outer Vedic Petals */}
        <path
          d="M 50 88 C 24 88 12 65 14 42 C 15 28 25 18 45 16 C 35 32 34 58 50 88 Z"
          fill={`url(#${id}-left)`}
          fillOpacity="0.85"
        />
        <path
          d="M 50 88 C 76 88 88 65 86 42 C 85 28 75 18 55 16 C 65 32 66 58 50 88 Z"
          fill={`url(#${id}-right)`}
          fillOpacity="0.85"
        />

        {/* Inner Overlapping Pages */}
        <path
          d="M 50 84 C 34 78 28 58 30 40 C 34 26 42 20 50 16 C 45 32 45 54 50 84 Z"
          fill="#4338CA"
          fillOpacity="0.6"
        />
        <path
          d="M 50 84 C 66 78 72 58 70 40 C 66 26 58 20 50 16 C 55 32 55 54 50 84 Z"
          fill="#6D28D9"
          fillOpacity="0.6"
        />

        {/* Central Ascending Flame / Wisdom Spine */}
        <path
          d="M 50 12 C 43 28 41 50 50 82 C 59 50 57 28 50 12 Z"
          fill={`url(#${id}-center)`}
        />

        {/* Illuminated Central Nexus Diamond */}
        <polygon
          points="50,34 59,48 50,62 41,48"
          fill={`url(#${id}-spark)`}
        />

        {/* Digital Grid Nodes (Folio Nodes) */}
        <circle cx="50" cy="20" r="2.5" fill="#FFFFFF" />
        <circle cx="28" cy="38" r="2" fill="#BAE6FD" opacity="0.9" />
        <circle cx="72" cy="38" r="2" fill="#DDD6FE" opacity="0.9" />
      </g>
    </svg>
  );
}

/**
 * 2. Concept: Prismatic 'FV' Isometric Monogram
 * Precision engineering: Interlocking 'F' and 'V' geometric crystal ribbon.
 */
export function MonogramIcon({ size = 36, glow = true, className = "" }: { size?: number; glow?: boolean; className?: string }) {
  const id = "fv-mono-grad";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <defs>
        <linearGradient id={`${id}-fstem`} x1="20" y1="15" x2="40" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id={`${id}-ftop`} x1="36" y1="16" x2="84" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id={`${id}-fmid`} x1="36" y1="44" x2="72" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id={`${id}-varm`} x1="82" y1="20" x2="52" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>

        {glow && (
          <filter id={`${id}-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        )}
      </defs>

      <g filter={glow ? `url(#${id}-glow)` : undefined}>
        {/* Isometric F Column (Left Pillar) */}
        <polygon
          points="22,26 38,16 38,76 22,86"
          fill={`url(#${id}-fstem)`}
        />

        {/* Top F Shelf (Upper folio bar) */}
        <polygon
          points="38,16 82,16 72,30 38,30"
          fill={`url(#${id}-ftop)`}
        />

        {/* Middle F Shelf (Floating portfolio layer) */}
        <polygon
          points="38,44 68,44 58,58 38,58"
          fill={`url(#${id}-fmid)`}
        />

        {/* Dynamic V-Leg intersecting into F base */}
        <polygon
          points="84,28 52,86 38,86 64,44 76,44"
          fill={`url(#${id}-varm)`}
        />

        {/* Energy Accent Dot at the V vertex */}
        <circle cx="52" cy="86" r="3.5" fill="#38BDF8" />
        <circle cx="82" cy="16" r="2.5" fill="#6EE7B7" />
      </g>
    </svg>
  );
}

/**
 * 3. Concept: Radiant Quill & Code Matrix
 * Modern creative quill tip fused with `< / >` code angles.
 */
export function QuillIcon({ size = 36, glow = true, className = "" }: { size?: number; glow?: boolean; className?: string }) {
  const id = "fv-quill-grad";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <defs>
        <linearGradient id={`${id}-quill`} x1="30" y1="12" x2="70" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#9333EA" />
        </linearGradient>
        <linearGradient id={`${id}-brackets`} x1="10" y1="20" x2="90" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>

        {glow && (
          <filter id={`${id}-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        )}
      </defs>

      <g filter={glow ? `url(#${id}-glow)` : undefined}>
        {/* Left Code Bracket Folio */}
        <path
          d="M 28 26 L 14 50 L 28 74 L 34 68 L 22 50 L 34 32 Z"
          fill={`url(#${id}-brackets)`}
          fillOpacity="0.8"
        />

        {/* Right Code Bracket Folio */}
        <path
          d="M 72 26 L 86 50 L 72 74 L 66 68 L 78 50 L 66 32 Z"
          fill={`url(#${id}-brackets)`}
          fillOpacity="0.8"
        />

        {/* Central Geometric Quill Nib */}
        <path
          d="M 50 12 L 64 46 L 54 78 L 50 88 L 46 78 L 36 46 Z"
          fill={`url(#${id}-quill)`}
        />

        {/* Central Ink/Energy Slit */}
        <line x1="50" y1="36" x2="50" y2="76" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="34" r="3" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

/**
 * Main FolioVeda Logo with typography
 */
export function FolioVedaLogo({
  variant,
  size = "md",
  showText = true,
  showBadge = false,
  className = "",
  glow = true,
}: LogoProps) {
  const { activeVariant } = useLogoVariant();
  const currentVariant = variant || activeVariant || "lotus";
  const metrics = SIZE_MAP[size];

  const renderIcon = () => {
    switch (currentVariant) {
      case "monogram":
        return <MonogramIcon size={metrics.icon} glow={glow} />;
      case "quill":
        return <QuillIcon size={metrics.icon} glow={glow} />;
      case "lotus":
      default:
        return <LotusIcon size={metrics.icon} glow={glow} />;
    }
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {renderIcon()}

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-extrabold tracking-tight text-slate-900 dark:text-white ${metrics.text}`}>
              Folio
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Veda
              </span>
            </span>

            {showBadge && (
              <span className={`rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 font-semibold uppercase tracking-wider border border-blue-200 dark:border-blue-800 ${metrics.badge}`}>
                AI Studio
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FolioVedaLogo;
