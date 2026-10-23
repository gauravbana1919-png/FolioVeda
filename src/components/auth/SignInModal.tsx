"use client";

import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { X, ShieldCheck, Sparkles, Check, ArrowRight, Loader2, Info } from "lucide-react";
import { FolioVedaLogo } from "@/components/ui/Logo";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCallbackUrl?: string;
}

export function SignInModal({
  isOpen,
  onClose,
  defaultCallbackUrl = "/dashboard",
}: SignInModalProps) {
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);
  const [isLoadingDemo, setIsLoadingDemo] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      setIsLoadingGoogle(true);
      setErrorMessage(null);
      await signIn("google", { callbackUrl: defaultCallbackUrl });
    } catch (err: any) {
      console.error("[GOOGLE_SIGNIN_ERROR]", err);
      setErrorMessage("Could not initiate Google Sign-In. You can use the instant 1-click demo login below.");
      setIsLoadingGoogle(false);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setIsLoadingGithub(true);
      setErrorMessage(null);
      await signIn("github", { callbackUrl: defaultCallbackUrl });
    } catch (err: any) {
      console.error("[GITHUB_SIGNIN_ERROR]", err);
      setErrorMessage("Could not initiate GitHub Sign-In. Try the instant 1-click demo login.");
      setIsLoadingGithub(false);
    }
  };

  const handleDemoSignIn = async () => {
    try {
      setIsLoadingDemo(true);
      setErrorMessage(null);
      const res = await signIn("google-demo", {
        redirect: true,
        callbackUrl: defaultCallbackUrl,
        email: "arjun.sharma.tech@gmail.com",
        name: "Arjun Sharma",
      });
      if (res?.error) {
        setErrorMessage("Failed to login to demo account. Please try again.");
        setIsLoadingDemo(false);
      }
    } catch (err: any) {
      console.error("[DEMO_SIGNIN_ERROR]", err);
      setErrorMessage("Demo login failed. Please try again.");
      setIsLoadingDemo(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="signin-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md bg-[#F8F9FA] border border-[#1E293B]/15 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        
        {/* Subtle decorative top crimson bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#991B1B] via-red-500 to-[#1E293B]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-all cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2.5 pt-2">
          <div className="inline-flex justify-center mb-1">
            <FolioVedaLogo size="md" showBadge={false} />
          </div>

          <h2 id="signin-modal-title" className="text-2xl font-black text-[#1E293B] tracking-tight">
            Sign In to FolioVeda
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xs mx-auto leading-relaxed">
            Access your live portfolio, ATS-tailored resumes, and AI design studio in seconds.
          </p>
        </div>

        {/* Error Alert if any */}
        {errorMessage && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-start gap-2">
            <Info size={16} className="text-[#991B1B] shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Primary Action: Google Sign In */}
        <div className="mt-7 space-y-3.5">
          <button
            id="google-signin-btn"
            onClick={handleGoogleSignIn}
            disabled={isLoadingGoogle || isLoadingDemo || isLoadingGithub}
            className="w-full flex items-center justify-center gap-3.5 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-[#1E293B]/40 text-[#1E293B] text-sm font-bold shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
          >
            {isLoadingGoogle ? (
              <>
                <Loader2 size={18} className="animate-spin text-[#991B1B]" />
                <span>Connecting to Google OAuth...</span>
              </>
            ) : (
              <>
                {/* Official 4-color Google Vector Logo */}
                <svg className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {/* GitHub Alternative */}
          <button
            onClick={handleGithubSignIn}
            disabled={isLoadingGoogle || isLoadingDemo || isLoadingGithub}
            className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-2xl bg-[#1E293B] hover:bg-[#0F172A] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoadingGithub ? (
              <>
                <Loader2 size={16} className="animate-spin text-white" />
                <span>Connecting to GitHub...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>Continue with GitHub</span>
              </>
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <span className="relative bg-[#F8F9FA] px-3 text-[11px] font-bold uppercase tracking-wider text-slate-600">
            Or Test Immediately
          </span>
        </div>

        {/* 1-Click Instant Demo Login (For Localhost & Evaluation) */}
        <div className="bg-gradient-to-br from-red-50/70 to-slate-100 p-4 rounded-2xl border border-red-100 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#991B1B]">
              <Sparkles size={14} />
              <span>Instant Indian Creator Demo</span>
            </div>
            <span className="text-[10px] uppercase font-extrabold bg-[#991B1B] text-white px-2 py-0.5 rounded-full">
              1-Click
            </span>
          </div>

          <p className="text-[11px] text-slate-600 font-medium leading-relaxed mb-3">
            Skip Google Cloud OAuth credential setup. Sign in instantly as verified Principal Architect <strong>Arjun Sharma</strong> with preloaded repositories and live portfolio.
          </p>

          <button
            onClick={handleDemoSignIn}
            disabled={isLoadingDemo || isLoadingGoogle || isLoadingGithub}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-[#991B1B]/30 hover:border-[#991B1B] text-[#991B1B] hover:text-[#7F1D1D] text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
          >
            {isLoadingDemo ? (
              <>
                <Loader2 size={14} className="animate-spin text-[#991B1B]" />
                <span>Launching Demo Session...</span>
              </>
            ) : (
              <>
                <span>Sign In as Arjun Sharma</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        {/* Security & Verification Guarantee Footer */}
        <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
            <span className="font-semibold">OAuth 2.0 SSL Verified</span>
          </div>
          <span className="font-medium text-slate-600">Zero Password Storage</span>
        </div>

      </div>
    </div>
  );
}
