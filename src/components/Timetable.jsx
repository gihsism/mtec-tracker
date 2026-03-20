import { useState, useMemo } from 'react';
import { COURSE_SCHEDULES } from '../data/courseSchedules';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_FULL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Color palette for courses — each enrolled course gets a consistent color
const COLORS = [
  { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-800', dot: 'bg-blue-500' },
  { bg: 'bg-emerald-100', border: 'border-emerald-300', text: 'text-emerald-800', dot: 'bg-emerald-500' },
  { bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-800', dot: 'bg-purple-500' },
  { bg: 'bg-amber-100', border: 'border-amber-300', text: 'text-amber-800', dot: 'bg-amber-500' },
  { bg: 'bg-rose-100', border: 'border-rose-300', text: 'text-rose-800', dot: 'bg-rose-500' },
  { bg: 'bg-cyan-100', border: 'border-cyan-300', text: 'text-cyan-800', dot: 'bg-cyan-500' },
  { bg: 'bg-orange-100', border: 'border-orange-300', text: 'text-orange-800', dot: 'bg-orange-500' },
  { bg: 'bg-indigo-100', border: 'border-indigo-300', text: 'text-indigo-800', dot: 'bg-indigo-500' },
  { bg: 'bg-teal-100', border: 'border-teal-300', text: 'text-teal-800', dot: 'bg-teal-500' },
  { bg: 'bg-pink-100', border: 'border-pink-300', text: 'text-pink-800', dot: 'bg-pink-500' },
];

function getMonday(d) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function addDays(d, n) {
  const date = new Date(d);
  date.setDate(date.getDate() + n);
  return date;
}

function formatDate(d) {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function formatWeekRange(monday) {
  const sat = addDays(monday, 5);
  const monMonth = monday.toLocaleDateString('en-GB', { month: 'short' });
  const satMonth = sat.toLocaleDateString('en-GB', { month: 'short' });
  if (monMonth === satMonth) {
    return `${monday.getDate()} – ${sat.getDate()} ${monMonth} ${monday.getFullYear()}`;
  }
  return `${monday.getDate()} ${monMonth} – ${sat.getDate()} ${satMonth} ${monday.getFullYear()}`;
}

function dateKey(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isToday(d) {
  const now = new Date();
  return dateKey(d) === dateKey(now);
}

function isPast(dateStr) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return new Date(dateStr) < now;
}

export default function Timetable({ enrolledCourses }) {
  const [weekOffset, setWeekOffset] = useState(0);

  // Build a map: courseId → color index
  const colorMap = useMemo(() => {
    const map = {};
    enrolledCourses.forEach((c, i) => {
      map[c.id] = COLORS[i % COLORS.length];
    });
    return map;
  }, [enrolledCourses]);

  // Get all sessions for enrolled courses, indexed by date
  const { sessionsByDate, allWeeks } = useMemo(() => {
    const byDate = {};
    const weekSet = new Set();

    for (const course of enrolledCourses) {
      const schedule = COURSE_SCHEDULES[course.id];
      if (!schedule) continue;

      for (const session of schedule.sessions) {
        if (!byDate[session.date]) byDate[session.date] = [];
        byDate[session.date].push({
          courseId: course.id,
          courseName: schedule.name,
          ...session,
        });
        const mon = getMonday(new Date(session.date));
        weekSet.add(dateKey(mon));
      }
    }

    // Sort sessions within each day by start time
    for (const date in byDate) {
      byDate[date].sort((a, b) => a.start.localeCompare(b.start));
    }

    // Collect weeks that have sessions, sorted
    const weeks = [...weekSet].sort();
    return { sessionsByDate: byDate, allWeeks: weeks };
  }, [enrolledCourses]);

  // Current week's Monday
  const today = new Date();
  const currentMonday = getMonday(today);

  // Navigate based on weeks with sessions
  const baseMonday = new Date(currentMonday);
  const monday = addDays(baseMonday, weekOffset * 7);

  // Find next/prev weeks with sessions
  const mondayKey = dateKey(monday);
  const currentWeekIdx = allWeeks.indexOf(mondayKey);
  const hasSessionsThisWeek = currentWeekIdx !== -1;

  // Check if this week has any sessions
  const weekDays = Array.from({ length: 6 }, (_, i) => {
    const day = addDays(monday, i);
    const key = dateKey(day);
    return { date: day, key, sessions: sessionsByDate[key] || [] };
  });

  const weekHasSessions = weekDays.some(d => d.sessions.length > 0);

  // Find nearest weeks with sessions for jump buttons
  const nextSessionWeek = allWeeks.find(w => w > mondayKey);
  const prevSessionWeek = [...allWeeks].reverse().find(w => w < mondayKey);

  // Semester date range for the mini-overview
  const semesterStart = new Date('2026-01-26'); // earliest course date
  const semesterEnd = new Date('2026-07-04'); // latest course date

  // Count upcoming sessions
  const upcomingSessions = useMemo(() => {
    const todayStr = dateKey(new Date());
    let count = 0;
    for (const date in sessionsByDate) {
      if (date >= todayStr) count += sessionsByDate[date].length;
    }
    return count;
  }, [sessionsByDate]);

  // Upcoming block courses (next 4 weeks)
  const upcomingBlocks = useMemo(() => {
    const todayStr = dateKey(new Date());
    const fourWeeks = dateKey(addDays(new Date(), 28));
    const blocks = [];
    for (const course of enrolledCourses) {
      const schedule = COURSE_SCHEDULES[course.id];
      if (!schedule || schedule.type === 'weekly') continue;
      const futureSessions = schedule.sessions.filter(s => s.date >= todayStr && s.date <= fourWeeks);
      if (futureSessions.length > 0) {
        blocks.push({
          courseId: course.id,
          name: schedule.name,
          sessions: futureSessions,
          color: colorMap[course.id],
        });
      }
    }
    blocks.sort((a, b) => a.sessions[0].date.localeCompare(b.sessions[0].date));
    return blocks;
  }, [enrolledCourses, colorMap]);

  if (enrolledCourses.length === 0) return null;

  const hasAnySchedule = enrolledCourses.some(c => COURSE_SCHEDULES[c.id]);
  if (!hasAnySchedule) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Semester Timetable</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {enrolledCourses.filter(c => COURSE_SCHEDULES[c.id]).length} courses scheduled
            {upcomingSessions > 0 && ` · ${upcomingSessions} upcoming sessions`}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setWeekOffset(0)}
            className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
              weekOffset === 0
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            Today
          </button>
        </div>
      </div>

      {/* Week navigation */}
      <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between bg-gray-50">
        <button
          onClick={() => setWeekOffset(w => w - 1)}
          className="p-1 rounded hover:bg-gray-200 transition-colors text-gray-500"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm font-medium text-gray-700">
          {formatWeekRange(monday)}
        </span>
        <button
          onClick={() => setWeekOffset(w => w + 1)}
          className="p-1 rounded hover:bg-gray-200 transition-colors text-gray-500"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Jump to next sessions if current week is empty */}
      {!weekHasSessions && (
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 text-center">
          <p className="text-xs text-gray-400 mb-2">No sessions this week</p>
          <div className="flex justify-center gap-2">
            {prevSessionWeek && (
              <button
                onClick={() => {
                  const target = getMonday(new Date(prevSessionWeek));
                  const diff = Math.round((target - currentMonday) / (7 * 86400000));
                  setWeekOffset(diff);
                }}
                className="text-xs text-blue-600 hover:underline"
              >
                ← Previous sessions
              </button>
            )}
            {nextSessionWeek && (
              <button
                onClick={() => {
                  const target = getMonday(new Date(nextSessionWeek));
                  const diff = Math.round((target - currentMonday) / (7 * 86400000));
                  setWeekOffset(diff);
                }}
                className="text-xs text-blue-600 hover:underline"
              >
                Next sessions →
              </button>
            )}
          </div>
        </div>
      )}

      {/* Weekly grid */}
      <div className="grid grid-cols-6 divide-x divide-gray-100">
        {weekDays.map(({ date, key, sessions }) => {
          const dayIdx = (date.getDay() + 6) % 7; // Mon=0
          const today_ = isToday(date);
          return (
            <div key={key} className={`min-h-[120px] ${today_ ? 'bg-blue-50/50' : ''}`}>
              {/* Day header */}
              <div className={`px-2 py-1.5 text-center border-b border-gray-100 ${today_ ? 'bg-blue-100/50' : 'bg-gray-50'}`}>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider">{DAYS[dayIdx]}</div>
                <div className={`text-sm font-medium ${today_ ? 'text-blue-700' : 'text-gray-700'}`}>
                  {date.getDate()}
                </div>
              </div>
              {/* Sessions */}
              <div className="p-1 space-y-1">
                {sessions.map((s, i) => {
                  const color = colorMap[s.courseId] || COLORS[0];
                  const past = isPast(s.date);
                  return (
                    <div
                      key={`${s.courseId}-${i}`}
                      className={`rounded p-1.5 border text-[10px] leading-tight ${color.bg} ${color.border} ${color.text} ${past ? 'opacity-50' : ''}`}
                    >
                      <div className="font-semibold truncate">{s.courseName}</div>
                      <div className="mt-0.5 opacity-75">{s.start}–{s.end}</div>
                      <div className="mt-0.5 opacity-60 truncate">{s.room}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Upcoming block courses */}
      {upcomingBlocks.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          <h3 className="text-xs font-medium text-gray-500 mb-2">Upcoming block courses (next 4 weeks)</h3>
          <div className="space-y-1.5">
            {upcomingBlocks.map(block => (
              <div key={block.courseId} className="flex items-start gap-2">
                <span className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${block.color?.dot || 'bg-gray-400'}`} />
                <div className="text-xs">
                  <span className="font-medium text-gray-800">{block.name}</span>
                  <span className="text-gray-400 ml-1.5">
                    {block.sessions.map(s => {
                      const d = new Date(s.date);
                      return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
                    }).join(', ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {enrolledCourses.filter(c => COURSE_SCHEDULES[c.id]).map(c => {
            const color = colorMap[c.id];
            const schedule = COURSE_SCHEDULES[c.id];
            return (
              <div key={c.id} className="flex items-center gap-1 text-[10px] text-gray-600">
                <span className={`w-2 h-2 rounded-full ${color?.dot || 'bg-gray-400'}`} />
                <span className="truncate max-w-[150px]">{schedule?.name || c.name}</span>
                <span className="text-gray-400">
                  ({schedule?.type === 'block' ? 'block' : 'weekly'})
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
