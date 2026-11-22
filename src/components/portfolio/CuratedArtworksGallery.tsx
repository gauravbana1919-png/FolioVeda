"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ExternalLink, X, Palette, Maximize2, ArrowUpRight, CheckCircle2 } from "lucide-react";

export interface Artwork {
  id: string;
  title: string;
  medium: string;
  year: string;
  artist: string;
  origin: string;
  category: "painting" | "editorial" | "spatial";
  categoryLabel: string;
  image: string;
  span: string;
  description: string;
  tags: string[];
}

const ARTWORKS: Artwork[] = [
  {
    id: "art-1",
    title: "Geometric Chroma Synthesis",
    medium: "Oil on Linen & Generative Vector Geometry",
    year: "2025",
    artist: "Lavanya Yasmeen",
    origin: "Bandung, Indonesia",
    category: "painting",
    categoryLabel: "Abstract Painting",
    image: "/images/artworks/artwork-1.jpg",
    span: "col-span-1 md:col-span-2",
    description: "A calculated study in geometric equilibrium, fiery cadmium orange hues, and sharp optical intersections inspired by traditional textiles fused with digital UI planes.",
    tags: ["Pure Pigment", "Color Blocking", "Spatial Geometry"],
  },
  {
    id: "art-2",
    title: "Typographic Monograph & Rhythms",
    medium: "Swiss International Typographic Print",
    year: "2024",
    artist: "Elena Vance",
    origin: "New York, USA",
    category: "editorial",
    categoryLabel: "Editorial & Print",
    image: "/images/artworks/artwork-2.jpg",
    span: "col-span-1",
    description: "Strict typographic grids meet serene negative space and calculated architectural tension, celebrating the timeless discipline of editorial book design.",
    tags: ["Swiss Typo", "Negative Space", "Pantone Black"],
  },
  {
    id: "art-3",
    title: "Digital Dreamscape & Liminal Form",
    medium: "Procedural 3D Shaders & Acrylic Wash",
    year: "2025",
    artist: "Kaito Tanaka",
    origin: "Tokyo, Japan",
    category: "painting",
    categoryLabel: "Digital Painting",
    image: "/images/artworks/artwork-3.jpg",
    span: "col-span-1",
    description: "Surrealist organic curvatures exploring the liminal boundaries between physical handmade washi paper and digital liquid glass.",
    tags: ["Liminal Space", "Organic Form", "Shader Art"],
  },
  {
    id: "art-4",
    title: "Kinetic Spatial Architecture",
    medium: "Architectural Blueprint & Mixed Media",
    year: "2024",
    artist: "Rolan Gomes",
    origin: "Berlin, Germany",
    category: "spatial",
    categoryLabel: "Spatial Design",
    image: "/images/artworks/artwork-4.jpg",
    span: "col-span-1 md:col-span-2",
    description: "Complex multi-layered drafting sequences capturing structural weight, material transparency, and ambient natural light across modular structures.",
    tags: ["Blueprint Drafting", "Cutting Mat", "Raw Concrete"],
  },
  {
    id: "art-5",
    title: "Chromatic Avant-Garde Portrait",
    medium: "High-Fashion Pop Realism & Oil Glaze",
    year: "2025",
    artist: "Himanshu Singh",
    origin: "Bengaluru, India",
    category: "painting",
    categoryLabel: "Contemporary Art",
    image: "/images/artworks/artwork-5.jpg",
    span: "col-span-1",
    description: "Vibrant pop realism confronting futuristic digital sunglasses with tactile spheres of pure saturated pigment, challenging algorithmic visual uniformity.",
    tags: ["Pop Art", "Hyper-Saturated", "Portraiture"],
  },
  {
    id: "art-6",
    title: "Bauhaus Spatial Deconstruction",
    medium: "Screenprint on Heavy Cotton Rag",
    year: "2024",
    artist: "Maya Chen",
    origin: "San Francisco, USA",
    category: "editorial",
    categoryLabel: "Graphic Design",
    image: "/images/artworks/artwork-6.jpg",
    span: "col-span-1",
    description: "Deconstructed primary color geometry paying homage to the Dessau Bauhaus typographic manifesto and early modernist poster experiments.",
    tags: ["Bauhaus", "Primary Colors", "Screenprint"],
  },
  {
    id: "art-7",
    title: "Wabi-Sabi Monochromatic Quietude",
    medium: "Handmade Paper & Natural Mineral Pigments",
    year: "2025",
    artist: "Sudarvel K",
    origin: "Chennai, India",
    category: "spatial",
    categoryLabel: "Minimalist Fine Art",
    image: "/images/artworks/artwork-7.jpg",
    span: "col-span-1 md:col-span-2",
    description: "Monochromatic stillness and subtle paper grain textures engineered for contemplative digital environments and architectural portfolios.",
    tags: ["Wabi-Sabi", "Paper Grain", "Minimalism"],
  },
];

