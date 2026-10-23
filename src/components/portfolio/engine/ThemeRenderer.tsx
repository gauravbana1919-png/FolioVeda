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
      case "terminal-grid":
        return <TerminalNav content={content} theme={theme} />;
      case "centered-editorial":
        return <EditorialNav content={content} theme={theme} />;
      case "poster":
      default:
        return <PosterNav content={content} theme={theme} />;
    }
  };

  // Render specific section based on name and active pattern
  const renderSection = (sectionName: string, index: number) => {
    switch (sectionName) {
      case "hero":
        if (pattern === "terminal-grid") return <TerminalHero key={index} content={content} theme={theme} />;
        if (pattern === "centered-editorial") return <EditorialHero key={index} content={content} theme={theme} />;
        return <PosterHero key={index} content={content} theme={theme} />;

      case "projects":
        if (pattern === "terminal-grid") return <TerminalProjects key={index} content={content} theme={theme} />;
        if (pattern === "centered-editorial") return <EditorialProjects key={index} content={content} theme={theme} />;
        return <PosterProjects key={index} content={content} theme={theme} />;

      case "skills":
        if (pattern === "terminal-grid") return <TerminalSkills key={index} content={content} theme={theme} />;
        if (pattern === "centered-editorial") return <EditorialSkills key={index} content={content} theme={theme} />;
        return <PosterSkills key={index} content={content} theme={theme} />;

      case "experience":
        if (pattern === "terminal-grid") return <TerminalExperience key={index} content={content} theme={theme} />;
        if (pattern === "centered-editorial") return <EditorialExperience key={index} content={content} theme={theme} />;
        return <PosterExperience key={index} content={content} theme={theme} />;

      case "contact":
        if (pattern === "terminal-grid") return <TerminalContact key={index} content={content} theme={theme} />;
        if (pattern === "centered-editorial") return <EditorialContact key={index} content={content} theme={theme} />;
        return <PosterContact key={index} content={content} theme={theme} />;

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
