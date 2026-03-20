import { useState } from 'react';
import { CAREER_TRACKS } from '../data/mtecRequirements';

export default function CareerGoalEditor({ careerGoal, selectedTracks, onChange }) {
  const [editing, setEditing] = useState(false);
  const [goalDraft, setGoalDraft] = useState(careerGoal);
  const [tracksDraft, setTracksDraft] = useState(selectedTracks);

  const openEdit = () => {
    setGoalDraft(careerGoal);
    setTracksDraft([...selectedTracks]);
    setEditing(true);
  };

  const apply = () => {
    onChange(goalDraft, tracksDraft);
    setEditing(false);
  };

  const toggleTrack = (id) => {
    setTracksDraft(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const hasGoal = (careerGoal && careerGoal.trim()) || selectedTracks.length > 0;

  if (editing) {
    return (
      <div className="bg-white border border-blue-200 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-700">Career Goal</h4>
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(false)}
              className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={apply}
              className="px-3 py-1 bg-blue-600 text-white text-xs rounded font-medium hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        </div>

        <input
          type="text"
          value={goalDraft}
          onChange={e => setGoalDraft(e.target.value)}
          placeholder="e.g., AI product manager, strategy consultant..."
          className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          autoFocus
        />

        <div className="flex flex-wrap gap-2">
          {CAREER_TRACKS.map(track => {
            const selected = tracksDraft.includes(track.id);
            return (
              <button
                key={track.id}
                onClick={() => toggleTrack(track.id)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors border ${
                  selected
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                }`}
              >
                {track.icon} {track.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={openEdit}
      className="w-full bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between hover:border-blue-300 transition-colors text-left group"
    >
      <div className="min-w-0">
        {hasGoal ? (
          <>
            {careerGoal && (
              <p className="text-sm text-gray-800">
                <span className="font-medium text-gray-500">Goal:</span> {careerGoal}
              </p>
            )}
            {selectedTracks.length > 0 && (
              <p className="text-xs text-gray-500 mt-0.5">
                {CAREER_TRACKS.filter(t => selectedTracks.includes(t.id)).map(t => `${t.icon} ${t.label}`).join(', ')}
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-gray-400">No career goal set — click to add one</p>
        )}
      </div>
      <span className="text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-3">
        Change
      </span>
    </button>
  );
}
