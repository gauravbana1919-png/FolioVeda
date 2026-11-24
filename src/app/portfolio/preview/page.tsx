"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { 
  ArrowLeft, 
  Check, 
  Cloud, 
  Sparkles, 
  Sun, 
  Moon, 
  Terminal, 
  BookOpen, 
  Flame,
  ExternalLink,
  Layers,
  FileText,
  Monitor,
  Laptop,
  Tablet,
  Smartphone,
  Edit3,
  X,
  Plus,
  Trash2,
  Copy,
  Globe,
  Share2,
  Upload,
  FileUp,
  CheckCircle2,
  Rocket,
  DownloadCloud
} from "lucide-react";
import { AiAgentWidget } from "@/components/portfolio/AiAgentWidget";
import { FolioVedaLogo } from "@/components/ui/Logo";
import { getThemeById, getAllSystemThemes, mapUserToPortfolioContent } from "@/lib/themes/registry";
import { ThemeRenderer } from "@/components/portfolio/engine/ThemeRenderer";
import { PERSONA_PROFILES } from "@/lib/personas";
import { DeployModal } from "@/components/portfolio/DeployModal";
import { GithubImporter } from "@/components/portfolio/GithubImporter";
import { ReadinessScorecard } from "@/components/portfolio/ReadinessScorecard";
import { exportStandaloneHtml, exportPortfolioZip, generateProfileReadme } from "@/lib/export/exportPortfolio";

const ACCENT_COLORS = [
  { id: "emerald", label: "Cyber Mint", bg: "bg-emerald-500", ring: "ring-emerald-500" },
  { id: "blue", label: "Cobalt Blue", bg: "bg-blue-500", ring: "ring-blue-500" },
  { id: "purple", label: "Electric Purple", bg: "bg-purple-500", ring: "ring-purple-500" },
  { id: "amber", label: "Sunset Amber", bg: "bg-amber-500", ring: "ring-amber-500" },
  { id: "rose", label: "Rose Quartz", bg: "bg-rose-500", ring: "ring-rose-500" },
];

