"use client";
import React, { useEffect, useState } from 'react';
import { 
  Github, Linkedin, Mail, MapPin, Link as LinkIcon,
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
import RequestModal from './components/ui/request-modal';
import ProjectsGallery from './components/ui/projects-gallery';
import SkillsIcons from './components/ui/skills-icons';

const photoSources = ['/profile.png','/p1.jpeg', '/p2.jpeg', '/p3.jpeg', '/p4.jpeg', '/p5.jpeg'];
const mindsetSources = ['/c1.jpg', '/c2.jpg', '/c3.jpg', '/c4.jpg'];
const sectionIds = {
  Home: 'home',
  Projects: 'projects',
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
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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
      <div className={`min-h-screen ${themeClasses.root} font-sans selection:bg-emerald-500/30 overflow-x-hidden`}>
      {/* BACKGROUND */}
      {isDarkMode ? <TubesCursorBackground onColorChange={setBgAccentColor} /> : <LightBackground />}

      {/* FLOATING NAV — desktop */}
      <nav className={`hidden md:flex fixed top-8 left-1/2 -translate-x-1/2 z-50 items-center gap-2 p-1.5 backdrop-blur-2xl rounded-full shadow-2xl ${themeClasses.nav}`}>
        {['Home', 'Projects', 'Skills', 'Services', 'Availability', 'Certificates', 'Experience', 'Contact'].map((tab) => (
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
              className={`inline-flex items-center justify-center rounded-full w-9 h-9 transition ${themeClasses.accentButton}`}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button
              onClick={() => setMobileNavOpen((v) => !v)}
              className={`inline-flex items-center justify-center rounded-full w-9 h-9 transition ${themeClasses.accentButton}`}
              aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileNavOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
        {mobileNavOpen && (
          <div className={`px-3 pb-3 flex flex-col gap-1 border-t ${isDarkMode ? 'border-white/10' : 'border-neutral-200'}`}>
            {['Home', 'Projects', 'Skills', 'Services', 'Availability', 'Certificates', 'Experience', 'Contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleNavClick(tab)}
                className={`text-left px-4 py-2.5 mt-1 text-xs font-black uppercase tracking-[0.15em] rounded-xl transition-all ${
                  activeTab === tab ? 'bg-emerald-500/15 text-emerald-400' : themeClasses.navButtonText
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* SOCIAL RAIL — fixed, visible on every screen regardless of scroll */}
      <div className={`fixed bottom-6 left-4 sm:left-6 z-50 flex flex-col items-center gap-1 p-1.5 backdrop-blur-2xl rounded-full shadow-2xl ${themeClasses.nav}`}>
        <a
          href="https://github.com/a-elradi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          className={`inline-flex items-center justify-center w-9 h-9 rounded-full transition ${themeClasses.navButtonText}`}
        >
          <Github size={16} />
        </a>
        <a
          href="https://www.linkedin.com/in/abdalla-elsiddig/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          className={`inline-flex items-center justify-center w-9 h-9 rounded-full transition ${themeClasses.navButtonText}`}
        >
          <Linkedin size={16} />
        </a>
        <a
          href="https://linktr.ee/Abdallaelsiddig"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Linktree"
          className={`inline-flex items-center justify-center w-9 h-9 rounded-full transition ${themeClasses.navButtonText}`}
        >
          <LinkIcon size={16} />
        </a>
        <a
          href="mailto:Abdallaelsiddig.m@gmail.com"
          aria-label="Send email"
          className={`inline-flex items-center justify-center w-9 h-9 rounded-full transition ${themeClasses.navButtonText}`}
        >
          <Mail size={16} />
        </a>
      </div>

      <main id="home" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 md:pt-32 pb-20">
        
        {/* HERO GRID */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-24 items-start">
          
          {/* NAME CARD */}
          <div className={`md:col-span-4 md:col-start-1 md:row-span-1 min-h-[170px] rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-[0_10px_45px_rgba(0,_0,_0,_0.35)] ${themeClasses.card}`}>
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

          {/* MAIN PHOTO */}
          <div className={`md:col-span-4 md:col-start-5 md:row-span-1 h-[320px] md:h-[550px] rounded-[2.5rem] overflow-hidden shadow-[0_10px_50px_rgba(0,_0,_0,_0.3)] relative ${themeClasses.panel}`}>
            <img
              src={photoSources[photoIndex]}
              className="w-full h-full object-cover"
              alt={`Profile image ${photoIndex + 1}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>

          {/* CRAFT */}
          <div className={`md:col-span-4 md:col-start-9 md:row-span-1 md:min-h-[550px] rounded-[2.5rem] p-6 sm:p-10 flex flex-col justify-between shadow-[0_10px_35px_rgba(0,_0,_0,_0.3)] ${themeClasses.card}`}>
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
          <div className={`md:col-span-4 md:row-start-2 md:row-span-1 md:-mt-[300px] rounded-[2.5rem] p-6 sm:p-10 flex flex-col justify-between gap-6 shadow-[0_0_35px_rgba(255,_255,_255,_0.06)] ${themeClasses.card}`}>
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
          <div className={`md:col-span-4 md:col-start-5 md:row-span-1 min-h-[170px] rounded-[2.5rem] p-6 sm:p-10 flex flex-col justify-center shadow-[0_0_35px_rgba(255,_255,_255,_0.06)] ${themeClasses.card}`}>
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400">
              <Quote size={28} />
            </div>
            <p className={`${isDarkMode ? 'text-white' : 'text-neutral-900'} text-xl md:text-2xl font-black leading-tight`}>
              “Build with purpose. Lead with vision.”
            </p>
          </div>

          {/* LOCATION */}
          <div className={`md:col-span-4 md:col-start-9 md:row-start-2 min-h-[160px] rounded-[2.5rem] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-[0_0_35px_rgba(255,_255,_255,_0.05)] ${themeClasses.card}`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full -mr-10 -mt-10"></div>
            <img src="/manama.jpg" alt="Manama" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-15" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="text-emerald-400" size={22} />
                <span className={`text-[10px] uppercase tracking-[0.35em] ${themeClasses.mutedText}`}>Location</span>
              </div>
              <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tight mb-3 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Manama, Bahrain</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-neutral-600'} text-[12px] md:text-[13px] uppercase font-semibold tracking-[0.25em]`}>
                26.2235°N, 50.5876°E
              </p>
            </div>
          </div>
        </section>
        {/* PROJECTS SECTION */}
        <section id="projects" className="mb-32">
          <div className="text-center mb-16">
            <p className={`text-[10px] font-black uppercase tracking-[0.5em] ${themeClasses.mutedText}`}>PORTFOLIO</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-4">Featured <span className="text-emerald-500">projects</span></h2>
          </div>

          <ProjectsGallery isDarkMode={isDarkMode} themeClasses={themeClasses} />
        </section>

      {/* Skills Section */}
      <section id="skills" className="py-14 sm:py-20 px-4 sm:px-6">
        <div className={`max-w-7xl mx-auto rounded-[2.5rem] p-6 sm:p-10 ${themeClasses.panel}`}>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black mb-8 md:mb-12 uppercase tracking-wide ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Technical Skills</h2>
          <SkillsIcons isDarkMode={isDarkMode} themeClasses={themeClasses} />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className={`text-[10px] font-black uppercase tracking-[0.5em] ${themeClasses.mutedText}`}>WHAT I OFFER</p>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black mt-4 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Services</h2>
          </div>
          <ServicesGrid
            isDarkMode={isDarkMode}
            themeClasses={themeClasses}
            onRequestService={(serviceName) => setRequest({ type: 'service', serviceName })}
          />
        </div>
      </section>

      {/* Availability Section */}
      <section id="availability" className="py-14 sm:py-20 px-4 sm:px-6">
        <div className={`max-w-7xl mx-auto rounded-[2.5rem] p-6 sm:p-10 ${themeClasses.panel}`}>
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
      <section id="certificates" className="py-14 sm:py-20 px-4 sm:px-6">
        <div className={`max-w-7xl mx-auto rounded-[2.5rem] p-6 sm:p-10 ${themeClasses.panel}`}>
          <div className="text-center mb-12">
            <p className={`text-[10px] font-black uppercase tracking-[0.5em] ${themeClasses.mutedText}`}>CREDENTIALS</p>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black mt-4 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Certificates</h2>
          </div>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-700'} text-center max-w-3xl mx-auto mb-10`}>
            These certifications show my learning progress in AI, robotics, web development, and systems engineering. I keep the verified files in <span className={`${isDarkMode ? 'text-white' : 'text-neutral-900'} font-semibold`}>/public/certificates</span>.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificateFiles.map((certificate) => (
              <div key={certificate.file} className={`overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.25)] ${themeClasses.card}`}>
                {certificate.type === 'image' ? (
                  <img src={`/certificates/${certificate.file}`} alt={certificate.title} loading="lazy" className="h-64 w-full object-cover" />
                ) : (
                  <div className="flex h-64 w-full items-center justify-center bg-gradient-to-br from-neutral-900 via-[#06070d] to-neutral-800 p-6">
                    <img
                      src={getCertificateBadgePath(certificate)}
                      alt={`${certificate.title} badge`}
                      loading="lazy"
                      className="max-h-36 max-w-full object-contain"
                      onError={(event) => {
                        const target = event.currentTarget;
                        target.onerror = null;
                        target.src = getCertificateBadgePath(certificate).replace(/\.png$/i, '.jpg');
                      }}
                    />
                  </div>
                )}
                <div className="p-5">
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{certificate.title}</p>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-neutral-600'} text-xs mt-2`}>
                    {certificate.type === 'pdf'
                      ? 'Click to open or download the certificate.'
                      : 'Image preview of the certificate.'}
                  </p>
                  <a
                    href={`/certificates/${certificate.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 hover:text-emerald-300"
                  >
                    View Certificate
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-14 sm:py-20 px-4 sm:px-6">
        <div className={`max-w-7xl mx-auto rounded-[2.5rem] p-6 sm:p-10 ${themeClasses.panel}`}>
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
      <section id="contact" className="py-14 sm:py-20 px-4 sm:px-6">
        <div className={`max-w-7xl mx-auto rounded-[2.5rem] p-6 sm:p-10 text-center ${themeClasses.panel}`}>
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
