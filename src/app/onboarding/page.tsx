"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Code, Layout, Palette, ArrowRight, CheckCircle2 } from "lucide-react";

type Step = 1 | 2 | 3 | 4;

export default function OnboardingWizard() {
  const [step, setStep] = useState<Step>(1);
  const [githubConnected, setGithubConnected] = useState(false);
  const [profession, setProfession] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const nextStep = () => setStep((s) => (s < 4 ? (s + 1) as Step : 4));
  
  const handleGithubConnect = () => {
    // Mock connecting GitHub
    setGithubConnected(true);
    setTimeout(() => nextStep(), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-zinc-50 dark:bg-black font-sans">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-950 border border-border rounded-2xl shadow-xl overflow-hidden">
        
        {/* Progress Bar */}
        <div className="w-full bg-secondary h-2">
          <div 
            className="bg-primary h-full transition-all duration-500 ease-out" 
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center relative">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: GitHub Connect */}
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="flex flex-col items-center text-center space-y-6"
              >
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-primary mb-2">
                  <Code2 size={32} />
                </div>
                <h2 className="text-3xl font-bold">Connect your GitHub</h2>
                <p className="text-muted-foreground max-w-md">
                  We'll automatically sync your top repositories (prefixed with <code>pf-</code>) so you don't have to copy-paste your projects.
                </p>
                <button 
                  onClick={handleGithubConnect}
                  disabled={githubConnected}
                  className="flex items-center gap-2 px-8 py-4 bg-foreground text-background font-semibold rounded-full hover:scale-105 transition-transform disabled:opacity-50"
                >
                  {githubConnected ? <><CheckCircle2 /> Connected!</> : "Connect GitHub Account"}
                </button>
                <button onClick={nextStep} className="text-sm text-muted-foreground hover:text-foreground mt-4">
                  Skip for now
                </button>
              </motion.div>
            )}

            {/* STEP 2: Profession */}
            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-center mb-8">What do you do?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: "engineer", icon: <Code />, label: "Software Engineer" },
                    { id: "designer", icon: <Palette />, label: "UI/UX Designer" },
                    { id: "business", icon: <Layout />, label: "Business / BBA" },
                  ].map((job) => (
                    <button
                      key={job.id}
                      onClick={() => setProfession(job.id)}
                      className={`flex flex-col items-center gap-3 p-6 border rounded-xl transition-all ${
                        profession === job.id ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/50 text-foreground"
                      }`}
                    >
                      {job.icon}
                      <span className="font-medium">{job.label}</span>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end mt-8">
                  <button 
                    onClick={nextStep}
                    disabled={!profession}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full disabled:opacity-50"
                  >
                    Continue <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Pick a Template */}
            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-center mb-2">Choose a starting template</h2>
                <p className="text-center text-muted-foreground mb-8">You can always ask the AI to completely change the layout later.</p>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: "t1", name: "The Developer (Dark)", type: "engineer" },
                    { id: "t2", name: "The Masonry (Creative)", type: "designer" },
                    { id: "t3", name: "The Executive (Clean)", type: "business" },
                    { id: "t4", name: "Minimalist", type: "any" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTemplate(t.id)}
                      className={`text-left p-4 border rounded-xl transition-all ${
                        selectedTemplate === t.id ? "border-primary ring-2 ring-primary/20" : "border-border hover:bg-secondary/50"
                      }`}
                    >
                      <div className="w-full h-24 bg-secondary rounded-md mb-3 overflow-hidden flex items-center justify-center text-xs text-muted-foreground">
                        Preview Thumbnail
                      </div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground uppercase mt-1">{t.type}</div>
                    </button>
                  ))}
                </div>
                
                <div className="flex justify-end mt-6">
                  <button 
                    onClick={nextStep}
                    disabled={!selectedTemplate}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full disabled:opacity-50"
                  >
                    Build My Portfolio <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Generating */}
            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center space-y-6 py-10"
              >
                <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                <h2 className="text-3xl font-bold">Forging your portfolio...</h2>
                <p className="text-muted-foreground max-w-sm">
                  We are importing your GitHub projects, applying the <strong>{selectedTemplate}</strong> template, and setting up your AI assistant.
                </p>
                <p className="text-sm font-medium animate-pulse text-primary mt-4">
                  Redirecting to your dashboard in a moment...
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
