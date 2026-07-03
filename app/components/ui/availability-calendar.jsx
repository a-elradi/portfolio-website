"use client";
import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

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

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function formatDateKey(year, month, day) {
  const mm = String(month + 1).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
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

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMonthOffset((v) => v - 1)}
            aria-label="Previous month"
            className={`w-9 h-9 inline-flex items-center justify-center rounded-full border ${isDarkMode ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-neutral-200 text-neutral-600 hover:bg-neutral-100'}`}
          >
            <ChevronLeft size={16} />
          </button>
          <h3 className={`text-xl font-black min-w-[180px] text-center ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{monthLabel}</h3>
          <button
            onClick={() => setMonthOffset((v) => v + 1)}
            aria-label="Next month"
            className={`w-9 h-9 inline-flex items-center justify-center rounded-full border ${isDarkMode ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-neutral-200 text-neutral-600 hover:bg-neutral-100'}`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="hidden sm:flex items-center gap-5 text-[11px] font-bold uppercase tracking-wider">
          <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><span className={themeClasses.mutedText}>Open for meetings</span></span>
          <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-gray-400" /><span className={themeClasses.mutedText}>Project / workshop</span></span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {WEEKDAY_LABELS.map((w, i) => (
          <div key={i} className={`text-center text-[11px] font-black uppercase ${themeClasses.mutedText}`}>{w}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {cells.map((day, idx) => {
          if (!day) return <div key={idx} />;
          const dateKey = formatDateKey(year, month, day);
          const event = eventsByDate[dateKey];
          const isAvailable = event?.type === 'available';
          const isInfo = event && !isAvailable;

          return (
            <button
              key={idx}
              type="button"
              disabled={!isAvailable}
              onClick={() => isAvailable && onRequestDate(dateKey)}
              title={event?.label}
              className={`relative aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-bold transition-all ${
                isAvailable
                  ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25 cursor-pointer'
                  : isInfo
                  ? `${themeClasses.subCard} ${themeClasses.mutedText} cursor-default`
                  : `${isDarkMode ? 'text-gray-500' : 'text-neutral-400'} cursor-default`
              }`}
            >
              {day}
              {event && (
                <span className={`absolute bottom-1.5 w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-emerald-400' : 'bg-gray-400'}`} />
              )}
            </button>
          );
        })}
      </div>

      <p className={`mt-6 flex items-center gap-2 text-xs ${themeClasses.mutedText}`}>
        <CalendarDays size={14} /> Click a highlighted day to request that time slot — I'll follow up by email.
      </p>
    </div>
  );
}
