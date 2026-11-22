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
  RefreshCw,
  Palette,
  Home,
  ArrowRight
} from "lucide-react";
import { FolioVedaLogo } from "@/components/ui/Logo";

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
    id: "rolan-desk",
    name: "Rolan Gomes Desk",
    path: "/p/gaurav?theme=rolan-gomes",
    icon: Sparkles,
    badge: "Link 1 // Rolan Gomes",
    description: "Exact Rolan Gomes cutting mat archetype: physical paper sheet on an architect grid cutting mat, floating post-it note, and monospaced accredited credential list.",
  },
  {
    id: "sudarvel",
    name: "Sudarvel Dark Case Study",
    path: "/p/gaurav?theme=sudarvel",
    icon: Layout,
    badge: "Link 2 // Sudarvel",
    description: "Tactical dark case studies inspired by Sudarvel K: 'Design. Build. Tell Stories', numbered case study drawers, and clinical outcome telemetry.",
  },
  {
    id: "himanshu",
    name: "Himanshu Singh Studio",
    path: "/p/gaurav?theme=himanshu-singh",
    icon: Layers,
    badge: "Link 3 // Himanshu Singh",
    description: "Himanshu Singh visual storyteller studio canvas: deep forest cutting board (#06392b), storytelling sequences, branding, and art direction.",
  },
  {
    id: "tanuja",
    name: "Tanuja Microsoft Case Study",
    path: "/p/gaurav?theme=tanuja-design",
    icon: Sparkles,
    badge: "Link 4 // Tanuja",
    description: "Tanuja Microsoft enterprise product case studies: AI workflow integration, FOX Icons, Figma plugin tooling, and high-clarity problem-solution architecture.",
  },
  {
    id: "resume",
    name: "ATS Resume Studio",
    path: "/resume",
    icon: FileText,
    badge: "Recruiter Grade",
    description: "Executive A4 paper canvas, Ivy/Tech typography switch, live ATS keyword score diff, and 1-click PDF/Print export.",
  },
  {
    id: "styles",
    name: "Style Archetypes",
    path: "/styles",
    icon: Layers,
    badge: "4 Flagships",
    description: "Curated signature archetypes inspired directly by Wall of Portfolios standards (Rolan Gomes, Sudarvel, Himanshu Singh, and Tanuja).",
  },
  {
    id: "studio",
    name: "Portfolio Studio",
    path: "/portfolio/preview",
    icon: Sparkles,
    badge: "Live Switcher",
    description: "Live editor canvas with instant 4-creator selector (Rolan Gomes, Sudarvel, Himanshu Singh, Tanuja), accent color palettes, and AI ChatEditor.",
  },
  {
    id: "landing",
    name: "Master Landing",
    path: "/",
    icon: Home,
    badge: "Institutional",
    description: "Official institutional SaaS landing page with unified Forest Emerald & Cyber Mint identity and social proof.",
  },
  {
    id: "onboarding",
    name: "Onboarding Wizard",
    path: "/onboarding",
    icon: Compass,
    badge: "60s Setup",
    description: "Streamlined welcome flow guiding users through connecting GitHub, choosing a profession, and template setup.",
  },
  {
    id: "dashboard",
    name: "User Dashboard",
    path: "/dashboard",
    icon: Briefcase,
    badge: "GitHub Sync",
    description: "Manage synced GitHub projects, view daily quotas, and monitor automated portfolio updates.",
  },
  {
    id: "brand",
    name: "Brand & Logo",
    path: "/brand",
    icon: Palette,
    badge: "Vector IP",
    description: "Explore the official Origami Cyber Mint brand mark, typography rules, and vector assets.",
  },
  {
    id: "inspiration",
    name: "Inspiration Engine",
    path: "/inspiration",
    icon: Sparkles,
    badge: "Mood Board",
    description: "Extract abstract mood and typography into original copyright-safe themes with interactive fidelity controls.",
  },
  {
    id: "security",
    name: "Security & Privacy",
    path: "/security",
    icon: ShieldCheck,
    badge: "DPDP / XSS",
    description: "Security audit demonstrating input sanitization, CSP protections, and data compliance standards.",
  },
];

