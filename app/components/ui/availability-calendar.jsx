"use client";
import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

const WEEKDAY_LABELS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function formatDateKey(year, month, day) {
  const mm = String(month + 1).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
}

// Recurring monthly availability rule:
// available every Saturday, Sunday, and Tuesday, plus the 21st and the
// 23rd-30th stretch — except the 14th, which is never available.
function isAvailableDay(day, weekday) {
  if (day === 14) return false;
  if (weekday === 0 || weekday === 2 || weekday === 6) return true;
  if (day === 21) return true;
  if (day >= 23 && day <= 30) return true;
  return false;
}

function nextAvailableDate() {
  const cursor = new Date();
  for (let i = 0; i < 60; i++) {
    if (isAvailableDay(cursor.getDate(), cursor.getDay())) {
      return formatDateKey(cursor.getFullYear(), cursor.getMonth(), cursor.getDate());
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return null;
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

  const upcoming = useMemo(() => nextAvailableDate(), []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Any questions about a project?</h3>
          <p className={`text-sm ${themeClasses.mutedText}`}>Feel free to reach out — book a 30 min call.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className={themeClasses.mutedText}>Open for meetings</span>
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
            const weekday = (firstWeekday + (day - 1)) % 7;
            const dateKey = formatDateKey(year, month, day);
            const available = isAvailableDay(day, weekday);

            return (
              <div key={idx} className="flex items-center justify-center py-1">
                <button
                  type="button"
                  disabled={!available}
                  onClick={() => available && onRequestDate(dateKey)}
                  title={available ? 'Open for meetings' : undefined}
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    available
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600 cursor-pointer shadow-[0_0_16px_rgba(16,185,129,0.35)]'
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
            onClick={() => onRequestDate(upcoming)}
            aria-label="Request the next open slot"
            title={`Request ${upcoming}`}
            className="absolute -bottom-5 -right-5 w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-transform hover:scale-105"
          >
            <ArrowUpRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
