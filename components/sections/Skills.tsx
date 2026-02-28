"use client";

import { motion } from "framer-motion";

const SKILL_GROUPS: {
  title: string;
  skills: { name: string; logo: string }[];
}[] = [
    {
      title: "ML / AI",
      skills: [
        { name: "TensorFlow", logo: "https://cdn.simpleicons.org/tensorflow/FF6F00" },
        { name: "PyTorch", logo: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
        { name: "Scikit-learn", logo: "https://cdn.simpleicons.org/scikitlearn/F7931E" },
        { name: "Pandas", logo: "https://cdn.simpleicons.org/pandas/150458" },
        { name: "NumPy", logo: "https://cdn.simpleicons.org/numpy/013243" },
        { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain/1C3C3C" },
        { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/FFFFFF" },
        { name: "HuggingFace", logo: "https://cdn.simpleicons.org/huggingface/FFD21E" },
      ],
    },
    {
      title: "Big Data",
      skills: [
        { name: "Apache Spark", logo: "https://cdn.simpleicons.org/apachespark/E25A1C" },
        { name: "Kafka", logo: "https://cdn.simpleicons.org/apachekafka/FFFFFF" },
        { name: "Airflow", logo: "https://cdn.simpleicons.org/apacheairflow/017CEE" },
        { name: "Snowflake", logo: "https://cdn.simpleicons.org/snowflake/29B5E8" },
        { name: "Databricks", logo: "https://cdn.simpleicons.org/databricks/FF3621" },
      ],
    },
    {
      title: "Languages & Core",
      skills: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "SQL", logo: "https://cdn.simpleicons.org/mysql/4479A1" },
        { name: "R", logo: "https://cdn.simpleicons.org/r/276DC3" },
      ],
    },
    {
      title: "Cloud & DevOps",
      skills: [
        { name: "AWS", logo: "https://cdn.simpleicons.org/amazonaws/FF9900" },
        { name: "GCP", logo: "https://cdn.simpleicons.org/googlecloud/4285F4" },
        { name: "Azure", logo: "https://cdn.simpleicons.org/microsoftazure/0078D4" },
        { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
        { name: "Git", logo: "https://cdn.simpleicons.org/git/F05032" },
        { name: "GitHub", logo: "https://cdn.simpleicons.org/github/FFFFFF" },
      ],
    },
    {
      title: "Databases",
      skills: [
        { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/4169E1" },
        { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb/47A248" },
        { name: "Redis", logo: "https://cdn.simpleicons.org/redis/DC382D" },
      ],
    },
    {
      title: "Visualization",
      skills: [
        { name: "Power BI", logo: "https://cdn.simpleicons.org/powerbi/F2C811" },
        { name: "Tableau", logo: "https://cdn.simpleicons.org/tableau/E97627" },
        { name: "Plotly", logo: "https://cdn.simpleicons.org/plotly/3F4F75" },
        { name: "Matplotlib", logo: "https://cdn.simpleicons.org/matplotlib/11557C" },
      ],
    },
    {
      title: "Web & Frameworks",
      skills: [
        { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
        { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB" },
        { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
        { name: "Streamlit", logo: "https://cdn.simpleicons.org/streamlit/FF4B4B" },
      ],
    },
  ];

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 px-6 max-w-7xl mx-auto overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 border-l-4 border-cyan pl-8"
      >
        <p className="text-cyan font-mono text-sm tracking-widest mb-2 uppercase">[ TECHNICAL_TOOLKIT ]</p>
        <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter">
          CORE <span className="text-cyan text-glow-cyan">POWERS</span>
        </h2>
      </motion.div>

      <div className="flex flex-col gap-12">
        {SKILL_GROUPS.map((group, groupIdx) => (
          <div key={groupIdx}>
            <h3 className="text-white/40 font-mono text-xs uppercase tracking-[0.4em] mb-6 flex items-center gap-4">
              {groupIdx + 1}. {group.title}
              <div className="h-px flex-1 bg-white/5" />
            </h3>
            {/* FIX 2: CDN icons, no FontAwesome, no emoji */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {group.skills.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl border border-white/10 hover:border-amber-500/50 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-default group min-h-[44px]"
                >
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    width={32}
                    height={32}
                    className="object-contain"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <span className="text-xs text-gray-400 group-hover:text-amber-400 transition-colors text-center leading-tight">
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
