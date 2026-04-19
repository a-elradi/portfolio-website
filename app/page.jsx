"use client";
import React, { useState } from 'react';
import { 
  Github, Linkedin, Mail, MapPin, 
  Cpu, Brain, Trophy, MessageSquare, Menu,
  ArrowUpRight, BookOpen, Sparkles, Dribbble, X, ExternalLink, 
  GraduationCap,  Briefcase, Folder, Award, ChevronRight, FileText 
} from 'lucide-react';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <div className="min-h-screen bg-[#030014] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
      {/* BACKGROUND: Dot Pattern */}
      <div className="fixed inset-0 z-0 opacity-[0.15] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      {/* FLOATING NAV */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-1.5 bg-[#0a0a0f]/80 backdrop-blur-2xl border border-white/5 rounded-full shadow-2xl">
        {['Home', 'About', 'Projects', 'Skills'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition-all ${
              activeTab === tab ? 'bg-white/10 text-white shadow-inner' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
        
        {/* HERO GRID */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-24">
          
          {/* NAME CARD */}
          <div className="md:col-span-4 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl font-black uppercase tracking-tighter leading-none mb-1">
              ABDALLA<br/><span className="text-gray-600">ELSIDDIG</span>
            </h1>
            <div className="mt-4 flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1bd1e3] animate-pulse"></span>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em]">Informatics Engineer</p>
            </div>
          </div>

          {/* MAIN PHOTO */}
          <div className="md:col-span-4 h-[400px] bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] overflow-hidden group relative">
            <img 
                src="/profile.png" 
                className="w-full h-full object-cover" 
                alt="Abdalla Elsiddig" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* CRAFT */}
          <div className="md:col-span-4 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                    <Cpu size={20} className="text-[#1bd1e3]" /> CRAFT
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Specializing in <span className="text-white font-medium">Autonomous Robotics (AMR)</span> and <span className="text-white font-medium">Computer Vision</span>.
                </p>
            </div>
            <div className="flex flex-wrap gap-2">
                {['ROS2', 'Python', 'OpenCV', 'TensorFlow'].map(t => (
                    <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black text-gray-500 uppercase">{t}</span>
                ))}
            </div>
          </div>

          {/* MINDSET (Basketball) - FIXED ICON */}
          <div className="md:col-span-8 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] p-10 flex flex-col md:flex-row gap-10 overflow-hidden group">
            <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2 text-orange-500">
                    <Dribbble size={20} /> MINDSET
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Excellence is a habit. As a <span className="text-white font-medium italic">Basketball Player</span>, I bring the same discipline and tactical focus to my engineering projects.
                </p>
            </div>
            <div className="w-full md:w-64 h-48 md:h-auto rounded-2xl overflow-hidden border border-white/10 relative">
                <img 
                    src="/bball.png" 
                    className="w-full h-full object-cover grayscale brightness-0 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    alt="Basketball" 
                />
            </div>
          </div>
           {/* LOCATION (Manama) */}
           <div className="md:col-span-4 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden group">
  
  {/* Background Glow */}
  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full -mr-10 -mt-10"></div>

  {/* Background Image */}
  <img
    src="/manama.png"
    alt="Manama"
    className="absolute inset-0 w-full h-full object-cover opacity-20"
  />

  {/* Content */}
  <div className="relative z-10 flex flex-col justify-between h-full">
    <MapPin className="text-purple-500" size={24} />

    <div>
      <h3 className="text-2xl font-black uppercase tracking-tighter">
        Manama
      </h3>

      <p className="text-[10px] text-gray-500 uppercase mt-1 font-bold tracking-[0.3em]">
        Bahrain (Riffa)
      </p>
    </div>
  </div>
</div>
</section>
        {/* PROJECTS SECTION */}
        <section className="mb-32">
            <div className="text-center mb-16">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">PORTFOLIO</p>
                <h2 className="text-5xl font-black mt-4">Selected <span className="text-purple-500">Works</span></h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* AMR Project */}
                <div className="group bg-[#0a0a0f] border border-white/5 rounded-[3rem] overflow-hidden hover:border-white/20 transition-all duration-500 p-10">
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">01 — Robotics</p>
                    <h3 className="text-3xl font-black mb-4">AMR Warehouse Robot</h3>
                    <div className="mt-8 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-[2rem] border border-white/5 flex items-center justify-center p-6">
                        <img src="/1.png" className="w-full h-full object-contain opacity-80 group-hover:scale-105 transition-transform" alt="AMR" />
                    </div>
                </div>

                {/* AI-Powered Rehabilitation & Educational System (TECHTRAP) */}
                <div className="group bg-[#0a0a0f] border border-white/5 rounded-[3rem] overflow-hidden hover:border-white/20 transition-all duration-500 p-10">
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">02 — AI/ML</p>
                    <h3 className="text-3xl font-black mb-4">TECHTRAP AI-Powered Rehabilitation & Educational System</h3>
                    <div className="mt-8 h-64 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-[2rem] border border-white/5 flex items-center justify-center p-6">
                        <img src="/2.png" className="w-full h-full object-contain opacity-80 group-hover:scale-105 transition-transform" alt="AI" />
                    </div>
                </div>
                {/* Advanced Firefighter Robot */}
                <div className="group bg-[#0a0a0f] border border-white/5 rounded-[3rem] overflow-hidden hover:border-white/20 transition-all duration-500 p-10">
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">03 — Robotics</p>
                    <h3 className="text-3xl font-black mb-4">smart Firefighter Robot</h3>
                    <div className="mt-8 h-64 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-[2rem] border border-white/5 flex items-center justify-center p-6">
                        <img src="/3.png" className="w-full h-full object-contain opacity-80 group-hover:scale-105 transition-transform" alt="AI" />
                    </div>
                </div>
                {/* Advanced Computer Vision Projects */}
                <div className="group bg-[#0a0a0f] border border-white/5 rounded-[3rem] overflow-hidden hover:border-white/20 transition-all duration-500 p-10">
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">04 — AI/MV</p>
                    <h3 className="text-3xl font-black mb-4">Advanced Computer Vision Projects</h3>
                    <div className="mt-8 h-64 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-[2rem] border border-white/5 flex items-center justify-center p-6">
                        <img src="/4.png" className="w-full h-full object-contain opacity-80 group-hover:scale-105 transition-transform" alt="AI" />
                    </div>
                </div>
                {/* IoT-Based Automation Systems */}
                <div className="group bg-[#0a0a0f] border border-white/5 rounded-[3rem] overflow-hidden hover:border-white/20 transition-all duration-500 p-10">
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">05 — IoT</p>
                    <h3 className="text-3xl font-black mb-4">IoT-Based Automation Systems</h3>
                    <div className="mt-8 h-64 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-[2rem] border border-white/5 flex items-center justify-center p-6">
                        <img src="/5.png" className="w-full h-full object-contain opacity-80 group-hover:scale-105 transition-transform" alt="AI" />
                    </div>
                </div>
                {/* Full-Stack Web Platforms */}
                <div className="group bg-[#0a0a0f] border border-white/5 rounded-[3rem] overflow-hidden hover:border-white/20 transition-all duration-500 p-10">
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">06 — Full-Stack Web</p>
                    <h3 className="text-3xl font-black mb-4">Full-Stack Web Platforms</h3>
                    <div className="mt-8 h-64 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-[2rem] border border-white/5 flex items-center justify-center p-6">
                        <img src="/6.png" className="w-full h-full object-contain opacity-80 group-hover:scale-105 transition-transform" alt="AI" />
                    </div>
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