"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Code, 
  Layout, 
  Palette, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Briefcase, 
  ExternalLink, 
  Copy, 
  Check, 
  Globe,
  Terminal,
  Layers,
  TrendingUp
} from "lucide-react";
import { FolioVedaLogo } from "@/components/ui/Logo";
import Link from "next/link";

type Step = 1 | 2 | 3 | 4;

interface TemplateOption {
  id: "template1" | "template2" | "template3";
  name: string;
  category: string;
  tagline: string;
  accent: string;
  icon: any;
  preview: {
    bg: string;
    elements: string[];
  };
}

const TEMPLATES: TemplateOption[] = [
  {
    id: "template1",
    name: "The Developer Studio",
    category: "Software & Engineering",
    tagline: "Terminal aesthetics, tech stack badges, synced GitHub repos, and dark mode.",
    accent: "from-blue-600 to-indigo-600",
    icon: Terminal,
    preview: {
      bg: "bg-slate-950 border-slate-800",
      elements: ["<Alex.Dev />", "const stack = ['Next.js', 'Prisma', 'AI']", "● pf-ecommerce-engine"],
    },
  },
  {
    id: "template2",
    name: "The Creative Designer",
    category: "Design & Creative",
    tagline: "Masonry gallery layout, bold editorial typography, and high-impact visual cards.",
    accent: "from-pink-600 to-rose-600",
    icon: Palette,
    preview: {
      bg: "bg-zinc-900 border-zinc-800",
      elements: ["Selected Works", "Grid Layout", "Case Studies & Visuals"],
    },
  },
  {
    id: "template3",
    name: "The Executive / Business",
    category: "Product & Leadership",
    tagline: "Clean chronological experience timeline, business metrics, and strategic impact.",
    accent: "from-emerald-600 to-teal-600",
    icon: TrendingUp,
    preview: {
      bg: "bg-stone-950 border-stone-800",
      elements: ["Executive Impact", "10x Revenue Strategy", "Leadership Timeline"],
    },
  },
];

