"use client";

import { motion } from "framer-motion";

export const StaggerContainer = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
                hidden: { opacity: 0 },
                show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15, ease: "easeOut" }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const FadeInUp = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30 },
                show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, type: "spring", bounce: 0.2 }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
