"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Globe,
  Code2,
  FileText,
  Star,
  Zap,
  Laptop,
  CheckCircle2,
  ArrowUpRight,
  ChevronDown,
  Layers,
  Terminal,
  Cpu,
  LogOut,
  Mail,
  Lock,
} from "lucide-react";
import { FolioInLogo } from "@/components/ui/Logo";
import { HangingResumesGallery } from "@/components/portfolio/HangingResumesGallery";
import { CuratedArtworksGallery } from "@/components/portfolio/CuratedArtworksGallery";
import { FolioTreeHeroAnimation } from "@/components/portfolio/FolioTreeHeroAnimation";
import ArtShowcaseHeroCard from "@/components/portfolio/ArtShowcaseHeroCard";
import { AiAgentWidget } from "@/components/portfolio/AiAgentWidget";
import { SignInModal } from "@/components/auth/SignInModal";
import {
  ScrollProgressNeonBar,
  AmbientCursorFollower,
  TiltSpotlightCard,
  MagneticButton,
  InfiniteMarqueeRibbon,
  LiveTerminalTyper,
  ConcentricRadarPing,
  ConstellationDustField,
  LaserBorderBeam,
  CounterTicker,
  MeshGlowGradientOrb,
  TextShimmerWave,
  SoundwaveEqualizer,
  MorphingBlobCanvas,
  Flip3DCard,
  MatrixRainStream,
  ElasticCursorTag,
  HoloParallaxBadge,
  LiveCodeSyntaxStreamer,
  SparkleBurstEmitter,
  WorldPingHeartbeat,
  FloatingActionIsland,
  GlassGlareEffect,
  MagneticPillBadge,
  CircularGaugeProgress,
} from "@/components/ui/AdvancedAnimationsSuite";
import {
  CyberGridScanner,
  LiveFpsCounter,
  QuantumCircuitTracer,
  HexagonShieldMatrix,
  BinaryDataStreamer,
  SatelliteOrbitRadar,
  BlinkingPromptCaret,
  DataPacketPulse,
  GeoCoordinateHUD,
  ServerRackActivityLeds,
  MagneticGlitchText,
  RippleHoverButton,
  LiquidButtonGlow,
  Hover3DDepthStack,
  InteractiveCompassRose,
  TextScrambleDecryption,
  ParallaxFloatingStickers,
  BorderCornerReticle,
  ElasticIconSpring,
  CursorProximityGlow,
  NebulaCloudDrift,
  StarlightTwinkleCluster,
  FloatingBubbleOrbs,
  AuroraBorealisCurtain,
  DigitalRaindropRipples,
  EnergyBeamSeparator,
  LuminousPollenDrift,
  HolographicPrismRefractor,
  VortexParticleSpiral,
  GlassmorphismBlurWipe,
  RealtimeLatencyGraph,
  MemoryAllocationBar,
  CircularRadarSweep,
  SkillProgressLiquidRings,
  CommitActivityHeatmap,
  NumberRollCounter,
  DynamicPieDonutChart,
  BatteryHealthGauge,
  SignalStrengthBars,
  TokenVelocityTicker,
  AccordionSpringMorph,
  InfinitePerspectiveCarousel,
  SplitTextCascadeReveal,
  MorphingSvgIcon,
  GlowingLaserRibbon,
  InteractiveAudioSpectrum,
  KineticTypographyTicker,
  SpotlightRevealWindow,
  FloatingCardShadowDynamics,
  GlitchNoiseCanvas,
} from "@/components/ui/HighTechAnimations50";

