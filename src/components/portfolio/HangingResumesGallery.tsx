"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  X, 
  CheckCircle2, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code2, 
  Globe, 
  Download, 
  Maximize2,
  ChevronRight,
  ShieldCheck,
  RotateCcw
} from "lucide-react";

export interface ResumeShowcaseItem {
  id: string;
  name: string;
  role: string;
  category: "engineering" | "design" | "ai" | "product" | "creative";
  categoryLabel: string;
  avatarText: string;
  badge: string;
  threadLength: number; // pixels of thread drop
  threadOffset: string; // horizontal offset for aesthetic distribution
  accentColor: string;
  cardBg: string;
  metrics: { label: string; value: string }[];
  summary: string;
  skills: string[];
  experience: {
    role: string;
    company: string;
    period: string;
    description: string;
    metrics: string;
  }[];
  education: {
    degree: string;
    school: string;
    year: string;
  };
  recommendation: {
    author: string;
    title: string;
    quote: string;
  };
  liveProject: {
    title: string;
    description: string;
    tag: string;
  };
}

const FIVE_BEST_RESUMES: ResumeShowcaseItem[] = [
  {
    id: "alex-rivera",
    name: "Alex Rivera",
    role: "Staff Distributed Systems Engineer",
    category: "engineering",
    categoryLabel: "Systems & Infrastructure",
    avatarText: "AR",
    badge: "ex-Stripe • 400M Tx/Day",
    threadLength: 90,
    threadOffset: "top-4",
    accentColor: "#10B981",
    cardBg: "from-slate-900 to-slate-950",
    metrics: [
      { label: "Throughput", value: "400M Events/Day" },
      { label: "P99 Latency", value: "11.4 ms" },
      { label: "Verified SLA", value: "99.999%" },
    ],
    summary: "Architect of mission-critical financial consensus protocols, global payment routers, and high-throughput Kafka streaming pipelines.",
    skills: ["Go", "Rust", "Kubernetes", "Kafka", "Distributed Systems", "gRPC", "eBPF", "Terraform"],
    experience: [
      {
        role: "Staff Infrastructure Engineer",
        company: "Stripe",
        period: "2022 — Present",
        description: "Spearheaded core multi-region ledger engine processing over $2.8B in daily global transaction volume with zero dropouts.",
        metrics: "Cut inter-region ingress/egress transit costs by 34% ($1.2M annual savings)."
      },
      {
        role: "Senior Distributed Systems Engineer",
        company: "Datadog",
        period: "2019 — 2022",
        description: "Built custom Raft-based time-series metadata index powering 10M+ concurrent telemetry queries.",
        metrics: "Reduced query tail latency by 4.2x under peak Black Friday load."
      }
    ],
    education: {
      degree: "B.S. & M.S. in Computer Science",
      school: "Stanford University",
      year: "2015 — 2019"
    },
    recommendation: {
      author: "David Vance",
      title: "VP of Core Infrastructure, ex-Stripe",
      quote: "Alex is in the top 1% of distributed systems architects I have worked with. His verified architecture maps are textbook standards."
    },
    liveProject: {
      title: "ConsensusRaft-Core",
      description: "High-performance Raft implementation in pure Rust with deterministic fuzz testing harness.",
      tag: "14.2k GitHub Stars"
    }
  },
  {
    id: "elena-vance",
    name: "Elena Vance",
    role: "Principal Spatial & Brand Architect",
    category: "design",
    categoryLabel: "Editorial & Architecture",
    avatarText: "EV",
    badge: "Pentagram & Apple • Cannes Grand Prix",
    threadLength: 130,
    threadOffset: "top-14",
    accentColor: "#991B1B",
    cardBg: "from-white to-rose-50/50",
    metrics: [
      { label: "Design Awards", value: "24 Cannes & D&AD" },
      { label: "Type Precision", value: "100% Bespoke" },
      { label: "Spatial Systems", value: "12 Global Sites" },
    ],
    summary: "Crafting timeless, high-whitespace spatial environments, physical monographs, and serene corporate identity systems.",
    skills: ["Spatial Design", "Editorial Typography", "Brand Architecture", "Art Direction", "Figma", "Industrial Prototyping"],
    experience: [
      {
        role: "Design Director & Spatial Lead",
        company: "Pentagram",
        period: "2021 — Present",
        description: "Led holistic spatial rebrand and museum identity for Kamakura Architectural Pavilion and Nordic Heritage Institute.",
        metrics: "Honored with Cannes Design Grand Prix 2024 and Awwwards Annual Trophy."
      },
      {
        role: "Senior Visual Designer",
        company: "Apple Design Studio",
        period: "2018 — 2021",
        description: "Engineered typographic scaling systems for spatial computing interfaces and editorial hardware keynotes.",
        metrics: "Filed 4 design patents on dynamic optical font weight interpolation."
      }
    ],
    education: {
      degree: "Bachelor of Fine Arts (Graphic & Spatial Design)",
      school: "Rhode Island School of Design (RISD)",
      year: "2014 — 2018"
    },
    recommendation: {
      author: "Marcus Lindqvist",
      title: "Senior Partner, Pentagram New York",
      quote: "Elena possesses a rare gift for negative space and architectural discipline. Her portfolios convert top-tier museum and enterprise patrons effortlessly."
    },
    liveProject: {
      title: "The Kamakura Monograph",
      description: "Complete photographic, typographic, and spatial study of monolithic cedar structures in Kanagawa.",
      tag: "Exhibited at Venice Biennale"
    }
  },
  {
    id: "dr-marcus-chen",
    name: "Dr. Marcus Chen",
    role: "Lead AI & Neural Architecture Scientist",
    category: "ai",
    categoryLabel: "Deep Learning & LLMs",
    avatarText: "MC",
    badge: "ex-DeepMind • 14 NeurIPS Papers",
    threadLength: 75,
    threadOffset: "top-2",
    accentColor: "#0284C7",
    cardBg: "from-slate-900 to-sky-950",
    metrics: [
      { label: "Inference Speedup", value: "4.8x on A100" },
      { label: "NeurIPS / ICLR", value: "14 Citations 3.2k" },
      { label: "HuggingFace", value: "2.1M Downloads" },
    ],
    summary: "Pioneering sparse attention kernels, low-bit quantization, and sub-10ms multimodal transformer inference architectures.",
    skills: ["PyTorch", "CUDA C++", "Sparse Attention", "LLM Distillation", "TensorRT", "Neural Architecture Search"],
    experience: [
      {
        role: "Staff Research Scientist",
        company: "Google DeepMind",
        period: "2021 — Present",
        description: "Formulated sparse linear attention mechanisms enabling 1M-token context windows at linear compute complexity.",
        metrics: "Deployed to 400M active mobile endpoints with zero perplexity degradation."
      },
      {
        role: "Postdoctoral Research Fellow",
        company: "MIT CSAIL",
        period: "2019 — 2021",
        description: "Researched hardware-aware neural pruning and sub-4-bit weight activations for on-device inference.",
        metrics: "Awarded Best Paper at NeurIPS 2020 (Systems & Neural Computation track)."
      }
    ],
    education: {
      degree: "Ph.D. in Computer Science & Artificial Intelligence",
      school: "Massachusetts Institute of Technology (MIT)",
      year: "2015 — 2019"
    },
    recommendation: {
      author: "Prof. Sarah Jenkins",
      title: "Director of Cognitive Computation, MIT",
      quote: "Marcus's algorithmic breakthroughs in transformer distillation are fundamental to the future of decentralized edge intelligence."
    },
    liveProject: {
      title: "FlashSparse-Kernel",
      description: "Open-source Triton/CUDA fused attention kernel outperforming FlashAttention-2 by 28% on extreme sequence lengths.",
      tag: "Adopted by 8 AI Unicorns"
    }
  },
  {
    id: "sophia-al-mansoor",
    name: "Sophia Al-Mansoor",
    role: "VP of Product & Fintech Growth",
    category: "product",
    categoryLabel: "Fintech & PLG Scale",
    avatarText: "SA",
    badge: "ex-Revolut • $0 → $400M ARR",
    threadLength: 120,
    threadOffset: "top-12",
    accentColor: "#D97706",
    cardBg: "from-white to-amber-50/40",
    metrics: [
      { label: "ARR Scaled", value: "$400M Global" },
      { label: "Active Users", value: "18M Customers" },
      { label: "Retention D30", value: "78.4% Top Decile" },
    ],
    summary: "Architecting product-led viral growth loops, automated onboarding engines, and cross-border treasury infrastructure.",
    skills: ["Product Strategy", "PLG Architecture", "Fintech Compliance", "Unit Economics", "Executive Org Scaling"],
    experience: [
      {
        role: "VP of Product, Global Expansion",
        company: "Revolut",
        period: "2020 — 2025",
        description: "Spearheaded expansion into 28 international territories; built friction-free localized KYC flow.",
        metrics: "Grew organic referral flywheel by 310% YoY, driving $400M in net annual platform run-rate."
      },
      {
        role: "Head of Core Growth",
        company: "Monzo",
        period: "2017 — 2020",
        description: "Designed instant peer-to-peer split payment loops and automated micro-savings algorithms.",
        metrics: "Scaled user base from 450,000 to 5.2M verified retail accounts."
      }
    ],
    education: {
      degree: "MBA in Finance & General Management",
      school: "Harvard Business School",
      year: "2015 — 2017"
    },
    recommendation: {
      author: "Nikolay Storonsky",
      title: "Co-Founder & CEO, Revolut",
      quote: "Sophia possesses an uncanny mastery of product levers and quantitative growth velocity. She builds generational fintech engines."
    },
    liveProject: {
      title: "Borderless Treasury Engine",
      description: "Multi-currency algorithmic liquidity router managing foreign exchange risk in sub-second clearing windows.",
      tag: "$4.2B Monthly Volume"
    }
  },
  {
    id: "kaito-tanaka",
    name: "Kaito Tanaka",
    role: "Senior Creative Director & 3D WebGL Artist",
    category: "creative",
    categoryLabel: "Interactive & Spatial Web",
    avatarText: "KT",
    badge: "ex-Active Theory • 8x Awwwards SOTY",
    threadLength: 85,
    threadOffset: "top-3",
    accentColor: "#8B5CF6",
    cardBg: "from-slate-900 to-indigo-950",
    metrics: [
      { label: "Site of the Year", value: "8x Awwwards / FWA" },
      { label: "Framerate", value: "Solid 60fps WebGL" },
      { label: "Shader Engine", value: "100% Procedural" },
    ],
    summary: "Synthesizing custom GLSL shaders, spatial WebAudio acoustics, and cinematic physics into sensory web experiences.",
    skills: ["Three.js", "WebGL", "GLSL Shaders", "WebAudio API", "Creative Direction", "Blender", "GSAP Physics"],
    experience: [
      {
        role: "Creative Director",
        company: "Active Theory",
        period: "2021 — Present",
        description: "Directed flagship interactive brand spaces for Nike, Sony, and Google I/O showcasing dynamic WebGL volumetric lighting.",
        metrics: "Won 8 Awwwards Site of the Year trophies and inducted into the FWA Hall of Fame."
      },
      {
        role: "Lead Interactive Shader Artist",
        company: "Resn",
        period: "2018 — 2021",
        description: "Created real-time fluid simulation and physics-based particle systems running in mobile Safari without thermal throttling.",
        metrics: "Delivered 14M interactive user sessions with an average time-on-page of 4m 12s."
      }
    ],
    education: {
      degree: "B.A. in Media Arts & Computational Design",
      school: "Tokyo University of the Arts (Geidai)",
      year: "2014 — 2018"
    },
    recommendation: {
      author: "Nick Mountford",
      title: "Managing Director, Active Theory",
      quote: "Kaito is the rare digital artist who writes mathematics as poetry. His work pushes the boundary of what browser compute can feel like."
    },
    liveProject: {
      title: "Metasphere 3D Interactive Symphony",
      description: "Audio-reactive procedural particle universe with 3,000,000 GPU particles computed in WebGL compute shaders.",
      tag: "Grand Awwwards SOTY Winner"
    }
  }
];

