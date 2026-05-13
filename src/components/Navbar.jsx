import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl"
    >
      <div className="glass px-6 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-brand shadow-[0_0_12px_rgba(57,246,182,0.8)]" />
          <div className="text-lg md:text-xl font-bold text-brand tracking-tighter">IGIEHON GIDEON AISOSA</div>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#about" className="hover:text-brand transition-colors">ABOUT</a>
          <a href="#projects" className="hover:text-brand transition-colors">PROJECTS</a>
          <a href="#modules" className="hover:text-brand transition-colors">MODULES</a>
          <a href="#contact" className="hover:text-brand transition-colors">CONTACT</a>
        </div>
        <div className="text-xs text-white/60 font-mono px-3 py-1 rounded-full border border-white/10">WARRIOR</div>
      </div>
    </motion.nav>
  );
}
