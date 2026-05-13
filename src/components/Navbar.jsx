import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { profile } from '../data/siteData';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'tech', label: 'Tech Stack' },
  { id: 'notes', label: 'Notes' },
  { id: 'contact', label: 'Contact' }
];

export default function Navbar() {
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      const offsets = sections
        .map((section) => {
          const el = document.getElementById(section.id);
          if (!el) return null;
          return { id: section.id, top: el.getBoundingClientRect().top };
        })
        .filter(Boolean);

      const current = offsets.find((section) => section.top >= 0 && section.top <= 240) || offsets[0];
      if (current?.id) setActive(current.id);
    };

    handler();
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl"
    >
      <div className="glass px-6 md:px-8 py-4 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-brand shadow-[0_0_12px_rgba(179,107,255,0.8)]" />
          <div className="text-lg md:text-xl font-bold text-brand tracking-tighter">{profile.fullName}</div>
        </a>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`transition-colors ${active === section.id ? 'text-brand' : 'text-white/70 hover:text-brand'}`}
            >
              {section.label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a href="#contact" className="btn-primary px-5 py-2 text-xs font-bold tracking-widest">
            Hire Me
          </a>
        </div>
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-full border border-white/10"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-3 glass px-6 py-4 space-y-4"
          >
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={handleLinkClick}
                className={`block text-sm ${active === section.id ? 'text-brand' : 'text-white/70 hover:text-brand'}`}
              >
                {section.label}
              </a>
            ))}
            <a href="#contact" onClick={handleLinkClick} className="btn-primary px-5 py-2 text-xs font-bold tracking-widest inline-flex">
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
