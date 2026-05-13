import { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Section from './components/Section';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import NoteCard from './components/NoteCard';
import NoteModal from './components/NoteModal';
import ContactForm from './components/ContactForm';
import {
  noteCategories,
  notes,
  profile,
  projectFilters,
  projects,
  services,
  techStack,
  timeline,
  values
} from './data/siteData';

function App() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [projectFilter, setProjectFilter] = useState('All');
  const [projectSearch, setProjectSearch] = useState('');
  const [noteFilter, setNoteFilter] = useState('All');
  const [noteSearch, setNoteSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showTop, setShowTop] = useState(false);

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

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = `${project.title} ${project.description}`.toLowerCase().includes(projectSearch.toLowerCase());
      const matchesFilter =
        projectFilter === 'All' ||
        project.category === projectFilter ||
        project.tags.some((tag) => tag.toLowerCase() === projectFilter.toLowerCase());
      return matchesSearch && matchesFilter;
    });
  }, [projectFilter, projectSearch]);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch = `${note.title} ${note.tags.join(' ')}`.toLowerCase().includes(noteSearch.toLowerCase());
      const matchesFilter = noteFilter === 'All' || note.category === noteFilter;
      return matchesSearch && matchesFilter;
    });
  }, [noteFilter, noteSearch]);

  return (
    <div className="bg-bg-dark text-white font-sans selection:bg-brand selection:text-bg-dark relative">
      <Navbar />

      <main>
        <Hero />

        <Section
          id="about"
          title="About Gideon"
          kicker="Origin"
          subtitle="Igiehon Gideon Aisosa is a web developer based in Benin City, Edo State, Nigeria, and a student of the University of Benin. He builds responsive, clean, user-friendly websites and full-stack applications using modern technologies such as React, Next.js, React Native, Node.js, PostgreSQL, HTML, CSS, and JavaScript."
        >
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
            <div className="space-y-6 text-white/70">
              <p>
                Gideon focuses on helping brands, small businesses, startups, and creators build a professional online presence
                that converts visitors into customers.
              </p>
              <div className="grid gap-4">
                {timeline.map((item) => (
                  <div key={item.title} className="glass p-4">
                    <div className="text-xs font-mono text-white/40 tracking-[0.3em] mb-2">{item.year}</div>
                    <div className="text-lg font-semibold text-white">{item.title}</div>
                    <p className="text-sm text-white/60 mt-2">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="hero-panel p-6">
                <div className="text-xs font-mono text-white/40 tracking-[0.3em] mb-2">Brand</div>
                <div className="text-2xl font-bold mb-2">Warrior Tech</div>
                <p className="text-white/70">
                  Mission: Build clean, scalable, modern digital products for brands and businesses.
                </p>
              </div>
              <div className="glass p-6">
                <div className="text-xs font-mono text-white/40 tracking-[0.3em] mb-3">Values</div>
                <div className="flex flex-wrap gap-2">
                  {values.map((value) => (
                    <span key={value} className="badge">
                      {value}
                    </span>
                  ))}
                </div>
              </div>
              <div className="glass p-6">
                <div className="text-xs font-mono text-white/40 tracking-[0.3em] mb-2">Focus</div>
                <p className="text-white/70">
                  Full-stack web developer delivering responsive websites, web apps, landing pages, and e-commerce platforms
                  for clients in Benin City, UNIBEN, Edo State, and across Nigeria.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="projects"
          title="Projects"
          kicker="Portfolio"
          subtitle="Search and filter selected work across web apps, landing pages, e-commerce, and UI/UX concepts."
        >
          <div className="flex flex-wrap gap-3 mb-6">
            {projectFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setProjectFilter(filter)}
                className={`chip ${projectFilter === filter ? 'chip-active' : ''}`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <input
              value={projectSearch}
              onChange={(event) => setProjectSearch(event.target.value)}
              placeholder="Search projects"
              className="form-input flex-1"
            />
            <div className="glass px-5 py-3 text-sm text-white/60">{filteredProjects.length} projects</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
                onDetails={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </Section>

        <Section
          id="services"
          title="Services"
          kicker="Client Work"
          subtitle="Conversion-focused services designed for brands, businesses, and startups."
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.title} className="glass p-6 hover:border-brand/30 transition-colors">
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-sm text-white/70 mb-4">For: {service.audience}</p>
                <p className="text-sm text-white/60">You get: {service.outcome}</p>
                <a href="#contact" className="mt-6 inline-flex text-brand font-semibold">
                  Request this service
                </a>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="tech"
          title="Tech Stack"
          kicker="Capabilities"
          subtitle="Modern tooling across frontend, backend, mobile, and deployment."
        >
          <div className="grid md:grid-cols-2 gap-6">
            {techStack.map((group) => (
              <div key={group.group} className="glass p-6">
                <div className="text-xs font-mono text-white/40 tracking-[0.3em] mb-3">{group.group}</div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="badge" title={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="notes"
          title="Notes & Blog"
          kicker="Insights"
          subtitle="Developer notes, learning journey, and guides for businesses and student developers."
        >
          <div className="flex flex-wrap gap-3 mb-6">
            {noteCategories.map((category) => (
              <button
                key={category}
                onClick={() => setNoteFilter(category)}
                className={`chip ${noteFilter === category ? 'chip-active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <input
              value={noteSearch}
              onChange={(event) => setNoteSearch(event.target.value)}
              placeholder="Search notes"
              className="form-input flex-1"
            />
            <div className="glass px-5 py-3 text-sm text-white/60">{filteredNotes.length} notes</div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} onOpen={() => setSelectedNote(note)} />
            ))}
          </div>
        </Section>

        <Section
          id="contact"
          title="Contact"
          kicker="Get in touch"
          subtitle="Tell Gideon about your project, timeline, and budget."
        >
          <div className="grid lg:grid-cols-[1fr_0.8fr] gap-10">
            <div className="hero-panel p-6">
              <h3 className="text-2xl font-bold mb-4">Let's build something powerful.</h3>
              <p className="text-white/70 mb-6">
                {profile.publicName} is open to freelance work, internships, remote roles, and collaborations.
              </p>
              <div className="space-y-3 text-sm text-white/60">
                <div>Location: {profile.location}</div>
                <div>Email: {profile.email}</div>
                <div>Brand: {profile.handle}</div>
              </div>
            </div>
            <div className="glass p-6">
              <ContactForm />
            </div>
          </div>
        </Section>
      </main>

      <footer className="py-12 border-t border-white/5 text-center text-white/40 font-mono text-xs">
        <p>© 2026 {profile.fullName} · Warrior Tech · Built for premium web experiences.</p>
      </footer>

      {showTop && (
        <button
          type="button"
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <NoteModal note={selectedNote} onClose={() => setSelectedNote(null)} />

      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={cursorRef} className="cursor-orb" aria-hidden="true" />
      <div className="fixed inset-0 -z-50 bg-aurora pointer-events-none" />
      <div className="fixed inset-0 -z-40 grid-overlay pointer-events-none" />
      <div className="fixed inset-0 -z-30 noise-layer pointer-events-none" />
    </div>
  );
}

export default App;
