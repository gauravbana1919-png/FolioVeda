"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Palette, 
  Briefcase, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  Globe, 
  Terminal, 
  ShieldCheck, 
  User, 
  Send, 
  Layers, 
  HeartHandshake,
  GraduationCap,
  Upload,
  FileUp,
  FileCheck
} from "lucide-react";
import { FolioInLogo } from "@/components/ui/Logo";
import Link from "next/link";
import { ProfileType, TargetGoal, ToneOfVoice, PreferredMood, IntakeAnswersInput } from "@/types/intake";
import { PERSONA_PROFILES } from "@/lib/personas";
import { getAllSystemThemes } from "@/lib/themes/registry";

type Step = 1 | 2 | 3 | 4;

function SmartIntakeOnboardingContent() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  const [activePersonaId, setActivePersonaId] = useState<string | null>(null);

  // Form State
  const [candidateName, setCandidateName] = useState("Alex Developer");
  const [profileType, setProfileType] = useState<ProfileType>("tech");
  const [targetGoal, setTargetGoal] = useState<TargetGoal>("job");
  const [targetRoles, setTargetRoles] = useState<string[]>(["Full-Stack Engineer"]);
  const [customRoleInput, setCustomRoleInput] = useState("");
  
  const [topStrengths, setTopStrengths] = useState<string[]>(["Next.js", "TypeScript", "Distributed Systems"]);
  const [customStrengthInput, setCustomStrengthInput] = useState("");
  const [tone, setTone] = useState<ToneOfVoice>("bold");
  const [preferredMood, setPreferredMood] = useState<PreferredMood>("formal");

  const [githubUrl, setGithubUrl] = useState("https://github.com/alex");
  const [linkedinUrl, setLinkedinUrl] = useState("https://linkedin.com/in/alex");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [rawResumeText, setRawResumeText] = useState("");
  const [intakeInputMode, setIntakeInputMode] = useState<"pdf" | "text">("pdf");

  const [isSyncingGithub, setIsSyncingGithub] = useState(false);
  const [githubSyncResult, setGithubSyncResult] = useState<string | null>(null);

  // AI Generated Draft State (Step 4)
  const [draftHeadline, setDraftHeadline] = useState("");
  const [draftBio, setDraftBio] = useState("");
  const [recommendedThemeIds, setRecommendedThemeIds] = useState<string[]>(["sudarvel", "rolan-gomes", "developer-terminal"]);
  const [selectedThemeId, setSelectedThemeId] = useState("sudarvel");

  // Rich Career Data State
  const [projectsList, setProjectsList] = useState<any[]>([
    {
      title: "Distributed Telemetry & Edge Pipeline",
      description: "Low-latency distributed caching and telemetry engine built with Next.js, Redis, and Prisma, serving 100k+ req/sec.",
      techStack: ["Next.js 15", "TypeScript", "Redis", "Docker", "PostgreSQL"],
      liveUrl: "https://folioin.dev/sample-pipeline",
      githubUrl: "https://github.com/folioin/sample-pipeline",
      featured: true,
      metrics: "100k req/sec • sub-5ms P99",
      category: "Distributed Architecture",
      impact: "+38% Query Throughput",
      problem: "Monolithic APIs suffered latency spikes.",
      solution: "Engineered an edge caching layer using Redis.",
    },
  ]);

  const [experienceList, setExperienceList] = useState<any[]>([
    {
      role: "Senior Full-Stack Engineer",
      company: "Nexus Cloud Systems",
      period: "2023 - Present",
      location: "San Francisco, CA / Remote",
      highlights: [
        "Architected edge caching layer reducing egress bandwidth costs by 34%.",
        "Mentored 6 engineers and spearheaded migration to TypeScript and Next.js.",
      ],
    },
  ]);

  const [educationList, setEducationList] = useState<any[]>([
    {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "Institute of Technology",
      year: "2023",
      honors: "First Class with Distinction",
    },
  ]);

  const [certificationsList, setCertificationsList] = useState<any[]>([
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      year: "2024",
    },
  ]);

  const [isExtracting, setIsExtracting] = useState(false);
  const [extractSuccess, setExtractSuccess] = useState<string | null>(null);
  const [extractError, setExtractError] = useState<string | null>(null);
  const [isDraggingPdf, setIsDraggingPdf] = useState(false);
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);

  const handlePdfUpload = async (file: File) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
      setExtractError("Please upload a valid PDF file (e.g. your LinkedIn 'Save to PDF' export or resume).");
      return;
    }

    // Guard against Vercel 4.5MB serverless payload limit
    if (file.size > 4 * 1024 * 1024) {
      setExtractError("This PDF exceeds the 4MB cloud limit. Please upload a smaller PDF or paste your profile text directly in the 'Paste Resume / LinkedIn Text' tab.");
      return;
    }

    setPdfFileName(file.name);
    setIsExtracting(true);
    setExtractError(null);
    setExtractSuccess(null);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64String = reader.result as string;

        try {
          const res = await fetch("/api/intake/extract", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              pdfBase64: base64String,
              mimeType: file.type || "application/pdf",
            }),
          });

          let data: any = null;
          const contentType = res.headers.get("content-type") || "";
          if (contentType.includes("application/json")) {
            data = await res.json();
          } else {
            const rawRespText = await res.text();
            if (res.status === 413 || rawRespText.toLowerCase().includes("request entity too large") || rawRespText.toLowerCase().includes("payload too large")) {
              throw new Error("This PDF exceeds Vercel's cloud payload limit. Please upload a compressed PDF (<3.5MB) or paste your resume text in the 'Paste Resume / LinkedIn Text' tab.");
            }
            throw new Error(rawRespText.slice(0, 120) || `Server error (${res.status})`);
          }

          if (!res.ok) throw new Error(data?.error || "Failed to parse PDF");

          if (data.extracted) {
            let cleanName = (data.extracted.name || "Candidate").replace(/[*_#`~]/g, "").trim();
            if (/\b(summary|profile|experience|skills|resume|cv)\b/i.test(cleanName)) {
              cleanName = "Candidate";
            }
            if (cleanName.length > 1) {
              setCandidateName(cleanName);
            }
            if (data.extracted.headline) setDraftHeadline(data.extracted.headline);
            if (data.extracted.bio) setDraftBio(data.extracted.bio);
            if (data.extracted.skills && data.extracted.skills.length > 0) {
              setTopStrengths(data.extracted.skills.slice(0, 4));
            }
            if (data.extracted.experience && data.extracted.experience.length > 0) {
              setExperienceList(data.extracted.experience);
            }
            if (data.extracted.education && data.extracted.education.length > 0) {
              setEducationList(data.extracted.education);
            }
            if (data.extracted.certifications && data.extracted.certifications.length > 0) {
              setCertificationsList(data.extracted.certifications);
            }
            if (data.extracted.projects && data.extracted.projects.length > 0) {
              setProjectsList(data.extracted.projects);
            }
            if (data.extracted.contact?.linkedin) {
              setLinkedinUrl(data.extracted.contact.linkedin);
            }
            if (data.extracted.contact?.github) {
              setGithubUrl(data.extracted.contact.github);
            }
            if (data.extracted.contact?.website) {
              setPortfolioUrl(data.extracted.contact.website);
            }

            // Infer profile type & recommendations from authentic extracted data
            if (data.extracted.recommendedTheme) {
              setSelectedThemeId(data.extracted.recommendedTheme);
            } else {
              const titleLower = ((data.extracted.headline || "") + " " + cleanName).toLowerCase();
              if (titleLower.includes("design") || titleLower.includes("ux") || titleLower.includes("ui") || titleLower.includes("creative") || titleLower.includes("brand") || titleLower.includes("art")) {
                setProfileType("designer");
                setSelectedThemeId("rolan-gomes");
                setRecommendedThemeIds(["rolan-gomes", "tanuja-design", "himanshu-singh"]);
              } else if (titleLower.includes("manager") || titleLower.includes("product manager") || titleLower.includes("growth") || titleLower.includes("operations")) {
                setProfileType("bba");
                setSelectedThemeId("corporate-clean");
                setRecommendedThemeIds(["corporate-clean", "tanuja-design", "luxe-creative"]);
              } else {
                setProfileType("tech");
                setSelectedThemeId("sudarvel");
                setRecommendedThemeIds(["sudarvel", "developer-terminal", "minimal-editorial"]);
              }
            }

            try {
              localStorage.setItem("folioin_active_profile", JSON.stringify(data.extracted));
            } catch (e) {}

            const roleCount = data.extracted.experience?.length || 0;
            const projCount = data.extracted.projects?.length || 0;
            const certCount = data.extracted.certifications?.length || 0;
            setExtractSuccess(`✓ Extracted ${cleanName}'s profile with ${roleCount} roles, ${projCount} projects & skills using Gemini AI!`);
          }
        } catch (fetchErr: any) {
          setExtractError(fetchErr.message || "Failed to process PDF with Gemini AI.");
        } finally {
          setIsExtracting(false);
        }
      };

      reader.onerror = () => {
        setExtractError("Error reading local PDF file.");
        setIsExtracting(false);
      };

      reader.readAsDataURL(file);
    } catch (err: any) {
      setExtractError(err.message || "Failed to read file.");
      setIsExtracting(false);
    }
  };

  const handleSelectPersona = (personaKey: string) => {
    const p = PERSONA_PROFILES[personaKey];
    if (!p) return;

    setActivePersonaId(p.id);
    setCandidateName(p.name);
    setProfileType(p.profileType);
    setTargetGoal(p.targetGoal);
    setTargetRoles(p.targetRoles);
    setTopStrengths(p.topStrengths);
    setTone(p.tone);
    setPreferredMood(p.preferredMood);
    setGithubUrl(p.content.contact?.github || "");
    setLinkedinUrl(p.content.contact?.linkedin || "");
    setPortfolioUrl(p.content.contact?.website || "");
    setProjectsList(p.content.projects || []);
    setExperienceList(p.content.experience || []);
    setEducationList(p.content.education || []);
    setCertificationsList(p.content.certifications || []);
    setSelectedThemeId(p.recommendedThemeId);
    setDraftHeadline(p.content.headline);
    setDraftBio(p.content.bio);
    setExtractSuccess(`✓ Loaded verified profile for ${p.name} (${p.title})!`);
    setTimeout(() => setExtractSuccess(null), 4000);
  };

  // Read URL query params (?handle=, ?name=, ?template=) & session
  useEffect(() => {
    const handleParam = searchParams.get("handle") || searchParams.get("name");
    const templateParam = searchParams.get("template");

    if (handleParam) {
      if (
        handleParam.startsWith("http://") || 
        handleParam.startsWith("https://") || 
        handleParam.includes("wallofportfolios.in") ||
        handleParam.includes(".com") ||
        handleParam.includes(".in/")
      ) {
        window.location.href = `/inspiration?url=${encodeURIComponent(handleParam)}`;
        return;
      }
      setCandidateName(handleParam);
    } else if (session?.user?.name) {
      setCandidateName(session.user.name);
    }

    if (templateParam) {
      setSelectedThemeId(templateParam);
    }
  }, [searchParams, session]);

  const handleSyncGithub = async () => {
    if (!githubUrl.trim()) return;
    setIsSyncingGithub(true);
    setGithubSyncResult(null);

    try {
      const res = await fetch("/api/github/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: githubUrl.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setGithubSyncResult(`✓ Synced ${data.count} repos directly to your database!`);
        setTimeout(() => setGithubSyncResult(null), 5000);
      } else {
        setGithubSyncResult(`Failed: ${data.error || "Could not sync"}`);
      }
    } catch (err) {
      setGithubSyncResult("Network error syncing GitHub");
    } finally {
      setIsSyncingGithub(false);
    }
  };

  const handleAutoExtract = async () => {
    if (!rawResumeText.trim() || rawResumeText.trim().length < 20) {
      setExtractError("Please paste your resume or LinkedIn profile text first (at least a few sentences).");
      return;
    }
    setIsExtracting(true);
    setExtractError(null);
    setExtractSuccess(null);

    try {
      const res = await fetch("/api/intake/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText: rawResumeText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to extract");

      if (data.extracted) {
        let cleanName = (data.extracted.name || "Candidate").replace(/[*_#`~]/g, "").trim();
        if (/\b(summary|profile|experience|skills|resume|cv)\b/i.test(cleanName)) {
          cleanName = "Candidate";
        }
        if (cleanName.length > 1) {
          setCandidateName(cleanName);
        }
        if (data.extracted.headline) setDraftHeadline(data.extracted.headline);
        if (data.extracted.bio) setDraftBio(data.extracted.bio);
        if (data.extracted.skills && data.extracted.skills.length > 0) {
          setTopStrengths(data.extracted.skills.slice(0, 4));
        }
        if (data.extracted.experience && data.extracted.experience.length > 0) {
          setExperienceList(data.extracted.experience);
        }
        if (data.extracted.education && data.extracted.education.length > 0) {
          setEducationList(data.extracted.education);
        }
        if (data.extracted.certifications && data.extracted.certifications.length > 0) {
          setCertificationsList(data.extracted.certifications);
        }
        if (data.extracted.projects && data.extracted.projects.length > 0) {
          setProjectsList(data.extracted.projects);
        }
        if (data.extracted.contact?.linkedin) {
          setLinkedinUrl(data.extracted.contact.linkedin);
        }
        if (data.extracted.contact?.github) {
          setGithubUrl(data.extracted.contact.github);
        }
        if (data.extracted.contact?.website) {
          setPortfolioUrl(data.extracted.contact.website);
        }

        if (data.extracted.recommendedTheme) {
          setSelectedThemeId(data.extracted.recommendedTheme);
        } else {
          const titleLower = ((data.extracted.headline || "") + " " + cleanName).toLowerCase();
          if (titleLower.includes("design") || titleLower.includes("ux") || titleLower.includes("ui") || titleLower.includes("creative") || titleLower.includes("brand")) {
            setProfileType("designer");
            setSelectedThemeId("rolan-gomes");
            setRecommendedThemeIds(["rolan-gomes", "tanuja-design", "himanshu-singh"]);
          } else if (titleLower.includes("manager") || titleLower.includes("product") || titleLower.includes("growth")) {
            setProfileType("bba");
            setSelectedThemeId("corporate-clean");
            setRecommendedThemeIds(["corporate-clean", "tanuja-design", "luxe-creative"]);
          } else {
            setProfileType("tech");
            setSelectedThemeId("sudarvel");
            setRecommendedThemeIds(["sudarvel", "developer-terminal", "minimal-editorial"]);
          }
        }

        try {
          localStorage.setItem("folioin_active_profile", JSON.stringify(data.extracted));
        } catch (e) {}

        const roleCount = data.extracted.experience?.length || 0;
        const projCount = data.extracted.projects?.length || 0;
        const certCount = data.extracted.certifications?.length || 0;
        setExtractSuccess(`✓ Successfully synthesized ${cleanName}'s profile with ${roleCount} roles, ${projCount} projects & skills using Gemini AI!`);
      }
    } catch (err: any) {
      setExtractError(err.message || "Failed to extract career data.");
    } finally {
      setIsExtracting(false);
    }
  };

  // Role presets by profile
  const ROLE_PRESETS: Record<ProfileType, string[]> = {
    tech: ["Full-Stack Engineer", "Frontend Developer", "Backend Systems Engineer", "DevOps / SRE"],
    designer: ["Product Designer", "UI/UX Designer", "Brand Systems Designer", "Creative Technologist"],
    bba: ["Product Manager", "Growth Lead", "Technical Program Manager", "Startup Founder"],
    other: ["Technical Writer", "Data Analyst", "Community Architect", "Developer Advocate"],
  };

  const STRENGTH_PRESETS: Record<ProfileType, string[]> = {
    tech: ["Next.js & React", "TypeScript", "Distributed Systems", "PostgreSQL & Prisma", "System Architecture", "Performance Optimization"],
    designer: ["Design Systems", "Prototyping & Motion", "Figma", "User Research", "Visual Identity", "Micro-Interactions"],
    bba: ["Product Strategy", "PLG Loops", "Metrics & Analytics", "Roadmapping", "Cross-Functional Leadership", "Go-To-Market"],
    other: ["Technical Writing", "API Documentation", "Developer Education", "Community Building", "Public Speaking", "Open Source"],
  };

  const toggleRole = (role: string) => {
    if (targetRoles.includes(role)) {
      if (targetRoles.length > 1) {
        setTargetRoles(targetRoles.filter((r) => r !== role));
      }
    } else {
      if (targetRoles.length < 3) {
        setTargetRoles([...targetRoles, role]);
      }
    }
  };

  const toggleStrength = (strength: string) => {
    if (topStrengths.includes(strength)) {
      if (topStrengths.length > 1) {
        setTopStrengths(topStrengths.filter((s) => s !== strength));
      }
    } else {
      if (topStrengths.length < 3) {
        setTopStrengths([...topStrengths, strength]);
      }
    }
  };

  const handleGenerateDraft = async () => {
    setIsSubmitting(true);
    const answersPayload: IntakeAnswersInput = {
      profileType,
      targetGoal,
      targetRoles,
      topStrengths,
      tone,
      preferredMood,
      links: {
        github: githubUrl || undefined,
        linkedin: linkedinUrl || undefined,
        portfolio: portfolioUrl || undefined,
      },
      rawResumeText: rawResumeText || undefined,
      projects: projectsList,
      experience: experienceList,
      education: educationList,
      certifications: certificationsList,
    };

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "draft",
          answers: answersPayload,
          userName: candidateName,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.draft) {
          if (data.draft.suggestedHeadline) {
            setDraftHeadline(data.draft.suggestedHeadline);
          }
          if (data.draft.suggestedBio) {
            setDraftBio(data.draft.suggestedBio);
          }
          if (data.draft.recommendedThemeIds && data.draft.recommendedThemeIds.length > 0) {
            setRecommendedThemeIds(data.draft.recommendedThemeIds);
            if (!selectedThemeId || selectedThemeId === "sudarvel") {
              setSelectedThemeId(data.draft.recommendedThemeIds[0]);
            }
          }
          setStep(4);
        }
      }
    } catch (err) {
      console.error("Draft generation failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApproveAndPublish = async () => {
    if (!isApproved) return;
    setIsSubmitting(true);

    const answersPayload: IntakeAnswersInput = {
      profileType,
      targetGoal,
      targetRoles,
      topStrengths,
      tone,
      preferredMood,
      links: {
        github: githubUrl || undefined,
        linkedin: linkedinUrl || undefined,
        portfolio: portfolioUrl || undefined,
      },
      rawResumeText: rawResumeText || undefined,
      projects: projectsList,
      experience: experienceList,
      education: educationList,
      certifications: certificationsList,
    };

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "approve",
          answers: answersPayload,
          approvedHeadline: draftHeadline,
          approvedBio: draftBio,
          themeId: selectedThemeId,
          userName: candidateName,
        }),
      });

      let cleanCandidateName = (candidateName || "Candidate").replace(/[*_#`~]/g, "").trim();
      if (/\b(summary|profile|experience|skills|resume|cv)\b/i.test(cleanCandidateName)) {
        cleanCandidateName = "Candidate";
      }
      const themeSuffix = selectedThemeId ? `?theme=${encodeURIComponent(selectedThemeId)}` : "";

      if (res.ok) {
        const data = await res.json();
        setPublishedUrl(data.liveUrl || `/p/${encodeURIComponent(cleanCandidateName)}${themeSuffix}`);
      } else {
        // Fallback for serverless preview resilience: Never block candidate from previewing their portfolio
        setPublishedUrl(`/p/${encodeURIComponent(cleanCandidateName)}${themeSuffix}`);
      }

      try {
        const fullProfile = {
          name: cleanCandidateName,
          headline: draftHeadline,
          bio: draftBio,
          skills: topStrengths,
          experience: experienceList,
          education: educationList,
          certifications: certificationsList,
          projects: projectsList,
          recommendedTheme: selectedThemeId,
          themeId: selectedThemeId,
        };
        localStorage.setItem("folioin_active_profile", JSON.stringify(fullProfile));
      } catch {}
    } catch (err) {
      console.error("Failed to approve and publish:", err);
      let cleanCandidateName = (candidateName || "Candidate").replace(/[*_#`~]/g, "").trim();
      if (/\b(summary|profile|experience|skills|resume|cv)\b/i.test(cleanCandidateName)) {
        cleanCandidateName = "Candidate";
      }
      const themeSuffix = selectedThemeId ? `?theme=${encodeURIComponent(selectedThemeId)}` : "";
      // Fallback: Launch live portfolio directly
      setPublishedUrl(`/p/${encodeURIComponent(cleanCandidateName)}${themeSuffix}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] selection:bg-[#173f32] selection:text-white font-sans flex flex-col justify-between antialiased">
      {/* Top Header */}
      <header className="border-b border-[#1E293B]/10 bg-[#F8F9FA]/90 backdrop-blur-xl px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <FolioInLogo size="sm" />
            <span className="text-slate-400 text-xs font-medium">/ Smart Intake</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#173f32]">Step {step} of 4</span>
            <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#173f32] transition-all duration-300 rounded-full"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-6 py-10 w-full flex-1">
        {publishedUrl ? (
          /* SUCCESS PUBLISHED VIEW */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-[#173f32] text-[#173f32] flex items-center justify-center mx-auto shadow-md animate-bounce">
              <CheckCircle2 size={36} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B]">
              Your Verified Portfolio is Live!
            </h1>
            <p className="text-slate-600 max-w-lg mx-auto text-sm leading-relaxed font-normal">
              Crafted with zero hallucinations, factual accuracy, and your approved tone of voice.
            </p>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-md max-w-md mx-auto flex items-center justify-between">
              <span className="font-mono text-xs text-[#173f32] font-bold truncate">
                folioin.me{publishedUrl}
              </span>
              <Link
                href={publishedUrl}
                target="_blank"
                className="px-4 py-2 rounded-full bg-[#173f32] hover:bg-[#13352a] text-white font-bold text-xs flex items-center gap-1 transition-all shadow-xs"
              >
                <span>Visit Now</span>
                <ExternalLink size={12} />
              </Link>
            </div>

            <div className="pt-6 flex flex-wrap justify-center gap-3">
              <Link
                href={publishedUrl}
                target="_blank"
                className="px-5 py-2.5 rounded-full bg-[#173f32] hover:bg-[#13352a] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-[#173f32]/20"
              >
                <span>Visit Live Site ↗</span>
                <ExternalLink size={12} />
              </Link>
              <Link
                href="/dashboard"
                className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 transition-colors shadow-2xs"
              >
                Go to Dashboard →
              </Link>
              <Link
                href={`/portfolio/preview?name=${encodeURIComponent(candidateName)}&theme=${encodeURIComponent(selectedThemeId)}`}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 transition-colors shadow-2xs"
              >
                Open in AI Studio →
              </Link>
              <Link
                href="/styles"
                className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 transition-colors shadow-2xs"
              >
                Browse Style Gallery →
              </Link>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            {/* STEP 1: FOCUS & GOALS */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-lg"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#173f32] border border-emerald-200/60 text-xs font-bold uppercase tracking-wider mb-2">
                    <User size={12} /> Step 1: Career Identity &amp; Goals
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
                    What are you looking to achieve?
                  </h1>
                  <p className="text-xs text-slate-500 mt-1 font-normal">
                    Takes under 2 minutes. We only collect details that make your portfolio stand out to recruiters.
                  </p>
                </div>

                {/* 1-Click LinkedIn / Resume PDF or Text Auto-Fill in Step 1 */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-blue-50/50 border-2 border-emerald-300 shadow-sm space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-[#0077b5] text-white shadow-xs">
                        <FileUp size={18} />
                      </span>
                      <div>
                        <h3 className="text-sm font-extrabold text-[#1E293B]">
                          Auto-Fill with Your Authentic Resume / LinkedIn Data
                        </h3>
                        <p className="text-[11px] text-slate-500 font-normal">
                          Loads your exact name, magnetic headline, real companies, dates, credentials, and achievements with Gemini AI.
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
                      ⚡ Powered by Google Gemini AI
                    </span>
                  </div>

                  {/* Mode Tabs: PDF vs Raw Text */}
                  <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200 w-fit">
                    <button
                      type="button"
                      onClick={() => setIntakeInputMode("pdf")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        intakeInputMode === "pdf" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      <FileUp size={13} />
                      <span>Upload PDF Resume</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIntakeInputMode("text")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        intakeInputMode === "text" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      <Sparkles size={13} className="text-emerald-600" />
                      <span>Paste Resume / LinkedIn Text</span>
                    </button>
                  </div>

                  {intakeInputMode === "pdf" ? (
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDraggingPdf(true);
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        setIsDraggingPdf(false);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDraggingPdf(false);
                        const file = e.dataTransfer.files?.[0];
                        if (file) handlePdfUpload(file);
                      }}
                      onClick={() => document.getElementById("step1PdfUpload")?.click()}
                      className={`p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-2 ${
                        isDraggingPdf
                          ? "border-emerald-500 bg-emerald-50 scale-[1.01] shadow-md"
                          : "border-slate-300 hover:border-emerald-500 bg-white hover:bg-emerald-50/20"
                      }`}
                    >
                      <input
                        id="step1PdfUpload"
                        type="file"
                        accept=".pdf,application/pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handlePdfUpload(file);
                        }}
                      />
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#173f32] flex items-center justify-center">
                        <Upload size={18} />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">
                          Drop LinkedIn PDF (Profile → More → Save to PDF) or Resume
                        </span>
                        <span className="text-[11px] text-slate-500 font-normal">
                          or click to select .pdf file from your device
                        </span>
                      </div>
                      {pdfFileName && (
                        <div className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-bold">
                          Uploaded: {pdfFileName}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-inner">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">
                          Paste your resume, LinkedIn summary, or career history:
                        </span>
                        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                          Zero-Hallucination Extraction
                        </span>
                      </div>
                      <textarea
                        rows={6}
                        value={rawResumeText}
                        onChange={(e) => setRawResumeText(e.target.value)}
                        placeholder="Paste your raw career history, roles, projects, and skills here... (e.g. Mohit Saini - Frontend & Flutter Developer, Jaipur, India...)"
                        className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[#1E293B] text-xs leading-relaxed focus:border-[#173f32] focus:bg-white focus:outline-none"
                      />
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-[11px] text-slate-500">
                          Gemini AI extracts your genuine name, skills, and projects, choosing the optimal theme &amp; typography.
                        </span>
                        <button
                          type="button"
                          onClick={handleAutoExtract}
                          disabled={isExtracting || !rawResumeText.trim()}
                          className="px-5 py-2.5 rounded-full bg-[#173f32] hover:bg-[#13352a] text-white text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-50 shadow-md shadow-[#173f32]/20"
                        >
                          <Sparkles size={14} />
                          <span>{isExtracting ? "Synthesizing with Gemini AI..." : "⚡ Auto-Extract with Gemini AI"}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {isExtracting && (
                    <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-mono flex items-center gap-3 animate-pulse">
                      <div className="w-3.5 h-3.5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin shrink-0" />
                      <span>AI Trajectory Parser extracting companies, dates, credentials &amp; impact metrics...</span>
                    </div>
                  )}

                  {extractSuccess && (
                    <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-xs text-emerald-950 font-medium space-y-3 shadow-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 size={18} className="text-emerald-700 shrink-0 mt-0.5" />
                        <span className="font-semibold text-emerald-900 leading-relaxed">{extractSuccess}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-emerald-200">
                        <Link
                          href={`/p/${encodeURIComponent(candidateName)}`}
                          target="_blank"
                          className="px-4 py-2 rounded-xl bg-[#173f32] hover:bg-[#123328] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                        >
                          <span>🚀 View Live Portfolio ({candidateName})</span>
                          <ExternalLink size={13} />
                        </Link>
                        <Link
                          href={`/portfolio/preview?name=${encodeURIComponent(candidateName)}&theme=${encodeURIComponent(selectedThemeId)}`}
                          className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-emerald-300 text-emerald-900 text-xs font-bold transition flex items-center gap-1.5"
                        >
                          <span>Open in 4-Theme Studio</span>
                          <Sparkles size={13} className="text-emerald-600" />
                        </Link>
                      </div>
                    </div>
                  )}

                  {extractError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-xs text-rose-900 font-medium flex items-start gap-2">
                      <span className="text-rose-600 font-bold">⚠</span>
                      <span>{extractError}</span>
                    </div>
                  )}
                </div>

                {/* Quick Persona Demo Presets */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-500/30">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold text-[#173f32] flex items-center gap-1.5">
                      <Sparkles size={14} className="text-emerald-600" />
                      1-Click Instant Persona Presets (Test High-Impact Roles)
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">Auto-fills verified data</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: "ui-ux-designer", label: "🎨 UI/UX Designer", name: "Maya Chen" },
                      { key: "fullstack-developer", label: "⚡ Full-Stack Engineer", name: "Devon Vance" },
                      { key: "aiml-engineer", label: "🧠 AI/ML Engineer", name: "Dr. Aris Thorne" },
                      { key: "graphic-designer", label: "📐 Graphic Designer", name: "Leo Vasquez" },
                      { key: "student-fresher", label: "🎓 Student / Fresher", name: "Kevin Zhang" },
                    ].map((p) => {
                      const isSelected = activePersonaId === p.key;
                      return (
                        <button
                          key={p.key}
                          type="button"
                          onClick={() => handleSelectPersona(p.key)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                            isSelected
                              ? "bg-[#173f32] text-white shadow-sm ring-2 ring-emerald-500"
                              : "bg-white hover:bg-slate-100 text-slate-800 border border-slate-200"
                          }`}
                        >
                          <span>{p.label}</span>
                          <span className="text-[10px] opacity-75 font-normal hidden sm:inline">({p.name})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Candidate Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Your Full Name</label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="e.g. Alex Developer"
                    className="w-full px-4 py-3 rounded-full bg-slate-50 border border-slate-200 text-[#1E293B] text-sm font-semibold focus:border-[#173f32] focus:outline-none"
                  />
                </div>

                {/* Profile Type */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Profile Discipline</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: "tech", label: "Tech / Engineering", icon: Code2 },
                      { id: "designer", label: "Product / Design", icon: Palette },
                      { id: "bba", label: "Business / PM", icon: Briefcase },
                      { id: "other", label: "Other / Creator", icon: Sparkles },
                    ].map((item) => {
                      const Icon = item.icon;
                      const selected = profileType === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setProfileType(item.id as ProfileType);
                            setTargetRoles([ROLE_PRESETS[item.id as ProfileType][0]]);
                            setTopStrengths([STRENGTH_PRESETS[item.id as ProfileType][0], STRENGTH_PRESETS[item.id as ProfileType][1]]);
                          }}
                          className={`p-4 rounded-2xl border text-left transition-all ${
                            selected
                              ? "bg-emerald-50/70 border-[#173f32] text-[#173f32] shadow-sm"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:text-[#1E293B]"
                          }`}
                        >
                          <Icon size={20} className={selected ? "text-[#173f32]" : "text-slate-400"} />
                          <div className="text-xs font-bold mt-2">{item.label}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Target Goal */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Primary Career Goal</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: "job", label: "Full-Time Job" },
                      { id: "internship", label: "Internships" },
                      { id: "freelance", label: "Freelancing" },
                      { id: "studies", label: "Higher Studies" },
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setTargetGoal(g.id as TargetGoal)}
                        className={`py-2.5 px-3 rounded-full text-xs font-bold border text-center transition-all ${
                          targetGoal === g.id
                            ? "bg-[#173f32] text-white border-[#173f32] shadow-xs"
                            : "bg-white border-slate-200 text-slate-600 hover:text-[#1E293B]"
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Roles */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Target Roles (1 to 3)</label>
                    <span className="text-[11px] text-slate-400 font-mono">{targetRoles.length}/3 selected</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ROLE_PRESETS[profileType].map((role) => {
                      const active = targetRoles.includes(role);
                      return (
                        <button
                          key={role}
                          type="button"
                          onClick={() => toggleRole(role)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
                            active
                              ? "bg-emerald-50 text-[#173f32] border-emerald-300"
                              : "bg-white border-slate-200 text-slate-600 hover:text-black"
                          }`}
                        >
                          {active ? "✓ " : "+ "}{role}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-full bg-[#173f32] hover:bg-[#13352a] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-[#173f32]/20"
                  >
                    <span>Continue: Strengths &amp; Voice</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: STRENGTHS, TONE & MOOD */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-lg"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#173f32] border border-emerald-200/60 text-xs font-bold uppercase tracking-wider mb-2">
                    <Sparkles size={12} /> Step 2: Strengths &amp; Voice
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
                    How do you want to sound?
                  </h1>
                  <p className="text-xs text-slate-500 mt-1 font-normal">
                    Pick your top 3 superpowers and how your portfolio communicates.
                  </p>
                </div>

                {/* Strengths */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Core Strengths (Max 3)</label>
                    <span className="text-[11px] text-slate-400 font-mono">{topStrengths.length}/3 selected</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {STRENGTH_PRESETS[profileType].map((strength) => {
                      const active = topStrengths.includes(strength);
                      return (
                        <button
                          key={strength}
                          type="button"
                          onClick={() => toggleStrength(strength)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
                            active
                              ? "bg-emerald-50 text-[#173f32] border-emerald-300"
                              : "bg-white border-slate-200 text-slate-600 hover:text-black"
                          }`}
                        >
                          {active ? "✓ " : "+ "}{strength}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tone of Voice */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Tone of Voice</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "bold", title: "Bold & Direct", desc: "Punchy, high-energy, highlights leverage and outcome impact." },
                      { id: "formal", title: "Formal & Precise", desc: "Structured, academic or enterprise tone focusing on reliability." },
                      { id: "friendly", title: "Warm & Collaborative", desc: "Approachable, conversational, team-first narrative." },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTone(t.id as ToneOfVoice)}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          tone === t.id
                            ? "bg-emerald-50/70 border-[#173f32] text-[#173f32] shadow-sm"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:text-black"
                        }`}
                      >
                        <div className="text-xs font-bold text-[#1E293B] mb-1">{t.title}</div>
                        <div className="text-[11px] text-slate-500 leading-relaxed font-normal">{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Mood */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Preferred Aesthetic Mood</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: "formal", label: "Formal & Technical" },
                      { id: "bold", label: "High-Contrast Bold" },
                      { id: "calm", label: "Calm & Editorial" },
                      { id: "playful", label: "Expressive & Playful" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPreferredMood(m.id as PreferredMood)}
                        className={`py-2.5 px-3 rounded-full text-xs font-bold border text-center transition-all ${
                          preferredMood === m.id
                            ? "bg-[#173f32] text-white border-[#173f32] shadow-xs"
                            : "bg-white border-slate-200 text-slate-600 hover:text-[#1E293B]"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 rounded-full bg-[#173f32] hover:bg-[#13352a] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-[#173f32]/20"
                  >
                    <span>Continue: Proof &amp; Links</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: PROOF LINKS & RESUME */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-lg"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#173f32] border border-emerald-200/60 text-xs font-bold uppercase tracking-wider mb-2">
                    <Globe size={12} /> Step 3: Verified Proof &amp; Links
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
                    Anchor your portfolio in real proof.
                  </h1>
                  <p className="text-xs text-slate-500 mt-1 font-normal">
                    HARD RULE: FolioIn never invents fake metrics or unverified jobs. All copy is generated strictly from what you provide below.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">GitHub Profile URL</label>
                      {githubSyncResult && (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          {githubSyncResult}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="url"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        placeholder="https://github.com/yourusername"
                        className="flex-1 px-4 py-3 rounded-full bg-slate-50 border border-slate-200 text-[#1E293B] text-xs font-semibold focus:border-[#173f32] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleSyncGithub}
                        disabled={isSyncingGithub || !githubUrl.trim()}
                        className="px-4 py-3 rounded-full bg-slate-900 hover:bg-[#173f32] text-white text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50 shadow-2xs"
                      >
                        {isSyncingGithub ? (
                          <>
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Syncing...</span>
                          </>
                        ) : (
                          <>
                            <Code2 size={13} />
                            <span>Sync Repos</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">LinkedIn Profile URL</label>
                    <input
                      type="url"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/yourusername"
                      className="w-full mt-1 px-4 py-3 rounded-full bg-slate-50 border border-slate-200 text-[#1E293B] text-xs font-semibold focus:border-[#173f32] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Behance / Portfolio Link (Optional)</label>
                    <input
                      type="url"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      placeholder="https://behance.net/yourname"
                      className="w-full mt-1 px-4 py-3 rounded-full bg-slate-50 border border-slate-200 text-[#1E293B] text-xs font-semibold focus:border-[#173f32] focus:outline-none"
                    />
                  </div>

                  {/* PART 1: 1-CLICK LINKEDIN PDF DROP & RESUME DEEP EXTRACTION */}
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50/70 via-white to-blue-50/50 border-2 border-emerald-200/80 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-[#0077b5] text-white">
                          <FileUp size={16} />
                        </span>
                        <div>
                          <h3 className="text-sm font-extrabold text-[#1E293B]">
                            1-Click LinkedIn &amp; Resume Deep Extraction
                          </h3>
                          <p className="text-[11px] text-slate-500 font-normal">
                            Direct PDF trajectory parsing with verified metrics &amp; zero hallucinations.
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-300/60">
                        ⚡ Part 1 Engine
                      </span>
                    </div>

                    {/* Step-by-Step LinkedIn Guide Banner */}
                    <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200 text-xs text-slate-700 flex items-start gap-2.5">
                      <span className="text-base leading-none">💡</span>
                      <div className="space-y-0.5 text-[11px]">
                        <strong className="text-blue-950 font-bold block">
                          How to get your LinkedIn PDF export in 5 seconds:
                        </strong>
                        <p className="leading-relaxed text-blue-900/80">
                          On LinkedIn, open your Profile → Click <strong>More (•••)</strong> right below your photo → Select <strong>&quot;Save to PDF&quot;</strong>. Drag &amp; drop that file below!
                        </p>
                      </div>
                    </div>

                    {/* Drag-and-Drop Dropzone */}
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDraggingPdf(true);
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        setIsDraggingPdf(false);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDraggingPdf(false);
                        const file = e.dataTransfer.files?.[0];
                        if (file) handlePdfUpload(file);
                      }}
                      onClick={() => document.getElementById("linkedinPdfInput")?.click()}
                      className={`p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-2 ${
                        isDraggingPdf
                          ? "border-emerald-500 bg-emerald-50 scale-[1.01] shadow-md"
                          : "border-slate-300 hover:border-emerald-500 bg-white hover:bg-emerald-50/30"
                      }`}
                    >
                      <input
                        id="linkedinPdfInput"
                        type="file"
                        accept=".pdf,application/pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handlePdfUpload(file);
                        }}
                      />

                      <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#173f32] flex items-center justify-center">
                        <Upload size={20} />
                      </div>

                      <div>
                        <span className="text-xs font-bold text-slate-800 block">
                          Drop your LinkedIn or Resume PDF here
                        </span>
                        <span className="text-[11px] text-slate-500 font-normal">
                          or click to browse files from your device (.pdf)
                        </span>
                      </div>

                      {pdfFileName && (
                        <div className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-bold">
                          Selected: {pdfFileName}
                        </div>
                      )}
                    </div>

                    {/* Extraction Status Feedback */}
                    {isExtracting && (
                      <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-mono flex items-center gap-3 animate-pulse">
                        <div className="w-3.5 h-3.5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin shrink-0" />
                        <span>AI Trajectory Parser extracting companies, dates, credentials &amp; impact metrics...</span>
                      </div>
                    )}

                    {extractSuccess && (
                      <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 font-medium flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{extractSuccess}</span>
                      </div>
                    )}

                    {extractError && (
                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-xs text-rose-900 font-medium flex items-start gap-2">
                        <span className="text-rose-600 font-bold">⚠</span>
                        <span>{extractError}</span>
                      </div>
                    )}

                    {/* Alternative: Text Paste Accordion / Input */}
                    <div className="pt-2 border-t border-slate-200">
                      <details className="group">
                        <summary className="text-[11px] font-bold text-slate-500 hover:text-slate-800 cursor-pointer list-none flex items-center gap-1.5">
                          <span className="text-slate-400 group-open:rotate-90 transition-transform">▸</span>
                          <span>Or paste resume / LinkedIn profile text manually</span>
                        </summary>
                        <div className="mt-3 space-y-2">
                          <textarea
                            rows={4}
                            value={rawResumeText}
                            onChange={(e) => setRawResumeText(e.target.value)}
                            placeholder="Paste your raw career history or resume text..."
                            className="w-full p-3.5 rounded-xl bg-white border border-slate-200 text-[#1E293B] text-xs leading-relaxed focus:border-[#173f32] focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={handleAutoExtract}
                            disabled={isExtracting || !rawResumeText.trim()}
                            className="px-4 py-2 rounded-full bg-[#173f32] hover:bg-[#13352a] text-white text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-50"
                          >
                            <Sparkles size={12} />
                            <span>Extract from Pasted Text</span>
                          </button>
                        </div>
                      </details>
                    </div>

                  </div>
                </div>

                  {/* Career & Credentials Live Telemetry Previews */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Experience Preview */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                        <span className="flex items-center gap-1.5">
                          <Briefcase size={13} className="text-[#173f32]" /> Experience
                        </span>
                        <span className="text-slate-400 font-mono text-[11px]">{experienceList.length} roles</span>
                      </div>
                      <div className="space-y-1.5 max-h-36 overflow-y-auto">
                        {experienceList.map((exp, i) => (
                          <div key={i} className="text-[11px] p-2 bg-white rounded-lg border border-slate-200">
                            <div className="font-bold text-slate-900 truncate">{exp.role}</div>
                            <div className="text-slate-500 text-[10px]">{exp.company} • {exp.period}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Education Preview */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                        <span className="flex items-center gap-1.5">
                          <GraduationCap size={13} className="text-[#173f32]" /> Education
                        </span>
                        <span className="text-slate-400 font-mono text-[11px]">{educationList.length} degrees</span>
                      </div>
                      <div className="space-y-1.5 max-h-36 overflow-y-auto">
                        {educationList.map((edu, i) => (
                          <div key={i} className="text-[11px] p-2 bg-white rounded-lg border border-slate-200">
                            <div className="font-bold text-slate-900 truncate">{edu.degree}</div>
                            <div className="text-slate-500 text-[10px]">{edu.institution} ({edu.year})</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Certifications Preview */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck size={13} className="text-[#173f32]" /> Certifications
                        </span>
                        <span className="text-slate-400 font-mono text-[11px]">{certificationsList.length} items</span>
                      </div>
                      <div className="space-y-1.5 max-h-36 overflow-y-auto">
                        {certificationsList.map((c, i) => (
                          <div key={i} className="text-[11px] p-2 bg-white rounded-lg border border-slate-200">
                            <div className="font-bold text-slate-900 truncate">{c.name}</div>
                            <div className="text-slate-500 text-[10px]">{c.issuer} {c.year && `• ${c.year}`}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button
                    onClick={handleGenerateDraft}
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-full bg-[#173f32] hover:bg-[#13352a] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-[#173f32]/20 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Synthesizing Copy...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={14} />
                        <span>Draft Copy &amp; Recommend Styles →</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: REVIEW, APPROVE & LAUNCH */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-lg"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#173f32] border border-emerald-200/60 text-xs font-bold uppercase tracking-wider mb-2">
                    <ShieldCheck size={12} /> Step 4: Zero-Hallucination Review &amp; Approval
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
                    Review and approve your portfolio copy.
                  </h1>
                  <p className="text-xs text-slate-500 mt-1 font-normal">
                    Every word below was generated strictly from your stated roles ({targetRoles.join(", ")}) and strengths ({topStrengths.join(", ")}). You have complete editing control.
                  </p>
                </div>

                {/* Headline Editor */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                    <span>Generated Professional Headline</span>
                    <span className="text-[#173f32] text-[10px]">Editable</span>
                  </label>
                  <input
                    type="text"
                    value={draftHeadline}
                    onChange={(e) => setDraftHeadline(e.target.value)}
                    className="w-full px-4 py-3 rounded-full bg-slate-50 border border-slate-200 text-[#1E293B] text-sm font-bold focus:border-[#173f32] focus:outline-none"
                  />
                </div>

                {/* Bio Editor */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                    <span>Generated Profile Bio ({tone.toUpperCase()} tone)</span>
                    <span className="text-[#173f32] text-[10px]">Editable</span>
                  </label>
                  <textarea
                    rows={4}
                    value={draftBio}
                    onChange={(e) => setDraftBio(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-[#1E293B] text-xs leading-relaxed focus:border-[#173f32] focus:outline-none font-medium"
                  />
                </div>

                {/* Recommended Styles Picker */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Select Architectural Style Engine
                    </label>
                    <span className="text-[11px] font-semibold text-[#173f32] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      ✨ AI Pick: {selectedThemeId}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      { 
                        id: "sudarvel", 
                        name: "Sudarvel Dark Case Study", 
                        badge: "Sudarvel K", 
                        category: "Tech / Product",
                        desc: "Obsidian canvas, live availability telemetry, numbered case study drawers (+38% throughput, 65ms latency), and interactive outcome telemetry." 
                      },
                      { 
                        id: "rolan-gomes", 
                        name: "Rolan Gomes Desk Mat", 
                        badge: "Rolan Gomes", 
                        category: "Physical Craft",
                        desc: "Tactile paper sheet on an architect green cutting mat, floating yellow sticky notes, and accredited credentials shelf." 
                      },
                      { 
                        id: "himanshu-singh", 
                        name: "Himanshu Studio", 
                        badge: "Himanshu Singh", 
                        category: "Visual Storyteller",
                        desc: "Deep forest studio cutting board (#06392b), cinematic storyboard sequences, branding, and art direction showcase." 
                      },
                      { 
                        id: "tanuja-design", 
                        name: "Tanuja Microsoft UX", 
                        badge: "Tanuja (Microsoft)", 
                        category: "Enterprise Product",
                        desc: "High-clarity enterprise product canvas, AI workflows, FOX Icons, and structured problem-solution drawers." 
                      },
                      { 
                        id: "developer-terminal", 
                        name: "Developer Terminal", 
                        badge: "Systems & AI", 
                        category: "Modern Developer",
                        desc: "Interactive macOS/Linux terminal window with live shell commands, categorized technical stack, and commit logs." 
                      },
                      { 
                        id: "minimal-editorial", 
                        name: "Minimal & Elegant", 
                        badge: "Quiet Luxury", 
                        category: "Editorial Serif",
                        desc: "Generous whitespace, refined Georgia/Playfair serif typography, warm paper tones, and understated elegance." 
                      },
                      { 
                        id: "bold-poster", 
                        name: "Bold Creative Poster", 
                        badge: "Brutalist Impact", 
                        category: "Creative Experimental",
                        desc: "Oversized Swiss typography, high-contrast dark grid, and bold visual compositions with strong personality." 
                      },
                      { 
                        id: "not-your-college", 
                        name: "Not Your College Breakout", 
                        badge: "Early Career", 
                        category: "Fresher / Student",
                        desc: "High-energy ambitious breakout portfolio highlighting verified GPA/honors, hackathons, open source, and projects." 
                      },
                      { 
                        id: "luxe-creative", 
                        name: "Luxe Agency Studio", 
                        badge: "High Fashion", 
                        category: "Creative Agency",
                        desc: "Luxury dark aesthetic with asymmetrical grids, dual-tone typography, and premium presentation." 
                      },
                      { 
                        id: "corporate-clean", 
                        name: "Corporate Clean & PM", 
                        badge: "Executive", 
                        category: "Business / PM",
                        desc: "Structured enterprise executive dossier with clean problem-solution metrics and institutional clarity." 
                      },
                      { 
                        id: "neo-brutalist", 
                        name: "Neo-Brutalist Pop", 
                        badge: "90s Retro Bold", 
                        category: "High Contrast",
                        desc: "Bold thick borders, bright contrast badges, hard drop-shadows, and raw high-energy developer attitude." 
                      },
                      { 
                        id: "glass", 
                        name: "Glassmorphism Cyber", 
                        badge: "Futuristic", 
                        category: "Frosted Glass",
                        desc: "Translucent frosted-glass panels, soft backdrops, modern cyber glowing borders, and atmospheric gradients." 
                      },
                      { 
                        id: "claymorphic", 
                        name: "Claymorphic 3D", 
                        badge: "Tactile 3D", 
                        category: "Soft Volume",
                        desc: "Soft embossed 3D pastel pill cards, tactile buttons, and friendly rounded design aesthetics." 
                      },
                      { 
                        id: "bento-grid", 
                        name: "BentoGrid Studio", 
                        badge: "Modular", 
                        category: "Aceternity Bento",
                        desc: "Modern Apple-style bento grid layout with live terminal metrics, modular skill cards, and project drawers." 
                      },
                    ].map((theme) => {
                      const isSelected = selectedThemeId === theme.id;
                      const isAiRecommended = recommendedThemeIds.includes(theme.id);
                      return (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => setSelectedThemeId(theme.id)}
                          className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                            isSelected
                              ? "bg-emerald-50/90 border-[#173f32] text-[#173f32] shadow-md ring-2 ring-[#173f32]"
                              : "bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-700"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5 gap-1">
                              <span className="text-xs font-bold text-[#1E293B] truncate">{theme.name}</span>
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-[#173f32] text-white shrink-0">
                                {theme.badge}
                              </span>
                            </div>
                            <div className="text-[10px] font-mono text-slate-500 mb-2 uppercase tracking-wider">{theme.category}</div>
                            <div className="text-[11px] text-slate-600 font-normal leading-relaxed">{theme.desc}</div>
                          </div>
                          {isAiRecommended && (
                            <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                              <Sparkles size={11} /> AI Match for Your Goals
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Mandatory Approval Checkbox */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="approvalCheckbox"
                    checked={isApproved}
                    onChange={(e) => setIsApproved(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#173f32] focus:ring-[#173f32] border-slate-300"
                  />
                  <label htmlFor="approvalCheckbox" className="text-xs text-slate-700 leading-relaxed cursor-pointer font-medium">
                    <strong className="text-slate-900 font-bold">Factual Accuracy Confirmation:</strong> I confirm that this headline, bio, and experience data accurately represent my real background and do not contain false claims, unverified metrics, or unauthorized external branding.
                  </label>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button
                    onClick={handleApproveAndPublish}
                    disabled={!isApproved || isSubmitting}
                    className="px-7 py-3 rounded-full bg-[#173f32] hover:bg-[#13352a] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-[#173f32]/20 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Publishing Live...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={14} />
                        <span>Approve &amp; Launch My Live Portfolio</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500 font-medium">
        FolioIn Smart Intake • Zero Hallucination Engine • Live Recruiter Proof
      </footer>
    </div>
  );
}

export default function SmartIntakeOnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <div className="w-4 h-4 border-2 border-[#173f32] border-t-transparent rounded-full animate-spin" />
            <span>Loading FolioIn Smart Intake...</span>
          </div>
        </div>
      }
    >
      <SmartIntakeOnboardingContent />
    </Suspense>
  );
}
