"use client";

import { motion } from "framer-motion";
import { PROJECTS, PROJECT_FILTERS, type ProjectCategory } from "@/lib/constants";
import { useState } from "react";
import { Github, ExternalLink, Cpu, Database, Globe } from "lucide-react";
import ProjectExpanded from "@/components/ui/ProjectExpanded";
import { useStore } from "@/lib/store";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");
  const setHoveringProject = useStore((state) => state.setHoveringProject);

  const filtered = activeFilter === "All"
    ? PROJECTS.filter(p => !p.title.includes("Lulu"))
    : PROJECTS.filter(p => (p.category === activeFilter || p.categories?.includes(activeFilter)) && !p.title.includes("Lulu"));

  return (
    <section id="projects" className="relative py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white mb-4 uppercase">
            PROJECT <span className="text-cyan">MATRIX</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {PROJECT_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 md:px-6 md:py-2 rounded-full font-mono text-[10px] md:text-xs tracking-widest transition-all ${activeFilter === filter
                  ? "bg-cyan text-void border-cyan shadow-[0_0_15px_#00f5ff]"
                  : "text-white/40 hover:text-cyan border border-white/10 hover:border-cyan/50"
                  }`}
              >
                {filter.toUpperCase()}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {(activeFilter === "All" || activeFilter === "Big Data" || activeFilter === "AI/ML") && (
            <ProjectExpanded />
          )}

          {filtered.map((project, i) => (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
              className="tactical-panel p-8 rounded-2xl group border border-white/5 hover:border-cyan/50 transition-all hover:bg-white/[0.02] cursor-pointer"
              onMouseEnter={() => {
                setHoveringProject(true);
                useStore.getState().setCursorVariant("target");
              }}
              onMouseLeave={() => {
                setHoveringProject(false);
                useStore.getState().setCursorVariant("default");
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-cyan">
                  {project.category === "AI/ML" ? <Cpu size={24} /> :
                    project.category === "Big Data" ? <Database size={24} /> :
                      <Globe size={24} />}
                </div>
                <div className="flex gap-4">
                  <a href={project.github} target="_blank" className="text-white/30 hover:text-cyan transition-colors" rel="noreferrer">
                    <Github size={20} />
                  </a>
                  {project.liveDemo && (
                    <a href={project.liveDemo} target="_blank" className="text-white/30 hover:text-cyan transition-colors" rel="noreferrer">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-2xl font-display font-bold text-white mb-4 uppercase tracking-tighter">
                {project.title}
              </h3>
              <p className="text-white/50 text-sm font-mono line-clamp-3 mb-8 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.techTags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] font-mono text-cyan/70 border border-cyan/20 px-2 py-1 rounded bg-cyan/5">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
