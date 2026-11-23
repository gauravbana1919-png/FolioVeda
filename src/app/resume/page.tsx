"use client";

import { useEffect, useState, useRef } from "react";
import * as Diff from "diff";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import Link from "next/link";
import { FolioVedaLogo } from "@/components/ui/Logo";
import { markdownFromRecord, namesMatch, parsePastedResume } from "@/lib/resume/from-text";
import { PERSONA_PROFILES } from "@/lib/personas";
import { 
  FileText, 
  Sparkles, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  ShieldCheck, 
  ArrowLeft, 
  RefreshCw, 
  Sliders, 
  Eye, 
  CheckCircle2, 
  Laptop, 
  Briefcase 
} from "lucide-react";

export default function ResumeTailorPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [originalResume, setOriginalResume] = useState("");

  const [tailoredResume, setTailoredResume] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"preview" | "diff">("preview");
  const [fontFamily, setFontStyle] = useState<"sans" | "serif">("sans");

  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedName = params.get("name") || params.get("username") || "";

    const applyMarkdown = (markdown: string) => {
      if (!markdown.trim()) return;
      setOriginalResume(markdown);
      setTailoredResume("");
      setScore(null);
    };

    try {
      const cached = localStorage.getItem("folioveda_active_profile");
      if (cached) {
        const extracted = JSON.parse(cached);
        if (extracted?.name && (!requestedName || namesMatch(extracted.name, requestedName))) {
          applyMarkdown(markdownFromRecord(extracted));
        }
      }
    } catch {
      // Ignore unreadable local drafts.
    }

    if (!requestedName) return;

    const persona = Object.values(PERSONA_PROFILES).find((profile) => namesMatch(profile.name, requestedName));
    if (persona) applyMarkdown(markdownFromRecord(persona.content));

    let cancelled = false;
    fetch(`/api/portfolio?name=${encodeURIComponent(requestedName)}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled || data?.isMock || !data?.user?.name) return;
        if (!namesMatch(data.user.name, requestedName)) return;
        applyMarkdown(markdownFromRecord(data.user));
      })
      .catch(() => {
        // The pasted or saved draft remains on screen.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = async () => {
    if (!originalResume.trim() && !tailoredResume.trim()) {
      setError("Please paste or generate your resume before exporting to PDF.");
      return;
    }

    // If currently on diff view, switch to document sheet so canvas element is mounted
    if (activeTab === "diff") {
      setActiveTab("preview");
      await new Promise((r) => setTimeout(r, 200));
    }

    if (!resumeRef.current) {
      window.print();
      return;
    }

    setExporting(true);
    setError("");

    try {
      await new Promise((r) => setTimeout(r, 200));
      const canvas = await html2canvas(resumeRef.current, {
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
      const nameMatch = (tailoredResume || originalResume).match(/^#\s+(.+)$/m);
      const safeName = (nameMatch?.[1] || "Resume").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "_");
      pdf.save(`${safeName || "Resume"}_Resume.pdf`);
    } catch (err) {
      console.warn("Canvas-based export had an issue, opening print-to-PDF:", err);
      // Seamless fallback to browser native print-to-PDF dialog
      window.print();
    } finally {
      setExporting(false);
    }
  };

  const handleGenerate = async () => {
    if (!originalResume.trim()) {
      setError("Please paste your resume details, LinkedIn summary, or career history first.");
      return;
    }
    setGenerating(true);
    setError("");

    try {
      const res = await fetch("/api/intake/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText: originalResume }),
      });
      const data = await res.json();
      if (data?.extracted) {
        const formatted = markdownFromRecord(data.extracted);
        if (formatted && formatted.trim().length > 30) {
          setOriginalResume(formatted);
          setTailoredResume("");
          setScore(null);
          setActiveTab("preview");
          return;
        }
      }
      // Fallback to local parsing
      const built = parsePastedResume(originalResume);
      setOriginalResume(built.markdown);
      setTailoredResume("");
      setScore(null);
      setActiveTab("preview");
    } catch {
      const built = parsePastedResume(originalResume);
      setOriginalResume(built.markdown);
      setTailoredResume("");
      setScore(null);
      setActiveTab("preview");
    } finally {
      setGenerating(false);
    }
  };

  const handleTailor = async () => {
    const source = parsePastedResume(originalResume);
    if (!source.markdown.trim() || !originalResume.trim()) {
      setError("Paste this person's details before tailoring the resume.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/resume/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "clq123",
          originalResume: source.markdown,
          jobDescription: jobDescription.trim() || "Keep the candidate's real experience. Do not add employers, titles, dates, or metrics that are not in the original resume.",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong tailoring your resume.");
      }

      setTailoredResume(data.tailoredContent);
      setScore(data.keywordMatchScore);
      setActiveTab("preview");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const textToCopy = tailoredResume || originalResume;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderDiff = () => {
    if (!tailoredResume) return null;

    const diff = Diff.diffWords(originalResume, tailoredResume);

    return (
      <div className="p-6 bg-white rounded-2xl text-xs sm:text-sm leading-relaxed border border-slate-200 font-sans max-h-[600px] overflow-y-auto">
        <div className="mb-4 pb-3 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Comparative Keyword Audit</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Tailored &amp; Emphasized
            </span>
            <span className="flex items-center gap-1 text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
              <span className="w-2 h-2 rounded-full bg-rose-400" /> Deprioritized Fluff
            </span>
          </div>
        </div>
        {diff.map((part, index) => {
          const cls = part.added
            ? "bg-emerald-100/90 text-emerald-900 font-semibold px-1 rounded mx-0.5"
            : part.removed
            ? "bg-rose-100 text-rose-700 line-through px-1 rounded mx-0.5 opacity-60"
            : "text-slate-700";
          return (
            <span key={index} className={cls}>
              {part.value}
            </span>
          );
        })}
      </div>
    );
  };

  // Helper to format inline markdown like **bold** into JSX
  const formatInlineText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-bold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  // Recruiter-grade Executive ATS resume renderer
  const renderResumeContent = (content: string) => {
    if (!content) return null;

    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];

    const flushList = (keyPrefix: number) => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`ul-${keyPrefix}`} className="my-1.5 space-y-1 pl-4 list-disc text-slate-800 marker:text-slate-600">
            {currentList.map((item, idx) => (
              <li key={idx} className="text-[12.5px] sm:text-[13px] leading-snug">
                {formatInlineText(item)}
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Check bullet point
      if (trimmed.startsWith("* ") || trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
        currentList.push(trimmed.slice(2));
        return;
      }

      // If not bullet, flush any accumulated list items
      flushList(index);

      if (!trimmed) {
        return;
      }

      // Candidate Name (# )
      if (trimmed.startsWith("# ")) {
        elements.push(
          <div key={`h1-${index}`} className="text-center pb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-900">
              {trimmed.slice(2)}
            </h1>
          </div>
        );
      }
      // Section Header (## )
      else if (trimmed.startsWith("## ")) {
        elements.push(
          <div key={`h2-${index}`} className="mt-4 mb-2 pb-1 border-b border-slate-900">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {trimmed.slice(3)}
            </h2>
          </div>
        );
      }
      // Subsection / Role entry (### )
      else if (trimmed.startsWith("### ")) {
        const rawTitle = trimmed.slice(4);
        // Parse Title — Company | Dates | Location
        const parts = rawTitle.split("|").map((p) => p.trim());
        const leftSide = parts[0] || "";
        const dates = parts[1] || "";
        const location = parts[2] || "";

        elements.push(
          <div key={`h3-${index}`} className="flex flex-col sm:flex-row sm:items-baseline justify-between mt-2.5 mb-1 text-slate-900 text-xs sm:text-sm">
            <div className="font-bold">
              {formatInlineText(leftSide)}
            </div>
            {(dates || location) && (
              <div className="text-slate-600 text-[11px] sm:text-xs font-medium sm:text-right shrink-0">
                {dates} {location && `• ${location}`}
              </div>
            )}
          </div>
        );
      }
      // Header Contact / Social Line (detected by email/pipe/dot)
      else if (index < 4 && (trimmed.includes("@") || trimmed.includes("•") || trimmed.includes("|"))) {
        elements.push(
          <p key={`contact-${index}`} className="text-center text-[11px] sm:text-xs text-slate-600 font-medium pb-2 border-b border-slate-200">
            {trimmed}
          </p>
        );
      }
      // Standard paragraph
      else {
        elements.push(
          <p key={`p-${index}`} className="text-[12.5px] sm:text-[13px] leading-relaxed text-slate-800 my-1 font-normal">
            {formatInlineText(trimmed)}
          </p>
        );
      }
    });

    flushList(lines.length);

    return (
      <div 
        className="w-full text-slate-900 select-text"
        style={{
          fontFamily: fontFamily === "serif" ? "Georgia, 'Times New Roman', serif" : "var(--font-sans-main), -apple-system, sans-serif",
        }}
      >
        {elements}
      </div>
    );
  };

  const displayedResume = tailoredResume || originalResume;

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-slate-900 flex flex-col antialiased selection:bg-[#173f32] selection:text-[#f7f4eb]">
      
      {/* ── STICKY APPLICATION NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs print:hidden">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <FolioVedaLogo size="sm" />
            </Link>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider hidden sm:inline">
              ATS Resume Studio
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 transition-all"
            >
              ← Back to Overview
            </Link>
            <Link
              href="/onboarding"
              className="text-xs font-bold bg-[#173f32] text-[#f7f4eb] hover:bg-[#13352a] px-4 py-2 rounded-full transition-all shadow-xs"
            >
              Generate Portfolio →
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO HEADER ── */}
      <section className="bg-white border-b border-slate-200 px-6 py-8 print:hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>Zero-Hallucination ATS Architecture</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              ATS-Optimized Executive Resume Tailor
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl">
              Align your genuine engineering trajectory to any job description. Formatted to guarantee 100% parseability by Workday, Greenhouse, Lever, and enterprise ATS crawlers.
            </p>
          </div>

          {score !== null && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4 shrink-0 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-extrabold text-lg flex items-center justify-center shadow-xs">
                {score}%
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  Match Score
                </span>
                <span className="text-xs font-bold text-emerald-800">
                  {score >= 70 ? "High Relevance Match" : "Moderate Alignment"}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── MAIN WORKSPACE CONTAINER ── */}
      <main className="max-w-7xl mx-auto w-full px-6 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ── LEFT: INPUTS & TAILORING CONTROLS (5 COLS) ── */}
        <div className="lg:col-span-5 space-y-6 print:hidden">
          
          {/* Target Job Description */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Briefcase size={14} className="text-[#173f32]" />
                <span>Target Job Description</span>
              </label>
              <span className="text-[11px] text-slate-400 font-medium">Paste job specs</span>
            </div>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={6}
              placeholder="Paste job title, qualifications, and requirements..."
              className="w-full text-xs font-mono p-3.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#173f32] focus:ring-1 focus:ring-[#173f32] bg-slate-50 text-slate-800 leading-relaxed"
            />
          </div>

          {/* Original Resume Markdown */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <FileText size={14} className="text-[#173f32]" />
                <span>Your Master Resume (Markdown)</span>
              </label>
              <span className="text-[11px] text-slate-400 font-medium">Accurate details only</span>
            </div>
            <textarea
              value={originalResume}
              onChange={(e) => setOriginalResume(e.target.value)}
              rows={12}
              placeholder="Paste your existing resume, LinkedIn summary, or career history..."
              className="w-full text-xs font-mono p-3.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#173f32] focus:ring-1 focus:ring-[#173f32] bg-slate-50 text-slate-800 leading-relaxed"
            />
            <button
              onClick={handleGenerate}
              disabled={generating || !originalResume.trim()}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {generating ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Structuring &amp; Extracting Experience...</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} className="text-[#ebd800]" />
                  <span>⚡ Generate &amp; Format ATS Resume from Text</span>
                </>
              )}
            </button>
          </div>

          {/* Action Button */}
          <button
            onClick={handleTailor}
            disabled={loading || !originalResume.trim()}
            className="w-full py-4 rounded-2xl bg-[#173f32] hover:bg-[#13352a] text-[#f7f4eb] font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                <span>Analyzing &amp; Restructuring via Gemini AI...</span>
              </>
            ) : (
              <>
                <Briefcase size={16} className="text-[#ebd800]" />
                <span>🎯 Tailor Resume for Target Job (Zero Fluff)</span>
              </>
            )}
          </button>

          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* ── RIGHT: ATS RESUME SHEET PREVIEW (7 COLS) ── */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Top Controls Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs print:hidden">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "preview"
                    ? "bg-[#173f32] text-[#f7f4eb]"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Document Sheet
              </button>
              {tailoredResume && (
                <button
                  onClick={() => setActiveTab("diff")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "diff"
                      ? "bg-[#173f32] text-[#f7f4eb]"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Keyword Audit &amp; Diff
                </button>
              )}
            </div>

            {/* Typography Selector & Actions */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setFontStyle("sans")}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                    fontFamily === "sans"
                      ? "bg-white text-slate-900 shadow-2xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                  title="Modern Clean Sans Font"
                >
                  Modern Sans
                </button>
                <button
                  onClick={() => setFontStyle("serif")}
                  className={`px-2.5 py-1 text-[11px] font-serif font-bold rounded-lg transition-all ${
                    fontFamily === "serif"
                      ? "bg-white text-slate-900 shadow-2xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                  title="Classic Executive Serif Font"
                >
                  Classic Serif
                </button>
              </div>

              <button
                onClick={handleCopy}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
                title="Copy Resume Text"
              >
                {copied ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
              </button>
              <button
                onClick={handlePrint}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
                title="Print Document"
              >
                <Printer size={15} />
              </button>
              <button
                onClick={handleExportPDF}
                disabled={exporting}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs disabled:opacity-50"
              >
                <Download size={14} />
                <span>{exporting ? "Rendering..." : "Export PDF"}</span>
              </button>
            </div>
          </div>

          {/* Active View: Document vs Diff */}
          {activeTab === "diff" ? (
            renderDiff()
          ) : (
            /* ── A4 WHITE PAPER CANVAS ── */
            <div className="relative w-full flex justify-center overflow-x-auto pb-8">
              <div
                ref={resumeRef}
                id="resume-canvas-document"
                className="w-full max-w-[800px] bg-white rounded-md border border-slate-300 shadow-lg p-10 sm:p-14 text-slate-900 min-h-[1050px]"
                style={{
                  boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                }}
              >
                {renderResumeContent(displayedResume)}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-slate-200 py-6 px-6 print:hidden">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <FolioVedaLogo size="xs" />
            <span>•</span>
            <span className="font-normal text-slate-500">Recruiter Verified ATS Standards</span>
          </div>
          <p>© {new Date().getFullYear()} FolioVeda. Designed for genuine careers.</p>
        </div>
      </footer>
    </div>
  );
}
