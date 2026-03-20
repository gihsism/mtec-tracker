import { useState } from 'react';
import { CAREER_TRACKS, ALL_COURSES } from '../data/mtecRequirements';
import { parseEnrollmentText } from '../utils/parseTranscript';

const SAMPLE_TRANSCRIPT = `Core subjects\t6\t15\t9
General Management and Human Resource Management\t3\t3\t
363-0341-00 S\tIntroduction to Management\tW26\t4.75\t\t3\t\t
Information Management and Operations Management\t3\t3\t
363-0421-00 S\tManagement of Digital Transformation\tW26\t4.5\t\t3\t\t
Quantitative and Qualitative Methods for Solving Complex Problems\t0\t3\t3
363-1004-00 S\tOperations Research\tW26\tAbbr\t\t\t\t\t
Skill-based training\t1\t2\t1
365-1189-00 S\tPersonal Leadership (1/4): Mastering Effective Communication\tW26\tBest\t\t1\t\t
Elective subjects\t9\t0\t
365-1143-00 S\tDigital Transformation: Integrating Cloud and Business\tW26\tBest\t\t1\t\t
365-1173-00 S\tFundamentals of Machine Learning for Executives\tS26\tBest\t\t1\t\t
365-1083-00 S\tLeading the Technology-Driven Enterprise\tW26\tBest\t\t2\t\t
365-1183-00 S\tLeveraging Generative AI for Sustainable Business Value\tW26\tBest\t\t2\t\t
363-0389-00 S\tTechnology and Innovation Management\tW26\t4\t\t3\t\t
Master's thesis\t0\t12\t12`;

const SAMPLE_GOAL = 'AI/ML product manager at a tech company or strategy consulting';
const SAMPLE_ENROLLED = ['365-1120-00', '363-0392-00'];

