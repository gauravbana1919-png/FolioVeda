"use client";

import { useEffect, useState, useRef } from "react";
import * as Diff from "diff";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import Link from "next/link";
import { FolioVedaLogo } from "@/components/ui/Logo";
import { convertStructuredToMarkdown } from "@/app/api/resume/parse/route";
import { 
  FileText, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  ShieldCheck, 
  RefreshCw, 
  Briefcase,
  Plus,
  Trash2,
  Wand2,
  Scissors,
  User,
  GraduationCap,
  Layers,
  Code,
  Layout,
  Camera,
  MapPin,
  Mail,
  Phone,
  Link as LinkIcon,
  Globe,
  Award
} from "lucide-react";

// Inline brand icons for high fidelity
const LinkedinIcon = ({ size = 12, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 12, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export type ResumeTemplateId = "classic-ats" | "modern-sidebar" | "creative-header" | "minimal-compact";

interface PersonalDetails {
  name: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
  avatarUrl: string;
}

interface WorkExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
}

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year: string;
  gpa: string;
}

interface ProjectItem {
  id: string;
  title: string;
  techStack: string;
  description: string;
  link: string;
}

export default function ResumeBuilderStudio() {
  // Navigation / active left panel view
  const [editorTab, setEditorTab] = useState<"form" | "import" | "tailor" | "templates">("form");
  const [activeFormSection, setActiveFormSection] = useState<"personal" | "summary" | "experience" | "skills" | "education" | "projects">("personal");

  // Active Template State (Emily Carter, Brian Wayne, Camila Rivera, Daniel Mercer)
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplateId>("classic-ats");

  // Structured Content State
  const [personal, setPersonal] = useState<PersonalDetails>({
    name: "Emily Carter",
    headline: "Senior Project Manager & Operations Lead",
    email: "emily.carter@example.com",
    phone: "+1 (416) 555-0182",
    location: "Toronto, Ontario, Canada",
    linkedin: "https://linkedin.com/in/emily-carter",
    github: "https://github.com/emily-carter",
    website: "https://emilycarter.dev",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=faces",
  });

  const [summary, setSummary] = useState(
    "Project Manager with 6+ years of experience leading cross-functional teams in technology and business operations. Skilled in stakeholder management, predictive sprint planning, risk mitigation, and delivery governance across enterprise ecosystems. Known for building high-trust work environments, improving team alignment, and keeping complex projects moving under tight deadlines."
  );

  const [experience, setExperience] = useState<WorkExperience[]>([
    {
      id: "exp-1",
      role: "Project Manager",
      company: "TechNova Global",
      period: "05/2022 – Present",
      location: "Toronto, Canada",
      highlights: [
        "Managed release plans across product, engineering, and operations workstreams, delivering 14 major feature releases with zero downtime.",
        "Coordinated stakeholder updates, risk reviews, and milestone reporting, reducing delivery variance by 28%.",
        "Improved cross-team delivery velocity by introducing automated Jira sprint metrics and blocker SLAs.",
      ],
    },
    {
      id: "exp-2",
      role: "Project Coordinator",
      company: "CloudPulse Solutions",
      period: "03/2020 – 04/2022",
      location: "Toronto, Canada",
      highlights: [
        "Supported schedule, budgets, and documentation for enterprise transformation initiatives.",
        "Facilitated daily standups and maintained cross-department action logs with 98% resolution compliance.",
        "Resolved delivery bottlenecks before they impacted client delivery commitments.",
      ],
    },
    {
      id: "exp-3",
      role: "Operations Analyst",
      company: "Apex Strategy Group",
      period: "08/2018 – 02/2020",
      location: "Montreal, Canada",
      highlights: [
        "Analyzed operational workflows to identify service delivery bottlenecks.",
        "Authored executive SOPs and training materials for 120+ team members.",
      ],
    },
  ]);

  const [skills, setSkills] = useState<string[]>([
    "Project Planning", "Stakeholder Management", "Agile Delivery", 
    "Risk Management", "Process Improvement", "Budget Tracking", 
    "Jira & Confluence", "Cross-Functional Leadership", "Scrum"
  ]);
  const [newSkillInput, setNewSkillInput] = useState("");

  const [education, setEducation] = useState<EducationItem[]>([
    {
      id: "edu-1",
      degree: "Bachelor of Commerce in Management",
      institution: "University of Toronto",
      year: "2018",
      gpa: "First Class with Distinction",
    },
    {
      id: "edu-2",
      degree: "Diploma in Business Administration",
      institution: "Apsley College",
      year: "2015",
      gpa: "Honors",
    },
  ]);

  const [projects, setProjects] = useState<ProjectItem[]>([
    {
      id: "proj-1",
      title: "Enterprise Cloud Migration Governance",
      techStack: "Jira, Confluence, AWS, Agile",
      description: "Led the governance framework for migrating 40+ legacy on-premise services into AWS with zero customer outage.",
      link: "https://github.com",
    },
    {
      id: "proj-2",
      title: "Automated Sprint Telemetry Dashboard",
      techStack: "Next.js, React, REST APIs",
      description: "Engineered real-time burndown chart visualization helping 8 development squads eliminate sprint rollover by 34%.",
      link: "https://github.com",
    },
  ]);

  // Design Formatting & Layout Controls
  const [fontFamily, setFontFamily] = useState<"sans" | "serif">("sans");
  const [density, setDensity] = useState<"compact" | "standard" | "spacious">("standard");

  // Raw Import / AI Tailoring state
  const [rawPastedText, setRawPastedText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [tailoredResumeMarkdown, setTailoredResumeMarkdown] = useState("");
  const [keywordMatchScore, setKeywordMatchScore] = useState<number | null>(null);

  // Status & Loaders
  const [isParsingRaw, setIsParsingRaw] = useState(false);
  const [isTailoring, setIsTailoring] = useState(false);
  const [isAiPolishing, setIsAiPolishing] = useState<string | null>(null);
  const [isSuggestingSkills, setIsSuggestingSkills] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const resumeSheetRef = useRef<HTMLDivElement>(null);

  // Auto-sync initial profile from localStorage or database if available
  useEffect(() => {
    try {
      const cached = localStorage.getItem("folioveda_active_profile");
      if (cached) {
        const ext = JSON.parse(cached);
        if (ext?.name) {
          setPersonal((prev) => ({
            ...prev,
            name: ext.name || prev.name,
            headline: ext.headline || prev.headline,
            email: ext.contact?.email || prev.email,
            phone: ext.contact?.phone || prev.phone,
            location: ext.location || prev.location,
            linkedin: ext.contact?.linkedin || prev.linkedin,
            github: ext.contact?.github || prev.github,
            website: ext.contact?.website || prev.website,
          }));
          if (ext.bio) setSummary(ext.bio);
          if (Array.isArray(ext.skills) && ext.skills.length > 0) setSkills(ext.skills);
          if (Array.isArray(ext.experience) && ext.experience.length > 0) {
            setExperience(
              ext.experience.map((e: any, idx: number) => ({
                id: `exp-${idx}-${Date.now()}`,
                role: e.role || "Professional",
                company: e.company || "Company",
                period: e.period || "Present",
                location: e.location || "Remote",
                highlights: Array.isArray(e.highlights) ? e.highlights : [],
              }))
            );
          }
          if (Array.isArray(ext.projects) && ext.projects.length > 0) {
            setProjects(
              ext.projects.map((p: any, idx: number) => ({
                id: `proj-${idx}-${Date.now()}`,
                title: p.title || `Project ${idx + 1}`,
                techStack: Array.isArray(p.techStack) ? p.techStack.join(", ") : (p.techStack || ""),
                description: p.description || "",
                link: p.githubUrl || p.liveUrl || "",
              }))
            );
          }
        }
      }
    } catch {}
  }, []);

  // Compute live ATS markdown representation
  const activeMarkdown = tailoredResumeMarkdown || convertStructuredToMarkdown({
    personal,
    summary,
    experience,
    education,
    skills,
    projects,
  });

  // Handler: Parse raw text or LinkedIn export with AI
  const handleParseRawText = async () => {
    if (!rawPastedText.trim()) return;
    setIsParsingRaw(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/resume/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText: rawPastedText }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to parse resume.");

      if (data.data) {
        const d = data.data;
        if (d.personal) {
          setPersonal((prev) => ({
            ...prev,
            name: d.personal.name || prev.name,
            headline: d.personal.headline || prev.headline,
            email: d.personal.email || prev.email,
            phone: d.personal.phone || prev.phone,
            location: d.personal.location || prev.location,
            linkedin: d.personal.linkedin || prev.linkedin,
            github: d.personal.github || prev.github,
            website: d.personal.website || prev.website,
          }));
        }
        if (d.summary) setSummary(d.summary);
        if (Array.isArray(d.skills) && d.skills.length > 0) setSkills(d.skills);
        if (Array.isArray(d.experience) && d.experience.length > 0) {
          setExperience(
            d.experience.map((e: any, idx: number) => ({
              id: `exp-${idx}-${Date.now()}`,
              role: e.role || "Software Engineer",
              company: e.company || "Company",
              period: e.period || "Present",
              location: e.location || "Remote",
              highlights: Array.isArray(e.highlights) ? e.highlights : [e.description || ""].filter(Boolean),
            }))
          );
        }
        if (Array.isArray(d.education) && d.education.length > 0) {
          setEducation(
            d.education.map((e: any, idx: number) => ({
              id: `edu-${idx}-${Date.now()}`,
              degree: e.degree || "Degree",
              institution: e.institution || "University",
              year: e.year || "Year",
              gpa: e.gpa || "",
            }))
          );
        }
        if (Array.isArray(d.projects) && d.projects.length > 0) {
          setProjects(
            d.projects.map((p: any, idx: number) => ({
              id: `proj-${idx}-${Date.now()}`,
              title: p.title || "Project",
              techStack: p.techStack || "",
              description: p.description || "",
              link: p.link || "",
            }))
          );
        }

        setTailoredResumeMarkdown("");
        setEditorTab("form");
        setStatusMessage(`✓ Successfully structured ${d.personal?.name || "your"} resume into modular sections!`);
        setTimeout(() => setStatusMessage(null), 4000);
      }
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message}`);
    } finally {
      setIsParsingRaw(false);
    }
  };

  // Handler: Tailor to Job Description
  const handleTailorToJob = async () => {
    if (!jobDescription.trim()) return;
    setIsTailoring(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/resume/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "clq123",
          originalResume: activeMarkdown,
          jobDescription: jobDescription.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Tailoring failed.");

      if (data.tailoredContent) {
        setTailoredResumeMarkdown(data.tailoredContent);
        setKeywordMatchScore(data.keywordMatchScore || 88);
        setStatusMessage(`✓ Aligned resume to Job Specs with a ${data.keywordMatchScore || 88}% ATS Match Score!`);
        setTimeout(() => setStatusMessage(null), 4000);
      }
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message}`);
    } finally {
      setIsTailoring(false);
    }
  };

  // Handler: AI Polish Bullet / Summary
  const handleAiImprove = async (
    textToImprove: string,
    type: "bullet" | "summary" | "redo_shorter",
    targetIdentifier: string,
    onSuccess: (improved: string) => void
  ) => {
    setIsAiPolishing(targetIdentifier);
    try {
      const res = await fetch("/api/resume/ai/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToImprove,
          type,
          jobRole: personal.headline,
        }),
      });

      const data = await res.json();
      if (data.improvedText) {
        onSuccess(data.improvedText);
      }
    } catch (e) {
      console.warn("AI improve failed:", e);
    } finally {
      setIsAiPolishing(null);
    }
  };

  // Handler: AI Suggest Skills
  const handleSuggestSkills = async () => {
    setIsSuggestingSkills(true);
    try {
      const res = await fetch("/api/resume/ai/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: personal.headline }),
      });
      const data = await res.json();
      if (Array.isArray(data.skills) && data.skills.length > 0) {
        const unique = Array.from(new Set([...skills, ...data.skills]));
        setSkills(unique);
        setStatusMessage(`✓ Added ${data.skills.length} high-demand industry skills for ${personal.headline}!`);
        setTimeout(() => setStatusMessage(null), 3500);
      }
    } catch (e) {
      console.warn("Suggest skills error:", e);
    } finally {
      setIsSuggestingSkills(false);
    }
  };

  // Skill pill handlers
  const handleAddSkill = () => {
    if (!newSkillInput.trim()) return;
    const cleanSkill = newSkillInput.trim();
    if (!skills.includes(cleanSkill)) {
      setSkills([...skills, cleanSkill]);
    }
    setNewSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  // Experience handlers
  const handleAddExperience = () => {
    setExperience([
      ...experience,
      {
        id: `exp-${Date.now()}`,
        role: "Project Manager",
        company: "Company Name",
        period: "2023 – Present",
        location: "Toronto, Canada",
        highlights: [
          "Coordinated cross-functional workflows to achieve on-time sprint completions.",
        ],
      },
    ]);
  };

  const handleRemoveExperience = (id: string) => {
    setExperience(experience.filter((e) => e.id !== id));
  };

  const handleAddBullet = (expId: string) => {
    setExperience(
      experience.map((e) =>
        e.id === expId
          ? { ...e, highlights: [...e.highlights, "Engineered structured delivery plans that reduced delivery cycle times."] }
          : e
      )
    );
  };

  const handleUpdateBullet = (expId: string, bulletIdx: number, val: string) => {
    setExperience(
      experience.map((e) =>
        e.id === expId
          ? {
              ...e,
              highlights: e.highlights.map((h, idx) => (idx === bulletIdx ? val : h)),
            }
          : e
      )
    );
  };

  const handleRemoveBullet = (expId: string, bulletIdx: number) => {
    setExperience(
      experience.map((e) =>
        e.id === expId
          ? { ...e, highlights: e.highlights.filter((_, idx) => idx !== bulletIdx) }
          : e
      )
    );
  };

  // PDF Export
  const handleExportPDF = async () => {
    if (!resumeSheetRef.current) {
      window.print();
      return;
    }
    setExporting(true);

    try {
      await new Promise((r) => setTimeout(r, 150));
      const canvas = await html2canvas(resumeSheetRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      const safeName = (personal.name || "Resume").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "_");
      pdf.save(`${safeName}_${selectedTemplate}.pdf`);
    } catch (err) {
      console.warn("Canvas PDF export fallback to print dialog:", err);
      window.print();
    } finally {
      setExporting(false);
    }
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(activeMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Density styles mapping
  const densityStyles = {
    compact: {
      padding: "p-6 sm:p-8",
      sectionMargin: "mt-3 mb-1.5",
      bulletLeading: "leading-snug my-0.5",
      fontSize: "text-[11.5px]",
      titleSize: "text-2xl",
    },
    standard: {
      padding: "p-8 sm:p-10",
      sectionMargin: "mt-4 mb-2",
      bulletLeading: "leading-normal my-1",
      fontSize: "text-[12.5px]",
      titleSize: "text-3xl",
    },
    spacious: {
      padding: "p-10 sm:p-12",
      sectionMargin: "mt-5 mb-2.5",
      bulletLeading: "leading-relaxed my-1.5",
      fontSize: "text-[13px]",
      titleSize: "text-3xl",
    },
  }[density];

  // Template options catalog
  const TEMPLATE_OPTIONS: Array<{
    id: ResumeTemplateId;
    title: string;
    subtitle: string;
    badge: string;
    color: string;
  }> = [
    {
      id: "classic-ats",
      title: "Emily Carter Classic",
      subtitle: "Single-Column ATS Clean",
      badge: "100% ATS Safe",
      color: "border-slate-300 bg-white",
    },
    {
      id: "modern-sidebar",
      title: "Brian Wayne Duo",
      subtitle: "Executive Navy Sidebar",
      badge: "High Impact",
      color: "border-[#1e293b] bg-[#1e293b] text-white",
    },
    {
      id: "creative-header",
      title: "Camila Rivera Banner",
      subtitle: "Avatar Header & Timeline",
      badge: "Modern Creative",
      color: "border-slate-200 bg-slate-100",
    },
    {
      id: "minimal-compact",
      title: "Daniel Mercer Grid",
      subtitle: "Compact Multi-Column",
      badge: "Executive PM",
      color: "border-emerald-700 bg-emerald-50",
    },
  ];

  /* ──────────────────────────────────────────────────────────────
     TEMPLATE 1: EMILY CARTER (CLASSIC SINGLE-COLUMN ATS CLEAN)
  ────────────────────────────────────────────────────────────── */
  const renderClassicAts = () => (
    <div className="w-full text-slate-900 select-text">
      {/* 1. Candidate Name */}
      <div className="text-center pb-1">
        <h1 className={`${densityStyles.titleSize} font-extrabold uppercase tracking-tight text-slate-900`}>
          {personal.name || "Candidate Name"}
        </h1>
        {personal.headline && (
          <p className="text-xs sm:text-sm font-bold text-slate-700 tracking-wide mt-0.5">
            {personal.headline}
          </p>
        )}
      </div>

      {/* 2. Contact Details Line */}
      <div className="text-center text-[11px] sm:text-xs text-slate-600 font-medium pb-2 border-b border-slate-300 flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 mt-1">
        {personal.location && <span>{personal.location}</span>}
        {personal.phone && (
          <>
            <span className="text-slate-300">•</span>
            <span>{personal.phone}</span>
          </>
        )}
        {personal.email && (
          <>
            <span className="text-slate-300">•</span>
            <a href={`mailto:${personal.email}`} className="text-slate-900 hover:underline">
              {personal.email}
            </a>
          </>
        )}
        {personal.linkedin && (
          <>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700 font-semibold">{personal.linkedin.replace(/^https?:\/\/(?:www\.)?linkedin\.com\/in\//i, "linkedin.com/in/")}</span>
          </>
        )}
        {personal.github && (
          <>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700 font-semibold">{personal.github.replace(/^https?:\/\/(?:www\.)?github\.com\//i, "github.com/")}</span>
          </>
        )}
      </div>

      {/* 3. Professional Summary */}
      {summary && summary.trim() && (
        <div className={densityStyles.sectionMargin}>
          <div className="border-b border-slate-900 pb-0.5 mb-1.5">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Professional Summary
            </h2>
          </div>
          <p className={`${densityStyles.fontSize} leading-relaxed text-slate-800 font-normal`}>
            {summary}
          </p>
        </div>
      )}

      {/* 4. Professional Experience */}
      {experience.length > 0 && (
        <div className={densityStyles.sectionMargin}>
          <div className="border-b border-slate-900 pb-0.5 mb-2">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Professional Experience
            </h2>
          </div>

          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-baseline justify-between text-xs sm:text-sm font-bold text-slate-900">
                  <span>
                    {exp.role} <span className="font-normal text-slate-600">— {exp.company}</span>
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-600 shrink-0">
                    {exp.period} {exp.location && `• ${exp.location}`}
                  </span>
                </div>

                {exp.highlights.length > 0 && (
                  <ul className="mt-1 pl-4 list-disc text-slate-800 space-y-0.5 marker:text-slate-600">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className={`${densityStyles.fontSize} ${densityStyles.bulletLeading}`}>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Education */}
      {education.length > 0 && (
        <div className={densityStyles.sectionMargin}>
          <div className="border-b border-slate-900 pb-0.5 mb-1.5">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Education
            </h2>
          </div>

          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex items-baseline justify-between text-xs sm:text-sm">
                <span className="font-bold text-slate-900">
                  {edu.degree} <span className="font-normal text-slate-600">— {edu.institution}</span>
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-slate-600 shrink-0">
                  {edu.year} {edu.gpa && `• ${edu.gpa}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Core Skills */}
      {skills.length > 0 && (
        <div className={densityStyles.sectionMargin}>
          <div className="border-b border-slate-900 pb-0.5 mb-1.5">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Skills
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 text-[11.5px] text-slate-800">
            {skills.map((s, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="text-slate-400">•</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. Key Projects */}
      {projects.length > 0 && (
        <div className={densityStyles.sectionMargin}>
          <div className="border-b border-slate-900 pb-0.5 mb-1.5">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Key Projects
            </h2>
          </div>

          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline justify-between text-xs sm:text-sm font-bold text-slate-900">
                  <span>{proj.title}</span>
                  {proj.techStack && (
                    <span className="text-[11px] font-normal text-slate-500">{proj.techStack}</span>
                  )}
                </div>
                {proj.description && (
                  <p className={`${densityStyles.fontSize} text-slate-700 leading-snug mt-0.5`}>
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  /* ──────────────────────────────────────────────────────────────
     TEMPLATE 2: BRIAN T. WAYNE (TWO-COLUMN NAVY SIDEBAR)
  ────────────────────────────────────────────────────────────── */
  const renderModernSidebar = () => (
    <div className="w-full grid grid-cols-12 min-h-[1050px] bg-white text-slate-900 select-text overflow-hidden -m-6 sm:-m-10">
      
      {/* ── LEFT NAVY SIDEBAR (35%) ── */}
      <div className="col-span-4 bg-[#1E293B] text-slate-100 p-6 sm:p-7 flex flex-col justify-between space-y-6">
        <div className="space-y-6">
          
          {/* Avatar Photo */}
          {personal.avatarUrl && (
            <div className="flex justify-center pt-2">
              <img
                src={personal.avatarUrl}
                alt={personal.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-slate-400/40 shadow-md"
              />
            </div>
          )}

          {/* Contact Details */}
          <div className="space-y-2.5 text-[11px]">
            <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 border-b border-slate-700 pb-1">
              Contact
            </h3>
            {personal.email && (
              <div className="flex items-center gap-2 text-slate-200">
                <Mail size={12} className="text-emerald-400 shrink-0" />
                <span className="truncate">{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-2 text-slate-200">
                <Phone size={12} className="text-emerald-400 shrink-0" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="flex items-center gap-2 text-slate-200">
                <MapPin size={12} className="text-emerald-400 shrink-0" />
                <span>{personal.location}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="flex items-center gap-2 text-slate-200">
                <LinkedinIcon size={12} className="text-emerald-400 shrink-0" />
                <span className="truncate">{personal.linkedin.replace(/^https?:\/\//i, "")}</span>
              </div>
            )}
            {personal.github && (
              <div className="flex items-center gap-2 text-slate-200">
                <GithubIcon size={12} className="text-emerald-400 shrink-0" />
                <span className="truncate">{personal.github.replace(/^https?:\/\//i, "")}</span>
              </div>
            )}
          </div>

          {/* Education in Sidebar */}
          {education.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 border-b border-slate-700 pb-1">
                Education
              </h3>
              {education.map((edu) => (
                <div key={edu.id} className="text-[11px] leading-snug">
                  <div className="font-bold text-white">{edu.degree}</div>
                  <div className="text-slate-300 text-[10px]">{edu.institution}</div>
                  <div className="text-emerald-400 text-[10px]">{edu.year}</div>
                </div>
              ))}
            </div>
          )}

          {/* Skills Badges in Sidebar */}
          {skills.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 border-b border-slate-700 pb-1">
                Core Competencies
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-200 text-[10px] font-semibold border border-slate-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Stamp */}
        <div className="pt-4 border-t border-slate-700/60 text-[9px] text-slate-400">
          Executive Portfolio Certified
        </div>
      </div>

      {/* ── RIGHT MAIN BODY (65%) ── */}
      <div className="col-span-8 p-7 sm:p-9 space-y-5">
        {/* Name Header */}
        <div className="border-b border-slate-200 pb-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-900">
            {personal.name}
          </h1>
          <p className="text-xs sm:text-sm font-bold text-emerald-800 tracking-wide mt-0.5">
            {personal.headline}
          </p>
        </div>

        {/* Profile / Summary */}
        {summary && (
          <div className="space-y-1">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              Executive Profile
            </h2>
            <p className="text-[12px] leading-relaxed text-slate-700 pt-1">
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              Work Experience
            </h2>

            <div className="space-y-3.5">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex items-baseline justify-between text-xs font-bold text-slate-900">
                    <span>
                      {exp.role} <span className="font-semibold text-slate-600">— {exp.company}</span>
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">{exp.period}</span>
                  </div>

                  {exp.highlights.length > 0 && (
                    <ul className="pl-4 list-disc text-slate-700 text-[11.5px] leading-snug space-y-1 marker:text-emerald-700">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Projects */}
        {projects.length > 0 && (
          <div className="space-y-2.5">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              Key Projects &amp; Initiatives
            </h2>

            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id} className="text-xs">
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>{proj.title}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{proj.techStack}</span>
                  </div>
                  <p className="text-[11.5px] text-slate-700 leading-snug mt-0.5">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  /* ──────────────────────────────────────────────────────────────
     TEMPLATE 3: CAMILA RIVERA (CREATIVE HEADER BANNER & TIMELINE)
  ────────────────────────────────────────────────────────────── */
  const renderCreativeHeader = () => (
    <div className="w-full text-slate-900 select-text space-y-4">
      {/* ── TOP HEADER CARD BANNER ── */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-100 via-slate-50 to-emerald-50/50 border border-slate-200 flex flex-col sm:flex-row items-center gap-5">
        {personal.avatarUrl && (
          <img
            src={personal.avatarUrl}
            alt={personal.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
          />
        )}
        <div className="space-y-1 text-center sm:text-left flex-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            {personal.name}
          </h1>
          <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            {personal.headline}
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-[11px] text-slate-600 pt-1 font-medium">
            {personal.location && <span>📍 {personal.location}</span>}
            {personal.email && <span>✉️ {personal.email}</span>}
            {personal.phone && <span>📞 {personal.phone}</span>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 text-[12px] text-slate-700 leading-relaxed">
          {summary}
        </div>
      )}

      {/* ── TIMELINE WORK EXPERIENCE ── */}
      {experience.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-700" />
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Professional Timeline &amp; Experience
            </h2>
          </div>

          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="grid grid-cols-12 gap-3 text-xs">
                {/* Left Date Column */}
                <div className="col-span-3 text-[11px] font-bold text-slate-500 pt-0.5">
                  <div>{exp.period}</div>
                  <div className="text-[10px] text-slate-400 font-normal">{exp.location}</div>
                </div>

                {/* Right Role Content */}
                <div className="col-span-9 space-y-1 border-l-2 border-slate-200 pl-3">
                  <div className="font-bold text-slate-900 text-xs">
                    {exp.role} <span className="font-semibold text-emerald-800">@ {exp.company}</span>
                  </div>
                  {exp.highlights.length > 0 && (
                    <ul className="list-disc pl-3 text-[11.5px] text-slate-700 space-y-0.5 leading-snug marker:text-slate-400">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom 2-Column Section: Skills & Education */}
      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200">
        {/* Skills */}
        <div className="space-y-2">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            Top Skills
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10.5px] font-semibold border border-slate-200"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="space-y-2">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            Education
          </h3>
          {education.map((edu) => (
            <div key={edu.id} className="text-xs leading-snug">
              <div className="font-bold text-slate-900">{edu.degree}</div>
              <div className="text-slate-600 text-[11px]">{edu.institution} • {edu.year}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ──────────────────────────────────────────────────────────────
     TEMPLATE 4: DANIEL MERCER (EXECUTIVE COMPACT GRID)
  ────────────────────────────────────────────────────────────── */
  const renderMinimalCompact = () => (
    <div className="w-full text-slate-900 select-text space-y-3.5">
      {/* Top Header */}
      <div className="border-b-2 border-slate-900 pb-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
          {personal.name}
        </h1>
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 mt-0.5">
          <span>{personal.headline}</span>
          <div className="text-[11px] text-slate-500 font-normal">
            {personal.location} • {personal.phone} • {personal.email}
          </div>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="space-y-1">
          <h2 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900">
            Executive Summary
          </h2>
          <p className="text-[12px] leading-relaxed text-slate-700">
            {summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="space-y-2.5">
          <h2 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
            Professional Experience
          </h2>

          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-0.5">
                <div className="flex items-baseline justify-between text-xs font-bold text-slate-900">
                  <span>{exp.role}, <span className="font-normal text-slate-600">{exp.company}</span></span>
                  <span className="text-[11px] text-slate-500 font-normal">{exp.period}</span>
                </div>
                {exp.highlights.length > 0 && (
                  <ul className="list-disc pl-4 text-[11.5px] text-slate-700 space-y-0.5 marker:text-slate-500 leading-snug">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills 3-Column Compact Grid */}
      {skills.length > 0 && (
        <div className="space-y-1.5">
          <h2 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
            Core Competencies &amp; Skills
          </h2>
          <div className="grid grid-cols-3 gap-1 text-[11px] text-slate-700 font-medium">
            {skills.map((s, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <span className="text-slate-400">▪</span>
                <span className="truncate">{s}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="space-y-1 pt-1">
          <h2 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="flex justify-between text-xs">
              <span className="font-bold text-slate-800">{edu.degree}, <span className="font-normal text-slate-600">{edu.institution}</span></span>
              <span className="text-[11px] text-slate-500">{edu.year}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F1F3F5] text-slate-900 flex flex-col antialiased selection:bg-[#173f32] selection:text-white">
      
      {/* ── TOP NAV HEADER ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 h-16 flex items-center justify-between shadow-2xs print:hidden">
        <div className="flex items-center gap-3">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <FolioVedaLogo size="sm" />
          </Link>
          <span className="text-slate-300">/</span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
            <ShieldCheck size={14} className="text-emerald-700" />
            <span>FlowCV-Grade Resume Builder</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Typography Selector */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setFontFamily("sans")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                fontFamily === "sans" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Inter Sans
            </button>
            <button
              onClick={() => setFontFamily("serif")}
              className={`px-3 py-1.5 rounded-lg transition-all font-serif ${
                fontFamily === "serif" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Georgia Serif
            </button>
          </div>

          {/* Density Selector */}
          <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-bold">
            {(["compact", "standard", "spacious"] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDensity(d)}
                className={`px-2.5 py-1.5 rounded-lg capitalize transition-all ${
                  density === d ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopyMarkdown}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
            title="Copy ATS Markdown"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span className="hidden md:inline">{copied ? "Copied!" : "Copy MD"}</span>
          </button>

          <button
            onClick={handleExportPDF}
            disabled={exporting}
            className="px-4 py-2 rounded-xl bg-[#173f32] hover:bg-[#13352a] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
          >
            {exporting ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : (
              <Download size={14} />
            )}
            <span>Export Vector PDF</span>
          </button>
        </div>
      </header>

      {/* ── NOTIFICATION TOAST ── */}
      {statusMessage && (
        <div className="bg-emerald-900 text-emerald-100 px-6 py-2.5 text-xs font-bold flex items-center justify-between transition-all animate-fadeIn print:hidden">
          <div className="max-w-6xl mx-auto w-full flex items-center gap-2">
            <Sparkles size={14} className="text-[#ebd800]" />
            <span>{statusMessage}</span>
          </div>
        </div>
      )}

      {/* ── TEMPLATE SELECTOR CAROUSEL BAR ── */}
      <section className="bg-white border-b border-slate-200 px-6 py-4 shadow-2xs print:hidden">
        <div className="max-w-[1580px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <Layout size={16} className="text-[#173f32]" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Select Resume Template:
            </span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {TEMPLATE_OPTIONS.map((tmpl) => {
              const isSelected = selectedTemplate === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => {
                    setSelectedTemplate(tmpl.id);
                    setStatusMessage(`Switched to ${tmpl.title} template!`);
                    setTimeout(() => setStatusMessage(null), 2500);
                  }}
                  className={`px-3.5 py-2 rounded-xl border text-left flex items-center gap-2.5 transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? "border-[#173f32] bg-emerald-50 text-[#173f32] ring-2 ring-[#173f32] shadow-sm font-bold"
                      : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded-full border ${tmpl.color} shrink-0`} />
                  <div>
                    <div className="text-xs font-bold leading-tight">{tmpl.title}</div>
                    <div className="text-[10px] text-slate-500 font-normal">{tmpl.subtitle}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MAIN FLOWCV SPLIT-SCREEN WORKSPACE ── */}
      <div className="flex-1 max-w-[1580px] w-full mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ── LEFT PANEL: FLOWCV DUAL-MODE CONTROLLER (5 COLS) ── */}
        <div className="lg:col-span-5 flex flex-col gap-4 print:hidden">
          
          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs">
            <button
              onClick={() => setEditorTab("form")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                editorTab === "form"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <FileText size={14} />
              <span>Modular Editor</span>
            </button>
            <button
              onClick={() => setEditorTab("import")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                editorTab === "import"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Sparkles size={14} className="text-[#ebd800]" />
              <span>AI Auto-Fill</span>
            </button>
            <button
              onClick={() => setEditorTab("tailor")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                editorTab === "tailor"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Briefcase size={14} />
              <span>Job Tailor</span>
            </button>
          </div>

          {/* TAB 1: MODULAR FORM EDITOR */}
          {editorTab === "form" && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
              
              {/* Section Sub-Navigation Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold border-b border-slate-100">
                {(
                  [
                    { id: "personal", label: "Contact", icon: User },
                    { id: "summary", label: "Summary", icon: FileText },
                    { id: "experience", label: "Experience", icon: Briefcase },
                    { id: "skills", label: "Skills", icon: Layers },
                    { id: "projects", label: "Projects", icon: Code },
                    { id: "education", label: "Education", icon: GraduationCap },
                  ] as const
                ).map((sec) => {
                  const Icon = sec.icon;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => setActiveFormSection(sec.id)}
                      className={`px-3 py-1.5 rounded-xl shrink-0 flex items-center gap-1.5 transition-all ${
                        activeFormSection === sec.id
                          ? "bg-[#173f32] text-white shadow-xs"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <Icon size={12} />
                      <span>{sec.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* 1. PERSONAL DETAILS */}
              {activeFormSection === "personal" && (
                <div className="space-y-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Personal &amp; Contact Telemetry
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2 sm:col-span-1 space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">Full Name</label>
                      <input
                        type="text"
                        value={personal.name}
                        onChange={(e) => setPersonal({ ...personal, name: e.target.value })}
                        className="w-full text-xs font-medium p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-[#173f32] outline-hidden"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1 space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">Target Headline</label>
                      <input
                        type="text"
                        value={personal.headline}
                        onChange={(e) => setPersonal({ ...personal, headline: e.target.value })}
                        className="w-full text-xs font-medium p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-[#173f32] outline-hidden"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">Email Address</label>
                      <input
                        type="email"
                        value={personal.email}
                        onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                        className="w-full text-xs font-medium p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-[#173f32] outline-hidden"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">Phone</label>
                      <input
                        type="text"
                        value={personal.phone}
                        onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
                        className="w-full text-xs font-medium p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-[#173f32] outline-hidden"
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">Location</label>
                      <input
                        type="text"
                        value={personal.location}
                        onChange={(e) => setPersonal({ ...personal, location: e.target.value })}
                        className="w-full text-xs font-medium p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-[#173f32] outline-hidden"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">LinkedIn URL</label>
                      <input
                        type="text"
                        value={personal.linkedin}
                        onChange={(e) => setPersonal({ ...personal, linkedin: e.target.value })}
                        className="w-full text-xs font-medium p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-[#173f32] outline-hidden"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">GitHub / Portfolio URL</label>
                      <input
                        type="text"
                        value={personal.github}
                        onChange={(e) => setPersonal({ ...personal, github: e.target.value })}
                        className="w-full text-xs font-medium p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-[#173f32] outline-hidden"
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">Profile Avatar Photo URL (for Creative &amp; Sidebar Templates)</label>
                      <input
                        type="text"
                        value={personal.avatarUrl}
                        onChange={(e) => setPersonal({ ...personal, avatarUrl: e.target.value })}
                        className="w-full text-xs font-medium p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-[#173f32] outline-hidden font-mono text-[10.5px]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 2. PROFESSIONAL SUMMARY */}
              {activeFormSection === "summary" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      Professional Summary
                    </h3>
                    <button
                      onClick={() =>
                        handleAiImprove(summary, "summary", "summary", (improved) => setSummary(improved))
                      }
                      disabled={isAiPolishing === "summary" || !summary.trim()}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-bold hover:bg-emerald-100 transition flex items-center gap-1 border border-emerald-200"
                    >
                      {isAiPolishing === "summary" ? (
                        <RefreshCw size={12} className="animate-spin" />
                      ) : (
                        <Wand2 size={12} />
                      )}
                      <span>✨ AI Polish Summary</span>
                    </button>
                  </div>
                  <textarea
                    rows={5}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full text-xs font-medium p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-[#173f32] outline-hidden leading-relaxed"
                  />
                </div>
              )}

              {/* 3. EXPERIENCE */}
              {activeFormSection === "experience" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      Work History &amp; Roles ({experience.length})
                    </h3>
                    <button
                      onClick={handleAddExperience}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition flex items-center gap-1"
                    >
                      <Plus size={13} />
                      <span>Add Role</span>
                    </button>
                  </div>

                  {experience.map((exp, expIdx) => (
                    <div
                      key={exp.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                          Position #{expIdx + 1}
                        </span>
                        <button
                          onClick={() => handleRemoveExperience(exp.id)}
                          className="text-slate-400 hover:text-rose-600 transition p-1"
                          title="Remove Experience"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Job Title"
                          value={exp.role}
                          onChange={(e) =>
                            setExperience(
                              experience.map((x) => (x.id === exp.id ? { ...x, role: e.target.value } : x))
                            )
                          }
                          className="text-xs font-bold p-2 rounded-lg border border-slate-200 bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Company Name"
                          value={exp.company}
                          onChange={(e) =>
                            setExperience(
                              experience.map((x) => (x.id === exp.id ? { ...x, company: e.target.value } : x))
                            )
                          }
                          className="text-xs font-bold p-2 rounded-lg border border-slate-200 bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Dates (e.g. 2022 – Present)"
                          value={exp.period}
                          onChange={(e) =>
                            setExperience(
                              experience.map((x) => (x.id === exp.id ? { ...x, period: e.target.value } : x))
                            )
                          }
                          className="text-xs font-medium p-2 rounded-lg border border-slate-200 bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Location (e.g. Toronto / Remote)"
                          value={exp.location}
                          onChange={(e) =>
                            setExperience(
                              experience.map((x) => (x.id === exp.id ? { ...x, location: e.target.value } : x))
                            )
                          }
                          className="text-xs font-medium p-2 rounded-lg border border-slate-200 bg-white"
                        />
                      </div>

                      {/* Bullet Highlights */}
                      <div className="space-y-2 pt-2 border-t border-slate-200/80">
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                          <span>Action &amp; Outcome Bullets</span>
                          <button
                            onClick={() => handleAddBullet(exp.id)}
                            className="text-[#173f32] hover:underline flex items-center gap-0.5 text-[11px]"
                          >
                            <Plus size={11} /> Add Bullet
                          </button>
                        </div>

                        {exp.highlights.map((h, bIdx) => {
                          const bulletKey = `${exp.id}-${bIdx}`;
                          return (
                            <div key={bIdx} className="flex items-start gap-1.5">
                              <span className="text-slate-400 text-xs mt-2">•</span>
                              <div className="flex-1 space-y-1">
                                <textarea
                                  rows={2}
                                  value={h}
                                  onChange={(e) => handleUpdateBullet(exp.id, bIdx, e.target.value)}
                                  className="w-full text-xs font-normal p-2 rounded-lg border border-slate-200 bg-white focus:ring-1 focus:ring-[#173f32] outline-hidden leading-relaxed"
                                />
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() =>
                                      handleAiImprove(h, "bullet", bulletKey, (improved) =>
                                        handleUpdateBullet(exp.id, bIdx, improved)
                                      )
                                    }
                                    disabled={isAiPolishing === bulletKey || !h.trim()}
                                    className="text-[10px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1 transition"
                                  >
                                    {isAiPolishing === bulletKey ? (
                                      <RefreshCw size={10} className="animate-spin" />
                                    ) : (
                                      <Sparkles size={10} />
                                    )}
                                    <span>STAR Metric</span>
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleAiImprove(h, "redo_shorter", bulletKey, (improved) =>
                                        handleUpdateBullet(exp.id, bIdx, improved)
                                      )
                                    }
                                    disabled={isAiPolishing === bulletKey || !h.trim()}
                                    className="text-[10px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded flex items-center gap-1 transition"
                                  >
                                    <Scissors size={10} />
                                    <span>Tighten</span>
                                  </button>
                                  <button
                                    onClick={() => handleRemoveBullet(exp.id, bIdx)}
                                    className="text-slate-400 hover:text-rose-600 text-[10px] font-bold ml-auto"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 4. SKILLS */}
              {activeFormSection === "skills" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      Core Skills ({skills.length})
                    </h3>
                    <button
                      onClick={handleSuggestSkills}
                      disabled={isSuggestingSkills}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-bold hover:bg-emerald-100 transition flex items-center gap-1 border border-emerald-200"
                    >
                      {isSuggestingSkills ? (
                        <RefreshCw size={12} className="animate-spin" />
                      ) : (
                        <Wand2 size={12} />
                      )}
                      <span>⚡ AI Suggest Top Skills</span>
                    </button>
                  </div>

                  {/* Add skill input */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add a new skill (e.g. Next.js, Docker, Agile)..."
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                      className="flex-1 text-xs font-medium p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-hidden"
                    />
                    <button
                      onClick={handleAddSkill}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                    >
                      Add
                    </button>
                  </div>

                  {/* Skill Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200/80 group"
                      >
                        <span>{skill}</span>
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="text-slate-400 hover:text-rose-600 transition"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. PROJECTS */}
              {activeFormSection === "projects" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      Selected Projects &amp; Initiatives ({projects.length})
                    </h3>
                    <button
                      onClick={() =>
                        setProjects([
                          ...projects,
                          {
                            id: `proj-${Date.now()}`,
                            title: "Enterprise Transformation",
                            techStack: "Jira, Agile, Scrum",
                            description: "Coordinated digital initiatives across teams.",
                            link: "https://github.com",
                          },
                        ])
                      }
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition flex items-center gap-1"
                    >
                      <Plus size={13} /> Add Project
                    </button>
                  </div>

                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2 relative"
                    >
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          placeholder="Project Title"
                          value={proj.title}
                          onChange={(e) =>
                            setProjects(
                              projects.map((p) => (p.id === proj.id ? { ...p, title: e.target.value } : p))
                            )
                          }
                          className="text-xs font-bold p-1.5 rounded-lg border border-slate-200 bg-white flex-1 mr-2"
                        />
                        <button
                          onClick={() => setProjects(projects.filter((p) => p.id !== proj.id))}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Tech Stack (e.g. Next.js, Prisma, Tailwind)"
                        value={proj.techStack}
                        onChange={(e) =>
                          setProjects(
                            projects.map((p) => (p.id === proj.id ? { ...p, techStack: e.target.value } : p))
                          )
                        }
                        className="w-full text-xs font-medium p-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                      <textarea
                        rows={2}
                        placeholder="Project description and key impact..."
                        value={proj.description}
                        onChange={(e) =>
                          setProjects(
                            projects.map((p) => (p.id === proj.id ? { ...p, description: e.target.value } : p))
                          )
                        }
                        className="w-full text-xs font-normal p-2 rounded-lg border border-slate-200 bg-white leading-relaxed"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* 6. EDUCATION */}
              {activeFormSection === "education" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      Education &amp; Accreditations ({education.length})
                    </h3>
                    <button
                      onClick={() =>
                        setEducation([
                          ...education,
                          {
                            id: `edu-${Date.now()}`,
                            degree: "Bachelor of Business Administration",
                            institution: "University",
                            year: "2018",
                            gpa: "First Class with Distinction",
                          },
                        ])
                      }
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition flex items-center gap-1"
                    >
                      <Plus size={13} /> Add Education
                    </button>
                  </div>

                  {education.map((edu) => (
                    <div
                      key={edu.id}
                      className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2 relative"
                    >
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          placeholder="Degree (e.g. B.Com / B.Tech)"
                          value={edu.degree}
                          onChange={(e) =>
                            setEducation(
                              education.map((x) => (x.id === edu.id ? { ...x, degree: e.target.value } : x))
                            )
                          }
                          className="text-xs font-bold p-1.5 rounded-lg border border-slate-200 bg-white flex-1 mr-2"
                        />
                        <button
                          onClick={() => setEducation(education.filter((x) => x.id !== edu.id))}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Institution / University"
                          value={edu.institution}
                          onChange={(e) =>
                            setEducation(
                              education.map((x) => (x.id === edu.id ? { ...x, institution: e.target.value } : x))
                            )
                          }
                          className="text-xs font-medium p-1.5 rounded-lg border border-slate-200 bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Year / Honors"
                          value={edu.year}
                          onChange={(e) =>
                            setEducation(
                              education.map((x) => (x.id === edu.id ? { ...x, year: e.target.value } : x))
                            )
                          }
                          className="text-xs font-medium p-1.5 rounded-lg border border-slate-200 bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: AI AUTO-FILL FROM UNSTRUCTURED TEXT */}
          {editorTab === "import" && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <Sparkles size={12} className="text-[#ebd800]" />
                  <span>Gemini AI Resume Synthesizer</span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Paste Raw Resume, LinkedIn Text, or Notes
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Paste your full career notes, bio, or previous resume text below. Our Gemini parsing engine will extract roles, companies, dates, STAR bullets, and skills into clean modular blocks.
                </p>
              </div>

              <textarea
                rows={12}
                value={rawPastedText}
                onChange={(e) => setRawPastedText(e.target.value)}
                placeholder="Paste career history, LinkedIn summary, or rough resume text..."
                className="w-full text-xs font-mono p-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-[#173f32] outline-hidden leading-relaxed"
              />

              <button
                onClick={handleParseRawText}
                disabled={isParsingRaw || !rawPastedText.trim()}
                className="w-full py-3.5 rounded-2xl bg-[#173f32] hover:bg-[#13352a] text-white font-bold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isParsingRaw ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Extracting Career Trajectory with Gemini AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={14} className="text-[#ebd800]" />
                    <span>⚡ Parse &amp; Auto-Fill Full Structured Resume</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* TAB 3: JOB DESCRIPTION TAILORING */}
          {editorTab === "tailor" && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <Briefcase size={12} className="text-emerald-700" />
                  <span>ATS Keyword Matcher</span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Target Job Description Tailoring
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Paste the requirements and specifications of the job you want to apply for. The AI will align your genuine achievements to pass Workday, Greenhouse, and Lever ATS crawlers.
                </p>
              </div>

              <textarea
                rows={8}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job title, qualifications, and requirements from the job posting..."
                className="w-full text-xs font-mono p-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-[#173f32] outline-hidden leading-relaxed"
              />

              {keywordMatchScore !== null && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs font-bold text-emerald-900">
                  <span>ATS Keyword Match Score</span>
                  <span className="text-base font-extrabold text-emerald-700">{keywordMatchScore}%</span>
                </div>
              )}

              <button
                onClick={handleTailorToJob}
                disabled={isTailoring || !jobDescription.trim()}
                className="w-full py-3.5 rounded-2xl bg-[#173f32] hover:bg-[#13352a] text-white font-bold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isTailoring ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Analyzing Keywords &amp; Tailoring Resume...</span>
                  </>
                ) : (
                  <>
                    <Briefcase size={14} className="text-[#ebd800]" />
                    <span>🎯 Tailor Resume to Job Description</span>
                  </>
                )}
              </button>

              {tailoredResumeMarkdown && (
                <button
                  onClick={() => setTailoredResumeMarkdown("")}
                  className="w-full py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 transition"
                >
                  Reset to Original Master Resume
                </button>
              )}
            </div>
          )}
        </div>

        {/* ── RIGHT PANEL: LIVE PRINT-ACCURATE A4 CANVAS (7 COLS) ── */}
        <div className="lg:col-span-7 flex flex-col items-center">
          
          {/* Document Sheet Container */}
          <div className="w-full max-w-[800px] overflow-x-auto pb-8">
            <div
              ref={resumeSheetRef}
              className={`bg-white rounded-lg shadow-xl border border-slate-200/90 text-slate-900 min-h-[1050px] transition-all ${densityStyles.padding}`}
              style={{
                fontFamily:
                  fontFamily === "serif"
                    ? "Georgia, 'Times New Roman', serif"
                    : "var(--font-sans-main), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              }}
            >
              {/* Dynamic Template Dispatcher */}
              {selectedTemplate === "classic-ats" && renderClassicAts()}
              {selectedTemplate === "modern-sidebar" && renderModernSidebar()}
              {selectedTemplate === "creative-header" && renderCreativeHeader()}
              {selectedTemplate === "minimal-compact" && renderMinimalCompact()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
