"use client";

import { motion } from "framer-motion";
import { BLOGS } from "@/lib/constants";
import { BookOpen, ArrowUpRight } from "lucide-react";
import { FaMedium } from "react-icons/fa6";

export default function Blog() {
  return (
    <section id="blog" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mb-16 border-r-4 border-pink pr-8 text-right"
      >
        <p className="text-pink font-mono text-sm tracking-widest mb-2 uppercase">
          [ KNOWLEDGE_BASE ]
        </p>
        <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter">
          INSIGHT <span className="text-pink text-glow-pink">STREAMS</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {BLOGS.map((blog, i) => (
          <motion.a
            key={i}
            href={blog.url}
            target="_blank"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-8 border border-white/5 group hover:border-pink/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-pink font-mono text-[10px] uppercase tracking-widest">
                  <BookOpen size={14} />
                  <span>Research_Note_#{(i + 1).toString().padStart(2, '0')}</span>
                </div>
                <ArrowUpRight size={18} className="text-white/20 group-hover:text-white transition-colors group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>

              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-pink transition-colors leading-tight">
                {blog.title}
              </h3>

              <p className="text-white/40 font-mono text-xs leading-relaxed mb-8 line-clamp-3">
                {blog.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/20 group-hover:text-white transition-colors">
              <FaMedium size={14} />
              Read on Medium
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
