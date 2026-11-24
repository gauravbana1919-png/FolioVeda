"use client";

import React from "react";
import { ThemePackage } from "@/types/theme";
import { PortfolioContent } from "@/types/content";
import { Mail, Phone, ExternalLink, ArrowUpRight } from "lucide-react";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export function NeoBrutalistNav({ theme, content }: { theme: ThemePackage; content: PortfolioContent }) {
  return (
    <nav className="w-full bg-[#f4f4f0] border-b-4 border-black px-6 py-4 flex items-center justify-between font-mono font-black uppercase text-sm tracking-wider">
      <span className="bg-yellow-400 border-2 border-black px-3 py-1 shadow-[2px_2px_0_rgba(0,0,0,1)]">
        {content.name || "Portfolio"}
      </span>
      <div className="flex gap-4">
        {content.contact?.github && (
          <a href={content.contact.github} target="_blank" rel="noreferrer" className="hover:underline decoration-2 flex items-center gap-1">
            <GithubIcon className="w-3.5 h-3.5" /> GitHub
          </a>
        )}
        {content.contact?.linkedin && (
          <a href={content.contact.linkedin} target="_blank" rel="noreferrer" className="hover:underline decoration-2">
            LinkedIn
          </a>
        )}
        {content.contact?.email && (
          <a href={`mailto:${content.contact.email}`} className="hover:underline decoration-2">
            Contact
          </a>
        )}
      </div>
    </nav>
  );
}

export function NeoBrutalistHero({ theme, content }: { theme: ThemePackage; content: PortfolioContent }) {
  return (
    <header className="space-y-6 pt-10 pb-8 border-b-4 border-black max-w-5xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight text-black drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
            {content.name || "YOUR NAME"}
          </h1>
          <div className="inline-block bg-yellow-400 border-4 border-black px-4 py-2 font-black text-xl uppercase shadow-[4px_4px_0_rgba(0,0,0,1)]">
            {content.headline || "DEVELOPER & BUILDER"}
          </div>
        </div>

        <div className="flex flex-col gap-2 font-mono font-bold uppercase text-xs">
          {content.location && <span>📍 {content.location}</span>}
          {content.contact?.email && (
            <a href={`mailto:${content.contact.email}`} className="hover:underline decoration-2">
              ✉️ {content.contact.email}
            </a>
          )}
        </div>
      </div>

      <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0_rgba(0,0,0,1)] text-lg md:text-xl font-medium leading-relaxed">
        {content.bio || "Crafting bold, resilient digital architectures and experiences."}
      </div>
    </header>
  );
}

export function NeoBrutalistProjects({ theme, content }: { theme: ThemePackage; content: PortfolioContent }) {
  const projects = content.projects || [];
  if (projects.length === 0) return null;

  return (
    <section className="space-y-8 pt-8 max-w-5xl mx-auto px-6">
      <div className="inline-block bg-[#ff90e8] border-4 border-black px-5 py-2 font-black text-2xl uppercase shadow-[4px_4px_0_rgba(0,0,0,1)]">
        Featured Projects
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="bg-white border-4 border-black p-6 shadow-[6px_6px_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {(proj.techStack || []).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="bg-[#bbf7d0] border-2 border-black px-2 py-0.5 text-xs font-black uppercase font-mono shadow-[1px_1px_0_rgba(0,0,0,1)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-2">{proj.title}</h3>
              <p className="text-slate-800 text-sm leading-relaxed mb-6 font-medium">{proj.description}</p>
              {proj.impact && (
                <p className="text-xs font-bold text-indigo-700 bg-indigo-50 p-2 border-2 border-black mb-4">
                  🚀 {proj.impact}
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-4 border-t-2 border-black">
              {proj.liveUrl && (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-yellow-400 border-2 border-black px-4 py-2 font-black text-xs uppercase shadow-[2px_2px_0_rgba(0,0,0,1)] flex items-center gap-1 hover:bg-yellow-300"
                >
                  Live Demo <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {proj.githubUrl && (
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#e0e7ff] border-2 border-black px-4 py-2 font-black text-xs uppercase shadow-[2px_2px_0_rgba(0,0,0,1)] flex items-center gap-1 hover:bg-indigo-100"
                >
                  Code
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function NeoBrutalistSkills({ theme, content }: { theme: ThemePackage; content: PortfolioContent }) {
  const skills = content.skills || [];
  if (skills.length === 0) return null;

  return (
    <section className="space-y-6 pt-8 max-w-5xl mx-auto px-6">
      <div className="inline-block bg-[#fed7aa] border-4 border-black px-5 py-2 font-black text-2xl uppercase shadow-[4px_4px_0_rgba(0,0,0,1)]">
        Skills &amp; Arsenal
      </div>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="bg-white border-3 border-black px-4 py-2 font-mono font-black text-sm uppercase shadow-[3px_3px_0_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

export function NeoBrutalistExperience({ theme, content }: { theme: ThemePackage; content: PortfolioContent }) {
  const exp = content.experience || [];
  if (exp.length === 0) return null;

  return (
    <section className="space-y-6 pt-8 max-w-5xl mx-auto px-6">
      <div className="inline-block bg-[#a7f3d0] border-4 border-black px-5 py-2 font-black text-2xl uppercase shadow-[4px_4px_0_rgba(0,0,0,1)]">
        Experience
      </div>
      <div className="space-y-4">
        {exp.map((item, idx) => (
          <div key={idx} className="bg-white border-4 border-black p-6 shadow-[5px_5px_0_rgba(0,0,0,1)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
              <h4 className="text-xl font-black uppercase">{item.role}</h4>
              <span className="font-mono text-xs font-bold uppercase bg-yellow-300 border-2 border-black px-2 py-0.5">
                {item.company} &bull; {item.period}
              </span>
            </div>
            {item.highlights && item.highlights.length > 0 && (
              <ul className="list-disc pl-5 text-slate-800 text-sm font-medium space-y-1 mt-2">
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

export function NeoBrutalistContact({ theme, content }: { theme: ThemePackage; content: PortfolioContent }) {
  return (
    <footer className="mt-16 pt-8 border-t-4 border-black text-center font-mono font-bold uppercase text-xs pb-12 max-w-5xl mx-auto px-6">
      <p>Designed with Bold Precision on FolioIn</p>
    </footer>
  );
}
