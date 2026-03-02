"use client";

import { useState, useCallback, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Splash from "@/components/Splash";
import Navbar from "@/components/ui/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Certifications from "@/components/sections/Certifications";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Resume from "@/components/sections/Resume";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <Splash key="splash" onComplete={handleLoadComplete} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Navigation & Progress */}
            <Navbar />
            <ScrollProgress />

            {/* Main Content */}
            <main>
              <Suspense fallback={
                <div className="fixed inset-0 flex items-center justify-center bg-void z-50">
                  <p className="text-cyan font-mono text-sm animate-pulse tracking-[0.3em] uppercase">
                    [ STREAMING_ASSETS_INTO_BUFFER... ]
                  </p>
                </div>
              }>
                <Hero />
                <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
                <About />
                <div className="h-px w-full bg-gradient-to-r from-transparent via-pink/30 to-transparent" />
                <Education />
                <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
                <Skills />
                <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
                <Projects />
                <div className="h-px w-full bg-gradient-to-r from-transparent via-pink/30 to-transparent" />
                <Experience />
                <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
                <Certifications />
                <div className="h-px w-full bg-gradient-to-r from-transparent via-pink/30 to-transparent" />
                <Blog />
                <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
                <Resume />
                <div className="h-px w-full bg-gradient-to-r from-transparent via-pink/30 to-transparent" />
                <Contact />
              </Suspense>
            </main>

            {/* Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
