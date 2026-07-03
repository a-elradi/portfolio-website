"use client";
import React, { useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';

const PROJECTS = [
  {
    id: 'amr',
    category: '01 — Robotics',
    title: 'AMR Warehouse Robot',
    image: '/1.png',
    description: 'Autonomous mobile robot with SLAM navigation, computer vision, and warehouse automation for smart logistics.',
    tags: ['ROS', 'SLAM', 'PYTHON', 'OPENCV', 'YOLO'],
  },
  {
    id: 'techtrap',
    category: '02 — AI Healthcare',
    title: 'TECHTRAP',
    image: '/Huawie.png',
    description: 'AI-powered rehabilitation and educational system built for the Huawei ICT Competition.',
    tags: ['Machine Learning', 'MindSpore', 'PYTHON', 'OPENCV', 'AI'],
  },
  {
    id: 'firex',
    category: '03 — Robotics',
    title: 'FireX Robot',
    image: '/7.jpeg',
    description: 'Advanced firefighter robot with AI-powered navigation and rescue capabilities.',
    tags: ['ESP32', 'C++', 'UI Dashboard', 'MQTT', 'AI'],
  },
  {
    id: 'cv',
    category: '04 — Computer Vision',
    title: 'Computer Vision Projects',
    image: '/MV.jpeg',
    description: 'A collection of computer vision projects covering AI-powered image processing and analysis.',
    tags: ['Computer Vision', 'Deep Learning', 'PYTHON', 'OPENCV', 'TensorFlow'],
  },
  {
    id: 'iot',
    category: '05 — IoT Systems',
    title: 'IoT-Based Automation',
    image: '/8.jpeg',
    description: 'IoT-based automation systems with real-time monitoring and control capabilities.',
    tags: ['Embedded Systems', 'Automation', 'PLC Basics', 'Cloud IoT', 'Sensors'],
  },
  {
    id: 'robonexus',
    category: '06 — Combat Robotics',
    title: 'Robonexus',
    image: '/9.jpeg',
    description: 'World-championship combat robotics competition entry — innovative robot design and battle strategy.',
    tags: ['Embedded Systems', 'PCB Design', 'Battle Tactics', 'Mechanical Engineering'],
  },
];

export default function ProjectsGallery({ isDarkMode, themeClasses }) {
  const [active, setActive] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROJECTS.map((project) => (
          <button
            key={project.id}
            onClick={() => setActive(project)}
            className="group relative overflow-hidden rounded-[2rem] text-left aspect-[4/5]"
          >
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-2">{project.category}</p>
              <h3 className="text-xl md:text-2xl font-black text-white leading-tight">{project.title}</h3>
            </div>
            <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={16} />
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActive(null)} />
          <div className={`relative z-10 w-full max-w-2xl rounded-[2rem] overflow-hidden shadow-2xl ${themeClasses.card}`}>
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
            >
              <X size={18} />
            </button>
            <div className="aspect-[16/9]">
              <img src={active.image} alt={active.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-2">{active.category}</p>
              <h3 className={`text-2xl md:text-3xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{active.title}</h3>
              <p className={`${themeClasses.mutedText} leading-relaxed mb-6`}>{active.description}</p>
              <div className="flex flex-wrap gap-2">
                {active.tags.map((tag) => (
                  <span key={tag} className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${themeClasses.subCard} ${themeClasses.mutedText}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
