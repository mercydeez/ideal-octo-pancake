"use client";

import { motion } from "framer-motion";

const SKILL_GROUPS = [
  {
    title: "1. ML/AI",
    color: "#00f5ff",
    skills: [
      { name: "Python", slug: "python" },
      { name: "TensorFlow", slug: "tensorflow" },
      { name: "PyTorch", slug: "pytorch" },
      { name: "Scikit-Learn", slug: "scikitlearn" },
      { name: "Hugging Face", slug: "huggingface" },
      { name: "LangChain", slug: "langchain" },
    ]
  },
  {
    title: "2. Big Data",
    color: "#ff007a",
    skills: [
      { name: "Apache Spark", slug: "apachespark" },
      { name: "Hadoop", slug: "apachehadoop" },
      { name: "Apache Hive", slug: "apachehive" },
      { name: "Power BI", slug: "powerbi" },
      { name: "Tableau", slug: "tableau" },
    ]
  },
  {
    title: "3. Languages",
    color: "#00f5ff",
    skills: [
      { name: "Python", slug: "python" },
      { name: "SQL", slug: "mysql" },
      { name: "Java", slug: "java" },
      { name: "C++", slug: "cplusplus" },
      { name: "TypeScript", slug: "typescript" },
    ]
  },
  {
    title: "4. Cloud",
    color: "#ff007a",
    skills: [
      { name: "AWS", slug: "amazonaws" },
      { name: "GCP", slug: "googlecloud" },
      { name: "Azure", slug: "microsoftazure" },
      { name: "Docker", slug: "docker" },
      { name: "Kubernetes", slug: "kubernetes" },
    ]
  },
  {
    title: "5. Databases",
    color: "#00f5ff",
    skills: [
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "MongoDB", slug: "mongodb" },
      { name: "Redis", slug: "redis" },
      { name: "Firebase", slug: "firebase" },
      { name: "Cassandra", slug: "apachecassandra" },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 border-l-4 border-cyan pl-8"
      >
        <p className="text-cyan font-mono text-sm tracking-widest mb-2 uppercase">
          [ TECHNICAL_TOOLKIT ]
        </p>
        <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter">
          CORE <span className="text-cyan text-glow-cyan">POWERS</span>
        </h2>
      </motion.div>

      <div className="flex flex-col gap-16">
        {SKILL_GROUPS.map((group, groupIdx) => (
          <div key={groupIdx}>
            <h3 className="text-white/40 font-mono text-xs uppercase tracking-[0.4em] mb-8 flex items-center gap-4">
              {group.title}
              <div className="h-px flex-1 bg-white/5" />
            </h3>
            <div className="flex flex-wrap gap-4">
              {group.skills.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5, borderColor: group.color }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card flex items-center gap-3 px-6 py-3 rounded-xl border border-white/5 transition-all duration-300 group cursor-default"
                  style={{ borderLeftColor: group.color, borderLeftWidth: '3px' }}
                >
                  <img
                    src={`https://cdn.simpleicons.org/${skill.slug}/${group.color.replace('#', '')}`}
                    alt={skill.name}
                    className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100"
                  />
                  <span className="font-mono text-xs text-white/60 group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
