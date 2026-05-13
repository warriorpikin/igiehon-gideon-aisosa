import { motion } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';

export default function ProjectCard({ title, description, tags, image }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.98 }}
      className="glass relative overflow-hidden group border-white/5 hover:border-brand/30 transition-colors"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity card-glow" />
      <div className="h-48 bg-white/5 relative overflow-hidden">
        {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10">
                <div className="w-20 h-20 border-2 border-dashed border-white/20 rounded-full animate-spin-slow" />
            </div>
        )}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 bg-brand/20" />
          <div className="scanline" aria-hidden="true" />
          <div className="relative h-full flex items-center justify-center gap-4">
          <button className="p-3 bg-bg-dark rounded-full hover:scale-110 transition-transform">
            <Code size={20} />
          </button>
          <button className="p-3 bg-bg-dark rounded-full hover:scale-110 transition-transform">
            <ExternalLink size={20} />
          </button>
          </div>
        </div>
      </div>
      <div className="p-6 relative">
        <h3 className="text-xl font-bold mb-2 group-hover:text-brand transition-colors">{title}</h3>
        <p className="text-white/65 text-sm mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-white/5 rounded border border-white/10 uppercase tracking-widest text-white/40">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
