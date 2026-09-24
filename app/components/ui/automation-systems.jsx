"use client";
import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, Send, ShieldCheck, Instagram, MessageCircle, Mail, Play } from 'lucide-react';

const SYSTEMS = [
  {
    id: 'wazir',
    flagship: true,
    icon: ShieldCheck,
    category: 'Enterprise AI Governance',
    title: 'WAZIR — Agent Department',
    image: '/wazir-cover.jpg',
    video: '/wazir-demo.mp4',
    tagline: 'A supervisor AI that runs six specialist agents — with a kill switch.',
    description:
      "A multi-agent orchestration platform deployed in a live e-commerce operation running three regional stores. One supervisor agent (WAZIR) coordinates six specialists — automation & system health, support memory, market intelligence, SEO & content, sales & retention, and ad platform management — each locked to a Read / Recommend / Execute permission tier so no agent can act beyond its mandate. Every decision is written to a full audit trail, and a Telegram-based kill switch lets an operator pause every agent's write access instantly, no code deploy required.",
    highlights: [
      '6 specialist agents under one supervisor',
      '3-tier permission model: Read / Recommend / Execute',
      'Telegram kill switch — /pause, /resume, /status',
      'Full audit trail: trigger → decision → approval → result',
      'Live ops dashboard: sales, automation health, department status',
    ],
    tags: ['Custom Automation Engine', 'Multi-Agent Orchestration', 'Governance & Permissions', 'Telegram Bot', 'Ops Dashboard'],
  },
  {
    id: 'instagram',
    icon: Instagram,
    category: 'AI Customer Service — Instagram',
    title: 'Instagram Support Agent',
    image: '/instagram-cover.jpg',
    video: '/instagram-demo.mp4',
    tagline: 'One AI, four brand accounts, zero public order leaks.',
    description:
      "An always-on AI support agent handling DMs and comments across four Instagram business accounts for a multi-brand retailer. It looks up live order status across three regional Shopify stores and replies in a fixed persona per account. Comments get a friendly public acknowledgement while the real answer — order numbers, shipping details — goes out privately. Built-in loop protection stops the bot from ever replying to itself, and anything it can't resolve is escalated straight into a Telegram group where a human can take over mid-conversation with a single command.",
    highlights: [
      'Handles 4 Instagram accounts with distinct personas',
      'Cross-store order lookup across 3 Shopify stores',
      'Public acknowledgement + private detailed reply on comments',
      'Self-reply loop protection (dedupe + heuristic filter)',
      'Live human handoff via Telegram (/now, /done, /list)',
    ],
    tags: ['Custom Automation Engine', 'Instagram Graph API', 'Local LLM', 'Shopify API', 'Telegram Handoff'],
  },
  {
    id: 'whatsapp',
    icon: MessageCircle,
    category: 'AI Customer Service — WhatsApp',
    title: 'WhatsApp Support Agent',
    image: '/whatsapp-cover.jpg',
    video: '/whatsapp-demo.mp4',
    tagline: 'Region-aware support that knows which store your order is in.',
    description:
      "A WhatsApp support bot that detects a customer's region from their phone number, pulls their order from the matching Shopify store out of three, and resolves shipping, sizing, returns and promo questions on its own. Requests that need a human — a damage claim, a return decision, an explicit ask — get handed to the team on Telegram, and the bot goes quiet while a person is handling the chat. An automatic daily digest at close of business summarizes every conversation, escalation and flagged issue for the team.",
    highlights: [
      'Region detection routes orders to the right regional store',
      'Structured AI output: reply / escalate / reason / buttons',
      'Human handoff with hold window, bot stays silent mid-handover',
      'Automatic daily digest of conversations & escalations',
      'Handles media attachments and 12-message conversation memory',
    ],
    tags: ['Custom Automation Engine', 'WhatsApp Business API', 'Local LLM', 'Shopify GraphQL', 'Telegram Escalation'],
  },
  {
    id: 'email',
    icon: Mail,
    category: 'AI Customer Service — Email',
    title: 'Email Support Agent',
    image: '/email-cover.jpg',
    video: '/email-demo.mp4',
    tagline: 'Reads the inbox, checks three stores, drafts before it ever sends.',
    description:
      "An inbox-monitoring agent that checks a shared support mailbox every minute, filters out noise — newsletters, bounces, system senders — and answers real customer emails with full order context pulled from three Shopify stores in parallel, so the AI never has to guess which store an order belongs to. Confident answers go out as threaded replies with the company signature; anything uncertain becomes a draft and pings the support team on Telegram instead of guessing. A mail-loop safeguard automatically pauses the bot if it starts replying too fast to the same address.",
    highlights: [
      'Polls inbox every minute, filters automated senders',
      'Parallel order lookup across 3 Shopify stores before the AI replies',
      'Confident replies auto-sent; uncertain ones held as drafts',
      'Mail-loop protection pauses the bot after rapid-fire replies',
      'Telegram alerts for escalations and workflow failures',
    ],
    tags: ['Custom Automation Engine', 'Outlook / Graph API', 'Local LLM', 'Shopify GraphQL', 'Auto-Escalation'],
  },
];

