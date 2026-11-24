"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight, 
  Sparkles, 
  FileText, 
  Check, 
  ExternalLink 
} from "lucide-react";

export interface CarouselResumeTemplate {
  id: string;
  templateParam: string;
  candidateName: string;
  role: string;
  subtitle: string;
  category: "sidebar" | "banner" | "classic" | "creative";
  accentColor: string;
  photoUrl?: string;
  summary: string;
  experience: { role: string; company: string; period: string; bullets: string[] }[];
  education: { degree: string; school: string; year: string }[];
  skills: string[];
  languages?: { lang: string; level: number }[];
}

export const FLOWCV_TEMPLATES: CarouselResumeTemplate[] = [
  {
    id: "yassine-ben-salem",
    templateParam: "hunter-green",
    candidateName: "Yassine Ben Salem",
    role: "Sales Manager",
    subtitle: "Hunter Green Architectural Sidebar",
    category: "sidebar",
    accentColor: "#143528",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
    summary: "Results-driven Sales Manager with 6+ years of experience in B2B sales, account development, and client relationship management across diverse markets.",
    experience: [
      {
        role: "Sales Manager",
        company: "Pacific Connect",
        period: "2022 – Present",
        bullets: [
          "Manage a portfolio of key business accounts with $4.2M pipeline.",
          "Lead quarterly sales planning and improved conversion rates by 28%."
        ]
      },
      {
        role: "Senior Sales Executive",
        company: "Megabool Business",
        period: "2019 – 2022",
        bullets: [
          "Owned full sales cycle from prospecting to negotiation and closing.",
          "Exceeded quota for 8 consecutive quarters."
        ]
      }
    ],
    education: [{ degree: "Master's Degree in Marketing", school: "Tunis Business School", year: "2018" }],
    skills: ["Account Management", "Lead Generation", "Negotiation", "CRM Management", "Sales Forecasting"],
    languages: [{ lang: "Arabic", level: 5 }, { lang: "English", level: 5 }, { lang: "French", level: 4 }]
  },
  {
    id: "alejandro-herrera",
    templateParam: "cobalt-edge",
    candidateName: "Alejandro Herrera",
    role: "Sales Manager",
    subtitle: "Cobalt Edge Royal Blue Hero",
    category: "banner",
    accentColor: "#1D4ED8",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
    summary: "Results-driven sales professional with 7+ years of experience in B2B account growth, client relationship management, and regional sales execution.",
    experience: [
      {
        role: "Sales Manager",
        company: "Grupo Delta Comercial",
        period: "2022 – Present",
        bullets: [
          "Manage regional accounts and consistently exceed quarterly revenue targets.",
          "Lead pipeline reviews and customer retention workflows."
        ]
      },
      {
        role: "Senior Sales Executive",
        company: "Nova Industrial Solutions",
        period: "2019 – 2022",
        bullets: [
          "Delivered year-over-year sales growth of 34% across northern territories."
        ]
      }
    ],
    education: [{ degree: "Bachelor of Business Administration", school: "Tecnológico de Monterrey", year: "2018" }],
    skills: ["Pipeline Forecasting", "CRM Management", "Revenue Growth", "Client Retention", "Sales Reporting"],
    languages: [{ lang: "Spanish", level: 5 }, { lang: "English", level: 4 }]
  },
  {
    id: "aisha-rahman",
    templateParam: "atlantic-blue",
    candidateName: "Aisha Rahman",
    role: "Product Manager",
    subtitle: "Executive Dark Charcoal Sidebar",
    category: "sidebar",
    accentColor: "#1E293B",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces",
    summary: "Product Manager with 6 years of experience delivering digital products across fintech and consumer platforms. Strong background in cross-functional alignment and roadmap planning.",
    experience: [
      {
        role: "Product Manager",
        company: "bKash",
        period: "2022 – Present",
        bullets: [
          "Own product roadmap for mobile payment features serving 40M+ active users.",
          "Lead cross-functional delivery with engineering, design, and compliance."
        ]
      },
      {
        role: "Associate Product Manager",
        company: "Pathao",
        period: "2019 – 2022",
        bullets: [
          "Managed feature launches for app booking and payment experience improvements."
        ]
      }
    ],
    education: [{ degree: "MBA, Marketing", school: "University of Dhaka", year: "2022" }],
    skills: ["Product Roadmap", "User Research", "Agile Delivery", "Data Analysis", "SQL", "A/B Testing"],
    languages: [{ lang: "Bengali", level: 5 }, { lang: "English", level: 5 }]
  },
  {
    id: "andrew-osullivan",
    templateParam: "classic-serif",
    candidateName: "Andrew O'Sullivan",
    role: "Product Manager",
    subtitle: "Classic Executive Single-Column",
    category: "classic",
    accentColor: "#334155",
    summary: "Product Manager with experience leading digital product initiatives across customer-facing and internal business platforms. Strong background in roadmap planning and metrics.",
    experience: [
      {
        role: "Product Manager",
        company: "BrightLine Technologies",
        period: "2022 – Present",
        bullets: [
          "Own product roadmap for onboarding and account management features.",
          "Partner with design and engineering to deliver quarterly releases on schedule."
        ]
      },
      {
        role: "Associate Product Manager",
        company: "Northbridge Digital",
        period: "2019 – 2022",
        bullets: [
          "Supported launch of self-service tools reducing support requests by 24%."
        ]
      }
    ],
    education: [{ degree: "MSc in Digital Innovation", school: "University College Dublin", year: "2019" }],
    skills: ["Roadmapping", "Backlog Prioritization", "Cross-Functional Collaboration", "Go-To-Market"],
    languages: [{ lang: "English", level: 5 }, { lang: "French", level: 4 }]
  },
  {
    id: "oliver-clarke",
    templateParam: "cobalt-edge",
    candidateName: "Oliver Clarke",
    role: "Project Assistant",
    subtitle: "Dark Header Card with Avatar",
    category: "banner",
    accentColor: "#1E3A8A",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
    summary: "Detail-oriented Project Assistant with internship and early-career experience supporting project planning, documentation, and stakeholder coordination.",
    experience: [
      {
        role: "Project Assistant",
        company: "Northbridge Solutions",
        period: "2023 – Present",
        bullets: [
          "Supported schedule tracking and weekly status updates across client projects."
        ]
      },
      {
        role: "Project Intern",
        company: "Alder Project Services",
        period: "2022 – 2023",
        bullets: [
          "Assisted project managers with task follow-ups and documentation."
        ]
      }
    ],
    education: [{ degree: "BA (Hons) Business Management", school: "Manchester Metropolitan University", year: "2024" }],
    skills: ["Project Coordination", "Scheduling Support", "Stakeholder Communication", "Excel"],
    languages: [{ lang: "English", level: 5 }, { lang: "Spanish", level: 3 }]
  },
  {
    id: "mariana-costa-ribeiro",
    templateParam: "mercury-flow",
    candidateName: "Mariana Costa Ribeiro",
    role: "Finance Manager",
    subtitle: "Centered Portrait & Two-Column Layout",
    category: "banner",
    accentColor: "#0F766E",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces",
    summary: "Finance professional with 7 years of experience across budgeting, financial reporting, and business performance analysis in fast-paced corporate environments.",
    experience: [
      {
        role: "Finance Manager",
        company: "Natura & Co",
        period: "2022 – Present",
        bullets: [
          "Manage monthly budgeting cycles and variance analysis for two business units.",
          "Lead reporting improvements reducing closing timelines by three days."
        ]
      },
      {
        role: "Senior Financial Analyst",
        company: "Raizen",
        period: "2019 – 2022",
        bullets: [
          "Delivered monthly performance reports for leadership across revenue lines."
        ]
      }
    ],
    education: [{ degree: "MBA in Finance", school: "Fundacao Getulio Vargas", year: "2022" }],
    skills: ["Financial Planning", "Budget Management", "Forecasting", "Variance Analysis", "SAP"],
    languages: [{ lang: "Portuguese", level: 5 }, { lang: "English", level: 4 }]
  },
  {
    id: "ahmed-hassan",
    templateParam: "editorial-rule",
    candidateName: "Ahmed Hassan",
    role: "Head of Engineering",
    subtitle: "Editorial Rule Clean ATS",
    category: "classic",
    accentColor: "#18181B",
    summary: "Engineering leader with over 12 years of experience leading distributed software teams, scaling cloud architectures, and optimizing developer velocity.",
    experience: [
      {
        role: "Head of Engineering",
        company: "NileWorks Infrastructure",
        period: "2022 – Present",
        bullets: [
          "Directed engineering strategy across cloud and platform teams supporting 5M+ DAU.",
          "Reduced cloud infrastructure costs by 32% via Kubernetes optimizations."
        ]
      },
      {
        role: "Engineering Director",
        company: "Delta Solutions",
        period: "2018 – 2022",
        bullets: [
          "Scaled engineering organization from 15 to 80+ engineers across 4 hubs."
        ]
      }
    ],
    education: [{ degree: "Executive Program in Operations", school: "German University in Cairo", year: "2018" }],
    skills: ["Engineering Leadership", "Cloud Architecture", "System Reliability", "Kubernetes", "Microservices"],
    languages: [{ lang: "Arabic", level: 5 }, { lang: "English", level: 5 }]
  },
  {
    id: "emily-carter",
    templateParam: "classic-clear",
    candidateName: "Emily Carter",
    role: "Project Manager",
    subtitle: "Classic Clear 100% ATS Safe",
    category: "classic",
    accentColor: "#0F172A",
    summary: "Project Manager with 6+ years of experience coordinating cross-functional initiatives in technology and business operations. Skilled in stakeholder management and sprint planning.",
    experience: [
      {
        role: "Project Manager",
        company: "TechNova Global",
        period: "2022 – Present",
        bullets: [
          "Managed release plans across product, engineering, and operations workstreams.",
          "Reduced delivery variance by 28% through automated metrics tracking."
        ]
      },
      {
        role: "Project Coordinator",
        company: "CloudPulse Solutions",
        period: "2020 – 2022",
        bullets: [
          "Supported schedule, budgets, and documentation for enterprise transformation."
        ]
      }
    ],
    education: [{ degree: "Bachelor of Commerce in Management", school: "University of Toronto", year: "2018" }],
    skills: ["Project Planning", "Risk Management", "Budget Tracking", "Agile Delivery", "Jira"],
    languages: [{ lang: "English", level: 5 }, { lang: "French", level: 3 }]
  },
  {
    id: "brian-t-wayne",
    templateParam: "atlantic-blue",
    candidateName: "Brian T. Wayne",
    role: "Business Development Consultant",
    subtitle: "Atlantic Blue Executive Navy Sidebar",
    category: "sidebar",
    accentColor: "#1E293B",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
    summary: "Business Development consultant with a passion for helping companies achieve growth potential. Skilled in market research, strategic planning, and contract negotiation.",
    experience: [
      {
        role: "Business Development Consultant",
        company: "Applied Inc.",
        period: "2022 – Present",
        bullets: [
          "Developed and implemented strategic plans resulting in 32% increase in new business.",
          "Collaborated with cross-functional teams to drive business development initiatives."
        ]
      }
    ],
    education: [{ degree: "Master of Business Administration", school: "Harvard Business School", year: "2019" }],
    skills: ["Strategic Planning", "Relationship Building", "Sales Development", "Client Relations"],
    languages: [{ lang: "English", level: 5 }, { lang: "Spanish", level: 4 }]
  },
  {
    id: "camila-rivera",
    templateParam: "mercury-flow",
    candidateName: "Camila Rivera",
    role: "Sales Manager",
    subtitle: "Mercury Flow Gradient Banner Card",
    category: "banner",
    accentColor: "#475569",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces",
    summary: "Results-driven sales professional with 6+ years of experience in account growth, client relationship management, and pipeline development across B2B enterprise software.",
    experience: [
      {
        role: "Sales Manager",
        company: "BrightPath Business Solutions",
        period: "2021 – Present",
        bullets: [
          "Manage portfolio of mid-market clients across retail and service sectors.",
          "Lead quarterly sales planning and consistently exceed revenue quotas."
        ]
      }
    ],
    education: [{ degree: "Bachelor of Business Administration", school: "Florida International University", year: "2018" }],
    skills: ["Account Management", "CRM Management", "Sales Forecasting", "Negotiation"],
    languages: [{ lang: "English", level: 5 }, { lang: "Spanish", level: 5 }]
  },
  {
    id: "daniel-mercer",
    templateParam: "true-blue",
    candidateName: "Daniel Mercer",
    role: "Vice President of Sales",
    subtitle: "True Blue Compact 3-Column Grid",
    category: "classic",
    accentColor: "#1E40AF",
    summary: "Sales executive with 10+ years of experience supporting revenue growth in B2B technology. Skilled in account management, pipeline development, and leadership.",
    experience: [
      {
        role: "Sales Manager",
        company: "Nexus Software",
        period: "2022 – Present",
        bullets: [
          "Manage a team of account executives across mid-market accounts.",
          "Improve pipeline tracking and weekly forecast accuracy."
        ]
      }
    ],
    education: [{ degree: "Bachelor of Science in Marketing", school: "Indiana University", year: "2012" }],
    skills: ["Sales Strategy", "Revenue Growth", "Enterprise Accounts", "Team Leadership", "Forecasting", "Negotiation"],
    languages: [{ lang: "English", level: 5 }]
  },
  {
    id: "sarah-watson",
    templateParam: "happy-geo",
    candidateName: "Sarah Watson",
    role: "Web Developer",
    subtitle: "Happy Geo Playful Accents",
    category: "creative",
    accentColor: "#EA580C",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
    summary: "Driven and enthusiastic Web Developer with a strong passion for crafting responsive, user-friendly experiences with modern React, TypeScript, and Tailwind CSS.",
    experience: [
      {
        role: "Web Developer",
        company: "Hyperlink Studios",
        period: "2022 – Present",
        bullets: [
          "Delivered interactive web portals improving user retention by 24%."
        ]
      }
    ],
    education: [{ degree: "BSc in Computer Science", school: "San Francisco Bay University", year: "2021" }],
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Node.js"],
    languages: [{ lang: "English", level: 5 }]
  }
];

