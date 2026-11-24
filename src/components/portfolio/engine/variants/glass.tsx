"use client";

import React from "react";
import { ThemePackage } from "@/types/theme";
import { PortfolioContent } from "@/types/content";
import { ArrowUpRight, Sparkles } from "lucide-react";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export function GlassNav({ theme, content }: { theme: ThemePackage; content: PortfolioContent }) {
  return (
    <nav className="w-full backdrop-blur-xl bg-slate-950/40 border-b border-white/10 px-8 py-5 flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
          {content.name ? content.name[0] : "P"}
        </div>
        <span className="font-semibold text-white tracking-wide">{content.name || "Portfolio"}</span>
      </div>
      <div className="flex items-center gap-4 text-xs font-medium text-slate-300">
        {content.contact?.email && (
          <a href={`mailto:${content.contact.email}`} className="hover:text-cyan-400 transition-colors">
            Get in touch &rarr;
          </a>
        )}
      </div>
    </nav>
  );
}

export function GlassHero({ theme, content }: { theme: ThemePackage; content: PortfolioContent }) {
  return (
    <header className="relative pt-16 pb-12 text-center max-w-3xl mx-auto space-y-6 px-4">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-medium backdrop-blur-md">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> {content.availability || "Open to high-impact opportunities"}
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cyan-300 tracking-tight leading-tight">
        {content.name || "Developer Name"}
      </h1>
      <h2 className="text-lg md:text-xl font-medium text-cyan-400/90 tracking-wide">
        {content.headline || "Full-Stack Engineer & Designer"}
      </h2>
      <p className="text-slate-300/80 text-base leading-relaxed max-w-2xl mx-auto backdrop-blur-sm p-4 rounded-2xl bg-white/[0.03] border border-white/5">
        {content.bio || "Building modern, immersive web applications with high visual craft and scalable systems."}
      </p>
    </header>
  );
}

export function GlassProjects({ theme, content }: { theme: ThemePackage; content: PortfolioContent }) {
  const projects = content.projects || [];
  if (projects.length === 0) return null;

  return (
    <section className="space-y-8 pt-10 max-w-5xl mx-auto px-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Featured Projects
        </h3>
        <span className="text-xs font-mono text-slate-400">{projects.length} Works</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="group relative rounded-2xl p-6 backdrop-blur-xl bg-white/[0.04] border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.07] transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {(proj.techStack || []).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-800/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h4 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                {proj.title}
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">{proj.description}</p>
              {proj.impact && (
                <p className="text-xs text-cyan-300 font-mono mt-1">Impact: {proj.impact}</p>
              )}
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs">
              {proj.liveUrl ? (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                >
                  Explore Live <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : <div />}
              {proj.githubUrl && (
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-white flex items-center gap-1 font-mono"
                >
                  Source <GithubIcon className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function GlassSkills({ theme, content }: { theme: ThemePackage; content: PortfolioContent }) {
  const skills = content.skills || [];
  if (skills.length === 0) return null;

  return (
    <section className="space-y-6 pt-10 max-w-5xl mx-auto px-6">
      <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4">
        <span className="w-2 h-2 rounded-full bg-indigo-400"></span> Skills &amp; Stack
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="text-xs font-mono px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-200 backdrop-blur-md transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

export function GlassExperience({ theme, content }: { theme: ThemePackage; content: PortfolioContent }) {
  const exp = content.experience || [];
  if (exp.length === 0) return null;

  return (
    <section className="space-y-6 pt-10 max-w-5xl mx-auto px-6">
      <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4">
        <span className="w-2 h-2 rounded-full bg-teal-400"></span> Career Trajectory
      </h3>
      <div className="space-y-4">
        {exp.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl p-6 backdrop-blur-xl bg-white/[0.04] border border-white/10 space-y-2"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h4 className="text-base font-bold text-white">{item.role}</h4>
              <span className="text-xs font-mono text-cyan-400">
                {item.company} &bull; {item.period}
              </span>
            </div>
            {item.highlights && item.highlights.length > 0 && (
              <ul className="list-disc pl-5 text-slate-300 text-sm space-y-1">
                {item.highlights.map((h, hIdx) => (
                  <li key={hIdx}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function GlassContact({ theme, content }: { theme: ThemePackage; content: PortfolioContent }) {
  return (
    <footer className="mt-20 pt-8 border-t border-white/10 text-center text-xs text-slate-400 pb-12 max-w-5xl mx-auto px-6">
      <p>Rendered with Glassmorphism Engine &bull; FolioIn</p>
    </footer>
  );
}
