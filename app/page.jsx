"use client";
import React, { useEffect, useState } from 'react';
import { 
  Github, Linkedin, Mail, MapPin, Link as LinkIcon, Home,
  Cpu, Brain, Trophy, MessageSquare, Menu,
  ArrowUpRight, BookOpen, Sparkles, Dribbble, X, ExternalLink,
  GraduationCap,  Briefcase, Folder, Award, ChevronRight, FileText, Quote, Sun, Moon
} from 'lucide-react';
import { IntroScreen } from './components/ui/intro-screen';
import TubesCursorBackground from './components/ui/tubes-cursor-background';
import LightBackground from './components/ui/light-background';
import ChatAgent from './components/ui/chat-agent';
import AvailabilityCalendar from './components/ui/availability-calendar';
import ServicesGrid from './components/ui/services-grid';
import AutomationSystems from './components/ui/automation-systems';
import RequestModal from './components/ui/request-modal';
import ProjectsGallery from './components/ui/projects-gallery';
import SkillsIcons from './components/ui/skills-icons';

const photoSources = ['/profile.png','/p1.jpeg', '/p2.jpeg', '/p3.jpeg', '/p4.jpeg', '/p5.jpeg'];
const mindsetSources = ['/c1.jpg', '/c2.jpg', '/c3.jpg', '/c4.jpg'];
const sectionIds = {
  Home: 'home',
  Projects: 'projects',
  Automations: 'automations',
  Skills: 'skills',
  Services: 'services',
  Availability: 'availability',
  Certificates: 'certificates',
  Experience: 'experience',
  Contact: 'contact',
};

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [photoIndex, setPhotoIndex] = useState(0);
  const [mindsetIndex, setMindsetIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [request, setRequest] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sectionMarks, setSectionMarks] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [bgAccentColor, setBgAccentColor] = useState('#10b981');

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setPhotoIndex((current) => (current + 1) % photoSources.length);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const mindsetInterval = window.setInterval(() => {
      setMindsetIndex((current) => (current + 1) % mindsetSources.length);
    }, 3000);
    return () => window.clearInterval(mindsetInterval);
  }, []);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('portfolio-theme');
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('portfolio-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const sections = Object.entries(sectionIds);
    const handleScroll = () => {
      const entries = sections
        .map(([tab, id]) => {
          const el = document.getElementById(id);
          if (!el) return null;
          return { tab, top: el.getBoundingClientRect().top };
        })
        .filter(Boolean);
      if (entries.length === 0) return;
      const nearest = entries.reduce((closest, entry) => {
        return Math.abs(entry.top - 120) < Math.abs(closest.top - 120) ? entry : closest;
      }, entries[0]);
      setActiveTab(nearest.tab);

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);

      // Drives the phone hero's parallax without a React re-render per frame.
      const root = document.documentElement.style;
      root.setProperty('--hero-shift', `${Math.min(window.scrollY, 900)}px`);
      root.setProperty('--hero-progress', Math.min(window.scrollY / 520, 1).toFixed(3));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tick positions for the mobile progress rail, taken from where the sections
  // actually sit so the scale reads as the real shape of the page.
  useEffect(() => {
    const measure = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      setSectionMarks(
        Object.values(sectionIds)
          .map((id) => document.getElementById(id))
          .filter(Boolean)
          .map((el) => ((el.getBoundingClientRect().top + window.scrollY) / scrollable) * 100)
          .filter((pct) => pct > 0 && pct < 100)
      );
    };
    const timer = window.setTimeout(measure, 600);
    window.addEventListener('resize', measure);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', measure);
    };
  }, []);

  // Phones get no hover, so motion is what keeps the page feeling responsive.
  useEffect(() => {
    document.documentElement.classList.add('reveal-armed');
    const targets = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // The background tubes follow the pointer via body `pointermove`, which the
  // browser stops sending once a touch turns into a scroll. Re-issue it from
  // touchmove so the background tracks the thumb on phones the way it tracks
  // the cursor on desktop.
  useEffect(() => {
    if (typeof PointerEvent === 'undefined' || !window.matchMedia('(hover: none)').matches) return undefined;
    const forward = (event) => {
      const touch = event.touches[0];
      if (!touch) return;
      document.body.dispatchEvent(
        new PointerEvent('pointermove', { clientX: touch.clientX, clientY: touch.clientY, pointerType: 'touch' })
      );
    };
    window.addEventListener('touchstart', forward, { passive: true });
    window.addEventListener('touchmove', forward, { passive: true });
    return () => {
      window.removeEventListener('touchstart', forward);
      window.removeEventListener('touchmove', forward);
    };
  }, []);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setMobileNavOpen(false);
    const target = document.getElementById(sectionIds[tab]);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };


  const experiences = [
    {
      title: 'AI Automation Engineer',
      company: 'Glam Moda WLL',
      period: 'Apr 2026 - Present',
      highlights: [
        'AI-driven workflow automation',
        'Process optimization',
        'Systems integration',
      ],
    },
    {
      title: 'IT Technical Support & Web Developer',
      company: 'Glam Moda',
      period: 'Oct 2024 - Jan 2026',
      highlights: [
        'Shopify specialization',
        'System optimization',
        'Digital Marketing',
      ],
    },
    {
      title: 'President & Founder – IoT Club',
      company: 'University of Technology Bahrain',
      period: '2023 - Present (3 Years)',
      highlights: [
        'Led 150+ active members',
        'Organized quarterly innovation challenges',
        'Award-winning projects',
      ],
    },
    {
      title: 'Robotics & IoT Workshop Instructor',
      company: 'University of Technology Bahrain',
      period: '2023 - Present (3 Years)',
      highlights: [
        'Led workshops',
        'Robot Competition',
        'Mentored 40+ students',
      ],
    },
  ];

  const certificateFiles = [
    { title: 'Hardware and Upgrade Support', file: 'Hardware and Upgrade Support.pdf', type: 'pdf' },
    { title: 'Getting Started with Cisco Packet Tracer', file: 'Getting Started with Cisco Packet Tracer.pdf', type: 'pdf' },
    { title: 'Networking', file: 'Networking.pdf', type: 'pdf' },
    { title: 'IP Network Foundamental', file: 'IP Network Foundamental.pdf', type: 'pdf' },
    { title: '1 MILLION PROMPTERS', file: '1 MILLION PROMPTERS.pdf', type: 'pdf' },
    { title: 'First Aid Training', file: 'First Aid Training.pdf', type: 'pdf' },
    { title: 'Gemini Certified University Student', file: 'Gemini Certified University Student.pdf', type: 'pdf' },
    { title: 'Google Ads Creative Certification', file: 'Google Ads Creative Certification.pdf', type: 'pdf' },
    { title: 'Gulf Cx Internship Certificate', file: 'Gulf Cx , internership certifcate .pdf', type: 'pdf' },
    { title: 'Huawei ICT Competition', file: 'Huawei ICT Competition.pdf', type: 'pdf' },
    { title: 'Internet Of Things Certificate', file: 'Internet Of Things Certificate.pdf', type: 'pdf' },
    { title: 'Intro to Modern AI Certificate', file: 'Intro to Modern AI Certificate.pdf', type: 'pdf' },
    { title: 'Introduction to Cybersecurity Awareness', file: 'Introduction to Cybersecurity Awareness.pdf', type: 'pdf' },
    { title: 'Microsoft Certificate', file: 'Microsoft Certificate.pdf', type: 'pdf' },
    { title: 'Professional Networking for Career Growth', file: 'Professional Networking for Career Growth.pdf', type: 'pdf' },
    { title: 'Python Essentials', file: 'PythonEssentials1.pdf', type: 'pdf' },
    { title: 'Altaawon Secondary School', file: 'Altaawon Secondary School.pdf', type: 'pdf' },
    { title: 'RAS WORKSHOP', file: 'RAS WORKSHOP.pdf', type: 'pdf' },
  ];

  const getCertificateBadgePath = (certificate) => {
    const badgeName = `${certificate.title}.png`;
    return `/certificates/${encodeURIComponent(badgeName)}`;
  };

  const themeClasses = {
    root: isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-neutral-50 text-neutral-900',
    nav: isDarkMode ? 'bg-[#121212]/70 backdrop-blur-xl border border-white/5 text-white' : 'bg-white/70 backdrop-blur-xl border border-neutral-200/70 text-neutral-900',
    card: isDarkMode ? 'bg-[#111111]/60 backdrop-blur-xl border border-white/10 text-white' : 'bg-white/70 backdrop-blur-xl border border-neutral-200/70 text-neutral-900',
    panel: isDarkMode ? 'bg-[#161616]/60 backdrop-blur-xl border border-white/5 text-white' : 'bg-white/50 backdrop-blur-xl border border-neutral-200/70 text-neutral-900',
    accentText: isDarkMode ? 'text-emerald-400' : 'text-emerald-600',
    mutedText: isDarkMode ? 'text-gray-400' : 'text-neutral-600',
    subCard: isDarkMode ? 'bg-[#1c1c1c]/60 backdrop-blur-md border border-white/10' : 'bg-neutral-100/70 backdrop-blur-md border border-neutral-300/70',
    navButtonText: isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-neutral-500 hover:text-neutral-700',
    accentButton: isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-neutral-900/10 hover:bg-neutral-800/10 text-neutral-900',
  };


  return (
    <>
      {showIntro && <IntroScreen onFinish={() => setShowIntro(false)} />}
      <div className={`min-h-screen pb-24 md:pb-0 ${themeClasses.root} font-sans selection:bg-emerald-500/30 overflow-x-hidden`}>
      {/* BACKGROUND */}
      {isDarkMode ? <TubesCursorBackground onColorChange={setBgAccentColor} /> : <LightBackground />}

      {/* FLOATING NAV — desktop */}
      <nav className={`hidden md:flex fixed top-8 left-1/2 -translate-x-1/2 z-50 items-center gap-2 p-1.5 backdrop-blur-2xl rounded-full shadow-2xl ${themeClasses.nav}`}>
        {['Home', 'Projects', 'Automations', 'Skills', 'Services', 'Availability', 'Certificates', 'Experience', 'Contact'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleNavClick(tab)}
            className={`px-5 lg:px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition-all whitespace-nowrap ${
              activeTab === tab
                ? isDarkMode
                  ? 'bg-white/10 text-white shadow-inner'
                  : 'bg-neutral-900/10 text-neutral-900 shadow-inner'
                : themeClasses.navButtonText
            }`}
          >
            {tab}
          </button>
        ))}
        <button
          onClick={() => setIsDarkMode((current) => !current)}
          className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition ${themeClasses.accentButton}`}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      {/* MOBILE NAV */}
      <nav className={`md:hidden fixed top-4 left-4 right-4 z-50 rounded-2xl shadow-2xl ${themeClasses.nav}`}>
        <div className="flex items-center justify-between px-4 py-3">
          <span className={`text-xs font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>AE</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDarkMode((current) => !current)}
              className={`inline-flex items-center justify-center rounded-full w-11 h-11 transition ${themeClasses.accentButton}`}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button
              onClick={() => setMobileNavOpen((v) => !v)}
              className={`inline-flex items-center justify-center rounded-full w-11 h-11 transition ${themeClasses.accentButton}`}
              aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileNavOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
        {mobileNavOpen && (
          <div className={`px-3 pb-3 flex flex-col gap-1 border-t ${isDarkMode ? 'border-white/10' : 'border-neutral-200'}`}>
            {['Home', 'Projects', 'Automations', 'Skills', 'Services', 'Availability', 'Certificates', 'Experience', 'Contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleNavClick(tab)}
                className={`text-left px-4 py-3.5 mt-1 text-xs font-black uppercase tracking-[0.15em] rounded-xl transition-all ${
                  activeTab === tab ? 'bg-emerald-500/15 text-emerald-400' : themeClasses.navButtonText
                }`}
              >
                {tab}
              </button>
            ))}
            <div className={`mt-3 pt-3 flex items-center justify-center gap-2 border-t ${isDarkMode ? 'border-white/10' : 'border-neutral-200'}`}>
              {[
                { href: 'https://github.com/a-elradi', label: 'GitHub profile', Icon: Github },
                { href: 'https://www.linkedin.com/in/abdalla-elsiddig/', label: 'LinkedIn profile', Icon: Linkedin },
                { href: 'https://linktr.ee/Abdallaelsiddig', label: 'Linktree', Icon: LinkIcon },
                { href: 'mailto:Abdallaelsiddig.m@gmail.com', label: 'Send email', Icon: Mail },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl transition ${isDarkMode ? 'text-gray-300 hover:text-white bg-white/5 hover:bg-white/10' : 'text-neutral-700 hover:text-neutral-900 bg-neutral-900/5 hover:bg-neutral-900/10'}`}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* BOTTOM TAB BAR — phone only. Thumb-reach navigation with the AI orb as the centre action. */}
      <nav aria-label="Primary" className={`md:hidden fixed bottom-3 left-3 right-3 z-50 rounded-[1.75rem] shadow-2xl ${themeClasses.nav}`}>
        <div className="grid grid-cols-5 items-end px-1 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]">
          {[
            { tab: 'Home', label: 'Home', Icon: Home },
            { tab: 'Projects', label: 'Projects', Icon: Folder },
            null,
            { tab: 'Automations', label: 'Systems', Icon: Cpu },
            { tab: 'Contact', label: 'Contact', Icon: Mail },
          ].map((item) =>
            item ? (
              <button
                key={item.tab}
                onClick={() => {
                  setChatOpen(false);
                  handleNavClick(item.tab);
                }}
                className={`flex flex-col items-center justify-center gap-1 h-14 rounded-2xl text-[9px] font-black uppercase tracking-[0.18em] transition ${activeTab === item.tab ? 'text-emerald-400' : themeClasses.navButtonText}`}
              >
                <item.Icon size={19} strokeWidth={activeTab === item.tab ? 2.4 : 1.8} />
                {item.label}
              </button>
            ) : (
              <div key="chat" className="flex items-end justify-center">
                <button
                  onClick={() => setChatOpen((v) => !v)}
                  aria-label={chatOpen ? 'Close chat assistant' : 'Open chat assistant'}
                  style={{ '--orb-color': isDarkMode ? bgAccentColor : '#10b981' }}
                  className={`ai-orb relative -mt-7 inline-flex items-center justify-center w-16 h-16 rounded-full text-white ring-4 transition-transform active:scale-95 ${isDarkMode ? 'ring-[#0a0a0a]' : 'ring-neutral-50'}`}
                >
                  <span className="ai-orb-shine" aria-hidden="true" />
                  {chatOpen ? <X size={22} className="relative z-10" /> : <Sparkles size={22} className="relative z-10" />}
                </button>
              </div>
            )
          )}
        </div>
      </nav>

      {/* SOCIAL RAIL — desktop only; on phones these live in the mobile menu instead, where they can't cover content */}
      <div className={`hidden md:flex fixed top-1/2 -translate-y-1/2 left-4 sm:left-6 z-50 flex-col items-center gap-2 p-2 backdrop-blur-2xl rounded-full shadow-2xl border ${isDarkMode ? 'border-emerald-500/20' : 'border-emerald-600/20'} ${themeClasses.nav}`}>
        <a
          href="https://github.com/a-elradi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          className={`inline-flex items-center justify-center w-11 h-11 rounded-full transition ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-900/10'}`}
        >
          <Github size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/abdalla-elsiddig/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          className={`inline-flex items-center justify-center w-11 h-11 rounded-full transition ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-900/10'}`}
        >
          <Linkedin size={20} />
        </a>
        <a
          href="https://linktr.ee/Abdallaelsiddig"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Linktree"
          className={`inline-flex items-center justify-center w-11 h-11 rounded-full transition ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-900/10'}`}
        >
          <LinkIcon size={20} />
        </a>
        <a
          href="mailto:Abdallaelsiddig.m@gmail.com"
          aria-label="Send email"
          className={`inline-flex items-center justify-center w-11 h-11 rounded-full transition ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-900/10'}`}
        >
          <Mail size={20} />
        </a>
      </div>

      {/* SCROLL RAIL — phone only. Ticks sit at the real section offsets, so the
          scale shows the shape of the page, not just how far you've come. */}
      <div aria-hidden="true" className="md:hidden fixed left-0 top-0 bottom-[5.5rem] w-[3px] z-40 pointer-events-none">
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-white/[0.07]' : 'bg-neutral-900/[0.07]'}`} />
        {sectionMarks.map((pct) => (
          <div
            key={pct}
            style={{ top: `${pct}%` }}
            className={`absolute left-0 w-full h-px ${isDarkMode ? 'bg-white/25' : 'bg-neutral-900/25'}`}
          />
        ))}
        <div
          style={{ height: `${scrollProgress}%` }}
          className="absolute left-0 top-0 w-full bg-gradient-to-b from-emerald-300 via-emerald-400 to-emerald-600 shadow-[0_0_12px_rgba(16,185,129,0.8)]"
        />
      </div>

      <main id="home" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 md:pt-32 pb-12 sm:pb-20">

        {/* MOBILE HERO — one full-bleed portrait instead of a name card stacked on a
            photo card. Desktop keeps its bento; this block is phone-only. */}
        <section className="md:hidden -mx-4 -mt-24 mb-12 relative h-[86svh] min-h-[540px] overflow-hidden">
          <img
            key={photoIndex}
            src={photoSources[photoIndex]}
            alt={`Abdalla Elradi, portrait ${photoIndex + 1}`}
            style={{ transform: 'translate3d(0, calc(var(--hero-shift, 0px) * 0.38), 0) scale(calc(1 + var(--hero-progress, 0) * 0.1))' }}
            className="absolute inset-0 w-full h-full object-cover object-top animate-photo-settle will-change-transform"
          />
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/45 to-[#0a0a0a]/60' : 'bg-gradient-to-t from-neutral-50 via-neutral-50/40 to-neutral-50/50'}`} />

          <div
            style={{ opacity: 'calc(1 - var(--hero-progress, 0) * 1.25)', transform: 'translate3d(0, calc(var(--hero-shift, 0px) * 0.18), 0)' }}
            className="absolute inset-x-0 bottom-0 px-5 pb-9 will-change-transform"
          >
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-black mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Informatics Engineer
            </span>
            <h1 className={`text-[3.25rem] font-black uppercase tracking-tighter leading-[0.85] ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
              Abdalla<br />
              <span className="text-gray-400">Elradi</span>
            </h1>
            <div className={`mt-5 h-px w-full bg-gradient-to-r from-emerald-500 ${isDarkMode ? 'via-white/15' : 'via-neutral-900/15'} to-transparent`} />
            <div className="mt-3 flex items-end justify-between gap-4">
              <p className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`}>
                AI · Computer Vision · Robotics
              </p>
              <p className={`text-[9px] font-semibold tracking-[0.18em] whitespace-nowrap ${isDarkMode ? 'text-gray-500' : 'text-neutral-500'}`}>
                26.2235°N 50.5876°E
              </p>
            </div>
          </div>
        </section>

        {/* HERO GRID */}
        <section className="grid grid-cols-2 md:grid-cols-12 gap-4 sm:gap-5 mb-14 sm:mb-24 items-start">

          {/* NAME CARD */}
          <div className={`hidden md:flex md:col-span-4 md:col-start-1 md:row-span-1 min-h-[170px] rounded-[2rem] p-6 sm:p-8 flex-col justify-between relative overflow-hidden shadow-[0_10px_45px_rgba(0,_0,_0,_0.35)] ${themeClasses.card}`}>
            <span aria-hidden="true" className={`pointer-events-none select-none absolute -right-4 -bottom-12 text-[9rem] font-black leading-none ${isDarkMode ? 'text-white/[0.04]' : 'text-neutral-900/[0.04]'}`}>
              AE
            </span>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-black mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Informatics Engineer
              </span>
              <h1 className={`text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.95] ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                ABDALLA<br />
                <span className="text-gray-400">ELRADI</span>
              </h1>
            </div>
            <div className={`relative z-10 mt-8 h-px w-full bg-gradient-to-r from-emerald-500/70 ${isDarkMode ? 'via-white/10' : 'via-neutral-900/10'} to-transparent`} />
          </div>

          {/* MAIN PHOTO — desktop only; the phone hero above already leads with it */}
          <div className={`hidden md:block md:col-span-4 md:col-start-5 md:row-span-1 h-[320px] md:h-[550px] rounded-[2.5rem] overflow-hidden shadow-[0_10px_50px_rgba(0,_0,_0,_0.3)] relative ${themeClasses.panel}`}>
            <img
              src={photoSources[photoIndex]}
              className="w-full h-full object-cover"
              alt={`Profile image ${photoIndex + 1}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>

          {/* CRAFT */}
          <div className={`col-span-2 reveal md:col-span-4 md:col-start-9 md:row-span-1 md:min-h-[550px] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 flex flex-col justify-between shadow-[0_10px_35px_rgba(0,_0,_0,_0.3)] ${themeClasses.card}`}>
            <div>
              <h3 className={`text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                <Cpu size={22} className="text-emerald-400" /> CRAFT
              </h3>
              <p className={`${themeClasses.mutedText} text-sm leading-relaxed mb-8`}>
                Demonstrated expertise in <span className={`${isDarkMode ? 'text-white' : 'text-neutral-900'} font-medium`}>artificial intelligence, computer vision, IoT, and robotics</span>, with <span className={`${isDarkMode ? 'text-white' : 'text-neutral-900'} font-medium`}>1.5+ years of professional experience</span> building innovative systems.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {['AI', 'Python', 'OpenCV', 'Automation'].map((t) => (
                <span key={t} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase ${isDarkMode ? 'bg-white/5 border border-white/10 text-gray-300' : 'bg-neutral-100 border border-neutral-200 text-neutral-700'}`}>{t}</span>
              ))}
            </div>
          </div>

          {/* MINDSET */}
          <div className={`col-span-2 reveal md:col-span-4 md:row-start-2 md:row-span-1 md:-mt-[300px] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 flex flex-col justify-between gap-6 shadow-[0_0_35px_rgba(255,_255,_255,_0.06)] ${themeClasses.card}`}>
            <div>
              <h3 className={`text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                <Dribbble size={22} className="text-emerald-400" /> MINDSET
              </h3>
              <p className={`${themeClasses.mutedText} text-sm leading-relaxed`}>
                Excellence is a habit. <span className={`${isDarkMode ? 'text-white' : 'text-neutral-900'} font-medium italic`}>Basketball</span> taught me discipline, focus, and leadership — qualities I apply to every engineering challenge.
              </p>
            </div>
            <div className={`rounded-[2rem] overflow-hidden shadow-inner ${themeClasses.subCard}`}>
              <img
                src={mindsetSources[mindsetIndex]}
                alt={`Mindset image ${mindsetIndex + 1}`}
                loading="lazy"
                className="w-full h-[220px] sm:h-[360px] object-cover"
              />
            </div>
          </div>

          {/* QUOTE */}
          <div className={`col-span-1 reveal md:col-span-4 md:col-start-5 md:row-span-1 min-h-[150px] md:min-h-[170px] rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-10 flex flex-col justify-center shadow-[0_0_35px_rgba(255,_255,_255,_0.06)] ${themeClasses.card}`}>
            <div className="mb-3 sm:mb-4 inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-500/10 text-emerald-400">
              <Quote size={22} className="sm:hidden" /><Quote size={28} className="hidden sm:block" />
            </div>
            <p className={`${isDarkMode ? 'text-white' : 'text-neutral-900'} text-base md:text-2xl font-black leading-tight`}>
              “Build with purpose. Lead with vision.”
            </p>
          </div>

          {/* LOCATION */}
          <div className={`col-span-1 reveal md:col-span-4 md:col-start-9 md:row-start-2 min-h-[150px] md:min-h-[160px] rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-[0_0_35px_rgba(255,_255,_255,_0.05)] ${themeClasses.card}`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full -mr-10 -mt-10"></div>
            <img src="/manama.jpg" alt="Manama" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-15" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
                <MapPin className="text-emerald-400 shrink-0" size={18} />
                <span className={`text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.35em] ${themeClasses.mutedText}`}>Location</span>
              </div>
              <h3 className={`text-lg md:text-3xl font-black uppercase tracking-tight mb-2 md:mb-3 leading-[1.05] ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Manama, Bahrain</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-neutral-600'} text-[9px] md:text-[13px] uppercase font-semibold tracking-[0.15em] md:tracking-[0.25em]`}>
                26.2235°N, 50.5876°E
              </p>
            </div>
          </div>
        </section>
        {/* PROJECTS SECTION */}
        <section id="projects" className="mb-16 sm:mb-24 lg:mb-32">
          <div className="reveal text-center mb-8 sm:mb-16">
            <p className={`text-[10px] font-black uppercase tracking-[0.5em] ${themeClasses.mutedText}`}>PORTFOLIO</p>
            <h2 className="text-[2.6rem] leading-[0.95] sm:text-4xl md:text-5xl font-black mt-3 sm:mt-4">Featured <span className="text-emerald-500">projects</span></h2>
          </div>

          <div className="reveal"><ProjectsGallery isDarkMode={isDarkMode} themeClasses={themeClasses} /></div>
        </section>

        {/* AUTOMATION SYSTEMS SECTION */}
        <section id="automations" className="mb-16 sm:mb-24 lg:mb-32">
          <div className="reveal text-center mb-8 sm:mb-16">
            <p className={`text-[10px] font-black uppercase tracking-[0.5em] ${themeClasses.mutedText}`}>ENTERPRISE AI SYSTEMS</p>
            <h2 className="text-[2.6rem] leading-[0.95] sm:text-4xl md:text-5xl font-black mt-3 sm:mt-4">AI automation <span className="text-emerald-500">systems</span></h2>
            <p className={`${themeClasses.mutedText} max-w-2xl mx-auto mt-6 leading-relaxed`}>
              Production AI agent systems built for real business operations — customer support automation across Instagram, WhatsApp, and email, plus a governance layer that supervises them all.
            </p>
          </div>

          <div className="reveal"><AutomationSystems isDarkMode={isDarkMode} themeClasses={themeClasses} /></div>
        </section>

      {/* Skills Section */}
      <section id="skills" className="py-9 sm:py-20 px-4 sm:px-6">
        <div className={`reveal max-w-7xl mx-auto rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-10 ${themeClasses.panel}`}>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black mb-8 md:mb-12 uppercase tracking-wide ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Technical Skills</h2>
          <SkillsIcons isDarkMode={isDarkMode} themeClasses={themeClasses} />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-9 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-8 sm:mb-16">
            <p className={`text-[10px] font-black uppercase tracking-[0.5em] ${themeClasses.mutedText}`}>WHAT I OFFER</p>
            <h2 className={`text-[2.6rem] leading-[0.95] sm:text-4xl md:text-5xl font-black mt-3 sm:mt-4 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Services</h2>
          </div>
          <ServicesGrid
            isDarkMode={isDarkMode}
            themeClasses={themeClasses}
            onRequestService={(serviceName) => setRequest({ type: 'service', serviceName })}
          />
        </div>
      </section>

      {/* Availability Section */}
      <section id="availability" className="py-9 sm:py-20 px-4 sm:px-6">
        <div className={`reveal max-w-7xl mx-auto rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-10 ${themeClasses.panel}`}>
          <div className="mb-8">
            <p className={`text-[10px] font-black uppercase tracking-[0.5em] ${themeClasses.mutedText}`}>SCHEDULE</p>
            <h2 className={`text-4xl font-black mt-4 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Availability</h2>
          </div>
          <AvailabilityCalendar
            isDarkMode={isDarkMode}
            themeClasses={themeClasses}
            onRequestDate={(date) => setRequest({ type: 'booking', date })}
          />
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-9 sm:py-20 px-4 sm:px-6">
        <div className={`reveal max-w-7xl mx-auto rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-10 ${themeClasses.panel}`}>
          <div className="text-center mb-7 sm:mb-12">
            <p className={`text-[10px] font-black uppercase tracking-[0.5em] ${themeClasses.mutedText}`}>CREDENTIALS</p>
            <h2 className={`text-[2.6rem] leading-[0.95] sm:text-4xl md:text-5xl font-black mt-3 sm:mt-4 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Certificates</h2>
          </div>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-700'} text-center max-w-3xl mx-auto mb-10`}>
            These certifications show my learning progress in AI, robotics, web development, and systems engineering. I keep the verified files in <span className={`${isDarkMode ? 'text-white' : 'text-neutral-900'} font-semibold`}>/public/certificates</span>.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {certificateFiles.map((certificate, index) => (
              <div
                key={certificate.file}
                className={`overflow-hidden rounded-2xl sm:rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.25)] ${themeClasses.card} ${!showAllCertificates && index >= 6 ? 'hidden sm:block' : ''}`}
              >
                {certificate.type === 'image' ? (
                  <img src={`/certificates/${certificate.file}`} alt={certificate.title} loading="lazy" className="h-28 sm:h-64 w-full object-cover" />
                ) : (
                  <div className="flex h-28 sm:h-64 w-full items-center justify-center bg-gradient-to-br from-neutral-900 via-[#06070d] to-neutral-800 p-3 sm:p-6">
                    <img
                      src={getCertificateBadgePath(certificate)}
                      alt={`${certificate.title} badge`}
                      loading="lazy"
                      className="max-h-20 sm:max-h-36 max-w-full object-contain"
                      onError={(event) => {
                        const target = event.currentTarget;
                        target.onerror = null;
                        target.src = getCertificateBadgePath(certificate).replace(/\.png$/i, '.jpg');
                      }}
                    />
                  </div>
                )}
                <div className="p-3 sm:p-5">
                  <p className={`text-xs sm:text-sm font-semibold leading-snug ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{certificate.title}</p>
                  <p className={`hidden sm:block ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'} text-xs mt-2`}>
                    {certificate.type === 'pdf'
                      ? 'Click to open or download the certificate.'
                      : 'Image preview of the certificate.'}
                  </p>
                  <a
                    href={`/certificates/${certificate.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 sm:mt-4 inline-flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-emerald-400 hover:text-emerald-300"
                  >
                    View
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
          {!showAllCertificates && (
            <button
              onClick={() => setShowAllCertificates(true)}
              className={`sm:hidden mt-6 w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition ${themeClasses.accentButton}`}
            >
              Show all {certificateFiles.length} certificates
            </button>
          )}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-9 sm:py-20 px-4 sm:px-6">
        <div className={`reveal max-w-7xl mx-auto rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-10 ${themeClasses.panel}`}>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black mb-8 md:mb-12 uppercase tracking-wide ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Professional Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className={`rounded-[2rem] p-6 ${themeClasses.card}`}>
                <h3 className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{exp.title}</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-neutral-600'} mb-4 text-sm uppercase tracking-wider`}>{exp.company} • {exp.period}</p>
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, hidx) => (
                    <li key={hidx} className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-700'} text-sm flex items-start gap-2`}>
                      <ChevronRight size={14} className="mt-1 text-emerald-500 min-w-[14px]" /> {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-9 sm:py-20 px-4 sm:px-6">
        <div className={`reveal max-w-7xl mx-auto rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-10 text-center ${themeClasses.panel}`}>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Let&apos;s Work Together</h2>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-700'} mb-8 text-lg max-w-2xl mx-auto`}>Open to exciting opportunities in AI, computer vision, robotics, and education community collaborations. Let&apos;s build the future together.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:Abdallaelsiddig.m@gmail.com" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Mail size={20} /> Get In Touch
            </a>
            <a
              href="/Abdalla-Elsiddig.Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white px-10 py-3 rounded-xl font-bold transition-all flex items-center gap-2 border border-white/10 shadow-lg shadow-white/10"
            >
              <ExternalLink size={20} /> Review Resume
            </a>
            <a
              href="/Abdalla-Elsiddig.Resume.pdf"
              download
              className="bg-neutral-800 hover:bg-neutral-700 text-white px-10 py-3 rounded-xl font-bold transition-all flex items-center gap-2 border border-emerald-500/20 shadow-lg shadow-emerald-500/20"
            >
              <FileText size={20} /> Download Resume
            </a>
          </div>
          <div className={`mt-16 pt-8 border-t ${isDarkMode ? 'border-white/5 text-gray-500' : 'border-neutral-200 text-neutral-500'} text-xs tracking-widest uppercase`}>
            <p className="mb-2 tracking-normal text-sm lowercase"> Abdallaelsiddig.m@gmail.com</p>
            <p>© 2026 Abdalla Elradi.</p>
          </div>
        </div>
      </section>
    </main>

      {/* FOOTER */}
      <footer className={`relative z-10 border-t py-16 px-6 text-center ${isDarkMode ? 'border-white/5 bg-[#0a0a0a]' : 'border-neutral-200 bg-neutral-50'}`}>
        <div className={`${isDarkMode ? 'text-gray-500' : 'text-neutral-500'} text-xs font-black uppercase tracking-[0.2em]`}>
            © 2026 Abdalla Elradi
        </div>
      </footer>

      <ChatAgent
        isDarkMode={isDarkMode}
        themeClasses={themeClasses}
        onNavigate={scrollToSection}
        accentColor={isDarkMode ? bgAccentColor : '#10b981'}
        open={chatOpen}
        onToggle={() => setChatOpen((v) => !v)}
      />
      <RequestModal
        request={request}
        onClose={() => setRequest(null)}
        isDarkMode={isDarkMode}
        themeClasses={themeClasses}
      />
      </div>
    </>
  );
};

export default Portfolio;
