"use client";
import React from 'react';
import { Globe, Bot, Workflow, Rocket, Cog, ArrowUpRight } from 'lucide-react';

const SERVICES = [
  { icon: Globe, name: 'Websites & Web Apps' },
  { icon: Workflow, name: 'Automation & Systems' },
  { icon: Cog, name: 'Robotics' },
  { icon: Bot, name: 'AI Agents & Intelligent Systems' },
  { icon: Rocket, name: 'Custom Applications' },
];

export default function ServicesGrid({ isDarkMode, themeClasses, onRequestService }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {SERVICES.map((service) => {
        const Icon = service.icon;
        return (
          <button
            key={service.name}
            onClick={() => onRequestService(service.name)}
            className={`group rounded-[2rem] p-7 flex items-center justify-between gap-4 text-left transition-all hover:-translate-y-1 ${themeClasses.card}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Icon size={22} />
              </div>
              <h3 className={`text-base font-black leading-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{service.name}</h3>
            </div>
            <ArrowUpRight size={16} className="shrink-0 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        );
      })}
    </div>
  );
}
