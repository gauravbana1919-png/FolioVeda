"use client";

import React from "react";

interface LogoProps {
  size?: number;
  className?: string;
}

/**
 * GOOGLE-STYLE CONCEPT 1: "The Vibrant Geometric 'F' Mark"
 * Inspired by Google's multi-color 'G' icon:
 * - Simple, friendly, bold lettermark for "FolioVeda"
 * - Segmented into 4 iconic vibrant colors:
 *   Coral Red (#EA4335), Sunshine Gold (#FBBC05), Emerald Green (#34A853), Electric Blue (#4285F4)
 * - Zero boring dull tones, instant friendly recognition, 100% original.
 */
export function GoogleStyleFLogo({ size = 56, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      {/* 1. Top Horizontal Bar: Vibrant Coral Red */}
      <rect x="24" y="16" width="56" height="15" rx="7.5" fill="#EA4335" />

      {/* 2. Middle Horizontal Bar: Sunshine Gold */}
      <rect x="24" y="42" width="40" height="14" rx="7" fill="#FBBC05" />

      {/* 3. Lower Vertical Spine: Fresh Emerald Green */}
      <rect x="24" y="52" width="16" height="32" rx="8" fill="#34A853" />

      {/* 4. Upper Vertical Spine: Electric Blue */}
      <rect x="24" y="16" width="16" height="42" rx="8" fill="#4285F4" />

      {/* Dynamic Overlap Accents to fuse F and V smoothly */}
      <circle cx="32" cy="23.5" r="5" fill="#FFFFFF" fillOpacity="0.2" />
    </svg>
  );
}

/**
 * GOOGLE-STYLE CONCEPT 2: "The Multi-Color Workspace Fold (FV)"
 * Inspired by Google Drive, Chrome, and Google Workspace icons:
 * - Clean geometric ribbons folding into the letters 'F' and 'V'
 * - Modern 4-color palette: Blue, Red, Yellow, Green
 * - Playful, clean, bright, and universally appealing
 */
export function GoogleWorkspaceFoldLogo({ size = 56, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      {/* 1. Left Vertical Pillar: Electric Blue */}
      <path
        d="M 22 24 C 22 18, 28 14, 34 14 H 38 V 86 H 34 C 28 86, 22 82, 22 76 Z"
        fill="#4285F4"
      />

      {/* 2. Top Horizontal Folio Wing: Coral Red */}
      <path
        d="M 38 14 H 74 C 80 14, 84 18, 84 24 C 84 30, 80 34, 74 34 H 38 Z"
        fill="#EA4335"
      />

      {/* 3. Middle Folio Wing: Sunshine Gold */}
      <path
        d="M 38 43 H 62 C 67 43, 71 47, 71 52 C 71 57, 67 61, 62 61 H 38 Z"
        fill="#FBBC05"
      />

      {/* 4. Angled 'V' Fold connecting to base: Emerald Green */}
      <path
        d="M 78 36 L 50 86 H 36 L 58 46 L 78 36 Z"
        fill="#34A853"
      />
    </svg>
  );
}

/**
 * GOOGLE-STYLE CONCEPT 3: "The Color-Loop Monogram (Fresh & Playful)"
 * Alternative modern startup palette:
 * - Electric Violet (#7C3AED), Radiant Tangerine (#F97316), Lime Green (#10B981), Cyber Cyan (#06B6D4)
 * - Continuous bold geometric loop shaping both F (Folio) and V (Veda)
 * - Ultra-clean, cheerful, standout
 */
export function ColorLoopMonogramLogo({ size = 56, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      {/* 1. Top Cap: Tangerine Orange */}
      <path
        d="M 28 22 C 28 16, 34 12, 42 12 H 72 C 78 12, 82 16, 82 22 C 82 28, 78 32, 72 32 H 42 Z"
        fill="#F97316"
      />

      {/* 2. Middle Shelf: Lime Green */}
      <path
        d="M 28 44 H 60 C 66 44, 70 48, 70 54 C 70 60, 66 64, 60 64 H 28 Z"
        fill="#10B981"
      />

      {/* 3. Left Spine: Electric Violet */}
      <path
        d="M 28 12 H 42 V 88 H 28 C 22 88, 18 84, 18 78 V 22 C 18 16, 22 12, 28 12 Z"
        fill="#7C3AED"
      />

      {/* 4. Dynamic 'V' Accent: Cyber Cyan */}
      <path
        d="M 74 38 L 48 88 H 36 L 62 48 L 74 38 Z"
        fill="#06B6D4"
      />

      {/* Central Sparkle Bead */}
      <circle cx="80" cy="22" r="4.5" fill="#FFD166" />
    </svg>
  );
}

/**
 * Main Google-Style FolioVeda Logo with Wordmark
 */
export function GoogleStyleFolioVedaLogo({
  size = "md",
  className = "",
  variant = 1,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  variant?: 1 | 2 | 3;
}) {
  const sizeMap = {
    sm: { icon: 28, text: "text-lg" },
    md: { icon: 38, text: "text-2xl" },
    lg: { icon: 50, text: "text-3xl" },
    xl: { icon: 68, text: "text-5xl" },
  };

  const m = sizeMap[size];

  const renderIcon = () => {
    switch (variant) {
      case 2:
        return <GoogleWorkspaceFoldLogo size={m.icon} />;
      case 3:
        return <ColorLoopMonogramLogo size={m.icon} />;
      case 1:
      default:
        return <GoogleStyleFLogo size={m.icon} />;
    }
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {renderIcon()}

      {/* Google-Style Multi-Colored Wordmark: Each letter alive with color */}
      <div className={`font-black tracking-tight ${m.text}`}>
        <span className="text-[#4285F4]">F</span>
        <span className="text-[#EA4335]">o</span>
        <span className="text-[#FBBC05]">l</span>
        <span className="text-[#4285F4]">i</span>
        <span className="text-[#34A853]">o</span>
        <span className="text-[#EA4335] ml-0.5">V</span>
        <span className="text-[#4285F4]">e</span>
        <span className="text-[#FBBC05]">d</span>
        <span className="text-[#34A853]">a</span>
      </div>
    </div>
  );
}
