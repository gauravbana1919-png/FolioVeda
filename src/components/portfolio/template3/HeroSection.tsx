"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, TrendingUp, Target } from "lucide-react";

export function HeroSection({ user }: { user: any }) {
  return (
    <section className="relative min-h-[85vh] flex items-center px-6 md:px-12 lg:px-24 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Open to new opportunities
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
            Driving <span className="text-blue-600 dark:text-blue-400">growth</span> and operational excellence.
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-lg">
            {user?.profile?.bio || "I am a business management professional specializing in strategy, data-driven decisions, and scaling operations for modern startups."}
          </p>

          <div className="flex gap-4">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
              View Resume <ArrowRight size={18} />
            </button>
            <button className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              Contact Me
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Metric Cards */}
          <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 mb-4">
              <TrendingUp size={20} />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">+45%</div>
            <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Revenue Growth</div>
          </div>
          
          <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm sm:-mt-8 sm:mb-8">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 mb-4">
              <Target size={20} />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">98%</div>
            <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Client Retention</div>
          </div>

          <div className="p-6 bg-blue-600 rounded-xl shadow-lg sm:col-span-2 text-white flex items-center justify-between">
            <div>
              <div className="text-sm text-blue-200 font-medium uppercase tracking-wider mb-1">Current Role</div>
              <div className="text-xl font-bold">Business Analyst @ TechCorp</div>
            </div>
            <Briefcase size={32} className="opacity-50" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
