"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type LogoVariant = "origami" | "lotus" | "monogram" | "quill";

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

// Global logo preference context
interface LogoContextType {
  activeVariant: LogoVariant;
  setActiveVariant: (v: LogoVariant) => void;
}

const LogoContext = createContext<LogoContextType>({
  activeVariant: "origami",
  setActiveVariant: () => {},
});

export function LogoProvider({ children }: { children: React.ReactNode }) {
  const [activeVariant, setActiveVariant] = useState<LogoVariant>("origami");

  useEffect(() => {
    const saved = localStorage.getItem("folioveda_logo_variant") as LogoVariant | null;
    if (saved && (saved === "origami" || saved === "lotus" || saved === "monogram" || saved === "quill")) {
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
 * OFFICIAL BRAND IDENTITY: The Origami Folio Fold (Cyber Mint & Deep Jade)
 * Physically folds 'F' (Folio) and 'V' (Veda) from a single sheet of digital paper.
 */
export function OrigamiCyberMintIcon({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 hover:scale-105 ${className}`}
    >
      {/* 1. Left Vertical Origami Spine ('F' Root) - Forest Emerald */}
      <polygon points="22,18 42,14 42,82 22,76" fill="#064E3B" />

      {/* 2. Top Folded Horizontal Flap - Vivid Cyber Mint */}
      <polygon points="42,14 82,22 68,38 42,32" fill="#10B981" />

      {/* 3. Middle Folded Sheet Layer - Ice Seafoam */}
      <polygon points="42,42 66,48 54,60 42,54" fill="#A7F3D0" />

      {/* 4. Downward Origami Crease creating the 'V' - Deep Jade */}
      <polygon points="82,22 52,86 42,82 68,38" fill="#047857" />

      {/* Fold shadow crease for authentic 3D papercraft depth */}
      <polygon points="42,14 42,82 38,81 38,15" fill="rgba(0,0,0,0.25)" />
    </svg>
  );
}

// Fallback icons for backward compatibility
export const LotusIcon = OrigamiCyberMintIcon;
export const MonogramIcon = OrigamiCyberMintIcon;
export const QuillIcon = OrigamiCyberMintIcon;

/**
 * Main FolioVeda Logo with typography
 */
export function FolioVedaLogo({
  variant = "origami",
  size = "md",
  showText = true,
  showBadge = false,
  className = "",
}: LogoProps) {
  const metrics = SIZE_MAP[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <OrigamiCyberMintIcon size={metrics.icon} />

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-extrabold tracking-tight text-slate-900 dark:text-white ${metrics.text}`}>
              Folio
              <span className="text-[#10B981]">
                Veda
              </span>
            </span>

            {showBadge && (
              <span className={`rounded-full bg-emerald-500/15 text-emerald-400 font-semibold uppercase tracking-wider border border-emerald-500/30 ${metrics.badge}`}>
                Studio
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FolioVedaLogo;
