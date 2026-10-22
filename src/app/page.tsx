"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Layout, 
  FileText, 
  ShieldCheck, 
  Briefcase, 
  ExternalLink, 
  Monitor, 
  Smartphone, 
  Compass, 
  Layers, 
  CheckCircle2,
  RefreshCw
} from "lucide-react";

interface ViewTab {
  id: string;
  name: string;
  path: string;
  icon: any;
  badge?: string;
  description: string;
}

const TABS: ViewTab[] = [
  {
    id: "studio",
    name: "AI Portfolio Studio",
    path: "/portfolio/preview",
    icon: Sparkles,
    badge: "AI Powered",
    description: "Live interactive editor: ask the AI to change styles, switch between 3 templates, pick accent colors, and save.",
  },
  {
    id: "dashboard",
    name: "User Dashboard",
    path: "/dashboard",
    icon: Briefcase,
    badge: "Webhook Sim",
    description: "Manage synced GitHub projects, view daily AI quotas, and test the 'Simulate GitHub Push' button.",
  },
  {
    id: "public",
    name: "Public Shareable Page",
    path: "/p/alex",
    icon: Layout,
    badge: "Recruiter View",
    description: "Clean recruiter-facing URL (/p/alex) with zero editor bars and dynamic OpenGraph social cards.",
  },
  {
    id: "resume",
    name: "AI Resume Tailor & PDF",
    path: "/resume",
    icon: FileText,
    badge: "ATS / Visual",
    description: "Tailor your resume against any job description with diff viewer and export ATS or Visual PDFs.",
  },
  {
    id: "onboarding",
    name: "Onboarding Wizard",
    path: "/onboarding",
    icon: Compass,
    badge: "Multi-Step",
    description: "Animated welcome flow guiding users through connecting GitHub, choosing a profession, and template setup.",
  },
  {
    id: "security",
    name: "Security & Privacy",
    path: "/security",
    icon: ShieldCheck,
    badge: "DPDP Ready",
    description: "Live security audit checking DOMPurify sanitization, CSP headers, and DPDP privacy controls.",
  },
];

export default function MasterAllInOneHub() {
  const [activeTab, setActiveTab] = useState<string>("studio");
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");
  const [showDirectory, setShowDirectory] = useState<boolean>(false);
  const [iframeKey, setIframeKey] = useState<number>(0);

  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[0];

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 font-sans overflow-hidden">
      
      {/* Master Top Control Bar */}
      <header className="h-16 shrink-0 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between gap-2 z-30 select-none">
        
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowDirectory(!showDirectory)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md hover:opacity-95 transition-all"
            title="Toggle All-in-One Navigation Overview"
          >
            <Layers size={15} />
            <span className="hidden sm:inline">FolioVeda</span>
            <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-medium">All-in-One</span>
          </button>

          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Dev Server Live (:3000)</span>
          </div>
        </div>

        {/* Center: Interactive Tabs */}
        <nav className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800/80 max-w-[55vw] overflow-x-auto no-scrollbar">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id && !showDirectory;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowDirectory(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon size={14} className={isActive ? "text-white" : "text-slate-400"} />
                <span>{tab.name}</span>
                {tab.badge && (
                  <span className={`text-[9px] px-1 py-0.2 rounded hidden xl:inline ${
                    isActive ? "bg-blue-700 text-blue-100" : "bg-slate-800 text-slate-400"
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Device Controls & Direct Popout */}
        <div className="flex items-center gap-2">
          
          {/* Refresh iframe button */}
          <button
            onClick={() => setIframeKey((prev) => prev + 1)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Refresh current preview"
            aria-label="Refresh view"
          >
            <RefreshCw size={14} />
          </button>

          {/* Device Switcher */}
          <div className="hidden sm:flex items-center bg-slate-950 rounded-lg p-0.5 border border-slate-800">
            <button
              onClick={() => setDeviceMode("desktop")}
              className={`p-1.5 rounded-md transition-colors ${
                deviceMode === "desktop" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"
              }`}
              title="Desktop View (100% width)"
              aria-label="Desktop view"
            >
              <Monitor size={15} />
            </button>
            <button
              onClick={() => setDeviceMode("mobile")}
              className={`p-1.5 rounded-md transition-colors ${
                deviceMode === "mobile" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"
              }`}
              title="Mobile Responsive View (iPhone 390px)"
              aria-label="Mobile view"
            >
              <Smartphone size={15} />
            </button>
          </div>

          {/* External Popout Link */}
          <Link
            href={currentTab.path}
            target="_blank"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            title="Open this route in an independent browser tab"
          >
            <ExternalLink size={13} />
            <span className="hidden md:inline">Open Full</span>
          </Link>
        </div>

      </header>

      {/* Main Content Area */}
      <div className="flex-1 bg-slate-950 relative overflow-hidden flex flex-col items-center justify-center p-0 md:p-3">
        
        {/* Full Directory Grid Overlay when clicked */}
        {showDirectory ? (
          <div className="w-full h-full max-w-5xl overflow-y-auto p-6 md:p-10 space-y-8 animate-fade-in">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                FolioVeda Master Directory
              </h1>
              <p className="text-sm text-slate-400">
                Click any workspace card below to load it into the live master viewer or test its features.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setShowDirectory(false);
                    }}
                    className="text-left p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500 hover:bg-slate-800/60 transition-all group relative overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon size={20} />
                        </div>
                        {tab.badge && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                            {tab.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-base text-slate-100 group-hover:text-blue-400 transition-colors mb-1.5">
                        {tab.name}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {tab.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 group-hover:text-slate-300">
                      <code>{tab.path}</code>
                      <span className="font-semibold text-blue-400">Launch Preview →</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Live Embedded Showcase Device Frame */
          <div 
            className={`h-full w-full flex flex-col transition-all duration-300 ${
              deviceMode === "mobile" 
                ? "max-w-[390px] max-h-[844px] rounded-[40px] border-[10px] border-slate-800 shadow-2xl overflow-hidden my-auto" 
                : "max-w-full rounded-none md:rounded-2xl border-0 md:border md:border-slate-800 shadow-xl overflow-hidden"
            }`}
          >
            {/* Browser Address Info Bar */}
            <div className="h-7 bg-slate-900 border-b border-slate-800 px-3 flex items-center justify-between text-[11px] text-slate-400 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              </div>

              <div className="bg-slate-950 px-3 py-0.5 rounded-md text-[11px] text-slate-300 font-mono flex items-center gap-1 border border-slate-800">
                <span>http://localhost:3000{currentTab.path}</span>
              </div>

              <div className="text-[10px] text-slate-500 uppercase tracking-wider hidden sm:block">
                {deviceMode === "mobile" ? "Mobile 390px" : "Desktop View"}
              </div>
            </div>

            {/* Live Interactive Iframe */}
            <iframe
              key={`${currentTab.id}-${iframeKey}`}
              src={currentTab.path}
              title={currentTab.name}
              className="flex-1 w-full h-full bg-white dark:bg-slate-950 border-0"
              allow="clipboard-write"
            />
          </div>
        )}

      </div>

    </div>
  );
}
