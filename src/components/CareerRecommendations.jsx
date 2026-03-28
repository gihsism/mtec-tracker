import { useState } from 'react';
import { CAREER_TRACKS, CORE_AREAS, REQUIREMENTS, ALL_COURSES, COURSE_SEMESTERS, matchCareerTracks } from '../data/mtecRequirements';

const AREA_SHORT = {
  general_mgmt: 'General Mgmt & HR',
  strategy: 'Strategy & Markets',
  info_ops: 'Info & Ops Mgmt',
  quantitative: 'Quantitative Methods',
  economics: 'Economics',
  financial: 'Financial Mgmt',
};

// Background keywords → course IDs that become redundant
const BACKGROUND_COURSE_MAP = {
  finance: ['365-1192-00', '363-0711-00', '363-1153-00', '365-1176-00', '363-0560-00'],
  financial: ['365-1192-00', '363-0711-00', '363-1153-00', '363-0560-00'],
  accounting: ['363-0711-00', '365-1192-00'],
  economics: ['363-0503-00', '363-0575-00', '363-0565-00', '363-0515-00', '363-0537-00'],
  microeconomics: ['363-0503-00'],
  macroeconomics: ['363-0575-00', '363-0565-00'],
  sociology: ['363-0301-00', '365-1195-00', '363-0341-00'],
  psychology: ['365-1195-00', '363-0301-00'],
  management: ['363-0341-00', '363-0392-00'],
  marketing: ['363-0403-00'],
  'computer science': ['365-1120-00', '365-1173-00', '365-1181-00', '365-1143-00'],
  engineering: ['363-1004-00', '365-1166-00'],
  statistics: ['363-0305-00', '363-0541-00', '363-1004-00'],
  math: ['363-1004-00', '363-0541-00', '363-0305-00'],
  'data science': ['365-1120-00', '365-1173-00', '363-0305-00'],
  hr: ['363-0302-00', '365-1019-00', '363-0301-00'],
  'human resources': ['363-0302-00', '365-1019-00', '363-0301-00'],
  'project management': ['365-0881-00', '365-0881-01'],
  'supply chain': ['363-0448-00', '365-1166-00'],
  entrepreneurship: ['363-1082-00', '363-1077-00', '363-0790-00'],
  strategy: ['363-0392-00', '363-0393-00', '365-1059-00'],
  'information systems': ['363-0421-00', '363-0425-00'],
  it: ['363-0421-00', '363-0425-00', '365-1143-00'],
  law: ['365-1151-00'],
  ethics: ['365-1151-00'],
  leadership: ['365-1189-00', '365-1193-00', '365-1196-00', '365-1197-00'],
  negotiation: ['365-0347-00'],
};

function getBackgroundCourseIds(backgroundText) {
  if (!backgroundText || !backgroundText.trim()) return new Set();
  const fields = backgroundText.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
  const ids = new Set();
  for (const field of fields) {
    for (const [keyword, courseIds] of Object.entries(BACKGROUND_COURSE_MAP)) {
      if (field.includes(keyword) || keyword.includes(field)) {
        courseIds.forEach(id => ids.add(id));
      }
    }
  }
  return ids;
}