export function HangingResumesGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasFallen, setHasFallen] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [expandedResume, setExpandedResume] = useState<ResumeShowcaseItem | null>(null);
  const [mouseTilt, setMouseTilt] = useState<{ [key: string]: { x: number; y: number } }>({});

  // Trigger smooth drop entrance on scroll down from navbar
  useEffect(() => {
    const handleScroll = () => {
      if (hasFallen) return;
      const scrollY = window.scrollY;
      
      // When scrolling down past navbar (scrollY > 50px) or section is in view
      if (scrollY > 60) {
        setHasFallen(true);
      } else if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.85) {
          setHasFallen(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial position in case page loaded scrolled down
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasFallen]);

  // Lock body scroll when full-screen resume covers the screen
  useEffect(() => {
    if (expandedResume) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setExpandedResume(null);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [expandedResume]);

  // Handle subtle interactive mouse move on each hanging card
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const tiltX = (e.clientX - centerX) / 18;
    const tiltY = (centerY - e.clientY) / 18;
    setMouseTilt((prev) => ({
      ...prev,
      [id]: { x: tiltX, y: tiltY }
    }));
  };

  const handleCardMouseLeave = (id: string) => {
    setHoveredCardId(null);
    setMouseTilt((prev) => ({
      ...prev,
      [id]: { x: 0, y: 0 }
    }));
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative py-20 px-6 sm:px-10 max-w-7xl mx-auto overflow-hidden select-none"
      id="top-resumes"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#1E293B]/10 text-xs text-[#1E293B] shadow-2xs mb-4">
          <span className="w-2 h-2 rounded-full bg-[#991B1B] animate-pulse" />
          <span className="font-extrabold uppercase tracking-wider text-[10px] text-[#991B1B]">
            Interactive Showcase
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600 font-semibold">Tied With Flexible Threads</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1E293B] leading-tight mb-4">
          Our Five Premier Portfolios, <br />
          <span className="font-extrabold tracking-tight bg-gradient-to-r from-[#991B1B] via-[#DC2626] to-[#7F1D1D] bg-clip-text text-transparent">
            Suspended Live in Pure Precision.
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">
          Scroll down to see them drop into place. Move your cursor to sway their flexible threads. <strong className="text-[#1E293B] font-bold">Hover on any resume</strong> to immediately expand it full-screen on the front page.
        </p>

        {/* Reset / Replay Animation Button */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            onClick={() => {
              setHasFallen(false);
              setTimeout(() => setHasFallen(true), 150);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#991B1B] transition-colors bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs"
            title="Replay the drop-down thread animation"
          >
            <RotateCcw size={12} />
            <span>Replay Drop Animation</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          SUSPENSION RIG: Top Metallic Ceiling Rail & Hanging Threads
          ========================================================================= */}
      <div className="relative pt-6 pb-12">
        
        {/* Top Horizontal Steel Track Rail */}
        <div className="relative w-full h-3 bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200 rounded-full shadow-inner mb-2 border border-slate-300 flex items-center justify-between px-6 sm:px-12">
          {FIVE_BEST_RESUMES.map((r, idx) => (
            <div key={r.id} className="flex flex-col items-center">
              {/* Eyelet Anchor Ring */}
              <div className="w-5 h-5 rounded-full bg-white border-2 border-[#1E293B] shadow-sm flex items-center justify-center -mt-1 group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-[#991B1B] animate-pulse" />
              </div>
              <span className="text-[9px] font-bold text-slate-600 mt-1 uppercase font-mono tracking-tighter hidden md:inline">
                0{idx + 1}
              </span>
            </div>
          ))}
        </div>

        {/* 5 Hanging Thread Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 pt-2">
          {FIVE_BEST_RESUMES.map((resume, index) => {
            const isHovered = hoveredCardId === resume.id;
            const tilt = mouseTilt[resume.id] || { x: 0, y: 0 };
            const dropDelay = `${index * 140}ms`;

            return (
              <div 
                key={resume.id}
                className="relative flex flex-col items-center"
                style={{
                  transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                {/* SVG Flexible Thread Cable Line */}
                <div 
                  className={`w-full flex justify-center transition-all duration-700 ${
                    hasFallen ? "opacity-100" : "opacity-0 -translate-y-20"
                  }`}
                  style={{
                    height: `${resume.threadLength}px`,
                    transitionDelay: dropDelay,
                  }}
                >
                  <svg 
                    className="w-12 h-full overflow-visible"
                    viewBox={`0 0 48 ${resume.threadLength}`}
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id={`threadGrad-${resume.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#1E293B" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#991B1B" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#1E293B" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>
                    {/* Moveable Flexible Curved Thread Path */}
                    <path
                      d={`M 24 0 Q ${24 + (isHovered ? tilt.x * 2.5 : (index % 2 === 0 ? 3 : -3))} ${resume.threadLength / 2} ${24 + tilt.x} ${resume.threadLength}`}
                      stroke={`url(#threadGrad-${resume.id})`}
                      strokeWidth={isHovered ? "2.5" : "1.75"}
                      strokeDasharray={isHovered ? "none" : "3,1"}
                      fill="none"
                      className="transition-all duration-200"
                    />
                    {/* Top Ring Pin */}
                    <circle cx="24" cy="2" r="3" fill="#1E293B" />
                    {/* Bottom Connecting Ring on the card */}
                    <circle cx={`${24 + tilt.x}`} cy={`${resume.threadLength - 2}`} r="4" fill="#991B1B" />
                    <circle cx={`${24 + tilt.x}`} cy={`${resume.threadLength - 2}`} r="1.5" fill="#FFFFFF" />
                  </svg>
                </div>

                {/* Hanging Resume Card Chassis */}
                <div
                  onMouseEnter={() => setHoveredCardId(resume.id)}
                  onMouseMove={(e) => handleCardMouseMove(e, resume.id)}
                  onMouseLeave={() => handleCardMouseLeave(resume.id)}
                  onClick={() => setExpandedResume(resume)}
                  className={`w-full rounded-3xl bg-white border cursor-pointer relative transition-all duration-300 transform-gpu ${
                    hasFallen 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 -translate-y-48 pointer-events-none"
                  } ${
                    isHovered
                      ? "border-[#991B1B] shadow-2xl scale-[1.05] z-30 ring-4 ring-[#991B1B]/10"
                      : "border-[#1E293B]/10 shadow-lg hover:shadow-xl hover:border-slate-300"
                  } ${
                    // Add subtle natural pendulum sway when resting
                    hasFallen && !isHovered
                      ? index % 2 === 0 ? "animate-pendulum-slow" : "animate-pendulum-delayed"
                      : ""
                  }`}
                  style={{
                    transitionDelay: dropDelay,
                    transform: isHovered
                      ? `perspective(800px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateY(-8px)`
                      : undefined,
                  }}
                >
                  {/* Card Header Top Accent Tag */}
                  <div className="p-5 pb-3 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                      0{index + 1} • {resume.categoryLabel}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#991B1B] animate-pulse" />
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-4">
                    
                    {/* Avatar & Name */}
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-white text-sm shadow-md"
                        style={{ backgroundColor: resume.accentColor }}
                      >
                        {resume.avatarText}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-[#1E293B] leading-tight group-hover:text-[#991B1B] transition-colors">
                          {resume.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-bold truncate max-w-[130px]">
                          {resume.role}
                        </p>
                      </div>
                    </div>

                    {/* Social/Institutional Badge */}
                    <div className="text-[11px] font-bold text-[#991B1B] bg-red-50 border border-red-200 px-2.5 py-1 rounded-xl">
                      {resume.badge}
                    </div>

                    {/* Core Metric Highlight */}
                    <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-1">
                      <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        {resume.metrics[0].label}
                      </div>
                      <div className="text-sm font-extrabold text-[#1E293B]">
                        {resume.metrics[0].value}
                      </div>
                    </div>

                    {/* Skills Pills */}
                    <div className="flex flex-wrap gap-1">
                      {resume.skills.slice(0, 3).map((skill) => (
                        <span 
                          key={skill}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                      {resume.skills.length > 3 && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-200 text-slate-600">
                          +{resume.skills.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Hover Prompt Callout */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#991B1B]">
                      <span className="flex items-center gap-1">
                        <Maximize2 size={12} />
                        <span>Hover to expand</span>
                      </span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* =========================================================================
          FULL-SCREEN RESUME FRONT PAGE COVER MODAL
          (Triggers when someone hovers / clicks on any hanging resume)
          ========================================================================= */}
      {expandedResume && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-label={`Full screen resume preview for ${expandedResume.name}`}
          className="fixed inset-0 z-50 bg-[#F8F9FA]/98 backdrop-blur-2xl overflow-y-auto animate-fade-in flex flex-col selection:bg-[#991B1B] selection:text-white"
        >
          {/* Top Control Bar */}
          <header className="sticky top-0 z-50 h-16 bg-white/95 border-b border-[#1E293B]/10 px-6 sm:px-12 flex items-center justify-between shadow-2xs backdrop-blur-md">
            
            {/* Left: Branding & Status */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] flex items-center justify-center text-white font-extrabold text-xs">
                FV
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-[#1E293B] uppercase tracking-wider">
                  Full Screen Resume Showcase
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-bold text-[#991B1B] bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
                  {expandedResume.categoryLabel}
                </span>
              </div>
            </div>

            {/* Right: Actions & Close (ESC) */}
            <div className="flex items-center gap-3">
              
              <Link
                href="/onboarding"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-bold shadow-md shadow-[#991B1B]/20 transition-all hover:scale-105"
              >
                <span>Use This Resume Style</span>
                <ArrowRight size={13} />
              </Link>

              <button
                onClick={() => setExpandedResume(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-[#1E293B] text-slate-700 hover:text-white font-bold text-xs transition-colors border border-slate-200"
                title="Close full-screen resume (or press ESC)"
                aria-label="Close"
              >
                <X size={15} />
                <span className="hidden sm:inline">Close (ESC)</span>
              </button>

            </div>

          </header>

          {/* Main Full-Screen Resume Sheet Container */}
          <div className="flex-1 max-w-5xl w-full mx-auto p-6 sm:p-12 my-6 bg-white rounded-3xl border border-[#1E293B]/10 shadow-2xl space-y-10">
            
            {/* 1. Header Banner & Identity */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
              <div className="flex items-start gap-5">
                <div 
                  className="w-20 h-20 rounded-3xl flex items-center justify-center font-extrabold text-white text-2xl shadow-xl shrink-0"
                  style={{ backgroundColor: expandedResume.accentColor }}
                >
                  {expandedResume.avatarText}
                </div>
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#991B1B] bg-red-50 border border-red-200 px-3 py-0.5 rounded-full">
                    <ShieldCheck size={13} /> VERIFIED PROFILE • {expandedResume.badge}
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1E293B]">
                    {expandedResume.name}
                  </h1>
                  <p className="text-base sm:text-lg text-slate-600 font-bold">
                    {expandedResume.role}
                  </p>
                </div>
              </div>

              {/* Verified Contact & Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                <Link
                  href="/resume"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition border border-slate-200"
                >
                  <Download size={14} /> Download PDF
                </Link>
                <Link
                  href="/p/alex"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1E293B] hover:bg-slate-800 text-white text-xs font-bold transition"
                >
                  <ExternalLink size={14} /> View Recruiter Link
                </Link>
              </div>
            </div>

            {/* 2. Key Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {expandedResume.metrics.map((m, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    {m.label}
                  </span>
                  <span className="text-2xl font-extrabold text-[#1E293B]">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            {/* 3. Executive Summary */}
            <div className="space-y-3">
              <h2 className="text-xs font-extrabold text-[#991B1B] uppercase tracking-wider">
                Executive Profile
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                {expandedResume.summary}
              </p>
            </div>

            {/* 4. Experience & Career Timeline */}
            <div className="space-y-6">
              <h2 className="text-xs font-extrabold text-[#991B1B] uppercase tracking-wider flex items-center gap-2">
                <Briefcase size={14} /> VERIFIED CAREER HISTORY
              </h2>
              <div className="space-y-6">
                {expandedResume.experience.map((exp, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-lg font-extrabold text-[#1E293B]">
                        {exp.role} <span className="text-[#991B1B]">@ {exp.company}</span>
                      </h3>
                      <span className="text-xs font-bold text-slate-500 font-mono">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 font-normal leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="pt-2 text-xs font-bold text-[#1E293B] bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-[#991B1B]" />
                      <span>{exp.metrics}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Featured Live Project */}
            <div className="space-y-4">
              <h2 className="text-xs font-extrabold text-[#991B1B] uppercase tracking-wider flex items-center gap-2">
                <Code2 size={14} /> FLAGSHIP SHOWCASE PROJECT
              </h2>
              <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-extrabold text-white">
                      {expandedResume.liveProject.title}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                      {expandedResume.liveProject.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-normal max-w-xl">
                    {expandedResume.liveProject.description}
                  </p>
                </div>
                <Link
                  href="/inspiration"
                  className="px-4 py-2 rounded-xl bg-white text-[#1E293B] hover:bg-slate-100 text-xs font-bold transition shrink-0"
                >
                  Clone This Concept ↗
                </Link>
              </div>
            </div>

            {/* 6. Skills & Education Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
              
              {/* Skills */}
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Award size={14} className="text-[#991B1B]" /> Core Competencies &amp; Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {expandedResume.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap size={14} className="text-[#991B1B]" /> Education &amp; Credentials
                </h3>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="text-sm font-extrabold text-[#1E293B]">
                    {expandedResume.education.degree}
                  </h4>
                  <p className="text-xs text-slate-600 font-bold">
                    {expandedResume.education.school} • {expandedResume.education.year}
                  </p>
                </div>
              </div>

            </div>

            {/* 7. Endorsement Callout */}
            <div className="p-6 rounded-2xl bg-red-50/60 border border-red-200 space-y-2">
              <span className="text-[10px] font-extrabold text-[#991B1B] uppercase tracking-wider">
                EXECUTIVE ENDORSEMENT
              </span>
              <p className="text-sm text-slate-800 font-normal leading-relaxed">
                &ldquo;{expandedResume.recommendation.quote}&rdquo;
              </p>
              <p className="text-xs font-bold text-[#1E293B]">
                — {expandedResume.recommendation.author}, <span className="text-slate-500">{expandedResume.recommendation.title}</span>
              </p>
            </div>

            {/* Bottom Footer Action Bar */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 font-medium">
                Showing full profile snapshot on FolioVeda Front Page. Press <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[10px]">ESC</kbd> to return.
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setExpandedResume(null)}
                  className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
                >
                  Return to Home
                </button>
                <Link
                  href="/onboarding"
                  className="px-6 py-2.5 rounded-full bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-bold transition-all shadow-md shadow-[#991B1B]/20"
                >
                  Adopt This Style Free →
                </Link>
              </div>
            </div>

          </div>

        </div>
      )}

    </section>
  );
}
