"use client";

import { motion } from "framer-motion";
import { BLOGS } from "@/lib/constants";
import { BookOpen, ArrowUpRight } from "lucide-react";
// Medium icon via CDN

export default function Blog() {
  return (
    <section id="blog" className="py-16 md:py-24 px-6 max-w-7xl mx-auto overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mb-16 border-r-4 border-pink pr-8 text-right"
      >
        <p className="text-pink font-mono text-sm tracking-widest mb-2 uppercase">
          [ KNOWLEDGE_BASE ]
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-5xl font-display font-black text-white uppercase tracking-tighter">
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
            whileHover={!("comingSoon" in blog) ? { y: -10, boxShadow: "0 20px 40px -20px rgba(255,107,255,0.2)" } : {}}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card rounded-2xl p-8 border border-white/5 group hover:border-pink/30 transition-all flex flex-col justify-between ${!("comingSoon" in blog) ? "cursor-pointer" : "cursor-default opacity-50 pointer-events-none"}`}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-pink font-mono text-[10px] uppercase tracking-widest">
                  <BookOpen size={14} />
                  <span>{("tag" in blog) ? (blog as any).tag : `Research_Note_#${(i + 1).toString().padStart(2, '0')}`}</span>
                </div>
                {!("comingSoon" in blog) && <ArrowUpRight size={18} className="text-white/20 group-hover:text-white transition-colors group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </div>

              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-pink transition-colors leading-tight">
                {blog.title}
              </h3>

              <p className="text-white/40 font-mono text-xs leading-relaxed mb-8 line-clamp-3">
                {"excerpt" in blog ? (blog as any).excerpt : (blog as any).description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/20 group-hover:text-white transition-colors">
                <img src="https://cdn.simpleicons.org/medium/FFFFFF" alt="Medium" width={14} height={14} className="object-contain opacity-40 group-hover:opacity-100 transition-opacity" />
                {!("comingSoon" in blog) ? "Read on Medium" : "Follow Medium Updates"}
              </div>
              {("readTime" in blog) && <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{(blog as any).readTime}</span>}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
