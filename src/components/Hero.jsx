import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, Sparkles } from 'lucide-react';
import { profile, socials, stats } from '../data/siteData';

const heroImage = '/assets/1000219542.webp';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % profile.roles.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center px-6 pt-36 pb-24 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center max-w-6xl w-full mx-auto z-10"
      >
        <div className="text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-mono mb-6">
            <Sparkles size={19} /> {profile.handle}
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-[1.02]">
           
            <span className="block text-brand text-glow italic">Builds</span>
            High-impact digital products.
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-xl mb-6 font-medium">
            {profile.valueProp}
          </p>
          <div className="flex items-center gap-3 text-sm text-white/60 font-mono mb-8">
            <span className="chip">{profile.location}</span>
            <span className="chip">{profile.school}</span>
          </div>
          <div className="mb-8 h-8">
            <motion.div
              key={profile.roles[roleIndex]}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="text-sm md:text-base font-mono uppercase tracking-[0.3em] text-brand"
            >
              {profile.roles[roleIndex]}
            </motion.div>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="px-8 py-4 btn-primary font-bold hover:scale-105 transition-transform flex items-center gap-2">
              Hire Me <ArrowRight size={18} />
            </a>
            <a href="#projects" className="px-8 py-4 btn-ghost font-bold hover:bg-white/10 transition-colors">
              View Projects
            </a>
            <a href="/assets/igiehon-gideon-cv.pdf" className="px-8 py-4 btn-ghost font-bold hover:bg-white/10 transition-colors flex items-center gap-2" download>
              Download CV <Download size={18} />
            </a>
            <a href="#contact" className="px-8 py-4 btn-ghost font-bold hover:bg-white/10 transition-colors flex items-center gap-2">
              Contact Me <Mail size={18} />
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-3 text-xs font-mono text-white/60">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="chip hover:text-brand transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="hero-panel p-8 md:p-10 relative">
          <div className="absolute top-6 right-6 text-xs font-mono text-white/50">AVAILABLE FOR WORK.</div>
          <div className="relative z-10 grid gap-8 md:gap-6">
            <div className="relative overflow-hidden rounded-2xl border border-white/10">
              <img
                src={heroImage}
                alt="Igiehon Gideon Aisosa headshot"
                className="w-full h-[340px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/70 via-transparent to-transparent" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="glass p-4">
                  <div className="text-xl font-bold text-brand">{stat.value}</div>
                  <div className="text-xs text-white/60 uppercase tracking-[0.2em] mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-0 w-[28rem] h-[28rem] bg-brand/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-brand-secondary/10 blur-[140px] rounded-full" />
      </div>
    </section>
  );
}
