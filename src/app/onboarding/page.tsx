"use client";

import { useState } from "react";
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

export default function SmartIntakeOnboardingPage() {
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

  // AI Generated Draft State (Step 4)
  const [draftHeadline, setDraftHeadline] = useState("");
  const [draftBio, setDraftBio] = useState("");
  const [recommendedThemeIds, setRecommendedThemeIds] = useState<string[]>([]);
  const [selectedThemeId, setSelectedThemeId] = useState("developer-terminal");

  // Role presets by profile
  const ROLE_PRESETS: Record<ProfileType, string[]> = {
    tech: ["Full-Stack Engineer", "Frontend Specialist", "Backend Architect", "Systems Engineer", "Mobile Dev"],
    designer: ["Product Designer", "UI/UX Specialist", "Design Systems Lead", "Brand Strategist"],
    bba: ["Product Manager", "Operations Lead", "Strategy Consultant", "Data Analyst"],
    other: ["Creator & Engineer", "Technical Writer", "Researcher", "Founder"],
  };

  const STRENGTH_PRESETS: Record<ProfileType, string[]> = {
    tech: ["Next.js", "TypeScript", "Distributed Systems", "PostgreSQL", "Cloud Architecture", "Docker", "REST APIs"],
    designer: ["Figma Systems", "Design Thinking", "Interaction Design", "Prototyping", "Design Systems", "Typography"],
    bba: ["Go-to-Market", "KPI Analytics", "Roadmapping", "Cross-Functional Leadership", "Financial Modeling"],
    other: ["Execution", "Communication", "System Design", "Deep Research"],
  };

  const toggleRole = (r: string) => {
    if (targetRoles.includes(r)) {
      if (targetRoles.length > 1) setTargetRoles(targetRoles.filter((item) => item !== r));
    } else {
      if (targetRoles.length < 3) setTargetRoles([...targetRoles, r]);
    }
  };

  const toggleStrength = (s: string) => {
    if (topStrengths.includes(s)) {
      if (topStrengths.length > 1) setTopStrengths(topStrengths.filter((item) => item !== s));
    } else {
      if (topStrengths.length < 3) setTopStrengths([...topStrengths, s]);
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
    <div className="min-h-screen bg-[#0A0F1D] text-slate-100 selection:bg-emerald-500/30 font-sans flex flex-col justify-between">
      {/* Top Header */}
      <header className="border-b border-white/[0.08] bg-[#0A0F1D]/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <FolioVedaLogo size="sm" showBadge={false} />
            <span className="text-xs font-mono text-slate-400">/ Smart Intake</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-emerald-400">Step {step} of 4</span>
            <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-300"
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
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 size={36} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Your Verified Live Portfolio is Live!
            </h1>
            <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
              Crafted with zero hallucinations, factual accuracy, and your approved tone of voice.
            </p>

            <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 max-w-md mx-auto flex items-center justify-between">
              <span className="font-mono text-xs text-emerald-400 truncate">
                folioveda.me{publishedUrl}
              </span>
              <Link
                href={publishedUrl}
                target="_blank"
                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all"
              >
                <span>Visit Now</span>
                <ExternalLink size={12} />
              </Link>
            </div>

            <div className="pt-6 flex justify-center gap-4">
              <Link
                href="/portfolio/preview"
                className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/[0.08] text-xs font-semibold text-slate-200 transition-colors"
              >
                Open in AI Studio →
              </Link>
              <Link
                href="/styles"
                className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/[0.08] text-xs font-semibold text-slate-200 transition-colors"
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
                className="space-y-8"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono mb-2">
                    <User size={12} /> Step 1: Career Identity & Goals
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white">
                    What are you looking to achieve?
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Takes under 2 minutes. We only collect details that make your portfolio stand out to recruiters.
                  </p>
                </div>

                {/* Candidate Name */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-slate-400">Your Full Name</label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="e.g. Alex Developer"
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-white/[0.08] text-white text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Profile Type */}
                <div className="space-y-3">
                  <label className="text-xs font-mono uppercase text-slate-400">Profile Discipline</label>
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
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            selected
                              ? "bg-emerald-500/10 border-emerald-500 text-white shadow-md shadow-emerald-500/10"
                              : "bg-slate-900 border-white/[0.08] text-slate-400 hover:text-white"
                          }`}
                        >
                          <Icon size={18} className={selected ? "text-emerald-400" : "text-slate-500"} />
                          <div className="text-xs font-bold mt-2">{item.label}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Target Goal */}
                <div className="space-y-3">
                  <label className="text-xs font-mono uppercase text-slate-400">Primary Career Goal</label>
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
                        className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                          targetGoal === g.id
                            ? "bg-emerald-500 text-slate-950 font-bold border-emerald-400"
                            : "bg-slate-900 border-white/[0.08] text-slate-400 hover:text-white"
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
                    <label className="text-xs font-mono uppercase text-slate-400">Target Roles (1 to 3)</label>
                    <span className="text-[11px] text-slate-500 font-mono">{targetRoles.length}/3 selected</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ROLE_PRESETS[profileType].map((role) => {
                      const active = targetRoles.includes(role);
                      return (
                        <button
                          key={role}
                          type="button"
                          onClick={() => toggleRole(role)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            active
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold"
                              : "bg-slate-900 border-white/[0.08] text-slate-400 hover:text-white"
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
                    className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-500/20"
                  >
                    <span>Continue: Strengths & Tone</span>
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
                className="space-y-8"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono mb-2">
                    <Sparkles size={12} /> Step 2: Strengths & Voice
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white">
                    How do you want to sound?
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Pick your top 3 superpowers and how your portfolio communicates.
                  </p>
                </div>

                {/* Strengths */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono uppercase text-slate-400">Core Strengths (Max 3)</label>
                    <span className="text-[11px] text-slate-500 font-mono">{topStrengths.length}/3 selected</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {STRENGTH_PRESETS[profileType].map((strength) => {
                      const active = topStrengths.includes(strength);
                      return (
                        <button
                          key={strength}
                          type="button"
                          onClick={() => toggleStrength(strength)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            active
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold"
                              : "bg-slate-900 border-white/[0.08] text-slate-400 hover:text-white"
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
                  <label className="text-xs font-mono uppercase text-slate-400">Tone of Voice</label>
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
                        className={`p-4 rounded-xl border text-left transition-all ${
                          tone === t.id
                            ? "bg-emerald-500/10 border-emerald-500 text-white shadow-md shadow-emerald-500/10"
                            : "bg-slate-900 border-white/[0.08] text-slate-400 hover:text-white"
                        }`}
                      >
                        <div className="text-xs font-bold text-white mb-1">{t.title}</div>
                        <div className="text-[11px] text-slate-400 leading-relaxed">{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Mood */}
                <div className="space-y-3">
                  <label className="text-xs font-mono uppercase text-slate-400">Preferred Aesthetic Mood</label>
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
                        className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                          preferredMood === m.id
                            ? "bg-emerald-500 text-slate-950 font-bold border-emerald-400"
                            : "bg-slate-900 border-white/[0.08] text-slate-400 hover:text-white"
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
                    className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/[0.08] text-xs font-semibold text-slate-300 flex items-center gap-2"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-500/20"
                  >
                    <span>Continue: Proof & Links</span>
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
                className="space-y-8"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono mb-2">
                    <Globe size={12} /> Step 3: Verified Proof & Links
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white">
                    Anchor your portfolio in real proof.
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    HARD RULE: FolioVeda never invents fake metrics or unverified jobs. All copy is generated strictly from what you provide below.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400">GitHub Profile URL</label>
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/yourusername"
                      className="w-full mt-1 px-4 py-2.5 rounded-lg bg-slate-900 border border-white/[0.08] text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400">LinkedIn Profile URL</label>
                    <input
                      type="url"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/yourusername"
                      className="w-full mt-1 px-4 py-2.5 rounded-lg bg-slate-900 border border-white/[0.08] text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400">Behance / Portfolio Link (Optional)</label>
                    <input
                      type="url"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      placeholder="https://behance.net/yourname"
                      className="w-full mt-1 px-4 py-2.5 rounded-lg bg-slate-900 border border-white/[0.08] text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400">Existing Resume Notes or Highlights (Optional)</label>
                    <textarea
                      rows={3}
                      value={rawResumeText}
                      onChange={(e) => setRawResumeText(e.target.value)}
                      placeholder="Paste 1-2 bullet points from your resume to anchor the AI bio..."
                      className="w-full mt-1 px-4 py-2.5 rounded-lg bg-slate-900 border border-white/[0.08] text-white text-xs leading-relaxed focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/[0.08] text-xs font-semibold text-slate-300 flex items-center gap-2"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button
                    onClick={handleGenerateDraft}
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Synthesizing Copy...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={14} />
                        <span>Draft Copy & Recommend Styles →</span>
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
                className="space-y-8"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono mb-2">
                    <ShieldCheck size={12} /> Step 4: Zero-Hallucination Review & Approval
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white">
                    Review and approve your portfolio copy.
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Every word below was generated strictly from your stated roles ({targetRoles.join(", ")}) and strengths ({topStrengths.join(", ")}). You have complete editing control.
                  </p>
                </div>

                {/* Headline Editor */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-slate-400 flex items-center justify-between">
                    <span>Generated Professional Headline</span>
                    <span className="text-emerald-400 text-[10px]">Editable</span>
                  </label>
                  <input
                    type="text"
                    value={draftHeadline}
                    onChange={(e) => setDraftHeadline(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-white/[0.08] text-white text-sm font-semibold focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Bio Editor */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-slate-400 flex items-center justify-between">
                    <span>Generated Profile Bio ({tone.toUpperCase()} tone)</span>
                    <span className="text-emerald-400 text-[10px]">Editable</span>
                  </label>
                  <textarea
                    rows={4}
                    value={draftBio}
                    onChange={(e) => setDraftBio(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-white/[0.08] text-white text-xs leading-relaxed focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Recommended Styles Picker */}
                <div className="space-y-3">
                  <label className="text-xs font-mono uppercase text-slate-400">
                    Recommended Architecture For You
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "developer-terminal", name: "Developer Terminal", desc: "Bash chrome, CLI prompts, Git history" },
                      { id: "minimal-editorial", name: "Minimal Editorial", desc: "Serif typography, generous whitespace" },
                      { id: "bold-poster", name: "Bold Poster", desc: "High-contrast neo-grotesque display headers" },
                    ].map((theme) => {
                      const isSelected = selectedThemeId === theme.id;
                      const isTopMatch = recommendedThemeIds[0] === theme.id;
                      return (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => setSelectedThemeId(theme.id)}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            isSelected
                              ? "bg-emerald-500/10 border-emerald-500 text-white shadow-md shadow-emerald-500/10"
                              : "bg-slate-900 border-white/[0.08] text-slate-400 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-white">{theme.name}</span>
                            {isTopMatch && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500 text-slate-950">
                                TOP MATCH
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400">{theme.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Mandatory Approval Checkbox */}
                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="approvalCheckbox"
                    checked={isApproved}
                    onChange={(e) => setIsApproved(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 bg-slate-900 border-white/20"
                  />
                  <label htmlFor="approvalCheckbox" className="text-xs text-slate-300 leading-relaxed cursor-pointer">
                    <strong className="text-white">Factual Accuracy Confirmation:</strong> I confirm that this headline, bio, and experience data accurately represent my real background and do not contain false claims, unverified metrics, or unauthorized external branding.
                  </label>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep(3)}
                    className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/[0.08] text-xs font-semibold text-slate-300 flex items-center gap-2"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button
                    onClick={handleApproveAndPublish}
                    disabled={!isApproved || isSubmitting}
                    className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Publishing Live...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={14} />
                        <span>Approve & Launch My Live Portfolio</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      {/* Footer info */}
      <footer className="border-t border-white/[0.08] py-4 px-6 text-center text-xs text-slate-500 font-mono">
        FolioVeda Smart Intake • Zero Hallucination Engine • Live Recruiter Proof
      </footer>
    </div>
  );
}
