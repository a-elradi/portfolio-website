"use client";
import React from 'react';
import { Globe, Bot, Workflow, Rocket, ArrowUpRight } from 'lucide-react';

const SERVICES = [
  {
    icon: Globe,
    name: 'Websites & Web Apps',
    description: 'Custom, fast, responsive websites and web applications built with modern frameworks — from portfolios to full product front-ends.',
  },
  {
    icon: Workflow,
    name: 'Automation & Systems',
    description: 'IoT, embedded, and process automation — connecting hardware and software to remove manual work and monitor systems in real time.',
  },
  {
    icon: Bot,
    name: 'AI Agents & Intelligent Systems',
    description: 'Computer vision, machine learning, and AI agents tailored to a real problem — from prototypes to deployed systems.',
  },
  {
    icon: Rocket,
    name: 'Custom Applications',
    description: 'Bespoke software and tools built around how your team actually works, end to end from idea to deployment.',
  },
];

export default function ServicesGrid({ isDarkMode, themeClasses, onRequestService }) {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {SERVICES.map((service) => {
        const Icon = service.icon;
        return (
          <div key={service.name} className={`group rounded-[2rem] p-8 flex flex-col justify-between transition-all hover:-translate-y-1 ${themeClasses.card}`}>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
                <Icon size={22} />
              </div>
              <h3 className={`text-xl font-black mb-3 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{service.name}</h3>
              <p className={`${themeClasses.mutedText} text-sm leading-relaxed mb-8`}>{service.description}</p>
            </div>
            <button
              onClick={() => onRequestService(service.name)}
              className={`inline-flex items-center gap-2 self-start text-xs font-black uppercase tracking-[0.2em] text-emerald-400 hover:text-emerald-300`}
            >
              Request this service <ArrowUpRight size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
