"use client";

import React from "react";

interface LogoProps {
  size?: number;
  className?: string;
  dark?: boolean;
}

/**
 * STARTUP CONCEPT 1: "The Silicon Processor (M-Series / Semiconductor Core)"
 * Pure industrial microchip aesthetics:
 * - Square silicon packaging with micro-pin bus lines
 * - Precision-etched 'F' and 'V' silicon copper tracks
 * - Absolutely NO neon glow or gradient fluff
 * - Matte dark graphite and stark white/electric blue logic lines
 */
export function SiliconProcessorIcon({ size = 48, className = "", dark = true }: LogoProps) {
  const bgChip = dark ? "#0B0F19" : "#F8FAFC";
  const borderChip = dark ? "#1E293B" : "#CBD5E1";
  const pinColor = dark ? "#475569" : "#94A3B8";
  const dieColor = dark ? "#111827" : "#EDF2F7";
  const fColor = dark ? "#FFFFFF" : "#0F172A";
  const vColor = "#2563EB"; // Precision Tech Cobalt

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      {/* Outer Chip Body */}
      <rect x="16" y="16" width="68" height="68" rx="14" fill={bgChip} stroke={borderChip} strokeWidth="2.5" />

      {/* Top Bus Pins */}
      <line x1="34" y1="8" x2="34" y2="16" stroke={pinColor} strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="8" x2="50" y2="16" stroke={pinColor} strokeWidth="3" strokeLinecap="round" />
      <line x1="66" y1="8" x2="66" y2="16" stroke={pinColor} strokeWidth="3" strokeLinecap="round" />

      {/* Bottom Bus Pins */}
      <line x1="34" y1="84" x2="34" y2="92" stroke={pinColor} strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="84" x2="50" y2="92" stroke={pinColor} strokeWidth="3" strokeLinecap="round" />
      <line x1="66" y1="84" x2="66" y2="92" stroke={pinColor} strokeWidth="3" strokeLinecap="round" />

      {/* Left Bus Pins */}
      <line x1="8" y1="34" x2="16" y2="34" stroke={pinColor} strokeWidth="3" strokeLinecap="round" />
      <line x1="8" y1="50" x2="16" y2="50" stroke={pinColor} strokeWidth="3" strokeLinecap="round" />
      <line x1="8" y1="66" x2="16" y2="66" stroke={pinColor} strokeWidth="3" strokeLinecap="round" />

      {/* Right Bus Pins */}
      <line x1="84" y1="34" x2="92" y2="34" stroke={pinColor} strokeWidth="3" strokeLinecap="round" />
      <line x1="84" y1="50" x2="92" y2="50" stroke={pinColor} strokeWidth="3" strokeLinecap="round" />
      <line x1="84" y1="66" x2="92" y2="66" stroke={pinColor} strokeWidth="3" strokeLinecap="round" />

      {/* Inner Silicon Die */}
      <rect x="26" y="26" width="48" height="48" rx="8" fill={dieColor} stroke={borderChip} strokeWidth="1.5" />

      {/* Architected FV Monogram (Solid Geometric Tracks) */}
      {/* 'F' Spine and upper bars */}
      <path
        d="M 37 36 H 61 V 42 H 44 V 47 H 57 V 53 H 44 V 64 H 37 V 36 Z"
        fill={fColor}
      />
      {/* 'V' Geometric Chevron Intersect */}
      <path
        d="M 54 48 L 62.5 64 H 56 L 49.5 53 L 53 50 L 54 48 Z"
        fill={vColor}
      />

      {/* Silicon Corner Orientation Mark */}
      <circle cx="23" cy="23" r="2" fill={pinColor} />
    </svg>
  );
}

/**
 * STARTUP CONCEPT 2: "The Linear Monolith (SaaS Minimalist Monomark)"
 * Inspired by Linear.app, Vercel, Supabase, and Stripe:
 * - Pure negative space and bold geometric polygons
 * - Two interlocking architectural slabs: 'F' (Folio) and 'V' (In)
 * - 100% Flat vector, perfectly legible down to 14px favicon
 */
export function LinearMonolithIcon({ size = 48, className = "", dark = true }: LogoProps) {
  const primarySlab = dark ? "#FFFFFF" : "#0F172A";
  const accentSlab = "#3B82F6"; // Electric Blue
  const tertiarySlab = dark ? "#64748B" : "#94A3B8";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      {/* Left Monolithic Pillar ('F' Spine) */}
      <rect x="20" y="20" width="14" height="60" rx="4" fill={primarySlab} />

      {/* Top Horizontal Folio Beam */}
      <rect x="38" y="20" width="42" height="13" rx="4" fill={primarySlab} />

      {/* Middle Horizontal Folio Beam */}
      <rect x="38" y="41" width="28" height="12" rx="4" fill={tertiarySlab} />

      {/* Angled 'V' Razor Wedge */}
      <path
        d="M 80 41 L 52 80 H 38 L 66 41 H 80 Z"
        fill={accentSlab}
      />
    </svg>
  );
}

/**
 * STARTUP CONCEPT 3: "The Logic Circuit Folio (Clean Engineering Vector)"
 * Inspired by ARM, Cloudflare, GitHub, and Cursor:
 * - A clean isometric open book / data sheets drawn with precision circuit board traces
 * - Symmetrical 45° logic routes with solid solder terminal nodes
 * - Clean, authoritative, feels built by engineers for engineers
 */
export function LogicCircuitIcon({ size = 48, className = "", dark = true }: LogoProps) {
  const strokeColor = dark ? "#F8FAFC" : "#0F172A";
  const logicAccent = "#0EA5E9"; // Cyan / Blue Logic Line
  const nodeFill = dark ? "#0EA5E9" : "#0284C7";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      {/* Center Spine Bus */}
      <line x1="50" y1="20" x2="50" y2="80" stroke={logicAccent} strokeWidth="4" strokeLinecap="round" />

      {/* Left Folio Circuit Page */}
      <path
        d="M 50 26 H 28 C 24 26 20 30 20 34 V 70 C 20 74 24 78 28 78 H 50"
        stroke={strokeColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left Internal Data Bus (Horizontal trace with terminal node) */}
      <path d="M 28 44 H 42 L 50 52" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="28" cy="44" r="3" fill={nodeFill} />

      {/* Right Folio Circuit Page */}
      <path
        d="M 50 26 H 72 C 76 26 80 30 80 34 V 70 C 80 74 76 78 72 78 H 50"
        stroke={strokeColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Dynamic 'V' Downward Data Route */}
      <path d="M 50 52 L 58 44 H 72" stroke={logicAccent} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="72" cy="44" r="3" fill={nodeFill} />

      {/* Central Knowledge Core Node */}
      <circle cx="50" cy="20" r="4.5" fill={logicAccent} />
      <circle cx="50" cy="80" r="4.5" fill={strokeColor} />
    </svg>
  );
}
