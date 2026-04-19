"use client";
import React, { useState } from 'react';
import { 
  Menu, X, Github, Linkedin, Mail, GraduationCap, Trophy, 
  Briefcase, Folder, Award, ChevronRight, FileText 
} from 'lucide-react';

const Portfolio = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-[#1bd1e3]/30">
      {/* PERFECT TOUCH: Subtle Animated Grid & Glow */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#1bd1e3]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-center h-20">
            <div className="text-xl font-black tracking-tighter text-white">
              ABDALLA<span className="text-[#1bd1e3]">.</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'About', 'Projects', 'Skills', 'Experience', 'Contact'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => scrollToSection(item)}
                  className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400 hover:text-[#1bd1e3] transition-all"
                >
                  {item}
                </button>
              ))}
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        
        {/* PROFILE IMAGE: Integrated as a "Large Feature" */}
        <div className="absolute top-0 right-0 w-full lg:w-[55%] h-full z-0">
          <div className="relative w-full h-full">
            <img 
              src="/profile.png" 
              alt="Abdalla Elsiddig" 
              className="w-full h-full object-cover object-top lg:object-center grayscale-[0.2] contrast-[1.1]"
            />
            {/* The Perfect Blend: Multiple gradients to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/95 lg:via-[#020617]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Professional Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full mb-8">
              <div className="w-2 h-2 rounded-full bg-[#1bd1e3] animate-pulse" />
              <span className="text-[#1bd1e3] text-[10px] font-bold tracking-[0.2em] uppercase">Senior Informatics Engineer</span>
            </div>

            {/* Typography: Bold & Clean */}
            <h1 className="text-6xl md:text-8xl font-extrabold mb-4 tracking-tighter text-white leading-none">
              Abdalla <br/> 
              <span className="text-white/40 font-light italic">Elsiddig</span>
            </h1>
            
            <h2 className="text-xl md:text-2xl font-medium text-slate-300 mb-8 max-w-xl">
              Informatics Engineer <span className="text-[#1bd1e3]">|</span> AI & Computer Vision <span className="text-[#1bd1e3]">|</span> Robotics
            </h2>
            
            <p className="text-lg text-slate-400 mb-12 leading-relaxed max-w-lg">
              Designing the future of automation through intelligent vision systems and autonomous robotics architecture.
            </p>
            
            {/* Kept your exact button style but added "Perfect" spacing */}
            <div className="flex flex-wrap gap-4 mb-16">
              <a 
                href="mailto:Abdallaelsiddig.m@gmail.com" 
                className="px-8 py-4 bg-[#1bd1e3] hover:shadow-[0_0_30px_rgba(27,209,227,0.4)] text-black rounded-xl font-black transition-all flex items-center gap-3"
              >
                <Mail size={18} /> GET IN TOUCH
              </a>
              
              <button 
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold transition-all flex items-center gap-3 group backdrop-blur-sm"
              >
                <ChevronRight className="text-[#1bd1e3] group-hover:translate-x-1 transition-transform" size={18} /> VIEW WORK
              </button>
              
              <div className="flex gap-4 w-full sm:w-auto">
                <a 
                  href="/resume.pdf" 
                  className="flex-1 sm:flex-none px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold transition-all flex items-center justify-center gap-3 text-sm"
                >
                  <FileText size={16} /> RESUME
                </a>
              </div>
            </div>

            {/* Stats: Re-styled to be "Glass Panels" */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
              {[
                { icon: Trophy, value: "Top 10", label: "National" },
                { icon: Briefcase, value: "1.5+", label: "Years Exp" },
                { icon: Award, value: "12+", label: "Certs" },
                { icon: Folder, value: "15+", label: "Projects" }
              ].map((item, idx) => (
                <div key={idx} className="group p-5 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-md hover:border-[#1bd1e3]/30 transition-all">
                  <item.icon className="text-[#1bd1e3] mb-3 opacity-80 group-hover:scale-110 transition-transform" size={20} />
                  <div className="text-2xl font-black text-white">{item.value}</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
