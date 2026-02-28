"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import { NAV_LINKS, PERSONAL } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 50);
      setHidden(current > lastScroll && current > 300);
      setLastScroll(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#030303]/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"
          }`}
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-lg border border-amber-500/40 flex items-center justify-center text-amber-500 font-bold text-lg group-hover:shadow-[0_0_15px_#FF6B3550] transition-all">
              {PERSONAL.monogram}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">STATION</p>
              <p className="text-xs font-display font-bold text-white tracking-widest leading-none">QUANTUM_ID</p>
            </div>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 px-2 py-1 rounded-full border border-white/5">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest transition-colors relative ${activeSection === link.href.slice(1) ? "text-amber-500" : "text-white/40 hover:text-white"
                  }`}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-amber-500/10 rounded-full border border-amber-500/20"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Hire Me CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollTo("#contact")}
              className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-lg hover:border-amber-500/50 hover:bg-amber-500/5 transition-all text-[10px] font-mono uppercase tracking-widest text-white/60 hover:text-white flex items-center gap-2"
            >
              <Terminal size={14} className="text-amber-500" />
              INIT_UPLINK
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white/60 p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-72 bg-[#030303] border-l border-white/5 z-50 md:hidden flex flex-col pt-24 px-8"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <p className="font-mono text-[10px] text-white/20 uppercase tracking-[0.3em] mb-12">System Navigation</p>
              <div className="flex flex-col gap-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className={`text-left text-lg font-display font-bold uppercase tracking-widest ${activeSection === link.href.slice(1) ? "text-amber-500" : "text-white/40"
                      }`}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => scrollTo("#contact")}
                className="mt-auto mb-12 w-full py-4 bg-amber-500 text-black font-bold uppercase tracking-widest text-xs rounded-xl"
              >
                INIT_UPLINK
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
