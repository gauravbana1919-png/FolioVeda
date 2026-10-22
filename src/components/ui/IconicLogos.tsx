"use client";

import React from "react";

interface IconicLogoProps {
  size?: number;
  className?: string;
  dark?: boolean;
  variant?: "gradient" | "monochrome";
}

/**
 * 1. THE INFINITY MÖBIUS LOOP (Inspired by Meta & Antigravity)
 * A continuous unbroken aerodynamic ribbon looping through infinity (Veda/Wisdom)
 * while shaping the dynamic flow of an 'F' and 'V' (FolioVeda).
 * Single continuous silhouette, universally recognizable at any scale.
 */
export function InfinityLoopIcon({
  size = 48,
  className = "",
  dark = true,
  variant = "gradient",
}: IconicLogoProps) {
  const strokeColor = dark ? "#FFFFFF" : "#0F172A";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <linearGradient id="inf-grad" x1="15" y1="20" x2="85" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>

      {/* Main Continuous Infinity Ribbon Path */}
      <path
        d="M 32 32 
           C 20 32, 12 40, 12 50 
           C 12 60, 20 68, 32 68 
           C 44 68, 52 56, 58 48 
           C 64 40, 72 32, 82 32 
           C 92 32, 98 40, 98 50 
           C 98 60, 90 68, 80 68 
           C 68 68, 60 56, 54 48 
           C 48 40, 42 32, 32 32 Z"
        stroke={variant === "gradient" ? "url(#inf-grad)" : strokeColor}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Dynamic Overlap Cross to create authentic 3D spatial depth like Meta */}
      <path
        d="M 44 38 C 50 46, 56 54, 62 62"
        stroke={variant === "gradient" ? "#6366F1" : strokeColor}
        strokeWidth="11"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * 2. THE VEDA SPARK / DUAL FOLIO (Inspired by Google Gemini & Claude)
 * A clean 4-pointed hypocycloid celestial spark where the internal curves
 * represent an enlightened star (Veda) and layered pages of a folio.
 * Zero clutter, instantly iconic, sublime simplicity.
 */
export function GeminiSparkIcon({
  size = 48,
  className = "",
  dark = true,
  variant = "gradient",
}: IconicLogoProps) {
  const monoFill = dark ? "#FFFFFF" : "#0F172A";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <linearGradient id="gem-primary" x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="40%" stopColor="#3B82F6" />
          <stop offset="80%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#93C5FD" />
        </linearGradient>
        <linearGradient id="gem-secondary" x1="85" y1="15" x2="15" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="60%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#C7D2FE" />
        </linearGradient>
      </defs>

      {/* Main 4-Pointed Hypocycloid Spark Silhouette */}
      <path
        d="M 50 8 
           C 50 31, 69 50, 92 50 
           C 69 50, 50 69, 50 92 
           C 50 69, 31 50, 8 50 
           C 31 50, 50 31, 50 8 Z"
        fill={variant === "gradient" ? "url(#gem-primary)" : monoFill}
      />

      {/* Subtle Integrated Folio Crease / Second Petal for Depth */}
      <path
        d="M 50 8 
           C 50 31, 69 50, 92 50 
           C 64 45, 55 36, 50 8 Z"
        fill={variant === "gradient" ? "url(#gem-secondary)" : monoFill}
        opacity={variant === "gradient" ? 0.75 : 0.25}
      />
    </svg>
  );
}

/**
 * 3. THE 6-FOLD ROSETTE KNOT (Inspired by ChatGPT / OpenAI)
 * Mathematically perfect rotational symmetry:
 * 6 overlapping continuous rounded petals rotating seamlessly around a central node.
 * Looks like an enlightened sacred geometric lotus (Veda) and open digital leaves (Folio).
 * Crisp, iconic, impossible to forget.
 */
export function RosetteKnotIcon({
  size = 48,
  className = "",
  dark = true,
  variant = "gradient",
}: IconicLogoProps) {
  const strokeColor = dark ? "#FFFFFF" : "#0F172A";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <linearGradient id="rose-grad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="50%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>

      {/* 6 Harmonically Rotated Continuous Loops (ChatGPT mathematical structure) */}
      <g
        stroke={variant === "gradient" ? "url(#rose-grad)" : strokeColor}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Loop 1: 0 deg */}
        <path d="M 50 50 C 50 32, 64 18, 76 25 C 88 32, 88 50, 70 50 Z" />
        {/* Loop 2: 60 deg */}
        <path d="M 50 50 C 66 41, 80 55, 76 69 C 72 83, 56 83, 50 70 Z" />
        {/* Loop 3: 120 deg */}
        <path d="M 50 50 C 66 59, 66 77, 50 84 C 34 91, 26 77, 40 65 Z" />
        {/* Loop 4: 180 deg */}
        <path d="M 50 50 C 50 68, 36 82, 24 75 C 12 68, 12 50, 30 50 Z" />
        {/* Loop 5: 240 deg */}
        <path d="M 50 50 C 34 59, 20 45, 24 31 C 28 17, 44 17, 50 30 Z" />
        {/* Loop 6: 300 deg */}
        <path d="M 50 50 C 34 41, 34 23, 50 16 C 66 9, 74 23, 60 35 Z" />
      </g>
    </svg>
  );
}

/**
 * 4. THE ANTIGRAVITY ORBIT / ASCENT MARK (Inspired by Google Antigravity)
 * A clean upward-levitating chiral blade that forms the letter 'F' ascending into 'V'.
 * Feather-light, pure modern AI aesthetics.
 */
export function AntigravityAscentIcon({
  size = 48,
  className = "",
  dark = true,
  variant = "gradient",
}: IconicLogoProps) {
  const strokeColor = dark ? "#FFFFFF" : "#0F172A";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <linearGradient id="anti-grad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="50%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>

      {/* Upward Levitation Ring / Curved Blade */}
      <path
        d="M 50 14
           C 70 14, 86 30, 86 50
           C 86 64, 78 76, 66 82
           C 54 88, 38 86, 28 78
           C 16 68, 14 52, 22 38
           C 28 26, 40 22, 50 26
           C 60 30, 66 40, 64 50
           C 62 60, 52 66, 44 64"
        stroke={variant === "gradient" ? "url(#anti-grad)" : strokeColor}
        strokeWidth="9"
        strokeLinecap="round"
      />

      {/* Orbit Spark Node */}
      <circle cx="50" cy="14" r="5" fill={variant === "gradient" ? "#06B6D4" : strokeColor} />
    </svg>
  );
}
