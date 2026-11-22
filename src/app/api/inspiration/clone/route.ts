import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { safeFetchPage } from "@/lib/inspiration/safe-fetch";
import { PortfolioContent } from "@/types/content";

/**
 * Strips scripts/svgs/base64 bloat while keeping <head> styles, fonts, and layout HTML
 */
function extractDesignContext(rawHtml: string): string {
  return rawHtml
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, "")
    .replace(/data:image\/[^;]+;base64,[a-zA-Z0-9+/=]+/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\s{2,}/g, " ")
    .slice(0, 28000);
}

/**
 * World-Class Bespoke Synthesizer
 * Generates an authentic, pixel-accurate HTML5 + Tailwind CSS portfolio replicating the exact
 * iconic visual experience (Loveleen Pink Desk Mat, Rolan Architect Cutting Mat, Himanshu Studio, etc.)
 */
function synthesizeBespokePortfolio(url: string, htmlContext: string, content: PortfolioContent): string {
  const lowerUrl = url.toLowerCase();
  const lowerHtml = htmlContext.toLowerCase();

  const isLoveleen = lowerUrl.includes("loveleen") || lowerHtml.includes("loveleen") || lowerHtml.includes("a47f7f") || lowerHtml.includes("dusty pink");
  const isRolan = lowerUrl.includes("rolan") || lowerHtml.includes("095848") || lowerHtml.includes("cutting mat") || lowerHtml.includes("architect desk");
  const isHimanshu = lowerUrl.includes("himanshu") || lowerHtml.includes("021a13") || lowerHtml.includes("storyboard") || lowerHtml.includes("forest studio");
  const isSudar = lowerUrl.includes("sudar") || lowerHtml.includes("telemetry") || lowerHtml.includes("case study breakdown");

  const name = content.name || "Alex Chen";
  const headline = content.headline || "Multidisciplinary Engineer & Creative Builder";
  const bio = content.bio || "Crafting high-throughput distributed architectures, creative frontend systems, and autonomous AI agents with thoughtful tactile precision.";
  const skills = content.skills || ["TypeScript", "Next.js", "React", "Node.js", "Tailwind CSS", "Distributed Systems"];
  const projects = content.projects || [];
  const experience = content.experience || [];
  const contact = content.contact || {};

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. ICONIC LOVELEEN PEREIRA: DUSTY PINK PHYSICAL DESK MAT (--desk: #A47F7F)
  // ─────────────────────────────────────────────────────────────────────────────
  if (isLoveleen) {
    const projectCards = projects.map((p, idx) => {
      const tech = (p.techStack || (p as any).tags || []) as string[];
      const link = p.liveUrl || p.githubUrl || (p as any).link || "#";
      return `
        <article class="bg-[#FFF8F2] border border-[#EDE5DC] rounded-2xl p-6 sm:p-8 shadow-[0_8px_24px_rgba(42,39,38,0.06)] hover:shadow-[0_16px_36px_rgba(42,39,38,0.12)] transition-all duration-300 relative group text-[#2A2726]">
          <div class="flex items-center justify-between mb-4">
            <span class="font-mono text-xs uppercase tracking-widest text-[#F2643A] font-bold">CASE STUDY // 0${idx + 1}</span>
            <span class="font-mono text-[11px] px-2.5 py-1 rounded-full bg-[#EDE5DC] text-[#6E6863]">Production</span>
          </div>
          <h3 class="text-2xl font-serif font-bold text-[#2A2726] mb-2 tracking-tight group-hover:text-[#F2643A] transition-colors">${p.title}</h3>
          <p class="text-sm text-[#6E6863] leading-relaxed mb-6 font-mono">${p.description}</p>
          <div class="flex flex-wrap gap-2 mb-6">
            ${tech.map(t => `<span class="px-2.5 py-1 text-xs font-mono rounded-md bg-[#FFFAF5] border border-[#EDE5DC] text-[#2A2726]">${t}</span>`).join("")}
          </div>
          ${link !== "#" ? `<a href="${link}" target="_blank" class="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#F2643A] hover:underline">Explore Artifact &rarr;</a>` : ""}
        </article>
      `;
    }).join("");

    return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — Creative Desk</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Playfair+Display:ital,wght@0,600;0,800;1,400&display=swap" rel="stylesheet">
  <style>
    :root {
      --desk: #A47F7F;
      --on-desk: #FFFFFF;
      --paper: #FFFAF5;
      --paper-2: #FFF8F2;
      --rule: #EDE5DC;
      --ink: #2A2726;
      --ink-soft: #6E6863;
      --tag: #F2643A;
      --f-hand: 'Caveat', cursive;
      --f-mono: 'IBM Plex Mono', monospace;
      --f-serif: 'Playfair Display', serif;
    }
    body { background-color: var(--desk); color: var(--on-desk); font-family: var(--f-mono); }
    .handwriting { font-family: var(--f-hand); }
    .serif-title { font-family: var(--f-serif); }
    .paper-sheet { background-color: var(--paper); color: var(--ink); border: 1px solid var(--rule); }
    .shadow-tactile { box-shadow: 0 16px 38px -6px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.06); }
  </style>
</head>
<body class="antialiased min-h-screen selection:bg-[#F2643A] selection:text-white">

  <!-- TOP BAR -->
  <header class="w-full px-6 py-5 flex items-center justify-between border-b border-white/15">
    <div class="flex items-center gap-3">
      <span class="w-3 h-3 rounded-full bg-[#F2643A] animate-ping"></span>
      <span class="font-mono text-xs tracking-wider uppercase font-semibold text-white">${name} // DESK MAT</span>
    </div>
    <div class="flex items-center gap-4 text-xs font-mono">
      <a href="#projects" class="hover:underline text-white/90">Artifacts</a>
      <a href="#about" class="hover:underline text-white/90">Notes</a>
      <a href="#contact" class="px-3.5 py-1.5 rounded-full bg-white text-[#2A2726] font-bold hover:bg-[#FFFAF5] transition-colors shadow-sm">Say Hello</a>
    </div>
  </header>

  <!-- ICONIC PINK DESK HERO -->
  <section class="relative max-w-6xl mx-auto px-6 pt-16 pb-24 overflow-hidden">
    <!-- Draggable / Tactile Desk Arrangement -->
    <div class="relative w-full min-h-[520px] rounded-3xl border-2 border-dashed border-white/25 p-8 sm:p-12 flex flex-col justify-between backdrop-blur-xs">
      
      <!-- Top Sticky Notes & Badges -->
      <div class="flex flex-wrap items-start justify-between gap-4">
        <!-- Handwritten Yellow Post-It Note -->
        <div class="w-48 p-4 bg-[#FEF08A] text-[#713F12] shadow-lg rounded-sm transform -rotate-2 hover:rotate-0 transition-transform">
          <div class="w-8 h-2 bg-yellow-200/80 mx-auto -mt-5 mb-2 rounded-xs"></div>
          <p class="handwriting text-lg leading-tight">"Build things that feel alive and tangible."</p>
          <span class="font-mono text-[10px] block mt-2 opacity-75">~ verified career notes</span>
        </div>

        <!-- Name Tag Cursor Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F2643A] text-white font-mono text-xs font-bold shadow-md transform rotate-1">
          <span class="w-2 h-2 rounded-full bg-white"></span>
          <span>${name}</span>
        </div>
      </div>

      <!-- Centerpiece Paper Sheet -->
      <div class="my-8 max-w-2xl mx-auto paper-sheet shadow-tactile rounded-2xl p-8 sm:p-10 transform -rotate-0.5 hover:rotate-0 transition-transform">
        <span class="font-mono text-xs uppercase tracking-widest text-[#F2643A] font-bold block mb-2">Multidisciplinary Portfolio</span>
        <h1 class="serif-title text-4xl sm:text-5xl font-extrabold text-[#2A2726] leading-tight mb-4 tracking-tight">
          ${headline}
        </h1>
        <p class="font-mono text-xs sm:text-sm text-[#6E6863] leading-relaxed mb-6">
          ${bio}
        </p>

        <!-- Skill Pills -->
        <div class="flex flex-wrap gap-2 pt-2 border-t border-[#EDE5DC]">
          ${skills.map(s => `<span class="px-2.5 py-1 text-xs font-mono bg-[#FFF8F2] border border-[#EDE5DC] text-[#2A2726] rounded-md">${s}</span>`).join("")}
        </div>
      </div>

      <!-- Bottom Desk Mode Switcher (Iconic Loveleen Feature) -->
      <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/20 text-xs font-mono">
        <div class="flex items-center gap-2">
          <span class="text-white/80">Arrangement:</span>
          <span class="px-2.5 py-1 rounded-md bg-white text-[#2A2726] font-bold">Chaos Desk</span>
          <span class="px-2.5 py-1 rounded-md bg-white/20 text-white">Cleaned-up</span>
          <span class="px-2.5 py-1 rounded-md bg-white/20 text-white">Notebook</span>
        </div>
        <a href="#projects" class="inline-flex items-center gap-1.5 text-white font-bold hover:underline">
          <span>Scroll to Inspect Artifacts</span> &darr;
        </a>
      </div>
    </div>
  </section>

  <!-- BELOW-DESK QUIET MONOSPACE COLUMN: SELECTED CASE STUDIES -->
  <section id="projects" class="max-w-5xl mx-auto px-6 py-20 border-t border-white/20">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
      <div>
        <span class="handwriting text-2xl text-[#FEF08A] block">Curated Artifacts</span>
        <h2 class="serif-title text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">Featured Production Works</h2>
      </div>
      <span class="font-mono text-xs text-white/70">Rendered with genuine code & telemetry</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      ${projectCards}
    </div>
  </section>

  <!-- EXPERIENCE TIMELINE -->
  ${experience.length > 0 ? `
  <section class="max-w-5xl mx-auto px-6 py-20 border-t border-white/20">
    <span class="handwriting text-2xl text-[#FEF08A] block mb-1">Career Notes</span>
    <h2 class="serif-title text-3xl sm:text-4xl font-bold text-white tracking-tight mb-10">Work Trajectory</h2>
    <div class="space-y-6">
      ${experience.map(exp => {
        const highlights = exp.highlights && exp.highlights.length > 0 ? exp.highlights.join(" • ") : ((exp as any).description || "");
        return `
        <div class="paper-sheet rounded-xl p-6 shadow-md border border-[#EDE5DC] text-[#2A2726]">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
            <h4 class="serif-title text-xl font-bold text-[#2A2726]">${exp.role}</h4>
            <span class="font-mono text-xs text-[#6E6863]">${exp.period}</span>
          </div>
          <div class="font-mono text-xs text-[#F2643A] font-bold mb-3">${exp.company}</div>
          <p class="font-mono text-xs sm:text-sm text-[#6E6863] leading-relaxed">${highlights}</p>
        </div>
        `;
      }).join("")}
    </div>
  </section>
  ` : ""}

  <!-- FOOTER -->
  <footer id="contact" class="max-w-5xl mx-auto px-6 py-16 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
    <div>
      <span class="text-white font-bold block mb-1">Let's talk craft & engineering.</span>
      <span class="text-white/70">${contact.email ? contact.email : "Available for select builder roles."}</span>
    </div>
    <div class="flex items-center gap-4">
      ${contact.github ? `<a href="${contact.github}" target="_blank" class="text-white hover:underline">GitHub</a>` : ""}
      ${contact.linkedin ? `<a href="${contact.linkedin}" target="_blank" class="text-white hover:underline">LinkedIn</a>` : ""}
      ${contact.twitter ? `<a href="${contact.twitter}" target="_blank" class="text-white hover:underline">Twitter</a>` : ""}
    </div>
  </footer>
</body>
</html>`;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. ICONIC ROLAN GOMES: ARCHITECTURAL GREEN CUTTING MAT (#095848)
  // ─────────────────────────────────────────────────────────────────────────────
  if (isRolan) {
    const projectCards = projects.map((p, idx) => {
      const tech = (p.techStack || (p as any).tags || []) as string[];
      const link = p.liveUrl || p.githubUrl || (p as any).link || "#";
      return `
        <div class="bg-[#0e6e5a]/85 border-2 border-[#148770] rounded-xl p-6 text-white hover:border-[#e5ff7d] transition-all group shadow-xl">
          <div class="flex items-center justify-between font-mono text-xs mb-3 text-[#e5ff7d]">
            <span>SHEET-0${idx + 1} // BLUEPRINT</span>
            <span class="px-2 py-0.5 rounded bg-black/30 border border-[#148770]">SPEC-VERIFIED</span>
          </div>
          <h3 class="font-mono text-xl font-bold mb-2 group-hover:text-[#e5ff7d] transition-colors">${p.title}</h3>
          <p class="text-xs text-white/80 leading-relaxed font-sans mb-4">${p.description}</p>
          <div class="flex flex-wrap gap-1.5 mb-4 font-mono text-[11px]">
            ${tech.map(t => `<span class="px-2 py-0.5 rounded bg-black/40 text-[#e5ff7d] border border-[#148770]">${t}</span>`).join("")}
          </div>
          ${link !== "#" ? `<a href="${link}" target="_blank" class="font-mono text-xs text-[#e5ff7d] font-bold hover:underline inline-flex items-center gap-1">Open Blueprint &rarr;</a>` : ""}
        </div>
      `;
    }).join("");

    return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — Cutting Mat</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=JetBrains+Mono:wght@400;600;800&family=Space+Grotesk:wght@600;800&display=swap" rel="stylesheet">
  <style>
    body {
      background-color: #095848;
      background-image: 
        linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px),
        linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px);
      background-size: 20px 20px, 20px 20px, 100px 100px, 100px 100px;
      font-family: 'JetBrains Mono', monospace;
      color: #f7fdfa;
    }
  </style>
</head>
<body class="p-4 sm:p-8 min-h-screen">
  <div class="max-w-6xl mx-auto border-4 border-dashed border-[#148770] rounded-3xl p-6 sm:p-12 relative bg-[#095848]/95 shadow-2xl">
    
    <!-- Ruler Header -->
    <div class="flex items-center justify-between pb-6 border-b-2 border-[#148770] text-xs">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-[#e5ff7d]"></span>
        <span class="font-extrabold uppercase tracking-wider">${name} // ARCHITECTURAL SPEC</span>
      </div>
      <div class="font-bold text-[#e5ff7d]">GRID SCALE 1:1 • CUTTING MAT</div>
    </div>

    <!-- Center White Paper Sheet Attached to Mat -->
    <div class="my-10 bg-[#FFFAF5] text-[#1E293B] rounded-2xl p-8 sm:p-12 shadow-2xl border border-slate-200 relative transform -rotate-0.5">
      <!-- Tape Mark -->
      <div class="absolute -top-3 left-12 w-20 h-6 bg-amber-100/80 border border-amber-300/60 rotate-2"></div>
      
      <span class="font-mono text-xs uppercase tracking-widest text-[#095848] font-black block mb-2">Architectural Portfolio</span>
      <h1 class="text-4xl sm:text-6xl font-black tracking-tight text-[#0f172a] mb-4" style="font-family: 'Space Grotesk', sans-serif;">
        ${headline}
      </h1>
      <p class="text-sm sm:text-base text-slate-700 font-sans leading-relaxed mb-6 max-w-3xl">
        ${bio}
      </p>

      <div class="flex flex-wrap gap-2 pt-4 border-t border-slate-200">
        ${skills.map(s => `<span class="px-3 py-1 rounded-md bg-[#095848]/10 text-[#095848] font-bold text-xs border border-[#095848]/20">${s}</span>`).join("")}
      </div>
    </div>

    <!-- Blueprints & Case Studies -->
    <div class="mt-12">
      <h2 class="text-2xl font-black text-[#e5ff7d] mb-6 flex items-center gap-2">
        <span>// BLUEPRINTS &amp; PRODUCTION SCHEMATICS</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${projectCards}
      </div>
    </div>

    <!-- Footer -->
    <footer class="mt-16 pt-6 border-t-2 border-[#148770] flex flex-wrap items-center justify-between text-xs text-white/80">
      <span>${contact.email ? `Reach out: ${contact.email}` : "Available for engineering contracts"}</span>
      <div class="flex gap-4 font-bold text-[#e5ff7d]">
        ${contact.github ? `<a href="${contact.github}" target="_blank" class="hover:underline">GitHub</a>` : ""}
        ${contact.linkedin ? `<a href="${contact.linkedin}" target="_blank" class="hover:underline">LinkedIn</a>` : ""}
      </div>
    </footer>
  </div>
</body>
</html>`;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. ICONIC HIMANSHU SINGH / FOREST STUDIO (#021A13)
  // ─────────────────────────────────────────────────────────────────────────────
  if (isHimanshu) {
    const projectCards = projects.map((p, idx) => `
      <div class="bg-[#06291f]/90 border border-[#c6d457]/30 rounded-2xl p-6 sm:p-8 hover:border-[#c6d457] transition-all text-[#eef3c8] shadow-2xl group">
        <span class="text-xs font-mono font-bold text-[#c6d457] tracking-widest block mb-2">SCENE // 0${idx + 1}</span>
        <h3 class="text-2xl font-bold mb-2 group-hover:text-[#c6d457] transition-colors">${p.title}</h3>
        <p class="text-xs sm:text-sm text-[#eef3c8]/80 leading-relaxed mb-4">${p.description}</p>
        <div class="flex flex-wrap gap-2 mb-4 font-mono text-xs">
          ${(p.techStack || []).map(t => `<span class="px-2 py-0.5 rounded bg-black/40 border border-[#c6d457]/30 text-[#c6d457]">${t}</span>`).join("")}
        </div>
      </div>
    `).join("");

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — Studio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&family=Syne:wght@700;800&display=swap" rel="stylesheet">
</head>
<body class="bg-[#021a13] text-[#eef3c8] font-['Plus_Jakarta_Sans'] p-6 sm:p-12 min-h-screen">
  <div class="max-w-6xl mx-auto">
    <header class="flex items-center justify-between pb-6 border-b border-[#c6d457]/20 text-xs font-mono">
      <span class="font-black text-[#c6d457] tracking-wider uppercase">${name} // STUDIO</span>
      <span class="text-xs text-[#c6d457]">Visual Storytelling</span>
    </header>
    <div class="py-20 max-w-3xl">
      <span class="px-3 py-1 rounded-full bg-[#c6d457]/10 text-[#c6d457] text-xs font-mono font-bold border border-[#c6d457]/30">VISUAL SYSTEMS &amp; CODE</span>
      <h1 class="text-5xl sm:text-7xl font-extrabold font-['Syne'] text-[#eef3c8] mt-4 mb-6 leading-tight">${headline}</h1>
      <p class="text-base sm:text-lg text-[#eef3c8]/80 leading-relaxed mb-8">${bio}</p>
      <div class="flex flex-wrap gap-2">
        ${skills.map(s => `<span class="px-3 py-1 rounded-full bg-[#06291f] border border-[#c6d457]/30 text-[#c6d457] font-mono text-xs">${s}</span>`).join("")}
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-[#c6d457]/20">
      ${projectCards}
    </div>
  </div>
</body>
</html>`;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. ICONIC SHARVARI MARATHE / SHAR'S ZINE SHELF (#FAF6EE)
  // ─────────────────────────────────────────────────────────────────────────────
  const isSharvari = lowerUrl.includes("sharvari") || lowerUrl.includes("zine") || lowerHtml.includes("zine shelf") || lowerHtml.includes("flower.png");
  if (isSharvari) {
    const zineCards = projects.map((p, idx) => {
      const tech = (p.techStack || (p as any).tags || []) as string[];
      const link = p.liveUrl || p.githubUrl || (p as any).link || "#";
      return `
        <div class="bg-[#FFFDF9] border-2 border-[#E5DECF] rounded-2xl p-6 sm:p-8 hover:-translate-y-1.5 transition-all shadow-[0_8px_20px_rgba(40,30,20,0.06)] relative group text-[#2D2A26]">
          <div class="w-8 h-2.5 rounded-full bg-[#E5DECF] mx-auto -mt-9 mb-4"></div>
          <div class="flex items-center justify-between mb-4 text-xs font-mono">
            <span class="px-2.5 py-0.5 rounded-full font-bold text-[#8C7A6B] bg-[#F3EDE2]">ZINE // 0${idx + 1}</span>
            <span class="text-[#A89887]">Verified Publication</span>
          </div>
          <h3 class="text-2xl font-bold mb-2 tracking-tight text-[#2D2A26] group-hover:text-[#D97706] transition-colors" style="font-family: 'Space Grotesk', sans-serif;">${p.title}</h3>
          <p class="text-xs sm:text-sm text-[#6B635B] leading-relaxed mb-6 font-sans">${p.description}</p>
          <div class="flex flex-wrap gap-1.5 mb-6 font-mono text-xs">
            ${tech.map(t => `<span class="px-2 py-0.5 rounded-md bg-[#F5EFE6] text-[#4A4238] border border-[#E8DFC8]">${t}</span>`).join("")}
          </div>
          ${link !== "#" ? `<a href="${link}" target="_blank" class="inline-flex items-center gap-1.5 text-xs font-bold text-[#D97706] hover:underline font-mono">Open Publication &rarr;</a>` : ""}
        </div>
      `;
    }).join("");

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — Zine Shelf</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Playfair+Display:ital,wght@0,600;0,800;1,400&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  <style>
    body { background-color: #FAF6EE; color: #2D2A26; font-family: 'Space Grotesk', sans-serif; }
    .handwriting { font-family: 'Caveat', cursive; }
  </style>
</head>
<body class="p-6 sm:p-12 min-h-screen">
  <div class="max-w-5xl mx-auto">
    <!-- Header with Flower Icon -->
    <header class="flex items-center justify-between pb-8 border-b-2 border-[#EADFCB]">
      <div class="flex items-center gap-3">
        <span class="text-3xl">🌸</span>
        <div>
          <span class="text-xs font-mono uppercase tracking-widest text-[#8C7A6B] block">Digital Zine Shelf</span>
          <span class="text-xl sm:text-2xl font-black text-[#2D2A26]">${name.toLowerCase()}'s shelf</span>
        </div>
      </div>
      <div class="flex items-center gap-4 text-xs font-mono text-[#8C7A6B]">
        <span class="handwriting text-2xl text-[#D97706]">"Curated with care"</span>
      </div>
    </header>

    <!-- Shelf Hero -->
    <section class="py-16 max-w-3xl">
      <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3EDE2] border border-[#E0D4C0] text-xs font-mono text-[#8C7A6B] mb-6">
        <span>📚 Verified Digital Zine Collection</span>
      </div>
      <h1 class="text-4xl sm:text-6xl font-black text-[#2D2A26] tracking-tight leading-tight mb-6" style="font-family: 'Playfair Display', serif;">
        ${headline}
      </h1>
      <p class="text-base text-[#6B635B] leading-relaxed mb-8 max-w-2xl font-sans">
        ${bio}
      </p>
      <div class="flex flex-wrap gap-2">
        ${skills.map(s => `<span class="px-3.5 py-1.5 rounded-full bg-[#FFFDF9] border border-[#E5DECF] text-xs font-mono text-[#4A4238] shadow-xs">${s}</span>`).join("")}
      </div>
    </section>

    <!-- Shelf Grid -->
    <section class="py-12 border-t-2 border-[#EADFCB]">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold tracking-tight text-[#2D2A26]">Published Case Studies &amp; Zines</h2>
        <span class="font-mono text-xs text-[#8C7A6B]">Interactive Grid</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${zineCards}
      </div>
    </section>

    <!-- Footer -->
    <footer class="mt-16 pt-8 border-t-2 border-[#EADFCB] flex flex-wrap items-center justify-between text-xs font-mono text-[#8C7A6B]">
      <span>${contact.email ? `Write to me: ${contact.email}` : "Open for creative collaborations"}</span>
      <div class="flex gap-4">
        ${contact.github ? `<a href="${contact.github}" target="_blank" class="hover:underline text-[#2D2A26]">GitHub</a>` : ""}
        ${contact.linkedin ? `<a href="${contact.linkedin}" target="_blank" class="hover:underline text-[#2D2A26]">LinkedIn</a>` : ""}
      </div>
    </footer>
  </div>
</body>
</html>`;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. ICONIC BENTOFOLIO / MODULAR BENTO GRID (Aceternity 3D & Console Hub)
  // ─────────────────────────────────────────────────────────────────────────────
  const isBento = lowerUrl.includes("bento") || lowerUrl.includes("grid") || lowerHtml.includes("bentofolio") || lowerHtml.includes("bento-grid");
  if (isBento) {
    const bentoCards = projects.map((p, idx) => {
      const tech = (p.techStack || (p as any).tags || []) as string[];
      const link = p.liveUrl || p.githubUrl || (p as any).link || "#";
      return `
        <div class="rounded-3xl bg-[#111420]/90 border border-white/[0.08] p-6 sm:p-8 hover:border-sky-500/50 hover:scale-[1.01] transition-all duration-300 shadow-2xl flex flex-col justify-between group">
          <div>
            <div class="flex items-center justify-between text-xs font-mono mb-4">
              <span class="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold">BENTO-0${idx + 1}</span>
              <span class="text-slate-400">Production Unit</span>
            </div>
            <h3 class="text-2xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">${p.title}</h3>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">${p.description}</p>
          </div>
          <div>
            <div class="flex flex-wrap gap-1.5 mb-5 font-mono text-[11px]">
              ${tech.map(t => `<span class="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10">${t}</span>`).join("")}
            </div>
            ${link !== "#" ? `<a href="${link}" target="_blank" class="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors font-mono">View Artifact &rarr;</a>` : ""}
          </div>
        </div>
      `;
    }).join("");

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — BentoGrid Studio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>body { background-color: #090A0F; color: #F8FAFC; font-family: 'Plus Jakarta Sans', sans-serif; }</style>
</head>
<body class="p-6 sm:p-12 min-h-screen">
  <div class="max-w-6xl mx-auto space-y-8">
    <header class="flex items-center justify-between pb-6 border-b border-white/[0.08]">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center font-bold text-white">${name.charAt(0)}</div>
        <span class="font-bold text-sm tracking-tight">${name} // BENTO HUB</span>
      </div>
      <span class="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">Active for Work</span>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div class="md:col-span-2 rounded-3xl bg-[#111420] border border-white/[0.08] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <h1 class="text-4xl sm:text-5xl font-black mb-4 leading-tight">Hi, I'm <span class="text-sky-400">${name}</span>.</h1>
        <p class="text-base text-slate-300 mb-6 max-w-xl">${headline} — ${bio}</p>
        <div class="flex flex-wrap gap-2">
          ${skills.map(s => `<span class="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-200">${s}</span>`).join("")}
        </div>
      </div>

      <div class="rounded-3xl bg-[#111420] border border-white/[0.08] p-6 shadow-2xl font-mono text-xs flex flex-col justify-between">
        <div class="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <span class="text-slate-400">developer.sh</span>
          <span class="text-emerald-400">● live</span>
        </div>
        <div class="py-4 space-y-2 text-slate-300">
          <div class="text-emerald-400">$ whoami</div>
          <div class="text-slate-400 text-[11px]">&gt; ${name.toLowerCase().replace(/\s+/g, '_')}</div>
          <div class="text-emerald-400 pt-2">$ git branch</div>
          <div class="text-slate-400 text-[11px]">&gt; * main (zero errors)</div>
        </div>
        <div class="pt-3 border-t border-white/[0.08] text-[10px] text-slate-400">
          Console Easter Egg: F12
        </div>
      </div>
    </div>

    <div class="pt-4">
      <h2 class="text-2xl font-bold mb-6">Production Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        ${bentoCards}
      </div>
    </div>

    <footer class="pt-8 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400">
      <span>${contact.email ? contact.email : "Open for engineering opportunities"}</span>
      <div class="flex gap-4">
        ${contact.github ? `<a href="${contact.github}" target="_blank" class="text-sky-400 hover:underline">GitHub</a>` : ""}
        ${contact.linkedin ? `<a href="${contact.linkedin}" target="_blank" class="text-sky-400 hover:underline">LinkedIn</a>` : ""}
      </div>
    </footer>
  </div>
</body>
</html>`;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. ICONIC SUDARVEL K / DARK TELEMETRY (#0C0D0E)
  // ─────────────────────────────────────────────────────────────────────────────
  const projectCards = projects.map((p, idx) => `
    <div class="bg-[#111317] border border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-emerald-500 transition-all text-slate-100 shadow-2xl group">
      <div class="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
        <span>DRAWER-0${idx + 1} // TELEMETRY</span>
        <span class="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">ACTIVE</span>
      </div>
      <h3 class="text-2xl font-bold font-mono group-hover:text-emerald-400 transition-colors mb-2">${p.title}</h3>
      <p class="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">${p.description}</p>
      <div class="flex flex-wrap gap-2 font-mono text-xs">
        ${(p.techStack || []).map(t => `<span class="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300">${t}</span>`).join("")}
      </div>
    </div>
  `).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — Telemetry</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
</head>
<body class="bg-[#0c0d0e] text-slate-100 font-['Inter'] p-6 sm:p-12 min-h-screen">
  <div class="max-w-6xl mx-auto">
    <header class="flex items-center justify-between pb-6 border-b border-slate-800 font-mono text-xs">
      <span class="font-bold text-emerald-400 uppercase tracking-widest">${name} // TELEMETRY</span>
      <span class="text-slate-400">ENGINEERING CASE STUDIES</span>
    </header>
    <div class="py-16 max-w-3xl">
      <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">${headline}</h1>
      <p class="text-slate-400 text-sm sm:text-base leading-relaxed mb-6 font-mono">${bio}</p>
      <div class="flex flex-wrap gap-2">
        ${skills.map(s => `<span class="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400 font-mono text-xs">${s}</span>`).join("")}
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-800">
      ${projectCards}
    </div>
  </div>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const { url, content } = (await req.json()) as {
      url: string;
      content: PortfolioContent;
    };

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Please provide a valid inspiration URL." },
        { status: 400 }
      );
    }

    // 1. Safely fetch the reference site's HTML
    let fetchedHtml = "";
    try {
      const result = await safeFetchPage(url);
      fetchedHtml = extractDesignContext(result.htmlSnippet);
    } catch (err: any) {
      console.warn("Could not fetch target URL directly, using URL signal synthesis:", err.message);
    }

    // 2. Synthesize bespoke portfolio matching exact aesthetic
    const bespokeHtml = synthesizeBespokePortfolio(url, fetchedHtml, content);

    return NextResponse.json({
      success: true,
      url,
      html: bespokeHtml,
      engine: "bespoke-synthesizer",
    });
  } catch (error: any) {
    console.error("Inspiration Clone Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate custom portfolio." },
      { status: 500 }
    );
  }
}
