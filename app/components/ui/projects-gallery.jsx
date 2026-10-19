"use client";
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowUpRight, ExternalLink, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';
import useCarouselFocus from './use-carousel-focus';

export const PROJECTS = [
  {
    id: 'tarakum',
    category: '01 — Islamic FinTech',
    title: 'Tarakum',
    // `card` is 4:5 card art: the whole photo, uncropped, centred over a blurred
    // copy of itself, so a wide group shot fills the card without losing anyone.
    // `image` stays the plain photo for the detail view.
    image: '/tarakum-team.jpg',
    card: '/tarakum-card.jpg',
    gallery: ['/tarakum-team.jpg', '/tarakum-winners.jpg', '/tarakum-stage.jpg'],
    award: {
      badge: '1st Place',
      title: '1st Place · BD 5,000 prize',
      short: 'BisB Islamic Investment Hackathon',
      event: 'Bahrain Islamic Bank (BisB) Next-Gen Islamic Investment Innovation Product Hackathon, with INJAZ Bahrain · October 2026',
    },
    description: "Tarakum (تراكم) is a first-of-its-kind Islamic fintech product that transforms everyday merchant discounts into real, Sharia-compliant investments for Bahrain's youth. Pay with a BisB Tarakum card at a partner merchant and the discount you earn — typically 10–15% — goes straight into your investment account. The bank invests it in Sharia-compliant products, so by the end of the year you have real savings built from purchases you were already making.",
    team: ['Abdalla Elradi', 'Abduelrahman Jalal', 'Abdullah Tantawy', 'Issa Mohamed', 'Jana Abujamal', 'Walla Saleh'],
    tags: ['Islamic FinTech', 'Sharia-Compliant Investing', 'Product Design', 'Card-Linked Rewards', 'Pitching'],
  },
  {
    id: 'door2door',
    category: '02 — Full-Stack Web App',
    title: 'Door2Door Delivery Platform',
    image: '/door2door-cover.jpg',
    // The cover is a wide title card; small crops use the phone mockup instead.
    thumb: '/door2door-thumb.jpg',
    video: '/door2door-demo.mp4',
    description: 'A complete delivery platform built for Door2Door, a Kuwait-based delivery company — a public marketing site with services and pricing, a customer-facing order tracking page, and a password-protected admin panel for creating orders, updating delivery status, and managing incoming business requests.',
    tags: ['Next.js 16', 'React 19', 'Tailwind CSS 4', 'Order Tracking', 'Admin Panel'],
    liveUrl: 'https://door2door-iota.vercel.app/',
  },
  {
    id: 'amr',
    category: '03 — Robotics',
    title: 'AMR Warehouse Robot',
    image: '/1.png',
    card: '/amr-card.jpg',
    award: { badge: '1st Place' },
    description: 'Autonomous mobile robot with SLAM navigation, computer vision, and warehouse automation for smart logistics.',
    tags: ['ROS', 'SLAM', 'PYTHON', 'OPENCV', 'YOLO'],
  },
  {
    id: 'techtrap',
    category: '04 — AI Healthcare',
    title: 'Huawei Innovation Competition',
    image: '/Huawie.jpg',
    card: '/techtrap-card.jpg',
    award: { badge: '5th · National', title: '5th Place · National Level' },
    description: 'TECHTRAP, an AI-powered rehabilitation and educational system, placed 5th at the national level in the Huawei Innovation Competition.',
    tags: ['Machine Learning', 'MindSpore', 'PYTHON', 'OPENCV', 'AI'],
  },
  {
    id: 'firex',
    category: '05 — Robotics',
    title: 'FireX Robot',
    image: '/7.jpeg',
    description: 'Advanced firefighter robot with AI-powered navigation and rescue capabilities.',
    tags: ['ESP32', 'C++', 'UI Dashboard', 'MQTT', 'AI'],
  },
  {
    id: 'cv',
    category: '06 — Computer Vision',
    title: 'Computer Vision Projects',
    image: '/MV.jpeg',
    description: 'A collection of computer vision projects covering AI-powered image processing and analysis.',
    tags: ['Computer Vision', 'Deep Learning', 'PYTHON', 'OPENCV', 'TensorFlow'],
  },
  {
    id: 'iot',
    category: '07 — Robotics',
    title: 'Sumo X Competition',
    image: '/8.jpeg',
    description: 'IoT-based automation systems with real-time monitoring and control capabilities.',
    tags: ['Embedded Systems', 'Automation', 'PLC Basics', 'Cloud IoT', 'Sensors'],
  },
  {
    id: 'robonexus',
    category: '08 — Combat Robotics',
    title: 'Robonexus',
    image: '/9.jpeg',
    description: 'World-championship combat robotics competition entry — innovative robot design and battle strategy.',
    tags: ['Embedded Systems', 'PCB Design', 'Battle Tactics', 'Mechanical Engineering'],
  },
];