export default function MasterAllInOneHub() {
  const [activeTab, setActiveTab] = useState<string>("landing");
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");
  const [showDirectory, setShowDirectory] = useState<boolean>(false);
  const [iframeKey, setIframeKey] = useState<number>(0);

  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[0];

  return (
    <div className="h-screen flex flex-col bg-[#F8F9FA] text-[#1E293B] selection:bg-[#173f32] selection:text-[#f7f4eb] font-sans overflow-hidden">
      
      {/* Master Top Control Bar */}
      <header className="h-16 shrink-0 bg-white/95 border-b border-[#1E293B]/10 px-4 flex items-center justify-between gap-3 z-30 select-none shadow-2xs backdrop-blur-xl">
        
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-[#1E293B]/10 shadow-2xs transition-all"
            title="Return to Main Landing Page"
          >
            <FolioVedaLogo size="sm" />
            <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-bold hidden sm:inline">
              Master Hub
            </span>
          </Link>

          <button 
            onClick={() => setShowDirectory(!showDirectory)}
            className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
              showDirectory 
                ? "bg-[#1E293B] text-white border-[#1E293B]" 
                : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-2xs"
            }`}
          >
            {showDirectory ? "Close Directory" : "Directory Overview"}
          </button>
        </div>

        {/* Center: Interactive Tabs */}
        <nav className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200 max-w-[50vw] overflow-x-auto no-scrollbar">
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
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                  isActive
                    ? "bg-[#173f32] text-[#f7f4eb] shadow-sm font-bold"
                    : "text-slate-600 hover:text-[#1E293B] hover:bg-white/80 font-semibold"
                }`}
              >
                <Icon size={14} className={isActive ? "text-[#10B981]" : "text-slate-500"} />
                <span>{tab.name}</span>
                {tab.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full hidden xl:inline font-bold ${
                    isActive ? "bg-[#10B981]/20 text-[#10B981]" : "bg-slate-200 text-slate-600"
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
            className="p-2 rounded-full bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 shadow-2xs transition-colors"
            title="Refresh current preview"
            aria-label="Refresh view"
          >
            <RefreshCw size={14} />
          </button>

          {/* Device Switcher */}
          <div className="hidden sm:flex items-center bg-slate-100 rounded-full p-1 border border-slate-200">
            <button
              onClick={() => setDeviceMode("desktop")}
              className={`p-1.5 rounded-full transition-all ${
                deviceMode === "desktop" ? "bg-white text-[#1E293B] shadow-2xs font-bold" : "text-slate-400 hover:text-slate-700"
              }`}
              title="Desktop View (100% width)"
              aria-label="Desktop view"
            >
              <Monitor size={15} />
            </button>
            <button
              onClick={() => setDeviceMode("mobile")}
              className={`p-1.5 rounded-full transition-all ${
                deviceMode === "mobile" ? "bg-white text-[#1E293B] shadow-2xs font-bold" : "text-slate-400 hover:text-slate-700"
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1E293B] hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
            title="Open this route in an independent browser tab"
          >
            <ExternalLink size={13} />
            <span className="hidden md:inline">Open Full</span>
          </Link>
        </div>

      </header>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#F8F9FA] relative overflow-hidden flex flex-col items-center justify-center p-0 md:p-3">
        {showDirectory ? (
          <div className="w-full h-full max-w-5xl overflow-y-auto p-6 md:p-10 space-y-8 animate-fade-in">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#173f32] text-xs font-bold tracking-wide uppercase">
                <Sparkles size={13} /> PLATFORM DIRECTORY
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E293B]">
                FolioVeda Master Directory
              </h1>
              <p className="text-sm text-slate-600 font-normal">
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
                    className="text-left p-6 rounded-3xl bg-white border border-[#1E293B]/10 hover:border-[#173f32]/40 hover:shadow-xl hover:-translate-y-0.5 transition-all group relative overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#173f32] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon size={20} />
                        </div>
                        {tab.badge && (
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                            {tab.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="font-extrabold text-base text-[#1E293B] group-hover:text-[#173f32] transition-colors mb-1.5">
                        {tab.name}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {tab.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 group-hover:text-slate-700">
                      <code className="text-slate-600 font-mono text-[10px] bg-slate-50 px-2 py-0.5 rounded border border-slate-200">{tab.path}</code>
                      <span className="font-bold text-[#173f32] flex items-center gap-1">
                        Launch <ArrowRight size={12} />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div 
            className={`h-full w-full flex flex-col transition-all duration-300 ${
              deviceMode === "mobile" 
                ? "max-w-[390px] max-h-[844px] rounded-[42px] border-[10px] border-[#1E293B] shadow-2xl overflow-hidden my-auto bg-white" 
                : "max-w-full rounded-none md:rounded-2xl border-0 md:border md:border-[#1E293B]/10 shadow-xl overflow-hidden bg-white"
            }`}
          >
            {/* Browser Address Info Bar */}
            <div className="h-8 bg-slate-100/90 border-b border-slate-200 px-3 flex items-center justify-between text-[11px] text-slate-600 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
              </div>

              <div className="bg-white px-3 py-0.5 rounded-full text-[11px] text-slate-700 font-mono flex items-center gap-1 border border-slate-200 shadow-2xs">
                <span>http://localhost:3000{currentTab.path}</span>
              </div>

              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider hidden sm:block">
                {deviceMode === "mobile" ? "Mobile 390px" : "Desktop View"}
              </div>
            </div>

            {/* Live Interactive Iframe */}
            <iframe
              key={`${currentTab.id}-${iframeKey}`}
              src={currentTab.path}
              title={currentTab.name}
              className="flex-1 w-full h-full bg-white border-0"
              allow="clipboard-write"
            />
          </div>
        )}
      </div>

    </div>
  );
}
