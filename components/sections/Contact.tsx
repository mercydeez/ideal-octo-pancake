"use client";

import { motion } from "framer-motion";
import { Terminal, Send, Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-8 border-l-4 border-cyan pl-8">
            <p className="text-cyan font-mono text-sm tracking-widest mb-2 uppercase">
              [ TRANSMISSION_LINK ]
            </p>
            <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter">
              GET IN <span className="text-pink text-glow-pink">TOUCH</span>
            </h2>
          </div>

          <p className="text-white/50 font-mono text-lg mb-12 max-w-md">
            Interested in collaborating on AI/ML projects or hiring a data specialist?
            Initialise a connection below.
          </p>

          <div className="flex flex-col gap-6">
            {[
              { icon: <Mail />, label: "Email", value: "atharva.soundankar@spjai.edu", color: "#00f5ff" },
              { icon: <Linkedin />, label: "LinkedIn", value: "atharva-soundankar", color: "#ff007a" },
              { icon: <Twitter />, label: "Twitter", value: "@atharva_s", color: "#00f5ff" }
            ].map((link, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                <div
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:scale-110"
                  style={{ color: link.color }}
                >
                  {link.icon}
                </div>
                <div>
                  <p className="text-white/30 font-mono text-[10px] uppercase tracking-widest">{link.label}</p>
                  <p className="text-white font-mono text-sm">{link.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Terminal Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl overflow-hidden border border-white/10"
        >
          {/* macOS Title Bar */}
          <div className="bg-white/5 border-b border-white/10 px-6 py-3 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="flex items-center gap-2 text-white/20 font-mono text-[10px] uppercase tracking-widest">
              <Terminal size={12} />
              contact_portal.sh — 80x24
            </div>
          </div>

          <div className="p-8 font-mono">
            <div className="mb-8">
              <p className="text-cyan mb-2">atharva@quantum:~$ <span className="text-white">./init_contact_sequence</span></p>
              <p className="text-white/40 text-xs tracking-tighter">Establishing secure connection via SSL/TLS...</p>
            </div>

            <form className="space-y-6">
              <div>
                <label className="text-cyan text-[10px] uppercase tracking-widest mb-2 block">01. Identification</label>
                <input
                  type="text"
                  placeholder="NAME_OR_COMPANY"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyan transition-colors"
                />
              </div>
              <div>
                <label className="text-pink text-[10px] uppercase tracking-widest mb-2 block">02. Return_Address</label>
                <input
                  type="email"
                  placeholder="EMAIL_ADDRESS"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-pink transition-colors"
                />
              </div>
              <div>
                <label className="text-cyan/60 text-[10px] uppercase tracking-widest mb-2 block">03. Payload_Content</label>
                <textarea
                  rows={4}
                  placeholder="HOW_CAN_I_ASSIST?"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyan transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan/20 to-pink/20 border border-white/10 hover:border-white/30 py-4 rounded-xl flex items-center justify-center gap-3 group transition-all"
              >
                <span className="text-xs uppercase tracking-[0.3em] font-bold text-white">Transmit_Message</span>
                <Send size={16} className="text-cyan group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </motion.div>

      </div>

    </section>
  );
}
