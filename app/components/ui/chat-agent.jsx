"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Sparkles } from 'lucide-react';

const KNOWLEDGE_BASE = [
  {
    keywords: ['skill', 'tech', 'stack', 'language', 'know', 'good at'],
    reply: "Abdalla works across Python, C++, JavaScript, and SQL, with hands-on robotics experience in MQTT, embedded systems, and automation, plus AI/computer vision work in OpenCV, TensorFlow, YOLO, and MindSpore. Check the Skills section for the full breakdown.",
  },
  {
    keywords: ['experience', 'work', 'job', 'career', 'background'],
    reply: "He's currently AI Automation Engineer at Glam Moda WLL (previously IT Technical Support & Web Developer there), President & Founder of the IoT Club at University of Technology Bahrain, and a Robotics & IoT Workshop Instructor there too. See the Experience section for details.",
  },
  {
    keywords: ['project', 'built', 'robot', 'portfolio', 'work you'],
    reply: "Highlights include an AMR warehouse robot with SLAM navigation, TECHTRAP (an AI rehab & education system), the FireX firefighting robot, several computer vision projects, IoT automation systems, and Robonexus combat robotics. They're all in the Projects section with images.",
  },
  {
    keywords: ['certificate', 'certification', 'credential', 'course'],
    reply: "Abdalla holds certifications spanning networking (Cisco, IP Networking), AI (Gemini, Intro to Modern AI), cybersecurity awareness, Huawei ICT Competition, and more — all viewable in the Certificates section.",
  },
  {
    keywords: ['location', 'where', 'based', 'live', 'country', 'city'],
    reply: "He's based in Manama, Bahrain.",
  },
  {
    keywords: ['contact', 'email', 'reach', 'phone'],
    reply: `You can reach him directly at Abdallaelsiddig.m@gmail.com, or use the Contact section at the bottom of the page.`,
  },
  {
    keywords: ['resume', 'cv'],
    reply: "You can view or download his resume from the Contact section — there are buttons for both.",
  },
  {
    keywords: ['service', 'offer', 'provide', 'hire you for', 'what can you do'],
    reply: "Abdalla builds websites & web apps, automation/systems integration, AI agents & intelligent systems, and custom applications. Take a look at the Services section — each card has a 'Request this service' button.",
    action: 'services',
  },
  {
    keywords: ['book', 'meeting', 'schedule', 'call', 'available', 'availability', 'talk', 'chat with him'],
    reply: "Happy to help you set that up. Scroll down to the Availability calendar — pick an open day and it'll open a quick request form, or I can open it for you now.",
    action: 'availability',
  },
  {
    keywords: ['hire', 'work with', 'collaborate'],
    reply: "Great to hear! The fastest way is to book a meeting via the Availability calendar, or send a service request from the Services section with your project details.",
    action: 'availability',
  },
];

const FALLBACK_REPLY = "I'm a simple FAQ assistant, so I might not have that one — try asking about skills, experience, projects, certificates, services, or booking a meeting. You can also email Abdalla directly at Abdallaelsiddig.m@gmail.com.";

const QUICK_REPLIES = ['What are your skills?', 'What services do you offer?', 'Book a meeting', 'How can I contact you?'];

function matchReply(text) {
  const lower = text.toLowerCase();
  for (const entry of KNOWLEDGE_BASE) {
    if (entry.keywords.some((k) => lower.includes(k))) {
      return entry;
    }
  }
  return { reply: FALLBACK_REPLY };
}

export default function ChatAgent({ isDarkMode, themeClasses, onNavigate, accentColor = '#10b981' }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi, I'm Abdalla's assistant. Ask me about his skills, projects, experience, or services — or say you'd like to book a meeting." },
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const respond = (text) => {
    const match = matchReply(text);
    setMessages((prev) => [...prev, { role: 'user', text }, { role: 'bot', text: match.reply }]);
    if (match.action) {
      setTimeout(() => onNavigate(match.action), 400);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    respond(trimmed);
    setInput('');
  };

  return (
    <>
      <div className={`fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3 ${open ? '' : 'animate-gentle-float'}`}>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
          style={{ '--orb-color': accentColor }}
          className="ai-orb relative inline-flex items-center justify-center w-16 h-16 rounded-full text-white transition-transform hover:scale-105"
        >
          <span className="ai-orb-shine" aria-hidden="true" />
          {open ? <X size={22} className="relative z-10" /> : <Sparkles size={22} className="relative z-10" />}
        </button>
      </div>

      {open && (
        <div className={`fixed bottom-24 right-6 z-[60] w-[22rem] max-w-[calc(100vw-3rem)] h-[28rem] rounded-[1.75rem] shadow-2xl flex flex-col overflow-hidden ${themeClasses.card}`}>
          <div className={`px-5 py-4 flex items-center gap-3 border-b ${isDarkMode ? 'border-white/10' : 'border-neutral-200'}`}>
            <div className="w-9 h-9 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <Sparkles size={18} />
            </div>
            <div>
              <p className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Ask about Abdalla</p>
              <p className="text-[11px] text-emerald-400 uppercase tracking-widest font-bold">FAQ assistant</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-emerald-500 text-white'
                      : `${themeClasses.subCard} ${isDarkMode ? 'text-gray-200' : 'text-neutral-700'}`
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 pb-3 flex flex-wrap gap-2">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() => respond(q)}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-full border transition-colors ${
                  isDarkMode ? 'border-white/10 text-gray-300 hover:border-emerald-500/50 hover:text-emerald-300' : 'border-neutral-200 text-neutral-600 hover:border-emerald-500/50 hover:text-emerald-600'
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          <form onSubmit={handleSend} className={`px-4 py-3 flex items-center gap-2 border-t ${isDarkMode ? 'border-white/10' : 'border-neutral-200'}`}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className={`flex-1 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/40 ${themeClasses.subCard} ${isDarkMode ? 'text-white placeholder:text-gray-500' : 'text-neutral-900 placeholder:text-neutral-400'}`}
            />
            <button
              type="submit"
              aria-label="Send"
              className="w-10 h-10 shrink-0 inline-flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
