"use client";

import React from "react";
import { PortfolioContent } from "@/types/content";
import { ThemePackage } from "@/types/theme";
import { Briefcase, Building, ExternalLink, Mail, Award, CheckCircle } from "lucide-react";

interface VariantProps {
  content: PortfolioContent;
  theme: ThemePackage;
}

export function CorporateNav({ content }: VariantProps) {
  return (
    <nav className="w-full border-b border-slate-200 bg-white/95 backdrop-blur-md px-6 py-4 sticky top-0 z-40 shadow-xs">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-6 bg-sky-600 rounded-xs"></div>
          <span className="font-bold text-base tracking-tight text-slate-900">
            {content.name}
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs font-semibold text-slate-600">
          <a href="#experience" className="hover:text-sky-600 transition-colors">Experience</a>
          <a href="#projects" className="hover:text-sky-600 transition-colors">Projects</a>
          <a href="#skills" className="hover:text-sky-600 transition-colors">Competencies</a>
          <a href="#contact" className="px-3 py-1.5 rounded bg-sky-600 text-white hover:bg-sky-700 transition-colors">
            Get in Touch
          </a>
        </div>
      </div>
    </nav>
  );
}

export function CorporateHero({ content }: VariantProps) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-8 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold">
            <Award size={13} /> Verified Professional Dossier
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {content.headline}
          </h1>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
            {content.bio}
          </p>
        </div>

        <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-4 shadow-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2">
            Executive Summary
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Focus Areas:</span>
              <span className="font-semibold text-slate-900">{content.skills.slice(0, 2).join(", ")}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Key Projects:</span>
              <span className="font-semibold text-slate-900">{content.projects.length} Documented</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Status:</span>
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                <CheckCircle size={12} /> Available
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CorporateExperience({ content }: VariantProps) {
  if (!content.experience || content.experience.length === 0) return null;

  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 py-12 border-t border-slate-200">
      <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
        <Briefcase size={18} className="text-sky-600" />
        Professional Career Track
      </h2>

      <div className="space-y-6">
        {content.experience.map((exp, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
              <h3 className="text-base font-bold text-slate-900">
                {exp.role} <span className="text-sky-600 font-medium">@ {exp.company}</span>
              </h3>
              <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {exp.period}
              </span>
            </div>
            {exp.highlights && exp.highlights.length > 0 && (
              <ul className="mt-3 text-xs text-slate-600 space-y-1.5 list-disc list-inside leading-relaxed">
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

export function CorporateProjects({ content }: VariantProps) {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-12 border-t border-slate-200">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-slate-900">
          Documented Initiatives & Deliverables
        </h2>
        <span className="text-xs text-slate-500 font-mono">
          {content.projects.length} Initiatives
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {content.projects.map((proj, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-between hover:border-sky-500 transition-colors shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500">Initiative #{idx + 1}</span>
                {proj.metrics && (
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold rounded">
                    {proj.metrics}
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900">{proj.title}</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{proj.description}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {proj.techStack.map((tech, tidx) => (
                  <span key={tidx} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                    {tech}
                  </span>
                ))}
              </div>
              {proj.liveUrl && (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1"
                >
                  <span>Review</span>
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

export function CorporateSkills({ content }: VariantProps) {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-12 border-t border-slate-200">
      <h2 className="text-xl font-bold text-slate-900 mb-6">
        Core Competencies & Technologies
      </h2>
      <div className="flex flex-wrap gap-2">
        {content.skills.map((skill, idx) => (
          <span
            key={idx}
            className="px-3 py-1.5 bg-white border border-slate-200 text-slate-800 text-xs font-semibold rounded shadow-xs"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

export function CorporateContact({ content }: VariantProps) {
  return (
    <footer id="contact" className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-200">
      <div className="bg-slate-900 text-white rounded-xl p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold">Initiate Professional Engagement</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-md">
            Directly connect for executive leadership, full-time engineering appointments, and advisory engagements.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {content.contact.email && (
            <a
              href={`mailto:${content.contact.email}`}
              className="px-5 py-2.5 rounded bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-colors"
            >
              Email Directly
            </a>
          )}
          {content.contact.linkedin && (
            <a
              href={content.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded border border-slate-700 hover:border-slate-500 text-slate-300 text-xs font-semibold transition-colors"
            >
              LinkedIn Dossier
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
