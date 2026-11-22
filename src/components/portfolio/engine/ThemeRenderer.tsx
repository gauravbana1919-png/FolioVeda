"use client";

import React, { CSSProperties } from "react";
import Link from "next/link";
import { ThemePackage } from "@/types/theme";
import { PortfolioContent } from "@/types/content";
import { OrigamiCyberMintIcon } from "@/components/ui/Logo";

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
import {
  WallNav,
  WallHero,
  WallProjects,
  WallExperience,
  WallSkills,
  WallCredentials,
  WallContact,
} from "./variants/wallShowcase";
import {
  CraftDeskNav,
  CraftDeskHero,
  CraftDeskProjects,
  CraftDeskExperience,
  CraftDeskCredentials,
  CraftDeskContact,
} from "./variants/craftDesk";
import {
  HimanshuNav,
  HimanshuHero,
  HimanshuProjects,
  HimanshuExperience,
  HimanshuContact,
} from "./variants/himanshuStudio";
import {
  TanujaNav,
  TanujaHero,
  TanujaProjects,
  TanujaExperience,
  TanujaContact,
} from "./variants/tanujaProduct";

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
      case "craft-desk":
        return <CraftDeskNav content={content} theme={theme} />;
      case "himanshu-studio":
        return <HimanshuNav content={content} theme={theme} />;
      case "tanuja-product":
        return <TanujaNav content={content} theme={theme} />;
      case "wall-showcase":
        return <WallNav content={content} theme={theme} />;
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
        if (pattern === "craft-desk") return <CraftDeskHero key={index} content={content} theme={theme} />;
        if (pattern === "himanshu-studio") return <HimanshuHero key={index} content={content} theme={theme} />;
        if (pattern === "tanuja-product") return <TanujaHero key={index} content={content} theme={theme} />;
        if (pattern === "wall-showcase") return <WallHero key={index} content={content} theme={theme} />;
        if (pattern === "not-your-college") return <NYCHero key={index} content={content} theme={theme} />;
        if (pattern === "luxe-creative") return <LuxeHero key={index} content={content} theme={theme} />;
        if (pattern === "terminal-grid") return <TerminalHero key={index} content={content} theme={theme} />;
        if (pattern === "centered-editorial" || pattern === "case-study") return <EditorialHero key={index} content={content} theme={theme} />;
        if (pattern === "split-hero") return <CorporateHero key={index} content={content} theme={theme} />;
        if (pattern === "dark-showcase") return <ShowcaseHero key={index} content={content} theme={theme} />;
        if (pattern === "playful-sticker") return <StickerHero key={index} content={content} theme={theme} />;
        return <NYCHero key={index} content={content} theme={theme} />;

      case "projects":
        if (pattern === "craft-desk") return <CraftDeskProjects key={index} content={content} theme={theme} />;
        if (pattern === "himanshu-studio") return <HimanshuProjects key={index} content={content} theme={theme} />;
        if (pattern === "tanuja-product") return <TanujaProjects key={index} content={content} theme={theme} />;
        if (pattern === "wall-showcase") return <WallProjects key={index} content={content} theme={theme} />;
        if (pattern === "not-your-college") return <NYCProjects key={index} content={content} theme={theme} />;
        if (pattern === "luxe-creative") return <LuxeProjects key={index} content={content} theme={theme} />;
        if (pattern === "terminal-grid") return <TerminalProjects key={index} content={content} theme={theme} />;
        if (pattern === "centered-editorial" || pattern === "case-study") return <EditorialProjects key={index} content={content} theme={theme} />;
        if (pattern === "split-hero") return <CorporateProjects key={index} content={content} theme={theme} />;
        if (pattern === "dark-showcase") return <ShowcaseProjects key={index} content={content} theme={theme} />;
        if (pattern === "playful-sticker") return <StickerProjects key={index} content={content} theme={theme} />;
        return <NYCProjects key={index} content={content} theme={theme} />;

      case "skills":
        if (pattern === "wall-showcase") return <WallSkills key={index} content={content} theme={theme} />;
        if (pattern === "not-your-college") return <NYCSkills key={index} content={content} theme={theme} />;
        if (pattern === "luxe-creative") return <LuxeSkills key={index} content={content} theme={theme} />;
        if (pattern === "terminal-grid") return <TerminalSkills key={index} content={content} theme={theme} />;
        if (pattern === "centered-editorial" || pattern === "case-study") return <EditorialSkills key={index} content={content} theme={theme} />;
        if (pattern === "split-hero") return <CorporateSkills key={index} content={content} theme={theme} />;
        if (pattern === "dark-showcase") return <ShowcaseSkills key={index} content={content} theme={theme} />;
        if (pattern === "playful-sticker") return <StickerSkills key={index} content={content} theme={theme} />;
        return <NYCSkills key={index} content={content} theme={theme} />;

      case "experience":
        if (pattern === "craft-desk") return <CraftDeskExperience key={index} content={content} theme={theme} />;
        if (pattern === "himanshu-studio") return <HimanshuExperience key={index} content={content} theme={theme} />;
        if (pattern === "tanuja-product") return <TanujaExperience key={index} content={content} theme={theme} />;
        if (pattern === "wall-showcase") return <WallExperience key={index} content={content} theme={theme} />;
        if (pattern === "not-your-college") return <NYCExperience key={index} content={content} theme={theme} />;
        if (pattern === "luxe-creative") return <LuxeExperience key={index} content={content} theme={theme} />;
        if (pattern === "terminal-grid") return <TerminalExperience key={index} content={content} theme={theme} />;
        if (pattern === "centered-editorial" || pattern === "case-study") return <EditorialExperience key={index} content={content} theme={theme} />;
        if (pattern === "split-hero") return <CorporateExperience key={index} content={content} theme={theme} />;
        if (pattern === "dark-showcase") return <ShowcaseExperience key={index} content={content} theme={theme} />;
        if (pattern === "playful-sticker") return <StickerExperience key={index} content={content} theme={theme} />;
        return <NYCExperience key={index} content={content} theme={theme} />;

      case "education":
        if (pattern === "craft-desk") return <CraftDeskCredentials key={index} content={content} theme={theme} />;
        if (pattern === "wall-showcase") return <WallCredentials key={index} content={content} theme={theme} />;
        if (pattern === "not-your-college") return <NYCEducation key={index} content={content} theme={theme} />;
        return <LuxeEducation key={index} content={content} theme={theme} />;

      case "contact":
        if (pattern === "craft-desk") return <CraftDeskContact key={index} content={content} theme={theme} />;
        if (pattern === "himanshu-studio") return <HimanshuContact key={index} content={content} theme={theme} />;
        if (pattern === "tanuja-product") return <TanujaContact key={index} content={content} theme={theme} />;
        if (pattern === "wall-showcase") return <WallContact key={index} content={content} theme={theme} />;
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

  if (pattern === "craft-desk") {
    return (
      <div
        data-theme-id={theme.id}
        data-theme-pattern={pattern}
        style={{
          backgroundColor: "#095848",
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(rgba(255, 255, 255, 0.16) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.16) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px, 24px 24px, 120px 120px, 120px 120px",
          backgroundPosition: "-1px -1px",
        }}
        className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 selection:bg-[#095848] selection:text-white"
      >
        {isDemo && (
          <div className="max-w-4xl mx-auto mb-4 bg-white/95 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-center text-xs font-mono font-medium text-slate-800 shadow-lg">
            ✨ Rolan Gomes Cutting Mat Metaphor for <strong className="font-bold">{content.name}</strong> • Theme: <span className="text-[#095848] font-bold">{theme.name}</span>
          </div>
        )}

        {/* Floating Physical Paper Sheet with realistic drop shadow */}
        <div className="max-w-4xl mx-auto rounded-3xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] border border-black/20 overflow-hidden bg-[#FAF7F0] transition-transform">
          {renderNav()}
          <main>
            {theme.layout.sectionOrder.map((sectionName, index) =>
              renderSection(sectionName, index)
            )}
          </main>
        </div>

        {!hideBadge && (
          <footer className="fixed bottom-4 right-4 z-40">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-900 border border-slate-700/60 shadow-xl text-xs font-medium text-slate-200 backdrop-blur-md transition-all hover:scale-105"
            >
              <OrigamiCyberMintIcon size={16} />
              <span>Built with <strong className="font-semibold text-white">Folio<span className="text-[#10B981]">Veda</span></strong></span>
            </Link>
          </footer>
        )}
      </div>
    );
  }

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
            <OrigamiCyberMintIcon size={16} />
            <span>Built with <strong className="font-semibold text-white">Folio<span className="text-[#10B981]">Veda</span></strong></span>
          </Link>
        </footer>
      )}
    </div>
  );
}
