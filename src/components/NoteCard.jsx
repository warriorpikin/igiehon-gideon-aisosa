import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function NoteCard({ note, onOpen }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="glass p-6 border-white/5 hover:border-brand/30 transition-colors"
    >
      <div className="text-xs font-mono text-white/40 tracking-[0.3em] mb-3">{note.category}</div>
      <h3 className="text-xl font-bold mb-2">{note.title}</h3>
      <p className="text-white/65 text-sm mb-4">{note.excerpt}</p>
      <div className="flex items-center justify-between text-xs text-white/50">
        <span>{note.date}</span>
        <span>{note.readTime}</span>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {note.tags.map((tag) => (
          <span key={tag} className="badge">
            {tag}
          </span>
        ))}
      </div>
      <button onClick={onOpen} className="mt-6 text-sm font-semibold text-brand inline-flex items-center gap-2">
        Read note <ArrowUpRight size={16} />
      </button>
    </motion.div>
  );
}
