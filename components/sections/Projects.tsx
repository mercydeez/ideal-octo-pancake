"use client";
import React from "react";
import { motion } from "framer-motion";
import { PROJECTS, PROJECT_FILTERS, type ProjectCategory } from "@/lib/constants";
import { useState } from "react";
import { Github, ExternalLink, Cpu, Database, Globe } from "lucide-react";
import FeatureProject from "@/components/ui/FeatureProject";
import { useStore, useCursorStore } from "@/lib/store";
import { StaggerContainer, FadeInUp } from "@/components/ui/ScrollReveal";
import ScrambleText from "@/components/ui/ScrambleText";

const Projects = React.memo(function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");
  const setHoveringProject = useStore((state) => state.setHoveringProject);
  const setCursorVariant = useCursorStore((state) => state.setCursorVariant);

  const filtered = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.category?.includes(activeFilter));

  return (
    <section id="projects" className="relative py-16 md:py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-3xl lg:text-4xl font-display font-black text-white mb-4 uppercase">
            <ScrambleText text="PROJECT " /><span className="text-cyan"><ScrambleText text="MATRIX" /></span>
          </h2>
          <div className="flex justify-start md:justify-center overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-2 md:gap-3 pb-4">
            {PROJECT_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-shrink-0 snap-start px-4 py-2 md:px-6 md:py-2 rounded-full font-mono text-[10px] md:text-xs tracking-widest transition-all ${activeFilter === filter
                  ? "bg-cyan text-void border-cyan shadow-[0_0_15px_#00f5ff]"
                  : "text-white/40 hover:text-cyan border border-white/10 hover:border-cyan/50"
                  }`}
              >
                {filter.toUpperCase()}
              </button>
            ))}
          </div>
        </motion.div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {(activeFilter === "All" || activeFilter === "AI Systems" || activeFilter === "LLM/GenAI") && (
            <FeatureProject />
          )}

          {filtered.map((project, i) => (
            <FadeInUp key={project.name} className="h-full">
              <motion.div
                layout
                whileHover={{ y: -5, boxShadow: "0 20px 40px -20px rgba(0,240,255,0.1)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="tactical-panel rounded-2xl group border border-white/5 hover:border-cyan/50 transition-all hover:bg-white/[0.02] h-full flex flex-col overflow-hidden"
                onMouseEnter={() => {
                  if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
                    setHoveringProject(true);
                    setCursorVariant('targeting');
                  }
                }}
                onMouseLeave={() => {
                  if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
                     setHoveringProject(false);
                     setCursorVariant('default');
                  }
                }}
              >
                {/* Project Screenshot */}
                {(project as any).image && (
                  <div className="relative w-full aspect-video overflow-hidden border-b border-white/5">
                    <img
                      src={(project as any).image}
                      alt={project.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                )}

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-cyan">
                      {project.category?.includes("AI Systems") ? <Cpu size={24} /> :
                        project.category?.includes("Vector Search") ? <Database size={24} /> :
                          <Globe size={24} />}
                    </div>
                    <div className="flex gap-4">
                      {project.github && (
                        <a href={project.github} target="_blank" className="text-white/30 hover:text-cyan transition-colors" rel="noreferrer">
                          <Github size={20} />
                        </a>
                      )}
                      {(project as any).live && (
                        <a href={(project as any).live} target="_blank" className="text-white/30 hover:text-cyan transition-colors" rel="noreferrer">
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-4 uppercase tracking-tighter">
                    {project.name}
                  </h3>
                  <p className="text-white/60 text-sm md:text-sm font-mono line-clamp-3 mb-8 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tag, idx) => (
                      <span key={idx} className="text-[10px] md:text-[11px] font-mono text-white/50 border border-white/10 px-2 py-1 rounded bg-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </FadeInUp>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
});

export default Projects;
