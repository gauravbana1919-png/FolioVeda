"use client";

import { useState, useRef } from "react";
import * as Diff from "diff";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Link from "next/link";
import { FolioVedaLogo } from "@/components/ui/Logo";

export default function ResumeTailorPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [originalResume, setOriginalResume] = useState(
    "Software Engineer with 3 years of experience in React and Node.js. Built scalable web applications."
  );

  const [tailoredResume, setTailoredResume] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [exportFormat, setExportFormat] = useState<"ats" | "visual">("ats");
  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async (format: "ats" | "visual") => {
    if (!resumeRef.current) return;
    setExportFormat(format);
    setExporting(true);

    try {
      // Brief delay to let format state settle before capture
      await new Promise((r) => setTimeout(r, 100));
      const canvas = await html2canvas(resumeRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`tailored_resume_${format}.pdf`);
    } catch (err) {
      console.error("PDF Export failed", err);
    } finally {
      setExporting(false);
    }
  };

  const handleTailor = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/resume/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "clq123", // Mock user ID for now since auth isn't wired to the UI yet
          originalResume,
          jobDescription,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setTailoredResume(data.tailoredContent);
      setScore(data.keywordMatchScore);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(tailoredResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderDiff = () => {
    if (!tailoredResume) return null;

    const diff = Diff.diffWords(originalResume, tailoredResume);

    return (
      <div className="p-5 bg-white rounded-xl text-sm leading-relaxed border border-slate-200 font-sans max-h-96 overflow-y-auto">
        {diff.map((part, index) => {
          const cls = part.added
            ? "bg-emerald-100/80 text-emerald-900 font-semibold px-1 rounded mx-0.5"
            : part.removed
            ? "bg-rose-100 text-rose-700 line-through px-1 rounded mx-0.5 opacity-70"
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

  // Clean, professional resume renderer
  const renderResumeContent = (content: string, isPdfTarget = false, mode: "ats" | "visual" = "visual") => {
    if (!content) return null;

    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];

    const flushList = (keyPrefix: number) => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`ul-${keyPrefix}`} className="my-2.5 space-y-1.5 pl-1">
            {currentList.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-700">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#991B1B] mt-1.5 shrink-0" />
                <span className="flex-1">{formatInlineText(item)}</span>
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

      // Title (# )
      if (trimmed.startsWith("# ")) {
        elements.push(
          <div key={`h1-${index}`} className="mb-4 pb-2 border-b-2 border-slate-900">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {trimmed.slice(2)}
            </h1>
          </div>
        );
      }
      // Section Header (## )
      else if (trimmed.startsWith("## ")) {
        elements.push(
          <div key={`h2-${index}`} className="mt-5 mb-2.5 flex items-center gap-2">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#991B1B]">
              {trimmed.slice(3)}
            </h2>
            <div className="flex-1 h-px bg-slate-200" />
          </div>
        );
      }
      // Subsection (### )
      else if (trimmed.startsWith("### ")) {
        elements.push(
          <h3 key={`h3-${index}`} className="text-sm font-bold text-slate-900 mt-3 mb-1">
            {trimmed.slice(4)}
          </h3>
        );
      }
      // Standard paragraph
      else {
        elements.push(
          <p key={`p-${index}`} className="text-[13px] leading-relaxed text-slate-700 my-1 font-normal">
            {formatInlineText(trimmed)}
          </p>
        );
      }
    });

    flushList(lines.length);

    return (
      <div className={`font-sans ${isPdfTarget ? "p-8" : "p-6"}`}>
        {mode === "visual" && (
          <div className="w-12 h-1 bg-[#991B1B] rounded-full mb-4" />
        )}
        {elements}
      </div>
    );
  };

  // Score badge color
  const scoreBadgeStyle =
    score !== null
      ? score > 70
        ? { bg: "bg-green-100", text: "text-green-800", border: "border-green-300" }
        : score >= 40
        ? { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-300" }
        : { bg: "bg-red-100", text: "text-red-700", border: "border-red-300" }
      : null;

  return (
    <div style={{ background: "#F8F9FA", minHeight: "100vh" }}>
      {/* ── Sticky Top Bar ── */}
      <header
        style={{ borderBottom: "2px solid #991B1B" }}
        className="sticky top-0 z-50 bg-white shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Left: Logo */}
          <FolioVedaLogo size="sm" showBadge={true} />

          {/* Center: Title */}
          <h2
            className="hidden sm:block text-base font-bold tracking-tight"
            style={{ color: "#1E293B" }}
          >
            AI Resume Tailor
          </h2>

          {/* Right: Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
            style={{ color: "#991B1B" }}
          >
            ← Back
          </Link>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-8 text-center">
        <h1
          className="text-4xl sm:text-5xl font-black tracking-tight mb-4 leading-tight"
          style={{ color: "#1E293B" }}
        >
          One Job. One Resume.{" "}
          <span style={{ color: "#991B1B" }}>Perfect Match.</span>
        </h1>
        <p className="text-lg font-medium max-w-2xl mx-auto mb-8" style={{ color: "#475569" }}>
          Paste your resume and a job description. Gemini AI restructures your actual experience
          to match — no fabrication, ever.
        </p>

        {/* Stat Pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { icon: "🔒", label: "Never invents skills" },
            { icon: "⚡", label: "Powered by Gemini AI" },
            { icon: "📄", label: "Export as PDF" },
          ].map((pill) => (
            <span
              key={pill.label}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border"
              style={{
                background: "#fff",
                color: "#1E293B",
                borderColor: "#1E293B22",
              }}
            >
              <span>{pill.icon}</span>
              {pill.label}
            </span>
          ))}
        </div>
      </section>

      {/* ── Two-Column Layout ── */}
      <main className="max-w-6xl mx-auto px-6 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* ── LEFT: Inputs ── */}
        <div className="space-y-5">
          {/* Resume Textarea */}
          <div>
            <label
              className="block text-sm font-bold mb-2 uppercase tracking-wide"
              style={{ color: "#1E293B" }}
            >
              Your Resume
            </label>
            <textarea
              value={originalResume}
              onChange={(e) => setOriginalResume(e.target.value)}
              className="w-full h-56 p-4 rounded-xl border-2 text-sm leading-relaxed resize-none focus:outline-none transition-colors"
              style={{
                borderColor: "#CBD5E1",
                background: "#fff",
                color: "#1E293B",
                fontFamily: "inherit",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#991B1B")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#CBD5E1")}
              placeholder="Paste your full resume here..."
            />
          </div>

          {/* Job Description Textarea */}
          <div>
            <label
              className="block text-sm font-bold mb-2 uppercase tracking-wide"
              style={{ color: "#1E293B" }}
            >
              Target Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full h-56 p-4 rounded-xl border-2 text-sm leading-relaxed resize-none focus:outline-none transition-colors"
              style={{
                borderColor: "#CBD5E1",
                background: "#fff",
                color: "#1E293B",
                fontFamily: "inherit",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#991B1B")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#CBD5E1")}
              placeholder="Paste the full job description..."
            />
          </div>

          {/* CTA Button */}
          <button
            onClick={handleTailor}
            disabled={loading || !jobDescription.trim() || !originalResume.trim()}
            className="w-full py-4 px-6 rounded-xl font-black text-base text-white transition-opacity flex items-center justify-center gap-3"
            style={{
              background: "#991B1B",
              opacity: loading || !jobDescription.trim() || !originalResume.trim() ? 0.55 : 1,
              cursor:
                loading || !jobDescription.trim() || !originalResume.trim()
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {loading ? (
              <>
                {/* Spinner */}
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Tailoring with Gemini AI...
              </>
            ) : (
              "Tailor My Resume →"
            )}
          </button>

          {/* Error */}
          {error && (
            <div
              className="p-4 rounded-xl text-sm font-bold border"
              style={{
                background: "#FEE2E2",
                color: "#991B1B",
                borderColor: "#FECACA",
              }}
            >
              ⚠ {error}
            </div>
          )}
        </div>

        {/* ── RIGHT: Output ── */}
        <div className="space-y-5">
          {/* Empty state */}
          {!tailoredResume && !loading && (
            <div
              className="min-h-[480px] rounded-2xl flex flex-col items-center justify-center gap-4 border-2 border-dashed"
              style={{ borderColor: "#CBD5E1", background: "#fff" }}
            >
              <span className="text-5xl">📄</span>
              <p className="text-base font-bold text-center px-6" style={{ color: "#94A3B8" }}>
                Your AI-tailored resume will appear here
              </p>
            </div>
          )}

          {/* Loading skeleton */}
          {loading && (
            <div
              className="min-h-[480px] rounded-2xl p-6 space-y-4"
              style={{ background: "#fff", border: "1px solid #E2E8F0" }}
            >
              {[100, 90, 75, 85, 60, 80, 70].map((w, i) => (
                <div
                  key={i}
                  className="h-4 rounded-full animate-pulse"
                  style={{ width: `${w}%`, background: "#E2E8F0" }}
                />
              ))}
              <div className="pt-2 space-y-3">
                {[95, 65, 88].map((w, i) => (
                  <div
                    key={i}
                    className="h-4 rounded-full animate-pulse"
                    style={{ width: `${w}%`, background: "#E2E8F0", animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Result */}
          {tailoredResume && !loading && (
            <>
              {/* Score Badge */}
              {score !== null && scoreBadgeStyle && (
                <div
                  className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl border-2 ${scoreBadgeStyle.bg} ${scoreBadgeStyle.border}`}
                >
                  <span
                    className={`text-4xl font-black ${scoreBadgeStyle.text}`}
                  >
                    {score}%
                  </span>
                  <div>
                    <div className={`text-xs font-bold uppercase tracking-wider ${scoreBadgeStyle.text}`}>
                      Keyword Match Score
                    </div>
                    <div className={`text-xs font-medium ${scoreBadgeStyle.text} opacity-70`}>
                      {score > 70 ? "Strong match" : score >= 40 ? "Moderate match" : "Low match"}
                    </div>
                  </div>
                </div>
              )}

              {/* Diff View */}
              <div
                className="rounded-2xl overflow-hidden border"
                style={{ borderColor: "#E2E8F0" }}
              >
                <div
                  className="px-4 py-3 flex items-center justify-between text-sm font-bold"
                  style={{ background: "#1E293B", color: "#fff" }}
                >
                  <span>Before / After Diff</span>
                  <span className="text-xs font-medium opacity-60">
                    Green = Added · Red = Removed
                  </span>
                </div>
                {renderDiff()}
              </div>

              {/* Full Tailored Resume Card */}
              <div
                className="rounded-2xl border overflow-hidden"
                style={{ borderColor: "#E2E8F0", background: "#fff" }}
              >
                <div
                  className="px-4 py-3 flex items-center justify-between border-b"
                  style={{ borderColor: "#E2E8F0", background: "#F8F9FA" }}
                >
                  <span className="text-sm font-black" style={{ color: "#1E293B" }}>
                    Full Tailored Resume
                  </span>
                  <button
                    onClick={handleCopy}
                    className="text-xs font-bold px-3 py-1 rounded-lg transition-colors"
                    style={{
                      background: copied ? "#D1FAE5" : "#1E293B",
                      color: copied ? "#065F46" : "#fff",
                    }}
                  >
                    {copied ? "✓ Copied!" : "Copy"}
                  </button>
                </div>
                <div
                  className="max-h-96 overflow-y-auto bg-white"
                >
                  {renderResumeContent(tailoredResume, false, "visual")}
                </div>
              </div>

              {/* Export Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleExportPDF("ats")}
                  disabled={exporting}
                  className="py-3 px-4 rounded-xl text-sm font-black border-2 transition-opacity flex items-center justify-center gap-2"
                  style={{
                    borderColor: "#1E293B",
                    color: "#1E293B",
                    background: "#fff",
                    opacity: exporting ? 0.55 : 1,
                  }}
                >
                  📄 Download ATS PDF
                </button>
                <button
                  onClick={() => handleExportPDF("visual")}
                  disabled={exporting}
                  className="py-3 px-4 rounded-xl text-sm font-black transition-opacity flex items-center justify-center gap-2"
                  style={{
                    background: "#991B1B",
                    color: "#fff",
                    opacity: exporting ? 0.55 : 1,
                  }}
                >
                  🎨 Download Visual PDF
                </button>
              </div>
              {exporting && (
                <p className="text-xs font-bold text-center" style={{ color: "#64748B" }}>
                  Generating high-resolution PDF…
                </p>
              )}
            </>
          )}
        </div>
      </main>

      {/* Hidden PDF Render Target */}
      {tailoredResume && (
        <div className="absolute left-[-9999px] top-0">
          <div
            ref={resumeRef}
            className={`w-[800px] bg-white text-slate-900 ${
              exportFormat === "visual" ? "font-sans" : "font-sans"
            }`}
            style={{ minHeight: "1100px" }}
          >
            {renderResumeContent(tailoredResume, true, exportFormat)}
          </div>
        </div>
      )}
    </div>
  );
}
