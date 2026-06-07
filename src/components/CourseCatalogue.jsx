import { useState, useMemo } from 'react';
import { ALL_COURSES, OFFERED_HS2026, HS2026_NOT_RUNNING } from '../data/mtecRequirements';

const TYPE_LABELS = {
  core: 'Core',
  skill: 'Skill-based',
  elective: 'Elective',
  other: 'Other',
};

const TYPE_BADGE = {
  core: 'bg-purple-50 text-purple-700 border-purple-200',
  skill: 'bg-amber-50 text-amber-700 border-amber-200',
  elective: 'bg-sky-50 text-sky-700 border-sky-200',
  other: 'bg-gray-50 text-gray-600 border-gray-200',
};

function FilterChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
        active
          ? 'bg-blue-600 text-white border-blue-600'
          : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
      }`}
    >
      {children}
    </button>
  );
}

export default function CourseCatalogue({ enrolledIds, completedIds, onToggleEnrolled }) {
  const [search, setSearch] = useState('');
  const [availability, setAvailability] = useState('hs2026'); // 'hs2026' | 'all'
  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | core | skill | elective

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ALL_COURSES.filter(c => {
      if (availability === 'hs2026' && !OFFERED_HS2026.has(c.id)) return false;
      if (typeFilter !== 'all' && c.type !== typeFilter) return false;
      if (q && !(c.name.toLowerCase().includes(q) || c.id.includes(q))) return false;
      return true;
    }).sort((a, b) => {
      // offered first when showing all
      const ao = OFFERED_HS2026.has(a.id) ? 0 : 1;
      const bo = OFFERED_HS2026.has(b.id) ? 0 : 1;
      if (ao !== bo) return ao - bo;
      return a.name.localeCompare(b.name);
    });
  }, [search, availability, typeFilter]);

  const selectedCount = ALL_COURSES.filter(c => enrolledIds.has(c.id)).length;
  const selectedCP = ALL_COURSES.filter(c => enrolledIds.has(c.id)).reduce((s, c) => s + (c.cp || 0), 0);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Course Catalogue</h2>
        <p className="text-sm text-gray-500">
          Browse MAS MTEC courses and click to add them to your semester. Default view shows courses
          offered in <span className="font-medium text-gray-700">Autumn 2026</span>.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by course name or number (e.g. AI, 363-1209)…"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-400 mr-1">Show:</span>
          <FilterChip active={availability === 'hs2026'} onClick={() => setAvailability('hs2026')}>
            Autumn 2026
          </FilterChip>
          <FilterChip active={availability === 'all'} onClick={() => setAvailability('all')}>
            All semesters
          </FilterChip>
          <span className="w-px h-5 bg-gray-200 mx-1" />
          {['all', 'core', 'skill', 'elective'].map(t => (
            <FilterChip key={t} active={typeFilter === t} onClick={() => setTypeFilter(t)}>
              {t === 'all' ? 'All types' : TYPE_LABELS[t]}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* Selection summary */}
      {selectedCount > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 text-sm text-blue-800">
          <span className="font-semibold">{selectedCount}</span> course{selectedCount !== 1 ? 's' : ''} selected ·{' '}
          <span className="font-semibold">{selectedCP} CP</span> — these count as enrolled in your progress.
        </div>
      )}

      {/* Course list */}
      <div className="text-xs text-gray-400">{filtered.length} course{filtered.length !== 1 ? 's' : ''}</div>
      <div className="grid sm:grid-cols-2 gap-3">
        {filtered.map(course => {
          const isEnrolled = enrolledIds.has(course.id);
          const isCompleted = completedIds.has(course.id);
          const notRunning = HS2026_NOT_RUNNING.has(course.id);
          const offered = OFFERED_HS2026.has(course.id);
          return (
            <button
              key={course.id}
              onClick={() => !isCompleted && onToggleEnrolled(course.id)}
              disabled={isCompleted}
              className={`text-left p-3 rounded-lg border transition-colors ${
                isCompleted
                  ? 'bg-gray-50 border-gray-200 opacity-60 cursor-default'
                  : isEnrolled
                  ? 'bg-blue-50 border-blue-400 ring-1 ring-blue-300'
                  : 'bg-white border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-medium text-gray-900 leading-snug">{course.name}</span>
                <span
                  className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold ${
                    isCompleted
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : isEnrolled
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-gray-300 text-transparent'
                  }`}
                >
                  {isCompleted ? '✓' : isEnrolled ? '✓' : '+'}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="font-mono text-[11px] text-gray-400">{course.id}</span>
                <span className={`px-1.5 py-0.5 rounded text-[11px] border ${TYPE_BADGE[course.type] || TYPE_BADGE.other}`}>
                  {TYPE_LABELS[course.type] || 'Course'}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[11px] bg-gray-100 text-gray-600">{course.cp} CP</span>
                {offered && (
                  <span className="px-1.5 py-0.5 rounded text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Autumn 2026
                  </span>
                )}
                {isCompleted && (
                  <span className="px-1.5 py-0.5 rounded text-[11px] bg-emerald-100 text-emerald-700">Completed</span>
                )}
                {isEnrolled && !isCompleted && (
                  <span className="px-1.5 py-0.5 rounded text-[11px] bg-blue-100 text-blue-700">Enrolled</span>
                )}
                {notRunning && (
                  <span className="px-1.5 py-0.5 rounded text-[11px] bg-red-50 text-red-600 border border-red-200">
                    Not running this semester
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-8">No courses match your filters.</p>
      )}
    </div>
  );
}
