"use client";

import { motion } from "framer-motion";
import { Sparkles, Dribbble, Instagram, Twitter } from "lucide-react";

export function HeroSection({ user }: { user: any }) {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center items-center px-6 text-center bg-[#fdfbf7] dark:bg-[#121212]">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-3xl flex flex-col items-center"
      >
        <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-white shadow-xl">
          <div className="w-full h-full bg-gradient-to-tr from-pink-400 to-orange-400" />
        </div>

        <h2 className="text-lg md:text-xl font-medium text-pink-500 mb-2 font-serif italic">
          Hello, I'm {user?.name || "Jane Doe"}
        </h2>
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 text-zinc-900 dark:text-white leading-[1.1]">
          Crafting <span className="italic text-zinc-400 font-serif">visual</span> stories.
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-xl leading-relaxed">
          {user?.profile?.bio || "A multi-disciplinary designer focusing on brand identities, digital experiences, and beautiful interfaces."}
        </p>

        <div className="flex gap-4 items-center">
          <button className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform flex items-center gap-2">
            <Sparkles size={16} /> View Gallery
          </button>
        </div>

        <div className="flex gap-6 mt-12 text-zinc-400">
          <a href="#" className="hover:text-pink-500 transition-colors"><Dribbble size={24} /></a>
          <a href="#" className="hover:text-pink-500 transition-colors"><Instagram size={24} /></a>
          <a href="#" className="hover:text-pink-500 transition-colors"><Twitter size={24} /></a>
        </div>
      </motion.div>
    </section>
  );
}
