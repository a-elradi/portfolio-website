"use client";
import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

// Edit this list to reflect real projects, workshops, and open days.
// type: 'available' (bookable), 'project', or 'workshop' (informational only).
const CALENDAR_EVENTS = [
  { date: '2026-07-08', type: 'available', label: 'Open for meetings' },
  { date: '2026-07-09', type: 'available', label: 'Open for meetings' },
  { date: '2026-07-10', type: 'workshop', label: 'IoT & Robotics Workshop' },
  { date: '2026-07-14', type: 'available', label: 'Open for meetings' },
  { date: '2026-07-15', type: 'project', label: 'AMR Robot demo day' },
  { date: '2026-07-21', type: 'available', label: 'Open for meetings' },
  { date: '2026-07-22', type: 'available', label: 'Open for meetings' },
  { date: '2026-07-28', type: 'project', label: 'Client delivery deadline' },
  { date: '2026-08-04', type: 'available', label: 'Open for meetings' },
  { date: '2026-08-05', type: 'available', label: 'Open for meetings' },
  { date: '2026-08-12', type: 'workshop', label: 'Robotics Club Workshop' },
];

const eventsByDate = CALENDAR_EVENTS.reduce((acc, ev) => {
  acc[ev.date] = ev;
  return acc;
}, {});

const WEEKDAY_LABELS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function formatDateKey(year, month, day) {
  const mm = String(month + 1).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
}

function nextAvailableDate() {
  const todayKey = formatDateKey(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  return CALENDAR_EVENTS.find((ev) => ev.type === 'available' && ev.date >= todayKey) || CALENDAR_EVENTS.find((ev) => ev.type === 'available');
}

export default function AvailabilityCalendar({ isDarkMode, themeClasses, onRequestDate }) {
  const base = new Date();
  const [monthOffset, setMonthOffset] = useState(0);

  const viewDate = new Date(base.getFullYear(), base.getMonth() + monthOffset, 1);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthLabel = viewDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();

  const cells = useMemo(() => {
    const arr = [];
    for (let i = 0; i < firstWeekday; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(d);
    return arr;
  }, [firstWeekday, daysInMonth]);

  const upcoming = nextAvailableDate();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Any questions about a project?</h3>
          <p className={`text-sm ${themeClasses.mutedText}`}>Feel free to reach out — book a 30 min call.</p>
        </div>
        <div className="hidden sm:flex items-center gap-5 text-[11px] font-bold uppercase tracking-wider">
          <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><span className={themeClasses.mutedText}>Open</span></span>
          <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-gray-400" /><span className={themeClasses.mutedText}>Project / workshop</span></span>
        </div>
      </div>

      <div className={`relative rounded-[1.75rem] p-6 sm:p-8 border ${isDarkMode ? 'border-white/10 bg-black/20' : 'border-neutral-200 bg-white'}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-baseline gap-3">
            <h4 className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{monthLabel}</h4>
            <span className={`text-xs font-bold ${themeClasses.mutedText}`}>30 min call</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMonthOffset((v) => v - 1)}
              aria-label="Previous month"
              className={`w-8 h-8 inline-flex items-center justify-center rounded-full border ${isDarkMode ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-neutral-200 text-neutral-600 hover:bg-neutral-100'}`}
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => setMonthOffset((v) => v + 1)}
              aria-label="Next month"
              className={`w-8 h-8 inline-flex items-center justify-center rounded-full border ${isDarkMode ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-neutral-200 text-neutral-600 hover:bg-neutral-100'}`}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1.5 mb-2">
          {WEEKDAY_LABELS.map((w) => (
            <div key={w} className={`text-center text-[10px] font-black uppercase tracking-wider ${themeClasses.mutedText}`}>{w}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {cells.map((day, idx) => {
            if (!day) return <div key={idx} />;
            const dateKey = formatDateKey(year, month, day);
            const event = eventsByDate[dateKey];
            const isAvailable = event?.type === 'available';
            const isInfo = event && !isAvailable;

            return (
              <div key={idx} className="flex items-center justify-center py-1">
                <button
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => isAvailable && onRequestDate(dateKey)}
                  title={event?.label}
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    isAvailable
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600 cursor-pointer shadow-[0_0_16px_rgba(16,185,129,0.35)]'
                      : isInfo
                      ? `${themeClasses.subCard} ${themeClasses.mutedText} cursor-default`
                      : `${isDarkMode ? 'text-gray-500' : 'text-neutral-400'} cursor-default`
                  }`}
                >
                  {day}
                </button>
              </div>
            );
          })}
        </div>

        {upcoming && (
          <button
            onClick={() => onRequestDate(upcoming.date)}
            aria-label="Request the next open slot"
            title={`Request ${upcoming.date}`}
            className="absolute -bottom-5 -right-5 w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-transform hover:scale-105"
          >
            <ArrowUpRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
