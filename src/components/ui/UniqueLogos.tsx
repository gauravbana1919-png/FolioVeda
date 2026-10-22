"use client";

import React from "react";

interface UniqueLogoProps {
  size?: number;
  className?: string;
  dark?: boolean;
}

/**
 * UNIQUE CONCEPT 1: "The Origami Folio Fold"
 * Concept:
 * An authentic Japanese origami paper-fold that physically forms both 'F' and 'V'.
 * Colorway: Warm Terracotta (#E2583E), Amber Wheat (#F5A623), and Deep Espresso (#18181B).
 * Why it's unique: Physical tactile paper aesthetic. Not a single trace of Google, Meta, or AI cliches.
 */
export function OrigamiFolioLogo({ size = 56, className = "" }: UniqueLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      {/* 1. Left Vertical Origami Spine ('F' Root) - Warm Terracotta */}
      <polygon points="22,18 42,14 42,82 22,76" fill="#E2583E" />

      {/* 2. Top Folded Horizontal Flap - Amber Gold */}
      <polygon points="42,14 82,22 68,38 42,32" fill="#F5A623" />

      {/* 3. Middle Folded Sheet Layer - Soft Sandstone */}
      <polygon points="42,42 66,48 54,60 42,54" fill="#E5C396" />

      {/* 4. Downward Origami Crease creating the 'V' - Deep Crimson Umber */}
      <polygon points="82,22 52,86 42,82 68,38" fill="#B93822" />

      {/* Fold shadow crease for authentic papercraft depth */}
      <polygon points="42,14 42,82 38,81 38,15" fill="#000000" fillOpacity="0.18" />
    </svg>
  );
}

/**
 * UNIQUE CONCEPT 2: "The Acid Page-Turn" (Creative Tech Editorial)
 * Concept:
 * High-fashion creative studio aesthetic (like Teenage Engineering, A24, or Nothing).
 * Two bold overlapping dynamic geometric sheets in motion, representing the turning of a creator's portfolio.
 * Colorway: Electric Acid Lime (#CCFF00), Deep Petroleum Charcoal (#14191C), and Crisp Milk White (#FAF8F5).
 * Why it's unique: Extremely sharp, high-contrast, edgy, and unforgettable.
 */
export function AcidPageTurnLogo({ size = 56, className = "", dark = true }: UniqueLogoProps) {
  const baseBg = dark ? "#FFFFFF" : "#14191C";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      {/* Underlying Solid Folio Card (Sharp rounded rectangle) */}
      <rect
        x="18"
        y="18"
        width="54"
        height="64"
        rx="12"
        fill={baseBg}
        transform="rotate(-6 18 18)"
      />

      {/* The Overlapping Active Page-Turn (Electric Acid Lime) */}
      <path
        d="M 38 18 
           C 54 18, 78 26, 84 46 
           C 88 60, 78 78, 62 84 
           C 46 90, 32 82, 32 68 
           L 32 24 
           C 32 20, 35 18, 38 18 Z"
        fill="#CCFF00"
      />

      {/* Negative Space Monogram Cut: The 'F' and 'V' notch */}
      <path
        d="M 44 32 H 66 V 40 H 52 V 46 H 62 V 54 H 52 V 68 H 44 Z"
        fill="#14191C"
      />
      {/* Sharp 'V' angle accent in the acid sheet */}
      <polygon points="68,54 58,74 52,74 60,54" fill="#14191C" />
    </svg>
  );
}

/**
 * UNIQUE CONCEPT 3: "The Isometric Folio Stage" (Architectural Monolith)
 * Concept:
 * An isometric 3D podium or presentation stage carved into the letters 'F' and 'V'.
 * Represents elevating a creator's work on a physical architectural stage.
 * Colorway: Midnight Blackberry (#1F142B), Coral Blossom (#FF6B6B), and Warm Oat (#E8D5B5).
 * Why it's unique: Architectural, dimensional, sophisticated luxury tech.
 */
export function IsometricStageLogo({ size = 56, className = "" }: UniqueLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      {/* 1. Top Isometric Stage Face (Warm Oat Canvas) */}
      <polygon points="50,14 84,32 50,50 16,32" fill="#E8D5B5" />

      {/* 2. Left Carved 'F' Column Face (Coral Blossom) */}
      <polygon points="16,32 50,50 50,86 36,78 36,60 26,54 26,44 16,38" fill="#FF6B6B" />

      {/* 3. Right Angular 'V' Face (Deep Blackberry Shadow) */}
      <polygon points="50,50 84,32 84,46 64,80 50,86" fill="#1F142B" />

      {/* Internal highlight plane for the carved shelf */}
      <polygon points="26,44 36,50 36,60 26,54" fill="#FF8E8E" />
      <polygon points="50,50 64,80 54,74 50,58" fill="#43265D" />

      {/* Focal Presentation Dot */}
      <circle cx="50" cy="32" r="4.5" fill="#FF6B6B" />
    </svg>
  );
}

/**
 * Wordmark for the Unique Collections
 */
export function UniqueFolioVedaWordmark({
  variant = 1,
  size = "md",
  className = "",
}: {
  variant?: 1 | 2 | 3;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeMap = {
    sm: { icon: 32, text: "text-lg" },
    md: { icon: 42, text: "text-2xl" },
    lg: { icon: 56, text: "text-4xl" },
  };

  const m = sizeMap[size];

  if (variant === 1) {
    // Origami Terracotta styling
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        <OrigamiFolioLogo size={m.icon} />
        <div className={`font-black tracking-tight ${m.text}`}>
          <span className="text-white">Folio</span>
          <span className="text-[#E2583E]">Veda</span>
        </div>
      </div>
    );
  }

  if (variant === 2) {
    // Acid Lime Creative Tech styling
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        <AcidPageTurnLogo size={m.icon} dark={true} />
        <div className={`font-black tracking-tight ${m.text}`}>
          <span className="text-white">FOLIO</span>
          <span className="text-[#CCFF00]">VEDA</span>
        </div>
      </div>
    );
  }

  // Isometric Stage styling
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <IsometricStageLogo size={m.icon} />
      <div className={`font-black tracking-tight ${m.text}`}>
        <span className="text-[#E8D5B5]">Folio</span>
        <span className="text-[#FF6B6B]">Veda</span>
      </div>
    </div>
  );
}
