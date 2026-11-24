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

export type ResumeTemplateCategory = "all" | "simple" | "modern" | "banners" | "creative";

export type ResumeTemplateId =
  | "classic-clear"
  | "true-blue"
  | "editorial-rule"
  | "classic-serif"
  | "atlantic-blue"
  | "hunter-green"
  | "quicksilver"
  | "coral-navy"
  | "space-lilac"
  | "mercury-flow"
  | "cobalt-edge"
  | "saffron-line"
  | "happy-geo"
  | "botanical-leaves"
  | "classic-ats"
  | "modern-sidebar"
  | "creative-header"
  | "minimal-compact";

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

  // Active Template State (14 FlowCV Templates across 4 Categories)
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplateId>("atlantic-blue");
  const [templateCategory, setTemplateCategory] = useState<ResumeTemplateCategory>("all");

  // Local Photo Upload Ref & Handler
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setStatusMessage("Please select a valid image file (PNG, JPG, WebP).");
      setTimeout(() => setStatusMessage(null), 3000);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setStatusMessage("Photo size exceeds 5MB limit. Please choose a smaller image.");
      setTimeout(() => setStatusMessage(null), 3000);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setPersonal((prev) => ({ ...prev, avatarUrl: base64 }));
      setStatusMessage("Profile photo uploaded and applied to your selected resume template!");
      setTimeout(() => setStatusMessage(null), 3000);
    };
    reader.readAsDataURL(file);
  };

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
  const [matchedJobSkills, setMatchedJobSkills] = useState<string[]>([]);
  const [missingJobSkills, setMissingJobSkills] = useState<string[]>([]);

  // Helper: check if a skill matches the target job described in Job Tailor
  const isSkillMatchedForJob = (skillName: string): boolean => {
    if (!jobDescription || !jobDescription.trim()) return false;
    const sLower = skillName.toLowerCase().trim();
    const jdLower = jobDescription.toLowerCase();

    // 1. Direct match against AI returned matched skills
    if (matchedJobSkills.some((ms) => ms.toLowerCase() === sLower || ms.toLowerCase().includes(sLower))) {
      return true;
    }

    // 2. Direct string inclusion
    if (jdLower.includes(sLower)) {
      return true;
    }

    // 3. Clean token check (e.g. Next.js vs Nextjs, React vs React.js)
    const cleanS = sLower.replace(/[^a-z0-9]/g, "");
    const cleanJd = jdLower.replace(/[^a-z0-9]/g, " ");
    if (cleanS.length >= 3 && cleanJd.includes(cleanS)) {
      return true;
    }

    return false;
  };

  const activeMatchedCount = skills.filter((s) => isSkillMatchedForJob(s)).length;
  const activeMatchedSkills = skills.filter((s) => isSkillMatchedForJob(s));

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
        if (Array.isArray(data.matchedSkills) && data.matchedSkills.length > 0) {
          setMatchedJobSkills(data.matchedSkills);
        }
        if (Array.isArray(data.missingSkills) && data.missingSkills.length > 0) {
          setMissingJobSkills(data.missingSkills);
        }
        setStatusMessage(`✓ Aligned resume to Job Specs with a ${data.keywordMatchScore || 88}% ATS Match Score! Role-specific skills highlighted.`);
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

  // Template options catalog (14 FlowCV Templates across 4 Categories)
  interface TemplateOption {
    id: ResumeTemplateId;
    title: string;
    author: string;
    subtitle: string;
    category: "simple" | "modern" | "banners" | "creative";
    badge: string;
    accent: string;
    previewType: "single" | "sidebar" | "banner" | "creative";
    previewBg?: string;
  }

  const TEMPLATE_OPTIONS: TemplateOption[] = [
    // ── 1. SIMPLE / ATS (4 TEMPLATES) ──
    {
      id: "classic-clear",
      title: "Classic Clear",
      author: "Emily Carter",
      subtitle: "100% ATS Clean Single-Column",
      category: "simple",
      badge: "100% ATS Safe",
      accent: "#0F172A",
      previewType: "single",
    },
    {
      id: "true-blue",
      title: "True Blue",
      author: "Daniel Mercer",
      subtitle: "Compact 3-Column Skills Grid",
      category: "simple",
      badge: "Executive PM",
      accent: "#1E40AF",
      previewType: "single",
    },
    {
      id: "editorial-rule",
      title: "Editorial Rule",
      author: "Lena Hoffmann",
      subtitle: "Sharp Editorial Hairline Rules",
      category: "simple",
      badge: "Editorial Clean",
      accent: "#18181B",
      previewType: "single",
    },
    {
      id: "classic-serif",
      title: "Classic Serif",
      author: "Andrew O'Sullivan",
      subtitle: "Literary Executive Serif Typography",
      category: "simple",
      badge: "Serif Classic",
      accent: "#334155",
      previewType: "single",
    },

    // ── 2. MODERN SIDEBARS (5 TEMPLATES) ──
    {
      id: "atlantic-blue",
      title: "Atlantic Blue",
      author: "Brian T. Wayne",
      subtitle: "35% Executive Navy Sidebar",
      category: "modern",
      badge: "Most Popular",
      accent: "#1E293B",
      previewType: "sidebar",
      previewBg: "#1E293B",
    },
    {
      id: "hunter-green",
      title: "Hunter Green",
      author: "Yassine Ben Salem",
      subtitle: "Deep Forest Architectural Tone",
      category: "modern",
      badge: "Architectural",
      accent: "#143528",
      previewType: "sidebar",
      previewBg: "#143528",
    },
    {
      id: "quicksilver",
      title: "Quicksilver",
      author: "Michael Nwosu",
      subtitle: "Cool Metallic Slate Duo",
      category: "modern",
      badge: "Executive Tech",
      accent: "#475569",
      previewType: "sidebar",
      previewBg: "#E2E8F0",
    },
    {
      id: "coral-navy",
      title: "Coral Navy",
      author: "Brian Wayne Variant",
      subtitle: "Midnight Navy with Coral Accent",
      category: "modern",
      badge: "High Contrast",
      accent: "#F43F5E",
      previewType: "sidebar",
      previewBg: "#0F172A",
    },
    {
      id: "space-lilac",
      title: "Space Lilac",
      author: "Sarah Watson",
      subtitle: "Cosmic Deep Violet Split",
      category: "modern",
      badge: "Vibrant Duo",
      accent: "#4C1D95",
      previewType: "sidebar",
      previewBg: "#2E1065",
    },

    // ── 3. HEADER BANNERS (3 TEMPLATES) ──
    {
      id: "mercury-flow",
      title: "Mercury Flow",
      author: "Camila Rivera",
      subtitle: "Avatar Card & Career Timeline",
      category: "banners",
      badge: "Product & Design",
      accent: "#475569",
      previewType: "banner",
      previewBg: "#F1F5F9",
    },
    {
      id: "cobalt-edge",
      title: "Cobalt Edge",
      author: "Alejandro Herrera",
      subtitle: "Royal Cobalt Top Hero Banner",
      category: "banners",
      badge: "Executive Leadership",
      accent: "#1D4ED8",
      previewType: "banner",
      previewBg: "#1D4ED8",
    },
    {
      id: "saffron-line",
      title: "Saffron Line",
      author: "Matteo Ricci",
      subtitle: "Warm Gold Accents & Avatar Header",
      category: "banners",
      badge: "Warm Contemporary",
      accent: "#D97706",
      previewType: "banner",
      previewBg: "#FEF3C7",
    },

    // ── 4. CREATIVE & VISUAL (2 TEMPLATES) ──
    {
      id: "happy-geo",
      title: "Happy Geo",
      author: "Sarah Watson",
      subtitle: "Playful Geometric Color Accents",
      category: "creative",
      badge: "Creative & Design",
      accent: "#EA580C",
      previewType: "creative",
    },
    {
      id: "botanical-leaves",
      title: "Botanical Leaves",
      author: "Catherine Bale",
      subtitle: "Natural Botanical Vine Margin",
      category: "creative",
      badge: "Artistic & Editorial",
      accent: "#047857",
      previewType: "creative",
    },
  ];

  const filteredTemplates = templateCategory === "all"
    ? TEMPLATE_OPTIONS
    : TEMPLATE_OPTIONS.filter((t) => t.category === templateCategory);

  /* ──────────────────────────────────────────────────────────────
     TEMPLATE 1: EMILY CARTER (CLASSIC CLEAR - 100% ATS CLEAN)
  ────────────────────────────────────────────────────────────── */
  const renderClassicClear = () => (
    <div className="w-full text-slate-900 select-text">
      {/* Header with Adaptive Photo */}
      <div className="flex items-center justify-between pb-1 gap-4">
        <div className={personal.avatarUrl ? "text-left flex-1" : "text-center w-full"}>
          <h1 className={`${densityStyles.titleSize} font-extrabold uppercase tracking-tight text-slate-900`}>
            {personal.name || "Candidate Name"}
          </h1>
          {personal.headline && (
            <p className="text-xs sm:text-sm font-bold text-slate-700 tracking-wide mt-0.5">
              {personal.headline}
            </p>
          )}
        </div>
        {personal.avatarUrl && (
          <div className="shrink-0">
            <img
              src={personal.avatarUrl}
              alt={personal.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-300 shadow-xs"
            />
          </div>
        )}
      </div>

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

      {summary && (
        <div className={densityStyles.sectionMargin}>
          <div className="border-b border-slate-900 pb-0.5 mb-1.5">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Professional Summary
            </h2>
          </div>
          <p className={`${densityStyles.fontSize} ${densityStyles.bulletLeading} text-slate-800`}>
            {summary}
          </p>
        </div>
      )}

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
                    {exp.role} <span className="font-semibold text-slate-700">— {exp.company}</span>
                  </span>
                  <span className="text-[11px] font-medium text-slate-600">
                    {exp.period} {exp.location && `• ${exp.location}`}
                  </span>
                </div>
                {exp.highlights.length > 0 && (
                  <ul className="list-disc pl-5 text-slate-800 text-[11.5px] mt-1 space-y-0.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className={densityStyles.bulletLeading}>
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

      {education.length > 0 && (
        <div className={densityStyles.sectionMargin}>
          <div className="border-b border-slate-900 pb-0.5 mb-1.5">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Education
            </h2>
          </div>
          <div className="space-y-1.5">
            {education.map((edu) => (
              <div key={edu.id} className="flex items-baseline justify-between text-xs sm:text-sm">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree}</span>
                  <span className="text-slate-600"> — {edu.institution}</span>
                </div>
                <span className="text-[11px] text-slate-600">{edu.year}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div className={densityStyles.sectionMargin}>
          <div className="border-b border-slate-900 pb-0.5 mb-1.5 flex items-center justify-between">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Skills
            </h2>
            {jobDescription && activeMatchedCount > 0 && (
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                🎯 {activeMatchedCount} Target Skills Matched
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs text-slate-800">
            {skills.map((s, idx) => {
              const isMatched = isSkillMatchedForJob(s);
              return (
                <span
                  key={idx}
                  className={`px-2 py-0.5 rounded-md transition-all ${
                    isMatched
                      ? "bg-emerald-100 text-emerald-950 font-bold border border-emerald-400 shadow-2xs ring-1 ring-emerald-500 flex items-center gap-1"
                      : "bg-slate-100 text-slate-800 border border-slate-200"
                  }`}
                >
                  {isMatched && <span className="text-[10px]">🎯</span>}
                  <span>{s}</span>
                </span>
              );
            })}
          </div>
        </div>
      )}

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
     TEMPLATE 2: DANIEL MERCER (TRUE BLUE - 3-COLUMN SKILLS GRID)
  ────────────────────────────────────────────────────────────── */
  const renderTrueBlue = () => (
    <div className="w-full text-slate-900 select-text space-y-3.5">
      <div className="border-b-2 border-blue-900 pb-2 flex items-center justify-between gap-4">
        <div className="space-y-0.5 flex-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-950 uppercase">
            {personal.name}
          </h1>
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mt-0.5 pr-2">
            <span className="text-blue-900">{personal.headline}</span>
            <div className="text-[11px] text-slate-500 font-normal">
              {personal.location} • {personal.phone} • {personal.email}
            </div>
          </div>
        </div>
        {personal.avatarUrl && (
          <img
            src={personal.avatarUrl}
            alt={personal.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-900 shadow-xs shrink-0"
          />
        )}
      </div>

      {summary && (
        <div className="space-y-1">
          <h2 className="text-[11px] font-extrabold uppercase tracking-wider text-blue-900">
            Executive Summary
          </h2>
          <p className="text-[12px] leading-relaxed text-slate-700">
            {summary}
          </p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="space-y-2.5">
          <h2 className="text-[11px] font-extrabold uppercase tracking-wider text-blue-900 border-b border-blue-200 pb-0.5">
            Professional Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-0.5">
                <div className="flex items-baseline justify-between text-xs font-bold text-slate-900">
                  <span>{exp.role}, <span className="font-semibold text-slate-600">{exp.company}</span></span>
                  <span className="text-[11px] text-slate-500 font-normal">{exp.period}</span>
                </div>
                {exp.highlights.length > 0 && (
                  <ul className="list-disc pl-4 text-[11.5px] text-slate-700 space-y-0.5 marker:text-blue-700 leading-snug">
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

      {skills.length > 0 && (
        <div className="space-y-1.5">
          <div className="border-b border-blue-200 pb-0.5 flex items-center justify-between">
            <h2 className="text-[11px] font-extrabold uppercase tracking-wider text-blue-900">
              Core Competencies &amp; Skills
            </h2>
            {jobDescription && activeMatchedCount > 0 && (
              <span className="text-[10px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                🎯 {activeMatchedCount} Role Matched
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-1 text-[11px] text-slate-700 font-medium">
            {skills.map((s, idx) => {
              const isMatched = isSkillMatchedForJob(s);
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition-all ${
                    isMatched
                      ? "bg-blue-100/90 text-blue-950 font-bold border border-blue-300 ring-1 ring-blue-400"
                      : ""
                  }`}
                >
                  <span className={isMatched ? "text-blue-800 font-bold" : "text-blue-600 font-bold"}>
                    {isMatched ? "🎯" : "▪"}
                  </span>
                  <span className="truncate">{s}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="space-y-1 pt-1">
          <h2 className="text-[11px] font-extrabold uppercase tracking-wider text-blue-900 border-b border-blue-200 pb-0.5">
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

  /* ──────────────────────────────────────────────────────────────
     TEMPLATE 3: LENA HOFFMANN (EDITORIAL RULE - SHARP DIVIDERS)
  ────────────────────────────────────────────────────────────── */
  const renderEditorialRule = () => (
    <div className="w-full text-slate-950 select-text space-y-4">
      <div className="border-t-2 border-b-2 border-black py-2.5 text-center">
        <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-widest uppercase">
          {personal.name}
        </h1>
        <p className="text-xs uppercase tracking-[0.25em] text-slate-600 mt-1 font-sans">
          {personal.headline}
        </p>
        <div className="text-[10px] tracking-wider text-slate-500 font-sans mt-1">
          {personal.location} | {personal.phone} | {personal.email}
        </div>
      </div>

      {summary && (
        <div className="space-y-1">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-slate-900 border-b border-slate-300 pb-0.5">
            01. Background &amp; Profile
          </h2>
          <p className="text-[11.5px] leading-relaxed text-slate-700 pt-0.5">
            {summary}
          </p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="space-y-2.5">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-slate-900 border-b border-slate-300 pb-0.5">
            02. Professional History
          </h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id} className="grid grid-cols-12 gap-3 text-xs">
                <div className="col-span-3 text-[10px] font-mono uppercase text-slate-500">
                  {exp.period}
                </div>
                <div className="col-span-9 space-y-1">
                  <div className="font-bold text-slate-950 flex justify-between">
                    <span>{exp.role}</span>
                    <span className="font-normal italic text-slate-600">{exp.company}</span>
                  </div>
                  {exp.highlights.length > 0 && (
                    <ul className="list-disc pl-4 text-[11px] text-slate-700 space-y-0.5 leading-snug">
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

      {skills.length > 0 && (
        <div className="space-y-1.5">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-slate-900 border-b border-slate-300 pb-0.5">
            03. Core Competencies
          </h2>
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-800">
            {skills.map((s, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-sm bg-slate-100 border border-slate-200 font-mono text-[10px]">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="space-y-1 pt-1">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-slate-900 border-b border-slate-300 pb-0.5">
            04. Education &amp; Credentials
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="flex justify-between text-xs">
              <span className="font-bold text-slate-900">{edu.degree} — <span className="font-normal italic text-slate-600">{edu.institution}</span></span>
              <span className="text-[11px] font-mono text-slate-500">{edu.year}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  /* ──────────────────────────────────────────────────────────────
     TEMPLATE 4: ANDREW O'SULLIVAN (CLASSIC SERIF TYPOGRAPHY)
  ────────────────────────────────────────────────────────────── */
  const renderClassicSerif = () => (
    <div className="w-full text-slate-900 select-text font-serif space-y-4">
      <div className="text-center pb-2 border-b border-slate-300">
        <h1 className="text-3xl font-normal tracking-tight text-slate-950">
          {personal.name}
        </h1>
        <p className="text-xs italic text-slate-600 mt-1">
          {personal.headline}
        </p>
        <div className="text-[11px] text-slate-500 font-sans mt-1.5 flex justify-center gap-3">
          <span>{personal.location}</span>
          <span>•</span>
          <span>{personal.phone}</span>
          <span>•</span>
          <span>{personal.email}</span>
        </div>
      </div>

      {summary && (
        <div className="space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-0.5 font-sans">
            Profile
          </h2>
          <p className="text-[12px] leading-relaxed text-slate-800 pt-0.5">
            {summary}
          </p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="space-y-2.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-0.5 font-sans">
            Professional Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-0.5">
                <div className="flex items-baseline justify-between text-xs">
                  <span className="font-bold text-slate-950">{exp.role}, <span className="font-normal italic">{exp.company}</span></span>
                  <span className="text-[11px] font-sans text-slate-500">{exp.period}</span>
                </div>
                {exp.highlights.length > 0 && (
                  <ul className="list-disc pl-4 text-[11.5px] text-slate-800 space-y-0.5 marker:text-slate-400 leading-snug">
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

      {education.length > 0 && (
        <div className="space-y-1 pt-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-0.5 font-sans">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="flex justify-between text-xs">
              <span className="font-bold text-slate-900">{edu.degree}, <span className="font-normal italic text-slate-600">{edu.institution}</span></span>
              <span className="text-[11px] font-sans text-slate-500">{edu.year}</span>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div className="space-y-1 pt-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-0.5 font-sans">
            Skills &amp; Expertise
          </h2>
          <div className="flex flex-wrap gap-2 text-xs font-sans text-slate-700">
            {skills.map((s, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[11px] border border-slate-200">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  /* ──────────────────────────────────────────────────────────────
     TEMPLATE 5: SIDEBAR FAMILY (ATLANTIC BLUE, HUNTER GREEN, QUICKSILVER, CORAL NAVY, SPACE LILAC)
  ────────────────────────────────────────────────────────────── */
  const renderSidebarTemplate = (variant: "atlantic-blue" | "hunter-green" | "quicksilver" | "coral-navy" | "space-lilac") => {
    const config = {
      "atlantic-blue": {
        sidebarBg: "bg-[#1E293B]",
        sidebarText: "text-slate-100",
        sidebarSub: "text-slate-400",
        badgeBg: "bg-slate-800 text-slate-200 border-slate-700",
        iconColor: "text-emerald-400",
        accentBorder: "border-slate-700",
        headingAccent: "text-emerald-800",
        markerColor: "marker:text-emerald-700",
      },
      "hunter-green": {
        sidebarBg: "bg-[#143528]",
        sidebarText: "text-emerald-50",
        sidebarSub: "text-emerald-300/80",
        badgeBg: "bg-[#1d4737] text-emerald-100 border-emerald-800/80",
        iconColor: "text-emerald-300",
        accentBorder: "border-emerald-800/60",
        headingAccent: "text-emerald-900",
        markerColor: "marker:text-emerald-800",
      },
      "quicksilver": {
        sidebarBg: "bg-[#F1F5F9]",
        sidebarText: "text-slate-900",
        sidebarSub: "text-slate-600",
        badgeBg: "bg-white text-slate-800 border-slate-300 shadow-2xs",
        iconColor: "text-indigo-600",
        accentBorder: "border-slate-300",
        headingAccent: "text-indigo-900",
        markerColor: "marker:text-indigo-600",
      },
      "coral-navy": {
        sidebarBg: "bg-[#0F172A]",
        sidebarText: "text-slate-100",
        sidebarSub: "text-rose-300/80",
        badgeBg: "bg-rose-950/60 text-rose-200 border-rose-800",
        iconColor: "text-rose-400",
        accentBorder: "border-rose-900/40",
        headingAccent: "text-rose-700",
        markerColor: "marker:text-rose-600",
      },
      "space-lilac": {
        sidebarBg: "bg-[#2E1065]",
        sidebarText: "text-purple-50",
        sidebarSub: "text-purple-300/80",
        badgeBg: "bg-purple-900/60 text-purple-200 border-purple-700",
        iconColor: "text-fuchsia-300",
        accentBorder: "border-purple-800/50",
        headingAccent: "text-purple-900",
        markerColor: "marker:text-purple-700",
      },
    }[variant];

    return (
      <div className="w-full grid grid-cols-12 min-h-[1050px] bg-white text-slate-900 select-text overflow-hidden -m-6 sm:-m-10">
        {/* ── LEFT SIDEBAR (35%) ── */}
        <div className={`col-span-4 ${config.sidebarBg} ${config.sidebarText} p-6 sm:p-7 flex flex-col justify-between space-y-6`}>
          <div className="space-y-6">
            {personal.avatarUrl && (
              <div className="flex justify-center pt-2">
                <img
                  src={personal.avatarUrl}
                  alt={personal.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-white/30 shadow-md"
                />
              </div>
            )}

            <div className="space-y-2.5 text-[11px]">
              <h3 className={`text-[10px] font-extrabold uppercase tracking-widest ${config.sidebarSub} border-b ${config.accentBorder} pb-1`}>
                Contact Channels
              </h3>
              {personal.email && (
                <div className="flex items-center gap-2">
                  <Mail size={12} className={`${config.iconColor} shrink-0`} />
                  <span className="truncate">{personal.email}</span>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={12} className={`${config.iconColor} shrink-0`} />
                  <span>{personal.phone}</span>
                </div>
              )}
              {personal.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={12} className={`${config.iconColor} shrink-0`} />
                  <span>{personal.location}</span>
                </div>
              )}
              {personal.linkedin && (
                <div className="flex items-center gap-2">
                  <LinkedinIcon size={12} className={`${config.iconColor} shrink-0`} />
                  <span className="truncate">{personal.linkedin.replace(/^https?:\/\//i, "")}</span>
                </div>
              )}
              {personal.github && (
                <div className="flex items-center gap-2">
                  <GithubIcon size={12} className={`${config.iconColor} shrink-0`} />
                  <span className="truncate">{personal.github.replace(/^https?:\/\//i, "")}</span>
                </div>
              )}
            </div>

            {education.length > 0 && (
              <div className="space-y-2">
                <h3 className={`text-[10px] font-extrabold uppercase tracking-widest ${config.sidebarSub} border-b ${config.accentBorder} pb-1`}>
                  Education
                </h3>
                {education.map((edu) => (
                  <div key={edu.id} className="text-[11px] leading-snug">
                    <div className="font-bold">{edu.degree}</div>
                    <div className={`${config.sidebarSub} text-[10px]`}>{edu.institution}</div>
                    <div className={`${config.iconColor} text-[10px]`}>{edu.year}</div>
                  </div>
                ))}
              </div>
            )}

            {skills.length > 0 && (
              <div className="space-y-2">
                <div className={`flex items-center justify-between border-b ${config.accentBorder} pb-1`}>
                  <h3 className={`text-[10px] font-extrabold uppercase tracking-widest ${config.sidebarSub}`}>
                    Core Competencies
                  </h3>
                  {jobDescription && activeMatchedCount > 0 && (
                    <span className="text-[9px] font-bold text-emerald-300 bg-emerald-950/70 px-1.5 py-0.5 rounded border border-emerald-500/40">
                      🎯 {activeMatchedCount}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s, idx) => {
                    const isMatched = isSkillMatchedForJob(s);
                    return (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border transition-all ${
                          isMatched
                            ? "bg-emerald-500/25 text-emerald-300 border-emerald-400 font-bold ring-1 ring-emerald-400/70 flex items-center gap-1 shadow-xs"
                            : `${config.badgeBg}`
                        }`}
                      >
                        {isMatched && <span className="text-[9px]">🎯</span>}
                        <span>{s}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className={`pt-4 border-t ${config.accentBorder} text-[9px] ${config.sidebarSub}`}>
            Executive Portfolio Certified • FlowCV Engine
          </div>
        </div>

        {/* ── RIGHT MAIN BODY (65%) ── */}
        <div className="col-span-8 p-7 sm:p-9 space-y-5">
          <div className="border-b border-slate-200 pb-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-900">
              {personal.name}
            </h1>
            <p className={`text-xs sm:text-sm font-bold ${config.headingAccent} tracking-wide mt-0.5`}>
              {personal.headline}
            </p>
          </div>

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
                      <ul className={`pl-4 list-disc text-slate-700 text-[11.5px] leading-snug space-y-1 ${config.markerColor}`}>
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

          {projects.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                Key Projects &amp; Initiatives
              </h2>
              <div className="space-y-2">
                {projects.map((proj) => (
                  <div key={proj.id} className="text-xs">
                    <div className="font-bold text-slate-900 flex items-center justify-between">
                      <span>{proj.title}</span>
                      <span className="text-[10px] text-slate-500 font-normal">{proj.techStack}</span>
                    </div>
                    {proj.description && (
                      <p className="text-[11.5px] text-slate-600 leading-snug mt-0.5">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  /* ──────────────────────────────────────────────────────────────
     TEMPLATE 6: CAMILA RIVERA (MERCURY FLOW - GRADIENT BANNER & TIMELINE)
  ────────────────────────────────────────────────────────────── */
  const renderMercuryFlow = () => (
    <div className="w-full text-slate-900 select-text space-y-4">
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

      {summary && (
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 text-[12px] text-slate-700 leading-relaxed">
          {summary}
        </div>
      )}

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
                <div className="col-span-3 text-[11px] font-bold text-slate-500 pt-0.5">
                  <div>{exp.period}</div>
                  <div className="text-[10px] text-slate-400 font-normal">{exp.location}</div>
                </div>
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

      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200">
        <div className="space-y-2">
          <div className="border-b border-slate-200 pb-1 flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Top Skills
            </h3>
            {jobDescription && activeMatchedCount > 0 && (
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                🎯 {activeMatchedCount} Matched
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s, idx) => {
              const isMatched = isSkillMatchedForJob(s);
              return (
                <span
                  key={idx}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all ${
                    isMatched
                      ? "bg-emerald-100 text-emerald-950 font-bold border-emerald-400 ring-1 ring-emerald-500 shadow-2xs flex items-center gap-1"
                      : "bg-slate-100 text-slate-800 border-slate-200"
                  }`}
                >
                  {isMatched && <span className="text-[10px]">🎯</span>}
                  <span>{s}</span>
                </span>
              );
            })}
          </div>
        </div>
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
     TEMPLATE 7: ALEJANDRO HERRERA (COBALT EDGE - ROYAL BLUE HERO)
  ────────────────────────────────────────────────────────────── */
  const renderCobaltEdge = () => (
    <div className="w-full text-slate-900 select-text overflow-hidden -m-6 sm:-m-10 min-h-[1050px] bg-white">
      {/* Top Hero Banner */}
      <div className="bg-[#1D4ED8] text-white p-7 sm:p-9 flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase">
            {personal.name}
          </h1>
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-blue-100">
            {personal.headline}
          </p>
        </div>
        {personal.avatarUrl && (
          <img
            src={personal.avatarUrl}
            alt={personal.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md shrink-0"
          />
        )}
      </div>

      {/* Sub Header Contact Bar */}
      <div className="bg-blue-50/80 border-b border-blue-100 px-7 py-2.5 flex flex-wrap gap-4 text-xs font-medium text-blue-900">
        <span>📍 {personal.location}</span>
        <span>✉️ {personal.email}</span>
        <span>📞 {personal.phone}</span>
        {personal.linkedin && <span>💼 {personal.linkedin.replace(/^https?:\/\//i, "")}</span>}
      </div>

      <div className="p-7 sm:p-9 space-y-5">
        {summary && (
          <div className="space-y-1">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-900 border-b border-blue-200 pb-1">
              Executive Summary
            </h2>
            <p className="text-[12px] leading-relaxed text-slate-700 pt-1">
              {summary}
            </p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-900 border-b border-blue-200 pb-1">
              Professional Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex items-baseline justify-between text-xs font-bold text-slate-900">
                    <span>{exp.role} <span className="text-blue-700 font-semibold">— {exp.company}</span></span>
                    <span className="text-[11px] font-normal text-slate-500">{exp.period}</span>
                  </div>
                  {exp.highlights.length > 0 && (
                    <ul className="list-disc pl-4 text-[11.5px] text-slate-700 space-y-0.5 marker:text-blue-600">
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

        <div className="grid grid-cols-2 gap-6 pt-2 border-t border-slate-200">
          <div className="space-y-2">
            <div className="border-b border-blue-200 pb-1 flex items-center justify-between">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-900">
                Skills &amp; Competencies
              </h3>
              {jobDescription && activeMatchedCount > 0 && (
                <span className="text-[10px] font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded-full border border-blue-300">
                  🎯 {activeMatchedCount} Role Matched
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s, idx) => {
                const isMatched = isSkillMatchedForJob(s);
                return (
                  <span
                    key={idx}
                    className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium border transition-all ${
                      isMatched
                        ? "bg-blue-100 text-blue-950 font-bold border-blue-400 ring-1 ring-blue-500 shadow-2xs flex items-center gap-1"
                        : "bg-blue-50 text-blue-900 border-blue-200"
                    }`}
                  >
                    {isMatched && <span className="text-[10px]">🎯</span>}
                    <span>{s}</span>
                  </span>
                );
              })}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-900 border-b border-blue-200 pb-1">
              Education
            </h3>
            {education.map((edu) => (
              <div key={edu.id} className="text-xs">
                <div className="font-bold text-slate-900">{edu.degree}</div>
                <div className="text-slate-600 text-[11px]">{edu.institution} • {edu.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  /* ──────────────────────────────────────────────────────────────
     TEMPLATE 8: MATTEO RICCI (SAFFRON LINE - GOLD ACCENTS & AVATAR)
  ────────────────────────────────────────────────────────────── */
  const renderSaffronLine = () => (
    <div className="w-full text-slate-900 select-text space-y-4">
      <div className="flex items-center gap-5 border-b-2 border-amber-600 pb-4">
        {personal.avatarUrl && (
          <img
            src={personal.avatarUrl}
            alt={personal.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-amber-500 shadow-sm shrink-0"
          />
        )}
        <div className="space-y-0.5 flex-1">
          <h1 className="text-2xl font-extrabold tracking-tight uppercase text-slate-900">
            {personal.name}
          </h1>
          <p className="text-xs font-bold text-amber-700 tracking-wide uppercase">
            {personal.headline}
          </p>
          <div className="text-[11px] text-slate-500 flex gap-3 pt-0.5">
            <span>{personal.location}</span>
            <span>•</span>
            <span>{personal.phone}</span>
            <span>•</span>
            <span>{personal.email}</span>
          </div>
        </div>
      </div>

      {summary && (
        <div className="space-y-1">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-amber-800 border-b border-amber-200 pb-0.5">
            Profile Overview
          </h2>
          <p className="text-[12px] leading-relaxed text-slate-700 pt-0.5">
            {summary}
          </p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="space-y-2.5">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-amber-800 border-b border-amber-200 pb-0.5">
            Professional Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-900">
                  <span>{exp.role} <span className="font-semibold text-amber-800">— {exp.company}</span></span>
                  <span className="text-[11px] font-normal text-slate-500">{exp.period}</span>
                </div>
                {exp.highlights.length > 0 && (
                  <ul className="list-disc pl-4 text-[11.5px] text-slate-700 space-y-0.5 marker:text-amber-600">
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

      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-amber-200">
        <div className="space-y-1.5">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-800 border-b border-amber-200 pb-0.5">
            Core Competencies
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-sm bg-amber-50 text-amber-900 border border-amber-200 text-[11px]">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-800 border-b border-amber-200 pb-0.5">
            Education
          </h3>
          {education.map((edu) => (
            <div key={edu.id} className="text-xs">
              <div className="font-bold text-slate-900">{edu.degree}</div>
              <div className="text-slate-600 text-[11px]">{edu.institution} • {edu.year}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ──────────────────────────────────────────────────────────────
     TEMPLATE 9: SARAH WATSON (HAPPY GEO - PLAYFUL GEOMETRIC ACCENTS)
  ────────────────────────────────────────────────────────────── */
  const renderHappyGeo = () => (
    <div className="w-full text-slate-900 select-text relative overflow-hidden p-2">
      {/* Geometric Decorative Corners */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-br-3xl opacity-80 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-orange-400 to-amber-500 rounded-tl-3xl opacity-80 pointer-events-none" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-5 pt-3 pl-4">
          {personal.avatarUrl && (
            <img
              src={personal.avatarUrl}
              alt={personal.name}
              className="w-18 h-18 rounded-2xl object-cover border-2 border-orange-300 shadow-sm"
            />
          )}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              {personal.name}
            </h1>
            <p className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              {personal.headline}
            </p>
            <div className="text-[11px] text-slate-500 flex gap-2 pt-1">
              <span>{personal.location}</span>
              <span>•</span>
              <span>{personal.email}</span>
            </div>
          </div>
        </div>

        {summary && (
          <div className="p-3.5 rounded-2xl bg-orange-50/60 border border-orange-200/80 text-[12px] text-slate-700 leading-relaxed">
            {summary}
          </div>
        )}

        {experience.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b-2 border-teal-500 pb-1">
              Career Journey
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-900">
                    <span>{exp.role} <span className="text-teal-700 font-semibold">@ {exp.company}</span></span>
                    <span className="text-[11px] font-normal text-slate-500">{exp.period}</span>
                  </div>
                  {exp.highlights.length > 0 && (
                    <ul className="list-disc pl-4 text-[11.5px] text-slate-700 space-y-0.5 marker:text-teal-500">
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

        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200">
          <div className="space-y-1.5">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">
              Superpowers
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-900 border border-teal-200 text-[10px] font-bold">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">
              Education
            </h3>
            {education.map((edu) => (
              <div key={edu.id} className="text-xs">
                <div className="font-bold text-slate-900">{edu.degree}</div>
                <div className="text-slate-600 text-[11px]">{edu.institution} • {edu.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  /* ──────────────────────────────────────────────────────────────
     TEMPLATE 10: CATHERINE BALE (BOTANICAL LEAVES - ARTISTIC MARGIN)
  ────────────────────────────────────────────────────────────── */
  const renderBotanicalLeaves = () => (
    <div className="w-full text-slate-900 select-text flex min-h-[1050px] -m-6 sm:-m-10 overflow-hidden bg-white">
      {/* Decorative Botanical Left Border Strip */}
      <div className="w-12 bg-emerald-50 border-r border-emerald-100 flex flex-col items-center justify-around py-8 text-emerald-600/40 select-none">
        <span className="text-lg">🌿</span>
        <span className="text-lg">🍃</span>
        <span className="text-lg">🌿</span>
        <span className="text-lg">🍃</span>
        <span className="text-lg">🌿</span>
      </div>

      <div className="flex-1 p-7 sm:p-9 space-y-4">
        <div className="flex items-center gap-5 border-b border-emerald-200 pb-4">
          {personal.avatarUrl && (
            <img
              src={personal.avatarUrl}
              alt={personal.name}
              className="w-18 h-18 rounded-full object-cover border-2 border-emerald-600 shadow-sm"
            />
          )}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-950">
              {personal.name}
            </h1>
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              {personal.headline}
            </p>
            <div className="text-[11px] text-slate-500 flex gap-3 pt-1">
              <span>{personal.location}</span>
              <span>•</span>
              <span>{personal.phone}</span>
              <span>•</span>
              <span>{personal.email}</span>
            </div>
          </div>
        </div>

        {summary && (
          <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 text-[12px] text-slate-700 leading-relaxed">
            {summary}
          </div>
        )}

        {experience.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 border-b border-emerald-200 pb-1">
              Professional Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-900">
                    <span>{exp.role} <span className="text-emerald-700 font-semibold">— {exp.company}</span></span>
                    <span className="text-[11px] font-normal text-slate-500">{exp.period}</span>
                  </div>
                  {exp.highlights.length > 0 && (
                    <ul className="list-disc pl-4 text-[11.5px] text-slate-700 space-y-0.5 marker:text-emerald-500">
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

        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-emerald-200">
          <div className="space-y-1.5">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 border-b border-emerald-200 pb-0.5">
              Skills &amp; Capabilities
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s, idx) => (
                <span key={idx} className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-[11px] font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 border-b border-emerald-200 pb-0.5">
              Education
            </h3>
            {education.map((edu) => (
              <div key={edu.id} className="text-xs">
                <div className="font-bold text-slate-900">{edu.degree}</div>
                <div className="text-slate-600 text-[11px]">{edu.institution} • {edu.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Backward compatibility aliases
  const renderClassicAts = renderClassicClear;
  const renderModernSidebar = () => renderSidebarTemplate("atlantic-blue");
  const renderCreativeHeader = renderMercuryFlow;
  const renderMinimalCompact = renderTrueBlue;


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
        <div className="max-w-[1580px] mx-auto space-y-3">
          
          {/* Header Row: Title & Category Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#173f32] flex items-center justify-center border border-emerald-200">
                <Layout size={15} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                    FlowCV Resume Templates
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                    14 Designs
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Select any template below — the live paper canvas compiles and exports that exact layout.
                </p>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold">
              {[
                { id: "all", label: "All (14)" },
                { id: "simple", label: "Simple & ATS (4)" },
                { id: "modern", label: "Modern Sidebars (5)" },
                { id: "banners", label: "Header Banners (3)" },
                { id: "creative", label: "Creative & Visual (2)" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setTemplateCategory(cat.id as any)}
                  className={`px-3 py-1.5 rounded-xl transition-all shrink-0 cursor-pointer text-[11px] ${
                    templateCategory === cat.id
                      ? "bg-[#173f32] text-white shadow-xs font-bold"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Template Cards Horizontal Carousel */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin">
            {filteredTemplates.map((tmpl) => {
              const isSelected = selectedTemplate === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => {
                    setSelectedTemplate(tmpl.id);
                    setStatusMessage(`Switched to ${tmpl.title} (${tmpl.author}) layout!`);
                    setTimeout(() => setStatusMessage(null), 2500);
                  }}
                  className={`p-2.5 rounded-2xl border text-left flex items-center gap-3 transition-all shrink-0 cursor-pointer group min-w-[210px] ${
                    isSelected
                      ? "border-[#173f32] bg-emerald-50/70 text-[#173f32] ring-2 ring-[#173f32] shadow-sm"
                      : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {/* Miniature Visual Layout Wireframe */}
                  <div className="w-10 h-14 rounded-md border border-slate-300 overflow-hidden shrink-0 shadow-2xs relative bg-white flex flex-col justify-between">
                    {tmpl.previewType === "sidebar" && (
                      <div className="w-full h-full flex">
                        <div
                          className="w-[38%] h-full shrink-0 flex flex-col justify-around items-center p-0.5"
                          style={{ backgroundColor: tmpl.previewBg || "#1e293b" }}
                        >
                          <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                          <div className="w-2 h-0.5 bg-white/40 rounded-full" />
                          <div className="w-2 h-0.5 bg-white/40 rounded-full" />
                        </div>
                        <div className="w-[62%] h-full p-1 space-y-1 bg-white">
                          <div className="w-full h-1 bg-slate-300 rounded-full" />
                          <div className="w-3/4 h-0.5 bg-slate-200 rounded-full" />
                          <div className="w-full h-0.5 bg-slate-200 rounded-full" />
                          <div className="w-5/6 h-0.5 bg-slate-200 rounded-full" />
                        </div>
                      </div>
                    )}

                    {tmpl.previewType === "banner" && (
                      <div className="w-full h-full flex flex-col">
                        <div
                          className="w-full h-[32%] shrink-0 flex items-center justify-between px-1"
                          style={{ backgroundColor: tmpl.previewBg || "#1d4ed8" }}
                        >
                          <div className="w-4 h-1 bg-white/70 rounded-full" />
                          <div className="w-2 h-2 rounded-full bg-white/80" />
                        </div>
                        <div className="w-full h-[68%] p-1 space-y-1 bg-white">
                          <div className="w-full h-0.5 bg-slate-300 rounded-full" />
                          <div className="w-4/5 h-0.5 bg-slate-200 rounded-full" />
                          <div className="w-full h-0.5 bg-slate-200 rounded-full" />
                        </div>
                      </div>
                    )}

                    {tmpl.previewType === "single" && (
                      <div className="w-full h-full p-1 space-y-1 bg-white flex flex-col justify-center">
                        <div className="w-3/4 mx-auto h-1 bg-slate-400 rounded-full" />
                        <div className="w-1/2 mx-auto h-0.5 bg-slate-300 rounded-full" />
                        <div className="w-full h-px bg-slate-200" />
                        <div className="w-full h-0.5 bg-slate-300 rounded-full" />
                        <div className="w-5/6 h-0.5 bg-slate-200 rounded-full" />
                        <div className="w-4/5 h-0.5 bg-slate-200 rounded-full" />
                      </div>
                    )}

                    {tmpl.previewType === "creative" && (
                      <div className="w-full h-full bg-white relative overflow-hidden flex flex-col justify-center p-1 space-y-1">
                        <div className="absolute top-0 left-0 w-3 h-3 bg-teal-400 rounded-br-md" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-orange-400 rounded-tl-md" />
                        <div className="w-2/3 h-1 bg-slate-400 rounded-full ml-2" />
                        <div className="w-full h-0.5 bg-slate-200 rounded-full" />
                        <div className="w-4/5 h-0.5 bg-slate-200 rounded-full" />
                      </div>
                    )}

                    {/* Active Checkmark Ribbon */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-emerald-950/20 flex items-center justify-center">
                        <div className="w-3.5 h-3.5 rounded-full bg-[#173f32] text-white flex items-center justify-center shadow-xs">
                          <Check size={9} strokeWidth={3} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Template Meta Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold leading-tight truncate text-slate-900 group-hover:text-[#173f32]">
                        {tmpl.title}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium truncate">
                      {tmpl.author}
                    </div>
                    <div className="mt-1">
                      <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[9px] font-bold">
                        {tmpl.badge}
                      </span>
                    </div>
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
                    {/* ── PHOTO UPLOAD & AVATAR STUDIO ── */}
                    <div className="col-span-2 p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/40 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Camera size={15} className="text-[#173f32]" />
                          <label className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                            Resume Profile Photo
                          </label>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {personal.avatarUrl ? "Photo Active" : "No Photo (Text-Only ATS)"}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Live Avatar Preview */}
                        <div className="relative shrink-0">
                          {personal.avatarUrl ? (
                            <img
                              src={personal.avatarUrl}
                              alt="Avatar preview"
                              className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm ring-2 ring-emerald-500"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-slate-300 bg-white flex flex-col items-center justify-center text-slate-400">
                              <User size={20} />
                              <span className="text-[9px] font-semibold mt-0.5">No Photo</span>
                            </div>
                          )}
                        </div>

                        {/* Upload Controls & Actions */}
                        <div className="flex-1 space-y-2">
                          <input
                            type="file"
                            ref={photoInputRef}
                            accept="image/png, image/jpeg, image/webp"
                            className="hidden"
                            onChange={handlePhotoUpload}
                          />

                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => photoInputRef.current?.click()}
                              className="px-3.5 py-2 rounded-xl bg-[#173f32] hover:bg-[#13352a] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                            >
                              <Camera size={13} />
                              <span>Upload Photo</span>
                            </button>

                            {personal.avatarUrl && (
                              <button
                                type="button"
                                onClick={() => setPersonal({ ...personal, avatarUrl: "" })}
                                className="px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700 text-slate-600 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                                title="Remove photo for pure text ATS format"
                              >
                                <Trash2 size={13} />
                                <span>Remove</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() =>
                                setPersonal({
                                  ...personal,
                                  avatarUrl:
                                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=faces",
                                })
                              }
                              className="px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold transition cursor-pointer"
                            >
                              Sample Headshot
                            </button>
                          </div>

                          <p className="text-[10px] text-slate-500 leading-tight">
                            Supports PNG, JPG, WebP up to 5MB. Photo automatically formats to your chosen coverpage &amp; template layout.
                          </p>
                        </div>
                      </div>

                      {/* Optional URL Fallback */}
                      <div className="pt-2 border-t border-slate-200/80">
                        <label className="text-[10px] font-bold text-slate-500 block mb-1">
                          Or paste photo direct URL:
                        </label>
                        <input
                          type="text"
                          value={personal.avatarUrl}
                          onChange={(e) => setPersonal({ ...personal, avatarUrl: e.target.value })}
                          placeholder="https://images.unsplash.com/... or paste image link"
                          className="w-full text-xs font-mono p-2 rounded-xl border border-slate-200 bg-white focus:ring-1 focus:ring-[#173f32] outline-hidden text-[11px]"
                        />
                      </div>
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

              {/* Role Skill Matching Dashboard */}
              {jobDescription.trim().length > 0 && (
                <div className="space-y-3 p-4 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-slate-50 border border-emerald-200/80">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-950 uppercase tracking-wider">
                      <span>🎯 Target Role Skills Analysis</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {activeMatchedCount} Highlighted
                    </span>
                  </div>

                  {/* Matched Skills Chips */}
                  {activeMatchedSkills.length > 0 ? (
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold text-emerald-800 flex items-center justify-between">
                        <span>✓ Matched on Your Resume (Highlighted):</span>
                        <span className="text-[10px] text-slate-500 font-normal">Active in Live Preview</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeMatchedSkills.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-950 font-bold border border-emerald-300 text-[11px] flex items-center gap-1 shadow-2xs"
                          >
                            <span>🎯</span>
                            <span>{s}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-500 italic">
                      No matching skills found in description yet. Click 'Tailor Resume' or add relevant skills below.
                    </p>
                  )}

                  {/* Missing In-Demand Skills from Job Spec */}
                  {missingJobSkills.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-emerald-200/60">
                      <div className="text-[11px] font-bold text-amber-900 flex items-center justify-between">
                        <span>⚡ Recommended Skills (Click to Add):</span>
                        <span className="text-[10px] text-amber-700">From Job Post</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {missingJobSkills.map((s, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              if (!skills.includes(s)) {
                                setSkills([...skills, s]);
                                setStatusMessage(`Added "${s}" to your resume skills!`);
                                setTimeout(() => setStatusMessage(null), 2500);
                              }
                            }}
                            className="px-2 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-[10.5px] font-bold transition flex items-center gap-1 cursor-pointer"
                            title="Click to add to your resume"
                          >
                            <Plus size={10} />
                            <span>{s}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {keywordMatchScore !== null && (
                    <div className="p-3 rounded-xl bg-white border border-emerald-200 flex items-center justify-between text-xs font-bold text-emerald-900 shadow-2xs">
                      <span>ATS Keyword Match Score</span>
                      <span className="text-base font-extrabold text-emerald-700">{keywordMatchScore}%</span>
                    </div>
                  )}
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

              {/* Reset & Clear Tailoring button to restore normal resume display */}
              {jobDescription.trim().length > 0 && (
                <button
                  onClick={() => {
                    setJobDescription("");
                    setTailoredResumeMarkdown("");
                    setMatchedJobSkills([]);
                    setMissingJobSkills([]);
                    setKeywordMatchScore(null);
                    setStatusMessage("Target job cleared — resume skills restored to standard display.");
                    setTimeout(() => setStatusMessage(null), 3000);
                  }}
                  className="w-full py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Trash2 size={13} />
                  <span>Clear Job Tailor &amp; Restore Standard Resume</span>
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
              {/* Dynamic FlowCV Template Dispatcher */}
              {(selectedTemplate === "classic-clear" || selectedTemplate === "classic-ats") && renderClassicClear()}
              {(selectedTemplate === "true-blue" || selectedTemplate === "minimal-compact") && renderTrueBlue()}
              {selectedTemplate === "editorial-rule" && renderEditorialRule()}
              {selectedTemplate === "classic-serif" && renderClassicSerif()}

              {(selectedTemplate === "atlantic-blue" || selectedTemplate === "modern-sidebar") && renderSidebarTemplate("atlantic-blue")}
              {selectedTemplate === "hunter-green" && renderSidebarTemplate("hunter-green")}
              {selectedTemplate === "quicksilver" && renderSidebarTemplate("quicksilver")}
              {selectedTemplate === "coral-navy" && renderSidebarTemplate("coral-navy")}
              {selectedTemplate === "space-lilac" && renderSidebarTemplate("space-lilac")}

              {(selectedTemplate === "mercury-flow" || selectedTemplate === "creative-header") && renderMercuryFlow()}
              {selectedTemplate === "cobalt-edge" && renderCobaltEdge()}
              {selectedTemplate === "saffron-line" && renderSaffronLine()}

              {selectedTemplate === "happy-geo" && renderHappyGeo()}
              {selectedTemplate === "botanical-leaves" && renderBotanicalLeaves()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