export default function CareerRecommendations({ completedIds, enrolledIds, careerGoal, selectedTracks, background, analysis, planEdits = { removed: [], added: [] }, onPlanEdit }) {
  const [showAddPicker, setShowAddPicker] = useState(false);
  const [addSearch, setAddSearch] = useState('');

  const removedIds = new Set(planEdits.removed || []);
  const addedIds = new Set(planEdits.added || []);
  const backgroundIds = getBackgroundCourseIds(background);
  // 1. Determine relevant tracks
  let relevantTracks;
  if (selectedTracks && selectedTracks.length > 0) {
    relevantTracks = CAREER_TRACKS.filter(t => selectedTracks.includes(t.id));
  } else if (careerGoal && careerGoal.trim()) {
    const scored = matchCareerTracks(careerGoal);
    const matched = scored.filter(s => s.score > 0);
    relevantTracks = matched.length > 0
      ? matched.map(s => CAREER_TRACKS.find(t => t.id === s.id))
      : CAREER_TRACKS;
  } else {
    relevantTracks = CAREER_TRACKS;
  }

  const hasGoal = (careerGoal && careerGoal.trim()) || (selectedTracks && selectedTracks.length > 0);

  // 2. Collect all career-relevant courses (deduped)
  const seenIds = new Set();
  const allCareerCourses = [];
  for (const track of relevantTracks) {
    for (const course of track.courses) {
      if (!seenIds.has(course.id)) {
        seenIds.add(course.id);
        allCareerCourses.push(course);
      }
    }
  }

  // 3. Compute gaps
  const { core, skills, totalCP } = analysis;
  const coveredAreas = new Set(core.coveredAreas);
  const missingAreas = CORE_AREAS.filter(a => !coveredAreas.has(a.id));
  const missingAreaIds = new Set(missingAreas.map(a => a.id));
  const needMoreSkills = Math.max(0, REQUIREMENTS.skillTrainingMin - skills.count);
  const courseworkTarget = REQUIREMENTS.totalCP - REQUIREMENTS.thesisCP; // 48

  // 4. Build course plan — budget-aware, exactly meeting requirements
  // Build a lookup: courseId -> list of track labels it belongs to (among relevant tracks)
  const courseTrackLabels = {};
  for (const track of relevantTracks) {
    for (const course of track.courses) {
      if (!courseTrackLabels[course.id]) courseTrackLabels[course.id] = [];
      if (!courseTrackLabels[course.id].includes(track.label)) {
        courseTrackLabels[course.id].push(track.label);
      }
    }
  }

  const rows = [];
  const planIds = new Set();
  const allKnownIds = new Set([...completedIds, ...enrolledIds]);

  // CP budget: how many coursework CP still needed (excluding thesis)
  let cpBudget = courseworkTarget - totalCP;

  // Track what we still need to fill
  const areasFilled = new Set(coveredAreas);
  let skillsFilled = skills.count;

  // Helper to build a reason string
  const makeReason = (course) => {
    const trackInfo = courseTrackLabels[course.id]?.join(', ') || '';
    return course.reason
      ? `${course.reason}${hasGoal && trackInfo ? ` (${trackInfo})` : ''}`
      : trackInfo || '';
  };

  // First: add completed/enrolled career courses (these don't consume budget)
  for (const course of allCareerCourses) {
    const isCompleted = completedIds.has(course.id);
    const isEnrolled = enrolledIds.has(course.id);
    if (isCompleted || isEnrolled) {
      planIds.add(course.id);
      rows.push({ ...course, done: true, source: 'career', reason: makeReason(course), careerStatus: isCompleted ? 'completed' : 'enrolled' });
    }
  }

  // Prioritize career courses: required gaps first, then core, then skills, then electives
  const todoCandidates = allCareerCourses.filter(c => !allKnownIds.has(c.id));

  // Sort helper: non-background courses first within each group
  const bgSort = (a, b) => {
    const aBg = backgroundIds.has(a.id) ? 1 : 0;
    const bBg = backgroundIds.has(b.id) ? 1 : 0;
    return aBg - bBg;
  };

  // Priority 1: courses that fill missing core areas (non-background first)
  const gapAreaCourses = todoCandidates.filter(c => c.type === 'core' && c.area && missingAreaIds.has(c.area)).sort(bgSort);
  // Priority 2: other core courses
  const otherCoreCourses = todoCandidates.filter(c => c.type === 'core' && !(c.area && missingAreaIds.has(c.area))).sort(bgSort);
  // Priority 3: skill courses
  const skillCourses = todoCandidates.filter(c => c.type === 'skill').sort(bgSort);
  // Priority 4: elective courses
  const electiveCourses = todoCandidates.filter(c => c.type === 'elective').sort(bgSort);

  const prioritized = [...gapAreaCourses, ...otherCoreCourses, ...skillCourses, ...electiveCourses];

  for (const course of prioritized) {
    if (planIds.has(course.id)) continue;
    if (cpBudget <= 0) break;

    planIds.add(course.id);
    rows.push({ ...course, done: false, source: 'career', reason: makeReason(course), careerStatus: 'todo' });
    cpBudget -= course.cp;
    if (course.type === 'core' && course.area) areasFilled.add(course.area);
    if (course.type === 'skill') skillsFilled++;
  }

  // 5. Fill remaining gaps — always prefer career-relevant courses
  // Helper: find career reason for any course from relevant tracks
  const findCareerReason = (courseId) => {
    for (const track of relevantTracks) {
      const match = track.courses.find(c => c.id === courseId);
      if (match && match.reason) {
        return hasGoal ? `${match.reason} (${track.label})` : match.reason;
      }
    }
    return '';
  };

  // Helper: pick best candidate, preferring career-relevant and non-background ones
  const pickBest = (candidates) => {
    const sorted = [...candidates].sort((a, b) => {
      // Career-relevant first
      const aCareer = relevantTracks.some(t => t.courses.some(tc => tc.id === a.id)) ? 0 : 1;
      const bCareer = relevantTracks.some(t => t.courses.some(tc => tc.id === b.id)) ? 0 : 1;
      if (aCareer !== bCareer) return aCareer - bCareer;
      // Non-background first
      const aBg = backgroundIds.has(a.id) ? 1 : 0;
      const bBg = backgroundIds.has(b.id) ? 1 : 0;
      return aBg - bBg;
    });
    return sorted[0];
  };

  // Missing core areas
  for (const area of missingAreas) {
    if (areasFilled.has(area.id)) continue;
    if (cpBudget <= 0) break;
    const candidates = ALL_COURSES.filter(
      c => c.type === 'core' && c.area === area.id && !planIds.has(c.id) && !allKnownIds.has(c.id)
    );
    if (candidates.length > 0) {
      const candidate = pickBest(candidates);
      planIds.add(candidate.id);
      const careerReason = findCareerReason(candidate.id);
      rows.push({ ...candidate, done: false, reason: careerReason || `Required: ${AREA_SHORT[area.id]} area`, source: 'gap' });
      cpBudget -= candidate.cp;
      areasFilled.add(area.id);
    }
  }

  // Missing skills — prefer career-relevant skills
  if (skillsFilled < REQUIREMENTS.skillTrainingMin) {
    const extraSkillsNeeded = REQUIREMENTS.skillTrainingMin - skillsFilled;
    const allSkillCandidates = ALL_COURSES.filter(
      c => c.type === 'skill' && !planIds.has(c.id) && !allKnownIds.has(c.id)
    );
    // Sort: career-relevant first
    const careerSkillIds = new Set(relevantTracks.flatMap(t => t.courses.filter(c => c.type === 'skill').map(c => c.id)));
    allSkillCandidates.sort((a, b) => {
      const aCareer = careerSkillIds.has(a.id) ? 0 : 1;
      const bCareer = careerSkillIds.has(b.id) ? 0 : 1;
      return aCareer - bCareer;
    });
    for (let i = 0; i < Math.min(extraSkillsNeeded, allSkillCandidates.length); i++) {
      if (cpBudget <= 0) break;
      const c = allSkillCandidates[i];
      planIds.add(c.id);
      const careerReason = findCareerReason(c.id);
      rows.push({ ...c, done: false, reason: careerReason || 'Skill-based training requirement', source: 'gap' });
      cpBudget -= c.cp;
      skillsFilled++;
    }
  }

  // Fill remaining CP gap — only from career-relevant courses first, then any
  if (cpBudget > 0) {
    const careerElectiveIds = new Set(relevantTracks.flatMap(t => t.courses.map(c => c.id)));
    const allFillCandidates = ALL_COURSES
      .filter(c => !planIds.has(c.id) && !allKnownIds.has(c.id))
      .sort((a, b) => {
        // Career-relevant first, then by CP descending
        const aCareer = careerElectiveIds.has(a.id) ? 0 : 1;
        const bCareer = careerElectiveIds.has(b.id) ? 0 : 1;
        if (aCareer !== bCareer) return aCareer - bCareer;
        return b.cp - a.cp;
      });
    for (const c of allFillCandidates) {
      if (cpBudget <= 0) break;
      planIds.add(c.id);
      const careerReason = findCareerReason(c.id);
      rows.push({ ...c, done: false, reason: careerReason || 'Additional credits', source: 'gap' });
      cpBudget -= c.cp;
    }
  }

  // 8. Assign priority, bucket, fills
  const processedRows = rows.map(row => {
    let bucket = '';
    let priority = 3;
    let fills = '';

    if (row.type === 'core' && row.area && missingAreaIds.has(row.area)) {
      bucket = `Core: ${AREA_SHORT[row.area] || row.area}`;
      priority = 1;
      fills = AREA_SHORT[row.area];
    } else if (row.type === 'core') {
      bucket = `Core: ${AREA_SHORT[row.area] || 'General'}`;
      priority = row.done ? 4 : 2;
      fills = row.done ? AREA_SHORT[row.area] || 'Core' : 'Core CP';
    } else if (row.type === 'skill') {
      bucket = 'Skill-based Training';
      priority = row.done ? 4 : (needMoreSkills > 0 ? 1 : 2);
      fills = 'Skills';
    } else {
      bucket = 'Elective';
      priority = row.done ? 4 : 2;
      fills = 'Credits';
    }

    return { ...row, bucket, priority, fills };
  });

  // Helper: find career track reason for a course — only from relevant tracks
  const getCareerReason = (courseId) => {
    if (!hasGoal) {
      // No goal set — don't attribute to any specific track
      for (const track of CAREER_TRACKS) {
        const match = track.courses.find(c => c.id === courseId);
        if (match && match.reason) return match.reason;
      }
      return '';
    }
    // Goal is set — only show reasons from relevant (matched) tracks
    const matchingTracks = relevantTracks.filter(track =>
      track.courses.some(c => c.id === courseId)
    );
    if (matchingTracks.length === 0) return '';
    const match = matchingTracks[0].courses.find(c => c.id === courseId);
    const trackNames = matchingTracks.map(t => t.label).join(', ');
    return match?.reason ? `${match.reason} (${trackNames})` : trackNames;
  };

  // 9. Build completed/enrolled rows from transcript that aren't already in the plan
  const completedCourses = analysis.courses.filter(c => !c.withdrawn);
  const enrolledCourses = analysis.enrolledCourses || [];

  const transcriptRows = [];
  for (const c of completedCourses) {
    if (!planIds.has(c.id)) {
      const area = c.coreArea || c.area;
      const bucket = c.category === 'core' ? `Core: ${AREA_SHORT[area] || area || 'General'}`
        : c.category === 'skill' ? 'Skill-based Training'
        : c.category === 'thesis' ? "Master's Thesis"
        : 'Elective';
      const fills = c.category === 'core' ? (AREA_SHORT[area] || 'Core')
        : c.category === 'skill' ? 'Skills'
        : c.category === 'thesis' ? 'Thesis'
        : 'Credits';
      transcriptRows.push({
        id: c.id, name: c.name, cp: c.cp, type: c.category,
        bucket, fills, status: 'completed',
        reason: getCareerReason(c.id),
      });
    }
  }
  for (const c of enrolledCourses) {
    if (!planIds.has(c.id)) {
      const area = c.area;
      const bucket = c.type === 'core' ? `Core: ${AREA_SHORT[area] || area || 'General'}`
        : c.type === 'skill' ? 'Skill-based Training'
        : 'Elective';
      const fills = c.type === 'core' ? (AREA_SHORT[area] || 'Core')
        : c.type === 'skill' ? 'Skills'
        : 'Credits';
      transcriptRows.push({
        id: c.id, name: c.name, cp: c.cp, type: c.type,
        bucket, fills, status: 'enrolled',
        reason: getCareerReason(c.id),
      });
    }
  }

  // Sort plan rows: todo first by priority, then done
  processedRows.sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    if (a.priority !== b.priority) return a.priority - b.priority;
    return b.cp - a.cp;
  });

  const doneCareerRows = processedRows.filter(r => r.done);

  // All completed/enrolled rows — enrolled first, then completed
  const allDoneUnsorted = [
    ...doneCareerRows.map(r => ({ ...r, status: r.careerStatus || 'completed' })),
    ...transcriptRows,
  ];
  const allDoneRows = [
    ...allDoneUnsorted.filter(r => r.status === 'enrolled'),
    ...allDoneUnsorted.filter(r => r.status === 'completed'),
  ];
  const allDoneCP = allDoneRows.reduce((s, r) => s + r.cp, 0);

  // Apply manual edits: remove user-deleted courses, add user-added courses
  let todoRows = processedRows.filter(r => !r.done && !removedIds.has(r.id));

  // Add manually added courses (not already in plan or done)
  const allCurrentIds = new Set([...todoRows.map(r => r.id), ...allDoneRows.map(r => r.id)]);
  for (const addedId of addedIds) {
    if (allCurrentIds.has(addedId) || allKnownIds.has(addedId)) continue;
    const course = ALL_COURSES.find(c => c.id === addedId);
    if (!course) continue;
    const careerReason = findCareerReason(course.id);
    const fills = course.type === 'core' ? (AREA_SHORT[course.area] || 'Core CP')
      : course.type === 'skill' ? 'Skills' : 'Credits';
    todoRows.push({
      ...course, done: false, source: 'manual', reason: careerReason || 'Manually added',
      bucket: '', priority: 2, fills,
    });
  }

  // Trim todo rows so: todo CP + completed/enrolled CP + thesis = exactly 60
  // totalCP from analysis = completed CP + enrolled CP (ground truth)
  const targetTodoCP = Math.max(0, REQUIREMENTS.totalCP - totalCP - REQUIREMENTS.thesisCP);
  let runningCP = 0;
  todoRows = todoRows.filter(r => {
    if (runningCP >= targetTodoCP) return false;
    runningCP += r.cp;
    return true;
  });
  const todoCPTotal = todoRows.reduce((s, r) => s + r.cp, 0);

  // 10. Final projections
  const projectedCP = totalCP + todoCPTotal; // coursework only
  const projectedCoreCP = core.cp + todoRows.filter(r => r.type === 'core').reduce((s, r) => s + r.cp, 0);
  const projectedAreas = new Set([
    ...allDoneRows.filter(r => r.type === 'core' && r.area).map(r => r.area),
    ...core.coveredAreas,
    ...todoRows.filter(r => r.type === 'core' && r.area).map(r => r.area),
  ]);
  const projectedSkills = skills.count + todoRows.filter(r => r.type === 'skill').length;

  const grandTotal = todoCPTotal + totalCP + REQUIREMENTS.thesisCP;

  return (
    <>
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {hasGoal ? 'Your Course Plan' : 'Course Plan'}
        </h3>
        <button
          onClick={() => setShowAddPicker(!showAddPicker)}
          className="px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
        >
          {showAddPicker ? 'Close' : '+ Add course'}
        </button>
      </div>

      {showAddPicker && (
        <div className="mb-4 border border-blue-200 rounded-lg p-3 bg-blue-50/30">
          <input
            type="text"
            value={addSearch}
            onChange={e => setAddSearch(e.target.value)}
            placeholder="Search courses by name or ID..."
            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mb-2"
            autoFocus
          />
          <div className="max-h-48 overflow-y-auto space-y-1">
            {ALL_COURSES
              .filter(c => {
                if (!addSearch.trim()) return false;
                const q = addSearch.toLowerCase();
                return (c.name.toLowerCase().includes(q) || c.id.includes(q))
                  && !allKnownIds.has(c.id)
                  && !todoRows.some(r => r.id === c.id)
                  && !allDoneRows.some(r => r.id === c.id);
              })
              .slice(0, 8)
              .map(c => (
                <button
                  key={c.id}
                  onClick={() => {
                    onPlanEdit?.({
                      removed: (planEdits.removed || []).filter(id => id !== c.id),
                      added: [...(planEdits.added || []), c.id],
                    });
                    setAddSearch('');
                    setShowAddPicker(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-100 flex items-center justify-between text-sm"
                >
                  <span>
                    <span className="font-medium text-gray-800">{c.name}</span>
                    <span className="text-gray-400 ml-1.5 text-xs font-mono">{c.id}</span>
                  </span>
                  <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                    {c.cp} CP &middot; {c.type}
                  </span>
                </button>
              ))
            }
            {addSearch.trim() && ALL_COURSES.filter(c => {
              const q = addSearch.toLowerCase();
              return (c.name.toLowerCase().includes(q) || c.id.includes(q))
                && !allKnownIds.has(c.id)
                && !todoRows.some(r => r.id === c.id)
                && !allDoneRows.some(r => r.id === c.id);
            }).length === 0 && (
              <p className="text-xs text-gray-400 px-3 py-2">No matching courses found</p>
            )}
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200 text-left">
              <th className="py-2 px-2 text-gray-500 font-medium w-6"></th>
              <th className="py-2 px-2 text-gray-500 font-medium">Status</th>
              <th className="py-2 px-2 text-gray-500 font-medium">Course</th>
              <th className="py-2 px-2 text-gray-500 font-medium text-center">CP</th>
              <th className="py-2 px-2 text-gray-500 font-medium text-center">Semester</th>
              <th className="py-2 px-2 text-gray-500 font-medium">MTEC Requirement</th>
              <th className="py-2 px-2 text-gray-500 font-medium">Career Goal</th>
            </tr>
          </thead>
          <tbody>
            {/* TO TAKE rows */}
            {todoRows.length > 0 && (
              <tr className="bg-gray-50">
                <td colSpan="7" className="py-1.5 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  To take ({todoRows.length} courses, {todoCPTotal} CP)
                </td>
              </tr>
            )}
            {todoRows.map(row => (
              <tr key={row.id} className="border-b border-gray-100 group">
                <td className="py-2 px-1 w-6">
                  <button
                    onClick={() => onPlanEdit?.({
                      removed: [...(planEdits.removed || []), row.id],
                      added: (planEdits.added || []).filter(id => id !== row.id),
                    })}
                    className="w-5 h-5 rounded-full bg-red-100 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors"
                    title="Remove from plan"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </td>
                <td className="py-2 px-2">
                  <span className="text-xs px-1.5 py-0.5 rounded font-medium bg-blue-100 text-blue-700">
                    To take
                  </span>
                </td>
                <td className="py-2 px-2">
                  <span className="font-medium text-gray-800">{row.name}</span>
                  <span className="text-gray-400 ml-1.5 text-xs font-mono">{row.id}</span>
                </td>
                <td className="py-2 px-2 text-center font-semibold text-gray-700">{row.cp}</td>
                <td className="py-2 px-2 text-center">
                  {(() => {
                    const sem = COURSE_SEMESTERS[row.id];
                    if (!sem) return <span className="text-xs text-gray-300">&mdash;</span>;
                    if (sem === 'FS+HS') return <span className="text-xs text-gray-500">Both</span>;
                    return (
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        sem === 'HS' ? 'bg-orange-50 text-orange-600' : 'bg-sky-50 text-sky-600'
                      }`}>
                        {sem === 'HS' ? 'Autumn' : 'Spring'}
                      </span>
                    );
                  })()}
                </td>
                <td className="py-2 px-2">
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    row.type === 'core' && row.area && missingAreaIds.has(row.area)
                      ? 'bg-red-100 text-red-700 font-medium'
                      : row.type === 'core' ? 'bg-purple-100 text-purple-700'
                      : row.type === 'skill' ? 'bg-amber-100 text-amber-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {row.fills}
                  </span>
                </td>
                <td className="py-2 px-2 text-xs text-gray-500">{row.reason}</td>
              </tr>
            ))}

            {/* To take subtotal */}
            {todoRows.length > 0 && (
              <tr className="border-b border-gray-200">
                <td colSpan="3" className="py-1.5 px-2 text-xs text-gray-500 text-right">Subtotal</td>
                <td className="py-1.5 px-2 text-center font-bold text-blue-600">{todoCPTotal}</td>
                <td colSpan="4"></td>
              </tr>
            )}

            {/* COMPLETED / ENROLLED rows */}
            {allDoneRows.length > 0 && (
              <tr className="bg-gray-50">
                <td colSpan="7" className="py-1.5 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Completed &amp; Enrolled ({allDoneRows.length} courses)
                </td>
              </tr>
            )}
            {allDoneRows.map(row => (
              <tr key={row.id} className="border-b border-gray-50">
                <td></td>
                <td className="py-1.5 px-2">
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    row.status === 'enrolled'
                      ? 'bg-gray-100 text-gray-500'
                      : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {row.status === 'enrolled' ? 'Enrolled' : 'Done'}
                  </span>
                </td>
                <td className={`py-1.5 px-2 ${row.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-500'}`}>
                  {row.name}
                  <span className="text-gray-300 ml-1.5 text-xs font-mono">{row.id}</span>
                </td>
                <td className="py-1.5 px-2 text-center text-gray-400">{row.cp}</td>
                <td className="py-1.5 px-2 text-center">
                  <span className="text-xs text-gray-300">&mdash;</span>
                </td>
                <td className="py-1.5 px-2">
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    row.type === 'core' ? 'bg-purple-50 text-purple-500'
                    : row.type === 'skill' ? 'bg-amber-50 text-amber-500'
                    : row.type === 'thesis' ? 'bg-gray-100 text-gray-500'
                    : 'bg-gray-50 text-gray-400'
                  }`}>
                    {row.fills}
                  </span>
                </td>
                <td className="py-1.5 px-2 text-xs text-gray-400">{row.reason}</td>
              </tr>
            ))}

            {/* Completed/enrolled subtotal */}
            {allDoneRows.length > 0 && (
              <tr className="border-b border-gray-200">
                <td colSpan="3" className="py-1.5 px-2 text-xs text-gray-500 text-right">Subtotal</td>
                <td className="py-1.5 px-2 text-center font-bold text-gray-500">{allDoneCP}</td>
                <td colSpan="4"></td>
              </tr>
            )}

            {/* Thesis row */}
            <tr className="bg-gray-50">
              <td colSpan="7" className="py-1.5 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Master's Thesis
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td></td>
              <td className="py-1.5 px-2">
                <span className={`text-xs px-1.5 py-0.5 rounded ${
                  analysis.thesis.completed ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'
                }`}>
                  {analysis.thesis.completed ? 'Done' : 'Pending'}
                </span>
              </td>
              <td className={`py-1.5 px-2 ${analysis.thesis.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                Master's Thesis
              </td>
              <td className="py-1.5 px-2 text-center text-gray-500">12</td>
              <td className="py-1.5 px-2"></td>
              <td className="py-1.5 px-2">
                <span className="text-xs text-gray-400">Thesis</span>
              </td>
              <td className="py-1.5 px-2"></td>
            </tr>
          </tbody>

          {/* TOTAL footer */}
          <tfoot>
            <tr className="border-t-2 border-gray-300">
              <td className="py-3 px-2 font-bold text-gray-700" colSpan="3">Total</td>
              <td className={`py-3 px-2 text-center font-bold text-lg ${grandTotal >= REQUIREMENTS.totalCP ? 'text-emerald-600' : 'text-red-500'}`}>
                {grandTotal} <span className="text-gray-400 font-normal text-xs">/ {REQUIREMENTS.totalCP} CP</span>
              </td>
              <td colSpan="4"></td>
            </tr>
          </tfoot>
        </table>
      </div>

    </div>

    {/* MTEC Requirements Analysis */}
    {(() => {
      // Collect all courses by source for attribution
      const allPlanCourses = [
        ...allDoneRows.map(r => ({ ...r, source_label: r.status === 'enrolled' ? 'Enrolled' : 'Completed' })),
        ...todoRows.map(r => ({ ...r, source_label: 'Planned' })),
      ];

      // Per-area breakdown: which courses contribute
      const areaCourses = {};
      for (const area of CORE_AREAS) {
        areaCourses[area.id] = allPlanCourses.filter(
          r => r.type === 'core' && (r.area === area.id || r.coreArea === area.id)
        );
      }

      // Skill courses
      const skillCoursesAll = allPlanCourses.filter(r => r.type === 'skill');

      // Status badge
      const Badge = ({ label }) => (
        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
          label === 'Completed' ? 'bg-emerald-100 text-emerald-700'
          : label === 'Enrolled' ? 'bg-blue-100 text-blue-700'
          : 'bg-gray-100 text-gray-500'
        }`}>{label}</span>
      );

      const ReqStatus = ({ met, label }) => (
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
          met ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
        }`}>
          {met ? '\u2713 Met' : label || 'Not met'}
        </span>
      );

      const totalMet = grandTotal >= REQUIREMENTS.totalCP;
      const coreCPMet = projectedCoreCP >= REQUIREMENTS.coreMinCP;
      const areasMet = projectedAreas.size >= 5;
      const skillsMet = projectedSkills >= REQUIREMENTS.skillTrainingMin;

      return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mt-6">
          <div className="px-5 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">MTEC Requirements</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Based on completed, enrolled, and planned courses from your course plan above
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[10px] text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Completed
                </span>
                <span className="flex items-center gap-1 text-[10px] text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-blue-500" /> Enrolled
                </span>
                <span className="flex items-center gap-1 text-[10px] text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-gray-300" /> Planned
                </span>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {/* 1. Total Credits */}
            <div className="px-5 py-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-gray-700">Total Credits</h4>
                  <span className="text-xs text-gray-400">{grandTotal} / {REQUIREMENTS.totalCP} CP</span>
                </div>
                <ReqStatus met={totalMet} label={`${REQUIREMENTS.totalCP - grandTotal} CP needed`} />
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div className="h-full rounded-full flex">
                  <div
                    className="bg-emerald-500 transition-all"
                    style={{ width: `${Math.min(100, (allDoneRows.filter(r => r.status === 'completed').reduce((s, r) => s + r.cp, 0) / REQUIREMENTS.totalCP) * 100)}%` }}
                  />
                  <div
                    className="bg-blue-400 transition-all"
                    style={{ width: `${Math.min(100, (allDoneRows.filter(r => r.status === 'enrolled').reduce((s, r) => s + r.cp, 0) / REQUIREMENTS.totalCP) * 100)}%` }}
                  />
                  <div
                    className="bg-gray-300 transition-all"
                    style={{ width: `${Math.min(100, (todoCPTotal / REQUIREMENTS.totalCP) * 100)}%` }}
                  />
                  {!analysis.thesis.completed && (
                    <div
                      className="bg-gray-200 transition-all"
                      style={{ width: `${(REQUIREMENTS.thesisCP / REQUIREMENTS.totalCP) * 100}%` }}
                    />
                  )}
                </div>
              </div>
              <div className="flex gap-4 mt-1.5 text-[10px] text-gray-400">
                <span>Completed: {allDoneRows.filter(r => r.status === 'completed').reduce((s, r) => s + r.cp, 0)} CP</span>
                <span>Enrolled: {allDoneRows.filter(r => r.status === 'enrolled').reduce((s, r) => s + r.cp, 0)} CP</span>
                <span>Planned: {todoCPTotal} CP</span>
                <span>Thesis: {analysis.thesis.completed ? '12' : '12 (pending)'} CP</span>
              </div>
            </div>

            {/* 2. Core Credits */}
            <div className="px-5 py-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-gray-700">Core Credits</h4>
                  <span className="text-xs text-gray-400">min. {REQUIREMENTS.coreMinCP} CP from core subjects</span>
                </div>
                <ReqStatus met={coreCPMet} label={`${REQUIREMENTS.coreMinCP - projectedCoreCP} CP needed`} />
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full transition-all ${coreCPMet ? 'bg-emerald-500' : 'bg-amber-400'}`}
                  style={{ width: `${Math.min(100, (projectedCoreCP / REQUIREMENTS.coreMinCP) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">{projectedCoreCP} / {REQUIREMENTS.coreMinCP} CP across all core areas</p>
            </div>

            {/* 3. Core Areas (5 of 6) */}
            <div className="px-5 py-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-gray-700">Core Areas Coverage</h4>
                  <span className="text-xs text-gray-400">must cover at least 5 of 6</span>
                </div>
                <ReqStatus met={areasMet} label={`${5 - projectedAreas.size} more needed`} />
              </div>
              <div className="space-y-3">
                {CORE_AREAS.map(area => {
                  const courses = areaCourses[area.id] || [];
                  const covered = projectedAreas.has(area.id);
                  return (
                    <div key={area.id} className={`rounded-lg border p-3 ${
                      covered ? 'border-emerald-200 bg-emerald-50/30' : 'border-amber-200 bg-amber-50/30'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                            covered ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                          }`}>
                            {covered ? '\u2713' : '!'}
                          </span>
                          <span className="text-sm font-medium text-gray-700">{area.name}</span>
                        </div>
                        <span className="text-xs text-gray-400">min. {area.minCP} CP</span>
                      </div>
                      {courses.length > 0 ? (
                        <div className="ml-7 space-y-0.5">
                          {courses.map(c => (
                            <div key={c.id} className="flex items-center gap-2 text-xs">
                              <Badge label={c.source_label} />
                              <span className="text-gray-600">{c.name}</span>
                              <span className="text-gray-300">{c.cp} CP</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="ml-7 text-xs text-amber-600">No course assigned — add a core course for this area</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Skill-based Training */}
            <div className="px-5 py-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-gray-700">Skill-based Training</h4>
                  <span className="text-xs text-gray-400">min. {REQUIREMENTS.skillTrainingMin} courses</span>
                </div>
                <ReqStatus met={skillsMet} label={`${REQUIREMENTS.skillTrainingMin - projectedSkills} more needed`} />
              </div>
              {skillCoursesAll.length > 0 ? (
                <div className="space-y-1">
                  {skillCoursesAll.map(c => (
                    <div key={c.id} className="flex items-center gap-2 text-xs">
                      <Badge label={c.source_label} />
                      <span className="text-gray-600">{c.name}</span>
                      <span className="text-gray-300">{c.cp} CP</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-amber-600">No skill courses yet</p>
              )}
            </div>

            {/* 5. Master's Thesis */}
            <div className="px-5 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-gray-700">Master's Thesis</h4>
                  <span className="text-xs text-gray-400">{REQUIREMENTS.thesisCP} CP · min. grade {REQUIREMENTS.thesisMinGrade}</span>
                </div>
                <ReqStatus met={analysis.thesis.completed} label="Pending" />
              </div>
            </div>

            {/* 6. Coursework CP Range */}
            {(() => {
              const courseCP = grandTotal - REQUIREMENTS.thesisCP;
              const inRange = courseCP >= REQUIREMENTS.minCourseCP && courseCP <= REQUIREMENTS.maxCourseCP;
              const overMax = courseCP > REQUIREMENTS.maxCourseCP;
              return (
                <div className="px-5 py-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-gray-700">Coursework Credits</h4>
                      <span className="text-xs text-gray-400">{REQUIREMENTS.minCourseCP}–{REQUIREMENTS.maxCourseCP} CP (excl. thesis)</span>
                    </div>
                    {overMax ? (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                        Exceeds max by {courseCP - REQUIREMENTS.maxCourseCP} CP
                      </span>
                    ) : (
                      <ReqStatus met={inRange} label={`${REQUIREMENTS.minCourseCP - courseCP} CP needed`} />
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {courseCP} CP planned from coursework. MTEC allows {REQUIREMENTS.minCourseCP}–{REQUIREMENTS.maxCourseCP} CP from courses plus {REQUIREMENTS.thesisCP} CP thesis.
                  </p>
                </div>
              );
            })()}

            {/* 7. Extradepartmental Limit */}
            {(() => {
              const extraCP = analysis.extradepartmentalCP || 0;
              // Also count planned extradepartmental
              const plannedExtraCP = todoRows
                .filter(r => !r.id.startsWith('363-') && !r.id.startsWith('365-'))
                .reduce((s, r) => s + r.cp, 0);
              const totalExtraCP = extraCP + plannedExtraCP;
              const withinLimit = totalExtraCP <= REQUIREMENTS.maxExtradepartmental;
              return totalExtraCP > 0 ? (
                <div className="px-5 py-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-gray-700">Extradepartmental Courses</h4>
                      <span className="text-xs text-gray-400">max. {REQUIREMENTS.maxExtradepartmental} CP from non-D-MTEC</span>
                    </div>
                    {withinLimit ? (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                        {totalExtraCP} / {REQUIREMENTS.maxExtradepartmental} CP
                      </span>
                    ) : (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                        Exceeds limit: {totalExtraCP} / {REQUIREMENTS.maxExtradepartmental} CP
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">
                    Courses outside D-MTEC (not 363-/365- prefixed) require pre-approval from Student Administration.
                  </p>
                </div>
              ) : null;
            })()}

            {/* 8. Plagiarism Course */}
            <div className="px-5 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-gray-700">Avoiding Plagiarism Course</h4>
                  <span className="text-xs text-gray-400">required before thesis</span>
                </div>
                <ReqStatus met={analysis.plagiarismCompleted} label="Not completed" />
              </div>
              {!analysis.plagiarismCompleted && (
                <p className="text-xs text-amber-600 mt-1">
                  Complete <span className="font-medium">365-1170-00 Epigeum's Avoiding Plagiarism</span> (0 CP, online) in your 1st semester.
                </p>
              )}
            </div>

            {/* 9. GPA */}
            {analysis.gpa?.value && (
              <div className="px-5 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-gray-700">Grade Point Average</h4>
                    <span className="text-xs text-gray-400">weighted by CP, Swiss 1–6 scale</span>
                  </div>
                  <span className={`text-sm font-bold ${analysis.gpa.value >= 5.0 ? 'text-emerald-600' : analysis.gpa.value >= 4.0 ? 'text-blue-600' : 'text-red-600'}`}>
                    {analysis.gpa.value.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Based on {analysis.gpa.gradedCourses} graded course{analysis.gpa.gradedCourses !== 1 ? 's' : ''} ({analysis.gpa.gradedCP} CP).
                  {analysis.gpa.value < 4.0 && <span className="text-red-500 font-medium ml-1">Below passing threshold (4.0).</span>}
                </p>
              </div>
            )}

            {/* Graduation Readiness */}
            {(() => {
              const courseCP = grandTotal - REQUIREMENTS.thesisCP;
              const courseCPOk = courseCP >= REQUIREMENTS.minCourseCP && courseCP <= REQUIREMENTS.maxCourseCP;
              const checks = [
                { label: 'Total 60 CP', met: totalMet },
                { label: 'Coursework 48–53 CP', met: courseCPOk },
                { label: `Core ≥${REQUIREMENTS.coreMinCP} CP`, met: coreCPMet },
                { label: '5 of 6 areas', met: areasMet },
                { label: `≥${REQUIREMENTS.skillTrainingMin} skill courses`, met: skillsMet },
                { label: 'Plagiarism course', met: analysis.plagiarismCompleted },
                { label: 'Thesis completed', met: analysis.thesis.completed },
              ];
              const allMet = checks.every(c => c.met);
              const metCount = checks.filter(c => c.met).length;
              return (
                <div className={`px-5 py-4 ${allMet ? 'bg-emerald-50' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`text-sm font-semibold ${allMet ? 'text-emerald-800' : 'text-gray-700'}`}>
                      {allMet ? 'Ready to Graduate' : 'Graduation Readiness'}
                    </h4>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      allMet ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {metCount} / {checks.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {checks.map(c => (
                      <div key={c.label} className={`flex items-center gap-1.5 text-xs rounded px-2 py-1 ${
                        c.met ? 'bg-emerald-100/60 text-emerald-700' : 'bg-white text-gray-500 border border-gray-200'
                      }`}>
                        <span className="flex-shrink-0">{c.met ? '\u2713' : '\u2022'}</span>
                        <span>{c.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      );
    })()}

    {/* Semester load breakdown */}
    {(() => {
      // Collect ALL courses (completed, enrolled, planned) with status and semester info
      const allSemCourses = [
        ...allDoneRows.map(r => ({
          ...r,
          statusLabel: r.status === 'enrolled' ? 'Enrolled' : 'Completed',
          statusType: r.status,
        })),
        ...todoRows.map(r => ({
          ...r,
          statusLabel: 'Planned',
          statusType: 'planned',
        })),
      ];

      const getSem = (r) => COURSE_SEMESTERS[r.id] || null;

      const autumnCourses = allSemCourses.filter(r => {
        const sem = getSem(r);
        return sem === 'HS' || sem === 'FS+HS';
      });
      const springCourses = allSemCourses.filter(r => {
        const sem = getSem(r);
        return sem === 'FS' || sem === 'FS+HS';
      });
      const unknownCourses = allSemCourses.filter(r => !getSem(r));

      // Only count non-completed courses for overload check
      const autumnActive = autumnCourses.filter(r => r.statusType !== 'completed');
      const springActive = springCourses.filter(r => r.statusType !== 'completed');
      const autumnOverload = autumnActive.length > REQUIREMENTS.maxCoursesPerSemester;
      const springOverload = springActive.length > REQUIREMENTS.maxCoursesPerSemester;

      if (allSemCourses.length === 0) return null;

      const StatusDot = ({ type }) => (
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
          type === 'completed' ? 'bg-emerald-500'
          : type === 'enrolled' ? 'bg-blue-500'
          : 'bg-gray-300'
        }`} />
      );

      const SemesterColumn = ({ label, color, courses, overload, activeCount }) => {
        const completed = courses.filter(r => r.statusType === 'completed');
        const enrolled = courses.filter(r => r.statusType === 'enrolled');
        const planned = courses.filter(r => r.statusType === 'planned');
        const totalCP = courses.reduce((s, r) => s + r.cp, 0);

        const borderColor = overload ? 'border-red-200' : color === 'orange' ? 'border-orange-200' : 'border-sky-200';
        const bgColor = overload ? 'bg-red-50/50' : color === 'orange' ? 'bg-orange-50/30' : 'bg-sky-50/30';
        const titleColor = color === 'orange' ? 'text-orange-700' : 'text-sky-700';
        const badgeBg = overload ? 'bg-red-100 text-red-700' : color === 'orange' ? 'bg-orange-100 text-orange-600' : 'bg-sky-100 text-sky-600';

        return (
          <div className={`rounded-lg p-4 border ${borderColor} ${bgColor}`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-sm font-semibold ${titleColor}`}>{label}</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${badgeBg}`}>
                {courses.length} courses &middot; {totalCP} CP
              </span>
            </div>
            {overload && (
              <p className="text-xs text-red-600 mb-3 flex items-center gap-1">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                {activeCount} active courses exceeds max {REQUIREMENTS.maxCoursesPerSemester}/semester
              </p>
            )}

            <div className="space-y-3">
              {/* Completed */}
              {completed.length > 0 && (
                <div>
                  <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">
                    Completed ({completed.length})
                  </div>
                  <div className="space-y-1">
                    {completed.map(r => (
                      <div key={r.id} className="flex items-center gap-2 text-xs">
                        <StatusDot type="completed" />
                        <span className="text-gray-400 line-through truncate">{r.name}</span>
                        <span className="text-gray-300 flex-shrink-0 ml-auto">{r.cp} CP</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Enrolled */}
              {enrolled.length > 0 && (
                <div>
                  <div className="text-[10px] font-medium text-blue-500 uppercase tracking-wider mb-1">
                    Enrolled ({enrolled.length})
                  </div>
                  <div className="space-y-1">
                    {enrolled.map(r => (
                      <div key={r.id} className="flex items-center gap-2 text-xs">
                        <StatusDot type="enrolled" />
                        <span className="text-gray-700 truncate">{r.name}</span>
                        <span className={`text-[10px] px-1 py-0 rounded flex-shrink-0 ${
                          r.type === 'core' ? 'bg-purple-100 text-purple-600'
                          : r.type === 'skill' ? 'bg-amber-100 text-amber-600'
                          : 'bg-gray-100 text-gray-500'
                        }`}>{r.type}</span>
                        <span className="text-gray-400 flex-shrink-0 ml-auto">{r.cp} CP</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Planned */}
              {planned.length > 0 && (
                <div>
                  <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">
                    Planned ({planned.length})
                  </div>
                  <div className="space-y-1">
                    {planned.map(r => (
                      <div key={r.id} className="flex items-center gap-2 text-xs">
                        <StatusDot type="planned" />
                        <span className="text-gray-600 truncate">{r.name}</span>
                        <span className={`text-[10px] px-1 py-0 rounded flex-shrink-0 ${
                          r.type === 'core' ? 'bg-purple-100 text-purple-600'
                          : r.type === 'skill' ? 'bg-amber-100 text-amber-600'
                          : 'bg-gray-100 text-gray-500'
                        }`}>{r.type}</span>
                        <span className="text-gray-400 flex-shrink-0 ml-auto">{r.cp} CP</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {courses.length === 0 && <p className="text-xs text-gray-400">No courses in this semester</p>}
            </div>
          </div>
        );
      };

      return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mt-6">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Semester Overview</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              How your completed, enrolled, and planned courses distribute across semesters (max {REQUIREMENTS.maxCoursesPerSemester} courses per semester)
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <SemesterColumn
              label="Autumn Semester (HS)"
              color="orange"
              courses={autumnCourses}
              overload={autumnOverload}
              activeCount={autumnActive.length}
            />
            <SemesterColumn
              label="Spring Semester (FS)"
              color="sky"
              courses={springCourses}
              overload={springOverload}
              activeCount={springActive.length}
            />
          </div>

          {unknownCourses.length > 0 && (
            <div className="px-5 pb-3">
              <details className="text-xs">
                <summary className="text-gray-400 cursor-pointer hover:text-gray-600">
                  {unknownCourses.length} course{unknownCourses.length > 1 ? 's' : ''} with unknown semester
                </summary>
                <div className="mt-1 space-y-0.5 pl-2">
                  {unknownCourses.map(r => (
                    <div key={r.id} className="flex items-center gap-2 text-xs text-gray-400">
                      <StatusDot type={r.statusType} />
                      <span>{r.name}</span>
                      <span className="ml-auto">{r.cp} CP</span>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          )}

          <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4 text-[10px] text-gray-400">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Completed</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Enrolled</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-300" /> Planned</span>
            </div>
            <a
              href="https://www.vvz.ethz.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-blue-500 hover:underline"
            >
              ETH Course Catalogue →
            </a>
          </div>
        </div>
      );
    })()}
    </>
  );
}
