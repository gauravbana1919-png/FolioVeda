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
  HeartHandshake 
} from "lucide-react";
import { FolioVedaLogo } from "@/components/ui/Logo";
import Link from "next/link";
import { ProfileType, TargetGoal, ToneOfVoice, PreferredMood, IntakeAnswersInput } from "@/types/intake";

type Step = 1 | 2 | 3 | 4;

function SmartIntakeOnboardingContent() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);

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

  const [isSyncingGithub, setIsSyncingGithub] = useState(false);
  const [githubSyncResult, setGithubSyncResult] = useState<string | null>(null);

  // AI Generated Draft State (Step 4)
  const [draftHeadline, setDraftHeadline] = useState("");
  const [draftBio, setDraftBio] = useState("");
  const [recommendedThemeIds, setRecommendedThemeIds] = useState<string[]>([]);
  const [selectedThemeId, setSelectedThemeId] = useState("developer-terminal");

  // Read URL query params (?handle=, ?name=, ?template=) & session
  useEffect(() => {
    const handleParam = searchParams.get("handle") || searchParams.get("name");
    const templateParam = searchParams.get("template");

    if (handleParam) {
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
          setDraftHeadline(data.draft.suggestedHeadline);
          setDraftBio(data.draft.suggestedBio);
          setRecommendedThemeIds(data.draft.recommendedThemeIds);
          if (data.draft.recommendedThemeIds[0]) {
            setSelectedThemeId(data.draft.recommendedThemeIds[0]);
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

      if (res.ok) {
        const data = await res.json();
        setPublishedUrl(data.liveUrl || `/p/${encodeURIComponent(candidateName)}`);
      }
    } catch (err) {
      console.error("Failed to approve and publish:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] selection:bg-[#991B1B] selection:text-white font-sans flex flex-col justify-between antialiased">
      {/* Top Header */}
      <header className="border-b border-[#1E293B]/10 bg-[#F8F9FA]/90 backdrop-blur-xl px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <FolioVedaLogo size="sm" showBadge={false} />
            <span className="text-xs font-bold text-[#1E293B] group-hover:text-[#991B1B] transition-colors">
              FolioVeda <span className="text-slate-400 font-normal">/ Smart Intake</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#991B1B]">Step {step} of 4</span>
            <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#991B1B] transition-all duration-300 rounded-full"
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
            <div className="w-16 h-16 rounded-full bg-red-50 border-2 border-[#991B1B] text-[#991B1B] flex items-center justify-center mx-auto shadow-md animate-bounce">
              <CheckCircle2 size={36} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B]">
              Your Verified Portfolio is Live!
            </h1>
            <p className="text-slate-600 max-w-lg mx-auto text-sm leading-relaxed font-normal">
              Crafted with zero hallucinations, factual accuracy, and your approved tone of voice.
            </p>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-md max-w-md mx-auto flex items-center justify-between">
              <span className="font-mono text-xs text-[#991B1B] font-bold truncate">
                folioveda.me{publishedUrl}
              </span>
              <Link
                href={publishedUrl}
                target="_blank"
                className="px-4 py-2 rounded-full bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-bold text-xs flex items-center gap-1 transition-all shadow-xs"
              >
                <span>Visit Now</span>
                <ExternalLink size={12} />
              </Link>
            </div>

            <div className="pt-6 flex flex-wrap justify-center gap-3">
              <Link
                href={publishedUrl}
                target="_blank"
                className="px-5 py-2.5 rounded-full bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-[#991B1B]/20"
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
                href="/portfolio/preview"
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
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#991B1B] text-xs font-bold uppercase tracking-wider mb-2">
                    <User size={12} /> Step 1: Career Identity &amp; Goals
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
                    What are you looking to achieve?
                  </h1>
                  <p className="text-xs text-slate-500 mt-1 font-normal">
                    Takes under 2 minutes. We only collect details that make your portfolio stand out to recruiters.
                  </p>
                </div>

                {/* Candidate Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Your Full Name</label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="e.g. Alex Developer"
                    className="w-full px-4 py-3 rounded-full bg-slate-50 border border-slate-200 text-[#1E293B] text-sm font-semibold focus:border-[#991B1B] focus:outline-none"
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
                              ? "bg-red-50/70 border-[#991B1B] text-[#991B1B] shadow-sm"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:text-[#1E293B]"
                          }`}
                        >
                          <Icon size={20} className={selected ? "text-[#991B1B]" : "text-slate-400"} />
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
                            ? "bg-[#991B1B] text-white border-[#991B1B] shadow-xs"
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
                              ? "bg-red-50 text-[#991B1B] border-red-300"
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
                    className="px-6 py-3 rounded-full bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-[#991B1B]/20"
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
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#991B1B] text-xs font-bold uppercase tracking-wider mb-2">
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
                              ? "bg-red-50 text-[#991B1B] border-red-300"
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
                            ? "bg-red-50/70 border-[#991B1B] text-[#991B1B] shadow-sm"
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
                            ? "bg-[#991B1B] text-white border-[#991B1B] shadow-xs"
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
                    className="px-6 py-2.5 rounded-full bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-[#991B1B]/20"
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
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#991B1B] text-xs font-bold uppercase tracking-wider mb-2">
                    <Globe size={12} /> Step 3: Verified Proof &amp; Links
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
                    Anchor your portfolio in real proof.
                  </h1>
                  <p className="text-xs text-slate-500 mt-1 font-normal">
                    HARD RULE: FolioVeda never invents fake metrics or unverified jobs. All copy is generated strictly from what you provide below.
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
                        className="flex-1 px-4 py-3 rounded-full bg-slate-50 border border-slate-200 text-[#1E293B] text-xs font-semibold focus:border-[#991B1B] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleSyncGithub}
                        disabled={isSyncingGithub || !githubUrl.trim()}
                        className="px-4 py-3 rounded-full bg-slate-900 hover:bg-[#991B1B] text-white text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50 shadow-2xs"
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
                      className="w-full mt-1 px-4 py-3 rounded-full bg-slate-50 border border-slate-200 text-[#1E293B] text-xs font-semibold focus:border-[#991B1B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Behance / Portfolio Link (Optional)</label>
                    <input
                      type="url"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      placeholder="https://behance.net/yourname"
                      className="w-full mt-1 px-4 py-3 rounded-full bg-slate-50 border border-slate-200 text-[#1E293B] text-xs font-semibold focus:border-[#991B1B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Existing Resume Notes or Highlights (Optional)</label>
                    <textarea
                      rows={3}
                      value={rawResumeText}
                      onChange={(e) => setRawResumeText(e.target.value)}
                      placeholder="Paste 1-2 bullet points from your resume to anchor the AI bio..."
                      className="w-full mt-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-[#1E293B] text-xs leading-relaxed focus:border-[#991B1B] focus:outline-none"
                    />
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
                    className="px-6 py-2.5 rounded-full bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-[#991B1B]/20 disabled:opacity-50"
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
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#991B1B] text-xs font-bold uppercase tracking-wider mb-2">
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
                    <span className="text-[#991B1B] text-[10px]">Editable</span>
                  </label>
                  <input
                    type="text"
                    value={draftHeadline}
                    onChange={(e) => setDraftHeadline(e.target.value)}
                    className="w-full px-4 py-3 rounded-full bg-slate-50 border border-slate-200 text-[#1E293B] text-sm font-bold focus:border-[#991B1B] focus:outline-none"
                  />
                </div>

                {/* Bio Editor */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                    <span>Generated Profile Bio ({tone.toUpperCase()} tone)</span>
                    <span className="text-[#991B1B] text-[10px]">Editable</span>
                  </label>
                  <textarea
                    rows={4}
                    value={draftBio}
                    onChange={(e) => setDraftBio(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-[#1E293B] text-xs leading-relaxed focus:border-[#991B1B] focus:outline-none font-medium"
                  />
                </div>

                {/* Recommended Styles Picker */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Recommended Architecture For You
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "developer-terminal", name: "Developer Terminal", desc: "Bash chrome, CLI prompts, Git history" },
                      { id: "minimal-editorial", name: "Minimal Editorial", desc: "Editorial typography, generous whitespace" },
                      { id: "bold-poster", name: "Bold Poster", desc: "High-contrast neo-grotesque display headers" },
                    ].map((theme) => {
                      const isSelected = selectedThemeId === theme.id;
                      const isTopMatch = recommendedThemeIds[0] === theme.id;
                      return (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => setSelectedThemeId(theme.id)}
                          className={`p-4 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? "bg-red-50/70 border-[#991B1B] text-[#991B1B] shadow-sm"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:text-black"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-[#1E293B]">{theme.name}</span>
                            {isTopMatch && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-[#991B1B] text-white">
                                TOP MATCH
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 font-normal">{theme.desc}</div>
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
                    className="mt-0.5 w-4 h-4 rounded text-[#991B1B] focus:ring-[#991B1B] border-slate-300"
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
                    className="px-7 py-3 rounded-full bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-[#991B1B]/20 disabled:opacity-40 disabled:cursor-not-allowed"
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
        FolioVeda Smart Intake • Zero Hallucination Engine • Live Recruiter Proof
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
            <div className="w-4 h-4 border-2 border-[#991B1B] border-t-transparent rounded-full animate-spin" />
            <span>Loading FolioVeda Smart Intake...</span>
          </div>
        </div>
      }
    >
      <SmartIntakeOnboardingContent />
    </Suspense>
  );
}
