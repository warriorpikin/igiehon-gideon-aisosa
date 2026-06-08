import { motion } from "framer-motion";
import { ArrowUpRight, Code, ExternalLink } from "lucide-react";

export default function ProjectCard({
  title,
  description,
  tags,
  stack,
  image,
  category,
  type,
  live,
  code,
  links,
  featured,
  status,
  year,
  onDetails,
}) {
  const projectTags = tags || stack || [];
  const liveLink = live || links?.live;
  const codeLink = code || links?.github;

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className={`project-card ${featured ? "project-card-featured" : ""}`}
    >
      <div className="project-card-media">
        {image ? (
          <img
            src={image}
            alt={title}
            className="project-card-image"
            loading="lazy"
          />
        ) : (
          <div className="project-card-placeholder">
            <span>{category || "Project"}</span>
          </div>
        )}

        <div className="project-card-actions" aria-label={`${title} links`}>
          {codeLink && (
            <a
              href={codeLink}
              target="_blank"
              rel="noreferrer"
              className="project-icon-link"
              aria-label={`View ${title} source code`}
            >
              <Code size={18} />
            </a>
          )}

          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noreferrer"
              className="project-icon-link"
              aria-label={`View ${title} live website`}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <div className="project-card-body">
        <div className="project-card-meta">
          <span>{category || type || "Project"}</span>
          {year && <span>{year}</span>}
        </div>

        <div className="project-card-title-row">
          <h3>{title}</h3>
          {status && <span className="project-status">{status}</span>}
        </div>

        <p>{description}</p>

        <div className="project-tags">
          {projectTags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <button type="button" onClick={onDetails} className="project-details-btn">
          View case study
          <ArrowUpRight size={16} />
        </button>
      </div>
    </motion.article>
  );
}