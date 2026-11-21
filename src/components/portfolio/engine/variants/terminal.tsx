"use client";

import React, { useState } from "react";
import { PortfolioContent } from "@/types/content";
import { ThemePackage } from "@/types/theme";

interface VariantProps {
  content: PortfolioContent;
  theme: ThemePackage;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function Prompt({ path = "~" }: { path?: string }) {
  return (
    <span className="select-none">
      <span className="text-[#2EA043] font-bold">user@portfolio</span>
      <span className="text-[#8B949E]">:</span>
      <span className="text-[#79C0FF]">{path}</span>
      <span className="text-[#E6EDF3]">$ </span>
    </span>
  );
}

function TerminalWindow({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-[#30363D] bg-[#161B22] shadow-2xl shadow-black/60 overflow-hidden ${className}`}
    >
      {/* Chrome bar */}
      <div className="bg-[#0D1117] px-4 py-3 border-b border-[#30363D] flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57] hover:opacity-80 transition-opacity cursor-default" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:opacity-80 transition-opacity cursor-default" />
          <div className="w-3 h-3 rounded-full bg-[#28C840] hover:opacity-80 transition-opacity cursor-default" />
        </div>
        {title && (
          <span className="flex-1 text-center text-[11px] text-[#8B949E] font-mono tracking-wide">
            {title}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function SectionHeader({ command }: { command: string }) {
  return (
    <div className="flex items-center gap-2 mb-6 text-sm font-mono">
      <span className="text-[#2EA043] font-bold select-none">$</span>
      <h2 className="text-[#E6EDF3] font-semibold tracking-wide">{command}</h2>
    </div>
  );
}

function groupSkills(skills: string[]): Record<string, string[]> {
  const frontendKeywords = [
    "react",
    "vue",
    "angular",
    "next",
    "svelte",
    "html",
    "css",
    "tailwind",
    "sass",
    "redux",
    "typescript",
    "javascript",
    "figma",
    "webpack",
    "vite",
  ];
  const backendKeywords = [
    "node",
    "python",
    "django",
    "flask",
    "express",
    "ruby",
    "rails",
    "go",
    "rust",
    "java",
    "spring",
    "php",
    "laravel",
    "graphql",
    "rest",
    "api",
    "sql",
    "postgres",
    "mysql",
    "mongo",
    "redis",
    "prisma",
    "supabase",
    "firebase",
  ];
  const toolsKeywords = [
    "git",
    "docker",
    "kubernetes",
    "aws",
    "gcp",
    "azure",
    "ci",
    "cd",
    "linux",
    "bash",
    "vercel",
    "netlify",
    "nginx",
    "jest",
    "vitest",
    "cypress",
    "github",
    "gitlab",
    "terraform",
  ];

  const groups: Record<string, string[]> = {
    Frontend: [],
    Backend: [],
    "Tools & DevOps": [],
    Other: [],
  };

  for (const skill of skills) {
    const lower = skill.toLowerCase();
    if (frontendKeywords.some((k) => lower.includes(k))) {
      groups["Frontend"].push(skill);
    } else if (backendKeywords.some((k) => lower.includes(k))) {
      groups["Backend"].push(skill);
    } else if (toolsKeywords.some((k) => lower.includes(k))) {
      groups["Tools & DevOps"].push(skill);
    } else {
      groups["Other"].push(skill);
    }
  }

  // Remove empty groups
  return Object.fromEntries(
    Object.entries(groups).filter(([, v]) => v.length > 0)
  );
}

const FAKE_COMMITS = [
  { hash: "a3f9c12", msg: "feat(portfolio): add GitHub sync integration" },
  { hash: "b82e047", msg: "fix(auth): resolve OAuth redirect loop" },
  { hash: "c1d5f88", msg: "chore(deps): upgrade to Next.js 16" },
];

// ─── Nav ────────────────────────────────────────────────────────────────────

export function TerminalNav({ content }: VariantProps) {
  const slug = content.name.toLowerCase().replace(/\s+/g, "-");
  return (
    <nav className="w-full border-b border-[#30363D] bg-[#0D1117]/95 backdrop-blur-md px-4 py-3 sticky top-0 z-40 font-mono text-xs">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#E6EDF3]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#2EA043] animate-pulse" />
          <span className="font-bold text-[#2EA043]">~/{slug}</span>
          <span className="text-[#8B949E] hidden sm:inline">(git:main✓)</span>
        </div>
        <div className="flex items-center gap-5 text-[#8B949E]">
          {[
            ["#projects", "./projects"],
            ["#skills", "./skills"],
            ["#experience", "./experience"],
            ["#contact", "./contact"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="hover:text-[#2EA043] transition-colors duration-150"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────

export function TerminalHero({ content }: VariantProps) {
  const sshHost = `${content.name.toLowerCase().replace(/\s+/g, "")}@folioveda.live`;

  return (
    <section className="max-w-5xl mx-auto px-4 py-12 font-mono">
      {/* Typewriter keyframe injected once */}
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .cursor-blink { animation: blink 1s step-end infinite; }
        @keyframes typewriter {
          from { width: 0; }
          to   { width: 100%; }
        }
        .typewriter {
          overflow: hidden;
          white-space: nowrap;
          animation: typewriter 1.8s steps(40,end) forwards;
          display: inline-block;
          max-width: 100%;
        }
      `}</style>

      <TerminalWindow title={`bash — 120×40 — ${sshHost}`}>
        <div className="p-6 sm:p-8 text-sm space-y-5 leading-relaxed">

          {/* whoami */}
          <div>
            <div className="mb-2">
              <Prompt />
              <span className="text-[#E6EDF3]">whoami</span>
            </div>
            <div className="pl-4 border-l-2 border-[#2EA043] space-y-1 py-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#E6EDF3] tracking-tight typewriter">
                {content.name}
              </h1>
              <p className="text-[#79C0FF] font-semibold text-base">
                {content.headline}
              </p>
            </div>
          </div>

          {/* cat about.md */}
          <div>
            <div className="mb-2">
              <Prompt />
              <span className="text-[#E6EDF3]">cat about.md</span>
            </div>
            <div className="pl-4 border-l-2 border-[#30363D]">
              <p className="text-[#8B949E] text-xs sm:text-sm leading-relaxed max-w-3xl">
                {content.bio}
              </p>
            </div>
          </div>

          {/* git log */}
          <div>
            <div className="mb-2">
              <Prompt />
              <span className="text-[#E6EDF3]">git log --oneline -3</span>
            </div>
            <div className="pl-4 space-y-1">
              {FAKE_COMMITS.map((c) => (
                <div key={c.hash} className="flex items-center gap-3 text-xs">
                  <span className="text-[#D2A8FF] font-mono">{c.hash}</span>
                  <span className="text-[#8B949E]">{c.msg}</span>
                </div>
              ))}
            </div>
          </div>

          {/* open --available-for */}
          <div>
            <div className="mb-2">
              <Prompt />
              <span className="text-[#E6EDF3]">open --available-for</span>
            </div>
            <div className="pl-4 flex flex-wrap gap-2">
              {[
                "Full-Stack Development",
                "Open Source",
                "Freelance",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-[#2EA043]/15 border border-[#2EA043]/40 text-[#3FB950] text-xs font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Blinking cursor prompt */}
          <div className="pt-1 flex items-center gap-1 text-sm">
            <Prompt />
            <span className="text-[#2EA043] font-bold cursor-blink">▮</span>
          </div>
        </div>
      </TerminalWindow>
    </section>
  );
}

// ─── Projects ───────────────────────────────────────────────────────────────

export function TerminalProjects({ content }: VariantProps) {
  return (
    <section id="projects" className="max-w-5xl mx-auto px-4 py-8 font-mono">
      <SectionHeader command="ls -la ~/projects | grep pinned" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {content.projects.map((proj, idx) => (
          <div
            key={idx}
            className="group relative border border-[#30363D] bg-[#161B22] rounded-xl overflow-hidden hover:border-[#2EA043] transition-all duration-200 hover:shadow-lg hover:shadow-[#2EA043]/10 flex flex-col"
          >
            {/* Green accent top strip */}
            <div className="h-1 w-full bg-gradient-to-r from-[#2EA043] to-[#3FB950] group-hover:from-[#3FB950] group-hover:to-[#7CE38B] transition-all duration-300" />

            <div className="p-5 flex flex-col flex-1">
              {/* Header row */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📁</span>
                  <h3 className="text-base font-bold text-[#E6EDF3] group-hover:text-[#2EA043] transition-colors">
                    {proj.title}
                  </h3>
                </div>
                {proj.metrics ? (
                  <span className="shrink-0 px-2 py-0.5 rounded-full bg-[#2EA043]/10 border border-[#2EA043]/30 text-[#7CE38B] text-[11px] font-semibold whitespace-nowrap">
                    ⭐ {proj.metrics}
                  </span>
                ) : (
                  <span className="shrink-0 px-2 py-0.5 rounded-full bg-[#79C0FF]/10 border border-[#79C0FF]/20 text-[#79C0FF] text-[11px] font-semibold whitespace-nowrap">
                    ⭐ Open Source
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-[#8B949E] leading-relaxed flex-1 mb-4">
                {proj.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {proj.techStack.map((tech, tidx) => (
                  <span
                    key={tidx}
                    className="text-[11px] px-2 py-0.5 rounded bg-[#0D1117] text-[#8B949E] border border-[#30363D] hover:border-[#79C0FF] hover:text-[#79C0FF] transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-3 text-xs pt-3 border-t border-[#30363D]">
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 px-2.5 py-1 rounded border border-[#2EA043]/50 text-[#2EA043] hover:bg-[#2EA043]/10 transition-all font-semibold"
                  >
                    <span>▶</span> live →
                  </a>
                )}
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 px-2.5 py-1 rounded border border-[#30363D] text-[#79C0FF] hover:bg-[#79C0FF]/10 hover:border-[#79C0FF]/50 transition-all"
                  >
                    <span>{"<>"}</span> src →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Skills ─────────────────────────────────────────────────────────────────

const GROUP_COLORS: Record<string, { border: string; text: string; bg: string; label: string }> = {
  Frontend:        { border: "#79C0FF", text: "#79C0FF", bg: "#79C0FF18", label: "FRONTEND" },
  Backend:         { border: "#2EA043", text: "#3FB950", bg: "#2EA04318", label: "BACKEND" },
  "Tools & DevOps":{ border: "#D2A8FF", text: "#D2A8FF", bg: "#D2A8FF18", label: "DEVOPS" },
  Other:           { border: "#FAA356", text: "#FAA356", bg: "#FAA35618", label: "OTHER" },
};

export function TerminalSkills({ content }: VariantProps) {
  const groups = groupSkills(content.skills);

  return (
    <section id="skills" className="max-w-5xl mx-auto px-4 py-8 font-mono">
      <SectionHeader command="printenv | grep SKILLS" />

      <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-6 space-y-6">
        {Object.entries(groups).map(([group, skills]) => {
          const c = GROUP_COLORS[group] ?? GROUP_COLORS["Other"];
          return (
            <div key={group}>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-[11px] font-bold px-2 py-0.5 rounded"
                  style={{
                    color: c.text,
                    background: c.bg,
                    border: `1px solid ${c.border}40`,
                  }}
                >
                  {c.label}
                </span>
                <span className="text-[#8B949E] text-xs">
                  =&quot;{skills.length} skills loaded&quot;
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-md cursor-default transition-all duration-150 hover:scale-105"
                    style={{
                      color: c.text,
                      background: c.bg,
                      border: `1px solid ${c.border}50`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Experience ─────────────────────────────────────────────────────────────

const HASH_CHARS = "0123456789abcdef";
function fakeHash(seed: number) {
  let h = "";
  for (let i = 0; i < 7; i++) h += HASH_CHARS[(seed * 37 + i * 13) % 16];
  return h;
}

export function TerminalExperience({ content }: VariantProps) {
  if (!content.experience || content.experience.length === 0) return null;

  return (
    <section id="experience" className="max-w-5xl mx-auto px-4 py-8 font-mono">
      <SectionHeader command='git log --author=me --format="%h %s" --reverse' />

      <div className="space-y-5">
        {content.experience.map((exp, idx) => {
          const hash = fakeHash(idx + 1);
          return (
            <div
              key={idx}
              className="rounded-xl border border-[#30363D] bg-[#161B22] overflow-hidden hover:border-[#2EA043]/50 transition-colors"
            >
              {/* Commit header */}
              <div className="px-5 py-3 bg-[#0D1117] border-b border-[#30363D] flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[#D2A8FF]">commit {hash}</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#2EA043]/10 border border-[#2EA043]/30 text-[#7CE38B] text-[11px] font-semibold">
                    {exp.period}
                  </span>
                </div>
                <span className="text-[#8B949E] font-mono text-[11px]">
                  Author: {exp.role}
                </span>
              </div>

              {/* Body */}
              <div className="px-5 py-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 mb-3">
                  <h3 className="text-[#E6EDF3] font-bold text-base">
                    {exp.role}
                  </h3>
                  <span className="hidden sm:block text-[#8B949E] mx-1">@</span>
                  <span className="text-[#79C0FF] font-semibold">{exp.company}</span>
                </div>

                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-1.5">
                    {exp.highlights.map((h, hidx) => (
                      <li
                        key={hidx}
                        className="flex items-start gap-2 text-xs text-[#8B949E] leading-relaxed"
                      >
                        <span className="text-[#2EA043] mt-0.5 shrink-0">▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Contact ────────────────────────────────────────────────────────────────

export function TerminalContact({ content }: VariantProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    if (content.contact.email) {
      navigator.clipboard.writeText(content.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <footer
      id="contact"
      className="max-w-5xl mx-auto px-4 py-16 font-mono border-t border-[#30363D] mt-8"
    >
      <TerminalWindow title="hire-me — POST request">
        <div className="p-6 sm:p-8 space-y-6 text-sm">

          {/* Command */}
          <div>
            <Prompt />
            <span className="text-[#E6EDF3]">
              curl -X POST https://folioveda.me/api/hire-me
            </span>
          </div>

          {/* Available badge */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2EA043]/15 border border-[#2EA043]/50 text-[#3FB950] font-bold text-sm">
              <span className="w-2 h-2 rounded-full bg-[#2EA043] animate-pulse inline-block" />
              Available for work
            </span>
          </div>

          {/* Response block */}
          <div className="rounded-lg bg-[#0D1117] border border-[#30363D] p-4 space-y-3 text-xs">
            <div className="text-[#8B949E]">HTTP/1.1 200 OK</div>
            <div className="text-[#8B949E]">Content-Type: application/json</div>
            <div className="border-t border-[#30363D] pt-3 space-y-2 text-[#E6EDF3]">
              {content.contact.email && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[#8B949E]">&quot;email&quot;:</span>
                  <button
                    onClick={copyEmail}
                    className={`px-3 py-1 rounded font-semibold transition-all duration-200 ${
                      copied
                        ? "bg-[#3FB950]/20 text-[#7CE38B] border border-[#3FB950]/40"
                        : "bg-[#2EA043] text-[#0D1117] hover:bg-[#3FB950]"
                    }`}
                  >
                    {copied
                      ? "✓ copied!"
                      : `"${content.contact.email}"`}
                  </button>
                  {!copied && (
                    <span className="text-[#8B949E] text-[11px]">← click to copy</span>
                  )}
                </div>
              )}

              {content.contact.github && (
                <div className="flex items-center gap-2">
                  <span className="text-[#8B949E]">&quot;github&quot;:</span>
                  <a
                    href={content.contact.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#79C0FF] hover:underline underline-offset-2"
                  >
                    &quot;{content.contact.github}&quot; →
                  </a>
                </div>
              )}

              {content.contact.linkedin && (
                <div className="flex items-center gap-2">
                  <span className="text-[#8B949E]">&quot;linkedin&quot;:</span>
                  <a
                    href={content.contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#79C0FF] hover:underline underline-offset-2"
                  >
                    &quot;{content.contact.linkedin}&quot; →
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Final prompt */}
          <div className="flex items-center gap-1 text-sm pt-1">
            <Prompt />
            <span className="text-[#2EA043] font-bold cursor-blink">▮</span>
          </div>
        </div>
      </TerminalWindow>
    </footer>
  );
}