export function CuratedArtworksGallery() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activePageIndex, setActivePageIndex] = useState(0);

  const checkScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);

    const totalPages = Math.ceil(FLOWCV_TEMPLATES.length / 3);
    const progress = scrollLeft / (scrollWidth - clientWidth || 1);
    const newPage = Math.min(totalPages - 1, Math.round(progress * (totalPages - 1)));
    setActivePageIndex(newPage);
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.85;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollToPage = (pageIdx: number) => {
    if (!carouselRef.current) return;
    const totalPages = Math.ceil(FLOWCV_TEMPLATES.length / 3);
    const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
    const targetScroll = (pageIdx / (totalPages - 1)) * maxScroll;
    carouselRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  return (
    <section id="resume-templates" className="py-20 sm:py-28 bg-[#F6F6F9] overflow-hidden border-y border-slate-200/80">
      
      {/* ── HEADER (MATCHING FLOWCV) ── */}
      <div className="max-w-4xl mx-auto text-center px-6 mb-12 sm:mb-16 space-y-3">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#171725]">
          Choose from 100+ Resume Templates
        </h2>
        <p className="text-base sm:text-lg text-slate-600 font-normal">
          Our{" "}
          <Link
            href="/resume"
            className="underline underline-offset-4 font-semibold text-slate-900 hover:text-[#173f32] transition-colors"
          >
            free resume templates
          </Link>{" "}
          help you create a professional resume that stands out.
        </p>
      </div>

      {/* ── HORIZONTAL RESUME SHEETS CAROUSEL ── */}
      <div className="relative group/carousel max-w-[1700px] mx-auto">
        
        {/* Left Arrow Button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            aria-label="Previous templates"
            className="hidden sm:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/95 text-slate-800 shadow-xl border border-slate-200/80 items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Right Arrow Button */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            aria-label="Next templates"
            className="hidden sm:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/95 text-slate-800 shadow-xl border border-slate-200/80 items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Horizontal Scroll Track of Vertical A4 Resume Sheets */}
        <div
          ref={carouselRef}
          className="flex gap-6 sm:gap-8 overflow-x-auto scrollbar-none px-6 sm:px-12 md:px-20 py-6 items-stretch scroll-smooth cursor-grab active:cursor-grabbing"
        >
          {FLOWCV_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              className="w-[280px] sm:w-[320px] md:w-[340px] shrink-0 bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 border border-slate-200/90 transition-all duration-300 overflow-hidden flex flex-col justify-between group relative select-none"
            >
              {/* ── MINI REALISTIC RESUME CANVAS SHEET (A4 PROPORTIONS) ── */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col text-[9px] leading-tight text-slate-800 font-sans min-h-[440px] sm:min-h-[480px]">
                
                {/* 1. SIDEBAR LAYOUTS (Yassine Ben Salem, Aisha Rahman, Brian T. Wayne) */}
                {tmpl.category === "sidebar" && (
                  <div className="flex-1 grid grid-cols-12 -m-4 sm:-m-5 overflow-hidden">
                    {/* Left Dark Sidebar (35%) */}
                    <div
                      className="col-span-4 p-3.5 flex flex-col justify-between text-white space-y-3"
                      style={{ backgroundColor: tmpl.accentColor }}
                    >
                      <div className="space-y-3">
                        {tmpl.photoUrl && (
                          <div className="flex justify-center pt-1">
                            <img
                              src={tmpl.photoUrl}
                              alt={tmpl.candidateName}
                              className="w-12 h-12 rounded-full object-cover border border-white/40 shadow-xs"
                            />
                          </div>
                        )}
                        <div className="space-y-1.5 text-[8px] text-slate-200">
                          <div className="w-full h-1 bg-white/20 rounded-full" />
                          <div className="w-4/5 h-1 bg-white/20 rounded-full" />
                          <div className="w-full h-1 bg-white/20 rounded-full" />
                        </div>

                        {/* Sidebar Skills Badges */}
                        <div className="space-y-1 pt-1">
                          <div className="text-[7.5px] uppercase font-bold tracking-wider opacity-60">Skills</div>
                          <div className="flex flex-wrap gap-1">
                            {tmpl.skills.slice(0, 4).map((s, idx) => (
                              <span
                                key={idx}
                                className="px-1 py-0.5 rounded-sm bg-white/15 text-[7px] font-medium"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Languages with Dots */}
                        {tmpl.languages && (
                          <div className="space-y-1 pt-1">
                            <div className="text-[7.5px] uppercase font-bold tracking-wider opacity-60">Languages</div>
                            {tmpl.languages.map((l, lidx) => (
                              <div key={lidx} className="flex items-center justify-between text-[7px]">
                                <span>{l.lang}</span>
                                <div className="flex gap-0.5">
                                  {[1, 2, 3, 4, 5].map((dot) => (
                                    <div
                                      key={dot}
                                      className={`w-1 h-1 rounded-full ${
                                        dot <= l.level ? "bg-white" : "bg-white/20"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Main Body (65%) */}
                    <div className="col-span-8 p-4 space-y-2.5 bg-white">
                      <div>
                        <div className="font-extrabold text-[12px] uppercase text-slate-900 tracking-tight">
                          {tmpl.candidateName}
                        </div>
                        <div className="text-[8.5px] font-bold text-slate-600">
                          {tmpl.role}
                        </div>
                      </div>

                      <div className="text-[7.5px] text-slate-600 leading-snug line-clamp-3">
                        {tmpl.summary}
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <div className="text-[8px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">
                          Professional Experience
                        </div>
                        {tmpl.experience.map((exp, eidx) => (
                          <div key={eidx} className="space-y-0.5">
                            <div className="flex justify-between text-[8px] font-bold text-slate-800">
                              <span>{exp.role}</span>
                              <span className="text-[7px] text-slate-500 font-normal">{exp.period}</span>
                            </div>
                            <div className="text-[7.5px] text-slate-500 italic">{exp.company}</div>
                            {exp.bullets.map((b, bidx) => (
                              <div key={bidx} className="text-[7px] text-slate-600 flex items-start gap-1 pl-1">
                                <span className="text-slate-400">•</span>
                                <span className="line-clamp-1">{b}</span>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>

                      <div className="space-y-1 pt-1">
                        <div className="text-[8px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">
                          Education
                        </div>
                        {tmpl.education.map((edu, eduidx) => (
                          <div key={eduidx} className="text-[7.5px] text-slate-700">
                            <span className="font-bold">{edu.degree}</span>, {edu.school}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. TOP BANNER / HEADER CARD LAYOUTS (Alejandro Herrera, Oliver Clarke, Mariana Costa Ribeiro, Camila Rivera) */}
                {tmpl.category === "banner" && (
                  <div className="flex-1 space-y-2.5 flex flex-col justify-between">
                    <div>
                      {/* Hero Banner Header */}
                      <div
                        className="-m-4 sm:-m-5 p-3 text-white flex items-center justify-between mb-3"
                        style={{ backgroundColor: tmpl.accentColor }}
                      >
                        <div className="space-y-0.5">
                          <div className="font-extrabold text-[12px] uppercase tracking-tight">
                            {tmpl.candidateName}
                          </div>
                          <div className="text-[8.5px] text-white/80 font-medium">
                            {tmpl.role}
                          </div>
                        </div>
                        {tmpl.photoUrl && (
                          <img
                            src={tmpl.photoUrl}
                            alt={tmpl.candidateName}
                            className="w-10 h-10 rounded-full object-cover border border-white/60 shadow-xs shrink-0 ml-2"
                          />
                        )}
                      </div>

                      <div className="text-[7.5px] text-slate-600 leading-snug line-clamp-3 mb-2">
                        {tmpl.summary}
                      </div>

                      {/* Work Experience */}
                      <div className="space-y-1.5">
                        <div
                          className="text-[8px] font-extrabold uppercase tracking-wider border-b pb-0.5"
                          style={{ color: tmpl.accentColor, borderColor: `${tmpl.accentColor}30` }}
                        >
                          Professional Experience
                        </div>
                        {tmpl.experience.map((exp, eidx) => (
                          <div key={eidx} className="space-y-0.5">
                            <div className="flex justify-between text-[8px] font-bold text-slate-800">
                              <span>{exp.role} <span className="font-normal text-slate-500">— {exp.company}</span></span>
                              <span className="text-[7px] text-slate-400">{exp.period}</span>
                            </div>
                            {exp.bullets.map((b, bidx) => (
                              <div key={bidx} className="text-[7px] text-slate-600 flex items-start gap-1 pl-1">
                                <span className="text-slate-400">•</span>
                                <span className="line-clamp-1">{b}</span>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Split: Skills & Education */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                      <div>
                        <div className="text-[7.5px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Skills
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {tmpl.skills.slice(0, 4).map((s, idx) => (
                            <span
                              key={idx}
                              className="px-1 py-0.5 rounded-sm bg-slate-100 text-[7px] text-slate-700 font-medium border border-slate-200"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-[7.5px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Education
                        </div>
                        {tmpl.education.map((edu, eduidx) => (
                          <div key={eduidx} className="text-[7px] text-slate-600 leading-tight">
                            <div className="font-bold text-slate-800">{edu.degree}</div>
                            <div>{edu.school}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. CLASSIC SINGLE COLUMN ATS LAYOUTS (Andrew O'Sullivan, Emily Carter, Daniel Mercer, Ahmed Hassan) */}
                {tmpl.category === "classic" && (
                  <div className="flex-1 space-y-2 flex flex-col justify-between">
                    <div>
                      {/* Centered / Minimalist Header */}
                      <div className="text-center pb-1.5 border-b border-slate-300">
                        <div className="font-bold text-[13px] uppercase text-slate-900 tracking-tight">
                          {tmpl.candidateName}
                        </div>
                        <div className="text-[8px] text-slate-600 font-medium">
                          {tmpl.role}
                        </div>
                        <div className="text-[6.5px] text-slate-400 mt-0.5">
                          candidate@example.com • +1 555-0192 • linkedin.com/in/profile
                        </div>
                      </div>

                      <div className="mt-1.5">
                        <div className="text-[7.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-1">
                          Summary
                        </div>
                        <div className="text-[7px] text-slate-600 leading-snug line-clamp-2">
                          {tmpl.summary}
                        </div>
                      </div>

                      <div className="mt-2 space-y-1">
                        <div className="text-[7.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">
                          Professional Experience
                        </div>
                        {tmpl.experience.map((exp, eidx) => (
                          <div key={eidx} className="space-y-0.5">
                            <div className="flex justify-between text-[7.5px] font-bold text-slate-800">
                              <span>{exp.role}, {exp.company}</span>
                              <span className="text-[6.5px] text-slate-400">{exp.period}</span>
                            </div>
                            {exp.bullets.map((b, bidx) => (
                              <div key={bidx} className="text-[6.5px] text-slate-600 flex items-start gap-1 pl-1">
                                <span>•</span>
                                <span className="line-clamp-1">{b}</span>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1 pt-1.5 border-t border-slate-200">
                      <div className="text-[7.5px] font-bold uppercase tracking-wider text-slate-900">
                        Core Competencies
                      </div>
                      <div className="flex flex-wrap gap-1 text-[7px] text-slate-700">
                        {tmpl.skills.slice(0, 5).map((s, idx) => (
                          <span key={idx} className="bg-slate-50 px-1 py-0.5 rounded border border-slate-200">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. CREATIVE ACCENTS (Sarah Watson Happy Geo) */}
                {tmpl.category === "creative" && (
                  <div className="flex-1 space-y-2 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-orange-400 to-amber-400 rounded-bl-xl opacity-75" />
                    <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-br-xl opacity-75" />
                    
                    <div className="pt-2 px-1">
                      <div className="flex items-center gap-2 mb-2">
                        {tmpl.photoUrl && (
                          <img
                            src={tmpl.photoUrl}
                            alt={tmpl.candidateName}
                            className="w-9 h-9 rounded-xl object-cover border border-orange-300 shadow-2xs shrink-0"
                          />
                        )}
                        <div>
                          <div className="font-extrabold text-[12px] text-slate-900">
                            {tmpl.candidateName}
                          </div>
                          <div className="text-[8px] font-bold text-teal-700 uppercase">
                            {tmpl.role}
                          </div>
                        </div>
                      </div>

                      <div className="text-[7px] text-slate-600 leading-snug line-clamp-3 p-1.5 bg-orange-50/70 rounded-lg border border-orange-200/60 mb-2">
                        {tmpl.summary}
                      </div>

                      <div className="space-y-1">
                        <div className="text-[7.5px] font-extrabold uppercase text-slate-900 border-b border-teal-500 pb-0.5">
                          Career Journey
                        </div>
                        {tmpl.experience.map((exp, eidx) => (
                          <div key={eidx} className="space-y-0.5">
                            <div className="flex justify-between text-[7.5px] font-bold text-slate-800">
                              <span>{exp.role} @ {exp.company}</span>
                              <span className="text-[6.5px] text-slate-400">{exp.period}</span>
                            </div>
                            {exp.bullets.map((b, bidx) => (
                              <div key={bidx} className="text-[6.5px] text-slate-600 flex items-start gap-1 pl-1">
                                <span className="text-teal-600">•</span>
                                <span className="line-clamp-1">{b}</span>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-1.5 border-t border-slate-200">
                      <div className="text-[7.5px] font-bold uppercase text-slate-700 mb-1">
                        Skills
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {tmpl.skills.slice(0, 4).map((s, idx) => (
                          <span key={idx} className="px-1 py-0.5 rounded-full bg-teal-50 text-teal-900 border border-teal-200 text-[6.5px] font-bold">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ── HOVER ACTION OVERLAY WITH DIRECT LINK TO RESUME STUDIO ── */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <div className="font-bold text-xs text-slate-900 truncate">
                    {tmpl.candidateName}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {tmpl.subtitle}
                  </div>
                </div>

                <Link
                  href={`/resume?template=${tmpl.templateParam}`}
                  className="px-3 py-1.5 rounded-xl bg-[#173f32] hover:bg-[#13352a] text-white text-[11px] font-bold transition-all shadow-xs flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <span>Customize</span>
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PAGINATION DOTS (MATCHING FLOWCV VIDEO) ── */}
      <div className="flex items-center justify-center gap-2 pt-6">
        {[0, 1, 2, 3].map((dotIdx) => (
          <button
            key={dotIdx}
            onClick={() => scrollToPage(dotIdx)}
            aria-label={`Go to slide group ${dotIdx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              activePageIndex === dotIdx
                ? "w-7 h-2.5 bg-[#173f32]"
                : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export const ResumeTemplatesGallery = CuratedArtworksGallery;
export default CuratedArtworksGallery;
