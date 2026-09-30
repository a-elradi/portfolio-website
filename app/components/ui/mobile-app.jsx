"use client";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  X, ChevronLeft, ArrowUpRight, Play, Sun, Moon, CalendarDays, Briefcase, Award,
  Github, Linkedin, Mail, Link as LinkIcon, FileText, Download, ExternalLink,
  MapPin, Cpu, Dribbble, Quote, Send,
} from 'lucide-react';
import { PROJECTS } from './projects-gallery';
import { SYSTEMS } from './automation-systems';
import SkillsIcons, { SKILL_GROUPS } from './skills-icons';
import ServicesGrid, { SERVICES } from './services-grid';
import AvailabilityCalendar, { nextAvailableDate } from './availability-calendar';

const EMAIL = 'Abdallaelsiddig.m@gmail.com';
const RESUME = '/Abdalla-Elsiddig.Resume.pdf';
const SOCIALS = [
  { href: 'https://github.com/a-elradi', label: 'GitHub', Icon: Github },
  { href: 'https://www.linkedin.com/in/abdalla-elradi/', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://linktr.ee/Abdallaelsiddig', label: 'Linktree', Icon: LinkIcon },
];

const ALL_SKILLS = SKILL_GROUPS.flatMap((g) => g.items);
const TILE_SKILLS = ['Python', 'OpenCV', 'TensorFlow', 'C++']
  .map((name) => ALL_SKILLS.find((s) => s.name === name))
  .filter(Boolean);

const SHEET_TITLES = {
  about: 'About',
  systems: 'AI Systems',
  projects: 'Projects',
  experience: 'Experience',
  skills: 'Skills',
  services: 'Services',
  book: 'Book a call',
  certificates: 'Certificates',
  contact: 'Contact',
};

// Sheets are mirrored into browser history so the phone's back button (and
// iOS edge-swipe) closes the sheet instead of leaving the site. `depth` lets
// the X button unwind a nested sheet (Projects → a project) in one step.
export function useMobileSheet() {
  const [sheet, setSheet] = useState(null);

  useEffect(() => {
    const onPop = () => setSheet(window.history.state?.mobileSheet ?? null);
    const desktop = window.matchMedia('(min-width: 768px)');
    const onViewport = () => desktop.matches && setSheet(null);
    window.addEventListener('popstate', onPop);
    desktop.addEventListener('change', onViewport);
    return () => {
      window.removeEventListener('popstate', onPop);
      desktop.removeEventListener('change', onViewport);
    };
  }, []);

  const open = useCallback((id) => {
    const depth = (window.history.state?.mobileSheet ? window.history.state.depth : 0) + 1;
    window.history.pushState({ mobileSheet: id, depth }, '');
    setSheet(id);
  }, []);

  const back = useCallback(() => window.history.back(), []);

  const close = useCallback(() => {
    const depth = window.history.state?.depth;
    if (depth) window.history.go(-depth);
    else setSheet(null);
  }, []);

  return { sheet, open, back, close };
}

function SheetFrame({ open, title, contentKey, onClose, onBack, isDarkMode, children }) {
  const [rendered, setRendered] = useState(false);
  const [shown, setShown] = useState(false);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startY = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    if (open) {
      setDrag(0);
      setRendered(true);
      let inner;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setShown(true));
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }
    setShown(false);
    const timer = setTimeout(() => setRendered(false), 380);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // A dialog opened on top (the request form) owns Escape; otherwise one
    // key press would close both it and the sheet beneath.
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      const dialogs = document.querySelectorAll('[role="dialog"][aria-modal="true"]');
      if (dialogs[dialogs.length - 1] === rootRef.current) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!rendered) return null;

  // Drag only from the header, and never from its buttons: pointer capture
  // would retarget their click to the header.
  const onPointerDown = (e) => {
    if (e.target.closest('button')) return;
    startY.current = e.clientY;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (startY.current === null) return;
    setDrag(Math.max(0, e.clientY - startY.current));
  };
  const onPointerUp = () => {
    if (startY.current === null) return;
    startY.current = null;
    setDragging(false);
    // Past the threshold, leave `drag` where it is so the panel continues
    // down from the finger instead of snapping up before it closes.
    if (drag > 110) onClose();
    else setDrag(0);
  };

  const hairline = isDarkMode ? 'border-white/10' : 'border-neutral-200';

  return (
    <div ref={rootRef} className="fixed inset-0 z-[55]" role="dialog" aria-modal="true" aria-label={title}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] touch-none transition-opacity duration-300 ${shown ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        style={{
          transform: shown ? `translate3d(0, ${drag}px, 0)` : 'translate3d(0, 100%, 0)',
          transition: dragging ? 'none' : 'transform 0.42s cubic-bezier(0.32, 0.72, 0, 1)',
        }}
        className={`absolute inset-x-0 bottom-0 top-[max(0.75rem,env(safe-area-inset-top))] flex flex-col rounded-t-[2rem] border-t overflow-hidden shadow-[0_-24px_60px_rgba(0,0,0,0.55)] ${hairline} ${isDarkMode ? 'bg-[#0c0c0c] text-white' : 'bg-neutral-50 text-neutral-900'}`}
      >
        <header
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={`shrink-0 px-3 pt-2 pb-2 touch-none select-none border-b ${hairline}`}
        >
          <div className={`mx-auto mb-1.5 h-1.5 w-11 rounded-full ${isDarkMode ? 'bg-white/20' : 'bg-neutral-300'}`} />
          <div className="flex items-center justify-between gap-2">
            {onBack ? (
              <button
                onClick={onBack}
                aria-label="Back"
                className={`w-11 h-11 inline-flex items-center justify-center rounded-full ${isDarkMode ? 'bg-white/5 active:bg-white/15' : 'bg-neutral-900/5 active:bg-neutral-900/10'}`}
              >
                <ChevronLeft size={20} />
              </button>
            ) : (
              <span className="w-11" />
            )}
            <h2 className="flex-1 text-center text-[11px] font-black uppercase tracking-[0.25em] truncate">{title}</h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className={`w-11 h-11 inline-flex items-center justify-center rounded-full ${isDarkMode ? 'bg-white/5 active:bg-white/15' : 'bg-neutral-900/5 active:bg-neutral-900/10'}`}
            >
              <X size={18} />
            </button>
          </div>
        </header>
        <div key={contentKey} className="flex-1 overflow-y-auto overscroll-contain px-4 pt-5 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
          {children}
        </div>
      </div>
    </div>
  );
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Silent looping trailer cut from the four demos. preload="none" so desktop,
// where this tree is hidden, never downloads it; the muted property is set in
// the effect because iOS only autoplays when it is true at play() time.
function SystemsPreview({ paused }) {
  const ref = useRef(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    if (paused || prefersReducedMotion() || !window.matchMedia('(max-width: 767px)').matches) video.pause();
    else video.play().catch(() => {});
  }, [paused]);
  return (
    <video
      ref={ref}
      src="/systems-preview.mp4"
      poster="/systems-preview.jpg"
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}