export default function NotYourCollegeHomePage() {
  const { data: session } = useSession();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [handleInput, setHandleInput] = useState("");
  const [activeTab, setActiveTab] = useState<"learnhouse" | "shivam" | "kenji" | "randy" | "alsa">("learnhouse");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const showcaseThemes = {
    learnhouse: {
      name: "Learn@House Platform",
      subtitle: "Deep forest teal SaaS lead engine (#113A33), 5.0-star reviews, and interactive course onboarding.",
      accent: "#10B981",
      badge: "LEARN@HOUSE • SAAS & EDTECH",
      previewUrl: "/p/David%20Vance?theme=luxe-creative",
      bgClass: "bg-[#0c241f] text-[#e8f5f0]",
      cardBorder: "border-emerald-500/30",
      image: "/images/portfolios/portfolio-learn-house.jpg",
      unit1Title: "LeadFinder Autonomous Engine",
      unit1Desc: "Real-time email verification and lead database with instant domain lookup serving 20M+ queries.",
      unit1Tag: "20M+ Users • Verified",
      unit2Title: "Interactive Course Flow",
      unit2Desc: "Friction-free onboarding and interactive learning modules across 160+ masterclasses.",
      unit2Tag: "160+ Masterclasses",
      unit3Title: "SaaS Growth Flywheel",
      unit3Desc: "Dual-funnel conversion engine delivering 24% cold traffic conversion.",
      unit3Tag: "5.0 ★ Rating",
    },
    shivam: {
      name: "Shivam Kaushal 3D Studio",
      subtitle: "Warm cream ground with tactile 3D burnt orange clay coils (#E05A2B), software skill meters, and academic credentials.",
      accent: "#E05A2B",
      badge: "SHIVAM KAUSHAL • GRAPHIC & 3D CLAY",
      previewUrl: "/p/Shivam%20Kaushal?theme=not-your-college",
      bgClass: "bg-[#241710] text-[#fbf5ed]",
      cardBorder: "border-orange-500/30",
      image: "/images/portfolios/portfolio-shivam-kaushal.jpg",
      unit1Title: "Tactile 3D Clay Identity",
      unit1Desc: "Sculpted clay ribbons and warm editorial typography for modern brands.",
      unit1Tag: "Photoshop & Illustrator",
      unit2Title: "Multi-App Design Workflow",
      unit2Desc: "Unified creation stack combining Canva, Alight Motion, Picsart, and AI generation.",
      unit2Tag: "ChatGPT & Gemini",
      unit3Title: "Verified Student Portal",
      unit3Desc: "10 months university portal executive management for 50,000+ students.",
      unit3Tag: "CS Diploma • Pursuing B.Sc",
    },
    kenji: {
      name: "Kenji Sato 3D Character Studio",
      subtitle: "Deep cyan ocean steel palette (#164654), 3D chibi mascot, book cover spreads, and packaging jar design.",
      accent: "#06B6D4",
      badge: "KENJI SATO • 3D ILLUSTRATOR",
      previewUrl: "/p/Kenji%20Sato?theme=bento-grid",
      bgClass: "bg-[#0a232b] text-[#e0f7fa]",
      cardBorder: "border-cyan-500/30",
      image: "/images/portfolios/portfolio-3d-illustrator.jpg",
      unit1Title: "3D Chibi Mascot Universe",
      unit1Desc: "Whimsical character illustrations, 3D modeling, and signature editorial style.",
      unit1Tag: "Blender & Vector Art",
      unit2Title: "Book Cover & Monograph",
      unit2Desc: "35+ published book cover designs, typography spreads, and digital imaging.",
      unit2Tag: "14 Project Modules",
      unit3Title: "Packaging & Brand Identity",
      unit3Desc: "Bespoke jar labels, brand profiles, and cohesive social feed curation.",
      unit3Tag: "500k+ Impressions",
    },
    randy: {
      name: "Randy Fahmi Creative Visual",
      subtitle: "Vibrant amber ochre (#F2A900) & dark slate, commercial photography, 4K videography, and structured table of content.",
      accent: "#F59E0B",
      badge: "RANDY FAHMI • CREATIVE VISUAL",
      previewUrl: "/p/Randy%20Fahmi?theme=rolan-gomes",
      bgClass: "bg-[#1f1d16] text-[#fffbeb]",
      cardBorder: "border-amber-500/30",
      image: "/images/portfolios/portfolio-randy-fahmi.jpg",
      unit1Title: "Visual Table of Content",
      unit1Desc: "Multi-disciplinary portfolio system categorizing design, photography, and video.",
      unit1Tag: "Informatics Engineering",
      unit2Title: "4K Cinema & Video Editing",
      unit2Desc: "Commercial video production with Premiere Pro, CapCut, and Lightroom color grading.",
      unit2Tag: "120+ Shoots",
      unit3Title: "IT & Design Leadership",
      unit3Desc: "9+ years bridging technical IT supervision with high-impact visual design.",
      unit3Tag: "99.4% CSAT",
    },
    alsa: {
      name: "Alsa Yunita Presentation Deck",
      subtitle: "Pastel lilac (#8B5CF6) & warm peach, sparkle badges, TikTok & social strategy, and modular presentation slides.",
      accent: "#A78BFA",
      badge: "ALSA YUNITA • SOCIAL & PRESENTATION",
      previewUrl: "/p/Alsa%20Yunita?theme=tanuja-design",
      bgClass: "bg-[#1c142b] text-[#f3e8ff]",
      cardBorder: "border-purple-500/30",
      image: "/images/portfolios/portfolio-alsa-yunita.jpg",
      unit1Title: "Pastel Dream Presentation",
      unit1Desc: "Modular presentation decks engineered for aesthetic pitch presentations.",
      unit1Tag: "90+ Pitch Decks",
      unit2Title: "Social Media Growth Strategy",
      unit2Desc: "Short-form video concepts, TikTok virality, and cohesive aesthetic curation.",
      unit2Tag: "1.2M+ Monthly Reach",
      unit3Title: "Brand Launch Campaigns",
      unit3Desc: "35+ successful product launch kits with interactive visual slides.",
      unit3Tag: "35+ Brand Launches",
    },
  };

  const faqs = [
    {
      q: "How does FolioIn prevent fake credentials and hallucinations?",
      a: "Unlike generic AI writers that invent fake job titles and metrics, FolioIn uses a strict factual anchor model. We only synthesize headlines, bullet points, and portfolios from your real GitHub repositories, uploaded resume notes, and verified work history.",
    },
    {
      q: "Can I share my portfolio on LinkedIn, Twitter, and job applications?",
      a: "Yes! Every portfolio gets an instant shareable link like folioin.me/p/[your-name], fully responsive on mobile, tablet, and desktop with open-graph cards for social sharing.",
    },
    {
      q: "How does the ATS Resume Tailor work?",
      a: "You paste your base resume and any job description. FolioIn analyzes keyword overlap, reorganizes your real experience to match the employer's requirements, and exports a high-resolution, machine-parseable PDF.",
    },
    {
      q: "Can I switch themes without losing my data?",
      a: "Yes. All portfolio content is stored in a standardized schema. You can switch between Marcus Vance Desk, Kaelen Frost Dark, Julian Reed Studio, and Maya Chen Enterprise with zero data loss in one click.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f4eb] text-[#222e26] font-sans selection:bg-[#ebd800] selection:text-[#173f32] antialiased overflow-x-hidden relative">
      
      {/* ── ADVANCED ANIMATION 1: REAL-TIME NEON LASER SCROLL PROGRESS BAR ── */}
      <ScrollProgressNeonBar />

      {/* ── ADVANCED ANIMATION 2: AMBIENT GLOWING CURSOR SPOTLIGHT ── */}
      <AmbientCursorFollower />

      {/* ── ADVANCED ANIMATION 17: ELASTIC SPRING CURSOR FOLLOWER TAG ── */}
      <ElasticCursorTag />

      {/* ── ADVANCED ANIMATION 20: CURSOR PROXIMITY GLOW ── */}
      <CursorProximityGlow />

      {/* ── STICKY NOT YOUR COLLEGE HEADER ── */}
      <header className="sticky top-0 z-50 bg-[#f7f4eb]/90 backdrop-blur-md border-b border-[#173f32]/15 transition-all">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          
          {/* Official FolioIn Logo */}
          <Link href="/" className="flex items-center group">
            <FolioInLogo size="md" subtitle="Where Builders Launch" />
          </Link>

          {/* Navigation Links - Exactly 4 One-Word Elements */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-wide text-[#222e26]">
            <a href="#showcase" className="hover:text-[#173f32] transition-colors">
              Showcase
            </a>
            <Link href="/portfolio/preview" className="hover:text-[#173f32] transition-colors font-extrabold text-[#173f32]">
              Studio
            </Link>
            <Link href="/inspiration" className="hover:text-[#173f32] transition-colors">
              Inspiration
            </Link>
            <Link href="/resume" className="hover:text-[#173f32] transition-colors">
              Resume
            </Link>
          </nav>

          {/* CTA Button & Auth */}
          <div className="flex items-center gap-3">
            {session?.user ? (
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-700 hover:text-rose-800 text-xs font-bold transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                title={`Signed in as ${session.user.name || session.user.email} - Click to Logout`}
              >
                <LogOut size={13} className="text-rose-600" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                href="/login"
                className="hidden sm:inline-flex px-4 py-2 rounded-full border border-[#173f32]/20 hover:bg-white text-xs font-bold text-[#222e26] transition-all cursor-pointer"
              >
                Sign In
              </Link>
            )}
            <Link
              href="/portfolio/preview"
              className="hidden sm:inline-flex px-4 py-2 rounded-full bg-[#173f32] hover:bg-[#16382c] text-[#f7f4eb] text-xs font-bold transition-all shadow-sm"
            >
              Open AI Studio ⚡
            </Link>
            <Link
              href="/p/Aarav%20Sharma"
              className="hidden sm:inline-flex px-4 py-2 rounded-full border border-[#173f32]/20 hover:bg-white text-xs font-bold text-[#222e26] transition-all"
            >
              Live Demo ↗
            </Link>
            <Link
              href="/onboarding"
              className="px-5 py-2.5 rounded-full bg-[#173f32] hover:bg-[#16382c] text-[#f7f4eb] text-xs font-bold uppercase tracking-wider transition-all shadow-xs hover:scale-105 active:scale-95"
            >
              Start Building Free →
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION: NYC EDITORIAL STYLE ── */}
      <section className="relative px-6 sm:px-10 pt-16 pb-24 max-w-6xl mx-auto overflow-hidden">
        {/* ── ADVANCED ANIMATION 1: CYBER GRID SCANNER ── */}
        <CyberGridScanner />

        {/* ── ADVANCED ANIMATION 4: HEXAGON SHIELD MATRIX ── */}
        <HexagonShieldMatrix />

        {/* ── ADVANCED ANIMATION 50: GLITCH NOISE ANALOG TEXTURE ── */}
        <GlitchNoiseCanvas />

        {/* ── ADVANCED ANIMATION 21: ATMOSPHERIC NEBULA CLOUD DRIFT ── */}
        <NebulaCloudDrift />

        {/* ── ADVANCED ANIMATION 22: STARLIGHT TWINKLE CLUSTER ── */}
        <StarlightTwinkleCluster />

        {/* ── ADVANCED ANIMATION 3: FLOATING CONSTELLATION DUST PARTICLES ── */}
        <ConstellationDustField />

        {/* ── ADVANCED ANIMATION 11: MESH GLOW GRADIENT BREATHING ORB ── */}
        <MeshGlowGradientOrb className="top-10 left-1/4 w-[420px] h-[420px]" color="emerald" />
        <MeshGlowGradientOrb className="bottom-10 right-10 w-[320px] h-[320px]" color="amber" />

        {/* Subtle background grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#173f32 1px, transparent 1px), linear-gradient(90deg, #173f32 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
        />

        <div className="space-y-8 relative z-10 text-left sm:text-center max-w-4xl mx-auto">
          {/* Eyebrow Pill with HoloParallax & Shimmer & Compass */}
          <div className="flex items-center justify-start sm:justify-center gap-3">
            {/* ── ADVANCED ANIMATION 15: INTERACTIVE COMPASS ROSE ── */}
            <div className="hidden sm:block">
              <InteractiveCompassRose />
            </div>

            {/* ── ADVANCED ANIMATION 18: 3D HOLOGRAPHIC PARALLAX BADGE ── */}
            <HoloParallaxBadge className="inline-flex">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ebd800] text-[#173f32] text-xs font-bold uppercase tracking-wider border border-[#173f32]/20 shadow-xs">
                {/* ── ADVANCED ANIMATION 12: TEXT SHIMMER GRADIENT WAVE ── */}
                <TextShimmerWave text="✦ THE PORTFOLIO ENGINE FOR THE AI GENERATION" />
              </div>
            </HoloParallaxBadge>

            {/* ── ADVANCED ANIMATION 17: PARALLAX FLOATING STICKY ── */}
            <div className="hidden md:block">
              <ParallaxFloatingStickers text="Ship Real Code" />
            </div>
          </div>

          {/* Massive Instrument Serif Heading */}
          <h1 className="text-4xl sm:text-7xl md:text-8xl font-normal text-[#222e26] font-editorial tracking-tight leading-[1.04]">
            Careers are made on proof. <br />
            <span className="font-editorial-italic font-normal text-[#173f32]">
              Not just certificates.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-[#3d4d42] max-w-2xl sm:mx-auto leading-relaxed font-normal">
            College syllabi hand you generic degrees. FolioIn turns your shipped code, live projects, and real achievements into an award-winning portfolio and ATS-tailored resume.
          </p>

          {/* ── ADVANCED ANIMATION 4: REAL-TIME DYNAMIC TERMINAL TYPER WITH LEDS & BLINKING CARET ── */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            {/* ── ADVANCED ANIMATION 10: SERVER RACK ACTIVITY LEDS ── */}
            <div className="hidden sm:block">
              <ServerRackActivityLeds />
            </div>

            <div className="inline-flex items-center">
              <LiveTerminalTyper
                commands={[
                  "folioin --build --theme=architect-desk",
                  "git log --verify-commits: 100% genuine",
                  "ats-tailor --match=senior-frontend-engineer",
                  "deploy --provider=github-pages --status=live",
                  "folio-ai: zero hallucinations guaranteed",
                ]}
              />
              {/* ── ADVANCED ANIMATION 7: TRI-COLOR BLINKING PROMPT CARET ── */}
              <BlinkingPromptCaret />
            </div>
          </div>

          {/* Animated Graphic Accent Pills with Magnetic Physics */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
            {/* ── ADVANCED ANIMATION 24: MICRO MAGNETIC SPRING PILL BADGES ── */}
            <MagneticPillBadge>
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="px-3 py-1 rounded-full bg-white/90 border border-emerald-500/30 text-[11px] font-mono font-bold text-emerald-800 shadow-xs flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>AI Bespoke Layout Synthesizer</span>
              </motion.div>
            </MagneticPillBadge>

            <MagneticPillBadge>
              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="px-3 py-1 rounded-full bg-white/90 border border-sky-400/30 text-[11px] font-mono font-bold text-sky-800 shadow-xs flex items-center gap-1.5"
              >
                <Terminal size={12} className="text-sky-600" />
                <span>Aceternity 3D BentoGrid Studio</span>
              </motion.div>
            </MagneticPillBadge>

            <MagneticPillBadge>
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="px-3 py-1 rounded-full bg-white/90 border border-amber-400/30 text-[11px] font-mono font-bold text-amber-800 shadow-xs flex items-center gap-1.5"
              >
                <Sparkles size={12} className="text-amber-500" />
                <span>Zero-Hallucination Certified</span>
              </motion.div>
            </MagneticPillBadge>
          </div>

          {/* ── HERO FINE-ART BANNER WITH INTEGRATED CLAIM & BUILD ── */}
          <div className="pt-6 sm:pt-8">
            <ArtShowcaseHeroCard
              handleInput={handleInput}
              setHandleInput={setHandleInput}
            />
          </div>
        </div>
      </section>

      {/* ── ADVANCED ANIMATION 26: ENERGY BEAM SEPARATOR ── */}
      <EnergyBeamSeparator />

      {/* ── TWO REALITIES: THE COLLEGE GAP VS THE FOLIOIN STANDARD ── */}
      <section id="why-proof" className="py-20 px-6 sm:px-10 bg-[#faf8f1] border-y border-[#173f32]/15 relative overflow-hidden">
        {/* ── ADVANCED ANIMATION 14: ORGANIC FLUID SVG BLOB MORPHING ── */}
        <div className="absolute top-10 right-10 pointer-events-none opacity-40">
          <MorphingBlobCanvas size={340} fill="rgba(16, 185, 129, 0.12)" />
        </div>
        <div className="absolute bottom-10 left-10 pointer-events-none opacity-30">
          <MorphingBlobCanvas size={280} fill="rgba(235, 216, 0, 0.1)" />
        </div>

        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#173f32] uppercase tracking-wider block">
              [ 01 // THE REALITY GAP ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#222e26] tracking-tight">
              By final year, most students are just surviving. Start building proof now.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* The Old College Way */}
            {/* ── ADVANCED ANIMATION 18: BORDER CORNER RETICLE HUD ── */}
            <BorderCornerReticle>
              <TiltSpotlightCard className="rounded-3xl h-full">
                <div className="p-8 sm:p-10 rounded-3xl bg-[#fffdf8] border border-[#173f32]/20 flex flex-col justify-between space-y-6 opacity-85 h-full">
                  <div className="space-y-4">
                    <div className="inline-block px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider">
                      The Traditional College Way
                    </div>
                    <h3 className="text-2xl font-editorial font-bold text-[#222e26]">
                      A 2-page PDF filled with generic buzzwords and 404 links.
                    </h3>
                    <ul className="space-y-3 text-sm text-[#5a6b60] leading-relaxed">
                      <li className="flex items-start gap-2.5">
                        <span className="text-rose-600 font-bold">✕</span>
                        <span>No live deployed URLs or verifiable code commits for recruiters to test.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-rose-600 font-bold">✕</span>
                        <span>Generic Canva or Word templates that get rejected by automated ATS screening.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-rose-600 font-bold">✕</span>
                        <span>Zero visual impact or interactivity when hiring managers open your profile.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="text-xs font-bold text-slate-500 font-mono pt-4 border-t border-slate-200">
                    RESULT: 100+ Applications sent with 0 recruiter callbacks.
                  </div>
                </div>
              </TiltSpotlightCard>
            </BorderCornerReticle>

            {/* The FolioIn Standard (NYC Deep Forest Green Card) */}
            {/* ── ADVANCED ANIMATION 18: BORDER CORNER RETICLE HUD ── */}
            <BorderCornerReticle>
              <TiltSpotlightCard className="rounded-3xl h-full">
                <div className="p-8 sm:p-10 rounded-3xl bg-[#173f32] text-[#f7f4eb] flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden h-full">
                  {/* ── ADVANCED ANIMATION 5: LASER BORDER BEAM ── */}
                  <LaserBorderBeam duration={7} colorFrom="#10B981" colorTo="#ebd800" />
                  
                  {/* ── ADVANCED ANIMATION 20: FLOATING SPARKLE BURST EMITTER ── */}
                  <SparkleBurstEmitter />

                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#ebd800]/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="space-y-4 relative z-10">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="inline-block px-3.5 py-1 rounded-full bg-[#ebd800] text-[#173f32] text-xs font-bold uppercase tracking-wider border border-[#ebd800]">
                        The FolioIn Standard
                      </div>
                      {/* ── ADVANCED ANIMATION 16: TEXT SCRAMBLE DECRYPTION ── */}
                      <TextScrambleDecryption finalWord="AUTHENTICATED" />
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-[#f7f4eb] tracking-tight">
                      A verified live portfolio and tailored resume built on real artifacts.
                    </h3>

                    {/* ── ADVANCED ANIMATION 31 & 32: REALTIME LATENCY & HEAP GAUGES ── */}
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <RealtimeLatencyGraph />
                      <MemoryAllocationBar percent={92} />
                    </div>

                    <ul className="space-y-3 text-sm text-[#f7f4eb]/90 leading-relaxed">
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#ebd800] font-bold">✓</span>
                        <span><strong>Verified GitHub sync:</strong> real repositories, commit hashes, and live deployment links.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#ebd800] font-bold">✓</span>
                        <span><strong>Zero-hallucination AI:</strong> every word anchored in your real experience, never fabricated.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#ebd800] font-bold">✓</span>
                        <span><strong>Editorial &amp; motion themes:</strong> Not Your College, Luxe Dark, and Terminal layouts.</span>
                      </li>
                    </ul>
                  </div>

                  {/* ── ADVANCED ANIMATION 16: CYBER MATRIX TELEMETRY STREAM ── */}
                  <div className="relative z-10 pt-2 border-t border-white/10">
                    <MatrixRainStream height={45} />
                  </div>

                  <div className="text-xs font-bold text-[#ebd800] font-mono pt-2 border-t border-white/15 relative z-10">
                    RESULT: Verified portfolio link recruiters actually click and remember.
                  </div>
                </div>
              </TiltSpotlightCard>
            </BorderCornerReticle>

          </div>
        </div>

        {/* ── ADVANCED ANIMATION 24: AURORA BOREALIS SECTION CURTAIN ── */}
        <AuroraBorealisCurtain />
      </section>

      {/* ── ADVANCED ANIMATION 6 & 25: SMOOTH NUMERIC COUNTER TICKERS & CIRCULAR GAUGES ── */}
      <section className="py-10 px-6 sm:px-10 bg-[#faf8f1] border-b border-[#173f32]/15">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white/80 border border-[#173f32]/10 shadow-2xs">
              <div className="text-3xl sm:text-4xl font-editorial font-bold text-[#173f32]">
                <CounterTicker value={100} suffix="%" />
              </div>
              <div className="text-xs font-bold text-[#5a6b60] mt-2 uppercase tracking-wider">
                Zero-Hallucination Guard
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white/80 border border-[#173f32]/10 shadow-2xs">
              <div className="text-3xl sm:text-4xl font-editorial font-bold text-[#173f32]">
                <CounterTicker value={14820} suffix="+" />
              </div>
              <div className="text-xs font-bold text-[#5a6b60] mt-2 uppercase tracking-wider">
                Portfolios Generated
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white/80 border border-[#173f32]/10 shadow-2xs">
              <div className="text-3xl sm:text-4xl font-editorial font-bold text-[#173f32]">
                <CounterTicker value={60} suffix="s" />
              </div>
              <div className="text-xs font-bold text-[#5a6b60] mt-2 uppercase tracking-wider">
                Average Build Speed
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white/80 border border-[#173f32]/10 shadow-2xs">
              <div className="text-3xl sm:text-4xl font-editorial font-bold text-[#173f32]">
                <CounterTicker value={99} prefix="." suffix="6%" />
              </div>
              <div className="text-xs font-bold text-[#5a6b60] mt-2 uppercase tracking-wider">
                ATS Parse Rate
              </div>
            </div>
          </div>

          {/* ── ADVANCED ANIMATION 25: CIRCULAR SVG STROKE-DASHOFFSET METERS ── */}
          <div className="p-4 rounded-2xl bg-white/60 border border-[#173f32]/10 flex flex-wrap items-center justify-around gap-6">
            <CircularGaugeProgress score={99} label="ATS Machine Match" size={54} />
            <div className="h-8 w-px bg-[#173f32]/10 hidden md:block" />
            <CircularGaugeProgress score={100} label="Zero-Hallucination Core" size={54} />
            <div className="h-8 w-px bg-[#173f32]/10 hidden md:block" />
            <CircularGaugeProgress score={98} label="Mobile Core Web Vitals" size={54} />
          </div>
        </div>
      </section>

      {/* ── FLOATING PORTFOLIOS & HANGING RESUMES GALLERY ── */}
      <HangingResumesGallery />

      {/* ── LIVE INTERACTIVE SHOWCASE SECTION ── */}
      <section id="showcase" className="py-24 px-6 sm:px-10 max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#173f32]/15 pb-6">
          <div>
            <span className="text-xs font-bold text-[#173f32] uppercase tracking-wider block">
              [ 02 // ARCHITECTURAL SHOWCASE ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#222e26] tracking-tight">
              Portfolios in the showcase.
            </h2>
            <p className="text-[#5a6b60] text-sm sm:text-base mt-2 max-w-xl font-normal">
              Switch between themes built for builders, systems engineers, and creative technologists.
            </p>
          </div>

          {/* Theme Switcher Tabs with Telemetry */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3 self-start sm:self-auto px-3 py-1.5 rounded-2xl bg-white/60 border border-[#173f32]/10 backdrop-blur-xs">
              {/* ── ADVANCED ANIMATION 33: CIRCULAR RADAR SWEEP ── */}
              <CircularRadarSweep size={28} />
              {/* ── ADVANCED ANIMATION 46: INTERACTIVE AUDIO SPECTRUM ── */}
              <InteractiveAudioSpectrum />
            </div>
            <div className="flex flex-wrap gap-2">
              {(["learnhouse", "shivam", "kenji", "randy", "alsa"] as const).map((key) => {
                const active = activeTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      active
                        ? "bg-[#173f32] text-[#f7f4eb] shadow-xs"
                        : "bg-[#fffdf8] text-[#222e26] border border-[#173f32]/20 hover:bg-white"
                    }`}
                  >
                    {showcaseThemes[key].name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Theme Preview Card with Real Photo & Motion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`p-6 sm:p-10 rounded-3xl border ${showcaseThemes[activeTab].cardBorder} ${showcaseThemes[activeTab].bgClass} transition-all duration-300 shadow-2xl relative overflow-hidden`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-current/15 pb-6">
              <div>
                {/* ── ADVANCED ANIMATION 45: RUNNING EDGE LASER RIBBON ── */}
                <div className="mb-3">
                  <GlowingLaserRibbon label={showcaseThemes[activeTab].badge} />
                </div>
                <h3 className="text-3xl sm:text-4xl font-editorial font-bold tracking-tight">
                  {showcaseThemes[activeTab].name}
                </h3>
                <p className="text-sm opacity-80 mt-1 max-w-xl">
                  {showcaseThemes[activeTab].subtitle}
                </p>
              </div>
              <Link
                href={showcaseThemes[activeTab].previewUrl}
                target="_blank"
                className="px-6 py-3 rounded-full bg-[#173f32] text-[#f7f4eb] font-bold text-xs uppercase tracking-wider hover:bg-[#16382c] transition-all flex items-center gap-2 self-start md:self-auto shadow-md hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Explore Live Theme ↗</span>
                <ExternalLink size={13} />
              </Link>
            </div>

            {/* 📸 REAL HIGH-RESOLUTION RETINA PORTFOLIO PHOTO */}
            {/* ── ADVANCED ANIMATION 14: HOVER 3D DEPTH STACK ── */}
            <Hover3DDepthStack badgeText={showcaseThemes[activeTab].badge}>
              {/* ── ADVANCED ANIMATION 48: INTERACTIVE SPOTLIGHT REVEAL WINDOW ── */}
              <SpotlightRevealWindow>
                <div className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-slate-950 group/pic relative mb-8">
                  {/* ── ADVANCED ANIMATION 23: TRANSLUCENT FLOATING BUBBLE ORBS ── */}
                  <div className="top-4 right-8 absolute z-20 pointer-events-none hidden sm:block">
                    <FloatingBubbleOrbs />
                  </div>

                  {/* Browser Window Header */}
                  <div className="h-7 bg-slate-900/95 px-4 flex items-center justify-between border-b border-white/10 z-10 relative">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/90 inline-block" />
                      </div>
                      {/* ── ADVANCED ANIMATION 6: SATELLITE ORBIT RADAR ── */}
                      <div className="scale-75 origin-left hidden sm:block">
                        <SatelliteOrbitRadar size={24} />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 ml-1">
                        folioin.dev/p/showcase/{activeTab}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-2">
                      <ConcentricRadarPing color="#10B981" size={14} />
                      <span>Active Theme Render</span>
                    </span>
                  </div>

                  <div className="relative overflow-hidden max-h-[460px]">
                    {/* ── ADVANCED ANIMATION 23: SPECULAR GLARE CARD GLASS ── */}
                    <GlassGlareEffect />

                    <img
                      src={showcaseThemes[activeTab].image}
                      alt={showcaseThemes[activeTab].name}
                      className="w-full h-auto object-cover object-top transition-transform duration-700 ease-out group-hover/pic:scale-105"
                    />
                    
                    {/* Floating Preview Pill */}
                    <div className="absolute bottom-4 right-4 z-10">
                      <Link
                        href={showcaseThemes[activeTab].previewUrl}
                        target="_blank"
                        className="px-4 py-2 rounded-xl bg-slate-950/90 backdrop-blur-md text-white border border-white/20 font-bold text-xs flex items-center gap-2 hover:bg-emerald-500 hover:text-slate-950 transition-all shadow-xl"
                      >
                        <span>View Interactive Version</span>
                        <ArrowUpRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              </SpotlightRevealWindow>
            </Hover3DDepthStack>

            {/* Mock Preview Content with 3D Flip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {/* ── ADVANCED ANIMATION 15: INTERACTIVE 3D CARD FLIP ── */}
              <Flip3DCard
                frontContent={
                  <div className="p-6 rounded-2xl bg-white/5 border border-current/10 space-y-3 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono font-bold opacity-60">
                        <span>FEATURED UNIT_01</span>
                        <span className="text-[10px] text-amber-300">Click to flip ↷</span>
                      </div>
                      <h4 className="text-lg font-bold mt-2">{showcaseThemes[activeTab].unit1Title}</h4>
                      <p className="text-xs opacity-75 leading-relaxed mt-1">
                        {showcaseThemes[activeTab].unit1Desc}
                      </p>
                    </div>
                    <div className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 inline-block self-start">
                      {showcaseThemes[activeTab].unit1Tag}
                    </div>
                  </div>
                }
                backContent={
                  <div className="p-6 rounded-2xl bg-slate-950 text-emerald-400 border border-emerald-500/30 space-y-2 h-full font-mono text-xs flex flex-col justify-between shadow-2xl">
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>SCHEMA_AST // JSON</span>
                        <span className="text-amber-300">Flip back ↶</span>
                      </div>
                      <pre className="text-[11px] text-slate-200 mt-2 overflow-x-auto leading-relaxed">
{`{
  "theme": "${activeTab}",
  "title": "${showcaseThemes[activeTab].unit1Title}",
  "verified": true,
  "telemetry": "Active Render"
}`}
                      </pre>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold">● AST Schema Active</span>
                  </div>
                }
              />

              {/* ── ADVANCED ANIMATION 37 & 34: DYNAMIC DONUT CHART & LIQUID RING ── */}
              <div className="p-6 rounded-2xl bg-white/5 border border-current/10 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold opacity-60">FEATURED UNIT_02</span>
                    <DynamicPieDonutChart percent={94} />
                  </div>
                  <h4 className="text-lg font-bold mt-2">{showcaseThemes[activeTab].unit2Title}</h4>
                  <p className="text-xs opacity-75 leading-relaxed mt-1">
                    {showcaseThemes[activeTab].unit2Desc}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-current/10">
                  <div className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 inline-block">
                    {showcaseThemes[activeTab].unit2Tag}
                  </div>
                  <SkillProgressLiquidRings value={94} />
                </div>
              </div>

              {/* ── ADVANCED ANIMATION 35 & 36: COMMIT HEATMAP & NUMBER ROLL COUNTER ── */}
              <div className="p-6 rounded-2xl bg-white/5 border border-current/10 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold opacity-60">FEATURED UNIT_03</span>
                    <NumberRollCounter target="99.9" />
                  </div>
                  <h4 className="text-lg font-bold mt-1">{showcaseThemes[activeTab].unit3Title}</h4>
                  <p className="text-xs opacity-75 leading-relaxed mt-1">
                    {showcaseThemes[activeTab].unit3Desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-current/10 flex items-center justify-between gap-2">
                  <div className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 inline-block">
                    {showcaseThemes[activeTab].unit3Tag}
                  </div>
                  <CommitActivityHeatmap />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── 4-STEP ENGINE WORKFLOW (TIMETABLE / NYC ACTIVITIES STYLE) ── */}
      <section id="curriculum" className="py-24 px-6 sm:px-10 bg-[#faf8f1] border-y border-[#173f32]/15 relative overflow-hidden">
        {/* ── ADVANCED ANIMATION 25: DIGITAL RAINDROP RIPPLES ── */}
        <DigitalRaindropRipples />
        
        {/* ── ADVANCED ANIMATION 27: LUMINOUS POLLEN DRIFT ── */}
        <LuminousPollenDrift />

        <div className="max-w-6xl mx-auto space-y-14 relative z-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              {/* ── ADVANCED ANIMATION 44: MORPHING SVG ICON ── */}
              <MorphingSvgIcon />
              <span className="text-xs font-bold text-[#173f32] uppercase tracking-wider block">
                [ 03 // HOW FOLIOIN WORKS ]
              </span>
              {/* ── ADVANCED ANIMATION 8: DATA PACKET PULSE ── */}
              <DataPacketPulse length={80} />
            </div>

            {/* ── ADVANCED ANIMATION 43: SPLIT TEXT CASCADE REVEAL ── */}
            <div className="py-2">
              <SplitTextCascadeReveal words={["Everything", "about", "FolioIn,", "in", "4", "simple", "steps."]} />
            </div>

            <p className="text-[#5a6b60] text-sm sm:text-base font-normal">
              From raw code and resume notes to an award-winning live portfolio in 60 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Smart Intake & Extraction",
                desc: "Paste your LinkedIn summary or full resume. Gemini AI extracts your real roles, dates, achievements, and degrees automatically.",
                badge: "AI EXTRACTOR",
              },
              {
                step: "02",
                title: "Zero-Hallucination Guard",
                desc: "Our factual anchor model strictly forbids inventing fake metrics or unverified titles. Complete truth, verified by you.",
                badge: "VERIFIED ACCURACY",
              },
              {
                step: "03",
                title: "Architectural Themes",
                desc: "Pick your aesthetic: Not Your College editorial paper, Luxe dark gradient, or developer terminal. Switch anytime with zero data loss.",
                badge: "DESIGN CRAFT",
              },
              {
                step: "04",
                title: "Instant Live URL & ATS PDF",
                desc: "Share your live link at folioin.me/p/[you] and download a publication-grade, machine-readable ATS resume PDF.",
                badge: "ONE-CLICK LAUNCH",
              },
            ].map((item, i) => (
              /* ── ADVANCED ANIMATION 49: DYNAMIC CARD SHADOW KINETICS ── */
              <FloatingCardShadowDynamics key={i}>
                <div
                  className="p-8 rounded-3xl bg-[#fffdf8] border border-[#173f32]/20 flex flex-col justify-between space-y-6 shadow-2xs hover:border-[#173f32] transition-colors h-full"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      {/* ── ADVANCED ANIMATION 19: ELASTIC ICON SPRING ── */}
                      <ElasticIconSpring>
                        <span className="text-2xl font-editorial font-bold text-[#173f32]">
                          {item.step}
                        </span>
                      </ElasticIconSpring>
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#eeeaf4] text-[#173f32]">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#222e26] tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#5a6b60] leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                  <div className="text-[11px] font-bold text-[#173f32] flex items-center gap-1">
                    <span>Learn more</span>
                    <span>→</span>
                  </div>
                </div>
              </FloatingCardShadowDynamics>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 // THE ART & DESIGN SALON: 7 CURATED MASTERPIECES ── */}
      <CuratedArtworksGallery />

      {/* ── ADVANCED ANIMATION 7: INFINITE SMOOTH 60FPS MARQUEE RIBBON ── */}
      <section className="py-14 px-6 border-b border-[#173f32]/15 bg-[#f7f4eb] overflow-hidden">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[#5a6b60]">
            Engineers &amp; builders creating with FolioIn join teams at
          </p>
          <InfiniteMarqueeRibbon
            items={[
              "Microsoft",
              "Google",
              "Atlassian",
              "Stripe",
              "Razorpay",
              "Uber",
              "Meta",
              "Apple",
              "Netflix",
              "Vercel",
              "OpenAI",
              "Coinbase",
            ]}
          />
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="py-24 px-6 sm:px-10 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-[#173f32] uppercase tracking-wider block">
            [ 04 // COMMON QUESTIONS ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#222e26] tracking-tight">
            Frequently asked questions.
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#fffdf8] border border-[#173f32]/20 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#222e26]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 text-[#173f32] ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-xs sm:text-sm text-[#5a6b60] leading-relaxed border-t border-[#173f32]/10 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ── ADVANCED ANIMATION 41: SPRING MORPH TELEMETRY ACCORDIONS ── */}
        <div className="space-y-4 pt-4 border-t border-[#173f32]/15">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#173f32]/80 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#173f32]" />
            <span>[ SYSTEM ARCHITECTURE &amp; TELEMETRY PROTOCOLS ]</span>
          </div>
          <AccordionSpringMorph
            title="Explore Distributed Edge Synthesis &amp; Zero-Hallucination Guarantees"
            content="FolioIn operates an isolated edge synthesis pipeline running sub-5ms P99 responses with zero hallucination enforcement. Every milestone, job role, and verified commit is cryptographically anchored against real inputs and versioned in SQLite Edge storage."
          />
          <AccordionSpringMorph
            title="ATS Compliance Engine: Verified PDF/A Parsing with Machine Tags"
            content="Dual output architecture ensures human hiring managers see a fluid 60fps editorial layout while ATS parsers (Workday, Greenhouse, Lever, Taleo) ingest a strictly formatted PDF/A stream with semantic machine tags and standard typographic headings."
          />
        </div>
      </section>

      {/* ── FINAL NYC FOREST GREEN CTA BANNER ── */}
      <section className="px-6 sm:px-10 pb-24">
        <div className="max-w-6xl mx-auto rounded-3xl bg-[#173f32] text-[#f7f4eb] p-10 sm:p-20 text-center space-y-8 shadow-2xl relative overflow-hidden">
          {/* ── ADVANCED ANIMATION 29: VORTEX PARTICLE SPIRAL ── */}
          <div className="absolute -top-16 -right-16 pointer-events-none opacity-40">
            <VortexParticleSpiral size={320} />
          </div>
          <div className="absolute -bottom-16 -left-16 pointer-events-none opacity-30">
            <VortexParticleSpiral size={260} />
          </div>

          <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#ebd800] text-[#173f32] text-xs font-bold uppercase tracking-wider relative z-10">
            ✦ STOP APPLYING WITH BORING RESUMES
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-normal text-[#f7f4eb] tracking-tight max-w-3xl mx-auto leading-[1.08] relative z-10">
            Your career starts with what you build. <br />
            <span className="font-editorial-italic text-[#ebd800]">
              Launch your verified portfolio today.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#f7f4eb]/80 max-w-xl mx-auto font-normal leading-relaxed relative z-10">
            Free forever for early-career developers, creators, and engineering builders. No credit card required.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 relative z-10">
            {/* ── ADVANCED ANIMATION 13: LIQUID BUTTON GLOW & ANIMATION 12: RIPPLE HOVER BUTTON ── */}
            <div className="relative inline-block">
              <LiquidButtonGlow />
              <RippleHoverButton onClick={() => window.location.href = "/onboarding"}>
                <span className="px-8 py-4 rounded-full bg-[#ebd800] hover:bg-[#ffe600] text-[#173f32] font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 inline-flex">
                  <span>Build My Portfolio Free</span>
                  <ArrowRight size={15} />
                </span>
              </RippleHoverButton>
            </div>
            <Link
              href="/resume"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-[#f7f4eb] border border-white/20 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all"
            >
              Tailor Resume for a Job →
            </Link>
          </div>
        </div>
      </section>

      {/* ── EXPANDED AUTHORITATIVE FOOTER ── */}
      <footer className="border-t border-[#173f32]/15 bg-[#f0ecdf] text-[#222e26] pt-16 pb-12 px-6 sm:px-10 font-sans">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Top Row: Brand & Live Engine Telemetry & Changelog Newsletter */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-[#173f32]/15">
            
            {/* Left 5 Cols: Brand + Description + Live Telemetry */}
            <div className="lg:col-span-5 space-y-4">
              <Link href="/" className="inline-block">
                <FolioInLogo size="md" subtitle="The Verified Portfolio Engine" />
              </Link>
              <p className="text-xs sm:text-sm text-[#4a5d52] max-w-md leading-relaxed">
                FolioIn transforms raw engineer commits, design artifacts, and verified work trajectory into award-winning, zero-hallucination portfolios and ATS-proven resumes.
              </p>
              
              {/* Live Production Telemetry Pill */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-2 text-[11px] font-mono text-[#173f32]">
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#173f32]/10 border border-[#173f32]/20 font-bold">
                  <ConcentricRadarPing color="#10B981" size={14} />
                  <span>FolioIn Core Engine: ONLINE</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#173f32]/15 text-slate-700">
                  <ShieldCheck size={13} className="text-[#10B981]" />
                  <span>100% Verified Non-Hallucinatory</span>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Builder Dispatch Newsletter */}
            {/* ── ADVANCED ANIMATION 30: GLASSMORPHISM BLUR WIPE ── */}
            <div className="lg:col-span-7">
              <GlassmorphismBlurWipe>
                <div className="flex flex-col justify-between space-y-4 bg-white/70 p-6 rounded-3xl border border-[#173f32]/15 shadow-2xs h-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-extrabold text-[#173f32] tracking-tight">Stay Ahead with the Builder Dispatch</h4>
                      <p className="text-xs text-[#5a6b60]">Curated Silicon Valley design trends, ATS scoring updates, and weekly archetype releases.</p>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-[#ebd800] text-[#173f32] shrink-0 self-start sm:self-auto">
                      WEEKLY DIGEST
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-[#173f32]/20 text-xs text-[#173f32] placeholder:text-slate-400 focus:outline-none focus:border-[#173f32]"
                    />
                    <button
                      type="button"
                      onClick={() => alert("Subscribed! You will receive the weekly Builder Dispatch.")}
                      className="px-5 py-2.5 rounded-xl bg-[#173f32] hover:bg-[#13352a] text-[#f7f4eb] text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
                    >
                      Join Dispatch →
                    </button>
                  </div>

                  <div className="flex items-center gap-4 text-[10px] text-[#5a6b60]">
                    <span>✓ Zero spam ever</span>
                    <span>✓ 1-click unsubscribe</span>
                    <span>✓ Open GitHub contributors archive</span>
                  </div>
                </div>
              </GlassmorphismBlurWipe>
            </div>

          </div>

          {/* Middle 4 Navigation Columns with Genuine Working Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-2">
            
            {/* Col 1: Flagship Archetypes */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#173f32] block">
                // ARCHETYPES
              </span>
              <ul className="space-y-2 text-xs font-medium text-[#4a5d52]">
                <li>
                  <Link href="/p/Aarav%20Sharma?theme=bento-grid" className="hover:text-[#173f32] hover:translate-x-0.5 transition-all inline-flex items-center gap-1.5 font-bold text-[#173f32]">
                    <span>BentoGrid Studio</span>
                    <span className="text-[9px] px-1 rounded bg-[#38bdf8]/20 text-sky-800 font-extrabold">NEW</span>
                  </Link>
                </li>
                <li>
                  <Link href="/p/Elena%20Rostova?theme=luxe-creative" className="hover:text-[#173f32] hover:translate-x-0.5 transition-all inline-block">
                    Elena Rostova Pink Desk
                  </Link>
                </li>
                <li>
                  <Link href="/p/Marcus%20Vance?theme=rolan-gomes" className="hover:text-[#173f32] hover:translate-x-0.5 transition-all inline-block">
                    Marcus Vance Architect Mat
                  </Link>
                </li>
                <li>
                  <Link href="/p/Kaelen%20Frost?theme=sudarvel" className="hover:text-[#173f32] hover:translate-x-0.5 transition-all inline-block">
                    Kaelen Frost Dark Telemetry
                  </Link>
                </li>
                <li>
                  <Link href="/p/Julian%20Reed?theme=himanshu-singh" className="hover:text-[#173f32] hover:translate-x-0.5 transition-all inline-block">
                    Julian Reed Storyteller
                  </Link>
                </li>
                <li>
                  <Link href="/p/Maya%20Chen?theme=tanuja-design" className="hover:text-[#173f32] hover:translate-x-0.5 transition-all inline-block">
                    Maya Chen Enterprise
                  </Link>
                </li>
                <li>
                  <Link href="/p/Aarav%20Sharma?theme=developer-terminal" className="hover:text-[#173f32] hover:translate-x-0.5 transition-all inline-block">
                    Developer Terminal ASCII
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 2: Engineering Suites */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#173f32] block">
                // PLATFORM SUITE
              </span>
              <ul className="space-y-2 text-xs font-medium text-[#4a5d52]">
                <li>
                  <Link href="/portfolio/preview" className="hover:text-[#173f32] hover:translate-x-0.5 transition-all inline-flex items-center gap-1.5 font-bold text-[#173f32]">
                    <span>AI Portfolio Studio</span>
                    <span className="text-[9px] px-1 rounded bg-emerald-200 text-emerald-900 font-extrabold">LIVE</span>
                  </Link>
                </li>
                <li>
                  <Link href="/inspiration" className="hover:text-[#173f32] hover:translate-x-0.5 transition-all inline-block">
                    Bespoke Layout Synthesizer
                  </Link>
                </li>
                <li>
                  <Link href="/resume" className="hover:text-[#173f32] hover:translate-x-0.5 transition-all inline-block">
                    ATS Resume Tailor &amp; PDF
                  </Link>
                </li>
                <li>
                  <Link href="/hub" className="hover:text-[#173f32] hover:translate-x-0.5 transition-all inline-block">
                    Master Multi-Persona Hub
                  </Link>
                </li>
                <li>
                  <Link href="/styles" className="hover:text-[#173f32] hover:translate-x-0.5 transition-all inline-block">
                    Wall of Portfolios Directory
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-[#173f32] hover:translate-x-0.5 transition-all inline-block">
                    GitHub Webhook Ingestion
                  </Link>
                </li>
                <li>
                  <Link href="/onboarding" className="hover:text-[#173f32] hover:translate-x-0.5 transition-all inline-block">
                    Zero-Hallucination Onboarding
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Legal, Trust & Security */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#173f32] block">
                // TRUST &amp; LEGAL
              </span>
              <ul className="space-y-2 text-xs font-medium text-[#4a5d52]">
                <li>
                  <Link href="/legal/terms" className="hover:text-[#173f32] hover:translate-x-0.5 transition-all inline-block">
                    Copyright &amp; IP Protection
                  </Link>
                </li>
                <li>
                  <Link href="/legal/takedown" className="hover:text-[#173f32] hover:translate-x-0.5 transition-all inline-block">
                    DMCA Notice &amp; Takedown
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-[#173f32] hover:translate-x-0.5 transition-all inline-block">
                    Security &amp; Non-Hallucination
                  </Link>
                </li>
                <li>
                  <Link href="/legal/terms" className="hover:text-[#173f32] hover:translate-x-0.5 transition-all inline-block">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/legal/terms" className="hover:text-[#173f32] hover:translate-x-0.5 transition-all inline-block">
                    Privacy Policy &amp; Cookie Standards
                  </Link>
                </li>
                <li>
                  <span className="text-[11px] text-emerald-800 font-semibold block pt-1">
                    ✓ 100% Machine-Parseable ATS
                  </span>
                </li>
              </ul>
            </div>

            {/* Col 4: Engine Architecture & Standards */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#173f32] block">
                // ARCHITECTURE SPECS
              </span>
              <ul className="space-y-2 text-xs font-mono text-[11px] text-[#4a5d52]">
                <li className="flex items-center gap-1.5">
                  <span className="text-[#10B981]">▸</span>
                  <span>Next.js 15 App Router</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-[#10B981]">▸</span>
                  <span>TypeScript Strict Mode</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-[#10B981]">▸</span>
                  <span>Gemini 2.5 Flash Synthesis</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-[#10B981]">▸</span>
                  <span>Tailwind CSS + Spring Physics</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-[#10B981]">▸</span>
                  <span>Prisma ORM &amp; Edge SQLite</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-[#10B981]">▸</span>
                  <span>Browser DevTools F12 Hook</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar: Copyright, Socials, & Certification Seals */}
          <div className="pt-8 border-t border-[#173f32]/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#5a6b60]">
            
            <div className="flex flex-wrap items-center gap-3 text-center md:text-left">
              <span className="font-extrabold text-[#173f32]">FolioIn Technologies</span>
              <span>•</span>
              <span>© {new Date().getFullYear()} All rights reserved.</span>
              <span>•</span>
              <span className="text-[11px]">Handcrafted with precision for builders, designers, and systems architects.</span>
            </div>

            {/* Social & Community Links */}
            <div className="flex items-center gap-4 text-xs font-bold text-[#173f32]">
              <a 
                href="https://github.com/folioin" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-black transition-colors flex items-center gap-1.5"
              >
                <Code2 size={14} className="text-[#173f32]" />
                <span>GitHub Org</span>
              </a>
              <a 
                href="https://www.linkedin.com/company/folioin" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-sky-700 transition-colors flex items-center gap-1.5"
              >
                <Laptop size={14} className="text-[#173f32]" />
                <span>LinkedIn Community</span>
              </a>
              <a 
                href="#top-resumes" 
                className="hover:text-[#173f32] transition-colors flex items-center gap-1.5"
              >
                <Layers size={14} className="text-[#173f32]" />
                <span>Top Portfolios</span>
              </a>
            </div>

          </div>

        </div>
      </footer>

      {/* ── ADVANCED ANIMATION 22: MACOS FLOATING DOCK ACTION ISLAND ── */}
      <FloatingActionIsland />

      {/* ── LIVE INTERACTIVE PORTBOT AI ASSISTANT & DESIGN COPILOT ── */}
      <AiAgentWidget
        portfolioContext={{ activeShowcase: activeTab }}
        onUpdate={(updates) => {
          if (updates.themeTab) {
            setActiveTab(updates.themeTab);
            const el = document.getElementById("showcase");
            el?.scrollIntoView({ behavior: "smooth" });
          }
        }}
      />

      {/* ── AUTH SIGN-IN MODAL ── */}
      <SignInModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultCallbackUrl="/onboarding"
      />
    </div>
  );
}
