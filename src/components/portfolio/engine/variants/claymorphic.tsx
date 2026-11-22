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

export function ClaymorphicNav({ theme, content }: { theme: ThemePackage; content: PortfolioContent }) {
  return (
    <nav className="w-full px-8 py-5 flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <span className="font-extrabold text-slate-800 tracking-tight text-base">
          {content.name || "Portfolio"}
        </span>
      </div>
      <div className="flex items-center gap-4 text-xs font-bold text-indigo-600">
        {content.contact?.email && (
          <a
            href={`mailto:${content.contact.email}`}
            className="px-4 py-2 rounded-2xl bg-white/70 hover:bg-white text-indigo-600 shadow-[0_10px_20px_-8px_rgba(139,92,246,0.25)] border border-white/60 transition-all"
          >
            Say Hello 👋
          </a>
        )}
      </div>
    </nav>
  );
}

export function ClaymorphicHero({ theme, content }: { theme: ThemePackage; content: PortfolioContent }) {
  return (
    <header className="pt-12 pb-10 text-center max-w-3xl mx-auto space-y-6 px-4">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 shadow-[0_8px_16px_rgba(109,40,217,0.12)] border border-white text-indigo-700 text-xs font-bold">
        <Sparkles className="w-4 h-4 text-pink-500" /> ✨ {content.availability || "Open to Collaborations & Roles"}
      </div>
      <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight drop-shadow-sm">
        {content.name || "Creative Builder"}
      </h1>
      <h2 className="text-lg md:text-xl font-bold text-indigo-600">
        {content.headline || "Full-Stack Engineer & AI Craftsman"}
      </h2>
      <div className="p-6 md:p-8 rounded-[2rem] bg-white/65 backdrop-blur-xl border-2 border-white/80 shadow-[0_20px_40px_-15px_rgba(109,40,217,0.15)] max-w-2xl mx-auto text-slate-700 font-medium leading-relaxed">
        {content.bio || "Creating playful, tactile digital products that bridge thoughtful design and resilient code."}
      </div>
    </header>
  );
}

export function ClaymorphicProjects({ theme, content }: { theme: ThemePackage; content: PortfolioContent }) {
  const projects = content.projects || [];
  if (projects.length === 0) return null;

  return (
    <section className="space-y-8 pt-8 max-w-5xl mx-auto px-6">
      <h3 className="text-2xl font-black text-slate-800 text-center">
        🎨 Selected Works
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="rounded-[2rem] p-6 bg-white/65 backdrop-blur-xl border-2 border-white/80 shadow-[0_20px_40px_-15px_rgba(109,40,217,0.12)] hover:shadow-[0_25px_45px_-12px_rgba(109,40,217,0.2)] transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {(proj.techStack || []).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] font-bold px-3 py-1 rounded-full bg-indigo-100/80 text-indigo-700 border border-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h4 className="text-xl font-black text-slate-900">{proj.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{proj.description}</p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between text-xs">
              {proj.liveUrl ? (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-[0_8px_16px_rgba(79,70,229,0.3)] flex items-center gap-1 transition-all"
                >
                  Visit Project <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : <div />}
              {proj.githubUrl && (
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold border border-slate-200 flex items-center gap-1 transition-all"
                >
                  GitHub <GithubIcon className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ClaymorphicSkills({ theme, content }: { theme: ThemePackage; content: PortfolioContent }) {
  const skills = content.skills || [];
  if (skills.length === 0) return null;

  return (
    <section className="space-y-6 pt-10 text-center max-w-5xl mx-auto px-6">
      <h3 className="text-2xl font-black text-slate-800">
        🛠 Tools &amp; Superpowers
      </h3>
      <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="px-4 py-2 rounded-2xl bg-white/80 border-2 border-white text-slate-800 font-bold text-xs shadow-[0_8px_16px_rgba(109,40,217,0.08)] hover:scale-105 transition-transform"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

export function ClaymorphicExperience({ theme, content }: { theme: ThemePackage; content: PortfolioContent }) {
  const exp = content.experience || [];
  if (exp.length === 0) return null;

  return (
    <section className="space-y-6 pt-10 max-w-5xl mx-auto px-6">
      <h3 className="text-2xl font-black text-slate-800 text-center">
        💼 Journey &amp; Impact
      </h3>
      <div className="space-y-4 max-w-3xl mx-auto">
        {exp.map((item, idx) => (
          <div
            key={idx}
            className="rounded-[2rem] p-6 bg-white/65 backdrop-blur-xl border-2 border-white/80 shadow-[0_15px_30px_-10px_rgba(109,40,217,0.1)] space-y-2"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h4 className="text-lg font-black text-slate-900">{item.role}</h4>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                {item.company} &bull; {item.period}
              </span>
            </div>
            {item.highlights && item.highlights.length > 0 && (
              <ul className="list-disc pl-5 text-slate-600 text-sm space-y-1">
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

export function ClaymorphicContact({ theme, content }: { theme: ThemePackage; content: PortfolioContent }) {
  return (
    <footer className="mt-16 pt-8 border-t border-indigo-100 text-center text-xs font-bold text-slate-400 pb-12 max-w-5xl mx-auto px-6">
      <p>Crafted in 3D Claymorphism &bull; FolioVeda</p>
    </footer>
  );
}
