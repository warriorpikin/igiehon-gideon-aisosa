import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  Mail,
  Menu,
  Shield,
  Sword,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

import ContactForm from "./components/ContactForm";
import VideoBackground from "./components/VideoBackground";
import { useWarScrollAnimations } from "./hooks/useWarScrollAnimations";

import {
  profile,
  projects,
  services,
  socials,
  stats,
  techStack,
  timeline,
  notes,
} from "./data/siteData";

import { media } from "./data/media";

const navLinks = [
  { label: "Story", href: "#story" },
  { label: "Missions", href: "#missions" },
  { label: "War Room", href: "#war-room" },
  { label: "Arsenal", href: "#arsenal" },
  { label: "Contact", href: "#contact" },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);

  useWarScrollAnimations();

  const featuredProjects = useMemo(() => projects.slice(0, 7), []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) return undefined;

    let rafId = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let dotX = targetX;
    let dotY = targetY;
    let ringX = targetX;
    let ringY = targetY;

    const handleMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (cursorDotRef.current) cursorDotRef.current.style.opacity = "1";
      if (cursorRingRef.current) cursorRingRef.current.style.opacity = "1";
    };

    const handleLeave = () => {
      if (cursorDotRef.current) cursorDotRef.current.style.opacity = "0";
      if (cursorRingRef.current) cursorRingRef.current.style.opacity = "0";
    };

    const animate = () => {
      dotX += (targetX - dotX) * 0.35;
      dotY += (targetY - dotY) * 0.35;

      ringX += (targetX - ringX) * 0.12;
      ringY += (targetY - ringY) * 0.12;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${dotX - 4}px, ${
          dotY - 4
        }px, 0)`;
      }

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX - 22}px, ${
          ringY - 22
        }px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("blur", handleLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("blur", handleLeave);
    };
  }, []);

  return (
    <div className="cinema-shell">
      <div className="grain-layer" />
      <div className="grid-layer" />

      <div className="giant-word">Warrior</div>

      <header className="scene-nav">
        <a href="#" className="brand-mark" onClick={() => setIsMenuOpen(false)}>
          Igiehon Gideon
        </a>

        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a href="#contact" className="nav-cta">
            Start Mission
            <ArrowUpRight size={15} />
          </a>

          <button
            type="button"
            className="menu-btn"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        )}
      </header>

      <main>
        <section className="hero-scene">
          <div className="hero-video-wrap">
            <VideoBackground
              src={media.videos.heroBattlefieldLoop}
              className="hero-video"
            />
          </div>

          <VideoBackground
            src={media.videos.heroParticlesOverlay}
            className="particle-video"
            overlay={false}
            opacity={0.68}
          />

          <div className="hero-vignette" />

          <div className="hero-content">
            <div className="hero-kicker">
              <span>Full-stack Developer</span>
              <span>Battle-tested systems</span>
            </div>

            <h1>
              <span className="hero-title-line">Built through pressure.</span>
              <span className="hero-title-line italic-line">
                Sharpened by code.
              </span>
            </h1>

            <p className="hero-copy">
              I’m Gideon — a developer building polished interfaces, scalable
              backend systems, e-commerce flows, dashboards, and cinematic web
              experiences for serious brands.
            </p>

            <div className="hero-actions">
              <a href="#missions" className="primary-btn">
                View Missions
                <ArrowUpRight size={17} />
              </a>

              <a href="#story" className="secondary-btn">
                See the Journey
                <Sword size={16} />
              </a>
            </div>

            <div className="hero-socials">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div className="status-panel">
            <div className="status-top">
              <span>Warrior Status</span>
              <Shield size={15} />
            </div>

           <div className="profile-cutout-slot">
  <img
    src="/assets/my-profile.webp"
    alt="Igiehon Gideon"
    className="profile-cutout-img"
  />
</div>

            <div className="status-tags">
              <span>React</span>
              <span>Next.js</span>
              <span>Node.js</span>
              <span>PostgreSQL</span>
            </div>
          </div>
        </section>

        <section id="story" className="scene story-scene video-scene">
          <VideoBackground
            src={media.videos.journeyLoop}
            className="scene-video-layer"
            opacity={0.44}
          />

          <div className="scene-inner">
            <div className="scene-label">Origin Story</div>

            <h2 className="scene-title">
              The battlefield that shaped the builder.
            </h2>

            <p className="scene-text">
              This portfolio is not just a showcase. It is a story of learning,
              failing, rebuilding, sharpening skill, and becoming capable enough
              to ship real digital products.
            </p>

            <div className="story-grid">
              {timeline.map((item, index) => (
                <article className="reveal-card story-card" key={item.title}>
                  <span>0{index + 1}</span>
                  <small>{item.year}</small>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="missions" className="scene missions-scene video-scene">
          <VideoBackground
            src={media.videos.projectsBattleTestedLoop}
            className="scene-video-layer"
            opacity={0.5}
          />

          <div className="mission-head">
            <div>
              <div className="scene-label">Completed Missions</div>
              <h2 className="scene-title">Projects built under pressure.</h2>
            </div>

            <p className="scene-text">
              Each mission represents a product problem solved with design,
              code, structure, and execution.
            </p>
          </div>

          <div className="mission-track">
            {featuredProjects.map((project, index) => (
              <article
                className="mission-card reveal-card"
                key={project.id || project.title}
                onClick={() => setSelectedProject(project)}
              >
                <div className="mission-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="mission-image">
                  <img src={project.image} alt={project.title} />
                </div>

                <div className="mission-body">
                  <span>{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="tag-row">
                    {(project.tags || project.stack || [])
                      .slice(0, 4)
                      .map((tag) => (
                        <small key={tag}>{tag}</small>
                      ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="war-room" className="scene war-room-scene video-scene">
          <VideoBackground
            src={media.videos.warRoomSkillsLoop}
            className="scene-video-layer"
            opacity={0.52}
          />

          <div className="scene-inner split-scene">
            <div>
              <div className="scene-label">War Room</div>
              <h2 className="scene-title">Strategy before execution.</h2>
              <p className="scene-text">
                I don’t just build screens. I think through flow, performance,
                backend structure, payment, admin logic, and how the product
                will survive real users.
              </p>
            </div>

            <div className="service-grid">
              {services.slice(0, 6).map((service, index) => (
                <article className="reveal-card service-card" key={service.title}>
                  <span>0{index + 1}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="arsenal" className="scene arsenal-scene">
          <div className="scene-inner">
            <div className="scene-label">Arsenal</div>
            <h2 className="scene-title">The stack I fight with.</h2>

            <div className="arsenal-grid">
              {techStack.map((group) => (
                <article className="reveal-card arsenal-card" key={group.group}>
                  <Code2 size={22} />
                  <h3>{group.group}</h3>

                  <div className="tag-row">
                    {group.items.map((item) => (
                      <small key={item}>{item}</small>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="scene notes-scene">
          <div className="scene-inner">
            <div className="scene-label">Field Notes</div>
            <h2 className="scene-title">Lessons from the build floor.</h2>

            <div className="notes-grid">
              {notes.slice(0, 3).map((note) => (
                <article className="reveal-card note-card" key={note.id}>
                  <span>{note.tag || note.category}</span>
                  <h3>{note.title}</h3>
                  <p>{note.excerpt || note.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="scene contact-scene">
          <div className="contact-panel">
            <div>
              <div className="scene-label">Final Call</div>
              <h2 className="scene-title">Ready for the next mission?</h2>

              <p className="scene-text">
                Send the idea, timeline, and goal. I’ll help you turn it into a
                clean, serious, functional digital product.
              </p>

              <div className="contact-links">
                <a href={`mailto:${profile.email}`}>
                  <Mail size={16} />
                  {profile.email}
                </a>

                <span>
                  <Briefcase size={16} />
                  Freelance · Internship · Remote roles
                </span>
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="footer">
        © 2026 {profile.fullName}. Built with React, GSAP, Motion, and
        discipline.
      </footer>

      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <motion.div
            className="project-modal"
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedProject(null)}
            >
              <X size={18} />
            </button>

            <span>{selectedProject.category}</span>
            <h2>{selectedProject.title}</h2>
            <p>{selectedProject.longDescription || selectedProject.overview}</p>

            <div className="modal-grid">
              <div>
                <strong>Problem</strong>
                <p>{selectedProject.problem || "Project challenge and goal."}</p>
              </div>

              <div>
                <strong>Outcome</strong>
                <p>{selectedProject.outcome || "A polished digital result."}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div ref={cursorDotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={cursorRingRef} className="cursor-ring" aria-hidden="true" />
    </div>
  );
}

export default App;