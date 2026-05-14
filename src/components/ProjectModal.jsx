import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Code } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] bg-bg-dark/80 backdrop-blur-md flex items-center justify-center px-6 py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="glass max-w-3xl w-full p-6 md:p-10 relative overflow-hidden"
            initial={{ scale: 0.96, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 20 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full border border-white/10 hover:border-brand/40"
              aria-label="Close project details"
            >
              <X size={16} />
            </button>
            <div className="grid gap-6">
              <div>
                <div className="text-xs font-mono text-white/40 tracking-[0.3em] mb-2">{project.category}</div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">{project.title}</h3>
                <p className="text-white/70">{project.overview}</p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <img src={project.image} alt={`${project.title} screenshot`} className="w-full h-64 object-cover" loading="lazy" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-brand mb-2">Problem Solved</h4>
                  <p className="text-white/70 text-sm">{project.problem}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-brand mb-2">Result / Outcome</h4>
                  <p className="text-white/70 text-sm">{project.outcome}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-brand mb-2">What Gideon Built</h4>
                <p className="text-white/70 text-sm">
                  {project.built || 'End-to-end UI/UX, frontend development, and production-ready structure.'}
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-brand mb-2">Features</h4>
                  <ul className="text-white/70 text-sm space-y-2">
                    {project.features.map((feature) => (
                      <li key={feature}>• {feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-brand mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="badge">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-brand mb-2">Challenges</h4>
                    <p className="text-white/70 text-sm">{project.challenges}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary px-6 py-3 text-sm font-bold inline-flex items-center gap-2"
                >
                  Live Link <ExternalLink size={16} />
                </a>
                <a
                  href={project.code}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost px-6 py-3 text-sm font-bold inline-flex items-center gap-2"
                >
                  GitHub <Code size={16} />
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-ghost px-6 py-3 text-sm font-bold"
                >
                  Back to projects..
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
