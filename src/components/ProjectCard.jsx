import { motion } from "framer-motion";
import { ExternalLink, Code, ArrowUpRight } from "lucide-react";

export default function ProjectCard({
  title,
  description,
  tags = [],
  stack = [],
  image,
  category,
  live,
  code,
  links,
  onDetails,
}) {
  const projectTags = tags.length ? tags : stack;
  const liveLink = live || links?.live;
  const codeLink = code || links?.github;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.98 }}
      className="glass relative overflow-hidden group border-white/5 hover:border-brand/30 transition-colors"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity card-glow" />

      <div className="h-52 bg-white/5 relative overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/5">
            <div className="text-xs font-mono text-white/30 tracking-[0.3em] uppercase">
              {category || "Project"}
            </div>
          </div>
        )}

        {(codeLink || liveLink) && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute inset-0 bg-brand/20" />
            <div className="scanline" aria-hidden="true" />

            <div className="relative h-full flex items-center justify-center gap-4">
              {codeLink && (
                <a
                  href={codeLink}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-bg-dark rounded-full hover:scale-110 transition-transform"
                  aria-label="View code"
                >
                  <Code size={20} />
                </a>
              )}

              {liveLink && (
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-bg-dark rounded-full hover:scale-110 transition-transform"
                  aria-label="View live demo"
                >
                  <ExternalLink size={20} />
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="p-6 relative">
        <div className="text-xs font-mono text-white/40 tracking-[0.3em] mb-3 uppercase">
          {category || "Project"}
        </div>

        <h3 className="text-xl font-bold mb-2 group-hover:text-brand transition-colors">
          {title}
        </h3>

        <p className="text-white/65 text-sm mb-4">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {projectTags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-1 bg-white/5 rounded border border-white/10 uppercase tracking-widest text-white/40"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={onDetails}
          className="text-sm font-semibold text-brand inline-flex items-center gap-2"
        >
          View case study <ArrowUpRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}