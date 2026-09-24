"use client";
import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, ExternalLink } from 'lucide-react';

const PROJECTS = [
  {
    id: 'door2door',
    category: '01 — Full-Stack Web App',
    title: 'Door2Door Delivery Platform',
    image: '/door2door-cover.jpg',
    video: '/door2door-demo.mp4',
    description: 'A complete delivery platform built for Door2Door, a Kuwait-based delivery company — a public marketing site with services and pricing, a customer-facing order tracking page, and a password-protected admin panel for creating orders, updating delivery status, and managing incoming business requests.',
    tags: ['Next.js 16', 'React 19', 'Tailwind CSS 4', 'Order Tracking', 'Admin Panel'],
    liveUrl: 'https://door2door-iota.vercel.app/',
  },
  {
    id: 'amr',
    category: '02 — Robotics',
    title: 'AMR Warehouse Robot',
    image: '/1.png',
    description: 'Autonomous mobile robot with SLAM navigation, computer vision, and warehouse automation for smart logistics.',
    tags: ['ROS', 'SLAM', 'PYTHON', 'OPENCV', 'YOLO'],
  },
  {
    id: 'techtrap',
    category: '03 — AI Healthcare',
    title: 'TECHTRAP',
    image: '/Huawie.jpg',
    description: 'AI-powered rehabilitation and educational system built for the Huawei ICT Competition.',
    tags: ['Machine Learning', 'MindSpore', 'PYTHON', 'OPENCV', 'AI'],
  },
  {
    id: 'firex',
    category: '04 — Robotics',
    title: 'FireX Robot',
    image: '/7.jpeg',
    description: 'Advanced firefighter robot with AI-powered navigation and rescue capabilities.',
    tags: ['ESP32', 'C++', 'UI Dashboard', 'MQTT', 'AI'],
  },
  {
    id: 'cv',
    category: '05 — Computer Vision',
    title: 'Computer Vision Projects',
    image: '/MV.jpeg',
    description: 'A collection of computer vision projects covering AI-powered image processing and analysis.',
    tags: ['Computer Vision', 'Deep Learning', 'PYTHON', 'OPENCV', 'TensorFlow'],
  },
  {
    id: 'iot',
    category: '06 — Robotics',
    title: 'Sumo X Competition',
    image: '/8.jpeg',
    description: 'IoT-based automation systems with real-time monitoring and control capabilities.',
    tags: ['Embedded Systems', 'Automation', 'PLC Basics', 'Cloud IoT', 'Sensors'],
  },
  {
    id: 'robonexus',
    category: '07 — Combat Robotics',
    title: 'Robonexus',
    image: '/9.jpeg',
    description: 'World-championship combat robotics competition entry — innovative robot design and battle strategy.',
    tags: ['Embedded Systems', 'PCB Design', 'Battle Tactics', 'Mechanical Engineering'],
  },
];

export default function ProjectsGallery({ isDarkMode, themeClasses }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [active]);

  return (
    <>
      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scroll-px-4 -mx-4 px-4 pb-4 sm:mx-0 sm:px-0 sm:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {PROJECTS.map((project) => (
          <button
            key={project.id}
            onClick={() => setActive(project)}
            className="group relative overflow-hidden rounded-[2rem] text-left aspect-[4/5] shrink-0 w-[78vw] max-w-[330px] snap-center sm:w-auto sm:max-w-none sm:shrink"
          >
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <video
                src={project.video}
                muted
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/5" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-2">{project.category}</p>
              <h3 className="text-xl md:text-2xl font-black text-white leading-tight">{project.title}</h3>
            </div>
            <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={16} />
            </div>
          </button>
        ))}
      </div>

      <p className={`sm:hidden mt-1 text-center text-[10px] font-bold uppercase tracking-[0.25em] ${themeClasses.mutedText}`}>
        Swipe · {PROJECTS.length} projects
      </p>

      {active && (
        <div role="dialog" aria-modal="true" aria-label={active.title} className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActive(null)} />
          <div className={`relative z-10 w-full max-w-2xl rounded-[2rem] overflow-hidden shadow-2xl ${themeClasses.card}`}>
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
            >
              <X size={18} />
            </button>
            <div className="aspect-[16/9] bg-black">
              {active.video ? (
                <video src={active.video} controls preload="metadata" poster={active.image} className="w-full h-full object-contain" />
              ) : (
                <img src={active.image} alt={active.title} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-2">{active.category}</p>
              <h3 className={`text-2xl md:text-3xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{active.title}</h3>
              <p className={`${themeClasses.mutedText} leading-relaxed mb-6`}>{active.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {active.tags.map((tag) => (
                  <span key={tag} className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${themeClasses.subCard} ${themeClasses.mutedText}`}>
                    {tag}
                  </span>
                ))}
              </div>
              {active.liveUrl && (
                <a
                  href={active.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-3 rounded-xl font-bold transition-all"
                >
                  <ExternalLink size={18} /> Visit Live Site
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
