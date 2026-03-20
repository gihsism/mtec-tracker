/**
 * Parse ETH myStudies transcript text into structured data.
 * Handles the text format from the Leistungsueberblick page.
 *
 * Typical tab-separated line format:
 * 363-0341-00 S\tIntroduction to Management\tW26\t4.75\t\t3\t\t
 * 365-1189-00 S\tPersonal Leadership...\tW26\tBest\t\t1\t\t
 * 363-1004-00 S\tOperations Research\tW26\tAbbr\t\t\t\t\t
 */
export function parseTranscript(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const courses = [];
  let currentCategory = null;
  let currentCoreArea = null;

  const coreAreaPatterns = [
    [/general management|human resource/i, 'general_mgmt'],
    [/strategy.*markets|markets.*technology/i, 'strategy'],
    [/information.*management|operations management/i, 'info_ops'],
    [/quantitative|qualitative.*methods/i, 'quantitative'],
    [/micro.*macro|macro.*economics|economics/i, 'economics'],
    [/financial.*management/i, 'financial'],
  ];

  for (const line of lines) {
    const lower = line.toLowerCase();

    // Detect category headers
    if (lower.includes('core subjects') || lower.includes('kernfächer')) {
      currentCategory = 'core';
      continue;
    }
    if (lower.includes('skill-based') || lower.includes('skill based')) {
      currentCategory = 'skill';
      continue;
    }
    if (lower.includes('elective') || lower.includes('wahlfächer')) {
      currentCategory = 'elective';
      continue;
    }
    if (lower.includes("master's thesis") || lower.includes("masters thesis") || lower.includes('masterarbeit')) {
      currentCategory = 'thesis';
      continue;
    }

    // Detect core area sub-headers (non-course lines)
    if (!lower.match(/^\d{3}-/)) {
      for (const [pattern, area] of coreAreaPatterns) {
        if (pattern.test(lower)) {
          currentCoreArea = area;
          break;
        }
      }
      continue;
    }

    // Parse course line — split by tabs first, fall back to multi-space
    const fields = line.includes('\t') ? line.split('\t') : line.split(/\s{2,}/);

    // First field: "363-0341-00 S" or "363-0341-00"
    const idField = fields[0] || '';
    const idMatch = idField.match(/(\d{3}-\d{4}-\d{2})/);
    if (!idMatch) continue;

    const id = idMatch[1];
    const name = (fields[1] || '').trim();

    // Find session field (W26, S26, etc.)
    let session = '';
    let sessionIdx = -1;
    for (let i = 2; i < fields.length; i++) {
      const m = fields[i].trim().match(/^(W|S)\d{2}$/);
      if (m) {
        session = fields[i].trim();
        sessionIdx = i;
        break;
      }
    }

    // Everything after session is grade/status and CP data
    const afterSession = fields.slice(sessionIdx + 1).map(f => f.trim()).filter(Boolean);

    const isWithdrawn = afterSession.some(f => /abbr/i.test(f)) || lower.includes('abbr');
    const isBest = afterSession.some(f => /best|pass/i.test(f)) || lower.includes('best');

    let grade = null;
    let cp = 0;

    if (isWithdrawn) {
      grade = 'Withdrawn';
      cp = 0;
    } else {
      // Collect all numbers from remaining fields
      const numbers = [];
      for (const f of afterSession) {
        const num = parseFloat(f);
        if (!isNaN(num)) numbers.push(num);
      }

      if (isBest) {
        grade = 'Pass';
        // For Pass courses, all numbers are CP candidates — take the integer one
        for (const n of numbers) {
          if (n >= 1 && n <= 12 && Number.isInteger(n)) {
            cp = n;
            break;
          }
        }
      } else if (numbers.length >= 2) {
        // First number is grade (has decimals, 1-6 range), subsequent is CP
        grade = numbers[0];
        // Find CP: look for an integer in remaining numbers
        for (let i = 1; i < numbers.length; i++) {
          if (numbers[i] >= 1 && numbers[i] <= 12) {
            cp = numbers[i];
            break;
          }
        }
      } else if (numbers.length === 1) {
        // Ambiguous single number: if it has a decimal, it's a grade; otherwise could be CP
        if (numbers[0] !== Math.floor(numbers[0])) {
          grade = numbers[0]; // e.g., 4.75
        } else {
          // Could be either — treat as grade if in 1-6 range for graded courses
          grade = numbers[0];
        }
      }
    }

    const semesterMap = { 'W': 'Autumn', 'S': 'Spring' };
    const semType = session.charAt(0);
    const semYear = session.length >= 3 ? '20' + session.substring(1) : '';
    const semester = semYear ? `${semesterMap[semType] || semType} ${semYear}` : session;

    courses.push({
      id,
      name,
      session,
      semester,
      grade,
      cp,
      category: currentCategory || 'unknown',
      coreArea: currentCategory === 'core' ? currentCoreArea : null,
      withdrawn: isWithdrawn,
    });
  }

  return courses;
}