export function CuratedArtworksGallery() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [artFilter, setArtFilter] = useState<"all" | "painting" | "editorial" | "spatial">("all");

  const filtered = ARTWORKS.filter(
    (art) => artFilter === "all" || art.category === artFilter
  );

  return (
    <section id="artworks" className="py-24 px-6 sm:px-10 max-w-6xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#173f32]/15 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ebd800] text-[#173f32] text-[10px] font-extrabold uppercase tracking-wider">
            <Palette size={12} className="text-[#173f32]" />
            <span>✦ CURATED FINE ART &amp; DESIGN SALON</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#222e26] tracking-tight">
            Seven masterpieces of form, pigment, and digital space.
          </h2>
          <p className="text-[#5a6b60] text-sm sm:text-base max-w-xl font-normal leading-relaxed">
            Explore seven curated artworks and design monographs created by our global fellows — from tactile oil paintings and Swiss typographic prints to spatial Bauhaus architecture.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 self-start md:self-auto">
          {[
            { id: "all", label: "All Works (7)" },
            { id: "painting", label: "Paintings & Chroma" },
            { id: "editorial", label: "Editorial & Print" },
            { id: "spatial", label: "Spatial & Architecture" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setArtFilter(f.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                artFilter === f.id
                  ? "bg-[#173f32] text-[#f7f4eb] shadow-xs"
                  : "bg-white text-[#222e26] border border-[#173f32]/20 hover:bg-[#faf8f1]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* 7 Artworks Responsive Masonry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((art, idx) => (
          <motion.div
            key={art.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            onClick={() => setSelectedArtwork(art)}
            className={`${art.span} group rounded-3xl overflow-hidden bg-white border border-[#173f32]/15 shadow-md hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between`}
          >
            {/* Image Canvas with 3D Hover Zoom */}
            <div className="relative w-full overflow-hidden bg-slate-950 aspect-4/3 sm:aspect-16/10">
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                loading="lazy"
              />

              {/* Top Badge: Year & Category */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-mono font-bold tracking-wider uppercase border border-white/10 shadow-xs">
                  {art.categoryLabel}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#173f32] text-[10px] font-mono font-black shadow-xs">
                  {art.year}
                </span>
              </div>

              {/* Bottom Frosted Glass Action Strip */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent flex items-end justify-between text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-mono font-bold text-emerald-400">
                  Inspect Curated Canvas ↗
                </span>
                <span className="w-8 h-8 rounded-full bg-white text-slate-950 flex items-center justify-center font-bold text-xs shadow-lg">
                  ↗
                </span>
              </div>
            </div>

            {/* Artwork Description Plaque (Museum Card Style) */}
            <div className="p-6 space-y-3 bg-[#fffdf8]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-editorial font-bold text-[#222e26] group-hover:text-[#173f32] transition-colors leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs font-mono font-semibold text-[#5a6b60] mt-0.5">
                    {art.artist} • {art.origin}
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-400 shrink-0 font-bold">
                  0{idx + 1}
                </span>
              </div>

              <p className="text-xs text-[#5a6b60] leading-relaxed line-clamp-2">
                {art.description}
              </p>

              <div className="pt-2 border-t border-[#173f32]/10 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {art.tags.map((tag, tidx) => (
                    <span
                      key={tidx}
                      className="px-2 py-0.5 rounded-md bg-[#173f32]/5 text-[10px] font-mono font-medium text-[#173f32] border border-[#173f32]/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-[11px] font-bold text-[#173f32] group-hover:underline">
                  View Details
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🎨 LIGHTBOX MODAL FOR FULL-RES ARTWORK INSPECTION */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArtwork(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#fffdf8] rounded-3xl overflow-hidden max-w-4xl w-full border border-white/20 shadow-2xl relative max-h-[90vh] flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedArtwork(null)}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-slate-900/80 hover:bg-slate-950 text-white transition-all cursor-pointer shadow-lg"
              >
                <X size={18} />
              </button>

              {/* Left/Top: High-Res Image Display */}
              <div className="md:w-3/5 bg-slate-950 relative flex items-center justify-center p-4">
                <img
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title}
                  className="max-h-[60vh] md:max-h-[75vh] w-full object-contain rounded-xl"
                />
              </div>

              {/* Right/Bottom: Museum Plaque Details */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173f32]/10 text-[#173f32] text-xs font-mono font-bold">
                    <span>{selectedArtwork.categoryLabel}</span>
                    <span>•</span>
                    <span>{selectedArtwork.year}</span>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#222e26] leading-tight">
                      {selectedArtwork.title}
                    </h2>
                    <p className="text-sm font-semibold text-[#173f32] mt-1">
                      By {selectedArtwork.artist}
                    </p>
                    <p className="text-xs text-slate-500 font-mono">
                      {selectedArtwork.origin}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono space-y-1">
                    <div className="text-slate-500 font-bold uppercase text-[10px]">Medium &amp; Process</div>
                    <div className="text-slate-800 font-medium">{selectedArtwork.medium}</div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4a5d52] leading-relaxed">
                    {selectedArtwork.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {selectedArtwork.tags.map((tag, tidx) => (
                      <span
                        key={tidx}
                        className="px-2.5 py-1 rounded-md bg-[#173f32]/10 text-xs font-mono font-semibold text-[#173f32]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedArtwork(null)}
                    className="px-4 py-2 rounded-full border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Close Salon
                  </button>
                  <Link
                    href="/portfolio/preview"
                    className="px-5 py-2 rounded-full bg-[#173f32] text-white text-xs font-bold hover:bg-[#13352a] transition-all shadow-xs"
                  >
                    Craft Portfolio With This Vibe →
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default CuratedArtworksGallery;
