"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code, Linkedin, Mail } from "lucide-react";

export function HeroSection({ user }: { user: any }) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-start px-6 md:px-12 lg:px-24">
      {/* Decorative floating elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 max-w-4xl"
      >
        <h2 className="text-xl md:text-2xl font-medium text-muted-foreground mb-4">
          Hi, I'm {user?.name || "John Doe"}
        </h2>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">digital experiences</span> that matter.
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
          {user?.profile?.bio || "I'm a full-stack developer passionate about creating scalable applications and intuitive user interfaces."}
        </p>

        <div className="flex flex-wrap gap-4 items-center">
          <button className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium transition-transform hover:scale-105">
            View My Work <ArrowRight size={18} />
          </button>
          
          <div className="flex gap-4 ml-4">
            <a href="#" className="p-3 bg-secondary rounded-full hover:bg-secondary/80 transition-colors">
              <Code size={20} />
            </a>
            <a href="#" className="p-3 bg-secondary rounded-full hover:bg-secondary/80 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="p-3 bg-secondary rounded-full hover:bg-secondary/80 transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
