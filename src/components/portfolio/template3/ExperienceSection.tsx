"use client";

import { motion } from "framer-motion";

export function ExperienceSection() {
  const experiences = [
    {
      role: "Strategy Consultant",
      company: "Deloitte",
      date: "2023 - Present",
      achievements: [
        "Spearheaded a go-to-market strategy for a SaaS startup resulting in $2M ARR within 6 months.",
        "Optimized internal supply chain workflows, reducing operational costs by 15%.",
      ]
    },
    {
      role: "Business Operations Intern",
      company: "Google",
      date: "Summer 2022",
      achievements: [
        "Analyzed user engagement metrics for Google Cloud products using SQL and Tableau.",
        "Presented weekly executive dashboards directly to the VP of Product.",
      ]
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">Professional Experience</h2>

        <div className="space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800"
            >
              <div className="absolute w-4 h-4 rounded-full bg-blue-600 -left-[9px] top-1 border-4 border-white dark:border-slate-950" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                <span className="text-slate-500 font-medium text-sm">{exp.date}</span>
              </div>
              <h4 className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-4">{exp.company}</h4>
              
              <ul className="space-y-3">
                {exp.achievements.map((item, i) => (
                  <li key={i} className="flex items-start text-slate-600 dark:text-slate-300">
                    <span className="text-blue-500 mr-3 mt-1.5 text-xs">■</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
