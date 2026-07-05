"use client";
import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';

const CONTACT_EMAIL = 'Abdallaelsiddig.m@gmail.com';

export default function RequestModal({ request, onClose, isDarkMode, themeClasses }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [sent, setSent] = useState(false);

  // Reset the form whenever a new request opens — the component stays mounted
  // between requests, so without this a past submission leaves the modal stuck
  // on the confirmation screen.
  useEffect(() => {
    if (request) {
      setName('');
      setEmail('');
      setDetails('');
      setSent(false);
    }
  }, [request]);

  useEffect(() => {
    if (!request) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [request, onClose]);

  if (!request) return null;

  const isBooking = request.type === 'booking';
  const title = isBooking ? 'Request a meeting' : `Request: ${request.serviceName}`;
  const subtitle = isBooking
    ? `Preferred date: ${request.date}`
    : 'Tell me a bit about what you need and I will get back to you.';

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = isBooking
      ? `Meeting request for ${request.date}`
      : `Service request: ${request.serviceName}`;
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      isBooking ? `Preferred date: ${request.date}` : `Service: ${request.serviceName}`,
      '',
      details,
    ];
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    setSent(true);
    window.location.href = mailto;
  };

  return (
    <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-[70] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative z-10 w-full max-w-md rounded-[2rem] p-8 shadow-2xl ${themeClasses.card}`}>
        <button
          onClick={onClose}
          aria-label="Close"
          className={`absolute top-6 right-6 ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-neutral-400 hover:text-neutral-900'}`}
        >
          <X size={20} />
        </button>

        {sent ? (
          <div className="py-6 text-center">
            <CheckCircle2 size={40} className="mx-auto mb-4 text-emerald-400" />
            <h3 className={`text-xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Opening your email client…</h3>
            <p className={`${themeClasses.mutedText} text-sm`}>If nothing happened, email me directly at {CONTACT_EMAIL}.</p>
          </div>
        ) : (
          <>
            <h3 className={`text-2xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{title}</h3>
            <p className={`${themeClasses.mutedText} text-sm mb-6`}>{subtitle}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/40 ${themeClasses.subCard} ${isDarkMode ? 'text-white placeholder:text-gray-500' : 'text-neutral-900 placeholder:text-neutral-400'}`}
              />
              <input
                required
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/40 ${themeClasses.subCard} ${isDarkMode ? 'text-white placeholder:text-gray-500' : 'text-neutral-900 placeholder:text-neutral-400'}`}
              />
              <textarea
                required
                rows={4}
                placeholder={isBooking ? "What would you like to discuss?" : "Describe your project, timeline, budget, etc."}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className={`w-full rounded-xl px-4 py-3 text-sm outline-none resize-none focus:ring-2 focus:ring-emerald-500/40 ${themeClasses.subCard} ${isDarkMode ? 'text-white placeholder:text-gray-500' : 'text-neutral-900 placeholder:text-neutral-400'}`}
              />
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20"
              >
                <Send size={16} /> Send request
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
