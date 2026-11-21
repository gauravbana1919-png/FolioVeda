"use client";

import React, { CSSProperties } from "react";
import Link from "next/link";
import { ThemePackage } from "@/types/theme";
import { PortfolioContent } from "@/types/content";
import { LotusIcon } from "@/components/ui/Logo";

// Variants
import {
  TerminalNav,
  TerminalHero,
  TerminalProjects,
  TerminalSkills,
  TerminalExperience,
  TerminalContact,
} from "./variants/terminal";
import {
  EditorialNav,
  EditorialHero,
  EditorialProjects,
  EditorialSkills,
  EditorialExperience,
  EditorialContact,
} from "./variants/editorial";
import {
  PosterNav,
  PosterHero,
  PosterProjects,
  PosterSkills,
  PosterExperience,
  PosterContact,
} from "./variants/poster";
import {
  CorporateNav,
  CorporateHero,
  CorporateProjects,
  CorporateSkills,
  CorporateExperience,
  CorporateContact,
} from "./variants/corporate";
import {
  ShowcaseNav,
  ShowcaseHero,
  ShowcaseProjects,
  ShowcaseSkills,
  ShowcaseExperience,
  ShowcaseContact,
} from "./variants/showcase";
import {
  StickerNav,
  StickerHero,
  StickerProjects,
  StickerSkills,
  StickerExperience,
  StickerContact,
} from "./variants/sticker";
import {
  LuxeNav,
  LuxeHero,
  LuxeProjects,
  LuxeSkills,
  LuxeExperience,
  LuxeEducation,
  LuxeContact,
} from "./variants/luxe";
import {
  NYCNav,
  NYCHero,
  NYCProjects,
  NYCSkills,
  NYCExperience,
  NYCEducation,
  NYCContact,
} from "./variants/nyc";

interface ThemeRendererProps {
  theme: ThemePackage;
  content: PortfolioContent;
  isDemo?: boolean;
  hideBadge?: boolean;
}