export default function OnboardingWizard() {
  const [step, setStep] = useState<Step>(1);
  const [githubConnected, setGithubConnected] = useState(false);
  const [profession, setProfession] = useState("engineer");
  const [selectedTemplate, setSelectedTemplate] = useState<"template1" | "template2" | "template3">("template1");
  const [username, setUsername] = useState("alex");
  
  // Generation & Live URL state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStage, setGenerationStage] = useState("Attaching template...");
  const [liveUrl, setLiveUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const nextStep = () => setStep((s) => (s < 4 ? ((s + 1) as Step) : 4));

  const handleGithubConnect = () => {
    setGithubConnected(true);
    setTimeout(() => nextStep(), 800);
  };

  const handleBuildPortfolio = async () => {
    nextStep(); // Move to Step 4
    setIsGenerating(true);

    const cleanUsername = username.trim() || "alex";

    try {
      setGenerationStage("Connecting selected template...");
      await new Promise((r) => setTimeout(r, 600));

      setGenerationStage("Injecting GitHub repositories & bio...");
      await new Promise((r) => setTimeout(r, 600));

      setGenerationStage("Publishing live portfolio to database...");

      // Call real backend API to attach template and persist user portfolio
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanUsername,
          templateId: selectedTemplate,
          bio: profession === "designer" 
            ? "Senior Product & UI/UX Designer crafting delightful digital experiences."
            : profession === "business"
            ? "Product & Strategy Leader scaling operations and revenue."
            : "Full-Stack Engineer building high-performance modern web apps.",
          skills: profession === "designer"
            ? "Figma, Design Systems, Prototyping, UI/UX"
            : profession === "business"
            ? "Product Strategy, Growth, SQL, Analytics"
            : "Next.js, TypeScript, React, Node.js, SQLite",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setLiveUrl(data.liveUrl || `/p/${encodeURIComponent(cleanUsername)}`);
      } else {
        setLiveUrl(`/p/${encodeURIComponent(cleanUsername)}`);
      }
    } catch (err) {
      console.error(err);
      setLiveUrl(`/p/${encodeURIComponent(cleanUsername)}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyLiveLink = () => {
    if (!liveUrl) return;
    const fullUrl = `${window.location.origin}${liveUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-slate-950 text-slate-100 font-sans">
      
      {/* Brand Header */}
      <div className="mb-6">
        <Link href="/">
          <FolioVedaLogo size="lg" showBadge={true} />
        </Link>
      </div>

      <div className="w-full max-w-3xl bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl">
        
        {/* Top Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        <div className="p-6 md:p-10 min-h-[460px] flex flex-col justify-center relative">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Connect GitHub */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col items-center text-center space-y-6 max-w-lg mx-auto"
              >
                <div className="w-16 h-16 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center text-emerald-400 mb-1 shadow-inner">
                  <Code2 size={32} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white">Connect Your Projects</h2>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                    FolioVeda automatically pulls your repositories, commits, and tech stacks so you never have to manually copy-paste.
                  </p>
                </div>

                <div className="w-full space-y-3">
                  <button
                    onClick={handleGithubConnect}
                    disabled={githubConnected}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                  >
                    {githubConnected ? (
                      <>
                        <CheckCircle2 size={18} /> <span>Projects Synced Successfully!</span>
                      </>
                    ) : (
                      <>
                        <Globe size={18} /> <span>Auto-Sync GitHub Projects</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={nextStep}
                    className="text-xs text-slate-400 hover:text-white transition-colors py-1 block mx-auto"
                  >
                    Skip GitHub sync &bull; Use starter project data &rarr;
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Choose Profession */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white">What is your primary focus?</h2>
                  <p className="text-slate-400 text-xs md:text-sm mt-1">
                    We tailor your portfolio layout and tone to what hiring managers look for.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: "engineer", icon: Code, label: "Software Engineer", desc: "Full-Stack, Backend, Web3, Mobile", template: "template1" },
                    { id: "designer", icon: Palette, label: "UI/UX & Creative", desc: "Product Design, 3D, Visual Media", template: "template2" },
                    { id: "business", icon: Briefcase, label: "Business & Leader", desc: "Product Managers, Founders, Strategy", template: "template3" },
                  ].map((job) => {
                    const Icon = job.icon;
                    const isSelected = profession === job.id;
                    return (
                      <button
                        key={job.id}
                        onClick={() => {
                          setProfession(job.id);
                          setSelectedTemplate(job.template as any);
                        }}
                        className={`flex flex-col items-start p-5 border-2 rounded-2xl text-left transition-all ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10"
                            : "border-slate-800 hover:border-slate-700 bg-slate-900/60"
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl mb-3 ${isSelected ? "bg-emerald-500 text-slate-950 font-bold" : "bg-slate-800 text-slate-300"}`}>
                          <Icon size={20} />
                        </div>
                        <span className="font-bold text-white text-base">{job.label}</span>
                        <span className="text-xs text-slate-400 mt-1">{job.desc}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    &larr; Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-500/20"
                  >
                    <span>Choose Template</span> <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: SELECT TEMPLATE & SET USERNAME */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center">
                    Select Your Live Template
                  </h2>
                  <p className="text-slate-400 text-xs md:text-sm text-center mt-1">
                    Click the template you want. Our engine attaches your projects into this layout immediately.
                  </p>
                </div>

                {/* 3 Real Templates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {TEMPLATES.map((t) => {
                    const isSelected = selectedTemplate === t.id;
                    const Icon = t.icon;

                    return (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTemplate(t.id)}
                        className={`cursor-pointer rounded-2xl border-2 transition-all p-4 flex flex-col justify-between ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/30 shadow-lg"
                            : "border-slate-800 hover:border-slate-700 bg-slate-900/60"
                        }`}
                      >
                        {/* Mock Wireframe Preview */}
                        <div className={`w-full h-28 rounded-xl border p-2.5 flex flex-col justify-between mb-3 text-[10px] font-mono select-none ${t.preview.bg}`}>
                          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                            <span className="text-slate-300 font-bold">{t.preview.elements[0]}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          </div>
                          <div className="text-slate-400 py-1 text-[9px] line-clamp-1">
                            {t.preview.elements[1]}
                          </div>
                          <div className="bg-white/5 rounded px-1.5 py-0.5 text-slate-300 text-[9px]">
                            {t.preview.elements[2]}
                          </div>
                        </div>

                        {/* Template Details */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-white text-sm">{t.name}</h3>
                            <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? "bg-emerald-400 ring-2 ring-emerald-400/40" : "bg-slate-700"}`} />
                          </div>
                          <p className="text-[11px] text-slate-400 leading-snug">{t.tagline}</p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-800 text-center">
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? "text-emerald-400" : "text-slate-500"}`}>
                            {isSelected ? "Active Choice" : "Select Template"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Custom Username & Live URL Input */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Globe size={16} className="text-emerald-400 shrink-0" />
                    <span className="text-xs text-slate-300 font-semibold whitespace-nowrap">Your Live URL:</span>
                    <span className="text-xs text-slate-500 hidden sm:inline">localhost:3000/p/</span>
                  </div>

                  <div className="flex items-center gap-1 w-full sm:w-auto">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
                      placeholder="username"
                      className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-mono text-emerald-400 font-bold focus:outline-none focus:border-emerald-500 w-full sm:w-40 text-center sm:text-left"
                    />
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    &larr; Back
                  </button>

                  <button
                    onClick={handleBuildPortfolio}
                    className="flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/20 hover:scale-105"
                  >
                    <Sparkles size={16} />
                    <span>Attach &amp; Launch Live Portfolio</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: GENERATION & CELEBRATION */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center space-y-6 py-6"
              >
                {isGenerating ? (
                  <>
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-slate-800 border-t-emerald-500 rounded-full animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles size={24} className="text-emerald-400 animate-pulse" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h2 className="text-2xl font-bold text-white">Forging Your Live Portfolio...</h2>
                      <p className="text-sm font-medium text-emerald-400 animate-pulse font-mono">
                        {generationStage}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Success Celebratory Badge */}
                    <div className="w-20 h-20 bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                      <CheckCircle2 size={42} />
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">
                        🎉 Your Live Portfolio Is Published!
                      </h2>
                      <p className="text-sm text-slate-300 max-w-md mx-auto">
                        We attached <strong className="text-emerald-400">{TEMPLATES.find(t => t.id === selectedTemplate)?.name}</strong> to your profile and activated your live public URL.
                      </p>
                    </div>

                    {/* Live URL Link Box */}
                    <div className="w-full max-w-md bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 shadow-inner">
                      <div className="text-left font-mono text-xs overflow-hidden">
                        <span className="text-slate-500">Live URL: </span>
                        <span className="text-emerald-400 font-bold underline">
                          {typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}{liveUrl}
                        </span>
                      </div>

                      <button
                        onClick={copyLiveLink}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
                        title="Copy live link"
                      >
                        {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                        <span>{copied ? "Copied!" : "Copy"}</span>
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md pt-2">
                      <a
                        href={liveUrl || `/p/${username}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
                      >
                        <ExternalLink size={15} />
                        <span>View Live Portfolio</span>
                      </a>

                      <Link
                        href="/portfolio/preview"
                        className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                      >
                        <Sparkles size={15} className="text-emerald-400" />
                        <span>AI Studio Editor</span>
                      </Link>
                    </div>
                  </>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
