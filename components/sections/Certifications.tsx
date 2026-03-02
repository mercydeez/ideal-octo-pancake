"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CERTIFICATIONS } from "@/lib/constants";
import { Award, ExternalLink, FileText, X } from "lucide-react";
import { useState } from "react";
import { StaggerContainer, FadeInUp } from "@/components/ui/ScrollReveal";
import { useCursorHover } from "@/hooks/useCursorHover";
import ScrambleText from "@/components/ui/ScrambleText";

const Certifications = React.memo(function Certifications() {
  const [selectedPaper, setSelectedPaper] = useState<string | null>(null);
  const cursorProps = useCursorHover();

  // Separate the master card (Research Paper) from the rest
  const masterCard = CERTIFICATIONS.find(c => Boolean(c.paperUrl));
  const standardCerts = CERTIFICATIONS.filter(c => !c.paperUrl);

  return (
    <section id="certifications" className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-white mb-4 uppercase">
            <ScrambleText text="CREDENTIALS " /><span className="text-amber"><ScrambleText text="VAULT" /></span>
          </h2>
          <p className="text-white/50 font-mono text-sm max-w-2xl mx-auto">
            [ SECURE_ACCESS: Authorized credentials, publications, and professional benchmarks. ]
          </p>
        </motion.div>

        {/* Masonry / Grid Layout */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* MASTER CARD: Research Paper — full-width horizontal banner */}
          {masterCard && (
            <FadeInUp className="md:col-span-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                className="tactical-panel p-8 rounded-2xl border-amber/30 relative overflow-hidden group"
                style={{ background: "rgba(0,0,0,0.85)" }}
                {...cursorProps}
              >
                {/* Special Glass Texture & Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber/10 to-transparent opacity-50 pointer-events-none" />
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-amber/20 blur-[100px] pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                  {/* Left: header + title */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-amber/10 border border-amber/30 rounded-xl">
                        <FileText size={24} className="text-amber animate-pulse" />
                      </div>
                      <span className="text-amber font-mono text-xs tracking-[0.2em]">
                        [ MASTER DOC: {(masterCard as any).badge} ]
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white uppercase tracking-tighter leading-tight mb-3">
                      {masterCard.title}
                    </h3>
                    <p className="text-white/60 font-mono text-sm leading-relaxed line-clamp-3">
                      {masterCard.description}
                    </p>
                  </div>

                  {/* Right: action buttons stacked */}
                  <div className="flex flex-row md:flex-col gap-3 flex-shrink-0">
                    <button
                      onClick={() => setSelectedPaper(masterCard.paperUrl || null)}
                      className="flex items-center gap-2 text-void bg-amber hover:bg-white px-5 py-3 font-mono text-xs font-bold transition-colors"
                    >
                      <ExternalLink size={14} /> VIEW_PAPER
                    </button>
                    <button
                      onClick={() => {
                        if ("citation" in masterCard) {
                          navigator.clipboard.writeText((masterCard as any).citation as string);
                          alert("Citation copied!");
                        }
                      }}
                      className="flex items-center gap-2 text-amber hover:text-white border border-amber/30 hover:border-white px-5 py-3 font-mono text-xs transition-colors bg-amber/5"
                    >
                      <FileText size={14} /> CITE
                    </button>
                  </div>
                </div>
              </motion.div>
            </FadeInUp>
          )}

          {/* STANDARD CARDS — uniform 3-col grid with fixed min height */}
          {standardCerts.map((cert, i) => (
            <FadeInUp key={i}>
              <motion.div
                {...cursorProps}
                className="tactical-panel p-6 rounded-2xl border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(123,47,190,0.2)] transition-all flex flex-col relative overflow-hidden group min-h-[220px]"
                style={{
                  background: "rgba(0,0,0,0.7)",
                  backdropFilter: "blur(20px)"
                }}
              >
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)" }} />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-4">
                    {("logo" in cert) ? (
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10 p-1 flex items-center justify-center">
                        <img src={(cert as any).logo} alt={cert.issuer} className="w-full h-full object-contain" />
                      </div>
                    ) : ("monogram" in cert) ? (
                      <div
                        className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center font-bold text-sm"
                        style={{ backgroundColor: `${(cert as any).color}20`, color: (cert as any).color, border: `1px solid ${(cert as any).color}40` }}
                      >
                        {(cert as any).monogram}
                      </div>
                    ) : <Award size={24} className="text-cyan mb-4 opacity-70 group-hover:text-amber transition-colors" />}
                  </div>

                  <h3 className="text-base font-display font-bold text-white mb-2 uppercase leading-tight">
                    {cert.title}
                  </h3>
                  <p className="text-white/40 text-xs font-mono line-clamp-2 mb-4 leading-relaxed flex-1">
                    {cert.description}
                  </p>

                  <div className="mt-auto">
                    {cert.verifyUrl && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="self-start text-[10px] font-mono text-cyan/70 hover:text-cyan border-b border-cyan/30 hover:border-cyan pb-1 transition-colors uppercase flex items-center gap-2 inline-flex"
                      >
                        DECRYPT_RECORD <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>

              </motion.div>
            </FadeInUp>
          ))}
        </StaggerContainer>
      </div>

      {/* TACTICAL MODAL FOR PUBLICATION */}
      <AnimatePresence>
        {selectedPaper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl bg-void/90"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="tactical-panel w-full max-w-4xl h-[80vh] rounded-3xl border border-amber/30 flex flex-col overflow-hidden"
              style={{ background: "rgba(0,0,0,0.95)" }}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-amber animate-pulse" />
                  <span className="font-mono text-xs text-amber tracking-widest uppercase">SECURE_VIEWER // IJCRT_VOL_10</span>
                </div>
                <button
                  onClick={() => setSelectedPaper(null)}
                  className="text-white/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Iframe Viewer */}
              <div className="flex-1 bg-void relative">
                {/* Loader behind iframe */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <p className="text-amber/50 font-mono animate-pulse tracking-widest text-sm">
                    [ DECRYPTING_DOCUMENT... ]
                  </p>
                </div>
                <iframe
                  src={selectedPaper}
                  className="w-full h-full relative z-10"
                  allow="autoplay"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

export default Certifications;
