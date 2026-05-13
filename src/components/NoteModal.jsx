import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function NoteModal({ note, onClose }) {
  return (
    <AnimatePresence>
      {note && (
        <motion.div
          className="fixed inset-0 z-[60] bg-bg-dark/80 backdrop-blur-md flex items-center justify-center px-6 py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="glass max-w-3xl w-full p-6 md:p-10 relative"
            initial={{ scale: 0.96, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 20 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full border border-white/10 hover:border-brand/40"
              aria-label="Close note"
            >
              <X size={16} />
            </button>
            <div className="text-xs font-mono text-white/40 tracking-[0.3em] mb-3">{note.category}</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{note.title}</h3>
            <div className="text-xs text-white/50 flex items-center gap-4 mb-6">
              <span>{note.date}</span>
              <span>{note.readTime}</span>
            </div>
            <div className="space-y-4 text-white/70 text-sm">
              {note.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {note.tags.map((tag) => (
                <span key={tag} className="badge">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