// Swipeable photo strip. Each photo is shown whole (object-contain) over a
// blurred copy of itself, so mixed aspect ratios never crop a face.
export function PhotoGallery({ photos, alt, className = '' }) {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const go = (i) => {
    const el = ref.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  };
  return (
    <div className={`relative bg-black ${className}`}>
      <div
        ref={ref}
        onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        className="flex h-full overflow-x-auto snap-x snap-mandatory overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((src, i) => (
          <div key={src} className="relative h-full w-full shrink-0 snap-center overflow-hidden">
            <img src={src} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-60" />
            <img src={src} alt={`${alt}, photo ${i + 1} of ${photos.length}`} loading={i ? 'lazy' : undefined} className="relative w-full h-full object-contain" />
          </div>
        ))}
      </div>
      {photos.length > 1 && (
        <>
          <button
            onClick={() => go(Math.max(index - 1, 0))}
            disabled={index === 0}
            aria-label="Previous photo"
            className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/55 backdrop-blur text-white items-center justify-center disabled:opacity-0 transition-opacity"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => go(Math.min(index + 1, photos.length - 1))}
            disabled={index === photos.length - 1}
            aria-label="Next photo"
            className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/55 backdrop-blur text-white items-center justify-center disabled:opacity-0 transition-opacity"
          >
            <ChevronRight size={20} />
          </button>
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 pointer-events-none" aria-hidden="true">
            {photos.map((src, i) => (
              <span key={src} className={`h-1.5 rounded-full bg-white transition-all ${i === index ? 'w-5 opacity-100' : 'w-1.5 opacity-50'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function AwardBanner({ award, isDarkMode, className = '' }) {
  return (
    <div className={`flex items-center gap-3.5 rounded-2xl p-3.5 border ${isDarkMode ? 'bg-white/[0.04] border-white/10' : 'bg-neutral-900/[0.03] border-neutral-200'} ${className}`}>
      <span className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center bg-emerald-500/10 ring-1 ring-inset ring-emerald-400/20 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
        <Trophy size={20} strokeWidth={1.75} />
      </span>
      <div>
        <p className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{award.title}</p>
        {award.event && <p className={`text-xs leading-snug mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-neutral-600'}`}>{award.event}</p>}
      </div>
    </div>
  );
}

export function AwardChip({ award, className = '' }) {
  return (
    <span className={`flex items-center gap-1.5 pl-1 pr-3 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/15 text-white text-[9px] font-black uppercase tracking-[0.18em] shadow-lg shadow-black/30 ${className}`}>
      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
        <Trophy size={11} strokeWidth={2} />
      </span>
      {award.badge}
    </span>
  );
}

export default function ProjectsGallery({ isDarkMode, themeClasses }) {
  const [active, setActive] = useState(null);
  const railRef = useRef(null);
  useCarouselFocus(railRef, '(max-width: 639px)');

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
      <div ref={railRef} className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scroll-px-4 -mx-4 px-4 pb-4 sm:mx-0 sm:px-0 sm:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {PROJECTS.map((project) => (
          <button
            key={project.id}
            onClick={() => setActive(project)}
            className="group relative overflow-hidden rounded-[2rem] text-left aspect-[4/5] shrink-0 w-[78vw] max-w-[330px] snap-center sm:w-auto sm:max-w-none sm:shrink transition-[transform,opacity] duration-200 [transform:scale(var(--focus-scale,1))] active:[transform:scale(calc(var(--focus-scale,1)*0.97))]"
          >
            {project.image ? (
              <img
                src={project.card ?? project.image}
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
            {project.award && <AwardChip award={project.award} className="absolute top-5 left-5" />}
            <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={16} />
            </div>
          </button>
        ))}
      </div>

      <p className={`sm:hidden mt-1 text-center text-[10px] font-bold uppercase tracking-[0.25em] ${themeClasses.mutedText}`}>
        Swipe · {PROJECTS.length} projects
      </p>

      {active && createPortal(
        <div role="dialog" aria-modal="true" aria-label={active.title} className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActive(null)} />
          <div className={`relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden rounded-[2rem] shadow-2xl ${themeClasses.card}`}>
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
            >
              <X size={18} />
            </button>
            <div className="overflow-y-auto overscroll-contain">
            {active.gallery ? (
              <PhotoGallery photos={active.gallery} alt={active.title} className="aspect-[16/9]" />
            ) : (
              <div className="aspect-[16/9] bg-black">
                {active.video ? (
                  <video src={active.video} controls preload="metadata" poster={active.image} className="w-full h-full object-contain" />
                ) : (
                  <img src={active.image} alt={active.title} className="w-full h-full object-cover" />
                )}
              </div>
            )}
            <div className="p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-2">{active.category}</p>
              <h3 className={`text-2xl md:text-3xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{active.title}</h3>
              {active.award?.title && <AwardBanner award={active.award} isDarkMode={isDarkMode} className="mb-5" />}
              <p className={`${themeClasses.mutedText} leading-relaxed mb-6`}>{active.description}</p>
              {active.team && (
                <p className={`text-sm leading-relaxed mb-6 ${themeClasses.mutedText}`}>
                  <span className={`font-black uppercase tracking-[0.2em] text-[10px] mr-2 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Team</span>
                  {active.team.join(' · ')}
                </p>
              )}
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
        </div>
      , document.body)}
    </>
  );
}