function Tile({ index, ready, span, className = '', onClick, label, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      style={{ '--i': index }}
      className={`group relative overflow-hidden rounded-[1.75rem] text-left transition-transform duration-200 active:scale-[0.97] ${span ? 'col-span-2' : ''} ${ready ? 'tile-in' : 'opacity-0'} ${className}`}
    >
      {children}
    </button>
  );
}

function Eyebrow({ children, className = '' }) {
  return <p className={`text-[9px] font-black uppercase tracking-[0.28em] ${className}`}>{children}</p>;
}

function Corner({ tone = 'light' }) {
  return (
    <span className={`absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur ${tone === 'light' ? 'bg-black/35 text-white' : 'bg-emerald-500/10 text-emerald-400'}`}>
      <ArrowUpRight size={15} />
    </span>
  );
}

export default function MobileApp({
  className = '',
  ready,
  isDarkMode,
  onToggleTheme,
  themeClasses,
  photo,
  photoKey,
  mindsetPhoto,
  experiences,
  certificateFiles,
  getCertificateBadgePath,
  accentColor,
  sheetNav,
  onRequest,
  onOpenChat,
}) {
  const { sheet, open, back, close } = sheetNav;
  const [playing, setPlaying] = useState(null);
  const strong = isDarkMode ? 'text-white' : 'text-neutral-900';
  const soft = isDarkMode ? 'text-gray-400' : 'text-neutral-600';

  // Keep rendering the last sheet while it animates out; `sheet` is already
  // null by then and the panel would slide down empty.
  const lastSheet = useRef(null);
  if (sheet) lastSheet.current = sheet;
  const shownSheet = sheet ?? lastSheet.current;

  useEffect(() => {
    if (sheet !== 'systems') setPlaying(null);
  }, [sheet]);

  // Projects tile cycles through the gallery like a photo widget. Only the
  // outgoing, current and next images are mounted, so it never loads the lot.
  const [projectIndex, setProjectIndex] = useState(0);
  const cycled = useRef(false);
  useEffect(() => {
    if (!ready || sheet || prefersReducedMotion()) return undefined;
    const timer = window.setInterval(() => {
      cycled.current = true;
      setProjectIndex((i) => (i + 1) % PROJECTS.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [ready, sheet]);
  // Layers keep gallery order so React never moves a node (a moved node drops
  // its opacity transition); z-index decides which one is on top instead.
  const count = PROJECTS.length;
  const projectLayers = PROJECTS.map((project, i) => ({
    project,
    current: i === projectIndex,
    previous: cycled.current && i === (projectIndex - 1 + count) % count,
    next: i === (projectIndex + 1) % count,
  })).filter((layer) => layer.current || layer.previous || layer.next);

  const project = shownSheet?.startsWith('project:') ? PROJECTS.find((p) => `project:${p.id}` === shownSheet) : null;
  const current = experiences[0];

  const request = (payload) => onRequest(payload);

  const renderSheet = () => {
    if (project) {
      return (
        <article>
          <div className="aspect-video -mx-4 -mt-5 mb-6 bg-black">
            {project.video ? (
              <video src={project.video} poster={project.image} controls playsInline preload="metadata" className="w-full h-full object-contain" />
            ) : (
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            )}
          </div>
          <Eyebrow className="text-emerald-400 mb-2">{project.category}</Eyebrow>
          <h3 className={`text-3xl font-black leading-[1.05] mb-4 ${strong}`}>{project.title}</h3>
          <p className={`${soft} leading-relaxed mb-6`}>{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span key={tag} className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${themeClasses.subCard} ${soft}`}>{tag}</span>
            ))}
          </div>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-emerald-500 text-black font-black">
              <ExternalLink size={18} /> Visit live site
            </a>
          )}
        </article>
      );
    }

    switch (shownSheet) {
      case 'about':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-2">
              <img src={photo} alt="Abdalla Elradi" className="w-16 h-16 rounded-2xl object-cover object-top" />
              <div>
                <p className={`text-xl font-black uppercase tracking-tight leading-none ${strong}`}>Abdalla Elradi</p>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400 mt-2">Informatics Engineer</p>
              </div>
            </div>
            <section className={`rounded-[1.75rem] p-5 ${themeClasses.card}`}>
              <h3 className={`text-base font-black uppercase tracking-tight mb-3 flex items-center gap-2.5 ${strong}`}>
                <Cpu size={18} className="text-emerald-400" /> Craft
              </h3>
              <p className={`${soft} text-sm leading-relaxed mb-5`}>
                Demonstrated expertise in <span className={`${strong} font-medium`}>artificial intelligence, computer vision, IoT, and robotics</span>, with <span className={`${strong} font-medium`}>1.5+ years of professional experience</span> building innovative systems.
              </p>
              <div className="flex flex-wrap gap-2">
                {['AI', 'Python', 'OpenCV', 'Automation'].map((t) => (
                  <span key={t} className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase ${themeClasses.subCard} ${soft}`}>{t}</span>
                ))}
              </div>
            </section>
            <section className={`rounded-[1.75rem] p-5 ${themeClasses.card}`}>
              <h3 className={`text-base font-black uppercase tracking-tight mb-3 flex items-center gap-2.5 ${strong}`}>
                <Dribbble size={18} className="text-emerald-400" /> Mindset
              </h3>
              <p className={`${soft} text-sm leading-relaxed mb-4`}>
                Excellence is a habit. <span className={`${strong} font-medium italic`}>Basketball</span> taught me discipline, focus, and leadership — qualities I apply to every engineering challenge.
              </p>
              <img src={mindsetPhoto} alt="Abdalla playing basketball" loading="lazy" className="w-full h-52 object-cover rounded-2xl" />
            </section>
            <section className={`rounded-[1.75rem] p-5 ${themeClasses.card}`}>
              <Quote size={22} className="text-emerald-400 mb-3" />
              <p className={`text-xl font-black leading-tight ${strong}`}>“Build with purpose. Lead with vision.”</p>
            </section>
            <section className={`relative overflow-hidden rounded-[1.75rem] p-5 ${themeClasses.card}`}>
              <img src="/manama.jpg" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-15" />
              <div className="relative">
                <p className={`flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] mb-3 ${soft}`}>
                  <MapPin size={14} className="text-emerald-400" /> Location
                </p>
                <p className={`text-2xl font-black uppercase tracking-tight ${strong}`}>Manama, Bahrain</p>
                <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] mt-1.5 ${soft}`}>26.2235°N, 50.5876°E</p>
              </div>
            </section>
          </div>
        );

      case 'systems':
        return (
          <div className="space-y-5">
            <p className={`${soft} text-sm leading-relaxed`}>
              Production AI agent systems built for real business operations — tap a video to watch it work.
            </p>
            {SYSTEMS.map((system) => {
              const Icon = system.icon;
              return (
                <article key={system.id} className={`rounded-[1.75rem] overflow-hidden ${themeClasses.card}`}>
                  <div className="relative aspect-video bg-black">
                    {playing === system.id ? (
                      <video src={system.video} poster={system.still} controls autoPlay playsInline className="w-full h-full object-contain" />
                    ) : (
                      <button onClick={() => setPlaying(system.id)} aria-label={`Play ${system.title} demo`} className="group absolute inset-0">
                        <img src={system.still} alt="" loading="lazy" className="w-full h-full object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="w-16 h-16 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.6)] transition-transform group-active:scale-90">
                            <Play size={24} fill="currentColor" className="ml-1" />
                          </span>
                        </span>
                      </button>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center"><Icon size={16} /></span>
                      <Eyebrow className="text-emerald-400">{system.category}</Eyebrow>
                    </div>
                    <h3 className={`text-2xl font-black leading-tight mb-2 ${strong}`}>{system.title}</h3>
                    <p className={`text-sm font-semibold leading-snug mb-4 ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>{system.tagline}</p>
                    <ul className="space-y-2 mb-4">
                      {system.highlights.map((point) => (
                        <li key={point} className={`flex gap-2.5 text-[13px] leading-snug ${soft}`}>
                          <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <details className="group/d mb-5">
                      <summary className="list-none cursor-pointer text-[11px] font-black uppercase tracking-[0.18em] text-emerald-400 flex items-center gap-1.5">
                        How it works <ArrowUpRight size={13} className="transition-transform group-open/d:rotate-90" />
                      </summary>
                      <p className={`${soft} text-sm leading-relaxed mt-3`}>{system.description}</p>
                    </details>
                    <button
                      onClick={() => request({ type: 'service', serviceName: system.title })}
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-emerald-500 text-black text-sm font-black active:scale-[0.98] transition-transform"
                    >
                      <Send size={16} /> Request this for my business
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        );

      case 'projects':
        return (
          <div className="grid grid-cols-2 gap-3">
            {PROJECTS.map((p) => (
              <button
                key={p.id}
                onClick={() => open(`project:${p.id}`)}
                className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden text-left active:scale-[0.97] transition-transform"
              >
                <img src={p.thumb ?? p.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                <span className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                {p.video && (
                  <span className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur text-[9px] font-black uppercase tracking-wider text-white">
                    <Play size={9} fill="currentColor" /> Demo
                  </span>
                )}
                <span className="absolute inset-x-0 bottom-0 p-3.5">
                  <span className="block text-[8px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-1">{p.category.replace(/^\d+\s*—\s*/, '')}</span>
                  <span className="block text-sm font-black text-white leading-tight">{p.title}</span>
                </span>
              </button>
            ))}
          </div>
        );

      case 'experience':
        return (
          <ol className={`relative ml-2 border-l ${isDarkMode ? 'border-white/10' : 'border-neutral-200'}`}>
            {experiences.map((exp, i) => (
              <li key={exp.title} className="relative pl-6 pb-8 last:pb-0">
                <span className={`absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full border-2 ${i === 0 ? 'bg-emerald-400 border-emerald-400 shadow-[0_0_14px_rgba(16,185,129,0.7)]' : isDarkMode ? 'bg-[#0c0c0c] border-white/30' : 'bg-neutral-50 border-neutral-300'}`} />
                <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1.5 ${i === 0 ? 'text-emerald-400' : soft}`}>{exp.period}</p>
                <h3 className={`text-lg font-black leading-tight ${strong}`}>{exp.title}</h3>
                <p className={`text-sm font-semibold mb-3 ${soft}`}>{exp.company}</p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.highlights.map((h) => (
                    <span key={h} className={`px-2.5 py-1 rounded-lg text-[11px] ${themeClasses.subCard} ${soft}`}>{h}</span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        );

      case 'skills':
        return <SkillsIcons isDarkMode={isDarkMode} themeClasses={themeClasses} />;

      case 'services':
        return (
          <>
            <p className={`${soft} text-sm leading-relaxed mb-5`}>Tap a service to send a request with your project details.</p>
            <ServicesGrid
              isDarkMode={isDarkMode}
              themeClasses={themeClasses}
              onRequestService={(serviceName) => request({ type: 'service', serviceName })}
            />
          </>
        );

      case 'book': {
        const nextOpen = nextAvailableDate();
        const nextLabel = nextOpen
          ? new Date(`${nextOpen}T00:00:00`).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
          : null;
        return (
          <>
            <AvailabilityCalendar
              isDarkMode={isDarkMode}
              themeClasses={themeClasses}
              onRequestDate={(date) => request({ type: 'booking', date })}
              showQuickRequest={false}
            />
            <p className={`text-center text-xs mt-4 ${soft}`}>Tap any green day to request a 30-minute call.</p>
            {nextOpen && (
              <button
                onClick={() => request({ type: 'booking', date: nextOpen })}
                className="mt-4 flex items-center justify-between w-full px-5 py-4 rounded-2xl bg-emerald-500 text-black font-black active:scale-[0.98] transition-transform"
              >
                <span className="flex items-center gap-3"><CalendarDays size={19} /> Next open day</span>
                <span className="flex items-center gap-1.5 text-sm">{nextLabel} <ArrowUpRight size={17} /></span>
              </button>
            )}
          </>
        );
      }

      case 'certificates':
        return (
          <div className="grid grid-cols-2 gap-3">
            {certificateFiles.map((c) => (
              <a
                key={c.file}
                href={`/certificates/${c.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-[1.25rem] overflow-hidden active:scale-[0.97] transition-transform ${themeClasses.card}`}
              >
                <span className="flex h-24 items-center justify-center bg-gradient-to-br from-neutral-900 via-[#06070d] to-neutral-800 p-3">
                  <img
                    src={getCertificateBadgePath(c)}
                    alt=""
                    loading="lazy"
                    className="max-h-16 max-w-full object-contain"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = getCertificateBadgePath(c).replace(/\.png$/i, '.jpg');
                    }}
                  />
                </span>
                <span className="block p-3">
                  <span className={`block text-xs font-bold leading-snug mb-1.5 ${strong}`}>{c.title}</span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.18em] text-emerald-400">View <ArrowUpRight size={10} /></span>
                </span>
              </a>
            ))}
          </div>
        );

      case 'contact':
        return (
          <div>
            <h3 className={`text-3xl font-black uppercase tracking-tight leading-[0.95] mb-3 ${strong}`}>Let&apos;s work<br />together</h3>
            <p className={`${soft} leading-relaxed mb-7`}>Open to opportunities in AI, computer vision, robotics, and education community collaborations.</p>
            <a href={`mailto:${EMAIL}`} className="flex items-center justify-between w-full px-5 py-4 rounded-2xl bg-emerald-500 text-black mb-3 active:scale-[0.98] transition-transform">
              <span className="flex items-center gap-3 font-black"><Mail size={20} /> Email me</span>
              <ArrowUpRight size={18} />
            </a>
            <div className="grid grid-cols-2 gap-3 mb-7">
              <a href={RESUME} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold ${themeClasses.card} ${strong}`}>
                <FileText size={17} /> View resume
              </a>
              <a href={RESUME} download className={`flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold ${themeClasses.card} ${strong}`}>
                <Download size={17} /> Download
              </a>
            </div>
            <div className={`rounded-[1.75rem] overflow-hidden ${themeClasses.card}`}>
              {SOCIALS.map(({ href, label, Icon }, i) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between px-5 py-4 active:bg-white/5 ${i ? `border-t ${isDarkMode ? 'border-white/10' : 'border-neutral-200'}` : ''}`}
                >
                  <span className={`flex items-center gap-3 font-bold ${strong}`}><Icon size={19} className="text-emerald-400" /> {label}</span>
                  <ArrowUpRight size={16} className={soft} />
                </a>
              ))}
            </div>
            <p className={`text-center text-xs mt-6 ${soft}`}>{EMAIL}</p>
          </div>
        );

      default:
        return null;
    }
  };

  const tileGlass = themeClasses.card;
  let i = 0;

  return (
    <div className={`relative z-10 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-10 ${className}`}>
      <header className={`flex items-center justify-between h-16 mb-2 ${ready ? 'tile-in' : 'opacity-0'}`} style={{ '--i': 0 }}>
        <span role="img" aria-label="Abdalla Elradi" className={`sig-mark h-10 w-36 ${strong}`} />
        <button
          onClick={onToggleTheme}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          className={`w-11 h-11 rounded-full inline-flex items-center justify-center ${themeClasses.accentButton}`}
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {/* Identity */}
        <Tile index={++i} ready={ready} span label="About Abdalla" onClick={() => open('about')} className="h-[35svh] min-h-[280px] max-h-[360px]">
          <img
            key={photoKey}
            src={photo}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-top animate-photo-settle"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />
          <Corner />
          <span className="absolute inset-x-0 bottom-0 p-5">
            <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.28em] text-emerald-400 mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Informatics Engineer
            </span>
            <span className="block text-[2.6rem] font-black uppercase tracking-tighter leading-[0.85] text-white">
              Abdalla<br /><span className="text-gray-400">Elradi</span>
            </span>
            <span className="block mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-300">
              AI · Computer Vision · Robotics
            </span>
          </span>
        </Tile>

        {/* AI systems — the flagship: the systems themselves, working, on loop.
            Caption sits below the video, never on it — the frames carry their own type. */}
        <Tile index={++i} ready={ready} span label="AI automation systems — watch the demos" onClick={() => open('systems')} className={tileGlass}>
          <span className="relative block aspect-video bg-black">
            <SystemsPreview paused={!ready || !!sheet} />
          </span>
          <span className="flex items-center gap-3 px-4 py-3.5">
            <span className="flex-1 min-w-0">
              <Eyebrow className="text-emerald-400 mb-1">AI automation systems · {SYSTEMS.length} demos</Eyebrow>
              <span className={`block text-[15px] font-black leading-tight text-balance ${strong}`}>{'WAZIR\u00a0· Instagram\u00a0· WhatsApp\u00a0· Email'}</span>
            </span>
            <span className="w-11 h-11 shrink-0 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-[0_0_24px_rgba(16,185,129,0.45)]">
              <ArrowUpRight size={18} />
            </span>
          </span>
        </Tile>

        {/* Projects — cycles through the gallery like a photo widget */}
        <Tile index={++i} ready={ready} label="Projects" onClick={() => open('projects')} className="aspect-square bg-black">
          <span className="absolute inset-0 isolate">
            {projectLayers.map(({ project: p, current, previous }) => (
              <img
                key={p.id}
                src={p.thumb ?? p.image}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${current ? 'opacity-100 z-[2]' : previous ? 'opacity-100 z-[1]' : 'opacity-0 z-0'}`}
              />
            ))}
          </span>
          <span className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <span className="absolute inset-x-0 bottom-0 p-4">
            <span className="block text-5xl font-black leading-none text-white">{PROJECTS.length}</span>
            <span className="block text-[10px] font-black uppercase tracking-[0.25em] text-white/80 mt-1.5">Projects</span>
            <span key={projectIndex} className="block text-[11px] font-semibold text-white/60 mt-1 truncate animate-photo-settle">
              {PROJECTS[projectIndex].title}
            </span>
          </span>
        </Tile>

        {/* Experience */}
        <Tile index={++i} ready={ready} label="Experience" onClick={() => open('experience')} className={`aspect-square p-4 flex flex-col ${tileGlass}`}>
          <span className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-auto">
            <Briefcase size={17} />
          </span>
          <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.22em] text-emerald-400 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Now
          </span>
          <span className={`block text-[15px] font-black leading-tight ${strong}`}>{current.title}</span>
          <span className={`block text-[11px] font-semibold mt-1 ${soft}`}>{current.company}</span>
        </Tile>

        {/* Book a call */}
        <Tile index={++i} ready={ready} span label="Book a call" onClick={() => open('book')} className="h-[76px] bg-gradient-to-r from-emerald-500 to-emerald-400 text-black">
          <span className="absolute inset-0 flex items-center gap-4 px-5">
            <span className="w-11 h-11 rounded-2xl bg-black/15 flex items-center justify-center"><CalendarDays size={20} /></span>
            <span className="flex-1">
              <span className="block text-base font-black leading-none">Book a call</span>
              <span className="block text-[11px] font-bold opacity-70 mt-1">Pick an open day</span>
            </span>
            <ArrowUpRight size={20} />
          </span>
        </Tile>

        {/* Skills */}
        <Tile index={++i} ready={ready} label="Skills" onClick={() => open('skills')} className={`h-[146px] p-4 flex flex-col ${tileGlass}`}>
          <span className="flex -space-x-2 mb-auto">
            {TILE_SKILLS.map(({ name, Icon }) => (
              <span key={name} className={`w-9 h-9 rounded-full border flex items-center justify-center ${isDarkMode ? 'bg-[#1a1a1a] border-white/15 text-gray-200' : 'bg-white border-neutral-200 text-neutral-700'}`}>
                <Icon size={15} />
              </span>
            ))}
          </span>
          <span className={`block text-3xl font-black leading-none ${strong}`}>{ALL_SKILLS.length}</span>
          <span className={`block text-[10px] font-black uppercase tracking-[0.22em] mt-1.5 ${soft}`}>Skills</span>
        </Tile>

        {/* Services */}
        <Tile index={++i} ready={ready} label="Services" onClick={() => open('services')} className={`h-[146px] p-4 flex flex-col ${tileGlass}`}>
          <span className="grid grid-cols-3 gap-1.5 w-fit mb-auto">
            {SERVICES.slice(0, 5).map(({ name, icon: Icon }) => (
              <span key={name} className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Icon size={13} />
              </span>
            ))}
          </span>
          <span className={`block text-3xl font-black leading-none ${strong}`}>{SERVICES.length}</span>
          <span className={`block text-[10px] font-black uppercase tracking-[0.22em] mt-1.5 ${soft}`}>Services</span>
        </Tile>

        {/* Certificates */}
        <Tile index={++i} ready={ready} label="Certificates" onClick={() => open('certificates')} className={`h-[146px] p-4 flex flex-col ${tileGlass}`}>
          <span className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-auto">
            <Award size={17} />
          </span>
          <span className={`block text-3xl font-black leading-none ${strong}`}>{certificateFiles.length}</span>
          <span className={`block text-[10px] font-black uppercase tracking-[0.22em] mt-1.5 ${soft}`}>Certificates</span>
        </Tile>

        {/* Ask AI */}
        <Tile index={++i} ready={ready} label="Ask my AI assistant" onClick={onOpenChat} className={`h-[146px] p-4 flex flex-col ${tileGlass}`}>
          <span style={{ '--orb-color': accentColor }} className="ai-orb relative w-11 h-11 rounded-full mb-auto">
            <span className="ai-orb-shine" aria-hidden="true" />
          </span>
          <span className={`block text-base font-black leading-tight ${strong}`}>Ask my AI</span>
          <span className={`block text-[10px] font-black uppercase tracking-[0.22em] mt-1.5 ${soft}`}>Instant answers</span>
        </Tile>

        {/* Contact — a container, not one button, so its icon links stay real links */}
        <div style={{ '--i': ++i }} className={`col-span-2 rounded-[1.75rem] p-4 ${tileGlass} ${ready ? 'tile-in' : 'opacity-0'}`}>
          <button onClick={() => open('contact')} className="flex w-full items-center justify-between mb-3 text-left">
            <span>
              <Eyebrow className="text-emerald-400 mb-1">Contact</Eyebrow>
              <span className={`block text-lg font-black leading-tight ${strong}`}>Let&apos;s work together</span>
            </span>
            <span className="w-10 h-10 rounded-full bg-emerald-500 text-black flex items-center justify-center"><ArrowUpRight size={18} /></span>
          </button>
          <div className="grid grid-cols-4 gap-2">
            {[...SOCIALS, { href: `mailto:${EMAIL}`, label: 'Email', Icon: Mail }].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                aria-label={label}
                className={`h-12 rounded-2xl flex items-center justify-center active:scale-95 transition-transform ${isDarkMode ? 'bg-white/5 text-gray-200' : 'bg-neutral-900/5 text-neutral-700'}`}
              >
                <Icon size={19} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <p className={`text-center text-[10px] font-black uppercase tracking-[0.25em] mt-8 ${soft}`}>© 2026 Abdalla Elradi</p>

      <SheetFrame
        open={!!sheet}
        title={project ? project.category.replace(/^\d+\s*—\s*/, '') : SHEET_TITLES[shownSheet] ?? ''}
        contentKey={shownSheet ?? 'none'}
        onClose={close}
        onBack={project ? back : undefined}
        isDarkMode={isDarkMode}
      >
        {renderSheet()}
      </SheetFrame>
    </div>
  );
}
