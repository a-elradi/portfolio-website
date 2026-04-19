"use client";
import React, { useState } from 'react';
import { 
  Github, Linkedin, Mail, ExternalLink, Globe, 
  Code2, Cpu, Brain, Rocket, MapPin, 
  BookOpen, Trophy, Link as LinkIcon, MessageSquare,
  ChevronRight, ArrowUpRight
} from 'lucide-react';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('Home');

  // YOUR DATA Mapped to the new structure
  const projects = [
    { 
        id: "01",
        title: "AMR Warehouse Robot", 
        type: "ROBOTICS",
        description: "Autonomous mobile robot with SLAM navigation and computer vision, reducing manual operations by 40%.",
        tech: ["ROS2", "SLAM", "Python", "Lidar"],
        color: "from-orange-500 to-amber-600",
        image: "/amr-project.png" // Replace with your image path
    },
    { 
        id: "02",
        title: "Firefighter Robot", 
        type: "AUTONOMOUS SYSTEMS",
        description: "Thermal imaging and obstacle detection system developed in partnership with Civil Defense.",
        tech: ["C++", "Computer Vision", "PID Control"],
        color: "from-blue-500 to-cyan-600",
        image: "/firefighter-project.png"
    },
    { 
        id: "03",
        title: "TECHTRAP AI", 
        type: "AI/ML",
        description: "Huawei ICT Competition Top 10 National Ranking. Intelligent rehabilitation system using adaptive ML algorithms.",
        tech: ["TensorFlow", "OpenCV", "Signal Processing"],
        color: "from-purple-500 to-pink-600",
        image: "/techtrap.png"
    }
  ];

  return (
    <div className="min-h-screen bg-[#030014] text-white font-sans selection:bg-purple-500/30">
      {/* Background Dot Pattern */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      {/* 1. Nav Bar - Floating Pill Style */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-1.5 bg-[#12121a]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
        {['Home', 'About', 'Projects', 'Skills', 'Other'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-full transition-all ${
              activeTab === tab ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Socials & Call Action - Top Corners */}
      <div className="fixed top-8 left-10 z-40 hidden lg:block">
         <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
         </div>
      </div>
      <div className="fixed top-8 right-10 z-40 hidden lg:block">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
          <BookOpen size={14} /> Book a Call
        </button>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
        
        {/* 2. Bento Grid Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-24">
          
          {/* Name Card */}
          <div className="md:col-span-4 bg-[#0a0a0f] border border-white/5 rounded-[2rem] p-8 flex flex-col justify-center text-center">
            <h1 className="text-3xl font-black uppercase tracking-tighter mb-1">Abdalla</h1>
            <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">Elsiddig</h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Informatics Engineer</p>
          </div>

          {/* Photo Card */}
          <div className="md:col-span-4 h-80 bg-[#0a0a0f] border border-white/5 rounded-[2rem] overflow-hidden">
            <img src="/profile.png" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Abdalla" />
          </div>

          {/* Craft Card */}
          <div className="md:col-span-4 bg-[#0a0a0f] border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-2xl font-bold mb-4">Craft</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Building scalable <span className="text-white font-medium">apps, robotics</span>, and <span className="text-white font-medium">AI automations</span>. I focus on bridging the gap between hardware and intelligent software.
            </p>
            <div className="flex flex-wrap gap-2">
                {['ROS2', 'PyTorch', 'Next.js', 'TS', 'OpenCV'].map(t => (
                    <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-gray-400">{t}</span>
                ))}
            </div>
          </div>

          {/* Mindset Card */}
          <div className="md:col-span-8 bg-[#0a0a0f] border border-white/5 rounded-[2rem] p-8 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">Mindset</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Building more than software. My passions provide the <span className="text-white font-medium text-lg italic">discipline and focus</span> I need to grow. Mastering body and mind is my path to excellence.
                </p>
            </div>
            <div className="w-full md:w-48 aspect-square bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                <Brain className="text-purple-500" size={48} strokeWidth={1} />
            </div>
          </div>

          {/* Location Card */}
          <div className="md:col-span-4 bg-[#0a0a0f] border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <MapPin className="text-purple-500" size={24} />
                <span className="text-[10px] font-bold text-gray-500 uppercase">Bahrain</span>
            </div>
            <div>
                <h3 className="text-xl font-bold uppercase tracking-tight">Riffa, Bahrain</h3>
                <p className="text-xs text-gray-500 uppercase mt-1 tracking-widest">GMT+3</p>
            </div>
          </div>
        </section>

        {/* 3. Featured Projects */}
        <section className="mb-32">
            <div className="text-center mb-16">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Portfolio</span>
                <h2 className="text-5xl font-black mt-2">Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Projects</span></h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {projects.map((p) => (
                    <div key={p.id} className="group relative bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-white/20 transition-all duration-500">
                        <div className="p-10 pb-0">
                            <div className="flex items-center gap-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                                <span className="w-8 h-[1px] bg-gray-700"></span> {p.type}
                            </div>
                            <h3 className="text-3xl font-bold mb-4">{p.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">{p.description}</p>
                        </div>
                        <div className={`mx-6 mb-6 h-64 rounded-t-[1.5rem] bg-gradient-to-br ${p.color} flex items-center justify-center p-6 transition-transform duration-700 group-hover:scale-[1.02]`}>
                             <div className="w-full h-full bg-black/20 rounded-lg backdrop-blur-sm border border-white/10 flex items-center justify-center overflow-hidden">
                                <img src={p.image} className="w-full h-full object-cover opacity-80" alt={p.title} />
                             </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* 4. More to Explore (Bottom Cards) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { icon: MessageSquare, title: "Guestbook", color: "text-purple-500", desc: "Leave your mark and see what others have to say." },
                { icon: Trophy, title: "Achievements", color: "text-orange-500", desc: "Milestones, certifications, and academic accomplishments." },
                { icon: LinkIcon, title: "My Links", color: "text-blue-500", desc: "Find me across the web and social platforms." }
            ].map((card, i) => (
                <div key={i} className="bg-[#0a0a0f] border border-white/5 rounded-[2rem] p-10 text-center hover:bg-white/[0.02] transition-colors cursor-pointer group">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                        <card.icon className={card.color} size={28} />
                    </div>
                    <h4 className="text-2xl font-bold mb-3">{card.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">{card.desc}</p>
                    <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
                        Explore <ArrowUpRight size={14} />
                    </div>
                </div>
            ))}
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-[#030014] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500">
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
                <span className="text-white">AE</span> • © 2026 Abdalla Elsiddig
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold">
                Built with <span className="text-red-500">❤️</span> using React & Tailwind
            </div>
            <div className="flex gap-6">
                <Github size={18} className="hover:text-white cursor-pointer transition-colors" />
                <Linkedin size={18} className="hover:text-white cursor-pointer transition-colors" />
                <Mail size={18} className="hover:text-white cursor-pointer transition-colors" />
            </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
