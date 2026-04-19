"use client";
import React, { useState } from 'react';
import { 
  Github, Linkedin, Mail, MapPin, 
  Cpu, Brain, Trophy, MessageSquare, 
  ArrowUpRight, BookOpen, Sparkles, Basketball
} from 'lucide-react';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <div className="min-h-screen bg-[#030014] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
      {/* BACKGROUND: The Pszostak Dot Pattern */}
      <div className="fixed inset-0 z-0 opacity-[0.15] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      {/* 1. FLOATING NAV */}
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
        
        {/* 2. BENTO HERO GRID */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-24">
          
          {/* NAME CARD */}
          <div className="md:col-span-4 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center group">
            <div className="text-4xl font-black uppercase tracking-tighter leading-none mb-1 group-hover:scale-105 transition-transform">
              ABDALLA<br/><span className="text-gray-600">ELSIDDIG</span>
            </div>
            <div className="mt-4 flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1bd1e3] animate-pulse"></span>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em]">Available for projects</p>
            </div>
          </div>

          {/* MAIN PHOTO: Grayscale with hover effect */}
          <div className="md:col-span-4 h-[400px] bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] overflow-hidden group relative">
            <img 
                src="/profile.png" 
                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                alt="Abdalla Elsiddig" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* CRAFT: Technical Summary */}
          <div className="md:col-span-4 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                    <Cpu size={20} className="text-[#1bd1e3]" /> CRAFT
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Informatics Engineer specializing in <span className="text-white font-medium">Autonomous Robotics (AMR)</span>, <span className="text-white font-medium">SLAM navigation</span>, and vision systems.
                </p>
            </div>
            <div className="flex flex-wrap gap-2">
                {['ROS2', 'Python', 'OpenCV', 'TensorFlow', 'React'].map(t => (
                    <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black text-gray-500 uppercase">{t}</span>
                ))}
            </div>
          </div>

          {/* MINDSET: Basketball Section (Using your images) */}
          <div className="md:col-span-8 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] p-10 flex flex-col md:flex-row gap-10 overflow-hidden group">
            <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2 text-orange-500">
                    <Basketball size={20} /> MINDSET
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Excellence is a habit. As a <span className="text-white font-medium italic">Basketball Player</span>, I bring the same discipline, teamwork, and tactical focus to engineering that I do to the court. Mastering body and mind is my path to professional excellence.
                </p>
            </div>
            {/* Action shot transition */}
            <div className="w-full md:w-64 h-48 md:h-auto rounded-2xl overflow-hidden border border-white/10 relative">
                <img 
                    src="image_977cb4.jpg" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                    alt="Basketball Mindset" 
                />
            </div>
          </div>

          {/* LOCATION: Manama, Bahrain */}
          <div className="md:col-span-4 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full -mr-10 -mt-10 group-hover:bg-purple-500/20 transition-all"></div>
            <div className="flex justify-between items-start z-10">
                <MapPin className="text-purple-500" size={24} />
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Bahrain</span>
            </div>
            <div className="z-10">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Manama</h3>
                <p className="text-[10px] text-gray-500 uppercase mt-1 font-bold tracking-[0.3em]">GMT +3 (Riffa District)</p>
            </div>
          </div>
        </section>

        {/* 3. FEATURED PROJECTS (Pszostak Layout) */}
        <section className="mb-32">
            <div className="text-center mb-16">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">SELECTED WORKS</p>
                <h2 className="text-5xl font-black mt-4">Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Projects</span></h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* AMR Project */}
                <div className="group bg-[#0a0a0f] border border-white/5 rounded-[3rem] overflow-hidden hover:border-white/20 transition-all duration-500">
                    <div className="p-12 pb-0">
                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">01 — ROBOTICS</p>
                        <h3 className="text-3xl font-black mb-4">AMR Warehouse Robot</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8">Autonomous transport robot using SLAM navigation and vision-based box detection.</p>
                    </div>
                    <div className="mx-8 mb-8 h-72 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-[2rem] border border-white/5 flex items-center justify-center p-8">
                        <img src="1.png" className="w-full h-full object-contain rounded-xl opacity-80 group-hover:scale-105 transition-transform duration-700" alt="AMR" />
                    </div>
                </div>

                {/* TECHTRAP AI */}
                <div className="group bg-[#0a0a0f] border border-white/5 rounded-[3rem] overflow-hidden hover:border-white/20 transition-all duration-500">
                    <div className="p-12 pb-0">
                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">02 — ARTIFICIAL INTELLIGENCE</p>
                        <h3 className="text-3xl font-black mb-4">TECHTRAP AI</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8">Top 10 Huawei ICT Competition entry. Adaptive rehabilitation monitoring system.</p>
                    </div>
                    <div className="mx-8 mb-8 h-72 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-[2rem] border border-white/5 flex items-center justify-center p-8">
                        <img src="2.png" className="w-full h-full object-contain rounded-xl opacity-80 group-hover:scale-105 transition-transform duration-700" alt="AI Project" />
                    </div>
                </div>
            </div>
        </section>

        {/* 4. ACHIEVEMENTS & EXPLORE */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { icon: Trophy, title: "Awards", color: "text-orange-500", desc: "Top 10 National ICT ranking and Mavericks Robotics team honors." },
                { icon: BookOpen, title: "Academic", color: "text-blue-500", desc: "Senior Informatics Engineering student focused on GCC robotics research." },
                { icon: MessageSquare, title: "Connect", color: "text-purple-500", desc: "Founder of the IoT Club. Open to collaboration on vision and robotics." }
            ].map((card, i) => (
                <div key={i} className="bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] p-10 text-center hover:bg-white/[0.02] transition-colors group cursor-pointer">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10 group-hover:border-white/30">
                        <card.icon className={card.color} size={28} />
                    </div>
                    <h4 className="text-xl font-black uppercase mb-3">{card.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed mb-8">{card.desc}</p>
                    <div className="flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
                        VIEW MORE <ArrowUpRight size={14} />
                    </div>
                </div>
            ))}
        </section>

      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 bg-[#030014]/80 py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">
                <span className="text-white">AE</span> • © 2026 Abdalla Elsiddig
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