function ImportFromMyStudies({ type, onImported }) {
  const [status, setStatus] = useState(null); // null | 'success' | 'empty' | 'error'

  const isTranscript = type === 'transcript';
  const url = isTranscript
    ? 'https://www.lehrbetrieb.ethz.ch/myStudies/studLeistungsueberblick.view?clearRegId=true'
    : 'https://www.lehrbetrieb.ethz.ch/myStudies/studEinschreibenFaecher.view?lang=en';
  const label = isTranscript ? 'Performance Overview' : 'Registrations';

  const handlePaste = async () => {
    try {
      const clipText = await navigator.clipboard.readText();
      if (!clipText || !clipText.trim()) {
        setStatus('empty');
        return;
      }
      onImported(clipText);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-3">
      <div className="flex gap-3 items-start">
        <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">1</span>
        <p className="text-sm text-gray-700">
          Open{' '}
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
            myStudies &rarr; {label}
          </a>
          {' '}and log in if needed.
        </p>
      </div>
      <div className="flex gap-3 items-start">
        <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">2</span>
        <p className="text-sm text-gray-700">
          Select all (<kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-xs font-mono">Cmd+A</kbd>) and copy (<kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-xs font-mono">Cmd+C</kbd>).
        </p>
      </div>
      <div className="flex gap-3 items-start">
        <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">3</span>
        <div>
          <button
            onClick={handlePaste}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Paste from clipboard
          </button>
          {status === 'success' && (
            <p className="text-xs text-emerald-600 mt-1.5">Imported successfully!</p>
          )}
          {status === 'empty' && (
            <p className="text-xs text-amber-600 mt-1.5">Clipboard is empty. Copy the page first (Cmd+A, Cmd+C).</p>
          )}
          {status === 'error' && (
            <p className="text-xs text-red-500 mt-1.5">Could not read clipboard. Please paste manually instead.</p>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-400 ml-8">
        Your data stays in your browser. No credentials are shared.
      </p>
    </div>
  );
}

export default function TranscriptInput({ onParse, importedText, importedEnrollments }) {
  const [text, setText] = useState(importedText || '');
  const [goal, setGoal] = useState('');
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState(importedEnrollments || []);
  const [courseSearch, setCourseSearch] = useState('');
  const [transcriptMode, setTranscriptMode] = useState(importedText ? 'paste' : null);
  const [background, setBackground] = useState('');
  const [enrollMode, setEnrollMode] = useState(importedEnrollments ? 'search' : null);
  const [enrollImported, setEnrollImported] = useState(!!importedEnrollments);

  const toggleTrack = (trackId) => {
    setSelectedTracks(prev =>
      prev.includes(trackId)
        ? prev.filter(t => t !== trackId)
        : [...prev, trackId]
    );
  };

  const toggleEnrolled = (courseId) => {
    setEnrolledIds(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleSubmit = () => {
    const enrolled = ALL_COURSES.filter(c => enrolledIds.includes(c.id));
    onParse(text, goal, selectedTracks, enrolled, background);
  };

  const handleSample = () => {
    setText(SAMPLE_TRANSCRIPT);
    setGoal(SAMPLE_GOAL);
    setSelectedTracks(['ai_ml', 'pm_consulting']);
    setEnrolledIds(SAMPLE_ENROLLED);
    setBackground('finance, sociology');
    const enrolled = ALL_COURSES.filter(c => SAMPLE_ENROLLED.includes(c.id));
    onParse(SAMPLE_TRANSCRIPT, SAMPLE_GOAL, ['ai_ml', 'pm_consulting'], enrolled, 'finance, sociology');
  };

  const handleTranscriptImport = (clipText) => {
    setText(clipText);
    setTranscriptMode('import');
  };

  const handleEnrollImport = (clipText) => {
    const ids = parseEnrollmentText(clipText, ALL_COURSES);
    setEnrolledIds(prev => [...new Set([...prev, ...ids])]);
    setEnrollImported(true);
    setEnrollMode('search');
  };

  const filteredCourses = courseSearch.trim()
    ? ALL_COURSES.filter(c =>
        (c.name.toLowerCase().includes(courseSearch.toLowerCase()) ||
         c.id.includes(courseSearch)) &&
        !enrolledIds.includes(c.id)
      ).slice(0, 8)
    : [];

  const enrolledCourses = ALL_COURSES.filter(c => enrolledIds.includes(c.id));

  return (
    <div className="space-y-6">
      {/* Step 1: Transcript */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Step 1</span>
          <h3 className="text-lg font-semibold text-gray-800">Your Transcript</h3>
        </div>

        {(importedText || transcriptMode === 'import') && (
          <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-800">
            Transcript imported from myStudies!
          </div>
        )}

        {/* Method chooser */}
        {!transcriptMode && !importedText && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setTranscriptMode('mystudies')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 transition-colors text-left group"
            >
              <p className="font-semibold text-gray-800 group-hover:text-blue-600">Import from myStudies</p>
              <p className="text-xs text-gray-500 mt-1">3 easy steps. No credentials shared.</p>
            </button>
            <button
              onClick={() => setTranscriptMode('paste')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 transition-colors text-left group"
            >
              <p className="font-semibold text-gray-800 group-hover:text-blue-600">Paste manually</p>
              <p className="text-xs text-gray-500 mt-1">Copy text from myStudies and paste it here.</p>
            </button>
          </div>
        )}

        {/* Import from myStudies flow */}
        {transcriptMode === 'mystudies' && (
          <div className="mt-3">
            <ImportFromMyStudies type="transcript" onImported={handleTranscriptImport} />
            <button
              onClick={() => setTranscriptMode('paste')}
              className="mt-3 text-xs text-gray-500 hover:text-blue-600"
            >
              Or paste manually instead
            </button>
          </div>
        )}

        {/* Paste / imported mode — show textarea */}
        {(transcriptMode === 'paste' || transcriptMode === 'import' || importedText) && (
          <div className="mt-3">
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste your transcript text here..."
              className="w-full h-48 p-3 border border-gray-300 rounded-lg text-sm font-mono resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            {transcriptMode === 'paste' && (
              <p className="text-xs text-gray-400 mt-1">
                Go to{' '}
                <a
                  href="https://www.lehrbetrieb.ethz.ch/myStudies/studLeistungsueberblick.view?clearRegId=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  myStudies &rarr; Performance Overview
                </a>
                , select all (Cmd+A), copy (Cmd+C), and paste above.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Step 2: Current Semester Enrollments */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Step 2</span>
          <h3 className="text-lg font-semibold text-gray-800">Current Semester Enrollments</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Which courses are you enrolled in this semester? These will count as "in progress".
        </p>

        {enrollImported && enrolledCourses.length > 0 && (
          <div className="mb-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-800">
            {enrolledCourses.length} enrollment{enrolledCourses.length !== 1 ? 's' : ''} imported from myStudies!
          </div>
        )}

        {/* Method chooser */}
        {!enrollMode && !importedEnrollments && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setEnrollMode('mystudies')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 transition-colors text-left group"
            >
              <p className="font-semibold text-gray-800 group-hover:text-blue-600">Import from myStudies</p>
              <p className="text-xs text-gray-500 mt-1">3 easy steps. No credentials shared.</p>
            </button>
            <button
              onClick={() => setEnrollMode('search')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 transition-colors text-left group"
            >
              <p className="font-semibold text-gray-800 group-hover:text-blue-600">Search manually</p>
              <p className="text-xs text-gray-500 mt-1">Search and select courses from the catalog.</p>
            </button>
          </div>
        )}

        {/* Import from myStudies flow */}
        {enrollMode === 'mystudies' && (
          <div>
            <ImportFromMyStudies type="enroll" onImported={handleEnrollImport} />
            <button
              onClick={() => setEnrollMode('search')}
              className="mt-3 text-xs text-gray-500 hover:text-blue-600"
            >
              Or search manually instead
            </button>
          </div>
        )}

        {/* Search mode */}
        {(enrollMode === 'search' || importedEnrollments || enrollImported) && (
          <div>
            <div className="relative">
              <input
                type="text"
                value={courseSearch}
                onChange={e => setCourseSearch(e.target.value)}
                placeholder="Search courses by name or ID..."
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />

              {filteredCourses.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                  {filteredCourses.map(course => (
                    <button
                      key={course.id}
                      onClick={() => { toggleEnrolled(course.id); setCourseSearch(''); }}
                      className="w-full text-left px-3 py-2 hover:bg-blue-50 flex items-center justify-between text-sm border-b border-gray-50 last:border-0"
                    >
                      <div>
                        <span className="font-medium text-gray-800">{course.name}</span>
                        <span className="text-gray-400 ml-2 text-xs font-mono">{course.id}</span>
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">{course.cp} CP</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          course.type === 'core' ? 'bg-purple-100 text-purple-700' :
                          course.type === 'skill' ? 'bg-amber-100 text-amber-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {course.type === 'core' ? 'Core' : course.type === 'skill' ? 'Skill' : 'Elective'}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {enrolledCourses.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {enrolledCourses.map(course => (
              <span
                key={course.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-800"
              >
                {course.name}
                <span className="text-xs text-blue-500">{course.cp} CP</span>
                <button
                  onClick={() => toggleEnrolled(course.id)}
                  className="ml-0.5 text-blue-400 hover:text-red-500 font-bold text-xs"
                >
                  &times;
                </button>
              </span>
            ))}
            <span className="self-center text-xs text-gray-400">
              {enrolledCourses.reduce((s, c) => s + c.cp, 0)} CP in progress
            </span>
          </div>
        )}

        {enrolledCourses.length === 0 && (enrollMode === 'search' || importedEnrollments) && (
          <p className="mt-3 text-xs text-gray-400">No courses selected yet. Skip if not applicable.</p>
        )}
      </div>

      {/* Optional: Career Goal */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Optional</span>
          <h3 className="text-lg font-semibold text-gray-800">Career goal</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Add your desired role or industry to get tailored course recommendations.
        </p>

        <input
          type="text"
          value={goal}
          onChange={e => setGoal(e.target.value)}
          placeholder="e.g., AI product manager, strategy consultant at McKinsey, startup founder..."
          className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />

        <div className="mt-4">
          <p className="text-xs text-gray-500 mb-2">Or pick career tracks that interest you:</p>
          <div className="flex flex-wrap gap-2">
            {CAREER_TRACKS.map(track => {
              const selected = selectedTracks.includes(track.id);
              return (
                <button
                  key={track.id}
                  onClick={() => toggleTrack(track.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                    selected
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600'
                  }`}
                >
                  {track.icon} {track.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Optional: Background */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Optional</span>
          <h3 className="text-lg font-semibold text-gray-800">Your background</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Already studied finance, economics, or engineering? The course plan will avoid topics you already know.
        </p>

        <input
          type="text"
          value={background}
          onChange={e => setBackground(e.target.value)}
          placeholder="e.g., finance, sociology, computer science, engineering..."
          className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <p className="text-xs text-gray-400 mt-1.5">
          Separate multiple fields with commas. Courses covering these topics will be deprioritized.
        </p>
      </div>

      {/* Submit */}
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Analyze Transcript
        </button>
        <button
          onClick={handleSample}
          className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
        >
          Load Sample
        </button>
      </div>
    </div>
  );
}
