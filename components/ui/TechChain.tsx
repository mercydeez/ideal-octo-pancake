import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface TechNode {
  label: string;
  sub: string;
  color: string;
  icon: React.ElementType;
}

export default function TechChain({ nodes }: { nodes: TechNode[] }) {
  return (
    <div className="flex flex-col items-center w-full py-4 gap-2">
      {nodes.map((node, i) => {
        const Icon = node.icon;
        return (
          <React.Fragment key={node.label}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="w-full max-w-xs tactical-panel rounded-xl p-3 flex items-center gap-4 border"
              style={{
                background: `${node.color}08`,
                borderColor: `${node.color}30`,
              }}
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${node.color}15` }}
              >
                <Icon size={18} style={{ color: node.color }} />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold text-white/90">{node.label}</span>
                <span className="font-mono text-[10px] text-white/50">{node.sub}</span>
              </div>
            </motion.div>

            {i < nodes.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i * 0.1) + 0.1 }}
                className="flex items-center justify-center py-1 text-white/20"
              >
                <ArrowDown size={16} />
              </motion.div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
