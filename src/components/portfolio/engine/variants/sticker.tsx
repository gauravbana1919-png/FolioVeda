"use client";

import React from "react";
import { PortfolioContent } from "@/types/content";
import { ThemePackage } from "@/types/theme";
import { Heart, Sparkles, Smile, ExternalLink, Mail, Coffee } from "lucide-react";

interface VariantProps {
  content: PortfolioContent;
  theme: ThemePackage;
}

export function StickerNav({ content }: VariantProps) {
  return (
    <nav className="w-full border-b border-amber-200 bg-[#FFFBEB]/90 backdrop-blur-md px-6 py-4 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-full bg-amber-400 text-amber-950">
            <Smile size={16} />
          </span>
          <span className="font-extrabold text-base tracking-tight text-amber-950">
            {content.name}
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold text-amber-900">
          <a href="#projects" className="hover:text-amber-600 transition-colors">✨ Projects</a>
          <a href="#skills" className="hover:text-amber-600 transition-colors">🛠️ Toolkit</a>
          <a href="#contact" className="px-3.5 py-1.5 rounded-full bg-amber-400 text-amber-950 hover:bg-amber-300 transition-colors shadow-xs">
            Say Hello 👋
          </a>
        </div>
      </div>
    </nav>
  );
}

export function StickerHero({ content }: VariantProps) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 text-center space-y-6">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-200/80 border border-amber-300 text-amber-900 text-xs font-bold shadow-xs">
        <Sparkles size={14} className="text-amber-600" /> Open to fun & ambitious ideas!
      </div>

      <h1 className="text-4xl sm:text-6xl font-black text-amber-950 tracking-tight leading-tight max-w-3xl mx-auto">
        {content.headline}
      </h1>

      <p className="text-base sm:text-lg text-amber-900/80 max-w-2xl mx-auto leading-relaxed">
        {content.bio}
      </p>

      <div className="pt-2 flex justify-center gap-3">
        <a
          href="#projects"
          className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-amber-950 font-black text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105"
        >
          See What I've Built 🎉
        </a>
      </div>
    </section>
  );
}

export function StickerProjects({ content }: VariantProps) {
  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
          Handcrafted Work
        </span>
        <h2 className="text-3xl font-black text-amber-950 mt-1">
          Featured Creations
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {content.projects.map((proj, idx) => (
          <div
            key={idx}
            className="rounded-2xl border-2 border-amber-200 bg-[#FEF3C7]/60 p-6 flex flex-col justify-between hover:border-amber-400 hover:shadow-lg transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-[11px] font-bold">
                  Sticker #{idx + 1}
                </span>
                {proj.metrics && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold">
                    {proj.metrics}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-black text-amber-950">{proj.title}</h3>
              <p className="text-xs sm:text-sm text-amber-900/80 mt-2 leading-relaxed">
                {proj.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-amber-200/80 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {proj.techStack.map((tech, tidx) => (
                  <span
                    key={tidx}
                    className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#FFFBEB] text-amber-900 border border-amber-200 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {proj.liveUrl && (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-amber-700 hover:text-amber-950 flex items-center gap-1 underline"
                >
                  <span>Explore</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function StickerSkills({ content }: VariantProps) {
  return (
    <section id="skills" className="max-w-5xl mx-auto px-6 py-12">
      <div className="rounded-3xl border-2 border-dashed border-amber-300 bg-[#FEF3C7]/40 p-8 text-center">
        <h2 className="text-xl font-black text-amber-950 mb-4">
          Favorite Tools & Magic Wands
        </h2>
        <div className="flex flex-wrap justify-center gap-2.5">
          {content.skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-4 py-2 rounded-full bg-[#FFFBEB] border border-amber-300 text-amber-950 text-xs font-bold shadow-xs hover:rotate-2 transition-transform cursor-default"
            >
              🏷️ {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StickerExperience({ content }: VariantProps) {
  if (!content.experience || content.experience.length === 0) return null;

  return (
    <section id="experience" className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-amber-950">
          The Journey So Far
        </h2>
      </div>

      <div className="space-y-4">
        {content.experience.map((exp, idx) => (
          <div key={idx} className="rounded-2xl border border-amber-200 bg-white p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
              <span className="font-extrabold text-amber-950 text-sm">{exp.role} @ {exp.company}</span>
              <span className="text-amber-700 font-bold">{exp.period}</span>
            </div>
            {exp.highlights && exp.highlights.length > 0 && (
              <ul className="mt-2 text-xs text-amber-900/80 space-y-1 list-disc list-inside">
                {exp.highlights.map((h, hidx) => (
                  <li key={hidx}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function StickerContact({ content }: VariantProps) {
  return (
    <footer id="contact" className="max-w-5xl mx-auto px-6 py-16 text-center space-y-6">
      <h2 className="text-3xl sm:text-4xl font-black text-amber-950">
        Let’s make something cool together!
      </h2>
      <p className="text-xs text-amber-900/70 max-w-sm mx-auto">
        Feel free to reach out anytime. My inbox is always friendly.
      </p>

      {content.contact.email && (
        <a
          href={`mailto:${content.contact.email}`}
          className="inline-block px-8 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-amber-950 font-black text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105"
        >
          Drop a Note ({content.contact.email})
        </a>
      )}
    </footer>
  );
}
