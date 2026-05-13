import { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Section from './components/Section';
import ProjectCard from './components/ProjectCard';

function App() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let rafId = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const handleMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      const dx = targetX - window.innerWidth / 2;
      const dy = targetY - window.innerHeight / 2;
      document.documentElement.style.setProperty('--cursor-x', `${targetX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${targetY}px`);
      document.documentElement.style.setProperty('--cursor-dx', `${dx}px`);
      document.documentElement.style.setProperty('--cursor-dy', `${dy}px`);
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    const handleLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX - 12}px, ${currentY - 12}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currentX - 28}px, ${currentY - 28}px, 0)`;
      }
      rafId = window.requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);
    window.addEventListener('blur', handleLeave);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('blur', handleLeave);
    };
  }, []);

  const projects = [
    {
      title: "NEURAL NETWORK VISUALIZER",
      description: "Real-time 3D visualization of neural node activations using Three.js and WebGL.",
      tags: ["React", "Three.js", "TensorFlow"],
      image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "CRYPTO SENTIMENT ENGINE",
      description: "AI-powered analysis of social media trends for predictive market movements.",
      tags: ["Python", "OpenAI", "Next.js"],
      image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "QUANTUM CHAT PROTOCOL",
      description: "End-to-end encrypted messaging system with post-quantum security algorithms.",
      tags: ["Rust", "WebAssembly", "WebRTC"],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    },
     {
      title: "ulife",
      description: "End-to-end encrypted messaging system with post-quantum security algorithms.",
      tags: ["Javascript", "WebAssembly", "WebRTC"],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    }
  
  ];

  const modules = [
    {
      title: "Immersive shit Interfaces",
      description: "Layered motion systems, custom interactions, and cinematic navigation for bold brands.",
      meta: "UI/UX + Motion",
    },
    {
      title: "Realtime Systems",
      description: "High-performance pipelines engineered for streaming data and collaborative experiences.",
      meta: "Infra + WebRTC",
    },
    {
      title: "Intelligent Layers",
      description: "Agent workflows, data-driven personalization, and adaptive experiences at scale.",
      meta: "AI + Automation",
    },
  ];

  const signals = ["SYNTH", "LATENCY", "RENDER", "VECTOR", "PROTOCOL", "NEURAL", "STREAM"];

  return (
    <div className="bg-bg-dark text-white font-sans selection:bg-brand selection:text-bg-dark relative">
      <Navbar />
      
      <main>
        <Hero />

        <div className="marquee">
          <div className="marquee-track py-4 text-xs font-mono uppercase text-white/60">
            {signals.concat(signals).map((signal, idx) => (
              <span key={`${signal}-${idx}`} className="chip">{signal}</span>
            ))}
          </div>
        </div>
        
        <Section id="projects" title="Selected Works" kicker="Portfolio">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <ProjectCard key={idx} {...project} />
            ))}
          </div>
        </Section>

        <Section id="about" title="About Subroutine" kicker="Origin">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-white/70">
              <p>
                My mission is to merge complex technical architecture with intuitive, 
                high-fidelity user interfaces. I believe the future of the web is immersive, 
                performant, and visually striking.
              </p>
              <p>
                With over 5 years of experience in full-stack development, I focus on building 
                scalable systems that don't compromise on aesthetic quality.
              </p>
              <div className="flex gap-4 pt-4">
                <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-brand font-mono text-sm">
                  NODE.JS
                </div>
                <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-brand font-mono text-sm">
                  REACT
                </div>
                <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-brand font-mono text-sm">
                  POSTGRES
                </div>
              </div>
            </div>
            <div className="hero-panel p-8 aspect-square flex items-center justify-center relative">
               <div className="absolute inset-0 bg-brand/5 animate-pulse" />
               <div className="relative z-10 text-center">
                  <div className="text-5xl font-black text-brand mb-2">99.9%</div>
                  <div className="text-xs tracking-[0.3em] font-mono text-white/40 uppercase">Uptime Reliability</div>
               </div>
            </div>
          </div>
        </Section>

        <Section id="modules" title="System Modules" kicker="Capabilities">
          <div className="grid md:grid-cols-3 gap-6">
            {modules.map((module) => (
              <div key={module.title} className="glass p-6 hover:border-brand/30 transition-colors">
                <div className="text-xs font-mono text-white/40 tracking-[0.3em] mb-3">{module.meta}</div>
                <h3 className="text-2xl font-bold mb-3">{module.title}</h3>
                <p className="text-white/60 text-sm">{module.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Get in Touch" kicker="Contact">
          <div className="hero-panel p-12 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">READY TO BUILD THE FUTURE?</h3>
            <p className="text-white/60 mb-8">Currently accepting new projects and collaborations.</p>
            <a 
              href="mailto:hello@example.com" 
              className="inline-block px-12 py-4 btn-primary font-black tracking-widest hover:scale-105 transition-transform"
            >
              INITIALIZE CONTACT
            </a>
          </div>
        </Section>
      </main>

      <footer className="py-12 border-t border-white/5 text-center text-white/30 font-mono text-xs">
        <p>© 2024 PORTFOLIO.SYS // ALL RIGHTS RESERVED // MADE WITH ❤️ AND CYBERNETICS</p>
      </footer>

      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={cursorRef} className="cursor-orb" aria-hidden="true" />
      <div className="fixed inset-0 -z-50 bg-aurora pointer-events-none" />
      <div className="fixed inset-0 -z-40 grid-overlay pointer-events-none" />
      <div className="fixed inset-0 -z-30 noise-layer pointer-events-none" />
    </div>
  );
}

export default App;
