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
  image: string;
  livePreviewUrl?: string;
  themeTag?: string;
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
    id: "learn-house",
    name: "Learn@House Studio",
    role: "Full-Stack EdTech & Web Architect",
    category: "engineering",
    categoryLabel: "EdTech & Web Platform",
    avatarText: "LH",
    badge: "★ 5.0 Star (1.5k+ Reviews) • 20M+ Users",
    threadLength: 90,
    threadOffset: "top-4",
    accentColor: "#113A33",
    cardBg: "from-white to-emerald-50/50",
    image: "/images/portfolios/portfolio-learn-house.jpg",
    livePreviewUrl: "/p/David%20Vance?theme=luxe-creative",
    themeTag: "Email & Growth Engine",
    metrics: [
      { label: "Active Learners", value: "20M+ Global" },
      { label: "Masterclasses", value: "160+ Courses" },
      { label: "Platform Rating", value: "5.0 ★ (1.5k)" },
    ],
    summary: "Because Email Is Complicated Enough. Building high-conversion SaaS web applications, lead databases, and interactive learning platforms with seamless micro-animations.",
    skills: ["SaaS Architecture", "Next.js", "Lead Engine", "Tailwind CSS", "TypeScript", "EdTech Systems", "Stripe Checkout"],
    experience: [
      {
        role: "Lead Platform Architect",
        company: "Learn@House",
        period: "2022 — Present",
        description: "Spearheaded full redesign of learner onboarding and email lead generation database, driving 24 Lakh active enrolments.",
        metrics: "Scaled platform across 120+ countries with 99.98% uptime."
      },
      {
        role: "Senior Frontend Engineer",
        company: "Snov.io Labs",
        period: "2019 — 2022",
        description: "Engineered high-throughput email finder Chrome extension and automated drip campaign editor.",
        metrics: "Cut client-side latency by 42% for 2M daily queries."
      }
    ],
    education: {
      degree: "B.S. in Computer Science & Interactive Media",
      school: "University of Washington",
      year: "2015 — 2019"
    },
    recommendation: {
      author: "Elena Rostova",
      title: "VP of Product, Learn@House",
      quote: "David transformed our email learning portal into an award-winning, friction-free web experience that converts over 24% of cold traffic."
    },
    liveProject: {
      title: "LeadFinder Autonomous Engine",
      description: "Real-time email verification and lead intelligence dashboard with instant domain lookup.",
      tag: "20M+ Queries Served"
    }
  },
  {
    id: "shivam-kaushal",
    name: "Shivam Kaushal",
    role: "Graphic & Web Designer",
    category: "design",
    categoryLabel: "Graphic & Web Design",
    avatarText: "SK",
    badge: "3D Clay & Web Designer • Pursuing B.Sc",
    threadLength: 125,
    threadOffset: "top-12",
    accentColor: "#E05A2B",
    cardBg: "from-white to-amber-50/40",
    image: "/images/portfolios/portfolio-shivam-kaushal.jpg",
    livePreviewUrl: "/p/Shivam%20Kaushal?theme=not-your-college",
    themeTag: "Warm Clay & Editorial",
    metrics: [
      { label: "Languages", value: "Hindi (100%) • Eng (70%)" },
      { label: "Design Tools", value: "Ps, Canva, Ai, Picsart" },
      { label: "AI Integration", value: "ChatGPT & Gemini" },
    ],
    summary: "Aspiring graphic designer with a strong mindset for creativity and digital art; skilled in top design tools like Photoshop and Illustrator to create engaging visuals, branding, and modern responsive web layouts.",
    skills: ["Photoshop", "Illustrator", "Canva", "Alight Motion", "KineMaster", "Picsart", "ChatGPT", "Google Gemini", "Branding", "UI/UX Design"],
    experience: [
      {
        role: "Student Service Portal Executive",
        company: "Dr. Bhim Rao Ambedkar University, Agra",
        period: "10 Months",
        description: "Managed student queries, portal operations, and data verification on official university services portal.",
        metrics: "Ensured 100% smooth daily operations across 50,000+ student profiles."
      },
      {
        role: "Medical Field Professional",
        company: "Healthcare Services",
        period: "1.5 Years",
        description: "Assisted in patient care, record systems, and hospital administrative support with high accuracy.",
        metrics: "Developed deep empathetic communication and organized workflows."
      }
    ],
    education: {
      degree: "Pursuing B.Sc (Bachelor of Science) & Diploma in CS",
      school: "Government Leather Institute (2019-2022) & University",
      year: "2019 — Present"
    },
    recommendation: {
      author: "Rahul Sharma",
      title: "Creative Lead, DesignStudio India",
      quote: "Shivam blends tactile 3D visual language with exceptional work ethic. His graphic layouts and branding communicate instantly with modern audiences."
    },
    liveProject: {
      title: "Tactile Clay & Web Design Series",
      description: "Comprehensive branding, social media posts, label design, and poster campaign with 3D clay aesthetics.",
      tag: "Best Student Portfolio Award"
    }
  },
  {
    id: "kenji-sato",
    name: "Kenji Sato",
    role: "3D Character & Editorial Illustrator",
    category: "creative",
    categoryLabel: "3D Illustration & Visual Identity",
    avatarText: "KS",
    badge: "3D Chibi Mascot • Book Cover & Editorial",
    threadLength: 80,
    threadOffset: "top-2",
    accentColor: "#164654",
    cardBg: "from-white to-cyan-50/40",
    image: "/images/portfolios/portfolio-3d-illustrator.jpg",
    livePreviewUrl: "/p/Kenji%20Sato?theme=bento-grid",
    themeTag: "Deep Cyan 3D Monograph",
    metrics: [
      { label: "Mockup Units", value: "14 Project Modules" },
      { label: "Brand Books", value: "35+ Cover Designs" },
      { label: "Feed Curation", value: "500k+ Impressions" },
    ],
    summary: "Creating whimsical 3D character illustrations, editorial book covers, packaging jar labels, brand profiles, and cohesive social feed campaigns with distinct artistic direction.",
    skills: ["3D Character Design", "Blender", "Editorial Book Covers", "Jar Label Packaging", "Digital Imaging", "Typography", "Vector Art", "Brand Identity"],
    experience: [
      {
        role: "Lead 3D Illustrator & Art Director",
        company: "Studio Kumo",
        period: "2021 — Present",
        description: "Created signature 3D chibi mascot, book cover series, and full brand book design portfolios for global lifestyle clients.",
        metrics: "Illustrated over 40 published books and 12 merchandise packaging series."
      },
      {
        role: "Graphic & Feed Designer",
        company: "Neon Tokyo Creative",
        period: "2018 — 2021",
        description: "Designed interactive social media feed grids, vector assets, and exhibition booth spatial renders.",
        metrics: "Achieved 300% growth in client social media engagement."
      }
    ],
    education: {
      degree: "Bachelor of Arts in Digital Arts & Animation",
      school: "Kyoto Seika University",
      year: "2014 — 2018"
    },
    recommendation: {
      author: "Aoi Takahashi",
      title: "Creative Producer, Shueisha Media",
      quote: "Kenji's 3D characters breathe life and joy into every medium—from editorial covers to digital packaging."
    },
    liveProject: {
      title: "Chibi Chronicle Book Cover Series",
      description: "Multi-volume illustrated book cover design and bespoke typography monographs.",
      tag: "Featured in Tokyo Art Expo"
    }
  },
  {
    id: "randy-fahmi",
    name: "Randy Fahmi",
    role: "Creative Visual Director & Media Producer",
    category: "creative",
    categoryLabel: "Creative Visual & Videography",
    avatarText: "RF",
    badge: "Graphic Design • Photo & Video Producer",
    threadLength: 115,
    threadOffset: "top-10",
    accentColor: "#F2A900",
    cardBg: "from-white to-amber-50/50",
    image: "/images/portfolios/portfolio-randy-fahmi.jpg",
    livePreviewUrl: "/p/Randy%20Fahmi?theme=rolan-gomes",
    themeTag: "Editorial Ochre & Tactile Grid",
    metrics: [
      { label: "Commercial Shoots", value: "120+ Productions" },
      { label: "Design Systems", value: "Pr, Ai, Ps, Lr, CapCut" },
      { label: "Client Ratings", value: "99.4% CSAT" },
    ],
    summary: "Self-taught graphic designer & IT professional with over 9 years of experience. Crafting bold visual identities, photography, commercial videography, and structured table-of-content portfolios.",
    skills: ["Graphic Design", "Photographer", "Videographer", "Premiere Pro", "Illustrator", "Photoshop", "Lightroom", "CapCut", "Figma", "VS Code"],
    experience: [
      {
        role: "IT Supervisor & Graphic Design Lead",
        company: "PT Indo Prima Visual",
        period: "2020 — Present",
        description: "Spearhead multi-channel video campaigns, brand brochures, company profiles, and technical IT infrastructure.",
        metrics: "Directed 85+ successful brand commercial launches and social campaigns."
      },
      {
        role: "Graphic Designer & Content Creator",
        company: "Creative Media Nusantara",
        period: "2017 — 2020",
        description: "Produced high-impact photography, social media assets, and commercial video editing for enterprise brands.",
        metrics: "Boosted client conversion rates by 52% across digital channels."
      }
    ],
    education: {
      degree: "Informatics Engineering (B.Eng)",
      school: "State Polytechnic of Informatics",
      year: "2012 — 2016"
    },
    recommendation: {
      author: "Budi Santoso",
      title: "Managing Director, PT Indo Prima",
      quote: "Randy combines technical informatics precision with raw artistic instinct. His visual portfolios speak with undeniable authority."
    },
    liveProject: {
      title: "Visual Storyteller Table of Contents",
      description: "Modular multi-disciplinary portfolio spanning graphic design, commercial photography, and 4K cinema.",
      tag: "Award of Creative Excellence"
    }
  },
  {
    id: "alsa-yunita",
    name: "Alsa Yunita",
    role: "Creative Presentation & Social Media Designer",
    category: "product",
    categoryLabel: "Presentation & Social Media",
    avatarText: "AY",
    badge: "Pastel Lilac & Peach • Social Media Lead",
    threadLength: 95,
    threadOffset: "top-5",
    accentColor: "#8B5CF6",
    cardBg: "from-white to-purple-50/40",
    image: "/images/portfolios/portfolio-alsa-yunita.jpg",
    livePreviewUrl: "/p/Alsa%20Yunita?theme=tanuja-design",
    themeTag: "Lilac Dream & Sparkle Presentation",
    metrics: [
      { label: "Social Reach", value: "1.2M+ Monthly" },
      { label: "Presentation Decks", value: "90+ Pitch Decks" },
      { label: "Campaigns", value: "35+ Brand Launches" },
    ],
    summary: "Designing whimsical pastel presentations, TikTok & Instagram viral content strategies, social brand aesthetics, and engaging portfolio slides that win pitches.",
    skills: ["Creative Presentation", "Social Media Design", "Canva", "CapCut", "TikTok Strategy", "Brand Aesthetics", "Pastel Layouts", "Pitch Decks"],
    experience: [
      {
        role: "Lead Social Media Designer & Strategist",
        company: "Aura Creative Studio",
        period: "2022 — Present",
        description: "Manage end-to-end visual content production across TikTok and Instagram for beauty, lifestyle, and Gen Z consumer brands.",
        metrics: "Generated over 4.8M organic video impressions and 250k+ new followers."
      },
      {
        role: "Brand Presentation Specialist",
        company: "Glow Media",
        period: "2020 — 2022",
        description: "Designed custom pitch decks, investor presentations, and cohesive social media launch kits.",
        metrics: "Helped seed-stage startups close over $3.5M in funding with visual decks."
      }
    ],
    education: {
      degree: "Bachelor of Communication & Visual Media",
      school: "Faculty of Creative Arts & Design",
      year: "2017 — 2021"
    },
    recommendation: {
      author: "Siti Rahma",
      title: "Chief Marketing Officer, Glow Media",
      quote: "Alsa's presentations don't just inform—they enchant. Her color palettes and typography create an immediate emotional connection."
    },
    liveProject: {
      title: "Pastel Dream Presentation Kit",
      description: "Modular multi-slide presentation system featuring dynamic cards, project showcases, and contact flows.",
      tag: "Downloaded 18,000+ Times"
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
      id="top-resumes"
      className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto overflow-visible select-none"
    >
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1E293B] leading-tight">
          Five Premier Portfolios, <br />
          <span className="font-extrabold tracking-tight bg-gradient-to-r from-[#173f32] via-[#10B981] to-[#173f32] bg-clip-text text-transparent">
            Suspended in Pure Precision.
          </span>
        </h2>
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
                <span className="w-2 h-2 rounded-full bg-[#173f32] animate-pulse" />
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
                        <stop offset="50%" stopColor="#173f32" stopOpacity="0.9" />
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
                    <circle cx={`${24 + tilt.x}`} cy={`${resume.threadLength - 2}`} r="4" fill="#173f32" />
                    <circle cx={`${24 + tilt.x}`} cy={`${resume.threadLength - 2}`} r="1.5" fill="#FFFFFF" />
                  </svg>
                </div>

                {/* Hanging Resume Card Chassis - PURE IMAGE POSTER (NO TEXT) */}
                <div
                  onMouseEnter={() => setHoveredCardId(resume.id)}
                  onMouseMove={(e) => handleCardMouseMove(e, resume.id)}
                  onMouseLeave={() => handleCardMouseLeave(resume.id)}
                  onClick={() => setExpandedResume(resume)}
                  className={`w-full h-[400px] sm:h-[460px] md:h-[500px] rounded-2xl sm:rounded-3xl bg-slate-950 border cursor-pointer relative transition-all duration-300 transform-gpu overflow-hidden group ${
                    hasFallen 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 -translate-y-48 pointer-events-none"
                  } ${
                    isHovered
                      ? "border-[#173f32] shadow-[0_25px_50px_-12px_rgba(23,63,50,0.35)] scale-[1.04] z-30 ring-4 ring-[#173f32]/20"
                      : "border-black/10 shadow-xl hover:shadow-2xl hover:border-slate-400"
                  } ${
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
                  {/* Full Edge-to-Edge Image Covering the Entire Hanging Card (Zero Text) */}
                  <img
                    src={resume.image}
                    alt={resume.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
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
          className="fixed inset-0 z-50 bg-[#F8F9FA]/98 backdrop-blur-2xl overflow-y-auto animate-fade-in flex flex-col selection:bg-[#173f32] selection:text-white"
        >
          {/* Top Control Bar */}
          <header className="sticky top-0 z-50 h-16 bg-white/95 border-b border-[#1E293B]/10 px-6 sm:px-12 flex items-center justify-between shadow-2xs backdrop-blur-md">
            
            {/* Left: Branding & Status */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#173f32] to-[#10B981] flex items-center justify-center text-white font-extrabold text-xs">
                FV
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-[#1E293B] uppercase tracking-wider">
                  Full Screen Portfolio Showcase
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-bold text-[#173f32] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  {expandedResume.categoryLabel}
                </span>
              </div>
            </div>

            {/* Right: Actions & Close (ESC) */}
            <div className="flex items-center gap-3">
              <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                ● Active Template
              </span>

              <Link
                href="/onboarding"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#173f32] hover:bg-[#13352a] text-[#f7f4eb] text-xs font-bold shadow-md transition-all hover:scale-105"
              >
                <span>Adopt This Style Free</span>
                <ArrowRight size={13} />
              </Link>

              <button
                onClick={() => setExpandedResume(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-[#1E293B] text-slate-700 hover:text-white font-bold text-xs transition-colors border border-slate-200 cursor-pointer"
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
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#173f32] bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full">
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
                  <Download size={14} /> Tailor Resume
                </Link>
                <Link
                  href="/onboarding"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#173f32] hover:bg-[#13352a] text-[#f7f4eb] text-xs font-bold transition shadow-xs"
                >
                  <Sparkles size={14} className="text-[#ebd800]" /> Use This Template
                </Link>
              </div>
            </div>

            {/* 2. LIVE RETINA PORTFOLIO WEBSITE SHOWCASE (High-Craft Vector Browser Frame) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-extrabold text-[#173f32] uppercase tracking-wider flex items-center gap-2">
                  <Globe size={14} /> LIVE FOLIOIN ARCHITECTURE BLUEPRINT &amp; DESIGN
                </h2>
                <span className="text-[11px] font-bold text-slate-500 hidden sm:inline">
                  Interactive Retina Preview
                </span>
              </div>

              <div className="bg-slate-950 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-4 overflow-hidden">
                {/* Browser Top Window Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                    <div className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 text-xs text-slate-300 font-mono ml-2 truncate max-w-xs sm:max-w-md">
                      https://folioin.dev/p/{expandedResume.id}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-full">
                      ● Active Deployment
                    </span>
                  </div>
                </div>

                {/* Real High-Resolution Portfolio Photo */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
                  <img
                    src={expandedResume.image}
                    alt={`${expandedResume.name} Full Portfolio Preview`}
                    className="w-full h-auto max-h-[460px] object-cover object-top"
                  />
                  <div className="absolute bottom-3 right-3">
                    {expandedResume.livePreviewUrl && (
                      <Link
                        href={expandedResume.livePreviewUrl}
                        target="_blank"
                        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-xl"
                      >
                        <ExternalLink size={13} /> Open Live Site ↗
                      </Link>
                    )}
                  </div>
                </div>

                {/* Simulated Live Portfolio Canvas */}
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-6 text-white">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        {expandedResume.badge}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                        {expandedResume.name}
                      </h3>
                      <p className="text-sm text-slate-300">
                        {expandedResume.role}
                      </p>
                    </div>

                    <Link
                      href="/onboarding"
                      className="px-4 py-2 rounded-xl bg-white text-slate-950 text-xs font-bold hover:bg-slate-100 transition shadow-xs self-start sm:self-auto"
                    >
                      Clone Layout →
                    </Link>
                  </div>

                  {/* Flagship Artifact Card */}
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase">
                        Featured Artifact
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#ebd800] text-[#173f32] text-[10px] font-bold">
                        {expandedResume.liveProject.tag}
                      </span>
                    </div>
                    <div className="text-base font-bold text-white">
                      {expandedResume.liveProject.title}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {expandedResume.liveProject.description}
                    </p>
                  </div>

                  {/* Skills Grid */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {expandedResume.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-lg bg-white/10 text-slate-200 text-xs font-medium border border-white/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Key Metrics Bar */}
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

            {/* 4. Executive Summary */}
            <div className="space-y-3">
              <h2 className="text-xs font-extrabold text-[#173f32] uppercase tracking-wider">
                Executive Profile
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                {expandedResume.summary}
              </p>
            </div>

            {/* 5. Experience & Career Timeline */}
            <div className="space-y-6">
              <h2 className="text-xs font-extrabold text-[#173f32] uppercase tracking-wider flex items-center gap-2">
                <Briefcase size={14} /> VERIFIED CAREER HISTORY
              </h2>
              <div className="space-y-6">
                {expandedResume.experience.map((exp, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-lg font-extrabold text-[#1E293B]">
                        {exp.role} <span className="text-[#173f32]">@ {exp.company}</span>
                      </h3>
                      <span className="text-xs font-bold text-slate-500 font-mono">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 font-normal leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="pt-2 text-xs font-bold text-[#1E293B] bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-[#10B981]" />
                      <span>{exp.metrics}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Featured Live Project */}
            <div className="space-y-4">
              <h2 className="text-xs font-extrabold text-[#173f32] uppercase tracking-wider flex items-center gap-2">
                <Code2 size={14} /> FLAGSHIP SHOWCASE PROJECT
              </h2>
              <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-extrabold text-white">
                      {expandedResume.liveProject.title}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
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

            {/* 7. Skills & Education Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
              
              {/* Skills */}
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Award size={14} className="text-[#173f32]" /> Core Competencies &amp; Technologies
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
                  <GraduationCap size={14} className="text-[#173f32]" /> Education &amp; Credentials
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

            {/* 8. Endorsement Callout */}
            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <span className="text-[10px] font-extrabold text-[#173f32] uppercase tracking-wider">
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
                Showing full profile snapshot on FolioIn Front Page. Press <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[10px]">ESC</kbd> to return.
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setExpandedResume(null)}
                  className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer"
                >
                  Return to Home
                </button>
                <Link
                  href="/onboarding"
                  className="px-6 py-2.5 rounded-full bg-[#173f32] hover:bg-[#13352a] text-white text-xs font-bold transition-all shadow-md shadow-[#173f32]/20"
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
