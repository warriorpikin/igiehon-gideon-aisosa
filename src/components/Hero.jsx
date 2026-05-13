import { motion } from 'framer-motion';
import { Terminal, Cpu, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-6 py-24 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center max-w-6xl w-full mx-auto z-10"
      >
        <div className="text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-mono mb-6">
            <Terminal size={14} /> Web Developer | Founder
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tight leading-[0.95]">
            CRAFTING <span className="text-brand text-glow italic">FUTURE</span><br />
            INTERFACES
          </h1>
          <p className="text-lg md:text-xl text-white/65 max-w-xl mb-8 font-medium">
            Full-stack engineer designing fast, cinematic web experiences with layered motion and bold systems thinking.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 btn-primary font-bold hover:scale-105 transition-transform flex items-center gap-2">
              <Zap size={20} /> VIEW PROJECTS
            </button>
            <button className="px-8 py-4 btn-ghost font-bold hover:bg-white/10 transition-colors flex items-center gap-2">
              <Cpu size={20} /> CORE TECH
            </button>
          </div>
          <div className="mt-10 flex flex-wrap gap-3 text-xs font-mono text-white/60">
            <span className="chip">IMMERSIVE</span>
            <span className="chip">SYSTEMS</span>
            <span className="chip">RELIABLE</span>
          </div>
        </div>

        <div className="hero-panel p-8 md:p-10">
          <div className="absolute top-6 right-6 text-xs font-mono text-white/50">LIVE FEED</div>
          <div className="relative z-10 flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/40 tracking-[0.3em]">PROCESSING</div>
                <div className="text-3xl font-bold text-brand">92%</div>
              </div>
              <div className="orbital" aria-hidden="true" />
            </div>
            <div className="glass p-4 flex items-center justify-between">
              <div className="text-sm font-mono text-white/60">THREADS ACTIVE</div>
              <div className="text-xl font-bold">48</div>
            </div>
            <div className="glass p-4 relative overflow-hidden">
              <div className="scanline" aria-hidden="true" />
              <div className="text-xs text-white/50 uppercase tracking-[0.4em]">Signal Integrity</div>
              <div className="text-2xl font-bold text-brand mt-2">99.8%</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 left-0 w-[28rem] h-[28rem] bg-brand/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-brand-secondary/10 blur-[140px] rounded-full" />
      </div>
    </section>
  );
}