export default function PortfolioStudio() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const [aiNotice, setAiNotice] = useState<string | null>(null);

  const [activeThemeId, setActiveThemeId] = useState<string>("sudarvel");
  const [accentColor, setAccentColor] = useState<string>("emerald");
  const [viewportMode, setViewportMode] = useState<"desktop" | "laptop" | "tablet" | "mobile">("desktop");
  const [activePersonaId, setActivePersonaId] = useState<string>("fullstack-developer");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isGithubImportOpen, setIsGithubImportOpen] = useState(false);
  const [showReadiness, setShowReadiness] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isImportingPdf, setIsImportingPdf] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [fontFamily, setFontFamily] = useState<string>("sans");
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);
  const [pastedResumeText, setPastedResumeText] = useState("");
  const [isExtractingPaste, setIsExtractingPaste] = useState(false);
  const [pasteExtractError, setPasteExtractError] = useState<string | null>(null);

  // User state
  const [userData, setUserData] = useState<any>({
    name: "Gaurav Shekhawat",
    profile: {
      headline: "Senior Full-Stack Engineer • Systems Builder • AI & Next.js Specialist",
      bio: "I build high-throughput distributed systems, then direct AI to turn complex workflows into working products. Focused on sub-100ms APIs, resilient event pipelines, and outcome-driven design.",
      skills: "Next.js 15, TypeScript, React, Node.js, PostgreSQL, Docker, Prisma, Redis, Tailwind CSS, Gemini AI",
      location: "Bengaluru, India / Remote",
      availability: "Open to Staff / Senior Roles",
      experience: JSON.stringify([
        {
          role: "Senior Full-Stack Engineer",
          company: "NexaStream Solutions",
          period: "Jun 2023 – Present",
          location: "Bengaluru, India / Remote",
          highlights: [
            "Architected edge telemetry portal using Next.js 15, TypeScript, and Prisma, improving query throughput by 38%.",
            "Implemented distributed Redis caching layers for high-frequency dashboard routes, reducing P99 latency from 420ms to 65ms.",
            "Mentored 6 engineers on state management, asynchronous data fetching, and automated testing standards."
          ]
        },
        {
          role: "Software Engineer",
          company: "CloudForge Tech",
          period: "Aug 2021 – May 2023",
          location: "Hyderabad, India",
          highlights: [
            "Engineered core responsive customer onboarding workflows with React and Tailwind CSS, increasing lead conversion rate by 24%.",
            "Developed resilient background queue processors for payment reconciliation using Node.js and PostgreSQL.",
          ]
        }
      ]),
      education: JSON.stringify([
        {
          degree: "B.Tech in Computer Science & Engineering",
          institution: "Visvesvaraya Technological University",
          year: "2021",
          gpa: "8.8 / 10.0",
          honors: "First Class with Distinction",
        }
      ]),
      certifications: JSON.stringify([
        {
          name: "AWS Certified Solutions Architect",
          issuer: "Amazon Web Services",
          year: "2024",
          status: "Verified"
        },
        {
          name: "Enterprise Design Thinking Practitioner",
          issuer: "IBM",
          year: "2024",
          status: "Completed"
        }
      ]),
      socials: JSON.stringify({
        github: "https://github.com/gauravbana1919-png",
        linkedin: "https://www.linkedin.com/in/gaurav-shekhawat-a24644398/",
        website: "https://folioveda.dev"
      })
    },
    projects: [
      {
        title: "Distributed Telemetry & Edge Pipeline",
        description: "A low-latency distributed caching and telemetry engine built with Next.js, Redis, and Prisma, serving 100k+ req/sec with sub-5ms P99 latency.",
        techStack: ["Next.js 15", "TypeScript", "Redis", "Docker", "PostgreSQL"],
        liveUrl: "https://github.com/gauravbana1919-png",
        githubUrl: "https://github.com/gauravbana1919-png",
        featured: true,
        category: "Distributed Architecture",
        impact: "+38% Query Throughput • 420ms ➔ 65ms P99",
        problem: "Legacy monolithic APIs struggled under concurrent analytics loads with frequent latency spikes and high cloud egress fees.",
        solution: "Engineered an edge caching layer using Redis and Next.js Turbopack that decouples heavy queries and serves 100k+ req/sec at sub-5ms latency."
      },
      {
        title: "AI Synthesis Canvas & Workflow Engine",
        description: "Interactive real-time collaboration canvas with LLM-powered diagram generation, AST streaming, and instant markdown previewing.",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "WebSockets", "Gemini AI"],
        liveUrl: "https://github.com/gauravbana1919-png",
        githubUrl: "https://github.com/gauravbana1919-png",
        featured: true,
        category: "AI Product Architecture",
        impact: "200k+ MAU • Sub-100ms Live AST Stream",
        problem: "Engineers and product designers spent excessive hours manually drafting cloud system architecture diagrams and flowcharts.",
        solution: "Built a collaborative canvas that streams LLM structured JSON into real-time interactive diagrams with sub-100ms render speeds."
      },
      {
        title: "FolioVeda — Autonomous Portfolio Compiler",
        description: "Autonomous career architecture compiler with zero-hallucination intake, dynamic Wall of Portfolios archetypes, and live ATS keyword auditing.",
        techStack: ["Next.js", "Prisma", "SQLite", "Framer Motion", "Tailwind CSS"],
        liveUrl: "https://folioveda.dev",
        githubUrl: "https://github.com/gauravbana1919-png",
        featured: false,
        category: "Full-Stack SaaS Platform",
        impact: "Wall of Portfolios Standard • Sub-50ms TTFB",
        problem: "Developers and designers had fragmented, unattractive portfolios that failed ATS parsers and lacked outcome-driven case studies.",
        solution: "Created an autonomous portfolio compiler with zero-hallucination intake, dynamic architectural theme engines, and high-impact case study drawers."
      },
    ],
  });

  useEffect(() => {
    setMounted(true);

    // 1. Check if user recently extracted a PDF or Text in Onboarding
    try {
      const cached = localStorage.getItem("folioveda_active_profile");
      if (cached) {
        const ext = JSON.parse(cached);
        if (ext && ext.name) {
          const cleanName = ext.name.replace(/[*_#`~]/g, "").trim();
          setUserData((prev: any) => ({
            ...prev,
            name: cleanName || prev.name,
            profile: {
              ...prev.profile,
              headline: ext.headline || prev.profile.headline,
              bio: ext.bio || prev.profile.bio,
              skills: ext.skills ? (Array.isArray(ext.skills) ? ext.skills.join(", ") : ext.skills) : prev.profile.skills,
              location: ext.location || prev.profile.location,
              availability: ext.availability || prev.profile.availability,
              experience: JSON.stringify(ext.experience || []),
              education: JSON.stringify(ext.education || []),
              certifications: JSON.stringify(ext.certifications || []),
              socials: JSON.stringify(ext.contact || {}),
            },
            projects: ext.projects && ext.projects.length > 0 ? ext.projects : prev.projects,
          }));
          if (ext.recommendedTheme) setActiveThemeId(ext.recommendedTheme);
          if (ext.fontFamily) setFontFamily(ext.fontFamily);
          if (ext.accentColor) setAccentColor(ext.accentColor);
        }
      }
    } catch (e) {}

    // 2. Fetch profile from database (support ?name= and ?username= query params, or active profile in localStorage)
    async function loadPortfolio() {
      try {
        const params = new URLSearchParams(window.location.search);
        let cachedName = "";
        let cachedTheme = "";
        let cachedFont = "";
        try {
          const c = localStorage.getItem("folioveda_active_profile");
          if (c) {
            const parsed = JSON.parse(c);
            if (parsed?.name) cachedName = parsed.name.replace(/[*_#`~]/g, "").trim();
            if (parsed?.recommendedTheme) cachedTheme = parsed.recommendedTheme;
            if (parsed?.fontFamily) cachedFont = parsed.fontFamily;
          }
        } catch {}

        if (cachedFont) setFontFamily(cachedFont);

        const nameParam = params.get('name') || params.get('username') || params.get('handle') || cachedName;
        const themeParam = params.get('theme') || params.get('template') || cachedTheme;
        if (themeParam) setActiveThemeId(themeParam);

        const fetchUrl = nameParam ? `/api/portfolio?name=${encodeURIComponent(nameParam)}` : '/api/portfolio';
        const res = await fetch(fetchUrl);
        if (res.ok) {
          const data = await res.json();
          if (data.user && !data.isMock) {
            const cleanUserName = (data.user.name || "Candidate").replace(/[*_#`~]/g, "").trim();
            setUserData((prev: any) => ({
              ...prev,
              name: cleanUserName,
              profile: {
                ...prev.profile,
                headline: data.user.profile?.headline || prev.profile.headline,
                bio: data.user.profile?.bio || prev.profile.bio,
                skills: data.user.profile?.skills || prev.profile.skills,
                location: data.user.profile?.location || prev.profile.location,
                availability: data.user.profile?.availability || prev.profile.availability,
                experience: data.user.profile?.experience || prev.profile.experience,
                education: data.user.profile?.education || prev.profile.education,
                certifications: data.user.profile?.certifications || prev.profile.certifications,
                socials: data.user.profile?.socials || prev.profile.socials,
              },
              projects: data.user.projects && data.user.projects.length > 0 ? data.user.projects : prev.projects,
            }));
            const loadedTheme = data.user.portfolio?.themePackageId || data.user.portfolio?.themeId || data.user.portfolio?.templateId;
            if (loadedTheme && !themeParam) {
              setActiveThemeId(loadedTheme);
            }
            if (data.user.portfolio?.designPrefs) {
              try {
                const prefs = JSON.parse(data.user.portfolio.designPrefs);
                if (prefs.accentColor) setAccentColor(prefs.accentColor);
                if (prefs.fontFamily) setFontFamily(prefs.fontFamily);
              } catch (e) {}
            }
          }
        }
      } catch (err) {
        console.warn("Could not load cloud portfolio, using local default:", err);
      }
    }
    loadPortfolio();
  }, []);

  // Switch persona preset
  const handleSelectPersona = (personaKey: string) => {
    const p = PERSONA_PROFILES[personaKey];
    if (!p) return;

    setActivePersonaId(personaKey);
    setUserData({
      name: p.content.name,
      profile: {
        headline: p.content.headline,
        bio: p.content.bio,
        skills: p.content.skills.join(", "),
        location: p.content.location || "San Francisco, CA / Remote",
        availability: p.content.availability || "Open to Opportunities",
        experience: JSON.stringify(p.content.experience || []),
        education: JSON.stringify(p.content.education || []),
        certifications: JSON.stringify(p.content.certifications || []),
        socials: JSON.stringify(p.content.contact || {}),
      },
      projects: p.content.projects || [],
    });

    setActiveThemeId(p.recommendedThemeId);
    setAiNotice(`Loaded ${p.name} (${p.title}) • Theme set to ${getThemeById(p.recommendedThemeId).name}`);
    setTimeout(() => setAiNotice(null), 3500);

    handleSave({
      name: p.content.name,
      bio: p.content.bio,
      skills: p.content.skills.join(", "),
      themeId: p.recommendedThemeId,
    });
  };

  // 1-Click Import from LinkedIn / Resume PDF
  const handleImportPdf = async (file: File) => {
    if (!file) return;
    setIsImportingPdf(true);
    setImportStatus("Extracting career telemetry with AI...");

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        try {
          const res = await fetch("/api/intake/extract", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pdfBase64: base64, mimeType: file.type }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Failed to extract");

          if (data.extracted) {
            const ext = data.extracted;
            setUserData((prev: any) => ({
              ...prev,
              name: ext.name || prev.name,
              profile: {
                ...prev.profile,
                headline: ext.headline || prev.profile.headline,
                bio: ext.bio || prev.profile.bio,
                skills: ext.skills ? ext.skills.join(", ") : prev.profile.skills,
                location: ext.location || prev.profile.location,
                availability: ext.availability || prev.profile.availability,
                experience: JSON.stringify(ext.experience || []),
                education: JSON.stringify(ext.education || []),
                certifications: JSON.stringify(ext.certifications || []),
                socials: JSON.stringify(ext.contact || {}),
              },
              projects: ext.projects && ext.projects.length > 0 ? ext.projects : prev.projects,
            }));

            // Adapt theme according to extracted profession
            const hl = (ext.headline || "").toLowerCase();
            let adaptedTheme = "sudarvel";
            if (hl.includes("design") || hl.includes("ux") || hl.includes("ui") || hl.includes("creative") || hl.includes("art")) {
              adaptedTheme = "rolan-gomes";
            } else if (hl.includes("manager") || hl.includes("product") || hl.includes("growth")) {
              adaptedTheme = "tanuja-design";
            }
            setActiveThemeId(adaptedTheme);

            try {
              localStorage.setItem("folioveda_active_profile", JSON.stringify(ext));
            } catch (e) {}

            // Save immediately to backend SQLite so /p/[username] is in sync
            await handleSave({
              name: ext.name,
              headline: ext.headline,
              bio: ext.bio,
              skills: ext.skills,
              location: ext.location,
              experience: ext.experience,
              education: ext.education,
              certifications: ext.certifications,
              projects: ext.projects,
              socials: ext.contact,
              themeId: adaptedTheme,
            });

            setImportStatus(`✓ Extracted ${file.name} successfully!`);
            setAiNotice(`Imported ${ext.name || "profile"} (${ext.experience?.length || 0} roles, ${ext.projects?.length || 0} projects)!`);
            setTimeout(() => setImportStatus(null), 4000);
          }
        } catch (fetchErr: any) {
          setImportStatus(`Error: ${fetchErr.message}`);
        } finally {
          setIsImportingPdf(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setImportStatus("Failed to read file.");
      setIsImportingPdf(false);
    }
  };

  const handleGithubImportSuccess = (imported: any) => {
    setUserData((prev: any) => ({
      ...prev,
      name: prev.name || imported.profile?.name || prev.name,
      profile: {
        ...prev.profile,
        bio: prev.profile?.bio || imported.profile?.bio || prev.profile.bio,
        skills: imported.skills?.length > 0 ? imported.skills.join(", ") : prev.profile.skills,
        github: imported.profile?.github || prev.profile.github,
      },
      projects: imported.projects?.length > 0 ? [...imported.projects, ...prev.projects] : prev.projects,
    }));
    setAiNotice(`Imported ${imported.projects?.length || 0} repositories from GitHub!`);
    setTimeout(() => setAiNotice(null), 3500);
    setIsGithubImportOpen(false);
  };

  // 1-Click Synthesize from Pasted Resume / Career Text with Gemini AI
  const handleExtractPastedTextInStudio = async () => {
    if (!pastedResumeText.trim() || pastedResumeText.trim().length < 15) {
      setPasteExtractError("Please paste at least a few lines of your career history or resume.");
      return;
    }
    setIsExtractingPaste(true);
    setPasteExtractError(null);

    try {
      const res = await fetch("/api/intake/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText: pastedResumeText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to extract with Gemini AI");

      if (data.extracted) {
        const ext = data.extracted;
        const cleanName = (ext.name || "Candidate").replace(/[*_#`~]/g, "").trim();

        setUserData((prev: any) => ({
          ...prev,
          name: cleanName,
          profile: {
            ...prev.profile,
            headline: ext.headline || prev.profile.headline,
            bio: ext.bio || prev.profile.bio,
            skills: ext.skills ? (Array.isArray(ext.skills) ? ext.skills.join(", ") : ext.skills) : prev.profile.skills,
            location: ext.location || prev.profile.location,
            availability: ext.availability || prev.profile.availability,
            experience: JSON.stringify(ext.experience || []),
            education: JSON.stringify(ext.education || []),
            certifications: JSON.stringify(ext.certifications || []),
            socials: JSON.stringify(ext.contact || {}),
          },
          projects: ext.projects && ext.projects.length > 0 ? ext.projects : prev.projects,
        }));

        const chosenTheme = ext.recommendedTheme || "sudarvel";
        setActiveThemeId(chosenTheme);
        if (ext.fontFamily) setFontFamily(ext.fontFamily);
        if (ext.accentColor) setAccentColor(ext.accentColor);

        try {
          localStorage.setItem("folioveda_active_profile", JSON.stringify(ext));
        } catch (e) {}

        await handleSave({
          name: cleanName,
          headline: ext.headline,
          bio: ext.bio,
          skills: ext.skills,
          location: ext.location,
          experience: ext.experience,
          education: ext.education,
          certifications: ext.certifications,
          projects: ext.projects,
          socials: ext.contact,
          themeId: chosenTheme,
          fontFamily: ext.fontFamily || "sans",
          accentColor: ext.accentColor || "emerald",
        });

        setIsPasteModalOpen(false);
        setPastedResumeText("");
        setAiNotice(`✓ Synthesized ${cleanName}'s authentic portfolio with Gemini AI!`);
        setTimeout(() => setAiNotice(null), 4000);
      }
    } catch (err: any) {
      setPasteExtractError(err.message || "Failed to extract career profile.");
    } finally {
      setIsExtractingPaste(false);
    }
  };

  // Save changes to backend
  const handleSave = async (overrides?: any) => {
    setSaveStatus("saving");
    const payload = {
      name: overrides?.name || userData.name,
      headline: overrides?.headline || userData.profile.headline,
      bio: overrides?.bio || userData.profile.bio,
      skills: overrides?.skills || userData.profile.skills,
      location: overrides?.location || userData.profile.location,
      experience: overrides?.experience !== undefined ? overrides.experience : userData.profile.experience,
      education: overrides?.education !== undefined ? overrides.education : userData.profile.education,
      certifications: overrides?.certifications !== undefined ? overrides.certifications : userData.profile.certifications,
      projects: overrides?.projects !== undefined ? overrides.projects : userData.projects,
      socials: overrides?.socials !== undefined ? overrides.socials : userData.profile.socials,
      templateId: overrides?.themeId || activeThemeId,
      themeId: overrides?.themeId || activeThemeId,
      theme: overrides?.theme || theme,
      accentColor: overrides?.accentColor || accentColor,
      fontFamily: overrides?.fontFamily || fontFamily,
    };

    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSaveStatus("saved");
      } else {
        setSaveStatus("unsaved");
      }
    } catch (e) {
      console.error(e);
      setSaveStatus("unsaved");
    }
  };

  // Handle AI updates from the floating ChatEditor
  const handleAiUpdate = (updates: any) => {
    setUserData((prev: any) => ({
      ...prev,
      name: updates.name || prev.name,
      profile: {
        ...prev.profile,
        bio: updates.bio || prev.profile.bio,
        skills: updates.skills || prev.profile.skills,
      },
    }));

    if (updates.templateId || updates.themeId) {
      setActiveThemeId(updates.themeId || updates.templateId);
    }

    if (updates.accentColor) {
      setAccentColor(updates.accentColor);
    }

    if (updates.theme && (updates.theme === 'light' || updates.theme === 'dark')) {
      setTheme(updates.theme);
    }

    setAiNotice("AI applied your adjustments!");
    setTimeout(() => setAiNotice(null), 3500);

    handleSave(updates);
  };

  const selectedThemePackage = getThemeById(activeThemeId);
  const normalizedContent = mapUserToPortfolioContent(userData);
  const publicUrl = `/p/${encodeURIComponent(userData.name || "alex")}`;

  const handleCopyShareLink = () => {
    const fullUrl = `${window.location.origin}${publicUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased selection:bg-emerald-500/20">
      
      {/* ─── PRIMARY STUDIO HEADER ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur-md px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Hub Navigation & Logo */}
          <div className="flex items-center gap-3">
            <Link 
              href="/hub"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
              title="Return to Master Central Hub"
            >
              <ArrowLeft size={14} /> Hub
            </Link>
            <div className="h-4 w-[1px] bg-border hidden sm:block" />
            <FolioVedaLogo size="xs" showBadge={false} />
          </div>

          {/* Center: Flagship 4 Archetypes + Full Dropdown */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-muted/80 p-1 rounded-xl border border-border text-xs font-medium overflow-x-auto max-w-[540px]">
              <button
                onClick={() => { setActiveThemeId("sudarvel"); handleSave({ themeId: "sudarvel" }); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                  activeThemeId === "sudarvel" || activeThemeId === "wall-showcase"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-sm font-bold" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Sudarvel K: Obsidian Canvas & Outcome Telemetry"
              >
                <Sparkles size={13} className="text-slate-950" /> Sudarvel Dark
              </button>
              <button
                onClick={() => { setActiveThemeId("rolan-gomes"); handleSave({ themeId: "rolan-gomes" }); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                  activeThemeId === "rolan-gomes" || activeThemeId === "craft-desk"
                    ? "bg-[#095848] text-[#FAF7F0] shadow-sm font-bold" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Rolan Gomes: Architect Cutting Mat & Paper Document"
              >
                <FileText size={13} /> Rolan Desk Mat
              </button>
              <button
                onClick={() => { setActiveThemeId("himanshu-singh"); handleSave({ themeId: "himanshu-singh" }); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                  activeThemeId === "himanshu-singh"
                    ? "bg-[#06392b] text-[#c6d457] border border-[#c6d457]/40 shadow-sm font-bold" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Himanshu Singh: Deep Forest Visual Storytelling"
              >
                Himanshu Studio
              </button>
              <button
                onClick={() => { setActiveThemeId("tanuja-design"); handleSave({ themeId: "tanuja-design" }); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                  activeThemeId === "tanuja-design"
                    ? "bg-blue-600 text-white shadow-sm font-bold" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Tanuja: Enterprise Product Design & AI Workflows"
              >
                Tanuja Microsoft
              </button>
              <button
                onClick={() => { setActiveThemeId("neo-brutalist"); handleSave({ themeId: "neo-brutalist" }); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                  activeThemeId === "neo-brutalist"
                    ? "bg-yellow-400 text-black border-2 border-black font-black shadow-[2px_2px_0_rgba(0,0,0,1)]" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Neo-Brutalist Pop: 90s Retro Bold Borders & High Contrast"
              >
                ⚡ Neo-Brutalist
              </button>
              <button
                onClick={() => { setActiveThemeId("glass"); handleSave({ themeId: "glass" }); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                  activeThemeId === "glass"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-sm font-bold" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Glassmorphism Cyber: Frosted Glass & Translucent Glow"
              >
                💎 Glassmorphism
              </button>
              <button
                onClick={() => { setActiveThemeId("claymorphic"); handleSave({ themeId: "claymorphic" }); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                  activeThemeId === "claymorphic"
                    ? "bg-indigo-600 text-white shadow-md font-extrabold" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Claymorphic 3D: Tactile Pastel Pill Cards & Embossed Shadows"
              >
                🫧 Claymorphic 3D
              </button>
              <button
                onClick={() => { setActiveThemeId("bento-grid"); handleSave({ themeId: "bento-grid" }); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                  activeThemeId === "bento-grid"
                    ? "bg-sky-600 text-white shadow-md font-extrabold" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="BentoGrid Studio: Aceternity 3D Cards, Live Terminal Console, & Modular Grid"
              >
                🍱 BentoGrid Studio
              </button>
            </div>

            {/* Dropdown for All 10 Distinct Styles */}
            <div className="flex items-center">
              <select
                value={activeThemeId}
                onChange={(e) => {
                  const newTheme = e.target.value;
                  setActiveThemeId(newTheme);
                  handleSave({ themeId: newTheme });
                }}
                className="text-xs bg-muted/80 text-foreground border border-border rounded-xl px-2.5 py-1.5 font-medium focus:outline-hidden focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                aria-label="Select Archetype"
              >
                {getAllSystemThemes().map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.category})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right: Actions, Responsive, Save, Publish */}
          <div className="flex items-center gap-2">
            
            {/* Quick Upload PDF Button */}
            <label
              htmlFor="studioQuickPdfInput"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#173f32] hover:bg-[#13352a] text-white text-xs font-bold transition-all shadow-sm cursor-pointer border border-emerald-500/30"
              title="Upload your LinkedIn PDF or Resume to auto-fill everything instantly"
            >
              <input
                id="studioQuickPdfInput"
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImportPdf(file);
                }}
              />
              <FileUp size={13} />
              <span>{isImportingPdf ? "Parsing PDF..." : "Upload LinkedIn/Resume PDF"}</span>
            </label>

            {/* Quick Paste Resume Text Button */}
            <button
              onClick={() => setIsPasteModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              title="Paste your resume or LinkedIn profile text to auto-generate with Gemini AI"
            >
              <Sparkles size={13} />
              <span className="hidden sm:inline">Paste Career Text</span>
              <span className="sm:hidden">Paste</span>
            </button>

            {/* Edit Content Button */}
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold transition-colors border border-border"
              title="Edit Profile & Project Information"
            >
              <Edit3 size={13} />
              <span className="hidden sm:inline">Edit Content</span>
            </button>

            {/* Font Family Selector */}
            <div className="flex items-center">
              <select
                value={fontFamily}
                onChange={(e) => {
                  const newFont = e.target.value;
                  setFontFamily(newFont);
                  handleSave({ fontFamily: newFont });
                }}
                className="text-xs bg-muted/80 text-foreground border border-border rounded-xl px-2 py-1.5 font-medium focus:outline-hidden focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                title="Select Typography Style"
                aria-label="Select Typography"
              >
                <option value="sans">🔤 Sans (Clean Modern)</option>
                <option value="serif">📰 Serif (Editorial & Executive)</option>
                <option value="mono">💻 Monospace (Terminal Code)</option>
                <option value="editorial">✨ Editorial (Bespoke Literary)</option>
                <option value="display">🎨 Display (Bold Modern Grotesk)</option>
              </select>
            </div>

            {/* Color Swatches */}
            <div className="hidden lg:flex items-center gap-1 px-2 py-1 bg-muted/60 rounded-lg border border-border/50">
              {ACCENT_COLORS.map(c => (
                <button
                  key={c.id}
                  onClick={() => { setAccentColor(c.id); handleSave({ accentColor: c.id }); }}
                  className={`w-3.5 h-3.5 rounded-full ${c.bg} transition-transform ${
                    accentColor === c.id ? `scale-125 ring-2 ring-offset-1 ring-foreground` : "hover:scale-110 opacity-70 hover:opacity-100"
                  }`}
                  title={`${c.label} accent`}
                  aria-label={`${c.label} accent`}
                />
              ))}
            </div>

            {/* Dark / Light Toggle */}
            {mounted && (
              <button
                onClick={() => {
                  const next = theme === "dark" ? "light" : "dark";
                  setTheme(next);
                  handleSave({ theme: next });
                }}
                className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            )}

            {/* Save Status & Action */}
            <button
              onClick={() => handleSave()}
              disabled={saveStatus === "saving"}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
              {saveStatus === "saving" ? (
                <>
                  <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : saveStatus === "saved" ? (
                <>
                  <Check size={13} className="text-emerald-300" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Cloud size={13} />
                  <span>Save</span>
                </>
              )}
            </button>

            {/* Auto-Import GitHub Button */}
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition-all shadow-xs"
              title="Auto-Import from GitHub or upload LinkedIn PDF"
            >
              <DownloadCloud size={13} className="text-cyan-400" />
              <span className="hidden sm:inline">Import GitHub</span>
            </button>

            {/* 1-Click Deploy to GitHub Pages */}
            <button
              onClick={() => setIsDeployModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-cyan-600/20"
              title="1-Click Deploy to GitHub Pages (username.github.io)"
            >
              <Rocket size={13} />
              <span>Deploy Pages</span>
            </button>

            {/* Publish Live Button */}
            <button
              onClick={() => {
                handleSave();
                setIsShareModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-xs font-extrabold shadow-sm transition-all"
            >
              <Share2 size={13} />
              <span>Publish Live</span>
            </button>
          </div>

        </div>
      </header>

      {/* ─── SECONDARY CONTROLS BAR: PERSONA SWITCHER & RESPONSIVE VIEWPORT ──── */}
      <div className="w-full border-b border-border/60 bg-muted/30 px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Persona Switcher */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Test Persona:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { key: "ui-ux-designer", label: "🎨 UI/UX Designer", name: "Maya Chen" },
                { key: "fullstack-developer", label: "⚡ Full-Stack Dev", name: "Gaurav Shekhawat" },
                { key: "aiml-engineer", label: "🧠 AI/ML Engineer", name: "Dr. Aris Thorne" },
                { key: "graphic-designer", label: "📐 Graphic Designer", name: "Leo Vasquez" },
                { key: "student-fresher", label: "🎓 Student / Fresher", name: "Kevin Zhang" },
              ].map((p) => {
                const isSelected = activePersonaId === p.key;
                return (
                  <button
                    key={p.key}
                    onClick={() => handleSelectPersona(p.key)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                      isSelected
                        ? "bg-emerald-600 text-white shadow-xs font-bold"
                        : "bg-background/80 hover:bg-background text-foreground/80 border border-border/80"
                    }`}
                  >
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Responsive Viewport Switcher */}
          <div className="flex items-center gap-1 bg-background/80 border border-border/80 p-0.5 rounded-lg">
            <button
              onClick={() => setViewportMode("desktop")}
              className={`p-1.5 rounded-md transition-all ${
                viewportMode === "desktop" ? "bg-muted text-foreground font-bold shadow-2xs" : "text-muted-foreground hover:text-foreground"
              }`}
              title="Desktop (100% full width)"
            >
              <Monitor size={14} />
            </button>
            <button
              onClick={() => setViewportMode("laptop")}
              className={`p-1.5 rounded-md transition-all ${
                viewportMode === "laptop" ? "bg-muted text-foreground font-bold shadow-2xs" : "text-muted-foreground hover:text-foreground"
              }`}
              title="Laptop (1024px container)"
            >
              <Laptop size={14} />
            </button>
            <button
              onClick={() => setViewportMode("tablet")}
              className={`p-1.5 rounded-md transition-all ${
                viewportMode === "tablet" ? "bg-muted text-foreground font-bold shadow-2xs" : "text-muted-foreground hover:text-foreground"
              }`}
              title="Tablet (768px container)"
            >
              <Tablet size={14} />
            </button>
            <button
              onClick={() => setViewportMode("mobile")}
              className={`p-1.5 rounded-md transition-all ${
                viewportMode === "mobile" ? "bg-muted text-foreground font-bold shadow-2xs" : "text-muted-foreground hover:text-foreground"
              }`}
              title="Mobile Device (390px phone container)"
            >
              <Smartphone size={14} />
            </button>
          </div>

        </div>
      </div>

      {/* Floating AI Toast */}
      {aiNotice && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white border border-emerald-500/50 px-4 py-2 rounded-full text-xs font-medium shadow-2xl flex items-center gap-2 animate-bounce">
          <Sparkles size={14} className="text-emerald-400" />
          <span>{aiNotice}</span>
        </div>
      )}

      {/* ─── GAMIFIED PORTFOLIO READINESS SCORECARD & EXPORT DOCK ──────────────── */}
      <div className="max-w-7xl mx-auto w-full px-4 pt-3">
        <ReadinessScorecard
          content={normalizedContent}
          onOpenDeploy={() => setIsDeployModalOpen(true)}
          onDownloadHtml={() => exportStandaloneHtml(selectedThemePackage, normalizedContent)}
          onDownloadZip={() => exportPortfolioZip(selectedThemePackage, normalizedContent)}
          onCopyReadme={() => {
            const md = generateProfileReadme(normalizedContent);
            navigator.clipboard.writeText(md);
            setAiNotice("Copied GitHub Profile README to clipboard!");
            setTimeout(() => setAiNotice(null), 3000);
          }}
        />
      </div>

      {/* ─── MAIN DYNAMIC PREVIEW CANVAS WITH VIEWPORT FRAMING ─────────────────── */}
      <main className="flex-1 bg-muted/20 py-4 px-2 sm:px-4">
        <div 
          className={`mx-auto transition-all duration-300 ${
            viewportMode === "desktop"
              ? "w-full"
              : viewportMode === "laptop"
              ? "max-w-[1024px] rounded-2xl border-4 border-slate-700/40 shadow-2xl overflow-hidden bg-background"
              : viewportMode === "tablet"
              ? "max-w-[768px] rounded-3xl border-8 border-slate-800 shadow-2xl overflow-hidden bg-background"
              : "max-w-[390px] rounded-[44px] border-[10px] border-slate-900 shadow-2xl overflow-hidden bg-background"
          }`}
        >
          {viewportMode !== "desktop" && (
            <div className="bg-slate-900 text-slate-400 text-[10px] font-mono px-4 py-1.5 flex items-center justify-between border-b border-slate-800">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                {viewportMode.toUpperCase()} VIEWPORT
              </span>
              <span>
                {viewportMode === "laptop" ? "1024px" : viewportMode === "tablet" ? "768px" : "390px × 844px"}
              </span>
            </div>
          )}

          <ThemeRenderer
            theme={selectedThemePackage}
            content={normalizedContent}
            isDemo={false}
            hideBadge={true}
            fontFamilyOverride={fontFamily}
            accentColorOverride={accentColor}
          />
        </div>
      </main>

      {/* Paste Resume / Career Text Modal */}
      {isPasteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-background border border-border p-6 rounded-3xl max-w-xl w-full space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Sparkles size={18} />
                </span>
                <div>
                  <h3 className="text-sm font-extrabold text-foreground">Paste Resume or Career Text</h3>
                  <p className="text-[11px] text-muted-foreground font-normal">
                    Gemini AI will extract your real identity, craft your headline &amp; bio, and assign the best theme &amp; typography.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPasteModalOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1 text-sm rounded-lg hover:bg-muted"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <textarea
                rows={8}
                value={pastedResumeText}
                onChange={(e) => setPastedResumeText(e.target.value)}
                placeholder="Paste your resume, LinkedIn summary, career notes, or roles here... (e.g. Mohit Saini - Frontend & Flutter Developer...)"
                className="w-full p-3.5 rounded-xl bg-muted/40 border border-border text-foreground text-xs leading-relaxed focus:border-emerald-500 focus:bg-background focus:outline-none"
              />
              {pasteExtractError && (
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 text-xs font-medium">
                  {pasteExtractError}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] text-muted-foreground font-mono">
                ⚡ Powered by Google Gemini AI
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPasteModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-muted text-muted-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleExtractPastedTextInStudio}
                  disabled={isExtractingPaste || !pastedResumeText.trim()}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md disabled:opacity-50"
                >
                  <Sparkles size={13} />
                  <span>{isExtractingPaste ? "Synthesizing with Gemini AI..." : "⚡ Synthesize Portfolio"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Platform Branding Badge */}
      <div className="fixed bottom-4 left-4 z-30">
        <span className="px-3 py-1.5 bg-background/90 backdrop-blur-md border border-border text-foreground text-[11px] font-medium rounded-md shadow-md flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          FolioVeda Engine • <strong>{selectedThemePackage.name}</strong>
        </span>
      </div>

      {/* Floating AI Assistant with Full Reactive State Binding */}
      <AiAgentWidget 
        onUpdate={handleAiUpdate}
        portfolioContext={normalizedContent}
      />

      {/* ─── LIVE CONTENT EDIT MODAL ──────────────────────────────────────────── */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-foreground">Edit Portfolio Information</h3>
                <p className="text-xs text-muted-foreground">Changes update your live portfolio preview immediately.</p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs font-semibold">
              {/* 1-Click LinkedIn / Resume PDF Import Banner */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground flex items-center gap-2">
                    <FileUp size={15} className="text-emerald-500" />
                    1-Click Auto-Fill from LinkedIn PDF
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
                    AI Deep Parser
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground font-normal">
                  Drop your LinkedIn PDF export (Profile → More → Save to PDF) or Resume to auto-populate all fields and outcomes instantly.
                </p>
                <div
                  onClick={() => document.getElementById("studioPdfInput")?.click()}
                  className="p-3 rounded-xl border border-dashed border-emerald-500/40 hover:border-emerald-500 bg-background/50 hover:bg-emerald-500/5 cursor-pointer text-center transition flex items-center justify-center gap-2"
                >
                  <input
                    id="studioPdfInput"
                    type="file"
                    accept=".pdf,application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImportPdf(file);
                    }}
                  />
                  <Upload size={14} className="text-emerald-500" />
                  <span className="text-xs font-semibold text-foreground">
                    {isImportingPdf ? "Parsing with AI Trajectory Engine..." : "Drop or click to upload PDF (.pdf)"}
                  </span>
                </div>
                {importStatus && (
                  <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 size={13} />
                    <span>{importStatus}</span>
                  </div>
                )}
              </div>

              {/* 1-Click GitHub Repository Auto-Import */}
              <GithubImporter onImportSuccess={handleGithubImportSuccess} />

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-muted-foreground uppercase tracking-wider text-[11px]">Display Name</label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground font-bold focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Headline */}
              <div className="space-y-1.5">
                <label className="text-muted-foreground uppercase tracking-wider text-[11px]">Professional Headline</label>
                <input
                  type="text"
                  value={userData.profile.headline}
                  onChange={(e) => setUserData({
                    ...userData,
                    profile: { ...userData.profile, headline: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground font-medium focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Bio */}
              <div className="space-y-1.5">
                <label className="text-muted-foreground uppercase tracking-wider text-[11px]">Personal Bio & Summary</label>
                <textarea
                  rows={4}
                  value={userData.profile.bio}
                  onChange={(e) => setUserData({
                    ...userData,
                    profile: { ...userData.profile, bio: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground font-normal leading-relaxed focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Skills */}
              <div className="space-y-1.5">
                <label className="text-muted-foreground uppercase tracking-wider text-[11px]">Technical & Design Skills (comma-separated)</label>
                <input
                  type="text"
                  value={userData.profile.skills}
                  onChange={(e) => setUserData({
                    ...userData,
                    profile: { ...userData.profile, skills: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground font-mono focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Location & Availability */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-muted-foreground uppercase tracking-wider text-[11px]">Location</label>
                  <input
                    type="text"
                    value={userData.profile.location || ""}
                    onChange={(e) => setUserData({
                      ...userData,
                      profile: { ...userData.profile, location: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-muted-foreground uppercase tracking-wider text-[11px]">Availability Status</label>
                  <input
                    type="text"
                    value={userData.profile.availability || ""}
                    onChange={(e) => setUserData({
                      ...userData,
                      profile: { ...userData.profile, availability: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-bold text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleSave();
                  setIsEditModalOpen(false);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
              >
                Apply &amp; Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── LIVE PUBLISH / SHARE MODAL ───────────────────────────────────────── */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border-2 border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto">
              <Sparkles size={28} />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-foreground">Your Verified Portfolio is Live!</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Published with style engine: <strong className="text-foreground">{selectedThemePackage.name}</strong>
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-muted border border-border flex items-center justify-between text-xs font-mono">
              <span className="truncate text-foreground font-bold mr-2">
                {typeof window !== "undefined" ? window.location.origin : ""}{publicUrl}
              </span>
              <button
                onClick={handleCopyShareLink}
                className="px-3 py-1.5 rounded-xl bg-primary text-primary-foreground font-bold shrink-0 flex items-center gap-1 transition-all"
              >
                {copiedLink ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedLink ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <Link
                href={publicUrl}
                target="_blank"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
              >
                <span>Visit Live Portfolio</span>
                <ExternalLink size={13} />
              </Link>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── 1-CLICK GITHUB PAGES DEPLOY MODAL ─────────────────────────────────── */}
      <DeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        theme={selectedThemePackage}
        content={normalizedContent}
      />

    </div>
  );
}
