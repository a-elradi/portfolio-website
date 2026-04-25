"use client";
import React, { useEffect, useState } from 'react';
import { 
  Github, Linkedin, Mail, MapPin, 
  Cpu, Brain, Trophy, MessageSquare, Menu,
  ArrowUpRight, BookOpen, Sparkles, Dribbble, X, ExternalLink, 
  GraduationCap,  Briefcase, Folder, Award, ChevronRight, FileText, Quote 
} from 'lucide-react';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [photoIndex, setPhotoIndex] = useState(0);
  const [mindsetIndex, setMindsetIndex] = useState(0);

  const photoSources = ['/profile.png','/p1.jpeg', '/p2.jpeg', '/p3.jpeg', '/p4.jpeg', '/p5.jpeg'];
  const mindsetSources = ['/c1.jpg', '/c2.jpg', '/c3.jpg', '/c4.jpg'];
  const sectionIds = {
    Home: 'home',
    Projects: 'projects',
    Skills: 'skills',
    Experience: 'experience',
    Contact: 'contact',
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
    const target = document.getElementById(sectionIds[tab]);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const skills = [
    { category: 'Languages', items: ['Python', 'C++', 'JavaScript', 'SQL'] },
    { category: 'Robotics', items: ['MQTT', 'Embedded Systems Development', 'Automation'] },
    { category: 'AI & CV', items: ['OpenCV', 'TensorFlow', 'YOLO', 'MindSpore'] },
  ];

  const experiences = [
    {
      title: 'IT Technical Support & Web Developer',
      company: 'Glam Moda',
      period: '2024 - 2026',
      highlights: [
        '"Shopify specialization", "System optimization","Digital Marketing"',
      ],
    },
    {
      title: 'President & Founder – IoT Club',
      company: 'University of Technology Bahrain',
      period: '2023 - Present (3 Years)',
      highlights: [
        'Led 130+ active members", "Organized quarterly innovation challenges", "Award-winning projects',
      ],
    },
    {
      title: 'Robotics& IoT Workshop Instructor',
      company: 'University of Technology Bahrain',
      period: '2023 - Present (3 Years)',
      highlights: [
        '"Led workshops", " Robot Competition ", "Mentored 40+ students"',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#030014] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
      {/* BACKGROUND: Dot Pattern */}
      <div className="fixed inset-0 z-0 opacity-[0.15] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      {/* FLOATING NAV */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-1.5 bg-[#0a0a0f]/80 backdrop-blur-2xl border border-white/5 rounded-full shadow-2xl">
        {['Home', 'Projects', 'Skills', 'Experience', 'Contact'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleNavClick(tab)}
            className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition-all ${
              activeTab === tab ? 'bg-white/10 text-white shadow-inner' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <main id="home" className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
        
        {/* HERO GRID */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-24 items-start">
          
          {/* NAME CARD */}
          <div className="md:col-span-4 md:col-start-1 md:row-span-1 min-h-[170px] bg-[#04050b] border border-cyan-400/10 rounded-[2rem] p-8 flex flex-col justify-between shadow-[0_0_45px_rgba(56,_189,_248,_0.18)]">
            <div>
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-3 text-cyan-200 drop-shadow-[0_0_28px_rgba(56,_189,_248,_0.90)]">
                ABDALLA<br />
                <span className="text-gray-400">ELSIDDIG</span>
              </h1>
            </div>
            <div className="mt-8 flex items-center justify-center px-4 py-3 bg-[#02050c] border border-white/10 rounded-[1.75rem]">
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-cyan-200 font-black">
                <span className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse shadow-[0_0_12px_rgba(56,_189,_248,_0.6)]" />
                Informatics Engineer
              </span>
            </div>
          </div>

          {/* MAIN PHOTO */}
          <div className="md:col-span-4 md:col-start-5 md:row-span-1 h-[550px] bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-[0_0_55px_rgba(59,_130,_246,_0.12)] relative">
            <img
              src={photoSources[photoIndex]}
              className="w-full h-full object-cover"
              alt={`Profile image ${photoIndex + 1}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>

          {/* CRAFT */}
          <div className="md:col-span-4 md:col-start-9 md:row-span-1 min-h-[550px] bg-[#04050b] border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between shadow-[0_0_30px_rgba(59,_130,_246,_0.12)]">
            <div>
              <h3 className="text-2xl md:text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-3 text-cyan-300">
                <Cpu size={22} className="text-cyan-300" /> CRAFT
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Demonstrated expertise in <span className="text-white font-medium">artificial intelligence, computer vision, IoT, and robotics</span>, with <span className="text-white font-medium">1.5+ years of professional experience</span> building innovative systems.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {['AI', 'Python', 'OpenCV', 'Automation'].map((t) => (
                <span key={t} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-gray-300 uppercase">{t}</span>
              ))}
            </div>
          </div>

          {/* MINDSET */}
          <div className="md:col-span-4 md:row-start-2 md:row-span-1 md:-mt-10 h-[550px] bg-[#04050b] border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between gap-6 shadow-[0_0_35px_rgba(255,_255,_255,_0.06)]">
            <div>
              <h3 className="text-2xl md:text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-3 text-orange-400">
                <Dribbble size={22} /> MINDSET
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Excellence is a habit. <span className="text-white font-medium italic">Basketball</span> taught me discipline, focus, and leadership — qualities I apply to every engineering challenge.
              </p>
            </div>
            <div className="rounded-[2rem] overflow-hidden border border-white/10 bg-[#06070d] shadow-inner">
              <img
                src={mindsetSources[mindsetIndex]}
                alt={`Mindset image ${mindsetIndex + 1}`}
                className="w-full h-[360px] object-cover"
              />
            </div>
          </div>

          {/* QUOTE */}
          <div className="md:col-span-4 md:col-start-5md:row-span-1 min-h-[170px] bg-[#04050b] border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-center shadow-[0_0_35px_rgba(255,_255,_255,_0.06)]">
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-300">
              <Quote size={28} />
            </div>
            <p className="text-white text-xl md:text-2xl font-black leading-tight">
              “Build with purpose. Lead with vision.”
            </p>
          </div>

          {/* LOCATION */}
          <div className="md:col-span-4 md:col-start-9 md:row-start-2 min-h-[160px] bg-[#04050b] border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden shadow-[0_0_35px_rgba(255,_255,_255,_0.05)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full -mr-10 -mt-10"></div>
            <img src="/manama.png" alt="Manama" className="absolute inset-0 w-full h-full object-cover opacity-15" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="text-purple-400" size={22} />
                <span className="text-[10px] uppercase tracking-[0.35em] text-gray-500">Location</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-3">Manama, Bahrain</h3>
              <p className="text-[12px] md:text-[13px] text-gray-400 uppercase font-semibold tracking-[0.25em]">
                26.2235°N, 50.5876°E
              </p>
            </div>
          </div>
        </section>
        {/* PROJECTS SECTION */}
        <section id="projects" className="mb-32">
          <div className="text-center mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">PORTFOLIO</p>
            <h2 className="text-5xl font-black mt-4">Featured <span className="text-purple-500">projects</span></h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.35em] mb-3">01 — Robotics</p>
              <h3 className="text-4xl font-black text-white mb-6 tracking-tight">AMR Warehouse Robot</h3>
              <div className="relative bg-[#0f0f14] border-[4px] border-[#111] rounded-[2.5rem] overflow-hidden p-8 hover:scale-[1.01] transition-all duration-500">
                <p className="text-white text-lg font-medium leading-relaxed max-w-[480px] mb-8">Autonomous mobile robot with SLAM navigation, computer vision, and warehouse automation for smart logistics.</p>
                <div className="rounded-[1.5rem] overflow-hidden border border-black/30 shadow-2xl">
                  <img src="/1.png" alt="AMR Warehouse Robot" className="w-full h-[280px] object-cover" />
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-5">
                {['ROS', 'SLAM', 'PYTHON', 'OPENCV', 'YOLO'].map((tech) => (
                  <span key={tech} className="px-4 py-2 rounded-full bg-[#111118] border border-white/5 text-[11px] font-bold text-gray-400 uppercase tracking-wide">{tech}</span>
                ))}
              </div>
            </div>

            <div className="group">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.35em] mb-3">02 — AI Healthcare</p>
              <h3 className="text-4xl font-black text-white mb-6 tracking-tight">TECHTRAP</h3>
              <div className="relative bg-[#0f0f14] border-[4px] border-[#111] rounded-[2.5rem] overflow-hidden p-8 hover:scale-[1.01] transition-all duration-500">
                <p className="text-white text-lg font-medium leading-relaxed max-w-[480px] mb-8">TECHTRAP AI-Powered Rehabilitation & Educational System.</p>
                <div className="rounded-[1.5rem] overflow-hidden border border-black/30 shadow-2xl">
                  <img src="/Huawie.png" alt="TECHTRAP" className="w-full h-[280px] object-cover" />
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-5">
                {['Machine Learning', 'MindSpore', 'PYTHON', 'OPENCV', 'AI'].map((tech) => (
                  <span key={tech} className="px-4 py-2 rounded-full bg-[#111118] border border-white/5 text-[11px] font-bold text-gray-400 uppercase tracking-wide">{tech}</span>
                ))}
              </div>
            </div>

            <div className="group">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.35em] mb-3">03 — Robotics</p>
              <h3 className="text-4xl font-black text-white mb-6 tracking-tight">FireX Robot</h3>
              <div className="relative bg-[#0f0f14] border-[4px] border-[#111] rounded-[2.5rem] overflow-hidden p-8 hover:scale-[1.01] transition-all duration-500">
                <p className="text-white text-lg font-medium leading-relaxed max-w-[480px] mb-8">Advanced Firefighter Robot with AI-powered navigation and rescue capabilities.</p>
                <div className="rounded-[1.5rem] overflow-hidden border border-black/30 shadow-2xl">
                  <img src="/7.jpeg" alt="FireX Robot" className="w-full h-[280px] object-cover" />
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-5">
                {['ESP32', 'C++', 'UI Dashboard', 'MQTT', 'AI'].map((tech) => (
                  <span key={tech} className="px-4 py-2 rounded-full bg-[#111118] border border-white/5 text-[11px] font-bold text-gray-400 uppercase tracking-wide">{tech}</span>
                ))}
              </div>
            </div>

            <div className="group">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.35em] mb-3">04 — Computer Vision</p>
              <h3 className="text-4xl font-black text-white mb-6 tracking-tight"> Computer Vision Projects</h3>
              <div className="relative bg-[#0f0f14] border-[4px] border-[#111] rounded-[2.5rem] overflow-hidden p-8 hover:scale-[1.01] transition-all duration-500">
                <p className="text-white text-lg font-medium leading-relaxed max-w-[480px] mb-8">Advanced Computer Vision Projects with AI-powered image processing and analysis.</p>
                <div className="rounded-[1.5rem] overflow-hidden border border-black/30 shadow-2xl">
                  <img src="/MV.jpeg" alt="CV Projects" className="w-full h-[280px] object-cover" />
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-5">
                {['Computer Vision', 'Deep Learning', 'PYTHON', 'OPENCV', 'TensorFlow'].map((tech) => (
                  <span key={tech} className="px-4 py-2 rounded-full bg-[#111118] border border-white/5 text-[11px] font-bold text-gray-400 uppercase tracking-wide">{tech}</span>
                ))}
              </div>
            </div>

            <div className="group">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.35em] mb-3">05 — IoT Systems</p>
              <h3 className="text-4xl font-black text-white mb-6 tracking-tight">IoT-Based Automation Systems</h3>
              <div className="relative bg-[#0f0f14] border-[4px] border-[#111] rounded-[2.5rem] overflow-hidden p-8 hover:scale-[1.01] transition-all duration-500">
                <p className="text-white text-lg font-medium leading-relaxed max-w-[480px] mb-8">IoT-Based Automation Systems with real-time monitoring and control capabilities.</p>
                <div className="rounded-[1.5rem] overflow-hidden border border-black/30 shadow-2xl">
                  <img src="/8.jpeg" alt="IoT Projects" className="w-full h-[280px] object-cover" />
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-5">
                {['Embedded Systems Development', 'Automation', 'PLC Basics', 'Cloud IoT Platform', 'Sensor Integration'].map((tech) => (
                  <span key={tech} className="px-4 py-2 rounded-full bg-[#111118] border border-white/5 text-[11px] font-bold text-gray-400 uppercase tracking-wide">{tech}</span>
                ))}
              </div>
            </div>

            <div className="group">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.35em] mb-3">06 — World champion Robotics Competition</p>
              <h3 className="text-4xl font-black text-white mb-6 tracking-tight">Robotics Competition(Robonexus)</h3>
              <div className="relative bg-[#0f0f14] border-[4px] border-[#111] rounded-[2.5rem] overflow-hidden p-8 hover:scale-[1.01] transition-all duration-500">
                <p className="text-white text-lg font-medium leading-relaxed max-w-[480px] mb-8">Combat Robotics Competition with innovative robot design and battle strategies.</p>
                <div className="rounded-[1.5rem] overflow-hidden border border-black/30 shadow-2xl">
                  <img src="/9.jpeg" alt="Robotics Projects" className="w-full h-[280px] object-cover" />
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-5">
                {['Embedded Systems', 'PCB Design', 'Battle Tactics', 'Combat Robotics', 'Mechanical Engineering'].map((tech) => (
                  <span key={tech} className="px-4 py-2 rounded-full bg-[#111118] border border-white/5 text-[11px] font-bold text-gray-400 uppercase tracking-wide">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] p-10">
          <h2 className="text-4xl font-black mb-12 uppercase tracking-wide text-white">Technical Skills</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {skills.map((skill, idx) => (
              <div key={idx} className="bg-[#0f0f14] border border-white/10 rounded-[2rem] p-6">
                <h3 className="font-bold text-white mb-4 uppercase text-xs tracking-widest">{skill.category}</h3>
                <div className="space-y-2">
                  {skill.items.map((item, iidx) => (
                    <div key={iidx} className="text-gray-300 text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_5px_rgba(139,92,246,0.45)]"></div> {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] p-10">
          <h2 className="text-4xl font-black mb-12 uppercase tracking-wide text-white">Professional Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="bg-[#0f0f14] border border-white/10 rounded-[2rem] p-6">
                <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
                <p className="text-gray-400 mb-4 text-sm uppercase tracking-wider">{exp.company} • {exp.period}</p>
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, hidx) => (
                    <li key={hidx} className="text-gray-300 text-sm flex items-start gap-2">
                      <ChevronRight size={14} className="mt-1 text-purple-500 min-w-[14px]" /> {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-r from-teal-600/10 to-transparent border-t border-teal-500/20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 uppercase tracking-wide">Let's Work Together</h2>
          <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto"> Open to exciting opportunities in AI, computer vision, and robotics. Let's build the future together. </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:Abdallaelsiddig.m@gmail.com" 
              className="bg-teal-500 hover:bg-teal-600 text-white px-10 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-teal-500/20"
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
              className="bg-slate-800 hover:bg-slate-700 text-white px-10 py-3 rounded-xl font-bold transition-all flex items-center gap-2 border border-teal-500/20 shadow-lg shadow-teal-500/20"
            >
              <FileText size={20} /> Download Resume
            </a>
          </div>
          <div className="mt-16 pt-8 border-t border-white/5 text-gray-500 text-xs tracking-widest uppercase">
            <p className="mb-2 tracking-normal text-sm lowercase">✉️ Abdallaelsiddig.m@gmail.com •  Bahrain</p>
            <p>© 2026 Abdalla Elradi. All rights reserved.</p>
          </div>
        </div>
      </section>
    </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-[#030014] py-16 px-6 text-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">
                © 2026 Abdalla Elsiddig
            </div>
            <div className="flex gap-8">
                <Github size={20} className="text-gray-500 hover:text-white cursor-pointer" />
                <Linkedin size={20} className="text-gray-500 hover:text-white cursor-pointer" />
                <Mail size={20} className="text-gray-500 hover:text-white cursor-pointer" />
            </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
