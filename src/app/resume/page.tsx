"use client";

import { useState, useRef } from "react";
import * as Diff from "diff";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Download, FileText, Palette } from "lucide-react";

export default function ResumeTailorPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [originalResume, setOriginalResume] = useState("Software Engineer with 3 years of experience in React and Node.js. Built scalable web applications.");
  
  const [tailoredResume, setTailoredResume] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [exportFormat, setExportFormat] = useState<"ats" | "visual">("ats");
  const [exporting, setExporting] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!resumeRef.current) return;
    setExporting(true);
    
    try {
      const canvas = await html2canvas(resumeRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`tailored_resume_${exportFormat}.pdf`);
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
          jobDescription
        })
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

  const renderDiff = () => {
    if (!tailoredResume) return null;
    
    const diff = Diff.diffWords(originalResume, tailoredResume);
    
    return (
      <div className="p-4 bg-muted/50 rounded-lg whitespace-pre-wrap font-mono text-sm leading-relaxed">
        {diff.map((part, index) => {
          const color = part.added ? "bg-green-500/20 text-green-700 dark:text-green-400" 
            : part.removed ? "bg-red-500/20 text-red-700 dark:text-red-400 line-through" 
            : "text-foreground";
            
          return <span key={index} className={color}>{part.value}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6 pt-24">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Tailor Your Resume</h1>
      <p className="text-muted-foreground mb-8">
        Paste a job description below. Our AI will reorganize and emphasize your existing experience to match the role. 
        <strong className="text-foreground ml-1">It will never invent fake skills or experience.</strong>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Your Original Resume / Data</label>
            <textarea 
              value={originalResume}
              onChange={(e) => setOriginalResume(e.target.value)}
              className="w-full h-48 p-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Paste your original resume text..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Target Job Description</label>
            <textarea 
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full h-48 p-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Paste the job description here..."
            />
          </div>

          <button 
            onClick={handleTailor}
            disabled={loading || !jobDescription}
            className="w-full py-3 px-4 bg-primary text-primary-foreground font-medium rounded-md hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {loading ? "Tailoring... (This may take a moment)" : "Tailor Resume"}
          </button>
          
          {error && (
            <div className="p-4 bg-red-500/10 text-red-600 rounded-md text-sm font-medium">
              {error}
            </div>
          )}
        </div>

        {/* Output / Diff Section */}
        <div>
          <label className="block text-sm font-medium mb-2">Result & Changes</label>
          
          {score !== null && (
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full text-sm font-semibold">
              Keyword Match Score: {score}%
            </div>
          )}

          {tailoredResume ? (
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-secondary p-3 border-b border-border text-sm font-medium flex justify-between">
                <span>Before / After Diff</span>
                <span className="text-xs text-muted-foreground">Green = Added/Rephrased, Red = Removed</span>
              </div>
              {renderDiff()}
            </div>
          ) : (
            <div className="h-full min-h-[400px] border border-dashed border-border rounded-lg flex items-center justify-center text-muted-foreground text-sm p-8 text-center">
              Your tailored resume and AI diff will appear here.
            </div>
          )}
          
          {tailoredResume && (
            <div className="mt-6 space-y-4">
              
              <div className="flex flex-col sm:flex-row gap-4 p-4 border border-border rounded-lg bg-secondary/20">
                <div className="flex-1 space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2"><FileText size={16}/> ATS Format (Recommended)</h4>
                  <p className="text-xs text-muted-foreground">Plain text, perfect for passing automated bot screeners.</p>
                  <button 
                    onClick={() => setExportFormat("ats")}
                    className={`w-full py-2 text-xs font-semibold rounded-md transition-colors ${exportFormat === 'ats' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
                  >
                    Select ATS
                  </button>
                </div>
                
                <div className="flex-1 space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2"><Palette size={16}/> Visual Format</h4>
                  <p className="text-xs text-muted-foreground">Highly designed, perfect for emailing to human recruiters.</p>
                  <button 
                    onClick={() => setExportFormat("visual")}
                    className={`w-full py-2 text-xs font-semibold rounded-md transition-colors ${exportFormat === 'visual' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
                  >
                    Select Visual
                  </button>
                </div>
              </div>

              <button 
                onClick={handleExportPDF}
                disabled={exporting}
                className="w-full py-3 px-4 bg-foreground text-background font-medium rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Download size={18} /> {exporting ? "Generating PDF..." : `Download ${exportFormat === 'ats' ? 'ATS' : 'Visual'} PDF`}
              </button>
            </div>
          )}

          {/* Hidden PDF Render Target */}
          {tailoredResume && (
            <div className="absolute left-[-9999px] top-0">
              <div ref={resumeRef} className={`w-[800px] bg-white text-black p-10 ${exportFormat === 'visual' ? 'font-sans' : 'font-serif'}`}>
                {exportFormat === 'visual' && (
                  <div className="w-full h-4 bg-blue-600 mb-6 rounded-full" />
                )}
                <h1 className="text-3xl font-bold mb-6 border-b pb-2">Tailored Resume</h1>
                <div className="whitespace-pre-wrap leading-relaxed text-sm">
                  {tailoredResume}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
