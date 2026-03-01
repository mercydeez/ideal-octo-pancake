"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Send } from "lucide-react";
import { toast } from "sonner";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ScrambleText from "@/components/ui/ScrambleText";



export default function Contact() {
  const sectionRef = useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Message sent! I'll reply soon 🚀");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Failed. Email atharva3895@gmail.com directly");
      }
    } catch {
      toast.error("Failed. Email atharva3895@gmail.com directly");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-16 md:py-24 px-6 max-w-7xl mx-auto overflow-x-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-8 border-l-4 border-amber-500 pl-8">
            <p className="text-amber-400 font-mono text-sm tracking-widest mb-2 uppercase">[ TRANSMISSION_LINK ]</p>
            <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter">
              <ScrambleText text="OPEN " /><span className="text-amber-400 text-glow-amber"><ScrambleText text="CHANNEL" /></span>
            </h2>
          </div>

          <p className="text-white/50 font-mono text-lg mb-12 max-w-md">
            Interested in collaborating on AI/ML projects or hiring a data specialist? Initialise a connection below.
          </p>
        </motion.div>

        {/* Terminal Form - FIX 4 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl overflow-hidden border border-white/10"
        >
          {/* macOS Title Bar */}
          <div className="bg-white/5 border-b border-white/10 px-6 py-3 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <div className="flex items-center gap-2 text-white/20 font-mono text-[10px] uppercase tracking-widest">
              <Terminal size={12} />
              terminal — $ send_message --to="atharva3895@gmail.com"
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 font-mono space-y-6">
            <div className="mb-4">
              <p className="text-cyan mb-1">atharva@neural:~$ <span className="text-white">send_message</span></p>
              <p className="text-white/40 text-xs">Establishing secure connection via SSL/TLS...</p>
            </div>

            <div>
              <label className="text-amber-400 text-[10px] uppercase tracking-widest mb-2 block">01. Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="YOUR_NAME"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-amber-500 transition-colors min-h-[44px]"
              />
            </div>
            <div>
              <label className="text-amber-400 text-[10px] uppercase tracking-widest mb-2 block">02. Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="YOUR_EMAIL"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-amber-500 transition-colors min-h-[44px]"
              />
            </div>
            <div>
              <label className="text-amber-400 text-[10px] uppercase tracking-widest mb-2 block">03. Subject</label>
              <input
                type="text"
                required
                value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                placeholder="SUBJECT_LINE"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-amber-500 transition-colors min-h-[44px]"
              />
            </div>
            <div>
              <label className="text-amber-400 text-[10px] uppercase tracking-widest mb-2 block">04. Message</label>
              <textarea
                rows={4}
                required
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="HOW_CAN_I_ASSIST?"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl flex items-center justify-center gap-3 group transition-all min-h-[44px] font-bold text-sm uppercase tracking-[0.2em] disabled:opacity-50"
              style={{
                background: loading ? 'rgba(255,107,53,0.2)' : 'linear-gradient(135deg, rgba(255,107,53,0.3), rgba(255,184,0,0.2))',
                border: '1px solid rgba(255,107,53,0.4)',
                color: '#FF6B35',
              }}
            >
              {loading ? "TRANSMITTING..." : "TRANSMIT →"}
              {!loading && <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
