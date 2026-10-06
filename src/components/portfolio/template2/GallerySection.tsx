"use client";

import { motion } from "framer-motion";

export function GallerySection({ projects = [] }: { projects?: any[] }) {
  const defaultProjects = [
    { id: 1, title: "Brand Identity", desc: "A fresh look for a modern cafe.", color: "bg-orange-200", height: "h-64" },
    { id: 2, title: "Mobile App UI", desc: "Fintech dashboard concepts.", color: "bg-blue-200", height: "h-96" },
    { id: 3, title: "Typography Poster", desc: "Experimental type design.", color: "bg-purple-200", height: "h-80" },
    { id: 4, title: "3D Renderings", desc: "Abstract shapes in Cinema4D.", color: "bg-pink-200", height: "h-72" },
  ];

  const items = projects.length > 0 ? projects : defaultProjects;

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-zinc-900 dark:text-white">
            Selected Work
          </h2>
          <div className="w-20 h-1 bg-pink-500 rounded-full" />
        </div>

        {/* Masonry Layout Simulation */}
        <div className="columns-1 md:columns-2 gap-8 space-y-8">
          {items.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative break-inside-avoid overflow-hidden rounded-2xl cursor-pointer"
            >
              {/* Image Placeholder */}
              <div className={`w-full ${project.height || 'h-80'} ${project.color || 'bg-zinc-200 dark:bg-zinc-800'} transition-transform duration-700 group-hover:scale-105`} />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-white/80 font-medium">{project.desc || project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
