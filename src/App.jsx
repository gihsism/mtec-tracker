import { useState, useEffect } from 'react';
import TranscriptInput from './components/TranscriptInput';
import ProgressBar from './components/ProgressBar';
import CourseTable from './components/CourseTable';
import CareerRecommendations from './components/CareerRecommendations';
import CareerGoalEditor from './components/CareerGoalEditor';
import ShareButton from './components/ShareButton';
import Timetable from './components/Timetable';
import { parseTranscript, analyzeProgress, decodeFromSharing, parseEnrollmentText } from './utils/parseTranscript';
import { ALL_COURSES } from './data/mtecRequirements';
import { REQUIREMENTS } from './data/mtecRequirements';

const STORAGE_KEY = 'mtec-tracker-data';

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.courses && data.courses.length > 0) return data;
  } catch {}
  return null;
}

function saveToBrowser(courses, transcriptText, careerGoal, selectedTracks, enrolledCourses, planEdits, background) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      courses,
      transcriptText,
      careerGoal,
      selectedTracks,
      enrolledCourses: enrolledCourses || [],
      planEdits: planEdits || { removed: [], added: [] },
      background: background || '',
      savedAt: Date.now(),
    }));
  } catch {}
}

function clearSaved() {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

function App() {
  const [courses, setCourses] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [careerGoal, setCareerGoal] = useState('');
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [background, setBackground] = useState('');
  const [planEdits, setPlanEdits] = useState({ removed: [], added: [] });
  const [isShared, setIsShared] = useState(false);
  const [isRestored, setIsRestored] = useState(false);
  const [importedText, setImportedText] = useState(null);
  const [importedEnrollments, setImportedEnrollments] = useState(null);

  // On load: check URL hash for share/import, then localStorage
  useEffect(() => {
    const hash = window.location.hash;

    // Shared link
    if (hash.startsWith('#share=')) {
      const encoded = hash.substring(7);
      const decoded = decodeFromSharing(encoded);
      if (decoded) {
        setCourses(decoded);
        setAnalysis(analyzeProgress(decoded));
        setIsShared(true);
        return;
      }
    }

    // Bookmarklet import (transcript)
    if (hash.startsWith('#import=')) {
      try {
        const encoded = hash.substring(8);
        const text = decodeURIComponent(escape(atob(encoded)));
        setImportedText(text);
        window.history.replaceState(null, '', window.location.pathname);
        return;
      } catch {}
    }

    // Bookmarklet import (enrollments)
    if (hash.startsWith('#enroll=')) {
      try {
        const encoded = hash.substring(8);
        const text = decodeURIComponent(escape(atob(encoded)));
        const courseIds = parseEnrollmentText(text, ALL_COURSES);
        if (courseIds.length > 0) {
          setImportedEnrollments(courseIds);
        }
        window.history.replaceState(null, '', window.location.pathname);
        // Don't return — still load from localStorage if available so we show input form with pre-selected enrollments
      } catch {}
    }

    // Restore from localStorage
    const saved = loadSaved();
    if (saved) {
      const enrolled = saved.enrolledCourses || [];
      setCourses(saved.courses);
      setEnrolledCourses(enrolled);
      setAnalysis(analyzeProgress(saved.courses, enrolled));
      setCareerGoal(saved.careerGoal || '');
      setSelectedTracks(saved.selectedTracks || []);
      setBackground(saved.background || '');
      setPlanEdits(saved.planEdits || { removed: [], added: [] });
      setIsRestored(true);
    }
  }, []);

  const handleParse = (text, goal, tracks, enrolled = [], bg = '') => {
    const parsed = parseTranscript(text);
    setCourses(parsed);
    setEnrolledCourses(enrolled);
    setAnalysis(analyzeProgress(parsed, enrolled));
    setCareerGoal(goal || '');
    setSelectedTracks(tracks || []);
    setBackground(bg || '');
    setPlanEdits({ removed: [], added: [] });
    setIsShared(false);
    setIsRestored(false);
    window.history.replaceState(null, '', window.location.pathname);

    saveToBrowser(parsed, text, goal, tracks, enrolled, { removed: [], added: [] }, bg);
  };

  const handleReset = () => {
    setCourses(null);
    setAnalysis(null);
    setCareerGoal('');
    setSelectedTracks([]);
    setEnrolledCourses([]);
    setBackground('');
    setPlanEdits({ removed: [], added: [] });
    setIsShared(false);
    setIsRestored(false);
    window.history.replaceState(null, '', window.location.pathname);
  };

  const handleClearData = () => {
    clearSaved();
    handleReset();
  };

  const handleGoalChange = (newGoal, newTracks) => {
    setCareerGoal(newGoal);
    setSelectedTracks(newTracks);
    setPlanEdits({ removed: [], added: [] });
    if (courses) {
      saveToBrowser(courses, '', newGoal, newTracks, enrolledCourses, { removed: [], added: [] }, background);
    }
  };

  const handleBackgroundChange = (newBg) => {
    setBackground(newBg);
    setPlanEdits({ removed: [], added: [] });
    if (courses) {
      saveToBrowser(courses, '', careerGoal, selectedTracks, enrolledCourses, { removed: [], added: [] }, newBg);
    }
  };

  const handlePlanEdit = (newEdits) => {
    setPlanEdits(newEdits);
    if (courses) {
      saveToBrowser(courses, '', careerGoal, selectedTracks, enrolledCourses, newEdits, background);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">MAS MTEC Progress Tracker</h1>
            <p className="text-sm text-gray-500">ETH Zurich — Management, Technology, and Economics</p>
          </div>
          {courses && (
            <div className="flex gap-2">
              <ShareButton courses={courses} />
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Update
              </button>
              <button
                onClick={handleClearData}
                className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg text-sm font-medium hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                Clear Data
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {!courses ? (
          <TranscriptInput onParse={handleParse} importedText={importedText} importedEnrollments={importedEnrollments} />
        ) : (
          <>
            {isShared && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-sm text-purple-700">
                You're viewing a shared progress report. Paste your own transcript to see your analysis.
              </div>
            )}

            {isRestored && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-600 flex items-center justify-between">
                <span>Restored from your previous session.</span>
                <button
                  onClick={handleReset}
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Update transcript
                </button>
              </div>
            )}

            {/* Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                label="Credits"
                value={analysis.completedCP}
                suffix={analysis.enrolledCP > 0 ? `+${analysis.enrolledCP} enrolled / ${REQUIREMENTS.totalCP}` : `/ ${REQUIREMENTS.totalCP}`}
                color="blue"
              />
              <StatCard
                label="Core Credits"
                value={analysis.core.cp}
                suffix={`/ ${REQUIREMENTS.coreMinCP}`}
                color={analysis.core.cp >= REQUIREMENTS.coreMinCP ? 'green' : 'amber'}
              />
              <StatCard
                label="Core Areas"
                value={analysis.core.coveredAreas.length}
                suffix="/ 5"
                color={analysis.core.coveredAreas.length >= 5 ? 'green' : 'amber'}
              />
              <StatCard
                label="Skill Courses"
                value={analysis.skills.count}
                suffix={`/ ${REQUIREMENTS.skillTrainingMin}`}
                color={analysis.skills.count >= REQUIREMENTS.skillTrainingMin ? 'green' : 'amber'}
              />
            </div>

            {/* Progress Bars */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
              <ProgressBar
                value={analysis.completedCP}
                max={REQUIREMENTS.totalCP}
                label="Total Credits"
                sublabel="CP"
                color="blue"
                enrolledValue={analysis.enrolledCP}
              />
              <ProgressBar
                value={analysis.courses.filter(c => c.category === 'core').reduce((s, c) => s + c.cp, 0)}
                max={REQUIREMENTS.coreMinCP}
                label="Core Courses"
                sublabel="CP"
                color={analysis.core.cp >= REQUIREMENTS.coreMinCP ? 'green' : 'amber'}
                enrolledValue={enrolledCourses.filter(c => c.type === 'core').reduce((s, c) => s + c.cp, 0)}
              />
              <ProgressBar
                value={analysis.courses.filter(c => c.category === 'skill').length}
                max={REQUIREMENTS.skillTrainingMin}
                label="Skill-based Training"
                sublabel="courses"
                color={analysis.skills.count >= REQUIREMENTS.skillTrainingMin ? 'green' : 'amber'}
                enrolledValue={enrolledCourses.filter(c => c.type === 'skill').length}
              />
              <ProgressBar
                value={analysis.thesis.completed ? 12 : 0}
                max={12}
                label="Master's Thesis"
                sublabel="CP"
                color={analysis.thesis.completed ? 'green' : 'red'}
              />
            </div>

            {/* Career goal — editable inline */}
            <CareerGoalEditor
              careerGoal={careerGoal}
              selectedTracks={selectedTracks}
              onChange={handleGoalChange}
            />

            {/* Background — editable inline */}
            <button
              onClick={() => {
                const newBg = prompt('Your academic/professional background (comma-separated):', background);
                if (newBg !== null) handleBackgroundChange(newBg);
              }}
              className="w-full bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between hover:border-blue-300 transition-colors text-left group"
            >
              <div className="min-w-0">
                {background ? (
                  <p className="text-sm text-gray-800">
                    <span className="font-medium text-gray-500">Background:</span>{' '}
                    {background.split(',').map(b => b.trim()).filter(Boolean).map(b => (
                      <span key={b} className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs mr-1 mb-0.5">{b}</span>
                    ))}
                  </p>
                ) : (
                  <p className="text-sm text-gray-400">No background set — click to add (e.g., finance, engineering)</p>
                )}
              </div>
              <span className="text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-3">
                Change
              </span>
            </button>

            {/* Unified course plan table */}
            <CareerRecommendations
              completedIds={new Set(analysis.courses.filter(c => !c.withdrawn).map(c => c.id))}
              enrolledIds={new Set(enrolledCourses.map(c => c.id))}
              careerGoal={careerGoal}
              selectedTracks={selectedTracks}
              background={background}
              analysis={analysis}
              planEdits={planEdits}
              onPlanEdit={handlePlanEdit}
            />

            {/* Timetable — shows for enrolled courses */}
            {enrolledCourses.length > 0 && (
              <Timetable enrolledCourses={enrolledCourses} />
            )}

            {/* Transcript details (collapsed) */}
            <details className="bg-white border border-gray-200 rounded-lg">
              <summary className="px-4 py-3 cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-800">
                Full Transcript ({analysis.courses.length} completed, {analysis.withdrawn.length} withdrawn
                {enrolledCourses.length > 0 ? `, ${enrolledCourses.length} enrolled` : ''})
              </summary>
              <div className="px-4 pb-4">
                <CourseTable courses={analysis.allCourses} />
              </div>
            </details>
          </>
        )}
      </main>

      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-xs text-gray-400">
          MAS MTEC Progress Tracker — Not affiliated with ETH Zurich.
          Curriculum data based on 2025-2027 study plan.
        </div>
      </footer>
    </div>
  );
}

function StatCard({ label, value, suffix, color }) {
  const colors = {
    blue: 'text-blue-600',
    green: 'text-emerald-600',
    amber: 'text-amber-600',
    red: 'text-red-500',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-bold">
        <span className={colors[color] || colors.blue}>{value}</span>
        <span className="text-sm text-gray-400 font-normal ml-1">{suffix}</span>
      </p>
    </div>
  );
}

export default App;