/**
 * Analyze parsed courses against MTEC requirements.
 * @param {Array} courses - Parsed transcript courses
 * @param {Array} enrolledCourses - Courses enrolled this semester (from ALL_COURSES catalog)
 */
export function analyzeProgress(courses, enrolledCourses = []) {
  const completed = courses.filter(c => !c.withdrawn);
  const completedCP = completed.reduce((sum, c) => sum + c.cp, 0);

  const enrolledCP = enrolledCourses.reduce((sum, c) => sum + c.cp, 0);
  const totalCP = completedCP + enrolledCP;

  // Merge completed + enrolled for coverage analysis
  const allActive = [
    ...completed,
    ...enrolledCourses.map(c => ({ ...c, category: c.type === 'skill' ? 'skill' : c.type, enrolled: true })),
  ];

  const core = allActive.filter(c => c.category === 'core');
  const coreCP = core.reduce((sum, c) => sum + c.cp, 0);
  const coveredAreas = [...new Set(core.map(c => c.coreArea || c.area).filter(Boolean))];

  const skills = allActive.filter(c => c.category === 'skill');
  const skillCount = skills.length;

  const electives = allActive.filter(c => c.category === 'elective');
  const electiveCP = electives.reduce((sum, c) => sum + c.cp, 0);

  return {
    courses: completed,
    allCourses: courses,
    enrolledCourses,
    totalCP,
    completedCP,
    enrolledCP,
    remainingCP: Math.max(0, 60 - totalCP),
    core: {
      cp: coreCP,
      needed: Math.max(0, 15 - coreCP),
      coveredAreas,
      missingAreas: Math.max(0, 5 - coveredAreas.length),
    },
    skills: {
      count: skillCount,
      needed: Math.max(0, 2 - skillCount),
    },
    electives: {
      cp: electiveCP,
    },
    thesis: {
      completed: courses.some(c => c.category === 'thesis' && !c.withdrawn),
    },
    withdrawn: courses.filter(c => c.withdrawn),
  };
}

/**
 * Compress transcript data for URL sharing.
 */
export function encodeForSharing(courses) {
  const data = courses.map(c => ({
    i: c.id,
    n: c.name,
    g: c.grade,
    c: c.cp,
    k: c.category,
    a: c.coreArea,
    w: c.withdrawn,
    s: c.session,
  }));
  return btoa(encodeURIComponent(JSON.stringify(data)));
}

/**
 * Parse enrollment page text to extract course IDs.
 * Matches course IDs (e.g. 363-0341-00) against the known catalog.
 */
export function parseEnrollmentText(text, allCourses) {
  const idPattern = /\d{3}-\d{4}-\d{2}/g;
  const found = new Set();
  let match;
  while ((match = idPattern.exec(text)) !== null) {
    found.add(match[0]);
  }
  const knownIds = new Set(allCourses.map(c => c.id));
  return [...found].filter(id => knownIds.has(id));
}

export function decodeFromSharing(encoded) {
  try {
    const data = JSON.parse(decodeURIComponent(atob(encoded)));
    return data.map(c => ({
      id: c.i,
      name: c.n,
      grade: c.g,
      cp: c.c,
      category: c.k,
      coreArea: c.a,
      withdrawn: c.w,
      session: c.s,
      semester: c.s,
    }));
  } catch {
    return null;
  }
}
