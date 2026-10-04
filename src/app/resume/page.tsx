"use client";

import { useState } from "react";
import * as Diff from "diff";

export default function ResumeTailorPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [originalResume, setOriginalResume] = useState("Software Engineer with 3 years of experience in React and Node.js. Built scalable web applications.");
  
  const [tailoredResume, setTailoredResume] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
            <button className="mt-4 w-full py-3 px-4 border border-border bg-background text-foreground font-medium rounded-md hover:bg-secondary transition-colors">
              Looks Good, Save & Export to PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
