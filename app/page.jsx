"use client";
import React, { useState } from 'react';
import { 
  Menu, X, Github, Linkedin, Mail, ExternalLink, ArrowRight,
  GraduationCap, Trophy, Briefcase, Folder, Award, ChevronRight, FileText,
  Facebook, MessageCircle, ChevronDown
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

  // ... (Keep your projects, skills, and experiences arrays here)

  return (
    <div className="min-h-screen bg-[#1a2b3c] text-white selection:bg-blue-500/30">
      {/* Dotted Background Overlay 
          Matches the subtle pattern in your reference image
      */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl font-bold tracking-widest opacity-80">AE</div>
          <div className="hidden md:flex gap-8">
            {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item)}
                className="text-[11px] uppercase tracking-[0.2em] font-semibold opacity-60 hover:opacity-100 transition-opacity"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section - Re-styled to match the reference */}
      <section id="home" className="relative h-screen flex items-center px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 items-center z-10 pt-20">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div className="space-y-1 mb-8">
              <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-none opacity-90 uppercase">
                Abdalla
              </h1>
              <h1 className="text-7xl md:text-8xl font-thin tracking-tighter leading-none opacity-40 uppercase">
                Elsiddig
              </h1>
            </div>

            <div className="flex items-center gap-3 mb-10 text-lg md:text-xl font-medium opacity-70">
              <span>Informatics Engineer</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <span>AI & Robotics</span>
            </div>

            {/* Ghost Icon Row */}
            <div className="flex gap-4 mb-12">
              {[
                { icon: Github, link: "https://github.com/a-elradi" },
                { icon: Linkedin, link: "https://www.linkedin.com/in/abdalla-elradi" },
                { icon: Facebook, link: "#" },
                { icon: Mail, link: "mailto:Abdallaelsiddig.m@gmail.com" },
                { icon: MessageCircle, link: "#" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.link}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center opacity-60 hover:opacity-100 hover:border-white/50 transition-all bg-white/5"
                >
                  <social.icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="flex flex-col items-start gap-4">
               <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
               <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 transform -rotate-90 origin-left ml-1 mt-6">
                 Scroll Down
               </span>
            </div>
          </div>

          {/* Right Image - Integrated with background */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative h-full">
            <div className="relative w-full max-w-[500px] aspect-[4/5] grayscale hover:grayscale-0 transition-all duration-1000">
               {/* Gradient Mask: This ensures the image fades into the background color
                  like in your reference screenshot.
               */}
               <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#1a2b3c] via-transparent to-transparent opacity-80"></div>
               <img 
                 src="/profile.png" 
                 alt="Abdalla Elsiddig" 
                 className="w-full h-full object-cover object-center rounded-lg"
               />
            </div>
          </div>
        </div>

        {/* Floating Decoration */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30 animate-bounce">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* ... Rest of your sections (About, Projects, etc.) ... */}
      {/* Note: Update the background of those sections to match #1a2b3c */}
    </div>
  );
};

export default Portfolio;