export default function AutomationSystems({ isDarkMode, themeClasses }) {
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
      <div className="flex lg:grid lg:grid-cols-2 gap-4 lg:gap-5 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-px-4 -mx-4 px-4 pb-4 lg:mx-0 lg:px-0 lg:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {SYSTEMS.map((system) => {
          const Icon = system.icon;
          return (
            <button
              key={system.id}
              onClick={() => setActive(system)}
              className={`group relative overflow-hidden rounded-[2rem] text-left flex flex-col shadow-[0_10px_45px_rgba(0,_0,_0,_0.25)] shrink-0 w-[85vw] max-w-[380px] snap-center lg:w-auto lg:max-w-none lg:shrink ${themeClasses.card} ${system.flagship ? 'lg:col-span-2' : ''}`}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={system.image}
                  alt={system.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    <Play size={22} fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Icon size={26} />
                  </div>
                  <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-2">{system.category}</p>
                <h3 className={`text-xl md:text-2xl font-black leading-tight mb-3 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{system.title}</h3>
                <p className={`${themeClasses.mutedText} text-sm leading-relaxed mb-6`}>{system.tagline}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {system.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${themeClasses.subCard} ${themeClasses.mutedText}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <p className={`lg:hidden mt-1 text-center text-[10px] font-bold uppercase tracking-[0.25em] ${themeClasses.mutedText}`}>
        Swipe · {SYSTEMS.length} systems
      </p>

      {active && (
        <div role="dialog" aria-modal="true" aria-label={active.title} className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActive(null)} />
          <div className={`relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[2rem] overflow-hidden shadow-2xl ${themeClasses.card}`}>
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
            >
              <X size={18} />
            </button>
            <div className="aspect-video bg-black">
              <video src={active.video} controls preload="metadata" poster={active.image} className="w-full h-full object-contain" />
            </div>
            <div className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
                <active.icon size={26} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-2">{active.category}</p>
              <h3 className={`text-2xl md:text-3xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{active.title}</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-neutral-700'} text-sm font-semibold mb-6`}>{active.tagline}</p>
              <p className={`${themeClasses.mutedText} leading-relaxed mb-6`}>{active.description}</p>

              <ul className="mb-6 space-y-2">
                {active.highlights.map((point) => (
                  <li key={point} className={`flex items-start gap-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-neutral-700'}`}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-8">
                {active.tags.map((tag) => (
                  <span key={tag} className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${themeClasses.subCard} ${themeClasses.mutedText}`}>
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href="#contact"
                onClick={() => setActive(null)}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-3 rounded-xl font-bold transition-all"
              >
                <Send size={18} /> Request This For My Business
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
