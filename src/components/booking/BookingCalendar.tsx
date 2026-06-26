"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BookingCalendarProps {
  selectedDate: string;
  onSelect: (date: string) => void;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function isFriday(date: Date) { return date.getDay() === 5; }
function isPast(date: Date) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return date < today;
}

export default function BookingCalendar({ selectedDate, onSelect }: BookingCalendarProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const handleSelect = (day: number) => {
    const date = new Date(viewYear, viewMonth, day);
    if (isFriday(date) || isPast(date)) return;
    const iso = date.toISOString().split("T")[0];
    onSelect(iso);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5">
      {/* Month Nav */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h3 className="text-white font-semibold">{MONTHS[viewMonth]} {viewYear}</h3>
        <button onClick={nextMonth} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className={`text-center text-xs font-medium py-1 ${d === "Fri" ? "text-red-400" : "text-white/40"}`}>{d}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const date = new Date(viewYear, viewMonth, day);
          const disabled = isFriday(date) || isPast(date);
          const iso = date.toISOString().split("T")[0];
          const isSelected = iso === selectedDate;
          const isToday = iso === today.toISOString().split("T")[0];

          return (
            <button key={day} onClick={() => handleSelect(day)} disabled={disabled}
              className={`h-9 w-9 rounded-lg text-sm font-medium transition-all mx-auto flex items-center justify-center
                ${isSelected ? "bg-glamora-gold text-glamora-dark font-bold shadow-lg shadow-glamora-gold/30" : ""}
                ${isToday && !isSelected ? "border border-glamora-gold/50 text-glamora-gold" : ""}
                ${disabled ? "text-white/20 cursor-not-allowed" : !isSelected ? "text-white/80 hover:bg-white/10" : ""}
              `}>
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
