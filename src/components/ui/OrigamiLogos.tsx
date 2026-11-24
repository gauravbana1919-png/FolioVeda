"use client";

import React from "react";

export type OrigamiPalette = "iris" | "emerald" | "coral" | "cobalt" | "neon";

export interface OrigamiColorTheme {
  id: OrigamiPalette;
  name: string;
  tagline: string;
  spine: string;
  topFlap: string;
  midLayer: string;
  vCrease: string;
  shadow: string;
  textPrimary: string;
  textAccent: string;
}

export const ORIGAMI_PALETTES: Record<OrigamiPalette, OrigamiColorTheme> = {
  iris: {
    id: "iris",
    name: "Obsidian & Electric Iris",
    tagline: "Sleek, luxury tech, modern developer studio",
    spine: "#18181B",       // Deep Obsidian
    topFlap: "#6366F1",     // Electric Iris
    midLayer: "#C7D2FE",    // Soft Ice Lavender
    vCrease: "#4338CA",     // Deep Royal Indigo
    shadow: "rgba(0,0,0,0.22)",
    textPrimary: "#FFFFFF",
    textAccent: "#6366F1",
  },
  emerald: {
    id: "emerald",
    name: "Cyber Mint & Deep Jade",
    tagline: "Intelligent, fresh, high-growth engineering",
    spine: "#064E3B",       // Deep Forest Emerald
    topFlap: "#10B981",     // Vivid Cyber Mint
    midLayer: "#A7F3D0",    // Soft Ice Seafoam
    vCrease: "#047857",     // Deep Jade
    shadow: "rgba(0,0,0,0.25)",
    textPrimary: "#FFFFFF",
    textAccent: "#10B981",
  },
  coral: {
    id: "coral",
    name: "Sunset Coral & Rose Gold",
    tagline: "Warm, energetic, creative, human portfolio",
    spine: "#3B0764",       // Deep Wine Velvet
    topFlap: "#F43F5E",     // Radiant Neon Coral
    midLayer: "#FECDD3",    // Soft Rose Peach
    vCrease: "#BE123C",     // Deep Crimson Umber
    shadow: "rgba(0,0,0,0.22)",
    textPrimary: "#FFFFFF",
    textAccent: "#F43F5E",
  },
  cobalt: {
    id: "cobalt",
    name: "Prismatic Cobalt & Azure",
    tagline: "Architectural precision, trusted authority",
    spine: "#0F172A",       // Deep Midnight Slate
    topFlap: "#2563EB",     // Electric Cobalt
    midLayer: "#BAE6FD",    // Ice Crystal Sky
    vCrease: "#1D4ED8",     // Deep Sapphire
    shadow: "rgba(0,0,0,0.25)",
    textPrimary: "#FFFFFF",
    textAccent: "#38BDF8",
  },
  neon: {
    id: "neon",
    name: "Acid Lime & Ink Charcoal",
    tagline: "Bold, cutting-edge creative-tech (Teenage Engineering style)",
    spine: "#18181B",       // Deep Ink Charcoal
    topFlap: "#CCFF00",     // Electric Acid Lime
    midLayer: "#94A3B8",    // Titanium Slate
    vCrease: "#4D7C0F",     // Deep Olive Shadow
    shadow: "rgba(0,0,0,0.30)",
    textPrimary: "#FFFFFF",
    textAccent: "#CCFF00",
  },
};

export function OrigamiFolioMark({
  palette = "iris",
  size = 56,
  className = "",
}: {
  palette?: OrigamiPalette;
  size?: number;
  className?: string;
}) {
  const theme = ORIGAMI_PALETTES[palette] || ORIGAMI_PALETTES.iris;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      {/* 1. Left Vertical Origami Spine ('F' Root) */}
      <polygon points="22,18 42,14 42,82 22,76" fill={theme.spine} />

      {/* 2. Top Folded Horizontal Flap */}
      <polygon points="42,14 82,22 68,38 42,32" fill={theme.topFlap} />

      {/* 3. Middle Folded Sheet Layer */}
      <polygon points="42,42 66,48 54,60 42,54" fill={theme.midLayer} />

      {/* 4. Downward Origami Crease creating the 'V' */}
      <polygon points="82,22 52,86 42,82 68,38" fill={theme.vCrease} />

      {/* Fold shadow crease for authentic 3D papercraft depth */}
      <polygon points="42,14 42,82 38,81 38,15" fill={theme.shadow} />
    </svg>
  );
}

export function OrigamiFolioWordmark({
  palette = "iris",
  size = "md",
  className = "",
}: {
  palette?: OrigamiPalette;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const theme = ORIGAMI_PALETTES[palette] || ORIGAMI_PALETTES.iris;
  const sizeMap = {
    sm: { icon: 30, text: "text-lg" },
    md: { icon: 42, text: "text-2xl" },
    lg: { icon: 56, text: "text-4xl" },
  };
  const m = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <OrigamiFolioMark palette={palette} size={m.icon} />
      <div className={`font-black tracking-tight ${m.text}`}>
        <span className="text-slate-900 dark:text-white">Folio</span>
        <span style={{ color: theme.textAccent }}>In</span>
      </div>
    </div>
  );
}