export function ThemeRenderer({
  theme,
  content,
  isDemo = false,
  hideBadge = false,
}: ThemeRendererProps) {
  // Build inline CSS variables from ThemeTokens
  const styleVariables: CSSProperties = {
    backgroundColor: theme.tokens.colors.bg,
    color: theme.tokens.colors.text,
    fontFamily: theme.tokens.typography.bodyFont,
    // Custom CSS vars
    ["--theme-bg" as any]: theme.tokens.colors.bg,
    ["--theme-surface" as any]: theme.tokens.colors.surface,
    ["--theme-text" as any]: theme.tokens.colors.text,
    ["--theme-text-muted" as any]: theme.tokens.colors.textMuted,
    ["--theme-border" as any]: theme.tokens.colors.border,
    ["--theme-accent" as any]: theme.tokens.colors.accent,
    ["--theme-accent-hover" as any]: theme.tokens.colors.accentHover,
    ["--theme-font-heading" as any]: theme.tokens.typography.headingFont,
    ["--theme-font-body" as any]: theme.tokens.typography.bodyFont,
    ["--theme-radius-card" as any]: theme.tokens.radii.card,
    ["--theme-radius-button" as any]: theme.tokens.radii.button,
  };

  const pattern = theme.layout.pattern;

  // Render navigation based on layout pattern
  const renderNav = () => {
    switch (pattern) {
      case "not-your-college":
        return <NYCNav content={content} theme={theme} />;
      case "luxe-creative":
        return <LuxeNav content={content} theme={theme} />;
      case "terminal-grid":
        return <TerminalNav content={content} theme={theme} />;
      case "centered-editorial":
      case "case-study":
        return <EditorialNav content={content} theme={theme} />;
      case "split-hero":
        return <CorporateNav content={content} theme={theme} />;
      case "dark-showcase":
        return <ShowcaseNav content={content} theme={theme} />;
      case "playful-sticker":
        return <StickerNav content={content} theme={theme} />;
      case "poster":
      case "masonry":
      default:
        return <NYCNav content={content} theme={theme} />;
    }
  };

  // Render specific section based on name and active pattern
  const renderSection = (sectionName: string, index: number) => {
    switch (sectionName) {
      case "hero":
        if (pattern === "not-your-college") return <NYCHero key={index} content={content} theme={theme} />;
        if (pattern === "luxe-creative") return <LuxeHero key={index} content={content} theme={theme} />;
        if (pattern === "terminal-grid") return <TerminalHero key={index} content={content} theme={theme} />;
        if (pattern === "centered-editorial" || pattern === "case-study") return <EditorialHero key={index} content={content} theme={theme} />;
        if (pattern === "split-hero") return <CorporateHero key={index} content={content} theme={theme} />;
        if (pattern === "dark-showcase") return <ShowcaseHero key={index} content={content} theme={theme} />;
        if (pattern === "playful-sticker") return <StickerHero key={index} content={content} theme={theme} />;
        return <NYCHero key={index} content={content} theme={theme} />;

      case "projects":
        if (pattern === "not-your-college") return <NYCProjects key={index} content={content} theme={theme} />;
        if (pattern === "luxe-creative") return <LuxeProjects key={index} content={content} theme={theme} />;
        if (pattern === "terminal-grid") return <TerminalProjects key={index} content={content} theme={theme} />;
        if (pattern === "centered-editorial" || pattern === "case-study") return <EditorialProjects key={index} content={content} theme={theme} />;
        if (pattern === "split-hero") return <CorporateProjects key={index} content={content} theme={theme} />;
        if (pattern === "dark-showcase") return <ShowcaseProjects key={index} content={content} theme={theme} />;
        if (pattern === "playful-sticker") return <StickerProjects key={index} content={content} theme={theme} />;
        return <NYCProjects key={index} content={content} theme={theme} />;

      case "skills":
        if (pattern === "not-your-college") return <NYCSkills key={index} content={content} theme={theme} />;
        if (pattern === "luxe-creative") return <LuxeSkills key={index} content={content} theme={theme} />;
        if (pattern === "terminal-grid") return <TerminalSkills key={index} content={content} theme={theme} />;
        if (pattern === "centered-editorial" || pattern === "case-study") return <EditorialSkills key={index} content={content} theme={theme} />;
        if (pattern === "split-hero") return <CorporateSkills key={index} content={content} theme={theme} />;
        if (pattern === "dark-showcase") return <ShowcaseSkills key={index} content={content} theme={theme} />;
        if (pattern === "playful-sticker") return <StickerSkills key={index} content={content} theme={theme} />;
        return <NYCSkills key={index} content={content} theme={theme} />;

      case "experience":
        if (pattern === "not-your-college") return <NYCExperience key={index} content={content} theme={theme} />;
        if (pattern === "luxe-creative") return <LuxeExperience key={index} content={content} theme={theme} />;
        if (pattern === "terminal-grid") return <TerminalExperience key={index} content={content} theme={theme} />;
        if (pattern === "centered-editorial" || pattern === "case-study") return <EditorialExperience key={index} content={content} theme={theme} />;
        if (pattern === "split-hero") return <CorporateExperience key={index} content={content} theme={theme} />;
        if (pattern === "dark-showcase") return <ShowcaseExperience key={index} content={content} theme={theme} />;
        if (pattern === "playful-sticker") return <StickerExperience key={index} content={content} theme={theme} />;
        return <NYCExperience key={index} content={content} theme={theme} />;

      case "education":
        if (pattern === "not-your-college") return <NYCEducation key={index} content={content} theme={theme} />;
        return <LuxeEducation key={index} content={content} theme={theme} />;

      case "contact":
        if (pattern === "not-your-college") return <NYCContact key={index} content={content} theme={theme} />;
        if (pattern === "luxe-creative") return <LuxeContact key={index} content={content} theme={theme} />;
        if (pattern === "terminal-grid") return <TerminalContact key={index} content={content} theme={theme} />;
        if (pattern === "centered-editorial" || pattern === "case-study") return <EditorialContact key={index} content={content} theme={theme} />;
        if (pattern === "split-hero") return <CorporateContact key={index} content={content} theme={theme} />;
        if (pattern === "dark-showcase") return <ShowcaseContact key={index} content={content} theme={theme} />;
        if (pattern === "playful-sticker") return <StickerContact key={index} content={content} theme={theme} />;
        return <NYCContact key={index} content={content} theme={theme} />;

      default:
        return null;
    }
  };

  return (
    <div
      style={styleVariables}
      data-theme-id={theme.id}
      data-theme-pattern={pattern}
      className="min-h-screen relative selection:bg-[#10B981]/30 transition-colors duration-300"
    >
      {/* Top Demo Banner if previewing */}
      {isDemo && (
        <div className="bg-[#10B981]/15 border-b border-[#10B981]/30 px-4 py-2 text-center text-xs font-mono font-medium text-foreground">
          ✨ Live Portfolio for <strong className="font-bold">{content.name}</strong> • Theme:{" "}
          <span className="text-[#10B981] font-bold">{theme.name}</span>
          <Link href="/onboarding" className="ml-3 underline hover:text-[#10B981] font-bold">
            Create yours in 60s →
          </Link>
        </div>
      )}

      {/* Navigation */}
      {renderNav()}

      {/* Dynamic Ordered Sections */}
      <main>
        {theme.layout.sectionOrder.map((sectionName, index) =>
          renderSection(sectionName, index)
        )}
      </main>

      {/* Platform Badge */}
      {!hideBadge && (
        <footer className="fixed bottom-4 right-4 z-40">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-900 border border-slate-700/60 shadow-xl text-xs font-medium text-slate-200 backdrop-blur-md transition-all hover:scale-105"
          >
            <LotusIcon size={16} />
            <span>Built with <strong className="font-semibold text-white">Folio<span className="text-[#10B981]">Veda</span></strong></span>
          </Link>
        </footer>
      )}
    </div>
  );
}
